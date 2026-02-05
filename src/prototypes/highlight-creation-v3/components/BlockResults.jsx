/**
 * BlockResults Component
 * 
 * Displays results for the selected block including:
 * - Block title header with response count
 * - Chart/visualization area (placeholder)
 * - Responses table with tabs (All responses / Highlights)
 * - AI-generated highlights with new indicators
 */
import { useState, useRef } from 'react';
import { Flex, Box, Text, Heading, IconFigure, ScrollContainer, ActionButton, Icon } from '@framework/components/ariane';
import { MoreHorizontal, Filter, Play, ChevronLeft, ChevronRight, Table2, Highlighter, Tag, Info, Plus, Sparkles, X } from 'lucide-react';
import { BLOCK_TYPES } from '../data';
import { HighlightCard } from './HighlightCard';

/**
 * Mock response data by block type
 * Each block type has realistic response values
 */
const MOCK_RESPONSES_BY_TYPE = {
  prototype_test: [
    { id: 1, clipDuration: '1:23', participantId: '483697735', responseValue: 'Task completed - 47s', respondedAt: '17 Dec 2025, 06:22 pm', isNew: true },
    { id: 2, clipDuration: '2:05', participantId: '483697736', responseValue: 'Task completed - 1m 12s', respondedAt: '17 Dec 2025, 05:18 pm', isNew: true },
    { id: 3, clipDuration: '0:58', participantId: '483697737', responseValue: 'Gave up after 2 attempts', respondedAt: '17 Dec 2025, 04:54 pm', isNew: true },
    { id: 4, clipDuration: '1:45', participantId: '483697738', responseValue: 'Task completed - 1m 02s', respondedAt: '17 Dec 2025, 03:47 pm' },
    { id: 5, clipDuration: '0:42', participantId: '483697739', responseValue: 'Task completed - 38s', respondedAt: '17 Dec 2025, 02:44 pm' },
  ],
  multiple_choice: [
    { id: 1, clipDuration: '0:15', participantId: '483697735', responseValue: 'Laptop, Phone', respondedAt: '17 Dec 2025, 06:22 pm', isNew: true },
    { id: 2, clipDuration: '0:08', participantId: '483697736', responseValue: 'Phone, Tablet', respondedAt: '17 Dec 2025, 05:18 pm', isNew: true },
    { id: 3, clipDuration: '0:12', participantId: '483697737', responseValue: 'Laptop, Phone, Tablet', respondedAt: '17 Dec 2025, 04:54 pm', isNew: true },
    { id: 4, clipDuration: '0:06', participantId: '483697738', responseValue: 'Phone', respondedAt: '17 Dec 2025, 03:47 pm' },
    { id: 5, clipDuration: '0:10', participantId: '483697739', responseValue: 'Laptop', respondedAt: '17 Dec 2025, 02:44 pm' },
  ],
  input: [
    { id: 1, clipDuration: '0:45', participantId: '483697735', responseValue: 'I would add more tooltips to explain what each button does. Some icons are not intuitive.', respondedAt: '17 Dec 2025, 06:22 pm', isNew: true },
    { id: 2, clipDuration: '0:38', participantId: '483697736', responseValue: 'The search feature could be more prominent. I had trouble finding it at first.', respondedAt: '17 Dec 2025, 05:18 pm', isNew: true },
    { id: 3, clipDuration: '1:02', participantId: '483697737', responseValue: 'Overall great experience! Would love to see keyboard shortcuts for power users.', respondedAt: '17 Dec 2025, 04:54 pm', isNew: true },
    { id: 4, clipDuration: '0:28', participantId: '483697738', responseValue: 'Dark mode would be a nice addition.', respondedAt: '17 Dec 2025, 03:47 pm' },
    { id: 5, clipDuration: '0:52', participantId: '483697739', responseValue: 'The loading times could be faster when switching between sections.', respondedAt: '17 Dec 2025, 02:44 pm' },
  ],
  simple_input: [
    { id: 1, clipDuration: '0:12', participantId: '483697735', responseValue: 'sarah.johnson@gmail.com', respondedAt: '17 Dec 2025, 06:22 pm', isNew: true },
    { id: 2, clipDuration: '0:08', participantId: '483697736', responseValue: 'mike.chen@outlook.com', respondedAt: '17 Dec 2025, 05:18 pm', isNew: true },
    { id: 3, clipDuration: '0:15', participantId: '483697737', responseValue: 'emma.wilson@company.co', respondedAt: '17 Dec 2025, 04:54 pm', isNew: true },
    { id: 4, clipDuration: '0:10', participantId: '483697738', responseValue: 'alex.kumar@yahoo.com', respondedAt: '17 Dec 2025, 03:47 pm' },
    { id: 5, clipDuration: '0:09', participantId: '483697739', responseValue: 'lisa.martinez@work.io', respondedAt: '17 Dec 2025, 02:44 pm' },
  ],
  scale: [
    { id: 1, clipDuration: '0:07', participantId: '483697735', responseValue: '4 / 5', respondedAt: '17 Dec 2025, 06:22 pm', isNew: true },
    { id: 2, clipDuration: '0:05', participantId: '483697736', responseValue: '5 / 5', respondedAt: '17 Dec 2025, 05:18 pm', isNew: true },
    { id: 3, clipDuration: '0:08', participantId: '483697737', responseValue: '3 / 5', respondedAt: '17 Dec 2025, 04:54 pm', isNew: true },
    { id: 4, clipDuration: '0:06', participantId: '483697738', responseValue: '4 / 5', respondedAt: '17 Dec 2025, 03:47 pm' },
    { id: 5, clipDuration: '0:04', participantId: '483697739', responseValue: '5 / 5', respondedAt: '17 Dec 2025, 02:44 pm' },
  ],
  yesno: [
    { id: 1, clipDuration: '0:04', participantId: '483697735', responseValue: 'Yes', respondedAt: '17 Dec 2025, 06:22 pm', isNew: true },
    { id: 2, clipDuration: '0:03', participantId: '483697736', responseValue: 'No', respondedAt: '17 Dec 2025, 05:18 pm', isNew: true },
    { id: 3, clipDuration: '0:05', participantId: '483697737', responseValue: 'Yes', respondedAt: '17 Dec 2025, 04:54 pm', isNew: true },
    { id: 4, clipDuration: '0:03', participantId: '483697738', responseValue: 'Yes', respondedAt: '17 Dec 2025, 03:47 pm' },
    { id: 5, clipDuration: '0:04', participantId: '483697739', responseValue: 'No', respondedAt: '17 Dec 2025, 02:44 pm' },
  ],
  ai_conversation: [
    { id: 1, clipDuration: '2:15', participantId: '483697735', responseValue: 'The interface was intuitive but I struggled with the navigation menu. The AI helped me articulate exactly what was confusing.', respondedAt: '17 Dec 2025, 06:22 pm', isNew: true },
    { id: 2, clipDuration: '1:48', participantId: '483697736', responseValue: 'I gave a 4 because the core features work well, but loading times frustrated me during the conversation.', respondedAt: '17 Dec 2025, 05:18 pm', isNew: true },
    { id: 3, clipDuration: '3:02', participantId: '483697737', responseValue: 'The conversation helped me realize my main concern was about data security, not usability.', respondedAt: '17 Dec 2025, 04:54 pm', isNew: true },
    { id: 4, clipDuration: '1:35', participantId: '483697738', responseValue: 'Great experience overall. The AI asked follow-up questions that made me think deeper about my rating.', respondedAt: '17 Dec 2025, 03:47 pm' },
    { id: 5, clipDuration: '2:22', participantId: '483697739', responseValue: 'I appreciated being able to explain my reasoning in a conversational way rather than just selecting options.', respondedAt: '17 Dec 2025, 02:44 pm' },
  ],
  context: [
    { id: 1, clipDuration: '0:18', participantId: '483697735', responseValue: 'Read context', respondedAt: '17 Dec 2025, 06:22 pm', isNew: true },
    { id: 2, clipDuration: '0:22', participantId: '483697736', responseValue: 'Read context', respondedAt: '17 Dec 2025, 05:18 pm', isNew: true },
    { id: 3, clipDuration: '0:15', participantId: '483697737', responseValue: 'Read context', respondedAt: '17 Dec 2025, 04:54 pm', isNew: true },
    { id: 4, clipDuration: '0:20', participantId: '483697738', responseValue: 'Read context', respondedAt: '17 Dec 2025, 03:47 pm' },
    { id: 5, clipDuration: '0:17', participantId: '483697739', responseValue: 'Read context', respondedAt: '17 Dec 2025, 02:44 pm' },
  ],
};

