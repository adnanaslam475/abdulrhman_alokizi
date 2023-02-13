import React, { useCallback, useState, useEffect, useContext } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Menuproducts.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Col, Modal, Form, Dropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Select, {
  components,
  ControlProps,
  Props,
  StylesConfig,
} from "react-select";
import { MultiSelect } from "react-multi-select-component";
import { alpha, Box, Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import prImg from "../../images/edit-images.png";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { BsPlusLg } from "react-icons/bs";
import icon1 from "../../images/icon-branch.svg";
import icon5 from "../../images/icon-call.svg";
import iconRefresh from "../../images/icon-refresh.svg";
import iconFilter from "../../images/icon-filter.svg";
import iconClose from "../../images/icon-close.svg";
import Modals from "../../components/Modals/MenuProductsM";

import icon4 from "../../images/icon-export.svg";
import { ActionDropdown, Export } from "./Dropdowns";
import { useDispatch, useSelector } from "react-redux";
import { getTaxGroup, modifierList, productFilterValue, productList, productListItems, productTagModifier, productView, resetOrders } from "../../redux_toolkit/reducer/menuProductsApiReducer";
import ReactLoading from "react-loading";
import { categoryList, filterValue } from "../../redux_toolkit/reducer/menuCategoriesApiReducer";
import GlobalContext from "../../store/global-context";

interface Data {
  name: string;
  sku: string;
  category: string;
  price: string;
  taxgroup: string;
  active: string;
  primage: string;
}

const rows:any[] = [];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "primage",
    numeric: true,
    disablePadding: false,
    label: "",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "sku",
    numeric: true,
    disablePadding: false,
    label: "SKU",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "taxgroup",
    numeric: true,
    disablePadding: false,
    label: "Tax Group",
  },
  {
    id: "active",
    numeric: true,
    disablePadding: false,
    label: "Active",
  },
];



interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  selected: readonly string[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    selected,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  console.log(numSelected, "numSelected")

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>

        {numSelected === 0 ? <>{
          headCells.map((headCell: any) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "left" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))
        }</>
          : <>
            <TableCell className="p-0" style={{ width: '220px' }}>
              <div className={`${table.actionCheckbox}`}>
                <div className={`${table.selectedCount}`}>
                  {numSelected} Selected
                </div>
                <div className={`${table.actionDropdown}`}>
                  <ActionDropdown selected={selected}/>
                </div>
              </div>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </>}

      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const productShowList = useSelector(
    (state: any) => state.menuProductsApiReducer.showProductList
  );
  const createProduct = useSelector(
    (state: any) => state.menuProductsApiReducer.createProduct
  );
  const { numSelected } = props;
  const dispatch = useDispatch();
  const globalGtx = useContext(GlobalContext);
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [type, setType] = useState("all");
  const [postapidata, setpostdata] = useState<any>();
  const handleShow = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow");
    setModalName(modalname);
    setShow(status);
  };

  const handleClose = () => {
    setModalName("");
    setShow(false);
  };

  function postdata(data: string) {
    setpostdata(data);
  }

  useEffect(()=>{
    setType(productFilterValue.type);
  },[productShowList])


  useEffect(()=>{
    productFilterValue.type = "all";
    dispatch(productList(productFilterValue));
  },[createProduct])

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <div className={`${table.mainTitleRow}`}>
          <ul className={`${table.filterList}`}>
      
            <li>
              <button className={`btn ${table.filterBtn} ${type === "all" ? `${table.active}` : ""}`} onClick={()=>{
                setType("all")
                productFilterValue.type = "all"
                dispatch(productList(productFilterValue))}}>
                All
              </button>{" "}
            </li>
            <li>
              <button className={`btn ${table.filterBtn} ${type === "active" ? `${table.active}` : ""}`} onClick={()=>{
                setType("active")
                productFilterValue.type = "active"
                dispatch(productList(productFilterValue))}}>Active</button>{" "}
            </li>
            <li>
              <button className={`btn ${table.filterBtn} ${type === "deactive" ? `${table.active}` : ""}`} onClick={()=>{
                setType("deactive")
                productFilterValue.type = "deactive"
                dispatch(productList(productFilterValue))}}>Inactive</button>{" "}
            </li>
            <li>
              <button className={`btn ${table.filterBtn} ${type === "deleted" ? `${table.active}` : ""}`} onClick={()=>{
                setType("deleted")
                productFilterValue.type = "deleted"
                dispatch(productList(productFilterValue))}}>Deleted</button>{" "}
            </li>
          </ul>
          <ul className={`${table.rightActionIcons}`}>
          <li>
              <NavLink className={`${table.refreshBtn}`} to="#">
                <img
                  src={iconRefresh}
                  onClick={() => {
                    globalGtx.refresh();
                    dispatch(resetOrders())
                    dispatch(productList(productFilterValue))
                  }}
                />
              </NavLink>
            </li>
            <li>
              <button
                className={`${table.filterBtn} btn`}
                onClick={() => {
                  handleShow("product filter", true);
                  console.log("check");
                }}
              >
                <img src={iconFilter} className={`${st.icon}`} />
                Filters
                <img src={iconClose} className={`${table.iconClose}`} />
              </button>
            </li>
          </ul>
        </div>
      </Toolbar>
      <Modals show={show} handleClose={handleClose} modalName={modalName}  postdata={postdata}/>
    </>
  );
};

