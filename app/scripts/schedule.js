document.addEventListener("DOMContentLoaded", async () => {
  const scheduleBody = document.getElementById("scheduleBody");
  const compactViewToggle = document.getElementById("compactView");

  const timeSlots = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00"
  ];
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let classes = [];

  async function loadClasses() {
    const response = await fetch("../data/classes.json");
    const allClasses = await response.json();
    classes = allClasses.filter(cls => cls.status === "inProgress");
    renderSchedule();
  }

  function renderSchedule() {
    scheduleBody.innerHTML = "";

    const isCompact = compactViewToggle.checked;
    const scheduleMap = {};
    const shownCompact = new Set();

    for (let time of timeSlots) {
      scheduleMap[time] = {};
      for (let day of weekDays) {
        scheduleMap[time][day] = "";
      }
    }

    for (let cls of classes) {
      const { courseId, instructors, schedule } = cls;
      const key = `${schedule.time}-${courseId}`;
      const info = `
      <div class="class-block">
        <strong>${courseId}</strong><br>
        <medium>Room ${schedule["room.NO"]}</medium>
      </div>`;

      if (scheduleMap[schedule.time]) {
        if (isCompact) {
          if (shownCompact.has(key)) continue;
          const firstDay = schedule.day.find(day => weekDays.includes(day));
          if (firstDay && scheduleMap[schedule.time][firstDay] !== undefined) {
            scheduleMap[schedule.time][firstDay] += info + "<br><br>";
            shownCompact.add(key);
          }
        } else {
          schedule.day.forEach(day => {
            if (scheduleMap[schedule.time][day] !== undefined) {
              scheduleMap[schedule.time][day] += info + "<br><br>";
            }
          });
        }
      }
    }

    for (let time of timeSlots) {
      const row = document.createElement("tr");
      const timeCell = document.createElement("td");
      timeCell.textContent = time;
      row.appendChild(timeCell);

      for (let day of weekDays) {
        const cell = document.createElement("td");
        cell.innerHTML = scheduleMap[time][day] || "";
        row.appendChild(cell);
      }

      scheduleBody.appendChild(row);
    }
  }

  compactViewToggle.addEventListener("change", renderSchedule);
  loadClasses();
});