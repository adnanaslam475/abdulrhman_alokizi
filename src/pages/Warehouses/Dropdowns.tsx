import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import st from "../../style.module.scss";
import icon1 from "../../images/icon-branch.svg";
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
          <li><NavLink to="#">Export Order Transaction</NavLink></li>
          <li><NavLink to="#">Export Order Transaction Items</NavLink></li>
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
          <li><NavLink to="#">Delete</NavLink></li>
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};