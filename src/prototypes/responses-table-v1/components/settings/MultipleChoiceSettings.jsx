/**
 * MultipleChoiceSettings Component
 * 
 * Settings panel content for the Multiple Choice block type.
 * Allows configuration of question, choices, and selection type.
 * 
 * Based on: Figma design for "Bloc-bar" Multiple Choice
 */
import { useState } from 'react';
import {
  Flex,
  Text,
  Field,
  TextInputControl,
  ActionButton,
  Toggle,
} from '@framework/components/ariane';
import { Plus } from 'lucide-react';
import { SectionHeader, SelectTypeCard } from './SettingsPrimitives';

/**
 * MultipleChoiceSettings - Form content for the Multiple Choice block
 * 
 * @param {Object} props
 * @param {Object} props.block - The multiple choice block data
 */
export function MultipleChoiceSettings({ block, onBlockChange }) {
  // Local state for form fields
  const [title, setTitle] = useState(block?.title || 'What devices do you use on a weekly basis?');
  const [description, setDescription] = useState(
    block?.description || 'Base it off of most weeks, not just this past week.'
  );
  const [imageEnabled, setImageEnabled] = useState(block?.imageEnabled ?? false);
  const [selectType, setSelectType] = useState(block?.selectType || 'single');
  const [shuffleEnabled, setShuffleEnabled] = useState(block?.shuffleEnabled ?? true);
  const [choices, setChoices] = useState(block?.choices || ['']);
  const [otherOptionEnabled, setOtherOptionEnabled] = useState(block?.otherOptionEnabled ?? false);
  const [conditionsEnabled, setConditionsEnabled] = useState(block?.conditionsEnabled ?? false);

  /**
   * Add a new choice row
   */
  const handleAddChoice = () => {
    const nextChoices = [...choices, ''];
    setChoices(nextChoices);
    onBlockChange?.(block.id, { choices: nextChoices });
  };

  /**
   * Update a choice's text value
   */
  const handleChoiceChange = (index, text) => {
    const newChoices = [...choices];
    newChoices[index] = text;
    setChoices(newChoices);
    onBlockChange?.(block.id, { choices: newChoices });
  };

  return (
    <Flex flexDirection="column" gap="LG" className="w-full">
      {/* Question Field - Required */}
      <Field label="Question" required>
        <TextInputControl
          value={title}
          placeholder="What do you want to ask?"
          onChange={(e) => {
            const value = e.target.value;
            setTitle(value);
            onBlockChange?.(block.id, { title: value });
          }}
        />
      </Field>

      {/* Add Notes Field - Optional */}
      <Field label="Add notes">
        <TextInputControl
          value={description}
          placeholder="Add additional context for participants"
          onChange={(e) => {
            const value = e.target.value;
            setDescription(value);
            onBlockChange?.(block.id, { description: value });
          }}
        />
      </Field>

      {/* Image Section */}
      <SectionHeader
        label="Image"
        helperText="Show an image while asking this question"
        showToggle
        checked={imageEnabled}
        onToggleChange={(value) => {
          setImageEnabled(value);
          onBlockChange?.(block.id, { imageEnabled: value });
        }}
      />

      {/* Type Selection */}
      <Flex flexDirection="column" gap="SM" className="w-full">
        <Text className="opacity-90">Type</Text>
        <Flex gap="SM" className="w-full">
          <SelectTypeCard
            label="Single-select"
            selected={selectType === 'single'}
            onClick={() => {
              setSelectType('single');
              onBlockChange?.(block.id, { selectType: 'single' });
            }}
          />
          <SelectTypeCard
            label="Multi-select"
            selected={selectType === 'multi'}
            onClick={() => {
              setSelectType('multi');
              onBlockChange?.(block.id, { selectType: 'multi' });
            }}
          />
        </Flex>
      </Flex>

      {/* Choices Section */}
      <Flex flexDirection="column" gap="SM" className="w-full">
        {/* Header with Shuffle toggle */}
        <Flex justifyContent="space-between" alignItems="center" className="w-full">
          <Flex gap="XS">
            <Text>Choices</Text>
            <Text className="opacity-90">*</Text>
          </Flex>
          <Flex alignItems="center" gap="SM">
            <Text>Shuffle</Text>
            <Toggle
              size="xs"
              checked={shuffleEnabled}
              onChange={(value) => {
                setShuffleEnabled(value);
                onBlockChange?.(block.id, { shuffleEnabled: value });
              }}
            />
          </Flex>
        </Flex>

        {/* Choice Rows */}
        {choices.map((choice, index) => (
          <TextInputControl
            key={index}
            value={choice}
            placeholder="Enter choice"
            onChange={(e) => handleChoiceChange(index, e.target.value)}
          />
        ))}

        {/* Add Choice Button */}
        <ActionButton
          emphasis="tertiary"
          size="SM"
          icon={<Plus size={16} />}
          onClick={handleAddChoice}
          className="self-start"
        >
          Add choice
        </ActionButton>
      </Flex>

      {/* 'Other' option input Section */}
      <SectionHeader
        label="'Other' option input"
        helperText="Allow testers to enter a custom answer"
        showToggle
        checked={otherOptionEnabled}
        onToggleChange={(value) => {
          setOtherOptionEnabled(value);
          onBlockChange?.(block.id, { otherOptionEnabled: value });
        }}
      />

      {/* Conditions Section */}
      <SectionHeader
        label="Conditions"
        helperText="Add conditions to jump between your blocks"
        showToggle
        checked={conditionsEnabled}
        onToggleChange={(value) => {
          setConditionsEnabled(value);
          onBlockChange?.(block.id, { conditionsEnabled: value });
        }}
      />
    </Flex>
  );
}

export default MultipleChoiceSettings;
