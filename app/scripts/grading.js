import { Student } from "./class/student.js";

document.addEventListener("DOMContentLoaded", async () => {
     // Fetch and load courses
    const coursesResponse = await fetch("../data/courses.json");
    const coursesJSON = await coursesResponse.json();
    const courses = coursesJSON.map(Course.fromJson);

    // Get DOM elements
    const coursesTable = document.getElementById("coursesTable").querySelector("tbody");
    const searchByName = document.getElementById("searchByName");
    const searchByCategory = document.getElementById("searchByCategory");
    const searchBtn = document.getElementById("searchBtn");    
   
    // Function to display courses
    function displayCourses(courses) {
      coursesTable.innerHTML = ""; // Clear table before inserting new rows
  
      if (courses.length === 0) {
        coursesTable.innerHTML = "<tr><td colspan='3'>No courses found.</td></tr>";
        return;
      }
  
      courses.forEach((course) => {
        const row = document.createElement("tr");
        const L01 =  
        row.classList.add("course-row");
        row.innerHTML = `
          <td><input type="checkbox" class="course-checkbox" value="${course.id}"></td>
          <td>${course.name}</td>
          <td>${course.category.join(", ")}</td>
          <td></td>
          <td></td>
          <td>
            <select class="class-dropdown">
            <option value="L01" selected>L01</option>
            <option value="L02">L02</option>
            </select>
          </td>
        `;
        coursesTable.appendChild(row);
      });
    }
  
    // Filter courses
    function filterCourses() {
      const nameFilter = searchByName.value.toLowerCase();
      const categoryFilter = searchByCategory.value;
  
      const filteredCourses = courses.filter((course) => {
        const matchesName = course.name.toLowerCase().includes(nameFilter);
        const matchesCategory = categoryFilter === "" || course.category.includes(categoryFilter);
        return matchesName && matchesCategory;
      });
      
      displayCourses(filteredCourses);
    }
  
    // Event Listeners
    searchBtn.addEventListener("click", filterCourses);
    searchByName.addEventListener("input", filterCourses);
    searchByCategory.addEventListener("change", filterCourses);

    // Initial display
    displayCourses(courses);
  });
  