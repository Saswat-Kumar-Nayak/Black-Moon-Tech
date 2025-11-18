// ----------------------------------------------
// Projects Page Component (New Design)
// Black-Moon-Tech – Alternating Layout
// ----------------------------------------------
import React, { useEffect, useRef, useState } from "react";
import "./Projects.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const wrapperRef = useRef(null); // ref for mobile scrolling
const [activeIndex, setActiveIndex] = useState(0); // active card index
  const sectionRefs = useRef([]);

  useEffect(() => {
    const items = gsap.utils.toArray(".new-project-item");

    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 120,
          rotateX: 20,
          rotateY: index % 2 === 0 ? -10 : 10,
          scale: 0.92,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 1.2,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        }
      );

      // Parallax image
      const img = item.querySelector(".new-project-image");
      gsap.to(img, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Underline
      const line = item.querySelector(".new-project-line");
      gsap.fromTo(
        line,
        { width: "0%" },
        {
          width: "100%",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 70%" },
        }
      );
    });
  }, []);

  // Mobile swipe scroll handler
  const handleScroll = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const scrollLeft = wrapper.scrollLeft;
    const cardWidth = wrapper.offsetWidth * 0.9 + 16; // card width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    wrapper.addEventListener("scroll", handleScroll);
    return () => wrapper.removeEventListener("scroll", handleScroll);
  }, []);
  const handleDotClick = (index) => {
  const wrapper = wrapperRef.current;
  if (!wrapper) return;

  // Width of one card + gap
  const cardWidth = wrapper.offsetWidth * 0.9 + 16; // 0.9 because min-width: 90% for mobile
  wrapper.scrollTo({
    left: index * cardWidth,
    behavior: "smooth",
  });

  // Update active dot immediately
  setActiveIndex(index);
};


  const projectData = [
    {
      title: "Portfolio Website",
      description: [
        "A modern personal portfolio built using React with a neon UI theme.",
        "Fully responsive design for desktop, tablet, and mobile.",
        "Implemented scroll-triggered animations using GSAP for smooth reveal effects.",
      ],
      image: "../public/portfolio.jpeg",
      link: "#",
    },
    {
      title: "Weather App",
      description: [
        "Real-time weather application using OpenWeather API.",
        "Dynamic UI updates based on user input and location.",
        "Features dark mode-friendly neon UI for better readability.",
      ],
      image: "../public/weatherapp.jpeg",
      link: "#",
    },
    {
      title: "E-Commerce UI",
      description: [
        "Frontend UI for an e-commerce platform built with React.",
        "Clean, modern design with product listings, filters, and search functionality.",
        "Smooth hover effects and animations make the interface engaging.",
      ],
      image: "../public/ecommerce.jpeg",
      link: "#",
    },
    {
      title: "UI Components Library",
      description: [
        "Collection of reusable modern UI components built with React and CSS.",
        "Includes buttons, cards, modals, sliders, and forms.",
        "Each component is fully responsive and customizable.",
      ],
      image: "../public/library.jpeg",
      link: "#",
    },
    {
      title: "Black Moon Dashboard",
      description: [
        "Futuristic dashboard UI with neon theme and analytics widgets.",
        "Dynamic charts, tables, and data visualization components.",
        "Responsive and interactive layout for desktop and mobile.",
      ],
      image: "../public/blackmoon.jpeg",
      link: "#",
    },
    {
      title: "AI Chat Support System",
      description: [
        "A smart AI-powered chat assistant built with React and OpenAI API.",
        "Features real-time responses, typing animation, and chat history.",
        "Designed with a futuristic neon UI matching the Black Moon theme.",
      ],
      image: "../public/ai.jpg",
      link: "#",
    },
    {
      title: "Finance Tracker Dashboard",
      description: [
        "Modern finance tracker to manage expenses and income visually.",
        "Interactive charts built using Chart.js and custom React components.",
        "Includes category filters, data insights, and stylish neon analytics UI.",
      ],
      image: "../public/fiancialtracker.jpg",
      link: "#",
    },
    {
      title: "Task Manager App",
      description: [
        "A simple but powerful task manager made with React and LocalStorage.",
        "Users can create, edit, delete, and prioritize tasks.",
        "Minimal clean layout with smooth GSAP animations.",
      ],
      image: "../public/taskmaneger.jpg",
      link: "#",
    },
    {
      title: "Music Player UI",
      description: [
        "Futuristic music player interface with neon soundwave animations.",
        "Built with React and custom audio controls using HTML5 Audio API.",
        "Includes playlist support, timeline scrubber, and animated thumbnails.",
      ],
      image: "../public/music.png",
      link: "#",
    },
  ];

  return (
    <div className="new-project-container" id="projects">
      <h1 className="new-project-title">My Projects</h1>

      <div className="new-project-blur-bg">
      {/* Mobile Dots */}
        <div className="new-project-dots">
          {projectData.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => handleDotClick(index)} // <-- click handler
            ></span>
          ))}
        </div>

        {/* Projects wrapper */}
        <div className="new-project-wrapper" ref={wrapperRef}>
          {/* <div className="new-project-dots">
            {projectData.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === activeIndex ? "active" : ""}`}
              ></span>
            ))}
          </div> */}

          {projectData.map((project, index) => (
            <div
              className={`new-project-item ${index % 2 === 1 ? "reverse" : ""}`}
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
            >
              {/* Right Image */}
              <div className="new-project-image-box">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="new-project-image"
                />
              </div>
              {/* Content */}
              <div className="new-project-content">
                <h2>{project.title}</h2>
                <div className="new-project-description">
                  {project.description.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="new-project-btn"
                  target="_blank"
                >
                  View Project →
                </a>
                {/* Underline */}
                <div className="new-project-line"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
