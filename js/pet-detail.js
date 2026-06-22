const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

const speciesCareGuidelines = {
    'Dog': {
        feedingAdvice: "Routine meals twice a day: once in the morning and once in the evening.",
        vaccineAdvice: "Initial vaccine, followed by two boosters, then an annual routine.",
        groomingAdvice: "Bathe once a month for short-haired breeds, and every 2 weeks for long-haired breeds.",
        vaccines: [
            { name: "Core Vaccines", desc: "Initial shot + 2 boosters, then annual.", label: "Last Given", date: "Oct 12, 2025", status: "Up to Date", statusClass: "badge-good", statusIcon: "fa-check" },
            { name: "Rabies", desc: "Highly recommended for outdoor or hunting dogs.", label: "Due Date", date: "Nov 15, 2026", status: "Due Soon", statusClass: "badge-warn", statusIcon: "fa-clock" }
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
        ],
        toxicFoods: [
            { title: "Chocolate", desc: "Contains theobromine, which is highly toxic to dogs and can be fatal." },
            { title: "Grapes & Raisins", desc: "Can cause sudden kidney failure even in small amounts." },
            { title: "Onions & Garlic", desc: "Damages red blood cells and can lead to anemia." },
            { title: "Xylitol", desc: "An artificial sweetener found in gum and candy that causes dangerous drops in blood sugar." }
        ]

    },
    'Cat': {
        feedingAdvice: "Routine meals twice a day: once in the morning and once in the evening.",
        vaccineAdvice: "Initial vaccine, followed by one booster, then an annual routine.",
        groomingAdvice: "Bathe once a month for short-haired breeds, and every 2 weeks for long-haired breeds.",
        vaccines: [
            { name: "Core (F3/Tricat)", desc: "Initial shot + 1 booster, then annual.", label: "Last Given", date: "Oct 12, 2025", status: "Up to Date", statusClass: "badge-good", statusIcon: "fa-check" },
            { name: "Rabies", desc: "Recommended if traveling or living in endemic areas.", label: "Due Date", date: "Nov 15, 2026", status: "Due Soon", statusClass: "badge-warn", statusIcon: "fa-clock" }
        ],
        feeding: [
            { title: "Morning", time: "7:00 AM - 8:30 AM", amount: "1/2 Cup", icon: "fa-sun", bg: "bg-green-light", iconBg: "icon-sun" },
            { title: "Evening", time: "6:00 PM - 7:30 PM", amount: "1/2 Cup", icon: "fa-moon", bg: "bg-yellow-light", iconBg: "icon-moon" }
        ],
        grooming: [
            { title: "Brushing", freq: "Every 2 to 3 days", desc: "Reduces hairballs and matting.", icon: "fa-brush", bg: "icon-bg-green" },
            { title: "Nail Trimming", freq: "Every 2 weeks", desc: "Provides relief and protects furniture.", icon: "fa-scissors", bg: "icon-bg-pink" }
        ],
        toxicFoods: [
            { title: "Chocolate", desc: "Contains theobromine and caffeine, both toxic to cats." },
            { title: "Onions & Garlic", desc: "Destroys red blood cells and can cause serious anemia." },
            { title: "Grapes & Raisins", desc: "Highly toxic and can lead to kidney failure." },
            { title: "Raw Fish", desc: "Can deplete vitamin B1 (thiamine), leading to neurological problems." }
        ]
    },
    'Bunny': {
        feedingAdvice: "Provide constant access to fresh hay and water, supplemented with specific pellets.",
        vaccineAdvice: "Typically limited to the Rabies vaccine depending on the area.",
        groomingAdvice: "Minimize bathing as they stress easily, which can lead to fatal health drops.",
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
            { name: "Avian Influenza (AI)", desc: "Protects against AI.", label: "Last Given", date: "Jan 10, 2026", status: "Up to Date", statusClass: "badge-good", statusIcon: "fa-check" },
            { name: "Newcastle Disease (ND)", desc: "Crucial for bird health.", label: "Due Date", date: "Mar 01, 2026", status: "Due Soon", statusClass: "badge-warn", statusIcon: "fa-clock" }
        ],
        feeding: [
            { title: "Morning", time: "7:00 AM", amount: "Fresh Seeds & Cleanup", icon: "fa-sun", bg: "bg-green-light", iconBg: "icon-sun" },
            { title: "Evening", time: "5:00 PM", amount: "Supplements/Boosters", icon: "fa-moon", bg: "bg-yellow-light", iconBg: "icon-moon" }
        ],
        grooming: [
            { title: "Bird Bath", freq: "2-3 times a week", desc: "Provide shallow water for self-cleaning.", icon: "fa-water", bg: "icon-bg-green" },
            { title: "Cage Cleaning", freq: "Daily", desc: "Mandatory to prevent respiratory issues.", icon: "fa-broom", bg: "icon-bg-beige" }
        ]
    },
    'Fish': {
        feedingAdvice: "Feed daily to encourage growth, but ensure leftover food is removed immediately.",
        vaccineAdvice: "No vaccines required. Use treatments like Methylene Blue periodically.",
        groomingAdvice: "Strict maintenance of water pH, frequent cleaning, and excellent filtration are required.",
        vaccines: [
            { name: "Methylene Blue", desc: "Anti-fungal & anti-parasite treatment for the tank.", label: "Frequency", date: "Periodically", status: "Maintenance", statusClass: "badge-good", statusIcon: "fa-droplet" }
        ],
        feeding: [
            { title: "Daily Feeding", time: "Morning or Evening", amount: "A small pinch", icon: "fa-fish-fins", bg: "bg-green-light", iconBg: "icon-sun" }
        ],
        grooming: [
            { title: "Water Quality Check", freq: "Weekly", desc: "Monitor pH and ammonia levels due to waste.", icon: "fa-vial", bg: "icon-bg-green" },
            { title: "Filter Cleaning", freq: "Monthly", desc: "Rinse filter media in old tank water.", icon: "fa-filter", bg: "icon-bg-beige" },
            { title: "Water Change", freq: "Every 2 weeks", desc: "Change 20-30% of the tank water.", icon: "fa-droplet", bg: "icon-bg-pink" }
        ]
    }
};

