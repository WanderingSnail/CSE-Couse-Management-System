// instructor-preference.js
import { Class } from './class/class.js';

document.addEventListener("DOMContentLoaded", async () => {
    const courseListDiv = document.getElementById("course-list");
    const submitBtn = document.getElementById("submit-preferences");
    

    try {
      // Load class
      const classes = await Class.load();
      // Filter open classes only
      const openCourses = classes.filter(c => c.status === "open");
  
      openCourses.forEach(course => {

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <label>
                    <input type="checkbox" class="course-checkbox" value="${course.courseId}" data-class-id="${course.classId}">
                </label>
            </td>
            <td>${course.courseId}</td>
            <td>${course.courseName}</td>
            <td>${course.classId}</td>
            <td>${course.schedule.day.join(", ")} ${course.schedule.time}</td>
            <td>${course.capacity}</td>
        `;
        courseListTbody.appendChild(row);
    });
  
      submitBtn.addEventListener("click", () => {
        const selectedCourses = Array.from(
          document.querySelectorAll("input[type=checkbox]:checked")
        ).map(cb => cb.value);
  
        // Update courseInterests
        selectedCourses.forEach(courseId => {
          const courseEntry = courseInterests.find(c => c.courseId === courseId);
          if (courseEntry) {
            if (!courseEntry.interestedInstructors.includes(instructorId)) {
              courseEntry.interestedInstructors.push(instructorId);
            }
          } else {
            courseInterests.push({
              courseId,
              interestedInstructors: [instructorId]
            });
          }
        });
  
        
        console.log("Updated courseInterests.json:", JSON.stringify(courseInterests, null, 2));
        alert("Your preferences have been submitted.");
      });
  
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Failed to load data. Check your JSON files and paths.");
    }
  });
  