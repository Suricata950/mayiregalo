// Archivo: effects.js
// Contiene: construcción visual y animación de la galaxia.
// Aquí viven las partículas, los tulipanes, las fotos, la carta flotante y el núcleo.

import { fotosConfig, FotoInteractiva, cartaConfig, CartaFlotanteInteractiva } from './media.js';
const { gsap } = window;


let galaxyParticles = [];
let galaxyTulips = [];
let galaxyFotos = [];
let cartaFlotante = null;
let galaxyGroup; // referencia global para animar
const fotoTargetScale = 1.32; // escala final visible de cada foto cuando la galaxia ya está formada
const tulipanTargetScale = 0.74; // escala base final de un tulipán normal
const esPantallaPequena = () => window.innerWidth <= 768;

export function createGalaxy(scene) {
  // Construye toda la galaxia y deja guardadas las referencias necesarias para animarla.
  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = esPantallaPequena() ? 38000 : 65000;
  const positions = [];
  const colors = [];
  const sizes = [];

  const numArms = 5; // número de brazos
  const armSeparation = (2 * Math.PI) / numArms;
  const maxRadius = 20; // límite de radio
  const thetaMax = 40; // límite de ángulo para la espiral

  // Paleta de colores tipo tulipán
  const tulipColors = [
    new THREE.Color(0xff0000), // rojo
    new THREE.Color(0xff69b4), // rosa
    new THREE.Color(0xffff00), // amarillo
    new THREE.Color(0xffffff), // blanco
    new THREE.Color(0x800080)  // morado
  ];

  for (let i = 0; i < particleCount; i++) {
    const armIndex = i % numArms;
    // theta aleatorio dentro del rango
    const theta = Math.random() * thetaMax;
    const a = 1.2;
    const b = 0.40;

    // radio limitado y concentrado
    const baseRadius = a * Math.exp(b * theta);

    // Si excede el radio máximo, lo descartamos
    if (baseRadius > maxRadius) continue;

    // const radius = Math.min(baseRadius, maxRadius);
    const radius = baseRadius;

    // Ángulo base del brazo
    let angle = -theta + armIndex * armSeparation;

    // Grosor lateral con distribución gaussiana
    const spreadFactor = Math.pow(1 - radius / maxRadius, 2) * 6; // cuadrático y más fuerte
    const lateralSpread = (Math.random() - 0.5) * spreadFactor;
    angle += lateralSpread;

    // Volumen vertical: más cerca del centro, más dispersión
    const ySpread = (1 - radius / maxRadius) * 2; 
    const y = (Math.random() - 0.5) * ySpread;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    positions.push(x, y, z);

    // Color aleatorio de la paleta
    const color = tulipColors[Math.floor(Math.random() * tulipColors.length)];
    colors.push(color.r, color.g, color.b);

    // Tamaño aleatorio por partícula
    sizes.push(Math.random() * 0.25 + 0.02); // entre 5 y 20 px
  }

  particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  particleGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

  const particleMaterial = new THREE.ShaderMaterial({
  vertexColors: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  uniforms: {
    sizeMultiplier: { value: 1.0 }
  },
  vertexShader: `
    attribute float size;
    varying vec3 vColor;
    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z) * 1.5; 
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    void main() {
      // Coordenadas del fragmento dentro del punto (0 a 1)
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);

      // Si está fuera del círculo, descartar
      if (dist > 0.5) discard;

      // Color de la partícula
      gl_FragColor = vec4(vColor, 1.0);
    }
  `
});

  // Grupo que contendrá todo
  galaxyGroup = new THREE.Group();
  scene.add(galaxyGroup);

  // Loader único
  const loader = new THREE.TextureLoader();
  cartaFlotante = new CartaFlotanteInteractiva(cartaConfig, loader);
  cartaFlotante.mesh.position.set(16, 7, -10);
  cartaFlotante.mesh.userData.floatOrbit = {
    radiusX: 16,
    radiusZ: 11,
    baseY: 7,
    amplitudeY: 2.8,
    phase: Math.random() * Math.PI * 2
  };
  scene.add(cartaFlotante.mesh);

  // Partículas
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  galaxyGroup.add(particles);
  particles.userData = {
    finalPositions: positions.slice() // guardar copia de posiciones finales
  };

  galaxyParticles.push(particles);

  // Tulipanes
  const tulipTextures = [
    loader.load('assets/images/tulipan_rojo.png'),
    loader.load('assets/images/tulipan_rosa.png'),
    loader.load('assets/images/tulipan_amarillo.png'),
    loader.load('assets/images/tulipan_blanco.png'),
    loader.load('assets/images/tulipan_morado.png')
  ];

  // Crear materiales para cada textura
  const tulipMaterials = tulipTextures.map(tex => new THREE.SpriteMaterial({ map: tex }));


  const tulipCount = esPantallaPequena() ? 62 : 86;
  for (let i = 0; i < tulipCount; i++) {
    const armIndex = i % numArms;
    const theta = i * 0.13;
    const a = 1.8;
    const b = .25;
    const baseRadius = a * Math.exp(b * theta);
    const radius = Math.min(baseRadius, maxRadius);

    const angle = theta + armIndex * armSeparation + (Math.random() - 0.5) * 0.3;

    const material = tulipMaterials[Math.floor(Math.random() * tulipMaterials.length)];
    const sprite = new THREE.Sprite(material);
    const isLargeTulip = Math.random() < 0.22;
    const finalScale = isLargeTulip
      ? 1.02 + Math.random() * 0.32
      : tulipanTargetScale + Math.random() * 0.12;

    sprite.scale.set(finalScale, finalScale, 1);
    sprite.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * (radius * 0.2),
      Math.sin(angle) * radius
    );

    // Guardar posición final ANTES de moverlos
    sprite.userData = {
      alturaBase: sprite.position.y,
      fase: Math.random() * Math.PI * 2,
      finalScale,
      finalPosition: {
        x: sprite.position.x,
        y: sprite.position.y,
        z: sprite.position.z
      }
    };

    // Posición inicial en el centro
    sprite.position.set(0,0,0);

    galaxyGroup.add(sprite);
    galaxyTulips.push(sprite);
  }


  // Fotos
  const fotoCount = fotosConfig.length;
  const fotoPlacements = [];
  const startTheta = 2.8; // ángulo inicial para evitar posiciones demasiado centrales
  const minDistanceBetweenFotos = 4; // distancia mínima para evitar que se encimen

  // Helper para comprobar si una nueva posición está suficientemente lejos
  const isFarEnoughFromOthers = (position, existingPlacements) => {
    return existingPlacements.every(existing => {
      const dx = existing.x - position.x;
      const dy = existing.y - position.y;
      const dz = existing.z - position.z;
      const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
      return distance >= minDistanceBetweenFotos;
    });
  };

  // Dividir la galaxia en zonas para mejor distribución
  const minDistanceFromCore = 3.5; // evita colocarse muy cerca del núcleo
  const zones = [
    { name: 'center', radiusMin: minDistanceFromCore, radiusMax: minDistanceFromCore + 2, count: Math.ceil(fotoCount * 0.15) }, // fotos cerca del núcleo sin encimarse
    { name: 'innerArms', radiusMin: minDistanceFromCore + 2, radiusMax: 8, count: Math.ceil(fotoCount * 0.35) }, // brazos internos
    { name: 'outerArms', radiusMin: 8, radiusMax: maxRadius, count: fotoCount - Math.ceil(fotoCount * 0.15) - Math.ceil(fotoCount * 0.35) } // brazos externos
  ];

  zones.forEach(zone => {
    const zonePlacements = [];
    let attempts = 0;
    const maxAttempts = zone.count * 20; // límite de intentos para evitar loops infinitos

    while (zonePlacements.length < zone.count && attempts < maxAttempts) {
      let placement;
      const theta = startTheta + (Math.random() * 20) + (Math.random() - 0.5) * 0.8;
      const radius = zone.radiusMin + Math.random() * (zone.radiusMax - zone.radiusMin);
      const angle = theta + (Math.floor(Math.random() * numArms) * armSeparation) + (Math.random() - 0.5) * (zone.name === 'center' ? 2 : 0.6);
      const verticalSpread = (Math.random() - 0.5) * (radius * 0.45); // mayor separación vertical

      placement = {
        x: Math.cos(angle) * radius,
        y: verticalSpread,
        z: Math.sin(angle) * radius
      };

      if (isFarEnoughFromOthers(placement, zonePlacements)) {
        zonePlacements.push(placement);
      }
      attempts++;
    }

    // Mezclar dentro de la zona
    for (let i = zonePlacements.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [zonePlacements[i], zonePlacements[j]] = [zonePlacements[j], zonePlacements[i]];
    }

    fotoPlacements.push(...zonePlacements);
  });

  // Ajuste final: verificar distancias globales y ajustar si es necesario
  for (let i = 0; i < fotoPlacements.length; i++) {
    let tries = 0;
    while (!isFarEnoughFromOthers(fotoPlacements[i], fotoPlacements.slice(0, i).concat(fotoPlacements.slice(i+1))) && tries < 5) {
      // Pequeño ajuste aleatorio si está demasiado cerca
      fotoPlacements[i].x += (Math.random() - 0.5) * 0.5;
      fotoPlacements[i].y += (Math.random() - 0.5) * 0.5;
      fotoPlacements[i].z += (Math.random() - 0.5) * 0.5;
      tries++;
    }
  }

  // Mezcla global final
  for (let i = fotoPlacements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fotoPlacements[i], fotoPlacements[j]] = [fotoPlacements[j], fotoPlacements[i]];
  }

  fotosConfig.forEach((config, index) => {
    const foto = new FotoInteractiva(config, loader);
    const placement = fotoPlacements[index];

    // Guardar la posición final de la foto para animación y rebote.
    foto.mesh.userData.finalPosition = {
      x: placement.x,
      y: placement.y,
      z: placement.z
    };
    foto.mesh.userData.alturaBase = placement.y;
    foto.mesh.userData.fase = Math.random() * Math.PI * 2;

    // Empezar desde el centro y luego animar hacia el lugar final.
    foto.mesh.position.set(0, 0, 0);

    // Escala base de la foto: debe coincidir con la escala final de la animación.
    foto.mesh.scale.set(fotoTargetScale, fotoTargetScale, 1);

    galaxyGroup.add(foto.mesh);
    galaxyFotos.push(foto);
  });

  galaxyGroup.rotation.x = Math.PI / 6;
  galaxyGroup.rotation.z = Math.PI / 12;
  galaxyGroup.scale.set(0.01, 0.01, 0.01); // inicio muy pequeño


  // galaxyGroup.scale.set(3, 3, 3);

}

