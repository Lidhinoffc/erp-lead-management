import { Link } from "react-router-dom";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-blue-600 text-white shadow">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <Link
            to="/"
            className="text-2xl font-bold"
          >
            ERP Lead Management
          </Link>

          <div className="font-semibold">
            Admin
          </div>

        </div>

      </header>

      <main className="max-w-7xl mx-auto p-6">

        {children}

      </main>

    </div>
  );
}