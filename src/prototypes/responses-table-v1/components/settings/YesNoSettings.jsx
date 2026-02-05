/**
 * YesNoSettings Component
 * 
 * Settings panel content for the Yes/No block type.
 * Allows configuration of question, notes, image, and response type.
 * 
 * Based on: Figma design for "Bloc-bar" Yes/No
 */
import { useState } from 'react';
import {
  Flex,
  Text,
  Field,
  TextInputControl,
  RadioGroup,
  RadioControl,
} from '@framework/components/ariane';
import { SectionHeader } from './SettingsPrimitives';

/**
 * YesNoSettings - Main settings component
 * 
 * @param {Object} props
 * @param {Object} props.block - The block data
 */
export function YesNoSettings({ block, onBlockChange }) {
  // Local state for form fields
  const [title, setTitle] = useState(block?.title || 'Do you recall seeing any way to filter by price?');
  const [description, setDescription] = useState(
    block?.description || 'Use your first initial thought, there is no right or wrong answer.'
  );
  const [imageEnabled, setImageEnabled] = useState(block?.imageEnabled ?? false);
  const [responseType, setResponseType] = useState(block?.responseType || 'icons');
  const [conditionsEnabled, setConditionsEnabled] = useState(block?.conditionsEnabled ?? false);

  return (
    <Flex flexDirection="column" gap="LG" className="p-4">
      {/* Question field */}
      <Field label="Question" required>
        <TextInputControl
          value={title}
          onChange={(e) => {
            const value = e.target.value;
            setTitle(value);
            onBlockChange?.(block.id, { title: value });
          }}
          placeholder="Ask a yes or no question"
        />
      </Field>

      {/* Add notes field */}
      <Field label="Add notes">
        <TextInputControl
          value={description}
          onChange={(e) => {
            const value = e.target.value;
            setDescription(value);
            onBlockChange?.(block.id, { description: value });
          }}
          placeholder="Additional context for participants"
        />
      </Field>

      {/* Image section */}
      <SectionHeader
        label="Image"
        helperText="Show an image while asking this question"
        showToggle={true}
        checked={imageEnabled}
        onToggleChange={(value) => {
          setImageEnabled(value);
          onBlockChange?.(block.id, { imageEnabled: value });
        }}
      />

      {/* Type section */}
      <Flex flexDirection="column" gap="SM">
        <Text type="body" className="text-black opacity-90">
          Type
        </Text>
        <RadioGroup
          value={responseType}
          onValueChange={(value) => {
            setResponseType(value);
            onBlockChange?.(block.id, { responseType: value });
          }}
          className="flex gap-2"
        >
          <label 
            className={`flex-1 flex items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors ${
              responseType === 'icons' 
                ? 'bg-white ring-1 ring-[#0568FD]' 
                : 'bg-white shadow-[0px_1px_2px_0px_rgba(108,113,140,0.08)] ring-1 ring-inset ring-[rgba(108,113,140,0.28)]'
            }`}
          >
            <RadioControl value="icons" />
            <Text type="body" className="text-black">
              Icons
            </Text>
          </label>
          <label 
            className={`flex-1 flex items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors ${
              responseType === 'emotions' 
                ? 'bg-white ring-1 ring-[#0568FD]' 
                : 'bg-white shadow-[0px_1px_2px_0px_rgba(108,113,140,0.08)] ring-1 ring-inset ring-[rgba(108,113,140,0.28)]'
            }`}
          >
            <RadioControl value="emotions" />
            <Text type="body" className="text-black">
              Emotions
            </Text>
          </label>
        </RadioGroup>
      </Flex>

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