// Animación Big Bang
export function bigBang(onComplete = null) {
  // Lanza la gran expansión y devuelve todos los elementos a su forma final.
  // Escala global del grupo (explosión inicial)
  gsap.fromTo(galaxyGroup.scale,
    { x:0.01, y:0.01, z:0.01 },
    { x:3, y:3, z:3, duration:4, ease:"power4.out" } // 👈 más lento
  );

  // Fotos
  galaxyFotos.forEach(f => {
    const delay = Math.random() * 2.5; // 👈 regreso aleatorio
    const tl = gsap.timeline({ delay });

    // Fase 1: dispersión caótica (más lenta)
    tl.to(f.mesh.position, {
      x: (Math.random()-0.5) * 250,
      y: (Math.random()-0.5) * 250,
      z: (Math.random()-0.5) * 250,
      duration: 6, // 👈 más lento
      ease: "power2.out"
    });

    // Fase 2: regreso ordenado (más lento)
    tl.to(f.mesh.position, {
      x: f.mesh.userData.finalPosition.x,
      y: f.mesh.userData.finalPosition.y,
      z: f.mesh.userData.finalPosition.z,
      duration: 3, // 👈 regreso más lento
      ease: "power4.inOut"
    });

    // Animación de escala: arranca pequeña y termina en la escala final definida.
    gsap.fromTo(f.mesh.scale, { x:0.1, y:0.1 }, {
      x:fotoTargetScale, y:fotoTargetScale, duration:4, ease:"back.out(1.7)", delay:delay+3
    });
  });

  // Tulipanes
  galaxyTulips.forEach(t => {
    const delay = Math.random() * 2.5;
    const tl = gsap.timeline({ delay });

    tl.to(t.position, {
      x: (Math.random()-0.5) * 250,
      y: (Math.random()-0.5) * 250,
      z: (Math.random()-0.5) * 250,
      duration: 2, // 👈 más lento
      ease: "power2.out"
    });

    tl.to(t.position, {
      x: t.userData.finalPosition.x,
      y: t.userData.finalPosition.y,
      z: t.userData.finalPosition.z,
      duration: 4, // 👈 regreso más lento
      ease: "power4.inOut",
      onComplete: () => {
        t.userData.alturaBase = t.position.y;
      }
    });

    gsap.fromTo(t.scale, { x:0.1, y:0.1 }, {
      x:t.userData.finalScale, y:t.userData.finalScale, duration:4, ease:"back.out(1.7)", delay:delay+3
    });
  });

  // Partículas de la galaxia
  galaxyParticles.forEach(p => {
    const positions = p.geometry.attributes.position.array;
    const finalPositions = p.userData.finalPositions;

    // Fase 1: dispersión caótica animada
    for (let i = 0; i < positions.length; i += 3) {
      const targetX = (Math.random()-0.5) * 250;
      const targetY = (Math.random()-0.5) * 250;
      const targetZ = (Math.random()-0.5) * 250;

      gsap.to(positions, {
        [i]: targetX,
        [i+1]: targetY,
        [i+2]: targetZ,
        duration: 8, // 👈 dispersión más lenta
        ease: "power2.out",
        onUpdate: () => {
          p.geometry.attributes.position.needsUpdate = true;
        }
      });
    }

    // Fase 2: regreso ordenado con delays aleatorios
    for (let i = 0; i < positions.length; i += 3) {
      const delay = Math.random() * 2.5;
      gsap.to(positions, {
        [i]: finalPositions[i],
        [i+1]: finalPositions[i+1],
        [i+2]: finalPositions[i+2],
        duration: 10, // 👈 regreso más lento
        ease: "power4.inOut",
        delay,
        onUpdate: () => {
          p.geometry.attributes.position.needsUpdate = true;
        }
      });
    }
  });
  
  // Llamar onComplete después de que termine la animación (aprox 15s)
  gsap.delayedCall(10, () => {
    revealCartaFlotante();
    if (onComplete) {
      onComplete();
    }
  });
}

