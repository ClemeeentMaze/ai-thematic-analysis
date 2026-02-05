/**
 * ParticipantResults Component
 * 
 * Displays participant details with video player and their responses.
 * Based on Figma: Clip Analysis - Participant view
 */
import { useState } from 'react';
import { Flex, Box, Text, Heading, IconFigure, ScrollContainer, ActionButton, Icon } from '@framework/components/ariane';
import { ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, Download, Play, Star, Table2, Highlighter, Filter } from 'lucide-react';
import { BLOCK_TYPES } from '../data';
import { HighlightCard } from './HighlightCard';

/**
 * Mapping of participant highlight IDs to their assigned themes (after thematic analysis)
 * Uses same theme names as HIGHLIGHT_THEME_MAPPING in BlockResults
 */
const PARTICIPANT_HIGHLIGHT_THEME_MAPPING = {
  // p1 (483697735) highlights - same as h1, h4, h8, h9 from BlockResults
  'ph1-1': ['Navigation and discoverability needs improvement'],
  'ph1-2': ['Onboarding and documentation gaps identified'],
  'ph1-3': ['Navigation and discoverability needs improvement'],
  // p2 (483697736) highlights - same as h2, h10 from BlockResults
  'ph2-1': ['Filter functionality is intuitive but limited'],
  'ph2-2': ['Performance concerns affecting user perception'],
  // p3 (483697737) highlights - same as h3, h5, h11 from BlockResults
  'ph3-1': ['Learning curve steeper than expected'],
  'ph3-2': ['Power users want keyboard shortcuts'],
  'ph3-3': ['Data security and privacy concerns'],
};

/**
 * Mock highlights for participants - cross-referenced from BlockResults
 * These match the highlights defined in MOCK_HIGHLIGHTS_BY_BLOCK_TYPE
 */
const MOCK_PARTICIPANT_HIGHLIGHTS = {
  'p1': [
    {
      id: 'ph1-1',
      insight: "Monica is excited about the feature that automatically creates a session and captures information, making it easier to upload and analyze audio or video.",
      transcript: "Because that would make, that would be fantastic because that's one of the things w...",
      themes: [],
      isNew: true,
      blockType: 'prototype_test',
    },
    {
      id: 'ph1-2',
      insight: "User wants better visual cues for icon meanings, suggesting tooltips would improve discoverability.",
      transcript: "more tooltips to explain what each button does",
      themes: [],
      isNew: true,
      blockType: 'input',
    },
    {
      id: 'ph1-3',
      insight: "Navigation and settings discoverability is a major pain point affecting task completion time.",
      transcript: "I couldn't find the settings at first and had to click around a lot before finding it hidden in a dropdown",
      themes: [],
      isNew: true,
      blockType: 'ai_conversation',
    },
  ],
  'p2': [
    {
      id: 'ph2-1',
      insight: "User found the filtering feature intuitive but wished for more advanced options like date range filtering.",
      transcript: "I really like how the filters work, they're pretty intuitive. But I was looking for a way to filter by date range and couldn't find it...",
      themes: [],
      isNew: true,
      blockType: 'prototype_test',
    },
    {
      id: 'ph2-2',
      insight: "Loading times between sections create friction and make the product feel unpolished.",
      transcript: "Everything else felt polished but the slowness made it feel unfinished",
      themes: [],
      isNew: true,
      blockType: 'ai_conversation',
    },
  ],
  'p3': [
    {
      id: 'ph3-1',
      insight: "Participant gave a high rating but mentioned the learning curve was steeper than expected initially.",
      transcript: "I'd give it an 8 out of 10. It's really powerful once you get the hang of it, but it took me a bit to understand all the features...",
      themes: [],
      isNew: true,
      blockType: 'scale',
    },
    {
      id: 'ph3-2',
      insight: "Power users would benefit from keyboard shortcuts to speed up their workflow.",
      transcript: "keyboard shortcuts for power users",
      themes: [],
      isNew: true,
      blockType: 'input',
    },
    {
      id: 'ph3-3',
      insight: "Data security concerns are blocking users from adding real information to the product.",
      transcript: "I checked the footer and the settings but couldn't find a clear privacy policy or data handling explanation",
      themes: [],
      isNew: false,
      blockType: 'ai_conversation',
    },
  ],
};

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
 * Response tab button - Inter 16px font (matching Results page)
 * Badge logic: 0 highlights = grey "0", N highlights = grey "N", N highlights with new = purple "N"
 */
