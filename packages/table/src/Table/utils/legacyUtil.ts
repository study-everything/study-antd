import type { ExpandableConfig, LegacyExpandableProps } from '../interface';

export const INTERNAL_COL_DEFINE = 'RC_TABLE_INTERNAL_COL_DEFINE';

export function getExpandableProps<RecordType>(props): ExpandableConfig<RecordType> {
  const { expandable, ...legacyExpandableConfig } = props;

  let config: ExpandableConfig<RecordType>;
  if (Reflect.has(props, 'expandable')) {
    config = {
      ...legacyExpandableConfig,
      ...expandable,
    };
  } else {
    config = legacyExpandableConfig;
  }
  return config;
}
