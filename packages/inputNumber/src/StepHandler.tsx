import React, { Component } from 'react'

const STEP_INTERVAL = 200;
const STEP_DELAY = 600;
export interface StepHandlerProps {
  prefixCls: string;
  onStep: (up: boolean) => void;
}


export default function StepHandler({
  prefixCls,
  onStep,
}:StepHandlerProps ) {

  const stepTimeoutRef = React.useRef<any>();
  const onStepRef = React.useRef<StepHandlerProps['onStep']>();
  onStepRef.current = onStep;

  const onStepMouseDown = (e: React.MouseEvent, up: boolean) => {
    e.preventDefault();
    onStepRef.current(up);

    function loopStep() {
      onStepRef.current(up);
      stepTimeoutRef.current = setTimeout(loopStep, STEP_INTERVAL);
    }

    stepTimeoutRef.current = setTimeout(loopStep, STEP_DELAY);
  };


  const onStopStep = () => {
    clearTimeout(stepTimeoutRef.current);
  };
  React.useEffect(() => onStopStep, []);
  const sharedHandlerProps = {
    unselectable: 'on' as const,
    role: 'button',
    onMouseUp: onStopStep,
    onMouseLeave: onStopStep
  };
  return (
    <div className={`${prefixCls}-handler-wrap`} > 
      <span {...sharedHandlerProps} onMouseDown={(e) => { 
        onStepMouseDown(e, true)
      }} className={`${prefixCls}-handler ${prefixCls}-handler-up`}>
        <span className={`${prefixCls}-handler-up-inner`}/>
      </span>
      <span {...sharedHandlerProps} onMouseDown={(e) => {
        onStepMouseDown(e, false)
       }} className={`${prefixCls}-handler ${prefixCls}-handler-down`}>
        <span className={`${prefixCls}-handler-up-down-inner`}/>
      </span>
    </div>
  )
}