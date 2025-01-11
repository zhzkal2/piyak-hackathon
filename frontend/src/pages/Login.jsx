import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

// 환경변수에 넣을 값
const REDIRECT_URI = "http://localhost:3000/auth/callback";
const GOOGLE_CLIENT_ID =
  "814591718742-c7ea2640fr6h51evq51gu5hq2j34ubed.apps.googleusercontent.com";

const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile`;

export function Login() {
  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <div className="div-social-login">
      <button onClick={handleGoogleLogin}>구글로 시작하기</button>
    </div>
  );
}

/* 소셜 로그인 인증 코드 처리 페이지 */
export function LoginRedirectHandler() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const authorizationCode = searchParams.get("code");

    if (authorizationCode) {
      console.log("인증 코드:", authorizationCode);

      axios
        .post("/auth/social-login", { code: authorizationCode })
        .then((response) => {
          console.log("로그인 성공:", response.data);
          navigate("/");
          alert("로그인 되었습니다.");
        })
        .catch((error) => {
          console.error("로그인 실패:", error);
          navigate("/");
          alert("문제가 발생했습니다. 다시 시도해주세요.");
        });
    }
  }, [searchParams, navigate]);

  return <div>소셜 로그인 처리 중...</div>;
}
