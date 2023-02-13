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
import { addEditDeletekitchenFlow, addEditStation, addProductKitchenFlow, branchAddData, deleteStation, editStationData, getProductApi, kitchenFlowPerIdData, productDataListItems } from "../../redux_toolkit/reducer/manageMoreKitchenFlowApiReducer";
import { useDispatch, useSelector } from "react-redux";
import { userBranchFilterValue, userBranchList, userBranchListItems } from "../../redux_toolkit/reducer/manageBranchApiReducer";

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
  const kitchenFlowState = useSelector((state:any)=>state.manageMoreKitchenFlowApiReducer)
  const userBranchListCount = useSelector((state:any)=>state.manageBranchApiReducer.userBranchListCount)
  const dispatch = useDispatch();
  const [ordertype, setOrderType] = useState("");
  const [advanceOptions, setadvanceOptions] = useState(false);
  const [inventoryItems, setinventoryItems] = useState(false);
  const orderTypehandler = (event: any) => {
    setOrderType(event.label);
  };

  let sizeadvanceoptions = advanceOptions ? 6 : 12;

  const [subshow, setsubShow] = useState(false);
  const [submodalName, setsubModalName] = useState("");
  const [addKitchenFlowData, setAddKitchenFlowData] = useState({
    restaurent_id:"",
    name:""
  })
  const [editKitchenFlowData, setEditKitchenFlowData] = useState({
    id:"",
    restaurent_id:"",
    name:""
  })
  const [addStationData, setAddStationData] = useState({
    kitchenflow_id:"",
    restaurent_id:"",
    name:""
  })
  const [brachSelectedData, setBranchSelectedData] = useState({
     branch_id: "",
     kitchenflow_id: "",
     restaurent_id: ""
  })
  const [productSelectedData, setProductSelectedData] = useState({
    product_id: "",
    kitchenflow_id: "",
    restaurent_id: ""
 })
  const [branchData, setBranchData] = useState<any[]>([])
  const [productData, setProductData] = useState<any[]>([])
  const subdeliveryAddress = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow");
    setsubModalName(modalname);
    setsubShow(status);
  };
  const subhandleClose = () => {
    setsubShow(false);
    setsubModalName("");
  };

  useEffect(() => {
    const restaurantId = JSON.parse(localStorage.getItem("___data")!)
    setAddKitchenFlowData((prev:any)=>{
      return {...prev, restaurent_id:restaurantId.restaurent_id}
    })
  }, [])

  useEffect(()=>{
    const restaurantId = JSON.parse(localStorage.getItem("___data")!)
    userBranchFilterValue.type = "all";
    dispatch(userBranchList(userBranchFilterValue));
    dispatch(getProductApi({restaurent_id:restaurantId?.restaurant_id}))
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
  
  useEffect(()=>{
     props.handleClose();
  },[kitchenFlowState.addEditDeletekitchenFlowCount, kitchenFlowState.addEditStationCount, kitchenFlowState.deleteStationCount, kitchenFlowState.branchAddDataCount, kitchenFlowState.addProductKitchenFlowCount])

  useEffect(()=>{
    const restaurantId = JSON.parse(localStorage.getItem("___data")!)
    setEditKitchenFlowData({
      restaurent_id:restaurantId?.restaurant_id,
      id: kitchenFlowPerIdData?.id,
      name: kitchenFlowPerIdData?.name
    })
    setAddStationData({
      restaurent_id:restaurantId?.restaurant_id,
      kitchenflow_id: kitchenFlowPerIdData?.id,
      name:""
    })
    setBranchSelectedData({
      restaurent_id:restaurantId?.restaurant_id,
      kitchenflow_id: kitchenFlowPerIdData?.id,
      branch_id:""
    })
    setProductSelectedData({
      restaurent_id:restaurantId?.restaurant_id,
      kitchenflow_id: kitchenFlowPerIdData?.id,
      product_id:""
    })
  },[kitchenFlowState.kitchenFlowPerIdCount])

  function branchPostData(branch: string) {
    setBranchSelectedData((prev:any)=>{
      return {...prev, branch_id:branch}
    })
  }

  function productPostData(branch: string) {
    setProductSelectedData((prev:any)=>{
      return {...prev, product_id:branch}
    })
  }

  return (
    <>

{props.modalName === "kitchen filter" && (
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
                    Active {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}> Active </Tooltip>
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
              
            </Row>
          </Modal.Body>
          <Modal.Footer >
          <div>
              <NavLink to="#" className={`${cx.rightOption} `}>
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

{props.modalName === "Create Kitchen Flows" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Kitchen Flow </Modal.Title>
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
                  <Form.Control type="text" placeholder="hayat" onChange={(e:any)=>{
                    setAddKitchenFlowData((prev:any)=>{
                      return {...prev, name:e.target.value}
                    })
                  }}/>
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
                dispatch(addEditDeletekitchenFlow(addKitchenFlowData))
              }}>Save</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}


{props.modalName === "Edit Kitchen Flow" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Kitchen Flow </Modal.Title>
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
                  <Form.Control type="text" placeholder="1" defaultValue={editKitchenFlowData?.name} onChange={(e:any)=>{
                    setEditKitchenFlowData((prev:any)=>{
                      return {...prev, name:e.target.value}
                    })
                  }}/>
                </Form.Group>
              </Col>
              
            </Row>
          </Modal.Body>
          <Modal.Footer >
          <div>
              <NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`} onClick={()=>{
                dispatch(addEditDeletekitchenFlow(editKitchenFlowData))
              }}>
                Delete Kitchen Flow  
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
                dispatch(addEditDeletekitchenFlow(editKitchenFlowData))
              }}>Save</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}



      
{props.modalName === "add station" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Station </Modal.Title>
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
                    setAddStationData((prev:any)=>{
                      return {...prev, name:e.target.value}
                    })
                  }}/>
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
                dispatch(addEditStation(addStationData))
              }}>Save</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

{props.modalName === "Edit station" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Station </Modal.Title>
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
                  <Form.Control type="text" placeholder="dfef" defaultValue={editStationData.name} onChange={(e:any)=>{
                    editStationData.name = e.target.value
                  }}/>
                </Form.Group>
              </Col>
              
            </Row>
          </Modal.Body>
          <Modal.Footer  >
          <div>
              <NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`} onClick={()=>{
                dispatch(deleteStation({id:`${editStationData.id}`}))
              }}>
                Delete Station 
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
              <Button className={`${cx.btnSubmit}`}
                onClick={()=>{
                  dispatch(addEditStation(editStationData))
                }}>Save</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

            
{props.modalName === "add branches" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Branches </Modal.Title>
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
                  <FilterDropdown options={branchData} postdata={branchPostData}/>
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
                dispatch(branchAddData(brachSelectedData))
              }}>Save</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}


            
{props.modalName === "add product" && (
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
                  <FilterDropdown options={productData} postdata={productPostData}/>
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
                dispatch(addProductKitchenFlow(productSelectedData))
              }}>Save</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
{props.modalName === "Assign KDS To Soulations" && (
        <Modal
          
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Assign KDS To Stations </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                  djsdogerh 
                  </Form.Label>
                 <FilterDropdown options={filtertagoptions}/>
                </Form.Group>
              </Col>
              
            </Row>
          </Modal.Body>
          <Modal.Footer>
            
          <div>
              <NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`}>
                Delete 
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

{props.modalName === "sort stations" && (
        <Modal
          scrollable
          className={`${cx.ctsModal} ${cx.ctsModalSize}`}
          size="lg"
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sort Stations</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg={3}>
                <NavLink to="#" className={`${cx.customerInsightmoreOption}`}>
                  <div className={`${cx.customerInsight}`}>
                    <div>3</div>
                    
                  </div>
                </NavLink>
              </Col>
              <Col lg={3}>
                <NavLink to="#" className={`${cx.customerInsightmoreOption}`}>
                  <div className={`${cx.customerInsight}`}>
                  <div>1</div>
                  </div>
                </NavLink>
              </Col>
              <Col lg={3}>
                <NavLink to="#" className={`${cx.customerInsightmoreOption}`}>
                  <div className={`${cx.customerInsight}`}>
                  <div>2</div>
                  </div>
                </NavLink>
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
              <Button className={`${cx.btnSubmit}`}>Save</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      
    </>
  );
};

export default Modals;
