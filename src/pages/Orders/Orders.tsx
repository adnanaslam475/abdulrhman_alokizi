import React, { useEffect, useState, useContext, Fragment } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import table from "../../datatable.module.scss";
import { Card, Dropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { components, ControlProps } from "react-select";
import { Box, Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { BsPlusLg } from "react-icons/bs";
import icon1 from "../../images/icon-branch.svg";
import icon5 from "../../images/icon-call.svg";
import iconRefresh from "../../images/icon-refresh.svg";
import iconFilter from "../../images/icon-filter.svg";
import Modals from "../../components/Modals/OrderModal";
import axios from "axios";
import GlobalContext from "../../store/global-context";
import {
  Branches,
  BusinessDate,
  Export,
  ActionDropdown,
} from "./OrderDropdowns";
import { data, text } from "../../redux_toolkit/reducer/orderModalsReducer";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  falseState,
  typeFilter,
  branchFilter,
  businessDateFilter,
  resetOrders,
} from "../../redux_toolkit/reducer/orderModalsReducer";

interface Data {
  reference: string;
  number: string;
  orders_id: string;
  branch: string;
  customer: string;
  status: string;
  source: string;
  total: string;
  business: string;
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
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
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
    id: "reference",
    numeric: false,
    disablePadding: true,
    label: "Reference",
  },
  {
    id: "number",
    numeric: true,
    disablePadding: false,
    label: "Number",
  },
  {
    id: "branch",
    numeric: true,
    disablePadding: false,
    label: "Branch",
  },
  {
    id: "customer",
    numeric: true,
    disablePadding: false,
    label: "Customer",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "source",
    numeric: true,
    disablePadding: false,
    label: "Source",
  },
  {
    id: "total",
    numeric: true,
    disablePadding: false,
    label: "Total",
  },
  {
    id: "business",
    numeric: true,
    disablePadding: false,
    label: "Business Date",
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
  hidecolumns: any[];
  selectedOrderIds: readonly string[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    hidecolumns,
    selectedOrderIds,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const allcolums = headCells.filter((columns: any) => {
    const findhidecolumn = hidecolumns.find(
      (col: any) => col.name === columns.label
    );
    return findhidecolumn.check;
  });

  console.log(props, "EnhancedTableHead");

  return (
    <>
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
              {allcolums.map((headCell) => {
                return (
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
                );
              })}
            </>
          ) : (
            <>
              <div className={`${table.actionCheckbox}`}>
                <div className={`${table.selectedCount}`}>
                  {numSelected} Selected
                </div>
                <div className={`${table.actionDropdown}`}>
                  <ActionDropdown order_ids={selectedOrderIds} />
                </div>
              </div>
            </>
          )}
        </TableRow>
      </TableHead>
    </>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  columnsHide: (...arg: any) => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;
  const [typeName, setTypeName] = useState("all");
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");

  const dispatch = useDispatch();

  const handleShow = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow");
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
  const globalGtx = useContext(GlobalContext);
  console.log(globalGtx?.data, globalGtx.count, "GlobalContextGlobalContext");

  const [columnsHide, setcolumnsHide] = useState([
    {
      id: 1,
      rowid: "reference",
      name: "Reference",
      disabled: false,
      check: true,
    },
    {
      id: 2,
      rowid: "number",
      name: "Number",
      disabled: true,
      check: true,
    },
    {
      id: 3,
      rowid: "branch",
      name: "Branch",
      disabled: true,
      check: true,
    },
    {
      id: 4,
      rowid: "customer",
      name: "Customer",
      disabled: true,
      check: true,
    },
    {
      id: 5,
      rowid: "status",
      name: "Status",
      disabled: true,
      check: true,
    },
    {
      id: 6,
      rowid: "source",
      name: "Source",
      disabled: true,
      check: true,
    },
    {
      id: 7,
      rowid: "total",
      name: "Total",
      disabled: true,
      check: true,
    },
    {
      id: 8,
      rowid: "business",
      name: "Business Date",
      disabled: true,
      check: true,
    },
  ]);

  function columnHideHandler(status: boolean, name: string) {
    console.log(name, status, "columnHideHandler");
    setcolumnsHide((prev: any) => {
      return prev.map((item: any) => {
        if (item.name === name && item.id > 1) {
          return {
            id: item.id,
            name: item.name,
            disabled: item.disabled,
            check: status,
          };
        } else {
          return {
            ...item,
          };
        }
      });
    });
  }

  useEffect(() => {
    props.columnsHide(columnsHide);
  }, [columnsHide]);

  useEffect(() => {
    props.columnsHide(columnsHide);
    dispatch(typeFilter("all"));
  }, []);

  console.log(columnsHide, "columnHide");
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
                style={typeName == "all" ? activeStyle : { color: "" }}
                onClick={() => {
                  setTypeName("all");
                  dispatch(typeFilter("all"));
                }}
              >
                All
              </button>{" "}
            </li>
            <li>
              <button
                className={`btn ${table.filterBtn}`}
                style={typeName == "today" ? activeStyle : { color: "" }}
                onClick={() => {
                  setTypeName("today");
                  dispatch(typeFilter("today"));
                }}
              >
                Today
              </button>{" "}
            </li>
            <li>
              <button
                className={`btn ${table.filterBtn}`}
                style={typeName == "draft" ? activeStyle : { color: "" }}
                onClick={() => {
                  dispatch(typeFilter("draft"));
                  setTypeName("draft");
                }}
              >
                Draft
              </button>{" "}
            </li>
            <li>
              <button
                className={`btn ${table.filterBtn}`}
                style={typeName == "pending" ? activeStyle : { color: "" }}
                onClick={() => {
                  dispatch(typeFilter("pending"));
                  setTypeName("pending");
                }}
              >
                Pending
              </button>{" "}
            </li>
            <li>
              <button
                className={`btn ${table.filterBtn}`}
                style={typeName == "archive" ? activeStyle : { color: "" }}
                onClick={() => {
                  dispatch(typeFilter("archive"));
                  setTypeName("archive");
                }}
              >
                Archive
              </button>{" "}
            </li>
            <li>
              <button
                className={`btn ${table.filterBtn}`}
                style={typeName == "ahead" ? activeStyle : { color: "" }}
                onClick={() => {
                  dispatch(typeFilter("ahead"));
                  setTypeName("ahead");
                }}
              >
                Ahead
              </button>{" "}
            </li>
            <li>
              <button
                className={`btn ${table.filterBtn}`}
                style={typeName == "callcentre" ? activeStyle : { color: "" }}
                onClick={() => {
                  dispatch(typeFilter("callcentre"));
                  setTypeName("callcentre");
                }}
              >
                Call Center
              </button>{" "}
            </li>
            <li>
              <button
                className={`btn ${table.filterBtn}`}
                style={typeName == "API" ? activeStyle : { color: "" }}
                onClick={() => {
                  dispatch(typeFilter("API"));
                  setTypeName("API");
                }}
              >
                API
              </button>{" "}
            </li>
          </ul>
          <ul className={`${table.rightActionIcons}`}>
            <li>
              <NavLink className={`${table.refreshBtn}`} to="#">
                <img
                  src={iconRefresh}
                  onClick={() => {
                    globalGtx.refresh();
                    dispatch(resetOrders());
                    setTypeName("all");
                  }}
                />
              </NavLink>
            </li>
            <li>
              <button
                className={`${table.filterBtn} btn`}
                onClick={() => {
                  handleShow("order filter", true);
                  console.log("check");
                }}
              >
                <img src={iconFilter} className={`${st.icon}`} />
                Filters
              </button>
            </li>
            <li>
              <Dropdown className={`${table.plusDropdown}`}>
                <Dropdown.Toggle id="dropdown-basic">
                  <BsPlusLg />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <ul className={`${table.dropDownUl}`}>
                    {columnsHide?.map((column: any) => {
                      return (
                        <Fragment>
                          <li>
                            <label
                              className={`${table.checkbox} ${
                                column?.disabled ? "" : table.disabled
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={column?.check}
                                onChange={(e) => {
                                  columnHideHandler(
                                    e?.target.checked,
                                    column?.name
                                  );
                                }}
                              />
                              <span className={`${table.checkmark}`}></span>{" "}
                              {column?.name}
                            </label>
                          </li>
                        </Fragment>
                      );
                    })}
                  </ul>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </Toolbar>
      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
};

function EnhancedTable(props: any) {
  const [rows, setRows] = useState<any[]>([]);
  const [columnHide, setcolumnHide] = useState<any[]>([]);

  useEffect(() => {
    let date = new Date(props?.rows[0]?.businessdate);
    const rowsData = props?.rows?.map((item: any) => {
      return {
        reference: item.referanceid,
        number: item.number,
        branch: item.branch,
        orders_id: item.orders_id,
        customer: item.customer,
        status: item.status,
        source: item.source,
        total: item.total,
        business: item.businessdate,
        extra: item,
      };
    });
    setRows(rowsData);
  }, [props]);

  const navigate = useNavigate();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("branch");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [selectedOrderIds, setSelectedOrderIds] = React.useState<
    readonly string[]
  >([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

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
      const newSelected = rows.map((n: any) => n.reference);
      const orders_id = rows.map((n: any) => n.orders_id);
      setSelectedOrderIds(orders_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
    setSelectedOrderIds([]);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    name: string,
    orderid: string
  ) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];
    if ((event?.target as HTMLInputElement)?.checked) {
      setSelectedOrderIds((prev) => [...prev, orderid]);
    } else {
      setSelectedOrderIds((prev: any) => {
        if ((event?.target as HTMLInputElement)?.checked === false) {
          return prev.filter((item: string) => item !== orderid);
        }
      });
    }

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
    return <div className={`${table.pagination}`}></div>;
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
  //------- LoadingSpinenr----------//

  function redirectToAnotherPage(id: string) {
    navigate(`${id}`);
  }

  function columnHideHandler(data: any) {
    setcolumnHide(data);
  }

  const allcolums = headCells.filter((columns: any) => {
    const findhidecolumn = columnHide?.find(
      (col: any) => col.name === columns.label
    );
    return findhidecolumn?.check;
  });
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          columnsHide={columnHideHandler}
        />
        <TableContainer>
          {rows?.length > 0 ? (
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                selectedOrderIds={selectedOrderIds}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows?.length}
                hidecolumns={columnHide}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row, index) => {
                    const isItemSelected = isSelected(row.reference);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) =>
                          handleClick(event, row.reference, row.orders_id)
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.reference}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        {allcolums.map((column: any) => {
                          if (column.id === "reference") {
                            return (
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                                onClick={() => {
                                  redirectToAnotherPage(row.orders_id);
                                }}
                              >
                                {row.reference}
                              </TableCell>
                            );
                          }
                          if (column.id === "number") {
                            return (
                              <TableCell
                                onClick={() => {
                                  redirectToAnotherPage(row.orders_id);
                                }}
                                align="left"
                              >
                                {row?.number}
                              </TableCell>
                            );
                          }
                          if (column.id === "branch") {
                            return (
                              <TableCell
                                onClick={() => {
                                  redirectToAnotherPage(row.orders_id);
                                }}
                                align="left"
                              >
                                {row.branch}
                              </TableCell>
                            );
                          }
                          if (column.id === "customer") {
                            return (
                              <TableCell
                                onClick={() => {
                                  redirectToAnotherPage(row.orders_id);
                                }}
                                align="left"
                              >
                                {row.customer}
                              </TableCell>
                            );
                          }
                          if (column.id === "status") {
                            return (
                              <TableCell
                                onClick={() => {
                                  redirectToAnotherPage(row.orders_id);
                                }}
                                align="left"
                              >
                                {row.status}
                              </TableCell>
                            );
                          }
                          if (column.id === "source") {
                            return (
                              <TableCell
                                onClick={() => {
                                  redirectToAnotherPage(row.orders_id);
                                }}
                                align="left"
                              >
                                {row.source}
                              </TableCell>
                            );
                          }
                          if (column.id === "total") {
                            return (
                              <TableCell
                                onClick={() => {
                                  redirectToAnotherPage(row.orders_id);
                                }}
                                align="left"
                              >
                                {row.total}
                              </TableCell>
                            );
                          }
                          if (column.id === "business") {
                            let date = new Date(row.business).toString();
                            let month = date.split(" ").splice(1, 2).join(" ");
                            let time = date.split(" ").splice(4, 1).join(" ");
                            let am = +time.slice(0, 2);
                            return (
                              <TableCell
                                onClick={() => {
                                  redirectToAnotherPage(row.orders_id);
                                }}
                                align="left"
                              >
                                {month}{" "}
                                {am > 12
                                  ? `0${am - 12}${time.slice(2, 5)}`
                                  : `${am}${time.slice(2, 5)}`}{" "}
                                {am > 11 ? "PM" : "AM"}
                              </TableCell>
                            );
                          }
                        })}
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
          ) : (
            <div className="d-flex justify-content-center">
              {props.loaderStatus}
            </div>
          )}
        </TableContainer>
        <TablePagination
          count={rows?.length}
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

export default function Orders() {
  const [loaderStatus, setloaderStatus] = useState<any>(
    <ReactLoading type="cylon" color="#5498fd" />
  );

  const dispatch = useDispatch();

  const counting = useSelector((state: any) => state.orderModalsReducer.count);
  const trueState = useSelector((state: any) => state.orderModalsReducer.state);
  const globalGtx = useContext(GlobalContext);
  // Modals
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [branchesData, setBranchesData] = useState([]);
  const [orderRowData, setOrderRowData] = useState([]);

  const handleShow = (modalname: string, status: boolean) => {
    setModalName(modalname);
    setShow(status);
  };

  const notify2 = (text: String) =>
    toast(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    setloaderStatus("No data found");
    setOrderRowData(data);
  }, [counting]);

  useEffect(() => {
    if (trueState === true) {
      notify2(text);
    }
    setTimeout(() => {
      dispatch(falseState());
    }, 3000);
  }, [trueState]);

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

  //                                       GET BRANCHES API
  useEffect(() => {
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/branches`,
      headers: {
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
      },
    };
    axios(config)
      .then(function (response) {
        setBranchesData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setOrderRowData([]);
    setloaderStatus(<ReactLoading type="cylon" color="#5498fd" />);
  }, [globalGtx.data, globalGtx.count]);

  function selectbranches(ids: string) {
    dispatch(branchFilter(ids));
  }

  function selectbusinessDate(date?: string, enddate?: string) {
    let data = {
      branchDate: date,
      branchEndDate: enddate,
    };
    dispatch(businessDateFilter(data));
  }

  return (
    <>
      <ToastContainer />
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Orders</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <Branches
                branchesData={branchesData}
                selectbranches={selectbranches}
              />
              <BusinessDate selectedBusinessDates={selectbusinessDate} />
              <Export />

              <button
                className={`btn`}
                onClick={() => {
                  handleShow("order call", true);
                }}
              >
                <img src={icon5} className={`${st.icon}`} />
                New Call Center Order
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body>
              <div className={`${table.dataTableBox}`}>
                <Box sx={{ width: 1 }}>
                  <EnhancedTable
                    rows={orderRowData}
                    loaderStatus={loaderStatus}
                  />
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
