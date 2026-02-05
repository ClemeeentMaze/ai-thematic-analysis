/**
 * ContextSettings Component
 * 
 * Settings panel content for the Context Screen block type.
 * Allows configuration of a message to provide context before tasks.
 * 
 * Based on: Figma design for "Bloc-bar" Context Screen
 */
import { useState } from 'react';
import {
  Flex,
  Field,
  TextInputControl,
} from '@framework/components/ariane';
import { SectionHeader } from './SettingsPrimitives';

/**
 * ContextSettings renders the settings form for Context Screen blocks
 * 
 * @param {Object} props
 * @param {Object} props.block - The block data
 */
export function ContextSettings({ block, onBlockChange }) {
  const [title, setTitle] = useState(block?.title || 'Before you begin');
  const [description, setDescription] = useState(
    block?.description ||
      "Here's a quick overview to help you understand what you'll be looking at in the next steps. Please watch this and continue when you're ready."
  );
  const [showImage, setShowImage] = useState(block?.imageEnabled ?? false);
  const [showConditions, setShowConditions] = useState(block?.conditionsEnabled ?? false);

  return (
    <Flex flexDirection="column" gap="LG" className="w-full">
      {/* Message Field */}
      <Field label="Message" required>
        <TextInputControl
          value={title}
          placeholder="Enter your message..."
          onChange={(e) => {
            const value = e.target.value;
            setTitle(value);
            onBlockChange?.(block.id, { title: value });
          }}
        />
      </Field>

      {/* Add Notes Field */}
      <Field label="Add notes">
        <TextInputControl
          value={description}
          placeholder="Add additional context..."
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
        helperText="Display an image in this block"
        showToggle
        checked={showImage}
        onToggleChange={(value) => {
          setShowImage(value);
          onBlockChange?.(block.id, { imageEnabled: value });
        }}
      />

      {/* Conditions Section */}
      <SectionHeader
        label="Conditions"
        helperText="Add conditions to jump between your blocks"
        showToggle
        checked={showConditions}
        onToggleChange={(value) => {
          setShowConditions(value);
          onBlockChange?.(block.id, { conditionsEnabled: value });
        }}
      />
    </Flex>
  );
}

export default ContextSettings;
