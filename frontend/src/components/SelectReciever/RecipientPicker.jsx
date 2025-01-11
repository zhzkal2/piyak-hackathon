import { useState } from "react";
import useRecipientStore from "@/hooks/useRecipientStore";
import "./RecipientPicker.css";

function RecipientInputField({ label, type, required, onChange }) {
  return (
    <div className="recipientInputField">
      <label className={required ? "labelRequired" : ""}>{label}</label>
      <input type={type} required={required} onChange={onChange} />
    </div>
  )
};

export default function RecipientPicker() {
  const { setRecipient } = useRecipientStore();
  const [email, setEmail] = useState("");
  

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
          onChange={(e) => setRecipient({ name: e.target.value })}
        />
        <RecipientInputField
          label="메일주소" 
          type="email" 
          required={true} 
          onChange={(e) => setRecipient({ email: e.target.value })}
        />
        <RecipientInputField 
          label="파일 첨부" 
          type="file" 
          required={false} 
          onChange={(e) => setRecipient({ file: e.target.value })}
        />
      </section>
    </div>
  )
}