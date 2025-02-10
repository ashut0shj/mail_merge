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




## 📄 Example Google Sheet  

<table>  
  <thead>  
    <tr>  
      <th>Recipient</th>  
      <th>Name</th>  
      <th>Date</th>  
      <th>Time</th>  
      <th>MeetingLink</th>  
      <th>CC Recipients</th>  
      <th>Email Sent</th>  
    </tr>  
  </thead>  
  <tbody>  
    <tr>  
      <td>user1@example.com</td>  
      <td>Alice</td>  
      <td>12th Feb</td>  
      <td>3 PM</td>  
      <td><a href="http://meet.com/alice">Meeting Link</a></td>  
      <td>cc1@example.com</td>  
      <td></td>  
    </tr>  
    <tr>  
      <td>user2@example.com</td>  
      <td>Bob</td>  
      <td>13th Feb</td>  
      <td>4 PM</td>  
      <td><a href="http://meet.com/bob">Meeting Link</a></td>  
      <td>cc2@example.com</td>  
      <td></td>  
    </tr>  
    <tr>  
      <td>user3@example.com</td>  
      <td>Charlie</td>  
      <td>14th Feb</td>  
      <td>5 PM</td>  
      <td><a href="http://meet.com/charlie">Meeting Link</a></td>  
      <td>cc3@example.com</td>  
      <td></td>  
    </tr>  
  </tbody>  
</table>  

📌 **Placeholders** like `{{Name}}`, `{{Date}}`, and `{{MeetingLink}}` are automatically replaced with values from the sheet.  

#### **Body:**  
```html
Hello {{Name}},  

Your meeting is scheduled on **{{Date}}** at **{{Time}}**.  
Click <a href="{{MeetingLink}}">here</a> to join.  

Looking forward to your participation!  

Best,  
Team
