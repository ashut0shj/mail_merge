const RECIPIENT_COL = "Recipient";
const EMAIL_SENT_COL = "Email Sent";
const CC_RECIPIENTS_COL = "CC Recipients";

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Mail Merge').addItem('Send Emails', 'sendEmails').addToUi();
}

function sendEmails(subjectLine, sheet = SpreadsheetApp.getActiveSheet()) {
  if (!subjectLine) {
    subjectLine = Browser.inputBox(
      "Mail Merge",
      "Type the subject line of the Gmail draft message \n\n(Made by ashut0sh):",
      Browser.Buttons.OK_CANCEL
    );
    if (subjectLine === "cancel" || subjectLine == "") return;
  }

  const emailTemplate = getGmailTemplateFromDrafts_(subjectLine);
  const dataRange = sheet.getDataRange();
  const data = dataRange.getDisplayValues();
  const heads = data.shift();
  const emailSentColIdx = heads.indexOf(EMAIL_SENT_COL);
  const ccRecipientsColIdx = heads.indexOf(CC_RECIPIENTS_COL);
  const obj = data.map(r => heads.reduce((o, k, i) => ((o[k] = r[i] || ""), o), {}));
  const out = [];

  obj.forEach(row => {
    if (row[EMAIL_SENT_COL] == "") {
      try {
        const msgObj = fillInTemplateFromObject_(emailTemplate.message, row);
        const ccRecipients = row[CC_RECIPIENTS_COL] || "";

        GmailApp.sendEmail(row[RECIPIENT_COL], msgObj.subject, msgObj.text, {
          htmlBody: msgObj.html,
          cc: ccRecipients,
          //name: "Name",
          attachments: emailTemplate.attachments,
          inlineImages: emailTemplate.inlineImages,
        });

        out.push([new Date()]);
      } catch (e) {
        out.push([e.message]);
      }
    } else {
      out.push([row[EMAIL_SENT_COL]]);
    }
  });

  sheet.getRange(2, emailSentColIdx + 1, out.length).setValues(out);
}

function getGmailTemplateFromDrafts_(subject_line) {
  try {
    const drafts = GmailApp.getDrafts();
    const draft = drafts.filter(subjectFilter_(subject_line))[0];
    const msg = draft.getMessage();
    const allInlineImages = msg.getAttachments({ includeInlineImages: true, includeAttachments: false });
    const attachments = msg.getAttachments({ includeInlineImages: false });
    const htmlBody = msg.getBody();
    const img_obj = allInlineImages.reduce((obj, i) => (obj[i.getName()] = i, obj), {});
    const imgexp = RegExp('<img.*?src="cid:(.*?)".*?alt="(.*?)"[^\>]+>', 'g');
    const matches = [...htmlBody.matchAll(imgexp)];
    const inlineImagesObj = {};
    matches.forEach(match => inlineImagesObj[match[1]] = img_obj[match[2]]);

    return {
      message: { subject: subject_line, text: msg.getPlainBody(), html: htmlBody },
      attachments: attachments,
      inlineImages: inlineImagesObj
    };
  } catch (e) {
    throw new Error("Oops - can't find Gmail draft");
  }
}

function subjectFilter_(subject_line) {
  return function (element) {
    if (element.getMessage().getSubject() === subject_line) return element;
  };
}

function fillInTemplateFromObject_(template, data) {
  let template_string = JSON.stringify(template);
  template_string = template_string.replace(/{{[^{}]+}}/g, key => escapeData_(data[key.replace(/[{}]+/g, "")] || ""));
  return JSON.parse(template_string);
}

function escapeData_(str) {
  return str
    .replace(/[\\]/g, '\\\\')
    .replace(/[\"]/g, '\\\"')
    .replace(/[\/]/g, '\\/')
    .replace(/[\b]/g, '\\b')
    .replace(/[\f]/g, '\\f')
    .replace(/[\n]/g, '\\n')
    .replace(/[\r]/g, '\\r')
    .replace(/[\t]/g, '\\t');
}

