/**
 * Block registry that maps block types to their Settings and Preview components.
 * This keeps block type wiring in one place for easier extension.
 */
import { MultipleChoiceSettings } from './components/settings/MultipleChoiceSettings';
import { YesNoSettings } from './components/settings/YesNoSettings';
import { ContextSettings } from './components/settings/ContextSettings';
import { OpinionScaleSettings } from './components/settings/OpinionScaleSettings';
import { SimpleInputSettings } from './components/settings/SimpleInputSettings';
import { OpenQuestionSettings } from './components/settings/OpenQuestionSettings';
import { PrototypeTestSettings } from './components/settings/PrototypeTestSettings';

import { WebsiteTestPreview } from './components/previews/WebsiteTestPreview';
import { OpenQuestionPreview } from './components/previews/OpenQuestionPreview';
import { SimpleInputPreview } from './components/previews/SimpleInputPreview';
import { OpinionScalePreview } from './components/previews/OpinionScalePreview';
import { MultipleChoicePreview } from './components/previews/MultipleChoicePreview';
import { ContextPreview } from './components/previews/ContextPreview';
import { YesNoPreview } from './components/previews/YesNoPreview';

export const BLOCK_REGISTRY = {
  prototype_test: { Settings: PrototypeTestSettings, Preview: WebsiteTestPreview },
  multiple_choice: { Settings: MultipleChoiceSettings, Preview: MultipleChoicePreview },
  context: { Settings: ContextSettings, Preview: ContextPreview },
  scale: { Settings: OpinionScaleSettings, Preview: OpinionScalePreview },
  yesno: { Settings: YesNoSettings, Preview: YesNoPreview },
  input: { Settings: OpenQuestionSettings, Preview: OpenQuestionPreview },
  simple_input: { Settings: SimpleInputSettings, Preview: SimpleInputPreview },
};
