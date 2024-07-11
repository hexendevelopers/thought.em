import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
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
const projectsAddedValueElement = document.getElementById('projectsaddedvalue');

// Fetch and display the total number of projects
async function fetchProjectCount() {
    const projectsRef = ref(database, 'projects');
    const snapshot = await get(projectsRef);
    if (snapshot.exists()) {
        const projects = snapshot.val();
        const projectCount = Object.keys(projects).length;
        projectsAddedValueElement.textContent = projectCount < 10 ? `0${projectCount}` : projectCount;
    } else {
        projectsAddedValueElement.textContent = "00";
    }
}

// Fetch and display all projects
// Fetch and display all projects
async function fetchProjects() {
    const projectsRef = ref(database, 'projects');
    const snapshot = await get(projectsRef);

    if (snapshot.exists()) {
        const projects = snapshot.val();
        projectsListElement.innerHTML = '';
        for (const projectId in projects) {
            const project = projects[projectId];
            const projectElement = document.createElement('div');
            projectElement.classList.add('col-xl-4', 'col-lg-4');

            // Constructing the project item HTML based on provided design
            projectElement.innerHTML = `
                <div class="single-project-item">
                    <div class="img-holder">
                        <div class="inner w-1/3 height-60 ">
                            <img class="w-full h-full object-cover" src="${project.fileURL}" alt="${project.name}" />
                            <div class="zoom-button">
                                <a class="lightbox-image" data-fancybox="gallery" href="${project.fileURL}">
                                    <i class="flaticon-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="text-holder">
                        <h4>
                            <a href="#">${project.name}</a>
                        </h4>
                        <div class="category">
                            <div class="border-box"></div>
                            <p>Features</p>
                        </div>
                    </div> -->
                </div>
            `;
            projectsListElement.appendChild(projectElement);
        }
    } else {
        projectsListElement.innerHTML = '<p class="text-center text-gray-500">No projects found.</p>';
    }
}

// Fetch initial data
fetchProjectCount();
fetchProjects();
