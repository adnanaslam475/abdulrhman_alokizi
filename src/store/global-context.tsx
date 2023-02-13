import { createContext, useState } from "react";
import * as React from "react";

const GlobalContext = createContext({
  showMenu: false,
  showMore: false,
  data: "",
  count: 0,
  refreshCount: 0,
  displayMenu: (data: boolean) => {},
  displayMore: () => {},
  refresh: () => {},
  orderApiGlobal: (data: any) => {},
});

export function GlobalContextProvider(props: any) {
  const [showMenu, setshowMenu] = useState(false);
  const [showMore, setshowMore] = useState(false);
  const [data, setData] = useState("");
  const [count, setCount] = useState(0);
  const [refreshCount, setRefreshCount] = useState(0);

  function itemDisplayMenuHandler(data: boolean) {
    if (data) {
      data = false;
    }
    if (showMenu) {
      setshowMenu(false);
    } else {
      setshowMenu(true);
    }
  }

  function itemDisplayMoreHandler() {
    if (showMore) {
      setshowMore(false);
    } else {
      setshowMore(true);
    }
  }
  function orderApiGlobal(data: any) {
    console.log(data, "dataaaa");
    setCount((prev) => prev + 1);
    setData(data);
  }

  function refresh() {
    setRefreshCount((prev) => prev + 1);
  }

  const context = {
    showMenu: showMenu,
    showMore: showMore,
    data: data,
    count: count,
    refreshCount: refreshCount,
    refresh: refresh,
    displayMenu: itemDisplayMenuHandler,
    displayMore: itemDisplayMoreHandler,
    orderApiGlobal: orderApiGlobal,
  };

  return (
    <GlobalContext.Provider value={context}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
