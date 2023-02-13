import React, { Fragment, useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import cx from './Modals.module.scss';
import Select from 'react-select';
import { FilterDropdown, SingleFilterDropdown } from "../Dropdown/Dropdowns";
import { tagoptions, addsizevalueoption, addsizevaluethree, addsizevaluetwo, addsizevalueone } from '../../constants/dropdownconstants'
import { AiFillInfoCircle, AiOutlineInfoCircle } from 'react-icons/ai';
import { NavLink, useParams } from "react-router-dom";
import food from "../../images/edit-images.png";
 import { categoryListItems } from "../../redux_toolkit/reducer/menuCategoriesApiReducer";
 import { useDispatch, useSelector } from "react-redux";
 import { addCombo, addSize, comboView, comboViewPerId, getGroup, getSize, groupList, sizeList } from "../../redux_toolkit/reducer/menuComboApiReducer";



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

  const param:any = useParams();
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
const dispatch = useDispatch();
const comboViewCount = useSelector((state:any)=>state.menuComboApiReducer.comboViewCount)
const addComboCount = useSelector((state:any)=>state.menuComboApiReducer.addComboCount)
const addSizeCount = useSelector((state:any)=>state.menuComboApiReducer.addSizeCount)
const getGroupCount = useSelector((state:any)=>state.menuComboApiReducer.getGroupCount)
const getSizeCount = useSelector((state:any)=>state.menuComboApiReducer.getSizeCount)
  const [ordertype, setOrderType] = useState('')
  const [category, setCategory] = useState<any[]>([])
  const [advanceOptions, setadvanceOptions] = useState(false)
  const [inventoryItems, setinventoryItems] = useState(false)
  const [groupData, setGroupData] = useState<any>([])
  const [sizeData, setSizeData] = useState<any[]>([])
  const [sku, setSku] = useState<any>()
  const [comboData, setComboData] = useState({
     nameenglish:"" ,
 namearabic:"" ,
 category:"" ,
 categoryname : "",
 sku:"",
bar_code:"",
des_eng:"",
des_arab:"",
id:"",
removeimage:"",
  })

  const [addSizeData, setAddSizeData] = useState({
    comboid:"",
    name:"",
    localname:""
 })

 useEffect(()=>{
  if(param?.id!==undefined){
  dispatch(getSize({combo_id:param?.id}))
  dispatch(getGroup({combo_id:param?.id}))
  setAddSizeData((prev:any)=>{
    return { ...prev, comboid: param?.id}
  })
  setComboData((prev:any)=>{
    return { ...prev, id: param?.id}
  })
}
 },[])

 useEffect(()=>{
  setComboData({
    nameenglish:comboViewPerId?.data?.english_name ,
namearabic:comboViewPerId?.data?.arabic_name ,
category:comboViewPerId?.data?.category ,
categoryname:comboViewPerId?.data?.categoryname ,
sku:comboViewPerId?.data?.sku,
bar_code:comboViewPerId?.data?.bar_code,
des_eng:comboViewPerId?.data?.english_desc,
des_arab:comboViewPerId?.data?.arabic_desc,
id:param?.id,
removeimage:comboViewPerId?.data?.image,
 })
},[comboViewCount])

  const orderTypehandler = (event: any) => {
    setOrderType(event.label)
  }

  let sizeadvanceoptions = advanceOptions ? 6 : 12;


  useEffect(()=>{
    const number = Math.floor(1000 + Math.random()*9000)
                          setSku(number)
                          setComboData((prev: any) => {
                            return { ...prev, sku: `sk-${number}` };
                          });
  },[props.modalName === 'create combo'])

  const [subshow, setsubShow] = useState(false);
  const [submodalName, setsubModalName] = useState('');
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
    props.handleClose();
  },[addComboCount, addSizeCount])

  useEffect(()=>{
    let data:any[] = [];
    groupList?.map((item:any,index:number)=>{
      data.push({
        label:`Group ${item?.groupname}`,
        value: item?.id
      })
    })
    setGroupData(data)
  },[getGroupCount])

  
  useEffect(()=>{
    let data:any[] = [];
    sizeList?.map((item:any,index:number)=>{
      data.push({
        label: item?.name,
        value: item?.id
      })
    })
    setSizeData(data)
  },[getSizeCount])

  return (
    <>
 
 {/* ############################################################
 ######################## ORDER MODALS ########################### */}

      {/* START Category Create Category */}
      {props.modalName === 'category create category' &&
        <Modal scrollable className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
            <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          The customerʼs Full Name.
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                     Name Localized
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          The customerʼs Full Name.
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Reference
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          The customerʼs Full Name.
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
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
      {/* END Category Create Category */}



      {/* START Delivery Address */}
      {props.modalName === 'delivery address' &&
        <Modal scrollable className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" type="text" style={{ height: '150px' }} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Delivery Zone</Form.Label>
                  <Select
                    isSearchable={true}
                    options={deliveryzone}
                    onChange={(e) => { orderTypehandler(e) }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={props.handleClose}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END Delivery Address */}



      {/* START Combos Filter */}
      {
        props.modalName === 'combos filter' &&
        <Modal scrollable className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Filter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>SKU</Form.Label>
                  <Form.Control type="text" placeholder="sk-0581"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Barcode</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Categories</Form.Label>
                  <FilterDropdown options={tagoptions} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Group</Form.Label>
                  <FilterDropdown options={tagoptions} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Tag</Form.Label>
                  <FilterDropdown options={tagoptions} />
                </Form.Group>
              </Col>

            </Row>
          </Modal.Body>
          <Modal.Footer>
          <div><NavLink to="#" className={`${cx.rightOption}`}>Clear</NavLink></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>
                Save
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END Combos Filter */}


      {/* START Edit Combos */}
      {
        props.modalName === 'edit combos' &&
        <Modal scrollable className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Combo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                  <div className={`${cx.editCategory}`}>
                      <img src={comboData?.removeimage} alt="" />
                      <ul>
                        <li>
                        <NavLink to="#" className={`${cx.rightOption}`}>Image</NavLink>
                        </li>
                        <li>
                        <NavLink to="#" className={`${cx.rightOption}`}>Remove</NavLink>
                        </li>
                      </ul>
                  </div>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" defaultValue={comboData?.nameenglish} onChange={(e: any) => {
                     setComboData((prev: any) => {
                       return { ...prev, nameenglish: e.target.value };
                     });
                   }}/>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name Localized
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" defaultValue={comboData?.namearabic}  onChange={(e: any) => {
                     setComboData((prev: any) => {
                       return { ...prev, namearabic: e.target.value };
                     });
                   }}/>
                </Form.Group>
              </Col>
              
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Category</Form.Label>
                  <Select
                  defaultValue={category.map((item) => {
                    if(item.label === comboData.categoryname){
                    return { value: item.value, label: item.label };
                    }
                  })}
                     isSearchable={true}
                     options={category}
                     onChange={(e:any) => { 
                       setComboData((prev: any) => {
                       return { ...prev, category: e.value };
                     });}}
                     placeholder="Choose...
                     "
                   />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                   <Row>
                   <Col md={7} lg={7}>
                     <Form.Group className={`${cx.formField}`}>
                       <Form.Label>
                         SKU
                         {['top'].map((placement) => (
                           <OverlayTrigger key={placement} overlay={
                             <Tooltip id={`tooltip-${placement}`}>
                               Stock keeping unit, a unique code for your item.
                             </Tooltip>}>
                             <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                           </OverlayTrigger>
                         ))}
                       </Form.Label>
                       <Form.Control type="text" value={sku=="" ? comboData?.sku : `sk-${sku}`} disabled/>
                     </Form.Group>
                   </Col>

                   <Col md={5} lg={5}>
                     <Form.Group className={`${cx.formField}`}>
                       <Form.Label className={`${cx.labelHide}`}>
                         .
                       </Form.Label>
                       <button type="button" className="form-control" onClick={()=>{
                         const number = Math.floor(1000 + Math.random()*9000)
                         setSku(number)
                         setComboData((prev: any) => {
                           return { ...prev, sku: `sk-${number}` };
                         });
                       }}>Generate SKU</button>
                     </Form.Group>
                   </Col>
                   </Row>
               </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Barcode
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" defaultValue={comboData?.bar_code} onChange={(e: any) => {
                     setComboData((prev: any) => {
                       return { ...prev, bar_code: e.target.value };
                     });
                   }}/>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Description
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" defaultValue={comboData?.des_eng} onChange={(e: any) => {
                     setComboData((prev: any) => {
                       return { ...prev, des_eng: e.target.value };
                     });
                   }}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                   Localized Description
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" defaultValue={comboData?.des_arab} onChange={(e: any) => {
                     setComboData((prev: any) => {
                       return { ...prev, des_arab: e.target.value };
                     });
                   }}/>
                </Form.Group>
              </Col>

            </Row>
          </Modal.Body>
          <Modal.Footer>
          <div><NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`}>Delete Combo</NavLink></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={()=>{
                dispatch(addCombo(comboData));
                props.handleClose()
                setTimeout(() => {
                  dispatch(comboView({comboid:param?.id}))
                }, 500);
                setSku("");
              }}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END Edit Combos*/}


         {/* START Customer add tags */}
         {
        props.modalName === 'products add tags' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Tags</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Tags
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <FilterDropdown options={tagoptions} />
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

      {/* END Customer add tags */}

            {/* START Create Combo */}
        { props.modalName === 'create combo' &&
         <Modal scrollable className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
           <Modal.Header closeButton>
             <Modal.Title>Create Combo</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <Row>
               <Col md={12} lg={12}>
                 <Form.Group className={`${cx.formField}`}>
                   <Form.Label>
                     Name
                     {['top'].map((placement) => (
                       <OverlayTrigger key={placement} overlay={
                         <Tooltip id={`tooltip-${placement}`}>
                          
                         </Tooltip>}>
                         <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                       </OverlayTrigger>
                     ))}
                   </Form.Label>
                   <Form.Control type="text" onChange={(e: any) => {
                     setComboData((prev: any) => {
                       return { ...prev, nameenglish: e.target.value };
                     });
                   }}/>
                 </Form.Group>
               </Col>
               <Col md={12} lg={12}>
                 <Form.Group className={`${cx.formField}`}>
                   <Form.Label>
                     Name Localized
                     {['top'].map((placement) => (
                       <OverlayTrigger key={placement} overlay={
                         <Tooltip id={`tooltip-${placement}`}>
                          
                         </Tooltip>}>
                         <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                       </OverlayTrigger>
                     ))}
                   </Form.Label>
                   <Form.Control type="text" onChange={(e: any) => {
                     setComboData((prev: any) => {
                       return { ...prev, namearabic: e.target.value };
                     });
                   }}/>
                 </Form.Group>
               </Col>
              
               <Col md={12} lg={12}>
                 <Form.Group className={`${cx.formField}`}>
                   <Form.Label>Category</Form.Label>
                   <Select
                     isSearchable={true}
                     options={category}
                     onChange={(e:any) => { 
                       setComboData((prev: any) => {
                       return { ...prev, category: e.value };
                     });}}
                     placeholder="Choose...
                     "
                   />
                 </Form.Group>
               </Col>

               <Col md={12} lg={12}>
                   <Row>
                   <Col md={7} lg={7}>
                     <Form.Group className={`${cx.formField}`}>
                       <Form.Label>
                         SKU
                         {['top'].map((placement) => (
                           <OverlayTrigger key={placement} overlay={
                             <Tooltip id={`tooltip-${placement}`}>
                               Stock keeping unit, a unique code for your item.
                             </Tooltip>}>
                             <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                           </OverlayTrigger>
                         ))}
                       </Form.Label>
                       <Form.Control type="text" value={`sk-${sku}`} disabled/>
                     </Form.Group>
                   </Col>

                   <Col md={5} lg={5}>
                     <Form.Group className={`${cx.formField}`}>
                       <Form.Label className={`${cx.labelHide}`}>
                         .
                       </Form.Label>
                       <button type="button" className="form-control" onClick={()=>{
                         const number = Math.floor(1000 + Math.random()*9000)
                         setSku(number)
                         setComboData((prev: any) => {
                           return { ...prev, sku: `sk-${number}` };
                         });
                       }}>Generate SKU</button>
                     </Form.Group>
                   </Col>
                   </Row>
               </Col>

             </Row>
           </Modal.Body>
           <Modal.Footer>
            <div>
               <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                 Close
               </Button>
               <Button className={`${cx.btnSubmit}`} onClick={()=>{
                 dispatch(addCombo(comboData));
                 setSku("");
               }
               }>
                 Apply
               </Button>
             </div>
           </Modal.Footer>
         </Modal>
}
      {/* END Create Combo*/}



      {/* START add size */}
      {
        props.modalName === 'add size popup' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Size</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          Name
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" onChange={(e:any)=>{
                    setAddSizeData((prev:any)=>{
                      return { ...prev, name: e.target.value}
                    })
                  }}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name Localized
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          Name Localized
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" onChange={(e:any)=>{
                    setAddSizeData((prev:any)=>{
                      return { ...prev, localname: e.target.value}
                    })
                  }}/>
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
                dispatch(addSize(addSizeData))
              }}>
                Save
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END add size */}

      {/* START select branch */}
      {
        props.modalName === 'select branch popup' &&
        <Modal scrollable className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Custom Price</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Branch <AiFillInfoCircle/></Form.Label>
                  <FilterDropdown options={addsizevalueone} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Combo Size</Form.Label>
                  <Select
                     isSearchable={true}
                     options={sizeData}
                     placeholder="Choose...
                     "
                   />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Combo Group</Form.Label>
                  <Select
                     isSearchable={true}
                     options={groupData}
                     placeholder="Choose...
                     "
                   />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Option</Form.Label>
                  <FilterDropdown options={addsizevalueoption} />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                   Price (SAR)
                  </Form.Label>
                  <Form.Control type="number" />
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
                Save
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END select branch */}

      {/* START edit tags popup */}
      {
        props.modalName === 'edit tags popup' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit tags</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Tags <AiFillInfoCircle/></Form.Label>
                  <FilterDropdown options={addsizevalueone} />
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
                Save
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END edit tags popup */}

      {/* START inactive select branches popup */}
      {
        props.modalName === 'inactive select branches popup' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Select Branches</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  {inventoryItems ? <Form.Label className="d-block">
                    Branches
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          To select a tag contains the Items.
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}

                    <NavLink className={`${cx.rightLabel}`} to="#" onClick={() => { setinventoryItems(false) }}>Select Items?</NavLink>
                  </Form.Label> : <Form.Label className="d-block">
                    Branches
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          To select the Items.
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                    <NavLink className={`${cx.rightLabel}`} to="#" onClick={() => { setinventoryItems(true) }}>Select by tags?</NavLink>
                  </Form.Label>
                  }

                  <FilterDropdown options={addsizevalueone} />
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
                Save
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END inactive select branches popup */}

      {/* START add option popup */}
      {
        props.modalName === 'add option popup' &&
        <Modal scrollable className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Option</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          Name
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name Localized
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          Name Localized
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <h6>Size: Size1 </h6>
                  <Form.Label>Product</Form.Label>
                  <FilterDropdown options={addsizevalueoption} />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                   Price (SAR)
                  </Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <h6>Size: Size2 </h6>
                  <Form.Label>Product</Form.Label>
                  <FilterDropdown options={addsizevalueoption} />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                   Price (SAR)
                  </Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <h6>Size: Size3 </h6>
                  <Form.Label>Product</Form.Label>
                  <FilterDropdown options={addsizevalueoption} />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                   Price (SAR)
                  </Form.Label>
                  <Form.Control type="number" />
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
                Save
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END add option popup */}

      {/* START group edit popup */}
      {
        props.modalName === 'group edit popup' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Size</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          Name
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name Localized
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          Name Localized
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Label className={`${cx.checkboxlabel}`}>
                  <input type="checkbox" className={`${cx.checkboxinput}`} />
                  Upgradable
                </Form.Label>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
          <div><NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`}>Delete</NavLink></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>
                Save
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END group edit popup */}


      

      


    </>
  );
};

export default Modals;
