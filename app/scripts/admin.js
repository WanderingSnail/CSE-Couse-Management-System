document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#coursesTable tbody");

  fetch("../data/classes.json")
    .then(response => response.json())
    .then(classes => {
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
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const newClass = {
    classId: data.get("class"),
    courseId: data.get("courseId"),
    courseName: data.get("course_name"),
    category: data.get("category").split(',').map(c => c.trim()),
    description: data.get("description"),
    creditHours: parseInt(data.get("creditHours")),
    minStudents: parseInt(data.get("minStudents")),
    status: data.get("status"),
    instructors: data.get("instructor"),
    capacity: parseInt(data.get("capacity")),
    schedule: {
      "room.NO": data.get("room"),
      day: data.get("days").split(',').map(d => d.trim()),
      time: data.get("time")
    },
    studentList: [],
    currentStudents: 0
  };

  console.log("New Class Created (Mock Only):", newClass);
  alert("Class created (not saved to file – mock only)");

  // Add the new class to the UI table
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

  form.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  const courseForm = document.getElementById("newCourseForm");

  courseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(courseForm);

    const newCourse = {
      courseId: data.get("courseId").trim(),
      name: data.get("name").trim(),
      category: data.get("category").split(',').map(c => c.trim()),
      description: data.get("description").trim(),
      prerequisites: data.get("prerequisites")
        ? data.get("prerequisites").split(',').map(p => p.trim())
        : [],
      creditHours: parseInt(data.get("creditHours")),
      minStudents: parseInt(data.get("minStudents")),
      maxStudents: parseInt(data.get("maxStudents"))
    };

    console.log("New Course Created", newCourse);
    alert(`Course "${newCourse.name}" created (not saved to file)`);

    courseForm.reset();
  });
});


function validateClass(classId) {
  alert(`Class ${classId} validated, please update status in JSON manually.`);
}

function cancelClass(classId) {
  alert(`Class ${classId} cancelled, please update status in JSON manually.`);
}
