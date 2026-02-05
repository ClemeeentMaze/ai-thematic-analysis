/**
 * PrototypeTestSettings Component
 * 
 * Settings panel content for the Prototype Test block type.
 * Allows configuration of task, description, prototype, and task position settings.
 * 
 * Based on: Figma design for "Bloc-bar" Prototype Test
 */
import { useState } from 'react';
import {
  Flex,
  Text,
  Field,
  TextInputControl,
  ActionButton,
  SimpleSelect,
} from '@framework/components/ariane';
import { Plus } from 'lucide-react';
import { Divider, SectionHeader } from './SettingsPrimitives';
import { FIELD_OPTIONS } from '../../data';

/**
 * PrototypeTestSettings - Settings panel for Prototype Test block type
 * @param {Object} block - The block data
 */
export function PrototypeTestSettings({ block, onBlockChange }) {
  // Form state
  const [title, setTitle] = useState(block?.title || 'Try using the filter feature');
  const [description, setDescription] = useState(
    block?.description || 'Open the filters and show only items under $25.'
  );
  const [taskPosition, setTaskPosition] = useState(block?.taskPosition || 'bottom-left');
  const [hasPrototype, setHasPrototype] = useState(block?.hasPrototype ?? false);
  
  // Toggle states
  const [showCustomMessage, setShowCustomMessage] = useState(block?.showCustomMessage ?? false);
  const [showConditions, setShowConditions] = useState(block?.conditionsEnabled ?? false);

  const toggleCustomMessage = (value) => {
    setShowCustomMessage(value);
    onBlockChange?.(block.id, { showCustomMessage: value });
  };
  const toggleConditions = (value) => {
    setShowConditions(value);
    onBlockChange?.(block.id, { conditionsEnabled: value });
  };

  return (
    <Flex flexDirection="column" gap="LG" className="w-full">
      {/* Task field */}
      <Field label="Task" required>
        <TextInputControl
          value={title}
          placeholder="Try using the filter feature"
          onChange={(e) => {
            const value = e.target.value;
            setTitle(value);
            onBlockChange?.(block.id, { title: value });
          }}
        />
      </Field>

      {/* Description field */}
      <Field label="Description">
        <TextInputControl
          value={description}
          placeholder="Open the filters and show only items under $25."
          onChange={(e) => {
            const value = e.target.value;
            setDescription(value);
            onBlockChange?.(block.id, { description: value });
          }}
        />
      </Field>

      <Divider />

      {/* Prototype section */}
      <div className="flex flex-col gap-2 w-full">
        <Flex gap="XS" className="w-full">
          <Text type="body" className="text-black opacity-90">Prototype</Text>
          <Text type="body" className="text-black opacity-90">*</Text>
        </Flex>
        
        {/* Add Prototype button */}
        <ActionButton 
          emphasis="tertiary" 
          size="MD"
          icon={<Plus size={16} />}
          className="w-full justify-center text-[#0568FD] border border-[rgba(5,104,253,0.28)]"
          onClick={() => {
            setHasPrototype(true);
            onBlockChange?.(block.id, { hasPrototype: true, prototypeUrl: 'prototype-link' });
          }}
        >
          {hasPrototype ? 'Prototype added' : 'Add Prototype'}
        </ActionButton>
        
        <Text type="caption" color="default.main.secondary">
          This prototype will be linked to all mission blocks in this maze
        </Text>
      </div>

      {/* Task position settings */}
      <Field label="Task position settings">
        <SimpleSelect
          value={taskPosition}
          onChange={(value) => {
            setTaskPosition(value);
            onBlockChange?.(block.id, { taskPosition: value });
          }}
          options={FIELD_OPTIONS.taskPosition}
        />
      </Field>

      <Divider />

      {/* Custom task completion message */}
      <SectionHeader
        label="Custom task completion message"
        showToggle
        checked={showCustomMessage}
        onToggleChange={toggleCustomMessage}
      />

      {/* Conditions */}
      <SectionHeader
        label="Conditions"
        helperText="Add conditions to jump between your blocks"
        showToggle
        checked={showConditions}
        onToggleChange={toggleConditions}
      />
    </Flex>
  );
}
