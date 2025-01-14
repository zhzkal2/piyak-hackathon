import RecentMailTab from "@/components/RecentMailTab/RecentMailTab";
import MailDetails from "@/components/MailDetails/MailDetails";
import useProfileStore from "@/hooks/useProfileStore";
import { useState } from "react";
import "../styles/Storage.css";
import { fetchForm } from "@/services/axios";
import useMailStore from "@/hooks/useMailStore";
import Mark from "@/image/mark.svg";

export default function Storage() {
  const { name } = useProfileStore();
  const { mails, setMails } = useMailStore();
  const [selectedMail, setSelectedMail] = useState(null);

  const dummyMails = [
    {
      id: 1,
      generatedTitle: "[GDSC] 오늘 점심 메뉴는 뭐예요?",
      generateContent: "lorem ipsum dolor sit amet",
      createAt: "2025-01-01",
      recipientEmail: "kim@example.com",
      state: "SAVED",
    },
    {
      id: 2,
      generatedTitle: "데이터베이스 과제 제출 안내",
      generateContent: "lorem ipsum dolor sit amet",
      createAt: "2025-01-01",
      recipientEmail: "kim@example.com",
      state: "SAVED",
    },
    {
      id: 3,
      generatedTitle: "데이터베이스 과제 제출 안내",
      generateContent: "lorem ipsum dolor sit amet",
      createAt: "2025-01-01",
      recipientEmail: "kim@example.com",
      state: "SAVED",
    },
    {
      id: 4,
      generatedTitle: "[치킨집]치킨집 협찬에 관하여",
      generateContent: "lorem ipsum dolor sit amet",
      createAt: "2025-01-01",
      recipientEmail: "kim@example.com",
      state: "SAVED",
    },
    {
      id: 5,
      generatedTitle: "데이터베이스 과제 제출 안내",
      generateContent: "lorem ipsum dolor sit amet",
      createAt: "2025-01-01",
      recipientEmail: "kim@example.com",
      state: "SENT",
    },
    {
      id: 6,
      generatedTitle: "데이터베이스 과제 제출 안내",
      generateContent: "lorem ipsum dolor sit amet",
      createAt: "2025-01-01",
      recipientEmail: "kim@example.com",
      state: "SENT",
    },
  ];

  const handleMailClick = (mail) => {
    setSelectedMail(mail);
  };

  const handleBack = () => {
    setSelectedMail(null);
  };

  // const handleFetchMails = async () => {
  //   try {
  //     const { status, data: fetchedMails } = await fetchForm();
  //     if (status === 200) {
  //       setMails(fetchedMails);
  //       console.log('Mails fetched and stored successfully');
  //     }
  //   } catch (error) {
  //     console.error('Failed to fetch mails:', error);
  //   };
  // };

  return (
    <div id="storage">
      <div className="storageContainer">
        <span className="storageTitle">메일 보관함</span>
        <div className="storageHeader">
          <img src={Mark} alt="mark" />
          <span>{name}씨의 보관함</span>
        </div>
        {selectedMail ? (
          <MailDetails mail={selectedMail} onBack={handleBack} />
        ) : (
          <RecentMailTab mails={dummyMails} onMailClick={handleMailClick} />
        )}
      </div>
    </div>
  );
}
