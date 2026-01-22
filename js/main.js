const htmlElement = document.documentElement;

const projects = [{
    title: "AI-Chatbott",
    description: "A modern AI-powered chatbot web application built using HTML, CSS, JavaScript, and a serverless backend deployed on Vercel using Google Gemini API. This project is created as a practice project to understand full-stack deployment, API integration, and serverless architecture.",
    liveUrl: "https://ai-chatbott-indol.vercel.app",
    codeUrl: "https://github.com/gauravsinghcodes/ai-chatbott"
},
{
    title: "Weather Forecast App",
    description: "A modern and responsive Weather Forecast Web App that shows real-time weather information and hourly forecasts for any city using the WeatherAPI.\nThe app also supports current location weather and dynamic background gradients based on weather conditions.",
    liveUrl: "https://weather-forecast-app-taupe.vercel.app/",
    codeUrl: "https://github.com/gauravsinghcodes/weather-forecast-app"
},
{
    title: "Internet Connection Status Checker",
    description: "A client-side task management application built with vanilla JavaScript. Allows users to add, edit, delete, and mark tasks as complete, with all data saved to localStorage.",
    liveUrl: "https://internet-connection-check.vercel.app",
    codeUrl: "https://github.com/gauravsinghcodes/internet-connection-checker"
},
{
    title: "Calculator using JavaScript",
    description: "A simple calculator built with HTML, CSS, and JavaScript.",
    liveUrl: "https://calculator-puce-beta-95.vercel.app",
    codeUrl: "https://github.com/gauravsinghcodes/calculator-"
}
];

const themeToggle = document.querySelector('#theme-toggle');
const projectsContainer = document.querySelector('.projects-container');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

const nav = document.querySelector('header nav');


const renderProjects = () => {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        if (projects[index]) {
            const project = projects[index];

            // Update Title
            const titleElement = card.querySelector('h3');
            if (titleElement) titleElement.textContent = project.title;

            // Update Description
            const descElement = card.querySelector('p');
            if (descElement) descElement.textContent = project.description;

            // Update Links
            const links = card.querySelectorAll('.project-links a');
            if (links.length >= 2) {
                links[0].href = project.liveUrl; // Live Demo
                links[1].href = project.codeUrl; // View Code
            }
        }
    });
};


themeToggle.addEventListener('click', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeToggle.checked = true;
        }
    }
})();



document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');

            formStatus.innerHTML = 'Sending...';
            formStatus.className = 'info';
            formStatus.style.display = 'block';
            submitButton.disabled = true;

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    formStatus.innerHTML = "Thank you! Your message has been sent.";
                    formStatus.className = 'success';
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formStatus.innerHTML = "Oops! Something went wrong. Please try again later.";
                        }
                        formStatus.className = 'error';
                    })
                }
            }).catch(error => {
                formStatus.innerHTML = "Oops! A network error occurred. Please check your connection and try again.";
                formStatus.className = 'error';
            }).finally(() => {
                submitButton.disabled = false;
            });
        });
    }
});




























