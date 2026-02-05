/**
 * ProjectStudiesScreen Component
 * 
 * Displays a project with a list of studies. Clicking on a study
 * opens its results view.
 */
import { Flex, Box, Text, Heading, ActionButton, ScrollContainer, IconFigure } from '@framework/components/ariane';
import { ArrowLeft, MoreHorizontal, Settings, Users, Sparkles } from 'lucide-react';

/**
 * Study type card for "Create new study" section
 */
function StudyTypeCard({ icon, iconColor, title, description }) {
  return (
    <button className="flex items-center gap-3 p-4 border border-[rgba(108,113,140,0.16)] rounded-lg hover:border-[#0568FD] hover:bg-[#F0FAFF] transition-colors cursor-pointer text-left flex-1 min-w-[280px]">
      <IconFigure 
        name={icon} 
        color={iconColor} 
        size="MD" 
        mode="dark"
        shape="squared"
      />
      <div>
        <Text className="font-medium text-neutral-900">{title}</Text>
        <Text color="default.main.secondary" className="text-sm">{description}</Text>
      </div>
    </button>
  );
}

/**
 * Status badge component
 */
function StatusBadge({ status }) {
  const isLive = status === 'LIVE';
  const isDraft = status === 'DRAFT';
  
  return (
    <span 
      className={`px-2 py-0.5 text-xs font-medium rounded ${
        isLive 
          ? 'bg-[#E0F2FE] text-[#0568FD]' 
          : isDraft 
            ? 'bg-neutral-100 text-neutral-600' 
            : 'bg-neutral-100 text-neutral-600'
      }`}
    >
      {status}
    </span>
  );
}

/**
 * Avatar placeholder component
 */
function Avatar({ seed = 0 }) {
  const colors = ['#FFB74D', '#64B5F6', '#81C784', '#BA68C8', '#FF8A65'];
  const bgColor = colors[seed % colors.length];
  
  return (
    <div 
      className="w-8 h-8 rounded-full flex items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      <Users size={14} className="text-white" />
    </div>
  );
}

/**
 * New highlights badge
 */
function NewHighlightsBadge({ count }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-[#F9F7FF] text-[#6B5BEE]">
      <Sparkles size={12} />
      {count} new highlights
    </span>
  );
}

/**
 * Study row component
 */
function StudyRow({ study, onSelect }) {
  return (
    <div 
      className="flex items-center py-4 border-b border-[rgba(108,113,140,0.12)] hover:bg-neutral-50 cursor-pointer"
      onClick={() => onSelect(study.id)}
    >
      <div className="flex-1 px-4 min-w-0">
        <Flex alignItems="center" gap="SM">
          <IconFigure 
            name="maze" 
            color="cyan" 
            size="SM" 
            mode="dark"
            shape="squared"
          />
          <div className="min-w-0">
            <Flex alignItems="center" gap="SM">
              <Text className="font-medium text-neutral-900 truncate">{study.name}</Text>
              {study.newHighlights && <NewHighlightsBadge count={study.newHighlights} />}
            </Flex>
            <Flex alignItems="center" gap="XS">
              <Text color="default.main.secondary" className="text-sm">{study.type}</Text>
              {study.hasPanel && (
                <span className="text-xs text-[#6C718C] bg-neutral-100 px-1 rounded">P</span>
              )}
            </Flex>
          </div>
        </Flex>
      </div>
      <div className="w-[100px] px-4">
        <StatusBadge status={study.status} />
      </div>
      <div className="w-[120px] px-4 text-center">
        <Text className="text-neutral-900">{study.participants || '-'}</Text>
      </div>
      <div className="w-[80px] px-4 flex justify-center">
        <Avatar seed={study.id} />
      </div>
      <div className="w-[120px] px-4">
        <Text color="default.main.secondary" className="text-sm">{study.createdOn}</Text>
      </div>
      <div className="w-[120px] px-4">
        <Flex alignItems="center" gap="XS">
          <Text color="default.main.secondary" className="text-sm">{study.updatedOn}</Text>
        </Flex>
      </div>
      <div className="w-[80px] px-4 flex justify-center">
        <button className="p-2 hover:bg-neutral-100 rounded">
          <MoreHorizontal size={16} className="text-[#6C718C]" />
        </button>
      </div>
    </div>
  );
}

