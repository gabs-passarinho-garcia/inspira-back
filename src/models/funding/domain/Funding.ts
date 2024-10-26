import { isBefore, parseISO } from 'date-fns';

import { FundingStatus, FundingStatusEnum, FundingType } from '@/shared/enum';

export type FundingEntryType = {
  id: string;
  amount: number;
  sponsorId: string;
  fundingId: string;
  anonymous: boolean;
};

type FundingProps = {
  id: string;
  title: string;
  description: string;
  goal: number;
  current: number;
  deadline: string;
  authorId: string;
  status: FundingStatus;
  type: FundingType;
  contentId: string;
  entries: FundingEntryType[];
};

export class Funding {
  private readonly _id: string;
  private _title: string;
  private _description: string;
  private _goal: number;
  private _current: number;
  private _deadline: Date;
  private readonly _authorId: string;
  private _status: FundingStatus;
  private _type: FundingType;
  private readonly _contentId: string;
  private readonly _entries: FundingEntryType[];

  private constructor(props: FundingProps) {
    this._id = props.id;
    this._title = props.title;
    this._description = props.description;
    this._goal = props.goal;
    this._current = props.current;
    this._deadline = parseISO(props.deadline);
    this._authorId = props.authorId;
    this._status = props.status;
    this._type = props.type;
    this._contentId = props.contentId;
    this._entries = props.entries;
  }

  // Getters

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get goal(): number {
    return this._goal;
  }

  get current(): number {
    return this._current;
  }

  get deadline(): Date {
    return this._deadline;
  }

  get authorId(): string {
    return this._authorId;
  }

  get status(): FundingStatus {
    return this._status;
  }

  get type(): FundingType {
    return this._type;
  }

  get contentId(): string {
    return this._contentId;
  }

  get entries(): FundingEntryType[] {
    return this._entries;
  }

  // Setters

  set title(title: string) {
    this._title = title;
  }

  set description(description: string) {
    this._description = description;
  }

  set goal(goal: number) {
    this._goal = goal;
  }

  set current(current: number) {
    this._current = current;
  }

  set deadline(deadline: Date) {
    this._deadline = deadline;
  }

  set status(status: FundingStatus) {
    this._status = status;
  }

  set type(type: FundingType) {
    this._type = type;
  }

  public static create(props: FundingProps): Funding {
    return new Funding(props);
  }

  public addFundingEntry(entry: FundingEntryType): void {
    this._entries.push(entry);
  }

  public removeFundingEntry(entryId: string): void {
    // entries cannot be replaced, so we need to remove without replacing entire array
    const index = this._entries.findIndex(entry => entry.id === entryId);

    if (index === -1) {
      return;
    }

    this._entries.splice(index, 1);
  }

  public updateFundingEntry(entry: FundingEntryType): void {
    const index = this._entries.findIndex(e => e.id === entry.id);

    if (index === -1) {
      return;
    }

    this._entries[index] = entry;
  }

  public isFundingCompleted(): boolean {
    return (
      this._status === FundingStatusEnum.SUCCESSFUL ||
      (this._status !== FundingStatusEnum.FAILED &&
        this._status !== FundingStatusEnum.CANCELED &&
        this._current >= this._goal)
    );
  }

  public isFundingFailed(): boolean {
    return this._status === FundingStatusEnum.FAILED;
  }

  public updateFundingStatus(): void {
    const now = new Date();

    if (
      this._status === FundingStatusEnum.CANCELED ||
      this._status === FundingStatusEnum.SUCCESSFUL ||
      this._status === FundingStatusEnum.FAILED
    ) {
      return;
    }

    if (!this.isFundingCompleted() && isBefore(this._deadline, now)) {
      this._status = FundingStatusEnum.FAILED;
      return;
    } else if (this.isFundingCompleted()) {
      this._status = FundingStatusEnum.SUCCESSFUL;
      return;
    }

    this._status = FundingStatusEnum.ONGOING;
  }

  public toJSON(): FundingProps {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      goal: this._goal,
      current: this._current,
      deadline: this._deadline.toISOString(),
      authorId: this._authorId,
      status: this._status,
      type: this._type,
      contentId: this._contentId,
      entries: this._entries,
    };
  }
}
