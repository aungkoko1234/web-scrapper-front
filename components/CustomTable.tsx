import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Paper, Skeleton } from "@mui/material";

export type Header = {
  title: string;
  name: string;
  type: "text" | "block" | "action";
  align: "right" | "left" | "center" | undefined;
  // eslint-disable-next-line no-unused-vars
  action?: (data: unknown) => void;
};

interface CustomTableProps {
  headers: Header[];
  data: Record<string, unknown>[];
  isLoading: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
  headers,
  isLoading,
  data,
}) => {
  const generateSkeletons = (headers: Header[]) => {
    return Array(5)
      .fill(0)
      .map((index) => (
        <TableRow
          key={index}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          {headers.map(({ type }) => {
            switch (type) {
              case "text":
                return (
                  <TableCell key="text" component="th" scope="row">
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  </TableCell>
                );
              case "block":
                return (
                  <TableCell key="block" component="th" scope="row">
                    <Skeleton width={410} />
                    <Skeleton width="80%" />
                  </TableCell>
                );
              case "action":
                return (
                  <TableCell key="action" component="th" scope="row">
                    <Skeleton width={150} height={50} />
                  </TableCell>
                );
            }
          })}
        </TableRow>
      ));
  };
  console.log("data", data);
  return (
    <TableContainer component={Paper} data-testid="table-container">
      {isLoading && (
        <Table
          sx={{ minWidth: 650, padding: 10 }}
          aria-label="simple table"
          data-testid="table-loading"
        >
          <TableHead data-testid="table-loading-head">
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} align={header.align}>
                  {header.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody data-testid="table-loading-skeleton">
            {generateSkeletons(headers)}
          </TableBody>
        </Table>
      )}
      <Table
        sx={{ minWidth: 650, padding: 10 }}
        aria-label="simple table"
        data-testid="table"
      >
        <TableHead data-testid="table-head">
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index + header.title} align={header.align}>
                {header.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody data-testid="table-body">
          {data.map((item, index) => (
            <TableRow key={index}>
              {headers.map(({ action = () => null, ...header }) => {
                if (header.type === "action")
                  return (
                    <TableCell>
                      <Button onClick={() => action(item)}>
                        {header.name}
                      </Button>
                    </TableCell>
                  );
                else
                  return (
                    <TableCell component="th" scope="row">
                      {item[header.name] as string}
                    </TableCell>
                  );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
