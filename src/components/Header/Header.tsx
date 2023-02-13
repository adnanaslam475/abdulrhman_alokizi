import React, { useEffect, useState } from "react";
import st from "../../style.module.scss";
import cx from "./Header.module.scss";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiMoreHorizontal } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import GlobalContext from "../../store/global-context";
import logo from "../../images/logo.svg";

import profile from "../../images/icon-profile.svg";
import infoicon from "../../images/icon-info.svg";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import { Col, Row, InputGroup, FormControl, Dropdown } from "react-bootstrap";

const Header = (props: any) => {
  const globalCtx = useContext(GlobalContext);
  let hideonScroll = globalCtx.showMenu;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ----------------------- Active on Scroll Functionality -------------------------------- //
  const [onscrollActive, setOnscrollActive] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const scrollCheck: boolean = window.scrollY > 10;
      setOnscrollActive(scrollCheck);
    };

    // setting the event handler from web API
    document.addEventListener("scroll", onScroll);

    // cleaning up from the web API
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);
  // show ? disableBodyScroll(document.body) : enableBodyScroll(document.body);

  return (
    <>
      <header className={`${cx.mainHeader}`}>
        <Row className={`${cx.mobileHeader}`}>
          <Col className="col-3">
            <GiHamburgerMenu
              className={`${cx.hembugmenu}`}
              onClick={() => {
                handleShow();
                globalCtx.displayMenu(hideonScroll);
              }}
            />
          </Col>
          <Col className="col-6 text-center"></Col>
          <Col md={4} lg={6} xl={7} className={`col-3 ${cx.headerRight}`}>
            <ul>
              <li className={`${cx.help}`}>
                <Dropdown>
                  <Dropdown.Toggle variant="a" id="dropdown-basic">
                    <div className={`${cx.menuTT}`}>
                      <img
                        src={infoicon}
                        className={`${cx.helpImg}`}
                        alt="logo"
                      />
                    </div>
                  </Dropdown.Toggle>

                  {/* <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu> */}
                </Dropdown>
              </li>
              <li className={`${cx.profileBox}`}>
                <Dropdown>
                  <Dropdown.Toggle variant="a" id="dropdown-basic">
                    <div className={`${cx.menuTT}`}>
                      <img
                        src={profile}
                        className={`${cx.profileImg}`}
                        alt="logo"
                      />
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item className={`${cx.borderM}`} href="#">
                      <p>User ID : </p>
                      <h5>157106</h5>
                    </Dropdown.Item>
                    <Dropdown.Item className={`${cx.borderM}`} href="#">
                      <p>User 1 </p>
                      <h5>usertester1@gmail.com</h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={`${cx.borderM}`}
                      href="/designer/dotnewPanel"
                      onClick={() => {
                        localStorage.removeItem("___data");
                        localStorage.removeItem("token");
                      }}
                    >
                      <h5>Logout</h5>
                    </Dropdown.Item>
                    <Dropdown.Item className={`${cx.pSpace}`} href="#">
                      <h5>00966-920028928</h5>
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <h5>Support @Foodict.com</h5>
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <h5>Live Chat</h5>
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <h5>Knowledge Base</h5>
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <h5>System update</h5>
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <h5>Feature Suggestion</h5>
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <h5>F5 Account : 157106</h5>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* <NavLink variant="a" className={`dropdown-toggle`} id="dropdown-basic" to="/">
                                <img src="images/profile.png" className={`${cx.profileImg}`} alt="profile" />
                                <div className={`${cx.menuTT}`}>Me</div>
                            </NavLink> */}
              </li>
            </ul>
          </Col>
        </Row>

        <Row className={`align-items-center ${cx.headerRow}`}>
          <Col
            md={12}
            lg={12}
            xl={12}
            className={`col-12 ${cx.headerMobile} ${
              globalCtx.showMore ? cx.show : ""
            }`}
          >
            <Row className="align-items-center">
              <Col md={7} lg={7} xl={7} className={`col-9 ${cx.headerSearch}`}>
                <InputGroup className="">
                  <FormControl
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <button className={`${cx.searchBtn}`}>
                    <FiSearch />
                  </button>
                </InputGroup>
              </Col>
              <Col md={5} lg={5} xl={5} className={`col-3 ${cx.headerRight}`}>
                <ul>
                  <li className={`${cx.help}`}>
                    <Dropdown>
                      <Dropdown.Toggle variant="a" id="dropdown-basic">
                        <div className={`${cx.menuTT}`}>
                          <img
                            src={infoicon}
                            className={`${cx.helpImg}`}
                            alt="logo"
                          />
                        </div>
                      </Dropdown.Toggle>

                      {/* <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </Dropdown.Menu> */}
                    </Dropdown>
                  </li>
                  <li className={`${cx.profileBox}`}>
                    <Dropdown>
                      <Dropdown.Toggle variant="a" id="dropdown-basic">
                        <div className={`${cx.menuTT}`}>
                          <img
                            src={profile}
                            className={`${cx.profileImg}`}
                            alt="logo"
                          />
                        </div>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item className={`${cx.borderM}`} href="#">
                          <p>User ID : </p>
                          <h5>157106</h5>
                        </Dropdown.Item>
                        <Dropdown.Item className={`${cx.borderM}`} href="#">
                          <p>User 1 </p>
                          <h5>usertester1@gmail.com</h5>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className={`${cx.borderM}`}
                          href="/designer/dotnewPanel"
                          onClick={() => {
                            localStorage.removeItem("___data");
                            localStorage.removeItem("token");
                          }}
                        >
                          <h5>Logout</h5>
                        </Dropdown.Item>
                        <Dropdown.Item className={`${cx.pSpace}`} href="#">
                          <h5>00966-920028928</h5>
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <h5>Support @Foodict.com</h5>
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <h5>Live Chat</h5>
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <h5>Knowledge Base</h5>
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <h5>System update</h5>
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <h5>Feature Suggestion</h5>
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <h5>F5 Account : 157106</h5>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    {/* <NavLink variant="a" className={`dropdown-toggle`} id="dropdown-basic" to="/">
                                        <img src="images/profile.png" className={`${style.profileImg}`} alt="profile" />
                                        <div className={`${style.menuTT}`}>Me</div>
                                    </NavLink> */}
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </header>
    </>
  );
};

export default Header;
