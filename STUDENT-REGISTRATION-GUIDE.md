# Student Registration Form - Complete Guide

## Overview

The Student Registration Form is a dedicated page for high school students to register for the special afternoon session **"Your Future Runs on AI"** featuring Dr. Timothy C. Summers, Ph.D., VP, CIO from Morgan State University.

**Event Details:**
- **Date:** Monday, May 4, 2026
- **Time:** 1:30 PM - 4:30 PM
- **Arrival:** 1:15 PM (please be on time)
- **Location:** Atlantis Cove, One Casino Drive, Suite 40, Paradise Island, Bahamas
- **Admission:** FREE (no cost)
- **Topic:** "How AI Is Changing the Delivery of Health Care in the World — Now and Beyond"

---

## How to Access the Student Registration Form

### URL Access

The student registration form is accessible at:

```
[Your Website URL]/student
```

**Examples:**
- Production: `https://your-domain.com/student`
- Local Development: `http://localhost:3000/student`
- Vercel Deployment: `https://your-app.vercel.app/student`

### Direct Link Sharing

You can share this link directly with:
- High school students
- Parents and guardians
- School administrators
- Teachers and counselors
- Community organizations

### QR Code (Optional)

For easy mobile access, you can generate a QR code that points to the `/student` URL using any QR code generator service.

---

## How the Student Form Works

### Page Structure

The student registration page consists of two main sections:

#### 1. **Invitation Section** (Top Half)
- Special student invitation header with gradient design
- Event details and timing
- Speaker information card featuring Dr. Timothy C. Summers
- Event details box with all important information
- Sign-off from Dr. Johnny Williams and Dr. Gloria Frelix

#### 2. **Registration Form** (Bottom Half)
- Student information fields
- Parent/Guardian information fields
- Submit button
- Success confirmation message

### Form Fields

The registration form collects 4 required fields:

| Field | Description | Required |
|-------|-------------|----------|
| **Student's Full Name** | First and last name of the student | ✅ Yes |
| **School Name** | Name of the student's school | ✅ Yes |
| **Parent or Guardian Full Name** | Full name of parent/guardian | ✅ Yes |
| **Parent or Guardian Email Address** | Email for parent/guardian contact | ✅ Yes |

### Form Validation

The form includes several validation checks:

1. **Required Fields Check**
   - All 4 fields must be filled out
   - Error message: "Please fill in all fields to complete your registration."

2. **Email Format Validation**
   - Parent email must be a valid email format
   - Browser automatically validates email format

3. **Duplicate Prevention**
   - Checks if parent email is already registered
   - Prevents duplicate registrations
   - Error message: "This email is already registered: [Name]"

### Submission Process

When a student submits the form:

1. **Client-Side Validation**
   - Checks all required fields are filled
   - Validates email format
   - Checks for duplicate email addresses

2. **Data Storage**
   - Registration is saved to Zustand store (browser localStorage)
   - Data is persisted in `data/registrations.json` file
   - Registration type is set to `'student'`

3. **Email Notification**
   - Automatic email sent to **theamonet@aol.com**
   - Email includes all student and parent information
   - Subject: "New Student Registration - Your Future Runs on AI"
   - Uses Formspree service for email delivery

4. **Success Confirmation**
   - Form is hidden
   - Success message is displayed with 🎉 emoji
   - Confirmation includes event details and arrival time
   - Registration timestamp is recorded

### Email Content

The email sent to theamonet@aol.com includes:

```
Subject: New Student Registration - Your Future Runs on AI

Student Name: [Student's Full Name]
School Name: [School Name]
Parent/Guardian Name: [Parent's Full Name]
Parent/Guardian Email: [Parent's Email]

Event Date: Monday, May 4, 2026
Event Time: 1:30 PM - 4:30 PM
Arrival Time: 1:15 PM
```

---

## How to View Student Registrations in Admin

### Accessing the Admin Dashboard

1. Navigate to: `[Your Website URL]/admin`
2. Login with credentials:
   - **Username:** admin
   - **Password:** conference1

### Viewing Students

1. Click on the **"Students"** tab in the navigation
2. You'll see a list of all student registrations

### Student Information Displayed

Each student registration shows:

- **Student Name** with 🎓 Student badge
- **School Name** with 🏫 icon
- **Parent/Guardian Information:**
  - Parent/Guardian Name
  - Parent/Guardian Email
- **Event Details Badges:**
  - 📅 Monday, May 4, 2026
  - 🕐 1:30 PM - 4:30 PM
  - ✅ FREE Admission
  - 🏁 Arrive by 1:15 PM