function ResponseTab({ icon: IconComponent, label, count, newCount, isActive, onClick }) {
  const hasNewHighlights = newCount !== undefined && newCount > 0;
  
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-3
        font-['Inter'] text-[16px] leading-6 font-medium
        transition-all duration-150 cursor-pointer border-b-2
        ${isActive 
          ? 'text-[#0568FD] border-[#0568FD]' 
          : 'text-[#6C718C] border-transparent hover:text-[#535a74]'
        }
      `}
    >
      <IconComponent size={18} />
      <span>{label}</span>
      {count !== undefined && (
        <span className={`
          ml-1 px-1.5 py-0.5 rounded text-sm font-medium flex items-center gap-1
          ${hasNewHighlights 
            ? 'bg-[#F9F7FF] text-[#6B5BEE]' 
            : isActive 
              ? 'bg-[#E8F4FF] text-[#0568FD]' 
              : 'bg-neutral-100 text-[#6C718C]'
          }
        `}>
          {count}
        </span>
      )}
    </button>
  );
}

/**
 * Response data per participant - matches MOCK_RESPONSES_BY_TYPE in BlockResults
 */
const PARTICIPANT_RESPONSES = {
  'p1': { // 483697735
    prototype_test: { status: 'Task completed', statusColor: 'green', duration: '47s' },
    scale: { rating: 4, maxRating: 5 },
    multiple_choice: { selected: 'Laptop, Phone' },
    yesno: { answer: 'Yes' },
    input: { text: 'I would add more tooltips to explain what each button does. Some icons are not intuitive and I had to guess what they meant.' },
    simple_input: { text: 'sarah.johnson@gmail.com' },
    ai_conversation: { text: 'I gave a 4 because the core features are great but some things were confusing. Mainly the navigation menu - I couldn\'t find the settings at first.' },
  },
  'p2': { // 483697736
    prototype_test: { status: 'Task completed', statusColor: 'green', duration: '1m 12s' },
    scale: { rating: 5, maxRating: 5 },
    multiple_choice: { selected: 'Phone, Tablet' },
    yesno: { answer: 'No' },
    input: { text: 'The search feature could be more prominent. I had trouble finding it at first but once I did it worked great.' },
    simple_input: { text: 'mike.chen@outlook.com' },
    ai_conversation: { text: 'The loading times were frustrating, especially when switching between sections. Everything else felt polished but the slowness made it feel unfinished.' },
  },
  'p3': { // 483697737
    prototype_test: { status: 'Gave up after 2 attempts', statusColor: 'yellow', duration: '58s' },
    scale: { rating: 3, maxRating: 5 },
    multiple_choice: { selected: 'Laptop, Phone, Tablet' },
    yesno: { answer: 'Yes' },
    input: { text: 'Overall great experience! Would love to see keyboard shortcuts for power users to speed up common actions.' },
    simple_input: { text: 'emma.wilson@company.co' },
    ai_conversation: { text: 'I rated it a 3 because I have some concerns about data security. I couldn\'t find a clear privacy policy or data handling explanation.' },
  },
  'p4': { // 483697738
    prototype_test: { status: 'Task completed', statusColor: 'green', duration: '1m 02s' },
    scale: { rating: 4, maxRating: 5 },
    multiple_choice: { selected: 'Phone' },
    yesno: { answer: 'Yes' },
    input: { text: 'Dark mode would be a nice addition. My eyes get tired when using the app at night.' },
    simple_input: { text: 'alex.kumar@yahoo.com' },
    ai_conversation: { text: 'I loved the overall experience! The visual hierarchy was clear. Maybe adding keyboard shortcuts for power users once I got familiar with it.' },
  },
  'p5': { // 483697739
    prototype_test: { status: 'Task completed', statusColor: 'green', duration: '38s' },
    scale: { rating: 5, maxRating: 5 },
    multiple_choice: { selected: 'Laptop' },
    yesno: { answer: 'No' },
    input: { text: 'The loading times could be faster when switching between sections. Sometimes it takes a few seconds which breaks my flow.' },
    simple_input: { text: 'lisa.martinez@work.io' },
    ai_conversation: { text: 'I prefer this conversational approach over surveys. I can explain the nuances of my thinking - like how the filter works great but is hard to discover.' },
  },
};

/**
 * Block response card - displays a block with participant's response
 */
function BlockResponseCard({ block, participantId = 'p1', isHighlighted = false }) {
  const blockType = BLOCK_TYPES[block.type] || {};
  const participantResponses = PARTICIPANT_RESPONSES[participantId] || PARTICIPANT_RESPONSES['p1'];
  
  // Get response data for this participant and block type
  const getMockResponse = () => {
    const response = participantResponses[block.type];
    if (response) {
      // Add screenshots for prototype_test
      if (block.type === 'prototype_test') {
        return {
          ...response,
          screenshots: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=80&h=60&fit=crop',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=80&h=60&fit=crop',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=80&h=60&fit=crop',
          ],
        };
      }
      return response;
    }
    return { text: 'Response recorded' };
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
 * Mock transcript snippets per participant - matches actual responses from BlockResults
 */
const MOCK_TRANSCRIPTS_BY_PARTICIPANT = {
  'p1': [ // 483697735
    [
      { timestamp: '0:00', text: "Okay, let me try to complete this task... looking for the main feature." },
      { timestamp: '0:25', text: "Found it! That was pretty quick. Task completed in about 47 seconds." },
    ],
    [
      { timestamp: '0:50', text: "For the rating, I'd give it a 4 out of 5. The core features are great." },
    ],
    [
      { timestamp: '1:15', text: "I would add more tooltips to explain what each button does.", highlight: 'tooltips' },
      { timestamp: '1:35', text: "Some icons are not intuitive and I had to guess what they meant." },
    ],
    [
      { timestamp: '1:55', text: "I gave a 4 because the core features are great but some things were confusing." },
      { timestamp: '2:10', text: "Mainly the navigation menu. I couldn't find the settings at first and had to click around a lot before finding it hidden in a dropdown.", highlight: 'settings' },
    ],
  ],
  'p2': [ // 483697736
    [
      { timestamp: '0:00', text: "Let me work through this task... okay, I see the options here." },
      { timestamp: '0:45', text: "Done! Took me about 1 minute and 12 seconds. Pretty straightforward." },
    ],
    [
      { timestamp: '1:00', text: "I'd rate this a 5 out of 5. Really impressed with the experience." },
    ],
    [
      { timestamp: '1:20', text: "The search feature could be more prominent. I had trouble finding it at first.", highlight: 'search' },
      { timestamp: '1:40', text: "But once I did it worked great!" },
    ],
    [
      { timestamp: '1:55', text: "The loading times were frustrating, especially when switching between sections." },
      { timestamp: '2:15', text: "Everything else felt polished but the slowness made it feel unfinished.", highlight: 'polished' },
    ],
  ],
  'p3': [ // 483697737
    [
      { timestamp: '0:00', text: "Hmm, this is a bit confusing... let me try again." },
      { timestamp: '0:40', text: "I gave up after 2 attempts. The flow wasn't clear to me." },
    ],
    [
      { timestamp: '1:00', text: "I'd give it a 3 out of 5. It's powerful once you get the hang of it, but it took me a bit to understand all the features.", highlight: '3 out of 5' },
    ],
    [
      { timestamp: '1:25', text: "Overall great experience! Would love to see keyboard shortcuts for power users.", highlight: 'keyboard shortcuts' },
      { timestamp: '1:45', text: "Speed up common actions, you know?" },
    ],
    [
      { timestamp: '2:00', text: "I rated it a 3 because I have some concerns about data security." },
      { timestamp: '2:25', text: "I checked the footer and the settings but couldn't find a clear privacy policy or data handling explanation.", highlight: 'privacy policy' },
    ],
  ],
  'p4': [ // 483697738
    [
      { timestamp: '0:00', text: "This looks familiar... let me complete the task." },
      { timestamp: '0:50', text: "Done in about 1 minute. The navigation was laid out well." },
    ],
    [
      { timestamp: '1:05', text: "I'd rate this a 4 out of 5. Really intuitive experience." },
    ],
    [
      { timestamp: '1:20', text: "Dark mode would be a nice addition.", highlight: 'dark mode' },
      { timestamp: '1:35', text: "My eyes get tired when using the app at night." },
    ],
  ],
  'p5': [ // 483697739
    [
      { timestamp: '0:00', text: "Alright, let's see what we have here... oh this is nice!" },
      { timestamp: '0:30', text: "Task completed in just 38 seconds. Very efficient." },
    ],
    [
      { timestamp: '0:45', text: "Definitely a 5 out of 5 for me. Loved it!" },
    ],
    [
      { timestamp: '1:00', text: "The loading times could be faster when switching between sections.", highlight: 'loading' },
      { timestamp: '1:20', text: "Sometimes it takes a few seconds which breaks my flow." },
    ],
  ],
};

/**
 * Participant ID mapping - matches BlockList and BlockResults
 */
const PARTICIPANT_DATA = {
  'p1': { participantId: '483697735', videoDuration: '02:25' },
  'p2': { participantId: '483697736', videoDuration: '01:48' },
  'p3': { participantId: '483697737', videoDuration: '03:02' },
  'p4': { participantId: '483697738', videoDuration: '01:35' },
  'p5': { participantId: '483697739', videoDuration: '02:22' },
};

/**
 * ParticipantResults - Main component
 */
export function ParticipantResults({ blocks = [], selectedParticipantId = 'p1', generatedThemes = [] }) {
  const [activeTab, setActiveTab] = useState('all');
  
  // Get participant data based on selected ID
  const participantInfo = PARTICIPANT_DATA[selectedParticipantId] || PARTICIPANT_DATA['p1'];
  const participant = {
    participantId: participantInfo.participantId,
    videoDuration: participantInfo.videoDuration,
    videoThumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
  };
  
  // Get highlights for this participant
  const participantHighlights = MOCK_PARTICIPANT_HIGHLIGHTS[selectedParticipantId] || [];
  const highlightCount = participantHighlights.length;
  const newHighlightCount = participantHighlights.filter(h => h.isNew).length;

  return (
    <ScrollContainer className="h-full">
      <Flex flexDirection="column" className="p-6">
        {/* Filter Bar */}
        <Flex className="mb-6">
          <ActionButton emphasis="secondary" size="SM" icon={<Filter size={16} />}>
            Add filters
          </ActionButton>
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
              <ActionButton emphasis="tertiary" size="SM" icon={<Download size={16} />} iconOnly />
              <ActionButton emphasis="tertiary" size="SM" icon={<MoreHorizontal size={16} />} iconOnly />
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
                <ActionButton emphasis="tertiary" size="SM" icon={<Icon name="share" />} iconOnly />
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
                  icon={Highlighter} 
                  label="Highlights" 
                  count={highlightCount}
                  newCount={newHighlightCount}
                  isActive={activeTab === 'highlights'} 
                  onClick={() => setActiveTab('highlights')} 
                />
              </Flex>

              {/* All Responses Tab - shows blocks with transcripts in between */}
              {activeTab === 'all' && (
                <Flex flexDirection="column" gap="MD">
                  {blocks.length > 0 ? (
                    blocks.map((block, blockIndex) => {
                      // Get participant-specific transcripts
                      const participantTranscripts = MOCK_TRANSCRIPTS_BY_PARTICIPANT[selectedParticipantId] || MOCK_TRANSCRIPTS_BY_PARTICIPANT['p1'];
                      const blockTranscripts = participantTranscripts[blockIndex];
                      
                      return (
                      <div key={block.id}>
                        {/* Block card - first one is highlighted */}
                        <BlockResponseCard block={block} participantId={selectedParticipantId} isHighlighted={blockIndex === 0} />
                        
                        {/* Transcript entries after this block */}
                        {blockTranscripts && (
                          <div className="mt-3 mb-2">
                            {blockTranscripts.map((transcript, idx) => (
                              <TranscriptEntry
                                key={`transcript-${blockIndex}-${idx}`}
                                timestamp={transcript.timestamp}
                                text={transcript.text}
                                highlight={transcript.highlight}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    );})
                  ) : (
                    <Text color="default.main.secondary">No blocks to display</Text>
                  )}
                </Flex>
              )}

              {/* Highlights Tab - shows AI-generated highlights for this participant */}
              {activeTab === 'highlights' && (
                <Flex flexDirection="column" gap="MD">
                  {participantHighlights.length > 0 ? (
                    participantHighlights.map((highlight) => {
                      // Apply themes from mapping if thematic analysis has been done
                      const appliedThemes = generatedThemes.length > 0 
                        ? (PARTICIPANT_HIGHLIGHT_THEME_MAPPING[highlight.id] || [])
                        : highlight.themes;
                      
                      return (
                        <HighlightCard
                          key={highlight.id}
                          insight={highlight.insight}
                          transcript={highlight.transcript}
                          themes={appliedThemes}
                          isNew={highlight.isNew}
                        />
                      );
                    })
                  ) : (
                    <Flex 
                      alignItems="center" 
                      justifyContent="center" 
                      className="py-12 text-[#6C718C]"
                    >
                      <Text color="default.main.secondary">
                        No highlights for this participant yet
                      </Text>
                    </Flex>
                  )}
                </Flex>
              )}
            </Box>
          </Flex>
        </div>
      </Flex>
    </ScrollContainer>
  );
}

export default ParticipantResults;
