import React, { forwardRef } from 'react';
import StarFilled from '@ant-design/icons/StarFilled';
import { ConfigContext } from 'antd/es/config-provider';
import { Tooltip } from 'antd';
import RcRate from './Rate/Rate';
import type { RateProps } from './Rate/Rate';

export interface IRateProps extends RateProps {
  tooltips?: Array<string>
}

const Rate = forwardRef<HTMLUListElement, IRateProps>((props, ref) => {
  const { prefixCls, tooltips, character = <StarFilled />, ...rest } = props
  const characterRender = (node: React.ReactElement, { index }: { index: number }) => {
    if(!tooltips) {
      return node
    }

    return <Tooltip title={tooltips[index]}>{node}</Tooltip>
  }

  const { getPrefixCls, direction } = React.useContext(ConfigContext)
  const ratePrefixCls = getPrefixCls('rate', prefixCls)

  return <RcRate ref={ref} character={character} {...rest} characterRender={characterRender} prefixCls={ratePrefixCls} direction={direction} />
})

export default Rate
