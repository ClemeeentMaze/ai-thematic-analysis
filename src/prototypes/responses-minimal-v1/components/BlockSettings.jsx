/**
 * BlockSettings Component (Middle Panel)
 * 
 * Displays the settings form for the currently selected block.
 * Shows block type header and editable fields.
 * 
 * Architecture:
 * - Each block type has its own settings component in ./settings/
 * - This component handles the header and routing to the correct settings
 */
import {
  Flex,
  Box,
  Text,
  Field,
  TextInputControl,
  ActionButton,
  ScrollContainer,
  Toggle,
  IconFigure,
} from '@framework/components/ariane';
import { MoreHorizontal, Info } from 'lucide-react';
import { BLOCK_TYPES } from '../data';
import { BLOCK_REGISTRY } from '../blockRegistry';

// Settings components for each block type
// Settings components are resolved via BLOCK_REGISTRY

/**
 * Block type to icon background color mapping
 * Colors match the Figma design for each block type
 */

/**
 * SettingsPanelHeader - Reusable header for settings panels
 * 
 * @param {Object} props
 * @param {string} props.title - Header title text
 * @param {string} props.iconName - maze-m-icon name (e.g., 'log-in-hand', 'website')
 * @param {string} props.iconColor - Ariane color token (e.g., 'awake', 'lila', 'primary')
 * @param {string} props.tooltip - Tooltip text for info icon
 * @param {Function} props.onMoreClick - Handler for more options button
 */
export function SettingsPanelHeader({ 
  title = 'Untitled',
  iconName = 'website',
  iconColor = 'awake',
  tooltip = 'Settings and configuration',
  onMoreClick,
}) {
  return (
    <div className="relative bg-white flex items-center justify-between px-4 py-3 flex-shrink-0">
      {/* Left: Icon + Title + Info */}
      <Flex alignItems="center" gap="SMPlus">
        {/* Icon figure - using IconFigure for consistency with left panel */}
        <IconFigure 
          name={iconName}
          color={iconColor}
          mode="dark"
          size="LG"
          shape="squared"
        />
        
        {/* Title + Info icon */}
        <Flex alignItems="center" gap="XS">
          <span className="font-semibold text-lg text-black tracking-tight">
            {title}
          </span>
          <Info 
            size={16} 
            className="text-[#535A74] cursor-help" 
            aria-label={tooltip}
          />
        </Flex>
      </Flex>
      
      {/* Right: More options */}
      <ActionButton
        emphasis="tertiary"
        size="SM"
        iconOnly
        icon={<MoreHorizontal size={16} />}
        onClick={onMoreClick}
        className="!bg-white !shadow-sm !border !border-black/10 !rounded-lg !p-2"
      >
        More options
      </ActionButton>
      
      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10" />
    </div>
  );
}

/**
 * Divider - Simple horizontal divider
 */
function Divider() {
  return <div className="h-px w-full bg-[#D1D4DB]" />;
}

/**
 * Renders the appropriate settings component based on block type
 * 
 * @param {Object} props
 * @param {Object} props.block - The block to render settings for
 */
function BlockSettingsContent({ block, onBlockChange }) {
  const registryEntry = BLOCK_REGISTRY[block.type];
  const SettingsComponent = registryEntry?.Settings;

  if (!SettingsComponent) {
    return <DefaultBlockSettings block={block} onBlockChange={onBlockChange} />;
  }

  return <SettingsComponent block={block} onBlockChange={onBlockChange} />;
}

/**
 * DefaultBlockSettings - Generic settings for block types without custom components
 * Used for Website Test, Multiple Choice, Open Question, Opinion Scale, Yes/No, Thank You
 * 
 * @param {Object} props
 * @param {Object} props.block - The block data
 */
function DefaultBlockSettings({ block, onBlockChange }) {
  const handleChange = (field) => (event) => {
    onBlockChange?.(block.id, { [field]: event.target.value });
  };

  return (
    <Flex flexDirection="column" gap="LG" className="w-full">
      {/* Task Field */}
      <Field label="Task" required>
        <TextInputControl
          value={block.title || 'Try using the filter feature'}
          placeholder="Enter your task..."
          onChange={handleChange('title')}
        />
      </Field>
      
      {/* Description Field */}
      <Field label="Description">
        <TextInputControl
          value={block.description || 'Open the filters and show only items under $25.'}
          placeholder="Add a description (optional)..."
          onChange={handleChange('description')}
        />
      </Field>
      
      {/* Divider */}
      <Divider />
      
      {/* Task Link Field */}
      <Flex flexDirection="column" gap="SM">
        <Flex gap="XS">
          <Text className="opacity-90">Task link</Text>
          <Text className="opacity-90">*</Text>
        </Flex>
        <button 
          className="w-full h-12 flex items-center justify-center gap-2 bg-white rounded-lg
                     shadow-[0px_1px_2px_0px_rgba(5,104,253,0.08)]
                     ring-[0.5px] ring-inset ring-[rgba(5,104,253,0.28)]
                     hover:bg-blue-50/50 transition-colors"
          onClick={() => console.log('Add link clicked')}
        >
          <Plus size={16} className="text-[#0568fd]" />
          <span className="font-bold text-[#0568fd]">Add link</span>
        </button>
      </Flex>
      
      {/* Divider */}
      <Divider />
      
      {/* Conditions Section */}
      {!block.isFixed && (
        <Flex justifyContent="space-between" alignItems="center">
          <Flex flexDirection="column" gap="XS">
            <Text>Conditions</Text>
            <Text type="caption" color="default.main.secondary">
              Add conditions to jump between your blocks
            </Text>
          </Flex>
          <Toggle
            size="xs"
            checked={Boolean(block.conditionsEnabled)}
            onChange={(value) => {
              onBlockChange?.(block.id, { conditionsEnabled: value });
            }}
          />
        </Flex>
      )}
    </Flex>
  );
}

/**
 * BlockSettings renders the form for editing block properties
 * 
 * @param {Object} props
 * @param {Object} props.block - The currently selected block
 */
export function BlockSettings({ block, onBlockChange }) {
  if (!block) {
    return (
      <Flex 
        alignItems="center" 
        justifyContent="center" 
        className="h-full"
      >
        <Text color="default.main.secondary">
          Select a block to edit its settings
        </Text>
      </Flex>
    );
  }

  const blockType = BLOCK_TYPES[block.type];
  
  return (
    <Flex flexDirection="column" className="h-full bg-white">
      {/* Header */}
      <SettingsPanelHeader 
        title={blockType?.name || 'Block Settings'}
        iconName={blockType?.iconName || 'website'}
        iconColor={blockType?.arianeColor || 'awake'}
        tooltip="Block settings and configuration"
        onMoreClick={() => console.log('More options clicked')}
      />
      
      {/* Scrollable Form Content */}
      <ScrollContainer className="flex-1">
        <Box className="px-4 py-6">
          <BlockSettingsContent block={block} onBlockChange={onBlockChange} />
        </Box>
      </ScrollContainer>
    </Flex>
  );
}

export default BlockSettings;
