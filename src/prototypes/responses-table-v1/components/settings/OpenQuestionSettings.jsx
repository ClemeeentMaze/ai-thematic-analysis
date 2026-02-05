/**
 * OpenQuestionSettings Component
 * 
 * Settings panel content for the Open Question block type.
 * Allows configuration of question, notes, and AI follow-up on answers.
 * 
 * Based on: Figma design for "Bloc-bar" Open Question
 */
import { useState } from 'react';
import {
  Flex,
  Text,
  Field,
  TextInputControl,
  Toggle,
  ActionButton,
} from '@framework/components/ariane';
import { Sparkles } from 'lucide-react';
import { Divider, SectionHeader } from './SettingsPrimitives';

/**
 * AIBadge - Small badge indicating AI-powered feature
 */
function AIBadge() {
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#F9F7FF] rounded border border-black/10">
      <Sparkles size={12} className="text-[#6B5BEE]" />
      <span className="text-[11px] font-bold text-[#6B5BEE] uppercase tracking-wider">
        AI
      </span>
    </div>
  );
}

/**
 * OpenQuestionSettings - Form content for the Open Question block
 * 
 * @param {Object} props
 * @param {Object} props.block - The open question block data
 */
export function OpenQuestionSettings({ block, onBlockChange }) {
  // Local state for form fields
  const [title, setTitle] = useState(
    block?.title || 'Can you tell me about your most recent travel experience?'
  );
  const [description, setDescription] = useState(
    block?.description || "We'd love to hear all the little details."
  );
  const [imageEnabled, setImageEnabled] = useState(block?.imageEnabled ?? false);
  const [followUpEnabled, setFollowUpEnabled] = useState(block?.followUpEnabled ?? false);
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

      {/* Divider */}
      <Divider />

      {/* Follow-up on answers Section - AI Feature */}
      <Flex justifyContent="space-between" alignItems="flex-start" className="w-full gap-4">
        <Flex flexDirection="column" gap="NONE" className="flex-1">
          <Flex alignItems="center" gap="SM">
            <Text type="body" className="text-black">
              Follow-up on answers
            </Text>
            <AIBadge />
          </Flex>
          <Text type="caption" color="default.main.secondary">
            Ask follow-up questions based on participant's answers
          </Text>
        </Flex>
        <Toggle 
          size="xs" 
          checked={followUpEnabled}
          onChange={(value) => {
            setFollowUpEnabled(value);
            onBlockChange?.(block.id, { followUpEnabled: value });
          }}
        />
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

export default OpenQuestionSettings;
