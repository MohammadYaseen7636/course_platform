let selectedCourse;
let selectedPaymentMethod;

window.onload = function() {
    const courseId = localStorage.getItem('selectedCourseId');
    selectedCourse = courses.find(course => course.id == courseId);
    if (selectedCourse) {
        document.getElementById('selected-course').textContent = `Selected Course: ${selectedCourse.title} - $${selectedCourse.price}`;
    }
};

function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    document.getElementById('payment-form').style.display = 'block';
    document.getElementById('card-payment-form').style.display = method === 'upi' ? 'none' : 'block';
    document.getElementById('upi-payment-form').style.display = method === 'upi' ? 'block' : 'none';
}

function processPayment() {
    // Here you would normally process the payment
    // For this example, we'll just move to the verification step
    document.getElementById('payment-details').style.display = 'none';
    document.getElementById('verification').style.display = 'block';
    
    // Simulate sending a verification code
    alert("A verification code has been sent to your mobile number.");
}

function verifyCode() {
    const code = document.getElementById('verification-code').value;
    if (code === '1234') { // In a real scenario, this would be validated against a sent code
        alert("Payment successful! Thank you for your purchase.");
        window.location.href = 'index.html'; // Redirect back to the main page
    } else {
        alert("Invalid verification code. Please try again.");
    }
}

// Simulated course data (you should fetch this from your backend in a real scenario)
const courses = [
    { id: 1, title: "Web Development Bootcamp", price: 29.99 },
    { id: 2, title: "Data Science with Python", price: 19.99 },
    // ... other courses ...
];