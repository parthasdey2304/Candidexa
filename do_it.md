# Candidexa Page Map and Google Stitch Specification

## Product summary

Candidexa is an AI-powered job-application workspace. A candidate uploads a verified resume, provides a job description, receives a transparent fit analysis, creates a truthful tailored resume and cover letter, and tracks the application.

Candidexa must not invent experience, skills, certifications, employers, dates, or achievements. It should prepare applications while keeping the candidate in control of final submission.

---

# Site map

## Public pages

### 1. Landing page — `/`

Purpose: Explain Candidexa and convert visitors into registered users.

Content:

- Headline: “Apply with a resume built for the role.”
- Explanation of job-specific resume tailoring.
- Product preview.
- Three-step workflow.
- Main features.
- Privacy and truthful-AI promise.
- Pricing teaser.
- Frequently asked questions.
- Sign-up and sign-in actions.

Primary actions:

- Create my application.
- See how it works.
- View pricing.

### 2. Features — `/features`

Purpose: Explain the main capabilities.

Features:

- Resume analysis.
- Job-description matching.
- ATS-readiness checks.
- Skill-gap identification.
- Tailored resume creation.
- Cover-letter generation.
- Application tracking.
- Evidence-based AI suggestions.

### 3. How it works — `/how-it-works`

Purpose: Show the complete candidate journey.

Steps:

1. Upload or create a resume.
2. Paste or select a job description.
3. Analyze the match.
4. Review suggested changes.
5. Generate tailored documents.
6. Track the application.

### 4. Pricing — `/pricing`

Purpose: Show plans and usage limits.

Include:

- Free plan.
- Candidate plan.
- Monthly usage limits.
- Resume and AI-generation limits.
- Clear cancellation information.
- No guarantee of interviews or employment.
- FAQ.

The initial experimental paid price can be displayed as ₹29/month, but it must be configurable from the backend.

### 5. Privacy — `/privacy`

Purpose: Explain how candidate information, resumes, job descriptions, and generated documents are handled.

Include:

- Data collection.
- Resume storage.
- AI processing.
- Data deletion.
- Data export.
- Third-party service disclosures.
- Contact information.

### 6. Terms — `/terms`

Purpose: Define acceptable use, user responsibilities, AI limitations, payments, and prohibited activity.

### 7. Contact/help — `/contact` or `/help`

Purpose: Allow users to report problems, ask questions, or request account assistance.

---

# Authentication pages

## 8. Sign up — `/sign-up`

Purpose: Create a Candidexa account.

Elements:

- Name.
- Email.
- Password.
- Confirm password.
- Terms and Privacy checkbox.
- Google sign-up option.
- Password-strength indicator.
- Validation and error messages.
- Link to sign in.

## 9. Sign in — `/sign-in`

Purpose: Authenticate an existing user.

Elements:

- Email.
- Password.
- Remember-me option.
- Google sign-in.
- Forgot-password link.
- Invalid-credentials state.
- Link to sign up.

## 10. Forgot password — `/forgot-password`

Purpose: Start account recovery.

Elements:

- Email input.
- Submit button.
- Neutral success message that does not reveal whether the email exists.
- Link back to sign in.

## 11. Reset password — `/reset-password`

Purpose: Set a new password using a short-lived reset token.

Elements:

- New password.
- Confirm password.
- Password rules.
- Expired-token state.
- Successful-reset state.

## 12. Onboarding — `/onboarding`

Purpose: Collect enough information to personalize the dashboard.

Steps:

1. Target role.
2. Preferred location.
3. Remote, hybrid, or onsite preference.
4. Experience level.
5. Industries of interest.
6. Resume upload or start-from-scratch choice.

---

# Authenticated application pages

## 13. Dashboard — `/dashboard`

Purpose: Give the candidate a useful overview after login.

Display:

- Greeting.
- Resume-readiness score.
- Saved jobs.
- Active applications.
- Monthly AI usage.
- Recent job matches.
- Recent applications.
- Onboarding checklist.
- Main “Match a new job” button.

Desktop: left sidebar navigation.

Mobile: top bar and bottom navigation.

## 14. Candidate profile — `/profile`

Purpose: Manage the candidate’s source information.

Fields:

- Name.
- Professional headline.
- Location.
- Email.
- Phone.
- Portfolio.
- LinkedIn URL.
- GitHub URL.
- Target roles.
- Preferred locations.
- Work authorization.
- Availability.
- Skills.
- Languages.

Each item should be marked as verified, user-added, suggested, or requiring confirmation.