// Fallback generic responses
const MOCK_RESPONSES_DEFAULT = [
  { id: 1, clipDuration: '0:07', participantId: '483697735', responseValue: 'Response 1', respondedAt: '17 Dec 2025, 06:22 pm', isNew: true },
  { id: 2, clipDuration: '0:12', participantId: '483697736', responseValue: 'Response 2', respondedAt: '17 Dec 2025, 05:18 pm', isNew: true },
  { id: 3, clipDuration: '0:09', participantId: '483697737', responseValue: 'Response 3', respondedAt: '17 Dec 2025, 04:54 pm', isNew: true },
  { id: 4, clipDuration: '0:15', participantId: '483697738', responseValue: 'Response 4', respondedAt: '17 Dec 2025, 03:47 pm' },
  { id: 5, clipDuration: '0:08', participantId: '483697739', responseValue: 'Response 5', respondedAt: '17 Dec 2025, 02:44 pm' },
];

/**
 * Mock highlights data - AI-generated from responses
 * Organized by block type
 */
const MOCK_HIGHLIGHTS_BY_BLOCK_TYPE = {
  prototype_test: [
    {
      id: 'h1',
      insight: "Monica is excited about the feature that automatically creates a session and captures information, making it easier to upload and analyze audio or video.",
      transcript: "Because that would make, that would be fantastic because that's one of the things w...",
      themes: [],
      isNew: true,
      participantId: '483697735',
    },
    {
      id: 'h2',
      insight: "User found the filtering feature intuitive but wished for more advanced options like date range filtering.",
      transcript: "I really like how the filters work, they're pretty intuitive. But I was looking for a way to filter by date range and couldn't find it...",
      themes: [],
      isNew: true,
      participantId: '483697736',
    },
    {
      id: 'h6',
      insight: "The navigation flow was described as intuitive and easy to follow, with clear visual hierarchy.",
      transcript: "I really liked how the navigation was laid out. Everything felt like it was where I expected it to be...",
      themes: [],
      isNew: false,
      participantId: '483697738',
    },
    {
      id: 'h7',
      insight: "Mobile responsiveness was praised, with the layout adapting well to smaller screens.",
      transcript: "Even on my phone, the experience was smooth. The buttons were easy to tap and nothing felt cramped...",
      themes: [],
      isNew: false,
      participantId: '483697739',
    },
  ],
  scale: [
    {
      id: 'h3',
      insight: "Participant gave a high rating but mentioned the learning curve was steeper than expected initially.",
      transcript: "I'd give it an 8 out of 10. It's really powerful once you get the hang of it, but it took me a bit to understand all the features...",
      themes: [],
      isNew: true,
      participantId: '483697737',
    },
    {
      id: 'h8',
      insight: "High satisfaction scores were correlated with users who had prior experience with similar tools.",
      transcript: "Since I've used similar products before, this felt very familiar. I'd rate it quite highly...",
      themes: [],
      isNew: false,
      participantId: '483697735',
    },
  ],
  input: [
    {
      id: 'h4',
      insight: "Users consistently mention wanting better onboarding documentation and tooltips for complex features.",
      transcript: "I think the main improvement would be having more tooltips or a guided tour when you first start. Some features are hidden and not obvious...",
      themes: [],
      isNew: true,
      participantId: '483697738',
    },
    {
      id: 'h5',
      insight: "Multiple participants expressed desire for keyboard shortcuts to speed up their workflow.",
      transcript: "If there were keyboard shortcuts for the common actions, that would save me a lot of time. Right now I have to click through menus...",
      themes: [],
      isNew: true,
      participantId: '483697739',
    },
  ],
};

