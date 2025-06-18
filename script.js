const projects = [
    {
        img: "./assets/initial-slam-map.png",
        title: "Autonomous Cleaning Robot Path Planning",
        description: "Designed and implemented a ROS2-based path planning system for TurtleBot3 using Monte Carlo Tree Search to autonomously clean rooms while avoiding static obstacles and optimizing coverage efficiency.",
        badges: `
            <div class="badges">
                <span class="badge badge-red">Robotics</span>
                <span class="badge badge-brown">ROS2</span>
                <span class="badge badge-green">MCTS</span>
            </div>
        `,
        tags: ['Robotics', 'ROS2', 'MCTS'],
        github: 'https://github.com/SFU-MARS/ros2_tutorial/tree/cleaner_mcts'
    },
    // {
    //     img: "./assets/fraud.png",
    //     title: "Fraud Detection",
    //     description: "A research project focused on detecting fraudulent activities in prescription datasets. Utilized advanced data preprocessing and unsupervised learning algorithms to identify anomalies and uncover patterns in complex datasets.",
    //     badges: `
    //         <div class="badges">
    //             <span class="badge badge-green">Python</span>
    //             <span class="badge badge-brown">ML</span>
    //         </div>
    //     `,
    //     tags: ['Python', 'ML'],
    //     github: ''
    // },
    {
        img: "./assets/llm.png",
        title: "AI Song Lyric Generation",
        description: "Fine-tuned GPT-2 with parameter-efficient methods (Adapters, LoRA) to generate genre-specific song lyrics, evaluated using perplexity and human judgments.",
        badges: `
            <div class="badges">
                <span class="badge badge-purple">Python</span>
                <span class="badge badge-blue">NLP</span>
                <span class="badge badge-green">LLM</span>
            </div>
        `,
        tags: ['Python', 'NLP', 'LLM'],
        github: 'https://drive.google.com/drive/folders/1X4j89rxxkbcUG9T9s3kRpvH9n0AcpH-o?usp=sharing'
    },
    {
        img: "./assets/cinepass.png",
        title: "Cinepass",
        description: "Cinepass is a web application for managing movie listings, user registrations, and bookings for movies, concerts, and sports events. Users can browse events, book tickets, and view past orders, while admins can add new events. Built with Spring Boot, Thymeleaf, and a database for data persistence, it features user authentication and account management.",
        badges: `
            <div class="badges">
                <span class="badge badge-orange">Java</span>
                <span class="badge badge-red">PostgreSQL</span>
                <span class="badge badge-teal">Backend</span>
            </div>
        `,
        tags: ['Java', 'PostgreSQL', 'Backend'],
        github: 'https://rizzervit.onrender.com/home'
    },
    {
        img: "./assets/MovieTitleGenerator.jpg",
        title: "Movie Title Generator",
        description: "This project is about generating movie titles using a Multilayer Perceptron (MLP) neural network built with PyTorch.",
        badges: `
            <div class="badges">
                <span class="badge badge-purple">Python</span>
                <span class="badge badge-blue">MLP</span>
            </div>
        `,
        tags: ['Python', 'MLP'],
        github: 'https://github.com/erfanshafagh/MovieTitleGenerator'
    },
    {
        img: "./assets/db-diagram.png",
        title: "Database Management",
        description: "This project implements a database schema and functionalities for managing research grant competitions and related entities. This project involves creating and managing a database for a council that oversees research grant applications, competitions, and reviewer assignments.",
        badges: `
            <div class="badges">
                <span class="badge badge-pink">Python</span>
                <span class="badge badge-yellow">SQL</span>
            </div>
        `,
        tags: ['Python', 'SQL'],
        github: "https://github.com/erfanshafagh/dbDesign"
    },
    {
        img: "./assets/spotifyIcon.jpg",
        title: "Spotify API",
        description: "This Python script processes audio files, extracts metadata, and updates a Spotify playlist based on the extracted information.",
        badges: `
            <div class="badges">
                <span class="badge badge-orange">Python</span>
                <span class="badge badge-teal">API</span>
            </div>
        `,
        tags: ['Python', 'API'],
        github: "https://github.com/erfanshafagh/SpotifyAPI"
    },
    {
        img: "./assets/socket-diagram.jpg",
        title: "Socket Networking",
        description: "This project (s-talk) is a command-line chat program that enables communication between two users over a network. It uses UDP sockets for message transmission. The program is developed in C and consists of different modules for input handling, message sending, message receiving, and overall socket management.",
        badges: `
            <div class="badges">
                <span class="badge badge-yellow">C</span>
                <span class="badge badge-green">Multi-threading</span>
                <span class="badge badge-cyan">Socket</span>
            </div>
        `,
        tags: ['C', 'Multi-threading', 'Socket'],
        github: "https://github.com/erfanshafagh/s-talk"
    },
    {
        img: "./assets/OS_simulation.jpg",
        title: "OS Simulation",
        description: "This project simulates the behavior of a simple operating system with various processes and commands. It provides an interface for users to interact with the simulated operating system through a command-line interface.",
        badges: `
            <div class="badges">
                <span class="badge badge-pink">C++</span>
                <span class="badge badge-indigo">OS</span>
            </div>
        `,
        tags: ['C++', 'OS'],
        github: "https://github.com/erfanshafagh/OS_Simulation"
    },
    
    {
        img: "./assets/photoshop.png",
        title: "Mini Photoshop",
        description: "Mini Photoshop is a Python-based image editing application with a user-friendly GUI built using Tkinter. It provides essential image processing features such as opening BMP files, grayscale conversion, ordered dithering, auto-level adjustment, blur, and more. The application uses PIL, NumPy, and Struct for efficient image processing.",
        badges: `
            <div class="badges">
                <span class="badge badge-orange">Python</span>
                <span class="badge badge-blue">GUI</span>
                <span class="badge badge-green">CV</span>
            </div>
        `,
        tags: ['Python', 'GUI', 'CV'],
        github: "https://github.com/erfanshafagh/miniPhotoshop"
    },
    {
        img: "./assets/rasterization.png",
        title: "Rasterization Algorithms",
        description: "A JavaScript-based project that implements rasterization algorithms to draw lines and triangles with color interpolation. Features include line rendering, triangle rasterization using barycentric coordinates, and creative graphical outputs.",
        badges: `
            <div class="badges">
                <span class="badge badge-yellow">JavaScript</span>
                <span class="badge badge-pink">Graphics</span>
            </div>
        `,
        tags: ['JavaScript', 'Graphics'],
        github: "https://github.com/erfanshafagh/Rasterization"
    },
    {
        img: "./assets/ds-diagram.png",
        title: "Bank Simulation",
        description: "This project implements a bank simulation system in C++. It simulates a bank system with customer arrivals and departures using priority queues, binary heap and queues to manage customers. The project uses dynamic circular queues to represent the bank line, ensuring FIFO order and dynamically adjusting capacity as needed.",
        badges: `
            <div class="badges">
                <span class="badge badge-blue">C++</span>
                <span class="badge badge-brown">OOP</span>
                <span class="badge badge-red">DS</span>
            </div>
        `,
        tags: ['C++', 'OOP', 'DS'],
        github: "https://github.com/erfanshafagh/bankSimulation"
    }
];

