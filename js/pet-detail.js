document.addEventListener('DOMContentLoaded', function() {
    const savedPetStr = localStorage.getItem('selectedPet');
    let petName = 'Luna'; 
    let petId = null;

    if (savedPetStr) {
        const petData = JSON.parse(savedPetStr);
        petName = petData.name;
        petId = petData.id;
        document.getElementById('detailName').innerText = petData.name;
        document.getElementById('detailSpecies').innerText = petData.species;
        document.getElementById('detailIcon').className = petData.iconClass;
        document.getElementById('detailImage').src = petData.imgSrc;
    }

    document.getElementById('backBtn').addEventListener('click', function() {
        window.location.href = "home.html";
    });

    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = "login.html";
    });

    const actionButtons = [
        { id: 'vaccineBtn', message: 'Loading Vaccine Schedule...' },
        { id: 'feedingBtn', message: 'Loading Feeding Schedule...' },
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