/**
 * Get participant IDs that have highlights for a specific block type
 */
const getParticipantsWithHighlights = (blockType) => {
  const highlights = MOCK_HIGHLIGHTS_BY_BLOCK_TYPE[blockType] || [];
  return new Set(highlights.map(h => h.participantId));
};

/**
 * Response table tab button - Inter 16px font
 * Badge logic: 0 highlights = grey "0", N highlights = grey "N", N highlights with new = purple "N" with sparkle
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
 * Video thumbnail with play overlay and duration badge
 */
function VideoThumbnail({ duration }) {
  return (
    <div className="relative w-[100px] h-[56px] rounded-lg overflow-hidden bg-neutral-300">
      {/* Placeholder thumbnail */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-400 to-neutral-500" />
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
          <Play size={14} className="text-neutral-700 ml-0.5" fill="currentColor" />
        </div>
      </div>
      {/* Duration badge */}
      <div className="absolute bottom-1 right-1 flex items-center gap-1 bg-[#2a2a2a]/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
        <Play size={10} fill="white" />
        <span>{duration}</span>
      </div>
    </div>
  );
}

/**
 * Response List Item for Split Panel (V3 approach)
 * Compact list item for left panel in split view
 */
function ResponseListItem({ response, isSelected, onClick, hasHighlight }) {
  return (
    <div 
      className={`p-3 border-b border-[rgba(108,113,140,0.12)] cursor-pointer transition-colors ${
        isSelected ? 'bg-[#F0FAFF] border-l-2 border-l-[#0568FD]' : 'hover:bg-neutral-50'
      }`}
      onClick={onClick}
    >
      <Flex alignItems="center" gap="SM">
        <div className="w-16 h-10 bg-neutral-900 rounded relative flex-shrink-0">
          <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1 rounded">
            {response.clipDuration}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <Flex alignItems="center" gap="XS" className="mb-0.5">
            <Text className="text-[#0568FD] font-medium text-sm">{response.participantId}</Text>
            {hasHighlight && <Highlighter size={12} className="text-[#7C3AED]" />}
          </Flex>
          <Text className="text-sm text-neutral-600 truncate">{response.responseValue}</Text>
        </div>
      </Flex>
    </div>
  );
}

/**
 * Response Detail Panel for Split Panel (V3 approach)
 * Right panel showing video, transcript, and highlight tools
 */
function ResponseDetailPanel({ response, blockType, onCreateHighlight }) {
  const [selectedText, setSelectedText] = useState('');
  const [note, setNote] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showHighlightForm, setShowHighlightForm] = useState(false);
  const transcriptRef = useRef(null);

  // Early return if no response selected
  if (!response) {
    return (
      <Flex alignItems="center" justifyContent="center" className="h-full bg-neutral-50 rounded-lg">
        <div className="text-center">
          <Highlighter size={32} className="text-[#6C718C] mx-auto mb-2" />
          <Text color="default.main.secondary">Select a response to view details</Text>
          <Text color="default.main.secondary" className="text-sm mt-1">
            You can create highlights from the transcript
          </Text>
        </div>
      </Flex>
    );
  }
  
  // Mock full transcript
  const fullTranscript = blockType === 'input' || blockType === 'ai_conversation' 
    ? `"${response.responseValue}" I found the overall experience quite intuitive. The navigation was clear, though I had some trouble finding the settings menu at first. Once I figured that out, everything else made sense. I particularly liked how the feedback was immediate when I made changes. The onboarding flow was smooth and I didn't feel overwhelmed at any point.`
    : response.responseValue;

  const handleTextSelect = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    if (text && text.length > 5) {
      setSelectedText(text);
      setShowHighlightForm(true);
    }
  };

  const handleGenerateNote = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setNote(`The participant highlights "${selectedText.slice(0, 40)}..." as a key insight about their product experience.`);
      setIsGenerating(false);
    }, 1000);
  };

  const resetForm = () => {
    setShowHighlightForm(false);
    setSelectedText('');
    setNote('');
    window.getSelection()?.removeAllRanges();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <Flex alignItems="center" justifyContent="space-between" className="pb-4 border-b border-[rgba(108,113,140,0.16)]">
        <Flex alignItems="center" gap="SM">
          <Text className="text-[#0568FD] font-semibold">{response.participantId}</Text>
          <Text color="default.main.secondary" className="text-sm">{response.respondedAt}</Text>
        </Flex>
        <ActionButton emphasis="tertiary" size="SM" icon={<Icon name="share" />} iconOnly />
      </Flex>
      
      {/* Video Player */}
      <div className="py-4">
        <div className="aspect-video bg-neutral-900 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
              <Play size={24} className="text-white ml-1" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-center gap-2">
              <div className="h-1 flex-1 bg-white/30 rounded-full">
                <div className="h-full w-1/3 bg-white rounded-full" />
              </div>
              <Text className="text-white text-xs">{response.clipDuration}</Text>
            </div>
          </div>
        </div>
        <Text color="default.main.secondary" className="text-xs mt-2">
          Drag on timeline to select video portion for highlight
        </Text>
      </div>
      
      {/* Transcript */}
      <div className="flex-1 overflow-auto">
        <Flex alignItems="center" justifyContent="space-between" className="mb-2">
          <Text className="font-semibold">Transcript</Text>
          <Text color="default.main.secondary" className="text-xs">Select text to create highlight</Text>
        </Flex>
        <div 
          ref={transcriptRef}
          className="p-4 bg-neutral-50 rounded-lg border border-[rgba(108,113,140,0.16)] cursor-text select-text"
          onMouseUp={handleTextSelect}
        >
          <Text className="text-neutral-700 leading-relaxed">{fullTranscript}</Text>
        </div>
      </div>
      
      {/* Highlight Creation Form */}
      {showHighlightForm && (
        <div className="mt-4 bg-[#F9F7FF] rounded-lg p-4 border border-[#6B5BEE]/20">
          <Flex alignItems="center" justifyContent="space-between" className="mb-3">
            <Flex alignItems="center" gap="XS">
              <Highlighter size={16} className="text-[#6B5BEE]" />
              <Text className="font-semibold">Create Highlight</Text>
            </Flex>
            <button onClick={resetForm} className="text-[#6C718C] hover:text-neutral-900 p-1">
              <X size={16} />
            </button>
          </Flex>
          
          <div className="border-l-2 border-[#6B5BEE] pl-3 mb-3 bg-white/50 py-2 rounded-r">
            <Text className="text-sm italic text-neutral-700">"{selectedText}"</Text>
          </div>
          
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note describing why this is important..."
            className="w-full p-3 border border-[rgba(108,113,140,0.28)] rounded-lg text-sm resize-none h-16 mb-3 bg-white"
          />
          
          <Flex alignItems="center" justifyContent="space-between">
            <ActionButton 
              emphasis="secondary" 
              size="SM" 
              icon={<Sparkles size={14} />}
              onClick={handleGenerateNote}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate with AI'}
            </ActionButton>
            <ActionButton 
              emphasis="primary" 
              size="SM" 
              onClick={() => {
                onCreateHighlight(selectedText, note);
                resetForm();
              }}
            >
              Create Highlight
            </ActionButton>
          </Flex>
        </div>
      )}
    </div>
  );
}

