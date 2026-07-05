export default function Pagination({
  currentPage,
  setCurrentPage,
  recordsPerPage,
  setRecordsPerPage,
  totalRecords
}) {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">

      <div>
        <label className="mr-2 font-medium">
          Records:
        </label>

        <select
          value={recordsPerPage}
          onChange={(e) => {
            setRecordsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border rounded-lg px-3 py-2"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="flex gap-3 items-center">

        <button
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
          disabled={currentPage === 1}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-40"
        >
          Previous
        </button>

        <span className="font-semibold">

          Page {currentPage} of {totalPages}

        </span>

        <button
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-40"
        >
          Next
        </button>

      </div>

    </div>
  );
}