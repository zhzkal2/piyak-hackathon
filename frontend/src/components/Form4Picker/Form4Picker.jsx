import { useState, useEffect } from "react";
import "./Form4Picker.css";

export default function Form4Picker() {
  const initialData = (() => {
    const savedData = JSON.parse(localStorage.getItem("save-form4"));
    if (savedData) {
      return {
        generatedTitle: savedData.generatedTitle || "",
        generatedContent: savedData.generatedContent || "",
        recipientMail: "gdgkoreacampus@gmail.com",
      };
    }
    return {
      generatedTitle: "[GDG Campus Korea] 삐약톤 행사 개인 참여자 안내",
      generatedContent: `안녕하세요.
GDG Campus Korea입니다.

삐약톤 행사에 관심을 가지고 신청해 주셔서 감사합니다.
해당 메일을 수령하신 분들께서는 삐약톤 행사에 개인 지원 참여자로 확정되었습니다.

개인 참여자분들은 행사 이전 함께 모여 <팀빌딩>을 진행할 예정입니다.
모든 팀은 "백엔드 + 클라이언트/프론트 + 디자이너/PM" 구성으로 행사에 참여할 수 있도록 구성될 것입니다.
체크인 시작 시간 이전에 팀빌딩을 진행하기 위해서 행사장에 10시까지 참여해주실 것을 부탁드립니다.
더하여, 아래의 안내 사항들을 숙지하여 행사 참여를 부탁드리는 바입니다!

- 행사 일시: 2025년 1월 11일 오전 11시 ~ 1월 12일 오후 2시
- 행사 장소: 동국대학교 혜화관 2층 고순청 세미나실 (아래 지도 참고)
- 준비물: 신분증, 개인 노트북 & 충전기, 팀티블러(팀 당 2개 제공), 팀블러 및 보온병(교내 정수기 사용 필수), 담요`,
      recipientMail: "gdgkoreacampus@gmail.com",
    };
  })();

  const [generatedData, setGeneratedData] = useState(initialData);

  const handleSave = () => {
    const saveData = {
      generatedTitle: generatedData.generatedTitle,
      generatedContent: generatedData.generatedContent,
    };

    localStorage.setItem("save-form4", JSON.stringify(saveData));
    alert("데이터가 저장되었습니다!");
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("save-form4"));
    if (savedData) {
      setGeneratedData((prev) => ({
        ...prev,
        generatedTitle: savedData.generatedTitle || prev.generatedTitle,
        generatedContent: savedData.generatedContent || prev.generatedContent,
      }));
    }
  }, []);

  return (
    <div className="form4-picker-container">
      <div className="left-section">
        <h3>AI가 만든 이메일 결과</h3>

        <div className="generated-email">
          <div>
            <strong>{generatedData.generatedTitle}</strong>
          </div>
          <p className="recipient">
            받는 사람 <span>{generatedData.recipientMail}</span>
          </p>
          <div className="generated-content">
            {generatedData.generatedContent.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="right-section">
        <h4>추가 요청, 변경 사항</h4>
        <textarea
          placeholder="요청 사항이나 변경 사항을 입력해주세요"
          className="feedback-textarea"
        ></textarea>

        <h4>첨부파일 추가</h4>
        <div className="file-upload">
          <label htmlFor="file-upload-input" className="file-upload-label">
            파일을 업로드해주세요
          </label>
          <input
            type="file"
            id="file-upload-input"
            className="file-upload-input"
          />
        </div>

        <h4>템플릿 등록하기</h4>
        <button className="template-button" onClick={handleSave}>
          저장
        </button>
      </div>
    </div>
  );
}
