document.addEventListener("DOMContentLoaded", function () {
    const coursesTable = document.getElementById("coursesTable").querySelector("tbody");
    const searchByName = document.getElementById("searchByName");
    const searchByCategory = document.getElementById("searchByCategory");
    const searchBtn = document.getElementById("searchBtn");
  
    let courses = [];
  
    // Fetch and load courses
    fetch("courses.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        courses = data;
        displayCourses(courses);
      })
      .catch((error) => console.error("Error loading courses:", error));
  
    // Function to display courses
    function displayCourses(courseList) {
      coursesTable.innerHTML = ""; // Clear table before inserting new rows
  
      if (courseList.length === 0) {
        coursesTable.innerHTML = "<tr><td colspan='3'>No courses found.</td></tr>";
        return;
      }
  
      courseList.forEach((course) => {
        const row = document.createElement("tr");
        row.classList.add("course-row");
        row.innerHTML = `
          <td><input type="checkbox" class="course-checkbox" value="${course.id}"></td>
          <td>${course.name}</td>
          <td>${course.category.join(", ")}</td>
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
  });
  