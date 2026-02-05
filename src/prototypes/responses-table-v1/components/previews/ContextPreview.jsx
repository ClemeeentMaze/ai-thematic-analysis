/**
 * ContextPreview Component
 * 
 * Shows the preview for Context blocks.
 * Displays title, description, and Continue button.
 * Used for providing context/instructions before tasks.
 * 
 * Based on: Figma design node 4224:85860
 */
import { Flex, Box, Text, Heading, CTAButton, ProgressBar } from '@framework/components/ariane';

/**
 * ContextPreview - Preview card for context/instruction blocks
 * 
 * @param {Object} props
 * @param {Object} props.block - Block data with title and description
 * @param {number} props.progress - Progress percentage (0-100)
 */
export function ContextPreview({ block, progress = 10 }) {
  return (
    <Box 
      className="
        h-full bg-white rounded-lg overflow-hidden
        shadow-[0px_2px_8px_0px_rgba(108,113,140,0.08),0px_1px_2px_0px_rgba(108,113,140,0.08)]
        ring-[0.5px] ring-[#6C718C]/[0.28]
        flex flex-col
      "
    >
      {/* Progress bar section */}
      <Box className="p-6 relative">
        <ProgressBar progress={progress} />
        {/* Bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#6C718C]/[0.28]" />
      </Box>

      {/* Content area */}
      <Flex flexDirection="column" gap="MD" className="flex-1 px-8 pt-6 pb-4">
        {/* Title and description */}
        <Heading 
          level={3} 
          className="text-[20px] leading-6 tracking-[-0.2px] font-semibold"
        >
          {block?.title || 'Before you begin'}
        </Heading>
        
        <Text 
          color="default.main.secondary"
          className="text-base leading-6 tracking-[-0.16px]"
        >
          {block?.description || "Here's a quick overview to help you understand what you'll be looking at in the next steps. Please watch this and continue when you're ready."}
        </Text>
      </Flex>

      {/* Footer with CTA */}
      <Box className="px-6 py-4 relative">
        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-[#6C718C]/[0.28]" />
        
        <CTAButton 
          emphasis="primary" 
          size="MD"
          className="w-full"
        >
          Continue
        </CTAButton>
      </Box>
    </Box>
  );
}
