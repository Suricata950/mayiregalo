// Archivo: media.js
// Contiene: configuración de fotos, carta flotante y clases de objetos interactivos.

export const fotosConfig = [
  {
    img: 'assets/images/foto1.png',
    audio: 'assets/audio/Nothing Like Us.mp3',
    mensajes: ['🌷 Desde que llegaste entendí nuestra conexión es expecial', '✨ Entre tantas canciones, terminamos creando algo que solo suena a nosotros.', '💖 Si esto se rompe, no sabría cómo volver a algo normal.'],
    messageClass: 'message-foto1'
  },
  {
    img: 'assets/images/foto2.png',
    audio: 'assets/audio/Spring Snow.mp3',
    mensajes: ['💜 Llegaste suavecito, sin hacer ruido… y terminaste cubriendo todo de ti.', '🌻​ Nunca vi venir lo mucho que ibas a florecer en mi vida', '💘​ Parecías casualidad, pero se siente como destino'],
    messageClass: 'message-foto2'
  },
  {
    img: 'assets/images/foto3.png',
    audio: 'assets/audio/I Wanna Be Yours.mp3',
    mensajes: ['🌟 No quiero ser dueño de nada, solo quiero ser parte de todo lo que te haga feliz.', '✨ Si pudiera elegir, siempre elegiría quedarme contigo.', '💫 No es obsesión… es que contigo todo tiene sentido.'],
    messageClass: 'message-foto3'
  },
  {
    img: 'assets/images/foto4.png',
    audio: 'assets/audio/Sweet Night.mp3',
    mensajes: ['💞​ Eres la calma que no sabía que necesitaba.', '🌹 Si pudiera escoger un lugar seguro, sería donde sea que estés tú.', '❤️‍🩹​ Contigo hasta el silencio se siente bonito.'],
    messageClass: 'message-foto4'
  },
  {
    img: 'assets/images/foto5.png',
    audio: 'assets/audio/Wave to Earth.mp3',
    mensajes: ['🕊️ Amarte se siente como respirar sin esfuerzo.', '🍃 No llegaste haciendo ruido, llegaste haciéndote un hogar.', '💞 Contigo las canciones de amor toman sentido.'],
    messageClass: 'message-foto5'
  },
  {
    img: 'assets/images/foto6.png',
    audio: 'assets/audio/Patadas de Ahogado.mp3',
    mensajes: ['🌼 Desde que dijiste "esta es nuestra canción", ya no pude escucharla sin pensar en ti.', '💫 Me regalaste una canción y sin darte cuenta me regalaste un recuerdo para siempre.', '💕 Si esta es nuestra canción, entonces quiero seguir ahogándome en todo lo que sea contigo.'],
    messageClass: 'message-foto6'
  },
  {
    img: 'assets/images/foto7.png',
    audio: 'assets/audio/Star See You in My 19th Life.mp3',
    mensajes: ['🎈 Fuiste entrando poquito a poquito hasta volverte la unica persona que quiero tener.', '🌺 Tus detalles me enamoran', '🌟 Entre tantas estrellas terminé mirando solo la tuya.'],
    messageClass: 'message-foto7'
  },
  {
    img: 'assets/images/foto8.png',
    audio: 'assets/audio/Yellow.mp3',
    mensajes: ['🌻 Le pusiste color a partes de mí que estaban en gris.', '🌈 Nuestro viaje de sueños', '💖 Tú haces que las cosas simples se sientan especiales.'],
    messageClass: 'message-foto8'
  },
  {
    img: 'assets/images/foto9.png',
    audio: 'assets/audio/This Side of Paradise.mp3',
    mensajes: ['🫂​ Si existe un lado bonito en todo esto, eres tú.', '​🎶​ No necesito otro paraíso si puedo quedarme en tus canciones.', '🌙 Eres mi inspiración'],
    messageClass: 'message-foto9'
  },
  {
    img: 'assets/images/foto10.png',
    audio: 'assets/audio/Tú Y Yo.mp3',
    mensajes: ['🌅 Entre tanta gente, terminamos encontrándonos tú y yo.', '​🎁​ Es tan bonito pensar que de todas las historias, estoy viviendo la mejor contigo.', '🌠 Mi parte favorita de todo esto siempre eres tú.'],
    messageClass: 'message-foto10'
  },
  {
    img: 'assets/images/foto11.png',
    audio: 'assets/audio/Seven.mp3',
    mensajes: ['🔥 Todavía me acuerdo del efecto que tuvo esta canción viniendo de ti…', '​🔞​ Creo que desde ahí entendí que sabías ponerme más que nervioso...', '🫶 Tienes una forma de decir cosas que me deja sonriendo como tonto.'],
    messageClass: 'message-foto11'
  },
  {
    img: 'assets/images/foto12.png',
    audio: 'assets/audio/Say Yes To Heaven.mp3',
    mensajes: ['​​❤️‍🔥​ Si se trata de ti, creo que mi respuesta siempre sería sí!', '​​🌈​ No importa cuánto necesites, estaré esperandote pacientemente.', '💘 Te amo sin medida'],
    messageClass: 'message-foto12'
  },
  {
    img: 'assets/images/foto13.png',
    audio: 'assets/audio/let the light in.mp3',
    mensajes: ['💡 Tu forma de estar ilumina más de lo que imaginas.', '🌟 Déjame quedarme donde tú iluminas.', '🚀 Abriste algo en mí que no sabía que estaba cerrado.'],
    messageClass: 'message-foto13'
  },
  {
    img: 'assets/images/foto14.png',
    audio: 'assets/audio/Never Not.mp3',
    mensajes: ['🌌 Estás incluso cuando no estás.', '💭 Escucho canciones y siento que inevitablemente llego a ti.', '✨ Siempre vuelvo a ti, aunque no me mueva.'],
    messageClass: 'message-foto14'
  },
  {
    img: 'assets/images/foto15.png',
    audio: 'assets/audio/hola me gustas.mp3',
    mensajes: ['😳 Todavía me gusta recordar que una vez esta canción fue mi forma de decirte lo que sentía.', '🎼 Quién diría que aquel "me gustas" me iba a llevar hasta aquí contigo.', '❤️ Todo empezó con algo tan simple… y terminó siendo tan importante.'],
    messageClass: 'message-foto15'
  },
  {
    img: 'assets/images/foto16.png',
    audio: 'assets/audio/My Love Mine All Mine.mp3',
    mensajes: ['🌙 Hay algo de mi amor que ya tiene tu nombre.', '💞 Quererte se volvió parte de mí.', '🌠 Si algo mío vale mucho, es todo lo que siento por ti.'],
    messageClass: 'message-foto16'
  },
  {
    img: 'assets/images/foto17.png',
    audio: 'assets/audio/Lee Hi.mp3',
    mensajes: ['💖 Entre todo lo bonito que tengo, tú sigues siendo mi favorita!', '💭 Nunca había sentido algo tan claro como lo que siento contigo!', '🌹 De alguna forma, mi corazón te reconoce primero a ti.'],
    messageClass: 'message-foto17'
  },
  {
    img: 'assets/images/foto18.png',
    audio: 'assets/audio/Sit Down Beside Me.mp3',
    mensajes: ['😊 Qué bonito sería tenerte aquí cerquita aunque no estemos haciendo nada.', '🪑 A veces solo quisiera sentarme contigo y quedarme ahí.', '💗 Te amodoro!'],
    messageClass: 'message-foto18'
  },
  {
    img: 'assets/images/foto19.png',
    audio: 'assets/audio/if its not you.mp3',
    mensajes: ['🌙 Si siento algo así, me alegra que sea por ti!', '🏠 Esta historia funciona solo contigo.', '🌸 Contigo siempre', '💖 Entre tantas posibilidades, qué suerte que seas tú!'],
    messageClass: 'message-foto19'
  },
  {
    img: 'assets/images/foto20.png',
    audio: 'assets/audio/Make It To Me.mp3',
    mensajes: ['🕊️ No sé qué nos espera, pero quiero seguir viviendo contigo!', '💫 Esta es mi canción favorita, no es proyectada, pero la vivo, te quierom Mayi', '🌺 Eres el significado de la canción!'],
    messageClass: 'message-foto20'
  },
  {
    img: 'assets/images/foto21.png',
    audio: 'assets/audio/I Love You 3000.mp3',
    mensajes: ['✨ Miles de estrellas para ti', '💍​ Quiero que seas mi esposa!', '🎆 Te amo en serio!”'],
    messageClass: 'message-foto21'
  },
  {
    img: 'assets/images/foto22.png',
    audio: 'assets/audio/pretty boy.mp3',
    mensajes: ['🌹 Para Mayi, mi inspiración', '💌 Lo bonito de ti va mucho más allá de lo evidente.', '🌟 Me gustas de formas que ni siquiera sé explicar.'],
    messageClass: 'message-foto22'
  },
  {
    img: 'assets/images/foto23.png',
    audio: 'assets/audio/FRI(END)S.mp3',
    mensajes: ['👀 Qué bueno que lo nuestro no se quedó en solo amistad.', '💜 Menos mal que lo que sentíamos quiso ir más allá.', '🫂 Nunca hubiera querido que te quedaras solo en "amiga"'],
    messageClass: 'message-foto23'
  },
  {
    img: 'assets/images/foto24.png',
    audio: 'assets/audio/Blue.mp3',
    mensajes: ['🌹 Si todo se vuelve azul, quédate conmigo.', '💌 Tienes esa forma bonita de hacer que todo pese menos.', '🌟 Eres mi razón'],
    messageClass: 'message-foto24'
  },
  {
    img: 'assets/images/foto25.png',
    audio: 'assets/audio/All nigths.mp3',
    mensajes: ['🌹 Dijiste que te sabías el baile... Me encantaría verte Mayi', '💌 La verdadera joya oculta eres tú', '🌟 Entonces... seguimos la fiesta toda la noche? jeje'],
    messageClass: 'message-foto24'
  }
];

