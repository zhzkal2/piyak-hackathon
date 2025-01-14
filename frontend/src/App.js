import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileForm from "@/pages/ProfileForm";
import SendMail from "@/pages/SendMail";
import Home from "@/pages/Home";
import Storage from "@/pages/Storage";
import Header from "@/components/Header/Header";
import GNB from "@/components/GNB/GNB";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {" "}
        <Header />
        <div style={{ display: "flex" }}>
          <GNB />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<ProfileForm />} />
            <Route path="/send-mail" element={<SendMail />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/*" element={<ProfileForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
