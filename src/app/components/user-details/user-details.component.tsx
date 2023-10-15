import React, { memo, useEffect, useState } from "react";
import "./user-details.component.scss";
import { Header, Segment } from "semantic-ui-react";
import { EarningsModel } from "@models/custom.models";
import { API } from "@services/api.service";
import { ElementComponent } from "@app/shared/component/element-loader.component";
import { groupBy, sumBy } from "lodash";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { Money } from "@utilities/utils";
import classNames from "classnames";

class State {
  loading = false;
  list: { title: string; data: EarningsModel[] }[] = [];
}

export const UserDetailsComponent = memo(() => {
  const { pathname } = useLocation();
  const email = pathname.split("/").pop()?.replace("@", "");
  const [state, setState] = useState<State>(new State());

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));
    API.getSettledBets({ email }).subscribe((res) => {
      console.log("gaga-----------------------------------getSettledBets--");
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

          const bets = res?.filter((item) => {
            return (
              item.startDate === weekStart.toISOString() &&
              item.endDate === weekEnd.toISOString()
            );
          });

          let bonus = 0;
          let totalStaked = 0;
          let totalEarnings = 0;
          let winnings = 0;
          if (bets?.length) {
            totalStaked = sumBy(bets, (bet) => {
              return sumBy(bet.details, "s");
            });
            const totalWinnings = sumBy(bets, (bet) => {
              return sumBy(bet.details, "w");
            });
            bonus = Math.floor(totalStaked / 75) * 10;

            totalEarnings = totalWinnings - totalStaked;
            bonus = bonus > 50 ? 50 : bonus;

            winnings = bonus + totalEarnings;
          }

          return {
            _id: `${mon}-${weekNumber}`,
            mon: monNumber + "-" + mon,
            year,
            startDate: weekStart.toISOString(),
            endDate: weekEnd.toISOString(),
            bonus,
            totalStaked,
            totalEarnings,
            winnings,
            loading: false,
            fetch: 0,
            title: mon,
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

      console.log("gaga-------------------------------------", defaultList);

      setState((prevState) => ({
        ...prevState,
        loading: false,
        list: defaultList,
      }));
    });
  }, [email]);

  return (
    <div className="user-details-wrap">
      <Segment inverted>
        <div className="ttl">{email}</div>

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
