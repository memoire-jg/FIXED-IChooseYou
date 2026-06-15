// ============================================================================
// --- COEXISTENCE ARCHITECTURE A: CENTRALIZED OVERVIEW MODAL (Navbar Item) ---
// ============================================================================

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


// ============================================================================
// --- COEXISTENCE ARCHITECTURE B: LIVE ELEMENT SPOTLIGHT TOUR (Page Button) ---
// ============================================================================

const getNavbarSteps = () => {
    const steps = [
        {
            element: 'nav, .top-nav, header', 
            title: 'Main Navigation Hub',
            intro: 'This is your primary navigation menu. Use it to fluidly jump across your main Dashboard, Calendar timelines, and FAQ guides.',
        }
    ];

    if (document.getElementById('backBtn')) {
        steps.push({
            element: '#backBtn',
            title: 'Return Home',
            intro: 'Clicking here brings you right back to your master pet dashboard instantly.',
        });
    }

    if (document.getElementById('logoutBtn')) {
        steps.push({
            element: '#logoutBtn',
            title: 'Secure Logout',
            intro: 'When you are finished managing your companions, click here to securely sign out of your account session.',
        });
    }

    return steps;
};

const homeTutorialSteps = [
    {
        element: '#addPetBtn, .add-pet-card', 
        title: 'Register a Companion',
        intro: 'Click here to add a brand new pet profile into your active care monitoring ecosystem.',
    },
    {
        element: '#petListContainer, .pets-grid', 
        title: 'Your Pet Roster',
        intro: 'All your registered pets appear tracked in this list. Select any profile card to jump directly into their granular metrics.',
    }
];

const petDetailTutorialSteps = [
    {
        element: '#vaccineBtn', 
        title: 'Medical & Vaccine Logs',
        intro: 'Keep track of clinical deadlines. Tap here to look over mandatory immunization history, booster countdowns, and upcoming medical alerts.',
    },
    {
        element: '#feedingBtn',
        title: 'Nutritional Intake Guides',
        intro: 'Check specific meal configurations, daily portion metrics, and precise morning/evening dietary intervals calculated for this pet.',
    },
    {
        element: '#groomingBtn',
        title: 'Hygiene Maintenance Tasks',
        intro: 'Monitor localized grooming requirements like dynamic dental care cadences, brushing tasks, and scheduled coat washes.',
    },
    {
        element: '#editBtn',
        title: 'Modify Profile Metrics',
        intro: 'Update specific age increments, fluctuating weights, or altered breeds inside the application context ledger dynamically.',
    },
    {
        element: '#deleteBtn',
        title: 'Deregister Record',
        intro: 'If you ever need to purge this companion file from your active device logs completely, initialize the structural removal workflow right here.',
    }
];

// Spotlight System Variables
let currentStepIndex = 0;
let currentSteps = [];
let overlayElement = null;
let tooltipElement = null;

function startTutorial() {
    window.addEventListener('resize', repositionCurrentTooltip);
    window.addEventListener('scroll', repositionCurrentTooltip);
    document.addEventListener('keydown', handleKeyboardAccessibility);

    const isPetDetailPage = document.getElementById('detailName') !== null || !!document.querySelector('.pet-detail-container');
    
    const initialNavbarSequence = getNavbarSteps();
    const targetedPageSequence = isPetDetailPage ? petDetailTutorialSteps : homeTutorialSteps;
    
    currentSteps = [...initialNavbarSequence, ...targetedPageSequence];
    currentStepIndex = 0;
    
    if (!overlayElement) {
        overlayElement = document.createElement('div');
        overlayElement.id = 'tutorial-overlay';
        document.body.appendChild(overlayElement);
    }
    
    if (!tooltipElement) {
        tooltipElement = document.createElement('div');
        tooltipElement.id = 'tutorial-tooltip';
        document.body.appendChild(tooltipElement);
    }
    
    overlayElement.style.display = 'block';
    tooltipElement.style.display = 'block';
    
    renderStep();
}