export function animarGalaxy() {
  // Movimiento continuo de la galaxia ya formada.
  galaxyGroup.rotation.y -= 0.0005;

  galaxyTulips.forEach(t => {
    t.position.y = t.userData.alturaBase +
      Math.sin(Date.now() * 0.001 + t.userData.fase) * 0.2;
  });

  galaxyFotos.forEach(f => {
    f.mesh.position.y = f.mesh.userData.alturaBase +
      Math.sin(Date.now() * 0.001 + f.mesh.userData.fase) * 0.3;
  });

  if (cartaFlotante && cartaFlotante.mesh.visible) {
    const orbit = cartaFlotante.mesh.userData.floatOrbit;
    const time = Date.now() * 0.00018;
    const pulse = 1 + Math.sin(time * 2.2 + orbit.phase) * 0.04;

    cartaFlotante.mesh.position.x = Math.cos(time + orbit.phase) * orbit.radiusX;
    cartaFlotante.mesh.position.z = Math.sin(time * 1.2 + orbit.phase * 0.6) * orbit.radiusZ;
    cartaFlotante.mesh.position.y = orbit.baseY + Math.sin(time * 1.8 + orbit.phase) * orbit.amplitudeY;
    cartaFlotante.mesh.material.rotation = Math.sin(time * 1.6 + orbit.phase) * 0.08;
    cartaFlotante.mesh.scale.x = cartaFlotante.mesh.userData.baseScaleX * pulse;
    cartaFlotante.mesh.scale.y = cartaFlotante.mesh.userData.baseScaleY * pulse;
  }
}

