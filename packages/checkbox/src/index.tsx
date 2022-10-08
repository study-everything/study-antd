
import type * as React from 'react';
import InternalCheckbox from './Checkbox';
import Group from './Group';
import type { CheckboxProps } from './Checkbox';

export { CheckboxProps } from './Checkbox';

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>> {
  Group: typeof Group;
  __ANT_CHECKBOX: boolean;
}

const Checkbox = InternalCheckbox as CompoundedComponent
Checkbox.Group = Group;

export default Checkbox;
