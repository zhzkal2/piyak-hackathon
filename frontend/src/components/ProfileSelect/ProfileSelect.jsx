import { useState } from "react";
import useProfileStore from "@/hooks/useProfileStore";
import "./ProfileSelect.css";

export default function ProfileSelect() {
  const { profiles } = useProfileStore();

  const initialProfile = {
    name: "이름",
    gender: "성별",
    age: "나이",
    email: "보낼 이메일",
  }; // 기본값 설정

  const [selectedProfile, setSelectedProfile] = useState(initialProfile); // 선택된 프로필 저장
  const [selectedFields, setSelectedFields] = useState({
    name: false,
    gender: false,
    age: false,
    email: false,
  }); // 선택된 항목 저장

  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile); // 선택된 프로필 업데이트
  };

  const handleCheckboxChange = (field) => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field], // 체크박스 상태 토글
    }));
  };

  const handleNext = () => {
    const dataToSave = {};
    Object.keys(selectedFields).forEach((key) => {
      if (selectedFields[key]) {
        dataToSave[key] = selectedProfile[key]; // 선택된 항목만 저장
      }
    });
    localStorage.setItem("selectedProfile", JSON.stringify(dataToSave));
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
              onClick={() => handleSelectProfile(profile)} // 클릭 시 선택된 프로필 업데이트
            >
              <p>
                <strong>이름:</strong> {profile.name || "정보 없음"}
              </p>
              <p>
                <strong>성별:</strong> {profile.gender || "정보 없음"}
              </p>
              <p>
                <strong>나이(만):</strong> {profile.age || "정보 없음"}
              </p>
              <p>
                <strong>보낼 이메일:</strong> {profile.email || "정보 없음"}
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
              checked={selectedFields.name}
              onChange={() => handleCheckboxChange("name")}
            />
            <strong>이름:</strong> {selectedProfile.name}
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedFields.gender}
              onChange={() => handleCheckboxChange("gender")}
            />
            <strong>성별:</strong> {selectedProfile.gender}
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedFields.age}
              onChange={() => handleCheckboxChange("age")}
            />
            <strong>나이(만):</strong> {selectedProfile.age}
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedFields.email}
              onChange={() => handleCheckboxChange("email")}
            />
            <strong>보낼 이메일:</strong> {selectedProfile.email}
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