// --- Skills Data ---
const skills = [
    { name: 'Python', class: 'badge-purple' },
    { name: 'ML', class: 'badge-green' },
    { name: 'RL', class: 'badge-orange' },
    { name: 'Robotics', class: 'badge-red' },
    { name: 'Git', class: 'badge-blue' },
    { name: 'GitHub', class: 'badge-teal' },
    { name: 'SQL', class: 'badge-yellow' },
    { name: 'PyTorch', class: 'badge-brown' },
    { name: 'C++', class: 'badge-pink' },
    { name: 'Matlab', class: 'badge-cyan' },
    { name: 'DSA', class: 'badge-indigo' },
    { name: 'Java', class: 'badge-orange' },
    { name: 'PostgreSQL', class: 'badge-teal' },
    { name: 'Backend', class: 'badge-red' },
    { name: 'CV', class: 'badge-green' },
    { name: 'GUI', class: 'badge-blue' },
    { name: 'Graphics', class: 'badge-purple' },
    { name: 'Multi-threading', class: 'badge-indigo' },
    { name: 'Socket', class: 'badge-cyan' },
    { name: 'OS', class: 'badge-brown' },
    { name: 'MLP', class: 'badge-pink' },
    { name: 'NumPy', class: 'badge-green' }    
    // Add more skills here later
];

