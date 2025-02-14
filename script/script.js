// JavaScript pour la navigation active
// Créez un fichier script/script.js
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer tous les liens de navigation
    const navLinks = document.querySelectorAll('.nav-icons a');
    
    // Obtenir le chemin de la page actuelle
    const currentPath = window.location.pathname;
    
    // Ajouter la classe active au lien correspondant à la page actuelle
    navLinks.forEach(link => {
        if(link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
        
        // Gérer le clic sur les liens
        link.addEventListener('click', function(e) {
            // Si le lien n'a pas de href ou est #, empêcher la navigation
            if(this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            // Retirer la classe active de tous les liens
            navLinks.forEach(l => l.classList.remove('active'));
            // Ajouter la classe active au lien cliqué
            this.classList.add('active');
        });
    });

    // Animation pour le bouton de téléchargement
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }

    //Contact

    const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText'); // Le texte du bouton
const loader = document.getElementById('loader');
const snackbar = document.getElementById('snackbar');
const fields = ['name', 'email', 'message'];

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
};

const showError = (fieldId, show) => {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}Error`);
    if (show) {
        field.classList.add('invalid');
        error.style.display = 'block';
    } else {
        field.classList.remove('invalid');
        error.style.display = 'none';
    }
};

fields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    field.addEventListener('input', () => {
        showError(fieldId, false);
    });
});

// Fonction pour afficher le snackbar
const showSnackbar = (message, success = true) => {
    snackbar.textContent = message;
    snackbar.style.backgroundColor = success ? 'green' : 'red';
    snackbar.className = "show"; // Affiche le snackbar
    setTimeout(() => {
        snackbar.className = ""; // Masque le snackbar après 3 secondes
    }, 3000);
};

form.addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche la redirection

    // Afficher le loader dans le bouton et cacher le texte
    submitText.style.display = 'none';
    loader.style.display = 'block';
    submitBtn.disabled = true; // Désactiver le bouton pendant l'envoi
    
    console.log("Form submission intercepted");

    // Envoi de la requête fetch
    fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
    })
    .then(response => response.json()) // Lire la réponse JSON
    .then(data => {
        console.log(data);  // Log pour vérifier les données retournées

        // Cacher le loader dans le bouton et réafficher le texte
        loader.style.display = 'none';
        submitText.style.display = 'inline';
        submitBtn.disabled = false; // Réactiver le bouton

        if (data.success) {
            showSnackbar("✅ Message envoyé avec succès !", true);
            form.reset();
        } else {
            showSnackbar("❌ Une erreur est survenue, veuillez réessayer.", false);
        }
    })
    .catch(error => {
        // Cacher le loader dans le bouton et réafficher le texte
        loader.style.display = 'none';
        submitText.style.display = 'inline';
        submitBtn.disabled = false; // Réactiver le bouton
        showSnackbar("❌ Une erreur s'est produite : " + error, false);
    });
});

        
});