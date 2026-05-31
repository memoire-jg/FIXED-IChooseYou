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
                        <span>Dashboard Overview</span>
                        <i class="fa-solid fa-chevron-right tut-row-arrow"></i>
                    </div>
                    <div id="tut-preview-2" class="tut-preview-row">
                        <i class="fa-solid fa-syringe"></i>
                        <span>Vaccine Schedule</span>
                        <i class="fa-solid fa-chevron-right tut-row-arrow"></i>
                    </div>
                    <div class="tut-preview-spacer"></div>
                    <div id="tut-preview-3" class="tut-preview-row">
                        <i class="fa-solid fa-utensils"></i>
                        <span>Feeding Schedule</span>
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
            title: "Welcome to Pet Profile",
            desc: "This dashboard gives you a complete overview of your pet's daily needs. Let's take a quick tour of how to use these features to keep your companion happy.",
            activePreviewId: "tut-preview-1"
        },
        {
            step: "STEP 2 OF 4",
            title: "Keeping Track of Health",
            desc: "The Vaccine Schedule button is your quick access to all upcoming and past immunizations. We'll remind you when it's time for the next booster, keeping your companion safe without the stress of remembering.",
            activePreviewId: "tut-preview-2"
        },
        {
            step: "STEP 3 OF 4",
            title: "Feeding Routine",
            desc: "Never miss a meal! Check the Feeding Schedule to see portion sizes and daily timing so your furry friend stays perfectly fed.",
            activePreviewId: "tut-preview-3"
        },
        {
            step: "STEP 4 OF 4",
            title: "You're All Set!",
            desc: "You can also manage grooming, edit pet details, or delete profiles using the other buttons. Click Finish to get started with your companion!",
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