/**
 * ThemeListItem Component
 * 
 * Represents a single theme in the left panel list.
 * Displays theme icon, name, and status/count.
 */
import { Flex, Box, Text, IconFigure } from '@framework/components/ariane';
import { Tag } from 'lucide-react';
import { THEME_COLOR_MAP } from './ThemeResults';

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
  const isGeneratedTheme = theme.color !== undefined;
  const isThematicAnalysis = theme.id === 'thematic-analysis';
  
  // Get centralized colors for this theme
  const themeColors = THEME_COLOR_MAP[theme.name] || { primary: theme.color || '#6C718C', bg: theme.color ? `${theme.color}15` : '#F5F5F5' };
  
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
        {/* Theme Icon - colored for generated themes, does NOT change on selection */}
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ 
            backgroundColor: isGeneratedTheme ? themeColors.bg : '#F5F5F5'
          }}
        >
          <Tag 
            size={20} 
            style={{ color: isGeneratedTheme ? themeColors.primary : '#6C718C' }}
          />
        </div>
        
        {/* Theme Content */}
        <Box className="flex-1 min-w-0 overflow-hidden">
          {/* Theme Name */}
          <p className="text-[16px] leading-6 truncate text-black m-0">
            {theme.name}
          </p>
          
          {/* Status / Count */}
          <Flex alignItems="center" gap="XS" className="leading-5">
            {isUncategorized ? (
              <span className={`
                px-1.5 py-0.5 rounded text-xs font-medium
                ${theme.newCount > 0 ? 'bg-[#F9F7FF] text-[#6B5BEE]' : 'bg-neutral-100 text-[#6C718C]'}
              `}>
                {theme.highlightCount} highlights
              </span>
            ) : isGeneratedTheme ? (
              <Text type="caption" color="default.main.secondary">
                {theme.highlightCount} highlights
              </Text>
            ) : isThematicAnalysis && theme.analysisComplete ? (
              <Text type="caption" className="text-[#10B981] font-medium">
                Analysis complete
              </Text>
            ) : (
              <Text type="caption" color="default.main.secondary">
                {theme.status}
              </Text>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default ThemeListItem;
