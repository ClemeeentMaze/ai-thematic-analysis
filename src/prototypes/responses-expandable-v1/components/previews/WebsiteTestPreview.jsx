/**
 * WebsiteTestPreview Component
 * 
 * Shows the preview for Website Test / Mission blocks with a prototype configured.
 * Displays progress bar, title, description, screenshot area, info text, and CTA.
 * 
 * Based on: Figma design node 4224:85443
 */
import { Flex, Box, Text, Heading, CTAButton, ProgressBar, Icon } from '@framework/components/ariane';
import { Info } from 'lucide-react';

/**
 * WebsiteTestPreview - Preview card for website/prototype test blocks
 * 
 * @param {Object} props
 * @param {Object} props.block - Block data with title and description
 * @param {number} props.progress - Progress percentage (0-100)
 */
export function WebsiteTestPreview({ block, progress = 10 }) {
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

        {/* Screenshot area - light blue background */}
        <Box 
          className="
            w-full aspect-[2208/1324] rounded-lg overflow-hidden
            bg-[#E8F4FD] flex items-center justify-center
          "
        >
          {/* Placeholder wireframe illustration */}
          <Box 
            className="
              w-[60%] max-w-[280px] bg-white rounded-md 
              shadow-sm border border-dashed border-[#0568FD]/30
              p-4
            "
          >
            {/* Mock browser window */}
            <Flex gap="XS" className="mb-3">
              <Box className="w-2 h-2 rounded-full bg-[#FF6B6B]" />
              <Box className="w-2 h-2 rounded-full bg-[#FFE66D]" />
              <Box className="w-2 h-2 rounded-full bg-[#4ECB71]" />
            </Flex>
            {/* Mock content lines */}
            <Box className="h-2 w-3/4 bg-[#E8F4FD] rounded mb-2" />
            <Box className="h-8 w-full bg-[#E8F4FD] rounded mb-2" />
            <Flex gap="SM">
              <Box className="h-12 flex-1 bg-[#E8F4FD] rounded" />
              <Box className="h-12 flex-1 bg-[#E8F4FD] rounded" />
            </Flex>
            <Flex gap="SM" className="mt-2">
              <Box className="h-2 w-1/2 bg-[#E8F4FD] rounded" />
              <Box className="h-4 w-12 bg-[#0568FD] rounded" />
            </Flex>
          </Box>
        </Box>

        {/* Info row */}
        <Flex gap="MD" alignItems="center">
          <Info size={16} className="text-[#535A74] flex-shrink-0" />
          <Text 
            color="default.main.secondary" 
            className="text-base leading-6 tracking-[-0.16px]"
          >
            This task will be opened in a new window
          </Text>
        </Flex>
      </Flex>

      {/* Footer with CTA button */}
      <Box 
        className="
          p-4 bg-white
          shadow-[inset_0px_0.5px_0px_0px_rgba(108,113,140,0.28)]
        "
      >
        <CTAButton emphasis="primary" disabled fullWidth size="MD">
          Start task
        </CTAButton>
      </Box>
    </Box>
  );
}

export default WebsiteTestPreview;
