import { useState, useEffect, useCallback } from "react";
import useRecipientStore from "@/hooks/useRecipientStore";
import "./Form2Picker.css";

function RecipientInputField({ label, type, value, required, onChange }) {
  return (
    <div className="recipientInputField">
      <label className={required ? "labelRequired" : ""}>{label}</label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={onChange}
      />
    </div>
  );
}

export default function Form2Picker() {
  const { setRecipient } = useRecipientStore();
  const [recipientData, setRecipientData] = useState({
    recipientName: "",
    recipientMail: "",
  });

  // 마운트 시 LocalStorage에서 데이터 가져오기
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("save-form2"));
    if (savedData) {
      setRecipientData(savedData); // 저장된 데이터를 상태에 반영
    }
  }, []);

  // 데이터를 LocalStorage에 저장하는 함수
  const saveDataToLocalStorage = useCallback(() => {
    localStorage.setItem("save-form2", JSON.stringify(recipientData));
    console.log("save-form2에 데이터가 저장되었습니다.", recipientData);
  }, [recipientData]);

  const handleChange = (field, value) => {
    setRecipientData((prev) => ({ ...prev, [field]: value }));
    setRecipient({ [field]: value }); // zustand 상태 업데이트 (선택 사항)
  };

  // 언마운트될 때 데이터 저장
  useEffect(() => {
    return () => {
      saveDataToLocalStorage(); // 컴포넌트 언마운트 시 호출
    };
  }, [saveDataToLocalStorage]);

  return (
    <div id="recipientPicker">
      <title>
        <span>상대방은 누구인가요?</span>
      </title>
      <section>
        <RecipientInputField
          label="이름"
          type="text"
          value={recipientData.recipientName}
          required={true}
          onChange={(e) => handleChange("recipientName", e.target.value)}
        />
        <RecipientInputField
          label="메일주소"
          type="email"
          value={recipientData.recipientMail}
          required={true}
          onChange={(e) => handleChange("recipientMail", e.target.value)}
        />
      </section>
    </div>
  );
}
