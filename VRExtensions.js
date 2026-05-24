/* 
 * ARCHIVO: init-manager.js
 * FUNCIÓN: Fuerza la carga secuencial para evitar fallos de interfaz
 */

window.addEventListener('load', () => {
    const scene = document.querySelector('a-scene');
    
    if (scene.hasLoaded) {
        initGameSystems();
    } else {
        scene.addEventListener('loaded', initGameSystems);
    }
});

function initGameSystems() {
    console.log("Cargando sistemas principales...");
    // Inicialización de los 4 módulos de 1000 líneas
    try {
        CosmicCore.initialize(); // Desde MainGameEngine.js
        CombatSystem.resetSpells(); // Desde CombatSystem.js
        document.querySelector('[mannequin-ai]').components['mannequin-ai'].init();
    } catch (e) {
        console.error("Fallo crítico en la carga del sistema:", e);
    }
}
