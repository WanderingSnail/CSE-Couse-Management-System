import { Student } from "./class/student.js";

document.addEventListener("DOMContentLoaded", async () => {
    // Fetch and load student's information
    const response = await fetch("../data/students.json");
    const studentsJSON = await response.json();
    const students = studentsJSON.map(Student.fromJson);
    const studentID = localStorage.getItem("id");
    const student = students.find(student => student.id === studentID);
    
    if (!student) {
        console.error("Student not found:", studentID);
        return;
    }
    console.log("Current student:", student);

    //Construct the learning path directly from student data
    const learningPath = {
        enrolled: student.enrolledCourses.map(course => ({
            name: course.courseName,
            category: course.category,
            instructor: [course.instructor],
            classId: course.classId,
            status: course.status
        })),
        completed: student.completedCourses.map(course => ({
            name: course.courseName,
            category: course.category,
            instructor: [course.instructor],
            classId: course.classId,
            grade: course.grade
        }))
    };
    
    // Get DOM elements
    const enrolledCoursesTable = document.querySelector("#enrolledCoursesTable").querySelector("tbody");
    const completedCoursesTable = document.querySelector("#completedCoursesTable").querySelector("tbody");
    const searchByName = document.querySelector("#searchByName");
    const searchByCategory = document.querySelector("#searchByCategory");
    const searchBtn = document.querySelector("#searchBtn");    
   
    // Function to display enrolled courses
    function displayEnrolledCourses(coursesToDisplay = learningPath.enrolled) {
        enrolledCoursesTable.innerHTML = ""; // Clear table before inserting new rows
  
        if (coursesToDisplay.length === 0) {
            enrolledCoursesTable.innerHTML = "<tr><td colspan='4'>No enrolled courses found.</td></tr>";
            return;
        }
  
        coursesToDisplay.forEach((course) => {
            const row = document.createElement("tr");
            row.classList.add("course-row");
            row.innerHTML = `
                <td>${course.name}</td>
                <td>${course.category.join(", ")}</td>
                <td>${course.instructor.join(", ")} (${course.classId})</td>
                <td>${course.status}</td>
            `;
            enrolledCoursesTable.appendChild(row);
        });
    }

    // Function to display completed courses
    function displayCompletedCourses(coursesToDisplay = learningPath.completed) {
        completedCoursesTable.innerHTML = ""; // Clear table before inserting new rows
  
        if (coursesToDisplay.length === 0) {
            completedCoursesTable.innerHTML = "<tr><td colspan='4'>No completed courses found.</td></tr>";
            return;
        }
  
        coursesToDisplay.forEach((course) => {
            const row = document.createElement("tr");
            row.classList.add("course-row");
            row.innerHTML = `
                <td>${course.name}</td>
                <td>${course.category.join(", ")}</td>
                <td>${course.instructor.join(", ")} (${course.classId})</td>
                <td>${course.grade}</td>
            `;
            completedCoursesTable.appendChild(row);
        });
    }
  
    // Filter courses
    function filterCourses() {
        const nameFilter = searchByName.value.toLowerCase().trim();
        const categoryFilter = searchByCategory.value.trim();
  
        const filteredEnrolled = learningPath.enrolled.filter((course) => {
            const matchesName = course.name.toLowerCase().includes(nameFilter);
            const matchesCategory = !categoryFilter || course.category.includes(categoryFilter);
            return matchesName && matchesCategory;
        });
        
        const filteredCompleted = learningPath.completed.filter((course) => {
            const matchesName = course.name.toLowerCase().includes(nameFilter);
            const matchesCategory = !categoryFilter || course.category.includes(categoryFilter);
            return matchesName && matchesCategory;
        });
      
        displayEnrolledCourses(filteredEnrolled);
        displayCompletedCourses(filteredCompleted);
    }
  
    // Event Listeners
    searchBtn.addEventListener("click", filterCourses);
    searchByName.addEventListener("input", filterCourses);
    searchByCategory.addEventListener("change", filterCourses);

    // Initial display
    displayEnrolledCourses();
    displayCompletedCourses();
});
  