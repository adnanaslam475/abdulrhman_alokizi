import React, { Fragment, useState } from "react";
import { Button, Modal, Row, Col, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import cx from './Modals.module.scss';
import Select from 'react-select';
import { FilterDropdown, SingleFilterDropdown } from "../Dropdown/Dropdowns";
import { tagoptions, customertagoptions, customertimezone, itemoption, ingredientsoptions, reportsfilterordertags } from '../../constants/dropdownconstants'
import { AiFillInfoCircle, AiOutlineInfoCircle } from 'react-icons/ai';
import { NavLink } from "react-router-dom";



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

  return (
    <>
         {/* START new inventory count */}
         {
        props.modalName === 'new inventory count' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Inventory Count</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              
            <Col md={12} lg={12}>
              <Form.Group className={`${cx.formField}`}>
                <Form.Label>
                Branch
                  {['top'].map((placement) => (
                    <OverlayTrigger key={placement} overlay={
                      <Tooltip id={`tooltip-${placement}`}>
                        Branch where youʼre counting items.
                      </Tooltip>}>
                      <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                    </OverlayTrigger>
                  ))}
                </Form.Label>
                <SingleFilterDropdown options={ingredientsoptions} />
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
      {/* END new inventory count */}

       {/* START inventory count Filter */}
       {
        props.modalName === 'inventory count filter' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Filter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
            <Col md={12} lg={12}>
              <Form.Group className={`${cx.formField}`}>
                <Form.Label>
                Reference
                </Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>

            <Col md={12} lg={12}>
              <Form.Group className={`${cx.formField}`}>
                <Form.Label>
                Business Date
                </Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>
            <Col md={12} lg={12}>
              <Form.Group className={`${cx.formField}`}>
                <Form.Label>
                Status
                </Form.Label>
                <Form.Select>
                  <option value="1">Any</option>
                  <option value="2">Draft</option>
                  <option value="3">Pending</option>
                  <option value="3">Closed</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  {inventoryItems ? <Form.Label className="d-block">
                  Branch
                    <NavLink className={`${cx.rightLabel}`} to="#" onClick={() => { setinventoryItems(false) }}>Select Items?</NavLink>
                  </Form.Label> : <Form.Label className="d-block">
                    Items
                    <NavLink className={`${cx.rightLabel}`} to="#" onClick={() => { setinventoryItems(true) }}>Select by tags?</NavLink>
                  </Form.Label>
                  }
                  <FilterDropdown options={ingredientsoptions} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className="d-block">
                  Creator
                  </Form.Label>
                  <FilterDropdown options={ingredientsoptions} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Updated After 
                  </Form.Label>
                  <Form.Control type="date" />
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
      {/* END inventory count Filter */}



      {
        props.modalName === 'edit item transfer' &&
        <Modal className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ''}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Inventory Count</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
           <Row>
           <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Branch</Form.Label>
                  <FilterDropdown options={reportsfilterordertags}/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Notes</Form.Label>
                  <Form.Control as="textarea" type="text" style={{ height: '50px' }} />
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
      {/* END edit item transfer */}

      
      {/* START edit import files */} 
      {
        props.modalName === 'import files' &&
        <Modal scrollable className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ''}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Import Items</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
           <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Notes</Form.Label>
                  <p><input type="file" /></p>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div><NavLink to="#" className={`${cx.rightOption}`}>Download Files</NavLink></div>
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
      {/* END import files */}



      {/* START add items */} 
      {
        props.modalName === 'add items' &&
        <Modal  className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ''}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Items</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
           <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  {inventoryItems ? <Form.Label className="d-block">
                  Items 
                    <NavLink className={`${cx.rightLabel}`} to="#" onClick={() => { setinventoryItems(false) }}>Select branches?</NavLink>
                  </Form.Label> : <Form.Label className="d-block">
                  Branch 
                    <NavLink className={`${cx.rightLabel}`} to="#" onClick={() => { setinventoryItems(true) }}>Select by tags?</NavLink>
                  </Form.Label>
                  }
                  <FilterDropdown options={ingredientsoptions} />
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
      {/* END add items */}


      
      {/* START quantities */} 
      {
        props.modalName === 'quantities' &&
        <Modal scrollable className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ''}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Items Quantities</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
           <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Broom (8)</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Dust Pan (3) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Squeegee (6) *  </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Mop Bucket (2) *  </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Mop Head (8) *  </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Push Brush Hard (3) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Window Squeegee (4)  * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Dust Pan with Broom (3) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Spray Bottle (3)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Towel (5)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Toilet Dispenser (2)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Caution wet Sign (3) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>ALUMINUM SCRAPPER (1)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Tongs Green Handle (3)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Pasta Tong Bend (2) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Laddle ( Small ) (5) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Piping Bag (5)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Red Lid Plastic Container ( Medium ) (5)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Cake Tray Square (6)  * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Plastic Sauce Container ( Medium ) (10)  * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>First Aid Kit Box (1) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Square Stainless Steel Container ( Big ) (16) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Square Stainless Steel Container ( Medium ) (12) </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Square Stainless Steel Container ( Small ) (10) *  </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Square Plastic Container (13) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>OVEN (1) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>MICROWAVE (1)  * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>FRYER SINGLE VAT (1) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Pipping Nozzel (1) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>REACHING FREEZER (1)  * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>BOILER MACHINE (1) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>CYLIMANDER (1) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>STOVE (2) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>GRILL (1)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>REACHING CHILLER (5) </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>PIZZA OVEN (1)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>WEIGHIN SCALE (4)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>SMALL MIXER MACHINE (3)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>BIG MIXER MACHINE (1) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>TOASTER MACHINE (1) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>BLENDER (1) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>FLAT GRILL (1) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>JUICE MACHINE (1)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>CAN OPENER BIG (1) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>SLICER (1)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>GRINDER (1) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>HAND GRINDER (1)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>PRINTER (7) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>CASH DRAWER (1) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>IPAD (2)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>IPAD HOLDER (1)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>AROMA DIFFUSER (4)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>ICE MACHINE (1)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>FIRE EXTINGUISHER (2)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Trolly (1)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Lighter (3) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Thermometer Food (4) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Thermometer Wall (1)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>LAMINATING MACHINE (1) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>LETTUCE STRAINER (1)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>EGG SLICER (2) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>ROUND CUTTER (3)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>STAINLESS BOWL (60)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>SAUCE BOWL SMALL AND BIG (200)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>BOLONESE POT AND STAND (60)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>CANDLE STAND (60)  </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>FLOWER VASE (60)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>MAIN COURSE (60)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>PASTA PLATE (60)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>SPHAGETTI PLATE (60)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>SOUP BOWL (60) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>SERVICE PLATE (120) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>SALAD PLATE (60)* </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>CHELLO BOWL (120) * </Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>BRANDING PLATE (60)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>PIZZA PLATE (60) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>RAMPKIN SOUCES (60) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>BRUSCHETA PLATE (120)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>CHAIRS (54)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>TABLES (63)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Non Sticky Pan ( Medium ) (3)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Non Sticky Pan ( Large ) (3) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Sauce Pan ( Medium ) (3) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Sauce Pan ( Large ) (6) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Sauce Container ( Large ) (2)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Tongs ( Medium ) (2) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Pasta Tong (4)  *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Dough Scrapper (2)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Slicer big (2)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Slicer Medium (2) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Balloon Beater ( Medium ) (3) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Balloon Beater ( Large ) (3) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Balloon Beater ( Small ) (3)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Mandelin Silicon (2) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Hand Greater (3) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Pizza Tray (2)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Silicon Spatula ( Big ) (4) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Tea Strainer (2)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Pizza Big Box (5) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Can Opener Big (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Can Opener Small (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Weighing Machine (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Weighing Scale (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Weighing Scale ( Small ) (2) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Slicer (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Hand Brender (1)  *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Blender Machine (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Mixer Machine (1)   *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Mixer Machine ( Large ) (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Measuring mug ( Small ) (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Measuring mug ( Medium ) (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Measuring mug ( Large ) (1)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Spices Box (4)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Sharpening Knife (2)  *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Sharpening Stone (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Plastic Container Square ( Big ) (5)  *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Tape Machine (2) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Yellow Chopping Board (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>White Chopping Board (2)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Green Chopping Board (4) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Blue Chopping Board (1)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Red Chopping Board (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Brown Chopping Board (1)  *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Chopping Board Stand (2)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Bread Knife ( Medium ) (2) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Bread Cake ( Large ) (1) **</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Steel Spatula (4)  *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Trash Bin ( Mediun ) (4)  *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Trash Bin ( Large ) (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Pale for baking (3) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Pale (3) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Oven Brush (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Oven Glover (3) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>COLA (1)  *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>COLA ZERO (1)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>SPRITE (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>SPARKLING WATER (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>STILL WATER (1)  *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>PASSION FRUIT (1)  *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>MINT SYRUP (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>MIX BERRY SYRUP (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>STRAWBERRY SYRUP (1)  *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>LEMON SYRUP (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>AMARETTI (1)  *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>TISSUE ROLL (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>TISSUE PREGO (1)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>WET WIPES (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>PAPER BAG (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>PLASTIC CUPS (1)  *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>PLASTIC CUTLERY (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>PAPER ROLL (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>SPAM ROLL MADA (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>STRAWS (1)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>PLASTIC BOWL & LIDS (1)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>CANDLE (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>BALSAMIC VINEGAR (1)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>OLIVE OIL (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>BLACK PEPPER (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>SALT (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>KETCHUP (1)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>TABASSCO (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>GINGER (1)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>MINT (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>STRAWBERRY (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>BLUEBERRY (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>RASPBERRY (1)*</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>BLACKBERRY (1) *</Form.Label>
                  <Form.Control type="number" placeholder="0"/>
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
      {/* END quantities */}
      
      {/* START reject */}
      {
        props.modalName === 'reject' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Are you sure you want to receive items ?</Form.Label>
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
              <Button className={`${cx.btnSubmit}`} style={{ backgroundColor:'#FA8072', borderColor:'#FA8072' }}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END reject */}


      
      {
        props.modalName === 'transferitemsfilter' &&
        <Modal scrollable className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ''}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Item: Broom</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
           <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Quantity (8) * </Form.Label>
                  <Form.Control type="number" placeholder="0" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Quantity (1) * </Form.Label>
                  <Form.Control type="number" placeholder="0" />
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


    </>
  );
};

export default Modals;
