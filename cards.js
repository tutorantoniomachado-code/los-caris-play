/*
=========================================================
Los Caris Play
cards.js
Gestión de cartas
Alpha 0.1.2
=========================================================
*/

const Cards = (() => {

    let actions = [];
    let conditions = [];
    let places = [];

    async function loadJson(path) {

        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`No se pudo cargar ${path}`);
        }

        return await response.json();

    }

    async function load() {

        try {

            actions = await loadJson("data/actions.json");
            conditions = await loadJson("data/conditions.json");
            places = await loadJson("data/places.json");

            console.log("Cartas cargadas correctamente.");

        } catch (error) {

            console.error(error);

        }

    }

    function random(array) {

        return array[Math.floor(Math.random() * array.length)];

    }

    function getAction() {

        return random(actions);

    }

    function getCondition() {

        return random(conditions);

    }

    function getPlace() {

        return random(places);

    }

    return {

        load,
        getAction,
        getCondition,
        getPlace

    };

})();