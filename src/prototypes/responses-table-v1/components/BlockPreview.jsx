/**
 * BlockPreview Component (Right Panel)
 * 
 * Shows a preview of the currently selected block as participants would see it.
 * Includes tabs for Preview and Comments views.
 * 
 * Based on: maze-webapp/src/components/BlockPreview/ and BlockTabs
 */
import { useState } from 'react';
import { 
  Flex, 
  Box, 
  Text, 
  Heading
} from '@framework/components/ariane';
import { Eye, MessageSquare } from 'lucide-react';
import { PrototypeEmptyPreview } from './previews/PrototypeEmptyPreview';
import { BLOCK_REGISTRY } from '../blockRegistry';

/**
 * PreviewTabs - Tab bar with Preview/Comments options
 * Matches Figma Alpha-Tab design with underline active state
 */
function PreviewTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
  ];

  return (
    <Flex className="w-full h-[52px] bg-white flex-shrink-0">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const IconComponent = tab.icon;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex-1 flex items-center justify-center gap-2 
              px-4 text-base font-normal
              transition-colors relative
              ${isActive 
                ? 'text-[#0568FD]' 
                : 'text-[#535A74] hover:text-[#282D40]'
              }
            `}
          >
            <IconComponent size={16} />
            <span>{tab.label}</span>
            {/* Bottom border indicator */}
            <span 
              className={`
                absolute bottom-0 left-0 right-0 h-[1px]
                ${isActive 
                  ? 'bg-[#0568FD]' 
                  : 'bg-[#6C718C]/[0.28]'
                }
              `}
            />
          </button>
        );
      })}
    </Flex>
  );
}

/**
 * Checks if a block type requires a Figma prototype to be configured
 * Note: app_test is NOT included because it tests native mobile apps, not Figma prototypes
 */
function isPrototypeBlock(blockType) {
  return ['prototype_test', 'mission'].includes(blockType);
}

/**
 * PreviewContent - The main preview card showing block content
 * Matches Figma design with progress bar, title, description, screenshot, and footer
 */
function PreviewContent({ block }) {
  if (!block) {
    return (
      <Flex alignItems="center" justifyContent="center" className="h-full">
        <Text color="default.main.secondary">No block selected</Text>
      </Flex>
    );
  }

  // Show empty state for prototype-based blocks without a prototype configured
  const needsPrototype = isPrototypeBlock(block.type) && !block.hasPrototype;
  
  if (needsPrototype) {
    return (
      <Flex 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        className="flex-1 min-h-0"
      >
        <PrototypeEmptyPreview 
          onAddPrototype={() => {
            console.log('Add prototype clicked'); // Debugging statement
          }}
        />
      </Flex>
    );
  }

  const PreviewComponent = BLOCK_REGISTRY[block.type]?.Preview;
  if (PreviewComponent) {
    return (
      <Flex flexDirection="column" className="flex-1 min-h-0 p-8">
        <PreviewComponent block={block} progress={10} />
      </Flex>
    );
  }

  // Default fallback for other block types (to be replaced with specific previews)
  return (
    <Flex 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      className="flex-1 min-h-0"
    >
      <Text color="default.main.secondary">
        Preview for "{block.type}" coming soon
      </Text>
    </Flex>
  );
}

/**
 * CommentsContent - Placeholder for comments view
 */
function CommentsContent() {
  return (
    <Flex 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center"
      className="flex-1 p-8"
    >
      <Box className="text-center">
        <MessageSquare size={48} className="text-neutral-300 mx-auto mb-4" />
        <Heading level={3} className="mb-2">No comments yet</Heading>
        <Text color="default.main.secondary">
          Add comments to collaborate with your team
        </Text>
      </Box>
    </Flex>
  );
}

/**
 * BlockPreview - Main component for the right panel
 * 
 * @param {Object} props
 * @param {Object} props.block - The currently selected block
 */
export function BlockPreview({ block }) {
  const [activeTab, setActiveTab] = useState('preview');
  
  return (
    <Flex flexDirection="column" className="h-full bg-[#F8F8FB]">
      {/* Tab bar */}
      <PreviewTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Tab content */}
      {activeTab === 'preview' ? (
        <PreviewContent block={block} />
      ) : (
        <CommentsContent />
      )}
    </Flex>
  );
}

export default BlockPreview;
