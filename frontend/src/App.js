import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileForm from "@/pages/ProfileForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfileForm />} />
        <Route path="/profile" element={<ProfileForm />} />
      </Routes>
    </Router>
  );
}

export default App;
