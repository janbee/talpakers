export enum AlertTypeModel {
  Success = 'Success',
  Failed = 'Failed',
  Warning = 'Warning',
}

export interface AlertModel {
  message: string;
  type: AlertTypeModel;
  duration?: number;
}

export const NavigationScreens = {
  Main: 'main',
};

export const CodePush = {
  get DeploymentKey(): string {
    /* PROD */
    return '2QxeG9FmkCsEfAZ5OoGz5csOqsvWjcnbf_V_9';
  },
};

export enum Collection {
  LocalStorage = 'LocalStorage',
  Earnings = 'Earnings',
}

export interface EventPath {
  tag: string;
  description: string;
}

export interface Outcome {
  id: number;
  eventId: number;
  description: string;
  sportCode: string;
  eventPaths: EventPath[];
  eventStartDateTime: Date;
  eventDescription: string;
  marketDescription: string;
  periodDescription: string;
  bookId: number;
  placeTermId?: any;
  price: number;
  spread?: any;
  spread2?: any;
  priceFormatted: string;
  sp: boolean;
  settled: boolean;
  result: string;
  resultDescription: string;
}

export interface SubBet {
  id: number;
  subTypeDescription: string;
  outcomeIds: number[];
  status: string;
  statusDescription: string;
  messages?: any;
  statusDateTime: Date;
  totalPrice: number;
  totalPriceFormatted: string;
  potentialReturns: number;
  returns: number;
}

interface BetDetailModel {
  c: {
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
  }[];
  i: {
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
  }[];
}

export interface SettledBetModel {
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
  details: BetDetailModel;
}

export interface OpenBetModel {
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
  details: BetDetailModel;
}

export interface SofaData {
  spread: number;
  game: string;
  quarter: string;
  bet1Rate: number;
  bet2Rate: number;
  team1Score: number;
  team2Score: number;
  team1Name: string;
  team2Name: string;
  isSuspended: boolean;
  is1stQuarter: boolean;
  is2ndQuarter: boolean;
  is3rdQuarter: boolean;
  is4thQuarter: boolean;
  isOvertime: boolean;
  justBet: boolean;
  badBet: boolean;
  suspendedCount: number;
  isBet1Suspended: boolean;
  isBet2Suspended: boolean;
  time: string;
  lastUpdate: Date;
  team1Prediction: string;
  team2Prediction: string;
  team1PredictionVotes: string;
  team2PredictionVotes: string;
  needsUpdate: boolean;
}

export interface MyOpenBetData {
  myTeam1Status: 'isWinning' | 'isLosing';
  myTeam2Status: 'isWinning' | 'isLosing';
  myOpenBetTeam1?: OpenBetModel;
  myOpenBetTeam2?: OpenBetModel;
}

export interface MoneyLineModel {
  spread: number;
  game: string;
  quarter: string;
  bet1Rate: number;
  bet2Rate: number;
  team1Score: number;
  team2Score: number;
  team1Name: string;
  team2Name: string;
  isSuspended: boolean;
  is1stQuarter: boolean;
  is2ndQuarter: boolean;
  is3rdQuarter: boolean;
  is4thQuarter: boolean;
  isOvertime: boolean;
  justBet: boolean;
  badBet: boolean;
  suspendedCount: number;
  isBet1Suspended: boolean;
  isBet2Suspended: boolean;
  isFirstHalf: boolean;
  isSecondHalf: boolean;
  isNBA: boolean;
  myOpenBetData: MyOpenBetData;
  sofaData: SofaData;
  betMode: BetMode;
  sameGameBet: SameGameBet;
}

export interface RemainingWageringPerVertical {
  VerticalTypeID: string;
  IsSupported: string;
  RemainingWageringBets: string;
  RequiredWageringBets: string;
  ExternalWageringFactor: string;
}

export interface BonusModel_old {
  Status: string;
  PlayerBonusID: string;
  ActivationDateTime: Date;
  FreeGameUsageExpirationDateTime: string;
  PendingBonusExpirationDateTime: string;
  RequiredWageringBets: string;
  RemainingWageringBets: string;
  BonusRelatedBetsAmount: string;
  BonusRelatedWinsAmount: string;
  BonusType: string;
  IsFirstPhaseBonusAwarded: string;
  BonusAmount: string;
  BonusAmountType: string;
  FreeGameID: string;
  InitialFreeGameBetsCount: string;
  RemainingFreeGameBetsCount: string;
  WageringGameVerticalTypeIDList: string;
  BonusGameVerticalTypeID: string;
  UsedBonusAmount: string;
  WageringExternalProvider: string;
  WageringExternalSubProvider: string;
  RemainingWageringPerVerticals: RemainingWageringPerVertical[];
  TransferLevelsInfo: string;
  isReverseBonusAvailable: string;
  isDisplayBonusStatusDependedOnFreeGamesBonusesProcessingModel: string;
}

export interface WorkerInfoModel {
  name: string;
  details: string;
  hire: string;
  workWeeks: number;
  pronoun1: string;
  pronoun2: string;
  pronoun3: string;
}

