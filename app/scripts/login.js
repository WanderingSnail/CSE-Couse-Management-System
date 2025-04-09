import { User } from "./class/user.js";

document.addEventListener("DOMContentLoaded", async () => {
    const users = await User.load();
    const loginForm = document.querySelector("#login-Form");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.querySelector(".input-user-username").value;
        const password = document.querySelector(".input-user-password").value;

        const user = users.find(user => user.login(username, password));

        if (user) {
            const plainUser = {
                id: user.id,
                name: user.name,
                username: user.username,
                role: user.role
            };

            localStorage.setItem("currentUser", JSON.stringify(plainUser));
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
        }
        else {
            alert("Invalid username or password");
        }
    });
});