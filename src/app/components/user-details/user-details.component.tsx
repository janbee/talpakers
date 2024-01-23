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
          ["IMMEDIATE BONUS", "Bonus"].includes(item.PaymentMethodInfo) &&
          item.Amount >= 10
        );
      });
      const filteredWithdrawalList = withdrawalList?.filter((item) => {
        return [
          "Approved",
          "Pending",
          "Sending to Processor",
          "In Process",
        ].includes(item.TransactionStatus);
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
            const transactionDate = new Date(
              item.TransactionDateTime.split("T")[0],
            );
            transactionDate.setUTCHours(0, 0, 0, 0);
            const TransactionDateTime = moment(transactionDate.toISOString());

            return (
              TransactionDateTime.isSameOrAfter(weekStart) &&
              TransactionDateTime.isSameOrBefore(weekEnd)
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
              mouseLeaveDelay={60000}
            >
              <Menu vertical>
                <Menu.Item header>
                  <Header as="h3">
                    Year {moment().format("YYYY")} Details
                  </Header>
                </Menu.Item>
                <Menu.Item>
                  <Header as="h4">Current Balance</Header>
                  <p>
                    <Label color="green">
                      {Money(
                        state.userDetails?.[0].data?.userSession?.cash || 0,
                      )}
                    </Label>
                  </p>
                </Menu.Item>
                <Menu.Item>
                  <Header as="h4">Available Cashout</Header>
                  <p>
                    <Label color="orange">
                      {Money(
                        state.userDetails?.[0].data?.userSession?.cashout || 0,
                      )}
                    </Label>
                  </p>
                </Menu.Item>
                <Menu.Item>
                  <Header as="h4">Total Earnings this year</Header>
                  <p>
                    <Label color="purple">
                      {Money(state.yearTotalWinnings)}
                    </Label>
                  </p>
                </Menu.Item>
                <Menu.Item>
                  <Header as="h4">Total Cashout this year</Header>
                  <p>
                    <Label color="red">
                      {" "}
                      {Money(Math.abs(state.yearTotalWithdrawals || 0))}
                    </Label>
                  </p>
                </Menu.Item>
              </Menu>
            </Popup>
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
                            flowing
                          >
                            <Popup.Header>
                              Withdrawal (
                              <span
                                className={classNames({
                                  "yellow-light":
                                    item.withdrawal.TransactionStatus ===
                                    "Pending",
                                  "green-light":
                                    item.withdrawal.TransactionStatus ===
                                    "Approved",
                                  "blue-light": [
                                    "In Process",
                                    "Sending to Processor",
                                  ].includes(item.withdrawal.TransactionStatus),
                                })}
                              >
                                {item.withdrawal.TransactionStatus}
                              </span>
                              )
                            </Popup.Header>
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