function EnhancedTable() {
  const dispatch = useDispatch();
  useEffect(()=>{
    filterValue.type = "All"
    dispatch(categoryList(filterValue));
    dispatch(modifierList());
    dispatch(getTaxGroup({type:"taxgroup"}))
    dispatch(productTagModifier({type:"tag"}))
  },[])
  const [rows, setRows] = useState<any[]>([]);
  const productShowList = useSelector(
    (state: any) => state.menuProductsApiReducer.showProductList
  );
  const navigate = useNavigate();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [productIds,setProductIds] = useState<any>()
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [loaderStatus, setloaderStatus] = useState<any>(
    <ReactLoading type="cylon" color="#5498fd" />
  );

  useEffect(() => {
    setloaderStatus(<ReactLoading type="cylon" color="#5498fd" />)
    const rowsData = productListItems?.map((item: any) => {
      console.log(item,"productItem")
      return {
        id: item?.id,
        category:item?.category,
        group_tax: item?.group_tax,
        image: item?.image,
        modifiers: item?.modifiers,
        name: item?.name,
        price: item?.price,
        size: item?.size,
        sku: item?.sku,
        status: item?.status
      };
    });
    setRows(rowsData);
    if(productListItems?.length === 0 ){
      setloaderStatus(<h5 style={{paddingTop:"15px"}}>Start managing your menu by creating categories for your products, combos and gift cards.</h5>)
    }
  }, [productShowList]);


  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      setProductIds(newSelected)
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const TablePaginationActions = (event: any) => {
    console.log(event, "TablePaginationActions");
    return (
      <>
        <div className={`${table.pagination}`}></div>
      </>
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function defaultLabelDisplayedRows({ from, to, count }: any) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  }

  function redirectToAnotherPage(id: string) {
    dispatch(productView(id))
    navigate(`${id}`);
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              selected={selected}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row:any, index:number) => {
                  const isItemSelected = isSelected(row?.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row?.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row?.id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        padding="checkbox"

                      >
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell onClick={() => { redirectToAnotherPage(row?.id) }} align="left">
                        <>
                        <img className={`${st.prImage}`} src={prImg} />
                        </>
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        onClick={() => { redirectToAnotherPage(row?.id) }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell onClick={() => { redirectToAnotherPage(row?.id) }} align="left">{row?.sku}</TableCell>
                      <TableCell onClick={() => { redirectToAnotherPage(row?.id) }} align="left">{row?.category}</TableCell>
                      <TableCell onClick={() => { redirectToAnotherPage(row?.id) }} align="left">{row?.price}</TableCell>
                      <TableCell onClick={() => { redirectToAnotherPage(row?.id) }} align="left">{row?.group_tax}</TableCell>
                      <TableCell onClick={() => { redirectToAnotherPage(row?.id) }} align="left">
                        <>
                        {row?.status === "Activated" ? <div className={`${st.statusBtn}`} style={{ backgroundColor:'#EB5757', height:"15px", width:"15px", borderRadius:"50%" }}></div> : <div className={`${st.statusBtn}`} style={{ backgroundColor:'#37c4c9', height:"15px", width:"15px", borderRadius:"50%" }}></div>} 
                        </>    
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          count={rows?.length}
          // component={TablePaginationActions}
          labelDisplayedRows={defaultLabelDisplayedRows}
          labelRowsPerPage=" "
          rowsPerPage={rowsPerPage}
          page={page}
          rowsPerPageOptions={[]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default function Menuproducts() {
  const [lgShow, setLgShow] = useState(false);

  // Modals

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
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Products</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                <img src={icon4} className={`${st.icon}`} />
                Import / Export
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <ul>
                  <li><NavLink to="#" onClick={() => {handleShow("import", true);}}>Import products</NavLink></li>
                  <li><NavLink to="#" onClick={() => {handleShow("import product", true);}}>Import product ingredients</NavLink></li>
                  <li><NavLink to="#" onClick={() => {handleShow("product modifiers", true);}}>Import product modifiers</NavLink></li>
                  <li><NavLink to="#">Export products</NavLink></li>
                  <li><NavLink to="#">Export products ingredients</NavLink></li>
                  <li><NavLink to="#">Export products modifiers</NavLink></li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>

              <button className={`btn ${st.themeBtn}`}
                onClick={() => {
                  handleShow("create product", true);
                }}
              >
                Create Product
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body>
              <div className={`${table.dataTableBox}`}>
                <Box sx={{ width: 1 }}>
                  <EnhancedTable />
                </Box>
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}
