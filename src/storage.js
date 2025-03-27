let defaultConfigs;  // Variável privada

export function setDefaultConfigs(root) {
    defaultConfigs = root;
}

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
