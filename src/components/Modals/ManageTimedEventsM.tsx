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
import Select from "react-select";
import { FilterDropdown } from "../Dropdown/Dropdowns";

import {
    choosefilter,daysFilter,filtertagoptions,
    orderType,
    SelectallFilter,timeEventType,timefilter
  } from "../../constants/dropdownconstants";
import { addTimeEvent, applyOnBranchEvent, applyOnCategoryData, applyOnProductData, applyOnProductTagsData, deleteTimeEvent, editTimeEvent, timeEventPerIdData } from "../../redux_toolkit/reducer/manageTimeEventApiReducer";
import { useDispatch, useSelector } from "react-redux";
import { userBranchListItems } from "../../redux_toolkit/reducer/manageBranchApiReducer";
import { categoryListItems } from "../../redux_toolkit/reducer/menuCategoriesApiReducer";
import { productDataListItems } from "../../redux_toolkit/reducer/manageMoreKitchenFlowApiReducer";
import { tagIngeModifier } from "../../redux_toolkit/reducer/menuProductsApiReducer";

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
  const addTimeEventListCount:any = useSelector((state:any)=>state.manageTimeEventApiReducer.addTimeEventListCount)
 const timeEventPerIdCount:any = useSelector((state:any)=>state.manageTimeEventApiReducer.timeEventPerIdCount)
 const editTimeEventCount:any = useSelector((state:any)=>state.manageTimeEventApiReducer.editTimeEventCount)
 const eventTimeState:any = useSelector((state:any)=>state.manageTimeEventApiReducer)
 const userBranchList = useSelector((state:any)=>state.manageBranchApiReducer)
 const addTimeEventListState = useSelector((state:any)=>state.manageTimeEventApiReducer)
 const kitchenFlowState = useSelector((state:any)=>state.manageMoreKitchenFlowApiReducer)
  const [ordertype, setOrderType] = useState("");
  const [advanceOptions, setadvanceOptions] = useState(false);
  const [inventoryItems, setinventoryItems] = useState(false);
  const [branchData, setBranchData] = useState<any[]>([])
  const [productData, setProductData] = useState<any[]>([])
  const [addTimeEventData, setTimeEventData] = useState({
    event_id:"",
 english_name:"",
 arabic_name:"",
 event_type:"Set Fixed Price",
 value:"",
 from_date1:"",
 from_date2:"",
 restaurant_id:""
  })

  const [editTimeEventData, setEditTimeEventData] = useState({
    event_id:"",
 english_name:"",
 arabic_name:"",
 event_type:"",
 value:"",
 from_date1:"",
 from_date2:"",
 days:"",
 from_time2:"",
 from_time1:"",
 priority:"",
 applies_onordertype:""
  })

  useEffect(()=>{
    setEditTimeEventData((prev:any)=>{
      return { ...prev, event_id: param?.id}
    })
  },[])
  const orderTypehandler = (event: any) => {
    setOrderType(event.label);
  };

  let sizeadvanceoptions = advanceOptions ? 6 : 12;

  const [subshow, setsubShow] = useState(false);
  const [submodalName, setsubModalName] = useState("");
  const [branchState, setBranchState] = useState(false);
  const [err, setErr] = useState("");
  const [category, setCategory] = useState<any[]>([])
  const [catIds, setCatIds] = useState<any[]>([])
  const [productIds, setProductIds] = useState<any[]>([])
  const [tagIds, setTagIds] = useState<any[]>([])
  const [applyBranchData, setApplyBranchData] = useState({
    branch_ids:"",
    event_id:""
  })
  const [applyCategoryData, setApplyCategoryData] = useState({
    cate_ids:"",
    event_id:""
  })
  const [applyProductData, setApplyProductData] = useState({
    prod_ids:"",
    event_id:""
  })
  const [tags, setTags] = useState({
    tag_ids:"",
    event_id:""
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

  
  useEffect(()=>{
    let data:any = JSON.parse(localStorage.getItem("___data")!)
    setTimeEventData((prev: any) => {
      return { ...prev, restaurant_id: data?.restaurant_id };
    });
    setApplyBranchData((prev:any)=>{
      return {...prev, event_id: param?.id}
    })
    setApplyCategoryData((prev:any)=>{
      return {...prev, event_id: param?.id}
    })
    setApplyProductData((prev:any)=>{
      return {...prev, event_id: param?.id}
    })
    setTags((prev:any)=>{
      return {...prev, event_id: param?.id}
    })
  },[])

  function editType(event: any) {
    setTimeEventData((prev: any) => {
      return { ...prev, event_type: event.label };
    });
  }

  function editEditType(event: any) {
    setEditTimeEventData((prev: any) => {
      return { ...prev, event_type: event.label };
    });
  }

  useEffect(()=>{
    props.handleClose()
  },[addTimeEventListCount,editTimeEventCount, addTimeEventListState.applyOnBranchEventCount, addTimeEventListState.applyCategoryDataCount, addTimeEventListState.applyOnProductDataCount, addTimeEventListState.applyOnProductTagsDataCount])

  useEffect(()=>{
    let data:any = timeEventPerIdData
    setEditTimeEventData({
      event_id: `${param?.id}`,
 english_name:data?.english_name,
 arabic_name:data?.arabic_name,
 event_type:data?.event_type,
 value:data?.value,
 from_date1:data?.from_date1,
 from_date2:data?.from_date2,
 days:data?.days,
 from_time2:data?.from_time2,
 from_time1:data?.from_time1,
 priority:data?.priority,
 applies_onordertype:data?.applies_onordertype
    })
    let idsOfCats:any[] = []
    idsOfCats = timeEventPerIdData?.category?.split(",")
    setCatIds(idsOfCats)
    let idsOfProduct = timeEventPerIdData?.product?.split(",")
    setProductIds(idsOfProduct)
    let idOfTags = timeEventPerIdData?.tags?.split(",")
    setTagIds(idOfTags)
  },[timeEventPerIdCount])

  console.log(catIds,"cataxat");
  
  function chargesBranchFunc(event: any) {
    setApplyBranchData((prev:any)=>{
      return {...prev, branch_ids: event}
    })
    setErr("")
  }
  function chargesCategoryFunc(event: any) {
    setApplyCategoryData((prev:any)=>{
      return {...prev, cate_ids: event}
    })
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

  function startHourFunc(event: any) {
    setEditTimeEventData((prev: any) => {
      return { ...prev, from_time1: event.label };
    });
  }
  function endHourFunc(event: any) {
    setEditTimeEventData((prev: any) => {
      return { ...prev, from_time2: event.label };
    });
  }
  function daysFunc(event: any) {
    setEditTimeEventData((prev: any) => {
      return { ...prev, days: event };
    });
  }
  function orderTypeFunc(event: any) {
    setEditTimeEventData((prev: any) => {
      return { ...prev, applies_onordertype: event };
    });
  }
  function defaultTaxGroupdata(taxGroup:OptionsFilter) {
    console.log(taxGroup,"taxGroup")
    let taxGroupArray = [];
    taxGroupArray.push(taxGroup)
    editTimeEventData.days = [...editTimeEventData.days, taxGroupArray[0]].join(", ")
  }

  function defaultapplies_onordertypeGroupdata(taxGroup:OptionsFilter) {
    console.log(taxGroup,"taxGroup")
    let taxGroupArray = [];
    taxGroupArray.push(taxGroup)
    editTimeEventData.applies_onordertype = [...editTimeEventData.applies_onordertype, taxGroupArray[0]].join(", ")
  }

  function defaultapplies_onbranchdata(branch:OptionsFilter) {
    let branchArray = [];
    branchArray.push(branch)
    applyBranchData.branch_ids = [...applyBranchData.branch_ids, branchArray[0]].join(", ")
  }

  function defaultapplies_oncategorydata(branch:OptionsFilter) {
    let branchArray = [];
    branchArray.push(branch)
    applyCategoryData.cate_ids = [...applyCategoryData.cate_ids, branchArray[0]].join(", ")
  }

  function defaultapplies_onproductdata(branch:OptionsFilter) {
    let branchArray = [];
    branchArray.push(branch)
    applyProductData.prod_ids = [...applyProductData.prod_ids, branchArray[0]].join(", ")
  }

  useEffect(()=>{
     if(eventTimeState.deleteTimeEventCount>0){
      navigate("/manage/timed-events")
      eventTimeState.deleteTimeEventCount = 0
     }
  },[eventTimeState.deleteTimeEventCount])

  useEffect(()=>{
    const category:any[] = []
    categoryListItems?.map((item:any, index:number)=>{
      category.push({
        label: item.name,
        value: item.id
      })
    })
    setCategory(category)
   
  },[categoryListItems])

  useEffect(()=>{
    let productArray:any[] = []
    productDataListItems?.map((item:any,index:number)=>{
      productArray.push({
        label:item?.name,
        value:item?.id
      })
    })
    setProductData(productArray)
  },[kitchenFlowState.getProductApiCount])

  function productPostData(branch: string) {
    setApplyProductData((prev:any)=>{
      return {...prev, prod_ids:branch}
    })
  }
  function tagPostdata(tag: string) {
    setTags((prev:any)=>{return {...prev, tag_ids: tag}})
  }
  function defaultTag(taxGroup:OptionsFilter) {
    console.log(taxGroup,"taxGroup")
    let taxGroupArray = [];
    taxGroupArray.push(taxGroup)
    tags.tag_ids = [...tags.tag_ids, taxGroupArray[0]].join(", ")
  }
  return (
    <>

{/* create timed events */}
{props.modalName === "Create Time Events" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Timed Event </Modal.Title>
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
                    setTimeEventData((prev: any) => {
                      return { ...prev, english_name: e.target.value };
                    });
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
                    setTimeEventData((prev: any) => {
                      return { ...prev, arabic_name: e.target.value };
                    });
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
                    options={timeEventType}
                    onChange={(e:any) => {
                      editType(e);
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
             {addTimeEventData.event_type == "Activate Products" || addTimeEventData.event_type=="Deactivate Products" ? "" :
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    {
                      addTimeEventData.event_type == "Set Fixed Price" ? "Fixed Price (SAR) *" : 
                      addTimeEventData.event_type == "Reduce Price by Fixed Amount" || addTimeEventData.event_type == "Increase Price by Fixed Amount" ? "Amount (SAR) * " : "Amount (%) * "
                    }                 
                  </Form.Label>
                  <Form.Control type="text" onChange={(e:any)=>{
                    setTimeEventData((prev: any) => {
                      return { ...prev, value: e.target.value };
                    });
                  }}/>
                </Form.Group>
              </Col>
              }
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                  Start Date 
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
                    setTimeEventData((prev: any) => {
                      return { ...prev, from_date1: e.target.value };
                    });
                  }}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    End Date{["top"].map((placement) => (
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
                    setTimeEventData((prev: any) => {
                      return { ...prev, from_date2: e.target.value };
                    });
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
                dispatch(addTimeEvent(addTimeEventData))
              }}>Save</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
{props.modalName === "Edit Time Events" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Timed Event </Modal.Title>
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
                  <Form.Control type="text" placeholder="developer testing" defaultValue={editTimeEventData?.english_name} onChange={(e:any)=>{
                     setEditTimeEventData((prev: any) => {
                      return { ...prev, english_name: e.target.value };
                    });
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
                  <Form.Control type="text" placeholder="developer testing" defaultValue={editTimeEventData?.arabic_name} onChange={(e:any)=>{
                     setEditTimeEventData((prev: any) => {
                      return { ...prev, arabic_name: e.target.value };
                    });
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
                    defaultValue={timeEventType.map((item) => {
                      if(item.value === editTimeEventData.event_type){
                      return { value: item.value, label: item.label };
                      }
                    })}
                    options={timeEventType}
                    onChange={(e:any) => {
                      editEditType(e);
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
             {editTimeEventData.event_type == "Activate Products" || editTimeEventData.event_type=="Deactivate Products" ? "" :
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                  {
                      editTimeEventData.event_type == "Set Fixed Price" ? "Fixed Price (SAR) *" : 
                      editTimeEventData.event_type == "Reduce Price by Fixed Amount" || editTimeEventData.event_type == "Increase Price by Fixed Amount" ? "Amount (SAR) * " : "Amount (%) * "
                    } 
                  </Form.Label> 
                  <Form.Control type="text" placeholder="2341" defaultValue={editTimeEventData?.value} onChange={(e:any)=>{
                     setEditTimeEventData((prev: any) => {
                      return { ...prev, value: e.target.value };
                    });
                  }}/>
                </Form.Group>
              </Col> 
              }
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                  Start Date 
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
                  <Form.Control type="text" placeholder="2021-01-11" defaultValue={editTimeEventData?.from_date1} onChange={(e:any)=>{
                     setEditTimeEventData((prev: any) => {
                      return { ...prev, from_date1: e.target.value };
                    });
                  }}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    End Date{["top"].map((placement) => (
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
                  <Form.Control type="text" placeholder="2021-01-01" defaultValue={editTimeEventData?.from_date2} onChange={(e:any)=>{
                     setEditTimeEventData((prev: any) => {
                      return { ...prev, from_date2: e.target.value };
                    });
                  }}/>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    Start Hour {["top"].map((placement) => (
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
                   defaultValue={timefilter.map((item) => {
                    if(item.value === editTimeEventData.from_time1){
                    return { value: item.value, label: item.label };
                    }
                  })}
                    isSearchable={true}
                    options={timefilter}
                    onChange={(e:any) => {
                      startHourFunc(e);
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    End Hour {["top"].map((placement) => (
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
                  defaultValue={timefilter.map((item) => {
                    if(item.value === editTimeEventData.from_time2){
                    return { value: item.value, label: item.label };
                    }
                  })}
                    isSearchable={true}
                    options={timefilter}
                    onChange={(e:any) => {
                      endHourFunc(e);
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                   Days {["top"].map((placement) => (
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
                  <FilterDropdown options={daysFilter} postdata={daysFunc} defaultdata={defaultTaxGroupdata} defaultoptions={editTimeEventData?.days?.split(",").map((item:any)=>{return {value:item, label:item}})}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    Applies On Order Types {["top"].map((placement) => (
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
                  <FilterDropdown options={orderType} postdata={orderTypeFunc}  defaultdata={defaultapplies_onordertypeGroupdata} defaultoptions={editTimeEventData?.days?.split(",").map((item:any)=>{return {value:item, label:item}})}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    Priority{["top"].map((placement) => (
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
                  <Form.Control type="number" placeholder="10" defaultValue={editTimeEventData?.priority} onChange={(e:any)=>{
                     setEditTimeEventData((prev: any) => {
                      return { ...prev, priority: e.target.value };
                    });
                  }}/>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className={`${cx.bottomRight}`}>
          <div>
              <NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`} onClick={()=>{
                dispatch(deleteTimeEvent({id:param?.id}))
              }}>
                Delete Time Event
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
                dispatch(editTimeEvent(editTimeEventData))
              }}>Save</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
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
                    
                  }}/>
                    Branch
                  </Form.Label>
                  <FilterDropdown options={branchData} defaultdata={defaultapplies_onbranchdata} postdata={chargesBranchFunc} defaultoptions={timeEventPerIdData?.branchesdata.map((item:any)=>{return{value:item?.id,label:item?.english_name}})}/>
                  <p style={{color:"red"}}>{err}</p>
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
                if(branchState===true && applyBranchData.branch_ids===""){
                  setErr("Branches Are Required")
                }else{
                  dispatch(applyOnBranchEvent(applyBranchData))
                setErr("");
                }
                }}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      
       {props.modalName === "Edit Categories" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title> Categories</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                   Categories
                  </Form.Label>
                  <FilterDropdown  options={category} defaultdata={defaultapplies_oncategorydata} postdata={chargesCategoryFunc} defaultoptions={timeEventPerIdData?.catdata?.map((item:any,index:number)=>{return{value:+catIds[index],label:item?.name}})}/>
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
                dispatch(applyOnCategoryData(applyCategoryData))
              }}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}



{props.modalName === "edit product" && (
        <Modal
        scrollable
        className={`${cx.ctsModal}`}
        show={props.show}
        onHide={props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Products </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12} lg={12}>
              <Form.Group className={`${cx.formField}`}>
                <Form.Label className={`${cx.checkboxlabel}`}>
                  Table {["top"].map((placement) => (
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
                <FilterDropdown options={productData} defaultdata={defaultapplies_onproductdata} postdata={productPostData} defaultoptions={timeEventPerIdData?.productdata?.map((item:any,index:number)=>{return{value:+productIds[index],label:item?.name}})}/>
              </Form.Group>
            </Col>
            
          </Row>
        </Modal.Body>
        <Modal.Footer className={`${cx.bottomRight}`} >

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
              dispatch(applyOnProductData(applyProductData))
            }}>Save</Button>
          </div>
        </Modal.Footer>
      </Modal>
      )}



{props.modalName === "Applies On Tags" && (
        <Modal
        className={`${cx.ctsModal}`}
        show={props.show}
        onHide={props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12} lg={12}>
              <Form.Group className={`${cx.formField}`}>
                <Form.Label>
                Applies On Product Tags
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
                <FilterDropdown options={tagIngeModifier} postdata={tagPostdata} defaultdata={defaultTag} defaultoptions={timeEventPerIdData?.tagsname?.map((item:any,index:number)=>{return {value:tagIds[index], label:item?.name}})}/>
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
              dispatch(applyOnProductTagsData(tags))
            }}>Apply</Button>
          </div>
        </Modal.Footer>
      </Modal>
      )}

    </>
  );
};

export default Modals;
