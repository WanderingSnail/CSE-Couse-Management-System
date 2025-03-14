import { Course } from "./class/course.js";
import { Student } from "./class/student.js";

document.addEventListener("DOMContentLoaded", async () => {
     // Fetch and load courses
    const response1 = await fetch("../data/courses.json");
    const coursesJSON = await response1.json();
    const courses = coursesJSON.map(Course.fromJson);

    // Fetch and load student's information
    const response2 = await fetch("../data/students.json");
    const studentsJSON = await response2.json();
    const students = studentsJSON.map(Student.fromJson);
    const studentID = localStorage.getItem("id");
    const student = students.find(student => student.id === studentID);
    let enrolledCourses = student.enrolledCourses;
    let completedCourses = student.completedCourses;

    //Construct the learning path
    const learningPath = {
        enrolled: [],
        completed: []
    };

    for (const enrolledCourse of enrolledCourses) {
        const course = courses.find(course => course.courseId === enrolledCourse.courseID);
        if (course) {
            learningPath.enrolled.push({
                name: course.name,
                category: course.category,
                instructor: enrolledCourse.instructor,
                status: enrolledCourse.status
            });
        }
    }

    for (const completedCourse of completedCourses) {
        const course = courses.find(course => course.courseId === completedCourse.courseID);
        if (course) {
            learningPath.completed.push({
                name: course.name,
                category: course.category,
                instructor: completedCourse.instructor,
                grade: completedCourse.grade
            });
        }
    }
    
    // Get DOM elements
    const enrolledCoursesTable = document.getElementById("enrolledCoursesTable").querySelector("tbody");
    const completedCoursesTable = document.getElementById("completedCoursesTable").querySelector("tbody");
    const searchByName = document.getElementById("searchByName");
    const searchByCategory = document.getElementById("searchByCategory");
    const searchBtn = document.getElementById("searchBtn");    
   
    // Function to display courses
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
                <td>${course.instructor.join(", ")}</td>
                <td>${course.status}</td>
            `;
            enrolledCoursesTable.appendChild(row);
        });
    }

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
                <td>${course.instructor.join(", ")}</td>
                <td>${course.grade}</td>
            `;
            completedCoursesTable.appendChild(row);
        });
    }
  
    // Filter courses
    function filterCourses() {
        const nameFilter = searchByName.value.toLowerCase();
        const categoryFilter = searchByCategory.value;
  
        const filteredEnrolled = learningPath.enrolled.filter((course) => {
            const matchesName = course.name.toLowerCase().includes(nameFilter);
            const matchesCategory = categoryFilter === "" || course.category.includes(categoryFilter);
            return matchesName && matchesCategory;
        });
        
        const filteredCompleted = learningPath.completed.filter((course) => {
            const matchesName = course.name.toLowerCase().includes(nameFilter);
            const matchesCategory = categoryFilter === "" || course.category.includes(categoryFilter);
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
  