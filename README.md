# Google Sheets Mail Merge with Gmail  

This script automates sending personalized emails using **Google Sheets and Gmail**. It fetches recipient details from a Google Sheet and merges them into a Gmail draft before sending emails automatically.  

---

## ✨ Features  

- ✅ **Automated Email Sending** – Sends emails based on data in Google Sheets.  
- ✅ **Personalized Emails** – Supports placeholders for dynamic content.  
- ✅ **CC Support** – Adds multiple CC recipients.  
- ✅ **Email Status Tracking** – Logs sent emails to avoid duplicates.  
- ✅ **Inline Images & Attachments** – Preserves Gmail draft formatting.  
- ✅ **Customizable Subject Line** – Uses a draft with a matching subject.  

---

## 📌 How It Works  

### 1️⃣ Store your email data in Google Sheets  
- The sheet should have at least these columns:  
  - **"Recipient"** (Email ID)  
  - **"CC Recipients"** (Optional)  
  - **"Email Sent"** (To track sent emails)  
- Add any **custom placeholders** you need, like `{{Name}}`, `{{Date}}`, etc.  

### 2️⃣ Prepare a Gmail draft  
- Use **placeholders** in the subject/body like `{{Name}}` or `{{MeetingLink}}`.  
- **Include attachments and inline images** if needed.  

### 3️⃣ Run the script  
- Select **"Mail Merge" → "Send Emails"** from the menu.  
- The script will:  
  - Fetch data from the sheet  
  - Replace placeholders in the draft  
  - Send emails only to **unsent recipients**  

---

## ⚙️ Setup Guide  

1. **Open Google Sheets**  
2. Click on **Extensions** → **Apps Script**  
3. **Paste the script** provided in the `Code.gs` file  
4. Save and **refresh** the sheet  
5. A new `"Mail Merge"` menu will appear  

---

## 📨 Using Placeholders in Emails  

You can add placeholders in your Gmail draft for **dynamic content**:  

### 📧 Example Draft Email:  

```html
Hello {{Name}},  

Your meeting is scheduled on {{Date}}.  
Click [here]({{MeetingLink}}) to join.  

Best,  
Team
