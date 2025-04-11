import { Student } from "./class/student.js";
import { Class } from "./class/class.js";
import { Course } from "./class/course.js";

document.addEventListener("DOMContentLoaded", async () => {
  const students = await Student.load();
  const classes = await Class.load();
  const courses = await Course.load();
  const studentID = localStorage.getItem("id");
  const student = students.find((student) => student.id === studentID);

  const learningPath = {
    enrolled: classes
      .filter((cls) =>
        student.enrolledCourses.some(
          (c) => c.classId === cls.classId && c.courseId === cls.courseId
        )
      )
      .map((cls) => ({
        name: cls.courseName,
        category: cls.category,
        instructor: [cls.instructor],
        classId: cls.classId,
        status: cls.status,
      })),
    completed: student.completedCourses.map((course) => ({
      name: course.courseName,
      category: course.category,
      instructor: [course.instructor],
      classId: course.classId,
      grade: course.grade,
    })),
  };

  const enrolledCoursesTable = document
    .querySelector("#enrolledCoursesTable")
    .querySelector("tbody");
  const completedCoursesTable = document
    .querySelector("#completedCoursesTable")
    .querySelector("tbody");
  const searchByName = document.querySelector("#searchByName");
  const searchByCategory = document.querySelector("#searchByCategory");
  const searchBtn = document.querySelector("#searchBtn");

  function displayEnrolledCourses(coursesToDisplay = learningPath.enrolled) {
    enrolledCoursesTable.innerHTML = "";
    if (coursesToDisplay.length === 0) {
      enrolledCoursesTable.innerHTML =
        "<tr><td colspan='4'>No enrolled courses found.</td></tr>";
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

  function displayCompletedCourses(coursesToDisplay = learningPath.completed) {
    completedCoursesTable.innerHTML = "";
    if (coursesToDisplay.length === 0) {
      completedCoursesTable.innerHTML =
        "<tr><td colspan='4'>No completed courses found.</td></tr>";
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

  function filterCourses() {
    const nameFilter = searchByName.value.toLowerCase().trim();
    const categoryFilter = searchByCategory.value.trim();

    const filteredEnrolled = learningPath.enrolled.filter((course) => {
      const matchesName = course.name.toLowerCase().includes(nameFilter);
      const matchesCategory =
        !categoryFilter || course.category.includes(categoryFilter);
      return matchesName && matchesCategory;
    });

    const filteredCompleted = learningPath.completed.filter((course) => {
      const matchesName = course.name.toLowerCase().includes(nameFilter);
      const matchesCategory =
        !categoryFilter || course.category.includes(categoryFilter);
      return matchesName && matchesCategory;
    });

    displayEnrolledCourses(filteredEnrolled);
    displayCompletedCourses(filteredCompleted);
  }

  function getCreditHours(course) {
    const courseDetails = courses.find((c) => c.courseId === course.courseId);

    if (courseDetails) {
      return courseDetails.creditHours;
    } else {
      return `Course not found.`;
    }
  }

  function calcGPA() {
    const gradePoints = {
      'A': 4.00,
      'B+': 3.50,
      'B': 3.00,
      'C+': 2.50,
      'C': 2.00,
      'D+': 1.50,
      'D': 1.00,
      'F': 0.00
    };
  
    let totalPoints = 0;       // Σ (credit hours × grade points)
    let totalCreditHours = 0;  // Σ credit hours
  
    learningPath.completed.forEach((course) => {
      const grade = course.grade;
      const creditHours = getCreditHours(course);  
      const points = creditHours * gradePoints[grade];
      totalPoints += points;
      totalCreditHours += creditHours;
      
    });
  
    const gpa = totalCreditHours > 0 ? (totalPoints / totalCreditHours).toFixed(2) : "0.00";
    const gpaDisplay = document.querySelector("#gpaValue");
    if (gpaDisplay) gpaDisplay.textContent = gpa;
  }
  

  searchBtn.addEventListener("click", filterCourses);
  searchByName.addEventListener("input", filterCourses);
  searchByCategory.addEventListener("change", filterCourses);

  displayEnrolledCourses();
  displayCompletedCourses();
  calcGPA();
});
