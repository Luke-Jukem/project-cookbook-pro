const cors = require("cors")({ origin: true });
const functions = require("firebase-functions");
const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(functions.config().sendgrid.key);

exports.sendMail = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    console.log("Request received:", request.method, request.url);

    const data = request.body.data; // Accessing the nested 'data' object

    console.log("Request data:", data);

    const msg = {
      to: data.to,
      from: data.from,
      subject: data.subject,
      text: data.text,
      html: data.html,
    };

    console.log("Message to send:", msg);

    try {
      await sendgrid.send(msg);
      console.log("Email sent successfully");
      response.json({ data: { success: true } }); // Send back response with 'data' field
    } catch (err) {
      console.error("Error sending email:", err);
      response
        .status(500)
        .json({ data: { success: false, error: err.toString() } }); // Send back response with 'data' field
    }
  });
});
