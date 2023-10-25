export enum AlertTypeModel {
  Success = "Success",
  Failed = "Failed",
  Warning = "Warning",
}

export interface AlertModel {
  message: string;
  type: AlertTypeModel;
  duration?: number;
}

export interface UserModel {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  data?: UserDataModel;
}

export interface TalpakSettingModel {
  bet: string;
  lowerBet: string;
  loopLimit: string;
}

export interface UserSessionModel {
  EXTERNAL_PLAYER_ID: string;
  ISID: string;
  TWO_FACTOR_AUTH: string;
}

export interface UserDataModel {
  isFreeAvailable?: boolean;
  serverTime?: string;
  userSession?: UserSessionModel;
  settings?: TalpakSettingModel;
  weekStatus?: {
    done: boolean;
    startDate: string;
    endDate: string;
  };
  version: string;
}

export interface EarningsModel {
  _id: string;
  year: number;
  startDate: string;
  endDate: string;
  bonus: number;
  totalStaked: number;
  winnings: number;
  totalEarnings: number;
  loading: boolean;
  fetch: number;
}

export interface SettledBetsModel {
  _id: number;
  email: string;
  team: string;
  year: number;
  details: Detail[];
  startDate: string;
  endDate: string;
}

export interface Detail {
  id: number;
  uid: number;
  u: string;
  c: string;
  bty: string;
  ty: string;
  stid: number;
  st: string;
  s: number;
  w: number;
  o: number;
  cc: string;
  lc: number;
  tot: string;
  ebsid: string;
  details: Details;
}

export interface Details {
  g: G;
  c: C[];
  i: I[];
  IsFromDb: boolean;
}

export interface G {
  id: number;
  c: string;
  t: string;
  tid: number;
  stid: number;
  st: string;
  mt: string;
  un: string;
  ufn: string;
  cc: string;
  p: boolean;
  i: string;
  cid: string;
  cun: string;
}

export interface C {
  ti: number;
  c: string;
  n: number;
  csid: number;
  cs: string;
  us: number;
  b: number;
  pw: number;
  w: number;
  t: number;
  o: number;
  so: string;
}

export interface I {
  itid: number;
  t: string;
  isid: number;
  s: string;
  sid: number;
  sn: string;
  cid: number;
  cn: string;
  tid: number;
  tn: string;
  tus: boolean;
  mid: number;
  sbv: string;
  d: string;
  ec: number;
  brid: string;
  mt: string;
  sc: string;
  ht: string;
  at: string;
  m: string;
  b: boolean;
  lc: boolean;
  otid: number;
  otn: string;
  ootn: string;
  oid: number;
  on: string;
  oon: string;
  o: number;
  iden: string;
  spec: string;
}

export interface BetSummaryModel {
  _id: string;
  year: number;
  startDate: string;
  endDate: string;
  email: string;
  betSummary: {
    totalStaked: string;
    totalWinnings: string;
    bonus: string;
    totalEarnings: string;
    winnings: string;
  };
}
