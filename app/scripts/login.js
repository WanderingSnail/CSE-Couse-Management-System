import { User } from "./class/user.js";

//Get users from json file
document.addEventListener("DOMContentLoaded", async () => {
        const response = await fetch("../data/users.json");
        const userJSON = await response.json();
        const users = userJSON.map(User.fromJson);
        
        const loginForm = document.querySelector("#login-Form");
        
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.querySelector(".input-user-username").value;
            const password = document.querySelector(".input-user-password").value;
            
            let flag = false;
            for (const user of users) {
                if (user.login(username, password)) {
                    localStorage.setItem("id", user.id);
                    flag = true;
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
                    break;
                }
            }
            if (!flag) {
                alert("Invalid username or password");
            }
        });
    }
);
