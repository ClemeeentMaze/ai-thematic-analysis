/**
 * TreeTestPreview Component
 * 
 * Shows the preview for Tree Test blocks.
 * Displays title, description, hierarchical tree structure, and Continue button.
 * 
 * Based on: Figma design node 4224:85899
 */
import { useState } from 'react';
import { Flex, Box, Text, Heading, CTAButton, ProgressBar } from '@framework/components/ariane';
import { ChevronRight, ChevronDown } from 'lucide-react';

/**
 * Sample tree data structure
 */
const SAMPLE_TREE = [
  {
    id: 'account',
    label: 'Account',
    children: [
      { id: 'profile', label: 'Profile Settings' },
      { id: 'security', label: 'Security' },
      { 
        id: 'billing', 
        label: 'Billing & Payments',
        children: [
          { id: 'payment-methods', label: 'Payment Methods' },
          { id: 'invoices', label: 'Invoices' },
        ]
      },
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    children: [
      { id: 'notifications', label: 'Notifications' },
      { id: 'privacy', label: 'Privacy' },
    ]
  },
  {
    id: 'help',
    label: 'Help & Support',
  },
];

/**
 * RadioIndicator - Visual-only radio button indicator
 */
function RadioIndicator({ isSelected }) {
  return (
    <div 
      className={`
        w-4 h-4 rounded-full shrink-0
        shadow-[0px_1px_2px_0px_rgba(108,113,140,0.08)]
        ${isSelected 
          ? 'bg-[#0568FD] ring-[0.5px] ring-[#0568FD]' 
          : 'bg-white ring-[0.5px] ring-[#6C718C]/80'
        }
        flex items-center justify-center
      `}
    >
      {isSelected && (
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      )}
    </div>
  );
}

/**
 * TreeNode - Recursive tree node component
 */
function TreeNode({ node, level = 0, selectedId, onSelect, expandedIds, onToggle }) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.includes(node.id);
  const isSelected = selectedId === node.id;
  
  return (
    <div>
      {/* Node item */}
      <button
        onClick={() => {
          if (hasChildren) {
            onToggle(node.id);
          } else {
            onSelect(node.id);
          }
        }}
        className={`
          w-full bg-white rounded-lg px-4 py-3
          flex items-center gap-2
          shadow-[0px_1px_2px_0px_rgba(108,113,140,0.08)]
          ring-[0.5px] ring-inset
          transition-all duration-150
          text-left
          ${isSelected 
            ? 'ring-[#0568FD] bg-[#F0FAFF]' 
            : 'ring-[#6C718C]/[0.28] hover:ring-[#6C718C]/[0.5]'
          }
        `}
        style={{ marginLeft: level * 24 }}
      >
        {/* Expand/collapse icon or radio for leaf nodes */}
        {hasChildren ? (
          <div className="w-4 h-4 flex items-center justify-center text-[#535A74]">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>
        ) : (
          <RadioIndicator isSelected={isSelected} />
        )}
        
        {/* Label */}
        <Text className="text-base leading-6 flex-1">
          {node.label}
        </Text>
      </button>
      
      {/* Children */}
      {hasChildren && isExpanded && (
        <Flex flexDirection="column" gap="SM" className="mt-2">
          {node.children.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              expandedIds={expandedIds}
              onToggle={onToggle}
            />
          ))}
        </Flex>
      )}
    </div>
  );
}

/**
 * TreeTestPreview - Preview card for tree test blocks
 * 
 * @param {Object} props
 * @param {Object} props.block - Block data with title and description
 * @param {number} props.progress - Progress percentage (0-100)
 */
export function TreeTestPreview({ block, progress = 10 }) {
  const [selectedId, setSelectedId] = useState(null);
  const [expandedIds, setExpandedIds] = useState(['account']); // Start with first item expanded
  
  const handleToggle = (id) => {
    setExpandedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  return (
    <Box 
      className="
        h-full bg-white rounded-lg overflow-hidden
        shadow-[0px_2px_8px_0px_rgba(108,113,140,0.08),0px_1px_2px_0px_rgba(108,113,140,0.08)]
        ring-[0.5px] ring-[#6C718C]/[0.28]
        flex flex-col
      "
    >
      {/* Progress bar section */}
      <Box className="p-6 relative">
        <ProgressBar progress={progress} />
        {/* Bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#6C718C]/[0.28]" />
      </Box>

      {/* Content area */}
      <Flex flexDirection="column" gap="LG" className="flex-1 px-8 pt-6 pb-4 overflow-auto">
        {/* Title and description */}
        <Flex flexDirection="column" gap="MD">
          <Heading 
            level={3} 
            className="text-[20px] leading-6 tracking-[-0.2px] font-semibold"
          >
            {block?.title || 'Where would you go to update your saved payment method?'}
          </Heading>
          
          <Text 
            color="default.main.secondary"
            className="text-base leading-6 tracking-[-0.16px]"
          >
            {block?.description || "Choose the path that feels most intuitive. We're testing how well the structure matches your expectations."}
          </Text>
        </Flex>

        {/* Tree structure */}
        <Flex flexDirection="column" gap="SM">
          {SAMPLE_TREE.map(node => (
            <TreeNode
              key={node.id}
              node={node}
              selectedId={selectedId}
              onSelect={setSelectedId}
              expandedIds={expandedIds}
              onToggle={handleToggle}
            />
          ))}
        </Flex>
      </Flex>

      {/* Footer with CTA */}
      <Box className="px-6 py-4 relative">
        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-[#6C718C]/[0.28]" />
        
        <CTAButton 
          emphasis="primary" 
          size="MD"
          className="w-full"
        >
          Continue
        </CTAButton>
      </Box>
    </Box>
  );
}
