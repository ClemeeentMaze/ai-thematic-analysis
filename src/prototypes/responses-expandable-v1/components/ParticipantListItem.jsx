/**
 * ParticipantListItem Component
 * 
 * Represents a single participant in the left panel list.
 * Displays participant avatar (circle), ID and URL Link subtext.
 */
import { Flex, Box, Text, IconFigure } from '@framework/components/ariane';

/**
 * ParticipantListItem displays a clickable participant card in the sidebar
 * 
 * @param {Object} props
 * @param {Object} props.participant - Participant data object
 * @param {boolean} props.isSelected - Whether this participant is currently selected
 * @param {Function} props.onSelect - Callback when participant is clicked
 */
export function ParticipantListItem({ participant, isSelected, onSelect }) {
  return (
    <Box
      onClick={() => onSelect(participant.id)}
      className={`
        bg-white rounded-lg p-4 cursor-pointer
        transition-all duration-150
        ${isSelected 
          ? 'shadow-[inset_0px_0px_0px_1px_#0568fd] bg-[#F0FAFF]' 
          : 'shadow-[inset_0px_0px_0px_0.5px_rgba(108,113,140,0.28)]'
        }
        hover:shadow-[0px_2px_4px_rgba(108,113,140,0.12),inset_0px_0px_0px_0.5px_rgba(108,113,140,0.4)]
      `}
    >
      <Flex gap="SM" alignItems="center">
        {/* Participant Avatar - Circle shape */}
        <IconFigure 
          name="user"
          color="secondary"
          mode="dark"
          size="MDPlus"
          shape="circle"
        />
        
        {/* Participant Content */}
        <Box className="flex-1 min-w-0 overflow-hidden">
          <p className="text-[16px] leading-6 truncate text-black m-0">
            Participant {participant.participantId}
          </p>
          {/* Subtext - URL Link */}
          <Text 
            type="caption" 
            color="default.main.secondary"
            className="leading-5"
          >
            URL Link
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default ParticipantListItem;
