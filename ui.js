// Archivo: ui.js
// Contiene: utilidades simples para obtener y controlar elementos de interfaz.

export function obtenerElementosInterfaz() {
  // Centralizamos referencias DOM para no repetir búsquedas en varios archivos.
  return {
    overlay: document.getElementById('overlay'),
    overlayCloseBtn: document.getElementById('overlayCloseBtn'),
    pausePhotoBtn: document.getElementById('pauseBtn'),
    pauseBackgroundBtn: document.getElementById('pauseBackgroundBtn'),
    cartaModal: document.getElementById('letterModal'),
    cartaCloseBtn: document.getElementById('letterCloseBtn'),
    cartaImage: document.getElementById('letterImage'),
    cartaTitle: document.getElementById('letterTitle'),
    cartaSubtitle: document.getElementById('letterSubtitle'),
    cartaBody: document.getElementById('letterBody')
  };
}

export function ejecutarIntroOverlay(overlay) {
  // Muestra el panel inicial; se ocultará cuando se active el núcleo.
  if (!overlay) {
    return;
  }

  overlay.style.transition = 'opacity 1.3s ease, transform 1.3s ease';

  setTimeout(() => {
    overlay.style.opacity = '1';
    overlay.style.transform = 'translateY(0)';
  }, 50);
}

export function ocultarOverlay(overlay) {
  // Oculta el panel inicial con transición suave.
  if (!overlay) {
    return;
  }

  // El panel inicial solo se retira cuando ya se activa la experiencia principal.
  overlay.style.transition = 'opacity 1.2s ease-out, transform 1.2s ease-out';
  overlay.style.opacity = '0';
  overlay.style.transform = 'translateY(-10px)';
  setTimeout(() => overlay.remove(), 1200);
}