// --- Timeline Data ---
const timelineEntries = [
    {
        date: "Nov 2024 - Present",
        title: "Research Assistant",
        subtitle: "Simon Fraser University",
        details: "Burnaby, BC, CANADA"
        // Add more details like GPA, relevant courses as needed
    },
    {
        date: "Feb - Mar 2023",
        title: "Python Tutor",
        subtitle: "Volunteer",
        details: "Burnaby, BC, CANADA"
        // Add description of responsibilities if desired
    },
    {
        date: "Jan 2023 - Present",
        title: "Bachelor of Computer Science",
        subtitle: "Simon Fraser University",
        details: "Burnaby, BC, CANADA"
    }
    // Add more entries here later
];

// --- Publications Data - UNCOMMENTED ---
const publications = [
    {
        date: { month: "From", year: "April<br>2025" }, // Example date
        title: "Waffle: Agent-Based Adversarial and Defensive Co-Learning for Adaptive Web Application Firewalls",
        venue: "Mohammad A. Tayebi, <b>Erfan Shafagh,</b> et al.",
        description: "In progress"
    },
    {
        date: { month: "May", year: "2025" }, // Example date
        title: "CleverCatch: A Knowledge-Guided Weak Supervision Model for Fraud Detection",
        description: "Under Review, CIKM 25",
        // venueIcon: "fas fa-book", // or fas fa-microphone-alt for talks
        venue: "A. Mozafari,  K. Hashemi, <b>E. Shafagh,</b> S. Motamedi, A. Taheri, and M. A. Tayebi",
        // link: "#" // Placeholder link
    }
    // Add more publications or talks here later
];

// --- Certificates Data (Simplified) ---
const certificates = [
    { name: "AWS Certified Solutions Architect", link: "#" }, // Link optional
    { name: "Google Professional Cloud Developer", link: "#" },
    { name: "Microsoft Certified: Azure Developer Associate", link: "#" }
    // Add more certificates here later
];

// --- Visibility Flags ---
const showPublications = true; 
const showCertificates = false; // Set to false to hide Certificates section

// --- Global Variables ---
let projectsVisible = 3; // Default, will be adjusted on load
let currentFilterTag = 'All'; 
let filteredProjects = projects; 

// --- Core Functions ---

// Function to get unique tags from projects
const getUniqueTags = () => {
    const allTags = projects.reduce((acc, project) => {
        return acc.concat(project.tags || []); 
    }, []);
    const uniqueTags = [...new Set(allTags)].sort(); // Get unique tags and sort them alphabetically
    return ['All', ...uniqueTags]; // Prepend 'All' to the sorted list
};

// Function to populate the filter dropdown - NEW
const populateFilterDropdown = () => {
    const selectElement = document.getElementById("project-filter-select");
    if (!selectElement) {
        console.error("Filter select element (#project-filter-select) not found!");
        return;
    }

    const uniqueTags = getUniqueTags();
    selectElement.innerHTML = ''; // Clear existing options

    uniqueTags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        selectElement.appendChild(option);
    });

    // Set initial value
    selectElement.value = currentFilterTag; 

    // Add event listener for changes
    selectElement.addEventListener('change', (event) => {
        currentFilterTag = event.target.value;
        projectsVisible = 3; // Reset visible count when filter changes
        // No need to re-render dropdown itself, just projects
        renderProjects(); 
    });
};

// Function to render skill badges
const renderSkills = () => {
    const skillsList = document.getElementById("skills-list");
    if (!skillsList) {
        console.error("Skills list container (#skills-list) not found!");
        return;
    }
    skillsList.innerHTML = ''; // Clear existing badges
    skills.forEach(skill => {
        const badge = document.createElement('span');
        badge.classList.add('badge', skill.class);
        badge.textContent = skill.name;
        skillsList.appendChild(badge);
    });
};

