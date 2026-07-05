import { Link } from "react-router-dom";

export default function LeadTable({

  leads

}) {

  return (

    <div className="overflow-x-auto">

      <table
        className="
        min-w-full
        border
        border-gray-200
        "
      >

        <thead
          className="
          bg-blue-600
          text-white
          "
        >

          <tr>

            <th className="p-3">Lead Name</th>

            <th className="p-3">Mobile</th>

            <th className="p-3">Email</th>

            <th className="p-3">Status</th>

            <th className="p-3">Employee</th>

            <th className="p-3">Created</th>

            <th className="p-3">Actions</th>

          </tr>

        </thead>

        <tbody>

          {leads.length===0?

          (

            <tr>

              <td
                colSpan="7"
                className="text-center p-6"
              >

                No Leads Found

              </td>

            </tr>

          )

          :

          (

            leads.map((lead)=>(

              <tr
                key={lead.id}
                className="
                border-t
                hover:bg-gray-100
                "
              >

                <td className="p-3">

                  {lead.name}

                </td>

                <td className="p-3">

                  {lead.mobile}

                </td>

                <td className="p-3">

                  {lead.email}

                </td>

                <td className="p-3">

                  {lead.status}

                </td>

                <td className="p-3">

                  {lead.employee}

                </td>

                <td className="p-3">

                  {lead.createdDate}

                </td>

                <td className="p-3">

                  <Link
                    to={`/lead/${lead.id}`}
                  >

                    <button
                      className="
                      bg-blue-500
                      text-white
                      px-3
                      py-1
                      rounded
                      mr-2
                      "
                    >

                      View

                    </button>

                  </Link>

                  <Link
                    to={`/edit/${lead.id}`}
                  >

                    <button
                      className="
                      bg-green-500
                      text-white
                      px-3
                      py-1
                      rounded
                      "
                    >

                      Edit

                    </button>

                  </Link>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

}