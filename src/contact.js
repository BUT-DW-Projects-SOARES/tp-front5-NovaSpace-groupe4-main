const email = document.getElementById('email');
const erreur = document.getElementById('erreur-email');

function messageErreur(champ) {
    if (champ.validity.valueMissing) return 'Erreur : l’adresse e-mail est obligatoire.';
    if (champ.validity.typeMismatch) return 'Erreur : l’adresse e-mail n’est pas valide. Exemple de format : nom@exemple.fr.';
    return '';
}

function verifier(champ) {
    const msg = messageErreur(champ);
    erreur.textContent = msg;
    if (msg) champ.setAttribute('aria-invalid', 'true');
    else champ.removeAttribute('aria-invalid');
}

email.addEventListener('blur', () => {
    if (email.value !== '' || email.hasAttribute('aria-invalid')) verifier(email);
});

email.addEventListener('input', () => {
    if (email.hasAttribute('aria-invalid')) verifier(email);
});
