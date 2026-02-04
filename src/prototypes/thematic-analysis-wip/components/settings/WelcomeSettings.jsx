/**
 * WelcomeSettings Component
 * 
 * Settings panel content for the Welcome Screen block type.
 * Allows customization of the welcome message shown to participants.
 * 
 * Based on: Figma design for "Bloc-bar" Welcome Screen
 */
import { useState } from 'react';
import {
  Flex,
  Field,
  TextInputControl,
} from '@framework/components/ariane';
import { Divider, SectionHeader } from './SettingsPrimitives';

/**
 * WelcomeSettings - Form content for the Welcome Screen block
 * 
 * @param {Object} props
 * @param {Object} props.block - The welcome block data
 * @param {Function} [props.onBlockChange] - Callback when block data changes
 */
export function WelcomeSettings({ block, onBlockChange }) {
  // Local state for form fields (in real app, these would update the block)
  const [customMessageEnabled, setCustomMessageEnabled] = useState(
    block?.customMessageEnabled ?? true
  );
  const [imageEnabled, setImageEnabled] = useState(block?.imageEnabled ?? false);
  const [title, setTitle] = useState(block?.title || '');
  const [message, setMessage] = useState(block?.description || '');

  /**
   * Handle title updates and sync to parent state.
   */
  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
    onBlockChange?.(block.id, { title: value });
  };

  /**
   * Handle message updates and sync to parent state.
   */
  const handleMessageChange = (event) => {
    const value = event.target.value;
    setMessage(value);
    onBlockChange?.(block.id, { description: value });
  };

  return (
    <Flex flexDirection="column" gap="LG" className="w-full">
      {/* Custom Message Toggle */}
      <SectionHeader
        label="Custom message"
        showToggle
        checked={customMessageEnabled}
        onToggleChange={(value) => {
          setCustomMessageEnabled(value);
          onBlockChange?.(block.id, { customMessageEnabled: value });
        }}
      />

      {/* Divider */}
      <Divider />

      {/* Title Field - Required */}
      <Field label="Title" required>
        <TextInputControl
          value={title}
          placeholder="The first thing testers will read. What will you say?"
          onChange={handleTitleChange}
        />
      </Field>

      {/* Message Field - Optional */}
      <Field label="Message">
        <TextInputControl
          value={message}
          placeholder="Type your intro message here"
          onChange={handleMessageChange}
        />
      </Field>

      {/* Image Section */}
      <SectionHeader
        label="Image"
        helperText="Upload your logo or custom image"
        showToggle
        checked={imageEnabled}
        onToggleChange={(value) => {
          setImageEnabled(value);
          onBlockChange?.(block.id, { imageEnabled: value });
        }}
      />
    </Flex>
  );
}

export default WelcomeSettings;