function getDefaultImg(species) {
    const imgs = {
        'Dog':   'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=150&q=80',
        'Cat':   'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80',
        'Fish':  'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=150&q=80',
        'Bird':  'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=150&q=80',
        'Bunny': 'https://images.unsplash.com/photo-1583301286816-f4f05e1e8b25?auto=format&fit=crop&w=150&q=80'
    };
    return imgs[species] || imgs['Dog'];
}

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
    let petAge = ''; 
    let petImgSrc = '';
    let petData = null;

    function buildReminderPreset(scheduleType) {
        const presetMap = {
            vaccine: {
                name: `Vaccine Schedule - ${petName}`,
                source: 'vaccine'
            },
            feeding: {
                name: `Feeding Schedule - ${petName}`,
                source: 'feeding'
            },
            grooming: {
                name: `Grooming Schedule - ${petName}`,
                source: 'grooming'
            }
        };

        return presetMap[scheduleType] || presetMap.vaccine;
    }

    function openCalendarWithReminder(scheduleType) {
        const preset = buildReminderPreset(scheduleType);
        localStorage.setItem('pendingReminderPreset', JSON.stringify({
            source: scheduleType,
            title: preset.name,
            repeat: scheduleType === 'feeding' ? 'daily' : 'once',
            dueDate: scheduleType === 'vaccine' ? '2026-11-15' : new Date().toISOString().split('T')[0],
            dueTime: scheduleType === 'feeding' ? '08:00' : '',
            slot: scheduleType === 'feeding' ? 'morning' : '',
            groomingKind: scheduleType === 'grooming' ? 'Brushing' : '',
            openModal: true
        }));
        window.location.href = 'calendar.html';
    }

    if (savedPetStr) {
        petData = JSON.parse(savedPetStr);
        petName = petData.name;
        petId = petData.id;
        petSpecies = petData.species;
        petBreed = petData.breed || '';
        petWeight = petData.weight || '';
        petAge = petData.age || ''; 
        
        petImgSrc = petData.imgSrc || getDefaultImg(petSpecies);
        
        document.getElementById('detailName').innerText = petData.name;
        document.getElementById('detailSpecies').innerText = petData.species;
        document.getElementById('detailIcon').className = petData.iconClass || 'fa-solid fa-paw';
        document.getElementById('detailImage').src = petImgSrc;
        
        document.getElementById('vaccineModalTitle').innerText = `${petSpecies} Vaccine Schedule`;
        document.getElementById('feedingModalSubtitle').innerText = `Recommended plan for your ${petSpecies}`;

        const advice = speciesCareGuidelines[petSpecies] || speciesCareGuidelines['Dog'];

        if (document.getElementById('vaccineAdviceText')) document.getElementById('vaccineAdviceText').innerText = advice.vaccineAdvice;
        if (document.getElementById('feedingAdviceText')) document.getElementById('feedingAdviceText').innerText = advice.feedingAdvice;
        if (document.getElementById('groomingAdviceText')) document.getElementById('groomingAdviceText').innerText = advice.groomingAdvice;

        renderVaccines(advice.vaccines);
        renderFeeding(advice.feeding);
        renderGrooming(advice.grooming);
        renderToxicFoods(advice.toxicFoods);
    }

    document.getElementById('backBtn').addEventListener('click', () => window.location.href = "home.html");
    document.querySelectorAll('.logoutBtn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = "index.html";
        });
    });

    const vaccineModal = document.getElementById('vaccineModal');
    document.getElementById('vaccineBtn').addEventListener('click', () => vaccineModal.style.display = 'flex');
    const closeVaccineModal = () => vaccineModal.style.display = 'none';
    document.getElementById('closeVaccineBtn').addEventListener('click', closeVaccineModal);
    document.getElementById('remindMeBtn').addEventListener('click', () => openCalendarWithReminder('vaccine'));
    document.getElementById('gotItBtn').addEventListener('click', closeVaccineModal);

    const feedingModal = document.getElementById('feedingModal');
    document.getElementById('feedingBtn').addEventListener('click', () => feedingModal.style.display = 'flex');
    const closeFeedingModal = () => feedingModal.style.display = 'none';
    document.getElementById('closeFeedingBtn').addEventListener('click', closeFeedingModal);
    document.getElementById('feedingRemindBtn').addEventListener('click', () => openCalendarWithReminder('feeding'));
    document.getElementById('feedingGotItBtn').addEventListener('click', closeFeedingModal);

    const groomingModal = document.getElementById('groomingModal');
    const groomingBtn = document.getElementById('groomingBtn');
    if (groomingBtn) groomingBtn.addEventListener('click', () => groomingModal.style.display = 'flex');
    const closeGroomingModal = () => { if (groomingModal) groomingModal.style.display = 'none'; }
    document.getElementById('closeGroomingBtn').addEventListener('click', closeGroomingModal);
    document.getElementById('groomingRemindBtn').addEventListener('click', () => openCalendarWithReminder('grooming'));
    document.getElementById('groomingGotItBtn').addEventListener('click', closeGroomingModal);

    const editModal = document.getElementById('editModal');
    
    document.getElementById('editBtn').addEventListener('click', () => {
        document.getElementById('editPetName').value = petName;
        document.getElementById('editPetType').value = petSpecies;
        document.getElementById('editPetWeight').value = petWeight;
        document.getElementById('editPetAge').value = petAge; 
        document.getElementById('editPetImage').src = petImgSrc; 
        
        editModal.style.display = 'flex';
    });
    
    const closeEditModal = () => editModal.style.display = 'none';
    document.getElementById('closeEditBtn').addEventListener('click', closeEditModal);
    document.getElementById('cancelEditBtn').addEventListener('click', closeEditModal);
    
    document.getElementById('editPetType').addEventListener('change', (e) => {
        const tempSpecies = e.target.value;
        document.getElementById('editPetImage').src = getDefaultImg(tempSpecies);
    });

    document.getElementById('saveEditBtn').addEventListener('click', () => {
        petName = document.getElementById('editPetName').value || petName;
        petSpecies = document.getElementById('editPetType').value;
        petWeight = document.getElementById('editPetWeight').value;
        petAge = document.getElementById('editPetAge').value; 

        petImgSrc = getDefaultImg(petSpecies);

        if (petData) {
            petData.name = petName;
            petData.species = petSpecies;
            petData.weight = petWeight;
            petData.age = petAge; 
            petData.imgSrc = petImgSrc; 
            localStorage.setItem('selectedPet', JSON.stringify(petData));
        }

        let myPets = JSON.parse(localStorage.getItem('myPets')) || [];
        myPets = myPets.map(p => p.id === petId ? { ...p, name: petName, species: petSpecies, weight: petWeight, age: petAge } : p);
        localStorage.setItem('myPets', JSON.stringify(myPets));

        document.getElementById('detailName').innerText = petName;
        document.getElementById('detailSpecies').innerText = petSpecies;
        document.getElementById('detailImage').src = petImgSrc; 
        
        closeEditModal();
        showToast('Changes saved successfully');
        setTimeout(() => location.reload(), 1000); 
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

function renderToxicFoods(toxicFoods) {
    const warningBox = document.getElementById('warning');
    if (!warningBox) return;

    if (!toxicFoods || toxicFoods.length === 0) {
        warningBox.style.display = 'none';
        return;
    }

    warningBox.style.display = 'block';

    const list = warningBox.querySelector('.tips-list');
    list.innerHTML = '';
    toxicFoods.forEach(item => {
        list.innerHTML += `
            <li>
                <i class="fa-solid fa-circle-xmark"></i>
                <span><strong>${item.title}:</strong> ${item.desc}</span>
            </li>`;
    });
}