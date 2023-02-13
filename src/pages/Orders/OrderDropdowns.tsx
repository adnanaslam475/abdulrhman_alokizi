import React, { useEffect, useState, useContext, Fragment } from "react";
import { MultiSelect } from "react-multi-select-component";
import st from "../../style.module.scss";
import icon1 from "../../images/icon-branch.svg";
import icon2 from "../../images/icon-calendar.svg";
import icon4 from "../../images/icon-export.svg";
import { Dropdown } from "react-bootstrap";
import { Box, ChakraProvider, VStack, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import GlobalContext from "../../store/global-context";
import {
  Calendar,
  CalendarDefaultTheme,
  CalendarControls,
  CalendarPrevButton,
  CalendarNextButton,
  CalendarMonths,
  CalendarMonth,
  CalendarMonthName,
  CalendarWeek,
  CalendarDays,
} from "@uselessdev/datepicker";
import { addDays, subDays, format } from "date-fns";
import axios from "axios";
import Modals from "../../components/Modals/OrderModal";
import { useDispatch, useSelector } from "react-redux";
import { removeFilter } from "../../redux_toolkit/reducer/orderModalsReducer";

interface options {
  label: string;
  value: string | number;
}

export const Branches = (props: any) => {
  const branchesoptions: options[] = props.branchesData.map((item: any) => {
    return { value: item.id, label: item.branch_english };
  });
  const dispatch = useDispatch();
  const branchStatus = useSelector(
    (state: any) => state.orderModalsReducer.branchStatus
  );
  const [selected, setSelected] = useState([]);
  const [valueSelected, setValueSelected] = useState([]);
  const [condition, setCondition] = useState(true);
  const customValueRenderer = (selected: options[], options: any) => {
    return (
      <>
        <img src={icon1} className={`${st.icon}`} />{" "}
        {selected.length === 0
          ? "All Branches"
          : selected.map((item: any) => item.label).join(", ")}
      </>
    );
  };

  useEffect(() => {
    setCondition(branchStatus);
  }, [branchStatus]);

  useEffect(() => {
    setSelected([]);
  }, []);

  useEffect(() => {
    props.selectbranches(
      selected?.map((item: options) => item.value).join(",")
    );
  }, [selected]);

  return (
    <div className={`${st.selectDropdown}`}>
      <MultiSelect
        options={branchesoptions}
        defaultIsOpen={true}
        valueRenderer={customValueRenderer}
        value={condition === true ? valueSelected : selected}
        onChange={(e: any) => {
          setSelected(e);
          dispatch(removeFilter());
        }}
        labelledBy={"All Branches"}
        isCreatable={true}
        closeOnChangedValue={true}
      />
    </div>
  );
};

export const CustomContent = (props: any) => {
  const dispatch = useDispatch();
  const [dates, setDates] = React.useState({});
  const globalGtx = useContext(GlobalContext);
  const branchStatus = useSelector(
    (state: any) => state.orderModalsReducer.branchStatus
  );
  const handleSelectDate = (dates: any) => {
    console.log(dates, "handleselecteddate");
    setDates(dates);
    let start = dates?.start ? format(dates.start, "yyyy-MM-dd") : "";
    let end = dates?.end ? format(dates.end, "yyyy-MM-dd") : "";
    props.selectedBusinessDates({ start, end });
    dispatch(removeFilter());
  };

  useEffect(() => {
    if (branchStatus === true) {
      setDates({});
    }
  }, [branchStatus]);

  const today = Date.now();

  const todays_date = () => {
    setDates({
      start: today,
      end: today,
    });
    props.selectedBusinessDates({
      start: today,
      end: today,
    });
  };

  const yesterday_date = () => {
    debugger
    setDates({
      start: subDays(today, 1),
      end: subDays(today, 1),
    });
    props.selectedBusinessDates({
      start: new Date(subDays(today, 1)).toLocaleDateString(),
      end: new Date(subDays(today, 1)).toLocaleDateString(),
    });
  };

  const addSevenDays = () => {
    setDates({
      start: today,
      end: addDays(today, 7),
    });
    props.selectedBusinessDates({ start: new Date(today).toLocaleDateString(), end: new Date(addDays(today, 7)).toLocaleDateString() });
  };

  const subSevenDays = () => {
    setDates({
      start: subDays(today, 7),
      end: today,
    });
    props.selectedBusinessDates({ start: new Date(subDays(today, 7)).toLocaleDateString(), end: new Date(today).toLocaleDateString() });
  };

  const addMonthDays = () => {
    setDates({
      start: today,
      end: addDays(today, 30),
    });
    props.selectedBusinessDates({ start: new Date(today).toLocaleDateString(), end: new Date(addDays(today, 30)).toLocaleDateString() });
  };

  const subMonthDays = () => {
    setDates({
      start: subDays(today, 30),
      end: today,
    });
    props.selectedBusinessDates({ start: new Date(subDays(today, 30)).toLocaleDateString(), end: new Date(today).toLocaleDateString() });
  };

  return (
    <ChakraProvider theme={CalendarDefaultTheme}>
      <Calendar value={dates} onSelectDate={handleSelectDate}>
        <VStack
          spacing={4}
          bgColor="gray.50"
          p={4}
          alignItems="stretch"
          borderEndRadius="md"
          flex={1}
        >
          <Button
            onClick={todays_date}
            colorScheme="white"
            color="black"
            size="xs"
          >
            Today
          </Button>
          <Button
            onClick={yesterday_date}
            colorScheme="white"
            color="black"
            size="xs"
          >
            Yesterday
          </Button>
          <Button
            onClick={addSevenDays}
            colorScheme="white"
            color="black"
            size="xs"
          >
            This Week
          </Button>
          <Button
            onClick={subSevenDays}
            colorScheme="white"
            color="black"
            size="xs"
          >
            Last Week
          </Button>
          <Button
            onClick={addMonthDays}
            colorScheme="white"
            color="black"
            size="xs"
          >
            This Month
          </Button>
          <Button
            onClick={subMonthDays}
            colorScheme="white"
            color="black"
            size="xs"
          >
            Last Month
          </Button>
        </VStack>
        <Box position="relative">
          <CalendarControls>
            <CalendarPrevButton />
            <CalendarNextButton />
          </CalendarControls>

          <CalendarMonths>
            <CalendarMonth>
              <CalendarMonthName />
              <CalendarWeek />
              <CalendarDays />
            </CalendarMonth>
          </CalendarMonths>
        </Box>
      </Calendar>
    </ChakraProvider>
  );
};

export const BusinessDate = (props: any) => {
  const globalGtx = useContext(GlobalContext);
  const branchStatus = useSelector(
    (state: any) => state.orderModalsReducer.branchStatus
  );
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");

  function selectedBusinessDates(dates: any) {
    console.log(dates, "selectedBusinessDatesselectedBusinessDates");
    const startdate = dates?.start;
    let enddate: string = dates?.end;
    if (!enddate) {
      enddate = startdate;
    }
    console.log(dates, startdate, enddate, "BusinessDate");
    props.selectedBusinessDates(startdate, enddate);
    setstartdate(startdate);
    setenddate(enddate);
  }

  useEffect(() => {
    if (branchStatus === true) {
      setenddate("");
      setstartdate("");
    }
  }, [branchStatus]);

  return (
    <Dropdown className={`${st.calendarDropdown}`}>
      <Dropdown.Toggle id="dropdown-basic">
        <img src={icon2} className={`${st.icon}`} />
        {startdate ? startdate : "Business Date"}{" "}
        {enddate ? " - " + enddate : ""}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <CustomContent selectedBusinessDates={selectedBusinessDates} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const Export = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        <img src={icon4} className={`${st.icon}`} />
        Export
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <ul>
          <li>
            <NavLink to="#">Orders</NavLink>
          </li>
          <li>
            <NavLink to="#">Order Items</NavLink>
          </li>
          <li>
            <NavLink to="#">Order Payment</NavLink>
          </li>
          <li>
            <NavLink to="#">Order Tags</NavLink>
          </li>
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const ActionDropdown = (props: any) => {
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [postapidata, setpostdata] = useState<any>("");
  const [data, setData] = useState<any>();

  const handleShow = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow");
    if (modalName === "order add tags" && status) {
      getOrderTags();
    }
    setModalName(modalname);
    setShow(status);
  };
  const handleClose = () => {
    setModalName("");
    setShow(false);
  };

  useEffect(() => {
    getOrderTags();
  }, []);

  // ------------------------------------------  get Taglist ------------------------------------------  //

  const getOrderTags = () => {
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/tag_for_orders`,
      headers: {
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "getOrderTags");
        setData(response?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // ------------------------  add Multiple Tags on Multiple or Single Order api ------------------- //

  const addmultipleOrderTags = () => {
    let data = new FormData();
    data.append("order_ids", props.order_ids.join(","));
    data.append("tagids", postapidata);

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/order_multiple_addtag`,
      headers: {
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response, "addOrderTags");
        getOrderTags();
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //--------------------------------------- / End Of API / ------------------------------------------//

  // ------------------------  add Multiple Tags on Multiple or Single Order api ------------------- //

  const removemultipleOrderTags = () => {
    let data = new FormData();
    data.append("order_ids", props.order_ids.join(","));
    data.append("tag_ids", postapidata);

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/order_multiple_removetag`,
      headers: {
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response, "addOrderTags");
        getOrderTags();
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //--------------------------------------- / End Of API / ------------------------------------------//
  function postdata(data: string) {
    console.log(data, "orderdetails tags data");
    setpostdata(data);
  }

  return (
    <Fragment>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">Actions</Dropdown.Toggle>
        <Dropdown.Menu>
          <ul>
            <li>
              <NavLink
                to="#"
                onClick={() => {
                  handleShow("order add tags", true);
                }}
              >
                Add Tags
              </NavLink>
            </li>
            <li>
              <NavLink
                to="#"
                onClick={() => {
                  handleShow("order remove tags", true);
                }}
              >
                Remove Tags
              </NavLink>
            </li>
          </ul>
        </Dropdown.Menu>
      </Dropdown>

      <Modals
        show={show}
        handleClose={handleClose}
        modalName={modalName}
        data={data}
        postdata={postdata}
        removeOrderTags={removemultipleOrderTags}
        addOrderTags={addmultipleOrderTags}
      />
    </Fragment>
  );
};
