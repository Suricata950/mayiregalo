// Archivo: audio-manager.js
// Contiene: el gestor centralizado de audio.
// Se encarga de coordinar la melodía de fondo con las canciones de fotos y carta.

export class GestorAudio {
  constructor() {
    // Guarda el audio puntual que está sonando al interactuar con una foto o con la carta.
    this.sonidoActual = null;

    // Melodía ambiental permanente.
    this.musicaFondo = new Howl({ src: ['assets/audio/melodia.mp3'], loop: true, volume: 0.5 });

    // Estado auxiliar para el control de volumen y botones.
    this.volumenFondo = 0.5;
    this.fondoActivo = false;
    this.idFondo = null;
    this.alCambiarEstado = null;
    this.animacionActiva = null;
  }

  // Desvanece la melodía de fondo suavemente.
  _desvanecerFondo(volumenObjetivo, duracion, alCompletar) {
    if (this.animacionActiva) {
      this.animacionActiva.kill();
    }

    this.animacionActiva = gsap.to(this, {
      volumenFondo: volumenObjetivo,
      duration: duracion,
      onUpdate: () => {
        this.musicaFondo.volume(this.volumenFondo);
      },
      onComplete: () => {
        if (typeof alCompletar === 'function') {
          alCompletar();
        }
        this.animacionActiva = null;
      }
    });
  }

  // Notifica a la interfaz para actualizar los botones de audio.
  _notificarEstado() {
    if (typeof this.alCambiarEstado === 'function') {
      this.alCambiarEstado();
    }
  }

  playBackground() {
    this.musicaFondo.volume(this.volumenFondo);
    this.fondoActivo = true;
    this.idFondo = this.musicaFondo.play(this.idFondo || undefined);
    this._notificarEstado();
  }

  toggleBackground() {
    if (this.musicaFondo.playing(this.idFondo)) {
      this.musicaFondo.pause(this.idFondo);
      this.fondoActivo = false;
    } else {
      this.idFondo = this.musicaFondo.play(this.idFondo || undefined);
      this.fondoActivo = true;
      this._desvanecerFondo(0.5, 1, () => this._notificarEstado());
    }

    this._notificarEstado();
  }

  // Reproduce un audio interactivo y reduce la melodía de fondo.
  play(sonido) {
    if (this.sonidoActual && this.sonidoActual !== sonido) {
      this.sonidoActual.stop();
    }

    sonido.off('end');
    sonido.play();
    this.sonidoActual = sonido;

    this._desvanecerFondo(0.1, 1, () => {
      this.musicaFondo.pause(this.idFondo);
      this.fondoActivo = false;
      this._notificarEstado();
    });

    sonido.once('end', () => {
      this.idFondo = this.musicaFondo.play(this.idFondo || undefined);
      this.fondoActivo = true;
      this._desvanecerFondo(0.5, 1, () => this._notificarEstado());
    });

    this._notificarEstado();
  }

  // Reanuda un audio interactivo pausado.
  resume(sonido) {
    sonido.off('end');
    sonido.play();
    this.sonidoActual = sonido;

    this._desvanecerFondo(0.1, 1, () => {
      this.musicaFondo.pause(this.idFondo);
      this.fondoActivo = false;
      this._notificarEstado();
    });

    sonido.once('end', () => {
      this.idFondo = this.musicaFondo.play(this.idFondo || undefined);
      this.fondoActivo = true;
      this._desvanecerFondo(0.5, 1, () => this._notificarEstado());
    });

    this._notificarEstado();
  }

  pause() {
    if (this.sonidoActual && this.sonidoActual.playing()) {
      this.sonidoActual.pause();
      this.fondoActivo = true;
      this.musicaFondo.play();
      this._desvanecerFondo(0.5, 1, () => this._notificarEstado());
      this._notificarEstado();
    }
  }

  stop() {
    if (this.sonidoActual && this.sonidoActual.playing()) {
      this.sonidoActual.stop();
      this.sonidoActual = null;
      this._notificarEstado();
    }
  }
}

// Instancia compartida por toda la aplicación.
export const gestorAudio = new GestorAudio();
