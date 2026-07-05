import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import LeadForm from "../components/LeadForm";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

import {
  getLeadById,
  updateLead
} from "../services/leadService";

export default function EditLead() {

  const { id } = useParams();

  const navigate = useNavigate();

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

      setError("Unable to load lead.");

    } finally {

      setLoading(false);

    }

  }

  async function handleUpdate(updatedData) {

    try {

      await updateLead(id, {

        ...lead,

        ...updatedData

      });

      navigate("/");

    } catch {

      alert("Unable to update lead.");

    }

  }

  if (loading) {

    return <Loader />;

  }

  if (error) {

    return <ErrorState message={error} />;

  }

  return (

    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">

        Edit Lead

      </h1>

      <LeadForm

        lead={lead}

        onSubmit={handleUpdate}

      />

    </DashboardLayout>

  );

}