## 15. My Resume — `/resume`

Purpose: Manage the candidate’s master resume and versions.

Features:

- Current master resume.
- Resume readiness status.
- ATS parseability indicator.
- Last updated date.
- Resume versions.
- Edit.
- Preview.
- Duplicate.
- Download PDF.
- Download DOCX.
- Delete with confirmation.

## 16. Resume upload — `/resume/upload`

Purpose: Import a PDF or DOCX resume.

States:

- Empty upload state.
- Drag-and-drop state.
- Upload progress.
- Parsing state.
- Successful extraction.
- Fields requiring confirmation.
- Unsupported file type.
- Oversized file.
- Parsing failure.

The system must never silently create information that was not present in the uploaded resume.

## 17. Resume editor — `/resume/[resumeId]/edit`

Purpose: Edit the master resume and verified candidate information.

Sections:

- Summary.
- Experience.
- Education.
- Projects.
- Skills.
- Certifications.
- Achievements.
- Languages.

Actions:

- Add section.
- Edit section.
- Reorder section.
- Save version.
- Preview.
- Download.

## 18. Find jobs — `/jobs`

Purpose: Discover jobs from permitted sources or user-provided data.

Features:

- Search by title, company, or skill.
- Location filter.
- Remote, hybrid, and onsite filter.
- Experience filter.
- Salary filter.
- Job-source filter.
- Sort by match, newest, or relevance.
- Save job.
- Review job.

Initial safe workflow:

- User pastes a job description.
- User provides a job URL.
- Candidexa uses permitted feeds or employer sources.
- Candidexa does not promise unauthorized automatic applications.

## 19. Job details — `/jobs/[jobId]`

Purpose: Show the complete job opportunity.

Display:

- Job title.
- Company.
- Location.
- Work mode.
- Date posted.
- Source.
- Job description.
- Key requirements.
- Match this job action.
- Save job action.
- Review application action.

## 20. Match a job — `/match`

Purpose: Accept the job description and start analysis.

Inputs:

- Job description textarea.
- Optional job URL.
- Resume version selector.
- Analyze job fit button.

Loading stages:

1. Reading job description.
2. Extracting requirements.
3. Comparing verified experience.
4. Preparing analysis.

Display a notice:

> Candidexa will not add experience you do not have.

## 21. Job-match analysis — `/match/[matchId]`

Purpose: Explain how well the candidate fits the selected role.

Display:

- Match score.
- Strong, partial, or weak match label.
- Matched skills.
- Missing or weakly evidenced skills.
- Experience alignment.
- Education alignment.
- Certification alignment.
- ATS keyword coverage.
- Transferable skills.
- Evidence supporting each match.
- Recommendations.

Actions:

- Tailor resume.
- Generate cover letter.
- Save job.
- Export analysis.

Disclaimer:

> This is an estimate, not a hiring decision.

## 22. Skill-gap details — `/match/[matchId]/skills/[skillId]`

Purpose: Explain one missing or weakly supported skill.

Display:

- Skill name.
- Required, preferred, or bonus importance.
- Evidence found.
- Evidence not found.
- Truthful improvement suggestions.
- Add real project or certification evidence.
- Return to analysis.

## 23. Tailored resume preview — `/resume/tailor/[matchId]`

Purpose: Let the candidate review a role-specific resume.

Desktop layout:

- Left: job requirements and candidate evidence.
- Center: resume preview.
- Right: change summary and ATS-readiness checks.

Change labels:

- Reordered.
- Rephrased.
- Added from profile.
- Requires confirmation.
- User-edited.

Actions:

- Accept change.
- Reject change.
- Accept safe changes.
- Restore original.
- Download PDF.
- Download DOCX.
- Save as application version.

Mobile layout:

- Tabs for Resume, Changes, and Checks.
- Sticky review action.
- Readable document preview.

## 24. Cover-letter generator — `/cover-letter/[matchId]`

Purpose: Create a job-specific cover letter using verified candidate information.

Controls:

- Selected job.
- Selected resume.
- Tone.
- Length.
- Generate.
- Regenerate.
- Edit.
- Copy.
- Download.
- Save.

Show evidence chips indicating which candidate facts were used.

## 25. Tailored applications — `/applications/tailored`

Purpose: Display all generated resumes and cover letters.

Features:

- Filter by job.
- Filter by company.
- Sort by newest.
- Preview.
- Edit.
- Duplicate.
- Download.
- Delete.

## 26. Application tracker — `/applications`

Purpose: Track the progress of every job application.

Desktop columns:

