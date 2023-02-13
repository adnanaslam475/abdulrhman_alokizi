import { useState, useEffect } from "react";

export const useScrollHandler = () => {
  // setting initial value to true
  const [scroll, setScroll] = useState(1);

  // running on mount
  useEffect(() => {
    const onScroll = () => {
      const scrollCheck: boolean = window.scrollY < 10;
      console.log(scrollCheck, "scrollCheck");
      // if (scrollCheck !== scroll) {
      //   setScroll(scrollCheck);
      // }
    };

    // setting the event handler from web API
    document.addEventListener("scroll", onScroll);

    // cleaning up from the web API
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [scroll, setScroll]);

  return scroll;
};
