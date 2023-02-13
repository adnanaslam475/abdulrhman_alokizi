import React, { useCallback, useState, useEffect } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageAddPromotions.module.scss";
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
import { NavLink, useNavigate } from "react-router-dom";
import Select from "react-select";
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
  timefilter,
  orderType,
  discountTypeData,
} from "../../constants/dropdownconstants";
import { getProductApi, productDataListItems } from "../../redux_toolkit/reducer/manageMoreKitchenFlowApiReducer";
import { useDispatch, useSelector } from "react-redux";
import { userBranchFilterValue, userBranchList, userBranchListItems } from "../../redux_toolkit/reducer/manageBranchApiReducer";
import { tagsFilter, tagsList, tagsListItems } from "../../redux_toolkit/reducer/manageMoreTagsApiReducer";
import { changeStateAddPromotion, promotionsAdd } from "../../redux_toolkit/reducer/managePromotionsApiReducer";

export default function ManageAddPromotions() {
  const kitchenFlowState = useSelector((state:any)=>state.manageMoreKitchenFlowApiReducer)
  const userBranchState = useSelector((state:any)=>state.manageBranchApiReducer)
  const customerTagsState = useSelector((state:any)=>state.manageMoreTagsApiReducer)
  const promotionState = useSelector((state:any)=>state.managePromotionsApiReducer)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [promotionType, setPromotionType] = useState("");
  const [customerTagsData, setCustomerTagsData] = useState<any>()
  const [discountType, setDiscountType] = useState("1");
  const [productData, setProductData] = useState<any[]>([]);
  const [customerType, setCutomerType] = useState("");
  const [theyWill, setTheyWill] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<any>();
  const [showBranchData,setShowBranchData] = useState(false)
  const [err, setErr] = useState("");
  const [branchData, setBranchData] = useState<any[]>([])
  const [selectedTag, setSelectedTag] = useState<any>()
  const [showTagData, setShowTagData] = useState(false)
  const [addPromotion, setAddPromotion] = useState({
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

  function daysFunc(event: any) {
    setAddPromotion((prev: any) => {
      return { ...prev, days: event };
    });
  }
  function chargesTypeFunc(event: any) {
    setAddPromotion((prev: any) => {
      return { ...prev, ordertype: event };
    });
  }

  useEffect(()=>{
    const restaurantId = JSON.parse(localStorage.getItem("___data")!)
    dispatch(getProductApi({restaurent_id:restaurantId?.restaurant_id}))
    userBranchFilterValue.type = "all";
    dispatch(userBranchList(userBranchFilterValue));
    tagsFilter.type = "all"
     dispatch(tagsList(tagsFilter))
  },[])

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

  function productPostData(branch: string) {
    setAddPromotion((prev:any)=>{
      return {...prev, product_ids:branch}
    })
  }
  let branchArray:any[] = []
  function chargesBranchFunc(event: any) {
    setAddPromotion((prev:any)=>{
      return {...prev, branches_ids:event}
    })
    let data = event.split(",")
    branchData?.map((item:any)=>{
      for(let i=0; i<data?.length; i++){
        if(data[i]==item?.value)
        branchArray=[...branchArray, item]
      }
    })
    setSelectedBranch(branchArray)
    setErr("")
  }
  function showBranches(){
    setShowBranchData(true)
  }
  useEffect(()=>{
    let tagArray:any[] = []
    tagsListItems?.customertag?.map((e:any)=>{
      tagArray.push({
        label:e?.name,
        value:e?.id
      })
    })
    setCustomerTagsData(tagArray)    
  },[customerTagsState.tagsListCount])
  let tagsArray:any[] = []
  function tagFunc(event: any) {
    setAddPromotion((prev:any)=>{
      return {...prev, limitCustomerTag:event}
    })
    let data = event.split(",")
    customerTagsData?.map((item:any)=>{
      for(let i=0; i<data?.length; i++){
        if(data[i]==item?.value)
        tagsArray.push(item)
      }
    })
    setSelectedTag(tagsArray)
  }
  function showTags(){
    setShowTagData(true)
  }
  useEffect(()=>{
    if(promotionState.promotionsAddCount>0){
     navigate("/manage/promotions")
     dispatch(changeStateAddPromotion())
    }
  },[promotionState.promotionsAddCount])
  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <NavLink to="/manage/promotions" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={` d-flex ${st.rowTitleLeft}`}>
              <h5>New Promotion</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                 dispatch(promotionsAdd(addPromotion))
                }}
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
                      <Form.Control type="text" onChange={(e:any)=>{
                        setAddPromotion((prev:any)=>{
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
                      <Form.Control type="text" onChange={(e:any)=>{
                        setAddPromotion((prev:any)=>{
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
                      <Form.Control type="date" onChange={(e:any)=>{
                        setAddPromotion((prev:any)=>{
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
                      <Form.Control type="date" onChange={(e:any)=>{
                        setAddPromotion((prev:any)=>{
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
                      <Select
                    isSearchable={true}
                    options={timefilter}
                    onChange={(e:any) => {
                      setAddPromotion((prev:any)=>{
                        return {...prev, stime:e.value}
                      })
                    }}
                    placeholder="Choose...
                    "
                  />
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
                      <Select
                    isSearchable={true}
                    options={timefilter}
                    onChange={(e:any) => {
                      setAddPromotion((prev:any)=>{
                        return {...prev, etime:e.value}
                      })
                    }}
                    placeholder="Choose...
                    "
                  />
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Applies On Days{" "}
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
                      <FilterDropdown options={daysFilter} postdata={daysFunc}/>
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
                      <FilterDropdown options={orderType} postdata={chargesTypeFunc}/>
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
                      <Form.Control type="number" onChange={(e:any)=>{
                        setAddPromotion((prev:any)=>{
                          return {...prev, priority:e.target.value}
                        })
                      }}/>
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        <input
                          type="checkbox"
                          className={`${cy.checkboxinput}`}
                          onChange={(e: any) => {
                            let check = e.target.checked === true ? 1 : 0
                            setAddPromotion((prev: any) => {
                              return { ...prev, addmodifer: check };
                            });
                          }}
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
                        <input type="radio" name="promotionDetails" className={`${cy.radioinput}`}  onChange={(e: any) => {
                    setPromotionType("basic")
                    setAddPromotion((prev: any) => {
                      return { ...prev, promationtype: "0" };
                    });
                  }}/>
                        Basic
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className={`${cy.checkboxlabel} `}>
                        <input type="radio" name="promotionDetails" className={`${cy.radioinput}`} onChange={(e: any) => {
                     setPromotionType("advance")
                    setAddPromotion((prev: any) => {
                      return { ...prev, promationtype: "1" };
                    });
                  }}/>
                        Advance
                      </Form.Label>
                    </Form.Group>
                  </Col>

                  {
                    promotionType == "basic" ?
                   <>
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
                      defaultValue={discountTypeData[1]}
                    isSearchable={true}
                    options={discountTypeData}
                    onChange={(e:any) => {
                      setAddPromotion((prev:any)=>{
                        return {...prev, discounttype:e.value}
                      })
                      setDiscountType(e.value)
                    }}
                    placeholder="Choose...
                    "
                  />
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Discount Amount {discountType==="0" ? `(SAR)` : `(%)`}
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
                      <Form.Control type="number"  onChange={(e:any) => {
                      setAddPromotion((prev:any)=>{
                        return {...prev, discountamount:e.target.value}
                      })
                    }}/>
                    </Form.Group>
                  </Col>
                 {discountType==="1" && <Col md={12} lg={12}>
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
                      <Form.Control type="number" onChange={(e:any) => {
                      setAddPromotion((prev:any)=>{
                        return {...prev, maxdiscount:e.target.value}
                      })
                    }}/>
                    </Form.Group>
                  </Col>}
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
                      {/* <NavLink
                      className={`${cy.rightLabel}`}
                      to="#"
                    >
                      Select by tags or categories
                    </NavLink> */}
                    <FilterDropdown options={productData} postdata={productPostData}/>
                    </Form.Group>
                  </Col>
                  </> : ""
                  }
                  {
                    promotionType == "advance" ? 
                    <>
                      <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        When Customer
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
                        <input type="radio" name="Details" className={`${cy.radioinput}`}  onChange={(e: any) => {
                    setCutomerType("buys")
                    setAddPromotion((prev: any) => {
                      return { ...prev, whencustomer: "0" };
                    });
                  }}/>
                        Buys Quantity
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className={`${cy.checkboxlabel} `}>
                        <input type="radio" name="Details" className={`${cy.radioinput}`} onChange={(e: any) => {
                     setCutomerType("spends")
                    setAddPromotion((prev: any) => {
                      return { ...prev, whencustomer: "1" };
                    });
                  }}/>
                        Spends
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  </> : ""
                  }
                  {
                    customerType==="buys" ? 
                    <>
                    <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                      Quantity 
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
                      <Form.Control type="number"  onChange={(e:any) => {
                      setAddPromotion((prev:any)=>{
                        return {...prev, qty:e.target.value}
                      })
                    }}/>
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
                      {/* <NavLink
                      className={`${cy.rightLabel}`}
                      to="#"
                    >
                      Select by tags or categories
                    </NavLink> */}
                    <FilterDropdown options={productData} postdata={productPostData}/>
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        They will
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
                        <input type="radio" name="order" className={`${cy.radioinput}`}  onChange={(e: any) => {
                    setTheyWill("order")
                   setAddPromotion((prev: any) => {
                      return { ...prev, whencustomer: "0" };
                    });
                  }}/>
                        Get discount on order
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className={`${cy.checkboxlabel} `}>
                        <input type="radio" name="order" className={`${cy.radioinput}`} onChange={(e: any) => {
                   setTheyWill("product")
                   setAddPromotion((prev: any) => {
                      return { ...prev, whencustomer: "1" };
                    });
                  }}/>
                        Get discount on product
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className={`${cy.checkboxlabel} `}>
                        <input type="radio" name="order" className={`${cy.radioinput}`} onChange={(e: any) => {
                    setTheyWill("amount")
                    setAddPromotion((prev: any) => {
                      return { ...prev, whencustomer: "1" };
                    });
                  }}/>
                        Pay fixed amount
                      </Form.Label>
                    </Form.Group>
                  </Col>
                    </> : ""
                  }
                  {
                    customerType==="spends" ? 
                    <>
                    <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                      Amount (SAR) 
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
                      <Form.Control type="number"  onChange={(e:any) => {
                      setAddPromotion((prev:any)=>{
                        return {...prev, spendamount:e.target.value}
                      })
                    }}/>
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
                      {/* <NavLink
                      className={`${cy.rightLabel}`}
                      to="#"
                    >
                      Select by tags or categories
                    </NavLink> */}
                    <FilterDropdown options={productData} postdata={productPostData}/>
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        They will
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
                        <input type="radio" name="order" className={`${cy.radioinput}`}  onChange={(e: any) => {
                    setTheyWill("order")
                   setAddPromotion((prev: any) => {
                      return { ...prev, whencustomer: "0" };
                    });
                  }}/>
                        Get discount on order
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className={`${cy.checkboxlabel} `}>
                        <input type="radio" name="order" className={`${cy.radioinput}`} onChange={(e: any) => {
                   setTheyWill("product")
                   setAddPromotion((prev: any) => {
                      return { ...prev, whencustomer: "1" };
                    });
                  }}/>
                        Get discount on product
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  </> : ""
                  }
                  {
                    theyWill === "order" || theyWill === "product" ? 
                    <>
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
                      defaultValue={discountTypeData[1]}
                    isSearchable={true}
                    options={discountTypeData}
                    onChange={(e:any) => {
                      setAddPromotion((prev:any)=>{
                        return {...prev, discounttype:e.value}
                      })
                      setDiscountType(e.value)
                    }}
                    placeholder="Choose...
                    "
                  />
                    </Form.Group>
                  </Col>
                    <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Discount Amount {discountType==="0" ? `(SAR)` : `(%)`}
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
                      <Form.Control type="number"  onChange={(e:any) => {
                      setAddPromotion((prev:any)=>{
                        return {...prev, discountamount:e.target.value}
                      })
                    }}/>
                    </Form.Group>
                  </Col>
                 {discountType==="1" && <Col md={12} lg={12}>
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
                      <Form.Control type="number" onChange={(e:any) => {
                      setAddPromotion((prev:any)=>{
                        return {...prev, maxdiscount:e.target.value}
                      })
                    }}/>
                    </Form.Group>
                  </Col>}
                  </> :""
                  }
                  {
                    theyWill === "product" ? 
                    <>
                     <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                      Number of products
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
                      <Form.Control type="number"  onChange={(e:any) => {
                      setAddPromotion((prev:any)=>{
                        return {...prev, noOfProduct:e.target.value}
                      })
                    }}/>
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
                      {/* <NavLink
                      className={`${cy.rightLabel}`}
                      to="#"
                    >
                      Select by tags or categories
                    </NavLink> */}
                    <FilterDropdown options={productData} postdata={productPostData}/>
                    </Form.Group>
                  </Col>
                    </> : ""
                  }
                  {
                    theyWill === "amount" ? 
                    <>
                     <Col md={12} lg={12}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                      Fixed amount
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
                      <Form.Control type="number"  onChange={(e:any) => {
                      setAddPromotion((prev:any)=>{
                        return {...prev, fixedamount:e.target.value}
                      })
                    }}/>
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
                      {/* <NavLink
                      className={`${cy.rightLabel}`}
                      to="#"
                    >
                      Select by tags or categories
                    </NavLink> */}
                    <FilterDropdown options={productData} postdata={productPostData}/>
                    </Form.Group>
                  </Col>
                    </> : ""
                  }
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
                {
                  selectedBranch!=undefined && showBranchData===true ?
                  selectedBranch?.map((item:any)=>{
                    return item?.label
                  }) : 
                  <div className={`p-4 text-center ${table.noData}`}>
                You can add branches to this order for reporting or filtering orders later.
                </div>
                }
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
              {
                  selectedTag!=undefined && showTagData===true?
                  selectedTag?.map((item:any)=>{
                    return item?.label
                  }) : 
                  <div className={`p-4 text-center ${table.noData}`}>
                Select the customers who are eligible for this promotion.
                </div>
                }
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} err={err} setErr={setErr} chargesBranchFunc={chargesBranchFunc} showBranches={showBranches} selectedBranch={selectedBranch} customerTagsData={customerTagsData} tagFunc={tagFunc} selectedTag={selectedTag} showTags={showTags}/>
    </>
  );
}
