<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🚀 Musthak Ali's AI-Powered Portfolio

An innovative, interactive portfolio website featuring AI-driven chat capabilities, separate About and Contact pages, and modern design.

View your app in AI Studio: https://ai.studio/apps/drive/1Onh0M1_X-qf972nbc3PZ10cIMrrS09M3

## ✨ Features

### Pages
- **Home**: Hero section with featured projects, skills showcase, and AI chat widget
- **About** (`/#about`): Full biography, achievements, and personal interests
- **Contact** (`/#contact`): Advanced contact form with email integration and resume download

### Interactive Elements
- 🤖 AI Chat Widget powered by Google Gemini API
- 📧 Contact form with real-time validation and email submission via Formspree
- 🎨 Glassmorphism design with smooth animations
- 📱 Fully responsive and mobile-first
- ⌨️ Accessible form fields and navigation

## Run Locally

**Prerequisites:** Node.js (v18+)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file and add:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:3000`

## 📧 Email Setup

The contact form uses **Formspree** for email handling.

### Quick Setup:
1. Go to https://formspree.io and create a free account
2. Create a new form and get your Form ID
3. Update `/services/emailService.ts` with your Form ID
4. Done! Emails will be sent to `mohamadmusthakali@gmail.com`

For detailed setup instructions, see [CONTACT_PAGE_SETUP.md](./CONTACT_PAGE_SETUP.md)

## 🏗️ Project Structure

```
src/
├── pages/
│   ├── AboutPage.tsx          # About page
│   └── ContactPage.tsx        # Contact page with form
├── components/
│   ├── ChatWidget.tsx         # AI chat interface
│   ├── ContactSection.tsx     # Mini contact on home
│   ├── Hero.tsx               # Landing section
│   ├── ProjectCard.tsx        # Project showcase
│   └── ...other components
├── services/
│   ├── geminiService.ts       # Google Gemini API
│   └── emailService.ts        # Formspree integration
├── App.tsx                    # Main app with routing
└── constants.tsx              # Data & configuration
```

## 🔗 Navigation

- `/#` → Home
- `/#about` → About page
- `/#contact` → Contact page
- `/#projects` → Projects section (scrolls on home)
- `/#services` → Services section (scrolls on home)

## 🛠️ Build & Deploy

### Build for production:
```bash
npm run build
```

### Preview production build:
```bash
npm run preview
```

### Deploy to Vercel:
```bash
vercel
```

### Deploy to Netlify:
```bash
npm run build
# Drag dist/ folder to Netlify
```

## 🔧 Customization

### Update Personal Info
Edit `constants.tsx`:
- Name, bio, social links
- Skills and projects
- Contact email

### Update Profile Image
Replace `/assets/images/profile_pic.jpeg` with your image

### Update Resume
Replace `/assets/resume/musty_Resume2.0-1-1.pdf` with your resume

### Update Social Links
In `constants.tsx`, update:
```typescript
socials: {
  linkedin: "your_linkedin_url",
  github: "your_github_url",
  behance: "your_behance_url"
}
```

## 🤖 AI Chat Widget

The chat widget uses Google's Gemini API to answer questions about your portfolio.

### To customize:
1. Edit system instructions in `/services/geminiService.ts`
2. Modify styling in `/components/ChatWidget.tsx`
3. Update training data in `constants.tsx`

## 📦 Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Google Gemini API** - AI chat
- **Formspree** - Email handling
- **Lucide React** - Icons

## 📄 License

© 2025 F. Mohamad Musthak Ali. All rights reserved.

## 🤝 Contributing

This is a personal portfolio. For suggestions or issues, feel free to create an issue.

---

Built with ❤️ using React, Tailwind, and AI