export function revealCartaFlotante() {
  // Hace aparecer la carta flotante cuando termina la secuencia principal.
  if (!cartaFlotante || cartaFlotante.mesh.visible) {
    return;
  }

  cartaFlotante.mesh.visible = true;
  gsap.fromTo(cartaFlotante.mesh.material,
    { opacity: 0 },
    { opacity: 0.98, duration: 1.4, ease: 'power2.out' }
  );
  gsap.fromTo(cartaFlotante.mesh.scale,
    {
      x: cartaFlotante.mesh.userData.baseScaleX * 0.35,
      y: cartaFlotante.mesh.userData.baseScaleY * 0.35,
      z: 1
    },
    {
      x: cartaFlotante.mesh.userData.baseScaleX,
      y: cartaFlotante.mesh.userData.baseScaleY,
      z: 1,
      duration: 1.8,
      ease: 'back.out(1.7)'
    }
  );
}

export function createStars(scene) {
  // Campo exterior de estrellas que rodea la escena.
  const starGroup = new THREE.Group();
  const starCount = 1500;

  for (let i = 0; i < starCount; i++) {
    const starGeometry = new THREE.BufferGeometry();
    const positions = [];
    const x = (Math.random() - 0.5) * 120;
    const y = (Math.random() - 0.5) * 120;
    const z = (Math.random() - 0.5) * 120;
    positions.push(x, y, z);
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15 + Math.random() * 0.1,
      transparent: true,
      opacity: 0.6 + Math.random() * 0.4,
      depthWrite: false
    });

    const star = new THREE.Points(starGeometry, starMaterial);
    star.userData.phase = Math.random() * Math.PI * 2;
    star.userData.speed = 0.003 + Math.random() * 0.002;
    starGroup.add(star);
  }

  scene.add(starGroup);
  return starGroup;
}

