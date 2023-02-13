import React, { useCallback, useState, useEffect } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Menusortcategories.module.scss";
import table from "../../datatable.module.scss";
import {
  Card,
  Button,
  Row,
  Table,
  Col,
  Modal,
  Form,
  Dropdown,
} from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";
import Modals from "../../components/Modals/MenuCategoriesM";
import {
  allCategories,
  allSubCategories,
  reorderCategories,
  sortCategories,
  categoryId,
} from "../../redux_toolkit/reducer/menuCategoriesApiReducer";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';


interface valueInterface {
  name?: string,
  ar_name?: string,
  id?: number,
}


export default function Menusortcategories() {
  const dispatch = useDispatch();
  const sortMenuCategories = useSelector(
    (state: any) => state.menuCategoriesApiReducer.sortMenuCategories
  );
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [sortCategoriesData, setSortCategoriesData] = useState<unknown[]>([]);
  const [sortId, setSortId] = useState<number>()
  const [loaderStatus, setloaderStatus] = useState<any>(
    <ReactLoading type="cylon" color="#5498fd" />
  );
  const handleShow = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow");
    setModalName(modalname);
    setShow(status);
  };
  const handleClose = () => {
    setModalName("");
    setShow(false);
  };

  useEffect(() => {
    setloaderStatus(<ReactLoading type="cylon" color="#5498fd" />)
    setSortCategoriesData(sortCategories);
    if (sortCategories?.length === 0) {
      setloaderStatus(<h4>No Data Found</h4>);
    }
  }, [sortMenuCategories]);

  useEffect(() => {
    dispatch(allCategories());
  }, []);

  function SortableElement(props: any) {
    return <Col lg={3}>
      <div className={`${cx.moreOption}`} onMouseDown={(e: any) => {
        console.log(e, props.idValue, "eee")
        setSortId(props.idValue)
      }} onMouseUp={(e: any) => {
        console.log(e, props.idValue, "eee")
        dispatch(categoryId(props.idValue))
        dispatch(allSubCategories(props.idValue))
        handleShow("sort category popup", true);
      }}>
        {props.value}
      </div>
    </Col>
  }


  const SortableList = SortableContainer(({ items }: { items: any[] }) => {
    return (
      <Row>
        {items.map((value: valueInterface, index: number) => {
          let nameValue = value?.name
          let idValue = value?.id
          return <SortableElement key={`item-${index}`} index={index} value={nameValue} idValue={idValue} />
        })}
      </Row>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
    setSortCategoriesData(arrayMoveImmutable(sortCategoriesData, oldIndex, newIndex));
    dispatch(reorderCategories({ "cat_id": sortId, "position": newIndex }))
  };

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <NavLink to="/menu/categories" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Sort Categories</h5>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <Row>
                {sortCategoriesData?.length > 0 ? (
                  <SortableList axis="xy" items={sortCategoriesData} onSortEnd={onSortEnd} />
                ) : (
                  <div className="d-flex justify-content-center">
                    {loaderStatus}
                  </div>)
                }

              </Row>
            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}
