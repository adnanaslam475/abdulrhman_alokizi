import React, { useState } from "react";
import st from "../../style.module.scss";
import icon4 from "../../images/icon-export.svg";
import { Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";



export const Export = () => {
  return (

    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        <img src={icon4} className={`${st.icon}`} />
        Export
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <ul>
          <li><NavLink to="#">To CSV</NavLink></li>
          <li><NavLink to="#">To Excel</NavLink></li>
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const Groupname = () => {
    return (
  
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
          Group By None
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <ul>
            <li><NavLink to="#">None</NavLink></li>
            <li><NavLink to="#">Branch</NavLink></li>
            <li><NavLink to="#">Suppiler</NavLink></li>
            <li><NavLink to="#">Branch and Supplier</NavLink></li>
          </ul>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

export const ActionDropdown = () => {
  return (

    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        Actions
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <ul>
          <li><NavLink to="#">Add Tags</NavLink></li>
          <li><NavLink to="#">Remove Tags</NavLink></li>
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};