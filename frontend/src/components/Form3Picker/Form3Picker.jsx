import React, { useState, useEffect, useCallback } from "react";
import "./Form3Picker.css";

export default function Form3Picker() {
  const [formData, setFormData] = useState({
    situation: "",
    desiredAnswer: "",
    tone: "",
  });

  // 마운트 시 LocalStorage에서 데이터 가져오기
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("save-form3"));
    if (savedData) {
      setFormData(savedData); // 저장된 데이터를 상태에 반영
    }
  }, []);

  // 데이터를 LocalStorage에 저장하는 함수
  const saveDataToLocalStorage = useCallback(() => {
    localStorage.setItem("save-form3", JSON.stringify(formData));
    console.log("save-form3에 데이터가 저장되었습니다.", formData);
  }, [formData]);

  // 언마운트될 때 데이터 저장
  useEffect(() => {
    return () => {
      saveDataToLocalStorage(); // 컴포넌트 언마운트 시 호출
    };
  }, [saveDataToLocalStorage]);

  const handleToneChange = (tone) => {
    setFormData((prev) => ({ ...prev, tone })); // 선택된 말투 업데이트
  };

  return (
    <div className="form3-picker-container">
      <h3>*어떤 상황인가요?</h3>
      <textarea
        placeholder="상황을 입력해주세요..."
        value={formData.situation}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, situation: e.target.value }))
        }
        className="form3-textarea"
      />

      <h3>원하는 답변</h3>
      <textarea
        placeholder="원하는 답변을 입력해주세요..."
        value={formData.desiredAnswer}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, desiredAnswer: e.target.value }))
        }
        className="form3-textarea"
      />

      <h3>말투</h3>
      <div className="tone-options">
        {["격식있는", "친근한", "겸손한", "유머러스", "간결한", "논리적"].map(
          (tone) => (
            <button
              key={tone}
              onClick={() => handleToneChange(tone)}
              className={`tone-button ${
                formData.tone === tone ? "tone-selected" : ""
              }`}
            >
              {tone}
            </button>
          )
        )}
      </div>
    </div>
  );
}
