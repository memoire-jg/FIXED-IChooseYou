// ── Toast helper ─────────────────────────────────────────────────
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
    }

    document.getElementById('backBtn').addEventListener('click', function() {
        window.location.href = "home.html";
    });

    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = "login.html";
    });

    const vaccineModal = document.getElementById('vaccineModal');
    const vaccineBtn = document.getElementById('vaccineBtn');
    const closeVaccineBtn = document.getElementById('closeVaccineBtn');
    const remindMeBtn = document.getElementById('remindMeBtn');
    const gotItBtn = document.getElementById('gotItBtn');

    vaccineBtn.addEventListener('click', function() { vaccineModal.style.display = 'flex'; });
    function closeVaccineModal() { vaccineModal.style.display = 'none'; }
    closeVaccineBtn.addEventListener('click', closeVaccineModal);
    remindMeBtn.addEventListener('click', closeVaccineModal);
    gotItBtn.addEventListener('click', closeVaccineModal);

    const feedingModal = document.getElementById('feedingModal');
    const feedingBtn = document.getElementById('feedingBtn');
    const closeFeedingBtn = document.getElementById('closeFeedingBtn');
    const feedingGotItBtn = document.getElementById('feedingGotItBtn');

    feedingBtn.addEventListener('click', function() { feedingModal.style.display = 'flex'; });
    function closeFeedingModal() { feedingModal.style.display = 'none'; }
    closeFeedingBtn.addEventListener('click', closeFeedingModal);
    feedingGotItBtn.addEventListener('click', closeFeedingModal);

    const groomingModal = document.getElementById('groomingModal');
    const groomingBtn = document.getElementById('groomingBtn');
    const closeGroomingBtn = document.getElementById('closeGroomingBtn');
    const addToCalendarBtn = document.getElementById('addToCalendarBtn');

    if (groomingBtn) {
        groomingBtn.addEventListener('click', function() { groomingModal.style.display = 'flex'; });
    }
    function closeGroomingModal() {
        if (groomingModal) groomingModal.style.display = 'none';
    }
    if (closeGroomingBtn) closeGroomingBtn.addEventListener('click', closeGroomingModal);
    if (addToCalendarBtn) {
        addToCalendarBtn.addEventListener('click', function() { window.location.href = "calendar.html"; });
    }

    const editModal = document.getElementById('editModal');
    const editBtn = document.getElementById('editBtn'); 
    const closeEditBtn = document.getElementById('closeEditBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const saveEditBtn = document.getElementById('saveEditBtn');

    if (editBtn) {
        editBtn.addEventListener('click', function() {
            // Pre-fill all fields with current pet data
            const nameInput = document.getElementById('editPetName');
            const typeSelect = document.getElementById('editPetType');
            const weightInput = document.getElementById('editPetWeight');
            const photoPreview = document.querySelector('.photo-preview img');

            if (nameInput) nameInput.value = petName;
            if (typeSelect) typeSelect.value = petSpecies;
            if (weightInput) weightInput.value = petWeight;
            if (photoPreview && petImgSrc) photoPreview.src = petImgSrc;

            editModal.style.display = 'flex';
        });
    }

    function closeEditModal() {
        if (editModal) editModal.style.display = 'none';
    }

    if (closeEditBtn) closeEditBtn.addEventListener('click', closeEditModal);
    if (cancelEditBtn) cancelEditBtn.addEventListener('click', closeEditModal);
    
    if (saveEditBtn) {
        saveEditBtn.addEventListener('click', function() {
            const nameInput = document.getElementById('editPetName');
            const typeSelect = document.getElementById('editPetType');
            const weightInput = document.getElementById('editPetWeight');

            if (nameInput) petName = nameInput.value || petName;
            if (typeSelect) petSpecies = typeSelect.value;
            if (weightInput) petWeight = weightInput.value;

            // Update localStorage selectedPet
            if (petData) {
                petData.name = petName;
                petData.species = petSpecies;
                petData.weight = petWeight;
                localStorage.setItem('selectedPet', JSON.stringify(petData));
            }

            // Update myPets list
            let myPets = JSON.parse(localStorage.getItem('myPets')) || [];
            myPets = myPets.map(p => {
                if (p.id === petId) {
                    return { ...p, name: petName, species: petSpecies, weight: petWeight };
                }
                return p;
            });
            localStorage.setItem('myPets', JSON.stringify(myPets));

            // Update visible page elements
            document.getElementById('detailName').innerText = petName;
            document.getElementById('detailSpecies').innerText = petSpecies;

            closeEditModal();
            showToast('Changes saved successfully');
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === vaccineModal) closeVaccineModal();
        if (e.target === feedingModal) closeFeedingModal();
        if (e.target === groomingModal) closeGroomingModal();
        if (e.target === editModal) closeEditModal();
        if (e.target === deleteModal) deleteModal.style.display = 'none';
    });

    const deleteModal = document.getElementById('deleteModal');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

    document.getElementById('deleteBtn').addEventListener('click', function() {
        document.getElementById('deleteModalPetName').textContent = petName;
        deleteModal.style.display = 'flex';
    });

    cancelDeleteBtn.addEventListener('click', function() {
        deleteModal.style.display = 'none';
    });

    confirmDeleteBtn.addEventListener('click', function() {
        if (petId) {
            let myPets = JSON.parse(localStorage.getItem('myPets')) || [];
            myPets = myPets.filter(p => p.id !== petId);
            localStorage.setItem('myPets', JSON.stringify(myPets));
        }
        localStorage.setItem('pendingToast', `${petName} deleted successfully`);
        window.location.href = "home.html";
    });
});
