/**
 * BlockResults Component
 * 
 * Displays results for the selected block including:
 * - Block title header with response count
 * - Chart/visualization area (placeholder)
 * - Responses table with tabs (All responses / Highlights)
 */
import { useState } from 'react';
import { Flex, Box, Text, Heading, IconFigure, ScrollContainer, ActionButton, Icon } from '@framework/components/ariane';
import { MoreHorizontal, Filter, Play, ChevronLeft, ChevronRight, Table2, Sparkles } from 'lucide-react';
import { BLOCK_TYPES } from '../data';

/**
 * Mock response data
 */
const MOCK_RESPONSES = [
  { id: 1, clipDuration: '0:07', participantId: '483697735', responseValue: '8', respondedAt: '17 Dec 2025, 06:22 pm' },
  { id: 2, clipDuration: '0:12', participantId: '483697736', responseValue: '7', respondedAt: '17 Dec 2025, 05:18 pm' },
  { id: 3, clipDuration: '0:09', participantId: '483697737', responseValue: '9', respondedAt: '17 Dec 2025, 04:54 pm' },
  { id: 4, clipDuration: '0:15', participantId: '483697738', responseValue: '6', respondedAt: '17 Dec 2025, 03:47 pm' },
  { id: 5, clipDuration: '0:08', participantId: '483697739', responseValue: '8', respondedAt: '17 Dec 2025, 02:44 pm' },
];

/**
 * Response table tab button - Inter 16px font
 */
