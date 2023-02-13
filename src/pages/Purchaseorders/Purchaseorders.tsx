import React, { useCallback, useEffect, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Purchaseorders.module.scss";
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
import icon5 from "../../images/icon-call.svg";
import iconRefresh from "../../images/icon-refresh.svg";
import iconFilter from "../../images/icon-filter.svg";
import iconClose from "../../images/icon-close.svg";
import Modals from "../../components/Modals/InventoryPurchaseM";

import { ActionDropdown, Export } from "./Dropdowns";
import ReactLoading from "react-loading";
import {
  get_supplier_branch,
  inventoryPurchaseOrderList,
  inventoryPurchaseOrderListItems,
  Purchaseorder_list_search,
} from "../../redux_toolkit/reducer/inventoryPurchaseOrderApiReducer";
import { useDispatch, useSelector } from "react-redux";
import datechangeHandler from "../../utils/datechangehandler";

interface Data {
  id: any;
  referance: any;
  supplier_name: any;
  destination: any;
  status: any;
  business_date: any;
  created_at: any;
}

const rows = [
  {
    reference: "PO-0002",
    supplier: "x",
    destination: "Riyadh",
    status: "Approved",
    businessdate: "2022-06-29",
    created: "June 29, 01:14pm",
  },
  {
    reference: "PO-0003",
    supplier: "x",
    destination: "Riyadh",
    status: "Approved",
    businessdate: "2022-06-29",
    created: "June 29, 01:14pm",
  },
  {
    reference: "PO-0004",
    supplier: "x",
    destination: "Riyadh",
    status: "Approved",
    businessdate: "2022-06-29",
    created: "June 29, 01:14pm",
  },
  {
    reference: "PO-0005",
    supplier: "x",
    destination: "Riyadh",
    status: "Approved",
    businessdate: "2022-06-29",
    created: "June 29, 01:14pm",
  },
  {
    reference: "PO-0006",
    supplier: "x",
    destination: "Riyadh",
    status: "Approved",
    businessdate: "2022-06-29",
    created: "June 29, 01:14pm",
  },
  {
    reference: "PO-0007",
    supplier: "x",
    destination: "Riyadh",
    status: "Approved",
    businessdate: "2022-06-29",
    created: "June 29, 01:14pm",
  },
  {
    reference: "PO-0008",
    supplier: "x",
    destination: "Riyadh",
    status: "Approved",
    businessdate: "2022-06-29",
    created: "June 29, 01:14pm",
  },
  {
    reference: "PO-0009",
    supplier: "x",
    destination: "Riyadh",
    status: "Approved",
    businessdate: "2022-06-29",
    created: "June 29, 01:14pm",
  },
  {
    reference: "PO-00010",
    supplier: "x",
    destination: "Riyadh",
    status: "Approved",
    businessdate: "2022-06-29",
    created: "June 29, 01:14pm",
  },
  {
    reference: "PO-00011",
    supplier: "x",
    destination: "Riyadh",
    status: "Approved",
    businessdate: "2022-06-29",
    created: "June 29, 01:14pm",
  },
  {
    reference: "PO-00012",
    supplier: "x",
    destination: "Riyadh",
    status: "Approved",
    businessdate: "2022-06-29",
    created: "June 29, 01:14pm",
  },
  {
    reference: "PO-00013",
    supplier: "x",
    destination: "Riyadh",
    status: "Approved",
    businessdate: "2022-06-29",
    created: "June 29, 01:14pm",
  },
  {
    reference: "PO-00014",
    supplier: "x",
    destination: "Riyadh",
    status: "Approved",
    businessdate: "2022-06-29",
    created: "June 29, 01:14pm",
  },
  {
    reference: "PO-00015",
    supplier: "x",
    destination: "Riyadh",
    status: "Approved",
    businessdate: "2022-06-29",
    created: "June 29, 01:14pm",
  },
  {
    reference: "PO-00016",
    supplier: "x",
    destination: "Riyadh",
    status: "Approved",
    businessdate: "2022-06-29",
    created: "June 29, 01:14pm",
  },
  {
    reference: "PO-00017",
    supplier: "x",
    destination: "Riyadh",
    status: "Approved",
    businessdate: "2022-06-29",
    created: "June 29, 01:14pm",
  },
];

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
    id: "referance",
    numeric: false,
    disablePadding: true,
    label: "Reference",
  },
  {
    id: "supplier_name",
    numeric: true,
    disablePadding: false,
    label: "Supplier",
  },
  {
    id: "destination",
    numeric: true,
    disablePadding: false,
    label: "Destination",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "business_date",
    numeric: true,
    disablePadding: false,
    label: "Business Date",
  },
  {
    id: "created_at",
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

  console.log(numSelected, "numSelected");

  return (
    <TableHead>
      <TableRow>
        {numSelected === 0 ? (
          <>
            {headCells?.map((headCell: any) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "left" : "left"}
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
                  <ActionDropdown />
                </div>
              </div>
            </TableCell>
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
              <button className={`btn ${table.filterBtn} ${table.active}`}>
                All
              </button>{" "}
            </li>
            <li>
              <button className={`btn ${table.filterBtn}`}>Draft</button>{" "}
            </li>
            <li>
              <button className={`btn ${table.filterBtn}`}>Pending</button>{" "}
            </li>
            <li>
              <button className={`btn ${table.filterBtn}`}>Closed</button>{" "}
            </li>
          </ul>
          <ul className={`${table.rightActionIcons}`}>
            <li>
              <button
                className={`${table.filterBtn} btn`}
                onClick={() => {
                  handleShow("purchase order filter", true);
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
      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
};

function EnhancedTable() {
  const inventoryPurchaseOrderShowList = useSelector(
    (state: any) =>
      state.inventoryPurchaseOrderApiReducer.inventoryPurchaseOrderListCount
  );
  const addEditInventoryPurchaseOrderCount = useSelector(
    (state: any) =>
      state.inventoryPurchaseOrderApiReducer.addEditInventoryPurchaseOrderCount
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("supplier_name");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const [loaderStatus, setloaderStatus] = useState<any>(
    <ReactLoading type="cylon" color="#5498fd" />
  );
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    setloaderStatus(<ReactLoading type="cylon" color="#5498fd" />);
    const rowsData = inventoryPurchaseOrderListItems?.map((item: any) => {
      return {
        id: item?.id,
        referance: item?.referance,
        supplier_name: item?.supplier_name,
        destination: item?.destination,
        status: item?.status,
        created_at: item?.created_at,
        business_date: item?.business_date,
      };
    });
    setRows(rowsData);
    if (inventoryPurchaseOrderListItems?.length === 0) {
      setloaderStatus(
        <h5 style={{ paddingTop: "15px" }}>
          Start adding your inventory items information to perform inventory
          transactions and use the items as your menu ingredients to track your
          business cost.
        </h5>
      );
    }
  }, [inventoryPurchaseOrderShowList]);

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
      const newSelected = rows?.map((n) => n?.id);
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

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  function defaultLabelDisplayedRows({ from, to, count }: any) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  }

  function redirectToAnotherPage(id: string) {
    navigate(`${id}`);
  }

  useEffect(() => {
    dispatch(inventoryPurchaseOrderList(Purchaseorder_list_search));
    dispatch(get_supplier_branch());
  }, []);

  useEffect(() => {
    dispatch(inventoryPurchaseOrderList(Purchaseorder_list_search));
  }, [addEditInventoryPurchaseOrderCount]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected?.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected?.length}
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
                ?.map((row, index) => {
                  const isItemSelected = isSelected(row?.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row?.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        onClick={() => {
                          redirectToAnotherPage(row?.id);
                        }}
                      >
                        {row.referance ? row.referance : "-"}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          redirectToAnotherPage(row.id);
                        }}
                        align="left"
                      >
                        {row.supplier_name ? row.supplier_name : "-"}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          redirectToAnotherPage(row.id);
                        }}
                        align="left"
                      >
                        {row.destination ? row.destination : "-"}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          redirectToAnotherPage(row.id);
                        }}
                        align="left"
                      >
                        {row.status ? row.status : "-"}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          redirectToAnotherPage(row.id);
                        }}
                        align="left"
                      >
                        {row?.business_date ? row?.business_date : "-"}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          redirectToAnotherPage(row.id);
                        }}
                        align="left"
                      >
                        {row?.created_at
                          ? datechangeHandler(row.created_at)
                          : "-"}
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

export default function Purchaseorders() {
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

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Purchase Orders</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <Export />

              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  handleShow("new purchase orders", true);
                }}
              >
                New Purchase Orders
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
