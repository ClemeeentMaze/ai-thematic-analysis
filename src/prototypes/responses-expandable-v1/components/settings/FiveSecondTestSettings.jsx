/**
 * FiveSecondTestSettings Component
 * 
 * Settings panel content for the 5 Second Test block type.
 * Allows configuration of image to show and duration.
 * 
 * Based on: Figma design for "Bloc-bar" 5-Second Test
 */
import { useState } from 'react';
import {
  Flex,
  Text,
} from '@framework/components/ariane';
import { SectionHeader, Divider, UploadCard, NumberStepper } from './SettingsPrimitives';

/**
 * FiveSecondTestSettings - Main settings component
 * 
 * @param {Object} props
 * @param {Object} props.block - The block data
 */
export function FiveSecondTestSettings({ block, onBlockChange }) {
  // Local state for form fields
  const [customizeInstructions, setCustomizeInstructions] = useState(
    block?.customizeInstructions ?? false
  );
  const [seconds, setSeconds] = useState(block?.seconds ?? 5);
  const [imageUrl, setImageUrl] = useState(block?.imageUrl || '');
  const [conditionsEnabled, setConditionsEnabled] = useState(block?.conditionsEnabled ?? false);

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

      <Divider />

      {/* Image section */}
      <Flex flexDirection="column" gap="SM">
        <Flex flexDirection="column" gap="NONE">
          <Text type="body" className="text-black">
            Image
          </Text>
          <Text type="caption" color="default.main.secondary">
            Select an image to show to users for a limited time.
          </Text>
        </Flex>
        <UploadCard
          title="Upload Image"
          description="Choose a PNG, JPG, or GIF file from your device"
          onClick={() => {
            console.log('Upload image clicked');
            const placeholderUrl = 'uploaded-image.png';
            setImageUrl(placeholderUrl);
            onBlockChange?.(block.id, { imageUrl: placeholderUrl });
          }}
        />
      </Flex>

      {/* Number of seconds section */}
      <Flex flexDirection="column" gap="SM">
        <Text type="body" className="text-black">
          Number of seconds to show image
        </Text>
        <NumberStepper
          value={seconds}
          onChange={(value) => {
            setSeconds(value);
            onBlockChange?.(block.id, { seconds: value });
          }}
          min={1}
          max={60}
        />
        <Text type="caption" color="default.main.secondary">
          Add question blocks after this to collect first impressions
        </Text>
      </Flex>

      {/* Conditions section */}
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