/**
 * Split Panel View for Open Question blocks (V3 approach)
 * Left: Response list, Right: Detail panel with video/transcript/highlight tools
 */
function SplitPanelView({ responses, selectedResponse, onSelectResponse, blockType, onCreateHighlight, participantsWithHighlights }) {
  return (
    <div className="flex gap-4 h-[500px]">
      {/* Left Panel - Response List */}
      <div className="w-[320px] flex-shrink-0 border border-[rgba(108,113,140,0.28)] rounded-lg overflow-hidden">
        <div className="bg-[#F8F8FB] px-4 py-3 border-b border-[rgba(108,113,140,0.16)]">
          <Text className="text-sm font-semibold text-[#6C718C]">RESPONSES ({responses.length})</Text>
        </div>
        <ScrollContainer className="h-[calc(100%-48px)]">
          {responses.map((response) => (
            <ResponseListItem
              key={response.id}
              response={response}
              isSelected={selectedResponse?.id === response.id}
              onClick={() => onSelectResponse(response)}
              hasHighlight={participantsWithHighlights.has(response.participantId)}
            />
          ))}
        </ScrollContainer>
      </div>
      
      {/* Right Panel - Detail View */}
      <div className="flex-1 border border-[rgba(108,113,140,0.28)] rounded-lg p-4">
        <ResponseDetailPanel 
          response={selectedResponse}
          blockType={blockType}
          onCreateHighlight={onCreateHighlight}
        />
      </div>
    </div>
  );
}

