import { useState } from "react";
import useProfileStore from "@/hooks/useProfileStore";

export default function ProfileForm() {
  const { addProfile } = useProfileStore(); // 새로운 프로필 추가 함수 가져오기

  // 폼의 초기값 설정
  const initialProfile = {
    name: "",
    gender: "",
    age: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialProfile);

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 빈 필드가 있는지 확인
    if (
      !formData.name ||
      !formData.gender ||
      !formData.age ||
      !formData.email
    ) {
      alert("모든 필드를 채워주세요!");
      return;
    }

    // 새로운 프로필 추가
    addProfile(formData);

    // 폼 초기화
    setFormData(initialProfile);

    alert("새로운 프로필이 저장되었습니다.");
  };

  // 입력 값 변경 핸들러
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
        <label htmlFor="gender">성별:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">성별 선택</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
      </div>
      <div>
        <label htmlFor="age">나이(만):</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">보낼 이메일:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">저장</button>
    </form>
  );
}
