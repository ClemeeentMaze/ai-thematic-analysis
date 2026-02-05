/**
 * OpinionScaleSettings Component
 * 
 * Settings panel content for the Opinion Scale block type.
 * Allows configuration of question, labels, number of steps, and scale type.
 * 
 * Based on: Figma design for "Bloc-bar" Opinion Scale
 */
import { useState } from 'react';
import {
  Flex,
  Text,
  Field,
  TextInputControl,
  Toggle,
} from '@framework/components/ariane';
import { SectionHeader } from './SettingsPrimitives';

/**
 * ScaleTypeCard - Card-based selection option for scale type
 */
function ScaleTypeCard({ label, icon, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex-1 flex items-center gap-2 px-4 py-3 bg-white rounded-lg
        transition-all duration-150
        ${selected 
          ? 'shadow-[inset_0px_0px_0px_1px_#0568fd]' 
          : 'shadow-[0px_1px_2px_0px_rgba(108,113,140,0.08),inset_0px_0px_0px_0.5px_rgba(108,113,140,0.28)]'
        }
        hover:shadow-[0px_1px_2px_0px_rgba(5,104,253,0.08),inset_0px_0px_0px_1px_rgba(5,104,253,0.28)]
      `}
    >
      {/* Icon */}
      <span className="text-[#535a74]">{icon}</span>
      <Text>{label}</Text>
    </button>
  );
}

/**
 * StepsSlider - Custom slider for number of steps (5-10)
 */
function StepsSlider({ value, onChange, min = 5, max = 10 }) {
  const steps = [];
  for (let i = min; i <= max; i++) {
    steps.push(i);
  }
  
  // Calculate the thumb position (percentage)
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="w-full">
      {/* Slider track */}
      <div className="relative h-4 flex items-center">
        {/* Track background */}
        <div className="absolute w-full h-1 bg-[#E8EAED] rounded-full" />
        {/* Track fill */}
        <div 
          className="absolute h-1 bg-[#0568fd] rounded-full" 
          style={{ width: `${percentage}%` }}
        />
        {/* Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-4 opacity-0 cursor-pointer z-10"
        />
        <div 
          className="absolute w-4 h-4 bg-white rounded-full shadow-[0px_1px_3px_rgba(0,0,0,0.2)] pointer-events-none"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
      {/* Step labels */}
      <div className="flex justify-between mt-2">
        {steps.map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div className="w-px h-1.5 bg-[#D0D5DB]" />
            <Text type="caption" className="text-[#738094] mt-1">{step}</Text>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * OpinionScaleSettings - Form content for the Opinion Scale block
 * 
 * @param {Object} props
 * @param {Object} props.block - The opinion scale block data
 */
export function OpinionScaleSettings({ block, onBlockChange }) {
  // Local state for form fields
  const [title, setTitle] = useState(block?.title || 'How easy was it to find the filter button?');
  const [description, setDescription] = useState(
    block?.description || 'Please choose an answer that best suites your experience.'
  );
  const [imageEnabled, setImageEnabled] = useState(block?.imageEnabled ?? false);
  const [leftLabel, setLeftLabel] = useState(block?.leftLabel || '');
  const [middleLabel, setMiddleLabel] = useState(block?.middleLabel || '');
  const [rightLabel, setRightLabel] = useState(block?.rightLabel || '');
  const [numberOfSteps, setNumberOfSteps] = useState(block?.numberOfSteps ?? 10);
  const [startAtOne, setStartAtOne] = useState(block?.startAtOne ?? true);
  const [scaleType, setScaleType] = useState(block?.scaleType || 'numerical');
  const [conditionsEnabled, setConditionsEnabled] = useState(block?.conditionsEnabled ?? false);

  return (
    <Flex flexDirection="column" gap="LG" className="w-full">
      {/* Question Field - Required */}
      <Field label="Question" required>
        <TextInputControl
          value={title}
          placeholder="What do you want to ask?"
          onChange={(e) => {
            const value = e.target.value;
            setTitle(value);
            onBlockChange?.(block.id, { title: value });
          }}
        />
      </Field>

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

      {/* Labels Section */}
      <Flex flexDirection="column" gap="SM" className="w-full">
        <Text className="opacity-90">Labels</Text>
        <Flex gap="SM" className="w-full">
          <div className="flex-1">
            <TextInputControl
              value={leftLabel}
              placeholder="Left"
              onChange={(e) => {
                const value = e.target.value;
                setLeftLabel(value);
                onBlockChange?.(block.id, { leftLabel: value });
              }}
            />
          </div>
          <div className="flex-1">
            <TextInputControl
              value={middleLabel}
              placeholder="Middle"
              onChange={(e) => {
                const value = e.target.value;
                setMiddleLabel(value);
                onBlockChange?.(block.id, { middleLabel: value });
              }}
            />
          </div>
          <div className="flex-1">
            <TextInputControl
              value={rightLabel}
              placeholder="Right"
              onChange={(e) => {
                const value = e.target.value;
                setRightLabel(value);
                onBlockChange?.(block.id, { rightLabel: value });
              }}
            />
          </div>
        </Flex>
      </Flex>

      {/* Number of Steps */}
      <Flex flexDirection="column" gap="SM" className="w-full">
        <Text className="text-black">Number of steps</Text>
        <StepsSlider
          value={numberOfSteps}
          onChange={(value) => {
            setNumberOfSteps(value);
            onBlockChange?.(block.id, { numberOfSteps: value });
          }}
          min={5}
          max={10}
        />
      </Flex>

      {/* Starting Number */}
      <Flex flexDirection="column" gap="MD" className="w-full">
        <Text className="text-black">Starting number</Text>
        <Flex alignItems="center" gap="SM">
          <Toggle 
            size="xs" 
            checked={startAtOne}
            onChange={(value) => {
              setStartAtOne(value);
              onBlockChange?.(block.id, { startAtOne: value });
            }}
          />
          <Text type="caption" className="text-black">Start at 1</Text>
        </Flex>
      </Flex>

      {/* Scale Type Selection */}
      <Flex flexDirection="column" gap="SM" className="w-full">
        <Text className="opacity-90">Scale type</Text>
        <Flex gap="SM" className="w-full">
          <ScaleTypeCard
            label="Numerical"
            icon={<span className="font-mono text-sm">123</span>}
            selected={scaleType === 'numerical'}
            onClick={() => {
              setScaleType('numerical');
              onBlockChange?.(block.id, { scaleType: 'numerical' });
            }}
          />
          <ScaleTypeCard
            label="Stars"
            icon={<span>☆</span>}
            selected={scaleType === 'stars'}
            onClick={() => {
              setScaleType('stars');
              onBlockChange?.(block.id, { scaleType: 'stars' });
            }}
          />
          <ScaleTypeCard
            label="Emotions"
            icon={<span>☺</span>}
            selected={scaleType === 'emotions'}
            onClick={() => {
              setScaleType('emotions');
              onBlockChange?.(block.id, { scaleType: 'emotions' });
            }}
          />
        </Flex>
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

export default OpinionScaleSettings;
