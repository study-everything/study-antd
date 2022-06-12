import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { AvatarProps } from './Avatar';
import InternalAvatar from './Avatar';
import Group from './Group';

// eslint-disable-next-line import/no-unresolved
export type { AvatarProps } from './avatar';

interface CompoundedComponent
  extends ForwardRefExoticComponent<AvatarProps & RefAttributes<HTMLElement>> {
  Group: typeof Group;
}

const Avatar = InternalAvatar as CompoundedComponent;
Avatar.Group = Group;

export { Group };
export default Avatar;