function ResponseTab({ icon: IconComponent, label, count, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-3
        font-['Inter'] text-[16px] leading-6 font-medium
        transition-all duration-150 cursor-pointer border-b-2
        ${isActive 
          ? 'text-[#0568FD] border-[#0568FD]' 
          : 'text-[#6C718C] border-transparent hover:text-[#535a74]'
        }
      `}
    >
      <IconComponent size={18} />
      <span>{label}</span>
      {count !== undefined && (
        <span className={`
          ml-1 px-1.5 py-0.5 rounded text-sm font-medium
          ${isActive ? 'bg-[#E8F4FF] text-[#0568FD]' : 'bg-neutral-100 text-[#6C718C]'}
        `}>
          {count}
        </span>
      )}
    </button>
  );
}

/**
 * Video thumbnail with play overlay and duration badge
 */
function VideoThumbnail({ duration }) {
  return (
    <div className="relative w-[100px] h-[56px] rounded-lg overflow-hidden bg-neutral-300">
      {/* Placeholder thumbnail */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-400 to-neutral-500" />
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
          <Play size={14} className="text-neutral-700 ml-0.5" fill="currentColor" />
        </div>
      </div>
      {/* Duration badge */}
      <div className="absolute bottom-1 right-1 flex items-center gap-1 bg-[#2a2a2a]/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
        <Play size={10} fill="white" />
        <span>{duration}</span>
      </div>
    </div>
  );
}

/**
 * Response table row
 */
function ResponseRow({ clipDuration, participantId, responseValue, respondedAt }) {
  return (
    <div className="flex items-center py-4 border-b border-[rgba(108,113,140,0.12)] hover:bg-neutral-50">
      <div className="w-[140px] px-4">
        <VideoThumbnail duration={clipDuration} />
      </div>
      <div className="w-[160px] px-4">
        <Text className="text-[#0568FD] font-medium">{participantId}</Text>
      </div>
      <div className="flex-1 px-4">
        <Text className="text-neutral-900">{responseValue}</Text>
      </div>
      <div className="w-[180px] px-4">
        <Text color="default.main.secondary">{respondedAt}</Text>
      </div>
      <div className="w-[80px] px-4 flex justify-center">
        <ActionButton emphasis="tertiary" size="SM" icon={<Icon name="share" />} iconOnly />
      </div>
    </div>
  );
}

/**
 * BlockResults - Main results display component
 */
export function BlockResults({ block }) {
  const [activeTab, setActiveTab] = useState('all');
  
  if (!block) {
    return (
      <Flex alignItems="center" justifyContent="center" className="h-full">
        <Text color="default.main.secondary">Select a block to view results</Text>
      </Flex>
    );
  }

  const blockType = BLOCK_TYPES[block.type] || {};
  const responseCount = MOCK_RESPONSES.length;

  return (
    <ScrollContainer className="h-full">
      <Flex flexDirection="column" className="p-6">
        {/* Filter Bar */}
        <Flex alignItems="center" className="mb-6">
          <ActionButton emphasis="secondary" size="SM" icon={<Filter size={16} />}>
            Add filters
          </ActionButton>
        </Flex>

        {/* Block Header */}
        <Flex alignItems="flex-start" justifyContent="space-between" className="mb-6">
          <Flex alignItems="center" gap="MD">
            <IconFigure 
              name={blockType.iconName || 'question'} 
              color={blockType.arianeColor || 'neutral'} 
              size="LG" 
              mode="dark"
              shape="squared"
            />
            <div>
              <Heading level={2} className="mb-1">
                {block.title || 'Block title'}
              </Heading>
              <Text color="default.main.secondary" className="text-sm">
                {blockType.name || 'Block type'}
              </Text>
            </div>
          </Flex>
          
          <Flex alignItems="center" gap="MD">
            <Flex flexDirection="column" alignItems="center" className="px-4 py-2 border border-[rgba(108,113,140,0.16)] rounded-lg">
              <Text className="text-xl font-semibold">{responseCount}</Text>
              <Text color="default.main.secondary" className="text-sm">responses</Text>
            </Flex>
            <button className="p-2 hover:bg-neutral-100 rounded cursor-pointer">
              <MoreHorizontal size={20} className="text-[#6C718C]" />
            </button>
          </Flex>
        </Flex>

        {/* Chart Placeholder */}
        <Box className="bg-[#f8f8fb] rounded-lg h-[200px] mb-8" />

        {/* Responses Section */}
        <div>
          <Heading level={3} className="mb-4">Responses</Heading>
          
          {/* Tabs and Share */}
          <Flex alignItems="center" justifyContent="space-between" className="border-b border-[rgba(108,113,140,0.16)] mb-4">
            <Flex>
              <ResponseTab 
                icon={Table2} 
                label="All responses" 
                isActive={activeTab === 'all'} 
                onClick={() => setActiveTab('all')} 
              />
              <ResponseTab 
                icon={Sparkles} 
                label="Highlights" 
                count={0}
                isActive={activeTab === 'highlights'} 
                onClick={() => setActiveTab('highlights')} 
              />
            </Flex>
            <ActionButton emphasis="tertiary" size="SM" icon={<Icon name="share" />}>
              Share
            </ActionButton>
          </Flex>

          {/* Table Header - grey background */}
          <div className="flex items-center py-3 bg-[#F8F8FB] rounded-t-lg text-xs font-semibold text-[#6C718C] uppercase tracking-wide">
            <div className="w-[140px] px-4">CLIPS</div>
            <div className="w-[160px] px-4">PARTICIPANT</div>
            <div className="flex-1 px-4">RESPONSE</div>
            <div className="w-[180px] px-4">RESPONDED AT</div>
            <div className="w-[80px] px-4 text-center">ACTIONS</div>
          </div>

          {/* Table Rows */}
          {MOCK_RESPONSES.map((response) => (
            <ResponseRow 
              key={response.id}
              clipDuration={response.clipDuration}
              participantId={response.participantId}
              responseValue={response.responseValue}
              respondedAt={response.respondedAt}
            />
          ))}

          {/* Pagination - using ActionButton/Tertiary */}
          <Flex alignItems="center" justifyContent="center" gap="MD" className="py-4">
            <ActionButton emphasis="tertiary" size="SM" icon={<ChevronLeft size={16} />} iconOnly />
            <Text color="default.main.secondary" className="text-sm">
              Page 1 of 2
            </Text>
            <ActionButton emphasis="tertiary" size="SM" icon={<ChevronRight size={16} />} iconOnly />
          </Flex>
        </div>
      </Flex>
    </ScrollContainer>
  );
}

export default BlockResults;