// Function to render timeline entries
const renderTimeline = () => {
    const timelineContainer = document.querySelector(".timeline"); // Target the container
    if (!timelineContainer) {
        console.error("Timeline container (.timeline) not found!");
        return;
    }
    timelineContainer.innerHTML = ''; // Clear existing items

    timelineEntries.forEach(entry => {
        const item = document.createElement('div');
        item.classList.add('timeline-item', 'reveal-fade'); // Add reveal class

        item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-date">${entry.date}</div>
            <div class="timeline-content">
                <h3>${entry.title}</h3>
                ${entry.subtitle ? `<h4>${entry.subtitle}</h4>` : ''} 
                ${entry.details ? `<p>${entry.details}</p>` : ''}
            </div>
        `;
        timelineContainer.appendChild(item);
    });

    // Re-run reveal check after adding timeline items
    revealElementsOnScroll(); 
};

// Function to render publications - UNCOMMENTED
const renderPublications = () => {
    const section = document.getElementById("publications");
    if (!section) return; // Exit if section itself doesn't exist
    
    // Hide section if flag is false
    if (!showPublications) {
        section.style.display = 'none';
        return;
    }
    // Ensure section is visible if flag is true
    section.style.display = ''; // Reset display style

    const wrapper = section.querySelector(".publications-wrapper"); // Target wrapper within the section
    if (!wrapper) {
        console.error("Publications wrapper (.publications-wrapper) not found!");
        return;
    }
    wrapper.innerHTML = ''; // Clear existing items

    publications.forEach(pub => {
        const card = document.createElement('div');
        card.classList.add('publication-card', 'reveal-fade');

        card.innerHTML = `
            <div class="publication-date">
                <span class="month">${pub.date.month}</span>
                <span class="year">${pub.date.year}</span>
            </div>
            <div class="publication-content">
                <h3>${pub.title}</h3>
                <div class="publication-venue">
                    ${pub.venueIcon ? `<i class="${pub.venueIcon}"></i>` : ''} ${pub.venue}
                </div> 
                <p>${pub.description}</p> 
                <!--  ${pub.link ? `<a href="${pub.link}" target="_blank" class="publication-link">Read More</a>` : '' } -->
            </div>
        `;
        wrapper.appendChild(card);
    });

    revealElementsOnScroll(); 
};

// Function to render certificates (NEW Logic)
const renderCertificates = () => {
    const section = document.getElementById("certificates");
    if (!section) return; 
    
    if (!showCertificates) {
        section.style.display = 'none';
        return;
    }
    section.style.display = ''; 

    const listElement = section.querySelector("#certificates-list"); 
    if (!listElement) {
        console.error("Certificates list (#certificates-list) not found!");
        return;
    }
    listElement.innerHTML = ''; 

    // SVG Icon HTML (using currentColor)
    const svgIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" class="cert-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
    `;

    certificates.forEach(cert => {
        const listItem = document.createElement('li');
        
        let content = `${svgIcon}<span>${cert.name}</span>`;
        // Wrap in link if provided
        if (cert.link && cert.link !== '#') {
           content = `<a href="${cert.link}" target="_blank" class="certificate-link">${content}</a>`;
        }

        listItem.innerHTML = content;
        listElement.appendChild(listItem);
    });

    // We only need to trigger reveal for the section container now
    // revealElementsOnScroll(); // Reveal logic handles the section itself
};

// Define reveal function globally
const revealElementsOnScroll = () => {
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-left, .reveal-right, .reveal-fade');
    const projectListContainer = document.getElementById("project-list");
    const filterWrapper = document.querySelector(".filter-select-wrapper"); // Select the wrapper div

    let allRevealElements = Array.from(revealElements);
    if (projectListContainer) {
        const dynamicProjectCards = projectListContainer.querySelectorAll('.project-card.reveal-fade');
        allRevealElements = [...allRevealElements, ...Array.from(dynamicProjectCards)];
    }
    // Include filter dropdown wrapper in reveal animation if it has the class
    if (filterWrapper && filterWrapper.classList.contains('reveal-fade')) {
        allRevealElements.push(filterWrapper);
    }

    allRevealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisibleThreshold = 50; 
        if (elementTop < window.innerHeight - elementVisibleThreshold) {
            element.classList.add('active');
        } 
    });
};

