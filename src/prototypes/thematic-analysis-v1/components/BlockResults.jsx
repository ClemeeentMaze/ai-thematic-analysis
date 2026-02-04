/**
 * BlockResults Component
 * 
 * Displays results for the selected block including:
 * - Block title header with response count
 * - Chart/visualization area (placeholder)
 * - Responses table with tabs (All responses / Highlights)
 */
import { useState } from 'react';
import { Flex, Box, Text, Heading, IconFigure, ScrollContainer } from '@framework/components/ariane';
import { MoreHorizontal, Filter, Play, Share2, ChevronLeft, ChevronRight, Table2, Sparkles } from 'lucide-react';
import { BLOCK_TYPES } from '../data';

/**
 * Mock response data
 */
const MOCK_RESPONSES = [
  { id: 1, clipDuration: '1:38', participantId: '2712', response: '20 Nov 2023, 06:18 pm' },
  { id: 2, clipDuration: '0:48', participantId: '2151', response: '18 Nov 2023, 04:18 pm' },
  { id: 3, clipDuration: '0:57', participantId: '3009', response: '18 Nov 2023, 11:54 am' },
  { id: 4, clipDuration: '0:52', participantId: '8430', response: '18 Nov 2023, 11:47 am' },
  { id: 5, clipDuration: '0:23', participantId: '1234', response: '18 Nov 2023, 11:44 pm' },
];

/**
 * Response table tab button
 */
function ResponseTab({ icon: IconComponent, label, count, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1.5 px-3 py-2 text-sm font-medium
        transition-all duration-150 cursor-pointer border-b-2
        ${isActive 
          ? 'text-[#0568FD] border-[#0568FD]' 
          : 'text-[#6C718C] border-transparent hover:text-[#535a74]'
        }
      `}
    >
      <IconComponent size={16} />
      <span>{label}</span>
      {count !== undefined && (
        <span className={`text-xs ${isActive ? 'text-[#0568FD]' : 'text-[#9597b0]'}`}>
          {count}
        </span>
      )}
    </button>
  );
}

/**
 * Clip badge with play icon and duration
 */
function ClipBadge({ duration }) {
  return (
    <div className="flex items-center gap-1 bg-[#2a2a2a] text-white text-xs font-medium px-2 py-1.5 rounded">
      <Play size={12} fill="white" />
      <span>{duration}</span>
    </div>
  );
}

/**
 * Response table row
 */
function ResponseRow({ clipDuration, participantId, response }) {
  return (
    <div className="flex items-center py-3 border-b border-[rgba(108,113,140,0.12)] hover:bg-neutral-50">
      <div className="w-[100px] px-4">
        <ClipBadge duration={clipDuration} />
      </div>
      <div className="w-[120px] px-4">
        <Text className="text-[#0568FD] font-medium">{participantId}</Text>
      </div>
      <div className="flex-1 px-4">
        <Text color="default.main.secondary">{response}</Text>
      </div>
      <div className="w-[80px] px-4 flex justify-center">
        <button className="p-2 hover:bg-neutral-100 rounded cursor-pointer">
          <Share2 size={16} className="text-[#6C718C]" />
        </button>
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
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#6C718C] bg-white border border-[rgba(108,113,140,0.28)] rounded-lg hover:bg-neutral-50 cursor-pointer">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </Flex>

        {/* Block Header */}
        <Flex alignItems="flex-start" justifyContent="space-between" className="mb-6">
          <Flex alignItems="center" gap="MD">
            <IconFigure 
              name={blockType.iconName || 'question'} 
              color={blockType.arianeColor || 'neutral'} 
              size="LG" 
              mode="dark" 
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
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#6C718C] hover:text-[#535a74] cursor-pointer">
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </Flex>

          {/* Table Header */}
          <div className="flex items-center py-2 border-b border-[rgba(108,113,140,0.16)] text-xs font-semibold text-[#6C718C] uppercase tracking-wide">
            <div className="w-[100px] px-4">Clips</div>
            <div className="w-[120px] px-4">Participant</div>
            <div className="flex-1 px-4">Response</div>
            <div className="w-[80px] px-4 text-center">Actions</div>
          </div>

          {/* Table Rows */}
          {MOCK_RESPONSES.map((response) => (
            <ResponseRow 
              key={response.id}
              clipDuration={response.clipDuration}
              participantId={response.participantId}
              response={response.response}
            />
          ))}

          {/* Pagination */}
          <Flex alignItems="center" justifyContent="center" gap="MD" className="py-4">
            <button className="p-2 hover:bg-neutral-100 rounded cursor-pointer">
              <ChevronLeft size={20} className="text-[#6C718C]" />
            </button>
            <Text color="default.main.secondary" className="text-sm">
              Page 1 of 2
            </Text>
            <button className="p-2 hover:bg-neutral-100 rounded cursor-pointer">
              <ChevronRight size={20} className="text-[#6C718C]" />
            </button>
          </Flex>
        </div>
      </Flex>
    </ScrollContainer>
  );
}

export default BlockResults;
