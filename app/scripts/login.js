import { User } from "./class/user.js";

//Get users from json file
document.addEventListener("DOMContentLoaded", async () => {
    try {
        let userJSON;

        //load users data
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            userJSON = JSON.parse(storedUsers);
        } else {
            const response = await fetch("../data/users.json");
            userJSON = await response.json();
            localStorage.setItem('users', JSON.stringify(userJSON, null, 2));
        }
        const users = userJSON.map(User.fromJson);
        
        const loginForm = document.querySelector("#login-Form");
        
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.querySelector(".input-user-username").value;
            const password = document.querySelector(".input-user-password").value;
            
            const user = users.find(user => user.login(username, password));
            
            if (user) {
                //Store the user's ID in local storage
                localStorage.setItem("id", user.id);
                
                //Redirect to the appropriate page based on the user's role
                switch (user.role) {
                    case "admin":
                        window.location.href = "../html/admin_dashboard.html";
                        break;
                    case "instructor":
                        window.location.href = "../html/instructor_dashboard.html";
                        break;
                    case "student":
                        window.location.href = "../html/main.html";
                        break;
                }
            } else {
                alert("Invalid username or password");
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again.");
    }
});
