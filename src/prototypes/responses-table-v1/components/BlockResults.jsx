/**
 * BlockResults Component
 * 
 * Displays results for the selected block including:
 * - Block title header with response count
 * - Chart/visualization area (placeholder)
 * - Responses table with tabs (All responses / Highlights)
 * - AI-generated highlights with new indicators
 */
import { useState, useRef, useEffect } from 'react';
import { Flex, Box, Text, Heading, IconFigure, ScrollContainer, ActionButton, CTAButton, Icon, Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@framework/components/ariane';
import { MoreHorizontal, Filter, Play, ChevronLeft, ChevronRight, Table2, Highlighter, Tag, Info, Plus, Sparkles, Pencil } from 'lucide-react';
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
    { id: 1, clipDuration: '0:45', participantId: '483697735', responseValue: 'I would add more tooltips to explain what each button does. Some icons are not intuitive and I had to guess what they meant.', respondedAt: '17 Dec 2025, 06:22 pm', isNew: true, highlightedText: 'more tooltips to explain what each button does' },
    { id: 2, clipDuration: null, participantId: '483697736', responseValue: 'The search feature could be more prominent. I had trouble finding it at first but once I did it worked great.', respondedAt: '17 Dec 2025, 05:18 pm', isNew: true },
    { id: 3, clipDuration: '1:02', participantId: '483697737', responseValue: 'Overall great experience! Would love to see keyboard shortcuts for power users to speed up common actions.', respondedAt: '17 Dec 2025, 04:54 pm', isNew: true, highlightedText: 'keyboard shortcuts for power users' },
    { id: 4, clipDuration: null, participantId: '483697738', responseValue: 'Dark mode would be a nice addition. My eyes get tired when using the app at night.', respondedAt: '17 Dec 2025, 03:47 pm' },
    { id: 5, clipDuration: '0:52', participantId: '483697739', responseValue: 'The loading times could be faster when switching between sections. Sometimes it takes a few seconds which breaks my flow.', respondedAt: '17 Dec 2025, 02:44 pm' },
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
  ai_conversation: [
    { id: 1, clipDuration: '2:15', participantId: '483697735', responseValue: 'I gave a 4 because the core features are great but some things were confusing.\n\n**Interviewer:** What specifically felt confusing to you?\n\nMainly the navigation menu. I couldn\'t find the settings at first and had to click around a lot before finding it hidden in a dropdown.\n\n**Interviewer:** Did this affect how you completed your tasks?\n\nYes, it slowed me down quite a bit. I think if the settings were more visible, it would save a lot of time.', respondedAt: '17 Dec 2025, 06:22 pm', isNew: true, highlightedText: 'find the settings at first and had to click around a lot before finding it hidden in a dropdown' },
    { id: 2, clipDuration: '1:48', participantId: '483697736', responseValue: 'The loading times were frustrating, especially when switching between sections.\n\n**Interviewer:** How long did you typically wait?\n\nProbably 3-4 seconds each time. It doesn\'t sound like much but when you\'re doing it repeatedly, it really adds up.\n\n**Interviewer:** Did this impact your overall impression of the product?\n\nDefinitely. Everything else felt polished but the slowness made it feel unfinished.', respondedAt: '17 Dec 2025, 05:18 pm', isNew: true, highlightedText: 'Everything else felt polished but the slowness made it feel unfinished' },
    { id: 3, clipDuration: '3:02', participantId: '483697737', responseValue: 'I rated it a 3 because I have some concerns.\n\n**Interviewer:** What concerns do you have?\n\nMostly about data security. I wasn\'t sure where my data was being stored or who had access to it.\n\n**Interviewer:** Were you looking for this information somewhere specific?\n\nI checked the footer and the settings but couldn\'t find a clear privacy policy or data handling explanation. That made me hesitant to add any real information.', respondedAt: '17 Dec 2025, 04:54 pm', isNew: true, highlightedText: 'couldn\'t find a clear privacy policy or data handling explanation' },
    { id: 4, clipDuration: '1:35', participantId: '483697738', responseValue: 'I loved the overall experience! It felt very intuitive.\n\n**Interviewer:** What made it feel intuitive for you?\n\nThe visual hierarchy was clear. I always knew what to do next without reading any instructions.\n\n**Interviewer:** Was there anything that could be improved?\n\nMaybe adding keyboard shortcuts for power users. Once I got familiar with it, I wanted to go faster.', respondedAt: '17 Dec 2025, 03:47 pm' },
    { id: 5, clipDuration: '2:22', participantId: '483697739', responseValue: 'I prefer this conversational approach over surveys.\n\n**Interviewer:** Why do you prefer conversations?\n\nI can explain the nuances of my thinking. With multiple choice, I often feel like none of the options quite fit.\n\n**Interviewer:** Can you give an example of something you explained here that you couldn\'t in a survey?\n\nLike how I both love and find issues with the same feature. The filter works great but is hard to discover. A survey would make me choose positive or negative.', respondedAt: '17 Dec 2025, 02:44 pm' },
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
 * Mapping of highlight IDs to their assigned themes (after thematic analysis)
 * This simulates the result of AI categorization
 */
const HIGHLIGHT_THEME_MAPPING = {
  'h1': ['Navigation and discoverability needs improvement'],
  'h2': ['Filter functionality is intuitive but limited'],
  'h3': ['Learning curve steeper than expected'],
  'h4': ['Onboarding and documentation gaps identified'],
  'h5': ['Power users want keyboard shortcuts'],
  'h6': ['Navigation and discoverability needs improvement'],
  'h7': ['Mobile experience praised for responsiveness'],
  'h8': ['Onboarding and documentation gaps identified'],
  'h9': ['Navigation and discoverability needs improvement'],
  'h10': ['Performance concerns affecting user perception'],
  'h11': ['Data security and privacy concerns'],
};

// Import centralized theme colors
import { THEME_COLOR_MAP } from './ThemeResults';

// Alias for backwards compatibility
const THEME_COLORS = THEME_COLOR_MAP;

// Default colors for highlights without themes
const DEFAULT_HIGHLIGHT_COLORS = { bg: '#F3F4F6', hoverBg: '#E5E7EB' }; // Gray

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
      insight: "User wants better visual cues for icon meanings, suggesting tooltips would improve discoverability.",
      transcript: "more tooltips to explain what each button does",
      themes: [],
      isNew: true,
      participantId: '483697735',
    },
    {
      id: 'h5',
      insight: "Power users would benefit from keyboard shortcuts to speed up their workflow.",
      transcript: "keyboard shortcuts for power users",
      themes: [],
      isNew: true,
      participantId: '483697737',
    },
  ],
  ai_conversation: [
    {
      id: 'h9',
      insight: "Navigation and settings discoverability is a major pain point affecting task completion time.",
      transcript: "I couldn't find the settings at first and had to click around a lot before finding it hidden in a dropdown",
      themes: [],
      isNew: true,
      participantId: '483697735',
    },
    {
      id: 'h10',
      insight: "Loading times between sections create friction and make the product feel unpolished.",
      transcript: "Everything else felt polished but the slowness made it feel unfinished",
      themes: [],
      isNew: true,
      participantId: '483697736',
    },
    {
      id: 'h11',
      insight: "Data security concerns are blocking users from adding real information to the product.",
      transcript: "I checked the footer and the settings but couldn't find a clear privacy policy or data handling explanation",
      themes: [],
      isNew: false,
      participantId: '483697737',
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
 * Shows empty state when no video is available
 */
function VideoThumbnail({ duration }) {
  // No video - show empty state
  if (!duration) {
    return (
      <div className="relative w-[100px] h-[56px] rounded-lg overflow-hidden bg-neutral-100 border border-dashed border-neutral-300 flex items-center justify-center">
        <div className="text-center">
          <Play size={16} className="text-neutral-400 mx-auto" />
          <span className="text-[10px] text-neutral-400 mt-0.5 block">No video</span>
        </div>
      </div>
    );
  }

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
 * Highlight View Popover
 * Shows existing highlight details: insight, transcript, themes
 */
function HighlightViewPopover({ highlight, clipDuration, themes, position, onClose }) {
  return (
    <div 
      className="absolute z-50 bg-white rounded-xl shadow-lg border border-[rgba(108,113,140,0.16)] p-4 w-[420px]"
      style={{ top: position?.top ? `${position.top}px` : 0, left: position?.left ? `${position.left}px` : 0 }}
    >
      {/* Insight/Note at top */}
      <div className="mb-4">
        <Text className="text-neutral-900">{highlight?.insight || 'No insight available'}</Text>
      </div>
      
      {/* Transcript quote with video thumbnail (if available) */}
      <div className="bg-neutral-50 rounded-lg p-4 mb-4">
        <Flex gap="MD" alignItems="flex-start">
          <Text className="flex-1 text-neutral-700 text-sm">{highlight?.transcript || ''}</Text>
          {clipDuration && (
            <div className="flex-shrink-0 relative w-[100px] h-[60px] rounded-lg overflow-hidden bg-neutral-200">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-300 to-neutral-400" />
              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {clipDuration}
              </div>
            </div>
          )}
        </Flex>
      </div>
      
      {/* Themes tags */}
      {themes && themes.length > 0 && (
        <div className="mb-4">
          <Text className="text-sm font-medium text-neutral-500 mb-2">Themes</Text>
          <Flex gap="XS" className="flex-wrap">
            {themes.map((theme, i) => (
              <span 
                key={i}
                className="px-2 py-1 text-xs rounded-full"
                style={{ backgroundColor: THEME_COLORS[theme]?.bg || '#F3F4F6' }}
              >
                {theme}
              </span>
            ))}
          </Flex>
        </div>
      )}
      
      {/* Action buttons */}
      <Flex alignItems="center" justifyContent="flex-end" gap="SM">
        <ActionButton 
          emphasis="tertiary" 
          size="SM"
          onClick={onClose}
        >
          Close
        </ActionButton>
        <ActionButton 
          emphasis="secondary" 
          size="SM" 
          icon={<Pencil size={14} />}
        >
          Edit
        </ActionButton>
      </Flex>
    </div>
  );
}

/**
 * Highlight Creation Popover
 * Matches the design from the screenshot: note input on top, transcript quote with video below
 */
function HighlightPopover({ selectedText, clipDuration, onCreateHighlight, onClose, position }) {
  const [note, setNote] = useState('');

  return (
    <div 
      className="absolute z-50 bg-white rounded-xl shadow-lg border border-[rgba(108,113,140,0.16)] p-4 w-[420px]"
      style={{ top: position?.top ? `${position.top}px` : 0, left: position?.left ? `${position.left}px` : 0 }}
    >
      {/* Note input at top with blue border when focused */}
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write a note..."
        className="w-full p-3 border-2 border-[#0568FD] rounded-lg text-sm resize-none h-16 mb-4 focus:outline-none"
        autoFocus
      />
      
      {/* Selected transcript quote with video thumbnail (if available) */}
      <div className="bg-neutral-50 rounded-lg p-4 mb-4">
        <Flex gap="MD" alignItems="flex-start">
          <Text className="flex-1 text-neutral-700">{selectedText}</Text>
          {/* Mini video thumbnail with timestamp - only if there's a video */}
          {clipDuration && (
            <div className="flex-shrink-0 relative w-[100px] h-[60px] rounded-lg overflow-hidden bg-neutral-200">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-300 to-neutral-400" />
              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {clipDuration}
              </div>
            </div>
          )}
        </Flex>
      </div>
      
      {/* Action buttons */}
      <Flex alignItems="center" justifyContent="space-between">
        <ActionButton 
          emphasis="secondary" 
          size="SM" 
          icon={<Tag size={14} />}
        >
          Add themes
        </ActionButton>
        <CTAButton 
          emphasis="primary" 
          size="SM"
          onClick={() => onCreateHighlight(selectedText, note)}
        >
          Add highlight
        </CTAButton>
      </Flex>
    </div>
  );
}

/**
 * Response Card Component
 * Stacked transcript-style card for displaying responses (replaces table rows)
 * Consistent with participant view transcript entries
 */
function ResponseCard({ response, blockType, hasHighlight = false, isOpenQuestion = false, onNavigateToParticipant, generatedThemes = [] }) {
  const [selectedText, setSelectedText] = useState('');
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState(null);
  const [isViewingExistingHighlight, setIsViewingExistingHighlight] = useState(false);
  const cardRef = useRef(null);
  const popoverRef = useRef(null);
  const highlightRef = useRef(null);

  // Click outside and ESC key to close popover
  useEffect(() => {
    if (!showPopover) return;
    
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        closePopover();
      }
    };
    
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closePopover();
      }
    };
    
    // Delay adding click listener to avoid immediate close from the selection click
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);
    
    // Add ESC key listener immediately
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showPopover]);

  const handleMouseUp = () => {
    if (!isOpenQuestion) return;
    
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    
    if (text && text.length > 5) {
      // Get selection position to place popover below the selected text
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const cardRect = cardRef.current?.getBoundingClientRect();
      
      // Clear browser selection so our custom rendering takes over
      selection.removeAllRanges();
      
      setSelectedText(text);
      
      if (cardRect) {
        // Position popover below the selection, relative to the card
        setPopoverPosition({
          top: rect.bottom - cardRect.top + 8,
          left: rect.left - cardRect.left,
        });
      }
      setShowPopover(true);
    }
  };

  const handleCreateHighlight = (text, note) => {
    console.log('Creating highlight:', { text, note, responseId: response.id });
    setShowPopover(false);
    setSelectedText('');
    window.getSelection()?.removeAllRanges();
  };

  const closePopover = () => {
    setShowPopover(false);
    setSelectedText('');
    setIsViewingExistingHighlight(false);
    window.getSelection()?.removeAllRanges();
  };

  const hasVideo = response.clipDuration !== null;

  // Render a word with hover effect for selectable text
  const renderSelectableWord = (word, key) => {
    if (!isOpenQuestion) return word;
    return (
      <span 
        key={key} 
        className="hover:bg-[#E8F4FF] rounded transition-colors duration-100"
      >
        {word}
      </span>
    );
  };

  // Split text into words while preserving spaces for hover effect
  const renderWordsWithHover = (text) => {
    if (!isOpenQuestion) return text;
    // Split by word boundaries but keep spaces
    const parts = text.split(/(\s+)/);
    return parts.map((part, i) => {
      if (part.match(/^\s+$/)) return part; // Keep spaces as-is
      return renderSelectableWord(part, i);
    });
  };

  // Render active selection with blue background
  const renderActiveSelection = (text) => {
    return (
      <span className="bg-[#0568FD] text-white px-0.5 rounded-sm">{text}</span>
    );
  };

  // Find the highlight that matches this response's highlighted text
  const findMatchingHighlight = () => {
    const highlightText = response.highlightedText;
    if (!highlightText) return null;
    
    const allHighlights = Object.values(MOCK_HIGHLIGHTS_BY_BLOCK_TYPE).flat();
    // Match by participant AND transcript content
    return allHighlights.find(h => 
      h.participantId === response.participantId && 
      (h.transcript === highlightText || 
       highlightText.includes(h.transcript) || 
       h.transcript?.includes(highlightText))
    );
  };

  // Get highlight colors based on theme assignment
  const getHighlightColors = () => {
    const matchingHighlight = findMatchingHighlight();
    if (!matchingHighlight) return DEFAULT_HIGHLIGHT_COLORS;
    
    // If thematic analysis hasn't been done, use gray
    if (generatedThemes.length === 0) {
      return DEFAULT_HIGHLIGHT_COLORS;
    }
    
    // Get themes for this highlight
    const themes = HIGHLIGHT_THEME_MAPPING[matchingHighlight.id] || [];
    
    if (themes.length > 0) {
      // Use the first theme's color
      return THEME_COLORS[themes[0]] || DEFAULT_HIGHLIGHT_COLORS;
    }
    
    return DEFAULT_HIGHLIGHT_COLORS;
  };

  // Find the highlight data for this response
  const getHighlightData = () => {
    return findMatchingHighlight();
  };

  // Handle click on existing highlight
  const handleHighlightClick = (e, text) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const cardRect = cardRef.current?.getBoundingClientRect();
    
    setSelectedText(text);
    setIsViewingExistingHighlight(true);
    
    if (cardRect) {
      setPopoverPosition({
        top: rect.bottom - cardRect.top + 8,
        left: rect.left - cardRect.left,
      });
    }
    setShowPopover(true);
  };

  // Render existing highlight with appropriate color
  const renderExistingHighlight = (text, colors) => {
    return (
      <span 
        ref={highlightRef}
        className="px-1 rounded cursor-pointer transition-colors duration-100"
        style={{ backgroundColor: colors.bg }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.hoverBg}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.bg}
        onClick={(e) => handleHighlightClick(e, text)}
      >
        {text}
      </span>
    );
  };

  // Render text with highlighted portion and conversation formatting
  const renderResponseText = () => {
    const text = response.responseValue;
    const highlightText = response.highlightedText;
    // Currently selected text for new highlight creation
    const activeSelection = selectedText && showPopover ? selectedText : null;
    // Get colors for existing highlights
    const highlightColors = getHighlightColors();
    
    // Split by double newlines to get paragraphs (conversation turns)
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, pIndex) => {
      // Check if this paragraph starts with **Interviewer:**
      const interviewerMatch = paragraph.match(/^\*\*Interviewer:\*\*\s*(.*)/);
      
      if (interviewerMatch) {
        // Render interviewer question
        return (
          <p key={pIndex} className="mt-3 mb-1">
            <span className="font-bold text-neutral-600">Interviewer:</span>{' '}
            <span className="text-neutral-600 italic">{interviewerMatch[1]}</span>
          </p>
        );
      }
      
      // Regular participant text - apply highlighting
      let content;
      
      // First, check for active selection (user is creating a new highlight)
      if (activeSelection && paragraph.includes(activeSelection)) {
        const parts = paragraph.split(new RegExp(`(${activeSelection.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'g'));
        content = parts.map((part, i) => 
          part === activeSelection 
            ? <span key={`sel-${i}`}>{renderActiveSelection(part)}</span>
            : renderWordsWithHover(part)
        );
      } else if (highlightText) {
        // Existing highlight from saved data - use theme color or gray
        const parts = paragraph.split(new RegExp(`(${highlightText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
        content = parts.map((part, i) => 
          part.toLowerCase() === highlightText.toLowerCase() 
            ? <span key={i}>{renderExistingHighlight(part, highlightColors)}</span>
            : renderWordsWithHover(part)
        );
      } else {
        content = renderWordsWithHover(paragraph);
      }
      
      return (
        <p key={pIndex} className={pIndex > 0 ? 'mt-2' : ''}>
          {content}
        </p>
      );
    });
  };

  return (
    <div 
      ref={cardRef}
      className="relative p-4 rounded-lg border border-[rgba(108,113,140,0.16)] bg-white"
    >
      {/* Content: transcript text + metadata + Video thumbnail (on the right) */}
      <Flex gap="MD" alignItems="flex-start">
        {/* Transcript/Response text + metadata - always left-aligned */}
        <div className="flex-1">
          <div 
            className={`text-neutral-700 leading-relaxed ${isOpenQuestion ? 'cursor-text select-text selectable-text' : ''}`}
            onMouseUp={handleMouseUp}
          >
            {renderResponseText()}
          </div>
          
          {/* Metadata: Participant link + timestamp + highlight icon + actions */}
          <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" gap="SM">
              <button 
                className="text-[#6C718C] underline hover:text-[#535a74] cursor-pointer"
                onClick={onNavigateToParticipant}
              >
                Participant {response.participantId}
              </button>
              {hasHighlight && (
                <Highlighter size={14} className="text-[#7C3AED]" />
              )}
              <Text color="default.main.secondary" className="text-sm">{response.respondedAt}</Text>
            </Flex>
            <ActionButton emphasis="tertiary" size="SM" icon={<Icon name="share" />} iconOnly />
          </Flex>
        </div>
        
        {/* Video thumbnail - on the right side, only show if response has video */}
        {hasVideo && (
          <div className="flex-shrink-0">
            <VideoThumbnail duration={response.clipDuration} />
          </div>
        )}
      </Flex>

      {/* Highlight popover - view existing or create new */}
      {showPopover && (
        <div ref={popoverRef}>
          {isViewingExistingHighlight ? (
            <HighlightViewPopover
              highlight={getHighlightData()}
              clipDuration={response.clipDuration}
              themes={generatedThemes.length > 0 ? HIGHLIGHT_THEME_MAPPING[getHighlightData()?.id] : []}
              position={popoverPosition}
              onClose={closePopover}
            />
          ) : (
            <HighlightPopover
              selectedText={selectedText}
              clipDuration={response.clipDuration}
              onCreateHighlight={handleCreateHighlight}
              onClose={closePopover}
              position={popoverPosition}
            />
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Response table row (kept for non-open question blocks using table layout)
 */
function ResponseRow({ clipDuration, participantId, responseValue, respondedAt, hasHighlight = false, hideResponse = false }) {
  return (
    <div className="flex items-center py-4 border-b border-[rgba(108,113,140,0.12)] hover:bg-neutral-50 relative">
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
 * Transcript Response Row - Table row with selectable transcript text for Open Question/AI Conversation
 * Uses table layout like other blocks but with text selection capability
 * Shows full transcript with "More..." expand for content over 6 lines
 */
function TranscriptResponseRow({ response, blockType = 'input', hasHighlight = false, onNavigateToParticipant, generatedThemes = [] }) {
  const isAIConversation = blockType === 'ai_conversation';
  const [selectedText, setSelectedText] = useState('');
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState(null);
  const [isViewingExistingHighlight, setIsViewingExistingHighlight] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const rowRef = useRef(null);
  const popoverRef = useRef(null);
  const textRef = useRef(null);
  const [needsExpand, setNeedsExpand] = useState(false);

  // Check if content exceeds 6 lines (approximately 144px at 24px line height)
  useEffect(() => {
    if (textRef.current) {
      const lineHeight = 24; // leading-relaxed is ~1.625, with 15px text ≈ 24px
      const maxLines = 6;
      const maxHeight = lineHeight * maxLines;
      setNeedsExpand(textRef.current.scrollHeight > maxHeight);
    }
  }, [response.responseValue]);

  // Click outside and ESC key to close popover
  useEffect(() => {
    if (!showPopover) return;
    
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        closePopover();
      }
    };
    
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closePopover();
      }
    };
    
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showPopover]);

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    
    if (text && text.length > 5) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const rowRect = rowRef.current?.getBoundingClientRect();
      
      selection.removeAllRanges();
      setSelectedText(text);
      
      if (rowRect) {
        setPopoverPosition({
          top: rect.bottom - rowRect.top + 8,
          left: rect.left - rowRect.left,
        });
      }
      setShowPopover(true);
    }
  };

  const handleCreateHighlight = (text, note) => {
    console.log('Creating highlight:', { text, note, responseId: response.id });
    closePopover();
  };

  const closePopover = () => {
    setShowPopover(false);
    setSelectedText('');
    setIsViewingExistingHighlight(false);
    window.getSelection()?.removeAllRanges();
  };

  // Find matching highlight
  const findMatchingHighlight = () => {
    const highlightText = response.highlightedText;
    if (!highlightText) return null;
    
    const allHighlights = Object.values(MOCK_HIGHLIGHTS_BY_BLOCK_TYPE).flat();
    return allHighlights.find(h => 
      h.participantId === response.participantId && 
      (h.transcript === highlightText || 
       highlightText.includes(h.transcript) || 
       h.transcript?.includes(highlightText))
    );
  };

  const getHighlightData = () => findMatchingHighlight();

  // Get highlight colors
  const getHighlightColors = () => {
    const matchingHighlight = findMatchingHighlight();
    if (!matchingHighlight || generatedThemes.length === 0) {
      return DEFAULT_HIGHLIGHT_COLORS;
    }
    
    const themes = HIGHLIGHT_THEME_MAPPING[matchingHighlight.id] || [];
    if (themes.length > 0) {
      return THEME_COLORS[themes[0]] || DEFAULT_HIGHLIGHT_COLORS;
    }
    return DEFAULT_HIGHLIGHT_COLORS;
  };

  // Handle click on existing highlight
  const handleHighlightClick = (e, text) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const rowRect = rowRef.current?.getBoundingClientRect();
    
    setSelectedText(text);
    setIsViewingExistingHighlight(true);
    
    if (rowRect) {
      setPopoverPosition({
        top: rect.bottom - rowRect.top + 8,
        left: rect.left - rowRect.left,
      });
    }
    setShowPopover(true);
  };

  // Render word with hover effect
  const renderSelectableWord = (word, key) => (
    <span key={key} className="hover:bg-[#E8F4FF] rounded transition-colors duration-100">{word}</span>
  );

  // Render existing highlight
  const renderExistingHighlight = (text, colors) => (
    <span 
      className="px-1 rounded cursor-pointer transition-colors duration-100"
      style={{ backgroundColor: colors.bg }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.hoverBg}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.bg}
      onClick={(e) => handleHighlightClick(e, text)}
    >
      {text}
    </span>
  );

  // Render active selection
  const renderActiveSelection = (text) => (
    <span className="bg-[#0568FD] text-white px-0.5 rounded-sm">{text}</span>
  );

  // Render transcript text with highlighting support - shows FULL transcript
  const renderTranscriptText = () => {
    const text = response.responseValue;
    const highlightText = response.highlightedText;
    const activeSelection = selectedText && showPopover ? selectedText : null;
    const highlightColors = getHighlightColors();
    
    // Split by double newlines to get paragraphs (for AI conversation formatting)
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, pIndex) => {
      // Check if this paragraph starts with **Interviewer:**
      const interviewerMatch = paragraph.match(/^\*\*Interviewer:\*\*\s*(.*)/);
      
      if (interviewerMatch) {
        return (
          <p key={pIndex} className="mt-2 first:mt-0">
            <span className="font-semibold text-neutral-600">Interviewer:</span>{' '}
            <span className="text-neutral-600 italic">{interviewerMatch[1]}</span>
          </p>
        );
      }
      
      // Regular participant text - apply highlighting
      let content;
      
      // Handle active selection
      if (activeSelection && paragraph.includes(activeSelection)) {
        const parts = paragraph.split(activeSelection);
        content = (
          <>
            {parts[0].split(/(\s+)/).map((part, i) => part.match(/^\s+$/) ? part : renderSelectableWord(part, `pre-${pIndex}-${i}`))}
            {renderActiveSelection(activeSelection)}
            {parts.slice(1).join(activeSelection).split(/(\s+)/).map((part, i) => part.match(/^\s+$/) ? part : renderSelectableWord(part, `post-${pIndex}-${i}`))}
          </>
        );
      } else if (highlightText && paragraph.includes(highlightText)) {
        // Handle existing highlight
        const parts = paragraph.split(highlightText);
        content = (
          <>
            {parts[0].split(/(\s+)/).map((part, i) => part.match(/^\s+$/) ? part : renderSelectableWord(part, `pre-${pIndex}-${i}`))}
            {renderExistingHighlight(highlightText, highlightColors)}
            {parts.slice(1).join(highlightText).split(/(\s+)/).map((part, i) => part.match(/^\s+$/) ? part : renderSelectableWord(part, `post-${pIndex}-${i}`))}
          </>
        );
      } else {
        // Default: render with hover effect
        content = paragraph.split(/(\s+)/).map((part, i) => part.match(/^\s+$/) ? part : renderSelectableWord(part, `${pIndex}-${i}`));
      }
      
      return (
        <p key={pIndex} className="mt-2 first:mt-0">
          {isAIConversation && (
            <><span className="font-semibold text-neutral-600">Participant:</span>{' '}</>
          )}
          {content}
        </p>
      );
    });
  };

  return (
    <div 
      ref={rowRef}
      className="flex items-start py-4 border-b border-[rgba(108,113,140,0.12)] hover:bg-neutral-50 relative"
    >
      <div className="w-[140px] px-4 relative pt-1">
        <VideoThumbnail duration={response.clipDuration} />
      </div>
      <div className="w-[160px] px-4 pt-1">
        <Flex alignItems="center" gap="XS">
          <button 
            className="text-[#0568FD] font-medium hover:underline cursor-pointer"
            onClick={onNavigateToParticipant}
          >
            {response.participantId}
          </button>
          {hasHighlight && (
            <Highlighter size={14} className="text-[#7C3AED]" />
          )}
        </Flex>
      </div>
      <div 
        className="flex-1 px-4 cursor-text"
        onMouseUp={handleMouseUp}
      >
        {/* Transcript text with animated expand/collapse */}
        <div 
          ref={textRef}
          className="text-neutral-900 leading-relaxed overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ 
            maxHeight: !isExpanded && needsExpand ? '144px' : '2000px',
            ...((!isExpanded && needsExpand) ? {
              maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
            } : {})
          }}
        >
          {renderTranscriptText()}
        </div>
        
        {/* More/Less toggle */}
        {needsExpand && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#0568FD] text-sm font-medium mt-1 hover:underline cursor-pointer"
          >
            {isExpanded ? 'Less' : 'More...'}
          </button>
        )}
      </div>
      <div className="w-[180px] px-4 pt-1">
        <Text color="default.main.secondary">{response.respondedAt}</Text>
      </div>
      <div className="w-[80px] px-4 flex justify-center pt-1">
        <ActionButton emphasis="tertiary" size="SM" icon={<Icon name="share" />} iconOnly />
      </div>

      {/* Highlight popover */}
      {showPopover && (
        <div ref={popoverRef}>
          {isViewingExistingHighlight ? (
            <HighlightViewPopover
              highlight={getHighlightData()}
              clipDuration={response.clipDuration}
              themes={generatedThemes.length > 0 ? HIGHLIGHT_THEME_MAPPING[getHighlightData()?.id] : []}
              position={popoverPosition}
              onClose={closePopover}
            />
          ) : (
            <HighlightPopover
              selectedText={selectedText}
              clipDuration={response.clipDuration}
              onCreateHighlight={handleCreateHighlight}
              onClose={closePopover}
              position={popoverPosition}
            />
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Theme row for the themes table
 */
function ThemeRow({ theme, frequency, percentage }) {
  const themeColors = THEME_COLOR_MAP[theme.name] || { primary: '#6C718C', bg: '#F3F4F6' };
  
  return (
    <div className="flex items-center py-4 border-b border-[rgba(108,113,140,0.12)] hover:bg-neutral-50 group">
      <div className="flex-1 px-4">
        <Flex alignItems="center" gap="SM">
          <div 
            className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: themeColors.bg }}
          >
            <Tag size={14} style={{ color: themeColors.primary }} />
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
export function BlockResults({ block, isViewed = false, generatedThemes = [], onNavigateToThemes, onNavigateToParticipant }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedThemeFilter, setSelectedThemeFilter] = useState('all'); // 'all' or theme name
  
  if (!block) {
    return (
      <Flex alignItems="center" justifyContent="center" className="h-full">
        <Text color="default.main.secondary">Select a block to view results</Text>
      </Flex>
    );
  }

  const blockType = BLOCK_TYPES[block.type] || {};
  
  // Get responses for this specific block type
  const blockResponses = MOCK_RESPONSES_BY_TYPE[block.type] || MOCK_RESPONSES_DEFAULT;
  const responseCount = blockResponses.length;
  
  // Get highlights for this specific block type
  const blockHighlights = MOCK_HIGHLIGHTS_BY_BLOCK_TYPE[block.type] || [];
  const highlightCount = blockHighlights.length;
  // Hide "new" indicators if the block has been viewed
  const newHighlightCount = isViewed ? 0 : blockHighlights.filter(h => h.isNew).length;
  
  // Check if this block type has highlights
  const hasHighlights = highlightCount > 0;

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
              name={blockType.iconName || 'question'} 
              color={blockType.arianeColor || 'neutral'} 
              size="LG" 
              mode="dark"
              shape="squared"
            />
            <div>
              <Heading level={2} className="mb-1">
                {block.title || 'Block title'}
              </Heading>
              <Text color="default.main.secondary" className="text-sm">
                {blockType.name || 'Block type'}
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

        {/* Sentiment Analysis Section - shown for Open Question (input) block */}
        {block.type === 'input' && (
          <div className="mb-8">
            <Flex alignItems="center" justifyContent="space-between" className="mb-4">
              <Heading level={3}>Sentiment</Heading>
              <Flex alignItems="center" gap="LG">
                <Flex alignItems="center" gap="XS">
                  <span className="text-base">😊</span>
                  <Text color="default.main.secondary" className="text-sm">Positive</Text>
                </Flex>
                <Flex alignItems="center" gap="XS">
                  <span className="text-base">😐</span>
                  <Text color="default.main.secondary" className="text-sm">Neutral</Text>
                </Flex>
                <Flex alignItems="center" gap="XS">
                  <span className="text-base">😞</span>
                  <Text color="default.main.secondary" className="text-sm">Negative</Text>
                </Flex>
              </Flex>
            </Flex>
            
            {/* Sentiment Bar Chart */}
            <div className="relative">
              {/* Bar */}
              <div className="flex h-3 rounded-full overflow-hidden">
                <div className="bg-[#0D9488]" style={{ width: '68%' }} />
                <div className="bg-[#B45309]" style={{ width: '20%' }} />
                <div className="bg-[#BE4B65]" style={{ width: '12%' }} />
              </div>
              
              {/* Scale markers */}
              <div className="flex justify-between mt-2">
                <Text color="default.main.secondary" className="text-xs">0%</Text>
                <Text color="default.main.secondary" className="text-xs">25%</Text>
                <Text color="default.main.secondary" className="text-xs">50%</Text>
                <Text color="default.main.secondary" className="text-xs">75%</Text>
                <Text color="default.main.secondary" className="text-xs">100%</Text>
              </div>
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
              {/* Table layout for ALL block types including Open Question / AI Conversation */}
              <div className="flex items-center py-3 bg-[#F8F8FB] rounded-t-lg text-xs font-semibold text-[#6C718C] uppercase tracking-wide">
                <div className="w-[140px] px-4">CLIPS</div>
                <div className="w-[160px] px-4">PARTICIPANT</div>
                {block.type !== 'context' && <div className="flex-1 px-4">RESPONSE</div>}
                <div className={`${block.type === 'context' ? 'flex-1' : 'w-[180px]'} px-4`}>RESPONDED AT</div>
                <div className="w-[80px] px-4 text-center">ACTIONS</div>
              </div>

              {blockResponses.map((response) => {
                const participantsWithHighlights = getParticipantsWithHighlights(block.type);
                
                // Use TranscriptResponseRow for Open Question and AI Conversation
                if (block.type === 'input' || block.type === 'ai_conversation') {
                  return (
                    <TranscriptResponseRow
                      key={response.id}
                      response={response}
                      blockType={block.type}
                      hasHighlight={participantsWithHighlights.has(response.participantId)}
                      onNavigateToParticipant={() => onNavigateToParticipant?.(response.participantId)}
                      generatedThemes={generatedThemes}
                    />
                  );
                }
                
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

          {/* Highlights Tab Content */}
          {activeTab === 'highlights' && (
            <Flex flexDirection="column" gap="MD">
              {/* Theme Filter Section - for Open Question/AI Conversation */}
              {(block.type === 'input' || block.type === 'ai_conversation') && blockHighlights.length > 0 && (
                <>
                  {generatedThemes.length > 0 ? (
                    // Theme filter dropdown when themes exist
                    <Flex alignItems="center" gap="SM" className="mb-4">
                      <Text color="default.main.secondary" className="text-sm">Filter by theme:</Text>
                      <div className="w-[280px]">
                        <Select value={selectedThemeFilter} onValueChange={setSelectedThemeFilter}>
                          <SelectTrigger size="SM">
                            <SelectValue placeholder="All themes" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">
                              <Flex alignItems="center" justifyContent="space-between" className="w-full">
                                <span>All themes</span>
                                <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-neutral-100 text-neutral-600 rounded">
                                  {blockHighlights.length}
                                </span>
                              </Flex>
                            </SelectItem>
                            {(() => {
                              // Get unique themes with highlight counts
                              const blockHighlightIds = blockHighlights.map(h => h.id);
                              const themeHighlightCounts = {};
                              blockHighlightIds.forEach(hId => {
                                const themes = HIGHLIGHT_THEME_MAPPING[hId] || [];
                                themes.forEach(t => {
                                  themeHighlightCounts[t] = (themeHighlightCounts[t] || 0) + 1;
                                });
                              });
                              return Object.entries(themeHighlightCounts).map(([themeName, count]) => (
                                <SelectItem key={themeName} value={themeName}>
                                  <Flex alignItems="center" justifyContent="space-between" className="w-full">
                                    <span className="truncate max-w-[180px]">{themeName}</span>
                                    <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-neutral-100 text-neutral-600 rounded flex-shrink-0">
                                      {count}
                                    </span>
                                  </Flex>
                                </SelectItem>
                              ));
                            })()}
                          </SelectContent>
                        </Select>
                      </div>
                    </Flex>
                  ) : (
                    // Suggestion text when no themes exist
                    <Flex alignItems="center" justifyContent="space-between" gap="SM" className="mb-4 py-2 px-3 bg-[#F8F8FB] rounded-lg">
                      <Flex alignItems="center" gap="SM">
                        <Tag size={16} className="text-[#6C718C]" />
                        <Text color="default.main.secondary" className="text-sm">
                          Create some themes or run a Thematic Analysis to filter highlights by theme
                        </Text>
                      </Flex>
                      <ActionButton variant="Tertiary" size="SM" onClick={() => setAnalysisStep('method')}>
                        Start analysis
                      </ActionButton>
                    </Flex>
                  )}
                </>
              )}

              {blockHighlights.length > 0 ? (
                blockHighlights
                  .filter((highlight) => {
                    // Apply theme filter
                    if (selectedThemeFilter === 'all') return true;
                    const highlightThemes = HIGHLIGHT_THEME_MAPPING[highlight.id] || [];
                    return highlightThemes.includes(selectedThemeFilter);
                  })
                  .map((highlight) => {
                    // Apply themes from mapping if thematic analysis has been done
                    const appliedThemes = generatedThemes.length > 0 
                      ? (HIGHLIGHT_THEME_MAPPING[highlight.id] || [])
                      : highlight.themes;
                    
                    return (
                      <HighlightCard
                        key={highlight.id}
                        insight={highlight.insight}
                        transcript={highlight.transcript}
                        themes={appliedThemes}
                        isNew={isViewed ? false : highlight.isNew}
                        participantId={highlight.participantId}
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
