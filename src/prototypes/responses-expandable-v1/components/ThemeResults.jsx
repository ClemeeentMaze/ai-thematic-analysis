/**
 * ThemeResults Component
 * 
 * Displays thematic analysis results with a 3-step flow:
 * 1. Initial view with confidence progress and "Start analysis" button
 * 2. Theme method selection (AI vs manual)
 * 3. Analyzing animation
 * 4. Results view with generated themes
 */
import { useState, useEffect } from 'react';
import { Flex, Box, Text, Heading, ScrollContainer, CTAButton, ActionButton } from '@framework/components/ariane';
import { Play, Check, Star, Highlighter, LayoutGrid, FileText, Sparkles, Tag, RefreshCw, EyeOff, Share2, Download, Copy, Pencil, MoreHorizontal } from 'lucide-react';
import { HighlightCard } from './HighlightCard';

/**
 * Mock uncategorized highlights - these need to be assigned themes
 * Must match total highlights across blocks: prototype_test(4) + scale(2) + input(2) = 8
 * New highlights: prototype_test(2) + scale(1) + input(2) = 5
 */
const MOCK_UNCATEGORIZED_HIGHLIGHTS = [
  // From prototype_test (2 new, 2 old)
  {
    id: 'uh1',
    insight: "Monica is excited about the feature that automatically creates a session and captures information, making it easier to upload and analyze audio or video.",
    transcript: "Because that would make, that would be fantastic because that's one of the things w...",
    themes: [],
    isNew: true,
    participantId: '483697735',
    blockType: 'prototype_test',
  },
  {
    id: 'uh2',
    insight: "User found the filtering feature intuitive but wished for more advanced options like date range filtering.",
    transcript: "I really like how the filters work, they're pretty intuitive. But I was looking for a way to filter by date range and couldn't find it...",
    themes: [],
    isNew: true,
    participantId: '483697736',
    blockType: 'prototype_test',
  },
  {
    id: 'uh3',
    insight: "The navigation flow was described as intuitive and easy to follow, with clear visual hierarchy.",
    transcript: "I really liked how the navigation was laid out. Everything felt like it was where I expected it to be...",
    themes: [],
    isNew: false,
    participantId: '483697738',
    blockType: 'prototype_test',
  },
  {
    id: 'uh4',
    insight: "Mobile responsiveness was praised, with the layout adapting well to smaller screens.",
    transcript: "Even on my phone, the experience was smooth. The buttons were easy to tap and nothing felt cramped...",
    themes: [],
    isNew: false,
    participantId: '483697739',
    blockType: 'prototype_test',
  },
  // From scale (1 new, 1 old)
  {
    id: 'uh5',
    insight: "Participant gave a high rating but mentioned the learning curve was steeper than expected initially.",
    transcript: "I'd give it an 8 out of 10. It's really powerful once you get the hang of it, but it took me a bit to understand all the features...",
    themes: [],
    isNew: true,
    participantId: '483697737',
    blockType: 'scale',
  },
  {
    id: 'uh6',
    insight: "High satisfaction scores were correlated with users who had prior experience with similar tools.",
    transcript: "Since I've used similar products before, this felt very familiar. I'd rate it quite highly...",
    themes: [],
    isNew: false,
    participantId: '483697735',
    blockType: 'scale',
  },
  // From input (2 new)
  {
    id: 'uh7',
    insight: "Users consistently mention wanting better onboarding documentation and tooltips for complex features.",
    transcript: "I think the main improvement would be having more tooltips or a guided tour when you first start. Some features are hidden and not obvious...",
    themes: [],
    isNew: true,
    participantId: '483697738',
    blockType: 'input',
  },
  {
    id: 'uh8',
    insight: "Multiple participants expressed desire for keyboard shortcuts to speed up their workflow.",
    transcript: "If there were keyboard shortcuts for the common actions, that would save me a lot of time. Right now I have to click through menus...",
    themes: [],
    isNew: true,
    participantId: '483697739',
    blockType: 'input',
  },
];

/**
 * AI-generated themes for the results view
 * Highlight counts should add up to 8 (total highlights from blocks)
 */
