import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import st from "../../style.module.scss";
import icon1 from "../../images/icon-branch.svg";
import icon4 from "../../images/icon-export.svg";
import { Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Modals from "../../components/Modals/MenuProductsM";
import { useDispatch } from "react-redux";
import { addType, productFilterValue, productList, productTagModifier } from "../../redux_toolkit/reducer/menuProductsApiReducer";



export const Export = () => {
  return (

    <></>
  );
};

export const ActionDropdown = (props:any) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [postapidata, setpostdata] = useState<any>("");
  const [data, setData] = useState<any>();

  const handleShow = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow");
    if (modalName === "products add tags" && status) {
      productFilterValue.type = "all";
    dispatch(productList(productFilterValue));
    }
    setModalName(modalname);
    setShow(status);
  };
  const handleClose = () => {
    setModalName("");
    setShow(false);
  };

  function postdata(data: string) {
    console.log(data, "orderdetails tags data");
    setpostdata(data);
  }
console.log(props.selected.toString(),"propspropspropsprops")
  return (

    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        Actions
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <ul>
          <li><NavLink to="#" onClick={() => {
                  handleShow("products add tags", true);
                  dispatch(addType({
                    name: "tag",
                    id:props.selected.toString()
                  }))
                  dispatch(productTagModifier({type:"tag"}))
                }}>Add Tags</NavLink></li>
          <li><NavLink to="#" onClick={() => {
                  handleShow("products add tags", true);
                  dispatch(addType({
                    name: "tag",
                    id:props.selected.toString()
                  }))
                }}>Remove Tags</NavLink></li>
        </ul>
        <Modals show={show} handleClose={handleClose} modalName={modalName} postdata={postdata}/>
      </Dropdown.Menu>
    </Dropdown>
  );
};