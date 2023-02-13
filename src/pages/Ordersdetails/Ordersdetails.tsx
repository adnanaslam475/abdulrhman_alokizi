import React, { useCallback, useState, useEffect } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Ordersdetails.module.scss";
import table from "../../datatable.module.scss";
import {
  Card,
  Button,
  Row,
  Table,
  Col,
  Modal,
  Form,
  Dropdown,
} from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { MdArrowBackIos } from "react-icons/md";
import Modals from "../../components/Modals/OrderModal";
import { useLocation } from "react-router-dom";

export default function Ordersdetails() {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");

  const handleShow = (modalname: string, status: boolean) => {
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

  // -------------------------------------------  order view api  -------------------------------------//

  let param: any = useParams();
  const [orderRowData, setOrderRowData] = useState<any>();
  const [data, setData] = useState<any>();
  const [postapidata, setpostdata] = useState<any>("");

  useEffect(() => {
    ordersview();
    getOrderTags();
    // addOrderTags();                   //Comment by SH 25/01/2022
  }, []);

  const ordersview = () => {
    debugger
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/ordersview/${param?.id}`,
      headers: {
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
      },
    };
    axios(config)
      .then(function (response) {
        setOrderRowData(response.data);
        console.log(response, "ordersview");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // ------------------------------------------------ get Taglist -----------------------------------  //

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
        setData(response?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // ------------------------------------------------ add Tags api ------------------------------------//

  const addOrderTags = () => {
    let data = new FormData();
    data.append("order_id", param?.id);
    data.append("tag_id", postapidata);
    console.clear();
    console.log(postapidata);
    let config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/order_add_tag`,
      headers: {
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        ordersview();
        getOrderTags();
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //----------------------------------------------/// END /// --------------------------------------------//

  function postdata(data: string) {
    setpostdata(data);
  }

  // -------------- / openAt Date Modification / --------------------------- /

  let open_at_date = new Date(orderRowData?.order?.open_at).toString();
  let open_at_month = open_at_date.split(" ").splice(1, 2).join(" ");
  let open_at_time = open_at_date.split(" ").splice(4, 1).join(" ");
  let open_at_am = +open_at_time.slice(0, 2);

  // -------------- / closedAt Date Modification / --------------------------- /

  let close_at_date = new Date(orderRowData?.order?.close_at).toString();
  let close_at_month = close_at_date.split(" ").splice(1, 2).join(" ");
  let close_at_time = close_at_date.split(" ").splice(4, 1).join(" ");
  let close_at_am = +close_at_time.slice(0, 2);  

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          {!location.state && (
            <NavLink to="/orders" className={`${st.backBtn}`}>
              <MdArrowBackIos className={`${st.icon}`} /> Back
            </NavLink>
          )}
          {location.state && (
            <NavLink to="/today-orders" className={`${st.backBtn}`}>
              <MdArrowBackIos className={`${st.icon}`} /> Back
            </NavLink>
          )}
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>
                Order {orderRowData?.order?.order_id}
                {/* {location && location.state && (
                  <span style={{ color: "white", background: "grey" }}>
                    {location.state}
                  </span>
                )} */}
              </h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn`}
                onClick={() => {
                  window.print();
                }}
              >
                <img src={icon4} className={`${st.icon}`} />
                Print
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside} ${st.setWidth}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <div className={`${cx.contentBox}`}>
                <Row>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Order Number</label>
                    <p>{orderRowData?.order?.order_id}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Branch</label>
                    <p>
                      {orderRowData?.order?.branch_name
                        ? orderRowData?.order?.branch_name
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Source</label>
                    <p>
                      {orderRowData?.order?.source
                        ? orderRowData?.order?.source
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Type</label>
                    <p>
                      {orderRowData?.order?.order_type
                        ? orderRowData?.order?.order_type
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Table</label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Persons</label>
                    <p> {orderRowData?.order?.person ?? "-"}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Tags</label>
                    <p>
                      {orderRowData?.tag?.length > 0 &&
                        orderRowData?.tag
                          ?.map((item: any) => item?.name)
                          .join(", ")}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Cashier</label>
                    <p>
                      {orderRowData?.order?.cashier_name
                        ? orderRowData?.order?.cashier_name
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Waiter</label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Device</label>
                    <p>
                      {orderRowData?.order?.DeviceName
                        ? orderRowData?.order?.DeviceName
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Agent</label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Driver</label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Business Date</label>
                    <p>
                      {orderRowData?.order?.created_at
                        ? orderRowData?.order?.created_at.split("T")[0]
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Kitchen Received</label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Open At</label>
                    {orderRowData?.order?.open_at ? (
                      <p>
                        {open_at_month}{" "}
                        {open_at_am > 12
                          ? `0${open_at_am - 12}${open_at_time.slice(2, 5)}`
                          : `${open_at_am}${open_at_time.slice(2, 5)}`}{" "}
                        {open_at_am > 11 ? "PM" : "AM"}
                      </p>
                    ) : (
                      <p>-</p>
                    )}
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Closed At</label>
                    {orderRowData?.order?.close_at ? (
                      <p>
                        {close_at_month}{" "}
                        {close_at_am > 12
                          ? `0${close_at_am - 12}${close_at_time.slice(2, 5)}`
                          : `${close_at_am}${close_at_time.slice(2, 5)}`}{" "}
                        {close_at_am > 11 ? "PM" : "AM"}
                      </p>
                    ) : (
                      <p>-</p>
                    )}
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Kitchen Done</label>
                    <p>
                      {" "}
                      {orderRowData?.order?.kitchen_status
                        ? orderRowData?.order?.kitchen_status
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Preparation Time</label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Customer Name</label>
                    <p>{orderRowData?.order?.custmorName ?? "-"}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Customer Phone</label>
                    <p>{orderRowData?.order?.customer_phone ?? "-"}</p>
                  </Col>
                </Row>
              </div>

              <div className={`${cx.contentBox}`}>
                <Row>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Sub Total</label>
                    <p>
                      {" "}
                      SAR {""}
                      {orderRowData?.total?.[0]?.subtotal
                        ? Math.round(orderRowData?.total?.[0]?.subtotal)
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Discount</label>
                    <p>
                      SAR {""}
                      {orderRowData?.total[0]?.totaldiscount
                        ? orderRowData?.total[0]?.totaldiscount
                        : "0"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Total Charges</label>
                    <p>SAR 0</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Total Taxes</label>
                    <p>
                      SAR{" "}
                      {orderRowData?.total[0]?.tax
                        ? (+orderRowData?.total[0]?.tax).toFixed(2)
                        : "0"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Rounding Amount</label>
                    <p>
                      SAR {""}
                      {orderRowData?.total[0]?.total
                        ? Math.round(orderRowData?.total[0]?.total)
                        : "0"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Final Price</label>
                    <p>
                      SAR {""}
                      {orderRowData?.total[0]?.total
                        ? orderRowData?.total[0]?.total
                        : "0"}
                    </p>
                  </Col>
                </Row>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Tags</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      orderRowData?.tag?.length > 0 ? handleShow("order edit tags", true) : handleShow("order add tags", true);
                    }}
                  >
                    + {orderRowData?.tag?.length > 0 ? "Edit" : "Add"} Tags
                  </button>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <ul className={`${cx.tagsList}`}>
                  {orderRowData?.tag?.length > 0 &&
                    orderRowData?.tag?.map((item: any, index: number) => {
                      console.log(item, "itemitem");
                      return (
                        <li key={index} onClick={() => {
                          handleShow("order edit tags", true);
                        }}>
                          <span>{item?.name}</span>
                        </li>
                      );
                    })}
                </ul>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Products</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}></div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt}`}>
                    <thead>
                      <tr>
                        <th>Quantity</th>
                        <th>Item</th>
                        <th>Unit Price</th>
                        <th>Discount</th>
                        <th>Note</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                    {orderRowData?.allproducts.length > 0 && (
                      <tbody>
                        <tr>
                          <td>
                            {orderRowData?.allproducts[0]?.productqty
                              ? orderRowData?.allproducts[0]?.productqty
                              : "-"}
                          </td>
                          <td>
                            {orderRowData?.allproducts[0]?.productname
                              ? orderRowData?.allproducts[0]?.productname
                              : "-"}
                          </td>
                          <td>
                            {orderRowData?.allproducts[0]?.uniteprice
                              ? orderRowData?.allproducts[0]?.uniteprice
                              : "-"}
                          </td>
                          <td>
                            {orderRowData?.allproducts[0]?.productdiscount
                              ? orderRowData?.allproducts[0]?.productdiscount
                              : "-"}
                          </td>
                          <td>-</td>
                          <td>
                            {orderRowData?.allproducts[0]?.price
                              ? orderRowData?.allproducts[0]?.price
                              : "-"}
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </Table>
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Taxes</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}></div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt}`}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                    {orderRowData?.ordertaxes.length > 0 && (
                      <tbody>
                        <tr>
                          <td>
                            {orderRowData?.ordertaxes[0]?.tax_name
                              ? orderRowData?.ordertaxes[0]?.tax_name
                              : "-"}
                          </td>
                          <td>
                            {orderRowData?.ordertaxes[0]?.amount
                              ? orderRowData?.ordertaxes[0]?.amount
                              : "-"}
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </Table>
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Payments</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}></div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt}`}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>ADDED</th>
                      </tr>
                    </thead>
                    {orderRowData?.paymentdetails.length > 0 && (
                      <tbody>
                        <tr>
                          <td>
                            {orderRowData?.paymentdetails[0]?.payment_type
                              ? orderRowData?.paymentdetails[0]?.payment_type
                              : "-"}
                          </td>
                          <td>
                            {orderRowData?.paymentdetails[0]?.amount
                              ? orderRowData?.paymentdetails[0]?.amount
                              : "-"}
                          </td>
                          <td>
                            {orderRowData?.paymentdetails[0]?.created_at
                              ? orderRowData?.paymentdetails[0]?.created_at
                              : "-"}
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </Table>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals
        show={show}
        handleClose={handleClose}
        modalName={modalName}
        data={data}
        postdata={postdata}
        addOrderTags={addOrderTags}
        defaultTags={orderRowData?.tag?.map((item: any) => { return { value: item?.id, label: item?.name } })}
      />
    </>
  );
}
