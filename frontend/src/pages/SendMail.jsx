import { useState } from "react";
import ProfileSelect from "@/components/ProfileSelect/ProfileSelect";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import PageNavigation from "@/components/PageNavigation/PageNavigation";
import "@/styles/SendMail.css";

const Comp2 = () => <div>Comp2 Content</div>;
const Comp3 = () => <div>Comp3 Content</div>;
const Comp4 = () => <div>Comp4 Content</div>;

export default function SendMail() {
  const totalPages = 4;
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1); // 다음 페이지로 이동
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1); // 이전 페이지로 이동
    }
  };

  const renderTitle = () => {
    switch (currentPage) {
      case 0:
        return <h2>1. 내 정보 선택하기</h2>;
      case 1:
        return <h2>2. 메일 보낼 사람 선택하기</h2>;
      case 2:
        return <h2>3. 내용 선택하기</h2>;
      case 3:
        return <h2>결과가 나왔어요!</h2>;
      default:
        return null;
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <ProfileSelect />;
      case 1:
        return <Comp2 />;
      case 2:
        return <Comp3 />;
      case 3:
        return <Comp4 />;
      default:
        return null;
    }
  };

  return (
    <div className="send-mail-container">
      {renderTitle()}
      <ProgressBar currentPage={currentPage} totalPages={totalPages} />
      <div className="send-mail-content-box">{renderPage()}</div>
      <PageNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}
