/**
 * LegalPreview Component
 * 
 * Shows the preview for Legal Screen blocks.
 * Displays consent title, description, checkbox agreement, and Continue button.
 * 
 * Based on: Figma design node 4224:85981
 */
import { useState } from 'react';
import { Flex, Box, Text, Heading, CTAButton, ProgressBar } from '@framework/components/ariane';
import { Check } from 'lucide-react';

/**
 * CheckboxIndicator - Visual-only checkbox indicator
 */
function CheckboxIndicator({ isChecked }) {
  return (
    <div 
      className={`
        w-4 h-4 rounded shrink-0
        shadow-[0px_1px_2px_0px_rgba(108,113,140,0.08)]
        ${isChecked 
          ? 'bg-[#0568FD] ring-[0.5px] ring-[#0568FD]' 
          : 'bg-white ring-[0.5px] ring-[#6C718C]/80'
        }
        flex items-center justify-center
      `}
    >
      {isChecked && (
        <Check className="w-3 h-3 text-white" strokeWidth={3} />
      )}
    </div>
  );
}

/**
 * LegalPreview - Preview card for legal screen blocks
 * 
 * @param {Object} props
 * @param {Object} props.block - Block data with title and description
 * @param {number} props.progress - Progress percentage (0-100)
 */
export function LegalPreview({ block, progress = 10 }) {
  const [isAgreed, setIsAgreed] = useState(false);

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
        {/* Title and description */}
        <Flex flexDirection="column" gap="MD">
          <Heading 
            level={3} 
            className="text-[20px] leading-6 tracking-[-0.2px] font-semibold"
          >
            {block?.title || 'Consent to participate'}
          </Heading>
          
          <Text 
            color="default.main.secondary"
            className="text-base leading-6 tracking-[-0.16px]"
          >
            {block?.description || 'Before we begin, please confirm you are at least 18 years old and agree to participate in this research study. Your responses will be used only for product improvement.'}
          </Text>
        </Flex>

        {/* Checkbox agreement */}
        <button
          onClick={() => setIsAgreed(!isAgreed)}
          className={`
            w-full bg-white rounded-lg px-4 py-3
            flex items-start gap-2
            shadow-[0px_1px_2px_0px_rgba(108,113,140,0.08)]
            ring-[0.5px] ring-inset
            transition-all duration-150
            text-left
            ${isAgreed 
              ? 'ring-[#0568FD] bg-[#F0FAFF]' 
              : 'ring-[#6C718C]/[0.28] hover:ring-[#6C718C]/[0.5]'
            }
          `}
        >
          {/* Checkbox with top padding to align with text */}
          <div className="pt-1 shrink-0">
            <CheckboxIndicator isChecked={isAgreed} />
          </div>
          
          {/* Label */}
          <Text className="text-base leading-6">
            I agree with the terms
          </Text>
        </button>
      </Flex>

      {/* Footer with CTA */}
      <Box className="px-6 py-4 relative">
        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-[#6C718C]/[0.28]" />
        
        <CTAButton 
          emphasis="primary" 
          size="MD"
          disabled={!isAgreed}
          className="w-full"
        >
          Continue
        </CTAButton>
      </Box>
    </Box>
  );
}
