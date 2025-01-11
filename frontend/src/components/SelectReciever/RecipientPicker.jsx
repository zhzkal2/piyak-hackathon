import { useState } from "react";
import useRecipientStore from "@/hooks/useRecipientStore";
import "./RecipientPicker.css";

function RecipientInputField({ label, type, required, onChange }) {
  return (
    <div className="recipientInputField">
      <label className={required ? "labelRequired" : ""}>{label}</label>
      <input type={type} required={required} onChange={onChange} />
    </div>
  );
}

export default function RecipientPicker() {
  const { setRecipient } = useRecipientStore();
  const [recipientData, setRecipientData] = useState({
    recipientName: "",
    recipientMail: "",
    fileToSend: "",
  });

  const handleSave = () => {
    // save-form2에 데이터 저장
    localStorage.setItem("save-form2", JSON.stringify(recipientData));
    alert("데이터가 저장되었습니다.");
  };

  const handleChange = (field, value) => {
    setRecipientData((prev) => ({ ...prev, [field]: value }));
    setRecipient({ [field]: value }); // zustand 상태 업데이트 (선택 사항)
  };

  return (
    <div id="recipientPicker">
      <title>
        <span>상대방은 누구인가요?</span>
      </title>
      <section>
        <RecipientInputField
          label="이름"
          type="text"
          required={true}
          onChange={(e) => handleChange("recipientName", e.target.value)}
        />
        <RecipientInputField
          label="메일주소"
          type="email"
          required={true}
          onChange={(e) => handleChange("recipientMail", e.target.value)}
        />
        {/* <RecipientInputField
          label="파일 첨부"
          type="file"
          required={false}
          onChange={(e) => handleChange("fileToSend", e.target.value)}
        /> */}
      </section>
      <button
        onClick={handleSave}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        저장
      </button>
    </div>
  );
}
