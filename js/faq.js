const searchInput = document.getElementById('faqSearch');
const categoryButtons = document.querySelectorAll('.category-btn');
const faqQuestions = document.querySelectorAll('.faq-question');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

let activeCategory = 'all';

function applyFilter() {
    const searchText = searchInput.value.toLowerCase().trim();
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const itemCategory = item.dataset.category;
        const question = item.querySelector('.faq-question span').textContent.toLowerCase();

        const categoryMatch = activeCategory === 'all' || itemCategory === activeCategory;
        const searchMatch = searchText === '' || question.includes(searchText);

        // Only show if it matches the active category AND the search text
        item.style.display = (categoryMatch && searchMatch) ? 'block' : 'none';

        // Close accordion when filtering
        if (!categoryMatch || !searchMatch) {
            item.classList.remove('open');
        }
    });
}

categoryButtons.forEach(button => {
    button.addEventListener('click', function () {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        activeCategory = this.dataset.category;
        searchInput.value = '';
        applyFilter();
    });
});

faqQuestions.forEach(button => {
    button.addEventListener('click', function () {
        const faqItem = this.parentElement;
        faqItem.classList.toggle('open');
    });
});

searchInput.addEventListener('input', applyFilter);

// Initialize: show all on page load
applyFilter();