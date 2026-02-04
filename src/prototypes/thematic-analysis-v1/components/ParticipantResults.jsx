/**
 * ParticipantResults Component
 * 
 * Displays participant details with video player and their responses.
 * Based on Figma: Clip Analysis - Participant view
 */
import { useState } from 'react';
import { Flex, Box, Text, Heading, IconFigure, ScrollContainer, ActionButton, Icon, SegmentControl } from '@framework/components/ariane';
import { ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, Download, Play, Star } from 'lucide-react';

/**
 * Mock participant data
 */
const MOCK_PARTICIPANTS = [
  {
    id: 'participant-1',
    participantId: '23338',
    videoDuration: '02:25',
    videoThumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
    responses: [
      {
        type: 'mission',
        icon: 'prototype-test',
        iconColor: 'primary',
        title: 'Book a room at the Four Seasons hotel in London',
        status: 'Direct success',
        statusColor: 'green',
        duration: '42.1s',
        screenshots: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=80&h=60&fit=crop',
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=80&h=60&fit=crop',
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=80&h=60&fit=crop',
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=80&h=60&fit=crop',
        ],
      },
      {
        type: 'transcript',
        timestamp: '0:00',
        text: "Okay, let's see... looking for Four Seasons in London. Hmm, I'll type it in the search bar... yeah, there it is.",
      },
      {
        type: 'transcript',
        timestamp: '0:30',
        text: "Just checking the dates... alright, selecting next weekend.",
        highlight: 'dates',
      },
      {
        type: 'transcript',
        timestamp: '1:28',
        text: "I'll confirm the booking anyway—it looks like all the details are correct. Done. That was pretty straightforward overall.",
      },
      {
        type: 'rating',
        icon: 'star',
        iconColor: 'yellow',
        question: 'How would you rate the ease of use?',
        rating: 4,
        maxRating: 5,
      },
    ],
  },
];

/**
 * Video player component with play button overlay
 */
function VideoPlayer({ thumbnail, duration }) {
  return (
    <div className="relative rounded-lg overflow-hidden bg-neutral-900 aspect-video">
      <img 
        src={thumbnail} 
        alt="Video thumbnail" 
        className="w-full h-full object-cover"
      />
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
          <Play size={28} className="text-neutral-800 ml-1" fill="currentColor" />
        </div>
      </div>
      {/* Duration badge */}
      <div className="absolute bottom-3 right-3 px-2 py-1 bg-neutral-900/80 rounded text-white text-sm font-medium">
        {duration}
      </div>
    </div>
  );
}

/**
 * Mission/Task response card
 */
function MissionCard({ icon, iconColor, title, status, statusColor, duration, screenshots }) {
  return (
    <div className="p-4 rounded-lg border border-[#0568FD] bg-[#F0FAFF]">
      <Flex alignItems="flex-start" gap="SM" className="mb-3">
        <IconFigure name={icon} color={iconColor} size="SM" mode="dark" shape="squared" />
      </Flex>
      <Text className="font-semibold text-neutral-900 mb-2">{title}</Text>
      <Flex alignItems="center" gap="SM" className="mb-3">
        <span className={`w-2 h-2 rounded-full ${statusColor === 'green' ? 'bg-green-500' : 'bg-neutral-400'}`} />
        <Text type="caption" color="default.main.secondary">{status}</Text>
        <Text type="caption" color="default.main.secondary">•</Text>
        <Flex alignItems="center" gap="XS">
          <Icon name="clock" size={14} className="text-[#6C718C]" />
          <Text type="caption" color="default.main.secondary">{duration}</Text>
        </Flex>
      </Flex>
      {screenshots && screenshots.length > 0 && (
        <Flex gap="XS">
          {screenshots.map((src, idx) => (
            <img 
              key={idx}
              src={src} 
              alt={`Screenshot ${idx + 1}`}
              className="w-16 h-12 rounded object-cover border border-neutral-200"
            />
          ))}
        </Flex>
      )}
    </div>
  );
}

/**
 * Transcript entry with timestamp
 */
function TranscriptEntry({ timestamp, text, highlight }) {
  // Render text with optional highlight
  const renderText = () => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? <span key={i} className="bg-[#0568FD] text-white px-1 rounded">{part}</span>
        : part
    );
  };

  return (
    <div className="py-2">
      <Text type="caption" color="default.main.secondary" className="mb-1">{timestamp}</Text>
      <Text color="default.main.primary">{renderText()}</Text>
    </div>
  );
}

/**
 * Rating response with stars
 */
function RatingCard({ icon, iconColor, question, rating, maxRating }) {
  return (
    <div className="p-4 rounded-lg border border-[rgba(108,113,140,0.28)] bg-white">
      <Flex alignItems="flex-start" gap="SM" className="mb-3">
        <IconFigure name={icon} color={iconColor} size="SM" mode="dark" shape="squared" />
      </Flex>
      <Text className="font-medium text-neutral-900 mb-3">{question}</Text>
      <Flex gap="XS">
        {Array.from({ length: maxRating }).map((_, idx) => (
          <Star 
            key={idx}
            size={24} 
            className={idx < rating ? 'text-amber-400' : 'text-neutral-300'}
            fill={idx < rating ? 'currentColor' : 'none'}
          />
        ))}
      </Flex>
    </div>
  );
}

