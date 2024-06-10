import React, { memo, useCallback, useEffect, useState } from 'react';
import './user-details.component.scss';
import { Header, Icon, Label, Menu, Popup, Segment, Sidebar, SidebarPushable, SidebarPusher } from 'semantic-ui-react';
import { EarningsModel, UserDetailModel } from '@models/custom.models';
import { API } from '@services/api.service';
import { ElementComponent } from '@app/shared/component/element-loader.component';
import { groupBy, sumBy } from 'lodash';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { Money } from '@utilities/utils';
import classNames from 'classnames';
import { forkJoin } from 'rxjs';
import { UserSettingsComponent } from '@components/user-details/user-settings.component';
import { ApproxWinnings, Winnings } from '@components/user-details/user-details.ui.component';

class State {
  loading = true;
  list: { title: string; data: EarningsModel[] }[] = [];
  yearTotalWinnings: number = 0;
  yearTotalWithdrawals: number = 0;
  userDetails?: UserDetailModel[] | null;
  settingsOpen = false;
}

export const UserDetailsComponent = memo(() => {
  const { pathname } = useLocation();
  const emails = pathname.split('/').pop()?.replace('@', '');
  const [state, setState] = useState<State>(new State());

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));

    const emailArr = emails?.split(',');
    forkJoin([
      API.getBetSummary({ email: { $in: emailArr } }),
      API.getBonuses({ email: { $in: emailArr } }),
      API.getWithdrawals({ email: { $in: emailArr } }),
      API.getUser({ email: { $in: emailArr } }),
    ]).subscribe(([betSummaryList, bonusList, withdrawalList, userDetails]) => {
      const filteredBonusList = bonusList?.filter((item) => {
        return (
          item.TransactionStatus === 'Approved' &&
          item.TransactionType === 'Bonus' &&
          ['IMMEDIATE BONUS', 'Bonus'].includes(item.PaymentMethodInfo) &&
          item.Amount >= 10
        );
      });

      const filteredWithdrawalList = withdrawalList?.filter((item) => {
        return ['Approved', 'Pending', 'Sending to Processor', 'In Process'].includes(item.TransactionStatus);
      });

      const dataList = Array.from(Array(moment().isoWeeksInYear()).keys()).map((weekNumber) => {
        const year = moment().format('YYYY');
        const date = moment(year).add(weekNumber, 'weeks');
        const mon = moment(date).format('MMM');
        const monNumber = moment(date).format('M');
        const startDate = moment(date).startOf('week').add(1, 'day').toISOString();
        const endDate = moment(date).endOf('week').toISOString();

        const weekStart = new Date(startDate);
        const weekEnd = new Date(endDate);
        weekStart.setUTCHours(0, 0, 0, 0);
        weekEnd.setUTCHours(23, 59, 59, 999);

        const filteredBetSum = betSummaryList?.filter((item) => {
          return (
            item.startDate === weekStart.toISOString() &&
            item.endDate === weekEnd.toISOString() &&
            item.year === parseInt(year, 10)
          );
        });

        /*
         * get bonus
         * reverse to get the first occurrence not the latest
         * */
        const filteredBonus = emailArr
          ?.map((email) => {
            return filteredBonusList?.reverse().find((item) => {
              const TransactionDateTime = moment(item.TransactionDateTime).subtract(7, 'days');
              return (
                TransactionDateTime.isAfter(weekStart) && TransactionDateTime.isBefore(weekEnd) && item.email === email
              );
            });
          })
          .filter(Boolean);

        /*
         * get withdrawal
         * */
        const foundWithdrawal = filteredWithdrawalList?.find((item) => {
          const transactionDate = new Date(item.TransactionDateTime.split('T')[0]);
          transactionDate.setUTCHours(0, 0, 0, 0);
          const TransactionDateTime = moment(transactionDate.toISOString());

          return TransactionDateTime.isSameOrAfter(weekStart) && TransactionDateTime.isSameOrBefore(weekEnd);
        });

        let winnings = 0;

        const bonus = sumBy(filteredBetSum, (betSummary) => betSummary?.betSummary.bonus || 0);
        const totalStaked = sumBy(filteredBetSum, (betSummary) => betSummary?.betSummary.totalStaked || 0);
        const totalEarnings = sumBy(filteredBetSum, (betSummary) => betSummary?.betSummary.totalEarnings || 0);
        let approxWinnings = sumBy(filteredBetSum, (betSummary) => betSummary?.betSummary.winnings || 0);

        let playAbBonus = sumBy(filteredBonus, (foundBonus) => foundBonus?.Amount || 0);
        if (filteredBonus?.length !== emailArr?.length) {
          playAbBonus = bonus;
        } else {
          approxWinnings = 0;
        }

        if (filteredBonus?.length && filteredBetSum?.length) {
          winnings = playAbBonus + sumBy(filteredBetSum, (betSummary) => betSummary?.betSummary.totalEarnings || 0);
        }

        return {
          _id: `${mon}-${weekNumber}`,
          mon: monNumber + '-' + mon,
          year,
          startDate: weekStart.toISOString(),
          endDate: weekEnd.toISOString(),
          bonus: playAbBonus || bonus || 0,
          bonusDateTime: filteredBonus?.[0]?.TransactionDateTime,
          totalStaked,
          totalEarnings,
          winnings,
          approxWinnings,
          loading: false,
          fetch: 0,
          title: mon,
          withdrawal: foundWithdrawal,
        };
      });


      const groupedDataList = groupBy(dataList, 'mon');
      const defaultList = Object.keys(groupedDataList).map((key) => {
        return {
          title: key.split('-')[1],
          data: groupedDataList[key] as unknown as EarningsModel[],
        };
      });

      const yearTotalWinnings = sumBy(defaultList, (item) => {
        return sumBy(item.data, 'winnings');
      });

      const yearTotalWithdrawals = sumBy(defaultList, (item) => {
        return sumBy(item.data, 'withdrawal.Amount');
      });

      setState((prevState) => ({
        ...prevState,
        loading: false,
        yearTotalWinnings,
        yearTotalWithdrawals,
        list: defaultList,
        userDetails,
      }));
    });
  }, [emails]);

  const handleSettingsClick = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      settingsOpen: !state.settingsOpen,
    }));
  }, [state.settingsOpen]);

  const hasMultiUser = (emails?.split(',') || []).length > 1;

  return (
    <div
      className={classNames({
        'user-details-wrap': true,
        'multi-users': hasMultiUser,
      })}
    >
      <SidebarPushable>
        <Sidebar animation="overlay" onHide={handleSettingsClick} visible={state.settingsOpen} width={'wide'}>
          <UserSettingsComponent config={{ email: emails as string }} userDetails={state.userDetails?.[0]} />
        </Sidebar>

        <SidebarPusher>
          <Segment inverted>
            <div className="ttl">
              {!hasMultiUser ? (
                <div className={'icon-wrap'}>
                  <Icon onClick={handleSettingsClick} className={'pointer'} name={'bars'} size={'small'} />
                  <span>{emails}</span>
                </div>
              ) : (
                <span>Multi Users View</span>
              )}
              {!hasMultiUser && (
                <div className="row-wrap between">
                  <Popup
                    on="hover"
                    basic
                    trigger={<Icon name="info circle" size={'small'} className={'pointer'} />}
                    position="bottom right"
                    mouseLeaveDelay={60000}
                  >
                    <Menu vertical>
                      <Menu.Item header>
                        <Header as="h3">Year {moment().format('YYYY')} Details</Header>
                      </Menu.Item>
                      <Menu.Item>
                        <Header as="h4">Current Balance</Header>
                        <p>
                          <Label color="green">{Money(state.userDetails?.[0]?.data?.userSession?.cash || 0)}</Label>
                        </p>
                      </Menu.Item>
                      <Menu.Item>
                        <Header as="h4">Available Cashout</Header>
                        <p>
                          <Label color="orange">{Money(state.userDetails?.[0]?.data?.userSession?.cashout || 0)}</Label>
                        </p>
                      </Menu.Item>
                      <Menu.Item>
                        <Header as="h4">Total Earnings this year</Header>
                        <p>
                          <Label color="purple">{Money(state.yearTotalWinnings)}</Label>
                        </p>
                      </Menu.Item>
                      <Menu.Item>
                        <Header as="h4">Total Cashout this year</Header>
                        <p>
                          <Label color="red"> {Money(Math.abs(state.yearTotalWithdrawals || 0))}</Label>
                        </p>
                      </Menu.Item>
                    </Menu>
                  </Popup>
                </div>
              )}
            </div>
            <hr />
            <div className="user-details-content-wrap">
              {state.list.map((mon) => {
                const total = sumBy(mon.data, 'winnings');
                return (
                  <div key={mon.title} className="mon-wrap">
                    <div className="ttl-wrap">
                      <Header as="h3" inverted>
                        {mon.title}
                      </Header>
                      <Header
                        className={classNames({
                          winnings: total > 0,
                          losses: total < 0,
                        })}
                        as="h4"
                        inverted
                      >
                        {Money(total)}
                      </Header>
                    </div>
                    <hr />
                    <div className="week-wrap">
                      {mon.data.map((item) => {
                        return (
                          <div key={item._id} className="week">
                            {!!item.withdrawal && !hasMultiUser && (
                              <>
                                {[
                                  {
                                    Pending: item.withdrawal.TransactionStatus === 'Pending',
                                    Approved: item.withdrawal.TransactionStatus === 'Approved',
                                    Processing: ['In Process', 'Sending to Processor'].includes(
                                      item.withdrawal.TransactionStatus
                                    ),
                                  },
                                ].map((status, index) => (
                                  <Popup
                                    key={index}
                                    on="click"
                                    position="top center"
                                    trigger={
                                      <div
                                        className={classNames({
                                          'has-withdrawal': true,
                                          yellow: status.Pending,
                                          green: status.Approved,
                                          blue: status.Processing,
                                        })}
                                      />
                                    }
                                    flowing
                                  >
                                    <Popup.Header>
                                      Withdrawal (
                                      <span
                                        className={classNames({
                                          'yellow-light': status.Pending,
                                          'green-light': status.Approved,
                                          'blue-light': status.Processing,
                                        })}
                                      >
                                        {item.withdrawal?.TransactionStatus}
                                      </span>
                                      )
                                    </Popup.Header>
                                    <Popup.Content>
                                      {`${item.withdrawal?.PaymentMethodInfo} ${Money(item.withdrawal?.Amount || 0)}`}
                                    </Popup.Content>
                                  </Popup>
                                ))}
                              </>
                            )}

                            <div className="week-date">
                              <span>
                                {moment(item.startDate).utc().format('ddd DD')} -{' '}
                                {moment(item.endDate).utc().format('ddd DD')}
                              </span>
                            </div>
                            <div className="week-content">
                              <div className="row-wrap">
                                <span>Staked</span>
                                <span>{Money(item.totalStaked)}</span>
                              </div>
                              <div className="row-wrap">
                                <span>Earnings</span>
                                <span>{Money(item.totalEarnings)}</span>
                              </div>
                              <div className="row-wrap">
                                <span>Bonus</span>
                                <span>{Money(item.bonus)}</span>
                              </div>

                              {(item.approxWinnings > 0 && <ApproxWinnings earnings={item} />) || (
                                <Winnings earnings={item} />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <ElementComponent loading={state.loading} />
          </Segment>
        </SidebarPusher>
      </SidebarPushable>
    </div>
  );
});
