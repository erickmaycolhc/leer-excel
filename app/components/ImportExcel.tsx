"use client";

import React, { useState } from "react";
import { utils, read, WorkBook } from "xlsx";

export const ImportExcel = () => {
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
    <div>
      <input type="file" onChange={handleChange} />
      {excelData.length ? (
        <table>
          <thead>
            <tr>
              <th>Tienda</th>
              <th>Administrador</th>
              <th>Numero</th>
            </tr>
          </thead>
          <tbody>
            {excelData.map((item: any, index) => (
              <tr key={index}>
                <td>{item.Local}</td>
                <td>{item.ADMINISTRADOR}</td>
                <td>{item.ENTEL}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>Arrastrar excel</h2>
      )}
    </div>
  );
};
