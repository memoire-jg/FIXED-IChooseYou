function injectTutorialModal() {
    if (document.getElementById('tutorialModal')) return;

    const modal = document.createElement('div');
    modal.id = 'tutorialModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="tut-modal-content">
            <button class="tut-close-btn" id="tutCloseBtn">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <div class="tut-body">
                <div class="tut-left">
                    <div class="tut-preview-avatar"></div>
                    <div id="tut-preview-1" class="tut-preview-row">
                        <i class="fa-solid fa-house"></i>
                        <span>Home</span>
                        <i class="fa-solid fa-chevron-right tut-row-arrow"></i>
                    </div>
                    <div id="tut-preview-2" class="tut-preview-row">
                        <i class="fa-solid fa-calendar-days"></i>
                        <span>Calendar</span>
                        <i class="fa-solid fa-chevron-right tut-row-arrow"></i>
                    </div>
                    <div class="tut-preview-spacer"></div>
                    <div id="tut-preview-3" class="tut-preview-row">
                        <i class="fa-solid fa-circle-question"></i>
                        <span>FAQ</span>
                        <i class="fa-solid fa-chevron-right tut-row-arrow"></i>
                    </div>
                </div>

                <div class="tut-right">
                    <p class="tut-step-label" id="tutStepLabel"></p>
                    <h2 class="tut-title" id="tutTitle"></h2>
                    <p class="tut-desc" id="tutDesc"></p>
                </div>
            </div>

            <div class="tut-footer">
                <button class="tut-btn-ghost" id="tutPrevBtn">Previous</button>
                <div class="tut-dots">
                    <span class="tut-dot"></span>
                    <span class="tut-dot"></span>
                    <span class="tut-dot"></span>
                    <span class="tut-dot"></span>
                </div>
                <button class="tut-btn-primary" id="tutNextBtn">Next</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const stepsData = [
        {
            step: "STEP 1 OF 4",
            title: "Your Pet's Dashboard",
            desc: "Welcome to your companion's central hub! Here you can easily access their daily care schedules, update their personal data, or manage the profile settings.",
            activePreviewId: "tut-preview-1"
        },
        {
            step: "STEP 2 OF 4",
            title: "Stay on Track",
            desc: "Click on 'Calendar' in the top navigation to view your monthly care schedule. You can track your daily streaks and see upcoming events for feeding, vaccines, and grooming!",
            activePreviewId: "tut-preview-2"
        },
        {
            step: "STEP 3 OF 4",
            title: "Helpful Resources",
            desc: "Have a question about your pet? Visit the 'FAQ' page to search for expert advice, filter by animal type, and learn the best tips for keeping your companion healthy and happy.",
            activePreviewId: "tut-preview-3"
        },
        {
            step: "STEP 4 OF 4",
            title: "You're All Set!",
            desc: "You can also manage grooming, edit pet details, or delete profiles using the dashboard controls. Click Finish to begin exploring!",
            activePreviewId: null
        }
    ];

    let currentStep = 0;

    const stepLabel = document.getElementById('tutStepLabel');
    const titleText = document.getElementById('tutTitle');
    const descText = document.getElementById('tutDesc');
    const prevBtn = document.getElementById('tutPrevBtn');
    const nextBtn = document.getElementById('tutNextBtn');
    const dots = modal.querySelectorAll('.tut-dot');
    const previewRows = modal.querySelectorAll('.tut-preview-row');

    function updateUI() {
        const data = stepsData[currentStep];

        stepLabel.textContent = data.step;
        titleText.textContent = data.title;
        descText.textContent = data.desc;

        prevBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
        nextBtn.textContent = currentStep === stepsData.length - 1 ? 'Finish' : 'Next';

        dots.forEach((dot, index) => {
            dot.className = index === currentStep ? 'tut-dot tut-dot-active' : 'tut-dot';
        });

        previewRows.forEach(row => {
            row.className = 'tut-preview-row tut-row-outline';
            if (row.id === data.activePreviewId) {
                row.className = 'tut-preview-row tut-row-active';
            }
        });
    }

    nextBtn.addEventListener('click', () => {
        if (currentStep < stepsData.length - 1) {
            currentStep++;
            updateUI();
        } else {
            closeModal();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateUI();
        }
    });

    function openModal() { 
        currentStep = 0;
        updateUI();
        modal.style.display = 'flex'; 
    }
    
    function closeModal() { 
        modal.style.display = 'none'; 
    }

    document.getElementById('tutCloseBtn').addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

    window.openTutorialModal = openModal;
}

document.addEventListener('DOMContentLoaded', () => {
    injectTutorialModal();

    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.textContent.trim() === 'Tutorial') {
            link.addEventListener('click', e => {
                e.preventDefault();
                window.openTutorialModal();
            });
        }
    });

    const tutBtn = document.getElementById('tutorialBtn');
    if (tutBtn) tutBtn.addEventListener('click', () => window.openTutorialModal());
});