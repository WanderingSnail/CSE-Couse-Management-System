import { Student } from './class/student.js';
import { Class } from './class/class.js';

document.addEventListener("DOMContentLoaded", async () => {
    const classes = await Class.load();
    const students = await Student.load();

    const studentID = localStorage.getItem("id");
    const student = students.find(student => student.id === studentID);

    const selectedCourses = JSON.parse(localStorage.getItem('selectedCourses') || '[]');
    const selectedClasses = selectedCourses.map(course => 
        classes.find(c => c.courseId === course.courseId && c.classId === course.classId)
    ).filter(Boolean);

    console.log('Selected classes:', selectedClasses);

    //Get DOM elements
    const coursesTable = document.querySelector("#coursesTable").querySelector("tbody");
    const registerBtn = document.querySelector("#registerBtn");

    //Check availability of selected courses
    function checkAvailability() {
        selectedClasses.forEach(course => {
            if (!course) return;

            if (course.currentStudents >= course.capacity) {
                course.availability = "Not Available";
            } else if (!course.prerequisites.every(prerequisite => 
                student.completedCourses.some(completed => completed.courseId === prerequisite)
            )) {
                course.availability = "Not Available";
            } else if (course.status !== "open") {
                course.availability = "Not Available";
            } else {
                course.availability = "Available";
            }
        });
    }

    checkAvailability();

    //Function to display selected courses
    function displaySelectedClasses() {
        coursesTable.innerHTML = "";

        selectedClasses.forEach(course => {
            if (!course) return;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <label>
                        <input type="checkbox" class="course-checkbox" value="${course.courseId}" data-class-id="${course.classId}">
                    </label>
                </td>
                <td>${course.courseId}</td>
                <td>${course.courseName}</td>
                <td>${course.prerequisites.join(', ')}</td>
                <td>${course.classId}</td>
                <td>${course.instructors}</td>
                <td>${course.schedule.day.join(", ")} ${course.schedule.time}</td>
                <td>${course.status}</td>
                <td>${course.currentStudents}</td>
                <td>${course.capacity}</td>
                <td>${course.availability}</td>
            `;
            coursesTable.appendChild(row);
        });
    }

    //Event listeners
    registerBtn.addEventListener("click", async () => {
        const registeredCourses = [];
        const checkboxes = document.querySelectorAll('.course-checkbox:checked');

        for (const checkbox of checkboxes) {
            const courseId = checkbox.value;
            const classId = checkbox.dataset.classId;
            const course = selectedClasses.find(c => c.courseId === courseId && c.classId === classId);

            if (!course) continue;

            if (course.availability !== "Available") {
                alert("Course is not available");
                continue;
            }

            if (student.completedCourses.some(completed => completed.courseId === courseId)) {
                alert("You have already completed this course");
                continue;
            }

            if (student.enrolledCourses.some(enrolled => enrolled.courseId === courseId)) {
                alert("You have already enrolled for this course");
                continue;
            }

            registeredCourses.push({
                courseId: courseId,
                classId: classId,
                courseName: course.courseName,
                category: course.category,
                status: course.status
            });

            //Update class's current students
            course.currentStudents++;
        }

        if (registeredCourses.length > 0) {
            //Update student's enrolled courses
            student.enrolledCourses.push(...registeredCourses);
            
            //Save updated data
            await Student.save(students);
            await Class.save(classes);

            //Clear local storage
            alert("Course registered successfully!");
            localStorage.removeItem('selectedCourses');

            //Redirect to main page
            window.location.href = '../html/main.html';
        }
    });

    //Initial display
    displaySelectedClasses();
});