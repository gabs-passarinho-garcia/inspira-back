export const ContentStatus = {
  WAITING_IA_APPROVAL: 'WAITING_IA_APPROVAL',
  WAITING_CURATOR_APPROVAL: 'WAITING_CURATOR_APPROVAL',
  IA_REJECTED: 'IA_REJECTED',
  CURATOR_REJECTED: 'CURATOR_REJECTED',
  WAITING_FUNDING: 'WAITING_FUNDING',
  FUNDED: 'FUNDED',
  PRODUCING: 'PRODUCING',
  PUBLISHED: 'PUBLISHED',
} as const;

export type ContentStatus = (typeof ContentStatus)[keyof typeof ContentStatus];