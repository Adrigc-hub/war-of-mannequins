const TimeController = {
    targetTimeScale: 1.0,
    currentTimeScale: 1.0,

    update(delta) {
        // Suaviza la transición del tiempo para que no sea un golpe seco
        this.currentTimeScale += (this.targetTimeScale - this.currentTimeScale) * 0.1;
        
        // Aplicamos esto al delta del juego
        const tiempoAjustado = delta * this.currentTimeScale;
        renderizarJuego(tiempoAjustado);
    },

    triggerSlowMotion(active) {
        this.targetTimeScale = active ? 0.2 : 1.0;
    }
};
