import React, { Fragment, useEffect, useState } from "react";

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
import Select from "react-select";
import { FilterDropdown } from "../Dropdown/Dropdowns";

import {
  choosefilter,
  filtertagoptions,
  SelectallFilter,
  timefilter,
  amountFilter,
  ordertypefilter,
  deleteOptions,
  taxFilter,
  filterinventory,
  chargesType,
  orderType,
} from "../../constants/dropdownconstants";
import { userBranchListItems } from "../../redux_toolkit/reducer/manageBranchApiReducer";
import { useDispatch, useSelector } from "react-redux";
import { groupAndTaxListItems } from "../../redux_toolkit/reducer/manageTaxGroupApiReducer";
import { addCharges, branchArray, chargesListItems, editChargesData } from "../../redux_toolkit/reducer/manageMoreChargesApiReducer";
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
  const chargeState = useSelector((state:any)=>state.manageMoreChargesApiReducer)
  const dispatch = useDispatch();
  const userBranchList = useSelector((state:any)=>state.manageBranchApiReducer)
  const taxListState = useSelector((state:any)=>state.manageTaxGroupApiReducer)
  const [ordertype, setOrderType] = useState("");
  const [advanceOptions, setadvanceOptions] = useState(false);
  const [inventoryItems, setinventoryItems] = useState(false);
  const [addChargesData, setAddChargesData] = useState({
     name: "",
     localname: "",
     isopenvalue: "",
     type: "",
     value: "",
     applyon_ordertype: "",
     taxgroup: "",
     applyon_branches: "",
     applyon_order: "",
     applyon_ordersubtotal: ""
  })
  const [branchData, setBranchData] = useState<any[]>([])
  const [taxAndGroupData, setTaxAndGroupData] = useState<any[]>([])
  const [err, setErr] = useState("");
  const [branchState, setBranchState] = useState(false);
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

  function chargesPostData(charge: string) {
    setAddChargesData((prev:any)=>{
      return {...prev, type:charge}
    })
      editChargesData.type = charge
  }
  function chargesTaxAndGroupData(charge: string) {
    setAddChargesData((prev:any)=>{
      return {...prev, taxgroup:charge}
    })
      editChargesData.taxgroup = charge
  }
  function chargesIsOpenValueData(charge: string) {
    setAddChargesData((prev:any)=>{
      return {...prev, isopenvalue:charge}
    })
      editChargesData.isopenvalue = charge
  }
  function chargesTypeFunc(event: any) {
    setAddChargesData((prev: any) => {
      return { ...prev, applyon_ordertype: event };
    });
      editChargesData.applyon_ordertype = event
  }
  function chargesBranchFunc(event: any) {
    setAddChargesData((prev: any) => {
      return { ...prev, applyon_branches: event };
    });
    setErr("")
    editChargesData.applyon_branches = event
  }
  useEffect(()=>{
    let branchArray:any[] = [];
    userBranchListItems?.map((item:any,index:number)=>{
       branchArray.push({
        label: item?.name,
        value:item?.id
       })
    })
     setBranchData(branchArray)
  },[userBranchList.userBranchListCount])
  useEffect(()=>{
    let taxAndGroupArray:any[] = [];
    groupAndTaxListItems?.map((item:any,index:number)=>{
      taxAndGroupArray.push({
        label: item?.group_name,
        value:item?.id
       })
    })
     setTaxAndGroupData(taxAndGroupArray)
  },[taxListState.groupAndTaxListCount])
  useEffect(()=>{
    props.handleClose();
  },[chargeState.addChargesCount])
  function defaultapplies_onordertypeGroupdata(taxGroup:OptionsFilter) {
    console.log(taxGroup,"taxGroup")
    let taxGroupArray = [];
    taxGroupArray.push(taxGroup)
    editChargesData.applyon_ordertype = [...editChargesData.applyon_ordertype, taxGroupArray[0]].join(", ")
  }
  function defaultapplies_onbranchdata(branch:OptionsFilter) {
    let branchArray = [];
    branchArray.push(branch)
    editChargesData.applyon_branches = [...editChargesData.applyon_branches, branchArray[0]].join(", ")
  }
  return (
    <>
      {props.modalName === "Create charges" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Charges </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    Name{" "}
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
                    setAddChargesData((prev:any)=>{
                      return {...prev, name:e.target.value}
                    })
                  }}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    Name Localized
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
                    setAddChargesData((prev:any)=>{
                      return {...prev, localname:e.target.value}
                    })
                  }}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    Type
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
                  <Select
                    isSearchable={true}
                    options={chargesType}
                    onChange={(e:any) => {
                      chargesPostData(e.value);
                    }}
                    placeholder="Choose...
                    "
                  />
                  {/* <FilterDropdown options={chargesType} postdata={chargesPostData}/> */}
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    Is Open Value{" "}
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
                  <Select
                    isSearchable={true}
                    options={deleteOptions}
                    onChange={(e:any) => {
                      chargesIsOpenValueData(e.value);
                    }}
                    placeholder="Choose..."
                  />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    Value (SAR)
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
                    setAddChargesData((prev:any)=>{
                      return {...prev, value:e.target.value}
                    })
                  }}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    Applies on Order Types
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
                  <FilterDropdown options={orderType} postdata={chargesTypeFunc}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    Tax Group
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
                  <Select
                    isSearchable={true}
                    options={taxAndGroupData}
                    onChange={(e:any) => {
                      chargesTaxAndGroupData(e.value);
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="radio"  name ="branch"  className={`${cx.radioinput}`} onChange={(e: any) => {
                    setAddChargesData((prev: any) => {
                      return { ...prev, applyon_branches: "all" };
                    });
                    setBranchState(false);
                    setErr("")
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
                    setAddChargesData((prev: any) => {
                      return { ...prev, applyon_branches: "" };
                    });
                  }}/>
                    Branch
                  </Form.Label>
                  <FilterDropdown options={branchData} postdata={chargesBranchFunc}/>
                  <p style={{color:"red"}}>{err}</p>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Label className={`${cx.checkboxlabel}`}>
                  <input type="checkbox" className={`${cx.checkboxinput}`} onChange={(e: any) => {
                    let check = e.target.checked === true ? 1 : 0
                    setAddChargesData((prev: any) => {
                      return { ...prev, applyon_order: check };
                    });
                  }}/>
                  Auto Apply Charge on Orders
                  {["top"].map((placement) => (
                    <OverlayTrigger
                      key={placement}
                      overlay={<Tooltip id={`tooltip-${placement}`}></Tooltip>}
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
                  <input type="checkbox" className={`${cx.checkboxinput}`} onChange={(e: any) => {
                    let check = e.target.checked === true ? 1 : 0
                    setAddChargesData((prev: any) => {
                      return { ...prev, applyon_ordersubtotal: check };
                    });
                  }}/>
                  Apply the charges to the order subtotal
                  {["top"].map((placement) => (
                    <OverlayTrigger
                      key={placement}
                      overlay={<Tooltip id={`tooltip-${placement}`}></Tooltip>}
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
                if(branchState===true && addChargesData.applyon_branches===""){
                  setErr("Branches Are Required")
                }else{
                dispatch(addCharges(addChargesData))
                setErr("");
                }
              }}>Save</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {props.modalName === "Edit charges" && (
        <Modal
        scrollable
        className={`${cx.ctsModal}`}
        show={props.show}
        onHide={props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Charges </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12} lg={12}>
              <Form.Group className={`${cx.formField}`}>
                <Form.Label className={`${cx.checkboxlabel}`}>
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
                <Form.Control type="text" placeholder="jkbkb" defaultValue={editChargesData.name} onChange={(e:any)=>{
                  editChargesData.name = e.target.value
                }}/>
              </Form.Group>
            </Col>
            <Col md={12} lg={12}>
              <Form.Group className={`${cx.formField}`}>
                <Form.Label className={`${cx.checkboxlabel}`}>
                  Name Localized
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
                <Form.Control type="text" placeholder="jkbkb" defaultValue={editChargesData.localname} onChange={(e:any)=>{
                  editChargesData.localname = e.target.value
                }}/>
              </Form.Group>
            </Col>
            <Col md={12} lg={12}>
              <Form.Group className={`${cx.formField}`}>
                <Form.Label className={`${cx.checkboxlabel}`}>
                  Type
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
                <Select
                    defaultValue={chargesType.map((item:any)=>{
                      if(item.value==editChargesData.type){
                        return {label:item.label, value:item.value}
                      }
                    })}
                    isSearchable={true}
                    options={chargesType}
                    onChange={(e:any) => {
                      chargesPostData(e.value);
                    }}
                    placeholder="Choose...
                    "
                  />
              </Form.Group>
            </Col>

            <Col md={12} lg={12}>
              <Form.Group className={`${cx.formField}`}>
                <Form.Label className={`${cx.checkboxlabel}`}>
                  Is Open Value{" "}
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
                <Select
                defaultValue={deleteOptions.map((item:any)=>{
                  if(item.value==editChargesData.isopenvalue){
                    return {label:item.label, value:item.value}
                  }
                })}
                    isSearchable={true}
                    options={deleteOptions}
                    onChange={(e:any) => {
                      chargesIsOpenValueData(e.value);
                    }}
                    placeholder="Choose..."
                  />
              </Form.Group>
            </Col>

            <Col md={12} lg={12}>
              <Form.Group className={`${cx.formField}`}>
                <Form.Label className={`${cx.checkboxlabel}`}>
                  Value (SAR)
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
                <Form.Control type="text" defaultValue={editChargesData.value} onChange={(e:any)=>{
                  editChargesData.value = e.target.value
                }}/>
              </Form.Group>
            </Col>
            <Col md={12} lg={12}>
              <Form.Group className={`${cx.formField}`}>
                <Form.Label className={`${cx.checkboxlabel}`}>
                  Applies on Order Types
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
                <FilterDropdown options={orderType} postdata={chargesTypeFunc}  defaultdata={defaultapplies_onordertypeGroupdata} defaultoptions={editChargesData?.applyon_ordertype?.split(",").map((item:any)=>{return {value:item, label:item}})}/>
              </Form.Group>
            </Col>
            <Col md={12} lg={12}>
              <Form.Group className={`${cx.formField}`}>
                <Form.Label className={`${cx.checkboxlabel}`}>
                  Tax Group
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
                <Select
                defaultValue={taxAndGroupData.map((item:any)=>{
                  if(item.value==editChargesData.taxgroup){
                    return {label:item.label, value:item.value}
                  }
                })}
                    isSearchable={true}
                    options={taxAndGroupData}
                    onChange={(e:any) => {
                      chargesTaxAndGroupData(e.value);
                    }}
                    placeholder="Choose...
                    "
                  />
              </Form.Group>
            </Col>

            <Col md={12} lg={12}>
              <Form.Group className={`${cx.formField}`}>
                <Form.Label className={`${cx.checkboxlabel}`}>
                  <input type="radio" name ="branch" className={`${cx.radioinput}`} defaultChecked={editChargesData.applyon_branches==="all" ? true : false} onChange={(e: any) => {
                    setBranchState(false);
                    setErr("")
                   let check = e.target.checked === true ? "all" : ""
                    editChargesData.applyon_branches = check
                  }}/>{" "}
                  Automatically apply on all existing and new branches
                </Form.Label>
              </Form.Group>
            </Col>

            <Col md={12} lg={12}>
              <Form.Group className={`${cx.formField}`}>
                <Form.Label className={`${cx.checkboxlabel} `}>
                  <input type="radio" name ="branch" className={`${cx.radioinput}`} defaultChecked={editChargesData.applyon_branches!=="all" ? true : false} onChange={(e: any) => {
                    setBranchState(true)
                    let check = e.target.checked === true ? "" : "all"
                    editChargesData.applyon_branches = check
                  }}/>
                  Branch
                </Form.Label>
                <FilterDropdown options={branchData} postdata={chargesBranchFunc}  defaultdata={defaultapplies_onbranchdata} defaultoptions={editChargesData?.applyon_branches!=="all" ? branchArray?.length>0 ? branchArray?.map((item:any)=>{return {value:item?.id, label:item?.english_name}}) : []  : [] }/>
                <p>{err}</p>
              </Form.Group>
            </Col>
            <Col md={12} lg={12}>
              <Form.Label className={`${cx.checkboxlabel}`}>
                <input type="checkbox" className={`${cx.checkboxinput}`} defaultChecked={editChargesData.applyon_order==="1" ? true : false} onChange={(e: any) => {
                    let check = e.target.checked === true ? 1 : 0
                    editChargesData.applyon_order = check.toString()
                  }}/>
                Auto Apply Charge on Orders
                {["top"].map((placement) => (
                  <OverlayTrigger
                    key={placement}
                    overlay={<Tooltip id={`tooltip-${placement}`}></Tooltip>}
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
                  <input type="checkbox" className={`${cx.checkboxinput}`} defaultChecked={editChargesData.applyon_ordersubtotal==="1" ? true : false} onChange={(e: any) => {
                    let check = e.target.checked === true ? 1 : 0
                    editChargesData.applyon_ordersubtotal = check.toString()
                  }}/>
                  Apply the charges to the order subtotal
                  {["top"].map((placement) => (
                    <OverlayTrigger
                      key={placement}
                      overlay={<Tooltip id={`tooltip-${placement}`}></Tooltip>}
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
             if(branchState===true && editChargesData.applyon_branches===""){
              setErr("Branches Are Required")
            }else{
            dispatch(addCharges(editChargesData))
            setErr("");
            }
            }}>Save</Button>
          </div>
        </Modal.Footer>
      </Modal>
      )}
    </>
  );
};

export default Modals;