/**
 * Centralized theme color mapping
 * Each theme has: primary (for icons/tags), bg (for highlights), hoverBg (for hover states)
 */
export const THEME_COLOR_MAP = {
  'Navigation and discoverability needs improvement': { primary: '#3B82F6', bg: '#DBEAFE', hoverBg: '#BFDBFE' },
  'Filter functionality is intuitive but limited': { primary: '#F59E0B', bg: '#FEF3C7', hoverBg: '#FDE68A' },
  'Learning curve steeper than expected': { primary: '#EC4899', bg: '#FCE7F3', hoverBg: '#FBCFE8' },
  'Onboarding and documentation gaps identified': { primary: '#10B981', bg: '#D1FAE5', hoverBg: '#A7F3D0' },
  'Power users want keyboard shortcuts': { primary: '#8B5CF6', bg: '#E0E7FF', hoverBg: '#C7D2FE' },
  'Mobile experience praised for responsiveness': { primary: '#06B6D4', bg: '#CFFAFE', hoverBg: '#A5F3FC' },
  'Performance concerns affecting user perception': { primary: '#EF4444', bg: '#FEE2E2', hoverBg: '#FECACA' },
  'Data security and privacy concerns': { primary: '#A855F7', bg: '#F3E8FF', hoverBg: '#E9D5FF' },
};

const GENERATED_THEMES = [
  { id: 'theme-1', name: 'Navigation and discoverability needs improvement', color: THEME_COLOR_MAP['Navigation and discoverability needs improvement'].primary, highlightCount: 2 },
  { id: 'theme-2', name: 'Filter functionality is intuitive but limited', color: THEME_COLOR_MAP['Filter functionality is intuitive but limited'].primary, highlightCount: 1 },
  { id: 'theme-3', name: 'Mobile experience praised for responsiveness', color: THEME_COLOR_MAP['Mobile experience praised for responsiveness'].primary, highlightCount: 1 },
  { id: 'theme-4', name: 'Onboarding and documentation gaps identified', color: THEME_COLOR_MAP['Onboarding and documentation gaps identified'].primary, highlightCount: 2 },
  { id: 'theme-5', name: 'Power users want keyboard shortcuts', color: THEME_COLOR_MAP['Power users want keyboard shortcuts'].primary, highlightCount: 1 },
  { id: 'theme-6', name: 'Learning curve steeper than expected', color: THEME_COLOR_MAP['Learning curve steeper than expected'].primary, highlightCount: 1 },
];

/**
 * Feature list item with icon
 */
function FeatureItem({ icon: IconComponent, children }) {
  return (
    <Flex alignItems="center" gap="SM" className="py-2">
      <div className="w-8 h-8 rounded-lg bg-[#E6F7F0] flex items-center justify-center flex-shrink-0">
        <IconComponent size={16} className="text-[#10B981]" />
      </div>
      <Text color="default.main.primary">{children}</Text>
    </Flex>
  );
}

/**
 * Confidence progress bar
 */
