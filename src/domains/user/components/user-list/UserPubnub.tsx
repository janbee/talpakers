import * as React from 'react';
import { CSSProperties, FC, useEffect } from 'react';
import {
  Button,
  Checkbox,
  Dimmer,
  Form,
  FormField,
  Icon,
  Loader,
  Popup,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from 'semantic-ui-react';
import classNames from 'classnames';
import {
  ActiveCell,
  AppBuildCell,
  BetRestrictedCell,
  BetsCell,
  BonusCell,
  FreeBetCell,
  LastLoginCell,
  LastWeekWinningsCell,
  LifetimeLossCell,
  LottoTicketsCell,
  NextWithdrawalCell,
  StatusCell,
  TotalDepositsCell,
  VersionCell,
  WeeklyProgressCell,
  WeeklySummaryCell,
} from './UserTableCell';
import useUserList from '../../hooks/useUserList';
import { UserColumnSortModel, UserStatusModel } from '../../../../api/rxjs-client/models/custom.models';
import { $PN, PNChannel, toMoney, UserSupabaseModel } from '@PlayAb/shared';
import dayjs from 'dayjs';
import { usePubnub } from '../../../../common/utils/Pubnub';

const UserPubnubComponent: FC = () => {
  usePubnub(PNChannel.AccountCount, (msg) => {
    console.log('gaga---------------------------msg----------', msg);
  })

  return <div>asdasdas</div>
};
UserPubnubComponent.displayName = 'UserPubnubComponent';
export default UserPubnubComponent;
