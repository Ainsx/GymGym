//About page contact form
const contactForm= document.getElementById("contactform");

if(contactForm){
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

    const first = document.getElementById("first-name").value;
    const last = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if(!first || !last|| !email || !message){
        alert ("Please fill in all fields");
        return;
    }

    alert(`Thank you, ${first}! Your messasge has been received.`);
    contactForm.reset(); 
});
}
// Login Page: Sign Up / Login Form
const signupForm= document.getElementById("signup-form");

if(signupForm){
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value; 

    if(!username || !password){
        alert ("Please enter both username and password");
        return;
    }

    alert(`Welcome, ${username}! You have successfully logged in.`);
    signupForm.reset(); 
});
}


