export const ContentCategoryEnum = {
  FILM: 'FILM',
  VIDEO: 'VIDEO',
  DESIGN: 'DESIGN',
  FASHION: 'FASHION',
  PHOTOGRAPHY: 'PHOTOGRAPHY',
  GAME: 'GAME',
  MUSIC: 'MUSIC',
  PODCAST: 'PODCAST',
  COMICS: 'COMICS',
  LITERATURE: 'LITERATURE',
  THEATER: 'THEATER',
  DANCE: 'DANCE',
  OTHER: 'OTHER',
} as const;

export type ContentCategory = (typeof ContentCategoryEnum)[keyof typeof ContentCategoryEnum];
