import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import LeadForm from "../components/LeadForm";

import { createLead } from "../services/leadService";

export default function AddLead() {

  const navigate = useNavigate();

  async function handleCreate(formData) {

    try {

      const newLead = {

        ...formData,

        address: "",

        course: "",

        source: "Website",

        createdDate: new Date().toISOString().split("T")[0],

        notes: []

      };

      await createLead(newLead);

      navigate("/");

    } catch {

      alert("Unable to create lead.");

    }

  }

  return (

    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">

        Add New Lead

      </h1>

      <LeadForm

        onSubmit={handleCreate}

      />

    </DashboardLayout>

  );

}