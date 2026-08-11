/**
 * Single source of truth for everything the site displays.
 *
 * Editing this file is the only thing needed to change content, add a project,
 * reorder the nav, or hide a whole section. The one exception is adding a brand
 * new *kind* of section, which also needs a renderer in src/sections/.
 *
 * After editing, run `node build.js` to refresh the pre-rendered HTML that
 * search engines and link-preview crawlers read. The live site is correct
 * either way -- the build only keeps the crawler snapshot in sync.
 */

export const portfolioData = {
  /** Absolute site URL, used for canonical + Open Graph tags. */
  siteUrl: "https://erfanshafagh.github.io/",

  /**
   * Nav order and labels. Remove an entry to hide that section entirely; the
   * tab, the panel, and its routing all disappear together.
   *
   *   scroll   the panel gets its own scrollbar on desktop instead of clipping
   *   icon     glyph for the mobile bottom bar (see src/lib/icons.js)
   *   short    label for the bottom bar, where a full label will not fit
   *   primary  gets its own slot in the mobile bottom bar; everything else
   *            goes behind "More". Keep this to four or the bar gets cramped.
   */
  sections: [
    { id: "about",        label: "About Me",     short: "About",    icon: "user",           primary: true, eyebrow: "Introduction",          heading: "Hi, I'm Erfan", scroll: true },
    { id: "education",    label: "Education",    short: "Education", icon: "graduation-cap",                eyebrow: "Academic Background",   heading: "Education",     scroll: true },
    { id: "experience",   label: "Experience",   short: "Work",     icon: "briefcase",      primary: true, eyebrow: "Work History",          heading: "Experience",    scroll: true },
    { id: "projects",     label: "Projects",     short: "Projects", icon: "squares-four",   primary: true, eyebrow: "Selected Work",         heading: "Projects"                    },
    { id: "skills",       label: "Skills",       short: "Skills",   icon: "wrench",                        eyebrow: "Technical Proficiency", heading: "Skills",        scroll: true },
    { id: "publications", label: "Publications", short: "Research", icon: "article",        primary: true, eyebrow: "Research & Writing",    heading: "Publications",  scroll: true },
    { id: "contact",      label: "Contact",      short: "Contact",  icon: "envelope",                      eyebrow: "Get In Touch",          heading: "Contact Me",    scroll: true },
  ],

  profile: {
    name: "Erfan Shafagh",
    role: "Machine Learning Researcher",
    location: "Burnaby, BC, Canada",
    avatar: "assets/img/avatar.webp",
    /**
     * Source of truth for the meta description, Open Graph and Twitter card
     * text. `node build.js` writes it into index.html so the head cannot
     * drift from this file.
     */
    tagline:
      "Machine Learning Researcher and Computer Science graduate student at Simon Fraser University, working on LLM-based and commit-level vulnerability detection, automated vulnerability patching, and agentic program analysis.",

    /** Drives the JSON-LD `knowsAbout` list, also written by build.js. */
    researchAreas: [
      "LLM-Based Vulnerability Detection",
      "Commit-Level Vulnerability Detection",
      "Automated Vulnerability Patching",
      "Agentic Graph-Based Program Analysis",
      "Adversarial Machine Learning",
      "Software Security",
      "Fraud Detection",
      "Weak Supervision",
      "Anomaly Detection",
      "Large Language Models",
    ],
    links: [
      { label: "esa104@sfu.ca",                 href: "mailto:esa104@sfu.ca",                       icon: "email"     },
      { label: "linkedin.com/in/erfan-shafagh", href: "https://www.linkedin.com/in/erfan-shafagh/", icon: "linkedin"  },
      { label: "github.com/erfanshafagh",       href: "https://github.com/erfanshafagh",            icon: "github"    },
      { label: "instagram.com/erfan.shafagh",   href: "https://instagram.com/erfan.shafagh",        icon: "instagram" },
      { label: "Resume",                        href: "assets/resume.pdf",                          icon: "cv"        },
      { label: "CV",                            href: "assets/cv.pdf",                              icon: "cv"        },
    ],
  },

  about: {
    bio: [
      "I'm a Machine Learning Researcher and Computer Science graduate student at Simon Fraser University, with a strong academic record. My current research sits at the intersection of large language models and software security: LLM-based and commit-level vulnerability detection, automated vulnerability patching, and agentic graph-based program analysis. This builds on earlier work in fraud detection, weak supervision, and anomaly detection.",
      "My research spans the full cycle, from problem formulation and dataset engineering to model development, experimentation, and publication. I enjoy working at the intersection of theory and real-world application, building ML systems that are robust, interpretable, and deployable. I'm passionate about graduate research, open-source contribution, and tackling complex problems with principled data-driven approaches.",
      "Outside the lab, I like building things just for the fun of it, especially small ideas that turn into something real. I spend time experimenting with web designs, tweaking my portfolio, or exploring random project ideas that catch my interest. I also enjoy staying up to date with new tech, particularly in AI trends.",
      "When I'm not coding, I watch movies like Inception and Interstellar (don't ask how many times I've rewatched them), and play games like Counter-Strike (definitely not a pro). I'm usually exploring new tools (mostly just clicking around to see what happens), watching tech content (and occasionally getting distracted by memes), and trying to stay consistent with the gym (don't ask if I actually am). I also like sketching out random ideas (they rarely make sense), listening to music while coding (sometimes too loudly), and attempting to cook new recipes (results may vary). Feel free to check out my website and stay in touch! \u{1F642}",
    ],
    /**
     * Every stat is derived, so none of them can drift out of sync with the
     * rest of this file.
     *
     *   count:"projects"  number of entries in that collection
     *   yearsSince:"..."  whole years elapsed, rounded down, with a "+"
     *   latestGpa         gpa of the most recent education entry that has one
     */
    stats: [
      { count: "publications",     label: "Publications" },
      { count: "projects",         label: "Projects"     },
      { yearsSince: "2023-01",     label: "Years Coding" },
      { latestGpa: true,           label: "GPA"          },
    ],
  },

  education: [
    {
      degree: "Master of Computer Science",
      school: "Simon Fraser University",
      website: "https://www.sfu.ca/",
      year: "May 2026 – Present",
      description:
        "Graduate studies in Computer Science with a research focus on LLM-based vulnerability detection, commit-level vulnerability detection, automated vulnerability patching, and agentic graph-based program analysis.",
      gpa: "4.0",
    },
    {
      degree: "Bachelor of Computer Science",
      school: "Simon Fraser University",
      website: "https://www.sfu.ca/",
      year: "Jan 2023 – Dec 2025",
      description:
        "President's Honour Roll once and Dean's Honour Roll twice. Specialized in machine learning and deep learning, with additional coursework in algorithms, databases, systems, and networking.",
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
    {
      title: "AI Engineer Intern",
      company: "Farpoint Technologies",
      website: "https://farpointhq.com",
      period: "May 2026 – Present",
      location: "Remote",
      highlights: [
        "Contributed to Fabric, a secure and private AI assistant built as an agentic harness around large language models.",
        "Designed and shipped core product features, including streaming reasoning components, onboarding flows, and file search.",
        "Diagnosed and resolved cross-platform bugs spanning encoding, rendering, and WSL environments.",
      ],
    },
    {
      title: "Teaching Assistant",
      company: "Simon Fraser University – CMPT 125",
      website: "https://www.sfu.ca/",
      period: "May 2026 – Present",
      location: "Burnaby, BC",
      highlights: [
        "Led lab sections and office hours, guiding students through core programming concepts, data structures, and algorithm design in C.",
        "Graded assignments and exams, providing detailed feedback to help students strengthen their problem-solving skills.",
      ],
    },
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
      description:
        "Researched and implemented adversarial attack generation techniques (SQLi, XSS) using language models. Fine-tuned multiple LLMs with reinforcement learning (GRPO) to bypass Web Application Firewalls, and designed custom reward functions optimizing payload diversity and effectiveness.",
      tags: ["LLM", "RL", "Security", "Python", "NLP"],
      links: { live: null, github: "https://github.com/erfanshafagh/Waffle" },
      image: "assets/img/waf.webp",
    },
    {
      name: "Corridor Robot",
      tagline: "Real-time path planning in ROS2",
      description:
        "Built a real-time path planning system in ROS2 for an RB1-base robot to navigate corridors while safely avoiding humans. Implemented Model Predictive Path Integral (MPPI) control and leveraged JAX-accelerated parallel computation for fast, smooth trajectory optimization.",
      tags: ["ROS2", "Python", "Robotics", "JAX", "MPPI"],
      links: { live: null, github: "https://github.com/erfanshafagh/mppi-ros2" },
      image: "assets/img/corridor-robot.webp",
    },
    {
      name: "Cleaning Robot Planner",
      tagline: "MCTS-based autonomous coverage",
      description:
        "Implemented a Monte Carlo Tree Search path planning algorithm in ROS2 for a TurtleBot3 to autonomously clean rooms with static obstacles. Used a grid-based environment representation with dynamic cell updates and optimized the MCTS reward system for coverage, collision avoidance, and path efficiency.",
      tags: ["ROS2", "MCTS", "Python", "Robotics"],
      links: { live: null, github: "https://github.com/SFU-MARS/ros2_tutorial/tree/cleaner_mcts" },
      image: "assets/img/cleaning-robot.webp",
    },
    {
      name: "Aerial Image Instance Segmentation",
      tagline: "Detectron2 segmentation at scale",
      description:
        "Built an instance segmentation pipeline for high-resolution aerial imagery using PyTorch and Detectron2. Handled large-scale data with custom loaders, block-based image tiling, and augmentations, fine-tuned a Faster R-CNN model to localize aerial objects, and engineered a custom encoder-decoder network with skip connections for precise pixel-level masking, optimizing against Intersection-over-Union.",
      tags: ["PyTorch", "Detectron2", "Computer Vision", "Python"],
      links: { live: null, github: null },
      image: "assets/img/aerial-segmentation.webp",
      // CC BY 4.0 requires visible credit, so this renders under the image.
      imageCredit: {
        text: "Aerial imagery: Land Information New Zealand, CC BY 4.0",
        href: "https://commons.wikimedia.org/wiki/File:Auckland_International_Airport_2017_aerial.png",
      },
    },
    {
      name: "AI Lyric Generation",
      tagline: "Fine-tuned GPT-2 for song lyrics",
      description:
        "Fine-tuned a GPT-2 transformer model to generate genre-specific (pop, rap) song lyrics. Compared parameter-efficient fine-tuning techniques including Residual Adapters and LoRA to adapt the LLM effectively. Evaluated outputs using perplexity metrics and human assessment of lyrical quality and genre relevance.",
      tags: ["NLP", "LoRA", "Python", "Transformers"],
      links: { live: null, github: null },
      image: "assets/img/lyric-generation.webp",
    },
    {
      name: "Urban Exploration Tools",
      tagline: "Data-driven location services",
      description:
        "Built a location-based service combining Haversine-distance filtering and user preferences to find nearby amenities, an OpenRouteService-powered tour planner generating optimal walking, biking, and driving routes, and a virtual tour-guide feature that identifies landmarks along interpolated paths.",
      tags: ["Python", "NumPy", "Pandas", "APIs"],
      links: { live: null, github: null },
      image: "assets/img/urban-exploration.webp",
    },
    {
      name: "Optical Character Recognition System",
      tagline: "CNN written from scratch in NumPy",
      description:
        "Implemented a convolutional neural network from scratch in NumPy, writing the forward and backward passes by hand, and built an OCR pipeline with OpenCV to segment, extract, and classify handwritten digits. Reached over 95% test accuracy on MNIST and visualized intermediate feature maps to show how the convolutional and ReLU layers pick out edges.",
      tags: ["NumPy", "OpenCV", "CNN", "Computer Vision", "Python"],
      links: { live: null, github: null },
      // CC0, no attribution required.
      image: "assets/img/ocr-mnist.webp",
    },
    {
      name: "Cinepass",
      tagline: "Movie reservation web app",
      description:
        "Collaborated in a team of six to develop a full-stack web application managing movie listings, user registrations, and seat reservations. Built secure authentication and booking flows using Spring Boot and PostgreSQL. Delivered iteratively following Agile methodology.",
      tags: ["Java", "Spring Boot", "PostgreSQL", "Agile"],
      links: { live: null, github: null },
      image: "assets/img/cinepass.webp",
    },
    {
      name: "Movie Title Generator",
      tagline: "Generative MLP built from the ground up",
      description:
        "Built a generative multilayer perceptron from the ground up to produce novel movie titles learned purely from data. Trained the model in PyTorch with CUDA GPU acceleration for hands-on intuition into the full deep learning training loop, and preprocessed a real-world movie title dataset for character-level generation.",
      tags: ["PyTorch", "Deep Learning", "Python"],
      links: { live: null, github: null },
      // Pexels License (Tima Miroshnichenko), no attribution required.
      image: "assets/img/movie-title-generator.webp",
    },
    {
      name: "Database Management System",
      tagline: "Normalized relational DB design",
      description:
        "Designed and implemented a normalized relational database in SQLite with a teammate, applying ER modeling, schema creation, data population, and complex query design to efficiently manage large volumes of structured data, with a Python application layer on top.",
      tags: ["SQLite", "SQL", "Python", "Database Design"],
      links: { live: null, github: "https://github.com/erfanshafagh/dbDesign" },
      image: "assets/img/dbdesign.png",
    },
    {
      name: "Socket Chat Program",
      tagline: "Multithreaded UDP chat in C",
      description:
        "Developed a multithreaded UDP socket chat application in C enabling two-way communication over a network. Used concurrent operation handling to ensure responsiveness and reliable message delivery across users.",
      tags: ["C", "UDP", "Networking", "Multithreading"],
      links: { live: null, github: "https://github.com/erfanshafagh/s-talk" },
      image: "assets/img/socket-chat.webp",
    },
    {
      name: "Spotify API Integration",
      tagline: "Automated playlist population",
      description:
        "Developed a Python script to process audio files, extract metadata across multiple formats (MP3, FLAC, M4A), and automatically search and add matching tracks to a Spotify playlist via the Spotify Web API.",
      tags: ["Python", "Spotify API", "Automation"],
      links: { live: null, github: "https://github.com/erfanshafagh/SpotifyAPI" },
      image: "assets/img/spotify-api.webp",
    },
  ],

  /**
   * `hue` is a plain HSL hue (0-360). Each theme derives its own saturation and
   * lightness from it in styles/sections.css, so category colours stay legible
   * in both themes instead of being fixed hexes that go dark-on-dark.
   */
  skills: [
    { category: "Languages",              hue: 210, items: ["Python", "C++", "C", "Java"] },
    { category: "Learning Paradigms",     hue: 295, items: ["Supervised Learning", "Unsupervised Learning", "Semi-supervised Learning", "Self-supervised Learning", "Reinforcement Learning"] },
    { category: "Domains",                hue:  32, items: ["Software Security", "Vulnerability Detection", "Fraud Detection", "Anomaly Detection", "Computer Vision", "Natural Language Processing"] },
    { category: "Frameworks & Libraries", hue: 183, items: ["PyTorch", "Scikit-learn", "NumPy", "Pandas", "Matplotlib", "Hugging Face", "JAX", "OpenCV", "Detectron2", "ROS2", "Spring Boot"] },
    { category: "Databases",              hue: 135, items: ["SQL", "PostgreSQL", "SQLite"] },
    { category: "Developer Tools",        hue:   5, items: ["Linux", "Git", "GitHub", "Docker", "VS Code", "Jupyter Notebooks", "Google Colab", "Kaggle"] },
    { category: "Fundamentals",           hue:  50, items: ["Data Structures and Algorithms", "Object-Oriented Programming", "Database Design"] },
    { category: "Soft Skills",            hue:  96, items: ["Team Collaboration", "Clear Communication", "Reliability", "Accountability", "Agile Methodology", "Problem-Solving"] },
  ],

  publications: [
    {
      title: "CleverCatch: A Knowledge-Guided Weak Supervision Model for Fraud Detection",
      venue: "IEEE International Conference on Big Data · 2025",
      venueLink: "https://conferences.cis.um.edu.mo/ieeebigdata2025/",
      authors: ["A. Mozafari", "K. Hashemi", "E. Shafagh", "S. Motamedi", "A. Taheri", "M. A. Tayebi"],
      highlightAuthor: "E. Shafagh",
      abstract:
        "Healthcare fraud detection is challenging due to scarce labels, evolving fraud patterns, and complex medical data. We propose CleverCatch, a knowledge-guided weak supervision model that integrates domain expertise with neural learning to detect fraudulent prescription behavior. By aligning expert rules and data in a shared embedding space and training on synthetic compliance and violation cases, the model learns patterns that generalize to real-world data. Experiments show improved performance over state-of-the-art methods, with gains in AUC and recall, while also enhancing interpretability.",
      links: { pdf: null, doi: "https://arxiv.org/abs/2510.13205" },
      citations: null,
      tags: ["Fraud Detection", "Weak Supervision", "ML/DL"],
    },
  ],

  contact: {
    /** Set false to drop the Contact tab entirely. */
    display: true,
    /** Set true to show the contact form. It has no backend -- wire one up first. */
    form: false,
    intro:
      "Interested in research collaboration, graduate opportunities, or just want to talk ML? Feel free to reach out. I'm always happy to connect.",
    email: "esa104@sfu.ca",
    availability: "Open to research collaborations & grad opportunities",
    responseTime: "I usually reply within 48 hours",
    socials: [
      { label: "LinkedIn",  href: "https://www.linkedin.com/in/erfan-shafagh/", icon: "linkedin"  },
      { label: "GitHub",    href: "https://github.com/erfanshafagh",            icon: "github"    },
      { label: "Instagram", href: "https://instagram.com/erfan.shafagh",        icon: "instagram" },
    ],
  },
};
