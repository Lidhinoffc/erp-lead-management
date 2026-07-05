export default function Filter({

  status,

  setStatus,

  employee,

  setEmployee,

  startDate,

  setStartDate,

  endDate,

  setEndDate,

  resetFilters

}) {

  return (

    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-5
      gap-4
      "
    >

      <select

        value={status}

        onChange={(e)=>

          setStatus(e.target.value)

        }

        className="border rounded-lg p-2"

      >

        <option value="">All Status</option>

        <option>New</option>

        <option>Contacted</option>

        <option>Qualified</option>

        <option>Closed</option>

      </select>

      <select

        value={employee}

        onChange={(e)=>

          setEmployee(e.target.value)

        }

        className="border rounded-lg p-2"

      >

        <option value="">All Employees</option>

        <option>Alice</option>

        <option>Bob</option>

        <option>Charlie</option>

      </select>

      <input

        type="date"

        value={startDate}

        onChange={(e)=>

          setStartDate(e.target.value)

        }

        className="border rounded-lg p-2"

      />

      <input

        type="date"

        value={endDate}

        onChange={(e)=>

          setEndDate(e.target.value)

        }

        className="border rounded-lg p-2"

      />

      <button

        onClick={resetFilters}

        className="
        bg-red-500
        text-white
        rounded-lg
        px-4
        py-2
        hover:bg-red-600
        "

      >

        Reset Filters

      </button>

    </div>

  );

}