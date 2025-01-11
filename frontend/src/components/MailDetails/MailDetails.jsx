import "./MailDetails.css";

const MailDetails = ({ mail }) => {
  return (
    <div id="mailDetailContainer">
      <div className="mailDetailLeft">
        <div className="mailDetailStatus">
          {mail.state}
        </div>
        <div className="mailDetailTitle">
          {mail.title}
        </div>
        <div className="mailDetailRecipientEmail">
          <span>받는 사람</span>
          <span>{mail.recipientEmail}</span>
        </div>
        <div className="mailDetailContent">
          {mail.content}
        </div>
      </div>
      <div className="mailDetailRight">
        <div className="mailDetailDate">
          {mail.date}
        </div>
        <div className="mailDetailRecipient">
          <span>To. {mail.recipientName}</span>
        </div>
      </div>
    </div>
  );
}

export default MailDetails;