"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Github,
  Linkedin,
  ExternalLink,
  Code,
  Palette,
  Zap,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function AnimatedPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMounted(true);
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Prevent hydration mismatch by not rendering dynamic content until mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("xjarifx@gmail.com");
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: "all 0.3s ease-out",
          }}
        />
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-300/10 to-yellow-300/10 rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "6s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-green-300/10 to-blue-300/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
      </div>

      {/* Navigation with Glass Effect */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50
            ? "bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
        style={{
          transform: `translateY(${isLoaded ? "0" : "-100px"})`,
          transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-gray-900 animate-pulse">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Portfolio
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["About", "Work", "Skills", "Contact"].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="relative text-gray-600 hover:text-gray-900 transition-all duration-300 group"
                  style={{
                    transform: `translateY(${isLoaded ? "0" : "20px"})`,
                    opacity: isLoaded ? 1 : 0,
                    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${
                      index * 0.1
                    }s`,
                  }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative z-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute top-0 left-0 w-full h-0.5 bg-gray-900 transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 top-2.5" : ""
                  }`}
                />
                <span
                  className={`absolute top-2.5 left-0 w-full h-0.5 bg-gray-900 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute top-5 left-0 w-full h-0.5 bg-gray-900 transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 top-2.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Navigation with Glass Effect */}
          <div
            className={`md:hidden transition-all duration-500 overflow-hidden ${
              isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-4 pb-4 border-t border-white/20 bg-white/50 backdrop-blur-xl rounded-2xl p-4 mx-4">
              <div className="flex flex-col space-y-4">
                {["About", "Work", "Skills", "Contact"].map((item, index) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-left text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-2"
                    style={{
                      transform: `translateX(${isMenuOpen ? "0" : "-20px"})`,
                      opacity: isMenuOpen ? 1 : 0,
                      transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${
                        index * 0.1
                      }s`,
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Enhanced Animations */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-6 relative"
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Animated Avatar */}
          <div
            className="mb-8"
            style={{
              transform: `translateY(${
                isLoaded ? "0" : "50px"
              }) translateY(${-parallaxOffset}px)`,
              opacity: isLoaded ? 1 : 0,
              transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
            }}
          >
            <div
              className="w-32 h-32 mx-auto mb-8 rounded-full shadow-2xl shadow-blue-500/25 flex items-center justify-center relative overflow-visible group hover:scale-110 transition-all duration-500 p-1 animate-float"
              style={{
                background:
                  "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
                backgroundSize: "300% 300%",
                animation:
                  "gradient 3s ease infinite, float 6s ease-in-out infinite",
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl border border-white/20">
                <Image
                  src="/me.png"
                  alt="Jarif - Backend Developer"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 rounded-full" />
              {/* Floating water ripple effect */}
              <div className="absolute -inset-4 rounded-full pointer-events-none">
                <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping"></div>
                <div
                  className="absolute inset-0 rounded-full border-2 border-purple-400/20 animate-ping"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full border-2 border-pink-400/20 animate-ping"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Animated Title */}
          <h1
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            style={{
              transform: `translateY(${isLoaded ? "0" : "30px"})`,
              opacity: isLoaded ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s",
            }}
          >
            {"Hello, I'm".split("").map((char, index) => (
              <span
                key={index}
                className="inline-block hover:scale-110 hover:-rotate-12 transition-all duration-300 cursor-default"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              Jarif
            </span>
          </h1>

          {/* Animated Description */}
          <p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            style={{
              transform: `translateY(${isLoaded ? "0" : "20px"})`,
              opacity: isLoaded ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s",
            }}
          >
            A passionate backend developer crafting robust, scalable server-side
            solutions that power amazing digital experiences.
          </p>

          {/* Animated Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            style={{
              transform: `translateY(${isLoaded ? "0" : "20px"})`,
              opacity: isLoaded ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s",
            }}
          >
            <Button
              onClick={() => scrollToSection("work")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 relative overflow-hidden group"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="border-2 border-gray-300 text-gray-700 hover:bg-white/50 backdrop-blur-xl px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-400 bg-white/30"
            >
              Get In Touch
            </Button>
          </div>

          {/* Animated Scroll Indicator */}
          <div
            className="animate-bounce"
            style={{
              transform: `translateY(${isLoaded ? "0" : "20px"})`,
              opacity: isLoaded ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1s",
            }}
          >
            <ChevronDown className="w-6 h-6 text-gray-400 mx-auto animate-pulse" />
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 animate-float">
          <Code className="w-8 h-8 text-blue-400/30" />
        </div>
        <div
          className="absolute top-1/3 right-10 animate-float"
          style={{ animationDelay: "1s" }}
        >
          <Palette className="w-6 h-6 text-purple-400/30" />
        </div>
        <div
          className="absolute bottom-1/4 left-1/4 animate-float"
          style={{ animationDelay: "2s" }}
        >
          <Zap className="w-7 h-7 text-pink-400/30" />
        </div>
      </section>

      {/* About Section with Glass Cards */}
      <section id="about" ref={aboutRef} className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 hover:scale-105 transition-transform duration-300">
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto animate-pulse" />
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="group">
              <div className="w-full h-96 rounded-3xl bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl mb-8 overflow-hidden relative hover:scale-105 transition-all duration-500">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Profile"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <p className="text-lg text-gray-700 leading-relaxed">
                  I&apos;m a backend developer with over 5 years of experience
                  building robust, scalable server-side applications and APIs.
                  My passion lies in creating efficient systems that handle
                  complex business logic and power seamless user experiences.
                </p>
              </div>

              <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <p className="text-lg text-gray-700 leading-relaxed">
                  When I&apos;m not coding, you can find me exploring new
                  backend technologies, optimizing database queries, or
                  contributing to open-source projects while enjoying a good cup
                  of coffee.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {["JavaScript", "TypeScript", "Node.js", "Express"].map(
                  (skill, index) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white/50 backdrop-blur-xl rounded-full text-sm font-medium text-gray-700 shadow-lg border border-white/20 hover:scale-110 hover:bg-white/70 transition-all duration-300 cursor-default"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section with Enhanced Glass Cards */}
      <section id="work" ref={workRef} className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 hover:scale-105 transition-transform duration-300">
              Featured Work
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto animate-pulse" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce API",
                description:
                  "RESTful API for e-commerce platform with authentication, payment processing, and inventory management.",
                image: "/placeholder.svg?height=300&width=400",
                tags: ["Node.js", "Express", "MongoDB"],
                gradient: "from-blue-500/20 to-purple-500/20",
              },
              {
                title: "Real-time Chat System",
                description:
                  "Scalable chat application backend with WebSocket support, message queuing, and user presence tracking.",
                image: "/placeholder.svg?height=300&width=400",
                tags: ["Node.js", "Socket.io", "MySQL"],
                gradient: "from-green-500/20 to-blue-500/20",
              },
              {
                title: "Task Management API",
                description:
                  "Enterprise task management system with role-based access control, notifications, and reporting.",
                image: "/placeholder.svg?height=300&width=400",
                tags: ["TypeScript", "Express", "PostgreSQL"],
                gradient: "from-pink-500/20 to-yellow-500/20",
              },
            ].map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-xl hover:-translate-y-4 bg-white/30 backdrop-blur-xl border border-white/20 overflow-hidden relative"
                style={{
                  transform: `translateY(${isLoaded ? "0" : "50px"})`,
                  opacity: isLoaded ? 1 : 0,
                  transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${
                    index * 0.2
                  }s`,
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <CardContent className="p-0 relative z-10">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-white transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-white/50 backdrop-blur-xl text-gray-700 text-sm rounded-full font-medium border border-white/20 hover:scale-110 transition-transform duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section with Animated Glass Cards */}
      <section id="skills" ref={skillsRef} className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 hover:scale-105 transition-transform duration-300">
              Skills & Expertise
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto animate-pulse" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: "Backend",
                skills: [
                  "Node.js",
                  "Express",
                  "JavaScript",
                  "TypeScript",
                  "RESTful APIs",
                ],
                icon: <Code className="w-8 h-8" />,
                gradient: "from-blue-500/20 to-cyan-500/20",
              },
              {
                category: "Databases",
                skills: [
                  "MySQL",
                  "MongoDB",
                  "PostgreSQL",
                  "Redis",
                  "Database Design",
                ],
                icon: <Zap className="w-8 h-8" />,
                gradient: "from-green-500/20 to-emerald-500/20",
              },
              {
                category: "Tools & DevOps",
                skills: ["Git", "Docker", "AWS", "Linux", "Postman"],
                icon: <Palette className="w-8 h-8" />,
                gradient: "from-purple-500/20 to-pink-500/20",
              },
              {
                category: "Soft Skills",
                skills: [
                  "Problem Solving",
                  "System Design",
                  "API Documentation",
                  "Code Review",
                ],
                icon: <Heart className="w-8 h-8" />,
                gradient: "from-orange-500/20 to-red-500/20",
              },
            ].map((skillGroup, index) => (
              <Card
                key={index}
                className="bg-white/30 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group relative overflow-hidden"
                style={{
                  transform: `translateY(${isLoaded ? "0" : "30px"})`,
                  opacity: isLoaded ? 1 : 0,
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${
                    index * 0.1
                  }s`,
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${skillGroup.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-blue-600 group-hover:scale-110 transition-transform duration-300">
                      {skillGroup.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {skillGroup.category}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {skillGroup.skills.map((skill, skillIndex) => (
                      <li
                        key={skillIndex}
                        className="text-gray-600 flex items-center group-hover:translate-x-1 transition-transform duration-300"
                        style={{ transitionDelay: `${skillIndex * 0.05}s` }}
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3 animate-pulse" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Enhanced Glass Effect */}
      <section id="contact" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 hover:scale-105 transition-transform duration-300">
            Let&apos;s Work Together
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 animate-pulse" />

          <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-12 hover:shadow-3xl transition-all duration-500">
            <p className="text-xl text-gray-700 leading-relaxed">
              I&apos;m always interested in new opportunities and exciting
              projects. Whether you have a question or just want to say hi,
              I&apos;ll try my best to get back to you!
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <Button className="border-2 border-gray-300 text-gray-700 hover:bg-white/50 backdrop-blur-xl px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-400 bg-white/30">
              Download Resume
            </Button>
          </div>

          <div className="flex justify-center gap-6">
            {[
              {
                icon: <Github className="w-6 h-6" />,
                href: "https://github.com/xjarifx",
                label: "GitHub",
              },
              {
                icon: <Linkedin className="w-6 h-6" />,
                href: "https://www.linkedin.com/in/xjarifx/",
                label: "LinkedIn",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/30 backdrop-blur-xl hover:bg-white/50 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-gradient-to-r from-blue-500/30 to-purple-500/30 hover:border-blue-500 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/25 text-gray-700 hover:text-blue-600 group relative overflow-hidden"
                style={{
                  transform: `translateY(${isLoaded ? "0" : "20px"})`,
                  opacity: isLoaded ? 1 : 0,
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${
                    index * 0.1
                  }s`,
                  background:
                    "linear-gradient(white, white) padding-box, linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3)) border-box",
                }}
                title={social.label}
              >
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {social.icon}
                </div>
              </a>
            ))}

            {/* Email Address - Click to Copy */}
            <button
              onClick={copyEmailToClipboard}
              className="bg-white/30 backdrop-blur-xl hover:bg-white/50 rounded-full px-4 py-3 transition-all duration-300 border-2 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/25 text-gray-700 hover:text-purple-600 group relative overflow-hidden"
              style={{
                transform: `translateY(${isLoaded ? "0" : "20px"})`,
                opacity: isLoaded ? 1 : 0,
                transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s`,
                background:
                  "linear-gradient(white, white) padding-box, linear-gradient(45deg, rgba(236, 72, 153, 0.3), rgba(168, 85, 247, 0.3)) border-box",
                border: "2px solid transparent",
              }}
              title={emailCopied ? "Email copied!" : "Click to copy email"}
            >
              <span className="text-sm font-medium group-hover:scale-110 transition-transform duration-300">
                {emailCopied ? "Copied!" : "xjarifx@gmail.com"}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer with Glass Effect */}
      <footer className="py-8 px-6 border-t border-white/20 bg-white/20 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 flex items-center justify-center gap-2">
            © 2025 Jarif. Designed and built with
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            using React and Tailwind CSS.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
