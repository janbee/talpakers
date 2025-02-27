import { WithdrawalModel } from '@PlayAb/shared';

export interface MoneyModel {
  currency?: 'USD' | 'CAD';
  minimumFractionDigits?: number;
}

export enum UserStatusModel {
  IsDone = 'Done',
  InProgress = 'InProgress',
  IsWaiting = 'Waiting',
}

export enum UserColumnSortModel {
  Earnings = 'earnings',
  OpenBets = 'openBets',
  NextWithdrawal = 'nextWithdrawal',
  Active = 'active',
}


export interface EarningsModel {
  _id: string;
  year: number;
  startDate: string;
  title: string;
  endDate: string;
  bonus: number;
  bonusDateTime: Date;
  totalStaked: number;
  winnings: number;
  approxWinnings: number;
  totalEarnings: number;
  loading: boolean;
  fetch: number;
  withdrawal?: WithdrawalModel;
  emails: string[];
}
