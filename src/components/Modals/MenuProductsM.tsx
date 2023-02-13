import React, { Fragment, useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import cx from './Modals.module.scss';
import Select from 'react-select';
import { FilterDropdown, SingleFilterDropdown } from "../Dropdown/Dropdowns";
import { tagoptions, customertagoptions, customertimezone, itemoption, ingredientsoptions, deleteOptions, pricingMethod, costingMethod, sellingMethod, stockProductOptions, costingOptions } from '../../constants/dropdownconstants'
import { AiFillInfoCircle, AiOutlineInfoCircle } from 'react-icons/ai';
import { NavLink } from "react-router-dom";
import food from "../../images/edit-images.png";
import { modifierList, modifierListItems, productFilterData, productFilterValue, productList, filterArray, createProduct, getTaxGroup, taxGroupData, singleProductDetails, productView, tagIngeModifier, addProductType, addTag, productId, addModifier, addIngredient, addPriceTag, product_inactivebrachadd, product_outofstock_brachadd, product_costumepriceadd, tagData, addProductTypeName, getAllTagIngridentModifier, parameter } from "../../redux_toolkit/reducer/menuProductsApiReducer";
import { categoryList, categoryListItems, filterValue } from "../../redux_toolkit/reducer/menuCategoriesApiReducer";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface OptionsFilter {
  value: any;
  label: string;
  key?: string;
  disabled?: boolean;
}


const Modals = (props: any) => {
  const options = [
    {
      value: '1', label: 'Pick up',
    },
    {
      value: '2', label: 'Delivery',
    },
  ]
  const deliveryzone = [
    {
      value: '1', label: 'Shipping',
    },
    {
      value: '2', label: 'Ordered',
    },
  ]
  const addTagModifierBranchIngredientCount = useSelector((state: any) => state.menuProductsApiReducer.addTagModifierBranchIngredientCount)
  const taxGroupShowList = useSelector(
    (state: any) => state.menuProductsApiReducer.getTaxGroupStatus
  );

  const singleProduct = useSelector(
    (state: any) => state.menuProductsApiReducer.singleProductCount
  );
  const [addProductValue, setAddProductValue] = useState({
    id: "",
    name: "",
    sku: "",
    category: "",
    pricing_type: "Fixed Price",
    price: "",
    stock: "no",
    namelocalize: "",
    sellingmethod: "unit",
    costingmethod: "From Ingredients",
    taxgroup: 0,
  });
  useEffect(() => {
    console.log(singleProductDetails, "singleProductDetailssingleProductDetails")
    setAddProductValue({
      id: singleProductDetails?.id ? singleProductDetails?.id : "",
      name: singleProductDetails?.name ? singleProductDetails?.name : "",
      sku: singleProductDetails?.sku ? singleProductDetails?.sku : "",
      category: singleProductDetails?.category ? singleProductDetails?.category : "",
      pricing_type: singleProductDetails?.pricing_type ? singleProductDetails?.pricing_type : "Fixed Price",
      price: singleProductDetails?.price ? singleProductDetails?.price : "",
      stock: singleProductDetails?.stock ? singleProductDetails?.stock : "no",
      namelocalize: singleProductDetails?.ar_name ? singleProductDetails?.ar_name : "",
      sellingmethod: singleProductDetails?.selling_type ? singleProductDetails?.selling_type : "unit",
      costingmethod: singleProductDetails?.costing_type ? singleProductDetails?.costing_type : "From Ingredients",
      taxgroup: singleProductDetails?.taxgroup ? singleProductDetails?.taxgroup : 0,
    })
  }, [singleProduct])


  const dispatch = useDispatch();
  const [ordertype, setOrderType] = useState('')
  const [advanceOptions, setadvanceOptions] = useState(false)
  const [inventoryItems, setinventoryItems] = useState(false)
  const [isCategory, setIsCategory] = useState(true)

  const orderTypehandler = (event: any) => {
    setOrderType(event.label)
  };

  const [filterState, setFilterState] = useState({
    name: productFilterValue.name,
    sku: productFilterValue.sku,
    barcode: productFilterValue.barcode,
    category_id: productFilterValue.category_id,
    group: productFilterValue.group,
    modifiers: productFilterValue.modifiers,
    tag: productFilterValue.tag,
    texgroup: productFilterValue.texgroup,
    costingmethod: productFilterValue.costingmethod,
    active: productFilterValue.active,
    deleted: productFilterValue.deleted,
    stockproduct: productFilterValue.stockproduct,
    updateafter: productFilterValue.updateafter
  })

  let sizeadvanceoptions = advanceOptions ? 6 : 12;

  const [subshow, setsubShow] = useState(false);
  const [submodalName, setsubModalName] = useState('');
  const [category, setCategory] = useState<any[]>([])
  const [modifier, setModifier] = useState<any[]>([])
  const [taxData, setTaxData] = useState<any[]>([])
  const [tagDataAll, setTagDataAll] = useState<any[]>([])
  const [allData, setAllData] = useState<any[]>([])
  const [number, setNumber] = useState(0);
  const [allDataProduct, setAllDataProduct] = useState("");
  const [sku, setSku] = useState<any>()
  const handlesetAllDataProduct = (Data: any) => {
    debugger
    let Ids = "";
    Data.map((res: any) => { Ids += res.value + "," });
    Ids = Ids.slice(0,-1);
    setAllDataProduct(Ids);
  }
  const subdeliveryAddress = (modalname: string, status: boolean) => {
    setsubModalName(modalname)
    setsubShow(status);
  }
  const subhandleClose = () => {
    setsubShow(false);
    setsubModalName('');
  };

  
  function categoryPostdata(category: string) {
    setFilterState((prev: any) => { return { ...prev, category_id: category } })
  }
  function defaultcategorydata(category: OptionsFilter) {
    let categoryArray = [];
    categoryArray.push(category)
    filterArray.categories = [...filterArray.categories, categoryArray[0]]
  }
  function modifierPostdata(modifier: string) {
    setFilterState((prev: any) => { return { ...prev, modifiers: modifier } })
  }

  function taxGroupPostdata(taxGroup: string) {
    setFilterState((prev: any) => { return { ...prev, texgroup: taxGroup } })
  }

  function tagPostdata(tag: string) {
    setFilterState((prev: any) => { return { ...prev, tag: tag } })
  }

  function defaultmodifierdata(modifier: OptionsFilter) {
    let modifierArray = [];
    modifierArray.push(modifier)
    filterArray.modifiers = [...filterArray.modifiers, modifierArray[0]]
  }

  function defaultTagdata(modifier: OptionsFilter) {
    let tagArray = [];
    tagArray.push(modifier)
    filterArray.tag = [...filterArray.tag, tagArray[0]]
  }

  function defaultTaxGroupdata(taxGroup: OptionsFilter) {
    console.log(taxGroup, "taxGroup")
    let taxGroupArray = [];
    taxGroupArray.push(taxGroup)
    filterArray.texgroup = [...filterArray.texgroup, taxGroupArray[0]]
  }


  function groupPostdata(tags: string) {
    props.postdata(tags);
  }

  function allTagModifierData(data: string) {
    debugger
    console.log(data, "taxGroupArray11")
    props.postdata(data);
    setAllDataProduct(data)
  }

  function defaultValues(taxGroup: OptionsFilter) {
    debugger
    console.log(taxGroup, "taxGroup")
    let taxGroupArray = [];
    taxGroupArray.push(taxGroup.value)
    // const check = ([allDataProduct, taxGroupArray[0]].join(","))
    // console.log(taxGroupArray,"taxGroupArray")
    // setAllDataProduct(check)
    // console.log(allDataProduct,"taxGroupArray12")
  }

  useEffect(() => {


    const category: any[] = []
    categoryListItems?.map((item: any, index: number) => {
      category.push({
        label: item.name,
        value: item.id
      })
    })
    setCategory(category)

    const modifier: any[] = []
    modifierListItems?.map((item: any, index: number) => {
      modifier.push({
        label: item.name,
        value: item.id
      })
    })
    setModifier(modifier)

  }, [categoryListItems, modifierListItems])

  useEffect(() => {
    dispatch(getTaxGroup())
  }, [])

  useEffect(() => {
    const number = Math.floor(1000 + Math.random() * 9000)
    setSku(number)
    setAddProductValue((prev: any) => {
      return { ...prev, sku: `sk-${number}` };
    });
  }, [props.modalName === 'create product'])

  useEffect(() => {
    const taxdata: any[] = []
    taxGroupData?.map((item: any, index: number) => {
      taxdata.push({
        label: item.group_name,
        value: item.id
      })
    })
    setTaxData(taxdata)
  }, [taxGroupShowList])

  useEffect(() => {
    debugger
    setAllDataProduct("")
    props.handleClose()
  }, [addTagModifierBranchIngredientCount])

  return (
    <>

      {/* ############################################################
 ######################## ORDER MODALS ########################### */}

      {/* START Category Create Category */}
      {props.modalName === 'category create category' &&
        <Modal scrollable className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          The customerʼs Full Name.
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name Localized
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          The customerʼs Full Name.
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Reference
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          The customerʼs Full Name.
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>

            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END Category Create Category */}



      {/* START Delivery Address */}
      {submodalName === 'delivery address' &&
        <Modal scrollable className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
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
                  <Form.Control as="textarea" type="text" style={{ height: '150px' }} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Delivery Zone</Form.Label>
                  <Select
                    isSearchable={true}
                    options={deliveryzone}
                    onChange={(e) => { orderTypehandler(e) }}
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
              <Button className={`${cx.btnSubmit}`}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END Delivery Address */}



      {/* START Product Filter */}
      {
        props.modalName === 'product filter' &&
        <Modal scrollable className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Filter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={filterState.name}
                    onChange={(e: any) => {
                      setFilterState((prev: any) => { return { ...prev, name: e.target.value } })
                    }} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>SKU</Form.Label>
                  <Form.Control type="text" value={filterState.sku}
                    onChange={(e: any) => {
                      setFilterState((prev: any) => { return { ...prev, sku: e.target.value } })
                    }} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Barcode</Form.Label>
                  <Form.Control type="text" value={filterState.barcode}
                    onChange={(e: any) => {
                      setFilterState((prev: any) => { return { ...prev, barcode: e.target.value } })
                    }} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Categories</Form.Label>
                  <FilterDropdown options={category} postdata={categoryPostdata} defaultdata={defaultcategorydata} defaultoptions={filterArray.categories} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Group</Form.Label>
                  <FilterDropdown options={tagoptions} postdata={groupPostdata} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Modifiers</Form.Label>
                  <FilterDropdown options={modifier} postdata={modifierPostdata} defaultdata={defaultmodifierdata} defaultoptions={filterArray.modifiers} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Tags</Form.Label>
                  <FilterDropdown options={tagIngeModifier} postdata={tagPostdata} defaultdata={defaultTagdata} defaultoptions={filterArray.tag} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Tax Groups</Form.Label>
                  <FilterDropdown options={taxData} postdata={taxGroupPostdata} defaultdata={defaultTaxGroupdata} defaultoptions={filterArray.texgroup} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Costing Method</Form.Label>
                  <Select
                    defaultValue={costingOptions.map((item) => {
                      if (item.value === filterState.costingmethod) {
                        return { value: item.value, label: item.label };
                      }
                    })}
                    isSearchable={true}
                    options={costingOptions}
                    onChange={(e: any) => { setFilterState((prev: any) => { return { ...prev, costingmethod: e.value } }) }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Active</Form.Label>
                  <Select
                    defaultValue={stockProductOptions.map((item) => {
                      if (item.value === filterState.active) {
                        return { value: item.value, label: item.label };
                      }
                    })}
                    isSearchable={true}
                    options={stockProductOptions}
                    placeholder="Choose...
                    "
                    onChange={(e: any) => { setFilterState((prev: any) => { return { ...prev, active: e.value } }) }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Stock Product</Form.Label>
                  <Select
                    defaultValue={deleteOptions.map((item) => {
                      if (item.value === filterState.stockproduct) {
                        return { value: item.value, label: item.label };
                      }
                    })}
                    isSearchable={true}
                    options={stockProductOptions}
                    placeholder="Choose...
                    "
                    onChange={(e: any) => { setFilterState((prev: any) => { return { ...prev, stockproduct: e.value } }) }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Deleted</Form.Label>
                  <Select
                    defaultValue={deleteOptions.map((item) => {
                      if (item.value === filterState.deleted) {
                        return { value: item.value, label: item.label };
                      }
                    })}
                    isSearchable={true}
                    options={deleteOptions}
                    placeholder="Choose...
                    "
                    onChange={(e: any) => { setFilterState((prev: any) => { return { ...prev, deleted: e.value } }) }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Update After</Form.Label>
                  <Form.Control type="text" onChange={(e: any) => {
                    setFilterState((prev: any) => { return { ...prev, updateafter: e.target.value } })
                  }} />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div><NavLink to="#" className={`${cx.rightOption}`}
              onClick={() => {
                productFilterValue.type = "all"
                dispatch(productList(productFilterValue))
                props.handleClose();
                setFilterState({
                  name: "",
                  sku: "",
                  barcode: "",
                  category_id: "",
                  group: "",
                  modifiers: "",
                  tag: "",
                  texgroup: "",
                  costingmethod: "",
                  active: "",
                  stockproduct: "",
                  deleted: "",
                  updateafter: "",
                })
                productFilterValue.name = ""
                productFilterValue.sku = ""
                productFilterValue.barcode = ""
                productFilterValue.category_id = ""
                productFilterValue.group = ""
                productFilterValue.modifiers = ""
                productFilterValue.delete = ""
                productFilterValue.costingmethod = ""
                productFilterValue.active = ""
                productFilterValue.stockproduct = ""
                productFilterValue.updateafter = ""
                filterArray.categories = [];
                filterArray.modifiers = [];
                filterArray.texgroup = [];
                filterArray.tag = [];
              }}
            >Reset</NavLink></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}
                onClick={() => {
                  dispatch(productFilterData(filterState))
                  dispatch(productList(productFilterValue));
                  props.handleClose();
                }}>
                Save
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END Product Filter */}


      {/* START Edit Product */}
      {
        props.modalName === 'edit product' &&
        <Modal scrollable className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>

                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text"
                    defaultValue={addProductValue.name}
                    onChange={(e: any) => {
                      setAddProductValue((prev: any) => {
                        return { ...prev, name: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Category</Form.Label>
                  <Select
                    defaultValue={category.map((item) => {
                      if (item.value === addProductValue.category) {
                        return { value: item.value, label: item.label };
                      }
                    })}
                    isSearchable={true}
                    options={category}
                    onChange={(e: any) => {
                      setAddProductValue((prev: any) => {
                        return { ...prev, category: e.value };
                      });
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Stock Product</Form.Label>
                  <Select
                    defaultValue={deleteOptions.map((item: any) => {
                      let type;
                      addProductValue?.stock == "0" ? type = "no" : type = "yes"
                      if (item.value === type) {
                        return { value: item.value, label: item.label };
                      }
                    })}
                    isSearchable={true}
                    options={deleteOptions}
                    onChange={(e: any) => {
                      setAddProductValue((prev: any) => {
                        return { ...prev, stock: e.value === "No" ? "0" : "1" };
                      });
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Row>
                  <Col md={7} lg={7}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        SKU
                        {['top'].map((placement) => (
                          <OverlayTrigger key={placement} overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              Stock keeping unit, a unique code for your item.
                            </Tooltip>}>
                            <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                          </OverlayTrigger>
                        ))}
                      </Form.Label>
                      <Form.Control type="text" value={addProductValue.sku !== "" ? addProductValue.sku : `sk-${sku}`} disabled />
                    </Form.Group>
                  </Col>

                  <Col md={5} lg={5}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label className={`${cx.labelHide}`}>
                        .
                      </Form.Label>
                      <button type="button" className="form-control" onClick={() => {
                        const number = Math.floor(1000 + Math.random() * 9000)
                        setSku(number)
                        setAddProductValue((prev: any) => {
                          return { ...prev, sku: `sk-${number}` };
                        });
                      }}>Generate SKU</button>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Pricing Method</Form.Label>
                  <Select
                    isSearchable={true}
                    options={pricingMethod}
                    defaultValue={pricingMethod.map((item) => {
                      if (item.value === addProductValue.pricing_type) {
                        return { value: item.value, label: item.label };
                      }
                    })}
                    onChange={(e: any) => {
                      setAddProductValue((prev: any) => {
                        return { ...prev, pricing_type: e.value };
                      });
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>

              {addProductValue.pricing_type === "Fixed Price" && <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Price SAR
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>

                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text"
                    defaultValue={addProductValue.price}
                    onChange={(e: any) => {
                      setAddProductValue((prev: any) => {
                        return { ...prev, price: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              }
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Tax Group</Form.Label>
                  <Select
                    isSearchable={true}
                    defaultValue={taxData.map((item) => {
                      console.log(item.value, addProductValue.taxgroup, "taxgrouptaxgroup")
                      if (item.value == addProductValue.taxgroup) {
                        console.log(item, "itemmmm")
                        return { value: item.value, label: item.label };
                      }
                    })}
                    options={taxData}
                    onChange={(e: any) => {
                      setAddProductValue((prev: any) => {
                        return { ...prev, taxgroup: e.value };
                      });
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Costing Method</Form.Label>
                  <Select
                    defaultValue={costingMethod.map((item) => {
                      console.log(item.value, addProductValue.costingmethod, "costingmethod")
                      if (item.value === addProductValue.costingmethod) {
                        return { value: item.value, label: item.label };
                      }
                    })}
                    isSearchable={true}
                    options={costingMethod}
                    onChange={(e: any) => {
                      setAddProductValue((prev: any) => {
                        return { ...prev, costingmethod: e.value };
                      });
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Selling Method</Form.Label>
                  <Select
                    defaultValue={sellingMethod.map((item) => {
                      if (item.value === addProductValue.sellingmethod) {
                        return { value: item.value, label: item.label };
                      }
                    })}
                    isSearchable={true}
                    options={sellingMethod}
                    onChange={(e: any) => {
                      setAddProductValue((prev: any) => {
                        return { ...prev, sellingmethod: e.value };
                      });
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name Localized
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>

                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text"
                    defaultValue={addProductValue.namelocalize}
                    onChange={(e: any) => {
                      setAddProductValue((prev: any) => {
                        return { ...prev, namelocalize: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>

            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div><NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`}>Delete Product</NavLink></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={() => {
                dispatch(createProduct(addProductValue))
                props.handleClose()
                dispatch(productView(addProductValue?.id))
              }}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END Edit Product*/}


      {/* START Import */}
      {
        props.modalName === 'import' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Import Products</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <p><input type="file" /></p>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div><NavLink to="#" className={`${cx.rightOption}`}>Download Template</NavLink></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>
                Submit
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END Import */}

      {/* START Import Product */}
      {
        props.modalName === 'import product' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Import Product Ingredients</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <p><input type="file" /></p>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div><NavLink to="#" className={`${cx.rightOption}`}>Download Template</NavLink></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>
                Submit
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END Import Product */}

      {/* START Product Modifiers */}
      {
        props.modalName === 'product modifiers' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Import Product Modifiers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <p><input type="file" /></p>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div><NavLink to="#" className={`${cx.rightOption}`}>Download Template</NavLink></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>
                Submit
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END Product Modifiers */}



      {/* START Sort Category Popup */}
      {
        props.modalName === 'sort category popup' &&
        <Modal className={`${cx.ctsModal} ${cx.ctsModalSize}`} size="lg" show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>باربكيو</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg={3}>
                <NavLink to="#" className={`${cx.sortCategory}`}>
                  sadf
                </NavLink>
              </Col>
              <Col lg={3}>
                <NavLink to="#" className={`${cx.sortCategory}`}>
                  باربكيو كيت 20 دجاج - 1
                </NavLink>
              </Col>
              <Col lg={3}>
                <NavLink to="#" className={`${cx.sortCategory}`}>
                  باربكيو كيت 20 لحم - 1
                </NavLink>
              </Col>
              <Col lg={3}>
                <NavLink to="#" className={`${cx.sortCategory}`}>
                  باربكيو كيت 10 مكس - 1
                </NavLink>
              </Col>
              <Col lg={3}>
                <NavLink to="#" className={`${cx.sortCategory}`}>
                  باربكيو كيت 10 دجاج - 1
                </NavLink>
              </Col>
              <Col lg={3}>
                <NavLink to="#" className={`${cx.sortCategory}`}>
                  باربكيو كيت 10 لحم - 1
                </NavLink>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END Sort Category Popup */}


      {/* START Customer add tags */}
      {
        props.modalName === 'products add tags' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> {addProductType} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    {addProductTypeName === "Price" ? "Custom Price branch" : addProductTypeName === "In" ? "Inactive In branch" : addProductTypeName === "Of" ? "Out Of Stock branch" : addProductTypeName === "pricetag" ? "Pricetag" : addProductTypeName}
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>

                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <FilterDropdown setAllData={handlesetAllDataProduct} options={tagIngeModifier} postdata={allTagModifierData} defaultdata={defaultValues} defaultoptions={getAllTagIngridentModifier?.[parameter]?.map((item: any) => {console.log(item); return { value: item?.id, label: item?.name ? item?.name : item?.english_name ? item?.english_name : item[0]?.ingredient_name ? item[0]?.ingredient_name : item.branch  } })} />
                </Form.Group>
              </Col>
              {(addProductType === "pricetag" || addProductType === "Custom Price branch") && <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Price
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>

                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="number" onChange={(e: any) => setNumber(e.target.value)} />
                </Form.Group>
              </Col>}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`} onClick={() => {
                addProductTypeName === "Tags" ? dispatch(addTag({ tagids: allDataProduct, product_ids: productId })) : addProductTypeName === "Modifier" ? dispatch(addModifier({ modifier_ids: allDataProduct, products_id: productId })) : addProductTypeName === "Ingrident" ? dispatch(addIngredient({ ingrident_ids: allDataProduct, products_id: productId })) : addProductType === "Inactive In branch" ? dispatch(product_inactivebrachadd({ branch_ids: allDataProduct, products_id: productId })) : addProductType === "Out Of Stock branch" ? dispatch(product_outofstock_brachadd({ branch_ids: allDataProduct, products_id: productId })) : addProductType === "Custom Price branch" ? dispatch(product_costumepriceadd({ branch_ids: allDataProduct, products_id: productId, price: number })) : dispatch(addPriceTag({ pricetag_id: allDataProduct, products_id: productId, price: number }))
              }}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END Customer add tags */}

      {/* START Create Product */}
      {
        props.modalName === 'create product' &&
        <Modal scrollable className={`${cx.ctsModal}`} show={props.show} onHide={() => {
          props.handleClose()
          setIsCategory(true)
        }}>
          <Modal.Header closeButton>
            <Modal.Title>Create product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>

                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text"
                    onChange={(e: any) => {
                      setAddProductValue((prev: any) => {
                        return { ...prev, name: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Category</Form.Label>
                  <Select
                    isSearchable={true}
                    options={category}
                    onChange={(e: any) => {
                      setIsCategory(false)
                      setAddProductValue((prev: any) => {
                        return { ...prev, category: e.value };
                      });
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Stock Product</Form.Label>
                  <Select
                    defaultValue={{
                      value: "no",
                      label: "No",
                    }}
                    options={deleteOptions}
                    onChange={(e: any) => {
                      setAddProductValue((prev: any) => {
                        return { ...prev, stock: e.value === "No" ? "0" : "1" };
                      });
                    }}
                    placeholder="Choose..."
                    isDisabled={isCategory}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Row>
                  <Col md={7} lg={7}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        SKU
                        {['top'].map((placement) => (
                          <OverlayTrigger key={placement} overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              Stock keeping unit, a unique code for your item.
                            </Tooltip>}>
                            <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                          </OverlayTrigger>
                        ))}
                      </Form.Label>
                      <Form.Control type="text" value={`sk-${sku}`} disabled />
                    </Form.Group>
                  </Col>

                  <Col md={5} lg={5}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label className={`${cx.labelHide}`}>
                        .
                      </Form.Label>
                      <button type="button" className="form-control" onClick={() => {
                        const number = Math.floor(1000 + Math.random() * 9000)
                        setSku(number)
                        setAddProductValue((prev: any) => {
                          return { ...prev, sku: `sk-${number}` };
                        });
                      }}>Generate SKU</button>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Pricing Method</Form.Label>
                  <Select
                    defaultValue={{
                      value: "Fixed Price",
                      label: "Fixed Price",
                    }}
                    isSearchable={true}
                    options={pricingMethod}
                    onChange={(e: any) => {
                      setAddProductValue((prev: any) => {
                        return { ...prev, pricing_type: e.value };
                      });
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>

              {addProductValue.pricing_type === "Fixed Price" && <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Price SAR
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>

                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text"
                    onChange={(e: any) => {
                      setAddProductValue((prev: any) => {
                        return { ...prev, price: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>}
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Tax Group</Form.Label>
                  <Select
                    isSearchable={true}
                    options={taxData}
                    onChange={(e: any) => {
                      setAddProductValue((prev: any) => {
                        return { ...prev, taxgroup: e.value };
                      });
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Costing Method</Form.Label>
                  <Select
                    defaultValue={{
                      value: "From Ingredients",
                      label: "From Ingredients",
                    }}
                    isSearchable={true}
                    options={costingMethod}
                    onChange={(e: any) => {
                      setAddProductValue((prev: any) => {
                        return { ...prev, costingmethod: e.value };
                      });
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Selling Method</Form.Label>
                  <Select
                    defaultValue={{
                      value: "unit",
                      label: "Unit",
                    }}
                    isSearchable={true}
                    options={sellingMethod}
                    onChange={(e: any) => {
                      setAddProductValue((prev: any) => {
                        return { ...prev, sellingmethod: e.value };
                      });
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name Localized
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>

                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text"
                    onChange={(e: any) => {
                      setAddProductValue((prev: any) => {
                        return { ...prev, namelocalize: e.target.value };
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
              <Button className={`${cx.btnClose}`} onClick={() => {
                props.handleClose(); setOrderType('');
                setAddProductValue({
                  id: "",
                  name: "",
                  sku: "",
                  category: "",
                  pricing_type: "Fixed Price",
                  price: "",
                  stock: "no",
                  namelocalize: "",
                  sellingmethod: "unit",
                  costingmethod: "From Ingredients",
                  taxgroup: 0,
                })
                setSku("")
                setIsCategory(true)
              }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}
                onClick={() => {
                  if (addProductValue.name == "") {
                    toast.error('Name is required', {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose : 3000
                  });
                  }
                  else if(addProductValue.category == "")
                  toast.error('Category is required', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose : 3000
                });
                else if(addProductValue.price == "")
                  toast.error('Price is required', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose : 3000
                });
                  else {
                    dispatch(createProduct(addProductValue))
                    props.handleClose();
                    setIsCategory(true)
                    setAddProductValue({
                      id: "",
                      name: "",
                      sku: "",
                      category: "",
                      pricing_type: "Fixed Price",
                      price: "",
                      stock: "no",
                      namelocalize: "",
                      sellingmethod: "unit",
                      costingmethod: "From Ingredients",
                      taxgroup: 0,
                    })
                  }
                }
              }
              >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END Create Product*/}
    </>
  );
};

export default Modals;
