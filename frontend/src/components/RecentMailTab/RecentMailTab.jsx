import { useState } from "react";
import "./RecentMailTab.css";

const RecentMailTab = ({ mails, onMailClick }) => {
  const [activeTab, setActiveTab] = useState("all");
  const sentCount = mails.filter((mail) => mail.state === "SENT").length;
  const savedCount = mails.filter((mail) => mail.state === "SAVED").length;

  // 필터링
  const filteredMails = mails.filter((mail) => {
    if(activeTab === "all") return true;
    return mail.state === activeTab;
  })

  return (
    <div id="recentMailTab">
      {/* Tab Navigation */}
      <div className="tabMenu">
        <button
          className={`tabButton ${activeTab === "all" ? "activeTab" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          전체({mails.length})
        </button>
        <button
          className={`tabButton ${activeTab === "SENT" ? "activeTab" : ""}`}
          style={{ marginLeft: '-1rem'}}
          onClick={() => setActiveTab("SENT")}
        >
          보낸 이메일({sentCount})
        </button>
        <button
          className={`tabButton ${activeTab === "SAVED" ? "activeTab" : ""}`}
          onClick={() => setActiveTab("SAVED")}
        >
          저장한 이메일({savedCount})
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
                <span
                  className={`mailItemState ${mail.state}`}
                >
                  {mail.state === "SAVED" ? "보관" : "전송"}
                </span>
              </div>
              <div className="mailItemLeftBottom">
                <span className="mailItemTitle">{mail.generatedTitle}</span>
                <span className="mailItemDate">{mail.createAt}</span>
              </div>
            </div>
            <button className="mailItemRight">
              <div className="mailItemTo">
                <span>To. {mail.recipientEmail}</span>
              </div>
              <div className="mailItemButton">
                <span><b>&gt;</b></span>
              </div>
            </button>
          </div>
        ))}
        {filteredMails.length === 0 && <p>메일이 없습니다.</p>}
      </div>
    </div>
  )
};

export default RecentMailTab;