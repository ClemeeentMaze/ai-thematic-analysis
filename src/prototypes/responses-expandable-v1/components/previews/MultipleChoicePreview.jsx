/**
 * MultipleChoicePreview Component
 * 
 * Shows the preview for Multiple Choice blocks.
 * Displays title, description, radio button options, and Continue button.
 * 
 * Based on: Figma design node 4224:85545
 */
import { useState } from 'react';
import { Flex, Box, Text, Heading, CTAButton, ProgressBar } from '@framework/components/ariane';

/**
 * RadioIndicator - Visual-only radio button indicator (doesn't require RadioGroup context)
 */
function RadioIndicator({ isSelected }) {
  return (
    <div 
      className={`
        w-4 h-4 rounded-full shrink-0
        shadow-[0px_1px_2px_0px_rgba(108,113,140,0.08)]
        ${isSelected 
          ? 'bg-[#0568FD] ring-[0.5px] ring-[#0568FD]' 
          : 'bg-white ring-[0.5px] ring-[#6C718C]/80'
        }
        flex items-center justify-center
      `}
    >
      {isSelected && (
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      )}
    </div>
  );
}

/**
 * ChoiceItem - Individual choice option with radio button
 */
function ChoiceItem({ label, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full bg-white rounded-lg px-4 py-3
        flex items-start gap-2
        shadow-[0px_1px_2px_0px_rgba(108,113,140,0.08)]
        ring-[0.5px] ring-inset
        transition-all duration-150
        text-left
        ${isSelected 
          ? 'ring-[#0568FD] bg-[#F0FAFF]' 
          : 'ring-[#6C718C]/[0.28] hover:ring-[#6C718C]/[0.5]'
        }
      `}
    >
      {/* Radio button container with top padding to align with text */}
      <div className="pt-1 shrink-0">
        <RadioIndicator isSelected={isSelected} />
      </div>
      
      {/* Label */}
      <Text className="text-base leading-6">
        {label}
      </Text>
    </button>
  );
}

/**
 * MultipleChoicePreview - Preview card for multiple choice blocks
 * 
 * @param {Object} props
 * @param {Object} props.block - Block data with title, description, and choices
 * @param {number} props.progress - Progress percentage (0-100)
 */
export function MultipleChoicePreview({ block, progress = 10 }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  // Default choices if block doesn't have them
  const choices = block?.choices || [
    'Desktop',
    'Laptop',
    'Smartphone',
    'Tablet'
  ];

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
            {block?.title || 'What devices do you use on a weekly basis?'}
          </Heading>
          
          <Text 
            color="default.main.secondary"
            className="text-base leading-6 tracking-[-0.16px]"
          >
            {block?.description || 'Base it off of most weeks, not just this past week.'}
          </Text>
        </Flex>

        {/* Choice options */}
        <Flex flexDirection="column" gap="SM">
          {choices.map((choice, index) => (
            <ChoiceItem
              key={index}
              label={choice}
              isSelected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
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