export const cartaConfig = {
  img: 'assets/images/Cuy.gif',
  audio: 'assets/audio/Mayi.mp3',
  transmissionAudio: 'assets/audio/Nota_audio.mp3',
  transmissionButton: 'Escuchar transmisión',
  title: 'La pequeña cuy enfermera',
  subtitle: 'Una transmisión desde esta galaxia',
  body: [
    'Había una vez una pequeña cuy enfermera que vivía en un lugar donde las noches eran tranquilas y las estrellas apenas se notaban. Siempre llevaba curitas en la mochila, dulces en los bolsillos y una luz extraña en los ojos, como si hubiera nacido para cuidar a los demás incluso cuando nadie la cuidaba a ella. Tenía una manera muy especial de hacer sentir acompañadas a las personas, incluso desde lejos.',
    'Un día, sin embargo, su vida cambió de golpe. Había recibido una misión importante: tenía que viajar lejos. Tan lejos que ya no bastaban los caminos, el metro o los mapas. Tenía que irse al espacio.',
    'Tuvo que dejar atrás costumbres, rutinas y pedacitos de su vida que aún guardaban sueños por cumplir. Y aunque intentó mostrarse valiente al abordar aquella nave pequeñita, la verdad es que todo cambió después de eso. Los días comenzaron a sentirse distintos, las distancias crecieron y el tiempo empezó a comportarse raro: a veces corría demasiado rápido, a veces dolía demasiado lento.',
    'Ahora vivía entre estaciones espaciales frías y responsabilidades enormes. Había momentos donde el espacio se sentía demasiado pesado para alguien tan pequeña, porque a veces el universo no es amable con quienes más luz tienen. La pequeña cuy pasaba gran parte de sus días intentando mantener todo en orden: ayudando, resolviendo, cargando con más cosas de las que debería. Y aun así… seguía brillando. A veces cansadita, a veces en silencio, a veces escondiendo sus propias heridas mientras seguía intentando cuidar a todos los demás.',
    'Pero incluso desde tan lejos, la pequeña cuy nunca dejó de enviar señales hacia la Tierra. Las enviaba en forma de canciones, como curitas de luz que sanaban la distancia. Algunas eran suaves y cálidas, otras parecían abrazos disfrazados de melodías. Y había unas que guardaban tantos recuerdos, letras y emociones, que alguien desde la Tierra aprendió a quererlas muchísimo.',
    'En un pequeño rincón del planeta, había alguien observando el cielo todas las noches. Alguien que aprendió a reconocerla incluso a años luz de distancia. Porque, aunque el universo fuera enorme, siempre sabía cuál estrella pertenecía a ella: era la que más brillaba. Cada señal se sentía como una prueba de que la pequeña cuy seguía ahí arriba, atravesando el espacio sin apagarse del todo.',
    'Así que, noche tras noche, esa persona comenzó a dejar una radio encendida. No porque supiera exactamente cuándo llegaría una transmisión, sino porque tenía miedo de perderse alguna. A veces las señales aparecían de repente, pequeñitas, a veces cortas y otras largas: una canción nueva, un mensaje o un chisme del espacio. Y aunque algunas transmisiones duraban poco, eran suficientes para iluminar por completo aquel rincón del planeta.',
    'A veces pasaban días sin señales. A veces el universo entero parecía quedarse en silencio. Pero la radio siguió encendida, siempre, como un pequeño faro esperando verla aparecer otra vez entre las estrellas. Porque incluso cuando el universo parecía tragarse a la pequeña cuy entre responsabilidades, problemas y tormentas espaciales… ella seguía encontrando la manera de manifestarse.',
    'Y entonces ocurría. De pronto, una señal atravesaba el espacio, una pequeña aparición inesperada desde algún rincón lejano de la galaxia. Y todo volvía a sentirse un poquito más cerca.',
    'Claro… no todo fue sencillo. Hubo silencios largos, días cansados, momentos donde la galaxia parecía demasiado inmensa y la distancia demasiado injusta. Y mientras la pequeña cuy seguía atravesando lluvias de meteoros, vendiendo rolles con fresas, teniendo viajes tan cerca del sol que evaporaban hasta el sudor, responsabilidades infinitas, hasta incluso había veces en las que ayudaba a alienígenas en sus celebraciones, y tenía días complicados… en la Tierra había alguien mirando al cielo constantemente.',
    'Hubo veces donde deseó poder alcanzarla. Poder aparecer, aunque fuera unos minutos dentro de su nave espacial. Poder abrazarla cuando el universo se le hacía demasiado pesado. No para pedirle que regresara, sino para recordarle que, incluso a millones de kilómetros de distancia, seguía teniendo un lugar al cual pertenecer.',
    'Porque algunas personas no dejan de importarte solo porque estén lejos. Y ella… nunca dejó de importar. Por eso existe esta galaxia: porque algunas personas no deberían existir solamente en recuerdos o chats guardados. Algunas personas merecen universos enteros hechos para ellas.',
    'Cuando alguien cambia tu vida de maneras tan silenciosas y profundas, las palabras normales dejan de sentirse suficientes. Y este… es uno de esos universos. Uno lleno de canciones, momentos, de recuerdos, de pequeños mensajes escondidos, de estrellas que llevan su nombre, aunque nadie más lo sepa.',
    'Quizá la pequeña cuy enfermera todavía no alcanza a ver todo lo que provoca desde allá arriba. Pero aquí, en la Tierra, hay alguien que sigue admirando muchísimo la forma en que continúa brillando incluso en medio del espacio más difícil.',
    'Feliz cumpleaños, mi niña.',
    'Oh… espera un momento… parece que acaba de llegar una transmisión desde la Tierra…'
  ],
  scale: { x: 7.8, y: 4.4 }
};