function ConfidenceProgress({ currentSessions = 5 }) {
  const progress = Math.min((currentSessions / 10) * 100, 100);
  const isPast5 = currentSessions >= 5;
  const isPast10 = currentSessions >= 10;
  
  const getConfidenceLevel = () => {
    if (currentSessions >= 10) return 'HIGH ANALYSIS CONFIDENCE';
    if (currentSessions >= 5) return 'MEDIUM ANALYSIS CONFIDENCE';
    return 'LOW ANALYSIS CONFIDENCE';
  };

  return (
    <div className="p-6 border border-[rgba(108,113,140,0.16)] rounded-xl">
      <Flex justifyContent="space-between" alignItems="center" className="mb-6">
        <Text className="text-xs font-semibold text-[#6C718C] uppercase tracking-wide">
          {getConfidenceLevel()}
        </Text>
        <span className="px-2 py-1 border border-[#10B981] text-[#10B981] rounded text-xs font-medium">
          {currentSessions} SESSION{currentSessions !== 1 ? 'S' : ''}
        </span>
      </Flex>

      <Flex alignItems="center" gap="SM">
        <Flex flexDirection="column" alignItems="center" className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#E5E7EB] flex items-center justify-center">
            <Play size={14} className="text-[#6C718C] ml-0.5" fill="currentColor" />
          </div>
          <Text type="caption" color="default.main.secondary" className="mt-1">1</Text>
        </Flex>

        <div className="flex-1 h-1 bg-neutral-200 rounded-full relative">
          <div 
            className="absolute left-0 top-0 h-full bg-[#10B981] rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress * 2, 100)}%` }}
          />
        </div>

        <Flex flexDirection="column" alignItems="center" className="flex-shrink-0">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${isPast5 ? 'bg-[#10B981] text-white' : 'bg-white border-2 border-neutral-300 text-[#6C718C]'}
          `}>
            <Check size={16} />
          </div>
          <Text type="caption" color="default.main.secondary" className="mt-1">5</Text>
        </Flex>

        <div className="flex-1 h-1 bg-neutral-200 rounded-full relative">
          <div 
            className="absolute left-0 top-0 h-full bg-[#10B981] rounded-full transition-all duration-300"
            style={{ width: isPast5 ? `${Math.min((progress - 50) * 2, 100)}%` : '0%' }}
          />
        </div>

        <Flex flexDirection="column" alignItems="center" className="flex-shrink-0">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center border-2
            ${isPast10 ? 'bg-amber-400 border-amber-400 text-white' : 'bg-white border-neutral-300 text-[#6C718C]'}
          `}>
            <Star size={16} />
          </div>
          <Text type="caption" color="default.main.secondary" className="mt-1">+10</Text>
        </Flex>
      </Flex>
    </div>
  );
}

/**
 * Step 1: Initial view with Start Analysis button
 */
function InitialView({ onStartAnalysis }) {
  return (
    <>
      <ConfidenceProgress currentSessions={8} />

      <Box className="mt-8">
        <Text className="font-semibold text-neutral-900 mb-2">
          Panel order completed
        </Text>
        <Text color="default.main.secondary" className="mb-1">
          Your order of 8 participants is complete. Results may still shift as more data comes in. For more reliable insights, <span className="font-semibold text-neutral-900">aim for 10 sessions or more</span>.{' '}
          <a href="#" className="text-[#0568FD] font-medium hover:underline">
            Learn more about thematic analysis
          </a>
        </Text>
      </Box>

      <Box className="mt-6">
        <FeatureItem icon={Highlighter}>
          Generate and assign themes to highlights
        </FeatureItem>
        <FeatureItem icon={LayoutGrid}>
          Get a summary and key takeaways for each theme
        </FeatureItem>
        <FeatureItem icon={FileText}>
          Generate a report ready to share and present
        </FeatureItem>
      </Box>

      <Flex justifyContent="flex-end" className="mt-auto pt-8">
        <CTAButton emphasis="primary" size="MD" onClick={onStartAnalysis}>
          Start analysis
        </CTAButton>
      </Flex>
    </>
  );
}

/**
 * Step 2: Theme method selection
 */
