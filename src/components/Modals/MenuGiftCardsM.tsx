import React, { Fragment, useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import cx from './Modals.module.scss';
import Select from 'react-select';
import { FilterDropdown, SingleFilterDropdown } from "../Dropdown/Dropdowns";
import { tagoptions, customertagoptions, customertimezone, itemoption, ingredientsoptions, pricingMethod } from '../../constants/dropdownconstants'
import { AiFillInfoCircle, AiOutlineInfoCircle } from 'react-icons/ai';
import { NavLink } from "react-router-dom";
import food from "../../images/edit-images.png";
import { categoryListItems } from "../../redux_toolkit/reducer/menuCategoriesApiReducer";
import { addGiftCardBranches, addGiftCardTags, addGiftCardType, addGiftCardTypeName, editGift, giftCardId, parameterTagAndBranch, saveGift, viewPerSingleDetails } from "../../redux_toolkit/reducer/menuGiftCardReducer";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const addGiftCount = useSelector((state:any)=> state.menuGiftCardReducer.addGiftCount)
  const viewPerSingleCount = useSelector((state:any)=> state.menuGiftCardReducer.viewPerSingleCount)
  const addGiftCardTagsCount = useSelector((state:any)=>state.menuGiftCardReducer.addGiftCardTagsCount)
  const addGiftCardBranchesCount = useSelector((state:any)=>state.menuGiftCardReducer.addGiftCardBranchesCount)
  
  const editGiftCount = useSelector((state:any)=> state.menuGiftCardReducer.editGiftCount)
  const [ordertype, setOrderType] = useState('')
  const [advanceOptions, setadvanceOptions] = useState(false)
  const [inventoryItems, setinventoryItems] = useState(false)
  const orderTypehandler = (event: any) => {
    setOrderType(event.label)
  }

  let sizeadvanceoptions = advanceOptions ? 6 : 12;


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
  const [addGift, setAddGift] = useState({
    english_name:"",
    localized:"",
    category:"",
    method:"Fixed Price",
    price:"",
    barcode:"",
    sku:"",
    restaurant_id:""
  })
  const [sku, setSku] = useState<any>()
  const [category, setCategory] = useState<any[]>([])
  const [allDataGiftCard, setAllDataGiftCard] = useState("");
  const [giftDetails,setGiftDetails] = useState<any>()
  const handlesetAllDataGiftCard = (Data: any) => {
    debugger
    let Ids = "";
    Data.map((res: any) => { Ids += res.value + "," });
    Ids = Ids.slice(0,-1);
    setAllDataGiftCard(Ids);
  }
  useEffect(()=>{
    if(viewPerSingleCount!==undefined)
    setGiftDetails(viewPerSingleDetails)
  },[viewPerSingleCount])

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("___data")!)
    setAddGift({
    english_name:viewPerSingleDetails?.getEvent?.english_name ? viewPerSingleDetails?.getEvent?.english_name : "",
    localized:viewPerSingleDetails?.getEvent?.arabic_name ? viewPerSingleDetails?.getEvent?.arabic_name : "",
    category:viewPerSingleDetails?.getEvent?.category?.name ? viewPerSingleDetails?.getEvent?.category?.name : "",
    method:viewPerSingleDetails?.getEvent?.price_type ? viewPerSingleDetails?.getEvent?.price_type : "Fixed Price",
    price:viewPerSingleDetails?.getEvent?.price ? viewPerSingleDetails?.getEvent?.price : "",
    barcode:viewPerSingleDetails?.getEvent?.Barcode ? viewPerSingleDetails?.getEvent?.Barcode : "",
    sku:viewPerSingleDetails?.getEvent?.sku ? viewPerSingleDetails?.getEvent?.sku : "",
    restaurant_id:data?.restaurant_id
    })
  },[viewPerSingleCount])

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
    const number = Math.floor(1000 + Math.random()*9000)
                          setSku(number)
                          setAddGift((prev: any) => {
                            return { ...prev, sku: `sk-${number}` };
                          });
  },[props.modalName === 'create gift cards'])

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("___data")!)
      setAddGift((prev: any) => {
        return { ...prev, restaurant_id: data?.restaurant_id };
      });
  },[])

  useEffect(()=>{
     props.handleClose();
  },[addGiftCount, editGiftCount, addGiftCardBranchesCount, addGiftCardTagsCount])

  function allTagModifierData(data: string) {
    props.postdata(data);
    setAllDataGiftCard(data)
  }

  function defaultValues(taxGroup:OptionsFilter) {
    console.log(taxGroup,"taxGroup")
    let taxGroupArray = [];
    taxGroupArray.push(taxGroup.value)
    // const check = ([allDataProduct, taxGroupArray[0]].join(","))
    // console.log(taxGroupArray,"taxGroupArray")
    // setAllDataProduct(check)
    // console.log(allDataProduct,"taxGroupArray12")
  }

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
      {submodalName === 'delivery address' &&
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
              <Button className={`${cx.btnClose}`} onClick={subhandleClose}>
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



      {/* START Gift Filter Filter */}
      {
        props.modalName === 'gift cards filter' &&
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
                  <Form.Control type="text" />
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
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Pricing Method</Form.Label>
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
      {/* END Gift Filter Filter */}


      {/* START Edit Combos */}
      {
        props.modalName === 'edit combos' &&
        <Modal scrollable className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Gift Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                  <div className={`${cx.editCategory}`}>
                      <img src={food} alt="" />
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
                  <Form.Control type="text" defaultValue={addGift.english_name} onChange={(e: any) => {
                    setAddGift((prev: any) => {
                      return { ...prev, english_name: e.target.value };
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
                  <Form.Control type="text" defaultValue={addGift.localized} onChange={(e: any) => {
                    setAddGift((prev: any) => {
                      return { ...prev, localized: e.target.value };
                    });
                  }}/>
                </Form.Group>
              </Col>
              
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Category</Form.Label>
                  <Select
                  defaultValue={category.map((item) => {
                    if(item.value === addGift.category){
                    return { value: item.value, label: item.label };
                    }
                  })}
                    isSearchable={true}
                    options={category}
                    onChange={(e:any) => { 
                      setAddGift((prev: any) => {
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
                      <Form.Control type="text" defaultValue={addGift.sku !== "" ? addGift.sku : `sk-${sku}`} />
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
                        setAddGift((prev: any) => {
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
                  <Form.Control type="text" defaultValue={addGift.barcode} onChange={(e:any) => { 
                      setAddGift((prev: any) => {
                      return { ...prev, barcode: e.target.value };
                    });}}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Pricing Method *</Form.Label>
                  <Select
                    isSearchable={true}
                    options={pricingMethod}
                    defaultValue={pricingMethod.map((item) => {
                      if(item.value === addGift.method){
                      return { value: item.value, label: item.label };
                      }
                    })}
                    onChange={(e:any) => { 
                      setAddGift((prev: any) => {
                      return { ...prev, method: e.value };
                    });}}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>

              {addGift.method === "Fixed Price" && <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Price (SAR) *
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" defaultValue={addGift.price} onChange={(e:any) => { 
                      setAddGift((prev: any) => {
                      return { ...prev, price: e.target.value };
                    });}}/>
                </Form.Group>
              </Col>
}
            </Row>
          </Modal.Body>
          <Modal.Footer>
          <div><NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`}>Delete Gift Card</NavLink></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={()=>{
                dispatch(editGift(addGift))
              }}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END Edit Combos*/}



            {/* START Create Gift Cards */}
            {
        props.modalName === 'create gift cards' &&
        <Modal scrollable className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Gift Card</Modal.Title>
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
                    setAddGift((prev: any) => {
                      return { ...prev, english_name: e.target.value };
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
                    setAddGift((prev: any) => {
                      return { ...prev, localized: e.target.value };
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
                      setAddGift((prev: any) => {
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
                        setAddGift((prev: any) => {
                          return { ...prev, sku: `sk-${number}` };
                        });
                      }}>Generate SKU</button>
                    </Form.Group>
                  </Col>
                  </Row>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Pricing Method</Form.Label>
                  <Select
                  defaultValue={{
                    value: "Fixed Price",
                    label: "Fixed Price",
                  }}
                    isSearchable={true}
                    options={pricingMethod}
                    onChange={(e:any) => { 
                      setAddGift((prev: any) => {
                      return { ...prev, method: e.value };
                    });}}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>

              {addGift.method === "Fixed Price" && <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                     Price (SAR) *
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" onChange={(e: any) => {
                    setAddGift((prev: any) => {
                      return { ...prev, price: e.target.value };
                    });
                  }}/>
                </Form.Group>
              </Col>
             }

            </Row>
          </Modal.Body>
          <Modal.Footer>
         <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={()=>{
                dispatch(saveGift(addGift))
              }}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END Create Gift Cards*/}

      {
        props.modalName === 'giftcard add tags' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> {addGiftCardType} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    {addGiftCardTypeName === "Inactive" ? "Inactive In Branches" : addGiftCardTypeName}
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <FilterDropdown setAllData={handlesetAllDataGiftCard} options={tagIngeModifier} postdata={allTagModifierData} defaultdata={defaultValues} defaultoptions={viewPerSingleDetails?.[parameterTagAndBranch]?.map((item:any)=>{return{value:item?.id,label:item?.name ? item?.name : item?.english_name}})}/>
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
               addGiftCardTypeName === "Tags" ? dispatch(addGiftCardTags({tag_id:allDataGiftCard, gift_id:giftCardId})) : dispatch(addGiftCardBranches({branch_id:allDataGiftCard, gift_id:giftCardId}))
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
