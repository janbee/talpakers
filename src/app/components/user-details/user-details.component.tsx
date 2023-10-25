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
  loading = true;
  list: { title: string; data: EarningsModel[] }[] = [];
  yearTotalWinnings: number = 0;
}

export const UserDetailsComponent = memo(() => {
  const { pathname } = useLocation();
  const email = pathname.split("/").pop()?.replace("@", "");
  const [state, setState] = useState<State>(new State());

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));

    API.getBetSummary({ email }).subscribe((res) => {
      console.log(
        "gaga-----------------------------------getSettledBets--",
        res,
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

          const betSummary = res?.find((item) => {
            return (
              item.startDate === weekStart.toISOString() &&
              item.endDate === weekEnd.toISOString() &&
              item.year === parseInt(year, 10)
            );
          });

          console.log(
            "gaga--------------------betSummary-----------------",
            betSummary,
          );
          return {
            _id: `${mon}-${weekNumber}`,
            mon: monNumber + "-" + mon,
            year,
            startDate: weekStart.toISOString(),
            endDate: weekEnd.toISOString(),
            bonus: betSummary?.betSummary.bonus || 0,
            totalStaked: betSummary?.betSummary.totalStaked || 0,
            totalEarnings: betSummary?.betSummary.totalEarnings || 0,
            winnings: betSummary?.betSummary.winnings || 0,
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

      const yearTotalWinnings = sumBy(defaultList, (item) => {
        return sumBy(item.data, "winnings");
      });

      setState((prevState) => ({
        ...prevState,
        loading: false,
        yearTotalWinnings,
        list: defaultList,
      }));
    });
  }, [email]);

  return (
    <div className="user-details-wrap">
      <Segment inverted>
        <div className="ttl">
          <span>{email}</span>
          <span>
            {moment().format("YYYY")} earnings
            <span
              className={classNames({
                winnings: state.yearTotalWinnings > 0,
                losses: state.yearTotalWinnings < 0,
              })}
            >
              {" " + Money(state.yearTotalWinnings)}
            </span>
          </span>
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