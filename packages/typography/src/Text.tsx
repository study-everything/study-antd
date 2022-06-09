import * as React from 'react';
import omit from 'rc-util/lib/omit';
import {warning} from '@study/util';
import type {BlockProps, EllipsisConfig} from './Base';
import Base from './Base';

export interface TextProps extends BlockProps {
  ellipsis?: boolean | Omit<EllipsisConfig, 'expandable' | 'rows' | 'onExpand'>;
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}

const Text = React.forwardRef<HTMLSpanElement, TextProps>((
  {ellipsis, ...restProps},
  ref,
) => {
  const mergedEllipsis = React.useMemo(() => {
    if (ellipsis && typeof ellipsis === 'object') {
      return omit(ellipsis as any, ['expandable', 'rows']);
    }

    return ellipsis;
  }, [ellipsis]);

  warning(
    typeof ellipsis !== 'object' ||
    !ellipsis ||
    (!('expandable' in ellipsis) && !('rows' in ellipsis)),
    'Typography.Text',
    '`ellipsis` do not support `expandable` or `rows` props.',
  );

  return <Base ref={ref} {...restProps} ellipsis={mergedEllipsis} component="span"/>;
});
Text.displayName = 'Text'

export default Text