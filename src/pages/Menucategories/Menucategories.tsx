import React, { useCallback, useEffect, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Menucategories.module.scss";
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
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { BsPlusLg } from "react-icons/bs";
import icon1 from "../../images/icon-branch.svg";
import icon2 from "../../images/icon-calendar.svg";
import icon3 from "../../images/icon-call.svg";
import icon4 from "../../images/icon-export.svg";
import prImg from "../../images/edit-images.png";
import icon5 from "../../images/icon-call.svg";
import category from "../../images/category.svg";
import iconRefresh from "../../images/icon-refresh.svg";
import iconFilter from "../../images/icon-filter.svg";
import Modals from "../../components/Modals/MenuCategoriesM";
import {
  categoryListItems,
  categoryList,
  editMenuCategory,
  filterValue
} from "../../redux_toolkit/reducer/menuCategoriesApiReducer";
import { Branches, BusinessDate, Export, ActionDropdown } from "./Dropdowns";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";

interface Data {
  name: string;
  reference: string;
  products: string;
  combos: string;
  giftcards: string;
  created: string;
  primage: string;
  id: string;
}

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
    id: "id",
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
    id: "reference",
    numeric: true,
    disablePadding: false,
    label: "Reference",
  },
  {
    id: "products",
    numeric: true,
    disablePadding: false,
    label: "Products",
  },
  {
    id: "combos",
    numeric: true,
    disablePadding: false,
    label: "Combos",
  },
  {
    id: "giftcards",
    numeric: true,
    disablePadding: false,
    label: "Giftcards",
  },
  {
    id: "created",
    numeric: true,
    disablePadding: false,
    label: "Created",
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
  selectedId:readonly string[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>

        {numSelected === 0 ? (
          <>
            {" "}
            {headCells.map((headCell) => (
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
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </>
        ) : (
          <>
            <TableCell className="p-0" style={{ width: "220px" }}>
              <div className={`${table.actionCheckbox}`}>
                <div className={`${table.selectedCount}`}>
                  {numSelected} Selected
                </div>
                <div className={`${table.actionDropdown}`}>
                  <ActionDropdown selectedId={props.selectedId}/>
                </div>
              </div>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </>
        )}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;
  const categoryShowList = useSelector(
    (state: any) => state.menuCategoriesApiReducer.categoryList
  );
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [typeName, setTypeName] = useState("All");

  const handleShow = (modalname: string, status: boolean) => {
    setModalName(modalname);
    setShow(status);
  };

  const activeStyle: any = {
    background: "#5498FD",
    color: "#fff",
  };

  const handleClose = () => {
    setModalName("");
    setShow(false);
  };

  useEffect(()=>{
    setTypeName(filterValue.type);
  },[categoryShowList])

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
              <button
                className={`btn ${table.filterBtn}`}
                style={typeName === "All" ? activeStyle : { color: "" }}
                onClick={() => {
                  setTypeName("All");
                  filterValue.type = "All";
                  dispatch(categoryList(filterValue));
                }}
              >
                All
              </button>{" "}
            </li>
            <li>
              <button
                className={`btn ${table.filterBtn}`}
                style={typeName === "deleted" ? activeStyle : { color: "" }}
                onClick={() => {
                  setTypeName("deleted");
                  filterValue.type = "deleted";
                  dispatch(categoryList(filterValue));
                }}
              >
                Deleted
              </button>{" "}
            </li>
          </ul>
          <ul className={`${table.rightActionIcons}`}>
            <li>
              <button
                className={`${table.filterBtn} btn`}
                onClick={() => {
                  handleShow("category order filter", true);
                }}
              >
                <img src={iconFilter} className={`${st.icon}`} alt="icon"/>
                Filters
              </button>
            </li>
          </ul>
        </div>
      </Toolbar>
      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
};

function EnhancedTable() {
  const [rows, setRows] = useState<any[]>([]);
  const categoryShowList = useSelector(
    (state: any) => state.menuCategoriesApiReducer.categoryList
  );
  const editCategoryStatus = useSelector(
    (state: any) => state.menuCategoriesApiReducer.createCategory
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  useEffect(() => {
    setloaderStatus(<ReactLoading type="cylon" color="#5498fd" />)
    const rowsData = categoryListItems?.map((item: any) => {
      return {
        id: item?.id,
        icon:item?.icon,
        name: item?.name,
        reference: item?.referance,
        products: item?.productcount,
        combos: item?.combo,
        localize: item?.localize,
        giftcards: item?.giftcards,
        created: item?.created_at,
        primage: item?.icon,
      };
    });
    setRows(rowsData);
    if(categoryListItems?.length === 0 ){
      setloaderStatus(<h5 style={{paddingTop:"15px"}}>Start managing your menu by creating categories for your products, combos and gift cards.</h5>)
    }
  }, [categoryShowList]);

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
      const newSelected = rows.map((n: any) => n.id);
      setSelected(newSelected);
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
  // Modal show and hide handlers (Table cell) (Start)
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [loaderStatus, setloaderStatus] = useState<any>(
    <ReactLoading type="cylon" color="#5498fd" />
  );
  const handleShow = (modalname: string, status: boolean) => {
    setModalName(modalname);
    setShow(status);
  };
  const handleClose = () => {
    setModalName("");
    setShow(false);
  };

  function openModalPoupOnTableCell(row: object) {
    handleShow("category edit category", true);
    dispatch(editMenuCategory(row));
  }

  useEffect(() => {
    if (rows?.length === 0) {
      filterValue.type = "All";
      dispatch(categoryList(filterValue));
    }
  }, []);

  useEffect(()=>{
    filterValue.type = "All";
    dispatch(categoryList(filterValue));
    setSelected([]);
  },[editCategoryStatus])
  

  // --------------------- / End / -------------------------------------- //
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
        {rows?.length > 0 ? (
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              selectedId={selected}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
              // selectedrows={isSelected}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row: any, index) => {
                  let date = new Date(row.created).toString();
                  let month = date.split(" ").splice(1, 2).join(" ");
                  let time = date.split(" ").splice(4, 1).join(" ");
                  let am = +time.slice(0, 2);
                  const isItemSelected = isSelected(row?.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>

                      <TableCell align="left">
                        <>
                          <img className={`${st.prImage}`} src={row.icon !== "" ? row.icon : prImg} width="100px" height="100px" alt="icon"/>
                        </>
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        onClick={() => openModalPoupOnTableCell(row)}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        onClick={() => openModalPoupOnTableCell(row)}
                        align="left"
                      >
                        {row.reference}
                      </TableCell>
                      <TableCell align="left">
                        <>
                          <NavLink to="/menu/categories">
                            Products ({row.products})
                          </NavLink>
                        </>
                      </TableCell>
                      <TableCell
                        onClick={() => openModalPoupOnTableCell(row)}
                        align="left"
                      >
                        {row.combos}
                      </TableCell>
                      <TableCell align="left">
                        <>
                          <NavLink to="/menu/categories">
                            Gift Cards ({row.giftcards})
                          </NavLink>
                        </>
                      </TableCell>
                      <TableCell
                        onClick={() => openModalPoupOnTableCell(row)}
                        align="left"
                      >
                        {month}{" "}
                                {am > 12
                                  ? `0${am - 12}${time.slice(2, 5)}`
                                  : `${am}${time.slice(2, 5)}`}{" "}
                                {am > 11 ? "PM" : "AM"}
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
          </Table> ) : (
            <div className="d-flex justify-content-center">
              {loaderStatus}
            </div>
          )}
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
      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </Box>
  );
}

export default function Menucategories() {
  const [lgShow, setLgShow] = useState(false);

  // Modals

  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const handleShow = (modalname: string, status: boolean) => {
    setModalName(modalname);
    setShow(status);
  };
  const handleClose = () => {
    setModalName("");
    setShow(false);
  };

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Categories</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <NavLink
                to="/menu/categories/sort-categories"
                className={` btn ${cx.moreOption}`}
              >
                <img src={category} className={`${st.icon}`} />
                Sort Categories
              </NavLink>

              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <img src={icon4} className={`${st.icon}`} />
                  Export / Import
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <ul>
                    <li>
                      <NavLink
                        to="#"
                        onClick={() => {
                          handleShow("category import categories", true);
                        }}
                      >
                        Import categories
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="#">Export categories</NavLink>
                    </li>
                  </ul>
                </Dropdown.Menu>
              </Dropdown>

              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  handleShow("category create category", true);
                }}
              >
                Create Category
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
