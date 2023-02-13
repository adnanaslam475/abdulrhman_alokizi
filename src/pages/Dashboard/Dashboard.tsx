import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Dashboard.module.scss";
import table from "../../datatable.module.scss";
import {
  Card,
  Tooltip,
  OverlayTrigger,
  Button,
  Modal,
  Form,
  Dropdown,
  Row,
  Col,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Select, {
  components,
  ControlProps,
  Props,
  StylesConfig,
} from "react-select";
import icon1 from "../../images/icon-branch.svg";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";

import Tabs from "react-bootstrap/Tabs";
import DashboardBranches from "../DashboardBranches/DashboardBranches";
import DashboardInvetory from "../DashboardInventory/DashboardInventory";
import DashboardCallCenter from "../DashboardCallCenter/DashboardCallCenter";
import DashboardGeneral from "../DashboardGeneral/DashboardGeneral";

export default function Dashboard(): JSX.Element {
  const [lgShow, setLgShow] = useState(false);

  const Control = ({ children, ...props }: ControlProps) => {
    // @ts-ignore
    const { emoji, onEmojiClick } = props.selectProps;
    const style = { cursor: "pointer" };

    return (
      <components.Control {...props}>
        <span onMouseDown={onEmojiClick} style={style}>
          <img src={icon1} className={`${st.icon}`} />
        </span>
        {children}
      </components.Control>
    );
  };

  const options = [
    {
      value: "1",
      label: "Orders",
    },
    {
      value: "2",
      label: "Orders Items",
    },
    {
      value: "3",
      label: "Orders Payment",
    },
    {
      value: "4",
      label: "Orders 1",
    },
  ];
  const [selected, setSelected] = useState([]);
  const customValueRenderer = (selected: any, options: any) => {
    return (
      <>
        <img src={icon1} className={`${st.icon}`} /> All Branches
      </>
    );
  };
  return (
    <>
      <section className={`${st.pageWrapper}`}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Welcome, Abdullah</h5>
            </div>
            </div>
          <div >
            <Nav className={`${cx.headertabs}`}>
              <Nav.Item>
                <Nav.Link eventKey="first" className={`${cx.headertabslinks}`}>General</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" className={`${cx.headertabslinks}`}>Branches</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third" className={`${cx.headertabslinks}`}>Inventory</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Fourth" className={`${cx.headertabslinks}`}> Call Center</Nav.Link>
              </Nav.Item>
            </Nav>

            
                          
          </div>
          <div>
          </div>
        </div>

        
        <div className={`${st.pageWrapperInside}`}>
        <Tab.Content>
            <Tab.Pane eventKey="first">
            <DashboardGeneral/>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
            <DashboardBranches />
            </Tab.Pane>
            <Tab.Pane eventKey="third">
            <DashboardInvetory />
            </Tab.Pane>
            <Tab.Pane eventKey="Fourth">
            <DashboardCallCenter />
            </Tab.Pane>
          </Tab.Content>
        </div>
        
    </Tab.Container>
      </section>
    </>
  );
}
