/**
 * ThemeResults Component
 * 
 * Displays thematic analysis results with confidence progress.
 * Based on Figma: Themes tab layout
 */
import { Flex, Box, Text, Heading, ScrollContainer, CTAButton } from '@framework/components/ariane';
import { Play, Check, Star, Highlighter, LayoutGrid, FileText } from 'lucide-react';
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
  // Calculate progress percentage (1 to 10+)
  const progress = Math.min((currentSessions / 10) * 100, 100);
  const isPast5 = currentSessions >= 5;
  const isPast10 = currentSessions >= 10;
  
  // Determine confidence level text
  const getConfidenceLevel = () => {
    if (currentSessions >= 10) return 'HIGH ANALYSIS CONFIDENCE';
    if (currentSessions >= 5) return 'MEDIUM ANALYSIS CONFIDENCE';
    return 'LOW ANALYSIS CONFIDENCE';
  };

  return (
    <div className="p-6 border border-[rgba(108,113,140,0.16)] rounded-xl">
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" className="mb-6">
        <Text className="text-xs font-semibold text-[#6C718C] uppercase tracking-wide">
          {getConfidenceLevel()}
        </Text>
        <span className="px-2 py-1 border border-[#10B981] text-[#10B981] rounded text-xs font-medium">
          {currentSessions} SESSION{currentSessions !== 1 ? 'S' : ''}
        </span>
      </Flex>

      {/* Progress Track */}
      <Flex alignItems="center" gap="SM">
        {/* Start indicator */}
        <Flex flexDirection="column" alignItems="center" className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#E5E7EB] flex items-center justify-center">
            <Play size={14} className="text-[#6C718C] ml-0.5" fill="currentColor" />
          </div>
          <Text type="caption" color="default.main.secondary" className="mt-1">1</Text>
        </Flex>

        {/* Progress bar to 5 - green when past */}
        <div className="flex-1 h-1 bg-neutral-200 rounded-full relative">
          <div 
            className={`absolute left-0 top-0 h-full rounded-full transition-all duration-300 ${isPast5 ? 'bg-[#10B981]' : 'bg-[#10B981]'}`}
            style={{ width: `${Math.min(progress * 2, 100)}%` }}
          />
        </div>

        {/* Checkpoint at 5 */}
        <Flex flexDirection="column" alignItems="center" className="flex-shrink-0">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${isPast5 ? 'bg-[#10B981] text-white' : 'bg-white border-2 border-neutral-300 text-[#6C718C]'}
          `}>
            <Check size={16} />
          </div>
          <Text type="caption" color="default.main.secondary" className="mt-1">5</Text>
        </Flex>

        {/* Progress bar to 10+ - green when past 5 */}
        <div className="flex-1 h-1 bg-neutral-200 rounded-full relative">
          <div 
            className="absolute left-0 top-0 h-full bg-[#10B981] rounded-full transition-all duration-300"
            style={{ width: isPast5 ? `${Math.min((progress - 50) * 2, 100)}%` : '0%' }}
          />
        </div>

        {/* End indicator at 10+ */}
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
 * ThemeResults - Main component for theme detail view
 * @param {Object} props.theme - The theme to display
 * @param {boolean} props.isViewed - Whether the theme has been viewed (hides new indicators)
 */
export function ThemeResults({ theme, isViewed = false }) {
  const isThematicAnalysis = theme?.id === 'thematic-analysis';

  if (!theme) {
    return (
      <Flex alignItems="center" justifyContent="center" className="h-full">
        <Text color="default.main.secondary">Select a theme to view details</Text>
      </Flex>
    );
  }

  return (
    <ScrollContainer className="h-full">
      <Flex flexDirection="column" className="p-6 h-full">
        {/* Theme Title */}
        <Heading level={1} className="text-2xl font-semibold mb-8">
          {theme.name}
        </Heading>

        {isThematicAnalysis ? (
          <>
            {/* Confidence Progress */}
            <ConfidenceProgress currentSessions={8} />

            {/* Message */}
            <Box className="mt-8">
              <Text className="font-semibold text-neutral-900 mb-2">
                Panel order completed
              </Text>
              <Text color="default.main.secondary" className="mb-1">
                Your order of 8 participants is complete. Results may still shift as more data comes in. For more reliable insights, <span className="font-semibold text-neutral-900">aim for 10 sessions or more</span>.{' '}
                <a 
                  href="#" 
                  className="text-[#0568FD] font-medium hover:underline"
                >
                  Learn more about thematic analysis
                </a>
              </Text>
            </Box>

            {/* Feature list */}
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

            {/* Start Analysis Button - positioned at bottom right */}
            <Flex justifyContent="flex-end" className="mt-auto pt-8">
              <CTAButton emphasis="primary" size="MD">
                Start analysis
              </CTAButton>
            </Flex>
          </>
        ) : (
          /* Uncategorized view - shows highlights that need themes */
          <Box>
            {/* Header with count - purple when there are new highlights (and not viewed) */}
            <Flex alignItems="center" gap="SM" className="mb-6">
              <span className={`
                px-2 py-1 rounded text-sm font-medium
                ${!isViewed && MOCK_UNCATEGORIZED_HIGHLIGHTS.filter(h => h.isNew).length > 0 
                  ? 'bg-[#7C3AED] text-white' 
                  : 'bg-neutral-100 text-[#6C718C]'
                }
              `}>
                {MOCK_UNCATEGORIZED_HIGHLIGHTS.length} highlights
              </span>
              <Text color="default.main.secondary">
                need to be categorized
              </Text>
            </Flex>

            {/* Highlight cards */}
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
        )}
      </Flex>
    </ScrollContainer>
  );
}

export default ThemeResults;
