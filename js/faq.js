const searchInput = document.getElementById('faqSearch');
const categoryButtons = document.querySelectorAll('.category-btn');
const faqItems = document.querySelectorAll('.faq-item');
const faqQuestions = document.querySelectorAll('.faq-question');

categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        categoryButtons.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
    });
});

faqQuestions.forEach(button => {
    button.addEventListener('click', function() {
        const faqItem = this.parentElement;
        faqItem.classList.toggle('open');
    });
});

searchInput.addEventListener('input', function() {
    const searchText = this.value.toLowerCase().trim();

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question span').textContent.toLowerCase();
        const isMatch = question.includes(searchText);

        item.style.display = isMatch ? 'block' : 'none';
    });
});
