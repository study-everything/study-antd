import { PresetColorTypes } from './utils/colors';

// eslint-disable-next-line import/prefer-default-export
export function isPresetColor(color?: string): boolean {
  return (PresetColorTypes as any[]).includes(color);
}
