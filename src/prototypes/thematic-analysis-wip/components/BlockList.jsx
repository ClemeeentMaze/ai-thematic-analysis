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
 */
const MOCK_PARTICIPANT_LIST = [
  { id: 'p1', participantId: '23338', status: 'completed' },
  { id: 'p2', participantId: '23339', status: 'completed' },
  { id: 'p3', participantId: '23340', status: 'completed' },
  { id: 'p4', participantId: '23341', status: 'in_progress' },
  { id: 'p5', participantId: '23342', status: 'completed' },
];

/**
 * Mock themes for the list
 */
const MOCK_THEME_LIST = [
  { id: 'thematic-analysis', name: 'Thematic analysis', status: 'Not enough sessions' },
  { id: 'uncategorized', name: 'Uncategorized', highlightCount: 6, newCount: 3 },
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
}) {
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
            const highlightCount = highlightCounts[block.type] || 0;
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
              {MOCK_THEME_LIST.map((theme) => (
                <ThemeListItem
                  key={theme.id}
                  theme={theme}
                  isSelected={selectedThemeId === theme.id}
                  onSelect={onSelectTheme}
                />
              ))}
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
