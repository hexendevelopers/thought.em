import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBe6bcCAYg_HsdDukkQRcQIJC0JGEO6DLw",
    authDomain: "thoughtem-4fa2b.firebaseapp.com",
    databaseURL: "https://thoughtem-4fa2b-default-rtdb.firebaseio.com",
    projectId: "thoughtem-4fa2b",
    storageBucket: "thoughtem-4fa2b.appspot.com",
    messagingSenderId: "337631869633",
    appId: "1:337631869633:web:b2699fac77e801619f3240"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

const blogsListElement = document.getElementById('blogsList');

const blogPostsRef = ref(database, 'blogPosts');
onValue(blogPostsRef, (snapshot) => {
    blogsListElement.innerHTML = ''; // Clear existing content

    snapshot.forEach((childSnapshot) => {
        const blogPost = childSnapshot.val();
        const blogPostId = childSnapshot.key; // Get the blog post's ID

        // Create a new div for each blog post
        let blogElement = document.createElement('div');
        blogElement.className = 'w-full sm:w-1/2 lg:w-1/3 p-4'; // Set the outer container class for responsiveness

        // Construct the inner HTML for the blog element dynamically
        blogElement.innerHTML = `
            <div class="bg-white text-black rounded-lg overflow-hidden shadow-lg">
                <img src="${blogPost.imageUrl}" alt="${blogPost.title}" class="w-full font-bold h-48 object-cover rounded-t-lg">
                <div class="p-4">
                    <h5 class="text-xl font-bold mb-2">${blogPost.title}</h5>
                    <div class="text-black rounded">
                        <p class="text-sm">${blogPost.description.split(' ').slice(0, 30).join(' ')}...</p>
                    </div>
                    <button class="view-button underline text-black mt-2">Read more</button>
                </div>
            </div>
        `;

        // Append the blog element to your desired container
        blogsListElement.appendChild(blogElement);

        // Add event listener to the view button
        const viewButton = blogElement.querySelector('.view-button');
        viewButton.addEventListener('click', () => {
            window.location.href = `singleblog.html?id=${blogPostId}`;
        });
    });
});
