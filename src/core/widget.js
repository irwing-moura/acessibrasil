import widgetHtml from "../widget.html";
import {
    createStyleGlobal,
    setOriginalFontSizeOnLoading,
} from "../utils/support";
import {auth, getButtons, getContainers, getQueries} from "../api";
import {
    triggerFixedButtons,
    toggleExpandWindow,
    createDynamicButtons
} from "./components";
import {getItemFromLocalStorageWithExpiry, needToLoadFuctions, setLocalStoregeButtonsId} from "../utils/storage";
import {WIDGET_STATUS_KEY} from "./constants";
import {loadFeatures} from "../features/load-features";
import lottie from "lottie-web";
import {
    loadWidgetDarkMode,
    loadWidgetHideInterface,
    loadWidgetPosition,
    loadWidgetShortcutKeyboard
} from "../features/configuration";
import {initializeVlibras} from "../features/vlibras";

let shadowR;
let anim;
let buttons;
let containers;
let configsDefault;
let queries;

export async function init() {
    let widgetStatus = getItemFromLocalStorageWithExpiry(WIDGET_STATUS_KEY);

    initializeVlibras();

    if (widgetStatus === null) {
        configsDefault = await auth();

        //ACESSO PERMITIDO
        if(configsDefault) {

            // Get buttons and containers data first
            buttons = await getButtons();
            containers = await getContainers();
            queries = await getQueries();

            createWidget();
            createStyleGlobal();
            triggerFixedButtons();
            createDynamicButtons();
            setOriginalFontSizeOnLoading();
            loadWidgetPosition();
            loadWidgetDarkMode();
            loadWidgetHideInterface();
            loadWidgetShortcutKeyboard();

            if (needToLoadFuctions()) {
                if (document.readyState === 'complete') {
                    await setLocalStoregeButtonsId();
                    loadFeatures();
                } else {
                    window.addEventListener("load", async (event) => {
                        await setLocalStoregeButtonsId();
                        loadFeatures();
                    });
                }
            }
        }
    }
}

function createWidget() {

    let host = document.createElement('widget-ui');
    host.id = 'shadow';
    let shadowRoot = host.attachShadow({mode: 'open'});
    // let html = require('./widget.html');

    shadowRoot.innerHTML = widgetHtml; // Insere o HTML no shadowRoot
    document.body.appendChild(host);

    shadowR = document.getElementById("shadow").shadowRoot;

    let modalAppWindow = shadowR.querySelector('#appWindow');
    modalAppWindow.addEventListener('click', (event) => {
        if (event.target.id === 'appWindow') {
            toggleExpandWindow();
        }
    });

    // Add event listener for accessibility button
    let accessibilityButton = shadowR.querySelector('#accessibilityButton');
    accessibilityButton.addEventListener('click', () => {
        toggleExpandWindow();
        // if (anim) {
        //     anim.play();
        // }
    });

    // let path = require('./assets/svg/data.json');
    // anim = loadLottieAnimation(path);

    // // Inicia a primeira execução
    // animationInstance.play();

    // Agenda a repetição a cada 5 segundos
    // setInterval(() => {
    //     // animationInstance.stop(); // Reinicia a animação
    //     // animationInstance.play();
    //     anim.destroy();
    //     anim = loadLottieAnimation("data.json");
    // }, 15000); // 5000 ms = 5 segundos

    // animation.play();

    anim = loadLottieAnimation();

}

function loadLottieAnimation() {
    return lottie.loadAnimation({
        container: shadowR.querySelector('#accessibilityButton'),
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: require('../assets/svg/data.json'),
    });
}


export function getShadowRoot() {
    return shadowR;
}

export function getDefaultConfig() {
    return configsDefault;
}

export function getContainersLoaded() {
    return containers;
}

export function getQueriesLoaded() {
    return queries;
}

export function getAnimation() {
    return anim;
}