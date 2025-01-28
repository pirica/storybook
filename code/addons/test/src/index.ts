import { definePreview } from 'storybook/internal/preview-api';

import * as addonAnnotations from './preview';
import type { storybookTest as storybookTestImport } from './vitest-plugin';

export default () => definePreview(addonAnnotations);

// @ts-expect-error - this is a hack to make the module's sub-path augmentable
declare module '@storybook/experimental-addon-test/vitest-plugin' {
  export const storybookTest: typeof storybookTestImport;
}
