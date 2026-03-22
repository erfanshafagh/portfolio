const portfolioData = {
  profile: {
    name: "Erfan Shafagh",
    role: "Machine Learning Researcher",
    location: "Burnaby, BC, Canada",
    avatar: "assets/avatar.PNG",
    links: [
      { label: "esa104@sfu.ca",                    href: "mailto:esa104@sfu.ca",                          icon: "email"    },
      { label: "linkedin.com/in/erfan-shafagh",    href: "https://www.linkedin.com/in/erfan-shafagh/",    icon: "linkedin" },
      { label: "github.com/erfanshafagh",           href: "https://github.com/erfanshafagh",               icon: "github"   },
      { label: "instagram.com/erfan.shafagh",       href: "https://instagram.com/erfan.shafagh",           icon: "instagram"},
      { label: "Resume",                       href: "assets/resume.pdf", icon: "cv"      },
      { label: "CV",                       href: "assets/cv.pdf", icon: "cv"      },
    ],
  },

  about: {
    greeting: "Hi, I'm Erfan",
    bio: [
      "I'm a Machine Learning Researcher and Computer Science graduate student at Simon Fraser University, with a strong academic record and a focus on fraud detection, weak supervision, anomaly detection, and large language models.",
      "My research spans the full cycle, from problem formulation and dataset engineering to model development, experimentation, and publication. I enjoy working at the intersection of theory and real-world application, building ML systems that are robust, interpretable, and deployable. I'm passionate about graduate research, open-source contribution, and tackling complex problems with principled data-driven approaches.",
      "Outside the lab, I like building things just for the fun of it, especially small ideas that turn into something real. I spend time experimenting with web designs, tweaking my portfolio, or exploring random project ideas that catch my interest. I also enjoy staying up to date with new tech, particularly in AI trends. ",
      "When I'm not coding, I watch movies like Inception and Interstellar (don't ask how many times I've rewatched them), and play games like Counter-Strike (definitely not a pro). I'm usually exploring new tools (mostly just clicking around to see what happens), watching tech content (and occasionally getting distracted by memes), and trying to stay consistent with the gym (don't ask if I actually am). I also like sketching out random ideas (they rarely make sense), listening to music while coding (sometimes too loudly), and attempting to cook new recipes (results may vary). Feel free to check out my website and stay in touch! 🙂",
    ],
    stats: [
      { value: "1+",   label: "Publications" },
      { value: "10+",   label: "Projects"     },
      { value: "3+",   label: "Years Coding" },
      { value: "3.46", label: "GPA"  },
    ],
  },

  education: [
    {
      degree: "Master of Computer Science",
      school: "Simon Fraser University",
      website: "https://www.sfu.ca/",
      year: "May 2026 – Present",
      description: "Graduate studies in Computer Science with a research focus on machine learning, fraud detection, weak supervision, and anomaly detection.",
      gpa: null,
    },
    {
      degree: "Bachelor of Computer Science",
      school: "Simon Fraser University",
      website: "https://www.sfu.ca/",
      year: "Jan 2023 – Dec 2025",
      description: "President’s Honour Roll once and Dean’s Honour Roll twice. Specialized in machine learning and deep learning, with additional coursework in algorithms, databases, systems, and networking.",
      gpa: "3.46",
    },
  ],

  experience: [
    {
      title: "Research Assistant",
      company: "SFU – TBLab",
      website: "https://www.sfu.ca/~mat15/",
      period: "Nov 2024 – Present",
      location: "Burnaby, BC",
      highlights: [
        "Gained hands-on experience with the full research cycle, from problem formulation to experimentation and evaluation.",
        "Conducted research in fraud detection using weak supervision and anomaly detection methods.",
        "Applied deep learning methods to real-world, high-dimensional datasets.",
        "Collaborated in an academic research setting, contributing to publications and interdisciplinary teamwork.",
      ],
    },
    // {
    //   title: "Research Intern",
    //   company: "Ace 1 Media",
    //   website: "https://ace1m.com/",
    //   period: "May 2026 – Present",
    //   location: "Remote",
    //   highlights: [
    //     "Developed ML-based fraud detection models to identify botnets and invalid ad traffic.",
    //     "Engineered high-dimensional and temporal features from large-scale traffic logs.",
    //     "Applied semi-supervised anomaly detection under conditions of limited labeled data.",
    //     "Designed an end-to-end pipeline for real-time traffic analysis and fraud classification.",
    //   ],
    // },
    {
      title: "Program Coordinator",
      company: "FOSINT-SI Symposium",
      website: "https://fosint-si.github.io/",
      period: "Mar 2026 – Present",
      location: "Remote",
      highlights: [
        "Managed paper submissions and author–reviewer communication.",
        "Designed and maintained the conference website and media content.",
      ],
    },
    {
      title: "Python Tutor (Volunteer)",
      company: "Simon Fraser University",
      website: "https://www.sfu.ca/",
      period: "Feb – Mar 2023",
      location: "Burnaby, BC",
      highlights: [
        "Provided individualized guidance to an undergraduate student on Python fundamentals.",
        "Adapted tutoring approaches to fit the student's individual learning style and pace.",
      ],
    },
  ],

  projects: [
    {
      name: "WAF Adversarial Learning",
      tagline: "Adversarial & defensive LLMs",
      description: "Researched and implemented adversarial attack generation techniques (SQLi, XSS) using language models. Fine-tuned multiple LLMs with reinforcement learning (GRPO) to bypass Web Application Firewalls, and designed custom reward functions optimizing payload diversity and effectiveness.",
      tags: ["LLM", "RL", "Security", "Python", "NLP"],
      links: { live: null, github: "https://github.com/erfanshafagh/Waffle" },
      image: "assets/waf.png",
    },
    {
      name: "Corridor Robot",
      tagline: "Real-time path planning in ROS2",
      description: "Built a real-time path planning system in ROS2 for an RB1-base robot to navigate corridors while safely avoiding humans. Implemented Model Predictive Path Integral (MPPI) control and leveraged JAX-accelerated parallel computation for fast, smooth trajectory optimization.",
      tags: ["ROS2", "Python", "Robotics", "JAX", "MPPI"],
      links: { live: null, github: "https://github.com/erfanshafagh/mppi-ros2" },
      image: "assets/corridor-robot.png",
    },
    {
      name: "Cleaning Robot Planner",
      tagline: "MCTS-based autonomous coverage",
      description: "Implemented a Monte Carlo Tree Search path planning algorithm in ROS2 for a TurtleBot3 to autonomously clean rooms with static obstacles. Used a grid-based environment representation with dynamic cell updates and optimized the MCTS reward system for coverage, collision avoidance, and path efficiency.",
      tags: ["ROS2", "MCTS", "Python", "Robotics"],
      links: { live: null, github: "https://github.com/SFU-MARS/ros2_tutorial/tree/cleaner_mcts" },
      image: "assets/cleaning-robot.png",
    },
    {
      name: "AI Lyric Generation",
      tagline: "Fine-tuned GPT-2 for song lyrics",
      description: "Fine-tuned a GPT-2 transformer model to generate genre-specific (pop, rap) song lyrics. Compared parameter-efficient fine-tuning techniques including Residual Adapters and LoRA to adapt the LLM effectively. Evaluated outputs using perplexity metrics and human assessment of lyrical quality and genre relevance.",
      tags: ["NLP", "LoRA", "Python", "Transformers"],
      links: { live: null, github: null },
      image: "assets/lyric-generation.png",
    },
    {
      name: "Urban Exploration Tools",
      tagline: "Data-driven location services",
      description: "Built a location-based service combining Haversine-distance filtering and user preferences to find nearby amenities, an OpenRouteService-powered tour planner generating optimal walking, biking, and driving routes, and a virtual tour-guide feature that identifies landmarks along interpolated paths.",
      tags: ["Python", "NumPy", "Pandas", "APIs"],
      links: { live: null, github: null },
      image: "assets/urban-exploration.jpg",
    },
    {
      name: "Cinepass",
      tagline: "Movie reservation web app",
      description: "Collaborated in a team of six to develop a full-stack web application managing movie listings, user registrations, and seat reservations. Built secure authentication and booking flows using Spring Boot and PostgreSQL. Delivered iteratively following Agile methodology.",
      tags: ["Java", "Spring Boot", "PostgreSQL", "Agile"],
      links: { live: null, github: null },
      image: "assets/cinepass.png",
    },
    {
      name: "Database Management System",
      tagline: "Normalized relational DB design",
      description: "Designed and implemented a normalized relational database in SQLite with a teammate, applying ER modeling, schema creation, data population, and complex query design to efficiently manage large volumes of structured data, with a Python application layer on top.",
      tags: ["SQLite", "SQL", "Python", "Database Design"],
      links: { live: null, github: "https://github.com/erfanshafagh/dbDesign" },
      image: "assets/dbdesign.png",
    },
    {
      name: "Socket Chat Program",
      tagline: "Multithreaded UDP chat in C",
      description: "Developed a multithreaded UDP socket chat application in C enabling two-way communication over a network. Used concurrent operation handling to ensure responsiveness and reliable message delivery across users.",
      tags: ["C", "UDP", "Networking", "Multithreading"],
      links: { live: null, github: "https://github.com/erfanshafagh/s-talk" },
      image: "assets/socket-chat.jpg",
    },
    {
      name: "Spotify API Integration",
      tagline: "Automated playlist population",
      description: "Developed a Python script to process audio files, extract metadata across multiple formats (MP3, FLAC, M4A), and automatically search and add matching tracks to a Spotify playlist via the Spotify Web API.",
      tags: ["Python", "Spotify API", "Automation"],
      links: { live: null, github: "https://github.com/erfanshafagh/SpotifyAPI" },
      image: "assets/spotify-api.jpg",
    },
  ],

  skills: [
    {
      category: "Languages",
      color: "#284b63",
      items: ["Python", "C++", "C", "Java"],
    },
    {
      category: "ML / DL",
      color: "#3c6e71",
      items: ["PyTorch", "Scikit-learn", "NumPy", "Pandas", "Matplotlib", "Hugging Face", "Kaggle", "Google Colab"],
    },
    {
      category: "Databases",
      color: "#4a844e",
      items: ["SQL", "PostgreSQL", "SQLite"],
    },
    {
      category: "Systems",
      color: "#7d5e5e",
      items: ["Linux", "Git", "GitHub"],
    },
    {
      category: "Technical",
      color: "#3c6e71",
      items: ["Data Structures and Algorithms", "Problem Solving", "Debugging", "Agile Methodology"],
    },
    {
      category: "Soft Skills",
      color: "#632857",
      items: ["Team Collaboration", "Clear Communication", "Reliability", "Accountability", "Adaptability in Dynamic Environments"],
    },
  ],

  publications: [
    {
      title: "CleverCatch: A Knowledge-Guided Weak Supervision Model for Fraud Detection",
      venue: "IEEE International Conference on Big Data · 2025",
      venueLink: "https://conferences.cis.um.edu.mo/ieeebigdata2025/",
      year: "2025",
      authors: ["A. Mozafari", "K. Hashemi", "E. Shafagh", "S. Motamedi", "A. Taheri", "M. A. Tayebi"],
      highlightAuthor: "E. Shafagh",
      abstract: "Healthcare fraud detection is challenging due to scarce labels, evolving fraud patterns, and complex medical data. We propose CleverCatch, a knowledge-guided weak supervision model that integrates domain expertise with neural learning to detect fraudulent prescription behavior. By aligning expert rules and data in a shared embedding space and training on synthetic compliance and violation cases, the model learns patterns that generalize to real-world data. Experiments show improved performance over state-of-the-art methods, with gains in AUC and recall, while also enhancing interpretability.",
      links: { pdf: null, doi: "https://arxiv.org/abs/2510.13205" },
      citations: null,
      tags: ["Fraud Detection", "Weak Supervision", "ML/DL"],
    },
  ],

  contact: {
    display: true,   // set false to hide the contact section
    form: false,   // set true to show the contact form
    intro: "Interested in research collaboration, graduate opportunities, or just want to talk ML? Feel free to reach out. I'm always happy to connect.",
    email: "esa104@sfu.ca",
    availability: "Open to research collaborations & grad opportunities",
    responseTime: "Usually responds within 48 hours",
    socials: [
      { label: "LinkedIn",  href: "https://www.linkedin.com/in/erfan-shafagh/", icon: "ph-linkedin-logo"  },
      { label: "GitHub",    href: "https://github.com/erfanshafagh",             icon: "ph-github-logo"    },
      { label: "Instagram", href: "https://instagram.com/erfan.shafagh",         icon: "ph-instagram-logo" },
    ],
  },
};