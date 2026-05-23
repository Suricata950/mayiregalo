// Archivo: interactions-controller.js
// Contiene: toda la lógica de interacción del usuario.
// Controla clics sobre fotos, carta flotante, núcleo y botones de audio.

import { granExplosion } from './effects.js';
import { ocultarOverlay } from './ui.js';

const ESCALA_BASE_FOTO = 1.32;
const FRASES_AMOR = ['Me gustas', 'Te quiero', 'Te amo'];
const ICONOS_INTERACCION_FOTO = ['✦', '☆', '♥', '❀', '✿'];

function crearRaycaster(evento, camara) {
  // Convierte la posición del clic en coordenadas para detectar objetos 3D.
  const mouse = new THREE.Vector2(
    (evento.clientX / window.innerWidth) * 2 - 1,
    -(evento.clientY / window.innerHeight) * 2 + 1
  );
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camara);
  return raycaster;
}

function animarPulso(objetivoEscala, escalaBaseX, escalaBaseY, curvaCrecimiento = 'back.out(2)') {
  // Pulso suave que comprime y luego recupera el tamaño visual del objeto.
  gsap.killTweensOf(objetivoEscala);
  gsap.timeline()
    .to(objetivoEscala, {
      x: escalaBaseX * 0.88,
      y: escalaBaseY * 0.88,
      z: 1,
      duration: 0.14,
      ease: 'power2.out'
    })
    .to(objetivoEscala, {
      x: escalaBaseX * 1.08,
      y: escalaBaseY * 1.08,
      z: 1,
      duration: 0.24,
      ease: curvaCrecimiento
    })
    .to(objetivoEscala, {
      x: escalaBaseX,
      y: escalaBaseY,
      z: 1,
      duration: 0.2,
      ease: 'sine.out'
    });
}

function crearChispaAmor() {
  // Chispa textual sencilla usada durante la activación del núcleo.
  const mensaje = document.createElement('div');
  mensaje.className = 'message message-love';
  mensaje.innerText = FRASES_AMOR[Math.floor(Math.random() * FRASES_AMOR.length)];
  mensaje.style.left = `${Math.random() * window.innerWidth * 0.8 + 10}px`;
  mensaje.style.top = `${Math.random() * window.innerHeight * 0.65 + 10}px`;
  document.body.appendChild(mensaje);

  setTimeout(() => {
    mensaje.style.opacity = '0';
    setTimeout(() => mensaje.remove(), 1400);
  }, 6200);
}

function crearParticulasFoto(posicionX, posicionY) {
  // Genera pequeños detalles visuales al tocar una foto.
  const cantidad = 40;

  for (let indice = 0; indice < cantidad; indice++) {
    const particula = document.createElement('div');
    particula.className = 'particula-foto';
    particula.textContent = ICONOS_INTERACCION_FOTO[Math.floor(Math.random() * ICONOS_INTERACCION_FOTO.length)];
    particula.style.left = `${posicionX}px`;
    particula.style.top = `${posicionY}px`;
    particula.style.setProperty('--desplazamiento-x', `${(Math.random() - 0.5) * 120}px`);
    particula.style.setProperty('--desplazamiento-y', `${-40 - Math.random() * 90}px`);
    particula.style.setProperty('--duracion', `${0.9 + Math.random() * 0.7}s`);
    particula.style.fontSize = `${18 + Math.random() * 12}px`;
    document.body.appendChild(particula);

    setTimeout(() => {
      particula.remove();
    }, 1700);
  }
}

function activarSecuenciaNucleo(overlay) {
  // El núcleo dispara la secuencia principal de aceleración, chispas y gran explosión.
  gsap.to(window.speedObject, { speed: 0.25, duration: 5, ease: 'power2.inOut' });
  ocultarOverlay(overlay);

  for (let indice = 0; indice < 8; indice++) {
    setTimeout(crearChispaAmor, indice * 220 + Math.random() * 180);
  }

  setTimeout(() => {
    for (let indice = 0; indice < 6; indice++) {
      setTimeout(crearChispaAmor, indice * 260 + 120);
    }
  }, 2600);

  setTimeout(() => {
    granExplosion(() => {
      gsap.to(window.speedObject, { speed: 0.06, duration: 5, ease: 'power2.inOut' });
    });
  }, 5000);
}

