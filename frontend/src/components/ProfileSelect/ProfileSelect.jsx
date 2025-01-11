import { useState, useEffect } from "react";
import useProfileStore from "@/hooks/useProfileStore";
import "./ProfileSelect.css";

export default function ProfileSelect() {
  const { profiles } = useProfileStore();

  const initialProfile = {
    name: "",
    job: "",
    affiliation: "",
    number: "",
  }; // 기본값 설정

  const [selectedProfile, setSelectedProfile] = useState(initialProfile); // 선택된 프로필 저장
  const [selectedFields, setSelectedFields] = useState({
    name: false,
    job: false,
    affiliation: false,
    number: false,
  }); // 선택된 항목 저장

  // LocalStorage에서 데이터 가져오기
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("save-form1"));
    if (savedData) {
      setSelectedProfile((prev) => ({ ...prev, ...savedData }));
    }
  }, []);

  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile); // 선택된 프로필 업데이트
    localStorage.removeItem("save-form1"); // LocalStorage에서 save-form1 삭제
  };

  const handleCheckboxChange = (field) => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field], // 체크박스 상태 토글
    }));
  };

  const handleNext = () => {
    const dataToSave = {};

    // 모든 필드에 대해 체크된 경우 값을 저장하고, 체크되지 않은 경우 null 저장
    Object.keys(selectedFields).forEach((key) => {
      dataToSave[key] = selectedFields[key] ? selectedProfile[key] : null;
    });

    localStorage.setItem("save-form1", JSON.stringify(dataToSave));
    alert("선택된 항목이 저장되었습니다.");
  };

  return (
    <div className="profile-select-container">
      <h3>나는 누구인가요?</h3>
      <div className="profile-select-options">
        {profiles.length > 0 ? (
          profiles.map((profile, index) => (
            <div
              key={index}
              onClick={() => handleSelectProfile(profile)} // 클릭 시 선택된 프로필 업데이트 및 LocalStorage 초기화
              style={{
                cursor: "pointer",
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "10px",
                backgroundColor:
                  selectedProfile === profile ? "#f0f0f0" : "#fff",
              }}
            >
              <p>
                <strong>이름:</strong> {profile.name || "정보 없음"}
              </p>
              <p>
                <strong>직업:</strong> {profile.job || "정보 없음"}
              </p>
              <p>
                <strong>소속:</strong> {profile.affiliation || "정보 없음"}
              </p>
              <p>
                <strong>학번:</strong> {profile.number || "정보 없음"}
              </p>
            </div>
          ))
        ) : (
          <p>저장된 프로필 정보가 없습니다.</p>
        )}
      </div>

      <h3>참고할 정보 선택하기</h3>
      <div className="profile-select-result">
        <div>
          <label>
            <input
              type="checkbox"
              checked={selectedFields.myName}
              onChange={() => handleCheckboxChange("myName")}
            />
            <strong>이름:</strong> {selectedProfile.name}
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedFields.myJob}
              onChange={() => handleCheckboxChange("myJob")}
            />
            <strong>직업:</strong> {selectedProfile.job}
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedFields.myAffiliation}
              onChange={() => handleCheckboxChange("myAffiliation")}
            />
            <strong>소속:</strong> {selectedProfile.affiliation}
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedFields.myStuNum}
              onChange={() => handleCheckboxChange("myStuNum")}
            />
            <strong>학번:</strong> {selectedProfile.number}
          </label>
        </div>
      </div>
      <button
        onClick={handleNext}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        저장
      </button>
    </div>
  );
}