export function createCore(scene) {
  // Núcleo en forma de corazón que activa la secuencia principal.
  // Función auxiliar para el contorno simétrico del corazón
  function heartShapePoints() {
    const shape = new THREE.Shape();
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
      if (i === 0) {
        shape.moveTo(x * 0.05, y * 0.05);
      } else {
        shape.lineTo(x * 0.05, y * 0.05);
      }
    }
    return shape;
  }

  // Crear forma simétrica del corazón
  const heartShape = heartShapePoints();

  const extrudeSettings = {
    depth: 4,
    bevelEnabled: false,
    bevelSegments: 8,
    steps: 2,
    bevelSize: 1.0,
    bevelThickness: 1.0
  };

  let geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  geometry.center();

  // Material brillante y emotivo
  const material = new THREE.MeshPhongMaterial({
    color: 0xff3366,
    emissive: 0xaa0033,
    shininess: 220,
    specular: 0xffffff,
    side: THREE.FrontSide
  });

  // Mesh del núcleo
  const core = new THREE.Mesh(geometry, material);
  core.scale.set(3, 3, 0.5);
  core.position.set(0, 0, 0);

  core.userData.isCore = true;
  scene.add(core);

  // Halo luminoso
  const haloTexture = new THREE.TextureLoader().load('assets/images/halo.png');
  const haloMaterial = new THREE.SpriteMaterial({
    map: haloTexture,
    color: 0xff99ff,
    transparent: true,
    opacity: 0.6
  });
  const halo = new THREE.Sprite(haloMaterial);
  halo.scale.set(5, 5, 1);
  core.add(halo);

  return core;
}


export {
  galaxyFotos,
  cartaFlotante,
  createGalaxy as crearGalaxia,
  bigBang as granExplosion,
  animarGalaxy as animarGalaxia,
  createStars as crearEstrellas,
  createCore as crearNucleo,
  galaxyFotos as fotosGalaxia
};
