const speciesCareGuidelines = {
    'Dog': {
        feedingAdvice: "Routine meals twice a day: once in the morning and once in the evening.",
        vaccineAdvice: "Annual routine vaccination (preceded by initial life boosters).",
        groomingAdvice: "Bathe once a month for short-haired breeds, and every 2 weeks for long-haired breeds.",
        vaccines: [
            { name: "Rabies", desc: "Required by law in most areas.", label: "Last Given", date: "Oct 12, 2025", status: "Up to Date", statusClass: "badge-good", statusIcon: "fa-check" },
            { name: "DHPP", desc: "Protects against 4 dangerous viruses.", label: "Due Date", date: "Nov 15, 2026", status: "Due Soon", statusClass: "badge-warn", statusIcon: "fa-clock" }
        ],
        feeding: [
            { title: "Morning", time: "7:00 AM - 8:30 AM", amount: "1 Cup", icon: "fa-sun", bg: "bg-green-light", iconBg: "icon-sun" },
            { title: "Evening", time: "6:00 PM - 7:30 PM", amount: "1 Cup", icon: "fa-moon", bg: "bg-yellow-light", iconBg: "icon-moon" }
        ],
        grooming: [
            { title: "Brushing", freq: "Every 2 to 3 days", desc: "Helps remove loose fur, dirt, and prevents matting.", icon: "fa-brush", bg: "icon-bg-green" },
            { title: "Bathing", freq: "Every 4 to 6 weeks", desc: "Use dog-specific shampoo.", icon: "fa-hands-bubbles", bg: "icon-bg-beige" },
            { title: "Nail Trimming", freq: "Once a month", desc: "Careful not to cut the quick.", icon: "fa-scissors", bg: "icon-bg-pink" },
            { title: "Teeth Cleaning", freq: "Daily", desc: "Use enzymatic toothpaste.", icon: "fa-tooth", bg: "icon-bg-grey" }
        ]
    },
    'Cat': {
        feedingAdvice: "Routine meals twice a day: once in the morning and once in the evening.",
        vaccineAdvice: "Annual routine vaccination (preceded by initial life boosters).",
        groomingAdvice: "Bathe once a month for short-haired breeds, and every 2 weeks for long-haired breeds.",
        vaccines: [
            { name: "Rabies", desc: "Required by law in most areas.", label: "Last Given", date: "Oct 12, 2025", status: "Up to Date", statusClass: "badge-good", statusIcon: "fa-check" },
            { name: "FVRCP", desc: "Feline viral rhinotracheitis, calicivirus, and panleukopenia.", label: "Due Date", date: "Nov 15, 2026", status: "Due Soon", statusClass: "badge-warn", statusIcon: "fa-clock" }
        ],
        feeding: [
            { title: "Morning", time: "7:00 AM - 8:30 AM", amount: "1/2 Cup", icon: "fa-sun", bg: "bg-green-light", iconBg: "icon-sun" },
            { title: "Evening", time: "6:00 PM - 7:30 PM", amount: "1/2 Cup", icon: "fa-moon", bg: "bg-yellow-light", iconBg: "icon-moon" }
        ],
        grooming: [
            { title: "Brushing", freq: "Every 2 to 3 days", desc: "Reduces hairballs and matting.", icon: "fa-brush", bg: "icon-bg-green" },
            { title: "Nail Trimming", freq: "Every 2 weeks", desc: "Provides relief and protects furniture.", icon: "fa-scissors", bg: "icon-bg-pink" }
        ]
    },
    'Bunny': {
        feedingAdvice: "Provide constant access to fresh hay and water, supplemented with specific pellets.",
        vaccineAdvice: "Primary vaccination is typically only Rabies (Optional).",
        groomingAdvice: "Minimize bathing and intense grooming. Bunnies stress very easily.",
        vaccines: [
            { name: "Rabies", desc: "Optional in most areas.", label: "Status", date: "Consult Vet", status: "Optional", statusClass: "badge-outline", statusIcon: "fa-user-doctor" }
        ],
        feeding: [
            { title: "All Day", time: "24/7 Access", amount: "Unlimited Hay", icon: "fa-leaf", bg: "bg-green-light", iconBg: "icon-sun" },
            { title: "Supplement", time: "Morning", amount: "1/4 Cup Pellets", icon: "fa-carrot", bg: "bg-yellow-light", iconBg: "icon-moon" }
        ],
        grooming: [
            { title: "Gentle Brushing", freq: "Weekly", desc: "Helps remove shedding fur.", icon: "fa-brush", bg: "icon-bg-green" },
            { title: "Nail Trimming", freq: "Every 4 to 6 weeks", desc: "Requires careful handling.", icon: "fa-scissors", bg: "icon-bg-pink" }
        ]
    },
    'Bird': {
        feedingAdvice: "Mandatory feeding and cage cleaning every morning. Evenings should focus on supplements.",
        vaccineAdvice: "Requires AI (Avian Influenza) and ND (Newcastle Disease) vaccinations.",
        groomingAdvice: "Provide a shallow bird bath for self-cleaning; avoid forceful washing.",
        vaccines: [
            { name: "Avian Influenza", desc: "Protects against AI.", label: "Last Given", date: "Jan 10, 2026", status: "Up to Date", statusClass: "badge-good", statusIcon: "fa-check" },
            { name: "Newcastle Disease", desc: "Crucial for bird health.", label: "Due Date", date: "Mar 01, 2026", status: "Due Soon", statusClass: "badge-warn", statusIcon: "fa-clock" }
        ],
        feeding: [
            { title: "Morning", time: "7:00 AM", amount: "Fresh Seeds", icon: "fa-sun", bg: "bg-green-light", iconBg: "icon-sun" },
            { title: "Evening", time: "5:00 PM", amount: "Supplements", icon: "fa-moon", bg: "bg-yellow-light", iconBg: "icon-moon" }
        ],
        grooming: [
            { title: "Bird Bath", freq: "2-3 times a week", desc: "Provide shallow water for self-cleaning.", icon: "fa-water", bg: "icon-bg-green" },
            { title: "Cage Cleaning", freq: "Daily", desc: "Mandatory to prevent respiratory issues.", icon: "fa-broom", bg: "icon-bg-beige" }
        ]
    },
    'Fish': {
        feedingAdvice: "Can be fed daily, especially to encourage physical growth.",
        vaccineAdvice: "Not applicable. Focus on environmental health.",
        groomingAdvice: "Strict maintenance of water pH and filtration cleanliness is required.",
        vaccines: [],
        feeding: [
            { title: "Daily Feeding", time: "Morning or Evening", amount: "A small pinch", icon: "fa-fish-fins", bg: "bg-green-light", iconBg: "icon-sun" }
        ],
        grooming: [
            { title: "Water Check", freq: "Weekly", desc: "Monitor pH and ammonia levels.", icon: "fa-vial", bg: "icon-bg-green" },
            { title: "Filter Cleaning", freq: "Monthly", desc: "Rinse filter media in old tank water.", icon: "fa-filter", bg: "icon-bg-beige" },
            { title: "Water Change", freq: "Every 2 weeks", desc: "Change 20-30% of the tank water.", icon: "fa-droplet", bg: "icon-bg-pink" }
        ]
    }
};

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

