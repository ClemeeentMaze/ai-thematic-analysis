/**
 * ThemeListItem Component
 * 
 * Represents a single theme in the left panel list.
 * Displays theme icon, name, and status/count.
 */
import { Flex, Box, Text, IconFigure } from '@framework/components/ariane';
import { Tag } from 'lucide-react';

/**
 * ThemeListItem displays a clickable theme card in the sidebar
 * 
 * @param {Object} props
 * @param {Object} props.theme - Theme data object
 * @param {boolean} props.isSelected - Whether this theme is currently selected
 * @param {Function} props.onSelect - Callback when theme is clicked
 */
export function ThemeListItem({ theme, isSelected, onSelect }) {
  const isUncategorized = theme.id === 'uncategorized';
  
  return (
    <Box
      onClick={() => onSelect(theme.id)}
      className={`
        bg-white rounded-lg p-4 cursor-pointer
        transition-all duration-150
        ${isSelected 
          ? 'shadow-[inset_0px_0px_0px_1px_#0568fd] bg-[#F0FAFF]' 
          : 'shadow-[inset_0px_0px_0px_0.5px_rgba(108,113,140,0.28)]'
        }
        hover:shadow-[0px_2px_4px_rgba(108,113,140,0.12),inset_0px_0px_0px_0.5px_rgba(108,113,140,0.4)]
      `}
    >
      <Flex gap="SM" alignItems="center">
        {/* Theme Icon */}
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isSelected ? 'bg-[#6C718C]' : 'bg-neutral-100'
        }`}>
          <Tag 
            size={20} 
            className={isSelected ? 'text-white' : 'text-[#6C718C]'} 
          />
        </div>
        
        {/* Theme Content */}
        <Box className="flex-1 min-w-0 overflow-hidden">
          {/* Theme Name */}
          <p className="text-[16px] leading-6 truncate text-black m-0">
            {theme.name}
          </p>
          
          {/* Status / Count */}
          <Text 
            type="caption" 
            color="default.main.secondary"
            className="leading-5"
          >
            {isUncategorized 
              ? `${theme.highlightCount} highlights • ${theme.sessionCount} sessions`
              : theme.status
            }
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default ThemeListItem;
