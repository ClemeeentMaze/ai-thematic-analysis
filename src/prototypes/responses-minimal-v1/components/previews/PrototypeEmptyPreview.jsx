/**
 * PrototypeEmptyPreview Component
 * 
 * Shows the empty state for Prototype Test blocks when no prototype is linked.
 * Displays Figma + sync icon + Maze logo, title, description, and CTA button.
 * 
 * Based on: Figma design node 4224:85429 "Empty state"
 */
import { Flex, Box, Heading, CTAButton, Icon } from '@framework/components/ariane';

/**
 * FigmaLogo - Figma brand logo with rounded corners
 */
function FigmaLogo() {
  return (
    <Box 
      className="
        w-10 h-10 rounded-[6.667px] 
        bg-[#111828] 
        flex items-center justify-center
        overflow-hidden
      "
    >
      {/* Figma logo SVG */}
      <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.66667 20C5.68667 20 7.33333 18.3533 7.33333 16.3333V12.6667H3.66667C1.64667 12.6667 0 14.3133 0 16.3333C0 18.3533 1.64667 20 3.66667 20Z" fill="#0ACF83"/>
        <path d="M0 10C0 7.98 1.64667 6.33333 3.66667 6.33333H7.33333V13.6667H3.66667C1.64667 13.6667 0 12.02 0 10Z" fill="#A259FF"/>
        <path d="M0 3.66667C0 1.64667 1.64667 0 3.66667 0H7.33333V6.33333H3.66667C1.64667 6.33333 0 5.68667 0 3.66667Z" fill="#F24E1E"/>
        <path d="M7.33333 0H11C13.02 0 14.6667 1.64667 14.6667 3.66667C14.6667 5.68667 13.02 6.33333 11 6.33333H7.33333V0Z" fill="#FF7262"/>
        <path d="M14.6667 10C14.6667 12.02 13.02 13.6667 11 13.6667C8.98 13.6667 7.33333 12.02 7.33333 10C7.33333 7.98 8.98 6.33333 11 6.33333C13.02 6.33333 14.6667 7.98 14.6667 10Z" fill="#1ABCFE"/>
      </svg>
    </Box>
  );
}

/**
 * SyncIcon - Small sync/refresh icon between logos
 */
function SyncIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12.5 8.5C12.5 10.9853 10.4853 13 8 13C5.51472 13 3.5 10.9853 3.5 8.5C3.5 6.01472 5.51472 4 8 4C9.36 4 10.58 4.6 11.42 5.54" 
        stroke="#535A74" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M10 5.5H12V3.5" 
        stroke="#535A74" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * MazeLogo - Maze brand logo with rounded corners
 * Uses the maze-logo icon from the design system
 */
function MazeLogo() {
  return (
    <Box 
      className="
        w-10 h-10 rounded-lg 
        bg-black 
        flex items-center justify-center
        overflow-hidden
      "
    >
      <Icon name="maze-logo" size="20px" color="white" />
    </Box>
  );
}

/**
 * PrototypeEmptyPreview - Empty state for prototype test blocks
 * 
 * @param {Object} props
 * @param {Function} props.onAddPrototype - Callback when "Add prototype" is clicked
 */
export function PrototypeEmptyPreview({ onAddPrototype }) {
  return (
    <Flex 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center"
      gap="LG"
      className="w-full max-w-[340px] mx-auto py-8"
    >
      {/* Logos row */}
      <Flex gap="SM" alignItems="center">
        <FigmaLogo />
        <SyncIcon />
        <MazeLogo />
      </Flex>

      {/* Text content */}
      <Flex 
        flexDirection="column" 
        alignItems="center" 
        gap="SMPlus"
        className="text-center w-full"
      >
        <Heading 
          level={3} 
          className="text-[18px] leading-6 tracking-[-0.18px] font-semibold text-center w-full"
        >
          No prototype added
        </Heading>
        
        <p className="text-sm leading-5 tracking-[-0.14px] text-center text-[#535A74] m-0">
          Add your prototype link to create missions for your participants to test across this study.
          <br />
          <a 
            href="#" 
            onClick={(e) => e.preventDefault()}
            className="text-[#535A74] underline hover:text-[#282D40]"
          >
            Learn how to set up your prototype
          </a>
        </p>
      </Flex>

      {/* CTA Button */}
      <CTAButton 
        emphasis="primary" 
        size="MD"
        onClick={onAddPrototype}
      >
        Add prototype
      </CTAButton>
    </Flex>
  );
}

export default PrototypeEmptyPreview;
