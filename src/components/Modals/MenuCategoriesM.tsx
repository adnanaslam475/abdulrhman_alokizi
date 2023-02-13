import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Form,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import cx from "./Modals.module.scss";
import Select from "react-select";
import { FilterDropdown, SingleFilterDropdown } from "../Dropdown/Dropdowns";
import {
  tagoptions,
  customertagoptions,
  customertimezone,
  itemoption,
  ingredientsoptions,
  deleteOptions,
} from "../../constants/dropdownconstants";
import { AiFillHtml5, AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import food from "../../images/edit-images.png";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryList,
  clearFilter,
  createCategory,
  multiDeleteCategory,
  editMenuCategoryData,
  filterValue,
  sortSubCategories,
  reorderSubCategories,
  filterData
} from "../../redux_toolkit/reducer/menuCategoriesApiReducer";
import { SimpleDropDown } from "../Dropdown/SimpleDropDown";
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import ReactLoading from "react-loading";

interface valueInterface {
  name?: string,
  ar_name?: string,
  id?: number,
}

const Modals = (props: any) => {
  const options = [
    {
      value: "1",
      label: "Pick up",
    },
    {
      value: "2",
      label: "Delivery",
    },
  ];
  const deliveryzone = [
    {
      value: "1",
      label: "Shipping",
    },
    {
      value: "2",
      label: "Ordered",
    },
  ];

  const editMenuData = useSelector(
    (state: any) => state.menuCategoriesApiReducer.editMenu
  );

  const clearValue = useSelector(
    (state: any) => state.menuCategoriesApiReducer.filterValue
  );

  const sortMenuSubCategories = useSelector((state: any) => state.menuCategoriesApiReducer.sortMenuSubCategories)

  const catId = useSelector(
    (state: any) => state.menuCategoriesApiReducer.catId
  );
  const dispatch = useDispatch();
  const [ordertype, setOrderType] = useState("");
  const [advanceOptions, setadvanceOptions] = useState(false);
  const [inventoryItems, setinventoryItems] = useState(false);
  const [subCategories, setSubCategories] = useState<any[]>([])
  const [loaderStatus, setloaderStatus] = useState<any>(
    <ReactLoading type="cylon" color="#5498fd" />
  );
  const [displayImages, setdisplayImages] = useState("");
  const [fileSelected, setFileSelected] = React.useState<any>();
  const [show, setShow] = useState(false);

  const orderTypehandler = (event: any) => {
    setOrderType(event.label);
  };

  let sizeadvanceoptions = advanceOptions ? 6 : 12;

  const [subshow, setsubShow] = useState(false);
  const [submodalName, setsubModalName] = useState("");
  const subdeliveryAddress = (modalname: string, status: boolean) => {
    setsubModalName(modalname);
    setsubShow(status);
  };
  const subhandleClose = () => {
    setsubShow(false);
    setsubModalName("");
  };

  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);

  const [addCategoryValue, setAddCategoryValue] = useState({
    engname: "",
    localize: "",
    referance: "",
  });

  const [filterState, setFilterState] = useState({
    type: filterValue?.type,
    name: filterValue?.name,
    referance: filterValue?.referance,
    udateafter: filterValue?.udateafter,
  })

  useEffect(() => {
    setloaderStatus(<ReactLoading type="cylon" color="#5498fd" />)
    setSubCategories(sortSubCategories)
    if (sortSubCategories?.length === 0) {
      setloaderStatus(<h5 style={{ paddingTop: "15px" }}>Start managing your menu by creating categories for your products, combos and gift cards.</h5>);
    }
  }, [sortMenuSubCategories])

  function SortableElement(props: any) {
    return <Col lg={3}>
      <div className={`${cx.sortCategory}`}>
        {props?.value}
      </div>
    </Col>
  }

  const SortableList = SortableContainer(({ items }: { items: any[] }) => {
    return (
      <Row>
        {items.map((value: valueInterface, index: number) => {
          let nameValue = value?.name
          return <SortableElement key={`item-${index}`} index={index} value={nameValue} />
        })}
      </Row>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
    setSubCategories(arrayMoveImmutable(subCategories, oldIndex, newIndex));
  };

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;
    let display = URL.createObjectURL(fileList[0]);
    setdisplayImages(display);
    editMenuCategoryData.img = fileList[0]
    setShow(true);
    setFileSelected(fileList[0]);
  };

  const handleImageRemove = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.target.value = "";
    const fileList = e.target.files;
    if (displayImages !== "") {
      setdisplayImages(e.target.value);
    } else {
      editMenuCategoryData.img = "remove";
    }
  };

  const handleChange = (e: any) => {
    console.log(e, "eeeeee")
    if (e.value === "Yes") {
      setFilterState((prev: any) => { return { ...prev, type: "Yes" } })
    } else {
      setFilterState((prev: any) => { return { ...prev, type: "No" } })
    }
  }

  return (
    <>
      {/* ############################################################
 ######################## ORDER MODALS ########################### */}

      {/* START Category Create Category */}
      {props.modalName === "category create category" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name
                    {["top"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        overlay={
                          <Tooltip id={`tooltip-${placement}`}>
                            The customerʼs Full Name.
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
                  <Form.Control
                    type="text"
                    placeholder="Enter category name"
                    onChange={(e: any) => {
                      setAddCategoryValue((prev: any) => {
                        return { ...prev, engname: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name Localized
                    {["top"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        overlay={
                          <Tooltip id={`tooltip-${placement}`}>
                            The customerʼs Full Name.
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
                  <Form.Control
                    type="text"
                    placeholder="Enter the localized name"
                    onChange={(e: any) => {
                      setAddCategoryValue((prev: any) => {
                        return { ...prev, localize: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Reference
                    {["top"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        overlay={
                          <Tooltip id={`tooltip-${placement}`}>
                            The customerʼs Full Name.
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
                  <Form.Control
                    type="text"
                    placeholder="Enter unique code for category"
                    onChange={(e: any) => {
                      setAddCategoryValue((prev: any) => {
                        return { ...prev, referance: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div></div>
            <div>
              <Button
                className={`${cx.btnClose}`}
                onClick={() => {
                  props.handleClose();
                  setOrderType("");
                }}
              >
                Close
              </Button>
              <Button
                className={`${cx.btnSubmit}`}
                onClick={() => {
                  dispatch(createCategory(addCategoryValue));
                  props.handleClose();
                }}
              >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END Category Create Category */}

      {/* START Delivery Address */}
      {submodalName === "delivery address" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    style={{ height: "150px" }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Delivery Zone</Form.Label>
                  <Select
                    isSearchable={true}
                    options={deliveryzone}
                    onChange={(e) => {
                      orderTypehandler(e);
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={subhandleClose}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END Delivery Address */}

      {/* START Category Order Filter */}
      {props.modalName === "category order filter" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Filters</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={filterState.name}
                    onChange={(e: any) => {
                      setFilterState((prev: any) => { return { ...prev, name: e.target.value } })
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Reference</Form.Label>
                  <Form.Control
                    type="text"
                    value={filterState?.referance}
                    onChange={(e: any) => {
                      setFilterState((prev: any) => { return { ...prev, referance: e.target.value } })
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Deleted</Form.Label>
                  {/* <SimpleDropDown options={deleteOptions} data={filterValue?.type}/> */}
                  <Select
                    isSearchable={true}
                    options={deleteOptions}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={filterState.type === "" ? {
                      value: "",
                      label: "",
                    } : filterState.type === "Yes" ? {
                      value: "Yes",
                      label: "Yes",
                    } : {
                      value: "No",
                      label: "No",
                    }}
                    placeholder="Choose..."
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Update after</Form.Label>
                  <Form.Control
                    type="date"
                    value={filterState?.udateafter}
                    onChange={(e: any) => {
                      setFilterState((prev: any) => { return { ...prev, udateafter: e.target.value } })
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <NavLink to="#" className={`${cx.rightOption}`} onClick={() => {
                setFilterState({
                  type: "",
                  name: "",
                  referance: "",
                  udateafter: "",
                })
                filterValue.type = "All";
                filterValue.name = "";
                filterValue.referance = "";
                filterValue.udateafter = "";
                dispatch(categoryList(filterValue))
              }}>
                Clear
              </NavLink>
            </div>
            <div>
              <Button
                className={`${cx.btnClose}`}
                onClick={() => {
                  props.handleClose();
                  setOrderType("");
                }}
              >
                Close
              </Button>
              <Button
                className={`${cx.btnSubmit}`}
                onClick={() => {
                  dispatch(filterData(filterState))
                  dispatch(categoryList(filterValue));
                  props.handleClose();
                }}
              >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END Category Order Filter */}

      {/* START Category Edit Category */}
      {props.modalName === "category edit category" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <div className={`${cx.editCategory}`}>
                  <img src={displayImages !== "" ? displayImages : editMenuCategoryData?.img ? editMenuCategoryData?.img : food} alt="" width="100px" height="100px" />
                  <ul>
                    <li>
                      <div className={`${cx.rightOption}`}>
                        <input type="file" onChange={(event) => {
                          handleImageChange(event);
                        }} />
                        Image
                      </div>
                    </li>
                    <li>
                      <NavLink to="#" className={`${cx.rightOption}`} onClick={(event: any) => {
                        handleImageRemove(event);
                      }}>
                        Remove
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name
                    {["top"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        overlay={
                          <Tooltip id={`tooltip-${placement}`}>
                            The customerʼs Full Name.
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
                  <Form.Control
                    type="text"
                    defaultValue={editMenuCategoryData?.engname}
                    onChange={(e: any) => {
                      editMenuCategoryData.engname = e.target.value;
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name Localized
                    {["top"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        overlay={
                          <Tooltip id={`tooltip-${placement}`}>
                            The customerʼs Full Name.
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
                  <Form.Control
                    type="text"
                    defaultValue={editMenuCategoryData?.localize}
                    onChange={(e: any) => {
                      editMenuCategoryData.localize = e.target.value;
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Reference
                    {["top"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        overlay={
                          <Tooltip id={`tooltip-${placement}`}>
                            The customerʼs Full Name.
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
                  <Form.Control
                    type="text"
                    defaultValue={editMenuCategoryData?.referance}
                    onChange={(e: any) => {
                      editMenuCategoryData.referance = e.target.value;
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`} onClick={() => {
                setModalShow(true);
              }}>
                {filterValue.type === "All" ? "Delete Category" : "Restore Category"}
              </NavLink>
            </div>
            <div>
              <Button
                className={`${cx.btnClose}`}
                onClick={() => {
                  props.handleClose();
                  setOrderType("");
                  setdisplayImages("")
                }}
              >
                Close
              </Button>
              <Button
                className={`${cx.btnSubmit}`}
                onClick={() => {
                  console.log(typeof editMenuCategoryData?.img, "type")
                  if (typeof editMenuCategoryData?.img === "string" && editMenuCategoryData?.img !== "remove") {
                    editMenuCategoryData.img = ""
                  }
                  dispatch(createCategory(editMenuCategoryData));
                  setdisplayImages("")
                  props.handleClose();
                }}
              >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END Category Edit Category */}

      {/* START Category Import Categories */}
      {props.modalName === "category import categories" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Import Categories</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <p>
                    <input type="file" />
                  </p>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <NavLink to="#" className={`${cx.rightOption}`}>
                Download Template
              </NavLink>
            </div>
            <div>
              <Button
                className={`${cx.btnClose}`}
                onClick={() => {
                  props.handleClose();
                  setOrderType("");
                }}
              >
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END Category Import Categories */}

      {/* START Sort Category Popup */}
      {props.modalName === "sort category popup" && (
        <Modal
          className={`${cx.ctsModal} ${cx.ctsModalSize}`}
          size="lg"
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>باربكيو</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              {subCategories?.length > 0 ? (
                <SortableList axis="xy" items={subCategories} onSortEnd={onSortEnd} />
              ) : (
                <div className="d-flex justify-content-center">
                  {loaderStatus}
                </div>)
              }
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div></div>
            <div>
              <Button
                className={`${cx.btnClose}`}
                onClick={() => {
                  props.handleClose();
                  setOrderType("");
                  setloaderStatus(<ReactLoading type="cylon" color="#5498fd" />)
                  setSubCategories([])
                }}
              >
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={() => {
                props.handleClose();
                setloaderStatus(<ReactLoading type="cylon" color="#5498fd" />)
                setSubCategories([])
                dispatch(reorderSubCategories({ "id": catId, "data": subCategories }))
              }}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END Sort Category Popup */}

      <Modal
        className={`${cx.ctsModal}`}
        show={modalShow}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12} lg={12}>
              <Form.Group className={`${cx.formField}`}>
                <Form.Label>
                  Are you sure you want to delete this item?
                </Form.Label>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div></div>
          <div>
            <Button
              className={`${cx.btnClose}`}
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </Button>
            <Button
              className={`${cx.btnSubmit}`}
              style={{ backgroundColor: "#FA8072", borderColor: "#FA8072" }}
              onClick={() => {
                filterValue.type === "All" ? dispatch(multiDeleteCategory({ "cat_ids": editMenuCategoryData.id, "type": "delete" })) : dispatch(multiDeleteCategory({ "cat_ids": editMenuCategoryData.id, "type": "restore" }))
                props.handleClose();
                handleClose();
              }}
            >
              Apply
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modals;
