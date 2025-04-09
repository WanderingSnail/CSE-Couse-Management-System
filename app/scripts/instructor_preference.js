document.addEventListener("DOMContentLoaded", async () => {
  const submitBtn = document.getElementById("submit-preferences");
  const courseListTbody = document.getElementById("courseListTbody");

  const instructor = JSON.parse(localStorage.getItem("currentUser"));

  try {
    const response = await fetch("../data/classes.json");
    const allClasses = await response.json();
    const openCourses = allClasses.filter(c => c.status === "open");

    openCourses.forEach(course => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><input type="checkbox" class="course-checkbox" value="${course.classId}"
                   data-course-id="${course.courseId}" 
                   data-course-name="${course.courseName}"></td>
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
        document.querySelectorAll("input.course-checkbox:checked")
      ).map(cb => {
        const courseId = cb.getAttribute("data-course-id");
        const courseName = cb.getAttribute("data-course-name");
        const classId = cb.value;
        return `${courseId} ${courseName} ${classId}`;
      });

      if (selectedCourses.length === 0) {
        alert("Please select at least one course.");
        return;
      }

      const preferences = JSON.parse(localStorage.getItem("instructor-preferences")) || [];

      const updatedEntry = {
        ...instructor,
        interestedCourses: selectedCourses,
        assignedCourses: instructor.assignedCourses || []
      };

      const index = preferences.findIndex(p => p.id === instructor.id);
      if (index !== -1) {
        preferences[index] = updatedEntry;
      } else {
        preferences.push(updatedEntry);
      }

      localStorage.setItem("instructor-preferences", JSON.stringify(preferences));
      alert("Your preferences have been saved.");
    });

  } catch (err) {
    console.error("Failed to load courses:", err);
    alert("Something went wrong loading the courses.");
  }
});