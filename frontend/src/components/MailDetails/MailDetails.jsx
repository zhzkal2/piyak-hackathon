import "./MailDetails.css";
import useProfileStore from "@/hooks/useProfileStore";
import { sendForm } from "@/services/axios";
import { useNavigate } from "react-router-dom";

const MailDetails = ({ mail }) => {
  // const { profiles } = useProfileStore();
  // const profile = profiles.find((profile) => profile.email === mail.senderEmail);
  const navigate = useNavigate();

  const handleSubmit = () => {
    sendForm(mail);
    alert("메일 저장 완료");
    navigate("/");
  };

  return (
    <div id="mailDetailContainer">
      <div className="mailDetailLeft">
        <div className={`mailDetailStatus ${mail.state}`}>
          {mail.state === "SAVED" ? "보관" : "전송"}
        </div>
        <div className="mailDetailTitle">
          {mail.state === "SAVED" ? (
            <input type="text" value={mail.generatedTitle} />
          ) : (
            <span>{mail.generatedTitle}</span>
          )}
        </div>
        <div className="mailDetailRecipientEmail">
          <span>받는 사람</span>
          <span>{`<${mail.recipientEmail}>`}</span>
        </div>
        <div className="mailDetailContent">
          {mail.state === "SAVED" ? (
            <textarea>{mail.generateContent}</textarea>
          ) : (
            mail.generateContent
          )}
        </div>
      </div>
      <div className="mailDetailRight">
        <div className="mailDetailRecipient">
          <span>To. {mail.recipientEmail}</span>
        </div>
        <div className="mailDetailDate">{mail.createAt}</div>
        <div className="mailDetailEdit">
          <div className="mailDetailFrom">
            {/* <span><b>From. {name}</b></span> */}
          </div>
          {/* zustand 연결 */}
          <div className="mailDetailEditInfo">
            {/* <span>직급&nbsp;{job}</span> */}
            {/* <span>소속&nbsp;{affiliation}</span> */}
            {/* <span>학번&nbsp;{number}</span> */}
          </div>
        </div>
        {/* 추후 요청사항 나타내기 */}
        <div className="mailDetailRequest">
          <span>*직접 적은 요청사항입니다.</span>
        </div>
        <div
          className={`mailDetailButtonBox ${
            mail.state === "SAVED" ? "" : "none"
          }`}
        >
          <button className="mailDetailButton" onClick={handleSubmit}>
            저장
          </button>
          <button className="mailDetailButton" onClick={handleSubmit}>
            메일 보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailDetails;
