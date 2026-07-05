export default function SearchBar({

  search,

  setSearch

}) {

  return (

    <div className="mb-5">

      <input

        type="text"

        value={search}

        onChange={(e) =>

          setSearch(e.target.value)

        }

        placeholder="Search by Name, Mobile or Email..."

        className="
          w-full
          md:w-96
          px-4
          py-2
          border
          rounded-lg
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "

      />

    </div>

  );

}