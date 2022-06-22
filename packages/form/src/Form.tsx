
import React from 'react';
import type { FormContextProps } from './FormContext';
import { Store, FormInstance, FieldData, ValidateMessages, Callbacks } from './interface';
import useForm from './hooks/useForm';
import FieldContext, { HOOK_MARK } from './FieldContext';
import FormContext from './FormContext';
import { isSimilar } from './utils/valueUtil';
import { InternalFormInstance } from './interface';

type BaseFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'>;
type RenderProps = (values: Store, form: FormInstance) => JSX.Element | React.ReactNode;

export interface FormProps<Values = any> extends BaseFormProps {
	name?: string; // 表单名称
	initialValues?: Store; // 表单默认值，只有表单初始化的时候有效
	children?: RenderProps | React.ReactNode;
	component?: false | string | React.FC<any> | React.ReactNode; // 设置form渲染元素，如果为false则不创建节点
	fields?: FieldData[]; // 通过状态管理控制表单数据 非强需求不推荐使用
	validateMessages?: ValidateMessages; // 校验提示模板 {required: "'${name}' 是必选字段"}
	onValuesChange?: Callbacks<Values>['onValuesChange']; // 表单字段的值更新时触发的回调事件
	onFieldsChange?: Callbacks<Values>['onFieldsChange']; // 字段更新时触发回调事件
	onFinish?: Callbacks<Values>['onFinish']; // 提交表单且数据验证成功后回调事件
	onFinishFailed?: Callbacks<Values>['onFinishFailed']; // 提交表单且数据验证失败后的回调事件
	validateTrigger?: string | string[] | false; // 统一设置字段验证的触发时机
	preserve?: boolean; // 当字段被删除时保留字段值
	form?: FormInstance<Values>; // 通过Form.useForm()创建的form实例，不提供时会自动创建
}


export const Form: React.ForwardRefRenderFunction<FormInstance, FormProps> = React.forwardRef(({
	name,
	initialValues,
	fields,
	form,
	preserve,
	children,
	component: Component = 'form',
	validateMessages,
	validateTrigger = 'onChange',
	onValuesChange,
	onFieldsChange,
	onFinish,
	onFinishFailed,
	...restProps
}: FormProps, ref) => {
	const formContext: FormContextProps = React.useContext(FormContext);
	const [formInstance] = useForm(form);
	const {
		useSubscribe,
		setInitialValues,
		setCallbacks,
		setValidateMessages,
		setPreserve,
		destroyForm,
	} = (formInstance as InternalFormInstance).getInternalHooks(HOOK_MARK);
	React.useImperativeHandle(ref, () => formInstance);
	React.useEffect(() => {
		formContext.registerForm(name, formInstance);
		return () => {
			formContext.unregisterForm(name);
		}
	}, [formContext, formInstance, name]);
	// 校验信息保存到store
	setValidateMessages({
		...formContext.validateMessages,
		...validateMessages
	});
	// 保存回调
	setCallbacks({
		onValuesChange,
		onFieldsChange: (changeFields: FieldData[], ...rest) => {
			formContext.triggerFormChange(name, changeFields);
			if (onFieldsChange) {
				onFieldsChange(changeFields, ...rest);
			}
		},
		onFinish: (values: Store) => {
			formContext.triggerFormFinish(name, values);
			if (onFinish) {
				onFinish(values);
			}
		},
		onFinishFailed,
	});
	setPreserve(preserve); // 被删除时是否保留字段值
	const mountRef = React.useRef(null);
	setInitialValues(initialValues, !mountRef.current); // 设置默认值
	if (!mountRef.current) {
		mountRef.current = true;
	}
	React.useEffect(() => destroyForm, []);
	let childrenNode: React.ReactNode;
	const childrenProps = typeof children === 'function';
	if (childrenProps) {
		const values = formInstance.getFieldsValue(true);
		childrenNode = (children as RenderProps)(values, formInstance);
	} else {
		childrenNode = children;
	}
	useSubscribe(!childrenProps); // render props渲染子组件时  form内部不需要注册监听

	const prevFieldsRef = React.useRef<FieldData[] | undefined>();

	React.useEffect(() => {
		if (!isSimilar(prevFieldsRef.current || [], fields || [])) { // 如果有设置fields 通过useRef保留数据 避免额外的渲染
			formInstance.setFields(fields || []);
		}
		prevFieldsRef.current = fields;
	}, [fields, formInstance]);

	const formContextValue = React.useMemo(() => ({
		...(formInstance as InternalFormInstance),
		validateTrigger,
	}), [formInstance, validateTrigger]);
	const wrapperNode = (<FieldContext.Provider value={formContextValue}>{childrenNode}</FieldContext.Provider>);
	if (Component === false) {
		return wrapperNode;
	}
	// TODO
	return (<Component
		{...restProps}
		onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			event.stopPropagation();
			formInstance.submit();
		}}
		onReset={(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			formInstance.resetFields();
			restProps.onReset?.(event);
		}}
	>
		{wrapperNode}
	</Component>)
});
export default Form;
export { useForm };