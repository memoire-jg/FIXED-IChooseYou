const dateGrid = document.getElementById('dateGrid');

const dates = [
    { day: 26, muted: true },
    { day: 27, muted: true },
    { day: 28, muted: true },
    { day: 29, muted: true },
    { day: 30, muted: true },
    { day: 1 },
    { day: 2, icon: 'fa-stethoscope' },
    { day: 3 },
    { day: 4 },
    { day: 5 },
    { day: 6 },
    { day: 7 },
    { day: 8 },
    { day: 9 },
    { day: 10 },
    { day: 11 },
    { day: 12, icon: 'fa-scissors', highlight: true },
    { day: 13 },
    { day: 14 },
    { day: 15, icon: 'fa-bowl-food' },
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

dates.forEach(date => {
    const dateBox = document.createElement('button');
    dateBox.type = 'button';
    dateBox.className = 'date-box';
    dateBox.textContent = date.day;

    if (date.muted) {
        dateBox.classList.add('muted');
    }

    if (date.highlight) {
        dateBox.classList.add('highlight');
    }

    if (date.icon) {
        const icon = document.createElement('i');
        icon.className = `fa-solid ${date.icon}`;
        dateBox.appendChild(icon);
    }

    dateGrid.appendChild(dateBox);
});
