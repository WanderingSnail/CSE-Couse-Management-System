import { Student } from "./class/student.js";
import { Class } from "./class/class.js";
import { Instructor } from "./class/instructor.js";

document.addEventListener("DOMContentLoaded", async () => {
    
    const students = await Student.load();
    const classes = await Class.load();
    const instructors = await Instructor.load();

    const instructorID = localStorage.getItem("id");
    const instructor = instructors.find(instructor => instructor.id === instructorID);
    if (!instructor) {
        console.error("Instructor not found:", instructorID);
        return;
    }

    const assignedClasses = classes.filter(classItem => {
        const assignedClass = instructor.assignedCourses.find(
            assigned => assigned.courseId === classItem.courseId && 
                       assigned.classId === classItem.classId
        );
        return assignedClass && classItem.instructors === instructor.name;
    });

    const courseSelect = document.querySelector("#courseSelect");
    const gradesTable = document.querySelector(".grades-submission table tbody");
    const searchBtn = document.querySelector("#searchBtn"); 
    const submitGradesBtn = document.querySelector("#submitGradesBtn");

    assignedClasses.forEach(classItem => {
        const option = document.createElement("option");
        option.value = classItem.courseId;
        option.textContent = classItem.courseName;
        courseSelect.appendChild(option);
    });

    function displayStudents(selectedClasses = assignedClasses) {
        gradesTable.innerHTML = "";
        
        if (!selectedClasses || selectedClasses.length === 0) {
            gradesTable.innerHTML = "<tr><td colspan='4'>No students found</td></tr>";
            return;
        }

        let hasStudents = false;
        selectedClasses.forEach(classItem => {     
            const classStudents = students.filter(student => 
                student.enrolledCourses.some(course => 
                    course.courseId === classItem.courseId
                )
            );

            if (classStudents.length > 0) {
                hasStudents = true;
                classStudents.forEach(student => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${classItem.classId}</td>
                        <td>
                            <input type="text" class="grade-input" 
                                   data-student-id="${student.id}" 
                                   data-class-id="${classItem.classId}"
                                   data-course-id="${classItem.courseId}"
                                   data-course-name="${classItem.courseName}"
                                   data-category="${classItem.category}"
                                   pattern="[A-F][+-]?|F"
                                   title="Please enter a valid grade (A+, A, A-, B+, B, B-, C+, C, C-, D+, D, D-, F)"
                                   required>
                        </td>
                    `;
                    gradesTable.appendChild(row);
                });
            }
        });

        if (!hasStudents) {
            gradesTable.innerHTML = "<tr><td colspan='4'>No students enrolled in your classes</td></tr>";
        }
    }

    function filterClasses() {
        const courseFilter = courseSelect.value;
        
        let filteredClasses;
        if (courseFilter === "") {
            filteredClasses = assignedClasses;
        } else {
            filteredClasses = assignedClasses.filter(classItem => 
                classItem.courseId === courseFilter
            );
        }        
        displayStudents(filteredClasses);
    }

    async function submitGrades() {
        const gradeInputs = document.querySelectorAll(".grade-input");
        const updatedStudents = new Set();
        
        for (const gradeInput of gradeInputs) {
            if (!gradeInput.value) continue;
            
            const grade = gradeInput.value.trim().toUpperCase();

            const studentId = gradeInput.dataset.studentId;
            const student = students.find(s => s.id === studentId);
            
            if (student) {
                const enrolledIndex = student.enrolledCourses.findIndex(
                    course => course.courseId === gradeInput.dataset.courseId &&
                            course.classId === gradeInput.dataset.classId
                );
                
                if (enrolledIndex !== -1) {
                    const enrolledCourse = student.enrolledCourses[enrolledIndex];
                    student.enrolledCourses.splice(enrolledIndex, 1);
                    
                    student.completedCourses.push({
                        courseId: gradeInput.dataset.courseId,
                        classId: gradeInput.dataset.classId,
                        courseName: gradeInput.dataset.courseName,
                        category: gradeInput.dataset.category.split(','),
                        instructor: instructor.name,
                        grade: grade
                    });
                    
                    updatedStudents.add(student);
                }
            }
        }
        
        if (updatedStudents.size > 0) {
            try {
                await Student.save(students);                
                alert("Grades submitted successfully!");
                filterClasses();
            } catch (error) {                
                alert("Error saving grades. Please try again.");
            }
        } else {
            alert("No grades to submit.");
        }
    }

    courseSelect.addEventListener("change", filterClasses);
    searchBtn.addEventListener("click", filterClasses);
    submitGradesBtn.addEventListener("click", submitGrades);

    displayStudents();
});
  