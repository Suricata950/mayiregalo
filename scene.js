// Archivo: scene.js
// Contiene: creación y sincronización de la escena base de Three.js.

export function crearContextoEscena() {
  const esPantallaPequena = window.innerWidth <= 768;

  // La escena general contiene niebla suave para dar profundidad.
  const escena = new THREE.Scene();
  escena.fog = new THREE.Fog(0x000000, 30, 150);

  // Cámara principal orientada hacia el centro de la galaxia.
  const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camara.position.set(12, 20, 50);
  camara.lookAt(0, 0, 0);

  // Renderizador base con antialias para suavizar bordes.
  const renderizador = new THREE.WebGLRenderer({ antialias: !esPantallaPequena, alpha: true, powerPreference: 'high-performance' });
  renderizador.setPixelRatio(Math.min(window.devicePixelRatio || 1, esPantallaPequena ? 1.25 : 1.75));
  renderizador.setSize(window.innerWidth, window.innerHeight);

  // Controles orbitales con movimiento suave y sin paneo lateral.
  const controles = new THREE.OrbitControls(camara, renderizador.domElement);
  controles.enableDamping = true;
  controles.dampingFactor = 0.05;
  controles.enablePan = false;
  controles.minDistance = 18;
  controles.maxDistance = 95;

  // Luz principal que resalta el núcleo y las fotos.
  const luzPrincipal = new THREE.PointLight(0xffffff, 2, 200);
  luzPrincipal.position.set(30, 30, 30);
  escena.add(luzPrincipal);

  // Luz ambiental para evitar sombras demasiado duras.
  const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.4);
  escena.add(luzAmbiente);

  return {
    escena,
    camara,
    renderizador,
    controles
  };
}

export function montarRenderizador(renderizador, contenedor = document.body) {
  // Inserta el canvas de Three.js en el documento.
  contenedor.appendChild(renderizador.domElement);
}

export function sincronizarViewport(camara, renderizador) {
  // Ajuste único de viewport para escritorio y móvil.
  camara.aspect = window.innerWidth / window.innerHeight;
  camara.updateProjectionMatrix();
  const esPantallaPequena = window.innerWidth <= 768;
  renderizador.setPixelRatio(Math.min(window.devicePixelRatio || 1, esPantallaPequena ? 1.25 : 1.75));
  renderizador.setSize(window.innerWidth, window.innerHeight);
}