- **Registration Timestamp**
- **Delete Button** (to remove registration if needed)

### Student Count

The tab title shows the total number of registered students:
```
Student Registrations (5)
```

---

## How to Export Student Data

### Method 1: Excel/CSV Export

1. **Login to Admin Dashboard**
   - Go to `/admin`
   - Login with admin credentials

2. **Navigate to Overview Tab**
   - Click "Overview" in the navigation

3. **Export to Excel**
   - Click the **"Export Excel/CSV"** button
   - File downloads automatically as `conference-registrations.csv`

4. **Open in Excel or Google Sheets**
   - Open the downloaded CSV file
   - Filter by `registrationType` column = "student"
   - Student-specific columns include:
     - `studentName`
     - `schoolName`
     - `parentName`
     - `parentEmail`

### Method 2: PDF Report Export

1. **Login to Admin Dashboard**
   - Go to `/admin`
   - Login with admin credentials

2. **Navigate to Overview Tab**
   - Click "Overview" in the navigation

3. **Generate PDF Report**
   - Click the **"Export PDF Report"** button
   - HTML report opens in new tab
   - Use browser's Print function (Ctrl+P or Cmd+P)
   - Select "Save as PDF" as the printer

4. **PDF Contents**
   - Conference overview statistics
   - Separate sections for Speakers, Attendees, and Students
   - Complete student information including:
     - Student name and school
     - Parent/Guardian contact details
     - Registration date

### Method 3: JSON File Export

1. **Login to Admin Dashboard**
   - Go to `/admin`

2. **Navigate to Overview Tab**
   - Click "Overview"

3. **Export JSON**
   - Click **"Export All Data (JSON)"** button
   - File downloads as `conference-registrations.json`

4. **Filter Students Programmatically**
   ```javascript
   // Example: Filter students from JSON
   const data = require('./conference-registrations.json');
   const students = data.filter(reg => reg.registrationType === 'student');
   ```

### Method 4: Direct JSON File Access

For developers or advanced users:

1. **Access the Data File**
   - File location: `data/registrations.json`
   - Contains all registrations (speakers, attendees, students)

2. **Filter for Students**
   - Look for entries where `"registrationType": "student"`

3. **Student Data Structure**
   ```json
   {
     "id": "unique-id",
     "registrationType": "student",
     "fname": "John",
     "lname": "Doe",
     "email": "parent@email.com",
     "studentName": "John Doe",
     "schoolName": "Example High School",
     "parentName": "Jane Doe",
     "parentEmail": "parent@email.com",
     "bfast_mon": false,
     "bfast_tue": false,
     "lunch": false,
     "dinner": false,
     "vision_screening": false,
     "createdAt": "2026-04-01T05:42:00.000Z"
   }
   ```

### Method 5: Sync to JSON File

To ensure all data is saved to the JSON file:

1. **Login to Admin Dashboard**
2. **Navigate to Overview Tab**
3. **Click "Sync to JSON File"** button
4. Wait for "Data synced successfully!" message
5. Access `data/registrations.json` file directly

---

## Data Fields Reference

### Student Registration Fields

| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| `id` | string | Unique identifier | "abc123..." |
| `registrationType` | string | Always "student" | "student" |
| `fname` | string | First name (from studentName) | "John" |
| `lname` | string | Last name (from studentName) | "Doe" |
| `email` | string | Parent email (primary contact) | "parent@email.com" |
| `studentName` | string | Full name of student | "John Doe" |
| `schoolName` | string | Name of school | "Example High School" |
| `parentName` | string | Parent/Guardian full name | "Jane Doe" |
| `parentEmail` | string | Parent/Guardian email | "parent@email.com" |
| `createdAt` | string | Registration timestamp (ISO 8601) | "2026-04-01T05:42:00.000Z" |

### Fields Not Used by Students

Students do not use these fields (set to false/empty):
- `bfast_mon`, `bfast_tue`, `lunch`, `dinner` - Always false
- `vision_screening` - Always false
- `phone`, `org`, `jobtitle`, `city`, `zip` - Not collected
- `pref_spk`, `alt_spk`, `referral` - Not applicable
- Payment fields - Students attend for FREE

---

## Email Configuration

### Current Email Setup

- **Recipient:** theamonet@aol.com
- **Service:** Formspree
- **Endpoint:** `https://formspree.io/f/xdkoqpvd`
- **Subject:** "New Student Registration - Your Future Runs on AI"
- **Reply-To:** Parent/Guardian email address

