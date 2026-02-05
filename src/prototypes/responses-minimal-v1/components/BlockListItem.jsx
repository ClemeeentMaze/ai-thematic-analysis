/**
 * BlockListItem Component
 * 
 * Represents a single block in the left panel block list.
 * Displays block thumbnail (IconFigure), title, and block type label.
 * 
 * Based on: Figma design "beta-builder-bar" component
 */
import { Flex, Box, Text, IconFigure } from '@framework/components/ariane';
import { Sparkles } from 'lucide-react';
import { BLOCK_TYPES } from '../data';

/**
 * BlockListItem displays a clickable block card in the sidebar
 * 
 * @param {Object} props
 * @param {Object} props.block - Block data object
 * @param {boolean} props.isSelected - Whether this block is currently selected
 * @param {Function} props.onSelect - Callback when block is clicked
 * @param {number} props.newHighlightCount - Number of new highlights for this block
 */
export function BlockListItem({ block, isSelected, onSelect, newHighlightCount = 0 }) {
  const blockType = BLOCK_TYPES[block.type] || {};
  
  return (
    <Box
      onClick={() => onSelect(block.id)}
      className={`
        relative bg-white rounded-lg p-4 cursor-pointer
        transition-all duration-150
        ${isSelected 
          ? 'shadow-[inset_0px_0px_0px_1px_#0568fd] bg-[#F0FAFF]' 
          : 'shadow-[inset_0px_0px_0px_0.5px_rgba(108,113,140,0.28)]'
        }
        hover:shadow-[0px_2px_4px_rgba(108,113,140,0.12),inset_0px_0px_0px_0.5px_rgba(108,113,140,0.4)]
      `}
    >
      {/* New highlights badge - lighter purple color with sparkle icon */}
      {newHighlightCount > 0 && (
        <div className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 bg-[#F9F7FF] text-[#6B5BEE] text-[10px] font-semibold rounded-full whitespace-nowrap flex items-center gap-1">
          <Sparkles size={10} />
          New highlights
        </div>
      )}
      
      <Flex gap="SM" alignItems="center">
        {/* Block Icon - 40x40px squared figure with icon */}
        <IconFigure 
          name={blockType.iconName || 'block'}
          color={blockType.arianeColor || 'primary'}
          mode="dark"
          size="MDPlus"
          shape="squared"
        />
        
        {/* Block Content */}
        <Box className="flex-1 min-w-0 overflow-hidden">
          {/* Block Title - Primary text, single line truncated */}
          <p className="text-[16px] leading-6 truncate text-black m-0">
            {block.title || 'Untitled block'}
          </p>
          
          {/* Block Type Label - Secondary text style */}
          <Text 
            type="caption" 
            color="default.main.secondary"
            className="leading-5"
          >
            {blockType.name || block.type}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default BlockListItem;
