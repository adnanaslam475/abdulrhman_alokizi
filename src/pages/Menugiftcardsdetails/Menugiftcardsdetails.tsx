import React, { useCallback, useState, useEffect } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Menugiftcardsdetails.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Table, Col, Modal, Form, Dropdown } from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import cancel from "../../images/cancel.svg";
import { NavLink, useParams } from "react-router-dom";

import { MdArrowBackIos } from 'react-icons/md';
import Modals from "../../components/Modals/MenuGiftCardsM";
import { useDispatch, useSelector } from "react-redux";
import { changeGiftStatus, tagAndBranch, viewPerSingleDetails, viwePerSingleGift } from "../../redux_toolkit/reducer/menuGiftCardReducer";
import { productTagModifier } from "../../redux_toolkit/reducer/menuProductsApiReducer";



export default function Menugiftcardsdetails() {
  const viewPerSingleCount = useSelector((state:any)=>state.menuGiftCardReducer.viewPerSingleCount)
  const changeGiftStatusCount = useSelector((state:any)=>state.menuGiftCardReducer.changeGiftStatusCount)
  const addGiftCardTagsCount = useSelector((state:any)=>state.menuGiftCardReducer.addGiftCardTagsCount)
  const addGiftCardBranchesCount = useSelector((state:any)=>state.menuGiftCardReducer.addGiftCardBranchesCount)
  const dispatch = useDispatch()
  const param = useParams()
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [giftDetails,setGiftDetails] = useState<any>()
  const [postapidata, setpostdata] = useState<any>();
  const handleShow = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow");
    setModalName(modalname);
    setShow(status);
  };
  const handleClose = () => {
    setModalName("");
    setShow(false);
  };

  function postdata(data: string) {
    setpostdata(data);
  }

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("___data")!)
    dispatch(viwePerSingleGift({restaurant_id:data?.restaurant_id, gift_id:param?.id}))
  },[changeGiftStatusCount, addGiftCardBranchesCount, addGiftCardTagsCount])

  useEffect(()=>{
    if(viewPerSingleCount!==undefined)
    setGiftDetails(viewPerSingleDetails)
  },[viewPerSingleCount])

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <NavLink to="/menu/gift-cards" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5> {giftDetails?.getEvent?.english_name}
                <NavLink to="#" className={`${cx.activeBtn}`}>
                {giftDetails?.getEvent?.status === 0 ? "Active" : "Deactive"}
                </NavLink>
              </h5>
              
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button className={`btn`} onClick={()=>{dispatch(changeGiftStatus({gift_id:param?.id, status:giftDetails?.getEvent?.status===0 ? 1 : 0}))}}>
                <img src={cancel} className={`${st.icon}`} />
                {giftDetails?.getEvent?.status === 0 ? "Deactive" : "Active"} Gift Card
              </button>
              <button className={`btn ${st.themeBtn}`} onClick={() => {
                handleShow("edit combos", true);
              }}>
                Edit Gift Card
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
                    <label>Name</label>
                    <p>{giftDetails?.getEvent?.english_name}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Name Localized</label>
                    <p>{giftDetails?.getEvent?.arabic_name}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Category</label>
                    <p>{giftDetails?.getEvent?.category?.name}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>SKU</label>
                    <p>{giftDetails?.getEvent?.sku}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Barcode</label>
                    <p>{giftDetails?.getEvent?.Barcode}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Pricing Method</label>
                    <p>{giftDetails?.getEvent?.price_type}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Price</label>
                    <p>{giftDetails?.getEvent?.price}</p>
                  </Col>
                </Row>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Tags</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("giftcard add tags", true);
                    dispatch(tagAndBranch({
                      name: giftDetails?.getTags?.length > 0 ? "Edit Tags" : "Add Tags",
                      parameter:"getTags",
                      id: giftDetails?.getEvent?.id
                    }))
                    dispatch(productTagModifier({type:"tag"}))
                  }}>
                    + Add Tags
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                  Add tags to help you filter and group gift cards easily. You can create tags such as Open Gift Cards, Fixed Price, etc.
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Inactive In Branches</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("giftcard add tags", true);
                    dispatch(tagAndBranch({
                      name: giftDetails?.modifier?.length > 0 ? "Edit Inactive In Branches" : "Add Inactive In Branches",
                      parameter:"branchList",
                      id: giftDetails?.getEvent?.id
                    }))
                    dispatch(productTagModifier({type:"branch"}))
                  }}>
                   Select Branches
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                  Deactivate this gift card in the branches you select here to hide it from the menu.
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Groups</h5>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                Add this gift card to menu groups (go to Menu  Groups) to design your menu and control which devices this gift card can be sold from.
                </div>
              </div>

            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} postdata={postdata}/>
    </>
  );
}
