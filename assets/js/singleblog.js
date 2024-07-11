
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Get the blog post ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const blogPostId = urlParams.get('id');
console.log("Blog Post ID: ", blogPostId); // Debugging

if (blogPostId) {
    // Reference to the specific blog post in the database
    const blogPostRef = ref(database, 'blogPosts/' + blogPostId);
    console.log("Blog Post Ref: ", blogPostRef); // Debugging

    // Fetch the blog post data
    get(blogPostRef).then((snapshot) => {
        console.log("Snapshot: ", snapshot); // Debugging
        if (snapshot.exists()) {
            const blogPost = snapshot.val();
            console.log("Blog Post Data: ", blogPost); // Debugging
            document.getElementById('blogTitle').textContent = blogPost.title;
            document.getElementById('blogImage').src = blogPost.imageUrl;
            document.getElementById('blogDescription').textContent = blogPost.description; // Ensure this field exists
 
            // Set up sharing button
            const shareButton = document.getElementById('shareButton');
            shareButton.addEventListener('click', () => {
                if (navigator.share) {
                    navigator.share({
                        title: blogPost.title,
                        text: blogPost.description,
                        url: window.location.href
                    }).then(() => {
                        console.log('Thanks for sharing!');
                    }).catch((error) => {
                        console.error('Error sharing:', error);
                    });
                } else {
                    alert('Web Share API not supported in this browser.');
                }
            });
        } else {
            document.getElementById('blogTitle').textContent = 'Blog post not found';
            document.getElementById('blogDescription').textContent = '';
         }
    }).catch((error) => {
        console.error("Error fetching blog post:", error);
        document.getElementById('blogTitle').textContent = 'Error loading blog post';
        document.getElementById('blogDescription').textContent = '';
     });
} else {
    document.getElementById('blogTitle').textContent = 'Invalid blog post ID';
    document.getElementById('blogDescription').textContent = '';
 }
 