import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageMoreSettingsGeneral.module.scss";
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
import { timefilter } from "../../constants/dropdownconstants";



export default function ManageMoreSettingsGeneral() {
  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageWrapperInside} ${st.setWidth}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>General Settings </h5>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <Row>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        Country{" "}
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                {" "}
                                Country
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
                      <Form.Control type="text" placeholder=" Country" />
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        Currency
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                {" "}
                                Currency
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
                      <Form.Control type="text" placeholder="SAR" />
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        Business Name
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                {" "}
                                Business Name{" "}
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
                      <Form.Control type="text" placeholder="لحمة وفحمة" />
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        Time Zone
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                {" "}
                                Time Zone
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
                      {/* <Form.Control
                        type="text"
                        placeholder="Asia/Saudi Arabia (GMT+03:00)"
                      /> */}
                      <FilterDropdown options={timefilter} />
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        Tax Registration Name
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                {" "}
                                Tax Registration Name
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
                      <Form.Control type="text" placeholder="لحمة وفحمة" />
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        Tax Number
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                {" "}
                                Tax Number
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
                      <Form.Control type="text" placeholder="88334651476999" />
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label className={`${cy.checkboxlabel}`}>
                        <input
                          type="checkbox"
                          className={`${cy.checkboxinput}`}
                        />{" "}
                        Tax Inclusive Pricing{" "}
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                {" "}
                                Tax Inclusive Pricing
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
                        Enable Localization{" "}
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                {" "}
                                Enable Localization
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
                        Restrict Purchased Items To Supplier{" "}
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
