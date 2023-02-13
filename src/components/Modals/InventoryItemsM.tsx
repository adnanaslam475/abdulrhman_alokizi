import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import cx from "./Modals.module.scss";
import Select from "react-select";
import { FilterDropdown, SingleFilterDropdown } from "../Dropdown/Dropdowns";

import {
  tagoptions,
  customertagoptions,
  customertimezone,
  itemoption,
  ingredientsoptions,
} from "../../constants/dropdownconstants";
import { NavLink } from "react-router-dom";
import SharedTooltip from "../Tooltip/Tooltip";
import {
  addEditInventoryItem,
  addInventoryItemType,
  CategoryInInventoryItemListItems,
  customlevel_additem,
  IngredientsInInventoryItemListItems,
  ingridentadd_item,
  inventoryItemId,
  inventoryItemView,
  item_deletemultiple,
  selected_tagaddremove_delete,
  singleInventoryItemDetails,
  supplieradd_item,
  SupplierInInventoryItemListItems,
  tagadd_item,
  TagsInInventoryItemListItems,
} from "../../redux_toolkit/reducer/inventoryItemsApiReducer";
import { useDispatch, useSelector } from "react-redux";
import { branchesList } from "../../redux_toolkit/reducer/commonApiReducer";
import { notify } from "../../constants/notifyconstants";

