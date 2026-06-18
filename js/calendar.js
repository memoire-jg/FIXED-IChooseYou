const dateGrid = document.getElementById("dateGrid");
const careList = document.getElementById("careList");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const monthYearDisplay = document.getElementById("monthYearDisplay");
const addEventMonthLabel = document.getElementById("addEventMonthLabel");
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('show');
    });
}

const openReminderFormBtn = document.getElementById("openReminderFormBtn");

const REMINDER_STORAGE_KEY = "petReminders";
const REMINDER_PRESET_KEY = "pendingReminderPreset";
const today = new Date();
let currentDate = new Date(today.getFullYear(), today.getMonth(), 1);

const remindersModal = document.getElementById("remindersModal");
const closeRemindersBtn = document.getElementById("closeRemindersBtn");
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
const deleteReminderModal = document.getElementById("deleteReminderModal");
const deleteAllRemindersModal = document.getElementById("deleteAllRemindersModal");
const deleteAllRemindersBtn = document.getElementById("deleteAllRemindersBtn");
const cancelDeleteReminderBtn = document.getElementById("cancelDeleteReminderBtn");
const confirmDeleteReminderBtn = document.getElementById("confirmDeleteReminderBtn");
const cancelDeleteAllRemindersBtn = document.getElementById("cancelDeleteAllRemindersBtn");
const confirmDeleteAllRemindersBtn = document.getElementById("confirmDeleteAllRemindersBtn");
const deleteReminderName = document.getElementById("deleteReminderName");
let pendingDeleteId = null;
let notificationAudioContext = null;
let reminderTimers = [];

