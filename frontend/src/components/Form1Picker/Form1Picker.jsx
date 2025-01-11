import { useState, useEffect, useCallback } from "react";
import useProfileStore from "@/hooks/useProfileStore";
import "./Form1Picker.css";

export default function Form1Picker() {
  const { profiles } = useProfileStore(); // zustand의 profiles 상태 가져오기
  console.log(profiles);

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

  // 프로필 선택 핸들러
  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile); // 선택된 프로필 업데이트
  };

  // 체크박스 상태 업데이트 핸들러
  const handleCheckboxChange = (field) => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field], // 체크박스 상태 토글
    }));
  };

  // LocalStorage에 선택된 데이터를 저장
  const saveDataToLocalStorage = useCallback(() => {
    const dataToSave = {};
    Object.keys(selectedFields).forEach((key) => {
      dataToSave[key] = selectedFields[key] ? selectedProfile[key] : null; // 선택된 필드만 저장
    });

    localStorage.setItem("save-form1", JSON.stringify(dataToSave));
    console.log("save-form1에 데이터가 저장되었습니다.", dataToSave);
  }, [selectedFields, selectedProfile]);

  // 언마운트될 때 LocalStorage에 저장
  useEffect(() => {
    return () => {
      saveDataToLocalStorage(); // 컴포넌트 언마운트 시 호출
    };
  }, [saveDataToLocalStorage]);

  return (
    <div className="profile-select-container">
      <h3>나는 누구인가요?</h3>
      <div className="profile-select-options">
        {profiles.length > 0 ? (
          profiles.map((profile, index) => (
            <div
              key={index}
              onClick={() => handleSelectProfile(profile)} // 클릭 시 선택된 프로필 업데이트
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
              checked={selectedFields.name}
              onChange={() => handleCheckboxChange("name")}
            />
            <strong>이름:</strong> {selectedProfile.name}
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedFields.job}
              onChange={() => handleCheckboxChange("job")}
            />
            <strong>직업:</strong> {selectedProfile.job}
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedFields.affiliation}
              onChange={() => handleCheckboxChange("affiliation")}
            />
            <strong>소속:</strong> {selectedProfile.affiliation}
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedFields.number}
              onChange={() => handleCheckboxChange("number")}
            />
            <strong>학번:</strong> {selectedProfile.number}
          </label>
        </div>
      </div>
    </div>
  );
}
