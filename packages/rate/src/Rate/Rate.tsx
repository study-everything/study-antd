
import React, { useState, useRef, forwardRef } from 'react'
import type { CSSProperties, MouseEvent, KeyboardEvent } from 'react'
import findDOMNode from 'rc-util/lib/Dom/findDOMNode';
import KeyCode from 'rc-util/lib/KeyCode'
import classNames from 'classnames'
import { getOffsetLeft } from '../util/tools'
import Star, { IStarProps } from './Star'

export interface RateProps extends Pick<IStarProps, "count" | "character" | "characterRender" | "allowHalf" | "disabled"> {
  allowClear?: boolean
  autoFocus?: boolean
  style?: CSSProperties
  defaultValue?: number
  value?: number
  tabIndex?: number
  prefixCls?: string
  direction?: string
  onFocus?: () => void
  onBlur?: () => void
  onKeyDown?: (arg: KeyboardEvent<HTMLUListElement>) => void
  onChange?: (value: number) => void
  onHoverChange?: (value: number) => void
}


export default forwardRef<HTMLUListElement, RateProps>((props, ref) => {
  const {
    style,
    allowClear,
    allowHalf,
    disabled,
    defaultValue = 0,
    count = 5,
    tabIndex = 0,
    prefixCls = 'rc-rate',
    character = '★',
    direction = 'ltr',
    onFocus,
    onBlur,
    onKeyDown,
    onChange,
    onHoverChange,
    characterRender
  } = props

  const [value, setValue] = useState(props.value ? props.value : defaultValue)
  const [hoverValue, setHoverValue] = useState<number | undefined>()
  const [cleanedValue, setCleanedValue] = useState<number | null>(null)
  const [focused, setFocused] = useState(false)
  const starsEle = useRef<Array<HTMLLIElement>>([])

  const getStarValue = (index: number, x: number) => {
    const reverse = direction === 'rtl'
    let value = index + 1

    if(allowHalf) {
      const starEle = findDOMNode(starsEle.current[index]) as HTMLElement
      const leftDis = getOffsetLeft(starEle)
      const width = starEle.clientWidth

      if(reverse && x - leftDis > width / 2) {
        value -= 0.5
      } else if(!reverse && x - leftDis < width / 2) {
        value -= 0.5
      }
    }

    return value
  }

  const onClick = (e: MouseEvent | KeyboardEvent, idx: number) => {
    const newValue = getStarValue(idx, (e as MouseEvent).pageX)
    let isReset = false
    if(allowClear) {
      isReset = newValue === value
    }
    onMouseLeave()
    setValue(isReset ? 0 : newValue)
    setCleanedValue(isReset ? newValue : null)
  }
  const onHover = (event: MouseEvent<HTMLDivElement>, index: number) => {
    const hoverValue = getStarValue(index, event.pageX)
    if (hoverValue !== cleanedValue) {
      setHoverValue(hoverValue)
      setCleanedValue(null)
    }

    onHoverChange && onHoverChange(hoverValue)
  }
  const onMouseLeave = () => {
    setHoverValue(undefined)
    setCleanedValue(null)
    
    onHoverChange && onHoverChange(hoverValue)
  }
  const handleFocus = () => {
    setFocused(true)

    onFocus && onFocus()
  }
  const handleBlur = () => {
    setFocused(false)

    onBlur && onBlur()
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const { keyCode } = e
    const reverse = direction === 'rtl'
    let newValue = 0
    if(keyCode === KeyCode.RIGHT && value < count && !reverse) {
      newValue = allowHalf ? value + 0.5 : value + 1
    } else if(keyCode === KeyCode.LEFT && value > 0 && !reverse) {
      newValue = allowHalf ? value - 0.5 : value - 1
    } else if(keyCode === KeyCode.RIGHT && value > 0 && reverse) {
      newValue = allowHalf ? value - 0.5 : value - 1
    } else if(keyCode === KeyCode.LEFT && value < count && reverse) {
      newValue = allowHalf ? value + 0.5 : value + 1
    }
    
    setValue(newValue)
    onChange && onChange(newValue)
    onKeyDown && onKeyDown(e)
    e.preventDefault()
  }

  const stars = []
  for(let idx = 0; idx < count; idx += 1) {
    stars.push(
      <Star
        ref={el => el && (starsEle.current[idx] = el)}
        key={idx}
        index={idx}
        value={hoverValue ? hoverValue : value}
        count={count}
        disabled={disabled}
        allowHalf={allowHalf}
        onClick={onClick}
        focused={focused}
        character={character}
        prefixCls={`${prefixCls}-star`}
        onHover={onHover}
        characterRender={characterRender}
      />
    )
  }

  const disabledClass = disabled ? `${prefixCls}-disabled` : ''
  
  const rateClassName = classNames(prefixCls, disabledClass, {
    [`${prefixCls}-rtl`]: direction === 'rtl'
  })

	return <ul
    role="rc-rate"
    ref={ref}
    className={rateClassName}
    tabIndex={disabled ? -1 : tabIndex}
    style={style}
    onMouseLeave={disabled ? null : onMouseLeave}
    onFocus={disabled ? null : handleFocus}
    onBlur={disabled ? null : handleBlur}
    onKeyDown={disabled ? null : handleKeyDown}
  >
    {stars}
  </ul>
})