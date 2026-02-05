/**
 * YesNoPreview Component
 * 
 * Shows the preview for Yes/No blocks.
 * Displays title, description, two large Yes/No option buttons, and Continue button.
 * 
 * Based on: Figma design node 4224:85874
 */
import { useState } from 'react';
import { Flex, Box, Text, Heading, CTAButton, ProgressBar } from '@framework/components/ariane';
import { Check, X } from 'lucide-react';

/**
 * YesNoOption - Large selectable Yes or No button
 */
function YesNoOption({ type, isSelected, onClick }) {
  const isYes = type === 'yes';
  
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 bg-white rounded-[15px] py-6 px-4
        flex flex-col items-center justify-center gap-4
        transition-all duration-150
        ${isSelected 
          ? isYes 
            ? 'ring-2 ring-[#0568FD] bg-[#F0FAFF]' 
            : 'ring-2 ring-[#A4313C] bg-[#FFF6F8]'
          : 'ring-[0.5px] ring-[#6C718C]/[0.28] hover:ring-[#6C718C]/[0.5]'
        }
      `}
    >
      {/* Icon circle */}
      <div 
        className={`
          w-16 h-16 rounded-full flex items-center justify-center
          ${isYes ? 'bg-[#F0FAFF]' : 'bg-[#FFF6F8]'}
        `}
      >
        {isYes ? (
          <Check className="w-8 h-8 text-[#034FD6]" strokeWidth={2.5} />
        ) : (
          <X className="w-8 h-8 text-[#A4313C]" strokeWidth={2.5} />
        )}
      </div>
      
      {/* Label */}
      <Heading 
        level={3} 
        className="text-[20px] leading-6 tracking-[-0.2px] font-semibold text-center"
      >
        {isYes ? 'Yes' : 'No'}
      </Heading>
    </button>
  );
}

/**
 * YesNoPreview - Preview card for yes/no blocks
 * 
 * @param {Object} props
 * @param {Object} props.block - Block data with title and description
 * @param {number} props.progress - Progress percentage (0-100)
 */
export function YesNoPreview({ block, progress = 10 }) {
  const [selected, setSelected] = useState(null); // 'yes', 'no', or null

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
      <Flex flexDirection="column" gap="LG" className="flex-1 px-8 pt-6 pb-4">
        {/* Title and description */}
        <Flex flexDirection="column" gap="MD">
          <Heading 
            level={3} 
            className="text-[20px] leading-6 tracking-[-0.2px] font-semibold"
          >
            {block?.title || 'Do you recall seeing any way to filter by price?'}
          </Heading>
          
          <Text 
            color="default.main.secondary"
            className="text-base leading-6 tracking-[-0.16px]"
          >
            {block?.description || 'Use your first initial thought, there is no right or wrong answer.'}
          </Text>
        </Flex>

        {/* Yes/No options */}
        <Flex gap="SM" className="w-full">
          <YesNoOption 
            type="yes" 
            isSelected={selected === 'yes'} 
            onClick={() => setSelected('yes')} 
          />
          <YesNoOption 
            type="no" 
            isSelected={selected === 'no'} 
            onClick={() => setSelected('no')} 
          />
        </Flex>
      </Flex>

      {/* Footer with CTA */}
      <Box className="px-6 py-4 relative">
        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-[#6C718C]/[0.28]" />
        
        <CTAButton 
          emphasis="primary" 
          size="MD"
          disabled={selected === null}
          className="w-full"
        >
          Continue
        </CTAButton>
      </Box>
    </Box>
  );
}
