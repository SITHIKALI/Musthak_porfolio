import { Project, ProjectCategory } from './types';

export const PERSONAL_INFO = {
  name: "F. Mohamad Musthak Ali",
  role: "Creative Technologist",
  tagline: "Designing Intelligent Experiences",
  bio: "I bridge the gap between visual aesthetics and intelligent automation. With a background in Graphic Design, a core in Automation Development, and a passion for AI, I don't just build interfaces—I engineer experiences that think.",
  socials: {
    linkedin: "https://www.linkedin.com/in/mohamad-musthak-ali-549998253",
    github: "#",
    behance: "#"
  }
};

export const SKILLS = [
  { category: "Design", skills: ["Figma", "Framer", "Photoshop", "Unity", "Canva", "User Research", "Prototyping"] },
  { category: "Automation & Code", skills: ["UiPath (RPA)", "Python", "n8n"] },
  { category: "AI & Intelligence", skills: ["Gemini API", "Botpress", "AI Agents", "Prompt Engineering", "RAG Workflows"] }
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "BrewHaven",
    subtitle: "Sensory-Rich Coffee Experience",
    category: ProjectCategory.UX_UI,
    description: "A mobile experience for coffee enthusiasts that streamlines the ordering and loyalty process. Designed with a warm, tactile aesthetic and accessible user flows to reduce friction from browse to brew. The interface structure is optimized not just for visual appeal but for seamless integration with backend inventory systems, bridging the gap between cozy vibes and operational efficiency.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    technologies: ["Figma", "Prototyping", "User Flow", "App Design"],
    link: "https://share.google/irtmdeiGN5QXbEsmB",
    details: {
      type: 'design',
      artifacts: ["Interactive Prototype", "High-Fidelity UI", "Design System"]
    }
  },
  {
    id: "p2",
    title: "Medicare",
    subtitle: "Trust-Centric Telemedicine App",
    category: ProjectCategory.UX_UI,
    description: "A clean, trust-building telemedicine platform designed to simplify patient-doctor interactions and appointment scheduling. The UI prioritizes accessibility and clarity, reducing cognitive load for diverse user demographics. Its modular design system serves as a frontend foundation for connecting with future AI-driven diagnostic tools and automated scheduling agents.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    technologies: ["Figma", "HealthTech UX", "Accessibility", "Mobile Design"],
    link: "https://www.figma.com/proto/LMXvZWQPLqkWStX1krAZNL/Medicare?node-id=1-866&t=KnAHaBqhPF0r4CdG-1",
    details: {
      type: 'design',
      artifacts: ["Doctor Booking Flow", "Patient Dashboard", "Medical Profile"]
    }
  },
  {
    id: "p3",
    title: "MobileMart",
    subtitle: "High-Conversion E-Commerce",
    category: ProjectCategory.UX_UI,
    description: "A high-conversion e-commerce interface that emphasizes product discovery and effortless checkout. Leveraging smooth micro-interactions and a responsive layout, this design addresses common pain points like cart abandonment. The structured layout mirrors algorithmic recommendation logic, ensuring a visual experience that feels as intelligent as the backend engines powering it.",
    image: "https://images.unsplash.com/photo-1580974928064-f0aeef70895a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    technologies: ["Figma", "E-commerce Design", "Micro-interactions", "CRO"],
    link: "https://www.figma.com/proto/vMpXLPS3MsHgBEZA5W1MsF/Mobile-web?node-id=0-1&t=4PgevWiJgm2X6xs1-1",
    details: {
      type: 'design',
      artifacts: ["Shopping Cart UX", "Product Discovery", "Checkout Flow"]
    }
  },
  {
    id: "p4",
    title: "HR AI Agent",
    subtitle: "Automated Recruitment Assistant",
    category: ProjectCategory.AUTOMATION,
    description: "An intelligent agent built with Python and Gemini API that automates resume screening and initial candidate outreach via email. Integrates seamlessly with Google Calendar for scheduling.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    technologies: ["Python", "Gemini API", "Google Workspace API", "UiPath"],
    link: "https://www.figma.com/proto/A7wdS06MMHkGZItjESGJXe/Untitled?node-id=0-1&t=73tsFLlAkRnIQyE0-1",
    details: {
      type: 'code',
      codeSnippet: `
async def screen_candidate(resume_text):
    response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: f"Analyze this resume for a Senior Dev role: {resume_text}"
    })
    return parse_json(response.text)
      `
    }
  },
  {
    id: "p5",
    title: "Interactive Portfolio v1",
    subtitle: "No-Code Design in Framer",
    category: ProjectCategory.UX_UI,
    description: "A dynamic personal portfolio built entirely in Framer, showcasing rapid prototyping capabilities. This project highlights the ability to deliver high-fidelity, interactive web experiences with complex animations and responsive layouts without writing custom code.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    technologies: ["Framer", "Motion Design", "No-Code", "Responsive Web"],
    link: "https://share.google/wTdA7s3YlHLHxY5bU",
    details: {
      type: 'design',
      artifacts: ["Live Site", "Interactive Components"]
    }
  }
];