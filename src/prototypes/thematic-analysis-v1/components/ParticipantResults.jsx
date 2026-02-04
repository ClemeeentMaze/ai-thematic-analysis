/**
 * ParticipantResults Component
 * 
 * Displays participant details with video player and their responses.
 * Based on Figma: Clip Analysis - Participant view
 */
import { useState } from 'react';
import { Flex, Box, Text, Heading, IconFigure, ScrollContainer, ActionButton, Icon } from '@framework/components/ariane';
import { ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, Download, Play, Star, Table2, Sparkles } from 'lucide-react';
import { BLOCK_TYPES } from '../data';

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
 * Response tab button (underline style like Results page)
 */
function ResponseTab({ icon: IconComponent, label, count, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1.5 px-3 py-2 text-sm font-medium
        transition-all duration-150 cursor-pointer border-b-2
        ${isActive 
          ? 'text-[#0568FD] border-[#0568FD]' 
          : 'text-[#6C718C] border-transparent hover:text-[#535a74]'
        }
      `}
    >
      <IconComponent size={16} />
      <span>{label}</span>
      {count !== undefined && (
        <span className={`text-xs ${isActive ? 'text-[#0568FD]' : 'text-[#9597b0]'}`}>
          {count}
        </span>
      )}
    </button>
  );
}

/**
 * Block response card - displays a block with participant's response
 */
function BlockResponseCard({ block, isHighlighted = false }) {
  const blockType = BLOCK_TYPES[block.type] || {};
  
  // Mock response data per block type
  const getMockResponse = () => {
    switch (block.type) {
      case 'prototype_test':
        return {
          status: 'Direct success',
          statusColor: 'green',
          duration: '42.1s',
          screenshots: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=80&h=60&fit=crop',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=80&h=60&fit=crop',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=80&h=60&fit=crop',
          ],
        };
      case 'scale':
        return { rating: 4, maxRating: 5 };
      case 'multiple_choice':
        return { selected: 'Option B' };
      case 'yesno':
        return { answer: 'Yes' };
      case 'input':
      case 'simple_input':
        return { text: 'The booking process was straightforward and easy to follow.' };
      default:
        return { text: 'Response recorded' };
    }
  };

  const response = getMockResponse();

  return (
    <div className={`p-4 rounded-lg border ${isHighlighted ? 'border-[#0568FD] bg-[#F0FAFF]' : 'border-[rgba(108,113,140,0.28)] bg-white'}`}>
      <Flex alignItems="flex-start" gap="SM" className="mb-3">
        <IconFigure 
          name={blockType.iconName || 'block'} 
          color={blockType.arianeColor || 'neutral'} 
          size="SM" 
          mode="dark" 
          shape="squared" 
        />
      </Flex>
      <Text className="font-semibold text-neutral-900 mb-2">{block.title}</Text>
      
      {/* Response content based on block type */}
      {block.type === 'prototype_test' && (
        <>
          <Flex alignItems="center" gap="SM" className="mb-3">
            <span className={`w-2 h-2 rounded-full ${response.statusColor === 'green' ? 'bg-green-500' : 'bg-neutral-400'}`} />
            <Text type="caption" color="default.main.secondary">{response.status}</Text>
            <Text type="caption" color="default.main.secondary">•</Text>
            <Flex alignItems="center" gap="XS">
              <Icon name="clock" size={14} className="text-[#6C718C]" />
              <Text type="caption" color="default.main.secondary">{response.duration}</Text>
            </Flex>
          </Flex>
          {response.screenshots && (
            <Flex gap="XS">
              {response.screenshots.map((src, idx) => (
                <img 
                  key={idx}
                  src={src} 
                  alt={`Screenshot ${idx + 1}`}
                  className="w-16 h-12 rounded object-cover border border-neutral-200"
                />
              ))}
            </Flex>
          )}
        </>
      )}
      
      {block.type === 'scale' && (
        <Flex gap="XS">
          {Array.from({ length: response.maxRating }).map((_, idx) => (
            <Star 
              key={idx}
              size={24} 
              className={idx < response.rating ? 'text-amber-400' : 'text-neutral-300'}
              fill={idx < response.rating ? 'currentColor' : 'none'}
            />
          ))}
        </Flex>
      )}
      
      {block.type === 'multiple_choice' && (
        <Text color="default.main.secondary">{response.selected}</Text>
      )}
      
      {block.type === 'yesno' && (
        <Text color="default.main.secondary">{response.answer}</Text>
      )}
      
      {(block.type === 'input' || block.type === 'simple_input' || block.type === 'context') && (
        <Text color="default.main.secondary">{response.text}</Text>
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

/**
 * Mock transcript data for the participant
 */
const MOCK_TRANSCRIPTS = [
  { timestamp: '0:00', text: "Okay, let's see... looking for Four Seasons in London. Hmm, I'll type it in the search bar... yeah, there it is." },
  { timestamp: '0:30', text: "Just checking the dates... alright, selecting next weekend.", highlight: 'dates' },
  { timestamp: '1:28', text: "I'll confirm the booking anyway—it looks like all the details are correct. Done. That was pretty straightforward overall." },
];

/**
 * ParticipantResults - Main component
 */
export function ParticipantResults({ blocks = [] }) {
  const [activeTab, setActiveTab] = useState('all');
  
  // Mock participant data
  const participant = {
    participantId: '23338',
    videoDuration: '02:25',
    videoThumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
  };
  
  const highlightCount = 4;

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
              {/* Response Tabs (underline style like Results page) */}
              <Flex className="mb-4 border-b border-[rgba(108,113,140,0.16)]">
                <ResponseTab 
                  icon={Table2} 
                  label="All responses" 
                  isActive={activeTab === 'all'} 
                  onClick={() => setActiveTab('all')} 
                />
                <ResponseTab 
                  icon={Sparkles} 
                  label="Highlights" 
                  count={highlightCount}
                  isActive={activeTab === 'highlights'} 
                  onClick={() => setActiveTab('highlights')} 
                />
              </Flex>

              {/* Responses List - shows blocks from the block list */}
              <Flex flexDirection="column" gap="MD">
                {blocks.length > 0 ? (
                  <>
                    {/* First block highlighted */}
                    {blocks[0] && (
                      <BlockResponseCard block={blocks[0]} isHighlighted />
                    )}
                    
                    {/* Transcript entries */}
                    {MOCK_TRANSCRIPTS.map((transcript, idx) => (
                      <TranscriptEntry
                        key={`transcript-${idx}`}
                        timestamp={transcript.timestamp}
                        text={transcript.text}
                        highlight={transcript.highlight}
                      />
                    ))}
                    
                    {/* Remaining blocks */}
                    {blocks.slice(1).map((block) => (
                      <BlockResponseCard key={block.id} block={block} />
                    ))}
                  </>
                ) : (
                  <Text color="default.main.secondary">No blocks to display</Text>
                )}
              </Flex>
            </Box>
          </Flex>
        </div>
      </Flex>
    </ScrollContainer>
  );
}

export default ParticipantResults;
