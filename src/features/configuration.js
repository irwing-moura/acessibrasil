import {getInclooweState, removeItemFromLocalStorage, setInclooweState} from "../utils/storage";
import {getDefaultConfig, getShadowRoot} from "../core/widget";

export function loadConfigurations() {
    loadWidgetPosition();
    loadWidgetDarkMode();
    loadWidgetHideInterface();
    loadWidgetShortcutKeyboard();
    loadWidgetLanguage();
}

function loadWidgetPosition() {
    let shadowR = getShadowRoot();
    let configsDefault = getDefaultConfig();
    let widget = shadowR.querySelector('#widget');
    let btnWidget = shadowR.querySelector('#accessibilityButton');

    let defaultPosition = configsDefault.data.data[0].assinaturas.configuracoes.defaultPosition;
    let selectedWidgetPosition = getInclooweState("position");

    if(selectedWidgetPosition === null || selectedWidgetPosition === undefined) {
        selectedWidgetPosition = defaultPosition;
    }

    let btns = shadowR.querySelectorAll('.dir');

    widget.classList.add(selectedWidgetPosition);
    btnWidget.classList.add(selectedWidgetPosition);

    if (selectedWidgetPosition === 'left') {
        btns[0].classList.add("active");
    } else {
        btns[1].classList.add("active");
    }


}

function loadWidgetDarkMode() {

    let shadowR = getShadowRoot();
    let configsDefault = getDefaultConfig();

    let defaultDarkMode = configsDefault.data.data[0].assinaturas.configuracoes.defaultDarkMode;
    let stateDarkMode = getInclooweState("darkMode");

    if(stateDarkMode === null || stateDarkMode === undefined) {
        stateDarkMode = defaultDarkMode;
    }


    shadowR.querySelector("#dM").checked = stateDarkMode != null ? stateDarkMode : false;
}

function loadWidgetHideInterface() {

    let shadowR = getShadowRoot();
    let configsDefault = getDefaultConfig();

    let defaultHideInterface = configsDefault.data.data[0].assinaturas.configuracoes.defaultHideInterface;
    let stateHideInterface = getInclooweState("hideInterface");

    if(stateHideInterface === null || stateHideInterface === undefined) {
        stateHideInterface = defaultHideInterface;
    }


    shadowR.querySelector("#hI").checked = stateHideInterface != null ? stateHideInterface : false;
}

function loadWidgetShortcutKeyboard() {

    let shadowR = getShadowRoot();
    let configsDefault = getDefaultConfig();

    let defaultShortcutKeyboard = configsDefault.data.data[0].assinaturas.configuracoes.defaultShortcutKeyboard;
    let stateShortcutKeyboard = getInclooweState("shortcutKeyboard");

    if(stateShortcutKeyboard === null || stateShortcutKeyboard === undefined) {
        stateShortcutKeyboard = defaultShortcutKeyboard;
    }


    shadowR.querySelector("#sK").checked = stateShortcutKeyboard != null ? stateShortcutKeyboard : false;
}

function loadWidgetLanguage() {

    let configsDefault = getDefaultConfig();
    let defaultLanguage = configsDefault.data.data[0].assinaturas.configuracoes.defaultLanguage;
    let language = getInclooweState("language"); // Defina o idioma que deseja buscar

    if(language === null || language === undefined) {
        language = defaultLanguage;
    }

    let shadowR = getShadowRoot();
    let btns = shadowR.querySelectorAll('.language-button');
    btns.forEach(button => {
        if(button.getAttribute("data-language") === language){
            button.classList.add("selected");
        }
    });
}

export function applyWidgetPosition(btnSelected) {

    let shadowR = getShadowRoot();


    if(btnSelected.classList.contains('active')) return;

    let widget = shadowR.querySelector('#widget');
    let btnWidget = shadowR.querySelector('#accessibilityButton');
    let selectedWidgetPosition;

    if (widget.classList.contains('right')) {
        selectedWidgetPosition = 'left';
        widget.classList.remove('right');
        widget.classList.add(selectedWidgetPosition);

        btnWidget.classList.remove('right');
        btnWidget.classList.add(selectedWidgetPosition);


    } else {
        selectedWidgetPosition = 'right';
        widget.classList.remove('left');
        widget.classList.add(selectedWidgetPosition);

        btnWidget.classList.remove('left');
        btnWidget.classList.add(selectedWidgetPosition);
    }

    btnSelected.parentElement.querySelector(".active")?.classList.remove('active');
    btnSelected.classList.add("active");

    setInclooweState("position", selectedWidgetPosition)

}

export function applyWidgetDarkMode() {
    let stateDarkMode = getInclooweState("darkMode");
    setInclooweState("darkMode", stateDarkMode != null ? !stateDarkMode : false);
}

export function applyWidgetHideInterface() {
    let stateHideInterface = getInclooweState("hideInterface");
    setInclooweState("hideInterface", stateHideInterface != null ? !stateHideInterface : false);

}

export function applyWidgetShortcutKeyboard() {
    let stateShortcutKeyboard = getInclooweState("shortcutKeyboard");
    setInclooweState("shortcutKeyboard", stateShortcutKeyboard != null ? !stateShortcutKeyboard : false);
}

export function applyWidgetLanguage(btn, lngSelected) {

    if(btn.classList.contains('selected')) return;

    let shadowR = getShadowRoot();
    let btns = shadowR.querySelectorAll('.language-button');
    btns.forEach(button => {
            button.classList.remove("selected");
    });

    btn.classList.add("selected");

    setInclooweState("language", lngSelected);
    // localStorage.setItem("justUpdatedLanguage", true);

    location.reload(true);
}