function MethodSelectionView({ onCancel, onAnalyze }) {
  const [selectedMethod, setSelectedMethod] = useState('ai');

  return (
    <>
      <Text color="default.main.secondary" className="mb-8">
        Your session highlights will be automatically organized into themes. You can run the analysis from scratch with AI-generated themes, or using your own themes.
      </Text>

      <Text className="font-semibold text-neutral-900 mb-4">Starting themes</Text>

      <Flex gap="MD" className="mb-4">
        {/* AI Option - uses same border as block list items */}
        <button
          onClick={() => setSelectedMethod('ai')}
          className={`
            flex-1 p-4 rounded-lg cursor-pointer transition-all bg-white
            ${selectedMethod === 'ai' 
              ? 'shadow-[inset_0px_0px_0px_1px_#0568fd]' 
              : 'shadow-[inset_0px_0px_0px_0.5px_rgba(108,113,140,0.28)] hover:shadow-[inset_0px_0px_0px_0.5px_rgba(108,113,140,0.5)]'
            }
          `}
        >
          <Flex alignItems="center" gap="SM">
            <div className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center
              ${selectedMethod === 'ai' ? 'border-[#0568FD]' : 'border-neutral-300'}
            `}>
              {selectedMethod === 'ai' && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#0568FD]" />
              )}
            </div>
            <Sparkles size={20} className="text-[#6C718C]" />
          </Flex>
          <Text className="mt-2 font-medium text-left">Find themes with AI</Text>
        </button>

        {/* Manual Option - uses same border as block list items */}
        <button
          onClick={() => setSelectedMethod('manual')}
          className={`
            flex-1 p-4 rounded-lg cursor-pointer transition-all bg-white
            ${selectedMethod === 'manual' 
              ? 'shadow-[inset_0px_0px_0px_1px_#0568fd]' 
              : 'shadow-[inset_0px_0px_0px_0.5px_rgba(108,113,140,0.28)] hover:shadow-[inset_0px_0px_0px_0.5px_rgba(108,113,140,0.5)]'
            }
          `}
        >
          <Flex alignItems="center" gap="SM">
            <div className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center
              ${selectedMethod === 'manual' ? 'border-[#0568FD]' : 'border-neutral-300'}
            `}>
              {selectedMethod === 'manual' && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#0568FD]" />
              )}
            </div>
            <Tag size={20} className="text-[#6C718C]" />
          </Flex>
          <Text className="mt-2 font-medium text-left">My own themes</Text>
        </button>
      </Flex>

      <Text color="default.main.secondary" className="text-sm">
        You can generate themes using AI or manually add them.
      </Text>

      <Flex justifyContent="space-between" className="mt-auto pt-8">
        <ActionButton emphasis="secondary" size="MD" onClick={onCancel}>
          Cancel
        </ActionButton>
        <CTAButton emphasis="primary" size="MD" onClick={onAnalyze}>
          Analyze
        </CTAButton>
      </Flex>
    </>
  );
}

/**
 * Step 3: Analyzing animation view
 */
function AnalyzingView() {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center" className="flex-1 py-12">
      <Heading level={2} className="text-2xl font-semibold mb-8">
        Analyzing highlights...
      </Heading>

      {/* Animated illustration */}
      <div className="relative w-full max-w-[600px] h-[300px] rounded-xl overflow-hidden mb-8">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#F0ABFC]" />
        
        {/* Floating cards */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px]">
          {/* Card 1 - animating up */}
          <div className="bg-white rounded-lg p-4 shadow-lg mb-3 animate-pulse">
            <div className="h-3 bg-neutral-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-neutral-200 rounded w-full mb-2" />
            <div className="h-3 bg-neutral-200 rounded w-1/2" />
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-lg p-4 shadow-lg mb-3 animate-pulse" style={{ animationDelay: '0.2s' }}>
            <div className="h-3 bg-neutral-200 rounded w-full mb-2" />
            <div className="h-3 bg-neutral-200 rounded w-2/3" />
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-lg p-4 shadow-lg animate-pulse" style={{ animationDelay: '0.4s' }}>
            <div className="h-3 bg-neutral-200 rounded w-full mb-2" />
            <div className="h-3 bg-neutral-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-neutral-200 rounded w-1/2" />
          </div>
        </div>

        {/* Sparkle icon */}
        <div className="absolute right-[20%] top-1/2 -translate-y-1/2">
          <Sparkles size={32} className="text-[#7C3AED] animate-bounce" />
        </div>

        {/* Horizontal line */}
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-[#7C3AED]" />
      </div>

      <Text color="default.main.secondary" className="text-center max-w-md">
        The analysis may take a few minutes. No need to wait here; you can safely return to this page later.
      </Text>
    </Flex>
  );
}

/**
 * Theme tag component with color
 */
function ThemeTag({ name, color }) {
  // Use centralized colors
  const themeColors = THEME_COLOR_MAP[name] || { primary: color, bg: `${color}15` };
  
  return (
    <span 
      className="inline-block px-3 py-1.5 rounded-full text-sm font-medium mb-2 mr-2"
      style={{ backgroundColor: themeColors.bg, color: themeColors.primary }}
    >
      {name}
    </span>
  );
}