- Saved.
- Applied.
- Screening.
- Interview.
- Offer.
- Rejected.

Mobile: filterable list instead of a wide Kanban board.

Application cards show:

- Role.
- Company.
- Date.
- Source.
- Match score.
- Current status.
- Next action.
- Follow-up date.

## 27. Application detail — `/applications/[applicationId]`

Purpose: Manage one application in detail.

Display:

- Company.
- Role.
- Location.
- Source.
- Status.
- Match score.
- Selected resume.
- Cover letter.
- Timeline.
- Notes.
- Next action.
- Follow-up reminder.

Actions:

- Change status.
- Add note.
- Set reminder.
- Edit application.
- Delete application with confirmation.

## 28. Add application — `/applications/new`

Purpose: Manually add an application.

Fields:

- Company.
- Role.
- Job URL.
- Date applied.
- Status.
- Notes.
- Follow-up date.
- Resume version.

---

# Account and system pages

## 29. Settings — `/settings`

Sections:

- Account details.
- Login and security.
- Notifications.
- AI preferences.
- Subscription and billing.
- Privacy and data.
- Delete account.

## 30. Privacy and data controls — `/settings/privacy`

Features:

- Uploaded-file list.
- Data-retention explanation.
- Delete resume.
- Download data.
- Consent history.
- AI-processing information.

## 31. Subscription and billing — `/settings/billing`

Display:

- Current plan.
- Usage.
- Renewal date.
- Payment status.
- Upgrade.
- Cancel.
- Billing history.

Never trust plan or payment status from the client. The backend must be the source of truth.

## 32. Notifications — `/settings/notifications`

Options:

- Application reminders.
- Follow-up reminders.
- Resume-generation completion.
- Product updates.

## 33. Help and feedback — `/settings/help`

Features:

- Frequently asked questions.
- Contact support.
- Report a problem.
- Product feedback.

## 34. 404 page — `/not-found`

Purpose: Explain that the requested page does not exist and provide links to Dashboard and Find Jobs.

## 35. Error page — `error.tsx`

Purpose: Display a safe error message, retry action, and support link without exposing technical details.

## 36. Loading states — `loading.tsx`

Purpose: Provide skeletons and progress states for dashboard, job results, resume parsing, AI analysis, and document generation.

---

# Core user flows

## First-time candidate

Landing page → Sign up → Onboarding → Upload resume → Confirm extracted information → Dashboard → Match a job → Review analysis → Tailor resume → Generate cover letter → Save application.

## Returning candidate

Sign in → Dashboard → Find Jobs → Job details → Match analysis → Tailored resume → Application tracker.

## Mobile candidate

Sign in → Mobile dashboard → Match a job → Job-match analysis → Review tailored resume → Save application.

---

# Google Stitch master prompt

Copy the following prompt into Stitch:

