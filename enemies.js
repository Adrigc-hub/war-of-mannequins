class Mannequin {
    constructor(posicion) {
        this.mesh = this.crearModelo(); // Aquí iría tu loader de GLTF
        this.estado = 'ESTATUA'; // Estados: ESTATUA, PERSECUCIÓN, SOMBRA
        this.velocidad = 0.05;
    }

    update(playerCamara) {
        switch(this.estado) {
            case 'ESTATUA':
                if (!this.estaSiendoMirado(playerCamara)) {
                    this.estado = 'PERSECUCIÓN';
                }
                break;
            case 'PERSECUCIÓN':
                this.moverHacia(playerCamara.position);
                if (this.estaSiendoMirado(playerCamara)) {
                    this.estado = 'ESTATUA';
                }
                break;
        }
    }

    estaSiendoMirado(camara) {
        const direccionAlMannequin = this.mesh.position.clone().sub(camara.position).normalize();
        const angulo = camara.getWorldDirection(new THREE.Vector3()).dot(direccionAlMannequin);
        return angulo > 0.85; // Si el jugador lo tiene en su campo de visión
    }
}
