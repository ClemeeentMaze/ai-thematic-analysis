/**
 * Shared settings UI primitives for the Unmoderated Builder.
 * Keeps consistent styling across block settings panels.
 */
import { Flex, Text, Toggle, ActionButton } from '@framework/components/ariane';
import { AlertTriangle, Upload, Minus, Plus, ImagePlus } from 'lucide-react';

/**
 * SectionHeader - A row with a label (optional helper text) and optional toggle.
 * @param {Object} props
 * @param {string} props.label - Primary label text
 * @param {string} [props.helperText] - Optional helper text
 * @param {boolean} [props.required] - Whether to show required asterisk
 * @param {boolean} [props.showToggle] - Whether to render toggle
 * @param {boolean} [props.checked] - Toggle state
 * @param {Function} [props.onToggleChange] - Toggle change handler
 */
export function SectionHeader({
  label,
  helperText,
  required = false,
  showToggle = false,
  checked = false,
  onToggleChange,
}) {
  return (
    <Flex justifyContent="space-between" alignItems="flex-start" className="w-full gap-4">
      <Flex flexDirection="column" gap="NONE" className="flex-1">
        <Flex gap="XS">
          <Text type="body" className="text-black">
            {label}
          </Text>
          {required && <Text className="opacity-90">*</Text>}
        </Flex>
        {helperText && (
          <Text type="caption" color="default.main.secondary">
            {helperText}
          </Text>
        )}
      </Flex>
      {showToggle && (
        <div className="flex-shrink-0 pt-0.5">
          <Toggle size="xs" checked={checked} onChange={onToggleChange} />
        </div>
      )}
    </Flex>
  );
}

/**
 * Divider - Simple horizontal divider.
 */
export function Divider() {
  return <div className="h-px w-full bg-[#D1D4DB]" />;
}

/**
 * WarningCallout - Warning banner for important notices.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Callout content
 */
export function WarningCallout({ children }) {
  return (
    <div className="bg-[#FFF9ED] rounded-lg p-4 flex gap-2 items-start w-full">
      <AlertTriangle size={20} className="text-[#AC7000] flex-shrink-0 mt-px" />
      <p className="text-sm leading-5 text-[#AC7000]">{children}</p>
    </div>
  );
}

/**
 * UploadArea - Dashed border upload zone for documents.
 * @param {Object} props
 * @param {Function} props.onUpload - Click handler
 */
export function UploadArea({ onUpload }) {
  return (
    <button
      type="button"
      onClick={onUpload}
      className="
        w-full h-[76px] flex items-center gap-2 px-4
        bg-white border border-dashed border-[#CDCEDD] rounded-lg
        hover:border-[#0568fd] hover:bg-blue-50/30 transition-colors
        cursor-pointer
      "
    >
      <Upload size={24} className="text-[#535A74] flex-shrink-0" />
      <Flex flexDirection="column" className="flex-1 text-left">
        <Text className="font-semibold">Upload document</Text>
        <Text type="caption" color="default.main.secondary">
          Choose a PDF file from your device
        </Text>
      </Flex>
    </button>
  );
}

/**
 * UploadCard - Card for uploading images.
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string} props.description - Helper text
 * @param {Function} props.onClick - Click handler
 */
export function UploadCard({ title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-full bg-white rounded-lg p-4 flex items-center gap-2 text-left
        shadow-[0px_1px_2px_0px_rgba(108,113,140,0.08)]
        ring-1 ring-inset ring-[rgba(108,113,140,0.28)]
        hover:bg-gray-50 transition-colors cursor-pointer
      "
    >
      <ImagePlus size={24} className="text-[#535A74] flex-shrink-0" />
      <Flex flexDirection="column" gap="NONE" className="flex-1 min-w-0">
        <Text type="body" weight="semi-bold" className="text-black">
          {title}
        </Text>
        <Text type="caption" color="default.main.secondary">
          {description}
        </Text>
      </Flex>
    </button>
  );
}

/**
 * SelectTypeCard - Card selection for "single vs multi" style toggles.
 * @param {Object} props
 * @param {string} props.label - Card label
 * @param {boolean} props.selected - Selected state
 * @param {Function} props.onClick - Click handler
 */
export function SelectTypeCard({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex-1 flex items-center gap-2 px-4 py-3 bg-white rounded-lg
        transition-all duration-150
        ${
          selected
            ? 'shadow-[inset_0px_0px_0px_1px_#0568fd]'
            : 'shadow-[0px_1px_2px_0px_rgba(108,113,140,0.08),inset_0px_0px_0px_0.5px_rgba(108,113,140,0.28)]'
        }
        hover:shadow-[0px_1px_2px_0px_rgba(5,104,253,0.08),inset_0px_0px_0px_1px_rgba(5,104,253,0.28)]
      `}
    >
      <div className="pt-1">
        <div
          className={`
            size-4 rounded-full flex items-center justify-center
            transition-all duration-150
            ${
              selected
                ? 'shadow-[inset_0px_0px_0px_1px_#0568fd]'
                : 'shadow-[0px_1px_2px_rgba(108,113,140,0.08),inset_0px_0px_0px_0.5px_rgba(108,113,140,0.8)]'
            }
          `}
        >
          {selected && <div className="size-1.5 rounded-full bg-[#034FD6]" />}
        </div>
      </div>
      <Text>{label}</Text>
    </button>
  );
}

/**
 * NumberStepper - Increment/decrement control for numeric values.
 * @param {Object} props
 * @param {number} props.value - Current value
 * @param {Function} props.onChange - Change handler
 * @param {number} [props.min] - Minimum value
 * @param {number} [props.max] - Maximum value
 */
export function NumberStepper({ value, onChange, min = 1, max = 60 }) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div
      className="
        flex items-center bg-white rounded-lg p-2
        shadow-[0px_1px_2px_0px_rgba(108,113,140,0.08)]
        ring-1 ring-inset ring-[rgba(108,113,140,0.28)]
      "
    >
      <ActionButton
        emphasis="tertiary"
        size="SM"
        iconOnly
        icon={<Minus size={16} />}
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="Decrease value"
      >
        Decrease
      </ActionButton>
      <div className="flex-1 flex items-center justify-center">
        <Text type="caption" className="text-black">
          {value}
        </Text>
      </div>
      <ActionButton
        emphasis="tertiary"
        size="SM"
        iconOnly
        icon={<Plus size={16} />}
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="Increase value"
      >
        Increase
      </ActionButton>
    </div>
  );
}
