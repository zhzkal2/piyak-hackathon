import React, { useState, useEffect, useCallback } from "react";
import "./Form3Picker.css";

export default function Form3Picker() {
  const initialFormData = (() => {
    const savedData = JSON.parse(localStorage.getItem("save-form3"));
    if (savedData) {
      return {
        situation: savedData.situation || "",
        desiredAnswer: savedData.desiredAnswer || "",
        language: savedData.language || "",
        tone: savedData.tone || "",
      };
    }
    return {
      situation: "",
      desiredAnswer: "",
      language: "",
      tone: "",
    };
  })();

  const [formData, setFormData] = useState(initialFormData);

  const saveDataToLocalStorage = useCallback(() => {
    localStorage.setItem("save-form3", JSON.stringify(formData));
    console.log("save-form3에 데이터가 저장되었습니다.", formData);
  }, [formData]);

  useEffect(() => {
    return () => {
      saveDataToLocalStorage();
    };
  }, [saveDataToLocalStorage]);

  const handleToneChange = (tone) => {
    setFormData((prev) => ({ ...prev, tone }));
  };

  const handleLanguageChange = (language) => {
    setFormData((prev) => ({ ...prev, language }));
  };

  return (
    <div className="form3-picker-container">
      <h3>* 어떤 상황인가요?</h3>
      <textarea
        placeholder="내용을 입력하세요"
        value={formData.situation}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, situation: e.target.value }))
        }
        className="form3-textarea"
      />

      <h3>원하는 답변</h3>
      <textarea
        placeholder="내용을 입력해주세요"
        value={formData.desiredAnswer}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, desiredAnswer: e.target.value }))
        }
        className="form3-textarea"
        style={{ height: "3rem" }}
      />
      <div className="form3-option-container">
        <div className="form3-option-item">
          <h3>언어</h3>
          <div className="tone-options">
            {["korean", "english", "japanese", "chinese", "french", "german"].map(
              (language) => (
                <button
                  key={language}
                  onClick={() => handleLanguageChange(language)}
                  className={`tone-button ${
                    formData.language === language ? "tone-selected" : ""
                  }`}
                >
                  {language}
                </button>
              )
            )}
          </div>
        </div>
        <div className="form3-option-item">
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
      </div>
    </div>
  );
}
