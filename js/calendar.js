const dateGrid = document.getElementById("dateGrid");
const openAddEventBtn = document.getElementById("openAddEventBtn");
const careList = document.getElementById("careList");

const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const monthYearDisplay = document.getElementById("monthYearDisplay");
const addEventMonthLabel = document.getElementById("addEventMonthLabel");

const STORAGE_KEY = "petCalendarEvents";
let currentDate = new Date(2026, 4, 1); 

const defaultEvents = [
    { day: 2, month: 4, year: 2026, name: "Annual Checkup", time: "10:00 AM", icon: "fa-stethoscope", color: "green-event", careColor: "green" },
    { day: 12, month: 4, year: 2026, name: "Grooming Appointment", time: "2:30 PM", icon: "fa-scissors", color: "pink-event", careColor: "pink" },
    { day: 15, month: 4, year: 2026, name: "Buy New Food", time: "All Day", icon: "fa-bowl-food", color: "yellow-event", careColor: "yellow" }
];

function getEvents() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        let parsed = JSON.parse(stored);
        return parsed.map(e => ({
            ...e,
            month: e.month !== undefined ? e.month : 4,
            year: e.year !== undefined ? e.year : 2026
        }));
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEvents));
    return defaultEvents;
}

function saveEvents(events) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

function updateDateDropdown(daysInMonth) {
    const newEventDateSelect = document.getElementById("newEventDate");
    if(newEventDateSelect) {
        newEventDateSelect.innerHTML = "";
        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            newEventDateSelect.appendChild(option);
        }
    }
}

function deleteEvent(idToDelete) {
    if (confirm("Are you sure you want to delete this event?")) {
        let events = getEvents();
        
        events = events.filter(event => {
            const eventId = event.id || `${event.name}-${event.day}-${event.month}-${event.year}`;
            return eventId.toString() !== idToDelete.toString();
        });
        
        saveEvents(events);
        renderCalendar();
    }
}

function renderUpcomingSchedule() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const events = getEvents()
        .filter(e => e.month === month && e.year === year)
        .sort((a, b) => a.day - b.day);
        
    careList.innerHTML = "";

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthShort = monthNames[month];

    events.forEach(event => {
        const item = document.createElement("article");
        item.className = "care-item";

        const eventId = event.id || `${event.name}-${event.day}-${event.month}-${event.year}`;

        item.innerHTML = `
            <span class="care-icon ${event.careColor}">
                <i class="fa-solid ${event.icon}"></i>
            </span>
            <div style="flex: 1;">
                <h3>${event.name}</h3>
                <p>${monthShort} ${event.day} - ${event.time}</p>
            </div>
            <button class="delete-event-btn" data-id="${eventId}">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        careList.appendChild(item);
    });

    document.querySelectorAll('.delete-event-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idToDelete = this.getAttribute('data-id');
            deleteEvent(idToDelete);
        });
    });
}

function renderCalendar() {
    dateGrid.innerHTML = "";
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    if(monthYearDisplay) monthYearDisplay.innerHTML = `${monthNames[month]}<br>${year}`;
    if(addEventMonthLabel) addEventMonthLabel.innerText = `Date (${monthNames[month]} ${year})`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    let generatedDates = [];

    for (let i = firstDay - 1; i >= 0; i--) {
        generatedDates.push({ day: daysInPrevMonth - i, muted: true });
    }

    for (let i = 1; i <= daysInMonth; i++) {
        generatedDates.push({ day: i, muted: false });
    }

    const remainingCells = 42 - generatedDates.length;
    for (let i = 1; i <= remainingCells; i++) {
        generatedDates.push({ day: i, muted: true });
    }

    const events = getEvents().filter(e => e.month === month && e.year === year);

    generatedDates.forEach(date => {
        const dateBox = document.createElement("button");
        dateBox.type = "button";
        dateBox.className = "date-box";
        dateBox.textContent = date.day;

        if (date.muted) {
            dateBox.classList.add("muted");
        } else {
            const event = events.find(item => item.day === date.day);
            if (event) {
                dateBox.classList.add(event.color);
                const icon = document.createElement("i");
                icon.className = `fa-solid ${event.icon}`;
                dateBox.appendChild(icon);
            }
        }

        dateGrid.appendChild(dateBox);
    });

    renderUpcomingSchedule();
    updateDateDropdown(daysInMonth);
}

prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

const addEventModal = document.getElementById("addEventModal");
const closeAddEventBtn = document.getElementById("closeAddEventBtn");
const cancelAddEventBtn = document.getElementById("cancelAddEventBtn");
const saveAddEventBtn = document.getElementById("saveAddEventBtn");
const newEventTimeInput = document.getElementById("newEventTime");

if (newEventTimeInput) {
    newEventTimeInput.addEventListener('click', function() {
        if (typeof this.showPicker === 'function') {
            try {
                this.showPicker();
            } catch (e) {}
        }
    });
}

function closeAddEventModal() {
    addEventModal.style.display = 'none';
    document.getElementById("addEventForm").reset();
}

openAddEventBtn.addEventListener("click", () => {
    addEventModal.style.display = 'flex';
});

closeAddEventBtn.addEventListener('click', closeAddEventModal);
cancelAddEventBtn.addEventListener('click', closeAddEventModal);

window.addEventListener('click', function(e) {
    if (e.target === addEventModal) {
        closeAddEventModal();
    }
});

saveAddEventBtn.addEventListener('click', () => {
    const eventName = document.getElementById("newEventName").value;
    const eventDay = parseInt(document.getElementById("newEventDate").value);
    const rawTime = document.getElementById("newEventTime").value; 
    const eventType = document.querySelector('input[name="eventType"]:checked').value;

    if (!eventName) {
        alert("Please enter an event name.");
        return;
    }

    let formattedTime = "All Day";
    if (rawTime) {
        const [hours, minutes] = rawTime.split(':');
        let h = parseInt(hours, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12; 
        formattedTime = `${h}:${minutes} ${ampm}`;
    }

    const typeMap = {
        checkup: {
            icon: "fa-stethoscope",
            color: "green-event",
            careColor: "green"
        },
        grooming: {
            icon: "fa-scissors",
            color: "pink-event",
            careColor: "pink"
        },
        food: {
            icon: "fa-bowl-food",
            color: "yellow-event",
            careColor: "yellow"
        }
    };

    const selectedType = typeMap[eventType];
    const events = getEvents();

    events.push({
        id: Date.now(),
        day: eventDay,
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        name: eventName,
        time: formattedTime,
        icon: selectedType.icon,
        color: selectedType.color,
        careColor: selectedType.careColor
    });

    saveEvents(events);
    renderCalendar();
    closeAddEventModal();
});

renderCalendar();