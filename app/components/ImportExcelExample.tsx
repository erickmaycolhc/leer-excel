"use client";
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { useState } from "react";
import { utils, read, WorkBook } from "xlsx";
interface Column {
  id: "Tienda" | "ADMINISTRADOR" | "Distrito";
  label: string;
  minWidth?: number;
}

const columns: readonly Column[] = [
  { id: "Tienda", label: "Tienda", minWidth: 100 },
  { id: "ADMINISTRADOR", label: "ADMINISTRADOR", minWidth: 100 },
  { id: "Distrito", label: "Distrito", minWidth: 100 },
];

export const ImportExcelExample = () => {
  const [excelData, setExcelData] = useState<unknown[]>([]); // Set the type to 'unknown[]'

  const file_type = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];

  const handleChange = (e: any) => {
    const selected_file = e.target.files[0];
    if (selected_file) {
      if (selected_file && file_type.includes(selected_file.type)) {
        let reader = new FileReader();
        reader.onload = (e) => {
          const target = e.target;
          if (target && target.result) {
            const workbook: WorkBook = read(target.result);
            const sheet = workbook.SheetNames;
            if (sheet.length) {
              const data: unknown[] = utils.sheet_to_json(
                workbook.Sheets[sheet[0]]
              );
              console.log("Data read from Excel:", data);
              setExcelData(data);
            }
          }
        };
        reader.readAsArrayBuffer(selected_file);
      }
    }
  };

  return (
    <Grid container sx={{ display: "block" }}>
      <Grid
        item
        sx={{
          backgroundColor: "#C7E3FF",
          display: "grid",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: "30px" }}> Subir excel:</p>
        <input type="file" name="archivo" onChange={handleChange} />
      </Grid>

      <Grid item>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader aria-aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{column.id}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {excelData.map((item: any, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.Local}</TableCell>
                    <TableCell>{item.ADMINISTRADOR}</TableCell>
                    <TableCell>{item.ENTEL}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};
