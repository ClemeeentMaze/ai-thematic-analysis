/**
 * HighlightCard Component
 * 
 * Displays an AI-generated highlight with:
 * - Drag handle
 * - AI insight/summary text
 * - Transcript excerpt
 * - Video thumbnail
 * - Theme tags
 * - Action buttons
 */
import { Flex, Box, Text, ActionButton, Icon } from '@framework/components/ariane';
import { Play, Plus, Pencil, LayoutGrid, Share2, AlignLeft } from 'lucide-react';
import { THEME_COLOR_MAP } from './ThemeResults';

/**
 * Theme tag pill - uses centralized theme colors
 */
function ThemeTag({ label, onRemove }) {
  const themeColors = THEME_COLOR_MAP[label] || { primary: '#6C718C', bg: '#F3F4F6' };
  
  return (
    <span 
      className="inline-flex items-center gap-1 px-2 py-1 text-sm font-medium rounded-full"
      style={{ backgroundColor: themeColors.bg, color: themeColors.primary }}
    >
      {label}
      {onRemove && (
        <button 
          onClick={onRemove}
          className="hover:opacity-70 rounded-full p-0.5 cursor-pointer"
        >
          ×
        </button>
      )}
    </span>
  );
}

/**
 * Add theme button - uses ActionButton Secondary SM
 */
function AddThemeButton({ onClick }) {
  return (
    <ActionButton 
      emphasis="secondary" 
      size="SM" 
      icon={<Plus size={14} />} 
      iconOnly
      onClick={onClick}
    />
  );
}

/**
 * Video thumbnail for highlight
 */
function HighlightThumbnail({ duration = '0:15' }) {
  return (
    <div className="relative w-[160px] h-[90px] rounded-lg overflow-hidden bg-neutral-800 flex-shrink-0">
      {/* Placeholder - would be actual video thumbnail */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-600 to-neutral-800" />
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
          <Play size={18} className="text-neutral-700 ml-0.5" fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

/**
 * HighlightCard - Main component
 * 
 * @param {Object} props
 * @param {string} props.insight - AI-generated insight/summary
 * @param {string} props.transcript - Transcript excerpt
 * @param {Array} props.themes - Array of theme labels
 * @param {boolean} props.isNew - Whether this is a new highlight
 * @param {string} props.participantId - Associated participant ID
 * @param {boolean} props.showThemeTag - Whether to show styled theme tag with color
 * @param {string} props.themeColor - Color for the theme tag background
 */
export function HighlightCard({ 
  insight,
  transcript,
  themes = [],
  isNew = false,
  participantId,
  onAddTheme,
  onEdit,
  onShare,
  showThemeTag = false,
  themeColor,
}) {
  return (
    <div className={`
      relative bg-white rounded-xl p-5
      border ${isNew ? 'border-[#6B5BEE] shadow-[0_0_0_2px_rgba(107,91,238,0.1)]' : 'border-[rgba(108,113,140,0.16)]'}
      transition-all duration-200
    `}>
      {/* New badge - lighter purple color */}
      {isNew && (
        <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#F9F7FF] text-[#6B5BEE] text-xs font-semibold rounded-full">
          New
        </div>
      )}

      <Flex gap="MD">
        {/* Content */}
        <Box className="flex-1 min-w-0">
          {/* AI Insight */}
          <Text className="text-[16px] leading-6 text-neutral-900 mb-4">
            {insight}
          </Text>

          {/* Transcript + Thumbnail row */}
          <Flex gap="MD" className="mb-4">
            {/* Transcript */}
            <Box className="flex-1 min-w-0 bg-[#F8F8FB] rounded-lg p-4">
              <Text color="default.main.secondary" className="line-clamp-3 mb-2">
                {transcript}
              </Text>
              <button className="text-[#0568FD] font-medium text-sm hover:underline cursor-pointer">
                More
              </button>
              
              {/* See in transcript link */}
              <Flex alignItems="center" gap="XS" className="mt-3">
                <AlignLeft size={14} className="text-[#6C718C]" />
                <button className="text-neutral-900 font-medium text-sm hover:underline cursor-pointer">
                  See in transcript
                </button>
              </Flex>
            </Box>

            {/* Video thumbnail */}
            <HighlightThumbnail />
          </Flex>

          {/* Footer: Themes + Actions */}
          <Flex alignItems="center" justifyContent="space-between">
            {/* Themes */}
            <Flex alignItems="center" gap="SM">
              {themes.map((theme, idx) => {
                const themeColors = THEME_COLOR_MAP[theme] || { primary: themeColor || '#6C718C', bg: themeColor ? `${themeColor}20` : '#F3F4F6' };
                return showThemeTag ? (
                  <span 
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium"
                    style={{ backgroundColor: themeColors.bg, color: themeColors.primary }}
                  >
                    {theme}
                    <button className="ml-1 hover:opacity-70">
                      <Plus size={14} />
                    </button>
                  </span>
                ) : (
                  <ThemeTag key={idx} label={theme} />
                );
              })}
              {!showThemeTag && <AddThemeButton onClick={onAddTheme} />}
            </Flex>

            {/* Actions */}
            <Flex alignItems="center" gap="XS">
              <ActionButton 
                emphasis="tertiary" 
                size="SM" 
                icon={<Pencil size={16} />} 
                iconOnly
                onClick={onEdit}
              />
              <ActionButton 
                emphasis="tertiary" 
                size="SM" 
                icon={<LayoutGrid size={16} />} 
                iconOnly
              />
              <ActionButton 
                emphasis="tertiary" 
                size="SM" 
                icon={<Share2 size={16} />} 
                iconOnly
                onClick={onShare}
              />
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
}

export default HighlightCard;
