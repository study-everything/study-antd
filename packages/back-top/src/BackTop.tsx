import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import VerticalAlignTopOutlined from '@ant-design/icons/VerticalAlignTopOutlined';

import { cloneElement, getScroll, scrollTo, throttleByAnimationFrame } from '@study/util';

export interface BackTopProps {
  visibilityHeight?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
  target?: () => HTMLElement | Window | Document;
  prefixCls?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  visible?: boolean; // Only for test. Don't use it.
}

export const BackTop: React.FC<BackTopProps> = (props) => {
  const { onClick, target, duration = 450, visibilityHeight = 400, prefixCls="ant-back-top", className, children } = props

  const [visible, setVisible] = useState(props.visible || false)

  const ref = useRef<HTMLDivElement>(null)
  const scrollEvent = useRef(null)

  const getDefaultTarget = () => {
    return ref.current && ref.current.ownerDocument ? ref.current.ownerDocument : window
  }

  const handleScroll = throttleByAnimationFrame(
    (e: React.UIEvent<HTMLElement> | {target: any}) => {
      console.log(111)
      const scrollTop = getScroll(e.target, true)
      setVisible(scrollTop > visibilityHeight)
    }
  )

  const bindScrollEvent = () => {
    const getTarget = target || getDefaultTarget
    const container = getTarget()
    const handler = (e: React.UIEvent<HTMLElement>) => {
      handleScroll(e)
    }
    container.addEventListener('scroll', handler)
    scrollEvent.current = {
      target: container,
      handler: handler,
    }
    // init check visible
    handleScroll({
      target: container,
    })
  }

  useEffect(() => {
    setVisible(props.visible || false)
  }, [props.visible])

  useEffect(() => {
    bindScrollEvent()
    return () => {
      if (scrollEvent.current) {
        scrollEvent.current?.target?.removeEventListener('scroll', scrollEvent.current.handler)
      }
    }
  }, [target])

  const scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    scrollTo(0, {
      getContainer: target || getDefaultTarget,
      duration,
    })
    if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  const renderChildren = ({
    prefixCls,
    rootPrefixCls,
  }: {
    prefixCls: string;
    rootPrefixCls: string;
  }) => {
    const defaultElement = (
      <div className={`${prefixCls}-content`}>
        <div className={`${prefixCls}-icon`}>
          <VerticalAlignTopOutlined />
        </div>
      </div>
    )
    return (
      <CSSMotion visible={visible} motionName={`${rootPrefixCls}-fade`}>
        {({className: motionClassName}) =>
          cloneElement(children || defaultElement, ({ className }) => ({
            className: classNames(motionClassName, className),
          }))
        }
      </CSSMotion>
    )
  }

  const classString = classNames(
    prefixCls,
    className,
  )

	return <div ref={ref} onClick={scrollToTop} className={classString} style={props.style}>
    {renderChildren({ prefixCls, rootPrefixCls: 'ant' })}
  </div>
}
