import { useState, useEffect, useCallback } from "react";
import useProfileStore from "@/hooks/useProfileStore";
import "./Form1Picker.css";

export default function Form1Picker() {
  const { profiles } = useProfileStore();

  const initialProfile = (() => {
    const savedDataString = localStorage.getItem("save-form1");
    if (savedDataString) {
      const savedData = JSON.parse(savedDataString);
      const profile = {
        name: savedData.name || "",
        job: savedData.job || "",
        affiliation: savedData.affiliation || "",
        number: savedData.number || "",
      };
      return profile;
    }
    return {
      name: "",
      job: "",
      affiliation: "",
      number: "",
    };
  })();

  const initialFields = (() => {
    const savedDataString = localStorage.getItem("save-form1");
    if (savedDataString) {
      const savedData = JSON.parse(savedDataString);
      return {
        name: !!savedData.name,
        job: !!savedData.job,
        affiliation: !!savedData.affiliation,
        number: !!savedData.number,
      };
    }
    return {
      name: false,
      job: false,
      affiliation: false,
      number: false,
    };
  })();

  const [selectedProfile, setSelectedProfile] = useState(initialProfile);
  const [selectedFields, setSelectedFields] = useState(initialFields);

  const handleCheckboxChange = (field) => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSelectProfile = (profile) => {
    localStorage.removeItem("save-form1");
    setSelectedProfile(profile);
    setSelectedFields({
      name: false,
      job: false,
      affiliation: false,
      number: false,
    });
  };

  const saveDataToLocalStorage = useCallback(() => {
    const dataToSave = {};
    Object.keys(selectedFields).forEach((key) => {
      dataToSave[key] = selectedFields[key] ? selectedProfile[key] : null;
    });

    localStorage.setItem("save-form1", JSON.stringify(dataToSave));
  }, [selectedFields, selectedProfile]);

  useEffect(() => {
    return () => {
      saveDataToLocalStorage();
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
              onClick={() => handleSelectProfile(profile)}
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
