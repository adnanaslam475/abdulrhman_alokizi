import React, { useCallback, useEffect, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageTimedEventsDetails.module.scss";
import cy from "../../components/Modals/Modals.module.scss";

import prImg from "../../images/edit-images.png";
import table from "../../datatable.module.scss";
import {
  Card,
  Button,
  Row,
  Table,
  Col,
  Modal,
  Form,
  Tooltip,
  OverlayTrigger,
  Dropdown,
} from "react-bootstrap";
import cancel from "../../images/cancel.svg";
import { NavLink, useParams } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";

import { AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";
import Modals from "../../components/Modals/ManageTimedEventsM";
import {
  daysFilter,
  ordertypefilter,
  percentagefilter,
  LWFfilter,
  filtertagoptions,
  customeraddfilter,
} from "../../constants/dropdownconstants";
import { ActiveDeactiveEvent, timeEventPerId, timeEventPerIdData } from "../../redux_toolkit/reducer/manageTimeEventApiReducer";
import { useDispatch, useSelector } from "react-redux";
import { categoryList, filterValue } from "../../redux_toolkit/reducer/menuCategoriesApiReducer";
import { getProductApi } from "../../redux_toolkit/reducer/manageMoreKitchenFlowApiReducer";
import { productTagModifier } from "../../redux_toolkit/reducer/menuProductsApiReducer";

export default function ManageTimedEventsDetails() {
  const dispatch = useDispatch();
  const param = useParams();
  const timeEventPerIdCount:any = useSelector((state:any)=>state.manageTimeEventApiReducer.timeEventPerIdCount)
  const editTimeEventCount:any = useSelector((state:any)=>state.manageTimeEventApiReducer.editTimeEventCount)
  const eventTimeState:any = useSelector((state:any)=>state.manageTimeEventApiReducer)
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState<any>()
  const [modalName, setModalName] = useState("");
  const handleShow = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow");
    setModalName(modalname);
    setShow(status);
  };
  const handleClose = () => {
    setModalName("");
    setShow(false);
  };

  useEffect(()=>{
    const restaurantId = JSON.parse(localStorage.getItem("___data")!)
    filterValue.type = "All";
     dispatch(categoryList(filterValue))
    dispatch(getProductApi({restaurent_id:restaurantId?.restaurant_id}))
    dispatch(productTagModifier({type:"tag"}))
  },[])
  useEffect(()=>{
    dispatch(timeEventPerId({event_id: param?.id}))
  },[editTimeEventCount, eventTimeState.ActiveDeactiveEventCount, eventTimeState.applyOnBranchEventCount, eventTimeState.applyCategoryDataCount, eventTimeState.applyOnProductDataCount, eventTimeState.applyOnProductTagsDataCount])

  useEffect(()=>{
    setDetails(timeEventPerIdData)
    console.log(timeEventPerIdData,"timeEventPerIdData")
  },[timeEventPerIdCount])
  console.log(details,"timeEventPerIdDatadetails")
  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <NavLink to="/manage/timed-events" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={` d-flex ${st.rowTitleLeft}`}>
              <h5>{ details?.english_name }</h5>
              <button className={`${cx.notUsedBtn}`}> {details?.status=="0" ? "Deactive" : "Active"}</button>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn`}
                onClick={() => {
                  dispatch(ActiveDeactiveEvent({id:details?.id,
                    type:details?.status=="0" ? "1" : "0"}))
                }}
              >
                <img src={cancel} className={`${st.icon}`} />
                {details?.status!="0" ? "Deactive" : "Active"} Timed Event
              </button>
              <button className={`btn ${st.themeBtn}`}
              onClick={() => {
                handleShow("Edit Time Events", true);
              }}
              >Edit Timed Event</button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside} ${st.setWidth}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Roles</h5>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <Row>
                    <Col lg={6} className={`${cx.formField}`}>
                    <label>Type</label>
                    <p>{details?.event_type}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Fixed Price</label>
                    <p>SAR 23,412</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Date</label>
                    <p>{`${details?.from_date1}-${details?.from_date2}`}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Time </label>
                    <p>{`${details?.from_time1}-${details?.from_time2}`}</p>
                  </Col> 
                </Row>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Applies On Branches</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("Applies On Branches", true);
                    }}
                  >
                    + {details?.branchesdata?.length>0 ? "Edit" : "Add"} Branches
                  </button>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Reference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        details?.branchesdata?.map((item:any)=>{
                          return (
                            <tr>
                               <td>{item?.english_name}</td>
                               <td>{item?.ref_number}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Applies on Categories</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("Edit Categories", true);
                    }}
                  >
                    {details?.catdata?.length>0 ? "Edit" : "Add"} Categories
                  </button>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                        details?.catdata?.map((item:any)=>{
                          return (
                            <tr>
                               <td>{item?.name}</td>
                               <td>
                          <div className={`${cx.emptybox}`}></div>
                        </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Applies on Product</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("edit product", true);
                    }}
                  >
                    {details?.productdata?.length>0 ? "Edit" : "Add"} Product
                  </button>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>SKU</th>
                        {/* <th> <img className={`${st.prImage}`} src={prImg} /></th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        details?.productdata?.map((item:any)=>{
                          return (
                            <tr>
                              <td>{item?.name}</td>
                        <td>
                        {item?.sku}
                        </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                </div>
              </div>



              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Applies On Product Tags</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("Applies On Tags", true);
                    }}
                  >
                    {details?.tagsname?.length>0 ? "Edit" : "Add"} product Tags
                  </button>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
             
              {details?.tagsname?.length>0 ? 
              details?.tagsname?.map((item:any,index:number)=>{
                return item?.name
              })
              :
              <div className={`p-4 text-center ${table.noData}`}>
              Select the product tags where this timed event can be applied.
              </div>
              }
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}
