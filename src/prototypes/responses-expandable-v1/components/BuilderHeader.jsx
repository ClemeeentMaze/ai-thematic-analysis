/**
 * BuilderHeader Component
 * 
 * Top header bar for the study builder matching the Figma design.
 * 
 * Layout:
 * [Back] [Study Name]     [Build > Share > Results > Report]     [Preview] [Start testing] [👤+] [⚙]
 * 
 * Navigation steps use dark pill style for active state (from screen-share prototype).
 * Button styling matches Figma "AI Study Setup Assistant" design.
 */
import { 
  Flex, 
  Heading, 
  Tooltip,
} from '@framework/components/ariane';
import { ArrowLeft, Settings, ChevronRight } from 'lucide-react';

/**
 * IconButton - Matches Figma Action Button style with shadow and border
 * @param {boolean} hasBackground - Whether to show gray background (for right-side buttons)
 */
function IconButton({ children, onClick, label, hasBackground = false }) {
  return (
    <Tooltip label={label} placement="bottom">
      <button
        onClick={onClick}
        className={`
          flex items-center justify-center
          p-2 rounded-lg
          transition-all duration-150
          cursor-pointer
          ${hasBackground 
            ? 'bg-[#f8f8fb] hover:bg-neutral-200' 
            : 'bg-white hover:bg-neutral-50'
          }
          shadow-[0px_1px_2px_0px_rgba(108,113,140,0.08)]
          border-[0.5px] border-[rgba(108,113,140,0.28)]
        `}
        style={{ color: '#535a74' }}
        aria-label={label}
      >
        {children}
      </button>
    </Tooltip>
  );
}

/**
 * Study name display
 */
function StudyName({ name }) {
  return (
    <Heading level={2} className="truncate max-w-[300px]">
      {name}
    </Heading>
  );
}

/**
 * Navigation step item - Blue highlight style for active state
 * Matching screen-share v21 prototype visual design:
 * - Active: Light blue background (#F0FAFF) with blue text (#0568FD)
 * - Inactive: Transparent with gray text (#6C718C)
 */
function NavStep({ label, isActive, isDisabled, hasPreview, onClick }) {
  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={`
        flex items-center gap-1
        px-2 py-1 rounded text-base font-semibold transition-all
        ${isActive 
          ? 'bg-[#F0FAFF] text-[#0568FD]' 
          : isDisabled 
            ? 'text-[#9597b0] cursor-not-allowed'
            : 'text-[#6C718C] hover:text-[#0568FD] hover:bg-[#F0FAFF] cursor-pointer'
        }
      `}
    >
      <span>{label}</span>
      {hasPreview && (
        <Eye 
          size={16} 
          className={isActive ? 'text-[#0568FD]' : 'text-[#6C718C]'} 
        />
      )}
    </button>
  );
}

/**
 * Center navigation: Build > Share > Results > Report
 */
function CenterNavigation({ currentStep = 'build' }) {
  const steps = [
    { id: 'build', label: 'Build' },
    { id: 'share', label: 'Share' },
    { id: 'results', label: 'Results' },
    { id: 'report', label: 'Report' },
  ];

  return (
    <Flex alignItems="center" gap="XS">
      {steps.map((step, index) => (
        <Flex key={step.id} alignItems="center" gap="XS">
          <NavStep
            label={step.label}
            isActive={currentStep === step.id}
            isDisabled={false}
            hasPreview={step.hasPreview}
            onClick={() => console.log(`Navigate to ${step.id}`)}
          />
          {index < steps.length - 1 && (
            <ChevronRight 
              size={24} 
              className="text-[#9597B0]"
            />
          )}
        </Flex>
      ))}
    </Flex>
  );
}

/**
 * BuilderHeader - Full header component matching Figma design
 * 
 * @param {Object} props
 * @param {Object} props.studyMeta - Study metadata (name, deviceTypes, recordAudio)
 * @param {string} props.currentStep - Current navigation step (build/share/results/report)
 * @param {Function} props.onBack - Callback when back button is clicked
 * @param {Function} props.onPreview - Callback when preview button is clicked
 * @param {Function} props.onStartTesting - Callback when start testing button is clicked
 * @param {Function} props.onInvite - Callback when invite button is clicked
 * @param {Function} props.onSettings - Callback when settings button is clicked
 */
export function BuilderHeader({ 
  studyMeta = { name: 'Identifying Confusion in Onboarding' },
  currentStep = "results",
  onBack = () => console.log('Back clicked'),
  onSettings = () => console.log('Settings clicked'),
}) {
  return (
    <Flex 
      alignItems="center" 
      className="h-16 px-4 bg-white flex-shrink-0 gap-4 border-b border-[rgba(108,113,140,0.28)]"
    >
      {/* Left Section: Back + Study Name */}
      <Flex alignItems="center" gap="SM" className="flex-1">
        <IconButton onClick={onBack} label="Back to project">
          <ArrowLeft size={16} />
        </IconButton>
        <StudyName name={studyMeta?.name || 'Untitled Study'} />
      </Flex>
      
      {/* Center Section: Navigation Steps */}
      <Flex alignItems="center" justifyContent="center">
        <CenterNavigation currentStep={currentStep} />
      </Flex>
      
      {/* Right Section: Actions */}
      <Flex alignItems="center" gap="MD" justifyContent="flex-end" className="flex-1">
        {/* Settings Button */}
        <IconButton onClick={onSettings} label="Study settings" hasBackground>
          <Settings size={16} />
        </IconButton>
      </Flex>
    </Flex>
  );
}

export default BuilderHeader;
