/**
 * ThemeResults Component
 * 
 * Displays thematic analysis results with confidence progress.
 * Based on Figma: Themes tab layout
 */
import { Flex, Box, Text, Heading, ScrollContainer, CTAButton } from '@framework/components/ariane';
import { Play, Check, Star } from 'lucide-react';
import { HighlightCard } from './HighlightCard';

/**
 * Mock uncategorized highlights - these need to be assigned themes
 */
const MOCK_UNCATEGORIZED_HIGHLIGHTS = [
  {
    id: 'uh1',
    insight: "Monica is excited about the feature that automatically creates a session and captures information, making it easier to upload and analyze audio or video.",
    transcript: "Because that would make, that would be fantastic because that's one of the things w...",
    themes: [],
    isNew: true,
    participantId: '483697735',
  },
  {
    id: 'uh2',
    insight: "User found the filtering feature intuitive but wished for more advanced options like date range filtering.",
    transcript: "I really like how the filters work, they're pretty intuitive. But I was looking for a way to filter by date range and couldn't find it...",
    themes: [],
    isNew: true,
    participantId: '483697736',
  },
  {
    id: 'uh3',
    insight: "Participant expressed confusion about where to find the export functionality.",
    transcript: "So I'm trying to export this report, but I can't seem to find where that option is. I've clicked around a few places...",
    themes: [],
    isNew: true,
    participantId: '483697737',
  },
];

/**
 * Progress step indicator
 */
function ProgressStep({ icon: IconComponent, value, isActive, isPast }) {
  return (
    <Flex flexDirection="column" alignItems="center" gap="XS">
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center
        ${isPast ? 'bg-[#0568FD] text-white' : isActive ? 'bg-[#0568FD] text-white' : 'bg-neutral-100 text-[#6C718C]'}
      `}>
        {IconComponent ? <IconComponent size={16} /> : null}
      </div>
      <Text type="caption" color="default.main.secondary">{value}</Text>
    </Flex>
  );
}

/**
 * Confidence progress bar
 */
function ConfidenceProgress({ currentSessions = 1 }) {
  // Calculate progress percentage (1 to 10+)
  const progress = Math.min((currentSessions / 10) * 100, 100);
  const isPast5 = currentSessions >= 5;
  const isPast10 = currentSessions >= 10;

  return (
    <div className="p-6 border border-[rgba(108,113,140,0.16)] rounded-xl">
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" className="mb-6">
        <Text className="text-xs font-semibold text-[#6C718C] uppercase tracking-wide">
          LOW ANALYSIS CONFIDENCE
        </Text>
        <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium text-[#6C718C]">
          {currentSessions} SESSION{currentSessions !== 1 ? 'S' : ''}
        </span>
      </Flex>

      {/* Progress Track */}
      <Flex alignItems="center" gap="SM">
        {/* Start indicator */}
        <div className="w-8 h-8 rounded-full bg-[#0568FD] flex items-center justify-center">
          <Play size={14} className="text-white ml-0.5" fill="white" />
        </div>

        {/* Progress bar to 5 */}
        <div className="flex-1 h-1 bg-neutral-200 rounded-full relative">
          <div 
            className="absolute left-0 top-0 h-full bg-[#0568FD] rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress * 2, 100)}%` }}
          />
        </div>

        {/* Checkpoint at 5 */}
        <Flex flexDirection="column" alignItems="center" className="flex-shrink-0">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center border-2
            ${isPast5 ? 'bg-[#0568FD] border-[#0568FD] text-white' : 'bg-white border-neutral-300 text-[#6C718C]'}
          `}>
            <Check size={16} />
          </div>
          <Text type="caption" color="default.main.secondary" className="mt-1">5</Text>
        </Flex>

        {/* Progress bar to 10+ */}
        <div className="flex-1 h-1 bg-neutral-200 rounded-full relative">
          <div 
            className="absolute left-0 top-0 h-full bg-[#0568FD] rounded-full transition-all duration-300"
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
          <Text type="caption" color="default.main.secondary" className="mt-1">10+</Text>
        </Flex>
      </Flex>

      {/* Start label */}
      <Text type="caption" color="default.main.secondary" className="mt-1 ml-2">1</Text>
    </div>
  );
}

/**
 * ThemeResults - Main component for theme detail view
 */
export function ThemeResults({ theme }) {
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
            <ConfidenceProgress currentSessions={1} />

            {/* Message */}
            <Box className="mt-8">
              <Text className="font-semibold text-neutral-900 mb-2">
                Not quite there yet
              </Text>
              <Text color="default.main.secondary">
                Run <span className="font-semibold text-neutral-900">at least 5 sessions</span> to start identifying meaningful patterns.
              </Text>
              <a 
                href="#" 
                className="text-[#0568FD] font-medium hover:underline mt-1 inline-block"
              >
                Learn more about thematic analysis
              </a>
            </Box>

            {/* Start Analysis Button - positioned at bottom right */}
            <Flex justifyContent="flex-end" className="mt-auto pt-8">
              <CTAButton emphasis="tertiary" size="MD">
                Start Analysis
              </CTAButton>
            </Flex>
          </>
        ) : (
          /* Uncategorized view - shows highlights that need themes */
          <Box>
            {/* Header with count - purple when there are new highlights */}
            <Flex alignItems="center" gap="SM" className="mb-6">
              <span className={`
                px-2 py-1 rounded text-sm font-medium
                ${MOCK_UNCATEGORIZED_HIGHLIGHTS.filter(h => h.isNew).length > 0 
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
                  isNew={highlight.isNew}
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
