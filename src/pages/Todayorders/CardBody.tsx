import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Todayorders.module.scss";
import { Dropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";
import { HeadPhoneIcon, ClockIcon, ProfileIcon, FileIcon } from "./Icons";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";
import { style } from "@mui/system";
import { useDispatch } from "react-redux";
import {orderDeclined } from "../../redux_toolkit/reducer/todaysOrderModalsReducer";

export default function CardBody(props: any) {
  const dispatch = useDispatch();
  let {
    customer,
    branch,
    price,
    cashier_name,
    created_at,
    updated_at,
    order_id,
    orderType,
    number,
    getTodaysOrders,
  } = props;

  const navigate = useNavigate();

  // modifying created_at and updated_at string to date object so to convert it into functionality of ago
  let beforeModifiedCreatedDate = created_at.split(" ").join("T") + ".5000z";
  let createdDate = new Date(beforeModifiedCreatedDate);
  let beforeModifiedModifiedDate = updated_at.split(" ").join("T") + ".5000z";
  let modifiedDate = new Date(beforeModifiedModifiedDate);

  // ---------------------------------- / order-declined api /-----------------------------------//
  function order_decline() {
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/order_decline/${order_id}`,
      headers: {
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
      },
    };
    axios(config)
      .then(function (response: any) {
        console.log(response, "order_decline");
        dispatch(orderDeclined(response.data.msg))
        getTodaysOrders();
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }

  // ---------------------------------- / order-Reorder api /-----------------------------------//

  function orderReorder() {
    console.log("order Reorder");
  }

  function TodayChangeOrderStatus() {
    if (orderType === "Declined") {
      orderReorder();
    } else {
      order_decline();
    }
  }

  function redirectToAnotherPage() {
    navigate(`${order_id}`, { state: orderType });
  }
  return (
    <Fragment>
      <div className={`${cx.dataList} mb-3`} style={{ cursor: "pointer" }}>
        {/* <NavLink to="#"> */}
        <h5 onClick={redirectToAnotherPage}>{order_id}</h5>
        <div className="d-flex mb-3" onClick={redirectToAnotherPage}>
          <div>
            <ProfileIcon />
          </div>
          <div className="text-gray-500 ms-2 flex flex-col">
            <span className="w-64 truncate">{customer}</span>
            <span>+56 {number}</span>
          </div>
        </div>

        <div className="d-flex mb-3" onClick={redirectToAnotherPage}>
          <div>
            <ClockIcon />
          </div>
          <div className="text-gray-500 ms-2 flex flex-col">
            <span className="truncate">
              Created <ReactTimeAgo date={createdDate} locale="en-US" />
            </span>
            <span className="truncate">
              Modified <ReactTimeAgo date={modifiedDate} locale="en-US" />
            </span>
          </div>
        </div>

        <div className="d-flex mb-3" onClick={redirectToAnotherPage}>
          <div>
            <HeadPhoneIcon />
          </div>
          <div className="text-gray-500 ms-2 flex flex-col">
            <span className="truncate">{cashier_name}</span>
          </div>
        </div>

        <div className="mt-4 d-flex align-items-center position-relative">
          <div className="d-flex" onClick={redirectToAnotherPage}>
            <div>
              <FileIcon />
            </div>
            <div className="ms-2">
              <span className="font-bold whitespace-nowrap">SAR {price}</span>
              <span className="mx-1">|</span> <span>{branch}</span>
            </div>
          </div>
          <Dropdown className={`${cx.moreDropdown}`}>
            <Dropdown.Toggle id="dropdown-basic">
              <FiMoreVertical />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={TodayChangeOrderStatus}>
                {orderType === "Declined" ? "Re-order" : "Declined Order"}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  window.print();
                }}
              >
                Print
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {/* </NavLink> */}
      </div>
    </Fragment>
  );
}
