import React, { Fragment, useState, useEffect } from "react";
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
import { NavLink, useNavigate, useParams } from "react-router-dom";
import food from "../../images/edit-images.png";
import {
  choosefilter,
  tagoptions,
  ordertypefilter,
  discountType,
  qualificationData,
  orderType,
} from "../../constants/dropdownconstants";
import { FilterDropdown } from "../Dropdown/Dropdowns";
import Select from "react-select";
import { addDiscount, deleteBoolean, deleteDiscount, discountDetailPerId, discountFilterValue, discountList, discountOnBranch, discountOnTag, discountTagListItems, editDiscount } from "../../redux_toolkit/reducer/manageDiscountApiReducer";
import { useDispatch, useSelector } from "react-redux";
import { branchData, branchGet } from "../../redux_toolkit/reducer/manageDeviceApiReducer";
import { productTagModifier, tagIngeModifier } from "../../redux_toolkit/reducer/menuProductsApiReducer";

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
  
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();
  const addDiscountCount = useSelector((state:any)=>state.manageDiscountApiReducer.addDiscountCount)
  const editDiscountCount = useSelector((state:any)=>state.manageDiscountApiReducer.editDiscountCount)
  const discountDetailCount = useSelector((state:any)=>state.manageDiscountApiReducer.discountDetailCount)
  const discountBranchCount = useSelector((state:any)=>state.manageDiscountApiReducer.discountBranchCount)
  const discountTagCount = useSelector((state:any)=>state.manageDiscountApiReducer.discountTagCount)
  const deleteDiscountCount = useSelector((state:any)=>state.manageDiscountApiReducer.deleteDiscountCount)
  const [ordertype, setOrderType] = useState("");
  const [advanceOptions, setadvanceOptions] = useState(false);
  const [inventoryItems, setinventoryItems] = useState(false);
  const [discountData, setDiscountData] = useState({
    name: "" ,
qualification: "" ,
name_localized: "" ,
discount_type: "", 
reference: "" ,
taxable: "" ,
restaurant_id: "", 
amount: "",
  })
  const [editDiscountData, setEditDiscountData] = useState({
    name: "" ,
qualification: "" ,
name_localized: "" ,
discount_type: "", 
reference: "" ,
taxable: "" ,
discount_id: param?.id, 
amount: "",
minimum_order_price:"",
      maximum_discount:"",
      applies_onordertype:""
  })
  const [branches, setBranches] = useState<any>({
    discount_id:param?.id,
    branch_id:"",
  })
  const [tags, setTags] = useState<any>({
    discount_id:param?.id,
    tag_id:"",
  })
  const orderTypehandler = (event: any) => {
    setOrderType(event.label);
  };

  let sizeadvanceoptions = advanceOptions ? 6 : 12;

  const [subshow, setsubShow] = useState(false);
  const [submodalName, setsubModalName] = useState("");
  const [err, setErr] = useState("");
  const subdeliveryAddress = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow");
    setsubModalName(modalname);
    setsubShow(status);
  };
  const [dType, setDType] = useState("");
  const subhandleClose = () => {
    setsubShow(false);
    setsubModalName("");
  };

  function discount(event: any) {
    setDiscountData((prev: any) => {
      return { ...prev, discount_type: event.label };
    });
    setDType(event.label)
  }

  function editDiscountFunc(event: any) {
    setEditDiscountData((prev: any) => {
      return { ...prev, discount_type: event.label };
    });
    setDType(event.label)
  }

  
  function qualification(event: any) {
    setDiscountData((prev: any) => {
      return { ...prev, qualification: event.label };
    });
  }

  function editQualification(event: any) {
    setEditDiscountData((prev: any) => {
      return { ...prev, qualification: event.label };
    });
  }

  useEffect(()=>{
    let data:any = JSON.parse(localStorage.getItem("___data")!)
    setDiscountData((prev: any) => {
      return { ...prev, restaurant_id: data?.restaurant_id };
    });
  },[])

  useEffect(()=>{
    props.handleClose();
    discountFilterValue.type = "all";
    dispatch(discountList(discountFilterValue));
  },[addDiscountCount])

  useEffect(()=>{
    props.handleClose();
  },[editDiscountCount, discountBranchCount, discountTagCount, deleteDiscountCount])

  useEffect(()=>{
if(deleteDiscountCount===true){
  navigate("/manage/discounts")
  dispatch(deleteBoolean())
}
  },[deleteDiscountCount])

  useEffect(()=>{
    setEditDiscountData({
      name: discountDetailPerId?.english_name ,
      qualification: discountDetailPerId?.type ,
      name_localized: discountDetailPerId?.arabic_name ,
      discount_type: discountDetailPerId?.discount_type, 
      reference: discountDetailPerId?.reference ,
      taxable: discountDetailPerId?.taxable ,
      discount_id: param?.id, 
      amount: discountDetailPerId?.amount,
      minimum_order_price: discountDetailPerId?.maximum_discount,
      maximum_discount: discountDetailPerId?.minimum_order_price,
      applies_onordertype:discountDetailPerId?.applies_onordertype
    })
  },[discountDetailCount])

  useEffect(()=>{
    dispatch(branchGet({type:"branch"}))
  },[])

  function branchDataSelected(data: string) {
    setBranches((prev:any)=>{
      return {...prev, branch_id:data}
    })
  }
  function defaultBranch(taxGroup:OptionsFilter) {
    console.log(taxGroup,"taxGroup")
    let taxGroupArray = [];
    taxGroupArray.push(taxGroup)
    branches.branch_id = [...branches.branch_id, taxGroupArray[0]].join(", ")
  }
  function tagPostdata(tag: string) {
    setTags((prev:any)=>{return {...prev, tag_id: tag}})
  }
  function defaultTag(taxGroup:OptionsFilter) {
    console.log(taxGroup,"taxGroup")
    let taxGroupArray = [];
    taxGroupArray.push(taxGroup)
    tags.tag_id = [...tags.tag_id, taxGroupArray[0]].join(", ")
  }
  function defaultapplies_onordertypeGroupdata(taxGroup:OptionsFilter) {
    console.log(taxGroup,"taxGroup")
    let taxGroupArray = [];
    taxGroupArray.push(taxGroup)
    editDiscountData.applies_onordertype = [...editDiscountData.applies_onordertype, taxGroupArray[0]].join(", ")
  }
  function orderTypeFunc(event: any) {
    setEditDiscountData((prev: any) => {
      return { ...prev, applies_onordertype: event };
    });
  }
  return (
    <>
      {/* START create role */}
      {props.modalName === "Create discount" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={()=>{props.handleClose()
            setDType("");
            setErr("");
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create discount</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                  <Form.Control type="text"  onChange={(e: any) => {
                    setDiscountData((prev: any) => {
                      return { ...prev, name: e.target.value };
                    });
                  }}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Qualification
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
                    options={qualificationData}
                    onChange={(e:any) => {
                      qualification(e);
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
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
                  <Form.Control type="text" onChange={(e: any) => {
                    setDiscountData((prev: any) => {
                      return { ...prev, name_localized: e.target.value };
                    });
                  }}/>
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
                  <Select
                    isSearchable={true}
                    options={discountType}
                    onChange={(e:any) => {
                      discount(e);
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
              {dType==="Fixed" ? <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Discount Amount (SAR) 
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
                  <Form.Control type="number" maxLength={editDiscountData.discount_type=="Fixed" ? 100000000000000000 : 2} onChange={(e: any) => {
                    setDiscountData((prev: any) => {
                      return { ...prev, amount: e.target.value };
                    });
                  }}/>
                </Form.Group>
              </Col> : dType==="Percentage" ? <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Discount Amount %
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
                  <Form.Control type="number" onChange={()=>setErr("")} onBlur={(e: any) => {
                    if(e.target.value>100){
                      setErr("You can not set percentage greater than 100")
                    }else{
                    setDiscountData((prev: any) => {
                      return { ...prev, amount: e.target.value+"%" };
                    });
                  }
                  }}/>
                  <p style={{color:"red"}}>{err}</p>
                </Form.Group>
              </Col> : ""}
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
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
                  <Form.Control type="text" onChange={(e: any) => {
                    setDiscountData((prev: any) => {
                      return { ...prev, reference: e.target.value };
                    });
                  }}/>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="checkbox" className={`${cx.checkboxinput}`}  onChange={(e: any) => {
                    let check = e.target.checked === true ? 1 : 0
                    setDiscountData((prev: any) => {
                      return { ...prev, taxable: check };
                    });
                  }}/>{" "}
                    Taxable
                  </Form.Label>
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
                  setDType("");
                }}
              >
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={()=>{
                 if(+discountData.amount>100){
                  setErr("You can not set percentage greater than 100")
                 }else{
                  setErr("")
                  setDType("")
                dispatch(addDiscount(discountData))
                 }
              }}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {/* Edit Role  */}
      {props.modalName === "edit discount" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={()=>{props.handleClose()
            setErr("");
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Discount </Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                  <Form.Control type="text" defaultValue={editDiscountData?.name} onChange={(e: any) => {
                    setEditDiscountData((prev: any) => {
                      return { ...prev, name: e.target.value };
                    });
                  }}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
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
                  <Form.Control type="text" defaultValue={editDiscountData?.name_localized}  onChange={(e: any) => {
                    setEditDiscountData((prev: any) => {
                      return { ...prev, name_localized: e.target.value };
                    });
                  }}/>
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
                  <Select
                    isSearchable={true}
                    defaultValue={discountType.map((item) => {
                      if(item.value === editDiscountData.discount_type){
                      return { value: item.value, label: item.label };
                      }
                    })}
                    options={discountType}
                    onChange={(e:any) => {
                      editDiscountFunc(e);
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    {editDiscountData.discount_type=="Fixed" ? "Discount Amount (SAR)" : "Discount Amount %"}
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
                  <Form.Control type="text" placeholder="10" defaultValue={editDiscountData?.amount} maxLength={editDiscountData.discount_type=="Fixed" ? 100000000000000000 : 2} onChange={()=>{setErr("")}}  onBlur={(e: any) => {
                    if(editDiscountData.discount_type=="Percentage" && e.target.value>100){
                      setErr("You can not set percentage greater than 100")
                    }else{
                    setEditDiscountData((prev: any) => {
                      return { ...prev, amount: e.target.value };
                    });
                    setErr("");
                  }
                  }}/>
                  <p style={{color:"red"}}>{err}</p>
                </Form.Group>
              </Col>
             {editDiscountData.discount_type=="Percentage" && <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Maximum Discount
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
                  <Form.Control type="text" placeholder="10000" defaultValue={editDiscountData?.maximum_discount}  onChange={(e: any) => {
                    setEditDiscountData((prev: any) => {
                      return { ...prev, maximum_discount: e.target.value };
                    });
                  }}/>
                </Form.Group>
              </Col>}
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Minimum Order (SAR)
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
                  <Form.Control type="text" placeholder="any" defaultValue={editDiscountData?.minimum_order_price}  onChange={(e: any) => {
                    setEditDiscountData((prev: any) => {
                      return { ...prev, minimum_order_price: e.target.value };
                    });
                  }}/>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Applies On Order Types
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
                  <FilterDropdown options={orderType} postdata={orderTypeFunc}  defaultdata={defaultapplies_onordertypeGroupdata} defaultoptions={editDiscountData?.applies_onordertype?.split(",").map((item:any)=>{return {value:item, label:item}})}/>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
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
                  <Form.Control type="text" placeholder="any" defaultValue={editDiscountData?.reference}  onChange={(e: any) => {
                    setEditDiscountData((prev: any) => {
                      return { ...prev, reference: e.target.value };
                    });
                  }}/>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="checkbox" className={`${cx.checkboxinput}`} defaultChecked={editDiscountData.taxable=="1" ? true : false} onChange={(e: any) => {
                    let check = e.target.checked === true ? 1 : 0
                    setEditDiscountData((prev: any) => {
                      return { ...prev, taxable: check };
                    });
                  }}/>{" "}
                    Taxable
                  </Form.Label>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className={`${cx.bottomRight}`}>
          <div><NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`} onClick={()=>{
            dispatch(deleteDiscount({discount_id:param?.id}))
          }}>Delete Discount</NavLink></div>
            <div>
              <Button
                className={`${cx.btnClose}`}
                onClick={() => {
                  props.handleClose();
                  setOrderType("");
                  setErr("");
                }}
              >
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={()=>{
                if(+editDiscountData.amount>100){
                  setErr("You can not set percentage greater than 100")
                 }else{
                  setErr("")
                  dispatch(editDiscount(editDiscountData))
                 }
              }}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {/* edit branches */}

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
                    <input type="radio" className={`${cx.radioinput}`} />{" "}
                    Automatically apply on all existing and new branches
                  </Form.Label>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel} `}>
                    <input type="radio" className={`${cx.radioinput}`} />
                    Branch
                    
                  </Form.Label>
                  <NavLink
                      className={`${cx.rightLabel}`}
                      to="#"
                      onClick={() => {
                        setinventoryItems(true);
                      }}
                    >
                      {/* Select by tags? */}
                    </NavLink>
                  <FilterDropdown options={branchData} postdata={branchDataSelected} defaultdata={defaultBranch} defaultoptions={discountDetailPerId?.branch.map((item:any)=>{return{value:item?.branch?.id,label:item?.branch?.english_name}})} />
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
                dispatch(discountOnBranch(branches))
              }}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {/*  discount ADD TAG  */}

      {props.modalName === "add customer tags" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Tags</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Limit To Customer Tags
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
                  <FilterDropdown options={tagIngeModifier} postdata={tagPostdata} defaultdata={defaultTag} defaultoptions={discountTagListItems?.map((item:any)=>{return {value:item?.id, label:item?.name}})}/>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div></div>
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
                dispatch(discountOnTag(tags))
              }}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Modals;