function showToast(message, type = "success", duration = 3000) {
    const existing = document.getElementById("appToast");
    if (existing) existing.remove();
    const icon = type === "success" ? "fa-circle-check" : "fa-circle-xmark";
    const toast = document.createElement("div");
    toast.id = "appToast";
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> ${message}`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add("show")));
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function requestNotificationAccess() {
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") {
        Notification.requestPermission().catch(() => {});
    }
}

function playReminderSound() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!notificationAudioContext) {
        notificationAudioContext = new AudioContextClass();
    }

    const ctx = notificationAudioContext;
    if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, now);
    oscillator.frequency.exponentialRampToValueAtTime(660, now + 0.18);
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.28);
}

function notifyReminder(reminder, date) {
    const messageDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const body = `${reminder.title} is due now${reminder.dueTime ? ` at ${formatReminderTime(reminder.dueTime)}` : ""}.`;

    if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Pet reminder", {
            body: `${body} (${messageDate})`
        });
    }

    playReminderSound();
    showToast(`${reminder.title} is due now`, "success", 5000);
}

function getOccurrenceKey(reminder, date) {
    return `${reminder.id}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function getNotifiedReminderMap() {
    return JSON.parse(localStorage.getItem("petReminderNotified") || "{}");
}

function setNotifiedReminder(key) {
    const notified = getNotifiedReminderMap();
    notified[key] = true;
    localStorage.setItem("petReminderNotified", JSON.stringify(notified));
}

function hasBeenNotified(key) {
    return !!getNotifiedReminderMap()[key];
}

function getReminderDateTimes(reminder, rangeStart, rangeEnd) {
    return getReminderOccurrences(reminder, rangeStart, rangeEnd).map(item => {
        const due = new Date(item.date);
        if (reminder.dueTime) {
            const [hours, minutes] = reminder.dueTime.split(":").map(n => parseInt(n, 10));
            if (!Number.isNaN(hours) && !Number.isNaN(minutes)) {
                due.setHours(hours, minutes, 0, 0);
            }
        } else {
            due.setHours(9, 0, 0, 0);
        }
        return { ...item, due };
    });
}

function checkReminderNotifications() {
    const now = new Date();
    const reminders = getReminders().map(normalizeReminder);

    reminders.forEach(reminder => {
        const rangeStart = startOfMonth(now);
        const rangeEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        getReminderDateTimes(reminder, rangeStart, rangeEnd).forEach(item => {
            if (item.due <= now) {
                const key = getOccurrenceKey(reminder, item.due);
                if (!hasBeenNotified(key)) {
                    setNotifiedReminder(key);
                    notifyReminder(reminder, item.due);
                }
            }
        });
    });
}

function clearReminderTimers() {
    reminderTimers.forEach(timer => clearTimeout(timer));
    reminderTimers = [];
}

function scheduleReminderNotification(reminder, due) {
    const delay = due.getTime() - Date.now();
    if (delay <= 0) return;

    const timer = setTimeout(() => {
        const key = getOccurrenceKey(reminder, due);
        if (hasBeenNotified(key)) return;
        setNotifiedReminder(key);
        notifyReminder(reminder, due);
        renderCalendar();
        scheduleReminderTimers();
    }, delay);

    reminderTimers.push(timer);
}

function scheduleReminderTimers() {
    clearReminderTimers();
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    getReminders().map(normalizeReminder).forEach(reminder => {
        getReminderDateTimes(reminder, monthStart, monthEnd).forEach(item => {
            if (item.due > now) {
                scheduleReminderNotification(reminder, item.due);
            }
        });
    });
}

function startReminderMonitoring() {
    checkReminderNotifications();
    scheduleReminderTimers();
    setInterval(() => {
        checkReminderNotifications();
        scheduleReminderTimers();
    }, 60000);
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

function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfYear(date) {
    return new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);
}

function normalizeReminder(reminder) {
    return { repeat: "once", source: "vaccine", ...reminder };
}

function reminderTypeLabel(type) {
    return { vaccine: "Vaccine", feeding: "Feeding", grooming: "Grooming", other: "Other" }[type] || "Reminder";
}

function reminderSubtypeLabel(reminder) {
    if (reminder.source === "feeding") return reminder.slot === "evening" ? "Evening" : "Morning";
    if (reminder.source === "grooming") return reminder.groomingKind || "Brushing";
    if (reminder.source === "other") return "";
    return "";
}

function formatReminderDate(dateValue) {
    if (!dateValue) return "";
    const date = new Date(`${dateValue}T00:00:00`);
    if (Number.isNaN(date.getTime())) return dateValue;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatReminderTime(timeValue) {
    if (!timeValue) return "";
    if (timeValue.includes(":") && timeValue.length <= 5) {
        const [hours, minutes] = timeValue.split(":");
        const parsedHours = parseInt(hours, 10);
        if (Number.isNaN(parsedHours)) return timeValue;
        const ampm = parsedHours >= 12 ? "PM" : "AM";
        const displayHour = parsedHours % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }
    return timeValue;
}

function parseReminderDate(reminder) {
    return new Date(`${reminder.dueDate}T00:00:00`);
}

function getReminderOccurrences(reminder, rangeStart, rangeEnd) {
    const normalized = normalizeReminder(reminder);
    const start = parseReminderDate(normalized);
    if (Number.isNaN(start.getTime())) return [];
    const cappedEnd = rangeEnd > endOfYear(start) ? endOfYear(start) : rangeEnd;
    const occurrences = [];

    const addOccurrence = (date) => {
        if (date >= rangeStart && date <= cappedEnd) {
            occurrences.push({ reminder: normalized, date });
        }
    };

    if (normalized.repeat === "daily") {
        const cursor = new Date(Math.max(start.getTime(), rangeStart.getTime()));
        cursor.setHours(0, 0, 0, 0);
        while (cursor <= cappedEnd) {
            addOccurrence(new Date(cursor));
            cursor.setDate(cursor.getDate() + 1);
        }
        return occurrences;
    }

    if (normalized.repeat === "weekly") {
        const cursor = new Date(Math.max(start.getTime(), rangeStart.getTime()));
        cursor.setHours(0, 0, 0, 0);
        while (cursor <= cappedEnd) {
            addOccurrence(new Date(cursor));
            cursor.setDate(cursor.getDate() + 7);
        }
        return occurrences;
    }

    if (normalized.repeat === "monthly") {
        const cursor = new Date(start);
        cursor.setHours(0, 0, 0, 0);
        while (cursor <= cappedEnd) {
            addOccurrence(new Date(cursor));
            cursor.setMonth(cursor.getMonth() + 1);
        }
        return occurrences;
    }

    addOccurrence(start);
    return occurrences;
}

function getOccurrencesForMonth(date) {
    const monthStart = startOfMonth(date);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
    return getReminders()
        .flatMap(reminder => getReminderOccurrences(reminder, monthStart, monthEnd))
        .sort((a, b) => a.date - b.date);
}

function getUpcomingOccurrences(date) {
    const rangeStart = startOfMonth(date);
    const rangeEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
    return getReminders()
        .flatMap(reminder => getReminderOccurrences(reminder, rangeStart, rangeEnd))
        .sort((a, b) => a.date - b.date);
}

function renderCalendar() {
    if (!dateGrid) return;
    dateGrid.innerHTML = "";
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (monthYearDisplay) monthYearDisplay.innerHTML = `${monthNames[month]}<br>${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const occurrences = getOccurrencesForMonth(currentDate);
    const dotsByDay = new Map();
    occurrences.forEach(item => {
        const day = item.date.getDate();
        if (!dotsByDay.has(day)) dotsByDay.set(day, []);
        dotsByDay.get(day).push(item.reminder.source);
    });

    const cells = [];
    for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrevMonth - i, muted: true });
    for (let i = 1; i <= daysInMonth; i++) cells.push({ day: i, muted: false });
    while (cells.length < 42) cells.push({ day: cells.length - daysInMonth - firstDay + 1, muted: true });

    cells.forEach(cell => {
        const dateBox = document.createElement("button");
        dateBox.type = "button";
        dateBox.className = "date-box";
        dateBox.innerHTML = `<span class="date-number">${cell.day}</span>`;

        if (cell.muted) {
            dateBox.classList.add("muted");
        } else {
            const sources = [...new Set(dotsByDay.get(cell.day) || [])];
            if (sources.length) {
                const dots = document.createElement("div");
                dots.className = "calendar-dots";
                sources.slice(0, 4).forEach(source => {
                    const dot = document.createElement("span");
                    dot.className = `calendar-dot ${source}`;
                    dots.appendChild(dot);
                });
                dateBox.appendChild(dots);
            }
        }

        dateGrid.appendChild(dateBox);
    });

    renderUpcomingSchedule();
}

function renderUpcomingSchedule() {
    if (!careList) return;
    careList.innerHTML = "";
    const monthStart = startOfMonth(currentDate);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
    const occurrences = getUpcomingOccurrences(currentDate);
    const unique = new Map();

    occurrences.forEach(item => {
        const reminder = item.reminder;
        const monthKey = `${reminder.id}-${item.date.getFullYear()}-${item.date.getMonth()}`;
        if (!unique.has(monthKey)) unique.set(monthKey, item);
    });

    const displayItems = Array.from(unique.values()).filter(item => item.date >= monthStart && item.date <= monthEnd);

    if (!displayItems.length) {
        careList.innerHTML = '<p style="color: var(--text-muted); font-size: 14px;">No reminders yet. Add one to get started.</p>';
        return;
    }

    displayItems.forEach(({ reminder, date }) => {
        const item = document.createElement("article");
        item.className = "care-item";
        const sourceColor = reminder.source === "feeding" ? "yellow" : reminder.source === "grooming" ? "pink" : reminder.source === "other" ? "other" : "green";
        const metaParts = [reminderTypeLabel(reminder.source), reminderSubtypeLabel(reminder), reminder.repeat === "once" ? "One time" : reminder.repeat.charAt(0).toUpperCase() + reminder.repeat.slice(1)].filter(Boolean);
        const meta = metaParts.join(" - ");
        item.innerHTML = `
            <span class="care-icon ${sourceColor}">
                <span class="reminder-dot"></span>
            </span>
            <div style="flex: 1;">
                <h3>${reminder.title}</h3>
                <p>${meta}</p>
                <p>${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}${reminder.dueTime ? ` - ${formatReminderTime(reminder.dueTime)}` : ""}</p>
            </div>
            <button type="button" class="delete-event-btn" data-delete-reminder="${reminder.id}" aria-label="Delete reminder">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        careList.appendChild(item);
    });

    careList.querySelectorAll("[data-delete-reminder]").forEach(btn => {
        btn.addEventListener("click", () => openDeleteReminder(btn.getAttribute("data-delete-reminder")));
    });
}

