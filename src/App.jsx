import { Routes, Route } from "react-router-dom";

import LeadList from "./pages/LeadList";
import LeadDetails from "./pages/LeadDetails";
import EditLead from "./pages/EditLead";

function App() {
  return (
    <Routes>

      <Route path="/" element={<LeadList />} />

      <Route path="/lead/:id" element={<LeadDetails />} />

      <Route path="/edit/:id" element={<EditLead />} />

    </Routes>
  );
}

export default App;