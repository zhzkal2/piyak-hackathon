import { useState } from "react";
import "./RecentMailTab.css";

const RecentMailTab = ({ mails, onMailClick }) => {
  const [activeTab, setActiveTab] = useState("all");

  // 필터링
  const filteredMails = mails.filter((mail) => {
    if(activeTab === "all") return true;
    return mail.state === activeTab;
  })

  return (
    <div id="recentMailTab">
      <span className="recentMailTitle">Recent Mail</span>
      {/* Tab Navigation */}
      <div className="tabMenu">
        <button
          className={`tabButton ${activeTab === "all" ? "activeTab" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          전체
        </button>
        <button
          className={`tabButton ${activeTab === "sent" ? "activeTab" : ""}`}
          onClick={() => setActiveTab("sent")}
        >
          전송 이메일
        </button>
        <button
          className={`tabButton ${activeTab === "saved" ? "activeTab" : ""}`}
          onClick={() => setActiveTab("saved")}
        >
          저장된 이메일
        </button>
      </div>

      {/* mail list */}
      <div className="mailList">
        {filteredMails.map((mail) => (
          <div 
            className="mailItem"
            onClick={() => onMailClick(mail)}
          >
            <div className="mailItemLeft">
              <div className="mailItemLeftTop">
                <span>{mail.state}</span>
              </div>
              <div className="mailItemLeftBottom">
                <span>{mail.title}</span>
                <span>{mail.date}</span>
              </div>
            </div>
            <div className="mailItemRight">
              <div className="mailItemTo">
                <span>{mail.recipientName}</span>
              </div>
              <div className="mailItemButton">
                <button>&gt;</button>
              </div>
            </div>
          </div>
        ))}
        {filteredMails.length === 0 && <p>메일이 없습니다.</p>}
      </div>
    </div>
  )
};

export default RecentMailTab;