/**
 * FiveSecondTestPreview Component
 * 
 * Shows the preview for 5-Second Test blocks.
 * Displays an icon, title, description, and Start button.
 * 
 * Based on: Figma design node 4224:85966
 */
import { Flex, Box, Text, Heading, CTAButton, ProgressBar } from '@framework/components/ariane';
import { Image, Play, FileText, Music } from 'lucide-react';

/**
 * IllustrationIcon - Stack of overlapping app cards illustration
 */
function IllustrationIcon() {
  return (
    <div className="relative w-24 h-24">
      {/* Video card (back) */}
      <div className="absolute top-0 left-0 w-10 h-10 bg-[#FF6B6B] rounded-lg flex items-center justify-center shadow-md">
        <Play className="w-5 h-5 text-white fill-white" />
      </div>
      
      {/* Text card */}
      <div className="absolute top-4 left-6 w-10 h-10 bg-[#A5D8FF] rounded-lg flex items-center justify-center shadow-md">
        <FileText className="w-5 h-5 text-[#1971C2]" />
      </div>
      
      {/* Music card */}
      <div className="absolute top-2 left-12 w-10 h-10 bg-[#FFE066] rounded-lg flex items-center justify-center shadow-md">
        <Music className="w-5 h-5 text-[#E67700]" />
      </div>
      
      {/* Image card (front) */}
      <div className="absolute top-10 left-2 w-10 h-10 bg-[#69DB7C] rounded-lg flex items-center justify-center shadow-md">
        <Image className="w-5 h-5 text-[#2F9E44]" />
      </div>
    </div>
  );
}

/**
 * FiveSecondTestPreview - Preview card for 5-second test blocks
 * 
 * @param {Object} props
 * @param {Object} props.block - Block data with title and description
 * @param {number} props.progress - Progress percentage (0-100)
 */
export function FiveSecondTestPreview({ block, progress = 10 }) {
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
      <Flex flexDirection="column" gap="LG" className="flex-1 px-6 pt-6 pb-4">
        {/* Illustration */}
        <IllustrationIcon />
        
        {/* Title and description */}
        <Flex flexDirection="column" gap="MD">
          <Heading 
            level={3} 
            className="text-[20px] leading-6 tracking-[-0.2px] font-semibold"
          >
            {block?.title || 'Focus on the image'}
          </Heading>
          
          <Text 
            color="default.main.secondary"
            className="text-base leading-6 tracking-[-0.16px]"
          >
            {block?.description || 'You will view an image for a limited time. Try to understand what the image is about and remember as much information as you can.'}
          </Text>
        </Flex>
      </Flex>

      {/* Footer with CTA */}
      <Box className="px-6 py-4 relative">
        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-[#6C718C]/[0.28]" />
        
        <CTAButton 
          emphasis="primary" 
          size="MD"
          disabled
          className="w-full"
        >
          Start
        </CTAButton>
      </Box>
    </Box>
  );
}
