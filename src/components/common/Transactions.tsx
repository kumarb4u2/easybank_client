import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Transaction } from "../../types/transaction.type";

interface Column {
  id: "date" | "id" | "amount" | "transactionType" | "description";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "Transaction ID", minWidth: 100 },

  {
    id: "date",
    label: "Date",
    minWidth: 100,
    format: (value) => new Date(+value).toLocaleDateString(),
  },
  { id: "transactionType", label: "Transaction type", minWidth: 140 },
  {
    id: "description",
    label: "Description",
    minWidth: 270,
    align: "right",
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 170,
    align: "right",
  },
];

type Props = {
  transactions: Transaction[];
};

export default function Transactions({ transactions }: Props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={transaction.id}
                  >
                    {columns.map((column) => {
                      const value = transaction[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "string"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