function renderStep() {
    const step = currentSteps[currentStepIndex];
    const targetElement = document.querySelector(step.element);

    // buat buka navbarnya untuk tutorial button logout
    if (step.element.includes('logoutBtn')) {
        const navLinks = document.getElementById('navLinks');
        if (navLinks) navLinks.classList.add('show');
    } else {
        // Tutup lagi kalau step lain
        const navLinks = document.getElementById('navLinks');
        if (navLinks) navLinks.classList.remove('show');
    }
    
    if (!targetElement) {
        console.warn(`Target missing: ${step.element}. Skipping step.`);
        nextStep();
        return;
    }
    
    clearHighlights();
    
    // Cache layout metrics to safely restore them when the tour exits
    targetElement.dataset.origPosition = getComputedStyle(targetElement).position;
    targetElement.dataset.origZIndex = getComputedStyle(targetElement).zIndex;
    targetElement.dataset.origShadow = getComputedStyle(targetElement).boxShadow;
    targetElement.dataset.origRadius = getComputedStyle(targetElement).borderRadius;
    
    // Inject class styles securely
    targetElement.classList.add('tutorial-highlight');
    
    repositionCurrentTooltip();
    
    tooltipElement.innerHTML = `
        <h3 style="margin: 0 0 8px 0; color: #333; font-size: 1.1rem; font-weight: 700; font-family: 'Inter', sans-serif;">${step.title}</h3>
        <p style="margin: 0 0 20px 0; color: #555; font-size: 0.9rem; line-height: 1.5; font-family: 'Inter', sans-serif;">${step.intro}</p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <button id="tutorial-close-btn" style="background: none; border: none; color: #888; cursor: pointer; font-size: 0.85rem; font-weight: 500;">Skip Tour</button>
            <div>
                ${currentStepIndex > 0 ? '<button id="tutorial-prev-btn" style="padding: 6px 12px; margin-right: 8px; border: 1px solid #d1d5db; background: #ffffff; border-radius: 6px; cursor: pointer; color: #444; font-size: 0.85rem;">Back</button>' : ''}
                <button id="tutorial-next-btn" style="padding: 6px 14px; background: #44644a; color: #ffffff; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-weight: 600;">
                    ${currentStepIndex === currentSteps.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
        <div style="position: absolute; top: 18px; right: 22px; font-size: 0.75rem; color: #999; font-weight: 600; font-family: 'Inter', sans-serif;">
            ${currentStepIndex + 1} / ${currentSteps.length}
        </div>
    `;
    
    document.getElementById('tutorial-close-btn').addEventListener('click', endTutorial);
    if (currentStepIndex > 0) {
        document.getElementById('tutorial-prev-btn').addEventListener('click', prevStep);
    }
    document.getElementById('tutorial-next-btn').addEventListener('click', () => {
        if (currentStepIndex === currentSteps.length - 1) {
            endTutorial();
        } else {
            nextStep();
        }
    });

    // Auto focus on next button for faster keyboard navigation
    document.getElementById('tutorial-next-btn').focus();
}

function nextStep() {
    if (currentStepIndex < currentSteps.length - 1) {
        currentStepIndex++;
        renderStep();
    }
}

function prevStep() {
    if (currentStepIndex > 0) {
        currentStepIndex--;
        renderStep();
    }
}

function clearHighlights() {
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
        // Clean up fallback runtime bindings
        if (el.dataset.origPosition) el.style.position = el.dataset.origPosition === 'static' ? '' : el.dataset.origPosition;
        if (el.dataset.origZIndex) el.style.zIndex = el.dataset.origZIndex === 'auto' ? '' : el.dataset.origZIndex;
        if (el.dataset.origShadow) el.style.boxShadow = el.dataset.origShadow === 'none' ? '' : el.dataset.origShadow;
        if (el.dataset.origRadius) el.style.borderRadius = el.dataset.origRadius;
    });
}

function endTutorial() {
    if (overlayElement) overlayElement.style.display = 'none';
    if (tooltipElement) tooltipElement.style.display = 'none';
    clearHighlights();
    
    document.querySelectorAll('[data-orig-position]').forEach(el => {
        delete el.dataset.origPosition;
        delete el.dataset.origZIndex;
        delete el.dataset.origShadow;
        delete el.dataset.origRadius;
    });

    window.removeEventListener('resize', repositionCurrentTooltip);
    window.removeEventListener('scroll', repositionCurrentTooltip);
    document.removeEventListener('keydown', handleKeyboardAccessibility);
}

// Global scope positioning utility
function repositionCurrentTooltip() {
    if (!tooltipElement || tooltipElement.style.display === 'none' || currentSteps.length === 0) return;
    const step = currentSteps[currentStepIndex];
    const targetElement = document.querySelector(step.element);
    if (!targetElement) return;

    const rect = targetElement.getBoundingClientRect();
    let topPosition = rect.bottom + window.scrollY + 16;
    
    // Check if drawing card overflows the bottom screen threshold
    if (topPosition + 180 > window.innerHeight + window.scrollY) {
        topPosition = rect.top + window.scrollY - 190; 
    }
    tooltipElement.style.top = `${topPosition}px`;
    tooltipElement.style.left = `${Math.max(16, Math.min(rect.left, window.innerWidth - 360))}px`;
}

// Focus trap & escape controller for accessibility
function handleKeyboardAccessibility(e) {
    if (!tooltipElement || tooltipElement.style.display === 'none') return;
    
    if (e.key === 'Escape') {
        endTutorial();
    } else if (e.key === 'Tab') {
        const interactiveButtons = tooltipElement.querySelectorAll('button');
        const firstBtn = interactiveButtons[0];
        const lastBtn = interactiveButtons[interactiveButtons.length - 1];
        
        if (e.shiftKey && document.activeElement === firstBtn) {
            lastBtn.focus();
            e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastBtn) {
            firstBtn.focus();
            e.preventDefault();
        }
    }
}


// ============================================================================
// --- COMPONENT ASSEMBLY & INITIALIZATION TRAFFIC ROUTING ---
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    injectTutorialModal();

    document.querySelectorAll('.nav-links a, .top-nav a').forEach(link => {
        if (link.textContent.trim() === 'Tutorial') {
            link.addEventListener('click', e => {
                e.preventDefault();
                if (window.openTutorialModal) {
                    window.openTutorialModal();
                }
            });
        }
    });

    const internalPageTrigger = document.getElementById('startTutorialBtn') || document.getElementById('tutorialBtn');
    if (internalPageTrigger) {
        internalPageTrigger.addEventListener('click', (e) => {
            if (!internalPageTrigger.closest('.nav-links') && !internalPageTrigger.closest('.top-nav')) {
                e.preventDefault();
                startTutorial();
            }
        });
    }
});