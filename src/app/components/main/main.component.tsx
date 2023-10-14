import React, { memo, useEffect } from "react";
import "./main.component.scss";
import { Store } from "@services/store.service";

export const MainComponent = memo(() => {
  //const state = useApi<DataModel>(API.getDataJson());

  useEffect(() => {
    Store.Loading$.next(true);
  }, []);

  return <div className="main-wrap"></div>;
});
