document.getElementById('addPetBtn').addEventListener('click', function() {
    alert("[Simulation]: This will open a modal to enter a new pet's details (Name, Breed, Species).");
});

const menuButtons = document.querySelectorAll('.menu-btn');
menuButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation(); 
        alert("[Simulation]: Opening pet management menu (Edit, Remove, Update Stats).");
    });
});

const petCards = document.querySelectorAll('.pet-card');
petCards.forEach(card => {
    card.style.cursor = 'pointer'; 
    card.addEventListener('click', function() {
        const name = card.querySelector('h2').innerText;
        const breed = card.querySelector('.pet-breed').innerText;
        const iconClass = card.querySelector('.pet-icon-wrapper i').className;

        let species = 'Dog';
        let imgSrc = 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=150&q=80'; 

        if (name === 'Bubbles') {
            species = 'Fish';
            imgSrc = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=150&q=80';
        } else if (name === 'Milo') {
            species = 'Cat';
            imgSrc = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80';
        }

        const petData = { name, breed, iconClass, species, imgSrc };
        localStorage.setItem('selectedPet', JSON.stringify(petData));

        window.location.href = 'pet-detail.html';
    });
});

document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = "login.html";
});