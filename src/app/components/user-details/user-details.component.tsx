import React, { memo, useEffect, useState } from "react";
import "./user-details.component.scss";
import { Header, Icon, Label, Menu, Popup, Segment } from "semantic-ui-react";
import { EarningsModel, UserModel } from "@models/custom.models";
import { API } from "@services/api.service";
import { ElementComponent } from "@app/shared/component/element-loader.component";
import { groupBy, sumBy } from "lodash";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { Money } from "@utilities/utils";
import classNames from "classnames";
import { forkJoin } from "rxjs";

class State {
  loading = true;
  list: { title: string; data: EarningsModel[] }[] = [];
  yearTotalWinnings: number = 0;
  yearTotalWithdrawals: number = 0;
  userDetails?: UserModel[] | null;
}

export const UserDetailsComponent = memo(() => {
  const { pathname } = useLocation();
  const email = pathname.split("/").pop()?.replace("@", "");
  const [state, setState] = useState<State>(new State());

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));

    forkJoin([
      API.getBetSummary({ email }),
      API.getBonuses({ email }),
      API.getWithdrawals({ email }),
      API.getUser({ email }),
    ]).subscribe(([betSummaryList, bonusList, withdrawalList, userDetails]) => {
      const filteredBonusList = bonusList?.filter((item) => {
        return (
          item.TransactionStatus === "Approved" &&
          item.TransactionType === "Bonus" &&
          item.PaymentMethodInfo === "Bonus"
        );
      });
      const filteredWithdrawalList = withdrawalList?.filter((item) => {
        return item.TransactionStatus === "Approved";
      });
      console.log(
        "gaga-------------------------------bonusList------",
        filteredBonusList,
      );
      console.log(
        "gaga-------------------------------withdrawalList------",
        filteredWithdrawalList,
      );

      const dataList = Array.from(Array(moment().isoWeeksInYear()).keys()).map(
        (weekNumber) => {
          const year = moment().format("YYYY");
          const date = moment(year).add(weekNumber, "weeks");
          const mon = moment(date).format("MMM");
          const monNumber = moment(date).format("M");
          const startDate = moment(date)
            .startOf("week")
            .add(1, "day")
            .toISOString();
          const endDate = moment(date).endOf("week").toISOString();

          const weekStart = new Date(startDate);
          const weekEnd = new Date(endDate);
          weekStart.setUTCHours(0, 0, 0, 0);
          weekEnd.setUTCHours(23, 59, 59, 999);

          const betSummary = betSummaryList?.find((item) => {
            return (
              item.startDate === weekStart.toISOString() &&
              item.endDate === weekEnd.toISOString() &&
              item.year === parseInt(year, 10)
            );
          });

          /*
           * get bonus
           * */
          const foundBonus = filteredBonusList?.find((item) => {
            const TransactionDateTime = moment(
              item.TransactionDateTime,
            ).subtract(7, "days");
            return (
              TransactionDateTime.isAfter(weekStart) &&
              TransactionDateTime.isBefore(weekEnd)
            );
          });

          /*
           * get withdrawal
           * */
          const foundWithdrawal = filteredWithdrawalList?.find((item) => {
            const TransactionDateTime = moment(item.TransactionDateTime);
            return (
              TransactionDateTime.isAfter(weekStart) &&
              TransactionDateTime.isBefore(weekEnd)
            );
          });

          let winnings = 0;

          if (foundBonus && betSummary) {
            winnings =
              foundBonus.Amount + (betSummary?.betSummary.totalEarnings || 0);
          }

          return {
            _id: `${mon}-${weekNumber}`,
            mon: monNumber + "-" + mon,
            year,
            startDate: weekStart.toISOString(),
            endDate: weekEnd.toISOString(),
            bonus: foundBonus?.Amount || betSummary?.betSummary.bonus || 0,
            totalStaked: betSummary?.betSummary.totalStaked || 0,
            totalEarnings: betSummary?.betSummary.totalEarnings || 0,
            winnings,
            approxWinnings: betSummary?.betSummary.winnings || 0,
            loading: false,
            fetch: 0,
            title: mon,
            withdrawal: foundWithdrawal,
          };
        },
      );
      const groupedDataList = groupBy(dataList, "mon");
      const defaultList = Object.keys(groupedDataList).map((key) => {
        return {
          title: key.split("-")[1],
          data: groupedDataList[key] as unknown as EarningsModel[],
        };
      });

      console.log(
        "gaga----------------------------defaultList---------",
        defaultList,
      );

      const yearTotalWinnings = sumBy(defaultList, (item) => {
        return sumBy(item.data, "winnings");
      });

      const yearTotalWithdrawals = sumBy(defaultList, (item) => {
        return sumBy(item.data, "withdrawal.Amount");
      });

      console.log(
        "gaga----------------------userDetails---------------",
        userDetails,
      );
      setState((prevState) => ({
        ...prevState,
        loading: false,
        yearTotalWinnings,
        yearTotalWithdrawals,
        list: defaultList,
        userDetails,
      }));
    });
  }, [email]);

  return (
    <div className="user-details-wrap">
      <Segment inverted>
        <div className="ttl">
          <span>{email}</span>
          <div className="row-wrap between">
            <Popup
              on="hover"
              basic
              trigger={<Icon name="info circle" />}
              position="bottom right"
              mouseLeaveDelay={3000}
            >
              <Menu vertical>
                <Menu.Item header>
                  <span>Year {moment().format("YYYY")}</span>
                </Menu.Item>
                <Menu.Item>
                  <Label color="green">
                    {Money(state.userDetails?.[0].data?.userSession?.cash || 0)}
                  </Label>
                  <span>Cash</span>
                </Menu.Item>

                <Menu.Item>
                  <Label color="green">{Money(state.yearTotalWinnings)}</Label>
                  <span>Earnings</span>
                </Menu.Item>

                <Menu.Item>
                  <Label color="purple">
                    {Money(Math.abs(state.yearTotalWithdrawals || 0))}
                  </Label>
                  <span>Cashout</span>
                </Menu.Item>
              </Menu>
            </Popup>
            {/*<span>{moment().format("YYYY")}</span>
            <div className="winnings-withdrawal-wrap">
              <div>
                <span className="lbl">Earnings</span>
                <span
                  className={classNames({
                    winnings: state.yearTotalWinnings > 0,
                    losses: state.yearTotalWinnings < 0,
                  })}
                >
                  {`${Money(state.yearTotalWinnings)}`}
                </span>
              </div>
              <div>
                <span className="lbl">Cashout</span>
                <span
                  className={classNames({
                    losses: true,
                  })}
                >
                  {`${Money(Math.abs(state.yearTotalWithdrawals || 0))}`}
                </span>
              </div>
            </div>*/}
          </div>
        </div>
        <hr />
        <div className="user-details-content-wrap">
          {state.list.map((mon) => {
            const total = sumBy(mon.data, "winnings");
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
                        {!!item.withdrawal && (
                          <Popup
                            on="click"
                            position="top center"
                            trigger={<div className="has-withdrawal" />}
                          >
                            <Popup.Header>Withdrawal</Popup.Header>
                            <Popup.Content>
                              {`${item.withdrawal.PaymentMethodInfo} ${Money(
                                item.withdrawal.Amount,
                              )}`}
                            </Popup.Content>
                          </Popup>
                        )}

                        <div className="week-date">
                          <span>
                            {moment(item.startDate).utc().format("ddd DD")} -{" "}
                            {moment(item.endDate).utc().format("ddd DD")}
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

                          {(item.winnings === 0 && item.totalStaked > 0 && (
                            <div className="row-wrap">
                              <span>Winnings</span>

                              <Popup
                                content="Approximate Earnings."
                                position="top center"
                                trigger={
                                  <span
                                    className={classNames({
                                      approx: true,
                                    })}
                                  >
                                    {Money(item.approxWinnings)}
                                  </span>
                                }
                              />
                            </div>
                          )) || (
                            <div className="row-wrap">
                              <span>Winnings</span>
                              <span
                                className={classNames({
                                  winnings: item.winnings > 0,
                                  losses: item.winnings < 0,
                                })}
                              >
                                {Money(item.winnings)}
                              </span>
                            </div>
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
    </div>
  );
});