### Email Delivery

- Emails are sent automatically upon form submission
- No manual intervention required
- Parent email is set as reply-to address
- Formspree handles email delivery

### Changing Email Recipient

To change where student registration emails are sent:

1. Open `app/student/page.tsx`
2. Find the Formspree fetch call (around line 55)
3. Update the Formspree endpoint or configure a new form at formspree.io
4. Or change to a different email service

---

## Troubleshooting

### Students Can't Access the Form

**Problem:** 404 error when accessing `/student`

**Solutions:**
1. Verify the development server is running
2. Check that `app/student/page.tsx` file exists
3. Clear browser cache and try again
4. Ensure the URL is correct (no extra slashes or typos)

### Form Submission Fails

**Problem:** Error message when submitting form

**Solutions:**
1. Check all 4 fields are filled out
2. Verify parent email is in valid format
3. Check if email is already registered (duplicate prevention)
4. Check browser console for error messages
5. Verify internet connection for email sending

### Emails Not Being Received

**Problem:** Confirmation email not arriving at theamonet@aol.com

**Solutions:**
1. Check spam/junk folder
2. Verify Formspree endpoint is correct
3. Check Formspree dashboard for delivery status
4. Ensure theamonet@aol.com is correct email address
5. Try submitting a test registration

### Students Not Showing in Admin

**Problem:** Registered students don't appear in admin dashboard

**Solutions:**
1. Refresh the admin page
2. Click on the "Students" tab specifically
3. Check browser localStorage (may need to sync)
4. Click "Sync to JSON File" button in admin
5. Check `data/registrations.json` file directly

### Duplicate Registration Error

**Problem:** "This email is already registered" message

**Solutions:**
1. This is intentional - prevents duplicate registrations
2. Use a different parent email address
3. Or delete the existing registration from admin first
4. Contact administrator to update existing registration

---

## Best Practices

### For Administrators

1. **Regular Data Backups**
   - Export data to Excel/CSV weekly
   - Keep backup copies of `data/registrations.json`
   - Download PDF reports for records

2. **Monitor Registrations**
   - Check admin dashboard daily during registration period
   - Verify email notifications are being received
   - Respond to parent inquiries promptly

3. **Data Management**
   - Use "Sync to JSON File" regularly
   - Export data before making bulk changes
   - Keep track of total student count

### For Sharing the Form

1. **Clear Instructions**
   - Provide the direct `/student` URL
   - Mention it's for high school students only
   - Emphasize FREE admission
   - Include arrival time (1:15 PM)

2. **Communication Channels**
   - Email to school administrators
   - Social media posts with link
   - School newsletters
   - Parent-teacher communications
   - QR codes on printed materials

3. **Deadline Management**
   - Set a registration deadline
   - Communicate "seats are limited"
   - Send reminder emails before deadline

---

## Technical Details

### Technology Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Inline styles (matching original HTML design)
- **State Management:** Zustand
- **Email Service:** Formspree
- **Data Storage:** JSON file + localStorage

### Browser Compatibility

The student form works on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Mobile Responsiveness

The form is fully responsive and works on:
- 📱 Smartphones (portrait and landscape)
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktop computers

---

## Quick Reference

### URLs

| Purpose | URL |
|---------|-----|
| Student Registration | `/student` |
| Admin Dashboard | `/admin` |
| Main Conference Registration | `/` |

### Admin Credentials

| Field | Value |
|-------|-------|
| Username | admin |
| Password | conference1 |

### Email Configuration

| Setting | Value |
|---------|-------|
| Recipient | theamonet@aol.com |
| Service | Formspree |
| Subject | New Student Registration - Your Future Runs on AI |

### Event Information

| Detail | Information |
|--------|-------------|
| Date | Monday, May 4, 2026 |
| Time | 1:30 PM - 4:30 PM |
| Arrival | 1:15 PM |
| Location | Atlantis Cove, One Casino Drive, Suite 40, Paradise Island, Bahamas |
| Cost | FREE |
| Speaker | Dr. Timothy C. Summers, Ph.D., VP, CIO |

---

## Support

For questions or issues:

**Contact:** Thea Monet
- **Email:** theamonet@aol.com
- **Phone:** (919) 696-0206
- Text messages are seen immediately!

---

## Changelog

### Version 1.0 (April 1, 2026)
- Initial release of student registration form
- Integration with admin dashboard
- Email notifications to theamonet@aol.com
- Export functionality for student data
- Duplicate prevention system
