// Configuración básica de Three.js y WebXR
let escena, camara, renderizador;
let modoActual = 'menu';
let factorTiempo = 1.0; // Control de ralentización

function inicializarMundo() {
    escena = new THREE.Scene();
    // Replicamos la niebla verdosa/azulada que se ve en el video
    escena.fog = new THREE.FogExp2(0x0a1e1a, 0.05);

    camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderizador = new THREE.WebGLRenderer({ antialias: true });
    renderizador.setSize(window.innerWidth, window.innerHeight);
    renderizador.xr.enabled = true; // Activa soporte VR Nativo
    document.body.appendChild(renderizador.domElement);

    // Iluminación ambiental tenue
    const luzAmbiente = new THREE.AmbientLight(0x113322);
    escena.add(luzAmbiente);

    construirMapaDesdeVideo();
    evaluarEasterEggTON618();
    animar();
}

// Probabilidad de 1 entre 5 (20%) para activar el menú TON 618 y el modo secreto
function evaluarEasterEggTON618() {
    const chance = Math.floor(Math.random() * 5) + 1;
    if (chance === 5) {
        document.getElementById('menu-principal').classList.add('tema-ton618');
        document.getElementById('titulo-juego').innerText = "⚠️ SINGULARITY: TON 618 ⚠️";
        document.getElementById('btn-secreto').style.display = "block";
    }
}

// Replica visual de la sala del video mediante código procedimental
function construirMapaDesdeVideo() {
    // Geometría del suelo agrietado tecnológico del video
    const sueloGeo = new THREE.PlaneGeometry(100, 100, 20, 20);
    const sueloMat = new THREE.MeshBasicMaterial({ color: 0x11221c, wireframe: true });
    const suelo = new THREE.Mesh(sueloGeo, sueloMat);
    suelo.rotation.x = -Math.PI / 2;
    escena.add(suelo);

    // Generación automática de pilares de bloques asimétricos flotantes del fondo
    for(let i = 0; i < 40; i++) {
        let alto = Math.random() * 8 + 2;
        let pilarGeo = new THREE.BoxGeometry(2, alto, 2);
        let pilarMat = new THREE.MeshBasicMaterial({ color: 0x0c241f });
        let pilar = new THREE.Mesh(pilarGeo, pilarMat);
        pilar.position.set((Math.random() - 0.5) * 60, alto/2, (Math.random() - 0.5) * 60);
        escena.add(pilar);
    }
}

function iniciarModo(modo) {
    modoActual = modo;
    document.getElementById('menu-principal').style.display = 'none';
    if (!renderizador.xr.isPresenting) {
        document.getElementById('controles-movil').style.display = 'flex'; // Interfaz celular
    }
    console.log("Iniciando: " + modo);
    ejecutarTutorialMecanicas();
}

// Loop de renderizado adaptado a la velocidad del tiempo
function animar() {
    renderizador.setAnimationLoop(() => {
        actualizarManiquies(factorTiempo);
        actualizarHechizos(factorTiempo);
        renderizador.render(escena, camara);
    });
}

window.onload = inicializarMundo;
