import React, { Fragment, useState,useEffect } from "react";
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
  choosefilter,
  tagoptions,
  ordertypefilter,
} from "../../constants/dropdownconstants";
import { useSelector } from "react-redux";
import { userBranchListItems } from "../../redux_toolkit/reducer/manageBranchApiReducer";

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
  const [ordertype, setOrderType] = useState("");
  const [advanceOptions, setadvanceOptions] = useState(false);
  const [inventoryItems, setinventoryItems] = useState(false);
  const orderTypehandler = (event: any) => {
    setOrderType(event.label);
  };

  let sizeadvanceoptions = advanceOptions ? 6 : 12;

  const [subshow, setsubShow] = useState(false);
  const [submodalName, setsubModalName] = useState("");
  const [branchData, setBranchData] = useState<any[]>([])
  const [branchState, setBranchState] = useState(false);
  const userBranchState = useSelector((state:any)=>state.manageBranchApiReducer)
  
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
    let branchArray:any[] = [];
    userBranchListItems?.map((item:any,index:number)=>{
       branchArray.push({
        label: item?.name,
        value:item?.id
       })
    })
     setBranchData(branchArray)
  },[userBranchState.userBranchListCount])

  useEffect(()=>{
if(props.selectedBranch!=undefined){
  setBranchState(false)
}
  },[props.selectedBranch])
  return (
    <>
      {props.modalName === "Applies On Branches" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Applies On Branches </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
            <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="radio"  name ="branch"  className={`${cx.radioinput}`} onChange={(e: any) => {
                    setBranchState(false);
                    props.setErr("")
                  }}/>{" "}
                    Automatically apply on all existing and new branches
                  </Form.Label>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel} `}>
                    <input type="radio" name ="branch"  className={`${cx.radioinput}`} onChange={(e: any) => {
                    setBranchState(true)
                  }}/>
                    Branch
                  </Form.Label>
                  <FilterDropdown options={branchData} postdata={props.chargesBranchFunc} defaultoptions={props?.selectedBranch?.map((e:any)=>{return {label:e?.label, value:e?.value}})}/>
                  <p style={{color:"red"}}>{props.err}</p>
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
                if(branchState===true){
                  props.setErr("Branches Are Required")
                }else{
                  props.showBranches()
                props.setErr("");
                props.handleClose();
                }
              }}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {props.modalName === "Applies On Tags" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Limit To Customer Tags</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    Tags
                  </Form.Label>
                  <FilterDropdown options={props.customerTagsData} postdata={props.tagFunc} defaultoptions={props?.selectedTag?.map((e:any)=>{return {label:e?.label, value:e?.value}})}/>
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
              <Button className={`${cx.btnSubmit}`} onClick={()=>{props.showTags()
              props.handleClose();
              }}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Modals;