```text
Design a complete responsive web application called Candidexa.

Candidexa is an AI-powered job-application workspace for students, graduates, and working professionals. It compares a candidate’s verified resume with a job description, explains the match, identifies missing evidence, creates a truthful tailored resume and cover letter, and tracks applications.

Important product rule: Candidexa must never invent employment history, skills, certifications, dates, employers, projects, or achievements. The candidate must review every AI-generated change before using it. Do not promise employment or guaranteed interviews.

Create desktop, laptop, tablet, and mobile layouts. The implementation target is Next.js with React, TypeScript, and Tailwind CSS. Use reusable components suitable for shadcn/ui, Aceternity UI, and React Bits. The production app will use GSAP and ScrollTrigger for restrained marketing-page animation and Three.js only for lightweight, purposeful visualizations.

Brand personality:

- Trustworthy.
- Intelligent.
- Encouraging.
- Modern.
- Clear.
- Professional.
- Affordable.

Visual system:

- Light theme.
- Navy text #172033.
- Primary indigo #4F46E5.
- Blue #2563EB.
- Mint #10B981.
- Background #F8FAFC.
- White cards.
- Border #E2E8F0.
- Muted text #64748B.
- Warning #D97706.
- Error #DC2626.
- Use Inter or a similar accessible sans-serif font.
- Use an 8px spacing system.
- Use 12px–16px corner radii.
- Use restrained shadows.
- Avoid excessive gradients, glassmorphism, noisy backgrounds, fake testimonials, and overly decorative animation.
- Maintain WCAG-friendly contrast.
- Use visible keyboard focus states.
- Use minimum 44px touch targets on mobile.

Desktop navigation:

Use a fixed left sidebar with the Candidexa logo and these items:

- Dashboard.
- Profile.
- My Resume.
- Find Jobs.
- Match a Job.
- Tailored Applications.
- Application Tracker.
- Settings.

Mobile navigation:

Use a compact top bar and bottom navigation for Dashboard, Jobs, Applications, and Profile. Use a mobile menu sheet for secondary pages. Do not merely shrink the desktop sidebar.

Shared components:

- Candidexa logo.
- PageHeader.
- PrimaryButton.
- SecondaryButton.
- Card.
- StatCard.
- JobCard.
- SkillChip.
- MatchScoreRing.
- ResumePreview.
- ResumeSectionCard.
- ResumeChangeItem.
- ApplicationCard.
- StatusBadge.
- UploadDropzone.
- EmptyState.
- LoadingSkeleton.
- ErrorState.
- Toast.
- Dialog.
- MobileBottomNav.

Create the following screens in connected batches instead of one giant generation:

BATCH 1 — Public and onboarding:

1. Landing page.
2. Sign-up page.
3. Sign-in page.
4. Onboarding page.

BATCH 2 — Candidate workspace:

1. Dashboard.
2. Candidate profile.
3. Resume upload.
4. My Resume.

BATCH 3 — Job matching:

1. Find Jobs.
2. Job details.
3. Match a Job.
4. Job-match analysis.

BATCH 4 — Documents and applications:

1. Tailored resume preview.
2. Cover-letter generator.
3. Tailored applications.
4. Application tracker.

BATCH 5 — Account:

1. Application detail.
2. Pricing.
3. Settings.
4. Privacy and data controls.

For each screen, include realistic fictional data plus loading, empty, success, validation, and error states. Do not use real people’s private information.

Landing page requirements:

- Hero headline: “Apply with a resume built for the role.”
- Supporting copy about verified, job-specific tailoring.
- CTA: “Create my application.”
- Secondary CTA: “See how it works.”
- Product preview with match score, matched skills, missing skills, and resume changes.
- Three-step explanation.
- Feature cards.
- Privacy section.
- Pricing teaser.
- Footer.

Dashboard requirements:

- Greeting.
- Resume readiness.
- Saved jobs.
- Active applications.
- Monthly AI usage.
- Recent job matches.
- Recent applications.
- Onboarding checklist.
- Main action: “Match a new job.”

Match-analysis requirements:

- MatchScoreRing with an example score.
- Matched skills.
- Missing or weakly evidenced skills.
- Evidence mapping from resume to job requirement.
- ATS-readiness signals.
- Education and certification alignment.
- Transferable skills.
- Buttons for Tailor resume, Generate cover letter, and Save job.
- Disclaimer: “This is an estimate, not a hiring decision.”

Tailored-resume requirements:

Desktop should have three areas:

- Job requirements and source evidence.
- Editable resume preview.
- Change summary and checks.

Mark changes as Reordered, Rephrased, Added from profile, Requires confirmation, or User-edited. Include Accept, Reject, Restore original, Download PDF, and Download DOCX actions.

Mobile should use tabs named Resume, Changes, and Checks.

Application-tracker requirements:

Desktop should use Kanban columns:

- Saved.
- Applied.
- Screening.
- Interview.
- Offer.
- Rejected.

Mobile should use a filterable list of cards.

Animation rules:

- Use subtle GSAP entrance animation on the marketing hero.
- Use ScrollTrigger for feature and workflow reveals.
- Do not hijack scrolling.
- Do not animate essential content out of view.
- Respect prefers-reduced-motion.
- Keep dashboard animation minimal.
- Use Three.js only for a lightweight candidate-skill-to-job-requirement visualization with a static fallback.
- Do not use a heavy 3D scene behind important text.

Generate the first batch only. Establish the design system and reusable components before generating the remaining batches. Keep all screens visually consistent. After each batch, preserve the previous design language and use it as the reference for the next batch.
```

---

# Stitch workflow

1. Start with the master prompt and generate Batch 1.
2. Save the project and preserve the generated visual language.
3. Generate Batch 2 using Batch 1 as the visual reference.
4. Generate Batch 3 using the dashboard and match-analysis style as references.
5. Generate Batch 4 using the resume preview and dashboard as references.
6. Generate Batch 5 using the same design tokens.
7. Use Stitch for the visual prototype and interaction structure.
8. Rebuild the final product as reusable Next.js components.
9. Add real authentication, database, file storage, AI services, and billing separately through the backend.

Do not ask Stitch to generate all pages in a single prompt. Generate related screens in batches and use focused revision prompts for mobile, accessibility, spacing, and component consistency.
