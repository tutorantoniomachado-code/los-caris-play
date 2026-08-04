/*
=========================================================
Los Caris Play
app.js
Versión Alpha 0.1.1
Última revisión: 04/08/2026
=========================================================
*/

import UI from "./ui.js";
import Timer from "./timer.js";

/*=========================================================
    DATOS DEL JUEGO
=========================================================*/

const ACTIONS = [

    "Besar",

    "Acariciar",

    "Masajear",

    "Sin las manos",

    "Lamer",

    "Chupar",

    "Libre",

];

const CONDITIONS = [

    "Con los ojos cerrados",

    "Muy despacio",

    "Sin utilizar las manos",

    "De espaldas",

    "Sin hablar",

   "Solo con la boca",

    "Solo con las manos",

    "Libre",

];

/*=========================================================
    APLICACIÓN
=========================================================*/

class App {

    constructor() {

        /*-----------------------------------------------
            Datos
        -----------------------------------------------*/

        this.actions = ACTIONS;

        this.conditions = CONDITIONS;

        this.lastAction = -1;

        this.lastCondition = -1;

        /*-----------------------------------------------
            Configuración
        -----------------------------------------------*/

        this.settings = {

            longTime: 120,

            sound: true,

            vibration: true

        };

        /*-----------------------------------------------
            Temporizador
        -----------------------------------------------*/

        this.timer = new Timer(this.settings.longTime);

        /*-----------------------------------------------
            Inicio
        -----------------------------------------------*/

        this.init();

    }

    /*=================================================
        INICIO
    =================================================*/

    init() {

        this.showSplash();

        this.loadSettings();

        this.registerEvents();

        this.newRound();

        UI.reset(this.timer.getRemaining());

    }
        /*=================================================
        SPLASH
    =================================================*/

    showSplash() {

        const splash = document.getElementById("splash");
        const app = document.getElementById("app");

        setTimeout(() => {

            splash.classList.add("fade-out");

            setTimeout(() => {

                splash.remove();

                app.classList.remove("hidden");

                app.classList.add("fade-in");

            }, 400);

        }, 1500);

    }

    /*=================================================
        EVENTOS
    =================================================*/

    registerEvents() {

        /*-----------------------------------------
            INICIAR
        -----------------------------------------*/

        document
            .getElementById("btnStart")
            .addEventListener("click", () => {

                this.startGame();

            });

        /*-----------------------------------------
            PAUSA
        -----------------------------------------*/

        document
            .getElementById("btnPause")
            .addEventListener("click", () => {

                this.togglePause();

            });

        /*-----------------------------------------
            REINICIAR
        -----------------------------------------*/

        document
            .getElementById("btnReset")
            .addEventListener("click", () => {

                this.resetGame();

            });

        /*-----------------------------------------
            CONFIGURACIÓN
        -----------------------------------------*/

        document
            .getElementById("btnSettings")
            .addEventListener("click", () => {

                document
                    .getElementById("settingsDialog")
                    .showModal();

            });

        /*-----------------------------------------
            CANCELAR
        -----------------------------------------*/

        document
            .getElementById("btnCancelSettings")
            .addEventListener("click", () => {

                document
                    .getElementById("settingsDialog")
                    .close();

            });

        /*-----------------------------------------
            GUARDAR AJUSTES
        -----------------------------------------*/

        document
            .getElementById("settingsForm")
            .addEventListener("submit", (event) => {

                event.preventDefault();

                this.saveSettings();

            });

    }

    /*=================================================
        AJUSTES
    =================================================*/

    loadSettings() {

        const saved = localStorage.getItem("loscarisplay");

        if (!saved) {

            return;

        }

        this.settings = JSON.parse(saved);

        this.timer.setDuration(this.settings.longTime);

        document.getElementById("longTime").value =
            this.settings.longTime;

        document.getElementById("enableSound").checked =
            this.settings.sound;

        document.getElementById("enableVibration").checked =
            this.settings.vibration;

    }

