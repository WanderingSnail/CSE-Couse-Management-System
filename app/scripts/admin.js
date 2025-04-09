import { Class } from './class/class.js';
import { Course } from './class/course.js';
import { Instructor } from './class/instructor.js';

document.addEventListener("DOMContentLoaded", async () => {
  const classes = await Class.load();
  const courses = await Course.load();
  const instructors = await Instructor.load();

  const tableBody = document.querySelector("#coursesTable tbody");

  // Display all classes
  classes.forEach(cls => {
    const tr = document.createElement("tr");

    const studentCount = cls.currentStudents || 0;
    const canValidate = studentCount >= cls.minStudents;
    const actionBtn = canValidate
      ? `<button class="btn-validate" onclick="validateClass('${cls.classId}')">Validate</button>`
      : `<button class="btn-cancel" onclick="cancelClass('${cls.classId}')">Cancel</button>`;

    tr.innerHTML = `
        <td>${cls.courseName}</td>
        <td>${cls.category.join(", ")}</td>
        <td>${cls.status}</td>
        <td>${studentCount}</td>
        <td>${cls.classId}</td>
        <td>${actionBtn}</td>
    `;

    tableBody.appendChild(tr);
  });
});

// Handle new course form submission
document.getElementById("newCourseForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(e.target);
  const courses = await Course.load();

  const newCourse = new Course(
    data.get("courseId").trim(),
    data.get("name").trim(),
    data.get("category").split(',').map(c => c.trim()),
    data.get("description").trim(),
    data.get("prerequisites") ? data.get("prerequisites").split(',').map(p => p.trim()) : [],
    parseInt(data.get("creditHours")),
    parseInt(data.get("minStudents")),
    parseInt(data.get("maxStudents"))
  );

  courses.push(newCourse);
  await Course.save(courses);

  alert(`Course "${newCourse.name}" created successfully`);
  e.target.reset();
});

// Handle new class form submission
document.getElementById("newClassForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(e.target);
  const classes = await Class.load();
  const courses = await Course.load();
  const instructors = await Instructor.load();

  const course = courses.find(c => c.courseId === data.get("courseId"));
  if (!course) {
    alert("Course not found");
    return;
  }

  const newClass = new Class(
    data.get("class"),
    data.get("courseId"),
    course.name,
    course.category,
    course.description,
    course.prerequisites,
    course.creditHours,
    course.minStudents,
    data.get("status"),
    data.get("instructor"),
    parseInt(data.get("capacity")),
    {
      "room.NO": data.get("room"),
      day: data.get("days").split(',').map(d => d.trim()),
      time: data.get("time")
    },
    [],
    0
  );

  classes.push(newClass);
  await Class.save(classes);

  // Update instructor's assigned courses
  const instructor = instructors.find(i => i.name === data.get("instructor"));
  if (instructor) {
    instructor.assignedCourses.push({
      courseId: newClass.courseId,
      classId: newClass.classId
    });
    await Instructor.save(instructors);
  }

  // Update UI
  const tr = document.createElement("tr");
  tr.innerHTML = `
      <td>${newClass.courseName}</td>
      <td>${newClass.category.join(', ')}</td>
      <td>${newClass.status}</td>
      <td>${newClass.currentStudents}</td>
      <td>${newClass.classId}</td>
      <td><button class="btn-cancel" onclick="cancelClass('${newClass.classId}')">Cancel</button></td>
  `;
  document.querySelector("#coursesTable tbody").appendChild(tr);

  alert("Class created successfully");
  e.target.reset();
});

// Validate class
window.validateClass = async function(classId) {
  const classes = await Class.load();
  const classToValidate = classes.find(c => c.classId === classId);
  
  if (classToValidate) {
    classToValidate.status = "inProgress";
    await Class.save(classes);
    alert(`Class ${classId} validated successfully`);
    window.location.href = window.location.href;
  }
}

// Cancel class
window.cancelClass = async function(classId) {
  const classes = await Class.load();
  const classToCancel = classes.find(c => c.classId === classId);
  
  if (classToCancel) {
    classToCancel.status = "cancelled";
    await Class.save(classes);
    alert(`Class ${classId} cancelled successfully`);
    window.location.href = window.location.href;
  }
}
