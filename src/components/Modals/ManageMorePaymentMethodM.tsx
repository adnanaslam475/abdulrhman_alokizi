import React, { Fragment, useState, useEffect } from "react";

import st from "../../style.module.scss";
import {
  Button,
  Modal,
  Row,
  Col,
  Form,
  Tooltip,
  Card,
  OverlayTrigger,
} from "react-bootstrap";
import cx from "./Modals.module.scss";
import { AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import food from "../../images/edit-images.png";
import Select from 'react-select';
import { FilterDropdown } from "../Dropdown/Dropdowns";

import {
    choosefilter,filtertagoptions,
    paymentmethod,
    SelectallFilter,timefilter
  } from "../../constants/dropdownconstants";
import { useDispatch, useSelector } from "react-redux";
import { addPayment, deletePayment, editPaymentData } from "../../redux_toolkit/reducer/manageMorePaymentApiReducer";

const Modals = (props: any) => {
  const options = [
    {
      value: "1",
      label: "Pick up",
    },
    {
      value: "2",
      label: "Delivery",
    },
  ];
  const deliveryzone = [
    {
      value: "1",
      label: "Shipping",
    },
    {
      value: "2",
      label: "Ordered",
    },
  ];
  const paymentState = useSelector((state:any)=>state.manageMorePaymentApiReducer)
  const dispatch = useDispatch();
  const [ordertype, setOrderType] = useState("");
  const [advanceOptions, setadvanceOptions] = useState(false);
  const [inventoryItems, setinventoryItems] = useState(false);
  const [paymentData, setPaymentData] = useState({
    name:"",
    name_localized:"",
    method_type:"",
    open_cash_drawer:"",
    code:""
  })
  const orderTypehandler = (event: any) => {
    setOrderType(event.label);
  };

  let sizeadvanceoptions = advanceOptions ? 6 : 12;

  const [subshow, setsubShow] = useState(false);
  const [submodalName, setsubModalName] = useState("");
  const subdeliveryAddress = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow");
    setsubModalName(modalname);
    setsubShow(status);
  };
  const subhandleClose = () => {
    setsubShow(false);
    setsubModalName("");
  };

  useEffect(()=>{
    props.handleClose();
  },[paymentState.addPaymentCount, paymentState.deletePaymentCount])

  return (
    <>

{props.modalName === "add payment method" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Payment Method</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    Name {["top"].map((placement) => (
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
                  <Form.Control type="text" onChange={(e:any)=>{
                    setPaymentData((prev:any)=>{
                      return {...prev, name:e.target.value}
                    })
                  }}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    Name Localized{["top"].map((placement) => (
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
                  <Form.Control type="text" onChange={(e:any)=>{
                    setPaymentData((prev:any)=>{
                      return {...prev, name_localized:e.target.value}
                    })
                  }}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    Type{["top"].map((placement) => (
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
                  <Select
                    isSearchable={true}
                    options={paymentmethod}
                    onChange={(e:any) => { 
                      setPaymentData((prev:any)=>{
                        return {...prev, method_type:e.value}
                      })
                  }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                            Code 
                  </Form.Label>
                  <Form.Control type="text" onChange={(e:any)=>{
                    setPaymentData((prev:any)=>{
                      return {...prev, code:e.target.value}
                    })
                  }}/>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
               
                  <Form.Label className={`${cx.checkboxlabel}`}>
                   < input type="checkbox" className={`${cx.checkboxinput}`} 
                   onChange={(e: any) => {
                    let check = e.target.checked === true ? 1 : 0
                    setPaymentData((prev:any)=>{
                      return {...prev, open_cash_drawer:check}
                    })
                  }}
                  /> 
                   Auto Open Cash Drawer
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
                 
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className={`${cx.bottomRight}`}>
            <div>
              <Button
                className={`${cx.btnClose}`}
                onClick={() => {
                  props.handleClose();
                  setOrderType("");
                }}
              >
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={()=>{
                dispatch(addPayment(paymentData))
              }}>Save</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

{props.modalName === "Edit Payment Method" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Payment Method</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    Name {["top"].map((placement) => (
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
                  <Form.Control type="text" placeholder="Gift Card" defaultValue={editPaymentData.name} onChange={(e:any)=>{
                    editPaymentData.name = e.target.value
                  }}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    Name Localized{["top"].map((placement) => (
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
                  <Form.Control type="text" placeholder="Gift Card" defaultValue={editPaymentData.name_localized} onChange={(e:any)=>{
                    editPaymentData.name_localized = e.target.value
                  }}/>
                </Form.Group>
              </Col>
              
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                            Code 
                  </Form.Label>
                  <Form.Control type="text" placeholder="68565454" defaultValue={editPaymentData.code} onChange={(e:any)=>{
                    editPaymentData.code = e.target.value
                  }}/>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
               
                  <Form.Label className={`${cx.checkboxlabel}`}>
                   < input type="checkbox" className={`${cx.checkboxinput}`} defaultChecked={editPaymentData.open_cash_drawer=="1" ? true : false} onChange={(e: any) => {
                    let check = e.target.checked === true ? "1" : "0"
                    editPaymentData.open_cash_drawer = check
                  }}/> 
                   Auto Open Cash Drawer
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
                 
              </Col>
              <Col md={12} lg={12}>
               
                  <Form.Label className={`${cx.checkboxlabel}`}>
                   < input type="checkbox" className={`${cx.checkboxinput}`} defaultChecked={editPaymentData.activestatus=="Active" ? true : false} onChange={(e: any) => {
                    let check = e.target.checked === true ? "Active" : "Deactive"
                    editPaymentData.activestatus = check
                  }}/> 
                   Active
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
                 
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer >

          <div>
              <NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`} onClick={()=>{
                dispatch(deletePayment(editPaymentData.id))
              }}>
                Delete Payment method 
              </NavLink>
            </div>
            <div>
              <Button
                className={`${cx.btnClose}`}
                onClick={() => {
                  props.handleClose();
                  setOrderType("");
                }}
              >
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={()=>{
                dispatch(addPayment(editPaymentData))
              }}>Save</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}



     


{props.modalName === "sort payment Method" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sort Payment Method</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
          
                <Row>
                  <Col lg={3}>
                    <NavLink to="#" className={`${cx.moreOption}`}>
                    Gift Card
                    </NavLink>
                 </Col>
                  <Col lg={3}>
                    <NavLink to="#" className={`${cx.moreOption}`}>
                    House Account 
                    </NavLink>
                 </Col>
                  <Col lg={3}>
                    <NavLink to="#" className={`${cx.moreOption}`}>
                    Shabaka 
                    </NavLink>
                 </Col>
                  <Col lg={3}>
                    <NavLink to="#" className={`${cx.moreOption}`}>
                    Cash
                    </NavLink>
                 </Col>
                </Row>
          </Modal.Body>
          <Modal.Footer className={`${cx.bottomRight}`}>
            <div>
              <Button
                className={`${cx.btnClose}`}
                onClick={() => {
                  props.handleClose();
                  setOrderType("");
                }}
              >
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}



    </>
  );
};

export default Modals;
