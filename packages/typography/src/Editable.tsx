import * as React from 'react';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import EnterOutlined from '@ant-design/icons/EnterOutlined';
import type {AutoSizeType} from 'rc-textarea/lib/ResizableTextArea';
import {Input} from 'antd';
import {cloneElement} from '@study/util';
import 'antd/es/input/style/index.css'

const {TextArea} = Input

interface EditableProps {
  prefixCls?: string;
  value: string;
  ['aria-label']?: string;
  onSave: (value: string) => void;
  onCancel: () => void;
  onEnd?: () => void;
  className?: string;
  style?: React.CSSProperties;
  direction?: 'ltr' | 'rtl' | undefined;
  maxLength?: number;
  autoSize?: boolean | AutoSizeType;
  enterIcon?: React.ReactNode;
  component?: string;
}

const Editable: React.FC<EditableProps> = ({
                                             prefixCls,
                                             'aria-label': ariaLabel,
                                             className,
                                             style,
                                             direction,
                                             maxLength,
                                             autoSize = true,
                                             value,
                                             onSave,
                                             onCancel,
                                             onEnd,
                                             component,
                                             enterIcon = <EnterOutlined/>,
                                           }) => {
  const ref = React.useRef<any>();

  const inComposition = React.useRef(false);
  const lastKeyCode = React.useRef<number>();

  const [current, setCurrent] = React.useState(value);

  React.useEffect(() => {
    setCurrent(value);
  }, [value]);

  React.useEffect(() => {
    if (ref.current && ref.current.resizableTextArea) {
      const {textArea} = ref.current.resizableTextArea;
      textArea.focus();
      const {length} = textArea.value;
      textArea.setSelectionRange(length, length);
    }
  }, []);

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({target}) => {
    setCurrent(target.value.replace(/[\n\r]/g, ''));
  };

  const onCompositionStart = () => {
    inComposition.current = true;
  };

  const onCompositionEnd = () => {
    inComposition.current = false;
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = ({keyCode}) => {
    // We don't record keyCode when IME is using
    if (inComposition.current) return;

    lastKeyCode.current = keyCode;
  };

  const confirmChange = () => {
    onSave(current.trim());
  };

  const onKeyUp: React.KeyboardEventHandler<HTMLTextAreaElement> = ({
                                                                      keyCode,
                                                                      ctrlKey,
                                                                      altKey,
                                                                      metaKey,
                                                                      shiftKey,
                                                                    }) => {
    // Check if it's a real key
    if (
      lastKeyCode.current === keyCode &&
      !inComposition.current &&
      !ctrlKey &&
      !altKey &&
      !metaKey &&
      !shiftKey
    ) {
      if (keyCode === KeyCode.ENTER) {
        confirmChange();
        onEnd?.();
      } else if (keyCode === KeyCode.ESC) {
        onCancel();
      }
    }
  };

  const onBlur: React.FocusEventHandler<HTMLTextAreaElement> = () => {
    confirmChange();
  };

  const textClassName = component ? `${prefixCls}-${component}` : '';

  const textAreaClassName = classNames(
    prefixCls,
    `${prefixCls}-edit-content`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    textClassName,
  );

  return (
    <div className={textAreaClassName} style={style}>
      <TextArea
        ref={ref as any}
        maxLength={maxLength}
        value={current}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
        onBlur={onBlur}
        aria-label={ariaLabel}
        rows={1}
        autoSize={autoSize}
      />
      {enterIcon !== null
        ? cloneElement(enterIcon, {className: `${prefixCls}-edit-content-confirm`})
        : null}
    </div>
  );
};

export default Editable;