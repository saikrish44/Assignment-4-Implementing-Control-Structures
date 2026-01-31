import random

DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
SHIFTS = ["Morning", "Afternoon", "Evening"]

employees = {
    "Alice": ["Morning", "Afternoon"],
    "Bob": ["Evening", "Morning"],
    "Charlie": ["Morning", "Evening"],
    "Diana": ["Afternoon", "Morning"],
    "Evan": ["Evening", "Afternoon"],
    "Fiona": ["Morning", "Afternoon"],
}

schedule = {day: {shift: [] for shift in SHIFTS} for day in DAYS}
work_days = {emp: 0 for emp in employees}

for day in DAYS:
    assigned_today = set()

    for emp, prefs in employees.items():
        if work_days[emp] >= 5:
            continue

        for pref in prefs:
            if len(schedule[day][pref]) < 2 and emp not in assigned_today:
                schedule[day][pref].append(emp)
                assigned_today.add(emp)
                work_days[emp] += 1
                break

    for shift in SHIFTS:
        while len(schedule[day][shift]) < 2:
            available = [
                e for e in employees if e not in assigned_today and work_days[e] < 5
            ]
            if not available:
                break
            chosen = random.choice(available)
            schedule[day][shift].append(chosen)
            assigned_today.add(chosen)
            work_days[chosen] += 1

print("\nFINAL WEEKLY SCHEDULE\n")
for day in DAYS:
    print(day)
    for shift in SHIFTS:
        print(f"  {shift}: {', '.join(schedule[day][shift])}")
    print()