/**
 * Mock studies data
 */
const MOCK_STUDIES = [
  { id: 1, name: 'User research study', type: 'Unmoderated maze', status: 'LIVE', participants: 8, newHighlights: 5, createdOn: '16 Jan 2026', updatedOn: '4 Feb 2026' },
  { id: 2, name: 'Onboarding flow test', type: 'Unmoderated maze', status: 'LIVE', participants: 73, createdOn: '28 Nov 2025', updatedOn: '3 Feb 2026' },
  { id: 3, name: 'Mobile app prototype', type: 'Unmoderated maze', status: 'DRAFT', participants: null, createdOn: '4 Nov 2025', updatedOn: '25 Nov 2025' },
];

/**
 * ProjectStudiesScreen - Main component
 */
export function ProjectStudiesScreen({ onSelectStudy }) {
  return (
    <Flex flexDirection="column" className="h-screen w-full overflow-hidden bg-white">
      {/* Header */}
      <Flex 
        alignItems="center" 
        justifyContent="space-between" 
        className="h-16 px-4 border-b border-[rgba(108,113,140,0.16)] flex-shrink-0"
      >
        <Flex alignItems="center" gap="MD">
          <button className="p-2 hover:bg-neutral-100 rounded">
            <ArrowLeft size={20} className="text-[#6C718C]" />
          </button>
          <Flex alignItems="center" gap="XS">
            <Text className="font-medium text-neutral-900">Maze Mobile App</Text>
            <span className="text-lg">📱</span>
          </Flex>
        </Flex>
        <Flex alignItems="center" gap="SM">
          <ActionButton emphasis="tertiary" size="SM" icon={<Users size={16} />} iconOnly />
          <ActionButton emphasis="tertiary" size="SM" icon={<Settings size={16} />} iconOnly />
        </Flex>
      </Flex>

      {/* Content */}
      <ScrollContainer className="flex-1">
        <Box className="p-8 max-w-[1400px] mx-auto">
          {/* Project Title */}
          <Flex alignItems="center" gap="SM" className="mb-8">
            <Heading level={1} className="text-2xl font-semibold">Maze Mobile App</Heading>
            <span className="text-2xl">📱</span>
          </Flex>

          {/* Create New Study Section */}
          <div className="mb-8">
            <Text color="default.main.secondary" className="mb-4 block">Create new study</Text>
            <Flex gap="MD" className="flex-wrap">
              <StudyTypeCard 
                icon="maze" 
                iconColor="cyan" 
                title="Unmoderated maze" 
                description="Asynchronous surveys and tasks"
              />
              <StudyTypeCard 
                icon="comment" 
                iconColor="purple" 
                title="AI-moderated" 
                description="Scalable AI-led voice conversations"
              />
              <StudyTypeCard 
                icon="users" 
                iconColor="violet" 
                title="Moderated interview" 
                description="Live interviews for in-depth insights"
              />
            </Flex>
          </div>

          {/* Studies Section */}
          <div>
            <Heading level={2} className="text-xl font-semibold mb-1">Studies</Heading>
            <Text color="default.main.secondary" className="mb-6">{MOCK_STUDIES.length} studies in this project</Text>

            {/* Studies Table */}
            <div className="border border-[rgba(108,113,140,0.16)] rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="flex items-center py-3 bg-[#F8F8FB] text-xs font-semibold text-[#6C718C] uppercase tracking-wide">
                <div className="flex-1 px-4">STUDY NAME</div>
                <div className="w-[100px] px-4">STATUS</div>
                <div className="w-[120px] px-4 text-center">PARTICIPANTS</div>
                <div className="w-[80px] px-4 text-center">CREATED BY</div>
                <div className="w-[120px] px-4">CREATED ON</div>
                <div className="w-[120px] px-4">UPDATED ON</div>
                <div className="w-[80px] px-4 text-center">ACTIONS</div>
              </div>

              {/* Study Rows */}
              {MOCK_STUDIES.map((study, index) => (
                <StudyRow 
                  key={study.id} 
                  study={study} 
                  onSelect={onSelectStudy}
                />
              ))}
            </div>
          </div>
        </Box>
      </ScrollContainer>
    </Flex>
  );
}
