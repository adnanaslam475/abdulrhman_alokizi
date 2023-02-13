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
    SelectallFilter,timefilter,ordertypefilter
  } from "../../constants/dropdownconstants";
import { addDelivery, deleteDelivery, editDeliveryData } from "../../redux_toolkit/reducer/manageMoreDeliveryApiReducer";
import { useDispatch, useSelector } from "react-redux";
import { userBranchFilterValue, userBranchList, userBranchListItems } from "../../redux_toolkit/reducer/manageBranchApiReducer";
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
  const deliveryState = useSelector((state:any)=>state.manageMoreDeliveryApiReducer)
  const userBranchListCount = useSelector((state:any)=>state.manageBranchApiReducer.userBranchListCount)
  const dispatch = useDispatch();
  const [ordertype, setOrderType] = useState("");
  const [advanceOptions, setadvanceOptions] = useState(false);
  const [inventoryItems, setinventoryItems] = useState(false);
  const [deliveryData, setDeliveryData] = useState({
    name:"",
    name_localized:"",
    branche_id:"",
    reference:"",
  })
  const orderTypehandler = (event: any) => {
    setOrderType(event.label);
  };

  let sizeadvanceoptions = advanceOptions ? 6 : 12;

  const [subshow, setsubShow] = useState(false);
  const [submodalName, setsubModalName] = useState("");
  const [branchData, setBranchData] = useState<any[]>([])
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
  },[deliveryState.addDeliveryCount, deliveryState.deleteDeliveryCount])

  useEffect(()=>{
    userBranchFilterValue.type = "all";
    dispatch(userBranchList(userBranchFilterValue));
  },[])

  useEffect(()=>{
let branches:any[] = []
userBranchListItems?.map((item:any)=>{
  console.log(item,"itemBranch")
  branches.push({
    label:item?.name,
    value:item?.id
  })
})
setBranchData(branches)

  },[userBranchListCount])

  function branchPostData(branch: string) {
    setDeliveryData((prev:any)=>{
      return {...prev, branche_id:branch}
    })
    editDeliveryData.branche_id = branch
  }

  function defaultbranch(branch:OptionsFilter) {
    console.log(branch,"dtaabranch")
    let branchArray = [];
    branchArray.push(branch.value)
    editDeliveryData.branche_id = [...editDeliveryData.branche_id, branchArray[0]].join(",")
    console.log(editDeliveryData.branche_id,".branche_id")
}

console.log(editDeliveryData,"jYai")
  return (
    <>

{props.modalName === "Create delivery zone" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Delivery Zones </Modal.Title>
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
                              <Tooltip id={`tooltip-${placement}`}> Name </Tooltip>
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
                    setDeliveryData((prev:any)=>{
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
                              <Tooltip id={`tooltip-${placement}`}> Name localized </Tooltip>
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
                    setDeliveryData((prev:any)=>{
                      return {...prev, name_localized:e.target.value}
                    })
                  }}/>
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
                              <Tooltip id={`tooltip-${placement}`}> Reference </Tooltip>
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
                    setDeliveryData((prev:any)=>{
                      return {...prev, reference:e.target.value}
                    })
                  }}/>
                  <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Branches</Form.Label>
                  <FilterDropdown options={branchData} postdata={branchPostData}/>
                </Form.Group>
              </Col>
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
                dispatch(addDelivery(deliveryData))
              }}>Save</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

{props.modalName === "Edit delivery zone" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Delivery Zones </Modal.Title>
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
                              <Tooltip id={`tooltip-${placement}`}> Name </Tooltip>
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
                  <Form.Control type="text" defaultValue={editDeliveryData.name} onChange={(e:any)=>{
                    editDeliveryData.name = e.target.value
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
                              <Tooltip id={`tooltip-${placement}`}> Name localized </Tooltip>
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
                  <Form.Control type="text" defaultValue={editDeliveryData.name_localized} onChange={(e:any)=>{
                    editDeliveryData.name_localized = e.target.value
                  }}/>
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
                              <Tooltip id={`tooltip-${placement}`}> Reference </Tooltip>
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
                  <Form.Control type="text" defaultValue={editDeliveryData.reference} onChange={(e:any)=>{
                    editDeliveryData.reference = e.target.value
                  }}/>
                </Form.Group>
              </Col>
              
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                  Coordinates
                  {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}> Coordinates </Tooltip>
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
                  <Form.Control type="text" defaultValue={editDeliveryData.cordinate} onChange={(e:any)=>{
                    editDeliveryData.cordinate = e.target.value
                  }}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Branches</Form.Label>
                  {/* <FilterDropdown options={branchData} postdata={branchPostData} defaultdata={defaultbranch} defaultoptions={editDeliveryData.branche_id?.split(",")?.map((item:any)=>{return {label:item.label, value:item?.value}})}/> */}
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className={`${cx.bottomRight}`}>
          <div>
              <NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`} onClick={()=>{
                dispatch(deleteDelivery(editDeliveryData.id))
              }}>
                Delete Delivery zone 
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
                dispatch(addDelivery(editDeliveryData))
              }}>Save</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

{props.modalName === "delivery zone filter" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Filter </Modal.Title>
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
                              <Tooltip id={`tooltip-${placement}`}> Name </Tooltip>
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
                  <Form.Control type="text"/>
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
                              <Tooltip id={`tooltip-${placement}`}> Reference </Tooltip>
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
                  <Form.Control type="text"/>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    Deleted {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}> Deleted</Tooltip>
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
                  <FilterDropdown options={choosefilter}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    Updated After {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}> Updated After</Tooltip>
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
                  <Form.Control type="text"/>
                </Form.Group>
              </Col>
              
            </Row>
          </Modal.Body>
          <Modal.Footer >
          <div>
              <NavLink to="#" className={`${cx.rightOption}`}>
                Clear
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
              <Button className={`${cx.btnSubmit}`}>Save</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}


    </>
  );
};

export default Modals;
