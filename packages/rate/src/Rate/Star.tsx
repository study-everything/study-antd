
import React from 'react'
import { forwardRef } from 'react'
import type { ReactNode, ReactElement, MouseEvent, KeyboardEvent } from 'react'

export interface IStarProps {
  character?: ReactNode | ((arg: IStarProps) => ReactNode)
  prefixCls?: string
  index?: number
  value?: number
  count?: number
  allowHalf?: boolean
  focused?: boolean
  disabled?: boolean
  onClick?: (e: MouseEvent | KeyboardEvent, index: number) => void
  onHover?: (e: MouseEvent<HTMLDivElement>, index: number) => void
  characterRender?: (origin: ReactElement, Props: IStarProps) => ReactNode
}


export default forwardRef<HTMLLIElement, IStarProps>((props, ref) => {
  const {
    prefixCls,
    index,
    character,
    value,
    count,
    allowHalf,
    focused,
    disabled,
    onClick,
    onHover,
    characterRender
  } = props

  const characterNode = typeof character === 'function' ? character(props) : character
  const getClassName = () => {
    const starValue = index + 1
    let className = prefixCls

    if(value === 0 && index === 0 && focused) {
      className += ` ${prefixCls}-focused`
    } else if (allowHalf && value + 0.5 >= starValue && value < starValue) {
      className += ` ${prefixCls}-half ${prefixCls}-active`

      if(focused) {
        className += ` ${prefixCls}-focused`
      }
    } else {
      className += starValue <= value ? ` ${prefixCls}-full` : ` ${prefixCls}-zero`

      if(starValue === value && focused) {
        className += ` ${prefixCls}-focused`
      }
    }

    return className
  }
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if(e.keyCode === 13) {
      onClick(e, index)
    }
  }

  let star = <li className={getClassName()} ref={ref}>
    <div
      onKeyDown={disabled ? null : onKeyDown}
      onClick={disabled ? null : (e) => onClick(e, index)}
      onMouseMove={disabled ? null : (e) => onHover(e, index)}
      aria-checked={value > index ? 'true' : 'false'}
      aria-posinset={index + 1}
      aria-setsize={count}
      tabIndex={disabled ? -1 : 0}
    >
      <div className={`${prefixCls}-first`}>{characterNode}</div>
      <div className={`${prefixCls}-second`}>{characterNode}</div>
    </div>
  </li>

  if(characterRender) {
    star = characterRender(star, props) as JSX.Element
  }

	return star
})