// Updated Function to render the projects (handles filtering)
function renderProjects() {
    const projectList = document.getElementById("project-list");
    const showMoreBtn = document.getElementById("show-more-btn");
    
    if (!projectList) {
        console.error("Project list element (#project-list) not found!"); 
        return;
    }

    // 1. Filter projects based on the current tag
    filteredProjects = projects.filter(project => 
        currentFilterTag === 'All' || (project.tags && project.tags.includes(currentFilterTag))
    );

    // 2. Determine visible projects from the filtered list
    projectList.innerHTML = '';
    const visibleFilteredProjects = filteredProjects.slice(0, Math.min(projectsVisible, filteredProjects.length)); 

    // 3. Render the visible filtered projects
    if (visibleFilteredProjects.length === 0) {
        projectList.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No projects match this filter.</p>';
    } else {
        visibleFilteredProjects.forEach(project => {
            const card = document.createElement("div");
            card.classList.add("project-card"); 
            card.classList.add("reveal-fade"); 

            card.innerHTML = `
                <div class="project-img">
                    <img src="${project.img}" alt="${project.title}">
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    ${project.badges} 
                     <div class="project-links">
                        ${project.github === 'https://rizzervit.onrender.com/home' || project.github === 'https://drive.google.com/drive/folders/1X4j89rxxkbcUG9T9s3kRpvH9n0AcpH-o?usp=sharing' ? 
                            `<a href="${project.github}" target="_blank" class="project-link github-link"><i class="fas fa-globe"></i> Website</a>` :
                        project.github ? 
                            `<a href="${project.github}" target="_blank" class="project-link github-link"><i class="fab fa-github"></i> GitHub</a>` :
                        ''}
                     </div>
                </div>
            `;
           
            projectList.appendChild(card);
        });
    }

    // 4. Update Show More Button based on the filtered list
    if (showMoreBtn) {
        const totalFilteredProjects = filteredProjects.length;
        const currentlyVisibleCount = visibleFilteredProjects.length;

        if (currentlyVisibleCount >= totalFilteredProjects) {
             // If all filtered projects are shown, decide whether to show "Show Less" or hide
             if (totalFilteredProjects > 3) { // Only show "Show Less" if more than initial load were ever possible
                 showMoreBtn.textContent = "Show Less";
                 showMoreBtn.style.display = 'inline-block';
             } else {
                 showMoreBtn.style.display = 'none'; // Hide if total filtered is 3 or less
             }
        } else {
            showMoreBtn.textContent = "Show More";
            showMoreBtn.style.display = 'inline-block'; // Ensure it's visible
        }
    }

    // Call reveal function AFTER rendering
    revealElementsOnScroll(); 
}

// --- Helper Functions (scrollToTop, scrollFunction) ---
function scrollToTop(){
    window.scrollTo({top: 0, behavior: 'smooth'});
}

const backToTopButton = document.getElementById('backToTop');
const scrollFunction = () => {
    if (!backToTopButton) return; 
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
}

// --- DOMContentLoaded Event Listener ---
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const showMoreBtn = document.getElementById("show-more-btn"); 
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const backToTopBtnElement = document.getElementById('backToTop');
  const projectListElement = document.getElementById("project-list");

  // Mobile menu toggle
  if (hamburger && navLinks) { 
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Theme toggle functionality
  if (themeToggle && htmlElement) { 
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const updateThemeIcon = (isDarkMode) => {
          if (!themeToggle) return;
          const sunIcon = themeToggle.querySelector('.fa-sun');
          const moonIcon = themeToggle.querySelector('.fa-moon');
          if (sunIcon && moonIcon) {
              sunIcon.style.display = isDarkMode ? 'block' : 'none';
              moonIcon.style.display = isDarkMode ? 'none' : 'block';
          }
      }

      if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.classList.add('dark-mode');
        updateThemeIcon(true);
      } else {
        htmlElement.classList.remove('dark-mode');
        updateThemeIcon(false);
      }
      
      themeToggle.addEventListener('click', function() {
        const isDarkMode = htmlElement.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        updateThemeIcon(isDarkMode);
      });
  }
  
  // --- Initial Responsive Setup ---
  const initialWidth = window.innerWidth;
  // Set initial count based on width
  projectsVisible = initialWidth >= 1024 ? 3 : 4; 

  // Show More/Less Button Logic (Width-dependent increment and reset)
  if (showMoreBtn && projectListElement) { 
      showMoreBtn.addEventListener("click", () => {
          const currentWidth = window.innerWidth;
          // Determine reset and increment counts based on current width
          const resetCount = currentWidth >= 1024 ? 3 : 4;
          const incrementCount = currentWidth >= 1024 ? 3 : 2;

          const currentlyVisibleCount = projectListElement.children.length;
          
          // Reset if all filtered projects are shown
          if (currentlyVisibleCount >= filteredProjects.length) { 
              projectsVisible = resetCount; 
          } else {
              projectsVisible += incrementCount; // Increment based on width
          }
          renderProjects(); // Re-render projects
      });
  }
  
  // Back to Top Button Click Listener
  if (backToTopBtnElement) {
      backToTopBtnElement.addEventListener('click', scrollToTop);
  }

  // Initial Setup
  renderSkills(); 
  renderTimeline(); 
  renderPublications(); 
  renderCertificates(); // Render the certificates
  populateFilterDropdown(); 
  renderProjects(); 
  
  // Scroll Event Listeners
  window.addEventListener('scroll', () => {
      revealElementsOnScroll(); 
      scrollFunction(); 
  });
  window.addEventListener('load', revealElementsOnScroll);

});