import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import SearchBar from "../components/SearchBar";

import Filter from "../components/Filter";

import LeadTable from "../components/LeadTable";

import Pagination from "../components/Pagination";

import StatsCards from "../components/StatsCards";

import { getLeads } from "../services/leadService";

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

    }

    catch (error) {

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

  const lastIndex = currentPage * recordsPerPage;

  const firstIndex = lastIndex - recordsPerPage;

  const currentLeads = filteredLeads.slice(

    firstIndex,

    lastIndex

  );

  return (

    <DashboardLayout>

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