// Archivo: app.js
// Contiene: punto de entrada principal de la experiencia.
// Su responsabilidad es conectar escena, efectos, interfaz y audio.

import { gestorAudio } from './audio-manager.js';
import { crearEstrellas, crearNucleo, crearGalaxia, animarGalaxia, fotosGalaxia, cartaFlotante } from './effects.js';
import { configurarInteracciones } from './interactions-controller.js';
import { crearContextoEscena, montarRenderizador, sincronizarViewport } from './scene.js';
import { obtenerElementosInterfaz, ejecutarIntroOverlay } from './ui.js';

// Reunimos las referencias de interfaz que usará el resto de módulos.
const interfaz = obtenerElementosInterfaz();

// Creamos la escena base y montamos el canvas en el documento.
const { escena, camara, renderizador, controles } = crearContextoEscena();
montarRenderizador(renderizador);

// Esta velocidad es usada por varios módulos para sincronizar la rotación del núcleo.
window.speedObject = { speed: 0.002 };

const zoomControl = document.getElementById('zoomControl');
const panControl = document.getElementById('panControl');
let currentPanValue = 0;

function actualizarZoom(valor) {
  if (!valor) {
    return;
  }

  const distancia = Number(valor);
  const direccion = new THREE.Vector3();
  camara.getWorldDirection(direccion);
  const destino = controles.target.clone();
  direccion.multiplyScalar(-distancia);
  camara.position.copy(destino).add(direccion);
  controles.update();
}

function actualizarPan(valor) {
  const x = Number(valor);
  const delta = x - currentPanValue;
  currentPanValue = x;

  if (Math.abs(delta) < 0.001) {
    return;
  }

  controles.target.x += delta;
  camara.position.x += delta;
  controles.update();
}

if (zoomControl) {
  zoomControl.addEventListener('input', (evento) => {
    actualizarZoom(evento.target.value);
  });
}

if (panControl) {
  panControl.addEventListener('input', (evento) => {
    actualizarPan(evento.target.value);
  });
}

// Construimos los elementos visuales principales de la escena.
const estrellas = crearEstrellas(escena);
const nucleo = crearNucleo(escena);
crearGalaxia(escena);

// Activamos interacciones, overlay inicial y música de fondo.
configurarInteracciones(fotosGalaxia, cartaFlotante, gestorAudio, camara, nucleo, interfaz);
ejecutarIntroOverlay(interfaz.overlay);
gestorAudio.playBackground();

// Bucle principal de animación.
function animar() {
  requestAnimationFrame(animar);
  controles.update();

  animarGalaxia();

  estrellas.rotation.y += 0.0005;
  estrellas.children.forEach((estrella) => {
    estrella.material.opacity =
      0.5 + Math.sin(Date.now() * estrella.userData.speed + estrella.userData.phase) * 0.4;
  });

  nucleo.rotation.y += window.speedObject.speed;
  renderizador.render(escena, camara);
}

animar();

// Ajuste responsivo del canvas y la cámara.
window.addEventListener('resize', () => {
  sincronizarViewport(camara, renderizador);
});
