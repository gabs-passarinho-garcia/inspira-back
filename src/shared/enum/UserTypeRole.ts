export const UserTypeRoleEnum = {
  CREATOR: 'CREATOR',
  SPONSOR: 'SPONSOR',
  CURATOR: 'CURATOR',
} as const;

export type UserTypeRole = (typeof UserTypeRoleEnum)[keyof typeof UserTypeRoleEnum];
