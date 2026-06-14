const dateGrid = document.getElementById("dateGrid");
const openAddEventBtn = document.getElementById("openAddEventBtn");
const openRemindersBtn = document.getElementById("openRemindersBtn");
const careList = document.getElementById("careList");

const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const monthYearDisplay = document.getElementById("monthYearDisplay");
const addEventMonthLabel = document.getElementById("addEventMonthLabel");

const STORAGE_KEY = "petCalendarEvents";
const REMINDER_STORAGE_KEY = "petReminders";
const PRESET_KEY = "pendingCalendarEventPreset";
const REMINDER_PRESET_KEY = "pendingReminderPreset";
let currentDate = new Date(2026, 4, 1); 

const defaultEvents = [
    { day: 2, month: 4, year: 2026, name: "Annual Checkup", time: "10:00 AM", icon: "fa-stethoscope", color: "green-event", careColor: "green" },
    { day: 12, month: 4, year: 2026, name: "Grooming Appointment", time: "2:30 PM", icon: "fa-scissors", color: "pink-event", careColor: "pink" },
    { day: 15, month: 4, year: 2026, name: "Buy New Food", time: "All Day", icon: "fa-bowl-food", color: "yellow-event", careColor: "yellow" }
];

function showToast(message, type = 'success', duration = 3000) {
    const existing = document.getElementById('appToast');
    if (existing) existing.remove();

    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark';
    const toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> ${message}`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

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

function getReminders() {
    const stored = localStorage.getItem(REMINDER_STORAGE_KEY);
    if (!stored) return [];

    try {
        return JSON.parse(stored);
    } catch (error) {
        localStorage.removeItem(REMINDER_STORAGE_KEY);
        return [];
    }
}

function saveReminders(reminders) {
    localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(reminders));
}

function getPendingPreset() {
    const raw = localStorage.getItem(PRESET_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw);
    } catch (error) {
        localStorage.removeItem(PRESET_KEY);
        return null;
    }
}

function clearPendingPreset() {
    localStorage.removeItem(PRESET_KEY);
}

function getPendingReminderPreset() {
    const raw = localStorage.getItem(REMINDER_PRESET_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch (error) {
        localStorage.removeItem(REMINDER_PRESET_KEY);
        return null;
    }
}

function clearPendingReminderPreset() {
    localStorage.removeItem(REMINDER_PRESET_KEY);
}

function updateDateDropdown(daysInMonth) {
    const newEventDateSelect = document.getElementById("newEventDate");
    if(newEventDateSelect) {
        newEventDateSelect.innerHTML = "";
        const placeholder = document.createElement('option');
        placeholder.value = "";
        placeholder.textContent = "Select a date";
        placeholder.selected = true;
        placeholder.disabled = true;
        newEventDateSelect.appendChild(placeholder);
        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            newEventDateSelect.appendChild(option);
        }
    }
}

// Replace this:
function deleteEvent(idToDelete) {
    const events = getEvents();
    const event = events.find(e => {
        const eventId = e.id || `${e.name}-${e.day}-${e.month}-${e.year}`;
        return eventId.toString() === idToDelete.toString();
    });
    document.getElementById('deleteEventName').textContent = event ? event.name : 'this event';
    pendingDeleteId = idToDelete;
    deleteEventModal.style.display = 'flex';
}

// With this:
const deleteEventModal = document.getElementById('deleteEventModal');
const cancelDeleteEventBtn = document.getElementById('cancelDeleteEventBtn');
const confirmDeleteEventBtn = document.getElementById('confirmDeleteEventBtn');
const deleteReminderModal = document.getElementById('deleteReminderModal');
const cancelDeleteReminderBtn = document.getElementById('cancelDeleteReminderBtn');
const confirmDeleteReminderBtn = document.getElementById('confirmDeleteReminderBtn');
let pendingDeleteId = null;
let pendingReminderDeleteId = null;

function deleteEvent(idToDelete) {
    // Find event name to show in modal
    const events = getEvents();
    const event = events.find(e => {
        const eventId = e.id || `${e.name}-${e.day}-${e.month}-${e.year}`;
        return eventId.toString() === idToDelete.toString();
    });
    document.getElementById('deleteEventName').textContent = event ? event.name : 'this event';
    pendingDeleteId = idToDelete;
    deleteEventModal.style.display = 'flex';
}

cancelDeleteEventBtn.addEventListener('click', () => {
    deleteEventModal.style.display = 'none';
    pendingDeleteId = null;
});

confirmDeleteEventBtn.addEventListener('click', () => {
    if (pendingDeleteId !== null) {
        let events = getEvents();
        events = events.filter(e => {
            const eventId = e.id || `${e.name}-${e.day}-${e.month}-${e.year}`;
            return eventId.toString() !== pendingDeleteId.toString();
        });
        saveEvents(events);
        renderCalendar();
        deleteEventModal.style.display = 'none';
        pendingDeleteId = null;
        showToast('Event deleted successfully');
    }
});

window.addEventListener('click', function(e) {
    if (e.target === deleteEventModal) {
        deleteEventModal.style.display = 'none';
        pendingDeleteId = null;
    }
    if (e.target === addEventModal) closeAddEventModal();
    if (e.target === remindersModal) closeReminderModal();
    if (e.target === deleteReminderModal) {
        deleteReminderModal.style.display = 'none';
        pendingReminderDeleteId = null;
    }
});

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
const newEventNameInput = document.getElementById("newEventName");
const remindersModal = document.getElementById("remindersModal");
const closeRemindersBtn = document.getElementById("closeRemindersBtn");
const openRemindersButton = document.getElementById("openRemindersBtn");
const newReminderBtn = document.getElementById("newReminderBtn");
const remindersList = document.getElementById("remindersList");
const reminderForm = document.getElementById("reminderForm");
const reminderTitleInput = document.getElementById("reminderTitle");
const reminderDueDateInput = document.getElementById("reminderDueDate");
const reminderDueTimeInput = document.getElementById("reminderDueTime");
const reminderRepeatInput = document.getElementById("reminderRepeat");
const reminderSlotWrap = document.getElementById("reminderSlotWrap");
const groomingKindWrap = document.getElementById("groomingKindWrap");
const groomingKindInput = document.getElementById("groomingKind");
const saveReminderBtn = document.getElementById("saveReminderBtn");
const cancelReminderFormBtn = document.getElementById("cancelReminderFormBtn");

if (newEventTimeInput) {
    newEventTimeInput.addEventListener('click', function() {
        if (typeof this.showPicker === 'function') {
            try {
                this.showPicker();
            } catch (e) {}
        }
    });
}

if (openRemindersButton) {
    openRemindersButton.addEventListener('click', () => openReminderModal());
}

function setEventType(type) {
    const radio = document.querySelector(`input[name="eventType"][value="${type}"]`);
    if (radio) radio.checked = true;
}

function clearEventErrors() {
    ['newEventName', 'newEventDate', 'newEventTime'].forEach(id => {
        const field = document.getElementById(id);
        const error = document.getElementById(`${id}Error`);
        if (field) field.classList.remove('input-error');
        if (error) {
            error.textContent = '';
            error.style.display = 'none';
        }
    });
}

function showEventError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}Error`);
    if (field) field.classList.add('input-error');
    if (error) {
        error.textContent = message;
        error.style.display = 'block';
    }
}

