import React, { useCallback, useEffect, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageTimedEvents.module.scss";
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

import Modals from "../../components/Modals/ManageTimedEventsM";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { timeEventFilterValue, timeEventList, timeEventListItems } from "../../redux_toolkit/reducer/manageTimeEventApiReducer";
import { userBranchFilterValue, userBranchList } from "../../redux_toolkit/reducer/manageBranchApiReducer";

export default function ManageTimedEvents() {
  const dispatch = useDispatch();
  const timeEventListCount:any = useSelector((state:any)=>state.manageTimeEventApiReducer.timeEventListCount)
  const addTimeEventListCount:any = useSelector((state:any)=>state.manageTimeEventApiReducer.addTimeEventListCount)
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [timeEventData, setTimeEventData] = useState<any[]>([])
 
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
    userBranchFilterValue.type = "all";
    dispatch(userBranchList(userBranchFilterValue));
  },[])

  useEffect(()=>{
    let data:any = JSON.parse(localStorage.getItem("___data")!)
    timeEventFilterValue.restaurant_id = data?.restaurant_id;
    dispatch(timeEventList(timeEventFilterValue));
  },[addTimeEventListCount])

  useEffect(()=>{
    setTimeEventData(timeEventListItems)
  },[timeEventListCount])

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Timed Events</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                    handleShow("Create Time Events", true);
                  }}
              >
                Create Timed Events
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <Row>
              {
                   timeEventData?.map((item:any,num:number)=>{
                    console.log(item,"itemEvent")
                    return   <Col lg={3} >
                    <NavLink to={`/manage/timed-events/timed-events-details/${item.id}`} className={`${cx.navnewpage}`}>
                      <div className={`${cx.moreOption}`}>
                        <div className={`${cx.usermore}`}>
                          <div className={`${cx.promotions}`}>{item?.english_name}</div>
                          <div className={`${cx.editRole} ${cx.promotions}`}>
                          {item?.from_date1} - {item?.from_date2} 
                          </div>
                          <div className={`${cx.promotions}`} >
                          <button className={`${cx.notUsedBtn}`}>{item.status == "1"? "Active" : "Deactive"}</button>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </Col>

                    })
                  }
               
              </Row>
            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}
