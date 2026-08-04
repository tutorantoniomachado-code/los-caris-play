/*
=========================================================
Los Caris Play
timer.js
Versión Alpha 0.1.1
Última revisión: 04/08/2026
=========================================================
*/

export default class Timer {

    constructor(seconds = 120) {

        this.total = seconds;
        this.remaining = seconds;

        this.interval = null;

        this.running = false;

        this.onTick = () => {};
        this.onFinish = () => {};

    }

    /*====================================================
        INICIAR
    ====================================================*/

    start(onTick = this.onTick, onFinish = this.onFinish) {

        if (this.running) return;

        this.onTick = onTick;
        this.onFinish = onFinish;

        this.running = true;

        this.interval = setInterval(() => {

            this.tick();

        }, 1000);

    }

    /*====================================================
        TICK
    ====================================================*/

    tick() {

        if (!this.running) return;

        if (this.remaining > 0) {

            this.remaining--;

            this.onTick(this.remaining);

        }

        if (this.remaining <= 0) {

            this.finish();

        }

    }

    /*====================================================
        PAUSAR
    ====================================================*/

    pause() {

        if (!this.running) return;

        clearInterval(this.interval);

        this.interval = null;

        this.running = false;

    }

    /*====================================================
        REANUDAR
    ====================================================*/

    resume() {

        if (this.running) return;

        this.start(this.onTick, this.onFinish);

    }

    /*====================================================
        ALTERNAR
    ====================================================*/

    toggle() {

        if (this.running) {

            this.pause();

        } else {

            this.resume();

        }

    }

    /*====================================================
        REINICIAR
    ====================================================*/

    reset(seconds = this.total) {

        clearInterval(this.interval);

        this.interval = null;

        this.running = false;

        this.total = seconds;
        this.remaining = seconds;

        this.onTick(this.remaining);

    }

    /*====================================================
        FINALIZAR
    ====================================================*/

    finish() {

        clearInterval(this.interval);

        this.interval = null;

        this.running = false;

        this.remaining = 0;

        this.onTick(0);

        this.onFinish();

    }

    /*====================================================
        CAMBIAR DURACIÓN
    ====================================================*/

    setDuration(seconds) {

        seconds = Number(seconds);

        if (isNaN(seconds)) return;

        if (seconds < 10) seconds = 10;

        this.total = seconds;
        this.remaining = seconds;

        this.onTick(this.remaining);

    }

    /*====================================================
        PORCENTAJE
    ====================================================*/

    percent() {

        if (this.total === 0) return 0;

        return (this.remaining / this.total) * 100;

    }

    /*====================================================
        CONSULTAS
    ====================================================*/

    isRunning() {

        return this.running;

    }

    getRemaining() {

        return this.remaining;

    }

    getTotal() {

        return this.total;

    }

}