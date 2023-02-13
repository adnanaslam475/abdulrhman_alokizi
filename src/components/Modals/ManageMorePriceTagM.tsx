import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import cx from './Modals.module.scss';
import Select from 'react-select';
import { FilterDropdown, SingleFilterDropdown } from "../Dropdown/Dropdowns";
import { costanalysisitems, costcategories, costanalysisfilter, reportsfilterordertags, reportsordertags, filterinventory  } from '../../constants/dropdownconstants'
import IoIosInformationCircleOutline, { AiOutlineInfoCircle } from 'react-icons/ai';
import { NavLink, useNavigate } from "react-router-dom";
import { tagsFilter, tagsList, tagsListItems } from "../../redux_toolkit/reducer/manageMoreTagsApiReducer";
import { useDispatch, useSelector } from "react-redux";
import { Event } from "react-toastify/dist/core";
import { userBranchFilterValue, userBranchList, userBranchListItems } from "../../redux_toolkit/reducer/manageBranchApiReducer";
import { addPriceTags, addProductsInPriceTag, comboGroupList, comboGroupListData, comboGroupOptionList, comboGroupOptionListData, comboSize, comboSizeList, deletePriceTag, editModifierPrices, editProductPrices, editSingleCombo, editSingleModifierOption, editSingleProductPrice, priceTagComboAdd, priceTagComboDelete, priceTagComboEdit, priceTagModifierAddDelete, priceTagModifierList, priceTagModifierListData, priceTagViewDetails } from "../../redux_toolkit/reducer/manageMorePriceTagsApiReducer";
import { getProductApi, productDataListItems } from "../../redux_toolkit/reducer/manageMoreKitchenFlowApiReducer";
import { comboFilterValue, comboList, comboListItems } from "../../redux_toolkit/reducer/menuComboApiReducer";
interface OptionsFilter {
  value: any;
  label: string;
  key?: string;
  disabled?: boolean;
}


