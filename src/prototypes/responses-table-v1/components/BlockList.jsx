/**
 * BlockList Component (Left Panel)
 * 
 * Tabs + Scrollable block list.
 */
import { Flex, ScrollContainer, SegmentControl, ActionButton, Icon } from '@framework/components/ariane';
import { BlockListItem } from './BlockListItem';
import { ParticipantListItem } from './ParticipantListItem';
import { ThemeListItem } from './ThemeListItem';

const TAB_OPTIONS = [
  { id: 'results', label: 'Results' },
  { id: 'participants', label: 'Participants' },
  { id: 'themes', label: 'Themes' },
];

/**
 * Mock participants for the list
 * IDs match the participantId values in BlockResults responses
 */
const MOCK_PARTICIPANT_LIST = [
  { id: 'p1', participantId: '483697735', status: 'completed' },
  { id: 'p2', participantId: '483697736', status: 'completed' },
  { id: 'p3', participantId: '483697737', status: 'completed' },
  { id: 'p4', participantId: '483697738', status: 'completed' },
  { id: 'p5', participantId: '483697739', status: 'completed' },
];

/**
 * Mock themes for the list
 * Highlight count matches total across blocks: prototype_test(4) + scale(2) + input(2) = 8
 * New count: prototype_test(2) + scale(1) + input(2) = 5
 */
const MOCK_THEME_LIST = [
  { id: 'thematic-analysis', name: 'Thematic analysis', status: '8 sessions' },
  { id: 'uncategorized', name: 'Uncategorized', highlightCount: 8, newCount: 5 },
];

/**
 * @param {Array} props.blocks - Array of block objects
 * @param {string} props.selectedBlockId - Currently selected block ID
 * @param {Function} props.onSelectBlock - Block selection callback
 * @param {string} props.activeTab - Currently active tab
 * @param {Function} props.onTabChange - Tab change callback
 * @param {string} props.selectedParticipantId - Currently selected participant ID
 * @param {Function} props.onSelectParticipant - Participant selection callback
 * @param {string} props.selectedThemeId - Currently selected theme ID
 * @param {Function} props.onSelectTheme - Theme selection callback
 * @param {Set} props.viewedBlocks - Set of block IDs that have been viewed
 * @param {boolean} props.uncategorizedViewed - Whether uncategorized theme has been viewed
 * @param {Array} props.generatedThemes - AI-generated themes after analysis
 */
export function BlockList({ 
  blocks, 
  selectedBlockId, 
  onSelectBlock,
  activeTab,
  onTabChange,
  selectedParticipantId,
  onSelectParticipant,
  selectedThemeId,
  onSelectTheme,
  viewedBlocks = new Set(),
  uncategorizedViewed = false,
  generatedThemes = [],
}) {
  // Combine base themes with generated themes
  // Hide uncategorized when analysis is complete (themes have been generated)
  const analysisComplete = generatedThemes.length > 0;
  const baseThemes = analysisComplete 
    ? MOCK_THEME_LIST.filter(t => t.id !== 'uncategorized')
    : MOCK_THEME_LIST;
  
  const allThemes = [
    ...baseThemes,
    ...generatedThemes.map(theme => ({
      id: theme.id,
      name: theme.name,
      color: theme.color,
      highlightCount: theme.highlightCount, // Use the count from the theme data
    })),
  ];
  return (
    <Flex flexDirection="column" className="h-full bg-white shadow-[inset_-0.5px_0_0_0_rgba(108,113,140,0.28)]">
      {/* Tabs Header */}
      <div className="flex-shrink-0 p-3 border-b border-[rgba(108,113,140,0.16)]">
        <SegmentControl
          options={TAB_OPTIONS}
          selected={activeTab}
          onChange={onTabChange}
          size="SM"
          fullWidth
        />
      </div>

      {/* Scrollable List - changes based on active tab */}
      <ScrollContainer className="flex-1 min-h-0">
        <Flex flexDirection="column" gap="SM" className="p-3">
          {activeTab === 'results' && blocks.map((block) => {
            // Only prototype_test, scale, and input blocks have new highlights
            const highlightCounts = {
              prototype_test: 2,
              scale: 1,
              input: 2,
            };
            // Hide "new highlights" badge if block has been viewed
            const hasBeenViewed = viewedBlocks.has(block.id);
            const highlightCount = hasBeenViewed ? 0 : (highlightCounts[block.type] || 0);
            return (
              <BlockListItem
                key={block.id}
                block={block}
                isSelected={selectedBlockId === block.id}
                onSelect={onSelectBlock}
                newHighlightCount={highlightCount}
              />
            );
          })}
          {activeTab === 'participants' && MOCK_PARTICIPANT_LIST.map((participant) => (
            <ParticipantListItem
              key={participant.id}
              participant={participant}
              isSelected={selectedParticipantId === participant.id}
              onSelect={onSelectParticipant}
            />
          ))}
          {activeTab === 'themes' && (
            <>
              {allThemes.map((theme, index) => {
                // Hide new count for uncategorized if it's been viewed
                const themeWithViewedState = theme.id === 'uncategorized' && uncategorizedViewed
                  ? { ...theme, newCount: 0 }
                  : theme;
                
                // Add analysisComplete status to thematic-analysis theme
                const themeWithStatus = theme.id === 'thematic-analysis'
                  ? { ...themeWithViewedState, analysisComplete }
                  : themeWithViewedState;
                
                // Check if this is the thematic-analysis item (to add divider after)
                const isThematicAnalysis = theme.id === 'thematic-analysis';
                
                return (
                  <div key={theme.id}>
                    <ThemeListItem
                      theme={themeWithStatus}
                      isSelected={selectedThemeId === theme.id}
                      onSelect={onSelectTheme}
                    />
                    {/* Divider after Thematic analysis */}
                    {isThematicAnalysis && (
                      <div className="my-3 border-b border-[rgba(108,113,140,0.16)]" />
                    )}
                  </div>
                );
              })}
              {/* Add theme button */}
              <ActionButton 
                emphasis="tertiary" 
                size="MD" 
                icon={<Icon name="plus" />}
                onClick={() => console.log('Add theme clicked')}
                fullWidth
              >
                Add theme
              </ActionButton>
            </>
          )}
        </Flex>
      </ScrollContainer>
    </Flex>
  );
}

export default BlockList;
