
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
}
