import React from "react";
import { firebaseFunctions, httpsCallable } from "../firebase/firebaseConfig";
import { useAuth } from "../utils/AuthContext";

const MailBox = () => {
  const { user } = useAuth();

  const sendMail = async () => {
    const userEmail = user?.email || null;
    const emailData = {
      to: userEmail,
      from: "cookbookpro.cis3296@gmail.com",
      subject: "Testing Cloud Functions Email",
      text: "Send From Cookbook-Pro!",
    };

    const sendMailFunction = httpsCallable(firebaseFunctions, "sendMail");
    try {
      const result = await sendMailFunction(emailData);
    } catch (err) {
      console.error("Error sending email:", err);
    }
  };

  return (
    <div>
      {/* Button to trigger sending the email */}
      <button onClick={sendMail}>Send Email</button>
    </div>
  );
};

export default MailBox;
