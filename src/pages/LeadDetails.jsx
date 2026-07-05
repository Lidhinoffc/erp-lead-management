import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import Notes from "../components/Notes";

import {
  getLeadById,
  updateLead,
} from "../services/leadService";

export default function LeadDetails() {
  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLead();
  }, [id]);

  async function loadLead() {
    try {
      const response = await getLeadById(id);
      setLead(response.data);
    } catch {
      setError("Unable to load lead details.");
    } finally {
      setLoading(false);
    }
  }

  async function saveNotes(updatedNotes) {
    try {
      const updatedLead = {
        ...lead,
        notes: updatedNotes,
      };

      await updateLead(id, updatedLead);

      setLead(updatedLead);
    } catch {
      alert("Unable to save notes.");
    }
  }

  if (loading) return <Loader />;

  if (error) return <ErrorState message={error} />;

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-lg p-6">

        <h1 className="text-3xl font-bold mb-6">
          Lead Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Info label="Name" value={lead.name} />
          <Info label="Mobile" value={lead.mobile} />
          <Info label="Email" value={lead.email} />
          <Info label="Address" value={lead.address} />
          <Info label="Course" value={lead.course} />
          <Info label="Lead Source" value={lead.source} />
          <Info label="Assigned Employee" value={lead.employee} />
          <Info label="Status" value={lead.status} />
          <Info label="Created Date" value={lead.createdDate} />

        </div>

        <hr className="my-8" />

        <Notes
          notes={lead.notes || []}
          onSave={saveNotes}
        />

        <div className="mt-8">

          <Link to="/">

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
              Back
            </button>

          </Link>

        </div>

      </div>
    </DashboardLayout>
  );
}

function Info({ label, value }) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <p className="text-gray-500 text-sm">
        {label}
      </p>

      <p className="font-semibold text-lg">
        {value}
      </p>
    </div>
  );
}