function formatReminderDate(dateValue) {
    if (!dateValue) return '';
    const date = new Date(dateValue + 'T00:00:00');
    if (Number.isNaN(date.getTime())) return dateValue;
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function formatReminderTime(timeValue) {
    if (!timeValue) return '';
    if (timeValue.includes(':') && timeValue.length <= 5) {
        const [hours, minutes] = timeValue.split(':');
        const parsedHours = parseInt(hours, 10);
        if (Number.isNaN(parsedHours)) return timeValue;
        const ampm = parsedHours >= 12 ? 'PM' : 'AM';
        const displayHour = parsedHours % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }
    return timeValue;
}

function reminderTypeLabel(type) {
    return {
        vaccine: 'Vaccine Schedule',
        feeding: 'Feeding Schedule',
        grooming: 'Grooming Schedule'
    }[type] || 'Reminder';
}

function reminderSubtypeLabel(reminder) {
    if (reminder.source === 'feeding') return `Feeding - ${reminder.slot === 'evening' ? 'Evening' : 'Morning'}`;
    if (reminder.source === 'grooming') return `Grooming - ${reminder.groomingKind || 'Brushing'}`;
    if (reminder.source === 'vaccine') return 'Vaccine - Due Soon';
    return 'Reminder';
}

function setReminderFormMode(mode) {
    const isEditing = mode === 'edit';
    reminderForm.style.display = 'block';
    cancelReminderFormBtn.style.display = 'inline-flex';
    saveReminderBtn.style.display = 'inline-flex';
    newReminderBtn.style.display = isEditing ? 'none' : 'inline-flex';
    remindersList.style.display = isEditing ? 'none' : 'flex';
}

function resetReminderForm() {
    reminderForm.reset();
    document.querySelector('input[name="reminderSource"][value="vaccine"]').checked = true;
    document.querySelector('input[name="feedingSlot"][value="morning"]').checked = true;
    reminderSlotWrap.style.display = 'none';
    groomingKindWrap.style.display = 'none';
    clearEventErrors();
    const titleError = document.getElementById('reminderTitleError');
    const dueDateError = document.getElementById('reminderDueDateError');
    if (titleError) titleError.style.display = 'none';
    if (dueDateError) dueDateError.style.display = 'none';
}

function applyReminderPresetToForm(preset) {
    if (!preset) return;
    const source = preset.source || 'vaccine';
    const sourceRadio = document.querySelector(`input[name="reminderSource"][value="${source}"]`);
    if (sourceRadio) sourceRadio.checked = true;
    reminderTitleInput.value = preset.title || '';
    reminderDueDateInput.value = preset.dueDate || '';
    reminderDueTimeInput.value = preset.dueTime || '';
    reminderRepeatInput.value = preset.repeat || 'once';
    const feedingSlot = document.querySelector(`input[name="feedingSlot"][value="${preset.slot || 'morning'}"]`);
    if (feedingSlot) feedingSlot.checked = true;
    if (preset.groomingKind) groomingKindInput.value = preset.groomingKind;
    toggleReminderFields();
}

function toggleReminderFields() {
    const selectedSource = document.querySelector('input[name="reminderSource"]:checked')?.value;
    reminderSlotWrap.style.display = selectedSource === 'feeding' ? 'block' : 'none';
    groomingKindWrap.style.display = selectedSource === 'grooming' ? 'block' : 'none';

    if (selectedSource === 'feeding') {
        reminderRepeatInput.value = 'daily';
        if (!reminderDueTimeInput.value) reminderDueTimeInput.value = '08:00';
    }

    if (selectedSource === 'grooming') {
        if (reminderRepeatInput.value === 'once') reminderRepeatInput.value = 'weekly';
    }

    if (selectedSource === 'vaccine' && !reminderRepeatInput.value) {
        reminderRepeatInput.value = 'once';
    }
}

function buildReminderTitle() {
    const source = document.querySelector('input[name="reminderSource"]:checked')?.value || 'vaccine';
    const title = reminderTitleInput.value.trim();
    if (title) return title;
    if (source === 'vaccine') return 'Vaccine Reminder';
    if (source === 'feeding') return 'Feeding Reminder';
    if (source === 'grooming') return 'Grooming Reminder';
    return 'Reminder';
}

function renderReminders() {
    if (!remindersList) return;
    const reminders = getReminders();
    remindersList.innerHTML = '';

    if (!reminders.length) {
        remindersList.innerHTML = '<p style="color: var(--text-muted); font-size: 14px;">No reminders yet. Add one from a schedule or create your own.</p>';
        return;
    }

    reminders.forEach(reminder => {
        const card = document.createElement('div');
        card.className = 'care-item';
        const meta = [
            reminderTypeLabel(reminder.source),
            reminderSubtypeLabel(reminder),
            reminder.repeat === 'once' ? 'One time' : reminder.repeat.charAt(0).toUpperCase() + reminder.repeat.slice(1)
        ].join(' · ');
        card.innerHTML = `
            <span class="care-icon ${reminder.source === 'vaccine' ? 'green' : reminder.source === 'feeding' ? 'yellow' : 'pink'}">
                <i class="fa-solid ${reminder.source === 'vaccine' ? 'fa-syringe' : reminder.source === 'feeding' ? 'fa-utensils' : 'fa-scissors'}"></i>
            </span>
            <div style="flex: 1;">
                <h3>${reminder.title}</h3>
                <p>${meta}</p>
                <p>${formatReminderDate(reminder.dueDate)}${reminder.dueTime ? ` - ${formatReminderTime(reminder.dueTime)}` : ''}</p>
            </div>
            <div style="display:flex; gap:8px; align-items:center;">
                <button type="button" class="delete-event-btn" data-reminder-edit="${reminder.id}">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button type="button" class="delete-event-btn" data-reminder-delete="${reminder.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        remindersList.appendChild(card);
    });

    remindersList.querySelectorAll('[data-reminder-edit]').forEach(btn => {
        btn.addEventListener('click', () => openReminderEditor(btn.getAttribute('data-reminder-edit')));
    });
    remindersList.querySelectorAll('[data-reminder-delete]').forEach(btn => {
        btn.addEventListener('click', () => deleteReminder(btn.getAttribute('data-reminder-delete')));
    });
}

function createReminderFromEvent() {
    const eventType = document.querySelector('input[name="eventType"]:checked')?.value || 'checkup';
    const eventName = document.getElementById("newEventName").value.trim();
    const eventDateValue = document.getElementById("newEventDate").value;
    const rawTime = document.getElementById("newEventTime").value;

    const reminderMap = {
        checkup: {
            source: 'vaccine',
            title: eventName || 'Vaccine Reminder',
            repeat: 'once',
            dueDate: '2026-11-15',
            dueTime: rawTime || '09:00'
        },
        food: {
            source: 'feeding',
            title: eventName || 'Feeding Reminder',
            repeat: 'daily',
            dueDate: eventDateValue || new Date().toISOString().split('T')[0],
            dueTime: rawTime || '08:00',
            slot: 'morning'
        },
        grooming: {
            source: 'grooming',
            title: eventName || 'Grooming Reminder',
            repeat: 'weekly',
            dueDate: eventDateValue || new Date().toISOString().split('T')[0],
            dueTime: rawTime || '10:00',
            groomingKind: 'Brushing'
        }
    };

    return reminderMap[eventType] || reminderMap.checkup;
}

function openReminderEditor(reminderId) {
    const reminder = getReminders().find(item => String(item.id) === String(reminderId));
    if (!reminder) return;
    resetReminderForm();
    applyReminderPresetToForm(reminder);
    reminderForm.dataset.editingId = reminder.id;
    setReminderFormMode('edit');
}

function deleteReminder(reminderId) {
    const reminder = getReminders().find(item => String(item.id) === String(reminderId));
    if (!reminder) return;
    document.getElementById('deleteReminderName').textContent = reminder.title;
    pendingReminderDeleteId = reminderId;
    deleteReminderModal.style.display = 'flex';
}

function confirmReminderDelete() {
    if (pendingReminderDeleteId === null) return;
    const reminders = getReminders().filter(item => String(item.id) !== String(pendingReminderDeleteId));
    saveReminders(reminders);
    renderReminders();
    deleteReminderModal.style.display = 'none';
    pendingReminderDeleteId = null;
    showToast('Reminder deleted successfully');
}

function openReminderModal(preset = null) {
    remindersModal.style.display = 'flex';
    renderReminders();
    resetReminderForm();
    reminderForm.removeAttribute('data-editing-id');
    if (preset) {
        applyReminderPresetToForm(preset);
        setReminderFormMode('edit');
    }
}

function applyPresetToModal(preset) {
    if (!preset) return;

    if (newEventNameInput && preset.name) {
        newEventNameInput.value = preset.name;
    }

    if (preset.eventType) {
        setEventType(preset.eventType);
    }

    if (preset.day) {
        const dateSelect = document.getElementById("newEventDate");
        if (dateSelect) dateSelect.value = String(preset.day);
    }
}

function closeAddEventModal() {
    addEventModal.style.display = 'none';
    document.getElementById("addEventForm").reset();
    setEventType('checkup');
    clearEventErrors();
    clearPendingPreset();
}

openAddEventBtn.addEventListener("click", () => {
    clearPendingPreset();
    addEventModal.style.display = 'flex';
});

closeAddEventBtn.addEventListener('click', closeAddEventModal);
cancelAddEventBtn.addEventListener('click', closeAddEventModal);

function closeReminderModal() {
    remindersModal.style.display = 'none';
    reminderForm.style.display = 'none';
    reminderForm.removeAttribute('data-editing-id');
    newReminderBtn.style.display = 'inline-flex';
    remindersList.style.display = 'flex';
    resetReminderForm();
    clearPendingReminderPreset();
}

if (closeRemindersBtn) closeRemindersBtn.addEventListener('click', closeReminderModal);
if (newReminderBtn) {
    newReminderBtn.addEventListener('click', () => {
        resetReminderForm();
        reminderForm.removeAttribute('data-editing-id');
        reminderForm.style.display = 'block';
        cancelReminderFormBtn.style.display = 'inline-flex';
        saveReminderBtn.style.display = 'inline-flex';
        newReminderBtn.style.display = 'none';
        remindersList.style.display = 'none';
    });
}

if (cancelReminderFormBtn) {
    cancelReminderFormBtn.addEventListener('click', () => {
        reminderForm.style.display = 'none';
        reminderForm.removeAttribute('data-editing-id');
        newReminderBtn.style.display = 'inline-flex';
        remindersList.style.display = 'flex';
        resetReminderForm();
        renderReminders();
    });
}

if (cancelDeleteReminderBtn) {
    cancelDeleteReminderBtn.addEventListener('click', () => {
        deleteReminderModal.style.display = 'none';
        pendingReminderDeleteId = null;
    });
}

if (confirmDeleteReminderBtn) {
    confirmDeleteReminderBtn.addEventListener('click', confirmReminderDelete);
}

document.querySelectorAll('input[name="reminderSource"]').forEach(radio => {
    radio.addEventListener('change', toggleReminderFields);
});

if (reminderRepeatInput) reminderRepeatInput.addEventListener('change', toggleReminderFields);

if (saveReminderBtn) {
    saveReminderBtn.addEventListener('click', () => {
        clearEventErrors();
        const source = document.querySelector('input[name="reminderSource"]:checked')?.value || 'vaccine';
        const title = buildReminderTitle();
        const dueDate = reminderDueDateInput.value;
        const dueTime = reminderDueTimeInput.value;
        const repeat = reminderRepeatInput.value;
        const editingId = reminderForm.dataset.editingId;

        let valid = true;
        if (!title.trim()) {
            showEventError('reminderTitle', 'Please add a reminder title.');
            valid = false;
        }
        if (source === 'vaccine' && !dueDate) {
            showEventError('reminderDueDate', 'Please choose a due date.');
            valid = false;
        }
        if (!valid) return;

        const startDate = dueDate || new Date().toISOString().split('T')[0];

        const reminder = {
            id: editingId ? Number(editingId) : Date.now(),
            source,
            title,
            dueDate: startDate,
            dueTime,
            repeat
        };

        if (source === 'feeding') {
            reminder.slot = document.querySelector('input[name="feedingSlot"]:checked')?.value || 'morning';
            reminder.repeat = 'daily';
            reminder.dueTime = dueTime || (reminder.slot === 'morning' ? '08:00' : '18:00');
        }

        if (source === 'grooming') {
            reminder.groomingKind = groomingKindInput.value;
            if (repeat === 'once') reminder.repeat = 'weekly';
        }

        const reminders = getReminders();
        const nextReminders = editingId
            ? reminders.map(item => String(item.id) === String(editingId) ? reminder : item)
            : [reminder, ...reminders];
        saveReminders(nextReminders);
        renderReminders();
        closeReminderModal();
        showToast(editingId ? 'Reminder updated successfully' : 'Reminder saved successfully');
    });
}

window.addEventListener('click', function(e) {
    if (e.target === addEventModal) {
        closeAddEventModal();
    }
});

saveAddEventBtn.addEventListener('click', () => {
    const eventName = document.getElementById("newEventName").value.trim();
    const eventDateValue = document.getElementById("newEventDate").value;
    const rawTime = document.getElementById("newEventTime").value; 
    const eventType = document.querySelector('input[name="eventType"]:checked').value;

    clearEventErrors();

    let isValid = true;
    if (!eventName) {
        showEventError('newEventName', 'Please enter an event name.');
        isValid = false;
    }

    if (!eventDateValue) {
        showEventError('newEventDate', 'Please choose a date.');
        isValid = false;
    }

    if (!rawTime) {
        showEventError('newEventTime', 'Please choose a time.');
        isValid = false;
    }

    if (!isValid) return;

    const eventDay = parseInt(eventDateValue, 10);

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

    const reminder = createReminderFromEvent();
    const reminders = getReminders();
    reminders.unshift({
        ...reminder,
        id: Date.now() + 1
    });
    saveReminders(reminders);

    renderCalendar();
    closeAddEventModal();
    showToast('Event added successfully');
});

renderCalendar();

const pendingReminderPreset = getPendingReminderPreset();
if (pendingReminderPreset) {
    openReminderModal(pendingReminderPreset);
    setReminderFormMode('edit');
    reminderForm.removeAttribute('data-editing-id');
    clearPendingReminderPreset();
}

const pendingPreset = getPendingPreset();
if (pendingPreset) {
    applyPresetToModal(pendingPreset);
    addEventModal.style.display = 'flex';
    clearPendingPreset();
}
