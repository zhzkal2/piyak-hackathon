import RecentMailTab from "@/components/RecentMailTab/RecentMailTab";
import MailDetails from "@/components/MailDetails/MailDetails";
import useProfileStore from "@/hooks/useProfileStore";
import { useState } from "react";
import "../styles/Storage.css";
import { fetchForm } from "@/services/axios";
import useMailStore from "@/hooks/useMailStore";

export default function Storage() {
  const { name } = useProfileStore();
  const { mails, setMails } = useMailStore();
  const [selectedMail, setSelectedMail] = useState(null);

  const handleMailClick = (mail) => {
    setSelectedMail(mail);
  };

  const handleBack = () => {
    setSelectedMail(null);
  };

  const handleFetchMails = async () => {
    try {
      const { status, data: fetchedMails } = await fetchForm();
      if (status === 200) {
        setMails(fetchedMails);
        console.log('Mails fetched and stored successfully');
      }
    } catch (error) {
      console.error('Failed to fetch mails:', error);
    };
  };

  return (
    <div id="storage">
      <div className="storageContainer">
        <h2>{name}씨의 보관함</h2>
        <button onClick={handleFetchMails}>메일 가져오기</button>
        {selectedMail ? (
          <MailDetails mail={selectedMail} onBack={handleBack} />
        ) : (
          <RecentMailTab mails={mails} onMailClick={handleMailClick} />
        )}
      </div>
    </div>
  )
};
