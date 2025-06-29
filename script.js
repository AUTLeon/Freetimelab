let validCredentials = {};

async function loadCredentials() {
    try {
        const response = await fetch('credentials.json');
        if (!response.ok) throw new Error('Failed to load credentials');
        validCredentials = await response.json();
    } catch (error) {
        console.error('Error loading credentials:', error);
    }
}

function hashSHA256(input) {
    return CryptoJS.SHA256(input).toString();
}

async function login() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    const errorMessage = document.getElementById('errorMessage');

    if (Object.keys(validCredentials).length === 0) {
        errorMessage.textContent = 'Failed to load credentials. Please try again.';
        return;
    }

    const hashedUsername = hashSHA256(username);
    const hashedPassword = hashSHA256(password);

    if (validCredentials[hashedUsername] === hashedPassword) {
        window.location.href = 'home.html';
    } else {
        errorMessage.textContent = 'Invalid username or b-ID. May you try again.';
    }
}

// Load credentials on page load
window.onload = loadCredentials;

// Dark-/Light-Mode Umschalter
const toggleButton = document.getElementById("toggle-mode");

// Aktualisiert den Button-Text basierend auf dem aktuellen Modus
function updateToggleButtonText() {
    if (document.body.classList.contains("dark-mode")) {
        toggleButton.textContent = "Light Mode";
    } else {
        toggleButton.textContent = "Dark Mode";
    }
}

// Event-Listener für Button-Klick
toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Zustand speichern
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }

    updateToggleButtonText();
});

// Zustand beim Laden wiederherstellen
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    updateToggleButtonText(); // Button-Text beim Start setzen
});

// Logout
function logout() {
    window.location.href = "index.html";
}

// Funktion, um das Bild im Lightbox-Overlay zu öffnen
function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.src = imgElement.src;
    lightbox.style.display = 'flex';

    lightbox.addEventListener('click', closeLightbox);

    lightboxImage.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}

// Funktion, um das Lightbox-Overlay zu schließen
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// Spiele filtern
function filterGames() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const games = document.querySelectorAll('.game');

    games.forEach(game => {
        const gameName = game.getAttribute('data-name').toLowerCase();
        game.style.display = gameName.includes(searchTerm) ? 'block' : 'none';
    });
}

// Spiel öffnen
function openGame(url) {
    window.location.href = url;
}

// Element-Klick im Periodensystem (mit Fix für Ordnungszahl-Anzeige)
document.querySelectorAll('.element').forEach(el => {
    el.addEventListener('click', () => {
        // Symbol (Text vor <small>)
        const symbol = el.firstChild.textContent.trim();

        // Ordnungszahl aus <small> auslesen
        const number = el.querySelector('small').textContent.trim();

        document.getElementById('element-symbol').innerText = symbol;
        document.getElementById('element-number').innerText = 'Ordnungszahl: ' + number;

        document.getElementById('element-modal').classList.remove('hidden');
    });
});

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('element-modal').classList.add('hidden');
});

// Zahlensystem-Umrechner
function convertNumber() {
    const decimal = parseInt(document.getElementById("decimalInput").value);
    const base = parseInt(document.getElementById("baseSelect").value);

    if (isNaN(decimal)) {
        document.getElementById("result").textContent = "Bitte eine gültige Dezimalzahl eingeben.";
        return;
    }

    const converted = decimal.toString(base).toUpperCase();
    document.getElementById("result").textContent = converted;
}
function openLightbox(imgElement) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-image");
    const caption = document.getElementById("lightbox-caption");

    lightbox.style.display = "flex";
    lightboxImg.src = imgElement.src;
    caption.textContent = imgElement.alt;
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}