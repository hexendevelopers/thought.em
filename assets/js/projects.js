import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBe6bcCAYg_HsdDukkQRcQIJC0JGEO6DLw",
    authDomain: "thoughtem-4fa2b.firebaseapp.com",
    databaseURL: "https://thoughtem-4fa2b-default-rtdb.firebaseio.com",
    projectId: "thoughtem-4fa2b",
    storageBucket: "thoughtem-4fa2b.appspot.com",
    messagingSenderId: "337631869633",
    appId: "1:337631869633:web:b2699fac77e801619f3240"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const projectsListElement = document.getElementById('projectsList');
const projectCategoriesElement = document.getElementById('projectCategories');

// Fetch and display the total number of projects
async function fetchProjectCount() {
    try {
        const projectsRef = ref(database, 'projects');
        const snapshot = await get(projectsRef);
        if (snapshot.exists()) {
            const projects = snapshot.val();
            const projectCount = Object.keys(projects).length;
            // Display the project count or update UI as needed
        } else {
            // Handle case where no projects are found
        }
    } catch (error) {
        console.error('Error fetching project count:', error);
    }
}

// Fetch and display all projects
async function fetchAllProjects() {
    try {
        const projectsRef = ref(database, 'projects');
        const snapshot = await get(projectsRef);

        if (snapshot.exists()) {
            const projects = snapshot.val();
            projectsListElement.innerHTML = '';

            for (const projectId in projects) {
                const project = projects[projectId];
                const projectElement = createProjectElement(project);
                projectsListElement.appendChild(projectElement);
            }

            // Initialize Fancybox for image zoom
            $('[data-fancybox="gallery"]').fancybox({
                buttons: [
                    "zoom",
                    "slideShow",
                    "fullScreen",
                    "download",
                    "thumbs",
                    "close"
                ],
                loop: true
            });
        } else {
            projectsListElement.innerHTML = '<p class="text-center text-gray-500">No projects found.</p>';
        }
    } catch (error) {
        console.error('Error fetching all projects:', error);
    }
}

// Fetch and display projects based on category
async function fetchProjectsByCategory(category) {
    try {
        const projectsRef = ref(database, 'projects');
        const snapshot = await get(projectsRef);

        if (snapshot.exists()) {
            const projects = snapshot.val();
            projectsListElement.innerHTML = '';

            for (const projectId in projects) {
                const project = projects[projectId];
                if (project.type.toLowerCase() === category) {
                    const projectElement = createProjectElement(project);
                    projectsListElement.appendChild(projectElement);
                }
            }

            // Initialize Fancybox for image zoom
            $('[data-fancybox="gallery"]').fancybox({
                buttons: [
                    "zoom",
                    "slideShow",
                    "fullScreen",
                    "download",
                    "thumbs",
                    "close"
                ],
                loop: true
            });
        } else {
            projectsListElement.innerHTML = '<p class="text-center text-gray-500">No projects found.</p>';
        }
    } catch (error) {
        console.error('Error fetching projects by category:', error);
    }
}

// Helper function to create project HTML element
function createProjectElement(project) {
    const projectElement = document.createElement('div');
    projectElement.classList.add('col-xl-4', 'col-lg-4', 'single-project-item');

    projectElement.innerHTML = `
        <div class="img-holder">
            <div class="inner w-1/3 height-60">
                <img class="w-full h-full object-cover" src="${project.fileURL}" alt="${project.name}" />
                <div class="zoom-button">
                    <a class="lightbox-image" data-fancybox="gallery" href="${project.fileURL}">
                        <i class="flaticon-plus"></i>
                    </a>
                </div>
            </div>
        </div>
    `;

    return projectElement;
}

// Event listener for clicking on project categories
projectCategoriesElement.addEventListener('click', async (event) => {
    if (event.target.classList.contains('project-category')) {
        const category = event.target.dataset.category;
        if (category === 'all') {
            await fetchAllProjects();
        } else {
            await fetchProjectsByCategory(category);
        }
    }
});

// Initial fetch of all projects on page load
fetchProjectCount();
fetchAllProjects(); // Show all projects by default
