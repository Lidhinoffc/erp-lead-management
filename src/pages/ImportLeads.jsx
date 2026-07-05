import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

import DashboardLayout from "../layouts/DashboardLayout";
import { createLead } from "../services/leadService";

export default function ImportLeads() {

  const navigate = useNavigate();

  const [excelData, setExcelData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [fileName, setFileName] = useState("");

  function handleFileUpload(e) {

    const file = e.target.files[0];

    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (event) => {

      const workbook = XLSX.read(event.target.result, {
        type: "binary"
      });

      const sheetName = workbook.SheetNames[0];

      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet);

      setExcelData(jsonData);

    };

    reader.readAsBinaryString(file);

  }

  async function handleImport() {

    if (excelData.length === 0) {

      alert("Please select an Excel file.");

      return;

    }

    setLoading(true);

    try {

      for (const row of excelData) {

        await createLead({

          name: row.name || row.Name || "",

          mobile: row.mobile || row.Mobile || "",

          email: row.email || row.Email || "",

          status: row.status || row.Status || "New",

          employee: row.employee || row.Employee || "Alice",

          address: row.address || row.Address || "",

          course: row.course || row.Course || "",

          source: row.source || row.Source || "Excel",

          createdDate:
            row.createdDate ||
            row.CreatedDate ||
            new Date().toISOString().split("T")[0],

          notes: []

        });

      }

      alert("Leads imported successfully.");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Unable to import leads.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">

        Import Leads

      </h1>

      <div className="flex items-center gap-4 mb-6">

        <input
          id="excelFile"
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          className="hidden"
        />

        <label
          htmlFor="excelFile"
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-2
            rounded-lg
            cursor-pointer
          "
        >

          Add File

        </label>

        {

          fileName && (

            <span className="text-gray-700 font-medium">

              {fileName}

            </span>

          )

        }

      </div>

      {

        excelData.length > 0 && (

          <>

            <div className="overflow-auto">

              <table className="min-w-full border border-gray-300">

                <thead className="bg-blue-600 text-white">

                  <tr>

                    {

                      Object.keys(excelData[0]).map((key) => (

                        <th
                          key={key}
                          className="border p-2"
                        >

                          {key}

                        </th>

                      ))

                    }

                  </tr>

                </thead>

                <tbody>

                  {

                    excelData.map((row, index) => (

                      <tr key={index}>

                        {

                          Object.values(row).map((value, i) => (

                            <td
                              key={i}
                              className="border p-2"
                            >

                              {value}

                            </td>

                          ))

                        }

                      </tr>

                    ))

                  }

                </tbody>

              </table>

            </div>

            <button
              onClick={handleImport}
              disabled={loading}
              className="
                mt-6
                bg-green-600
                hover:bg-green-700
                text-white
                px-6
                py-2
                rounded-lg
              "
            >

              {

                loading

                  ? "Importing..."

                  : "Import Leads"

              }

            </button>

          </>

        )

      }

    </DashboardLayout>

  );

}