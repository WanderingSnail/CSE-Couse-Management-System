import { Class } from "./class/class.js";

document.addEventListener("DOMContentLoaded", async () => {
    let classesJSON;

    //load classes data
    const storedClasses = localStorage.getItem('classes');
    if (storedClasses) {
        classesJSON = JSON.parse(storedClasses);
    } else {
        const classesResponse = await fetch("../data/classes.json");
        classesJSON = await classesResponse.json();
        localStorage.setItem('classes', JSON.stringify(classesJSON, null, 2));
    }
    const classes = classesJSON.map(Class.fromJson);

    // Get DOM elements
    const coursesTable = document.querySelector("#coursesTable").querySelector("tbody");
    const searchByName = document.querySelector("#searchByName");
    const searchByCategory = document.querySelector("#searchByCategory");
    const searchBtn = document.querySelector("#searchBtn"); 
    
    // Initialize courses array with unique course IDs
    const classesByCourse = {};
    classes.forEach((classItem) => {
        if (!classesByCourse[classItem.courseId]) {
            classesByCourse[classItem.courseId] = {
                course: {
                    courseId: classItem.courseId,
                    name: classItem.courseName,
                    category: classItem.category,
                    description: classItem.description,
                    prerequisites: classItem.prerequisites,
                    creditHours: classItem.creditHours,
                    minStudents: classItem.minStudents
                },
                classes: []
            };
        }
        classesByCourse[classItem.courseId].classes.push(classItem);
    });
    console.log(classesByCourse);
   
    // Function to display courses
    function displayCourses(classesByCourse) {
        coursesTable.innerHTML = "";
    
        if (Object.keys(classesByCourse).length === 0) {
            coursesTable.innerHTML = "<tr><td colspan='7'>No courses found.</td></tr>";
            return;
        }
    
        Object.entries(classesByCourse).forEach((data) => {
            const course = data.course;
            const courseClasses = data.classes;
            
            const row = document.createElement("tr");
            row.classList.add("course-row");
            row.innerHTML = `
                <td><input type="checkbox" class="course-checkbox" value="${course.courseId}"></td>
                <td>${course.courseId}</td>
                <td>${course.name}</td>
                <td>${course.category.join(", ")}</td>
                <td>
                    <select class="class-dropdown" data-course-id="${course.courseId}">
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
    
        const filteredCourses = Object.entries(classesByCourse).filter((data) => {
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
  