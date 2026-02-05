/**
 * CardSortPreview Component
 * 
 * Shows the preview for Card Sort blocks (drag and drop).
 * Displays cards on the left and category drop zones on the right.
 * 
 * Based on: Figma design node 4224:85915
 */
import { Flex, Box, Text, Heading, CTAButton, ProgressBar, ActionButton } from '@framework/components/ariane';
import { Info, GripVertical } from 'lucide-react';

/**
 * DraggableCard - A card that can be dragged to categories
 */
function DraggableCard({ label }) {
  return (
    <div 
      className="
        w-full bg-white rounded-lg px-4 py-3
        flex items-center gap-2
        shadow-[0px_2px_8px_0px_rgba(108,113,140,0.08),0px_1px_2px_0px_rgba(108,113,140,0.08)]
        ring-[0.5px] ring-inset ring-[#6C718C]/[0.28]
        cursor-grab active:cursor-grabbing
        hover:ring-[#6C718C]/[0.5]
        transition-all duration-150
      "
    >
      <GripVertical className="w-4 h-4 text-[#6C718C]" />
      <Text className="text-base leading-6 flex-1">{label}</Text>
    </div>
  );
}

/**
 * CategoryDropZone - A category where cards can be dropped
 */
function CategoryDropZone({ name, cardCount = 0 }) {
  return (
    <Box 
      className="
        w-full bg-white rounded-lg overflow-hidden
        ring-[0.5px] ring-inset ring-[#6C718C]/[0.28]
      "
    >
      {/* Category header */}
      <Box className="bg-[#F8F8FB] px-4 py-3 relative">
        <Text className="text-base leading-6">{name}</Text>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#6C718C]/[0.28]" />
      </Box>
      
      {/* Drop area */}
      <Flex flexDirection="column" gap="SM" className="p-4">
        {/* Empty placeholder */}
        <Box 
          className="
            w-full border border-dashed border-[#CDCEDD] rounded-lg
            px-4 py-3 text-center
          "
        >
          <Text color="default.extra.dormant" className="text-base">Empty</Text>
        </Box>
        
        {/* Card count badge */}
        <Box className="bg-[#F8F8FB] rounded-lg px-2 py-1 w-fit">
          <Text color="default.main.secondary" className="text-sm">
            {cardCount} cards
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

/**
 * CardSortPreview - Preview card for card sort blocks
 * 
 * @param {Object} props
 * @param {Object} props.block - Block data with title and description
 * @param {number} props.progress - Progress percentage (0-100)
 */
export function CardSortPreview({ block, progress = 10 }) {
  // Sample data
  const cards = ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5', 'Card 6'];
  const categories = ['[Category Name]', '[Category Name]', '[Category Name]'];

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
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#6C718C]/[0.28]" />
      </Box>

      {/* Header with title and instructions button */}
      <Flex flexDirection="column" gap="MD" className="px-6 pt-6">
        <Heading 
          level={3} 
          className="text-[20px] leading-6 tracking-[-0.2px] font-semibold"
        >
          {block?.title || 'Drag and drop cards into each category'}
        </Heading>
        
        <ActionButton 
          emphasis="secondary"
          size="SM"
          icon={<Info className="w-4 h-4" />}
        >
          Instructions
        </ActionButton>
      </Flex>

      {/* Two-column content area */}
      <Flex className="flex-1 min-h-0 relative">
        {/* Divider at top of content */}
        <div className="absolute top-0 left-0 right-0 h-px bg-[#6C718C]/[0.28]" />
        
        {/* Left column - Cards */}
        <Box className="w-[248px] p-6 relative">
          <Flex flexDirection="column" gap="SM">
            {/* Section header */}
            <Flex justifyContent="space-between" alignItems="center" className="mb-2">
              <Text 
                className="text-[13px] font-bold uppercase tracking-[0.26px]"
                color="default.main.secondary"
              >
                Cards
              </Text>
              <Box className="bg-[#F8F8FB] rounded-lg px-2 py-1">
                <Text color="default.main.secondary" className="text-sm">
                  {cards.length} remaining
                </Text>
              </Box>
            </Flex>
            
            {/* Card list */}
            {cards.map((card, index) => (
              <DraggableCard key={index} label={card} />
            ))}
          </Flex>
          
          {/* Right border divider */}
          <div className="absolute top-0 bottom-0 right-0 w-px bg-[#6C718C]/[0.28]" />
        </Box>
        
        {/* Right column - Categories */}
        <Box className="flex-1 p-6 overflow-auto">
          <Flex flexDirection="column" gap="SM">
            {/* Section header */}
            <Text 
              className="text-[13px] font-bold uppercase tracking-[0.26px] mb-2"
              color="default.main.secondary"
            >
              Categories
            </Text>
            
            {/* Category list */}
            {categories.map((category, index) => (
              <CategoryDropZone key={index} name={category} cardCount={0} />
            ))}
          </Flex>
        </Box>
      </Flex>

      {/* Footer with CTA */}
      <Box className="px-6 py-4 relative">
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