/**
 * Step 4: Results view with generated themes
 */
function ResultsView({ themes, onRunNewAnalysis }) {
  return (
    <>
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="flex-start" className="mb-2">
        <Heading level={1} className="text-2xl font-semibold">
          Analysis results
        </Heading>
        <ActionButton emphasis="secondary" size="SM" onClick={onRunNewAnalysis}>
          Run new analysis
        </ActionButton>
      </Flex>
      <Text color="default.main.secondary" className="mb-6">
        Latest analysis: 20 hours ago
      </Text>

      {/* Report generated card */}
      <div className="p-4 border border-[rgba(108,113,140,0.16)] rounded-xl mb-4">
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap="MD">
            <Tag size={20} className="text-[#6C718C]" />
            <Text className="font-medium">Report generated</Text>
          </Flex>
          <CTAButton emphasis="primary" size="SM">
            See report
          </CTAButton>
        </Flex>
      </div>

      {/* Highlights analyzed card */}
      <div className="p-4 border border-[rgba(108,113,140,0.16)] rounded-xl mb-4">
        <Flex alignItems="center" gap="MD">
          <Highlighter size={20} className="text-[#6C718C]" />
          <Text className="font-medium">8 highlights analyzed</Text>
        </Flex>
      </div>

      {/* Themes found card */}
      <div className="p-4 border border-[rgba(108,113,140,0.16)] rounded-xl">
        <Flex alignItems="center" gap="MD" className="mb-4">
          <Tag size={20} className="text-[#6C718C]" />
          <Text className="font-medium">{themes.length} themes found</Text>
        </Flex>
        <div className="flex flex-wrap">
          {themes.map((theme) => (
            <ThemeTag key={theme.id} name={theme.name} color={theme.color} />
          ))}
        </div>
      </div>
    </>
  );
}

/**
 * Mock highlights data for each generated theme
 */
const THEME_HIGHLIGHTS = {
  'theme-1': [
    {
      id: 'th1-1',
      insight: "The participant identifies navigation issues, noting that some features were hard to discover without guidance.",
      transcript: "I really liked how the navigation was laid out. Everything felt like it was where I expected it to be...",
      themes: ['Navigation and discoverability needs improvement'],
      isNew: false,
      participantId: '483697738',
    },
    {
      id: 'th1-2',
      insight: "User struggled to find key features, suggesting better visual cues or onboarding would help.",
      transcript: "I was looking for the settings but couldn't find it easily. Maybe a more prominent icon would help...",
      themes: ['Navigation and discoverability needs improvement'],
      isNew: false,
      participantId: '483697739',
    },
  ],
  'theme-2': [
    {
      id: 'th2-1',
      insight: "User found the filtering feature intuitive but wished for more advanced options like date range filtering.",
      transcript: "I really like how the filters work, they're pretty intuitive. But I was looking for a way to filter by date range and couldn't find it...",
      themes: ['Filter functionality is intuitive but limited'],
      isNew: false,
      participantId: '483697736',
    },
  ],
  'theme-3': [
    {
      id: 'th3-1',
      insight: "Mobile responsiveness was praised, with the layout adapting well to smaller screens.",
      transcript: "Even on my phone, the experience was smooth. The buttons were easy to tap and nothing felt cramped...",
      themes: ['Mobile experience praised for responsiveness'],
      isNew: false,
      participantId: '483697739',
    },
  ],
  'theme-4': [
    {
      id: 'th4-1',
      insight: "Users consistently mention wanting better onboarding documentation and tooltips for complex features.",
      transcript: "I think the main improvement would be having more tooltips or a guided tour when you first start. Some features are hidden and not obvious...",
      themes: ['Onboarding and documentation gaps identified'],
      isNew: false,
      participantId: '483697738',
    },
    {
      id: 'th4-2',
      insight: "The learning curve was mentioned as a barrier for new users without proper documentation.",
      transcript: "It took me a while to figure out how everything works. Some documentation would have been helpful...",
      themes: ['Onboarding and documentation gaps identified'],
      isNew: false,
      participantId: '483697735',
    },
  ],
  'theme-5': [
    {
      id: 'th5-1',
      insight: "Multiple participants expressed desire for keyboard shortcuts to speed up their workflow.",
      transcript: "If there were keyboard shortcuts for the common actions, that would save me a lot of time. Right now I have to click through menus...",
      themes: ['Power users want keyboard shortcuts'],
      isNew: false,
      participantId: '483697739',
    },
  ],
  'theme-6': [
    {
      id: 'th6-1',
      insight: "Participant gave a high rating but mentioned the learning curve was steeper than expected initially.",
      transcript: "I'd give it an 8 out of 10. It's really powerful once you get the hang of it, but it took me a bit to understand all the features...",
      themes: ['Learning curve steeper than expected'],
      isNew: false,
      participantId: '483697737',
    },
  ],
};

