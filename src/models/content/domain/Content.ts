import type { ContentCategory, ContentStatus } from '@/shared/enum';

type ContentProps = {
  id: string;
  title: string;
  place: string;
  description: string;
  authorId: string;
  category: ContentCategory;
  status: ContentStatus;
  fundingId?: string;
};

export class Content {
  private readonly _id: string;
  private _title: string;
  private _place: string;
  private _description: string;
  private readonly _authorId: string;
  private _category: ContentCategory;
  private _status: ContentStatus;
  private readonly _fundingId?: string;

  private constructor(props: ContentProps) {
    this._id = props.id;
    this._title = props.title;
    this._place = props.place;
    this._description = props.description;
    this._authorId = props.authorId;
    this._category = props.category;
    this._status = props.status;
    this._fundingId = props.fundingId;
  }

  // Getters

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get place(): string {
    return this._place;
  }

  get description(): string {
    return this._description;
  }

  get authorId(): string {
    return this._authorId;
  }

  get category(): ContentCategory {
    return this._category;
  }

  get fundingId(): unknown {
    return this._fundingId;
  }

  get status(): ContentStatus {
    return this._status;
  }

  // Setters

  set id(value: string) {
    throw new Error('Cannot set id');
  }

  set title(value: string) {
    this._title = value;
  }

  set place(value: string) {
    this._place = value;
  }

  set description(value: string) {
    this._description = value;
  }

  set category(value: ContentCategory) {
    this._category = value;
  }

  set status(value: ContentStatus) {
    this._status = value;
  }

  // Static factory
  public static create(props: ContentProps): Content {
    return new Content(props);
  }

  public toJSON(): ContentProps {
    return {
      id: this._id,
      title: this._title,
      place: this._place,
      description: this._description,
      authorId: this._authorId,
      category: this._category,
      status: this._status,
      fundingId: this._fundingId,
    };
  }
}
