/**
 * useBlocks - Manages block data and study metadata for the builder.
 * Keeps local state while syncing updates to the preview and list.
 */
import { useMemo, useState, useCallback } from 'react';
import { USE_CASES, DEFAULT_USE_CASE } from '../data';

/**
 * Safely clones a use case payload to avoid mutating source data.
 * @param {Object} useCase - Use case object
 * @returns {{ studyMeta: Object, blocks: Array }}
 */
function cloneUseCase(useCase) {
  const payload = {
    studyMeta: useCase?.studyMeta || { name: 'Untitled Study' },
    blocks: useCase?.blocks || [],
  };
  return JSON.parse(JSON.stringify(payload));
}

/**
 * useBlocks hook
 * @param {string} initialUseCaseId - Initial use case id
 * @returns {{
 *  studyMeta: Object,
 *  blocks: Array,
 *  selectedBlockId: string,
 *  selectBlock: Function,
 *  updateBlock: Function,
 *  setUseCase: Function,
 * }}
 */
export function useBlocks(initialUseCaseId = DEFAULT_USE_CASE) {
  const [useCaseId, setUseCaseId] = useState(initialUseCaseId);
  const initialUseCase = USE_CASES[useCaseId] || USE_CASES[DEFAULT_USE_CASE];
  const initialPayload = cloneUseCase(initialUseCase);

  const [studyMeta, setStudyMeta] = useState(initialPayload.studyMeta);
  const [blocks, setBlocks] = useState(initialPayload.blocks);
  const [selectedBlockId, setSelectedBlockId] = useState(initialPayload.blocks[0]?.id);

  /**
   * Select a block by id.
   * @param {string} blockId - Block id
   */
  const selectBlock = useCallback((blockId) => {
    setSelectedBlockId(blockId);
  }, []);

  /**
   * Update a block with a partial patch.
   * @param {string} blockId - Block id
   * @param {Object} patch - Partial block fields to merge
   */
  const updateBlock = useCallback((blockId, patch) => {
    setBlocks((prevBlocks) => {
      const nextBlocks = prevBlocks.map((block) =>
        block.id === blockId ? { ...block, ...patch } : block
      );
      console.log('Block updated:', { blockId, patch });
      return nextBlocks;
    });
  }, []);

  /**
   * Switch to a different use case.
   * @param {string} nextUseCaseId - Use case id
   */
  const setUseCase = useCallback((nextUseCaseId) => {
    const nextUseCase = USE_CASES[nextUseCaseId] || USE_CASES[DEFAULT_USE_CASE];
    const nextPayload = cloneUseCase(nextUseCase);
    setUseCaseId(nextUseCaseId);
    setStudyMeta(nextPayload.studyMeta);
    setBlocks(nextPayload.blocks);
    setSelectedBlockId(nextPayload.blocks[0]?.id);
  }, []);

  const selectedBlock = useMemo(
    () => blocks.find((block) => block.id === selectedBlockId),
    [blocks, selectedBlockId]
  );

  return {
    studyMeta,
    blocks,
    selectedBlockId,
    selectedBlock,
    selectBlock,
    updateBlock,
    setUseCase,
  };
}
