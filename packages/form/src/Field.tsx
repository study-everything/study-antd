import toChildrenArray from 'rc-util/lib/Children/toArray';
import warning from 'rc-util/lib/warning';
import * as React from 'react';

import type {
  FieldEntity,
  FormInstance,
  InternalNamePath,
  Meta,
  NamePath,
  NotifyInfo,
  Rule,
  Store,
  ValidateOptions,
  InternalFormInstance,
  RuleObject,
  StoreValue,
  EventArgs,
  RuleError,
} from './interface';

import FieldContext, { HOOK_MARK } from './FieldContext';
import { toArray } from './utils/typeUtil';
import { validateRules } from './utils/validateUtil';
import {
  containsNamePath,
  defaultGetValueFromEvent,
  getNamePath,
  getValue,
} from './utils/valueUtil';

const EMPTY_ERRORS: any[] = [];
export type ShouldUpdate<Values = any> = | boolean | ((prevValues: Values, nextValues: Values, info: { source?: string }) => boolean);

function requireUpdate(
  shouldUpdate: ShouldUpdate,
  prev: StoreValue,
  next: StoreValue,
  prevValue: StoreValue,
  nextValue: StoreValue,
  info: NotifyInfo,): boolean {
  if (typeof shouldUpdate === 'function') {
    return shouldUpdate(prev, next, info.source ?? {});
  }
  return prevValue !== nextValue;
}

interface ChildProps {
  [name: string]: any;
}
export interface InternalFieldProps<Values = any> {
  children?:
  | React.ReactElement
  | ((control: ChildProps, meta: Meta, form: FormInstance<Values>) => React.ReactNode);
  dependencies?: NamePath[];
  getValueFromEvent?: (...args: EventArgs) => StoreValue;
  name?: InternalNamePath;
  normalize?: (value: StoreValue, prevValue: StoreValue, allValues: Store) => StoreValue;
  rules?: Rule[];
  shouldUpdate?: ShouldUpdate<Values>;
  trigger?: string;
  validateTrigger?: string | string[] | false;
  validateFirst?: boolean | 'parallel';
  valuePropName?: string;
  getValueProps?: (value: StoreValue) => Record<string, unknown>;
  messageVariables?: Record<string, string>;
  initialValue?: any;
  onReset?: () => void;
  onMetaChange?: (meta: Meta & { destroy?: boolean }) => void;
  preserve?: boolean;

  isListField?: boolean;

  isList?: boolean;

  fieldContext?: InternalFormInstance;
}
export interface FieldProps<Values = any>
  extends Omit<InternalFieldProps<Values>, 'name' | 'fieldContext'> {
  name?: NamePath;
}

export interface FieldState {
  resetCount: number;
}

class Field extends React.Component<InternalFieldProps, FieldState> implements FieldEntity {
  public static contextType = FieldContext;
  public static defaultProps = {
    trigger: 'onChange',
    valuePropName: 'value',
  };
  public state = {
    resetCount: 0,
  };
  private cancelRegisterFunc: (
    isListField?: boolean,
    preserve?: boolean,
    namePath?: InternalNamePath,
  ) => void | null = null;

  private mounted = false;

  private touched: boolean = false;
  private dirty: boolean = false; // 

  private validatePromise: Promise<string[]> | null = null;
  private prevValidating: boolean;

  private errors: string[] = EMPTY_ERRORS;
  private warnings: string[] = EMPTY_ERRORS;