document.addEventListener('DOMContentLoaded', function() {
    const savedPetStr = localStorage.getItem('selectedPet');
    let petName = 'Luna'; 
    let petId = null;
    let petSpecies = 'Dog';
    let petBreed = '';
    let petWeight = '';
    let petImgSrc = '';
    let petData = null;

    if (savedPetStr) {
        petData = JSON.parse(savedPetStr);
        petName = petData.name;
        petId = petData.id;
        petSpecies = petData.species;
        petBreed = petData.breed || '';
        petWeight = petData.weight || '';
        petImgSrc = petData.imgSrc || '';
        
        document.getElementById('detailName').innerText = petData.name;
        document.getElementById('detailSpecies').innerText = petData.species;
        document.getElementById('detailIcon').className = petData.iconClass;
        document.getElementById('detailImage').src = petData.imgSrc;
        
        document.getElementById('vaccineModalTitle').innerText = `${petSpecies} Vaccine Schedule`;
        document.getElementById('feedingModalSubtitle').innerText = `Recommended plan for your ${petSpecies}`;

        const advice = speciesCareGuidelines[petSpecies] || speciesCareGuidelines['Dog'];

        if (document.getElementById('vaccineAdviceText')) document.getElementById('vaccineAdviceText').innerText = advice.vaccineAdvice;
        if (document.getElementById('feedingAdviceText')) document.getElementById('feedingAdviceText').innerText = advice.feedingAdvice;
        if (document.getElementById('groomingAdviceText')) document.getElementById('groomingAdviceText').innerText = advice.groomingAdvice;

        renderVaccines(advice.vaccines);
        renderFeeding(advice.feeding);
        renderGrooming(advice.grooming);
    }

    document.getElementById('backBtn').addEventListener('click', () => window.location.href = "home.html");
    document.getElementById('logoutBtn').addEventListener('click', (e) => { e.preventDefault(); window.location.href = "login.html"; });

    const vaccineModal = document.getElementById('vaccineModal');
    document.getElementById('vaccineBtn').addEventListener('click', () => vaccineModal.style.display = 'flex');
    const closeVaccineModal = () => vaccineModal.style.display = 'none';
    document.getElementById('closeVaccineBtn').addEventListener('click', closeVaccineModal);
    document.getElementById('remindMeBtn').addEventListener('click', closeVaccineModal);
    document.getElementById('gotItBtn').addEventListener('click', closeVaccineModal);

    const feedingModal = document.getElementById('feedingModal');
    document.getElementById('feedingBtn').addEventListener('click', () => feedingModal.style.display = 'flex');
    const closeFeedingModal = () => feedingModal.style.display = 'none';
    document.getElementById('closeFeedingBtn').addEventListener('click', closeFeedingModal);
    document.getElementById('feedingGotItBtn').addEventListener('click', closeFeedingModal);

    const groomingModal = document.getElementById('groomingModal');
    const groomingBtn = document.getElementById('groomingBtn');
    if (groomingBtn) groomingBtn.addEventListener('click', () => groomingModal.style.display = 'flex');
    const closeGroomingModal = () => { if (groomingModal) groomingModal.style.display = 'none'; }
    document.getElementById('closeGroomingBtn').addEventListener('click', closeGroomingModal);
    document.getElementById('addToCalendarBtn').addEventListener('click', () => window.location.href = "calendar.html");

    const editModal = document.getElementById('editModal');
    document.getElementById('editBtn').addEventListener('click', () => {
        document.getElementById('editPetName').value = petName;
        document.getElementById('editPetType').value = petSpecies;
        document.getElementById('editPetWeight').value = petWeight;
        editModal.style.display = 'flex';
    });
    const closeEditModal = () => editModal.style.display = 'none';
    document.getElementById('closeEditBtn').addEventListener('click', closeEditModal);
    document.getElementById('cancelEditBtn').addEventListener('click', closeEditModal);
    
    document.getElementById('saveEditBtn').addEventListener('click', () => {
        petName = document.getElementById('editPetName').value || petName;
        petSpecies = document.getElementById('editPetType').value;
        petWeight = document.getElementById('editPetWeight').value;

        if (petData) {
            petData.name = petName;
            petData.species = petSpecies;
            petData.weight = petWeight;
            localStorage.setItem('selectedPet', JSON.stringify(petData));
        }

        let myPets = JSON.parse(localStorage.getItem('myPets')) || [];
        myPets = myPets.map(p => p.id === petId ? { ...p, name: petName, species: petSpecies, weight: petWeight } : p);
        localStorage.setItem('myPets', JSON.stringify(myPets));

        document.getElementById('detailName').innerText = petName;
        document.getElementById('detailSpecies').innerText = petSpecies;
        closeEditModal();
        showToast('Changes saved successfully');
        setTimeout(() => location.reload(), 1000); // Reload to fetch new species data
    });

    window.addEventListener('click', (e) => {
        if (e.target === vaccineModal) closeVaccineModal();
        if (e.target === feedingModal) closeFeedingModal();
        if (e.target === groomingModal) closeGroomingModal();
        if (e.target === editModal) closeEditModal();
        if (e.target === deleteModal) deleteModal.style.display = 'none';
    });

    const deleteModal = document.getElementById('deleteModal');
    document.getElementById('deleteBtn').addEventListener('click', () => {
        document.getElementById('deleteModalPetName').textContent = petName;
        deleteModal.style.display = 'flex';
    });
    document.getElementById('cancelDeleteBtn').addEventListener('click', () => deleteModal.style.display = 'none');
    document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
        if (petId) {
            let myPets = JSON.parse(localStorage.getItem('myPets')) || [];
            myPets = myPets.filter(p => p.id !== petId);
            localStorage.setItem('myPets', JSON.stringify(myPets));
        }
        localStorage.setItem('pendingToast', `${petName} deleted successfully`);
        window.location.href = "home.html";
    });
});

