// Mulige bokstaver (Alfabetet)
var muligeBokstaver = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Æ', 'Ø', 'Å'];

// Gjetteforsøk / "Liv"
var liv = 0;

// Løsning (Løsningsord)
var løsning = [];

// Bilde
var bilde = document.getElementById("hangman_manid");

////// Legg inn conditions for prompt
function lagløsningsord() {
    Number.isInteger();
    var løsningsord = prompt('Hva skal ordet være?').toUpperCase();
    if (løsningsord == null || løsningsord === '') {
        alert('Du må skrive inn et ord');
        lagløsningsord();
    } else {
        løsning = løsningsord.split('');
        printLøsning();
    }
}

/////// Legg inn div løsningsord til random ord funksjon.
// Generer løsningsord

function genererLøsningsord() {
    var randNum = Math.floor(Math.random() * løsninger.length);
    var løsningsord = løsninger[randNum];
    løsning = løsningsord.toUpperCase().split('');
    printLøsning();
}

function genererLettLøsningsord() {
    var randNum = Math.floor(Math.random() * løsningLett.length);
    var løsningsord = løsningLett[randNum];
    løsning = løsningsord.toUpperCase().split('');
    printLøsning();
}

// Løsningsordet i UI
var løsningUI = document.getElementById("løsningsord");
// Sjekk bokstav med løsningsord og print til UI
function printLøsning() {
    var streker = [];
    løsningUI.innerHTML = '';
    for (var i = 0; i < løsning.length; i++) {
        if (rktGjettet.includes(løsning[i])) {
            streker.push(løsning[i]);
            
        } else {
            streker.push(' _ ');
        }
    }
    // update løsningsord til UI som streker:
    for (var i = 0; i < streker.length; i++) {
        løsningUI.innerHTML += streker[i];
    }
}

// Gjettede bokstaver
var gjettet = [];
var rktGjettet = [];

// Bruker input (Bokstav fra alfabetet)
document.addEventListener('click', clickLetter);
function clickLetter(el) {
    if (el.target.className === 'alt_bokstav' && el.target.style.color !== 'yellow' && el.target.style.color !== 'gray') {
        // Er bokstaven i løsningsodet?
        brukerInput = el.target.id;
        function spør() {
            // Hvis ikke:
            for (var i = 0; i < muligeBokstaver.length; i++) {
                if (brukerInput === muligeBokstaver[i] && !løsning.includes(brukerInput)) {
                    // Legg til i gjettede bokstaver
                    gjettet.push(muligeBokstaver[i]);

                    // Fjern fra mulige bokstaver
                    muligeBokstaver.splice([i], 1);

                    // Reduser antall gjetteforsøk
                    if (liv < 7) {
                        liv++;
                    }

                    console.log(liv);
                    if (liv > 6) {
                        alert('Du har dessverre ingen forsøk igjen. Du tapte! Riktig ord var '+løsning.join("")+'.');
                    }

                    // Update UI
                    el.target.style.color = 'gray';

                    // Oppdater bilde
                    bilde.innerHTML = '<img src="../img/hangman-man' + liv + '.png">';

                    // Hvis en del av løsningsordet:
                } else if (brukerInput === løsning[i]) {
                    // Legg bokstav til som gjettet
                    rktGjettet.push(løsning[i]);
                    streker = [];
                    // update UI
                    el.target.style.color = 'yellow';
                    printLøsning();
                    if (rktGjettet.length === løsning.length) {
                        document.getElementById("message").style.display = "block";
                    }
                }
            }
        };
        spør();

    } else {
        console.log('ikke en bokstav');
    }
}
var brukerInput = '';

printLøsning();








