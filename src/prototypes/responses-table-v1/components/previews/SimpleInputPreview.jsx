/**
 * SimpleInputPreview Component
 * 
 * Shows the preview for Simple Input blocks.
 * Displays title, description, single-line text input, and Continue button.
 * 
 * Based on: Figma design node 4228:88082
 */
import { Flex, Box, Text, Heading, CTAButton, ProgressBar, TextInputControl } from '@framework/components/ariane';

/**
 * SimpleInputPreview - Preview card for simple input blocks
 * 
 * @param {Object} props
 * @param {Object} props.block - Block data with title and description
 * @param {number} props.progress - Progress percentage (0-100)
 */
export function SimpleInputPreview({ block, progress = 10 }) {
  return (
    <Box 
      className="
        h-full bg-white rounded-lg overflow-hidden
        shadow-[0px_2px_8px_0px_rgba(108,113,140,0.08),0px_1px_2px_0px_rgba(108,113,140,0.08)]
        ring-[0.5px] ring-[#6C718C]/[0.28]
        flex flex-col
      "
    >
      {/* Progress bar section with bottom divider */}
      <Box className="p-6 shadow-[inset_0px_-0.5px_0px_0px_rgba(108,113,140,0.28)]">
        <ProgressBar value={progress} max={100} solid className="h-1" />
      </Box>

      {/* Content section */}
      <Flex flexDirection="column" gap="LG" className="px-8 py-6 flex-1">
        {/* Title and description */}
        <Flex flexDirection="column" gap="MD">
          <Heading 
            level={2} 
            className="text-[20px] leading-6 font-semibold tracking-[-0.2px]"
          >
            {block?.title || 'Untitled'}
          </Heading>
          <Text 
            color="default.main.secondary" 
            className="text-base leading-6 tracking-[-0.16px]"
          >
            {block?.description || 'No description provided.'}
          </Text>
        </Flex>

        {/* Text input */}
        <TextInputControl
          placeholder="Type your answer here"
        />
      </Flex>

      {/* Footer with CTA button */}
      <Box 
        className="
          p-4 bg-white
          shadow-[inset_0px_0.5px_0px_0px_rgba(108,113,140,0.28)]
        "
      >
        <CTAButton emphasis="primary" disabled fullWidth size="MD">
          Continue
        </CTAButton>
      </Box>
    </Box>
  );
}

export default SimpleInputPreview;
