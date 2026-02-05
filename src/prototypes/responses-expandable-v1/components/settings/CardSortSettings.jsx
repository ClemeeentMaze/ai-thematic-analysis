/**
 * CardSortSettings Component
 * 
 * Settings panel content for the Card Sort block type.
 * Allows configuration of cards, categories, and sorting type.
 * 
 * Based on: Figma design for "Bloc-bar" Card Sort
 */
import { useState } from 'react';
import {
  Flex,
  Text,
  ActionButton,
  RadioGroup,
  RadioControl,
} from '@framework/components/ariane';
import { Plus } from 'lucide-react';
import { SectionHeader, Divider } from './SettingsPrimitives';

/**
 * SectionLabel - Uppercase label for sections (e.g., "YOUR CARDS", "CATEGORIES")
 */
function SectionLabel({ children }) {
  return (
    <Text 
      type="caption" 
      weight="bold" 
      className="uppercase tracking-wider text-[13px] text-[#535A74]"
    >
      {children}
    </Text>
  );
}

/**
 * CountCard - Card showing item count with an add button
 */
function CountCard({ count, itemLabel, onAddClick, addLabel }) {
  return (
    <div className="w-full bg-white rounded-lg px-4 py-2 flex items-center justify-between
      shadow-[0px_1px_2px_0px_rgba(108,113,140,0.08)]
      ring-1 ring-inset ring-[rgba(108,113,140,0.28)]"
    >
      <Text type="caption" className="text-black">
        {count} {itemLabel}
      </Text>
      <ActionButton
        emphasis="secondary"
        size="SM"
        icon={<Plus size={16} />}
        onClick={onAddClick}
        borderless
      >
        {addLabel}
      </ActionButton>
    </div>
  );
}

/**
 * CardSortSettings - Main settings component
 * 
 * @param {Object} props
 * @param {Object} props.block - The block data
 */
export function CardSortSettings({ block, onBlockChange }) {
  // Local state for form fields
  const [customizeInstructions, setCustomizeInstructions] = useState(
    block?.customizeInstructions ?? false
  );
  const [shuffleCards, setShuffleCards] = useState(block?.shuffleCards ?? false);
  const [allowContinue, setAllowContinue] = useState(block?.allowContinue ?? false);
  const [requireRanking, setRequireRanking] = useState(block?.requireRanking ?? false);
  const [sortingType, setSortingType] = useState(block?.sortingType || 'closed');
  const [shuffleCategories, setShuffleCategories] = useState(
    block?.shuffleCategories ?? false
  );
  const [conditionsEnabled, setConditionsEnabled] = useState(block?.conditionsEnabled ?? false);
  
  const cardCount = block?.cards?.length || 0;
  const categoryCount = block?.categories?.length || 0;

  return (
    <Flex flexDirection="column" gap="LG" className="p-4">
      {/* Customize instructions */}
      <SectionHeader
        label="Customize instructions"
        showToggle={true}
        checked={customizeInstructions}
        onToggleChange={(value) => {
          setCustomizeInstructions(value);
          onBlockChange?.(block.id, { customizeInstructions: value });
        }}
      />

      {/* Your Cards section */}
      <Flex flexDirection="column" gap="SM">
        <SectionLabel>Your Cards</SectionLabel>
        <CountCard
          count={cardCount}
          itemLabel="Cards"
          addLabel="Add cards"
          onAddClick={() => console.log('Add cards clicked')}
        />
      </Flex>

      {/* Shuffle cards */}
      <SectionHeader
        label="Shuffle cards"
        showToggle={true}
        checked={shuffleCards}
        onToggleChange={(value) => {
          setShuffleCards(value);
          onBlockChange?.(block.id, { shuffleCards: value });
        }}
      />

      {/* Allow participants to continue */}
      <SectionHeader
        label="Allow participants to continue without completing"
        helperText="Participants will be able to continue to the next task in the maze even if they haven't sorted all the cards."
        showToggle={true}
        checked={allowContinue}
        onToggleChange={(value) => {
          setAllowContinue(value);
          onBlockChange?.(block.id, { allowContinue: value });
        }}
      />

      {/* Require ranking */}
      <SectionHeader
        label="Require participants to rank cards"
        helperText="Participants will have to drag and drop cards within a category to rank them as they prefer"
        showToggle={true}
        checked={requireRanking}
        onToggleChange={(value) => {
          setRequireRanking(value);
          onBlockChange?.(block.id, { requireRanking: value });
        }}
      />

      {/* Card sorting type */}
      <Flex flexDirection="column" gap="SM">
        <Text type="body" className="text-black">
          Card sorting type
        </Text>
        <RadioGroup
          value={sortingType}
          onValueChange={(value) => {
            setSortingType(value);
            onBlockChange?.(block.id, { sortingType: value });
          }}
          className="flex flex-col gap-0"
        >
          <label 
            className={`flex items-center justify-between p-4 rounded-t-lg border cursor-pointer transition-colors ${
              sortingType === 'closed' 
                ? 'bg-[#F0FAFF] border-[#0568FD]' 
                : 'bg-white border-[#CDCEDD] border-b-0'
            }`}
          >
            <Flex flexDirection="column" gap="NONE" className="flex-1">
              <Text type="caption" weight="semi-bold" className="text-black">
                Closed
              </Text>
              <Text type="caption" color="default.main.secondary">
                Participants sort cards into pre-defined categories
              </Text>
            </Flex>
            <RadioControl value="closed" />
          </label>
          <label 
            className={`flex items-center justify-between p-4 rounded-b-lg border cursor-pointer transition-colors ${
              sortingType === 'open' 
                ? 'bg-[#F0FAFF] border-[#0568FD]' 
                : 'bg-white border-[#CDCEDD]'
            }`}
          >
            <Flex flexDirection="column" gap="NONE" className="flex-1">
              <Text type="caption" weight="semi-bold" className="text-black">
                Open
              </Text>
              <Text type="caption" color="default.main.secondary">
                Participants sort cards into categories they create
              </Text>
            </Flex>
            <RadioControl value="open" />
          </label>
        </RadioGroup>
      </Flex>

      <Divider />

      {/* Categories section */}
      <Flex flexDirection="column" gap="SM">
        <SectionLabel>Categories</SectionLabel>
        <CountCard
          count={categoryCount}
          itemLabel="categories"
          addLabel="Add categories"
          onAddClick={() => console.log('Add categories clicked')}
        />
      </Flex>

      {/* Shuffle categories */}
      <SectionHeader
        label="Shuffle categories"
        showToggle={true}
        checked={shuffleCategories}
        onToggleChange={(value) => {
          setShuffleCategories(value);
          onBlockChange?.(block.id, { shuffleCategories: value });
        }}
      />

      {/* Conditions */}
      <SectionHeader
        label="Conditions"
        helperText="Add conditions to jump between your blocks"
        showToggle={true}
        checked={conditionsEnabled}
        onToggleChange={(value) => {
          setConditionsEnabled(value);
          onBlockChange?.(block.id, { conditionsEnabled: value });
        }}
      />
    </Flex>
  );
}
