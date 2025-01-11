import { useState, useEffect } from "react";
import useProfileStore from "@/hooks/useProfileStore";

export default function ProfileForm() {
  const { profiles, addProfile } = useProfileStore(); // 새로운 프로필 추가 함수 가져오기

  const initialProfile = {
    name: "",
    job: "",
    affiliation: "",
    number: "",
  };

  const [formData, setFormData] = useState(initialProfile);

  useEffect(() => {
    console.log(profiles);
  }, [profiles]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.job ||
      !formData.affiliation ||
      !formData.number
    ) {
      alert("모든 필드를 채워주세요!");
      return;
    }
    addProfile(formData);
    setFormData(initialProfile);
    alert("새로운 프로필이 저장되었습니다.");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <div>
        <label htmlFor="name">이름:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="job">직업:</label>
        <input
          type="text"
          id="job"
          name="job"
          value={formData.job}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="affiliation">소속:</label>
        <input
          type="text"
          id="affiliation"
          name="affiliation"
          value={formData.affiliation}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="number">학번:</label>
        <input
          type="text"
          id="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">저장</button>
    </form>
  );
}
