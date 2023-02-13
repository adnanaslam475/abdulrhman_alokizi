import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import st from "../../style.module.scss";
import { Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import more from "../../images/more.svg";

export const ActionDropdown = () => {
  return (
    
      <Dropdown >
        <Dropdown.Toggle id="dropdown-basic"  >
          <img src={more} alt="" className={`${st.icon}`}/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <ul>
            <li>
              <NavLink to="#">Add to Users </NavLink>
            </li>
            <li>
              <NavLink to="#">Remove To User </NavLink>
            </li>
          </ul>
        </Dropdown.Menu>
      </Dropdown>
  );
};
