/**
 * AppTestSettings Component
 * 
 * Settings panel content for the App Test block type.
 * Allows configuration of task, description, and task link.
 * 
 * Based on: Figma design for "Bloc-bar" App Test
 */
import { useState } from 'react';
import {
  Flex,
  Text,
  Field,
  TextInputControl,
  ActionButton,
} from '@framework/components/ariane';
import { Info, Settings } from 'lucide-react';
import { Divider, SectionHeader } from './SettingsPrimitives';

/**
 * EducationalCard - Info card about study requirements
 */
function EducationalCard({ onOpenRequirements, onLearnMore }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-[inset_0px_0px_0px_0.5px_rgba(108,113,140,0.28)]">
      <Flex gap="SM" alignItems="flex-start">
        {/* Info Icon */}
        <div className="w-8 h-8 rounded-full bg-[#F9F7FF] flex items-center justify-center flex-shrink-0">
          <Info size={16} className="text-[#6B5BEE]" />
        </div>
        
        {/* Content */}
        <Flex flexDirection="column" gap="SM" className="flex-1">
          {/* Text */}
          <Flex flexDirection="column" gap="XS">
            <Text type="body" className="font-semibold text-black text-sm">
              Update study requirements
            </Text>
            <Text type="caption" className="text-black">
              App test requires changes to Clips settings and device requirements.
            </Text>
          </Flex>
          
          {/* Actions */}
          <Flex gap="SM">
            <ActionButton
              emphasis="tertiary"
              size="SM"
              icon={<Settings size={16} className="text-[#0568fd]" />}
              onClick={onOpenRequirements}
              className="!text-[#0568fd] !shadow-[0px_1px_2px_0px_rgba(5,104,253,0.08)] !ring-[0.5px] !ring-inset !ring-[rgba(5,104,253,0.28)]"
            >
              Open study requirements
            </ActionButton>
            <ActionButton
              emphasis="tertiary"
              size="SM"
              onClick={onLearnMore}
            >
              Learn more
            </ActionButton>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

/**
 * AppTestSettings - Form content for the App Test block
 * 
 * @param {Object} props
 * @param {Object} props.block - The app test block data
 */
export function AppTestSettings({ block, onBlockChange }) {
  // Local state for form fields
  const [title, setTitle] = useState(block?.title || 'Try using the filter feature');
  const [description, setDescription] = useState(
    block?.description || 'Open the filters and show only items under $25.'
  );
  const [taskLinkEnabled, setTaskLinkEnabled] = useState(block?.taskLinkEnabled ?? false);

  /**
   * Handle opening study requirements
   */
  const handleOpenRequirements = () => {
    console.log('Open study requirements clicked');
  };

  /**
   * Handle learn more
   */
  const handleLearnMore = () => {
    console.log('Learn more clicked');
  };

  return (
    <Flex flexDirection="column" gap="LG" className="w-full">
      {/* Educational Card */}
      <EducationalCard 
        onOpenRequirements={handleOpenRequirements}
        onLearnMore={handleLearnMore}
      />

      {/* Task Field - Required */}
      <Field label="Task" required>
        <TextInputControl
          value={title}
          placeholder="What task should participants complete?"
          onChange={(e) => {
            const value = e.target.value;
            setTitle(value);
            onBlockChange?.(block.id, { title: value });
          }}
        />
      </Field>

      {/* Description Field - Optional */}
      <Field label="Description">
        <TextInputControl
          value={description}
          placeholder="Add a description (optional)..."
          onChange={(e) => {
            const value = e.target.value;
            setDescription(value);
            onBlockChange?.(block.id, { description: value });
          }}
        />
      </Field>

      {/* Divider */}
      <Divider />

      {/* Task Link Section */}
      <SectionHeader
        label="Task link"
        helperText="Participants are directed to a link when starting the task."
        showToggle
        checked={taskLinkEnabled}
        onToggleChange={(value) => {
          setTaskLinkEnabled(value);
          onBlockChange?.(block.id, { taskLinkEnabled: value });
        }}
      />
    </Flex>
  );
}

export default AppTestSettings;
