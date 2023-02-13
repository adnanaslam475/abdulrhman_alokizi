import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageMoreSettingReceipt.module.scss";
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
import { timeFilter ,mainlocalize,languagetag,reportsfilterordertags} from "../../constants/dropdownconstants";



export default function ManageMoreSettingReceipt() {
  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageWrapperInside} ${st.setWidth}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Receipt Settings </h5>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <Row>

                <Col md={12} lg={12}>
                <Form.Group className={`${cy.formField}`}>
                  <Form.Label  className={`${cy.cameraiconfleld}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      className={`${cy.cameraicon}`}
                    >
                      <path d="M0 6c0-1.1.9-2 2-2h3l2-2h6l2 2h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm10 10a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
                    </svg>
                    <div className={`${cx.fileinput}`}>
                        <h4> Upload image </h4>
                        <input type="file" />
                    </div>
                    
                    {["top"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        overlay={
                          <Tooltip id={`tooltip-${placement}`}>
                            {" "}
                            Upload image required
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
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        Print Language
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                {" "}
                                Language
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
                      <FilterDropdown options={mainlocalize}/>
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        Main Language
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                Main Language 
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
                      <FilterDropdown options={languagetag}/>
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        Localized Language
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                Localized Language 
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
                      <FilterDropdown options={reportsfilterordertags}/>
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                      Receipt Header
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                Receipt Header 
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
                      <Form.Control type="text" placeholder="welcome"/>
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                      Receipt Footer
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                Receipt Footer 
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
                      <Form.Control type="text" placeholder="الرقم الضريبي : 302221635200003
شارع الملك سعود، السلام الأول، المبرز 36422"/>
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                      Invoice Title
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                Invoice Type
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
                      <Form.Control type="text" placeholder="Simplified Tax Invoice"/>
                    </Form.Group>
                  </Col>

                 
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        <input
                          type="checkbox"
                          className={`${cy.checkboxinput}`}
                        />{" "}
                        Show Order Number
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                              Show Order Number
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
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        <input
                          type="checkbox"
                          className={`${cy.checkboxinput}`}
                        />{" "}
                       Show Calories
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                             Show Calories
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
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        <input
                          type="checkbox"
                          className={`${cy.checkboxinput}`}
                        />Show Subtotal
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                              Show Subtotal
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
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        <input
                          type="checkbox"
                          className={`${cy.checkboxinput}`}
                        />Show Rounding
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                              Show Rounding
                                
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
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        <input
                          type="checkbox"
                          className={`${cy.checkboxinput}`}
                        />Show Closer Username
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                Show Closer Username
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
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        <input
                          type="checkbox"
                          className={`${cy.checkboxinput}`}
                        />Show Creator Username
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                Show Creator Username
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
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        <input
                          type="checkbox"
                          className={`${cy.checkboxinput}`}
                        />Show Check Number
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                          Show Check Number
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
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        <input
                          type="checkbox"
                          className={`${cy.checkboxinput}`}
                        />Hide Free Modifier Options
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                               Hide Free Modifier Options
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
