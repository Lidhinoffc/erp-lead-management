import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import LeadTable from "../components/LeadTable";
import Pagination from "../components/Pagination";
import StatsCards from "../components/StatsCards";

import {
  getLeads,
  deleteLead
} from "../services/leadService";

export default function LeadList() {

  const [allLeads, setAllLeads] = useState([]);

  const [filteredLeads, setFilteredLeads] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [employee, setEmployee] = useState("");

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [recordsPerPage, setRecordsPerPage] = useState(10);

  useEffect(() => {

    fetchLeads();

  }, []);

  async function fetchLeads() {

    try {

      const response = await getLeads();

      setAllLeads(response.data);

      setFilteredLeads(response.data);

    } catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    let result = [...allLeads];

    if (search) {

      result = result.filter((lead) =>

        lead.name.toLowerCase().includes(search.toLowerCase()) ||

        lead.mobile.includes(search) ||

        lead.email.toLowerCase().includes(search.toLowerCase())

      );

    }

    if (status) {

      result = result.filter(

        (lead) => lead.status === status

      );

    }

    if (employee) {

      result = result.filter(

        (lead) => lead.employee === employee

      );

    }

    if (startDate) {

      result = result.filter(

        (lead) => lead.createdDate >= startDate

      );

    }

    if (endDate) {

      result = result.filter(

        (lead) => lead.createdDate <= endDate

      );

    }

    setFilteredLeads(result);

    setCurrentPage(1);

  }, [

    search,

    status,

    employee,

    startDate,

    endDate,

    allLeads

  ]);

  function resetFilters() {

    setSearch("");

    setStatus("");

    setEmployee("");

    setStartDate("");

    setEndDate("");

  }

  async function handleDelete(id) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) {

      return;

    }

    try {

      await deleteLead(id);

      fetchLeads();

    } catch {

      alert("Unable to delete lead.");

    }

  }

  const lastIndex = currentPage * recordsPerPage;

  const firstIndex = lastIndex - recordsPerPage;

  const currentLeads = filteredLeads.slice(

    firstIndex,

    lastIndex

  );

  return (

    <DashboardLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">

          Lead Management

        </h1>

        <div className="flex gap-3">

          <Link to="/import">

            <button
              className="
                bg-green-600
                hover:bg-green-700
                text-white
                px-5
                py-2
                rounded-lg
              "
            >

              Import Excel

            </button>

          </Link>

          <Link to="/add">

            <button
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-2
                rounded-lg
              "
            >

              + Add Lead

            </button>

          </Link>

        </div>

      </div>

      <StatsCards leads={filteredLeads} />

      <div className="bg-white rounded-lg shadow p-5 mb-5">

        <SearchBar

          search={search}

          setSearch={setSearch}

        />

        <Filter

          status={status}

          setStatus={setStatus}

          employee={employee}

          setEmployee={setEmployee}

          startDate={startDate}

          setStartDate={setStartDate}

          endDate={endDate}

          setEndDate={setEndDate}

          resetFilters={resetFilters}

        />

      </div>

      <div className="bg-white rounded-lg shadow p-5">

        <LeadTable

          leads={currentLeads}

          onDelete={handleDelete}

        />

        <Pagination

          currentPage={currentPage}

          setCurrentPage={setCurrentPage}

          recordsPerPage={recordsPerPage}

          setRecordsPerPage={setRecordsPerPage}

          totalRecords={filteredLeads.length}

        />

      </div>

    </DashboardLayout>

  );

}