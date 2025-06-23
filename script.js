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
                    window.location.href = 'content.html';
                } else {
                    errorMessage.textContent = 'Invalid username or b-ID. May you try again.';
                }
            }
        
            // Load credentials on page load
            window.onload = loadCredentials;
        const toggleButton = document.getElementById("toggle-mode");

        toggleButton.addEventListener("click", () => {
                document.body.classList.toggle("dark-mode");

        // Optional: Zustand speichern
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });
        // Zustand beim Laden wiederherstellen
        window.addEventListener("DOMContentLoaded", () => {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "dark") {
                document.body.classList.add("dark-mode");
        }
        });
function logout() {
                window.location.href = "index.html";
                }
// Funktion, um das Bild im Lightbox-Overlay zu öffnen
            function openLightbox(imgElement) {
                const lightbox = document.getElementById('lightbox');
                const lightboxImage = document.getElementById('lightbox-image');
                lightboxImage.src = imgElement.src; // Setzt das Bild im Lightbox-Overlay
                lightbox.style.display = 'flex'; // Zeigt das Overlay an
                lightbox.addEventListener('click', closeLightbox); // Schließt das Overlay bei Klick
                // Verhindert, dass das Overlay geschlossen wird, wenn auf das Bild geklickt wird
                lightboxImage.addEventListener('click', function(event) {
                    event.stopPropagation();
                });
            }

            // Funktion, um das Lightbox-Overlay zu schließen
            function closeLightbox() {
                const lightbox = document.getElementById('lightbox');
                lightbox.style.display = 'none'; // Versteckt das Overlay
            }
function filterGames() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const games = document.querySelectorAll('.game');
            
            games.forEach(game => {
                const gameName = game.getAttribute('data-name').toLowerCase();
                if (gameName.includes(searchTerm)) {
                    game.style.display = 'block';
                } else {
                    game.style.display = 'none';
                }
            });
        }
        function openGame(url) {
            window.location.href = url;
        }
document.querySelectorAll('.element').forEach(el => {
    el.addEventListener('click', () => {
        const [symbol, number] = el.innerText.split('\n');
        document.getElementById('element-symbol').innerText = symbol;
        document.getElementById('element-number').innerText = 'Ordnungszahl: ' + number;

        document.getElementById('element-modal').classList.remove('hidden');
    });
});

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('element-modal').classList.add('hidden');
});
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