/*
=========================================================
Los Caris Play
ui.js
Versión Alpha 0.1.1
Última revisión: 04/08/2026
=========================================================
*/

class UI {

    constructor() {

        this.timer = document.getElementById("timer");
        this.progress = document.getElementById("progressBar");

        this.action = document.getElementById("actionText");
        this.condition = document.getElementById("conditionText");

        this.timerPanel = document.querySelector(".timerPanel");

        this.pauseButton = document.getElementById("btnPause");

        this.audio = document.getElementById("soundEnd");

    }

    /*====================================================
        CARTAS
    ====================================================*/

    showAction(text) {

        this.animate(this.action);

        this.action.textContent = text;

    }

    showCondition(text) {

        this.animate(this.condition);

        this.condition.textContent = text;

    }

    animate(element){

        element.classList.remove("card-change");

        void element.offsetWidth;

        element.classList.add("card-change");

    }

    /*====================================================
        TEMPORIZADOR
    ====================================================*/

    updateTimer(seconds){

        const minutes = Math.floor(seconds / 60);

        const secs = seconds % 60;

        this.timer.textContent =
            String(minutes).padStart(2,"0") +
            ":" +
            String(secs).padStart(2,"0");

        this.updateTimerState(seconds);

    }

    updateProgress(percent){

        percent = Math.max(0,Math.min(100,percent));

        this.progress.style.width = percent + "%";

    }

    updateTimerState(seconds){

        this.timerPanel.classList.remove(

            "timer-warning",

            "timer-danger"

        );

        this.timer.classList.remove("timer-pulse");

        if(seconds<=30){

            this.timerPanel.classList.add("timer-danger");

            this.timer.classList.add("timer-pulse");

        }

        else if(seconds<=60){

            this.timerPanel.classList.add("timer-warning");

        }

    }

    /*====================================================
        BOTÓN PAUSA
    ====================================================*/

    setPauseState(running){

        if(!this.pauseButton) return;

        if(running){

            this.pauseButton.innerHTML="⏸<span>Pausa</span>";

        }

        else{

            this.pauseButton.innerHTML="▶<span>Continuar</span>";

        }

    }

    /*====================================================
        FIN DEL TIEMPO
    ====================================================*/

    finishRound(){

        this.timer.textContent="¡TIEMPO!";

        this.timer.classList.add("bounce");

        this.playSound();

        this.vibrate();

        setTimeout(()=>{

            this.timer.classList.remove("bounce");

        },700);

    }

    /*====================================================
        SONIDO
    ====================================================*/

    playSound(){

        if(!this.audio) return;

        this.audio.currentTime=0;

        this.audio.play().catch(()=>{

        });

    }

    /*====================================================
        VIBRACIÓN
    ====================================================*/

    vibrate(){

        if("vibrate" in navigator){

            navigator.vibrate([200,100,200]);

        }

    }

    /*====================================================
        RESET
    ====================================================*/

    reset(seconds){

        this.updateTimer(seconds);

        this.updateProgress(100);

        this.timer.classList.remove("timer-pulse");

        this.timerPanel.classList.remove(

            "timer-warning",

            "timer-danger"

        );

        this.setPauseState(true);

    }

}

const ui = new UI();

export default ui;