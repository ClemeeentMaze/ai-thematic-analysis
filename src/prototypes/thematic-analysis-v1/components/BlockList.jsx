/**
 * BlockList Component (Left Panel)
 * 
 * Tabs + Scrollable block list.
 */
import { useState } from 'react';
import { Flex, ScrollContainer, Icon } from '@framework/components/ariane';
import { BlockListItem } from './BlockListItem';
import { LayoutGrid, Users, Film } from 'lucide-react';

/**
 * Tab button component
 */
function TabButton({ icon: IconComponent, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg
        transition-all duration-150 cursor-pointer
        ${isActive 
          ? 'bg-[#0568FD] text-white' 
          : 'bg-white text-[#6C718C] hover:bg-neutral-100 border border-[rgba(108,113,140,0.28)]'
        }
      `}
    >
      <IconComponent size={16} />
      <span>{label}</span>
    </button>
  );
}

/**
 * @param {Array} props.blocks - Array of block objects
 * @param {string} props.selectedBlockId - Currently selected block ID
 * @param {Function} props.onSelectBlock - Block selection callback
 */
export function BlockList({ blocks, selectedBlockId, onSelectBlock }) {
  const [activeTab, setActiveTab] = useState('results');

  return (
    <Flex flexDirection="column" className="h-full bg-white shadow-[inset_-0.5px_0_0_0_rgba(108,113,140,0.28)]">
      {/* Tabs Header */}
      <Flex gap="XS" className="flex-shrink-0 p-3 border-b border-[rgba(108,113,140,0.16)]">
        <TabButton 
          icon={LayoutGrid} 
          label="Results" 
          isActive={activeTab === 'results'} 
          onClick={() => setActiveTab('results')} 
        />
        <TabButton 
          icon={Users} 
          label="Participants" 
          isActive={activeTab === 'participants'} 
          onClick={() => setActiveTab('participants')} 
        />
        <TabButton 
          icon={Film} 
          label="Themes" 
          isActive={activeTab === 'themes'} 
          onClick={() => setActiveTab('themes')} 
        />
      </Flex>

      {/* Scrollable Block List */}
      <ScrollContainer className="flex-1 min-h-0">
        <Flex flexDirection="column" gap="SM" className="p-3">
          {blocks.map((block) => (
            <BlockListItem
              key={block.id}
              block={block}
              isSelected={selectedBlockId === block.id}
              onSelect={onSelectBlock}
            />
          ))}
        </Flex>
      </ScrollContainer>
    </Flex>
  );
}

export default BlockList;