/**
 * Response table row (for non-Open Question blocks)
 * hasHighlight: shows highlight icon signifier
 * hideResponse: for context blocks that don't have a response column
 */
function ResponseRow({ clipDuration, participantId, responseValue, respondedAt, hasHighlight = false, hideResponse = false }) {
  return (
    <div className="flex items-center py-4 border-b border-[rgba(108,113,140,0.12)] hover:bg-neutral-50">
      <div className="w-[140px] px-4 relative">
        <VideoThumbnail duration={clipDuration} />
      </div>
      <div className="w-[160px] px-4">
        <Flex alignItems="center" gap="XS">
          <Text className="text-[#0568FD] font-medium">{participantId}</Text>
          {hasHighlight && (
            <Highlighter size={14} className="text-[#7C3AED]" />
          )}
        </Flex>
      </div>
      {!hideResponse && (
        <div className="flex-1 px-4">
          <Text className="text-neutral-900">{responseValue}</Text>
        </div>
      )}
      <div className={`${hideResponse ? 'flex-1' : 'w-[180px]'} px-4`}>
        <Text color="default.main.secondary">{respondedAt}</Text>
      </div>
      <div className="w-[80px] px-4 flex justify-center">
        <ActionButton emphasis="tertiary" size="SM" icon={<Icon name="share" />} iconOnly />
      </div>
    </div>
  );
}

