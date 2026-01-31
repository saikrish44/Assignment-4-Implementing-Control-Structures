const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const SHIFTS = ["Morning", "Afternoon", "Evening"];

const employees = {
    Alice: ["Morning", "Afternoon"],
    Bob: ["Evening", "Morning"],
    Charlie: ["Morning", "Evening"],
    Diana: ["Afternoon", "Morning"],
    Evan: ["Evening", "Afternoon"],
    Fiona: ["Morning", "Afternoon"],
};

const schedule = {};
const workDays = {};

for (let emp in employees) {
    workDays[emp] = 0;
}

DAYS.forEach(day => {
    schedule[day] = {};
    SHIFTS.forEach(shift => schedule[day][shift] = []);
    let assignedToday = new Set();

    for (let emp in employees) {
        if (workDays[emp] >= 5) continue;

        for (let pref of employees[emp]) {
            if (schedule[day][pref].length < 2 && !assignedToday.has(emp)) {
                schedule[day][pref].push(emp);
                assignedToday.add(emp);
                workDays[emp]++;
                break;
            }
        }
    }

    SHIFTS.forEach(shift => {
        while (schedule[day][shift].length < 2) {
            let available = Object.keys(employees).filter(
                e => !assignedToday.has(e) && workDays[e] < 5
            );

            if (available.length === 0) break;

            let chosen = available[Math.floor(Math.random() * available.length)];
            schedule[day][shift].push(chosen);
            assignedToday.add(chosen);
            workDays[chosen]++;
        }
    });
});

console.log("\nFINAL WEEKLY SCHEDULE\n");
for (let day of DAYS) {
    console.log(day);
    for (let shift of SHIFTS) {
        console.log(`  ${shift}: ${schedule[day][shift].join(", ")}`);
    }
    console.log();
}
