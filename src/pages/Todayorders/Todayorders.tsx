import React, { useEffect, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Todayorders.module.scss";
import { Card, Tooltip, OverlayTrigger } from "react-bootstrap";
import Modals from "../../components/Modals/TodayorderModals";
import iconFilter from "../../images/icon-filter.svg";
import iconClose from "../../images/icon-close.svg";
import { Branches, Agents } from "./Dropdowns";
import { AiFillInfoCircle } from "react-icons/ai";
import axios from "axios";
import OrderCard from "./OrderCard";
import { useSelector } from "react-redux";
import { data } from "../../redux_toolkit/reducer/todaysOrderModalsReducer";

interface todaysOrderOptions {
  active: any[];
  closed: any[];
  declined: any[];
  draft: any[];
  pending: any[];
}

export default function Todayorders() {
  const counting = useSelector(
    (state: any) => state.todaysOrderModalsReducer.count
  );

  const [branchesData, setBranchesData] = useState([]);
  const [agentsData, setagentsData] = useState([]);
  const [todaysOrderData, settodaysOrderData] = useState<todaysOrderOptions>({
    active: [],
    closed: [],
    declined: [],
    draft: [],
    pending: [],
  });

  // -----------------------------------  Modals Show Hide Functions ans states ------------------------ //

  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const handleShow = (modalname: string, status: boolean) => {
    setModalName(modalname);
    setShow(status);
  };
  const handleClose = () => {
    setModalName("");
    setShow(false);
  };
  // ----------------------------------------------  GET BRANCHES API  ----------------------------------- //

  useEffect(() => {
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/branches`,
      headers: {
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
      },
    };
    axios(config)
      .then(function (response) {
        setBranchesData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // ----------------------------------------------  GET AGENTS API  ----------------------------------- //

  useEffect(() => {
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/get_Agent`,
      headers: {
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
      },
    };
    axios(config)
      .then(function (response) {
        setagentsData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // ------------------------------------------  get Taglist ------------------------------------------  //
  useEffect(() => {
    getTodaysOrders("", "");
  }, []);

  useEffect(() => {
    settodaysOrderData(data);
  }, [counting]);

  const getTodaysOrders = (ids: string, agentid: string) => {
    let data = new FormData();
    data.append("search", "");
    if (ids) data.append("branch", ids);
    if (agentid) data.append("agent", agentid);

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/todayorder`,
      headers: {
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response.data, "getTodaysOrders");
        settodaysOrderData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function selectbranches(ids: string) {
    getTodaysOrders(ids, "");
  }

  function selectagents(ids: string) {
    getTodaysOrders("", ids);
  }

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>
                Today's Orders
                {["bottom"].map((placement) => (
                  <OverlayTrigger
                    key={placement}
                    overlay={
                      <Tooltip
                        className={`${st.tooltipsBg}`}
                        id={`tooltip-${placement}`}
                      >
                        This module is to help Call Center Agents track their
                        daily orders
                      </Tooltip>
                    }
                  >
                    <span
                      className={`${st.tooltips} ms-2`}
                      style={{ top: "4px" }}
                    >
                      <AiFillInfoCircle />
                    </span>
                  </OverlayTrigger>
                ))}
              </h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <Branches
                branchesData={branchesData}
                selectbranches={selectbranches}
              />
              <Agents agentsData={agentsData} selectagents={selectagents} />
              <button
                className={`btn`}
                onClick={() => {
                  handleShow("today order filter", true);
                }}
              >
                <img src={iconFilter} className={`${st.icon}`} />
                Filter
                <img src={iconClose} className={`${st.iconClose}`} />
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside} pb-0`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <div className={`${cx.orderCardList}`}>
                <OrderCard
                  orderType="Draft"
                  tooltipDesc="Order that are not yet sent to the branch"
                  count={todaysOrderData?.draft?.length}
                  todaysOrderData={todaysOrderData?.draft}
                  getTodaysOrders={getTodaysOrders}
                />
                <OrderCard
                  orderType="Pending"
                  tooltipDesc="Orders that are not yet accepted by the branch"
                  count={todaysOrderData?.pending?.length}
                  todaysOrderData={todaysOrderData?.pending}
                  getTodaysOrders={getTodaysOrders}
                />
                <OrderCard
                  orderType="Active"
                  tooltipDesc="Orders that are currently being prepared in the branch"
                  count={todaysOrderData?.active?.length}
                  todaysOrderData={todaysOrderData?.active}
                  getTodaysOrders={getTodaysOrders}
                />
                <OrderCard
                  orderType="Declined"
                  tooltipDesc="Orders that have been declined from the branch or the call center"
                  count={todaysOrderData?.declined?.length}
                  todaysOrderData={todaysOrderData?.declined}
                  getTodaysOrders={getTodaysOrders}
                />
                <OrderCard
                  orderType="Closed"
                  tooltipDesc="Orders that are completed, voided, joined or returned"
                  count={todaysOrderData?.closed?.length}
                  todaysOrderData={todaysOrderData?.closed}
                  getTodaysOrders={getTodaysOrders}
                />
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}
