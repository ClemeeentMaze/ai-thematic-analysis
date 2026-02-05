/**
 * AI Thematic Analysis Prototype v1
 * 
 * Exploring AI-powered thematic analysis features for qualitative research.
 * 
 * Layout Structure:
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  HEADER (64px) - Back, Study Name, Save State, Preview, Go Live     │
 * ├─────────────┬────────────────────────────────────────────────────────┤
 * │             │                                                        │
 * │  LEFT PANEL │              CONTENT AREA                              │
 * │  Block List │              (flex: 1)                                 │
 * │  (360px)    │                                                        │
 * │             │                                                        │
 * └─────────────┴────────────────────────────────────────────────────────┘
 */
import { useEffect, useMemo, useState } from 'react';
import { Flex, Box, Text, ActionButton, CTAButton } from '@framework/components/ariane';
import { useStatePlayground } from '@framework/hooks/useStatePlayground';
import { Tag, X } from 'lucide-react';

// Local components
import { BuilderHeader } from './components/BuilderHeader';
import { BlockList } from './components/BlockList';
import { BlockResults } from './components/BlockResults';
import { ParticipantResults } from './components/ParticipantResults';
import { ThemeResults } from './components/ThemeResults';
import { ProjectStudiesScreen } from './components/ProjectStudiesScreen';

// Mock data
import { BLOCK_TYPES, DEFAULT_USE_CASE, USE_CASES } from './data';
import { useBlocks } from './hooks/useBlocks';

/**
 * Toast notification component for new highlights
 */
function NewHighlightsToast({ onNavigateToThemes, onDismiss }) {
  return (
    <div className="absolute top-4 right-6 z-[9999] animate-slide-down">
      <div className="flex gap-3 bg-white rounded-xl shadow-lg border border-[rgba(108,113,140,0.16)] px-4 py-3">
        <div className="w-10 h-10 rounded-lg bg-[#F0FAFF] flex items-center justify-center flex-shrink-0">
          <Tag size={20} className="text-[#0568FD]" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Text className="font-medium text-neutral-900">New highlights generated</Text>
              <Text color="default.main.secondary" className="text-sm">
                Run a thematic analysis to find themes.
              </Text>
            </div>
            <button 
              onClick={onDismiss}
              className="text-[#6C718C] hover:text-neutral-900 p-1 cursor-pointer flex-shrink-0"
            >
              <X size={20} />
            </button>
          </div>
          <CTAButton 
            emphasis="tertiary" 
            size="SM"
            onClick={onNavigateToThemes}
          >
            Start analysis
          </CTAButton>
        </div>
      </div>
    </div>
  );
}

/**
 * ThematicAnalysisV1 - Main prototype component
 * 
 * Implements the full-height layout:
 * - Header (64px fixed)
 * - Content area (fills remaining height):
 *   - Left panel (360px): Block list
 *   - Main content (flex): Empty content area
 */
