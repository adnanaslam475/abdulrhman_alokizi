import React, { useCallback, useState, useEffect } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManagePromotionsDetails.module.scss";
import cy from "../../components/Modals/Modals.module.scss";
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
import Modals from "../../components/Modals/ManagePromotionsM";
import { FilterDropdown } from "../../components/Dropdown/Dropdowns";
import {
  daysFilter,
  ordertypefilter,
  percentagefilter,
  LWFfilter,
  filtertagoptions ,
  customeraddfilter,
} from "../../constants/dropdownconstants";
import { useDispatch, useSelector } from "react-redux";
import { activatePromotions, perIdPromotionDetail, promotionDetails } from "../../redux_toolkit/reducer/managePromotionsApiReducer";

export default function ManagePromotionsDetails() {
  const promotionState = useSelector((state:any)=>state.managePromotionsApiReducer)
  const dispatch = useDispatch();
  const param = useParams();
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [promotionData, setPromotionData] = useState<any>()
  const [editPromotion, setEditPromotion] = useState({
    "id":"",
    "name":"",
"localname":"",
"sdate":"",
"edate":"",
"days":"",
"ordertype":"",
"priority":"",
"addmodifer":"",
"promationtype":"",
"discounttype":"",
"discountamount":"",
"maxdiscount":"",
"product_ids":"",
"whencustomer":"",
"qty":"",
"noOfProduct":"",
"fixedamount":"",
"spendamount":"",
"branches_ids":"",
"limitCustomerTag":"",
"stime":"",
"etime":"",
"theywill":""
  })
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
     dispatch(promotionDetails(param?.id))
  },[promotionState.activatePromotionsCount])

  useEffect(()=>{
    setPromotionData(perIdPromotionDetail)
    setEditPromotion({
      "id":perIdPromotionDetail?.id,
      "name":perIdPromotionDetail?.name,
      "localname":perIdPromotionDetail?.name_localized,
      "sdate":perIdPromotionDetail?.from_date,
      "edate":perIdPromotionDetail?.to_date,
      "days":perIdPromotionDetail?.days,
      "ordertype":perIdPromotionDetail?.order_types,
      "priority":perIdPromotionDetail?.priority,
      "addmodifer":perIdPromotionDetail?.include_modifiers,
      "promationtype":perIdPromotionDetail?.p_type,
      "discounttype":perIdPromotionDetail?.discount_type,
      "discountamount":perIdPromotionDetail?.discount_amount,
      "maxdiscount":perIdPromotionDetail?.mix_discount,
      "product_ids":perIdPromotionDetail?.products,
      "whencustomer":perIdPromotionDetail?.when_customer,
      "qty":perIdPromotionDetail?.target_quantity,
      "noOfProduct":perIdPromotionDetail?.number_of_products,
      "fixedamount":perIdPromotionDetail?.fix_amount,
      "spendamount":perIdPromotionDetail?.spendamount,
      "branches_ids":perIdPromotionDetail?.branches,
      "limitCustomerTag":perIdPromotionDetail?.customer_tags,
      "stime":perIdPromotionDetail?.from_time,
      "etime":perIdPromotionDetail?.to_time,
      "theywill":perIdPromotionDetail?.theywill
    })
  },[promotionState.promotionDetailsCount])
  function daysFunc(event: any) {
    setEditPromotion((prev: any) => {
      return { ...prev, days: event };
    });
  }
  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <NavLink to="/manage/promotions" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={` d-flex ${st.rowTitleLeft}`}>
              <h5>Edit Promotion: {promotionData?.name}</h5>
              <button className={`${cx.notUsedBtn}`}> {promotionData?.is_active=="0" ? "Deactive" : "Active"}</button>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn`}
                onClick={() => {
                  dispatch(activatePromotions({id:param?.id,
                    type: promotionData?.is_active=="0" ? "1" : "0"}))
                }}
              >
                <img src={cancel} className={`${st.icon}`} />
                {promotionData?.is_active=="1" ? "Deactivate" : "Activate"} Promotion
              </button>
              <button
                className={`btn ${st.themeBtn}`}
              >
                Save Promotion
              </button>
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
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Name
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}></Tooltip>
                            }
                          >
                            <span
                              className={`${cx.tooltips} ms-2`}
                              style={{ top: "1px" }}
                            >
                              <AiOutlineInfoCircle />
                            </span>
                          </OverlayTrigger>
                        ))}
                      </Form.Label>
                      <Form.Control type="text" placeholder="end year promo" defaultValue={editPromotion?.name} onChange={(e:any)=>{
                        setEditPromotion((prev:any)=>{
                          return {...prev, name:e.target.value}
                        })
                      }}/>
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Name Localized{" "}
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}></Tooltip>
                            }
                          >
                            <span
                              className={`${cx.tooltips} ms-2`}
                              style={{ top: "1px" }}
                            >
                              <AiOutlineInfoCircle />
                            </span>
                          </OverlayTrigger>
                        ))}
                      </Form.Label>
                      <Form.Control type="text" placeholder="end year " defaultValue={editPromotion?.localname} onChange={(e:any)=>{
                        setEditPromotion((prev:any)=>{
                          return {...prev, localname:e.target.value}
                        })
                      }}/>
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Start Date{" "}
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}></Tooltip>
                            }
                          >
                            <span
                              className={`${cx.tooltips} ms-2`}
                              style={{ top: "1px" }}
                            >
                              <AiOutlineInfoCircle />
                            </span>
                          </OverlayTrigger>
                        ))}
                      </Form.Label>
                      <Form.Control type="date"  placeholder="2022-12-01" defaultValue={editPromotion?.sdate} onChange={(e:any)=>{
                        setEditPromotion((prev:any)=>{
                          return {...prev, sdate:e.target.value}
                        })
                      }}/>
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        End Date{" "}
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}></Tooltip>
                            }
                          >
                            <span
                              className={`${cx.tooltips} ms-2`}
                              style={{ top: "1px" }}
                            >
                              <AiOutlineInfoCircle />
                            </span>
                          </OverlayTrigger>
                        ))}
                      </Form.Label>
                      <Form.Control type="date" placeholder="2022-12-30" defaultValue={editPromotion?.edate} onChange={(e:any)=>{
                        setEditPromotion((prev:any)=>{
                          return {...prev, edate:e.target.value}
                        })
                      }}/>
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Start Time{" "}
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}></Tooltip>
                            }
                          >
                            <span
                              className={`${cx.tooltips} ms-2`}
                              style={{ top: "1px" }}
                            >
                              <AiOutlineInfoCircle />
                            </span>
                          </OverlayTrigger>
                        ))}
                      </Form.Label>
                      <Form.Control type="text" placeholder="23:00" defaultValue={editPromotion?.stime} onChange={(e:any)=>{
                        setEditPromotion((prev:any)=>{
                          return {...prev, stime:e.target.value}
                        })
                      }}/>
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        End Time{" "}
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}></Tooltip>
                            }
                          >
                            <span
                              className={`${cx.tooltips} ms-2`}
                              style={{ top: "1px" }}
                            >
                              <AiOutlineInfoCircle />
                            </span>
                          </OverlayTrigger>
                        ))}
                      </Form.Label>
                      <Form.Control type="text" placeholder="00:00" defaultValue={editPromotion?.etime} onChange={(e:any)=>{
                        setEditPromotion((prev:any)=>{
                          return {...prev, etime:e.target.value}
                        })
                      }}/>
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Applyes On Days{" "}
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}></Tooltip>
                            }
                          >
                            <span
                              className={`${cx.tooltips} ms-2`}
                              style={{ top: "1px" }}
                            >
                              <AiOutlineInfoCircle />
                            </span>
                          </OverlayTrigger>
                        ))}
                      </Form.Label>
                      <FilterDropdown options={daysFilter} postdata={daysFunc} defaultoptions={editPromotion?.days?.split(",")?.map((e:any)=>{
                        // for(let i=0; i<daysFilter.length; i++){
                        //   if(e==daysFilter[i].value){
                        //     console.log(e,daysFilter[i],"log")
                        //     return {label:daysFilter[i].label, value:daysFilter[i].value}
                        //   }
                        // }
                        return daysFilter.find((item:any)=>item.value == e)
                        })}
                        />
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Applyes On orders Types{" "}
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}></Tooltip>
                            }
                          >
                            <span
                              className={`${cx.tooltips} ms-2`}
                              style={{ top: "1px" }}
                            >
                              <AiOutlineInfoCircle />
                            </span>
                          </OverlayTrigger>
                        ))}
                      </Form.Label>
                      <FilterDropdown options={ordertypefilter} />
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Priority
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}></Tooltip>
                            }
                          >
                            <span
                              className={`${cx.tooltips} ms-2`}
                              style={{ top: "1px" }}
                            >
                              <AiOutlineInfoCircle />
                            </span>
                          </OverlayTrigger>
                        ))}
                      </Form.Label>
                      <Form.Control type="text" placeholder="3" />
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        <input
                          type="checkbox"
                          className={`${cy.checkboxinput}`}
                        />{" "}
                        Include Modifiers
                      </Form.Label>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Promotion Details</h5>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <Row>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Promotion Type
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}></Tooltip>
                            }
                          >
                            <span
                              className={`${cx.tooltips} ms-2`}
                              style={{ top: "1px" }}
                            >
                              <AiOutlineInfoCircle />
                            </span>
                          </OverlayTrigger>
                        ))}
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className={`${cy.checkboxlabel} `}>
                        <input type="radio" className={`${cy.radioinput}`} />
                        Basic
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className={`${cy.checkboxlabel} `}>
                        <input type="radio" className={`${cy.radioinput}`} />
                        Advance
                      </Form.Label>
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Discount Type
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}></Tooltip>
                            }
                          >
                            <span
                              className={`${cx.tooltips} ms-2`}
                              style={{ top: "1px" }}
                            >
                              <AiOutlineInfoCircle />
                            </span>
                          </OverlayTrigger>
                        ))}
                      </Form.Label>
                      <FilterDropdown options={percentagefilter} />
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Discount Amount(%)
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}></Tooltip>
                            }
                          >
                            <span
                              className={`${cx.tooltips} ms-2`}
                              style={{ top: "1px" }}
                            >
                              <AiOutlineInfoCircle />
                            </span>
                          </OverlayTrigger>
                        ))}
                      </Form.Label>
                      <Form.Control type="text" placeholder="5" />
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Maximum Discount Value (SAR)
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}></Tooltip>
                            }
                          >
                            <span
                              className={`${cx.tooltips} ms-2`}
                              style={{ top: "1px" }}
                            >
                              <AiOutlineInfoCircle />
                            </span>
                          </OverlayTrigger>
                        ))}
                      </Form.Label>
                      <Form.Control type="text" placeholder="200" />
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Products
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}></Tooltip>
                            }
                          >
                            <span
                              className={`${cx.tooltips} ms-2`}
                              style={{ top: "1px" }}
                            >
                              <AiOutlineInfoCircle />
                            </span>
                          </OverlayTrigger>
                        ))}
                        
                      </Form.Label>
                      <NavLink
                      className={`${cy.rightLabel}`}
                      to="#"
                    >
                      Select by tags or categories
                    </NavLink>
                      <FilterDropdown options={LWFfilter} />
                    </Form.Group>
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
                    + Add Branches
                  </button>
              </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <Row>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <FilterDropdown options={filtertagoptions } />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Limit To Customer Tags</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("Applies On Tags", true);
                    }}
                  >
                    Add Customer Tag
                  </button>
              </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <Row>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <FilterDropdown options={customeraddfilter } />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}
