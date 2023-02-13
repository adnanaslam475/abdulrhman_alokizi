import React, { useCallback, useState, useEffect } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Menuproductsdetails.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Table, Col, Modal, Form, Dropdown } from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import cancel from "../../images/cancel.svg";
import { NavLink, useParams } from "react-router-dom";

import { MdArrowBackIos } from 'react-icons/md';
import Modals from "../../components/Modals/MenuProductsM";
import { activeProduct, addType, getAllTagIngridentModifier, productId, productTagModifier, productView, singleProductDetails } from "../../redux_toolkit/reducer/menuProductsApiReducer";
import { useDispatch, useSelector } from "react-redux";



export default function Menuproductsdetails() {
   const singleProduct = useSelector(
    (state: any) => state.menuProductsApiReducer.singleProductCount
  );
  const param = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [productDetail, setProductDetail] = useState<any>()
  const [postapidata, setpostdata] = useState<any>();
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
    setProductDetail(singleProductDetails)
    console.log(singleProductDetails,"singleProductDetails")
  },[singleProduct])

  useEffect(()=>{
    if(productDetail===undefined){
    dispatch(productView(param?.id))
    }
  },[])

  function postdata(data: string) {
    setpostdata(data);
  }


  const addTagModifierBranchIngredientCount:number = useSelector((state:any)=>state.menuProductsApiReducer.addTagModifierBranchIngredientCount)

  useEffect(()=>{
    if(productId!==undefined){
    handleClose();
   dispatch(productView(productId))
    }
  },[addTagModifierBranchIngredientCount])


  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <NavLink to="/menu/products" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5> {productDetail?.name}
                <NavLink to="#" className={`${cx.activeBtn}`}>
                {productDetail?.status === 1 ? `active` : 'deactive'} 
                </NavLink>
              </h5>
              
            </div>
            <div className={`${st.rowTitleRight}`}>
              {/* <button className={`btn`} >
                <img src={cancel} className={`${st.icon}`} />
                Enable House Account
              </button> */}
              <button className={`btn`} onClick={()=>{
                dispatch(activeProduct({product_id:param?.id,status:productDetail?.status === 1 ? 0 : 1}))
              }}>
                <img src={cancel} className={`${st.icon}`} />
                  {productDetail?.combo_status==="active" ? "Deactive" : "Active"} Product
              </button>
              <button className={`btn ${st.themeBtn}`} onClick={() => {
                handleShow("edit product", true);
              }}>
                Edit Product
              </button>
            </div>
          </div>
        </div>


        <div className={`${st.pageWrapperInside} ${st.setWidth}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>

              <div className={`${cx.contentBox}`}>
                <Row>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Name</label>
                    <p>{productDetail?.name}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Name Localized</label>
                    <p>{productDetail?.ar_name}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Category</label>
                    <p>{productDetail?.category}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>SKU</label>
                    <p>{productDetail?.sku}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Barcode</label>
                    <p>{productDetail?.barcode}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Tax Group</label>
                    <p>{productDetail?.taxgroup}</p>
                  </Col>

                  
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Pricing Method</label>
                    <p>{productDetail?.pricing_type}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Selling Method</label>
                    <p>{productDetail?.selling_type}</p>
                  </Col>

                  
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Costing Method</label>
                    <p>From Ingredients</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Preparation Time</label>
                    <p>{productDetail?.prep_time}</p>
                  </Col>

                  
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Price</label>
                    <p>{productDetail?.price}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Ingredients Cost</label>
                    <p>SAR 0</p>
                  </Col>

                  
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Calories</label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Cost %</label>
                    <p>0 %</p>
                  </Col>
                </Row>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Tags</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                
                  <button className={`btn`} onClick={() => {
                    handleShow("products add tags", true);
                    dispatch(addType({
                      name: getAllTagIngridentModifier?.tags.length>0 ? "Edit Tags" : "Add Tags",
                      parameter:"tags",
                      id: productDetail.id
                    }))
                    dispatch(productTagModifier({type:"tag"}))
                  }}>
                    + {getAllTagIngridentModifier?.tags.length>0 ? "Edit" : "Add"} Tags
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <ul className={`${cx.tagsList}`}>
                  {getAllTagIngridentModifier?.tags?.length > 0 ?
                    getAllTagIngridentModifier?.tags?.map((item: any,index:number) => {
                      console.log(item, "itemitem");
                      return (
                        <li key={index}>
                          <span>{item?.name}</span>
                        </li>
                      );
                    }) : 
                    <div className={`p-4 text-center ${table.noData}`}>
                    Add tags to help you filter and group products easily. You can create tags such as Healthy Products, Organic, etc.
                </div>
                  }
                </ul>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Modifiers</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("products add tags", true);
                    dispatch(addType({
                      name: getAllTagIngridentModifier?.modifier?.length > 0 ? "Edit Modifier" : "Add Modifier",
                      parameter:"modifier",
                      id: productDetail.id
                    }))
                    dispatch(productTagModifier({type:"modifier"}))
                  }}>
                    + {getAllTagIngridentModifier?.modifier?.length > 0 ? "Edit" : "Add"} Modifiers
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
              <ul className={`${cx.tagsList}`}>
                  {getAllTagIngridentModifier?.modifier?.length > 0 ?
                    getAllTagIngridentModifier?.modifier?.map((item: any,index:number) => {
                      console.log(item, "itemitem");
                      return (
                        <li key={index}>
                          <span>{item?.name}</span>
                        </li>
                      );
                    }) : 
                    <div className={`p-4 text-center ${table.noData}`}>
                Add modifiers to this product and configure the minimum and maximum number of allowed modifiers, and more.
                </div>
                  }
                </ul>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Ingredients</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("products add tags", true);
                    dispatch(addType({
                      name: getAllTagIngridentModifier?.ingrident?.length > 0 ? "Edit Ingrident" : "Add Ingrident",
                      parameter:"ingrident",
                      id: productDetail.id
                    }))
                    dispatch(productTagModifier({type:"ingrident"}))
                  }}>
                    + {getAllTagIngridentModifier?.ingrident?.length > 0 ? "Edit" : "Add"} Ingredients
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
              <ul className={`${cx.tagsList}`}>
                  {getAllTagIngridentModifier?.ingrident?.length > 0 ?
                           getAllTagIngridentModifier?.ingrident?.map((item: any, index: number) => {
                            console.log(item, "ingridentitemitem");
                            console.log(item.length, "ingridentitemitem");
                            if (item.length > 0) {
                              console.log(item, "ingridentitemitem");
                              return (
                                <li key={index}>
                                  <span>{item[0].ingredient_name}</span>
                                </li>
                              );
                            }
                          }) :
                    <div className={`p-4 text-center ${table.noData}`}>
                 Add inventory items as ingredients to this product to be consumed when this product is sold.
                </div>
                  }
                </ul>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Custom Price</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("products add tags", true);
                    dispatch(addType({
                      name:"Custom Price branch",
                      parameter:"customprice",
                      id: productDetail.id
                    }))
                    dispatch(productTagModifier({type:"branch"}))
                  }}>
                    + {getAllTagIngridentModifier?.customprice?.length > 0 ? "Edit" : "Add"} Branches
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
              <ul className={`${cx.tagsList}`}>
                  {getAllTagIngridentModifier?.customprice?.length > 0 ?
                    getAllTagIngridentModifier?.customprice?.map((item: any,index:number) => {
                      console.log(item, "itemitem");
                      return (
                        <li key={index}>
                          <span>{item?.branch}</span>
                        </li>
                      );
                    }) : 
                    <div className={`p-4 text-center ${table.noData}`}>
                  Set a different price for this product in the branches you select here.
                 </div>
                  }
                </ul>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Inactive In Branches</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("products add tags", true);
                    dispatch(addType({
                      name: "Inactive In branch",
                      parameter:"inactivein_branch",
                      id: productDetail.id
                    }))
                    dispatch(productTagModifier({type:"branch"}))
                  }}>
                    + {getAllTagIngridentModifier?.inactivein_branch?.length > 0 ? "Edit" : "Add"} Branches
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
              <ul className={`${cx.tagsList}`}>
                  {getAllTagIngridentModifier?.inactivein_branch?.length > 0 ?
                    getAllTagIngridentModifier?.inactivein_branch?.map((item: any,index:number) => {
                      console.log(item, "itemitem");
                      return (
                        <li key={index}>
                          <span>{item?.english_name}</span>
                        </li>
                      );
                    }) : 
                    <div className={`p-4 text-center ${table.noData}`}>
                Deactivate this product in the branches you select here to hide it from the menu.
                 </div>
                  }
                </ul>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Out Of Stock</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("products add tags", true);
                    dispatch(addType({
                      name: "Out Of Stock branch",
                      parameter:"outofstock_branch",
                      id: productDetail.id
                    }))
                    dispatch(productTagModifier({type:"branch"}))
                  }}>
                    + {getAllTagIngridentModifier?.outofstock_branch?.length > 0 ? "Edit" : "Add"} Branches
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
              <ul className={`${cx.tagsList}`}>
                  {getAllTagIngridentModifier?.outofstock_branch?.length > 0 ?
                    getAllTagIngridentModifier?.outofstock_branch?.map((item: any,index:number) => {
                      console.log(item, "itemitem");
                      return (
                        <li key={index}>
                          <span>{item?.english_name}</span>
                        </li>
                      );
                    }) : 
                    <div className={`p-4 text-center ${table.noData}`}>
                        Set this product as Out of Stock in the branches you select here, the Cashier can still sell Out of Stock products.
               </div>
                  }
                </ul>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Applies on Price Tag</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("products add tags", true);
                    dispatch(addType({
                      name: "pricetag",
                      parameter:"pricetag",
                      id: productDetail.id
                    }))
                    dispatch(productTagModifier({type:"pricetag"}))
                  }}>
                    + {getAllTagIngridentModifier?.pricetag?.length > 0 ? "Edit" : "Add" } Price Tag
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <ul className={`${cx.tagsList}`}>
                  {getAllTagIngridentModifier?.pricetag?.length > 0 ?
                    getAllTagIngridentModifier?.pricetag?.map((item: any,index:number) => {
                      console.log(item, "itemitem");
                      return (
                        <li key={index}>
                          <span>{item?.name}</span>
                        </li>
                      );
                    }) : 
                    <div className={`p-4 text-center ${table.noData}`}>
                        No data to display!
                        </div>
                  }
                </ul>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Groups</h5>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                Add this product to menu groups (go to Menu Groups) to design your menu and control which devices this product can be sold from.
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Timed Events</h5>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                  Here you'll see if this product is assigned to any timed events.
                </div>
              </div>

            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} postdata={postdata}/>
    </>
  );
}
