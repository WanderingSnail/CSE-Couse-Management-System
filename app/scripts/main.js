import { Class } from "./class/class.js";
import { Course } from "./class/course.js";

document.addEventListener("DOMContentLoaded", async () => {
    // Fetch and load courses
    const coursesResponse = await fetch("../data/courses.json");
    const coursesJSON = await coursesResponse.json();
    const courses = coursesJSON.map(Course.fromJson);

    // Fetch and load clases
    const classesResponse = await fetch("../data/classes.json");
    const classesJSON = await classesResponse.json();
    const classes = classesJSON.map(Class.fromJson);

    // Get DOM elements
    const coursesTable = document.getElementById("coursesTable").querySelector("tbody");
    const searchByName = document.getElementById("searchByName");
    const searchByCategory = document.getElementById("searchByCategory");
    const searchBtn = document.getElementById("searchBtn"); 
    
    // Initialize courses array with unique course IDs
    const classesByCourse = {};
    courses.forEach((courseItem) => {
        classesByCourse[courseItem.courseId] = {
            course: courseItem,
            classes: []
        };
        
        classes.forEach((classItem) => {
            if (classItem.courseId === courseItem.courseId) {
                classesByCourse[courseItem.courseId].classes.push(classItem);
            }
        });
    });
    console.log(classesByCourse);
   
    // Function to display courses
    function displayCourses(classesByCourse) {
      coursesTable.innerHTML = ""; // Clear table before inserting new rows
  
      if (Object.keys(classesByCourse).length === 0) {
        coursesTable.innerHTML = "<tr><td colspan='7'>No courses found.</td></tr>";
        return;
      }
  
      Object.entries(classesByCourse).forEach(([courseId, data]) => {
        const course = data.course;
        const courseClasses = data.classes;
        
        const row = document.createElement("tr");
        row.classList.add("course-row");
        row.innerHTML = `
          <td><input type="checkbox" class="course-checkbox" value="${courseId}"></td>
          <td>${courseId}</td>
          <td>${course.name}</td>
          <td>${course.category.join(", ")}</td>
          <td>
            <select class="class-dropdown" data-course-id="${courseId}">
              ${courseClasses.map(classItem => 
                `<option value="${classItem.classId}">${classItem.classId}</option>`
              ).join('')}
            </select>
          </td>
          <td class="instructor">${courseClasses[0]?.instructors || ''}</td>
          <td class="schedule">${courseClasses[0]?.schedule.day.join(", ")} ${courseClasses[0]?.schedule.time || ''}</td>
        `;
        coursesTable.appendChild(row);

        // Add event listener to class dropdown
        const dropdown = row.querySelector('.class-dropdown');
        dropdown.addEventListener('change', (e) => {
          const selectedClassId = e.target.value;
          const selectedClass = courseClasses.find(c => c.classId === selectedClassId);
          if (selectedClass) {
            const instructorRow = row.querySelector('.instructor');
            const scheduleRow = row.querySelector('.schedule');
            instructorRow.textContent = selectedClass.instructors;
            scheduleRow.textContent = `${selectedClass.schedule.day.join(", ")} ${selectedClass.schedule.time}`;
          }
        });
      });
    }
  
    // Filter courses
    function filterCourses() {
      const nameFilter = searchByName.value.toLowerCase();
      const categoryFilter = searchByCategory.value;
  
      const filteredCourses = Object.entries(classesByCourse).filter(([courseId, data]) => {
        const course = data.course;
        const matchesName = course.name.toLowerCase().includes(nameFilter);
        const matchesCategory = categoryFilter === "" || course.category.includes(categoryFilter);
        return matchesName && matchesCategory;
      });
      
      const filteredClassesByCourse = Object.fromEntries(filteredCourses);
      displayCourses(filteredClassesByCourse);
    }
  
    // Event Listeners
    searchBtn.addEventListener("click", filterCourses);
    searchByName.addEventListener("input", filterCourses);
    searchByCategory.addEventListener("change", filterCourses);

    // Initial display
    displayCourses(classesByCourse);
  });
  