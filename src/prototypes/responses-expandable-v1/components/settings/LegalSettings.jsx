/**
 * LegalSettings Component
 * 
 * Settings panel content for the Legal Screen block type.
 * Allows configuration of consent forms, NDAs, and privacy policies.
 * 
 * Based on: Figma design for "Bloc-bar" Legal Screen
 */
import { useState } from 'react';
import {
  Flex,
  Field,
  TextInputControl,
} from '@framework/components/ariane';
import { SectionHeader, UploadArea, WarningCallout } from './SettingsPrimitives';

/**
 * LegalSettings - Form content for the Legal Screen block
 * 
 * @param {Object} props
 * @param {Object} props.block - The legal screen block data
 * @param {Function} [props.onBlockChange] - Callback when block data changes
 */
export function LegalSettings({ block, onBlockChange }) {
  // Local state for form fields
  const [title, setTitle] = useState(block?.title || 'Consent to participate');
  const [description, setDescription] = useState(
    block?.description || 
    'Before we begin, please confirm you are at least 18 years old and agree to participate in this research study. Your responses will be used only for product improvement.'
  );
  const [documentUrl, setDocumentUrl] = useState(block?.documentUrl || '');
  const [conditionsEnabled, setConditionsEnabled] = useState(block?.conditionsEnabled ?? false);

  /**
   * Handle document upload click
   */
  const handleUpload = () => {
    console.log('Upload document clicked');
    // In a real implementation, this would open a file picker
    const placeholderUrl = 'uploaded-document.pdf';
    setDocumentUrl(placeholderUrl);
    onBlockChange?.(block.id, { documentUrl: placeholderUrl });
  };

  return (
    <Flex flexDirection="column" gap="LG" className="w-full">
      {/* Warning Callout */}
      <WarningCallout>
        If you plan to hire testers from our panel, you can't ask for their Personally Identifiable Information.
      </WarningCallout>

      {/* Title Field - Required */}
      <Field label="Title" required>
        <TextInputControl
          value={title}
          placeholder="Enter a title for the legal screen"
          onChange={(e) => {
            const value = e.target.value;
            setTitle(value);
            onBlockChange?.(block.id, { title: value });
          }}
        />
      </Field>

      {/* Description Field */}
      <Field label="Description">
        <TextInputControl
          value={description}
          placeholder="Describe what participants need to consent to"
          onChange={(e) => {
            const value = e.target.value;
            setDescription(value);
            onBlockChange?.(block.id, { description: value });
          }}
        />
      </Field>

      {/* Document Section */}
      <Flex flexDirection="column" gap="SM" className="w-full">
        <SectionHeader
          label="Document"
          helperText="Upload a document to present, such as an NDA or privacy policy."
          required
        />
        <UploadArea onUpload={handleUpload} />
      {documentUrl && (
        <TextInputControl value={documentUrl} readOnly />
      )}
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

export default LegalSettings;
