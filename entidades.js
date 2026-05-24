let listaManiquies = [];

class Mannequin {
    constructor(tipo, x, z) {
        this.tipo = tipo; // 'comun' o 'sombra'
        // Creación del cuerpo azul poligonal del video
        const geo = new THREE.CylinderGeometry(0.5, 0.3, 1.8, 6);
        const mat = new THREE.MeshBasicMaterial({ 
            color: tipo === 'comun' ? 0x00aaff : 0x030310, 
            wireframe: true 
        });
        this.mesh = new THREE.Mesh(geo, mat);
        this.mesh.position.set(x, 0.9, z);
        escena.add(this.mesh);
        
        this.velocidad = 0.08;
        this.esEstatua = false;
    }

    actualizar(deltaTiempo, posicionJugador, camaraDireccion) {
        // Calcular vector al jugador
        let dirX = posicionJugador.x - this.mesh.position.x;
        let dirZ = posicionJugador.z - this.mesh.position.z;
        let distancia = Math.sqrt(dirX * dirX + dirZ * dirZ);

        // Lógica de detección de mirada (Cono de visión del jugador)
        let vectorHaciaEnemigo = new THREE.Vector3().subVectors(this.mesh.position, camara.position).normalize();
        let esMirado = camaraDireccion.dot(vectorHaciaEnemigo) > 0.7; // Si el ángulo es cerrado, lo está viendo

        if (this.tipo === 'comun') {
            if (esMirado) {
                this.esEstatua = true; // Se camufla como estatua inmóvil
                this.mesh.material.color.setHex(0x004488); 
                return;
            } else {
                this.esEstatua = false;
                this.mesh.material.color.setHex(0x00aaff);
            }
        } 
        
        if (this.tipo === 'sombra') {
            // Variante avanzada: Solo ataca en la completa espalda o zonas oscuras
            if (esMirado || distancia > 25) {
                this.esEstatua = true;
                return;
            } else {
                this.esEstatua = false;
            }
        }

        // Movimiento si no está petrificado (afectado por el Slow-Mo)
        if (!this.esEstatua && distancia > 1) {
            this.mesh.position.x += (dirX / distancia) * this.velocidad * deltaTiempo;
            this.mesh.position.z += (dirZ / distancia) * this.velocidad * deltaTiempo;
        }
    }
}

function actualizarManiquies(delta) {
    let dirCamara = new THREE.Vector3();
    camara.getWorldDirection(dirCamara);
    listaManiquies.forEach(m => m.actualizar(delta, camara.position, dirCamara));
}