const Modals = (props: any) => {
  const options = [
    {
      value: '1', label: 'Pick up',
    },
    {
      value: '2', label: 'Delivery',
    },
  ]
  const deliveryzone = [
    {
      value: '1', label: 'Shipping',
    },
    {
      value: '2', label: 'Ordered',
    },
  ]
  const customerTagsState = useSelector((state:any)=>state.manageMoreTagsApiReducer)
  const userBranchState = useSelector((state:any)=>state.manageBranchApiReducer)
  const priceTagState = useSelector((state:any)=>state.manageMorePriceTagsApiReducer)
  const kitchenFlowState = useSelector((state:any)=>state.manageMoreKitchenFlowApiReducer)
  const comboListCount = useSelector(
    (state: any) => state.menuComboApiReducer.comboListCount
  );
  const restId = JSON.parse(localStorage.getItem("___data")!)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ordertype, setOrderType] = useState('')
  const [advanceOptions, setadvanceOptions] = useState(false)
  const [inventoryItems, setinventoryItems] = useState(false)
  const orderTypehandler = (event: any) => {
    setOrderType(event.label)
  }

  let sizeadvanceoptions = advanceOptions ? 6 : 12;


  const [subshow, setsubShow] = useState(false);
  const [submodalName, setsubModalName] = useState('');
  const [tagsData, setTagsData] = useState<any>()
  const [priceTagsData, setPriceTagsData] = useState({
     name:"", 
 localname:"", 
 order_tag_id:"", 
 branch:"", 
 restaurent_id:""
  })
  const [editPriceTag, setEditPriceTag] = useState({
    id:"",
    name:"", 
 localname:"", 
 order_tag_id:"", 
 branch:"", 
 restaurent_id:""
  })
  const [productData, setProductData] = useState<any[]>([])
  const [productSelectedData, setProductSelectedData] = useState({
    product_id: "",
    pricetag_id: "",
    type:"add",
    restaurent_id: ""
 })
 const [comboSelectedData, setComboSelectedData] = useState({
   combo_id:"",
 size_id:"",
 groupitem_id:"",
 option_id:"",
 pricetag_id:"",
 price:""
 })
  const [err, setErr] = useState("");
  const [branchState, setBranchState] = useState(false);
  const [branchData, setBranchData] = useState<any[]>([])
  const [comboListData, setComboListData] = useState<any>()
  const [editProductPrice,setEditProductPrice] = useState<any>()
  const [editModifierPrice, setEditModifierPrice] = useState<any>()
  const [comboSizeData, setComboSizeData] = useState<any>()
  const [comboGrpData, setComboGrpData] = useState<any>()
  const [comboGrpOptionData, setComboGrpOptionData] = useState<any>()
  const [modifierOptionData, setModifierOptionData] = useState<any>()
  const [modifierSelectedData, setModifierSelectedData] = useState({
     modifier_id:"",
 price:"",
 pricetag_id:"",
 type:"add"
  })
  const subdeliveryAddress = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow")
    setsubModalName(modalname)
    setsubShow(status);
  }
  const subhandleClose = () => {
    setsubShow(false);
    setsubModalName('');
  };

  useEffect(()=>{
    const restaurantId = JSON.parse(localStorage.getItem("___data")!)
    tagsFilter.restaurent_id = restaurantId.restaurant_id
    tagsFilter.type = "all"
     dispatch(tagsList(tagsFilter))
     userBranchFilterValue.type = "all";
      dispatch(userBranchList(userBranchFilterValue));
      dispatch(getProductApi({restaurent_id:restaurantId?.restaurant_id}))
      comboFilterValue.type = "All"
    dispatch(comboList(comboFilterValue));
    dispatch(priceTagModifierList({modifier_id:""}))
    setPriceTagsData((prev:any)=>{
      return {...prev, restaurent_id:restaurantId.restaurant_id}
    })
    setEditPriceTag((prev:any)=>{
      return {...prev, restaurent_id:restaurantId.restaurant_id}
    })
    setProductSelectedData((prev:any)=>{
      return {...prev, restaurent_id:restaurantId.restaurant_id}
    })
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
   let comboArray:any[] = []
   comboListItems?.map((item: any) => {
    comboArray.push({
      label:item?.english_name,
      value:item?.id
    })
  });
  setComboListData(comboArray)
  },[comboListCount])

  useEffect(()=>{
    console.log(tagsListItems?.ordertag,"tagsListItems")
    let orderTagArray:any[] = []
    tagsListItems?.ordertag?.map((item:any)=>{
      orderTagArray.push({
        value:item.id,
        label:item.name
      })
    })
    setTagsData(orderTagArray)
  },[customerTagsState.tagsListCount])
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
    let comboSizeArray:any[] = [];
    comboSizeList?.map((item:any,index:number)=>{
      console.log(comboSizeList,"comboSizeList");
      comboSizeArray.push({
        label: item?.name,
        value:item?.id
       })
    })
     setComboSizeData(comboSizeArray)
  },[priceTagState.comboSizeCount])

  useEffect(()=>{
    let comboGroupArray:any[] = [];
    comboGroupListData?.map((item:any,index:number)=>{
      comboGroupArray.push({
        label: item?.groupname,
        value:item?.id
       })
    })
    setComboGrpData(comboGroupArray)
  },[priceTagState.comboGroupListCount])

  useEffect(()=>{
    let comboGroupOptionArray:any[] = [];
    comboGroupOptionListData?.map((item:any,index:number)=>{
      comboGroupOptionArray.push({
        label: item?.name,
        value:item?.id
       })
    })
    setComboGrpOptionData(comboGroupOptionArray)
  },[priceTagState.comboGroupOptionListCount])

  useEffect(()=>{
    let modifierOptionArray:any[] = [];
    priceTagModifierListData?.map((item:any,index:number)=>{
      modifierOptionArray.push({
        label: item?.name,
        value:item?.id
       })
    })
    setModifierOptionData(modifierOptionArray)
  },[priceTagState.priceTagModifierListCount])

  function chargesIsOpenValueData(orderTag: string) {
    setPriceTagsData((prev:any)=>{
      return {...prev, order_tag_id:orderTag}
    })
  }
  function chargesBranchFunc(event: any) {
    setPriceTagsData((prev:any)=>{
      return {...prev, branch:event}
    })
    setErr("")
  }
  function chargesBranchEditFunc(event: any) {
    setEditPriceTag((prev:any)=>{
      return {...prev, branch:event}
    })
    setErr("")
  }
  useEffect(()=>{
    props.handleClose();
  },[priceTagState.addPriceTagsCount, priceTagState.deletePriceTagCount, priceTagState.addProductsInPriceTagCount, priceTagState.editProductPriceCount, priceTagState.priceTagComboDeleteCount, priceTagState.priceTagComboDeleteCount, priceTagState.priceTagComboEditCount, priceTagState.priceTagComboAddCount, priceTagState.priceTagModifierAddDeleteCount, priceTagState.editModifierPricesCount])
  useEffect(()=>{
    setEditPriceTag((prev:any)=>{
      return {...prev, id:priceTagViewDetails?.data?.id, name: priceTagViewDetails?.data?.name, localname: priceTagViewDetails?.data?.localname, order_tag_id:priceTagViewDetails?.data?.order_tag_id, branch:priceTagViewDetails?.data?.branch, }
    })
    setProductSelectedData((prev:any)=>{
      return {...prev, pricetag_id:priceTagViewDetails?.data?.id}
    })
    setComboSelectedData((prev:any)=>{
      return {...prev, pricetag_id:priceTagViewDetails?.data?.id}
    })
    setModifierSelectedData((prev:any)=>{
      return {...prev, pricetag_id:priceTagViewDetails?.data?.id}
    })
    setEditProductPrice(priceTagViewDetails?.data?.products)
    setEditModifierPrice(priceTagViewDetails?.data?.pricetag_modifier)
  },[priceTagState.priceTagPerIdCount])
  function defaultapplies_onbranchdata(branch:OptionsFilter) {
    let branchArray = [];
    branchArray.push(branch)
    editPriceTag.branch = [...editPriceTag.branch, branchArray[0]].join(", ")
  }
  function productPostData(product: string) {
    setProductSelectedData((prev:any)=>{
      return {...prev, product_id:product}
    })
  }
  function modifierPostData(product: string) {
    setModifierSelectedData((prev:any)=>{
      return {...prev, modifier_id:product}
    })
  }
  return (
    <>
 

      {
        props.modalName === 'price tag filter' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Filters</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Name 
                  </Form.Label>
                  <Form.Control type="text"/>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Order Tages
                  </Form.Label>
                  <FilterDropdown options={costcategories} />
                </Form.Group>
              </Col>

              

            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }

      {
        props.modalName === 'product tag filter' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Filters</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Name 
                  </Form.Label>
                  <Form.Control type="text"/>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Category
                  </Form.Label>
                  <FilterDropdown options={costcategories} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Tags
                  </Form.Label>
                  <FilterDropdown options={costcategories} />
                </Form.Group>
              </Col>

              

            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {
        props.modalName === 'edit prices' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Prices</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              {
                editProductPrice?.map((item:any,index:number)=>{
                  return(
                    <>
                    <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  {item?.product_name} * 
                  </Form.Label>
                  <Form.Control type="number" defaultValue={item?.price} onChange={(e:any)=>{
                    setEditProductPrice((prev:any)=>{
                      prev[index].price = e.target.value
                      return prev
                    })
                    console.log(editProductPrice,"editProductPrice")
                  }}/>
                </Form.Group>
              </Col>
                    </>
                  )
                })
              }
              
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={()=>{
                let data:any[] = []
                editProductPrice?.map((item:any,index:number)=>{
                  data.push({
                    pricetag_id: item?.pricetag_id,
                    product_id: item?.product_id,
                    price: item?.price
                  })
                })
                dispatch(editProductPrices({data:JSON.stringify(data)}))
              }}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }

{
        props.modalName === 'edit modifier prices' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Prices</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              {
                editModifierPrice?.map((item:any,index:number)=>{
                  return(
                    <>
                    <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  {item?.modifier_name} * 
                  </Form.Label>
                  <Form.Control type="number" defaultValue={item?.price} onChange={(e:any)=>{
                    setEditModifierPrice((prev:any)=>{
                      prev[index].price = e.target.value
                      return prev
                    })
                    console.log(editProductPrice,"editProductPrice")
                  }}/>
                </Form.Group>
              </Col>
                    </>
                  )
                })
              }
              
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={()=>{
                let data:any[] = []
                editModifierPrice?.map((item:any,index:number)=>{
                  console.log(item,"itemmmm")
                  data.push({
                    pricetag_id: item?.pricetag_id,
                    modifier_id: item?.modifire_id,
                    price: item?.price
                  })
                })
                dispatch(editModifierPrices({data:JSON.stringify(data)}))
              }}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }

      {
        props.modalName === 'add product' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Products 
                  </Form.Label>
                  <FilterDropdown options={productData} postdata={productPostData}/>
                </Form.Group>
              </Col> 
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={()=>{
                dispatch(addProductsInPriceTag(productSelectedData))
              }}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {
        props.modalName === 'add combos' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={()=>{props.handleClose()
          setComboSelectedData({
            combo_id:"",
          size_id:"",
          groupitem_id:"",
          option_id:"",
          pricetag_id:"",
          price:""
          })
        }
        }>
          <Modal.Header closeButton>
            <Modal.Title>Add combo option</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Combos*
                  </Form.Label>
                  <Select
                    isSearchable={true}
                    options={comboListData}
                    onChange={(e:any) => {
                      dispatch(comboGroupList({
                        restaurant_id:restId.restaurant_id,
                        combo_id: e.value
                      }))
                      dispatch(comboSize({
                        restaurant_id:restId.restaurant_id,
                        combo_id: e.value
                      }))
                      setComboSelectedData((prev:any)=>{
                        return {...prev, combo_id:e.value}
                      })
                    }}
                    placeholder="Choose..."
                  />
                </Form.Group>
              </Col> 
              {
                comboSelectedData?.combo_id != "" ? 
                <>
                 <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Size*
                  </Form.Label>
                  <Select
                    isSearchable={true}
                    options={comboSizeData}
                    onChange={(e:any) => {
                      setComboSelectedData((prev:any)=>{
                        return {...prev, size_id:e.value}
                      })
                    }}
                    placeholder="Choose..."
                  />
                </Form.Group>
              </Col> 
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Combo Item*
                  </Form.Label>
                  <Select
                    isSearchable={true}
                    options={comboGrpData}
                    onChange={(e:any) => {
                      dispatch(comboGroupOptionList({
                        restaurant_id:restId.restaurant_id,
                        group_id: e.value,
                      }))
                      setComboSelectedData((prev:any)=>{
                        return {...prev, groupitem_id:e.value}
                      })
                    }}
                    placeholder="Choose..."
                  />
                </Form.Group>
              </Col> 
                </> : ""
              }
             {
              comboSelectedData?.size_id != "" && comboSelectedData?.groupitem_id != "" ? 
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Combo Item Option*
                  </Form.Label>
                  <Select
                    isSearchable={true}
                    options={comboGrpOptionData}
                    onChange={(e:any) => {
                      setComboSelectedData((prev:any)=>{
                        return {...prev, option_id:e.value}
                      })
                    }}
                    placeholder="Choose..."
                  />
                </Form.Group>
              </Col> : ""
             }
              
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Price
                  </Form.Label>
                 <Form.Control type="number" onChange={(e:any)=>{
                  setComboSelectedData((prev:any)=>{
                    return {...prev, price: e.target.value}
                  })
                 }}/>
                </Form.Group>
              </Col> 
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); 
                setComboSelectedData({
                  combo_id:"",
                size_id:"",
                groupitem_id:"",
                option_id:"",
                pricetag_id:"",
                price:""
                })
                setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={()=>{
                dispatch(priceTagComboAdd(comboSelectedData))
                setComboSelectedData({
                  combo_id:"",
                size_id:"",
                groupitem_id:"",
                option_id:"",
                pricetag_id:"",
                price:""
                })
              }}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {
        props.modalName === 'add option' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add modifier option</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                   Modifier option
                  </Form.Label>
                  <FilterDropdown options={modifierOptionData} postdata={modifierPostData}/>
                </Form.Group>
              </Col> 
            
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={()=>{
                dispatch(priceTagModifierAddDelete(modifierSelectedData))
              }}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {
        props.modalName === 'modifer option  tag filter' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Filter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
            <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                   Name
                  </Form.Label>
                  <Form.Control type="text"/>
                </Form.Group>
              </Col> 

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                   Modifier 
                  </Form.Label>
                  <FilterDropdown options={costcategories} />
                </Form.Group>
              </Col> 
            
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
  
      {
        props.modalName === 'Create Price Tag' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Price Tag</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Name 
                  </Form.Label>
                  <Form.Control type="text" onChange={(e:any)=>{
                    setPriceTagsData((prev:any)=>{
                      return {...prev, name:e.target.value}
                    })
                  }}/>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Name Localized
                  </Form.Label>
                  <Form.Control type="text" onChange={(e:any)=>{
                    setPriceTagsData((prev:any)=>{
                      return {...prev, localname:e.target.value}
                    })
                  }}/>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Order Tages
                  </Form.Label>
                  <Select
                    isSearchable={true}
                    options={tagsData}
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
                    <input type="radio"  name ="branch"  className={`${cx.radioinput}`} onChange={(e: any) => {
                    setPriceTagsData((prev:any)=>{
                      return {...prev, branch:"all"}
                    })
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
                    setPriceTagsData((prev:any)=>{
                      return {...prev, branch:""}
                    })
                  }}/>
                    Branch
                  </Form.Label>
                  <FilterDropdown options={branchData} postdata={chargesBranchFunc}/>
                  <p style={{color:"red"}}>{err}</p>
                </Form.Group>
              </Col>

              

            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={()=>{
                if(branchState===true && priceTagsData.branch===""){
                  setErr("Branches Are Required")
                }else{
                dispatch(addPriceTags(priceTagsData))
                setErr("");
                }
              }}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {
        props.modalName === 'Edit Price Tag' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Price Tag</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Name 
                  </Form.Label>
                  <Form.Control type="text" defaultValue={editPriceTag.name} onChange={(e:any)=>{
                    setEditPriceTag((prev:any)=>{
                      return {...prev, name:e.target.value}
                    })
                  }}/>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Name Localized
                  </Form.Label>
                  <Form.Control type="text" defaultValue={editPriceTag.localname} onChange={(e:any)=>{
                    setEditPriceTag((prev:any)=>{
                      return {...prev, localname:e.target.value}
                    })
                  }}/>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Order Tages
                  </Form.Label>
                  <Select
                    defaultValue={tagsData?.map((item:any)=>{
                      if(item.value==editPriceTag.order_tag_id){
                        return {label:item.label, value:item.value}
                      }
                    })}
                    isSearchable={true}
                    options={tagsData}
                    onChange={(e:any) => {
                        setEditPriceTag((prev:any)=>{
                          return {...prev, order_tag_id:e.value}
                        })
                    }}
                    placeholder="Choose..."
                  />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                  <input type="radio" name ="branch" className={`${cx.radioinput}`} defaultChecked={editPriceTag.branch==="all" ? true : false} onChange={(e: any) => {
                    setBranchState(false);
                    setErr("")
                   let check = e.target.checked === true ? "all" : ""
                   setEditPriceTag((prev:any)=>{
                    return {...prev, branch:check}
                  })
                  }}/>{" "}
                  Automatically apply on all existing and new branches
                </Form.Label>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel} `}>
                  <input type="radio" name ="branch" className={`${cx.radioinput}`} defaultChecked={editPriceTag.branch!=="all" ? true : false} onChange={(e: any) => {
                    setBranchState(true)
                    let check = e.target.checked === true ? "" : "all"
                    setEditPriceTag((prev:any)=>{
                      return {...prev, branch:check}
                    })
                  }}/>
                  Branch
                </Form.Label>
                  <FilterDropdown options={branchData} postdata={chargesBranchEditFunc} defaultdata={defaultapplies_onbranchdata} 
                  defaultoptions={editPriceTag.branch!="all" ? 
                  editPriceTag.branch?.split(",")?.map((item:any)=>{
                     return branchData?.filter((e:any)=>(e?.value==item))
                  }) : []
                }/>
                  <p style={{color:"red"}}>{err}</p>
                </Form.Group>
              </Col>

              

            </Row>
          </Modal.Body>
          <Modal.Footer>
          <div>
              <NavLink to="/manage/manage-More/price-tags" className={`${cx.rightOption} ${cx.rightRed}`} onClick={()=>{
                dispatch(deletePriceTag({pricetag_id:editPriceTag.id}))
              }}>
                Delete 
              </NavLink>
            </div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={()=>{
             if(branchState===true && editPriceTag.branch===""){
              setErr("Branches Are Required")
            }else{
              dispatch(addPriceTags(editPriceTag))
            setErr("");
            }
            }}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }


  {props.modalName === "import price tag" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Import PriceTag</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <p>
                    <input type="file" />
                  </p>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <NavLink to="#" className={`${cx.rightOption}`}>
                Download Template
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
              <Button className={`${cx.btnSubmit}`}>Submit</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

                
  {props.modalName === "import price tag product" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Import Price Tag Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <p>
                    <input type="file" />
                  </p>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <NavLink to="#" className={`${cx.rightOption}`}>
                Download Template
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
              <Button className={`${cx.btnSubmit}`}>Submit</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

{props.modalName === "import price tag modifer" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Import Price Tag Modifer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <p>
                    <input type="file" />
                  </p>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <NavLink to="#" className={`${cx.rightOption}`}>
                Download Template
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
              <Button className={`${cx.btnSubmit}`}>Submit</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}



{
        props.modalName === 'edit details sec' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {editSingleProductPrice.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Price * 
                  </Form.Label>
                  <Form.Control type="number" defaultValue={editSingleProductPrice.price} onChange={(e:any)=>{
                    editSingleProductPrice.price = e.target.value
                  }}/>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
          <div>
              <NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`} onClick={()=>{
                  dispatch(addProductsInPriceTag({
                    product_id: editSingleProductPrice.product_id,
                    pricetag_id: editSingleProductPrice.pricetag_id,
                    type:"delete",
                    restaurent_id:productSelectedData.restaurent_id
                 }))
              }}>
                Delete 
              </NavLink>
            </div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={()=>{
                dispatch(editProductPrices({data:JSON.stringify([editSingleProductPrice])}))
              }}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }

{
        props.modalName === 'edit combo details sec' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {editSingleCombo.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Price * 
                  </Form.Label>
                  <Form.Control type="number" defaultValue={editSingleCombo.price} onChange={(e:any)=>{
                    editSingleCombo.price = e.target.value
                  }}/>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
          <div>
              <NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`} onClick={()=>{
                  dispatch(priceTagComboDelete({
                    combo_id: editSingleCombo.combo_id,
                    // pricetag_id: editSingleCombo.pricetag_id,
                    // type:"delete",
                    // restaurent_id:productSelectedData.restaurent_id
                 }))
              }}>
                Delete 
              </NavLink>
            </div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={()=>{
                dispatch(priceTagComboEdit({
                  price : editSingleCombo.price,
                  combo_id: editSingleCombo.combo_id
                }))
              }}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }

{
        props.modalName === 'edit modifier details sec' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {editSingleModifierOption.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Price * 
                  </Form.Label>
                  <Form.Control type="number" defaultValue={editSingleModifierOption.price} onChange={(e:any)=>{
                    editSingleModifierOption.price = e.target.value
                  }}/>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
          <div>
              <NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`} onClick={()=>{
                  dispatch(priceTagModifierAddDelete({
                    price : editSingleModifierOption.price,
                  modifier_id: editSingleModifierOption.modifier_id,
                  pricetag_id: editSingleModifierOption.pricetag_id,
                  type:"delete"
                 }))
              }}>
                Delete 
              </NavLink>
            </div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={()=>{
                let data:any[] = []
                data.push({
                    pricetag_id: editSingleModifierOption.pricetag_id,
                    modifier_id:  editSingleModifierOption.modifier_id,
                    price: editSingleModifierOption.price,
                  })
                dispatch(editModifierPrices({data:JSON.stringify(data)}))
              }}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
    </>
  );
};

export default Modals;