const Modals = (props: any) => {
  const singleInventoryItemCount = useSelector(
    (state: any) => state.inventoryItemsApiReducer.singleInventoryItemCount
  );
  const getCategoriesInItemShowList = useSelector(
    (state: any) => state.inventoryItemsApiReducer.getCategoriesInItemListCount
  );
  const getTagsInItemShowList = useSelector(
    (state: any) => state.inventoryItemsApiReducer.tag_forItemCount
  );
  const getIngredientsInItemShowList = useSelector(
    (state: any) => state.inventoryItemsApiReducer.get_ingridentForItemCount
  );
  const getSupplierInItemShowList = useSelector(
    (state: any) => state.inventoryItemsApiReducer.get_supplier_itemCount
  );
  const getBranchesShowList = useSelector(
    (state: any) => state.commonApiReducer.branchesCount
  );
  const dispatch = useDispatch();
  const [advanceOptions, setadvanceOptions] = useState(false);
  const [inventoryItems, setinventoryItems] = useState(false);
  const [sku, setSku] = useState<any>();
  const [category, setCategory] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [allDataProduct, setAllDataProduct] = useState("");
  const [supplier, setSupplier] = useState<any[]>([]);
  const [min_level, setmin_level] = useState(0);
  const [max_level, setmax_level] = useState(0);
  const [par_level, setpar_level] = useState(0);
  const [branch, setBranch] = useState<any[]>([]);
  let sizeadvanceoptions = advanceOptions ? 6 : 12;

  const [addInventoryItem, setAddInventoryItem] = useState({
    id: "",
    item_name: "",
    localized: "",
    sku: "",
    category: "",
    costing_method: "",
    barcode: "",
    cost_sar: "",
    storage_unite: "",
    ingredient_unite: "",
    minimum_level: "",
    per_level: "",
    maximum_level: "",
    s_to_i_fector: "",
  });

  useEffect(() => {
    console.log(
      singleInventoryItemDetails,
      "singleProductDetailssingleProductDetails"
    );
    setStateValue()
  }, [singleInventoryItemCount]);

  function allTagModifierData(data: string) {
    console.log(data, "allTagModifierData");
    setAllDataProduct(data);
  }
  function setStateValue() {
    setAddInventoryItem({
      id: singleInventoryItemDetails?.id ? singleInventoryItemDetails?.id : "",
      item_name: singleInventoryItemDetails?.item_name
        ? singleInventoryItemDetails?.item_name
        : "",
      localized: singleInventoryItemDetails?.localized
        ? singleInventoryItemDetails?.localized
        : "",
      sku: singleInventoryItemDetails?.sku
        ? singleInventoryItemDetails?.sku
        : "",
      category: singleInventoryItemDetails?.category
        ? singleInventoryItemDetails?.category
        : "",
      costing_method: singleInventoryItemDetails?.costing_method
        ? singleInventoryItemDetails?.costing_method
        : "",
      barcode: singleInventoryItemDetails?.barcode
        ? singleInventoryItemDetails?.barcode
        : "",
      cost_sar: singleInventoryItemDetails?.cost_sar
        ? singleInventoryItemDetails?.cost_sar
        : "",
      storage_unite: singleInventoryItemDetails?.storage_unite
        ? singleInventoryItemDetails?.storage_unite
        : "",
      minimum_level: singleInventoryItemDetails?.minimum_level
        ? singleInventoryItemDetails?.minimum_level
        : "",
      ingredient_unite: singleInventoryItemDetails?.ingredient_unite
        ? singleInventoryItemDetails?.ingredient_unite
        : "",
      per_level: singleInventoryItemDetails?.per_level
        ? singleInventoryItemDetails?.per_level
        : 0,
      maximum_level: singleInventoryItemDetails?.maximum_level
        ? singleInventoryItemDetails?.maximum_level
        : 0,
      s_to_i_fector: singleInventoryItemDetails?.s_to_p_fector
        ? singleInventoryItemDetails?.s_to_p_fector
        : 0,
    });
  }
  function ValidateItemData() {
    if (addInventoryItem.item_name == "") {
      notify("Name is required")
      return false
    }
    else if (addInventoryItem.localized == "") {
      notify("Name Localized is required")
      return false
    }
    else if (addInventoryItem.sku == "") {
      notify("SKU is required")
      return false
    }
    else if (addInventoryItem.category == "") {
      notify("Category is required")
      return false
    }
    else if (addInventoryItem.storage_unite == "") {
      notify("Storage Unit is required")
      return false
    }
    else if (addInventoryItem.ingredient_unite == "") {
      notify("Ingredient Unit is required")
      return false
    }
    else if (addInventoryItem.s_to_i_fector == "") {
      notify("Storage To Ingredient is required")
      return false
    }
    else if (addInventoryItem.costing_method == "") {
      notify("Costing Method is required")
      return false
    }
    else if (addInventoryItem.cost_sar == "") {
      notify("Cost is required")
      return false
    }
    else if (addInventoryItem.barcode == "") {
      notify("BarCode is required")
      return false
    }
    else if (addInventoryItem.minimum_level == "") {
      notify("Minimum Level is required")
      return false
    }
    else if (addInventoryItem.per_level == "") {
      notify("Par Level is required")
      return false
    }
    else if (addInventoryItem.maximum_level == "") {
      notify("Maximum Level is required")
      return false
    }

    return true
  }
  useEffect(() => {
    const category: any[] = [];
    CategoryInInventoryItemListItems?.map((item: any, index: number) => {
      category.push({
        label: item.name,
        value: item.id,
      });
    });
    console.log(category, "CategoryInInventoryItemListItems");
    setCategory(category);
  }, [getCategoriesInItemShowList]);

  useEffect(() => {
    const tags: any[] = [];
    TagsInInventoryItemListItems?.map((item: any, index: number) => {
      tags.push({
        label: item.name,
        value: item.id,
      });
    });
    setTags(tags);
  }, [getTagsInItemShowList]);

  useEffect(() => {
    const ingredients: any[] = [];
    IngredientsInInventoryItemListItems?.map((item: any, index: number) => {
      ingredients.push({
        label: item.ingredient_name,
        value: item.id,
      });
    });
    setIngredients(ingredients);
  }, [getIngredientsInItemShowList]);

  useEffect(() => {
    const supplier: any[] = [];
    SupplierInInventoryItemListItems?.map((item: any, index: number) => {
      supplier.push({
        label: item.supplier_name,
        value: item.id,
      });
    });
    setSupplier(supplier);
  }, [getSupplierInItemShowList]);

  useEffect(() => {
    const branch: any[] = [];
    branchesList?.map((item: any) => {
      branch.push({
        label: item.branch_english,
        value: item.id,
      });
    });
    setBranch(branch);
  }, [getBranchesShowList]);

  console.log(singleInventoryItemDetails, "singleInventoryItemDetails");
  return (
    <>
      {/* #################### INVENTORY ITEMS MODALS ########################### */}

      {/* START create item */}
      {props.modalName === "create item" && (
        <Modal
          scrollable
          className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ""}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name
                    <SharedTooltip infoText="The name of the address." />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e: any) => {
                      setAddInventoryItem((prev: any) => {
                        return { ...prev, item_name: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name Localized
                    <SharedTooltip
                      infoText="Enter the localized name in a 2nd language of your
                            choice."
                    />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e: any) => {
                      setAddInventoryItem((prev: any) => {
                        return { ...prev, localized: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                <Row>
                  <Col md={7} lg={7}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        SKU
                        <SharedTooltip infoText="Stock keeping unit, a unique code for your item." />
                      </Form.Label>
                      <Form.Control type="text" value={`sk-${sku}`} disabled />
                    </Form.Group>
                  </Col>

                  <Col md={5} lg={5}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label className={`${cx.labelHide}`}>.</Form.Label>
                      <button
                        type="button"
                        className="form-control"
                        onClick={() => {
                          const number = Math.floor(
                            1000 + Math.random() * 9000
                          );
                          setSku(number);
                          setAddInventoryItem((prev: any) => {
                            return { ...prev, sku: `sk-${number}` };
                          });
                        }}
                      >
                        Generate SKU
                      </button>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Category
                    <SharedTooltip infoText="You can add an item to a category, like vegetables." />
                  </Form.Label>
                  <Select
                    isSearchable={true}
                    options={category}
                    onChange={(e: any) => {
                      setAddInventoryItem((prev: any) => {
                        return { ...prev, category: e.value };
                      });
                    }}
                    placeholder="Choose..."
                  />
                </Form.Group>
              </Col>
              <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Storage Unit
                    <SharedTooltip infoText="How this item is stored, example: Box or KG." />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e: any) => {
                      setAddInventoryItem((prev: any) => {
                        return { ...prev, storage_unite: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Ingredient Unit
                    <SharedTooltip
                      infoText="How this item is used in your products ingredients,
                            example: GRAM or ML."
                    />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e: any) => {
                      setAddInventoryItem((prev: any) => {
                        return { ...prev, ingredient_unite: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Storage To Ingredient
                    <SharedTooltip
                      infoText="The conversion factor between storage unit and
                            ingredient unit, example: 1000."
                    />
                  </Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e: any) => {
                      setAddInventoryItem((prev: any) => {
                        return { ...prev, s_to_i_fector: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Costing Method
                    <SharedTooltip
                      infoText="If you donʼt have a fixed cost for this item it will
                            be calculated from purchase transactions."
                    />
                  </Form.Label>

                  <Form.Select
                    defaultValue={1}
                    aria-label="Default select example"
                    onChange={(e: any) => {
                      setAddInventoryItem((prev: any) => {
                        return { ...prev, costing_method: e.target.value };
                      });
                    }}
                  >
                    <option value={1}>Fixed</option>
                    <option value={2}>From Transition</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {advanceOptions && (
                <Fragment>
                  <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Barcode
                        <SharedTooltip
                          infoText=" Unique barcode to identify with barcode
                                scanners."
                        />
                      </Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e: any) => {
                          setAddInventoryItem((prev: any) => {
                            return { ...prev, barcode: e.target.value };
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Fragment>
              )}

              <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Cost
                    <SharedTooltip infoText="Fixed cost per storage unit." />
                  </Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e: any) => {
                      setAddInventoryItem((prev: any) => {
                        return { ...prev, cost_sar: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              {advanceOptions && (
                <Fragment>
                  <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Minimum Level
                        <SharedTooltip
                          infoText="The minimum level allowed in the branch or
                                warehouse."
                        />
                      </Form.Label>
                      <Form.Control
                        type="number"
                        onChange={(e: any) => {
                          setAddInventoryItem((prev: any) => {
                            return { ...prev, minimum_level: e.target.value };
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Par Level
                        <SharedTooltip
                          infoText="The Initial quantity when you create a purchase
                                order or transfer order."
                        />
                      </Form.Label>
                      <Form.Control
                        type="number"
                        onChange={(e: any) => {
                          setAddInventoryItem((prev: any) => {
                            return { ...prev, per_level: e.target.value };
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Maximum Level
                        <SharedTooltip
                          infoText="The maximum level allowed in the branch or
                                warehouse."
                        />
                      </Form.Label>
                      <Form.Control
                        type="number"
                        onChange={(e: any) => {
                          setAddInventoryItem((prev: any) => {
                            return { ...prev, maximum_level: e.target.value };
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Fragment>
              )}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {advanceOptions ? (
              <div>
                <NavLink
                  to="#"
                  className={`${cx.rightOption}`}
                  onClick={() => {
                    setadvanceOptions(false);
                  }}
                >
                  Basic Options
                </NavLink>
              </div>
            ) : (
              <div>
                <NavLink
                  to="#"
                  className={`${cx.rightOption}`}
                  onClick={() => {
                    setadvanceOptions(true);
                  }}
                >
                  Advanced Options
                </NavLink>
              </div>
            )}
            <div>
              <Button
                className={`${cx.btnClose}`}
                onClick={() => {
                  props.handleClose();

                  setAddInventoryItem({
                    id: "",
                    item_name: "",
                    localized: "",
                    sku: "",
                    category: "",
                    costing_method: "",
                    barcode: "",
                    cost_sar: "",
                    storage_unite: "",
                    ingredient_unite: "",
                    minimum_level: "",
                    per_level: "",
                    maximum_level: "",
                    s_to_i_fector: "",
                  });
                  setSku("");
                }}
              >
                Close
              </Button>
              <Button
                className={`${cx.btnSubmit}`}
                onClick={() => {
                  if (ValidateItemData()) {
                    dispatch(addEditInventoryItem(addInventoryItem));
                    props.handleClose();
                    setAddInventoryItem({
                      id: "",
                      item_name: "",
                      localized: "",
                      sku: "",
                      category: "",
                      costing_method: "",
                      barcode: "",
                      cost_sar: "",
                      storage_unite: "",
                      ingredient_unite: "",
                      minimum_level: "",
                      per_level: "",
                      maximum_level: "",
                      s_to_i_fector: "",
                    });
                    setSku("");
                  }
                }
                }
              >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END create item */}

      {/* START edit item */}
      {props.modalName === "edit item" && (
        <Modal
          scrollable
          className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ""}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name
                    <SharedTooltip infoText="The name of the address." />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={addInventoryItem?.item_name}
                    onChange={(e: any) => {
                      setAddInventoryItem((prev: any) => {
                        return { ...prev, item_name: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name Localized
                    <SharedTooltip
                      infoText=" Enter the localized name in a 2nd language of your
                            choice."
                    />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={addInventoryItem?.localized}
                    onChange={(e: any) => {
                      setAddInventoryItem((prev: any) => {
                        return { ...prev, localized: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                <Row>
                  <Col md={7} lg={7}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        SKU
                        <SharedTooltip infoText="Stock keeping unit, a unique code for your item." />
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={
                          addInventoryItem?.sku !== ""
                            ? addInventoryItem?.sku
                            : `sk-${sku}`
                        }
                        disabled
                      />
                    </Form.Group>
                  </Col>

                  <Col md={5} lg={5}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label className={`${cx.labelHide}`}>.</Form.Label>
                      <button
                        type="button"
                        className="form-control"
                        onClick={() => {
                          const number = Math.floor(
                            1000 + Math.random() * 9000
                          );
                          setSku(number);
                          setAddInventoryItem((prev: any) => {
                            return { ...prev, sku: `sk-${number}` };
                          });
                        }}
                      >
                        Generate SKU
                      </button>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Category
                    <SharedTooltip infoText="You can add an item to a category, like vegetables." />
                  </Form.Label>
                  <Select
                    defaultValue={category.map((item: any) => {
                      if (item.value === +addInventoryItem?.category) {
                        return { value: item.value, label: item.label };
                      }
                    })}
                    isSearchable={true}
                    options={category}
                    onChange={(e: any) => {
                      setAddInventoryItem((prev: any) => {
                        return { ...prev, category: e.value };
                      });
                    }}
                    placeholder="Choose..."
                  />
                </Form.Group>
              </Col>
              <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Storage Unit
                    <SharedTooltip infoText="How this item is stored, example: Box or KG." />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={addInventoryItem?.storage_unite}
                    onChange={(e: any) => {
                      setAddInventoryItem((prev: any) => {
                        return { ...prev, storage_unite: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Ingredient Unit
                    <SharedTooltip
                      infoText="How this item is used in your products ingredients,
                            example: GRAM or ML."
                    />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={addInventoryItem?.ingredient_unite}
                    onChange={(e: any) => {
                      setAddInventoryItem((prev: any) => {
                        return { ...prev, ingredient_unite: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Storage To Ingredient
                    <SharedTooltip
                      infoText="The conversion factor between storage unit and
                            ingredient unit, example: 1000."
                    />
                  </Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue={addInventoryItem?.s_to_i_fector}
                    onChange={(e: any) => {
                      setAddInventoryItem((prev: any) => {
                        return { ...prev, s_to_i_fector: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Costing Method
                    <SharedTooltip
                      infoText="If you donʼt have a fixed cost for this item it will
                            be calculated from purchase transactions."
                    />
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={addInventoryItem?.costing_method}
                    onChange={(e: any) => {
                      setAddInventoryItem((prev: any) => {
                        return { ...prev, costing_method: e.target.value };
                      });
                    }}
                  >
                    <option value={1}>Fixed</option>
                    <option value={2}>From Transition</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {advanceOptions && (
                <Fragment>
                  <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Barcode
                        <SharedTooltip
                          infoText="Unique barcode to identify with barcode
                                scanners."
                        />
                      </Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={addInventoryItem?.barcode}
                        onChange={(e: any) => {
                          setAddInventoryItem((prev: any) => {
                            return { ...prev, barcode: e.target.value };
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Fragment>
              )}

              <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Cost
                    <SharedTooltip infoText="Fixed cost per storage unit." />
                  </Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue={addInventoryItem?.cost_sar}
                    onChange={(e: any) => {
                      setAddInventoryItem((prev: any) => {
                        return { ...prev, cost_sar: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              {advanceOptions && (
                <Fragment>
                  <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Minimum Level
                        <SharedTooltip
                          infoText="The minimum level allowed in the branch or
                                warehouse."
                        />
                      </Form.Label>
                      <Form.Control
                        type="number"
                        defaultValue={addInventoryItem?.minimum_level}
                        onChange={(e: any) => {
                          setAddInventoryItem((prev: any) => {
                            return { ...prev, minimum_level: e.target.value };
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Par Level
                        <SharedTooltip
                          infoText="The Initial quantity when you create a purchase
                                order or transfer order."
                        />
                      </Form.Label>
                      <Form.Control
                        type="number"
                        defaultValue={addInventoryItem?.per_level}
                        onChange={(e: any) => {
                          setAddInventoryItem((prev: any) => {
                            return { ...prev, per_level: e.target.value };
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={sizeadvanceoptions} lg={sizeadvanceoptions}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Maximum Level
                        <SharedTooltip
                          infoText=" The maximum level allowed in the branch or
                                warehouse."
                        />
                      </Form.Label>
                      <Form.Control
                        type="number"
                        defaultValue={addInventoryItem?.maximum_level}
                        onChange={(e: any) => {
                          setAddInventoryItem((prev: any) => {
                            return { ...prev, maximum_level: e.target.value };
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Fragment>
              )}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {advanceOptions ? (
              <div>
                <NavLink
                  to="#"
                  className={`${cx.rightOption}`}
                  onClick={() => {
                    setadvanceOptions(false);
                  }}
                >
                  Basic Options
                </NavLink>
              </div>
            ) : (
              <div>
                <NavLink
                  to="#"
                  className={`${cx.rightOption}`}
                  onClick={() => {
                    setadvanceOptions(true);
                  }}
                >
                  Advanced Options
                </NavLink>
              </div>
            )}
            <div>
              <Button
                className={`${cx.btnClose}`}
                onClick={() => {
                  props.handleClose();
                  setStateValue()
                }}
              >
                Close
              </Button>
              <Button
                className={`${cx.btnSubmit}`}
                onClick={() => {
                  if (ValidateItemData()) {
                    dispatch(addEditInventoryItem(addInventoryItem));
                    props.handleClose();
                    setTimeout(() => {
                      dispatch(inventoryItemView(addInventoryItem?.id))
                    }, 500);
                    setStateValue()
                  }
                }
                }
              >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END edit item */}

      {/* START Items Filter */}
      {props.modalName === "item filter" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Filter</Modal.Title>
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
                  <Form.Label>SKU</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Barcode</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Tag</Form.Label>
                  <FilterDropdown options={customertagoptions} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Category</Form.Label>
                  <FilterDropdown options={customertagoptions} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Supplier</Form.Label>
                  <FilterDropdown options={customertagoptions} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Costing Method</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Fixed</option>
                    <option value="1">From Transition</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Stock Product</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Yes</option>
                    <option value="1">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Deleted</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Yes</option>
                    <option value="1">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Updated After</Form.Label>
                  <Form.Control type="date" />
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
                }}
              >
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END Items Filter */}

      {/* START items add tags */}
      {props.modalName === "items add tags" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Tags</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Tags
                    <SharedTooltip infoText="To select the needed tags." />
                  </Form.Label>
                  <FilterDropdown
                    options={tags}
                    postdata={allTagModifierData}
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
                }}
              >
                Close
              </Button>
              <Button
                className={`${cx.btnSubmit}`}
                onClick={() => {
                  addInventoryItemType === "tags" &&
                    dispatch(
                      tagadd_item({
                        item_id: inventoryItemId,
                        tag_id: allDataProduct,
                      })
                    );

                  addInventoryItemType === "addMtags" &&
                    dispatch(
                      selected_tagaddremove_delete({
                        ids: inventoryItemId,
                        type: "addtag",
                        tags: allDataProduct,
                      })
                    );
                  addInventoryItemType === "removeMtags" &&
                    dispatch(
                      selected_tagaddremove_delete({
                        ids: inventoryItemId,
                        type: "removetag",
                        tags: allDataProduct,
                      })
                    );
                  props.handleClose();
                }}
              >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END items add tags */}

      {/* START item suppliers */}
      {props.modalName === "item suppliers" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Suppliers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className="d-block">
                    Suppliers
                    <SharedTooltip infoText="To select the needed suppliers." />
                  </Form.Label>
                  <FilterDropdown
                    options={supplier}
                    postdata={allTagModifierData}
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
                }}
              >
                Close
              </Button>
              <Button
                className={`${cx.btnSubmit}`}
                onClick={() => {
                  dispatch(
                    supplieradd_item({
                      item_id: inventoryItemId,
                      supplier_id: allDataProduct,
                    })
                  );
                }}
              >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END item suppliers */}

      {/* START item ingredients */}
      {props.modalName === "item ingredients" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Items</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  {inventoryItems ? (
                    <Form.Label className="d-block">
                      Items by Tags
                      <SharedTooltip infoText=" To select a tag contains the Items." />
                      <NavLink
                        className={`${cx.rightLabel}`}
                        to="#"
                        onClick={() => {
                          setinventoryItems(false);
                        }}
                      >
                        Select Items?
                      </NavLink>
                    </Form.Label>
                  ) : (
                    <Form.Label className="d-block">
                      Items
                      <SharedTooltip infoText="To select the Items." />
                      <NavLink
                        className={`${cx.rightLabel}`}
                        to="#"
                        onClick={() => {
                          setinventoryItems(true);
                        }}
                      >
                        Select by tags?
                      </NavLink>
                    </Form.Label>
                  )}

                  <FilterDropdown
                    options={ingredients}
                    postdata={allTagModifierData}
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
                }}
              >
                Close
              </Button>
              <Button
                className={`${cx.btnSubmit}`}
                onClick={() => {
                  dispatch(
                    ingridentadd_item({
                      item_id: inventoryItemId,
                      ingrident_id: allDataProduct,
                    })
                  );
                }}
              >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END item ingredients */}

      {/* START item branches */}
      {props.modalName === "item branches" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Select Branches</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  {inventoryItems ? (
                    <Form.Label className="d-block">
                      Branches
                      <SharedTooltip infoText="To select the needed branches." />
                      <NavLink
                        className={`${cx.rightLabel}`}
                        to="#"
                        onClick={() => {
                          setinventoryItems(false);
                        }}
                      >
                        Select by Tags?
                      </NavLink>
                    </Form.Label>
                  ) : (
                    <Form.Label className="d-block">
                      Tags
                      <SharedTooltip infoText="To select a tag that contains branches." />
                      <NavLink
                        className={`${cx.rightLabel}`}
                        to="#"
                        onClick={() => {
                          setinventoryItems(true);
                        }}
                      >
                        Select by branches ?
                      </NavLink>
                    </Form.Label>
                  )}
                  <FilterDropdown
                    options={branch}
                    postdata={allTagModifierData}
                  />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Minimum Level (kg)
                    <SharedTooltip
                      infoText="The minimum level allowed in the selected branch or
                            warehouse."
                    />
                  </Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e: any) => setmin_level(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Par Level (kg)
                    <SharedTooltip
                      infoText="The Initial quantity when you create a purchase
                            order or transfer order."
                    />
                  </Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e: any) => setmax_level(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Maximum Level (kg)
                    <SharedTooltip
                      infoText="The maximum level allowed in the selected branch or
                            warehouse."
                    />
                  </Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e: any) => setpar_level(e.target.value)}
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
                }}
              >
                Close
              </Button>
              <Button
                className={`${cx.btnSubmit}`}
                onClick={() => {
                  dispatch(
                    customlevel_additem({
                      item_id: inventoryItemId,
                      branch_id: allDataProduct,
                      min_level: min_level,
                      max_level: max_level,
                      par_level: par_level,
                    })
                  );
                }}
              >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END item branches */}

      {props.modalName === "delete items" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Are you sure you want to delete this?</Form.Label>
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
                }}
              >
                Close
              </Button>
              <Button
                className={`${cx.btnSubmit}`}
                style={{ backgroundColor: "#FA8072", borderColor: "#FA8072" }}
                onClick={() => {
                  dispatch(
                    item_deletemultiple({
                      delete_item_ids: inventoryItemId,
                    })
                  );
                  props.handleClose();
                }}
              >
                Yes
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Modals;