function ThematicAnalysisV1() {
  const { state } = useStatePlayground();
  const {
    studyMeta,
    blocks,
    selectedBlock,
    selectedBlockId,
    selectBlock,
    setUseCase,
  } = useBlocks(DEFAULT_USE_CASE);

  // View state: 'project' shows the project/studies list, 'results' shows the study results
  const [currentView, setCurrentView] = useState('project');
  const [selectedStudyId, setSelectedStudyId] = useState(null);

  // Tab state for Results/Participants/Themes
  const [activeTab, setActiveTab] = useState('results');
  
  // Hide toast when switching to themes tab
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    if (newTab === 'themes') {
      setShowNewHighlightsToast(false);
    }
  };
  const [selectedParticipantId, setSelectedParticipantId] = useState('p1');
  const [selectedThemeId, setSelectedThemeId] = useState('thematic-analysis');
  
  // Track which blocks have been viewed (to hide "new highlights" after viewing)
  const [viewedBlocks, setViewedBlocks] = useState(new Set());
  
  // Track if uncategorized theme has been viewed
  const [uncategorizedViewed, setUncategorizedViewed] = useState(false);
  
  // Track AI-generated themes (populated after analysis is complete)
  const [generatedThemes, setGeneratedThemes] = useState([]);
  
  // Toast visibility for new highlights notification
  const [showNewHighlightsToast, setShowNewHighlightsToast] = useState(false);

  // Handle study selection from project screen
  const handleSelectStudy = (studyId) => {
    setSelectedStudyId(studyId);
    setCurrentView('results');
    // Show toast when entering results (only if analysis hasn't been done yet)
    if (generatedThemes.length === 0) {
      setShowNewHighlightsToast(true);
    }
  };

  // Handle back navigation to project screen
  const handleBackToProject = () => {
    setCurrentView('project');
    setSelectedStudyId(null);
  };

  // Handle analysis completion - add generated themes to the list
  const handleAnalysisComplete = (themes) => {
    setGeneratedThemes(themes);
    // Hide toast when analysis is complete
    setShowNewHighlightsToast(false);
  };
  
  // Navigate to thematic analysis from toast
  const handleToastNavigateToThemes = () => {
    setActiveTab('themes');
    setSelectedThemeId('thematic-analysis');
    setShowNewHighlightsToast(false);
  };

  // Mark the PREVIOUS block as viewed when navigating to a new block
  const handleSelectBlock = (blockId) => {
    // Mark the current block as viewed before switching
    if (selectedBlockId && selectedBlockId !== blockId) {
      setViewedBlocks(prev => new Set([...prev, selectedBlockId]));
    }
    selectBlock(blockId);
  };

  // Mark uncategorized as viewed when leaving it
  const handleSelectTheme = (themeId) => {
    // Mark uncategorized as viewed when navigating away from it
    if (selectedThemeId === 'uncategorized' && themeId !== 'uncategorized') {
      setUncategorizedViewed(true);
    }
    setSelectedThemeId(themeId);
  };

  // Mock theme data for ThemeResults
  // Total highlights: prototype_test(4) + scale(2) + input(2) = 8
  const MOCK_THEMES = {
    'thematic-analysis': { id: 'thematic-analysis', name: 'Thematic analysis', status: 'Not enough sessions' },
    'uncategorized': { id: 'uncategorized', name: 'Uncategorized', highlightCount: 8, newCount: uncategorizedViewed ? 0 : 5 },
  };
  
  // Find selected theme - could be from mock themes or generated themes
  const selectedTheme = MOCK_THEMES[selectedThemeId] || generatedThemes.find(t => t.id === selectedThemeId);

  const { useCase, selectedBlockType, blockCount } = state || {};

  /**
   * When use case changes, load its study meta and blocks.
   */
  useEffect(() => {
    if (useCase) {
      setUseCase(useCase);
    }
  }, [useCase, setUseCase]);

  /**
   * Slice the visible block list for demo purposes.
   */
  const visibleBlocks = useMemo(() => {
    if (!blockCount || blockCount >= blocks.length) {
      return blocks;
    }

    const fixedCount = blocks.filter((block) => block.isFixed).length;
    const nonFixedLimit = Math.max(blockCount - fixedCount, 0);
    const result = [];
    let nonFixedUsed = 0;

    blocks.forEach((block) => {
      if (block.isFixed) {
        result.push(block);
        return;
      }
      if (nonFixedUsed < nonFixedLimit) {
        result.push(block);
        nonFixedUsed += 1;
      }
    });

    return result;
  }, [blocks, blockCount]);

  /**
   * Keep selection valid when visible blocks change.
   */
  useEffect(() => {
    const stillVisible = visibleBlocks.find((block) => block.id === selectedBlockId);
    if (!stillVisible && visibleBlocks[0]) {
      selectBlock(visibleBlocks[0].id);
    }
  }, [visibleBlocks, selectedBlockId, selectBlock]);

  /**
   * Select the first block of a given type for demos.
   */
  useEffect(() => {
    if (!selectedBlockType) return;
    const blockOfType = visibleBlocks.find((block) => block.type === selectedBlockType);
    if (blockOfType) {
      selectBlock(blockOfType.id);
    }
  }, [selectedBlockType, visibleBlocks, selectBlock]);

  // Show project studies list
  if (currentView === 'project') {
    return <ProjectStudiesScreen onSelectStudy={handleSelectStudy} />;
  }

  // Show study results
  return (
    <Flex 
      flexDirection="column" 
      className="h-screen w-full overflow-hidden bg-neutral-50"
    >
      {/* 
        HEADER - Fixed 64px height
        Contains: Back button, study name, save state, actions
      */}
      <BuilderHeader studyMeta={studyMeta} onBack={handleBackToProject} />
      
      {/* 
        CONTENT AREA - Fills remaining height
        Two-panel layout
      */}
      <Flex className="flex-1 min-h-0 overflow-hidden">
        {/* 
          Left Panel - Block List
          Fixed width: 360px
        */}
        <Box className="w-[360px] min-w-[360px] flex-shrink-0 h-full">
          <BlockList
            blocks={visibleBlocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={handleSelectBlock}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            selectedParticipantId={selectedParticipantId}
            onSelectParticipant={setSelectedParticipantId}
            selectedThemeId={selectedThemeId}
            onSelectTheme={handleSelectTheme}
            viewedBlocks={viewedBlocks}
            uncategorizedViewed={uncategorizedViewed}
            generatedThemes={generatedThemes}
          />
        </Box>
        
        {/* 
          Main Content Area - Changes based on active tab
          Flex: 1 (grows to fill remaining space)
        */}
        <Box className="flex-1 h-full bg-white relative">
          {/* Toast notification for new highlights */}
          {showNewHighlightsToast && (
            <NewHighlightsToast 
              onNavigateToThemes={handleToastNavigateToThemes}
              onDismiss={() => setShowNewHighlightsToast(false)}
            />
          )}
          
          {activeTab === 'results' && (
            <BlockResults 
              block={selectedBlock} 
              isViewed={viewedBlocks.has(selectedBlock?.id)} 
              generatedThemes={generatedThemes}
              onNavigateToThemes={() => {
                setActiveTab('themes');
                setSelectedThemeId('thematic-analysis');
              }}
              onNavigateToParticipant={(participantId) => {
                setActiveTab('participants');
                // Map response participant ID to participant list ID (p1, p2, etc.)
                const participantIndex = ['483697735', '483697736', '483697737', '483697738', '483697739'].indexOf(participantId);
                if (participantIndex >= 0) {
                  setSelectedParticipantId(`p${participantIndex + 1}`);
                }
              }}
            />
          )}
          {activeTab === 'participants' && <ParticipantResults blocks={visibleBlocks} selectedParticipantId={selectedParticipantId} generatedThemes={generatedThemes} />}
          {activeTab === 'themes' && <ThemeResults theme={selectedTheme} isViewed={selectedThemeId === 'uncategorized' ? uncategorizedViewed : false} onAnalysisComplete={handleAnalysisComplete} />}
        </Box>
      </Flex>
    </Flex>
  );
}

// Prototype metadata for the selector
ThematicAnalysisV1.Title = "Responses: Table Layout";
ThematicAnalysisV1.Description = "Open Question/AI responses use the same table layout as other blocks, with selectable transcript text in the response column";
ThematicAnalysisV1.Order = 10;
ThematicAnalysisV1.Group = "Response Variants";
ThematicAnalysisV1.StateControls = {
  useCase: {
    label: 'Use Case',
    type: 'select',
    options: Object.keys(USE_CASES),
    default: DEFAULT_USE_CASE,
  },
  selectedBlockType: {
    label: 'Selected Block',
    type: 'select',
    options: Object.keys(BLOCK_TYPES),
    default: 'welcome',
  },
  blockCount: {
    label: 'Block Count',
    type: 'range',
    min: 2,
    max: 25,
    default: 25,
  },
};

export default ThematicAnalysisV1;
