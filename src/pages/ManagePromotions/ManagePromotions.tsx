import React, { useCallback, useState, useEffect } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManagePromotions.module.scss";
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

import Modals from "../../components/Modals/ManagePromotionsM";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { promotionDetails, promotionsFilterValue, promotionsList, promotionsListItems } from "../../redux_toolkit/reducer/managePromotionsApiReducer";

export default function ManagePromotions() {
  const dispatch = useDispatch();
  const promotionsListCount:any = useSelector((state:any)=>state.managePromotionsApiReducer.promotionsListCount)
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [promotionData, setPromotionData] = useState<any[]>([])
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
    promotionsFilterValue.type = "all";
    dispatch(promotionsList(promotionsFilterValue));
  },[])

  useEffect(()=>{
    setPromotionData(promotionsListItems)
  },[promotionsListCount])

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Promotions</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
                <NavLink to="/manage/promotions/add-promotions">
              <button
                className={`btn ${st.themeBtn}`}
              >
                Add Promotions
              </button>
              </NavLink>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <Row>
              {
                   promotionData?.map((item:any,num:number)=>{
                    console.log(item,"itemPromotion")
                    return   <Col lg={3} >
                    <NavLink to={`/manage/promotions/promotions-detail/${item?.id}`} onClick={()=>{
                      dispatch(promotionDetails(item?.id))
                    }} className={`${cx.navnewpage}`}>
                      <div className={`${cx.moreOption}`}>
                        <div className={`${cx.usermore}`}>
                          <div className={`${cx.promotions}`}>{item?.name}</div>
                          <div className={`${cx.editRole} ${cx.promotions}`}>
                            {item?.from_date} - {item?.to_date}
                          </div>
                          <div className={`${cx.promotions}`}>
                            <button className={`${cx.notUsedBtn}`}>{item.is_active == "1"? "Active" : "Deactive"}</button>
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
