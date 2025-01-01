const projects = [
    {
        img: "./assets/fraud.png",
        title: "Fraud Detection",
        description: "A research project focused on detecting fraudulent activities in prescription datasets. Utilized advanced data preprocessing and unsupervised learning algorithms to identify anomalies and uncover patterns in complex datasets.",
        badges: `
            <div class="badges">
                <span class="badge badge-green">Python</span>
                <span class="badge badge-brown">ML</span>
            </div>
        `,
        github: ''
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
        github: "https://github.com/erfanshafagh/bankSimulation"
    }
];

const projectList = document.getElementById("project-list");
const showMoreBtn = document.getElementById("show-more-btn");
let projectsVisible = 4;

// Function to render the projects
function renderProjects() {
    projectList.innerHTML = '';
    const visibleProjects = projects.slice(0, projectsVisible);

    visibleProjects.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("project-card");

        card.innerHTML = `
            <img src="${project.img}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            ${project.badges}
        `;
        if (project.github === 'https://rizzervit.onrender.com/home') {
            const githubLink = document.createElement("a");
            githubLink.href = project.github;
            githubLink.target = "_blank";
            githubLink.textContent = "Website";
            githubLink.classList.add("github-link");
            card.appendChild(githubLink);
        }
        else if (project.github) {
            const githubLink = document.createElement("a");
            githubLink.href = project.github;
            githubLink.target = "_blank";
            githubLink.textContent = "GitHub";
            githubLink.classList.add("github-link");
            card.appendChild(githubLink);
        }
        projectList.appendChild(card);
    });

    // Toggle the button text based on the current state
    if (projectsVisible >= projects.length) {
        showMoreBtn.textContent = "Show Less";
    } else {
        showMoreBtn.textContent = "Show More";
    }
}

// Event listener for the "Show More" / "Show Less" button
showMoreBtn.addEventListener("click", () => {
    if (projectsVisible >= projects.length) {
        projectsVisible = 4;
    } else {
        projectsVisible += 4;
    }
    renderProjects();
});

function scrollToTop(){
    // Scroll back to top
    window.scrollTo({top: 0, behavior: 'smooth'});
}


window.onscroll = function() { scrollFunction() };
function scrollFunction() {
    var arrowIcon = document.getElementById("arrowIcon");

    // Show or hide the arrow icon based on scroll position
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        arrowIcon.style.display = "block";
    } else {
        arrowIcon.style.display = "none";
    }
}

renderProjects();