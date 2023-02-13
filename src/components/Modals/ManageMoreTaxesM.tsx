import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Form,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import cx from "./Modals.module.scss";
import { AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";

import { NavLink } from "react-router-dom";
import food from "../../images/edit-images.png";

import { FilterDropdown } from "../Dropdown/Dropdowns";

import {
    choosefilter,daysFilter,filtertagoptions,
    SelectallFilter,timefilter,ordertypefilter, orderType
  } from "../../constants/dropdownconstants";
import { addGroupAndTaxes, addTaxes, deleteGroupAndTaxes, deleteTaxes, editGroupTaxItems, editTaxItems, editTax_detail, taxListItems } from "../../redux_toolkit/reducer/manageTaxGroupApiReducer";
import { useDispatch, useSelector } from "react-redux";

interface OptionsFilter {
  value: any;
  label: string;
  key?: string;
  disabled?: boolean;
}

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
  const taxCount = useSelector((state:any)=>state.manageTaxGroupApiReducer)
  const dispatch = useDispatch();
  const [ordertype, setOrderType] = useState("");
  const [advanceOptions, setadvanceOptions] = useState(false);
  const [inventoryItems, setinventoryItems] = useState(false);
  const orderTypehandler = (event: any) => {
    setOrderType(event.label);
  };

  let sizeadvanceoptions = advanceOptions ? 6 : 12;

  const [subshow, setsubShow] = useState(false);
  const [submodalName, setsubModalName] = useState("");
  const [addTaxData, setAddTaxData] = useState({
    name:"",
    name_localized:"",
    rate:"",
    applies_on:"",
    id:""
  })
  const [taxListData, setTaxListData] = useState<any>()
  const [addTaxGroupData, setAddTaxGroupData] = useState({
    name:"",
    group_local_name:"",
    reference:"",
    tax_id:"",
    id:""
  })
  const subdeliveryAddress = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow");
    setsubModalName(modalname);
    setsubShow(status);
  };
  const subhandleClose = () => {
    setsubShow(false);
    setsubModalName("");
  };
  function orderTypeFunc(event: any) {
    setAddTaxData((prev: any) => {
      return { ...prev, applies_on: event };
    });
    editTaxItems.applies_on = event;
  }
  function groupTaxFunc(event: any) {
    setAddTaxGroupData((prev: any) => {
      return { ...prev, tax_id: event };
    });
    console.log(event,"event")
    editGroupTaxItems.tax_id = event;
  }
  useEffect(()=>{
    let taxArray:any[] = []
    taxListItems?.map((item:any)=>{
      taxArray.push({
        value:item?.id,
        label:item?.name
      })
    })
    setTaxListData(taxArray)
  },[taxCount.taxListCount])
  useEffect(()=>{
     props.handleClose()
  },[taxCount.addTaxesCount, taxCount.deleteTaxesCount, taxCount.addGroupAndTaxesCount, taxCount.deleteGroupAndTaxesCount])

  function defaultapplies_onordertypeGroupdata(taxGroup:OptionsFilter) {
    let taxGroupArray = [];
    taxGroupArray.push(taxGroup)
    addTaxData.applies_on = [...addTaxData.applies_on, taxGroupArray[0]].join(", ")
  }
  function defaultapplies_onordertypeTaxGroupdata(taxGroup:OptionsFilter) {
    let taxGroupArray = [];
    taxGroupArray.push(taxGroup)
    addTaxGroupData.tax_id = [...addTaxGroupData.tax_id, taxGroupArray[0]].join(", ")
  }
  return (
    <>

{/* Create Tax  */}
{props.modalName === "Create Tax" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Tax </Modal.Title>
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
                    setAddTaxData((prev:any)=>{
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
                    setAddTaxData((prev:any)=>{
                      return {...prev, name_localized:e.target.value}
                    })
                  }}/>
                </Form.Group>
              </Col>
             
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                  Rate(%)*
                  </Form.Label>
                  <Form.Control type="text" onChange={(e:any)=>{
                    setAddTaxData((prev:any)=>{
                      return {...prev, rate:e.target.value}
                    })
                  }}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                  Applies On 
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
                  <FilterDropdown options={orderType} postdata={orderTypeFunc} />
                </Form.Group>
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
                dispatch(addTaxes(addTaxData))
              }}>Save</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

    {/* Edit Tax  */}
    {props.modalName === "Edit Tax" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Tax </Modal.Title>
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
                  <Form.Control type="text" placeholder="22" defaultValue={editTaxItems?.name} onChange={(e:any)=>{
                    editTaxItems.name = e.target.value
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
                  <Form.Control type="text" placeholder="2w" defaultValue={editTaxItems?.name_localized} onChange={(e:any)=>{
                    editTaxItems.name_localized = e.target.value
                  }}/>
                </Form.Group>
              </Col>
             
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                  Rate(%)*
                  </Form.Label>
                  <Form.Control type="text" placeholder="11%" defaultValue={editTaxItems?.rate} onChange={(e:any)=>{
                    editTaxItems.rate = e.target.value
                  }}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                  Applies On 
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
                  <FilterDropdown options={orderType} postdata={orderTypeFunc}  defaultdata={defaultapplies_onordertypeGroupdata} defaultoptions={editTaxItems?.applies_on?.split(",").map((item:any)=>{return {value:item, label:item}})}/>
                </Form.Group>
              </Col>
             
            </Row>
          </Modal.Body>
          <Modal.Footer>
          <div>
              <NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`} onClick={()=>{
                dispatch(deleteTaxes(editTaxItems.id))
              }}>
                Delete tax
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
                dispatch(addTaxes(editTaxItems))
              }}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    {/* Create Tax Group  */}


{props.modalName === "Create Tax group" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Tax Group </Modal.Title>
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
                    setAddTaxGroupData((prev:any)=>{
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
                    setAddTaxGroupData((prev:any)=>{
                      return {...prev, group_local_name:e.target.value}
                    })
                  }}/>
                </Form.Group>
              </Col>
             
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                  Taxes
                  </Form.Label>
                  <FilterDropdown options={taxListData} postdata={groupTaxFunc}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                  Reference
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
                  <Form.Control type="text" onChange={(e:any)=>{
                    setAddTaxGroupData((prev:any)=>{
                      return {...prev, reference:e.target.value}
                    })
                  }}/>
                </Form.Group>
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
                dispatch(addGroupAndTaxes(addTaxGroupData))
              }}>Save</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

{/* Edit Tax Group  */}

{props.modalName === "Edit Tax group" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Tax Group </Modal.Title>
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
                  <Form.Control type="text" placeholder="15 % tax group" defaultValue={editGroupTaxItems?.name} onChange={(e:any)=>{
                    editGroupTaxItems.name = e.target.value
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
                  <Form.Control type="text" placeholder="15 % tax group" defaultValue={editGroupTaxItems?.group_local_name} onChange={(e:any)=>{
                    editGroupTaxItems.group_local_name = e.target.value
                  }}/>
                </Form.Group>
              </Col>
             
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                  Taxes
                  </Form.Label>
                  <FilterDropdown options={taxListData} postdata={groupTaxFunc} defaultdata={defaultapplies_onordertypeTaxGroupdata} defaultoptions={editTax_detail?.map((item:any)=>{return {value:item?.id, label:item?.name}})}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                  Reference
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
                  <Form.Control type="text" placeholder="15%" defaultValue={editGroupTaxItems?.reference} onChange={(e:any)=>{
                    editGroupTaxItems.reference = e.target.value
                  }}/>
                </Form.Group>
              </Col>
             
            </Row>
          </Modal.Body>
          <Modal.Footer>
          <div>
              <NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`} onClick={()=>{
                dispatch(deleteGroupAndTaxes(editGroupTaxItems.id))
              }}>
                Delete tax group
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
                dispatch(addGroupAndTaxes(editGroupTaxItems))
              }}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

    </>
  );
};

export default Modals;