export class FotoInteractiva {
  constructor(config, loader) {
    // Cada foto se representa como un sprite que carga su imagen y su audio.
    const texture = loader.load(config.img);
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    this.mesh = new THREE.Sprite(material);
    this.mesh.scale.set(1, 1 , 1);

    this.mesh.userData = {
      sound: new Howl({ src: [config.audio] }),
      mensajes: config.mensajes,
      index: 0,
      alturaBase: this.mesh.position.y,
      fase: Math.random() * Math.PI * 2,
      messageClass: config.messageClass || 'message-default'
    };
  }

  updateBounce() {
    this.mesh.position.y = this.mesh.userData.alturaBase +
      Math.sin(Date.now() * 0.001 + this.mesh.userData.fase) * 0.3;
  }

  showMessage() {
    // Muestra los mensajes de esa foto de forma circular.
    const mensajes = this.mesh.userData.mensajes;
    const index = this.mesh.userData.index;
    const mensajeActual = mensajes[index];

    const msg = document.createElement('div');
    msg.className = 'message';
    msg.classList.add(this.mesh.userData.messageClass);
    msg.innerText = mensajeActual;
    msg.style.left = Math.random()*window.innerWidth + 'px';
    msg.style.top = Math.random()*window.innerHeight/2 + 'px';
    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), 6500);

    this.mesh.userData.index = (index + 1) % mensajes.length;
  }

  playAudio(audioManager) {
    // Reproduce o reanuda el audio asociado a la foto.
    if (audioManager.sonidoActual === this.mesh.userData.sound) {
      if (!audioManager.sonidoActual.playing()) {
        audioManager.resume(this.mesh.userData.sound);
      }
    } else {
      audioManager.play(this.mesh.userData.sound);
    }
  }
}

export class CartaFlotanteInteractiva {
  constructor(config, loader) {
    // Objeto flotante independiente que abre la carta larga.
    const texture = loader.load(config.img);
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0
    });

    this.mesh = new THREE.Sprite(material);
    this.mesh.scale.set(config.scale?.x || 5.6, config.scale?.y || 5.6, 1);
    this.mesh.visible = false;

    this.mesh.userData = {
      sound: new Howl({ src: [config.audio] }),
      transmissionSound: new Howl({ src: [config.transmissionAudio || config.audio] }),
      transmissionButton: config.transmissionButton || 'Escuchar transmisión',
      title: config.title,
      subtitle: config.subtitle,
      body: config.body,
      baseScaleX: config.scale?.x || 5.6,
      baseScaleY: config.scale?.y || 5.6
    };
  }

  playAudio(audioManager) {
    // Reproduce o reanuda el audio asociado a la carta.
    if (audioManager.sonidoActual === this.mesh.userData.sound) {
      if (!audioManager.sonidoActual.playing()) {
        audioManager.resume(this.mesh.userData.sound);
      }
    } else {
      audioManager.play(this.mesh.userData.sound);
    }
  }
}

export { fotosConfig as configuracionFotos, cartaConfig as configuracionCarta };