/**
 * Navigation button (prev/next)
 */
function NavButton({ direction, onClick }) {
  const IconComponent = direction === 'prev' ? ChevronLeft : ChevronRight;
  return (
    <button 
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center rounded border border-[rgba(108,113,140,0.28)] bg-white hover:bg-neutral-50 cursor-pointer"
    >
      <IconComponent size={16} className="text-[#6C718C]" />
    </button>
  );
}

const RESPONSE_TAB_OPTIONS = [
  { id: 'all', label: 'All responses' },
  { id: 'highlights', label: 'Highlights' },
];

/**
 * ParticipantResults - Main component
 */
export function ParticipantResults({ participantIndex = 0 }) {
  const [activeTab, setActiveTab] = useState('all');
  const participant = MOCK_PARTICIPANTS[participantIndex] || MOCK_PARTICIPANTS[0];

  return (
    <ScrollContainer className="h-full">
      <Flex flexDirection="column" className="p-6">
        {/* Filter Bar */}
        <Flex className="mb-6">
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#0568FD] border border-[rgba(108,113,140,0.28)] rounded-lg bg-white hover:bg-neutral-50 cursor-pointer">
            <Icon name="filter" size={16} />
            <span>Add filters</span>
          </button>
        </Flex>

        {/* Participant Card */}
        <div className="bg-white rounded-xl border border-[rgba(108,113,140,0.12)] p-6">
          {/* Participant Header */}
          <Flex alignItems="center" justifyContent="space-between" className="mb-6">
            <Flex alignItems="center" gap="MD">
              <IconFigure 
                name="user" 
                color="secondary" 
                size="LG" 
                mode="dark"
                shape="circle"
              />
              <Heading level={2} className="text-xl font-semibold">
                Participant {participant.participantId}
              </Heading>
              <button className="flex items-center gap-1 text-sm text-[#6C718C] hover:text-[#535a74] cursor-pointer">
                <ChevronDown size={16} />
                <span>Show more</span>
              </button>
            </Flex>
            <Flex alignItems="center" gap="SM">
              <ActionButton emphasis="tertiary" size="SM" icon={<Icon name="share" />}>
                Share
              </ActionButton>
              <NavButton direction="prev" onClick={() => {}} />
              <NavButton direction="next" onClick={() => {}} />
              <ActionButton emphasis="tertiary" size="SM" icon={<Download size={16} />} />
              <ActionButton emphasis="tertiary" size="SM" icon={<MoreHorizontal size={16} />} />
            </Flex>
          </Flex>

          {/* Two Column Layout */}
          <Flex gap="LG">
            {/* Left Column - Video */}
            <Box className="w-[400px] flex-shrink-0">
              <VideoPlayer 
                thumbnail={participant.videoThumbnail} 
                duration={participant.videoDuration} 
              />
              <Flex justifyContent="flex-end" gap="SM" className="mt-3">
                <ActionButton emphasis="tertiary" size="SM" icon={<Icon name="share" />} />
                <ActionButton emphasis="secondary" size="SM" icon={<Icon name="edit" />}>
                  Highlight
                </ActionButton>
              </Flex>
            </Box>

            {/* Right Column - Responses */}
            <Box className="flex-1 min-w-0">
              {/* Response Tabs */}
              <Flex className="mb-4 border-b border-[rgba(108,113,140,0.16)]">
                <SegmentControl
                  options={RESPONSE_TAB_OPTIONS.map(opt => ({
                    ...opt,
                    label: opt.id === 'highlights' ? `${opt.label} 4` : opt.label,
                  }))}
                  selected={activeTab}
                  onChange={(id) => setActiveTab(id)}
                  size="SM"
                />
              </Flex>

              {/* Responses List */}
              <Flex flexDirection="column" gap="MD">
                {participant.responses.map((response, idx) => {
                  if (response.type === 'mission') {
                    return (
                      <MissionCard
                        key={idx}
                        icon={response.icon}
                        iconColor={response.iconColor}
                        title={response.title}
                        status={response.status}
                        statusColor={response.statusColor}
                        duration={response.duration}
                        screenshots={response.screenshots}
                      />
                    );
                  }
                  if (response.type === 'transcript') {
                    return (
                      <TranscriptEntry
                        key={idx}
                        timestamp={response.timestamp}
                        text={response.text}
                        highlight={response.highlight}
                      />
                    );
                  }
                  if (response.type === 'rating') {
                    return (
                      <RatingCard
                        key={idx}
                        icon={response.icon}
                        iconColor={response.iconColor}
                        question={response.question}
                        rating={response.rating}
                        maxRating={response.maxRating}
                      />
                    );
                  }
                  return null;
                })}
              </Flex>
            </Box>
          </Flex>
        </div>
      </Flex>
    </ScrollContainer>
  );
}

export default ParticipantResults;