    saveSettings() {

        this.settings.longTime = Number(

            document.getElementById("longTime").value

        );

        this.settings.sound =

            document.getElementById("enableSound").checked;

        this.settings.vibration =

            document.getElementById("enableVibration").checked;

        localStorage.setItem(

            "loscarisplay",

            JSON.stringify(this.settings)

        );

        this.timer.setDuration(

            this.settings.longTime

        );

        UI.reset(

            this.timer.getRemaining()

        );

        document
            .getElementById("settingsDialog")
            .close();

    }

    /*=================================================
        BOTONES
    =================================================*/

    startGame() {

        this.timer.start(

            (time) => {

                UI.updateTimer(time);

                UI.updateProgress(

                    this.timer.percent()

                );

            },

            () => {

                UI.finishRound();

                setTimeout(() => {

                    this.newRound();

                    this.timer.reset();

                    UI.reset(

                        this.timer.getRemaining()

                    );

                }, 1500);

            }

        );

        UI.setPauseState(true);

    }

    togglePause() {

        this.timer.toggle();

        UI.setPauseState(

            this.timer.isRunning()

        );

    }

    resetGame() {

        this.timer.reset();

        UI.reset(

            this.timer.getRemaining()

        );

        this.newRound();

    }
        /*=================================================
        NUEVA RONDA
    =================================================*/

    newRound() {

        const action = this.getRandomAction();

        const condition = this.getRandomCondition();

        UI.showAction(action);

        UI.showCondition(condition);

    }

    /*=================================================
        ACCIÓN ALEATORIA
    =================================================*/

    getRandomAction() {

        if (this.actions.length === 0) {

            return "";

        }

        let index;

        do {

            index = Math.floor(

                Math.random() * this.actions.length

            );

        }

        while (

            this.actions.length > 1 &&

            index === this.lastAction

        );

        this.lastAction = index;

        return this.actions[index];

    }

    /*=================================================
        CONDICIÓN ALEATORIA
    =================================================*/

    getRandomCondition() {

        if (this.conditions.length === 0) {

            return "";

        }

        let index;

        do {

            index = Math.floor(

                Math.random() * this.conditions.length

            );

        }

        while (

            this.conditions.length > 1 &&

            index === this.lastCondition

        );

        this.lastCondition = index;

        return this.conditions[index];

    }

    /*=================================================
        SIGUIENTE RETO
    =================================================*/

    nextRound() {

        this.timer.reset(

            this.settings.longTime

        );

        UI.reset(

            this.timer.getRemaining()

        );

        this.newRound();

    }

    /*=================================================
        UTILIDADES
    =================================================*/

    getSettings() {

        return {

            ...this.settings

        };

    }

    setLongTime(seconds) {

        seconds = Number(seconds);

        if (Number.isNaN(seconds)) {

            return;

        }

        if (seconds < 10) {

            seconds = 10;

        }

        this.settings.longTime = seconds;

        this.timer.setDuration(seconds);

        UI.reset(

            this.timer.getRemaining()

        );

    }

    isRunning() {

        return this.timer.isRunning();

    }

    getRemainingTime() {

        return this.timer.getRemaining();

    }

    getProgress() {

        return this.timer.percent();

    }
        /*=================================================
        DEPURACIÓN
    =================================================*/

    debug() {

        console.group("Los Caris Play");

        console.log("Versión:", "Alpha 0.1.1");

        console.log("Tiempo:", this.settings.longTime);

        console.log("Temporizador activo:", this.timer.isRunning());

        console.log("Tiempo restante:", this.timer.getRemaining());

        console.groupEnd();

    }

}

/*=========================================================
    INICIALIZACIÓN
=========================================================*/

window.addEventListener("DOMContentLoaded", () => {

    const app = new App();

    window.LosCarisPlay = app;

});