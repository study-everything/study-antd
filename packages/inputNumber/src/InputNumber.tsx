
import React from 'react'
import classNames from 'classnames';
import { composeRef } from 'rc-util/lib/ref';

import type {
  DecimalClass} from "./utils";
import getMiniDecimal, {
  toFixed,
} from "./utils";
import { getNumberPrecision, num2str, trimNumber } from './utils/numberUtil';

import StepHandler from './StepHandler'

type ValueType = string | number;

export interface InputNumberProps<T extends ValueType = ValueType>
	extends Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'value' | 'defaultValue' | 'onInput' | 'onChange'
	> {
	/** value will show as string */
	stringMode?: boolean;

	defaultValue?: T;
	value?: T;

	prefixCls?: string;
	className?: string;
	style?: React.CSSProperties;
	min?: T;
	max?: T;
	step?: ValueType;
	tabIndex?: number;
	controls?: boolean;

	// Customize handler node
	upHandler?: React.ReactNode;
	downHandler?: React.ReactNode;
	keyboard?: boolean;

	/** Parse display value to validate number */
	parser?: (displayValue: string | undefined) => T;
	/** Transform `value` to display value show in input */
	formatter?: (value: T | undefined, info: { userTyping: boolean; input: string }) => string;
	/** Syntactic sugar of `formatter`. Config precision of display. */
	precision?: number;

	onInput?: (text: string) => void;
	onChange?: (value: T) => void;
	onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;

	onStep?: (value: T, info: { offset: ValueType; type: 'up' | 'down' }) => void;


}

const getDecimalIfValidate = (value: ValueType, precision: number | undefined, isMax?: boolean) => {
  const decimal = getMiniDecimal(value);

  if (decimal.isInvalidate()) {
    return null;
  }

  if (precision === undefined) {
    return decimal;
  }

  const {
    negative,
    // integerStr,
    // decimalStr,
    // negativeStr
  } = trimNumber(decimal.toString());
  // const unSignedNumberStr = integerStr + '.' + decimalStr;

  if (isMax && !negative || !isMax && negative) {
    // return getMiniDecimal(negativeStr + roundDownUnsignedDecimal(unSignedNumberStr, precision));
  } 
    // return getMiniDecimal(negativeStr + roundUpUnsignedDecimal(unSignedNumberStr, precision));
  
};


