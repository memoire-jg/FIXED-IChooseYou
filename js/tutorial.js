// ── Tutorial Modal (1-step demo) ─────────────────────────────────

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

                <!-- Left: visual preview -->
                <div class="tut-left">
                    <div class="tut-preview-avatar"></div>
                    <div class="tut-preview-row tut-row-active">
                        <i class="fa-solid fa-syringe"></i>
                        <span>Vaccine Schedule</span>
                        <i class="fa-solid fa-chevron-right tut-row-arrow"></i>
                    </div>
                    <div class="tut-preview-spacer"></div>
                    <div class="tut-preview-row tut-row-outline">
                        <i class="fa-solid fa-utensils"></i>
                        <span>Feeding Schedule</span>
                    </div>
                </div>

                <!-- Right: text -->
                <div class="tut-right">
                    <p class="tut-step-label">STEP 2 OF 4</p>
                    <h2 class="tut-title">Keeping Track of Health</h2>
                    <p class="tut-desc">
                        The Vaccine Schedule button is your quick access to all upcoming
                        and past immunizations. We'll remind you when it's time for the
                        next booster, keeping your companion safe without the stress of
                        remembering.
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <div class="tut-footer">
                <button class="tut-btn-ghost" id="tutPrevBtn">Previous</button>
                <div class="tut-dots">
                    <span class="tut-dot"></span>
                    <span class="tut-dot tut-dot-active"></span>
                    <span class="tut-dot"></span>
                    <span class="tut-dot"></span>
                </div>
                <button class="tut-btn-primary" id="tutNextBtn">Next</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    function openModal() { modal.style.display = 'flex'; }
    function closeModal() { modal.style.display = 'none'; }

    document.getElementById('tutCloseBtn').addEventListener('click', closeModal);
    document.getElementById('tutNextBtn').addEventListener('click', closeModal);
    document.getElementById('tutPrevBtn').addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

    window.openTutorialModal = openModal;
}

document.addEventListener('DOMContentLoaded', () => {
    injectTutorialModal();

    // Navbar "Tutorial" link on any page
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.textContent.trim() === 'Tutorial') {
            link.addEventListener('click', e => {
                e.preventDefault();
                window.openTutorialModal();
            });
        }
    });

    // pet-detail tutorial card
    const tutBtn = document.getElementById('tutorialBtn');
    if (tutBtn) tutBtn.addEventListener('click', () => window.openTutorialModal());
});
