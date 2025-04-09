document.addEventListener("DOMContentLoaded", async () => {
  const submitBtn = document.getElementById("submit-preferences");
  let instructorId = "102012045"; // Replace with actual instructor ID

  try {
    const response = await fetch("../data/classes.json");
    const allClasses = await response.json();
    const openCourses = allClasses.filter(c => c.status === "open");

    // Display open courses in the table
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

    // Submit button click event
    submitBtn.addEventListener("click", async (event) => {
      event.preventDefault();

      const selectedCourses = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(cb => cb.value);

      if (selectedCourses.length > 0) {
        // Update the instructor's preferences
        const instructorPreferences = {
          instructorId,
          interestedCourses: selectedCourses
        };

        await fetch("../data/instructor-preferences.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(instructorPreferences)
        });

        alert("Your preferences have been submitted.");
      } else {
        alert("Please select at least one course.");
      }
    });
    
  } catch (error) {
    console.error("Error loading data:", error);
    alert("Failed to load data. Check your JSON files and paths.");
  }
});
