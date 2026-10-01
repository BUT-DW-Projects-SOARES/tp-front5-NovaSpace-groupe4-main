import './style.css'
import './components.js'

const toggle = document.querySelector('.header__toggle');
const item = document.querySelector('.header__item');

function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
}

toggle.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
});

// Fermeture avec Échap, focus renvoyé sur le bouton
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
    }
});

// Fermeture quand le focus quitte le menu
item.addEventListener('focusout', (e) => {
    if (!item.contains(e.relatedTarget)) setMenu(false);
});