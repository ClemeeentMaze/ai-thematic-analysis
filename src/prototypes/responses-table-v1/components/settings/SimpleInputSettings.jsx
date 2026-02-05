/**
 * SimpleInputSettings Component
 * 
 * Settings panel content for the Simple Input block type.
 * Allows configuration of question, input type (text, numerical, date, email).
 * 
 * Based on: Figma design for "Bloc-bar" Simple Input
 */
import { useState } from 'react';
import {
  Flex,
  Text,
  Field,
  TextInputControl,
  ActionButton,
} from '@framework/components/ariane';
import { Sparkles, Type, Hash, Calendar, AtSign } from 'lucide-react';
import { SectionHeader } from './SettingsPrimitives';

/**
 * InputTypeCard - Card for selecting input type
 */
function InputTypeCard({ label, icon, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-3 bg-white rounded-lg
        transition-all duration-150
        ${selected 
          ? 'shadow-[inset_0px_0px_0px_1px_#0568fd]' 
          : 'shadow-[0px_1px_2px_0px_rgba(108,113,140,0.08),inset_0px_0px_0px_0.5px_rgba(108,113,140,0.28)]'
        }
        hover:shadow-[0px_1px_2px_0px_rgba(5,104,253,0.08),inset_0px_0px_0px_1px_rgba(5,104,253,0.28)]
      `}
    >
      {/* Icon */}
      <span className="text-[#535a74]">{icon}</span>
      <Text>{label}</Text>
    </button>
  );
}

/**
 * SimpleInputSettings - Form content for the Simple Input block
 * 
 * @param {Object} props
 * @param {Object} props.block - The simple input block data
 */
export function SimpleInputSettings({ block, onBlockChange }) {
  // Local state for form fields
  const [title, setTitle] = useState(block?.title || "What's your email?");
  const [description, setDescription] = useState(
    block?.description || "We'd like to be able to reach out for follow-ups."
  );
  const [imageEnabled, setImageEnabled] = useState(block?.imageEnabled ?? false);
  const [inputType, setInputType] = useState(block?.inputType || 'text');
  const [conditionsEnabled, setConditionsEnabled] = useState(block?.conditionsEnabled ?? false);

  return (
    <Flex flexDirection="column" gap="LG" className="w-full">
      {/* Question Field - Required with AI edit button */}
      <Flex flexDirection="column" gap="SM" className="w-full">
        <Flex gap="XS">
          <Text className="opacity-90">Question</Text>
          <Text className="opacity-90">*</Text>
        </Flex>
        <Flex gap="SM" className="w-full">
          <div className="flex-1">
            <TextInputControl
              value={title}
              placeholder="What do you want to ask?"
              onChange={(e) => {
                const value = e.target.value;
                setTitle(value);
                onBlockChange?.(block.id, { title: value });
              }}
            />
          </div>
          {/* AI Edit Button */}
          <ActionButton
            emphasis="tertiary"
            size="MD"
            iconOnly
            icon={<Sparkles size={16} className="text-[#0568fd]" />}
            className="!bg-white !shadow-[0px_1px_2px_0px_rgba(5,104,253,0.08)] !ring-[0.5px] !ring-inset !ring-[rgba(5,104,253,0.28)] !size-12"
          >
            AI Edit
          </ActionButton>
        </Flex>
      </Flex>

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
        <Flex gap="SM" className="w-full flex-wrap">
          <InputTypeCard
            label="Text"
            icon={<Type size={16} />}
            selected={inputType === 'text'}
            onClick={() => {
              setInputType('text');
              onBlockChange?.(block.id, { inputType: 'text' });
            }}
          />
          <InputTypeCard
            label="Numerical"
            icon={<Hash size={16} />}
            selected={inputType === 'numerical'}
            onClick={() => {
              setInputType('numerical');
              onBlockChange?.(block.id, { inputType: 'numerical' });
            }}
          />
          <InputTypeCard
            label="Date"
            icon={<Calendar size={16} />}
            selected={inputType === 'date'}
            onClick={() => {
              setInputType('date');
              onBlockChange?.(block.id, { inputType: 'date' });
            }}
          />
          <InputTypeCard
            label="Email"
            icon={<AtSign size={16} />}
            selected={inputType === 'email'}
            onClick={() => {
              setInputType('email');
              onBlockChange?.(block.id, { inputType: 'email' });
            }}
          />
        </Flex>
      </Flex>

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

export default SimpleInputSettings;
