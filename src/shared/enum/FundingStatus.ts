export const FundingStatusEnum = {
  PENDING: 'PENDING',
  ONGOING: 'ONGOING',
  SUCCESSFUL: 'SUCCESSFUL',
  FAILED: 'FAILED',
  CANCELED: 'CANCELED',
} as const;

export type FundingStatus = (typeof FundingStatusEnum)[keyof typeof FundingStatusEnum];