function clearReminderErrors() {
    ["reminderTitle", "reminderDueDate"].forEach(id => {
        const field = document.getElementById(id);
        const error = document.getElementById(`${id}Error`);
        if (field) field.classList.remove("input-error");
        if (error) {
            error.textContent = "";
            error.style.display = "none";
        }
    });
}

function showReminderError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}Error`);
    if (field) field.classList.add("input-error");
    if (error) {
        error.textContent = message;
        error.style.display = "block";
    }
}

function resetReminderForm() {
    reminderForm.reset();
    document.querySelector('input[name="reminderSource"][value="vaccine"]').checked = true;
    document.querySelector('input[name="feedingSlot"][value="morning"]').checked = true;
    reminderRepeatInput.value = "once";
    reminderSlotWrap.style.display = "none";
    groomingKindWrap.style.display = "none";
    clearReminderErrors();
}

function toggleReminderFields() {
    const selectedSource = document.querySelector('input[name="reminderSource"]:checked')?.value || "vaccine";

    reminderSlotWrap.style.display = selectedSource === "feeding" ? "block" : "none";
    groomingKindWrap.style.display = selectedSource === "grooming" ? "block" : "none";

    if (selectedSource === "feeding") {
        if (!reminderDueTimeInput.value) {
            reminderDueTimeInput.value = "08:00";
        }
    } else if (selectedSource === "grooming") {
        if (reminderRepeatInput.value === "once") {
            reminderRepeatInput.value = "weekly";
        }
    }
}

function applyReminderPresetToForm(preset) {
    if (!preset) return;
    const source = preset.source || "vaccine";
    const sourceRadio = document.querySelector(`input[name="reminderSource"][value="${source}"]`);
    if (sourceRadio) sourceRadio.checked = true;
    reminderTitleInput.value = preset.title || "";
    reminderDueDateInput.value = preset.dueDate || "";
    reminderDueTimeInput.value = preset.dueTime || "";
    reminderRepeatInput.value = preset.repeat || "once";
    const feedingSlot = document.querySelector(`input[name="feedingSlot"][value="${preset.slot || "morning"}"]`);
    if (feedingSlot) feedingSlot.checked = true;
    if (preset.groomingKind) groomingKindInput.value = preset.groomingKind;
    toggleReminderFields();
}

function openReminderModal(preset = null) {
    remindersModal.style.display = "flex";
    resetReminderForm();
    if (preset) applyReminderPresetToForm(preset);
}

function closeReminderModal() {
    remindersModal.style.display = "none";
    resetReminderForm();
    clearPendingReminderPreset();
}

function openDeleteReminder(reminderId) {
    const reminder = getReminders().find(item => String(item.id) === String(reminderId));
    if (!reminder) return;
    pendingDeleteId = reminderId;
    if (deleteReminderName) deleteReminderName.textContent = reminder.title;
    if (deleteReminderModal) deleteReminderModal.style.display = "flex";
}

function confirmDeleteReminder() {
    if (pendingDeleteId === null) return;
    saveReminders(getReminders().filter(item => String(item.id) !== String(pendingDeleteId)));
    pendingDeleteId = null;
    if (deleteReminderModal) deleteReminderModal.style.display = "none";
    renderCalendar();
    scheduleReminderTimers();
    showToast("Reminder deleted successfully");
}

function openDeleteAllReminders() {
    if (deleteAllRemindersModal) deleteAllRemindersModal.style.display = "flex";
}

function confirmDeleteAllReminders() {
    saveReminders([]);
    if (deleteAllRemindersModal) deleteAllRemindersModal.style.display = "none";
    renderCalendar();
    clearReminderTimers();
    showToast("All reminders deleted successfully");
}

function buildReminderTitle() {
    const source = document.querySelector('input[name="reminderSource"]:checked')?.value || "vaccine";
    const title = reminderTitleInput.value.trim();
    if (title) return title;
    if (source === "vaccine") return "Vaccine Reminder";
    if (source === "feeding") return "Feeding Reminder";
    if (source === "grooming") return "Grooming Reminder";
    if (source === "other") return "Other Reminder";
    return "Reminder";
}

if (openReminderFormBtn) openReminderFormBtn.addEventListener("click", () => openReminderModal());
if (closeRemindersBtn) closeRemindersBtn.addEventListener("click", closeReminderModal);
if (cancelReminderFormBtn) cancelReminderFormBtn.addEventListener("click", closeReminderModal);
if (deleteAllRemindersBtn) deleteAllRemindersBtn.addEventListener("click", openDeleteAllReminders);
if (cancelDeleteReminderBtn) cancelDeleteReminderBtn.addEventListener("click", () => {
    pendingDeleteId = null;
    if (deleteReminderModal) deleteReminderModal.style.display = "none";
});
if (confirmDeleteReminderBtn) confirmDeleteReminderBtn.addEventListener("click", confirmDeleteReminder);
if (cancelDeleteAllRemindersBtn) cancelDeleteAllRemindersBtn.addEventListener("click", () => {
    if (deleteAllRemindersModal) deleteAllRemindersModal.style.display = "none";
});
if (confirmDeleteAllRemindersBtn) confirmDeleteAllRemindersBtn.addEventListener("click", confirmDeleteAllReminders);

if (saveReminderBtn) {
    saveReminderBtn.addEventListener("click", () => {
        clearReminderErrors();
        const source = document.querySelector('input[name="reminderSource"]:checked')?.value || "vaccine";
        const title = buildReminderTitle();
        const dueDate = reminderDueDateInput.value;
        const dueTime = reminderDueTimeInput.value;
        const repeat = reminderRepeatInput.value;
        let valid = true;

        if (!title) {
            showReminderError("reminderTitle", "Please add a reminder title.");
            valid = false;
        }
        if (!dueDate) {
            showReminderError("reminderDueDate", "Please choose a due date.");
            valid = false;
        }
        if (!valid) return;

        const reminder = {
            id: Date.now(),
            source,
            title,
            dueDate,
            dueTime,
            repeat
        };

        if (source === "feeding") {
            reminder.slot = document.querySelector('input[name="feedingSlot"]:checked')?.value || "morning";
            reminder.dueTime = dueTime || (reminder.slot === "morning" ? "08:00" : "18:00");
        }

        if (source === "grooming") {
            reminder.groomingKind = groomingKindInput.value;
            reminder.repeat = repeat === "once" ? "weekly" : repeat;
        }

        saveReminders([reminder, ...getReminders()]);
        renderCalendar();
        scheduleReminderTimers();
        closeReminderModal();
        showToast("Reminder saved successfully");
        requestNotificationAccess();
        checkReminderNotifications();
    });
}

document.querySelectorAll('input[name="reminderSource"]').forEach(radio => {
    radio.addEventListener("change", toggleReminderFields);
});
if (reminderRepeatInput) reminderRepeatInput.addEventListener("change", toggleReminderFields);

window.addEventListener("click", (e) => {
    if (e.target === remindersModal) closeReminderModal();
    if (e.target === deleteReminderModal) {
        pendingDeleteId = null;
        deleteReminderModal.style.display = "none";
    }
    if (e.target === deleteAllRemindersModal) {
        deleteAllRemindersModal.style.display = "none";
    }
});

prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();
requestNotificationAccess();
startReminderMonitoring();

const pendingReminderPreset = getPendingReminderPreset();
if (pendingReminderPreset) {
    openReminderModal(pendingReminderPreset);
    clearPendingReminderPreset();
}
