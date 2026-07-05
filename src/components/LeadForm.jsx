import { useEffect, useState } from "react";

export default function LeadForm({
  lead,
  onSubmit
}) {

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    status: "New",
    employee: "Alice"
  });

  useEffect(() => {

    if (lead) {

      setFormData({
        name: lead.name || "",
        mobile: lead.mobile || "",
        email: lead.email || "",
        status: lead.status || "New",
        employee: lead.employee || "Alice"
      });

    }

  }, [lead]);

  function handleChange(e) {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  }

  function handleSubmit(e) {

    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Name is required");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      alert("Mobile must contain exactly 10 digits");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Enter a valid email");
      return;
    }

    onSubmit(formData);

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="max-w-xl bg-white shadow rounded-lg p-6"
    >

      <div className="mb-4">

        <label className="block mb-2 font-semibold">

          Name

        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />

      </div>

      <div className="mb-4">

        <label className="block mb-2 font-semibold">

          Mobile

        </label>

        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />

      </div>

      <div className="mb-4">

        <label className="block mb-2 font-semibold">

          Email

        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />

      </div>

      <div className="mb-4">

        <label className="block mb-2 font-semibold">

          Status

        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        >

          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Closed</option>

        </select>

      </div>

      <div className="mb-6">

        <label className="block mb-2 font-semibold">

          Assigned Employee

        </label>

        <select
          name="employee"
          value={formData.employee}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        >

          <option>Alice</option>
          <option>Bob</option>
          <option>Charlie</option>

        </select>

      </div>

      <button
        type="submit"
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-2
          rounded-lg
        "
      >

        Save Lead

      </button>

    </form>

  );

}