import {getButtons} from "../api/api";
import {changeTextAndColorRangeValue, toInteger} from "./support";
import {getDefaultConfig, getJson, getShadowRoot} from "../core/widget";
import {changeAdjustColorButton} from "../features/visual-adjustments";

// ******************** LOCAL STORAGE ********************//

export function setItemToLocalStorageWithExpiry(key, value, percentage, btnid, isRangeOrRadio) {

    const newDate = addDays(new Date(), 2);

    const item = {
        value: value,
        percentage: percentage,
        expiry: newDate.getTime(),
    }
    localStorage.setItem(key, JSON.stringify(item))
    if(btnid != null) {
        if(isRangeOrRadio){
            //RANGE
            localStorage.setItem(btnid, value);
        }else {
            //ACTIVATE
            localStorage.setItem(btnid, 1);
        }
    }
}

export function getItemFromLocalStorageWithExpiry(key) {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        removeItemFromLocalStorage(key);
        return null
    }
    return item;
}

export function removeItemFromLocalStorage(key, btnId) {
    localStorage.removeItem(key);
    if(btnId != null) {
        localStorage.setItem(btnId, 0);
    }
}

export function clearLocalStorage() {
    localStorage.clear();
    location.reload(true);
}

function addDays(date, days) {
    date.setDate(date.getDate() + days);
    return date;
}

export function needToLoadFuctions() {

    let key;

    for(let i = 1; i <= 30; i++) {
        key = 'ic_' + i;
        let item = localStorage.getItem(key);
        if(item != null && item !== "" && item !== "0") {
            return true;
        }
    }

    return false;

}


export function setInclooweState(chave, valor) {

    let defaultConfigs = getDefaultConfig();

    // Obtém o item 'inclooweState' do localStorage caso ja tenha sido alterado ou busca o padrão setado pro dominio
    let inclooweState = JSON.parse(localStorage.getItem('inclooweState')) ||
        {
            language: defaultConfigs.data.data[0].assinaturas.configuracoes.defaultLanguage,
            darkMode: defaultConfigs.data.data[0].assinaturas.configuracoes.defaultDarkMode,
            shortcutKeyboard: defaultConfigs.data.data[0].assinaturas.configuracoes.defaultShortcutKeyboard,
            position: defaultConfigs.data.data[0].assinaturas.configuracoes.defaultPosition,
            hideInterface: defaultConfigs.data.data[0].assinaturas.configuracoes.defaultHideInterface,
        };

    // Atualiza o valor da chave especificada
    inclooweState[chave] = valor;

    // Salva de volta no localStorage
    localStorage.setItem('inclooweState', JSON.stringify(inclooweState));
}

export function getInclooweState(chave) {

    // Recupera o estado atual ou usa o padrão se não existir
    const estadoAtual = JSON.parse(localStorage.getItem('inclooweState'));

    // Retorna o valor da chave especificada
    return estadoAtual != null ? estadoAtual[chave] : null;
}

export async function setLocalStoregeButtonsId() {

    let buttons = await getButtons();

    for (const btn of buttons) {

        let value = localStorage.getItem(btn.name);
        let shadowR = getShadowRoot();
        let json = getJson();

        if (value == null) {
            //SETA VALORES ZERADOS AO INICIAR
            localStorage.setItem(btn.name, 0);
        } else if (value == 1) {
            //SETA BOTÕES ACTIVATE
            let button = shadowR.querySelector('#' + btn.name);
            button.classList.add("btn-active"); // Ativa o botão clicado
            button.querySelector('small').textContent = json.switchOn;
        } else if (value.includes('%')) {
            let btnDiv = shadowR.querySelector('#' + btn.name);
            changeTextAndColorRangeValue(toInteger(value),
                btnDiv);

        } else if (value.includes('rgb')) {
            //ADJUST COLORS - RADIO
            let a;

            if (btn.description === 'Adjust Text Color') {
                a = 'adjustTextColor';
            } else if (btn.description === 'Adjust Title Color') {
                a = 'adjustTitleColor';
            } else if (btn.description === 'Adjust Background Color') {
                a = 'adjustBackgroundColor';
            }

            let btns = shadowR.querySelectorAll(`div[data-test=${a}]`)[0]
                .querySelectorAll('.color-pick');

            btns.forEach(button => {
                if (button.style.backgroundColor === value) {
                    changeAdjustColorButton(button, a)
                }
            });


        }

    }

}