export function configurarInteracciones(fotos, cartaFlotante, gestorAudio, camara, nucleo, interfaz) {
  // Reunimos los elementos de interfaz que se actualizarán según el estado del audio.
  const {
    overlay,
    overlayCloseBtn,
    pausePhotoBtn,
    pauseBackgroundBtn,
    cartaModal,
    cartaCloseBtn,
    cartaImage,
    cartaTitle,
    cartaSubtitle,
    cartaBody
  } = interfaz;

  const escalaBaseCartaX = cartaFlotante?.mesh?.userData?.baseScaleX || 5.6;
  const escalaBaseCartaY = cartaFlotante?.mesh?.userData?.baseScaleY || 5.6;

  const actualizarBotones = () => {
    // El botón de fondo solo se muestra cuando no hay una canción puntual sonando.
    const fotoReproduciendose = !!(gestorAudio.sonidoActual && gestorAudio.sonidoActual.playing());
    const fondoActivo = gestorAudio.fondoActivo;

    pausePhotoBtn.style.display = fotoReproduciendose ? 'block' : 'none';
    pauseBackgroundBtn.style.display = fotoReproduciendose ? 'none' : 'block';

    pausePhotoBtn.innerText = 'Pausar musica';
    pauseBackgroundBtn.innerText = fondoActivo ? 'Pausar melodia' : 'Reproducir melodia';
  };

  const abrirCartaModal = () => {
    // La carta se rellena desde la configuración del objeto flotante.
    if (!cartaFlotante || !cartaModal) {
      return;
    }

    cartaImage.src = cartaFlotante.mesh.material.map.image.currentSrc || cartaFlotante.mesh.material.map.image.src;
    cartaTitle.textContent = cartaFlotante.mesh.userData.title;
    cartaSubtitle.textContent = cartaFlotante.mesh.userData.subtitle;
    cartaBody.innerHTML = '';

    cartaFlotante.mesh.userData.body.forEach((parrafo) => {
      const nodoParrafo = document.createElement('p');
      nodoParrafo.textContent = parrafo;
      cartaBody.appendChild(nodoParrafo);
    });

    const botonTransmision = document.createElement('button');
    botonTransmision.type = 'button';
    botonTransmision.className = 'letter-transmission-btn';
    botonTransmision.textContent = cartaFlotante.mesh.userData.transmissionButton;
    botonTransmision.addEventListener('click', (evento) => {
      evento.stopPropagation();
      gestorAudio.play(cartaFlotante.mesh.userData.transmissionSound);
    });
    cartaBody.appendChild(botonTransmision);

    cartaModal.setAttribute('aria-hidden', 'false');
    cartaModal.classList.add('is-open');
    document.body.classList.add('modal-open');
  };

  const cerrarCartaModal = () => {
    // Cierra el modal de la carta y devuelve el foco visual a la galaxia.
    if (!cartaModal) {
      return;
    }

    cartaModal.setAttribute('aria-hidden', 'true');
    cartaModal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  };

  gestorAudio.alCambiarEstado = actualizarBotones;
  actualizarBotones();

  window.addEventListener('click', (evento) => {
    // Evita disparar raycasting si el clic pertenece a la interfaz HTML.
    if (
      evento.target.closest('#letterModal') ||
      evento.target.closest('#overlayCloseBtn') ||
      evento.target.closest('#pauseBtn') ||
      evento.target.closest('#pauseBackgroundBtn')
    ) {
      return;
    }

    const raycaster = crearRaycaster(evento, camara);
    const interseccionesFotos = raycaster.intersectObjects(fotos.map((foto) => foto.mesh));

    if (interseccionesFotos.length > 0) {
      const objetoClickeado = interseccionesFotos[0].object;
      const fotoSeleccionada = fotos.find((foto) => foto.mesh === objetoClickeado);

      if (fotoSeleccionada) {
        fotoSeleccionada.playAudio(gestorAudio);
        fotoSeleccionada.showMessage();
        animarPulso(fotoSeleccionada.mesh.scale, ESCALA_BASE_FOTO, ESCALA_BASE_FOTO);
        crearParticulasFoto(evento.clientX, evento.clientY);
        return;
      }
    }

    if (cartaFlotante && cartaFlotante.mesh.visible) {
      const interseccionesCarta = raycaster.intersectObject(cartaFlotante.mesh);
      if (interseccionesCarta.length > 0) {
        cartaFlotante.playAudio(gestorAudio);
        animarPulso(cartaFlotante.mesh.scale, escalaBaseCartaX, escalaBaseCartaY, 'back.out(1.8)');
        abrirCartaModal();
        return;
      }
    }

    const interseccionesNucleo = raycaster.intersectObject(nucleo);
    if (interseccionesNucleo.length > 0) {
      activarSecuenciaNucleo(overlay);
    }
  });

  // Botón para pausar la canción puntual de una foto o de la carta.
  pausePhotoBtn.addEventListener('click', () => {
    gestorAudio.pause();
  });

  if (overlayCloseBtn) {
    overlayCloseBtn.addEventListener('click', (evento) => {
      evento.stopPropagation();
      ocultarOverlay(overlay);
    });
  }

  // Botón para pausar o reactivar la melodía de fondo.
  pauseBackgroundBtn.addEventListener('click', () => {
    gestorAudio.toggleBackground();
  });

  // Cierre explícito del modal desde el botón X.
  if (cartaCloseBtn) {
    cartaCloseBtn.addEventListener('click', (evento) => {
      evento.stopPropagation();
      cerrarCartaModal();
    });
  }

  // Cierre del modal al tocar fuera del panel.
  if (cartaModal) {
    cartaModal.addEventListener('click', (evento) => {
      if (evento.target === cartaModal) {
        cerrarCartaModal();
      }
    });
  }

  // Cierre del modal con tecla Escape para escritorio.
  window.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
      cerrarCartaModal();
    }
  });
}
