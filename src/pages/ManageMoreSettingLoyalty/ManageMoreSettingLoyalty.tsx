import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageMoreSettingLoyalty.module.scss";
import cy from "../../components/Modals/Modals.module.scss";
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
} from "react-bootstrap";
import NavLink from "react-bootstrap";

import { AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { FilterDropdown } from "../../components/Dropdown/Dropdowns";
import { timeFilter, costingmethodfilter, choosefilter } from "../../constants/dropdownconstants";



export default function ManageMoreSettingsLoyalty() {
  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageWrapperInside} ${st.setWidth}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Loyalty Settings</h5>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <Row>

                <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        <input
                          type="checkbox"
                          className={`${cy.checkboxinput}`}
                        />
                        Enable Loyalty
                      </Form.Label>
                    </Form.Group>
                  </Col>
                <Col md={12} lg={12}>
                <Form.Group className={`${cy.formField}`}>
                  
                    <Form.Label  className={`${cy.editbranchfield}`}>
                            <p>
                        When your customer spends (SAR 1) or more on 1 order, they will get (1 point) for each (SAR 1) spent. The points are added after (60 mintues) from closing the order. </p>
                        <p>Once the customer accumulates (1 points) they can receive an order discount of ( 10 %) up to (SAR 10) within (365 days) from the creation date.</p>

                    
                      </Form.Label> 
                </Form.Group>
              </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        Loyalty Method 
                       
                      </Form.Label>
                      <Form.Control type="text" placeholder=" Points" />
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                      Minimum Order Price (SAR)
                       
                      </Form.Label>
                      <FilterDropdown options={ costingmethodfilter}/>
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                      Earning Delay (Minute)
                        
                      </Form.Label>
                      <Form.Control type="text" placeholder="60" />
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                      Reward Type
                      </Form.Label>
                      <FilterDropdown options={choosefilter} />
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                      Reward Value (%)
                        
                      </Form.Label>
                      <Form.Control type="text" placeholder="10" />
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                      Maximum Discount Amount (SAR)
                       
                      </Form.Label>
                      <Form.Control type="text" placeholder="10" />
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                      Reward Required Points
                       
                      </Form.Label>
                      <Form.Control type="text" placeholder="1" />
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                      Reward Validity (Days)
                       
                      </Form.Label>
                      <Form.Control type="text" placeholder="365" />
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        <input
                          type="checkbox"
                          className={`${cy.checkboxinput}`}
                        />{" "}
                        Send Notifications By SMS
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                {" "}
                                Restrict Purchased Items To Suppiler
                              </Tooltip>
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
                  </Col>
                </Row>
                <Modal.Footer  className= {`${cy.bottomRight}`}>
            <div>
            <Button className={`${cx.saveBtn}`}>Save Changes </Button>
            </div>
          </Modal.Footer>

              </div>
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  );
}
