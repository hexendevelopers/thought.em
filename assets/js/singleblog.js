
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



const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    const urlParams = new URLSearchParams(window.location.search);
    const blogPostId = urlParams.get('id');

    if (blogPostId) {
        const blogPostRef = ref(database, 'blogPosts/' + blogPostId);

        get(blogPostRef).then((snapshot) => {
            if (snapshot.exists()) {
                const blogPost = snapshot.val();

                document.getElementById('blogTitle').textContent = blogPost.title;
                document.getElementById('blogImage').src = blogPost.imageUrl;
                document.getElementById('blogDescription').textContent = blogPost.description;

                const paragraphsContainer = document.getElementById('paragraphsContainer');
                paragraphsContainer.innerHTML = ''; // Clear previous content

                if (blogPost.paragraphs) {
                    blogPost.paragraphs.forEach((paragraph, index) => {
                        const paragraphElement = document.createElement('p');
                        paragraphElement.textContent = paragraph;
                        paragraphsContainer.appendChild(paragraphElement);

                        // Add a <br> element for spacing between paragraphs, except after the last one
                        if (index < blogPost.paragraphs.length - 1) {
                            paragraphsContainer.appendChild(document.createElement('br'));
                        }
                    });
                }

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
                handleBlogPostNotFound();
            }
        }).catch((error) => {
            console.error("Error fetching blog post:", error);
            handleBlogPostError();
        });
    } else {
        handleInvalidBlogPostId();
    }

    function handleBlogPostNotFound() {
        document.getElementById('blogTitle').textContent = 'Blog post not found';
        document.getElementById('blogDescription').textContent = '';
    }

    function handleBlogPostError() {
        document.getElementById('blogTitle').textContent = 'Error loading blog post';
        document.getElementById('blogDescription').textContent = '';
    }

    function handleInvalidBlogPostId() {
        document.getElementById('blogTitle').textContent = 'Invalid blog post ID';
        document.getElementById('blogDescription').textContent = '';
    }