function renderVaccines(vaccines) {
    const container = document.getElementById('vaccineDynamicList');
    if (!container) return;
    container.innerHTML = ''; 

    if (vaccines.length === 0) {
        container.innerHTML = `<p style="text-align:center; padding: 20px; color: var(--text-muted);">No vaccines required for this species.</p>`;
        return;
    }

    vaccines.forEach(v => {
        container.innerHTML += `
            <div class="schedule-item">
                <div class="schedule-left">
                    <div class="dot"></div>
                    <div class="schedule-item-info">
                        <h4>${v.name}</h4>
                        <p>${v.desc}</p>
                    </div>
                </div>
                <div class="schedule-right">
                    <div class="schedule-date">
                        <p>${v.label}</p>
                        <p>${v.date}</p>
                    </div>
                    <div class="status-badge ${v.statusClass}">
                        <i class="fa-solid ${v.statusIcon}"></i> ${v.status}
                    </div>
                </div>
            </div>`;
    });
}

function renderFeeding(feeding) {
    const container = document.getElementById('feedingDynamicList');
    if (!container) return;
    container.innerHTML = '';

    feeding.forEach(f => {
        container.innerHTML += `
            <div class="feeding-card ${f.bg}">
                <div class="feeding-card-left">
                    <div class="feeding-icon ${f.iconBg}">
                        <i class="fa-solid ${f.icon}"></i>
                    </div>
                    <div class="feeding-info">
                        <h4>${f.title}</h4>
                        <p><i class="fa-regular fa-clock"></i> ${f.time}</p>
                    </div>
                </div>
                <div class="feeding-card-right">
                    <i class="fa-solid fa-utensils"></i>
                    <span>${f.amount}</span>
                </div>
            </div>`;
    });
}

function renderGrooming(grooming) {
    const container = document.getElementById('groomingDynamicList');
    if (!container) return;
    container.innerHTML = '';

    grooming.forEach(g => {
        container.innerHTML += `
            <div class="grooming-item">
                <div class="grooming-icon ${g.bg}">
                    <i class="fa-solid ${g.icon}"></i>
                </div>
                <div class="grooming-info">
                    <h4>${g.title}</h4>
                    <p class="frequency">${g.freq}</p>
                    <p class="desc">${g.desc}</p>
                </div>
            </div>`;
    });
}