export const InputNumber = React.forwardRef(
	(props: InputNumberProps, ref: React.Ref<HTMLInputElement>) => {
		const {
			prefixCls = 'ant-input-number',
			className,
			style,
			min,
			max,
			step = 1,
			defaultValue,
			value,
			disabled,
			controls = true,
			parser,
			formatter,
			precision, // 数值精度
			// onChange,
			// upHandler,
			...inputProps
		} = props;
		// TODO
		const inputClassName = `${prefixCls}-input`;
		const inputRef = React.useRef<HTMLInputElement>(null);
		const [focus, setFocus] = React.useState(false);
		const compositionRef = React.useRef(false);
		const userTypingRef = React.useRef(false);

		const [decimalValue, setDecimalValue] = React.useState(() => getMiniDecimal(value || defaultValue));
		const maxDecimal = React.useMemo(() => getDecimalIfValidate(max, precision, true), [max, precision]);
		const minDecimal = React.useMemo(() => getDecimalIfValidate(min, precision, false), [min, precision]);

		function setUncontrolledDecimalValue(newDecimal: DecimalClass) {
			if (value === undefined) {
				setDecimalValue(newDecimal);
			}
		}
		const mergedParser = React.useCallback((num: string | number) => {
			const numStr = String(num);

			if (parser) {
				return parser(numStr);
			}

			const parsedStr = numStr;


			return parsedStr.replace(/[^\w.-]+/g, '');
		}, [parser]);

		const getPrecision = React.useCallback((numStr: string, userTyping: boolean)  => {
			if (userTyping) {
				return undefined;
			}

			if (precision >= 0) {
				return precision;
			}

			return Math.max(getNumberPrecision(numStr), getNumberPrecision(step));
		}, [precision, step]);

		const inputValueRef = React.useRef<string | number>('');
		const mergedFormatter = React.useCallback((number: string, userTyping: boolean) => {
			if (formatter) {
				return formatter(number, {
					userTyping,
					input: String(inputValueRef.current)
				});
			}

			const str = typeof number === 'number' ? num2str(number) : number;

			if (!userTyping) {
				// const mergedPrecision = getPrecision(str, userTyping);

				// if (validateNumber(str) && (decimalSeparator || mergedPrecision >= 0)) {
				//   const separatorStr = decimalSeparator || '.';
				//   str = toFixed(str, separatorStr, mergedPrecision);
				// }
			}

			return str;
		}, [formatter]);

		const [inputValue, setInternalInputValue] = React.useState<string | number>(() => {
			const initValue = defaultValue || value;

			if (decimalValue.isInvalidate() && ['string', 'number'].includes(typeof initValue)) {
				return Number.isNaN(initValue) ? '' : initValue;
			}

			return mergedFormatter(decimalValue.toString(), false);
		});

		const getRangeValue = (target: DecimalClass) => {
			if (maxDecimal && !target.lessEquals(maxDecimal)) {
				return maxDecimal;
			}

			if (minDecimal && !minDecimal.lessEquals(target)) {
				return minDecimal;
			}

			return null;
		};


		const isInRange = (target: DecimalClass) => !getRangeValue(target);



		function setInputValue(newValue: DecimalClass, userTyping: boolean) {
			setInternalInputValue(mergedFormatter(newValue.isInvalidate() ? newValue.toString(false) : newValue.toString(!userTyping), userTyping));
		}

		const triggerValueUpdate = (newValue: DecimalClass, userTyping: boolean): DecimalClass => {
			let updateValue = newValue;
			let isRangeValidate = isInRange(updateValue) || updateValue.isEmpty();

			if (!updateValue.isEmpty() && !userTyping) {
				updateValue = getRangeValue(updateValue) || updateValue;
				isRangeValidate = true;
			}

			// if (!readOnly && !disabled && isRangeValidate) {
			if (!disabled && isRangeValidate) {
				const numStr = updateValue.toString();
				const mergedPrecision = getPrecision(numStr, userTyping);

				if (mergedPrecision >= 0) {
					updateValue = getMiniDecimal(toFixed(numStr, '.', mergedPrecision));
				}

				if (!updateValue.equals(decimalValue)) {
					setUncontrolledDecimalValue(updateValue);
					// onChange?.(updateValue.isEmpty() ? null : getDecimalValue(stringMode, updateValue));

					if (value === undefined) {
						setInputValue(updateValue, userTyping);
					}
				}

				return updateValue;
			}

			return decimalValue;
		};

		const collectInputValue = (inputStr:string) => {
			// recordCursor();
			setInternalInputValue(inputStr);

			if (!compositionRef.current) {
				const finalValue = mergedParser(inputStr);
				const finalDecimal = getMiniDecimal(finalValue);

				if (!finalDecimal.isNaN()) {
					triggerValueUpdate(finalDecimal, true);
				}
			}
		}

		const onInternalInput: React.ChangeEventHandler<HTMLInputElement> = e => {
			collectInputValue(e.target.value);
		};

		const flushInputValue = userTyping => {
			const v = mergedParser(inputValue)

			const parsedValue = getMiniDecimal(v);
			let formatValue = parsedValue;

			if (!parsedValue.isNaN()) {
				formatValue = triggerValueUpdate(parsedValue, userTyping);
			} else {
				formatValue = decimalValue;
			}

			if (value !== undefined) {
				setInputValue(decimalValue, false);
			} else if (!formatValue.isNaN()) {
				setInputValue(formatValue, false);
			}
		};

		const onInternalStep = (up: boolean) => {
			// if (up) {
			//   return;
			// }
			userTypingRef.current = false;
			let stepDecimal = getMiniDecimal(step);

			if (!up) {
				stepDecimal = stepDecimal.negate();
			}

			const target = (decimalValue || getMiniDecimal(0)).add(stepDecimal.toString());
			const updatedValue = triggerValueUpdate(target, false);
			// onStep?.(getDecimalValue(stringMode, updatedValue), {
			//   offset: step,
			//   type: up ? 'up' : 'down'
			// });
			inputRef.current?.focus();
		};


		const onBlur = () => {
			// 失去焦点后处理输入的是数字以外的东西
			flushInputValue(false);
			setFocus(false);
			// userTypingRef.current = false;
		};
		return (
			<div
				className={classNames(prefixCls, className, {
					[`${prefixCls}-focused`]: focus,
				})}
				style={style}
				onFocus={() => {
					setFocus(true);
				}}
				onBlur={onBlur}
			>
				{
					controls &&
					<StepHandler
						prefixCls={prefixCls}
						onStep={onInternalStep}
					/>
				}

				<div className={`${inputClassName}-wrap`}>
					<input
						autoComplete="off"
						role="spinbutton"
						aria-valuemin={min as any}
            aria-valuemax={max as any}
						step={step}
						{...inputProps}
						ref={composeRef(inputRef, ref)}
						className={inputClassName}
						value={inputValue}
						onChange={onInternalInput}
					/>
				</div>

			</div>)
	},
) as (<T extends ValueType = ValueType>(
	props: React.PropsWithChildren<InputNumberProps<T>> & {
		ref?: React.Ref<HTMLInputElement>;
	},
) => React.ReactElement) & { displayName?: string };

InputNumber.displayName = 'InputNumber';