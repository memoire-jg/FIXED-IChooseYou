document.addEventListener('DOMContentLoaded', function() {
    const savedPetStr = localStorage.getItem('selectedPet');
    let petName = 'Luna'; 
    let petId = null;
    let petSpecies = 'Dog';

    if (savedPetStr) {
        const petData = JSON.parse(savedPetStr);
        petName = petData.name;
        petId = petData.id;
        petSpecies = petData.species;
        
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

    vaccineBtn.addEventListener('click', function() {
        vaccineModal.style.display = 'flex';
    });

    function closeVaccineModal() {
        vaccineModal.style.display = 'none';
    }

    closeVaccineBtn.addEventListener('click', closeVaccineModal);
    remindMeBtn.addEventListener('click', closeVaccineModal);
    gotItBtn.addEventListener('click', closeVaccineModal);

    const feedingModal = document.getElementById('feedingModal');
    const feedingBtn = document.getElementById('feedingBtn');
    const closeFeedingBtn = document.getElementById('closeFeedingBtn');
    const feedingGotItBtn = document.getElementById('feedingGotItBtn');

    feedingBtn.addEventListener('click', function() {
        feedingModal.style.display = 'flex';
    });

    function closeFeedingModal() {
        feedingModal.style.display = 'none';
    }

    closeFeedingBtn.addEventListener('click', closeFeedingModal);
    feedingGotItBtn.addEventListener('click', closeFeedingModal);

    const groomingModal = document.getElementById('groomingModal');
    const groomingBtn = document.getElementById('groomingBtn');
    const closeGroomingBtn = document.getElementById('closeGroomingBtn');
    const addToCalendarBtn = document.getElementById('addToCalendarBtn');

    if (groomingBtn) {
        groomingBtn.addEventListener('click', function() {
            groomingModal.style.display = 'flex';
        });
    }

    function closeGroomingModal() {
        if (groomingModal) groomingModal.style.display = 'none';
    }

    if (closeGroomingBtn) {
        closeGroomingBtn.addEventListener('click', closeGroomingModal);
    }

    if (addToCalendarBtn) {
        addToCalendarBtn.addEventListener('click', function() {
            window.location.href = "calendar.html"; 
        });
    }

    const editModal = document.getElementById('editModal');
    const editBtn = document.getElementById('editBtn'); 
    const closeEditBtn = document.getElementById('closeEditBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const saveEditBtn = document.getElementById('saveEditBtn');

    if (editBtn) {
        editBtn.addEventListener('click', function() {
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
            closeEditModal();
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === vaccineModal) closeVaccineModal();
        if (e.target === feedingModal) closeFeedingModal();
        if (e.target === groomingModal) closeGroomingModal();
        if (e.target === editModal) closeEditModal();
    });

    document.getElementById('deleteBtn').addEventListener('click', function() {
        if (confirm(`Are you sure you want to delete ${petName}? This action cannot be undone.`)) {
            if (petId) {
                let myPets = JSON.parse(localStorage.getItem('myPets')) || [];
                myPets = myPets.filter(p => p.id !== petId);
                localStorage.setItem('myPets', JSON.stringify(myPets));
            }
            window.location.href = "home.html";
        }
    });
});