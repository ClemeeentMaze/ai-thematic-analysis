/**
 * OpinionScalePreview Component
 * 
 * Shows the preview for Opinion Scale blocks.
 * Displays title, description, numerical scale buttons (1-10), labels, and Continue button.
 * 
 * Based on: Figma design node 4228:88104
 */
import { useState } from 'react';
import { Flex, Box, Text, Heading, CTAButton, ProgressBar } from '@framework/components/ariane';

/**
 * ScaleButton - Individual scale option button
 */
function ScaleButton({ value, isSelected, onClick }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`
        flex-1 h-12 rounded-lg font-bold text-base
        transition-all duration-150
        ${isSelected 
          ? 'bg-[#F0FAFF] text-[#0138A9] ring-1 ring-[#0568FD]' 
          : 'bg-white text-[#535A74] shadow-[0px_1px_2px_0px_rgba(108,113,140,0.08)] ring-[0.5px] ring-[#6C718C]/[0.28] hover:ring-[#6C718C]/[0.5]'
        }
      `}
    >
      {value}
    </button>
  );
}

/**
 * OpinionScalePreview - Preview card for opinion scale blocks
 * 
 * @param {Object} props
 * @param {Object} props.block - Block data with title and description
 * @param {number} props.progress - Progress percentage (0-100)
 * @param {number} props.scaleMin - Minimum scale value (default: 1)
 * @param {number} props.scaleMax - Maximum scale value (default: 10)
 * @param {string} props.labelLeft - Left label (default: "Very difficult")
 * @param {string} props.labelCenter - Center label (default: "Neutral")
 * @param {string} props.labelRight - Right label (default: "Very easy")
 */
export function OpinionScalePreview({ 
  block, 
  progress = 10,
  scaleMin = 1,
  scaleMax = 10,
  labelLeft = "Very difficult",
  labelCenter = "Neutral",
  labelRight = "Very easy"
}) {
  const [selectedValue, setSelectedValue] = useState(5);
  
  // Generate scale values array
  const scaleValues = [];
  for (let i = scaleMin; i <= scaleMax; i++) {
    scaleValues.push(i);
  }

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

        {/* Scale buttons and labels */}
        <Flex flexDirection="column" gap="MD">
          {/* Scale buttons row */}
          <Flex gap="XS" className="h-12">
            {scaleValues.map((value) => (
              <ScaleButton
                key={value}
                value={value}
                isSelected={selectedValue === value}
                onClick={setSelectedValue}
              />
            ))}
          </Flex>

          {/* Labels row */}
          <Flex className="text-base text-[#535A74] tracking-[-0.16px]">
            <Text color="default.main.secondary" className="flex-1 text-left">
              {labelLeft}
            </Text>
            <Text color="default.main.secondary" className="flex-1 text-center">
              {labelCenter}
            </Text>
            <Text color="default.main.secondary" className="flex-1 text-right">
              {labelRight}
            </Text>
          </Flex>
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
          Continue
        </CTAButton>
      </Box>
    </Box>
  );
}

export default OpinionScalePreview;
