import { values } from 'lodash';
import React from 'react';
import { FieldData, FormInstance, Store, ValidateMessages } from './interface';

export type Forms = Record<string, FormInstance>;
export interface FormChangeInfo {
  changedFields: FieldData[];
  forms: Forms;
}
export interface FormFinishInfo {
  values: Store;
  forms: Forms;
}
export interface FormProviderProps {
  children?: React.ReactNode;
  validateMessages?: ValidateMessages;
  onFormChange?: (name: string, info: FormChangeInfo) => void;
  onFormFinish?: (name: string, info: FormFinishInfo) => void;
}
export interface FormContextProps extends FormProviderProps {
  triggerFormChange: (name: string, changedFields: FieldData[]) => void;
  triggerFormFinish: (name: string, values: Store) => void;
  registerForm: (name: string, form: FormInstance) => void;
  unregisterForm: (name: string) => void;
}
const FormContext = React.createContext<FormContextProps>({
  triggerFormChange: () => { },
  triggerFormFinish: () => { },
  registerForm: () => { },
  unregisterForm: () => { },
});
const FormProvider: React.FunctionComponent<FormProviderProps> = ({
  children,
  onFormChange,
  onFormFinish,
}) => {
  const formContext = React.useContext(FormContext);
  const formRef = React.useRef<Forms>({});
  return (<FormContext.Provider
    value={{
      ...formContext,
      validateMessages: {
        ...formContext.validateMessages,
      },
      triggerFormChange: (name, changedFields) => {
        if (onFormChange) {
          onFormChange(name, {
            changedFields,
            forms: formRef.current,
          });
          formContext.triggerFormChange(name, changedFields);
        }
      },
      triggerFormFinish: (name, values) => {
        if (onFormFinish) {
          onFormFinish(name, {
            values,
            forms: formRef.current,
          });
          formContext.triggerFormFinish(name, values);
        }
      },
      registerForm: (name, form) => {
        if (name) {
          formRef.current = {
            ...formRef.current,
            [name]: form,
          }
          formContext.registerForm(name, form);
        }
      },
      unregisterForm(name) {
        const newForms = formRef.current;
        delete newForms[name];
        formRef.current = newForms;
        formContext.unregisterForm(name);
      }
    }}
  >
    {children}
  </FormContext.Provider>);
};

export default FormContext;
export { FormProvider };