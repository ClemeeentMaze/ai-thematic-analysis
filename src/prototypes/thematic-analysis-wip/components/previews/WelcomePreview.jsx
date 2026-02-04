/**
 * WelcomePreview Component
 * 
 * Shows the preview for Welcome Screen blocks.
 * Displays an icon, title, description, and Continue button.
 * No progress bar as this is the intro screen.
 * 
 * Based on: Figma design node 4224:86021
 */
import { Flex, Box, Text, Heading, CTAButton } from '@framework/components/ariane';
import { MessageSquare } from 'lucide-react';

/**
 * WelcomeIllustration - Chat bubbles illustration
 */
function WelcomeIllustration() {
  return (
    <div className="relative w-24 h-24">
      {/* Blue chat bubble (front/bottom) */}
      <div className="absolute bottom-0 left-0 w-14 h-12 bg-[#0568FD] rounded-xl flex items-center justify-center">
        {/* Lines representing text */}
        <div className="flex flex-col gap-1">
          <div className="w-6 h-1 bg-white/60 rounded-full" />
          <div className="w-4 h-1 bg-white/60 rounded-full" />
        </div>
      </div>
      
      {/* Gray/purple chat bubble (back/top) */}
      <div className="absolute top-0 right-2 w-12 h-10 bg-[#6B5BEE] rounded-xl flex items-center justify-center">
        {/* Lines representing text */}
        <div className="flex flex-col gap-1">
          <div className="w-5 h-1 bg-white/60 rounded-full" />
          <div className="w-3 h-1 bg-white/60 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * WelcomePreview - Preview card for welcome screen blocks
 * 
 * @param {Object} props
 * @param {Object} props.block - Block data with title and description
 */
export function WelcomePreview({ block }) {
  return (
    <Box 
      className="
        h-full bg-white rounded-lg overflow-hidden
        shadow-[0px_2px_8px_0px_rgba(108,113,140,0.08),0px_1px_2px_0px_rgba(108,113,140,0.08)]
        ring-[0.5px] ring-[#6C718C]/[0.28]
        flex flex-col
      "
    >
      {/* Content area - no progress bar for welcome screen */}
      <Flex flexDirection="column" gap="LG" className="flex-1 px-6 pt-10 pb-4">
        {/* Illustration */}
        <WelcomeIllustration />
        
        {/* Title and description */}
        <Flex flexDirection="column" gap="MD">
          <Heading 
            level={3} 
            className="text-[20px] leading-6 tracking-[-0.2px] font-semibold"
          >
            {block?.title || 'Welcome'}
          </Heading>
          
          <Text 
            color="default.main.secondary"
            className="text-base leading-6 tracking-[-0.16px]"
          >
            {block?.description || "You've been invited to take part in a research activity. There are no right or wrong answers, just respond in a way that feels natural to you. Your input helps shape better experiences."}
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
          Continue
        </CTAButton>
      </Box>
    </Box>
  );
}
