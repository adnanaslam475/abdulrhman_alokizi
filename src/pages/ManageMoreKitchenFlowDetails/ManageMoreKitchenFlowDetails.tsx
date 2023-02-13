import React, { useCallback, useEffect, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageMoreKitchenFlowDetails.module.scss";
import table from "../../datatable.module.scss";

import cancel from "../../images/cancel.svg";
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
import { NavLink, useParams } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";
import Modals from "../../components/Modals/ManageMoreKitchenFlowM";
import { activeKitchenFlow, editStationFunc, kitchenFlowPerId, kitchenFlowPerIdData } from "../../redux_toolkit/reducer/manageMoreKitchenFlowApiReducer";
import { useDispatch, useSelector } from "react-redux";

export default function ManageMoreKitchenFlowDetails() {
  const param = useParams();
  const dispatch = useDispatch();
  const restaurantId = JSON.parse(localStorage.getItem("___data")!)
  const kitchenFlowState = useSelector((state:any)=>state.manageMoreKitchenFlowApiReducer)
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [perIdKitchenFlow, setPerIdKitchenFlow] = useState<any>()
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
    dispatch(kitchenFlowPerId({kitchenflow_id:`${param.id}`}))
  },[kitchenFlowState.addEditDeletekitchenFlowCount, kitchenFlowState.addEditStationCount, kitchenFlowState.deleteStationCount, kitchenFlowState.activeKitchenFlowCount, kitchenFlowState.branchAddDataCount, kitchenFlowState.addProductKitchenFlowCount])
  useEffect(()=>{
    console.log(kitchenFlowPerIdData,"kitchenFlowPerIdData")
    setPerIdKitchenFlow(kitchenFlowPerIdData)
  },[kitchenFlowState.kitchenFlowPerIdCount])

  return (
    <>
      <section className={`${st.pageWrapper}`}>
      <div className={`${st.pageTitle}`}>
          <NavLink to="/manage/manage-more/kitchen-flow" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={` d-flex ${st.rowTitleLeft}`}>
              <h5>{perIdKitchenFlow?.name}</h5>
              <button className={`${cx.usedBtn}`}> {perIdKitchenFlow?.status=="1" ? "Active" : "Inactive"}</button>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn`}
                onClick={() => {
                  dispatch(activeKitchenFlow({kitchenflow_id:`${perIdKitchenFlow?.id}`, status:perIdKitchenFlow?.status=="1" ? "0" : "1"}))
                }}
              >
                <img src={cancel} className={`${st.icon}`} />
                {perIdKitchenFlow?.status=="0" ? "Active" : "Inactive"} Flow 
              </button>
              <button className={`btn ${st.themeBtn}`}
              onClick={() => {
                handleShow("Edit Kitchen Flow", true);
              }}
              >Edit Flow </button>
            </div>
          </div>
        </div>


        <div className={`${st.pageWrapperInside} ${st.setWidth}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Stations</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("sort stations", true);
                    }}
                  >
                    Sort Station 
                  </button>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("add station", true);
                    }}
                  >
                    Add Station 
                  </button>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <thead>
                        <tr >
                            <th> Name</th>
                            <th> Active</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        perIdKitchenFlow?.stations?.map((item:any,index:number)=>{
                         return <tr onClick={() => {
                          let data = {
                            id:item?.id,
                            kitchenflow_id:perIdKitchenFlow?.id,
                            restaurent_id:restaurantId?.restaurant_id,
                            name:item?.name
                          }
                          dispatch(editStationFunc(data))
                            handleShow("Edit station", true);
                          }}>
                              <td>{item?.name}</td>
                              <td>{item?.d_status=="1" ? "Active" : "Deavtive"}</td>
                            </tr>
                        })
                      }
                      
                    </tbody>
                  </Table>
                </div>
              </div>


              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Branches </h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("add branches", true);
                    }}
                  >
                    Add Branches 
                  </button>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
              <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <thead>
                        <tr >
                            <th> Name</th>
                            <th> Reference</th><th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        perIdKitchenFlow?.branches?.map((item:any,index:number)=>{
                         return <tr>
                              <td>{item?.branch_english}</td>
                              <td>{item?.status=="1" ? "Active" : "Deavtive"}</td>
                              <td >
                        <button
                    className={`btn ${cx.tableinsidebtn}`}
                    onClick={() => {
                      handleShow("Assign KDS To Soulations", true);
                    }}
                  >
                    Assign KDS To Stations
                  </button>
                        </td>
                            </tr>
                        })
                      }
                    </tbody>
                  </Table>
                </div>
              </div>


              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Products  </h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("add product", true);
                    }}
                  >
                    {perIdKitchenFlow?.product?.length>0 ? "Edit" : "Add"} products
                  </button>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
              {
              perIdKitchenFlow?.product?.length>0 ? 
              <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <thead>
                        <tr >
                            <th> Name</th>
                            <th> SKU</th>
                        </tr>
                    </thead>
                    <tbody>
                     {
                          perIdKitchenFlow?.product?.map((item:any,index:number)=>{
                           return <tr >
                                <td>{item?.product_name}</td>
                                <td>{item?.sku}</td>
                              </tr>
                          })
                          }
                           </tbody>
                    </Table>
                  </div> : <div className={`p-4 text-center ${table.noData}`}>
                          Products that this kitchen flow should apply to
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
