export const FundingTypeEnum = {
  ALL_OR_NOTHING: 'ALL_OR_NOTHING',
  KEEP_IT_ALL: 'KEEP_IT_ALL',
} as const;

export type FundingType = (typeof FundingTypeEnum)[keyof typeof FundingTypeEnum];
