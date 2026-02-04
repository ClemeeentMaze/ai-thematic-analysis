/**
 * BlockList Component (Left Panel)
 * 
 * Scrollable block list.
 */
import { Flex, ScrollContainer } from '@framework/components/ariane';
import { BlockListItem } from './BlockListItem';

/**
 * @param {Array} props.blocks - Array of block objects
 * @param {string} props.selectedBlockId - Currently selected block ID
 * @param {Function} props.onSelectBlock - Block selection callback
 */
export function BlockList({ blocks, selectedBlockId, onSelectBlock }) {
  return (
    <Flex flexDirection="column" className="h-full bg-white shadow-[inset_-0.5px_0_0_0_rgba(108,113,140,0.28)]">
      {/* Scrollable Block List */}
      <ScrollContainer className="flex-1 min-h-0">
        <Flex flexDirection="column" gap="SM" className="p-3">
          {blocks.map((block) => (
            <BlockListItem
              key={block.id}
              block={block}
              isSelected={selectedBlockId === block.id}
              onSelect={onSelectBlock}
            />
          ))}
        </Flex>
      </ScrollContainer>
    </Flex>
  );
}

export default BlockList;
