const username = localStorage.getItem("petUsername") || "Pet Parent";
const usernameElement = document.getElementById("displayUsername");
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

if (usernameElement) {
    usernameElement.textContent = username;
}

const defaultPets = [
    { id: 1, name: 'Luna', species: 'Dog', breed: 'Golden Retriever', weight: '25', age: '2', nextMeal: '5:00 PM' },
    { id: 2, name: 'Bubbles', species: 'Fish', breed: 'Betta Fish', weight: '0.1', age: '1', nextMeal: '78°F' },
    { id: 3, name: 'Milo', species: 'Cat', breed: 'Domestic Shorthair', weight: '4.5', age: '3', nextMeal: '6:00 PM' }
];

let myPets = JSON.parse(localStorage.getItem('myPets'));
if (!myPets) {
    myPets = defaultPets;
    localStorage.setItem('myPets', JSON.stringify(myPets));
}

function getPetStyle(species) {
    const styles = {
        'Dog': { icon: 'fa-dog', color: 'card-pink', badge: 'badge-pink' },
        'Cat': { icon: 'fa-cat', color: 'card-yellow', badge: 'badge-yellow' },
        'Fish': { icon: 'fa-fish', color: 'card-green', badge: 'badge-green' },
        'Bird': { icon: 'fa-dove', color: 'card-pink', badge: 'badge-pink' },
        'Bunny': { icon: 'fa-carrot', color: 'card-green', badge: 'badge-green' }
    };
    return styles[species] || { icon: 'fa-paw', color: 'card-yellow', badge: 'badge-yellow' };
}

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

const petGrid = document.getElementById('petGrid');

function renderPets() {
    petGrid.innerHTML = '';
    myPets.forEach(pet => {
        const style = getPetStyle(pet.species);
        const cardHTML = `
            <div class="pet-card ${style.color}" data-id="${pet.id}" style="cursor: pointer;">
                <div class="card-shape"></div>
                <div class="card-header">
                    <div class="pet-icon-wrapper">
                        <i class="fa-solid ${style.icon}"></i>
                    </div>
                    <div class="pet-info">
                        <h2>${pet.name}</h2>
                        <span class="pet-breed ${style.badge}">${pet.breed}</span>
                    </div>
                </div>
                
                <div class="card-stats">
                    <div class="stat-box">
                        <span class="stat-label">Weight</span>
                        <span class="stat-value">
                            <i class="fa-solid fa-weight-scale" style="color: var(--primary-green); margin-right: 4px;"></i> ${pet.weight} kg
                        </span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-label">Age</span>
                        <span class="stat-value">
                            <i class="fa-solid fa-cake-candles" style="color: var(--primary-green); margin-right: 4px;"></i> ${pet.age} Yrs
                        </span>
                    </div>
                </div>
                
            </div>
        `;
        petGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

renderPets();

const modal = document.getElementById('addPetModal');
const addPetBtn = document.getElementById('addPetBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelPetBtn = document.getElementById('cancelPetBtn');
const addPetForm = document.getElementById('addPetForm');

addPetBtn.addEventListener('click', function(){
    modal.style.display = 'flex';
});

function closeModal() {
    modal.style.display = 'none';
    addPetForm.reset();
}

closeModalBtn.addEventListener('click', closeModal);
cancelPetBtn.addEventListener('click', closeModal);

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

addPetForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newName = document.getElementById('newPetName').value;
    const newSpecies = document.querySelector('input[name="animalType"]:checked').value;
    const newBreed = document.getElementById('newPetBreed').value || newSpecies;
    const newWeight = document.getElementById('newPetWeight').value;
    const newAge = document.getElementById('newPetAge').value;

    const newPet = {
        id: Date.now(),
        name: newName,
        species: newSpecies,
        breed: newBreed,
        weight: newWeight,
        age: newAge,
        nextMeal: 'Pending',
        status: 'New Arrival'
    };
    
    myPets.push(newPet);
    localStorage.setItem('myPets', JSON.stringify(myPets));
    
    renderPets();
    closeModal();
    showToast(`${newName} added successfully`);
});

petGrid.addEventListener('click', function(e) {
    const card = e.target.closest('.pet-card');
    if (card) {
        const petId = parseInt(card.getAttribute('data-id'));
        const pet = myPets.find(p => p.id === petId);
        
        if (pet) {
            const style = getPetStyle(pet.species);
            const petData = {
                id: pet.id,
                name: pet.name,
                breed: pet.breed,
                weight: pet.weight,
                age: pet.age,
                iconClass: `fa-solid ${style.icon}`,
                species: pet.species,
                imgSrc: getDefaultImg(pet.species)
            };
            localStorage.setItem('selectedPet', JSON.stringify(petData));
            window.location.href = 'pet-detail.html';
        }
    }
});

document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = "login.html";
});

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

const pendingToast = localStorage.getItem('pendingToast');
if (pendingToast) {
    showToast(pendingToast);
    localStorage.removeItem('pendingToast');
}