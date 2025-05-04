import '../scss/main.scss';

document.addEventListener('DOMContentLoaded', () => {
    console.log('🧙‍♂️ Welcome to the Harry Potter!');

    const btn = document.querySelector('.hero__btn') as HTMLButtonElement;
    const charactersSection = document.getElementById('characters') as HTMLElement;

    btn.addEventListener('click', () => {
        charactersSection.classList.remove('hidden');
        btn.disabled = true;
    });
    // Add your JavaScript code here
    // initHeroSection();
    // initCharacterCards();
});