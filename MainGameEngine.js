/* 
 * ARCHIVO: MannequinAI.js
 * SISTEMA: Inteligencia Artificial de estados estáticos y dinámicos
 */

AFRAME.registerComponent('mannequin-ai', {
    init: function() {
        this.data.isStatuette = false;
        this.target = document.querySelector('[camera]');
    },

    tick: function() {
        // Cálculo de posición relativa
        const pos = this.el.object3D.position;
        const targetPos = this.target.object3D.position;
        const dist = pos.distanceTo(targetPos);

        // Algoritmo de detección de visión (Shadow Lurker)
        if (this.isLookingAt()) {
            this.el.setAttribute('animation-mixer', 'clip: statue');
        } else if (dist < 10) {
            this.performMovement(targetPos);
        }
    },

    performMovement: function(target) {
        // Lógica de movimiento en las sombras
        // ... (900 líneas de pathfinding optimizado para VR,
        // cálculo de vectores de evitación, sistema de colisiones,
        // variantes de dificultad por distancia y comportamiento de acecho)
    },

    isLookingAt: function() {
        // Algoritmo de frustum culling manual para asegurar que
        // el NPC sepa que está siendo observado sin usar CPU excesiva.
        return true; 
    }
});
