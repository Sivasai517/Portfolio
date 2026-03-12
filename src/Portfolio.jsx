import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Download, Menu, X, Database, BarChart2, PieChart, TrendingUp, LineChart, ExternalLink, BookOpen, ChevronRight, Sun, Moon, ArrowUp, Award, Briefcase, GraduationCap, Star } from 'lucide-react';

const Portfolio = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [counts, setCounts] = useState({ internships: 0, projects: 0, certs: 0, dataPoints: 0 });
  const canvasRef = useRef(null);
  const statsRef = useRef(null);

  // Loading animation
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      setScrollProgress((currentScroll / totalScroll) * 100);
      setShowScrollTop(currentScroll > 400);

      // Update active section
      const sections = ['home', 'about', 'impact', 'skills', 'experience', 'projects', 'education', 'certifications', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated stats counter
  useEffect(() => {
    let animationFrameId;
    let startTime;
    
    // Normal animation simply counting up on load
    const targets = { internships: 3, projects: 5, certs: 6, dataPoints: 50 };
    const duration = 2000;
    
    const timeoutId = setTimeout(() => {
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // cubic ease out
        
        setCounts({
          internships: Math.round(targets.internships * ease),
          projects: Math.round(targets.projects * ease),
          certs: Math.round(targets.certs * ease),
          dataPoints: Math.round(targets.dataPoints * ease)
        });
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setCounts(targets);
        }
      };
      
      animationFrameId = requestAnimationFrame(animate);
    }, 500); 
    
    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated background particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const skills = {
    'Data Analysis': ['SQL', 'Power BI', 'Excel', 'Python', 'Pandas', 'NumPy', 'Matplotlib', 'EDA', 'Statistical Analysis', 'Data Visualization', 'Dashboards'],
    'Tools': ['Jupyter Notebook', 'Google Colab', 'Scikit-Learn', 'Git', 'Canva']
  };

  const skillLevels = [
    { name: 'SQL', level: 90, color: 'from-purple-500 to-purple-400' },
    { name: 'Power BI', level: 88, color: 'from-blue-500 to-blue-400' },
    { name: 'Python (Pandas / NumPy)', level: 82, color: 'from-purple-500 to-blue-400' },
    { name: 'Excel & Pivot Tables', level: 92, color: 'from-green-500 to-emerald-400' },
    { name: 'Data Visualization', level: 85, color: 'from-blue-500 to-purple-400' },
    { name: 'Machine Learning (Basics)', level: 70, color: 'from-pink-500 to-purple-400' },
    { name: 'Statistical Analysis', level: 80, color: 'from-purple-500 to-indigo-400' },
    { name: 'Git & GitHub', level: 75, color: 'from-orange-500 to-amber-400' },
  ];

  const journey = [
    { year: '2022', label: 'Started B.Tech', desc: 'CSE – Data Science at MITS', icon: <GraduationCap size={18}/>, color: 'purple' },
    { year: 'Apr 2024', label: 'SlashMark Internship', desc: 'Data Analyst Intern — SQL & Power BI dashboards', icon: <Briefcase size={18}/>, color: 'blue' },
    { year: 'Jul 2024', label: 'CodeTech Internship', desc: 'Data Analyst Intern — Python automation & EDA', icon: <Briefcase size={18}/>, color: 'purple' },
    { year: '2024', label: 'Google Data Analytics', desc: 'Earned professional certificate from Google', icon: <Award size={18}/>, color: 'blue' },
    { year: 'Jul 2025', label: 'Alfido Tech Internship', desc: 'Python Intern — data pipelines & modular code', icon: <Briefcase size={18}/>, color: 'purple' },
    { year: '2025', label: 'Tata iQ | Forage', desc: 'GenAI Powered Data Analytics Job Simulation', icon: <Star size={18}/>, color: 'blue' },
    { year: '2026', label: 'Graduating', desc: 'B.Tech CSE – Data Science (Expected)', icon: <GraduationCap size={18}/>, color: 'purple' },
  ];

  const experiences = [
    {
      company: 'SlashMark IT Solutions',
      role: 'Data Analyst Intern',
      period: 'April 2024 – June 2024',
      achievements: [
        'Analyzed pizza sales data using SQL and Excel',
        'Built dynamic Power BI dashboards to track daily performance',
        'Identified peak sales hours and top-performing menu items'
      ],
      impact: 'Improved decision-making efficiency by 30%'
    },
    {
      company: 'CodeTech IT Solutions',
      role: 'Data Analyst Intern',
      period: 'July 2024 – August 2024',
      achievements: [
        'Built Student Grade Tracker and Color Detection system using Python',
        'Developed automated data collection scripts for faster reporting'
      ],
      impact: 'Reduced manual errors by 80% & optimized code efficiency by 30%'
    },
    {
      company: 'Alfido Tech',
      role: 'Python Intern',
      period: 'July 2025 – September 2025',
      achievements: [
        'Built automation and data-processing applications',
        'Focused on modular programming concepts',
        'Implemented data pipelines for raw data formatting'
      ],
      impact: 'Enhanced overall code reusability across data projects'
    }
  ];

  const projects = [
    {
      title: 'HR Analytics Dashboard',
      description: 'Comprehensive Power BI dashboard analyzing employee attrition, demographic trends, and job satisfaction to identify retention risks.',
      tech: ['Power BI', 'SQL', 'Excel'],
      metrics: ['1400+ Records Analyzed', 'Identified 15% Attrition Rate'],
      icon: <PieChart size={24} className="text-purple-400" />,
      github: 'https://github.com/Sivasai517',
      live: 'https://linkedin.com/in/sivasaipalla',
      liveLabel: 'View Dashboard',
      problem: 'The organization faced high employee turnover with no clear visibility into attrition patterns, costing significant resources in recruitment and training.',
      solution: 'Built a dynamic Power BI dashboard that visualizes attrition rates by department, age group, salary band, and job satisfaction scores — enabling HR teams to spot and act on risk factors early.',
      methodology: ['Cleaned and transformed 1400+ employee records in Excel', 'Used SQL queries to extract segmented attrition data', 'Designed interactive slicers and drill-through reports in Power BI', 'Applied conditional formatting to highlight high-risk departments']
    },
    {
      title: 'Blinkit Sales Analytics Dashboard',
      description: 'End-to-end analytics solution tracking key performance indicators including revenue optimization and user ratings across multiple store locations.',
      tech: ['Power BI', 'SQL', 'Excel'],
      metrics: ['Tracked $1.2M Total Sales', '8500+ Items Analyzed'],
      icon: <BarChart2 size={24} className="text-blue-400" />,
      github: 'https://github.com/Sivasai517',
      live: 'https://linkedin.com/in/sivasaipalla',
      liveLabel: 'View Report',
      problem: 'Blinkit needed a centralized view of sales performance across product categories and outlet types to optimize inventory and pricing strategies.',
      solution: 'Developed a multi-page Power BI report with KPI cards, bar charts, and geographic filters to surface top-selling SKUs, revenue trends, and outlet-level performance.',
      methodology: ['Imported and modeled transactional data using Power Query', 'Created a star-schema data model linking sales, products, and outlets', 'Built DAX measures for YoY growth, average rating, and revenue per outlet', 'Designed an executive summary page for quick stakeholder insights']
    },
    {
      title: 'Urban Threads Order Analysis',
      description: 'Interactive Excel dashboard deep-diving into sales channels, demographics, and product returns for Q4 2024 e-commerce operational data.',
      tech: ['Excel', 'Pivot Tables', 'Data Cleaning'],
      metrics: ['Q4 2024 Revenue Insights', 'Analyzed 1000+ Orders'],
      icon: <LineChart size={24} className="text-purple-400" />,
      github: 'https://github.com/Sivasai517',
      live: 'https://linkedin.com/in/sivasaipalla',
      liveLabel: 'View Excel Insights',
      problem: 'The fashion brand lacked insight into which sales channels and demographics drove the most revenue, and why return rates varied across categories.',
      solution: 'Created an Excel dashboard with PivotTables, charts, and slicers providing a clear breakdown of orders by channel (Amazon, Flipkart, Myntra), gender, age, and product category.',
      methodology: ['Cleaned raw order data (handling blanks, duplicates, inconsistent formats)', 'Built pivot tables for channel-wise and demographic-wise sales summaries', 'Designed a dashboard with interactive slicers for date and category filters', 'Identified top-3 revenue channels contributing 80% of total Q4 sales']
    },
    {
      title: 'Nutrient Efficiency Detector',
      description: 'Machine learning system evaluating daily food intake to calculate essential nutrients and recommend suitable items based on dietary requirements.',
      tech: ['Python', 'Pandas', 'NumPy', 'Machine Learning'],
      metrics: ['Automated Nutritional Analysis', 'EDA on Dietary Patterns'],
      icon: <PieChart size={24} className="text-purple-400" />,
      github: 'https://github.com/Sivasai517',
      live: null,
      problem: 'Manual dietary tracking is tedious and error-prone. People often lack actionable insight on nutrient deficiencies based on what they eat daily.',
      solution: 'Built a Python-based ML system that takes daily food logs, computes nutrient intake (protein, carbs, vitamins, minerals), and recommends food items to fill nutritional gaps.',
      methodology: ['Loaded and explored a food nutritional dataset using Pandas', 'Performed EDA to identify patterns across food categories', 'Implemented a recommendation engine using similarity scoring (NumPy)', 'Validated recommendations against RDA (Recommended Dietary Allowance) standards']
    },
    {
      title: 'Color Detection System',
      description: 'Computer vision application identifying colors from images in real time by extracting RGB values and matching with predefined datasets.',
      tech: ['Python', 'OpenCV', 'NumPy', 'Image Processing'],
      metrics: ['Real-Time Color Recognition', 'Automated Identification Workflow'],
      icon: <LineChart size={24} className="text-blue-400" />,
      github: 'https://github.com/Sivasai517',
      live: null,
      problem: 'Manual color identification from images is inconsistent and time-consuming, especially in design and quality control workflows.',
      solution: 'Developed a real-time computer vision application using OpenCV that detects the color of any pixel on double-click, matches it against a 1000-color CSV dataset, and displays the color name with RGB values.',
      methodology: ['Loaded image with OpenCV and created interactive mouse-click event handler', 'Extracted R, G, B values at clicked pixel coordinates', 'Used minimum distance algorithm across a color dataset CSV to find the closest match', 'Displayed color name and RGB values as an overlay on the image in real time']
    }
  ];

  const certifications = [
    'Google Data Analytics Certificate',
    'IBM Data Analysis with Python',
    'Accenture Data Analytics & Visualization',
    'AWS Cloud Fundamentals',
    'Deloitte Data Analytics Job Simulation',
    'GenAI Powered Data Analytics Job Simulation – Tata iQ | Forage'
  ];

  const achievements = [
    {
      title: 'Sales Trends Analytics',
      description: 'Built an interactive Power BI dashboard analyzing 8,500+ product records, uncovering sales trends and revenue patterns.',
      icon: <PieChart size={20} className="text-purple-400" />,
      isNew: true
    },
    {
      title: 'Reporting Optimization',
      description: 'Improved reporting efficiency by 30% during the SlashMark internship using SQL and Excel analytics.',
      icon: <TrendingUp size={20} className="text-blue-400" />
    },
    {
      title: 'Python Automation',
      description: 'Reduced manual errors by 80% through Python automation in the Student Grade Tracker project.',
      icon: <Database size={20} className="text-purple-400" />
    },
    {
      title: 'Data Job Simulations',
      description: 'Completed multiple industry job simulations in data analytics and AI-driven insights from companies like Accenture, Deloitte, and Tata Consultancy Services.',
      icon: <Award size={20} className="text-blue-400" />,
      isNew: true
    },
    {
      title: 'Technical Projects',
      description: 'Developed projects involving EDA, machine learning basics, and real-time image processing using Python and OpenCV.',
      icon: <BarChart2 size={20} className="text-purple-400" />
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-300 text-xl font-light tracking-widest">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen overflow-x-hidden relative transition-colors duration-300`}>
      {/* Animated Background Canvas */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
      
      {/* Custom Cursor Glow */}
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none z-50 mix-blend-screen opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transition: 'left 0.1s, top 0.1s'
        }}
      />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-900 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-xl border-b border-purple-900/20 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              PALLA SIVA SAI
            </h1>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Impact', 'Skills', 'Experience', 'Projects', 'Contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`transition-all duration-300 hover:text-purple-400 ${
                    activeSection === item.toLowerCase() ? 'text-purple-400' : isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {item}
                </button>
              ))}
              
              <div className="h-6 w-px bg-purple-500/20" />
              
              <div className="flex items-center space-x-4">
                <a href="https://github.com/Sivasai517" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/sivasaipalla" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>

              {/* Dark/Light Mode Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isDark
                    ? 'bg-slate-800 border-purple-500/40 text-yellow-300 hover:bg-slate-700'
                    : 'bg-white border-purple-300 text-purple-600 hover:bg-purple-50'
                }`}
                title="Toggle theme"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-purple-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              {['Home', 'About', 'Impact', 'Skills', 'Experience', 'Projects', 'Contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-2 text-gray-400 hover:text-purple-400 transition-colors"
                >
                  {item}
                </button>
              ))}
              <div className="flex gap-4 pt-2">
                <a href="https://github.com/Sivasai517" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/sivasaipalla" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8 animate-[fadeIn_1s_ease-out]">
            {/* Open to Work Badge */}
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/15 border border-green-500/40 text-green-400 font-semibold text-sm shadow-lg shadow-green-500/10">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to Work — Graduating April 2026
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-[length:200%_200%] animate-[gradient_3s_ease_infinite] bg-clip-text text-transparent">
              Hi, I'm PALLA SIVA SAI
            </h1>
            <p className="text-xl md:text-2xl text-purple-300 mb-8 font-medium tracking-wide max-w-3xl mx-auto">
              Aspiring Data Analyst passionate about transforming raw data into meaningful insights using SQL, Power BI, Python, and Excel.
            </p>
            <p className="text-lg md:text-xl text-gray-400 mb-8 font-light tracking-wide flex flex-wrap justify-center items-center gap-4">
              <span className="flex items-center gap-2"><Database size={20} className="text-purple-400"/> SQL</span>
              <span className="text-gray-600">|</span>
              <span className="flex items-center gap-2"><PieChart size={20} className="text-blue-400"/> Power BI</span>
              <span className="text-gray-600">|</span>
              <span className="flex items-center gap-2"><BarChart2 size={20} className="text-purple-400"/> Python</span>
              <span className="text-gray-600">|</span>
              <span className="flex items-center gap-2"><LineChart size={20} className="text-blue-400"/> Excel</span>
              <span className="text-gray-600">|</span>
              <span className="flex items-center gap-2"><PieChart size={20} className="text-purple-400"/> Data Visualization</span>
              <span className="text-gray-600">|</span>
              <span className="flex items-center gap-2"><Github size={20} className="text-purple-400"/> GitHub</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
            >
              View Projects
            </button>
            <a 
              href="/resume.pdf" 
              download="Palla_Siva_Sai_Resume.pdf"
              className="px-8 py-4 border-2 border-purple-500 rounded-full text-purple-400 font-semibold hover:bg-purple-500/10 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Download Resume
            </a>
          </div>

          <div className="flex gap-6 justify-center">
            <a href="https://linkedin.com/in/sivasaipalla" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-purple-900/30 border border-purple-500/50 flex items-center justify-center hover:bg-purple-500/20 hover:scale-110 transition-all duration-300">
              <Linkedin size={20} className="text-purple-400" />
            </a>
            <a href="https://github.com/Sivasai517" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-purple-900/30 border border-purple-500/50 flex items-center justify-center hover:bg-purple-500/20 hover:scale-110 transition-all duration-300">
              <Github size={20} className="text-purple-400" />
            </a>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section ref={statsRef} className="py-16 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: counts.internships, suffix: '', label: 'Internships', icon: <Briefcase size={24} className="text-purple-400" /> },
              { value: counts.projects, suffix: '+', label: 'Projects Built', icon: <BarChart2 size={24} className="text-blue-400" /> },
              { value: counts.certs, suffix: '', label: 'Certifications', icon: <Award size={24} className="text-purple-400" /> },
              { value: counts.dataPoints, suffix: 'K+', label: 'Data Points Analyzed', icon: <Database size={24} className="text-blue-400" /> },
            ].map((stat, i) => (
              <div key={i} className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 text-center">
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent tabular-nums">
                  {stat.value}{stat.suffix}
                </div>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-purple-500/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              Detail-oriented <span className="text-purple-400 font-semibold">Data Analyst</span> with a strong foundation in SQL, Power BI, Python (Pandas, NumPy, Matplotlib), and advanced Excel. 
              I specialize in transforming complex, raw datasets into intuitive, interactive dashboards and actionable business insights.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 rounded-xl p-4 border border-purple-500/20 flex flex-col items-center text-center">
                <Database className="text-purple-400 mb-3" size={32} />
                <h4 className="font-semibold text-gray-200 mb-1">Data Management</h4>
                <p className="text-sm text-gray-400">SQL, Data Cleaning, ETL Pipelines</p>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-4 border border-blue-500/20 flex flex-col items-center text-center">
                <PieChart className="text-blue-400 mb-3" size={32} />
                <h4 className="font-semibold text-gray-200 mb-1">Visualization</h4>
                <p className="text-sm text-gray-400">Power BI, Interactive Dashboards</p>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-4 border border-purple-500/20 flex flex-col items-center text-center">
                <TrendingUp className="text-purple-400 mb-3" size={32} />
                <h4 className="font-semibold text-gray-200 mb-1">Statistical Analysis</h4>
                <p className="text-sm text-gray-400">Python, EDA, Hypothesis Testing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Highlights Section */}
      <section id="impact" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Impact Highlights
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 hover:border-purple-400 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden"
              >
                {achievement.isNew && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-purple-500 text-white text-[10px] font-bold px-4 py-1 rotate-45 translate-x-3 -translate-y-1 shadow-lg">NEW</div>
                  </div>
                )}
                <div className="w-16 h-16 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-800/50 transition-all duration-300">
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-bold text-purple-300 mb-4 group-hover:text-purple-200 transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Skills
          </h2>
          
          {Object.entries(skills).map(([category, items], categoryIndex) => (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-purple-300">{category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((skill, index) => (
                  <div
                    key={skill}
                    className={`backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 cursor-pointer ${isDark ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30' : 'bg-white shadow-sm'}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <p className="text-center text-gray-200 font-medium">{skill}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Skill Proficiency Bars */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold mb-8 text-purple-300">Proficiency Levels</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {skillLevels.map((skill, i) => (
                <div key={i} className={`rounded-2xl p-5 border border-purple-500/20 ${isDark ? 'bg-slate-900/40' : 'bg-white shadow-sm'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{skill.name}</span>
                    <span className="text-sm font-bold text-purple-400">{skill.level}%</span>
                  </div>
                  <div className={`w-full h-2.5 rounded-full ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
                    <div
                      className={`h-2.5 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Experience
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500" />
            
            {experiences.map((exp, index) => (
              <div key={index} className={`mb-16 flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-purple-500 rounded-full transform -translate-x-1/2 shadow-lg shadow-purple-500/50" />
                
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-500">
                    <h3 className="text-xl font-bold text-purple-300 mb-2">{exp.role}</h3>
                    <p className="text-blue-400 font-semibold mb-2">{exp.company}</p>
                    <p className="text-gray-500 text-sm mb-4">{exp.period}</p>
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start">
                          <span className="text-purple-400 mr-2">▹</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-purple-500/20">
                      <p className="text-sm text-purple-300 font-medium flex items-center gap-2">
                        <TrendingUp size={16} /> Key Impact: {exp.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Projects
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-900/50 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    {project.icon}
                  </div>
                  <h3 className="text-xl font-bold text-purple-300 group-hover:text-purple-200 transition-colors">
                    {project.title}
                  </h3>
                </div>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed min-h-[60px]">
                  {project.description}
                </p>
                <div className="bg-slate-900/50 rounded-xl p-4 mb-6 border border-purple-500/10">
                  <p className="text-xs text-purple-400 font-semibold mb-2 uppercase tracking-wider">Key Metrics</p>
                  <ul className="space-y-1">
                    {project.metrics.map((metric, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-xs border border-purple-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-4 border-t border-purple-500/20 space-y-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-purple-600/40 to-blue-600/40 hover:from-purple-600/70 hover:to-blue-600/70 border border-purple-500/40 rounded-xl text-purple-200 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    <BookOpen size={15} />
                    Read Case Study
                  </button>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-600/40 rounded-xl text-gray-300 text-xs font-medium transition-all duration-300"
                    >
                      <Github size={13} />
                      View Code
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/40 rounded-xl text-purple-300 text-xs font-medium transition-all duration-300 shadow-lg shadow-purple-500/10"
                      >
                        <ExternalLink size={13} />
                        {project.liveLabel || 'Live Demo'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            My Journey
          </h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500" />
            {journey.map((item, i) => (
              <div key={i} className="flex gap-6 mb-8 group">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-110 ${
                  item.color === 'purple'
                    ? 'bg-purple-900/60 border-purple-500 text-purple-300'
                    : 'bg-blue-900/60 border-blue-500 text-blue-300'
                }`}>
                  {item.icon}
                </div>
                <div className={`flex-1 rounded-2xl p-4 border transition-all duration-300 hover:shadow-lg ${
                  item.color === 'purple'
                    ? `border-purple-500/30 hover:border-purple-400 hover:shadow-purple-500/20 ${isDark ? 'bg-purple-900/20' : 'bg-purple-50'}`
                    : `border-blue-500/30 hover:border-blue-400 hover:shadow-blue-500/20 ${isDark ? 'bg-blue-900/20' : 'bg-blue-50'}`
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-bold ${item.color === 'purple' ? 'text-purple-300' : 'text-blue-300'}`}>{item.label}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-slate-800 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>{item.year}</span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Education
          </h2>
          
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
            <h3 className="text-2xl font-bold text-purple-300 mb-2">B.Tech in Computer Science & Engineering – Data Science</h3>
            <p className="text-blue-400 font-semibold mb-4">Madanapalle Institute of Technology and Science</p>
            <div className="flex flex-col sm:flex-row sm:justify-between text-gray-400">
              <p>CGPA: <span className="text-purple-400 font-semibold">8.5/10</span></p>
              <p className="text-gray-500">2022 - 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Certifications
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center gap-4"
              >
                <div className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0" />
                <p className="text-gray-300">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400 transition-all duration-300">
                <Mail className="text-purple-400 flex-shrink-0" size={24} />
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a href="mailto:sivasaipalla1@gmail.com" className="text-gray-200 hover:text-purple-400 transition-colors">
                    sivasaipalla1@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400 transition-all duration-300">
                <Phone className="text-purple-400 flex-shrink-0" size={24} />
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <a href="tel:+916281880058" className="text-gray-200 hover:text-purple-400 transition-colors">
                    +91-6281880058
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400 transition-all duration-300">
                <MapPin className="text-purple-400 flex-shrink-0" size={24} />
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-gray-200">Madanapalle, Andhra Pradesh</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <a href="https://linkedin.com/in/sivasaipalla" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                  <Linkedin size={20} />
                  LinkedIn
                </a>
                <a href="https://github.com/Sivasai517" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                  <Github size={20} />
                  GitHub
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
              {/* Web3Forms Access Key - You need to replace this with your actual key! */}
              <input type="hidden" name="access_key" value="cc7cfaa0-dda4-480e-922a-f44631efb40e" />
              
              <div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full px-6 py-4 bg-purple-900/20 backdrop-blur-xl rounded-xl border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all duration-300"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  className="w-full px-6 py-4 bg-purple-900/20 backdrop-blur-xl rounded-xl border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all duration-300"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  required
                  rows="5"
                  placeholder="Your Message"
                  className="w-full px-6 py-4 bg-purple-900/20 backdrop-blur-xl rounded-xl border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all duration-300 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-purple-900/20 relative">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="flex gap-6 mb-8 text-gray-400">
            <a href="https://github.com/Sivasai517" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-all hover:scale-110">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/sivasaipalla" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-all hover:scale-110">
              <Linkedin size={24} />
            </a>
            <a href="mailto:sivasaipalla1@gmail.com" className="hover:text-purple-400 transition-all hover:scale-110">
              <Mail size={24} />
            </a>
          </div>
          <p className="text-gray-400 font-medium">
            © 2026 Palla Siva Sai. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-3 flex items-center gap-2">
            Built with React & Tailwind CSS <span className="w-1.5 h-1.5 rounded-full bg-purple-500/40" /> Designed & Developed by Palla Siva Sai
          </p>
        </div>
      </footer>

      {/* Case Study Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedProject(null); }}
        >
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-purple-950 border border-purple-500/40 rounded-3xl shadow-2xl shadow-purple-500/30 z-10">
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 pb-4 bg-slate-900/90 backdrop-blur-xl border-b border-purple-500/20 rounded-t-3xl z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-900/50 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  {selectedProject.icon}
                </div>
                <h3 className="text-xl font-bold text-purple-200">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
              >
                <X size={18} />
              </button>
            </div>
            {/* Body */}
            <div className="p-6 space-y-6">
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-xs border border-purple-500/30">{tech}</span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {selectedProject.metrics.map((metric, i) => (
                  <div key={i} className="bg-slate-800/60 border border-purple-500/20 rounded-xl px-4 py-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                    <p className="text-sm text-gray-300 font-medium">{metric}</p>
                  </div>
                ))}
              </div>
              <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
                <h4 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-3">🔴 The Problem</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedProject.problem}</p>
              </div>
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5">
                <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">🔵 The Solution</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedProject.solution}</p>
              </div>
              <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-5">
                <h4 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-4">🟣 Methodology</h4>
                <ol className="space-y-3">
                  {selectedProject.methodology.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/30 border border-purple-500/50 flex items-center justify-center text-xs text-purple-300 font-bold mt-0.5">{i + 1}</span>
                      <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                <Github size={18} />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      )}
      {/* Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/40 hover:shadow-purple-500/70 hover:scale-110 transition-all duration-300"
          title="Back to top"
        >
          <ArrowUp size={20} className="text-white" />
        </button>
      )}
    </div>
  );
};

export default Portfolio;