/**
 * Theme row for the themes table
 */
function ThemeRow({ theme, frequency, percentage }) {
  return (
    <div className="flex items-center py-4 border-b border-[rgba(108,113,140,0.12)] hover:bg-neutral-50 group">
      <div className="flex-1 px-4">
        <Flex alignItems="center" gap="SM">
          <div 
            className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${theme.color}15` }}
          >
            <Tag size={14} style={{ color: theme.color }} />
          </div>
          <Text className="text-neutral-900">{theme.name}</Text>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 bg-neutral-900 text-white text-xs rounded">
            View details
          </span>
        </Flex>
      </div>
      <div className="w-[200px] px-4">
        <Text className="text-neutral-900">
          {frequency} <span className="text-[#6C718C]">({percentage}%)</span>
        </Text>
      </div>
      <div className="w-[80px] px-4 flex justify-end">
        <ActionButton emphasis="tertiary" size="SM" icon={<MoreHorizontal size={16} />} iconOnly />
      </div>
    </div>
  );
}

/**
 * BlockResults - Main results display component
 * @param {Object} props.block - The block to display
 * @param {boolean} props.isViewed - Whether the block has been viewed (hides new highlights indicators)
 * @param {Array} props.generatedThemes - AI-generated themes after analysis
 * @param {Function} props.onNavigateToThemes - Callback to navigate to thematic analysis
 */
export function BlockResults({ block, isViewed = false, generatedThemes = [], onNavigateToThemes }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedResponse, setSelectedResponse] = useState(null);
  
  if (!block) {
    return (
      <Flex alignItems="center" justifyContent="center" className="h-full">
        <Text color="default.main.secondary">Select a block to view results</Text>
      </Flex>
    );
  }

  const blockTypeData = BLOCK_TYPES[block.type] || {};
  const isOpenQuestion = block.type === 'input' || block.type === 'ai_conversation';
  
  // Get responses for this specific block type
  const blockResponses = MOCK_RESPONSES_BY_TYPE[block.type] || MOCK_RESPONSES_DEFAULT;
  const responseCount = blockResponses.length;
  
  // Get highlights for this specific block type
  const blockHighlights = MOCK_HIGHLIGHTS_BY_BLOCK_TYPE[block.type] || [];
  const highlightCount = blockHighlights.length;
  // Hide "new" indicators if the block has been viewed
  const newHighlightCount = isViewed ? 0 : blockHighlights.filter(h => h.isNew).length;
  
  // Check if this block type has highlights (and thus should show themes)
  const hasHighlights = highlightCount > 0;
  // Only show themes section in Open Question (input) block
  const showThemesSection = block.type === 'input' && generatedThemes.length > 0;

  return (
    <ScrollContainer className="h-full">
      <Flex flexDirection="column" className="p-6">
        {/* Filter Bar */}
        <Flex alignItems="center" className="mb-6">
          <ActionButton emphasis="secondary" size="SM" icon={<Filter size={16} />}>
            Add filters
          </ActionButton>
        </Flex>

        {/* Block Header */}
        <Flex alignItems="flex-start" justifyContent="space-between" className="mb-6">
          <Flex alignItems="center" gap="MD">
            <IconFigure 
              name={blockTypeData.iconName || 'question'} 
              color={blockTypeData.arianeColor || 'neutral'} 
              size="LG" 
              mode="dark"
              shape="squared"
            />
            <div>
              <Heading level={2} className="mb-1">
                {block.title || 'Block title'}
              </Heading>
              <Text color="default.main.secondary" className="text-sm">
                {blockTypeData.name || 'Block type'}
              </Text>
            </div>
          </Flex>
          
          <Flex alignItems="center" gap="MD">
            <Flex flexDirection="column" alignItems="center" className="px-4 py-2 border border-[rgba(108,113,140,0.16)] rounded-lg">
              <Text className="text-xl font-semibold">{responseCount}</Text>
              <Text color="default.main.secondary" className="text-sm">responses</Text>
            </Flex>
            <button className="p-2 hover:bg-neutral-100 rounded cursor-pointer">
              <MoreHorizontal size={20} className="text-[#6C718C]" />
            </button>
          </Flex>
        </Flex>

        {/* Chart Placeholder */}
        <Box className="bg-[#f8f8fb] rounded-lg h-[200px] mb-8" />

        {/* Themes Empty State - shown only for Open Question (input) block before analysis */}
        {block.type === 'input' && !showThemesSection && (
          <div className="mb-8">
            <Flex alignItems="center" gap="SM" className="mb-4">
              <Heading level={3}>Themes</Heading>
              <button className="text-[#6C718C] hover:text-[#535a74]">
                <Info size={16} />
              </button>
            </Flex>
            <div className="rounded-lg p-8 bg-white shadow-[inset_0px_0px_0px_0.5px_rgba(108,113,140,0.28)]">
              <Flex flexDirection="column" alignItems="center" justifyContent="center" gap="MD" className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#7C3AED]/10 flex items-center justify-center">
                  <Sparkles size={24} className="text-[#7C3AED]" />
                </div>
                <div className="flex flex-col items-center">
                  <Text className="font-medium text-neutral-900 mb-1 block">Discover recurring themes</Text>
                  <Text color="default.main.secondary" className="text-sm block max-w-[320px]">
                    Run thematic analysis to automatically identify patterns and recurring themes across your responses.
                  </Text>
                </div>
                <ActionButton 
                  emphasis="secondary" 
                  size="SM" 
                  icon={<Sparkles size={16} />}
                  onClick={onNavigateToThemes}
                >
                  Start thematic analysis
                </ActionButton>
              </Flex>
            </div>
          </div>
        )}

        {/* Themes Section - only shown when analysis is complete and block has highlights */}
        {showThemesSection && (
          <div className="mb-8">
            <Flex alignItems="center" justifyContent="space-between" className="mb-4">
              <Flex alignItems="center" gap="SM">
                <Heading level={3}>Themes</Heading>
                <button className="text-[#6C718C] hover:text-[#535a74]">
                  <Info size={16} />
                </button>
              </Flex>
              <Flex alignItems="center" gap="SM">
                <ActionButton emphasis="secondary" size="SM" icon={<Plus size={16} />}>
                  Create theme
                </ActionButton>
                <ActionButton emphasis="primary" size="SM" icon={<Tag size={16} />}>
                  Find themes with AI
                </ActionButton>
              </Flex>
            </Flex>

            {/* Themes Table */}
            <div className="border border-[rgba(108,113,140,0.16)] rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="flex items-center py-3 bg-[#F8F8FB] text-xs font-semibold text-[#6C718C] uppercase tracking-wide">
                <div className="flex-1 px-4">NAME</div>
                <div className="w-[200px] px-4">FREQUENCY</div>
                <div className="w-[80px] px-4 text-right">ACTIONS</div>
              </div>

              {/* Theme Rows - show themes relevant to this block */}
              {generatedThemes.slice(0, 4).map((theme, index) => (
                <ThemeRow 
                  key={theme.id}
                  theme={theme}
                  frequency={theme.highlightCount}
                  percentage={Math.round((theme.highlightCount / 8) * 100)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Responses Section */}
        <div>
          <Heading level={3} className="mb-4">Responses</Heading>
          
          {/* Tabs and Share */}
          <Flex alignItems="center" justifyContent="space-between" className="border-b border-[rgba(108,113,140,0.16)] mb-4">
            <Flex>
              <ResponseTab 
                icon={Table2} 
                label="All Responses" 
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
            <ActionButton emphasis="tertiary" size="SM" icon={<Icon name="share" />}>
              Share
            </ActionButton>
          </Flex>

          {/* All Responses Tab Content */}
          {activeTab === 'all' && (
            <>
              {/* V3: Use Split Panel View for Open Question blocks */}
              {isOpenQuestion ? (
                <SplitPanelView
                  responses={blockResponses}
                  selectedResponse={selectedResponse}
                  onSelectResponse={setSelectedResponse}
                  blockType={block.type}
                  onCreateHighlight={(text, note) => {
                    console.log('Creating highlight:', { text, note, responseId: selectedResponse?.id });
                  }}
                  participantsWithHighlights={getParticipantsWithHighlights(block.type)}
                />
              ) : (
                <>
                  {/* Table Header - grey background */}
                  <div className="flex items-center py-3 bg-[#F8F8FB] rounded-t-lg text-xs font-semibold text-[#6C718C] uppercase tracking-wide">
                    <div className="w-[140px] px-4">CLIPS</div>
                    <div className="w-[160px] px-4">PARTICIPANT</div>
                    {block.type !== 'context' && <div className="flex-1 px-4">RESPONSE</div>}
                    <div className={`${block.type === 'context' ? 'flex-1' : 'w-[180px]'} px-4`}>RESPONDED AT</div>
                    <div className="w-[80px] px-4 text-center">ACTIONS</div>
                  </div>

                  {/* Table Rows */}
                  {blockResponses.map((response) => {
                    const participantsWithHighlights = getParticipantsWithHighlights(block.type);
                    return (
                      <ResponseRow 
                        key={response.id}
                        clipDuration={response.clipDuration}
                        participantId={response.participantId}
                        responseValue={response.responseValue}
                        respondedAt={response.respondedAt}
                        hasHighlight={participantsWithHighlights.has(response.participantId)}
                        hideResponse={block.type === 'context'}
                      />
                    );
                  })}

                  {/* Pagination - using ActionButton/Tertiary */}
                  <Flex alignItems="center" justifyContent="center" gap="MD" className="py-4">
                    <ActionButton emphasis="tertiary" size="SM" icon={<ChevronLeft size={16} />} iconOnly />
                    <Text color="default.main.secondary" className="text-sm">
                      Page 1 of 2
                    </Text>
                    <ActionButton emphasis="tertiary" size="SM" icon={<ChevronRight size={16} />} iconOnly />
                  </Flex>
                </>
              )}
            </>
          )}

          {/* Highlights Tab Content */}
          {activeTab === 'highlights' && (
            <Flex flexDirection="column" gap="MD">
              {blockHighlights.length > 0 ? (
                blockHighlights.map((highlight) => (
                  <HighlightCard
                    key={highlight.id}
                    insight={highlight.insight}
                    transcript={highlight.transcript}
                    themes={highlight.themes}
                    isNew={isViewed ? false : highlight.isNew}
                    participantId={highlight.participantId}
                  />
                ))
              ) : (
                <Flex 
                  alignItems="center" 
                  justifyContent="center" 
                  className="py-12 text-[#6C718C]"
                >
                  <Text color="default.main.secondary">
                    No highlights generated for this block yet
                  </Text>
                </Flex>
              )}
            </Flex>
          )}
        </div>
      </Flex>
    </ScrollContainer>
  );
}

export default BlockResults;
