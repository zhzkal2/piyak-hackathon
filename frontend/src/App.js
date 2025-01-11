import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileForm from "@/pages/ProfileForm";
import SendMail from "@/pages/SendMail";
import { Login, LoginRedirectHandler } from "@/pages/Login";
import Storage from "@/pages/Storage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/callback" element={<LoginRedirectHandler />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/send-mail" element={<SendMail />} />
        <Route path="/storage" element={<Storage />} />
      </Routes>
    </Router>
  );
}

export default App;
