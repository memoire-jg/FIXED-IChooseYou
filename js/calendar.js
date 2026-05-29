const dateGrid = document.getElementById("dateGrid");
const openAddEventBtn = document.getElementById("openAddEventBtn");
const careList = document.getElementById("careList");

const STORAGE_KEY = "petCalendarEvents";

const defaultEvents = [
    {
        day: 2,
        name: "Annual Checkup",
        time: "10:00 AM",
        icon: "fa-stethoscope",
        color: "green-event",
        careColor: "green"
    },
    {
        day: 12,
        name: "Grooming Appointment",
        time: "2:30 PM",
        icon: "fa-scissors",
        color: "pink-event",
        careColor: "pink"
    },
    {
        day: 15,
        name: "Buy New Food",
        time: "All Day",
        icon: "fa-bowl-food",
        color: "yellow-event",
        careColor: "yellow"
    }
];

const dates = [
    { day: 26, muted: true },
    { day: 27, muted: true },
    { day: 28, muted: true },
    { day: 29, muted: true },
    { day: 30, muted: true },
    { day: 1 },
    { day: 2 },
    { day: 3 },
    { day: 4 },
    { day: 5 },
    { day: 6 },
    { day: 7 },
    { day: 8 },
    { day: 9 },
    { day: 10 },
    { day: 11 },
    { day: 12 },
    { day: 13 },
    { day: 14 },
    { day: 15 },
    { day: 16 },
    { day: 17 },
    { day: 18 },
    { day: 19 },
    { day: 20 },
    { day: 21 },
    { day: 22 },
    { day: 23 },
    { day: 24 },
    { day: 25 },
    { day: 26 },
    { day: 27 },
    { day: 28 },
    { day: 29 },
    { day: 30 },
    { day: 31 },
    { day: 1, muted: true },
    { day: 2, muted: true },
    { day: 3, muted: true },
    { day: 4, muted: true },
    { day: 5, muted: true },
    { day: 6, muted: true }
];

function getEvents() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEvents));
    return defaultEvents;
}

function saveEvents(events) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

function renderCalendar() {
    dateGrid.innerHTML = "";
    const events = getEvents();

    dates.forEach(date => {
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
}

function renderUpcomingSchedule() {
    const events = getEvents().sort((a, b) => a.day - b.day);
    careList.innerHTML = "";

    events.forEach(event => {
        const item = document.createElement("article");
        item.className = "care-item";

        item.innerHTML = `
            <span class="care-icon ${event.careColor}">
                <i class="fa-solid ${event.icon}"></i>
            </span>
            <div>
                <h3>${event.name}</h3>
                <p>May ${event.day} - ${event.time}</p>
            </div>
        `;

        careList.appendChild(item);
    });
}

const addEventModal = document.getElementById("addEventModal");
const closeAddEventBtn = document.getElementById("closeAddEventBtn");
const cancelAddEventBtn = document.getElementById("cancelAddEventBtn");
const saveAddEventBtn = document.getElementById("saveAddEventBtn");
const newEventDateSelect = document.getElementById("newEventDate");
const newEventTimeInput = document.getElementById("newEventTime");

for (let i = 1; i <= 31; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    newEventDateSelect.appendChild(option);
}

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
        day: eventDay,
        name: eventName,
        time: formattedTime,
        icon: selectedType.icon,
        color: selectedType.color,
        careColor: selectedType.careColor
    });

    saveEvents(events);
    renderCalendar();
    renderUpcomingSchedule();
    closeAddEventModal();
});

renderCalendar();
renderUpcomingSchedule();