let hechizosUsadosEsteMatch = 0;

// Sistema Unificado de Entrada (Soporta Mandos VR y Pantallas Táctiles)
window.addEventListener('keydown', (e) => {
    if (e.key === 'g' || e.key === 'G') activarSlowMotion(true);
});
window.addEventListener('keyup', (e) => {
    if (e.key === 'g' || e.key === 'G') activarSlowMotion(false);
});

// Listener para Mandos de Realidad Virtual (Grip derecho)
function configurarControladoresVR(session) {
    session.addEventListener('selectstart', lanzarHechizoPrimario); // Gatillo principal
    session.addEventListener('squeezestart', (e) => {
        if(e.inputSource.handedness === 'right') activarSlowMotion(true); // Grip derecho ralentiza
    });
    session.addEventListener('squeezeend', (e) => {
        if(e.inputSource.handedness === 'right') activarSlowMotion(false);
    });
}

// Botones para celulares
document.getElementById('btn-slowmo').addEventListener('touchstart', () => activarSlowMotion(true));
document.getElementById('btn-slowmo').addEventListener('touchend', () => activarSlowMotion(false));

function activarSlowMotion(activado) {
    if (activado) {
        factorTiempo = 0.2; // El mundo se mueve al 20% de velocidad
        escena.background = new THREE.Color(0x020005); // Tinte purpúreo temporal
    } else {
        factorTiempo = 1.0;
        escena.background = new THREE.Color(0x000000);
    }
}

function usarPoderGojo(color) {
    if (hechizosUsadosEsteMatch >= 3) {
        console.log("Límite de 3 hechizos alcanzado en esta partida.");
        return;
    }

    hechizosUsadosEsteMatch++;
    
    if (color === 'azul') {
        // Atracción de Maniquíes cercanos a un punto singular
        console.log("¡Técnica de Amplificación: Azul!");
    } else if (color === 'rojo') {
        // Onda de repulsión expansiva que aleja las amenazas
        console.log("¡Técnica Inversa: Rojo!");
    } else if (color === 'purpura') {
        // Esfera masiva destructiva combinando ambas fuerzas
        console.log("Imaginaria... Púrpura 🔥");
        ejecutarVacioPurpura();
    }
}

function ejecutarVacioPurpura() {
    const bolaGeo = new THREE.SphereGeometry(2, 16, 16);
    const bolaMat = new THREE.MeshBasicMaterial({ color: 0x8800ff, wireframe: true });
    const purpuraMesh = new THREE.Mesh(bolaGeo, bolaMat);
    purpuraMesh.position.set(camara.position.x, camara.position.y, camara.position.z - 3);
    escena.add(purpuraMesh);

    // Destruye maniquíes en la trayectoria
    setTimeout(() => { escena.remove(purpuraMesh); }, 2000);
}

// Inicializador interactivo del tutorial adaptable a cada plataforma
function ejecutarTutorialMecanicas() {
    console.log("--- INICIANDO TUTORIAL MULTIDISPOSITIVO ---");
    console.log("VR: Agarra la varita de tu cintura con el Grip izquierdo.");
    console.log("VR: Usa el Grip Derecho para controlar el espacio-tiempo.");
    console.log("MÓVIL: Usa los botones virtuales de la interfaz táctil.");
}

function actualizarHechizos(delta) {
    // Actualización de proyectiles en pantalla
}
