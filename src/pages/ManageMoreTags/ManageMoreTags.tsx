import React, { useCallback, useState, useEffect } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageMoreTags.module.scss";
import table from "../../datatable.module.scss";
import {
  Card,
  Button,
  Row,
  Table,
  Col,
  Modal,
  Form,
  Dropdown,
} from "react-bootstrap";
import iconsetting from "../../images/iconsetting.svg";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";
import Modals from "../../components/Modals/ManageMoreTagsM";
import { useDispatch, useSelector } from "react-redux";
import { editTagsFunc, openModal, tagsFilter, tagsList, tagsListItems } from "../../redux_toolkit/reducer/manageMoreTagsApiReducer";

export default function ManageMoreTags() {
  const customerTagsState = useSelector((state:any)=>state.manageMoreTagsApiReducer)
  let restaurantId = JSON.parse(localStorage.getItem("___data")!)
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [customerTagsData, setCustomerTagsData] = useState<any>()
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
    const data = JSON.parse(localStorage.getItem("___data")!)
    tagsFilter.restaurent_id=data?.restaurant_id
    tagsFilter.type = "all"
     dispatch(tagsList(tagsFilter))
  },[customerTagsState.addTagsCount, customerTagsState.editTagsCount, customerTagsState.deleteTagsCount])

  useEffect(()=>{
    setCustomerTagsData(tagsListItems)
  },[customerTagsState.tagsListCount])

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <NavLink to="/manage/manage-more" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Tags </h5>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside} ${st.setWidth}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Customer Tag </h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      let data = {
                        name:"Customer",
                        number:"1"
                      }
                      dispatch(openModal(data))
                      handleShow("Create tag ", true);
                    }}
                  >
                    Create Tag
                  </button>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <tbody>
                      {
                        customerTagsData?.customertag?.map((item:any,index:number)=>{
                        return (<tr onClick={() => {
                          let data = {
                            name:"Customer",
                            number:"1"
                          }
                          dispatch(openModal(data))
                          let editTag ={
                            restaurent_id: restaurantId?.restaurant_id,
                            id : item?.id,  
                            name: item?.name,
                            namelocalize: item?.name_localized,
                            tagtype: "1"      
                         }
                         dispatch(editTagsFunc(editTag))
                          handleShow("Edit tag ", true);
                         }} >
                        <td>{item?.name}</td>
                        <td > {item?.name_localized} </td>
                      </tr>)
                        })
                      }
                      
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Branch Tag</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      let data = {
                        name:"Branch",
                        number:"2"
                      }
                      dispatch(openModal(data))
                      handleShow("Create tag ", true);
                    }}
                  >
                    Create Tag
                  </button>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                {
                  customerTagsData?.branchtag?.length>0 ?
                  <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <tbody>
                      {
                        customerTagsData?.branchtag?.map((item:any,index:number)=>{
                        return (<tr onClick={() => {
                          let data = {
                            name:"Branch",
                            number:"2"
                          }
                          dispatch(openModal(data))
                          let editTag ={
                            restaurent_id: restaurantId?.restaurant_id,
                            id : item?.id,  
                            name: item?.name,
                            namelocalize: item?.name_localized,
                            tagtype: "2"      
                         }
                         dispatch(editTagsFunc(editTag))
                          handleShow("Edit tag ", true);
                         }} >
                        <td>{item?.name}</td>
                        <td > {item?.name_localized} </td>
                      </tr>)
                        })
                      }
                      
                    </tbody>
                  </Table>
                </div> :
                <div className={`p-4 text-center ${table.noData}`}>
                  Create tags to help you filter and group branches easily. You
                  can create tags such as Mall Branches, High Traffic, etc.
                </div>
                }
              
                
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5> Inventory Item Tag </h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      let data = {
                        name:"Inventory",
                        number:"3"
                      }
                      dispatch(openModal(data))
                      handleShow("Create tag ", true);
                    }}
                  >
                    Create Tag
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
              {
                  customerTagsData?.branchtag?.length>0 ?
                  <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <tbody>
                      {
                        customerTagsData?.inventoryitemtag?.map((item:any,index:number)=>{
                        return (<tr onClick={() => {
                          let data = {
                            name:"Inventory",
                            number:"3"
                          }
                          dispatch(openModal(data))
                          let editTag ={
                            restaurent_id: restaurantId?.restaurant_id,
                            id : item?.id,  
                            name: item?.name,
                            namelocalize: item?.name_localized,
                            tagtype: "3"      
                         }
                         dispatch(editTagsFunc(editTag))
                          handleShow("Edit tag ", true);
                         }} >
                        <td>{item?.name}</td>
                        <td > {item?.name_localized} </td>
                      </tr>)
                        })
                      }
                      
                    </tbody>
                  </Table>
                </div> :
               <div className={`p-4 text-center ${table.noData}`}>
               Create inventory items tags to help you filter and group items
               easily. You can create tags such as Weekly Stocktaking,
               Vegetables, etc.
             </div>
                }
              </div>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5> Order Tag  </h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      let data = {
                        name:"Order",
                        number:"4"
                      }
                      dispatch(openModal(data))
                      handleShow("Create tag ", true);
                    }}
                  >
                    Create Tag
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
              {
                  customerTagsData?.ordertag?.length>0 ?
                  <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <tbody>
                      {
                        customerTagsData?.branchtag?.map((item:any,index:number)=>{
                        return (<tr onClick={() => {
                          let data = {
                            name:"Order",
                            number:"4"
                          }
                          dispatch(openModal(data))
                          let editTag ={
                            restaurent_id: restaurantId?.restaurant_id,
                            id : item?.id,  
                            name: item?.name,
                            namelocalize: item?.name_localized,
                            tagtype: "4"      
                         }
                         dispatch(editTagsFunc(editTag))
                          handleShow("Edit tag ", true);
                         }} >
                        <td>{item?.name}</td>
                        <td > {item?.name_localized} </td>
                      </tr>)
                        })
                      }
                      
                    </tbody>
                  </Table>
                </div> :
                <div className={`p-4 text-center ${table.noData}`}>
                Create tags to help you filter and group orders easily. You can create tags such as Phone orders, VIP Delivery, etc.
                </div>
                }
              </div>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5> Supplier Tag </h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      let data = {
                        name:"Supplier",
                        number:"5"
                      }
                      dispatch(openModal(data))
                      handleShow("Create tag ", true);
                    }}
                  >
                    Create Tag
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
              {
                  customerTagsData?.suppliertag?.length>0 ?
                  <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <tbody>
                      {
                        customerTagsData?.suppliertag?.map((item:any,index:number)=>{
                        return (<tr onClick={() => {
                          let data = {
                            name:"Supplier",
                            number:"5"
                          }
                          dispatch(openModal(data))
                          let editTag ={
                            restaurent_id: restaurantId?.restaurant_id,
                            id : item?.id,  
                            name: item?.name,
                            namelocalize: item?.name_localized,
                            tagtype: "5"      
                         }
                         dispatch(editTagsFunc(editTag))
                          handleShow("Edit tag ", true);
                         }} >
                        <td>{item?.name}</td>
                        <td > {item?.name_localized} </td>
                      </tr>)
                        })
                      }
                      
                    </tbody>
                  </Table>
                </div> :
                <div className={`p-4 text-center ${table.noData}`}>
                Create tags to help you filter and group suppliers easily. You can create tags such as Cash Suppliers, High Quality, etc.
                </div>
                }
              </div>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5> User Tag </h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      let data = {
                        name:"User",
                        number:"6"
                      }
                      dispatch(openModal(data))
                      handleShow("Create tag ", true);
                    }}
                  >
                    Create Tag
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
              {
                  customerTagsData?.usertag?.length>0 ?
                  <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <tbody>
                      {
                        customerTagsData?.usertag?.map((item:any,index:number)=>{
                        return (<tr onClick={() => {
                          let data = {
                            name:"User",
                            number:"6"
                          }
                          dispatch(openModal(data))
                          let editTag ={
                            restaurent_id: restaurantId?.restaurant_id,
                            id : item?.id,  
                            name: item?.name,
                            namelocalize: item?.name_localized,
                            tagtype: "6"      
                         }
                         dispatch(editTagsFunc(editTag))
                          handleShow("Edit tag ", true);
                         }}  >
                        <td>{item?.name}</td>
                        <td > {item?.name_localized} </td>
                      </tr>)
                        })
                      }
                      
                    </tbody>
                  </Table>
                </div> :
                <div className={`p-4 text-center ${table.noData}`}>
                Create tags to help you filter and group users easily. You can create tags such as Supervisors, Night Shift, etc.
                </div>
                }
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5> Product Tag </h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      let data = {
                        name:"Product",
                        number:"7"
                      }
                      dispatch(openModal(data))
                      handleShow("Create tag ", true);
                    }}
                  >
                    Create Tag
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
              {
                  customerTagsData?.usertag?.length>0 ?
                  <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <tbody>
                      {
                        customerTagsData?.producttag?.map((item:any,index:number)=>{
                        return (<tr onClick={() => {
                          let data = {
                            name:"Product",
                            number:"7"
                          }
                          dispatch(openModal(data))
                          let editTag ={
                            restaurent_id: restaurantId?.restaurant_id,
                            id : item?.id,  
                            name: item?.name,
                            namelocalize: item?.name_localized,
                            tagtype: "7"      
                         }
                         dispatch(editTagsFunc(editTag))
                          handleShow("Edit tag ", true);
                         }}  >
                        <td>{item?.name}</td>
                        <td > {item?.name_localized} </td>
                      </tr>)
                        })
                      }
                      
                    </tbody>
                  </Table>
                </div> :
                 <div className={`p-4 text-center ${table.noData}`}>
                 Create tags to help you filter and group products easily. You can create tags such as Vegan, Healthy, etc.
                 </div>
                }
               
              </div>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5> Device  Tag </h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      let data = {
                        name:"Device",
                        number:"8"
                      }
                      dispatch(openModal(data))
                      handleShow("Create tag ", true);
                    }}
                  >
                    Create Tag
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
              {
                  customerTagsData?.devicetag?.length>0 ?
                  <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <tbody>
                      {
                        customerTagsData?.devicetag?.map((item:any,index:number)=>{
                        return (<tr onClick={() => {
                          let data = {
                            name:"Device",
                            number:"8"
                          }
                          dispatch(openModal(data))
                          let editTag ={
                            restaurent_id: restaurantId?.restaurant_id,
                            id : item?.id,  
                            name: item?.name,
                            namelocalize: item?.name_localized,
                            tagtype: "8"      
                         }
                         dispatch(editTagsFunc(editTag))
                          handleShow("Edit tag ", true);
                         }} >
                        <td>{item?.name}</td>
                        <td > {item?.name_localized} </td>
                      </tr>)
                        })
                      }
                      
                    </tbody>
                  </Table>
                </div> :
                <div className={`p-4 text-center ${table.noData}`}>
                Create tags to help you filter and group devices easily. You can create tags such as Main Cashier, Waiter, etc.
                </div>
                }
                
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}
