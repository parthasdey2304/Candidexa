<div align="center">
  <h1>Candidexa 🚀</h1>
  <p><strong>The Intelligent Career Workspace</strong></p>
  <p>Apply with a resume built specifically for the role you want. Stop guessing and start matching with AI-powered insights, automated tailoring, and deep experience tracking.</p>

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![Three.js](https://img.shields.io/badge/Three.js-3D-black?logo=three.js)](https://threejs.org/)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
</div>

<hr />

## 🌟 Overview

Candidexa is a next-generation platform designed for modern job seekers. In a hyper-competitive job market, sending the same generic resume to every employer is no longer effective. Candidexa uses advanced parsing and AI to dynamically compare your core profile against specific job descriptions, giving you an exact **Match Score**. 

Once you know where you stand, Candidexa can automatically tailor your resume to highlight the experiences and skills that matter most to that specific employer—all while keeping your information 100% truthful.

## ✨ Core Features

- **Interactive 3D Workspace**: A stunning, premium "Deep Obsidian" dark mode UI with interactive Three.js environments, dynamic GSAP scroll reveals, and elegant glassmorphism. It's not just a tool; it's an immersive experience.
- **Instant Match Analysis**: Paste a job description and instantly see your Match Score. Find exactly what skills you're missing before you apply, broken down by mandatory requirements, nice-to-haves, and cultural fit.
- **AI Resume Tailoring**: Automatically adapt your baseline resume to highlight the most relevant experience for every single application. Say goodbye to manual tweaking.
- **Career Dashboard**: Track all your tailored applications, cover letters, and interviews in one highly organized space. Never lose track of which version of your resume you sent to which company.
- **Smart Cover Letters**: Generate hyper-personalized cover letters that align your background perfectly with the company's mission and the role's requirements.

## 🛠 Architecture & Tech Stack

Candidexa is built on a modern, high-performance stack:

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org) (App Router) for Server-Side Rendering (SSR) and optimal SEO.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) combined with [Shadcn UI](https://ui.shadcn.com/) for a robust, accessible component library.
- **State Management**: React Context & Hooks.
- **3D & Animations**: 
  - [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) & [Drei](https://github.com/pmndrs/drei) for the interactive 3D hero sections and background canvas.
  - [Framer Motion](https://www.framer.com/motion/) for fluid page transitions and micro-interactions.
  - [GSAP](https://gsap.com/) & ScrollTrigger for high-performance scroll-based reveal animations.
- **Icons**: [Lucide React](https://lucide.dev/) for crisp, scalable vector icons.

## 🎨 Design System

Candidexa features a custom **Spatial & Immersive** design language designed to wow users from the first click:

1. **Deep Obsidian Theme**: A highly refined dark mode (`#060e20` background) that maximizes the luminosity of our Electric Indigo (`#6366f1`) accent colors.
2. **Glassmorphism**: Extensive use of backdrop blurs and tonal layering (`bg-card/60 backdrop-blur-xl`) establishes spatial hierarchy without relying on heavy, muddy shadows.
3. **Fluid Layout**: Fully responsive, mobile-first design scaling elegantly across mobile, tablet, and ultra-wide desktop viewports. The layout utilizes CSS Grid and Flexbox for perfect alignment.
4. **Dynamic Micro-interactions**: Tilt-responsive 3D cards that follow your mouse, animated scroll indicators, and scroll-triggered section reveals that make the page feel alive.

## 🚀 Getting Started

Follow these steps to get a local development environment up and running.

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/parthasdey2304/Candidexa.git
   cd Candidexa
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your necessary API keys (e.g., Database URIs, AI API keys if applicable).

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```text
Candidexa/
├── app/                  # Next.js App Router (Pages, Layouts, API Routes)
│   ├── (auth)/           # Authentication pages (Sign In, Sign Up)
│   ├── dashboard/        # Main user dashboard
│   ├── resume/           # Resume management and tailoring
│   ├── globals.css       # Global styling & Tailwind directives
│   └── page.tsx          # Landing page with 3D Hero
├── components/           # Reusable React components
│   ├── animations/       # GSAP & Framer Motion wrappers
│   ├── layout/           # Navbar, Footer, Marketing wrappers
│   ├── shared/           # Generic UI (Container, Logo)
│   └── ui/               # Shadcn components & complex UI (ThreeHero, 3D cards)
├── lib/                  # Utility functions and shared logic
├── public/               # Static assets (images, fonts, 3D models)
└── tailwind.config.ts    # Tailwind styling configuration
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check the [issues page](https://github.com/parthasdey2304/Candidexa/issues).

## 📄 License

This project is open-source and licensed under the MIT License. See the `LICENSE` file for more details.

---
<div align="center">
  <i>Built with passion to revolutionize the job search experience.</i>
</div>