  constructor(props: InternalFieldProps) {
    super(props);
    if (props.fieldContext) {
      const { getInternalHooks }: InternalFormInstance = props.fieldContext;
      const { initEntityValue } = getInternalHooks(HOOK_MARK);
      initEntityValue(this);
    }
  }
  public componentDidMount() {
    const { shouldUpdate, fieldContext } = this.props;
    this.mounted = true;
    if (fieldContext) {
      const { getInternalHooks }: InternalFormInstance = fieldContext;
      const { registerField } = getInternalHooks(HOOK_MARK);
      this.cancelRegisterFunc = registerField(this);
    }
    if (shouldUpdate === true) {
      this.reRender();
    }
  }
  public componentWillUnmount() {
    this.cancelRegister();
  }
  public cancelRegister = () => {
    const { preserve, isListField, name } = this.props;
    if (this.cancelRegisterFunc) {
      this.cancelRegisterFunc(isListField, preserve, getNamePath(name));
    }
    this.cancelRegisterFunc = null;
  };
  public getNamePath = (): InternalNamePath => {
    const { name, fieldContext } = this.props;
    const { prefixName = [] }: InternalFormInstance = fieldContext;
    return name !== undefined ? [...prefixName, ...name] : []
  };
  public getRules = (): RuleObject[] => {
    const { rules = [], fieldContext } = this.props;

    return rules.map((rule: Rule): RuleObject => {
      if (typeof rule === 'function') {
        return rule(fieldContext);
      }
      return rule;
    });
  };
  public reRender() {
    if (!this.mounted) return;
    this.forceUpdate();
  };
  public refresh = () => {
    if (!this.mounted) return;
    this.setState(({ resetCount }) => ({
      resetCount: resetCount + 1,
    }));
  };
  public triggerMetaEvent = (destroy?: boolean) => {
    const { onMetaChange } = this.props;
    onMetaChange?.({ ...this.getMeta(), destroy });
  };
  public onStoreChange: FieldEntity['onStoreChange'] = (prevStore, namePathList, info) => {
    const { shouldUpdate, dependencies = [], onReset } = this.props;
    const { store } = info;
    const namePath = this.getNamePath();
    const prevValue = this.getValue(prevStore);
    const curValue = this.getValue(store);

    const namePathMatch = namePathList && containsNamePath(namePathList, namePath);

    if (info.type === 'valueUpdate' && info.source === 'external' && prevValue !== curValue) {
      this.touched = true;
      this.dirty = true;
      this.validatePromise = null;
      this.errors = EMPTY_ERRORS;
      this.warnings = EMPTY_ERRORS;
      this.triggerMetaEvent();
    }

    switch (info.type) {
      case 'reset':
        if (!namePathList || namePathMatch) {
          this.touched = false;
          this.dirty = false;
          this.validatePromise = null;
          this.errors = EMPTY_ERRORS;
          this.warnings = EMPTY_ERRORS;
          this.triggerMetaEvent();

          onReset?.();

          this.refresh();
          return;
        }
        break;

      case 'remove': {
        if (shouldUpdate) {
          this.reRender();
          return;
        }
        break;
      }

      case 'setField': {
        if (namePathMatch) {
          const { data } = info;

          if ('touched' in data) {
            this.touched = data.touched;
          }
          if ('validating' in data && !('originRCField' in data)) {
            this.validatePromise = data.validating ? Promise.resolve([]) : null;
          }
          if ('errors' in data) {
            this.errors = data.errors || EMPTY_ERRORS;
          }
          if ('warnings' in data) {
            this.warnings = data.warnings || EMPTY_ERRORS;
          }
          this.dirty = true;

          this.triggerMetaEvent();

          this.reRender();
          return;
        }

        if (
          shouldUpdate &&
          !namePath.length &&
          requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info)
        ) {
          this.reRender();
          return;
        }
        break;
      }

      case 'dependenciesUpdate': {
        const dependencyList = dependencies.map(getNamePath);
        if (dependencyList.some(dependency => containsNamePath(info.relatedFields, dependency))) {
          this.reRender();
          return;
        }
        break;
      }

      default:
        if (
          namePathMatch ||
          ((!dependencies.length || namePath.length || shouldUpdate) &&
            requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info))
        ) {
          this.reRender();
          return;
        }
        break;
    }

    if (shouldUpdate === true) {
      this.reRender();
    }
  };
  public validateRules = (options?: ValidateOptions): Promise<RuleError[]> => {

    const namePath = this.getNamePath();
    const currentValue = this.getValue();

    const rootPromise = Promise.resolve().then(() => {
      if (!this.mounted) {
        return [];
      }

      const { validateFirst = false, messageVariables } = this.props;
      const { triggerName } = (options || {}) as ValidateOptions;

      let filteredRules = this.getRules();
      if (triggerName) {
        filteredRules = filteredRules.filter((rule: RuleObject) => {
          const { validateTrigger } = rule;
          if (!validateTrigger) {
            return true;
          }
          const triggerList = toArray(validateTrigger);
          return triggerList.includes(triggerName);
        });
      }

      const promise = validateRules(
        namePath,
        currentValue,
        filteredRules,
        options,
        validateFirst,
        messageVariables,
      );

      promise
        .catch(e => e)
        .then((ruleErrors: RuleError[] = EMPTY_ERRORS) => {
          if (this.validatePromise === rootPromise) {
            this.validatePromise = null;

            // Get errors & warnings
            const nextErrors: string[] = [];
            const nextWarnings: string[] = [];
            ruleErrors.forEach(({ rule: { warningOnly }, errors = EMPTY_ERRORS }) => {
              if (warningOnly) {
                nextWarnings.push(...errors);
              } else {
                nextErrors.push(...errors);
              }
            });

            this.errors = nextErrors;
            this.warnings = nextWarnings;
            this.triggerMetaEvent();

            this.reRender();
          }
        });

      return promise;
    });

    this.validatePromise = rootPromise;
    this.dirty = true;
    this.errors = EMPTY_ERRORS;
    this.warnings = EMPTY_ERRORS;
    this.triggerMetaEvent();

    this.reRender();

    return rootPromise;
  }
  public getValue = (store?: Store) => {
    const { getFieldsValue }: FormInstance = this.props.fieldContext;
    const namePath = this.getNamePath();
    return getValue(store || getFieldsValue(true), namePath);
  };
  public isFieldValidating = () => !!this.validatePromise;

  public isFieldTouched = () => this.touched;

  public isFieldDirty = () => {
    if (this.dirty || this.props.initialValue !== undefined) {
      return true;
    }

    const { fieldContext } = this.props;
    const { getInitialValue } = fieldContext.getInternalHooks(HOOK_MARK);
    if (getInitialValue(this.getNamePath()) !== undefined) {
      return true;
    }

    return false;
  };

  public getErrors = () => this.errors;

  public getWarnings = () => this.warnings;

  public isListField = () => this.props.isListField;

  public isList = () => this.props.isList;

  public isPreserve = () => this.props.preserve;
  public getMeta = (): Meta => {
    this.prevValidating = this.isFieldValidating();

    const meta: Meta = {
      touched: this.isFieldTouched(),
      validating: this.prevValidating,
      errors: this.errors,
      warnings: this.warnings,
      name: this.getNamePath(),
    };

    return meta;
  };
  public getOnlyChild = (
    children:
      | React.ReactNode
      | ((control: ChildProps, meta: Meta, context: FormInstance) => React.ReactNode),
  ): { child: React.ReactNode | null; isFunction: boolean } => {
    if (typeof children === 'function') {
      const meta = this.getMeta();

      return {
        ...this.getOnlyChild(children(this.getControlled(), meta, this.props.fieldContext)),
        isFunction: true,
      };
    }

    const childList = toChildrenArray(children);
    if (childList.length !== 1 || !React.isValidElement(childList[0])) {
      return { child: childList, isFunction: false };
    }

    return { child: childList[0], isFunction: false };
  };
  public getControlled = (childProps: ChildProps = {}) => {
    const {
      trigger,
      validateTrigger,
      getValueFromEvent,
      normalize,
      valuePropName,
      getValueProps,
      fieldContext,
    } = this.props;

    const mergedValidateTrigger =
      validateTrigger !== undefined ? validateTrigger : fieldContext.validateTrigger;

    const namePath = this.getNamePath();
    const { getInternalHooks, getFieldsValue }: InternalFormInstance = fieldContext;
    const { dispatch } = getInternalHooks(HOOK_MARK);
    const value = this.getValue();
    const mergedGetValueProps = getValueProps || ((val: StoreValue) => ({ [valuePropName]: val }));

    const originTriggerFunc: any = childProps[trigger];

    const control = {
      ...childProps,
      ...mergedGetValueProps(value),
    };

    control[trigger] = (...args: EventArgs) => {
      this.touched = true;
      this.dirty = true;

      this.triggerMetaEvent();

      let newValue: StoreValue;
      if (getValueFromEvent) {
        newValue = getValueFromEvent(...args);
      } else {
        newValue = defaultGetValueFromEvent(valuePropName, ...args);
      }

      if (normalize) {
        newValue = normalize(newValue, value, getFieldsValue(true));
      }

      dispatch({
        type: 'updateValue',
        namePath,
        value: newValue,
      });

      if (originTriggerFunc) {
        originTriggerFunc(...args);
      }
    };

    const validateTriggerList: string[] = toArray(mergedValidateTrigger || []);

    validateTriggerList.forEach((triggerName: string) => {
      const originTrigger = control[triggerName];
      control[triggerName] = (...args: EventArgs) => {
        if (originTrigger) {
          originTrigger(...args);
        }

        const { rules } = this.props;
        if (rules && rules.length) {
          dispatch({
            type: 'validateField',
            namePath,
            triggerName,
          });
        }
      };
    });

    return control;
  };
  public render() {
    const { resetCount } = this.state;
    const { children } = this.props;
    const { child, isFunction } = this.getOnlyChild(children);
    let returnChildNode: React.ReactNode;
    if (isFunction) {
      returnChildNode = child;
    } else if (React.isValidElement(child)) {
      returnChildNode = React.cloneElement(child as React.ReactElement, this.getControlled(child.props));
    } else {
      warning(!child, '`children` of Field is not validate ReactElement.');
      returnChildNode = child;
    }
    return <React.Fragment key={resetCount}>{returnChildNode}</React.Fragment>
  }
}
function WrapperField<Values = any>({ name, ...restProps }: FieldProps<Values>) {
  const fieldContext = React.useContext(FieldContext);
  const namePath = name !== undefined ? getNamePath(name) : undefined;
  let key: string = 'keep';
  if (!restProps.isListField) {
    key = `_${(namePath || []).join('_')}`;
  }
  return <Field key={key} name={namePath} {...restProps} fieldContext={fieldContext}></Field>
}
export default WrapperField;