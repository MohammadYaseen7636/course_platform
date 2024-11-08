// Simulated API response for SciAstra courses
const courses = [
    { id: 1, title: "Web Development Bootcamp", price: 29.99, originalPrice: 49.99 },
    { id: 2, title: "Data Science with Python", price: 19.99, originalPrice: 39.99 },
    { id: 3, title: "Advanced JavaScript", price: 39.99, originalPrice: 59.99 },
    { id: 4, title: "Introduction to Machine Learning", price: 24.99, originalPrice: 44.99 },
    { id: 5, title: "Digital Marketing Strategies", price: 34.99, originalPrice: 54.99 },
    { id: 6, title: "Graphic Design Essentials", price: 14.99, originalPrice: 29.99 },
    { id: 7, title: "Mobile App Development", price: 49.99, originalPrice: 79.99 },
    { id: 8, title: "UI/UX Design Fundamentals", price: 59.99, originalPrice: 89.99 },
];

function displayCourses() {
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = ""; // Clear previous content

    courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.className = 'course-item';
        courseItem.innerHTML = `
            <h2 class="course-title">${course.title}</h2>
            <p class="course-price">$${course.price.toFixed(2)} <span class="course-discount">$${course.originalPrice.toFixed(2)}</span></p>
            <button class="buy-button" onclick="buyCourse(${course.id})">Buy Now</button>
        `;
        courseList.appendChild(courseItem);
    });
}

// Function to handle course purchase
function buyCourse(courseId) {
    // Redirect to payment page with course ID as a query parameter
    window.location.href = `payment.html?courseId=${courseId}`;
}

// Call the function to display courses on page load
window.onload = displayCourses;
// script.js
async function fetchCourses() {
    try {
        const response = await fetch('http://localhost:3000/api/courses');
        const courses = await response.json();
        displayCourses(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}

async function saveBlogPost(blogData) {
    try {
        const response = await fetch('http://localhost:3000/api/blog-posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogData)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error saving blog post:', error);
        throw error;
    }
}

async function processTransaction(transactionData) {
    try {
        const response = await fetch('http://localhost:3000/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactionData)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error processing transaction:', error);
        throw error;
    }
}
// Server-side (server.js)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        // Broadcast updates to all connected clients
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

// Client-side (script.js)
const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = function(event) {
    const update = JSON.parse(event.data);
    // Handle real-time updates
    updateUI(update);
};
// Add error handling middleware (server.js)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});