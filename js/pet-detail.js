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

    window.addEventListener('click', function(e) {
        if (e.target === vaccineModal) closeVaccineModal();
        if (e.target === feedingModal) closeFeedingModal();
    });

    const actionButtons = [
        { id: 'groomingBtn', message: 'Loading Grooming Schedule...' },
        { id: 'editBtn', message: 'Opening Edit Pet Data form...' },
        { id: 'tutorialBtn', message: 'Starting Page Tutorial...' }
    ];

    actionButtons.forEach(btnData => {
        const btn = document.getElementById(btnData.id);
        if (btn) {
            btn.addEventListener('click', function() {
                alert(`[Simulation]: ${btnData.message}`);
            });
        }
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