/**
 * Mock analysis data for themes
 */
const THEME_ANALYSIS = {
  'theme-1': {
    summary: "While the overall navigation structure was appreciated, users consistently reported difficulty discovering certain features. The main pain points center around hidden functionality and lack of visual cues for important actions.",
    details: [
      {
        title: "Hidden features frustrate users",
        description: "Users need confidence that new initiatives will resonate before investing heavily in navigation changes.",
        quote: "I was looking for the settings but couldn't find it easily. Maybe a more prominent icon would help.",
        quotee: "David E., Director of Research and Insights • Purpose Brand...",
      },
      {
        title: "Visual hierarchy needs improvement",
        description: "Key actions should be more prominently displayed to reduce cognitive load.",
        quote: "Everything felt like it was where I expected it to be, but some things were harder to find than others.",
        quotee: "Madelaine E., Head of Marketing • Lego (02:02)",
      },
    ],
  },
};

/**
 * ThemeDetailView - Shows when a generated theme is selected
 * Displays highlights assigned to this theme with summary and analysis
 */
function ThemeDetailView({ theme }) {
  const [hasSummary, setHasSummary] = useState(false);
  const highlights = THEME_HIGHLIGHTS[theme.id] || [];
  const analysis = THEME_ANALYSIS[theme.id];
  const totalSessions = 21; // Mock total
  const themeSessions = 18; // Mock sessions with this theme
  const percentage = Math.round((themeSessions / totalSessions) * 100);
  
  // Get centralized colors for this theme
  const themeColors = THEME_COLOR_MAP[theme.name] || { primary: theme.color, bg: `${theme.color}15` };

  return (
    <>
      {/* Header */}
      <Flex alignItems="flex-start" justifyContent="space-between" className="mb-6">
        <Flex alignItems="flex-start" gap="MD">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: themeColors.bg }}
          >
            <Tag size={24} style={{ color: themeColors.primary }} />
          </div>
          <div>
            <Heading level={1} className="text-2xl font-semibold mb-1">
              {theme.name}
            </Heading>
            <Text color="default.main.secondary">
              Events and conditions that prompt organizations to conduct brand testing
            </Text>
          </div>
        </Flex>
        <Flex alignItems="center" gap="SM">
          <ActionButton emphasis="secondary" size="SM" icon={<EyeOff size={16} />}>
            Hide in report
          </ActionButton>
          <ActionButton emphasis="primary" size="SM" icon={<Share2 size={16} />}>
            Share theme
          </ActionButton>
          <ActionButton emphasis="tertiary" size="SM" icon={<Download size={16} />} iconOnly />
        </Flex>
      </Flex>

      {/* Progress bar */}
      <div className="p-4 border border-[rgba(108,113,140,0.16)] rounded-xl mb-6">
        <Text color="default.main.secondary" className="text-sm mb-2">
          Theme highlighted in {themeSessions} of {totalSessions} sessions
        </Text>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full"
              style={{ width: `${percentage}%`, backgroundColor: themeColors.primary }}
            />
          </div>
          <Text className="font-medium">{percentage} %</Text>
        </div>
      </div>

      {/* Two column layout */}
      <Flex gap="XL" className="flex-1">
        {/* Left column - Analysis */}
        <div className="w-[400px] flex-shrink-0">
          <div className="p-6 border border-[rgba(108,113,140,0.16)] rounded-xl">
            <Flex alignItems="center" justifyContent="space-between" className="mb-4">
              <Text className="font-semibold text-lg">Analysis</Text>
              <Flex alignItems="center" gap="XS">
                <ActionButton emphasis="tertiary" size="SM" icon={<Copy size={16} />} iconOnly />
                <ActionButton emphasis="tertiary" size="SM" icon={<Pencil size={16} />}>
                  Edit
                </ActionButton>
              </Flex>
            </Flex>

            {hasSummary || analysis ? (
              <>
                <Text className="text-xs font-semibold text-[#6C718C] uppercase tracking-wide mb-2">
                  SUMMARY
                </Text>
                <Text className="mb-6 leading-relaxed">
                  {analysis?.summary || "While many organizations aspire to regular, scheduled brand testing cadences (quarterly or biannual), the reality is that most studies remain "}
                  <strong>reactive responses to specific business events</strong>
                  {" (new campaigns, product launches, and rebranding initiatives are primary triggers). This gap between aspiration and reality represents a key opportunity for an always-on AI solution."}
                </Text>

                <Text className="text-xs font-semibold text-[#6C718C] uppercase tracking-wide mb-4">
                  DETAILS
                </Text>
                
                {(analysis?.details || [
                  {
                    title: "New campaigns & product launches",
                    description: "Orgs need confidence that new initiatives will resonate before investing heavily in launch and media spend.",
                    quote: "I recently launched a new campaign and we did testing from animatic testing on the video asset to testing the campaign and focus groups even as far as prior to that working on like taglines and things via surveys. So we ran the full gamut of testing prior to launching.",
                    quotee: "Brand Manager - Heaven Hill",
                  },
                ]).map((detail, index) => (
                  <div key={index} className="mb-4">
                    <Flex alignItems="flex-start" gap="SM">
                      <div 
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: themeColors.primary }}
                      />
                      <div>
                        <Text className="font-semibold mb-1">{detail.title}:</Text>
                        <Text color="default.main.secondary" className="mb-2">
                          {detail.description}
                        </Text>
                        <div className="pl-4 border-l-2 border-neutral-200">
                          <Text className="italic text-neutral-600 text-sm">
                            "{detail.quote}"
                          </Text>
                          <Text color="default.main.secondary" className="text-sm mt-1">
                            {detail.quotee}
                          </Text>
                        </div>
                      </div>
                    </Flex>
                  </div>
                ))}
              </>
            ) : (
              <Flex flexDirection="column" alignItems="center" justifyContent="center" className="py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-[#F9F7FF] flex items-center justify-center mb-4">
                  <Sparkles size={24} className="text-[#6B5BEE]" />
                </div>
                <Text className="font-medium mb-2">Generate a summary</Text>
                <Text color="default.main.secondary" className="text-sm mb-4 max-w-[280px]">
                  Create an AI-powered summary and key takeaways from the highlights in this theme.
                </Text>
                <ActionButton 
                  emphasis="secondary" 
                  size="SM" 
                  icon={<Sparkles size={16} />}
                  onClick={() => setHasSummary(true)}
                >
                  Generate summary
                </ActionButton>
              </Flex>
            )}
          </div>
        </div>

        {/* Right column - Highlights Reel */}
        <div className="flex-1">
          <Flex alignItems="center" gap="SM" className="mb-4">
            <LayoutGrid size={20} className="text-[#6C718C]" />
            <Text className="font-semibold uppercase text-sm tracking-wide text-[#6C718C]">
              HIGHLIGHTS REEL
            </Text>
            <span className="px-2 py-0.5 bg-neutral-100 text-[#6C718C] text-sm font-medium rounded">
              {highlights.length}
            </span>
          </Flex>

          <Flex flexDirection="column" gap="MD">
            {highlights.map((highlight) => (
              <HighlightCard
                key={highlight.id}
                insight={highlight.insight}
                transcript={highlight.transcript}
                themes={highlight.themes}
                isNew={false}
                participantId={highlight.participantId}
                showThemeTag={true}
                themeColor={themeColors.primary}
              />
            ))}
          </Flex>
        </div>
      </Flex>
    </>
  );
}

