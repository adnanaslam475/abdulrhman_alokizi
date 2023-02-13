import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import st from "../../style.module.scss";
import icon1 from "../../images/icon-branch.svg";
import icon4 from "../../images/icon-export.svg";
import { Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import Modals from "../../components/Modals/InventoryItemsM";
import { addType } from "../../redux_toolkit/reducer/inventoryItemsApiReducer";

export const Export = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        <img src={icon4} className={`${st.icon}`} />
        Import / Export
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <ul>
          <li>
            <NavLink to="#">Import Items</NavLink>
          </li>
          <li>
            <NavLink to="#">Import Items Ingredients</NavLink>
          </li>
          <li>
            <NavLink to="#">Export Items</NavLink>
          </li>
          <li>
            <NavLink to="#">Export Items Ingredients</NavLink>
          </li>
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const ActionDropdown = (props: any) => {
  let { selected } = props;
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const handleShow = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow");
    setModalName(modalname);
    setShow(status);
  };
  const handleClose = () => {
    setModalName("");
    setShow(false);
  };
  console.log(selected, "selected");
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">Actions</Dropdown.Toggle>
      <Dropdown.Menu>
        <ul>
          <li
            onClick={() => {
              handleShow("items add tags", true);
              dispatch(
                addType({
                  name: "addMtags",
                  id: selected?.join(","),
                })
              );
            }}
          >
            Add Tags
          </li>
          <li
            onClick={() => {
              handleShow("items add tags", true);
              dispatch(
                addType({
                  name: "removeMtags",
                  id: selected?.join(","),
                })
              );
            }}
          >
            Remove Tags
          </li>
          <li
            onClick={() => {
              handleShow("delete items", true);
              dispatch(
                addType({
                  name: "deleteItems",
                  id: selected?.join(","),
                })
              );
            }}
          >
            Deleted
          </li>
        </ul>
        <Modals show={show} handleClose={handleClose} modalName={modalName} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