export interface BetMode {
  foundGame: boolean;
  goTeam1?: boolean;
  goTeam2?: boolean;
  isNBA: boolean;
  isLowerBet: boolean;
  isSpread15NotNBA: boolean;
  isHockeySpread4Sofa: boolean;
  isHockeySpread3Sofa: boolean;
  isSpread14InHalfGame: boolean;
  isSpread20NoSofaNoNBA: boolean;
  isSpread20SofaNba: boolean;
}

export interface SameGameBet {
  sameBet: boolean;
  halfWinnings?: string;
  myBetWinnings?: string;
  isMyOpenBetTeam1?: boolean;
  isMyOpenBetTeam2?: boolean;
  currentReturn1?: number;
  currentReturn2?: number;
}

export enum ModalComponent {
  /*
   * value should be folder name
   * for later lazy dynamic loading
   * */
  UserInfo = 'user-info',
  Store = 'store',
  Earnings = 'earnings',
  Bonuses = 'bonuses',
  Withdrawals = 'withdrawals',
}

export interface WithdrawalModel {
  Amount: number;
  Balance: number;
  PaymentMethodInfo: string;
  ShoppingCartID: any;
  TransactionDateTime: string;
  TransactionID: string;
  TransactionStatus: string;
  TransactionType: string;
}

export interface BonusModel {
  email: string;
  TransactionDateTime: string;
  TransactionType: string;
  TransactionStatus: string;
  TransactionID: string;
  ShoppingCartID: any;
  Amount: number;
  Balance: number;
  PaymentMethodInfo: string;
}

export const WorkerInfo: { [key: string]: WorkerInfoModel } = {
  'com.playabapp.bets.001': {
    name: 'Matthew Maunders',
    details: 'Matthew Maunders loves building stuff. When not working, he is spending time with his family and kids.',
    hire: 'Hire Matt for price',
    workWeeks: 4,
    pronoun1: 'His',
    pronoun2: 'He',
    pronoun3: 'Him',
  },

  'com.playabapp.bets.002': {
    name: 'Bob Baker',
    details: 'Bob Baker is a sound engineer who enjoys playing piano and hanging with his parrot.',
    hire: 'Hire Bob for price',
    workWeeks: 2,
    pronoun1: 'His',
    pronoun2: 'He',
    pronoun3: 'Him',
  },
  /*'com.playabapp.bets.003': {},
  'com.playabapp.bets.004': {},
  'com.playabapp.bets.005': {},*/
  /*subs*/
  'com.playabapp.bets.101': {
    name: 'Lenny Lawrence',
    details: 'Lenny Lawrence is a star employee. She loves solving problems, likes music and exercise.',
    hire: 'Hire Lenny for price',
    workWeeks: 8,
    pronoun1: 'Her',
    pronoun2: 'She',
    pronoun3: 'Her',
  },
  /* 'com.playabapp.bets.102': {},
  'com.playabapp.bets.103': {},
  'com.playabapp.bets.104': {},
  'com.playabapp.bets.105': {},*/
};

export enum MongoConfig {
  AppId = 'pocketsportsapp-umuum',
  AppClient = 'mongodb-atlas',
  AppDB = 'DB',
}

export enum MongoCollection {
  User = 'user',
  SettledBets = 'settledBets',
  BetSummary = 'betSummary',
  Bonuses = 'bonuses',
  Withdrawals = 'withdrawals',
}

export interface UserSessionModel {
  ISID: string;
  EXTERNAL_PLAYER_ID: string;
  Email: string;
  NET_SessionId: string;
  id: string;
  token: string;
  ServerTime: string;
  cash: number;
  cashout: number;
  autoCashout?: {
    cashoutEmail: string;
    maintainCash: number;
    withdrawAllIfCashGTE: number;
  };
}

export interface UserDetailModel {
  _id: string;
  build: string;
  data: UserDataModel;
  createdAt?: Date;
  updatedAt?: Date | null;
  clearData?: boolean;
}

export interface TalpakSettingModel {
  bet: string;
  lowerBet: string;
  loopLimit: string;
  electronAutoLogin?: boolean;
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
    betSummary: BetSummaryModel;
    withdrawal: WithdrawalModel | null;
  };
  version?: string;
}

export const TalpakSettings: TalpakSettingModel = {
  bet: '25',
  lowerBet: '4',
  loopLimit: '500',
};

export interface EarningsModel {
  _id: string;
  year: number;
  startDate: string;
  title: string;
  endDate: string;
  bonus: number;
  totalStaked: number;
  winnings: number;
  approxWinnings: number;
  totalEarnings: number;
  loading: boolean;
  fetch: number;
  withdrawal?: WithdrawalModel;
}

export interface BetSummaryModel {
  _id: string;
  year: number;
  startDate: string;
  endDate: string;
  email: string;
  betSummary: {
    totalStaked: number;
    totalWinnings: number;
    bonus: number;
    totalEarnings: number;
    winnings: number;
    openBets: number;
    settledBets: number;
  };
}
