// Zmiana viewpoint
function setViewpoint(viewpointName) {
    const viewpointElement = document.getElementById(viewpointName);
    viewpointElement.setAttribute('set_bind', 'true');
}

// Zmiana koloru skóry
document.getElementById('kolorSkory').addEventListener('input', function (event) {
    const color = event.target.value;

    document.getElementById('materialGlowy').setAttribute('diffuseColor', color);
    document.getElementById('materialLewejReki').setAttribute('diffuseColor', color);
    document.getElementById('materialPrawejReki').setAttribute('diffuseColor', color);
    document.getElementById('materialLewejNogi').setAttribute('diffuseColor', color);
    document.getElementById('materialPrawejNogi').setAttribute('diffuseColor', color);
});

// Zmiana koloru włosów
document.getElementById('kolorWlosow').addEventListener('input', function (event) {
    const color = event.target.value;
    document.getElementById('materialWlosow').setAttribute('diffuseColor', color);
});

// Zmiana koloru koszulki
document.getElementById('kolorKoszulki').addEventListener('input', function (event) {
    const color = event.target.value;
    document.getElementById('materialKoszulki').setAttribute('diffuseColor', color);
});

// Zmiana koloru spodenek
document.getElementById('kolorSpodenek').addEventListener('input', function (event) {
    const color = event.target.value;

    document.getElementById('materialSpodenek').setAttribute('diffuseColor', color);
    document.getElementById('materialSpodenek_L').setAttribute('diffuseColor', color);
    document.getElementById('materialSpodenek_P').setAttribute('diffuseColor', color);
});

// Zmiana koloru butów
document.getElementById('kolorButow').addEventListener('input', function (event) {
    const color = event.target.value;

    document.getElementById('materialLewegoButa').setAttribute('diffuseColor', color);
    document.getElementById('materialPrawegoButa').setAttribute('diffuseColor', color);
});

const blackColor = "0 0 0";
const initialEyeColor = "1 1 1";
let isBlinking = false;

// Zmiany koloru oczu
function changeEyeColor(color) {
    document.getElementById('materialLewegoOka').setAttribute('diffuseColor', color);
    document.getElementById('materialPrawegoOka').setAttribute('diffuseColor', color);
    document.getElementById('materialLewegoOka2').setAttribute('diffuseColor', color);
    document.getElementById('materialPrawegoOka2').setAttribute('diffuseColor', color);
}

// Funkcja symulująca mruganie oczu
function simulateBlinking() {
    if (isBlinking) 
        return; // Jeśli już trwa mruganie, nie rób nic

    isBlinking = true;
    changeEyeColor(blackColor);

    setTimeout(() => {
        changeEyeColor(initialEyeColor);
        isBlinking = false;
    }, 100);
}
setInterval(simulateBlinking, 1500);

// LOGIKA STRZELANIA
// Zmiana położenia piłki
document.getElementById('shotDirection').addEventListener('input', function (event) {
    const X = event.target.value;
    document.getElementById('Pilka2').setAttribute('translation', `${X} 1.75 -76.5`);
});

const ball = document.getElementById("Pilka");
const ball2 = document.getElementById("Pilka2");
const shotDirection = document.getElementById("shotDirection");
const rightLeg = document.getElementById("prawaNoga");
const rightBoot = document.getElementById("prawyBut");

function shoot() {
    // Pobierz wybraną wartość kierunku
    const xDirection = parseFloat(shotDirection.value);
    // Początkowa pozycja piłki
    const startPosition = { x: 0, y: 1.75, z: -5 };
    // Cel strzału
    const targetPosition = { x: xDirection, y: 1.75, z: -76 };

    // Ustaw animację
    let progress = 0;
    const duration = 500;
    const interval = 10;

    // Przesunięcie prawej nogi i buta
    const rightLegZ = parseFloat(rightLeg.getAttribute("translation").split(" ")[2]);
    const rightBootZ = parseFloat(rightBoot.getAttribute("translation").split(" ")[2]);
    rightLeg.setAttribute("translation", `0.7 0.7 ${rightLegZ - 1}`);
    rightBoot.setAttribute("translation", `0.7 -0.2 ${rightBootZ - 1}`);

    const moveBall = setInterval(() => {
        progress += interval / duration;

        // Interpolacja liniowa w osiach X i Z
        const currentX = startPosition.x + progress * (targetPosition.x - startPosition.x);
        const currentZ = startPosition.z + progress * (targetPosition.z - startPosition.z);

        // Obliczanie trajektorii łuku w osi Y
        const maxHeight = 12; // max wysokość łuku
        const curveFactor = Math.sin(progress * Math.PI); // sinusoidalna funkcja dla parabolicznego ruchu
        const currentY = startPosition.y + maxHeight * curveFactor;

        // Aktualizuj pozycję piłki
        ball.setAttribute("translation", `${currentX} ${currentY} ${currentZ}`);
        document.getElementById('materialBandy').setAttribute('diffuseColor', "#00ff0c");

        // Zatrzymaj animację, gdy osiągnie cel
        if (progress >= 1) {
            clearInterval(moveBall);
            // Przywrócenie pozycji nogi i buta
            rightLeg.setAttribute("translation", "0.7 0.7 0");
            rightBoot.setAttribute("translation", "0.7 -0.2 -0.45");

            const repeatShot = confirm("Do you want to shoot again?");
            if (repeatShot) {
                // Przywrócenie pozycji początkowej piłki
                ball.setAttribute("translation", `${startPosition.x} ${startPosition.y} ${startPosition.z}`);
                // Przywrócenie pozycji suwaka i piłki2
                shotDirection.value = 0;
                ball2.setAttribute("translation", "0 1.75 -76.5");
                
                document.getElementById('materialBandy').setAttribute('diffuseColor', "#000000");
            }
        }
    }, interval);
}