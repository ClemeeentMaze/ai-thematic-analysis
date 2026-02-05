/**
 * TreeTestSettings Component
 * 
 * Settings panel content for the Tree Test block type.
 * Allows configuration of task, description, and tree structure.
 * 
 * Based on: Figma design for "Bloc-bar" Tree Test
 */
import { useState } from 'react';
import {
  Flex,
  Text,
  Field,
  TextInputControl,
  ActionButton,
} from '@framework/components/ariane';
import { Plus, GripVertical } from 'lucide-react';
import { SectionHeader } from './SettingsPrimitives';

/**
 * TreeNodeRow - A row representing a tree node with drag handle and add button
 */
function TreeNodeRow({ placeholder, value, onChange, onAddClick, indentLevel = 0 }) {
  const indentWidth = indentLevel * 16;
  
  return (
    <div className="flex items-center gap-0">
      {/* Indent connector line */}
      {indentLevel > 0 && (
        <div 
          className="h-[2px] bg-[#E8E8F1]" 
          style={{ width: `${indentWidth}px` }} 
        />
      )}
      
      {/* Node card */}
      <div className="flex-1 flex items-center gap-2">
        <div className="flex-1 bg-white rounded-lg px-4 py-3 flex items-center gap-2
          shadow-[0px_2px_8px_0px_rgba(108,113,140,0.08),0px_1px_2px_0px_rgba(108,113,140,0.08)]
          ring-1 ring-inset ring-[rgba(108,113,140,0.28)]"
        >
          <GripVertical size={16} className="text-[#6C718C] flex-shrink-0 cursor-grab" />
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-base text-black placeholder:text-[#6C718C]"
          />
        </div>
        <ActionButton
          emphasis="tertiary"
          size="SM"
          iconOnly
          icon={<Plus size={16} />}
          onClick={onAddClick}
          aria-label="Add child page"
        >
          Add
        </ActionButton>
      </div>
    </div>
  );
}

/**
 * TreeTestSettings - Main settings component
 * 
 * @param {Object} props
 * @param {Object} props.block - The block data
 */
export function TreeTestSettings({ block, onBlockChange }) {
  // Local state for form fields
  const [title, setTitle] = useState(
    block?.title || 'Where would you go to update your saved payment method?'
  );
  const [description, setDescription] = useState(
    block?.description ||
      "Choose the path that feels most intuitive. We're testing how well the structure matches your expectations."
  );
  const [treeNodes, setTreeNodes] = useState(block?.treeNodes || []);
  const [conditionsEnabled, setConditionsEnabled] = useState(block?.conditionsEnabled ?? false);

  const primaryNode = treeNodes[0];

  return (
    <Flex flexDirection="column" gap="LG" className="p-4">
      {/* Task field */}
      <Field label="Task" required>
        <TextInputControl
          value={title}
          onChange={(e) => {
            const value = e.target.value;
            setTitle(value);
            onBlockChange?.(block.id, { title: value });
          }}
          placeholder="What task should participants complete?"
        />
      </Field>

      {/* Description field */}
      <Field label="Description">
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

      {/* Tree structure section */}
      <Flex flexDirection="column" gap="SM">
        <Text type="body" className="text-black opacity-90">
          Tree structure
        </Text>
        
        {/* Tree nodes */}
        <Flex flexDirection="column" gap="SM">
          <TreeNodeRow
            placeholder="Type new page"
            indentLevel={1}
            value={primaryNode?.label || ''}
            onChange={(value) => {
              const nextNodes = treeNodes.length ? [...treeNodes] : [{ id: 'node-1', label: '', children: [] }];
              nextNodes[0] = { ...nextNodes[0], label: value };
              setTreeNodes(nextNodes);
              onBlockChange?.(block.id, { treeNodes: nextNodes });
            }}
            onAddClick={() => console.log('Add child page clicked')}
          />
        </Flex>

        {/* Add new page button */}
        <ActionButton
          emphasis="tertiary"
          size="SM"
          icon={<Plus size={16} />}
          onClick={() => console.log('Add new page clicked')}
        >
          Add new page
        </ActionButton>
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
