import { tuple } from '../../../button/src/utils/type';

const ValidateStatuses = tuple('success', 'warning', 'error', 'validating', '');
export type ValidateStatus = typeof ValidateStatuses[number];
