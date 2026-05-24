class SistemaHechizos {
    constructor() {
        this.poolRojo = []; // Precargamos 5 proyectiles para no pedir memoria al CPU
        this.inicializarPool();
        this.hechizosRestantes = 3;
    }

    lanzarPoder(tipo) {
        if (this.hechizosRestantes <= 0) return;

        const efecto = this.obtenerEfectoDisponible(tipo);
        this.aplicarLogica(efecto, tipo);
        this.hechizosRestantes--;
    }

    aplicarLogica(efecto, tipo) {
        if (tipo === 'AZUL') {
            efecto.fuerza = new THREE.Vector3(0, 0, -10); // Atracción magnética
        } else if (tipo === 'ROJO') {
            efecto.fuerza = new THREE.Vector3(0, 0, 10); // Repulsión explosiva
        } else if (tipo === 'PURPURA') {
            efecto.radio = 5.0; // Borrado espacial
        }
        efecto.activar();
    }
}
