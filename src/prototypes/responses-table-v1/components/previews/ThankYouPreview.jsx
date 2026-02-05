/**
 * ThankYouPreview Component
 * 
 * Shows the preview for Thank You / End Screen blocks.
 * Displays a success icon, title, description, and optional button.
 * No progress bar as this is the final screen.
 * 
 * Based on: Figma design node 4224:86031
 */
import { Flex, Box, Text, Heading, CTAButton } from '@framework/components/ariane';
import { Check } from 'lucide-react';

/**
 * SuccessIllustration - Green checkmark circle
 */
function SuccessIllustration() {
  return (
    <div className="w-24 h-24 rounded-full bg-[#15807B] flex items-center justify-center">
      <Check className="w-12 h-12 text-white" strokeWidth={3} />
    </div>
  );
}

/**
 * ThankYouPreview - Preview card for thank you / end screen blocks
 * 
 * @param {Object} props
 * @param {Object} props.block - Block data with title, description, and buttonText
 */
export function ThankYouPreview({ block }) {
  return (
    <Box 
      className="
        h-full bg-white rounded-lg overflow-hidden
        shadow-[0px_2px_8px_0px_rgba(108,113,140,0.08),0px_1px_2px_0px_rgba(108,113,140,0.08)]
        ring-[0.5px] ring-[#6C718C]/[0.28]
        flex flex-col
      "
    >
      {/* Content area - no progress bar for end screen */}
      <Flex flexDirection="column" gap="LG" className="flex-1 px-6 pt-10 pb-4">
        {/* Success illustration */}
        <SuccessIllustration />
        
        {/* Title and description */}
        <Flex flexDirection="column" gap="MD">
          <Heading 
            level={3} 
            className="text-[20px] leading-6 tracking-[-0.2px] font-semibold"
          >
            {block?.title || 'Maybe next time!'}
          </Heading>
          
          <Text 
            color="default.main.secondary"
            className="text-base leading-6 tracking-[-0.16px]"
          >
            {block?.description || "Thanks for answering our initial questions. Unfortunately, it looks like you don't meet the specific criteria for this study."}
          </Text>
        </Flex>
      </Flex>

      {/* Footer with CTA */}
      <Box className="px-4 py-4 relative">
        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-[#6C718C]/[0.28]" />
        
        <CTAButton 
          emphasis="primary" 
          size="MD"
          className="w-full"
        >
          {block?.buttonText || 'Add button text'}
        </CTAButton>
      </Box>
    </Box>
  );
}