/**
 * ThemeResults - Main component for theme detail view
 * @param {Object} props.theme - The theme to display
 * @param {boolean} props.isViewed - Whether the theme has been viewed (hides new indicators)
 * @param {Function} props.onAnalysisComplete - Callback when analysis is complete (to update theme list)
 */
export function ThemeResults({ theme, isViewed = false, onAnalysisComplete }) {
  const isThematicAnalysis = theme?.id === 'thematic-analysis';
  const isUncategorized = theme?.id === 'uncategorized';
  const isGeneratedTheme = theme?.color !== undefined;
  
  // Analysis flow state: 'initial' | 'selecting' | 'analyzing' | 'complete'
  const [analysisStep, setAnalysisStep] = useState('initial');

  // Simulate analysis completion after delay
  useEffect(() => {
    if (analysisStep === 'analyzing') {
      const timer = setTimeout(() => {
        setAnalysisStep('complete');
        // Notify parent to update theme list
        if (onAnalysisComplete) {
          onAnalysisComplete(GENERATED_THEMES);
        }
      }, 3000); // 3 second animation
      return () => clearTimeout(timer);
    }
  }, [analysisStep, onAnalysisComplete]);

  if (!theme) {
    return (
      <Flex alignItems="center" justifyContent="center" className="h-full">
        <Text color="default.main.secondary">Select a theme to view details</Text>
      </Flex>
    );
  }

  // If this is a generated theme, show the detail view
  if (isGeneratedTheme) {
    return (
      <ScrollContainer className="h-full">
        <Flex flexDirection="column" className="p-6 h-full min-h-[600px]">
          <ThemeDetailView theme={theme} />
        </Flex>
      </ScrollContainer>
    );
  }

  return (
    <ScrollContainer className="h-full">
      <Flex flexDirection="column" className="p-6 h-full min-h-[600px]">
        {/* Theme Title - only show in initial and selecting steps */}
        {(analysisStep === 'initial' || analysisStep === 'selecting') && (
          <Heading level={1} className="text-2xl font-semibold mb-8">
            {theme.name}
          </Heading>
        )}

        {isThematicAnalysis ? (
          <>
            {analysisStep === 'initial' && (
              <InitialView onStartAnalysis={() => setAnalysisStep('selecting')} />
            )}
            {analysisStep === 'selecting' && (
              <MethodSelectionView 
                onCancel={() => setAnalysisStep('initial')}
                onAnalyze={() => setAnalysisStep('analyzing')}
              />
            )}
            {analysisStep === 'analyzing' && (
              <AnalyzingView />
            )}
            {analysisStep === 'complete' && (
              <ResultsView 
                themes={GENERATED_THEMES}
                onRunNewAnalysis={() => setAnalysisStep('selecting')}
              />
            )}
          </>
        ) : isUncategorized ? (
          /* Uncategorized view - shows highlights that need themes */
          <Box>
            <Flex alignItems="center" gap="SM" className="mb-6">
              <span className={`
                px-2 py-1 rounded text-sm font-medium
                ${!isViewed && MOCK_UNCATEGORIZED_HIGHLIGHTS.filter(h => h.isNew).length > 0 
                  ? 'bg-[#F9F7FF] text-[#6B5BEE]' 
                  : 'bg-neutral-100 text-[#6C718C]'
                }
              `}>
                {MOCK_UNCATEGORIZED_HIGHLIGHTS.length} highlights
              </span>
              <Text color="default.main.secondary">
                need to be categorized
              </Text>
            </Flex>

            <Flex flexDirection="column" gap="MD">
              {MOCK_UNCATEGORIZED_HIGHLIGHTS.map((highlight) => (
                <HighlightCard
                  key={highlight.id}
                  insight={highlight.insight}
                  transcript={highlight.transcript}
                  themes={highlight.themes}
                  isNew={isViewed ? false : highlight.isNew}
                  participantId={highlight.participantId}
                />
              ))}
            </Flex>
          </Box>
        ) : null}
      </Flex>
    </ScrollContainer>
  );
}

export default ThemeResults;

export { GENERATED_THEMES };
