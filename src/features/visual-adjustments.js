import {
    getItemFromLocalStorageWithExpiry,
    removeItemFromLocalStorage,
    setItemToLocalStorageWithExpiry
} from "../utils/storage";
import {
    ADJUST_BACKGROUND_COLOR_KEY, ADJUST_TEXT_COLOR_KEY,
    ADJUST_TITLE_COLOR_KEY,
    COLORS_CONTRAST_KEY, COLORS_SATURATION_KEY,
    DALTONISM_FILTER_KEY, ZOOM_KEY
} from "../core/constants";
import {calculateZoomPercentageInPixels, changeStyleButtonSelectedAndDeselectOthers} from "../utils/support";
import {getFirstChildElementsBelowBody} from "../queries";
import {getQueriesLoaded, getShadowRoot} from "../core/widget";
import {toggleExpandWindow} from "../core/components";

let colorsContrast = getItemFromLocalStorageWithExpiry(COLORS_CONTRAST_KEY);
let colorsSaturation = getItemFromLocalStorageWithExpiry(COLORS_SATURATION_KEY);
let adjustTextColor = getItemFromLocalStorageWithExpiry(ADJUST_TEXT_COLOR_KEY);
let adjustTitleColor = getItemFromLocalStorageWithExpiry(ADJUST_TITLE_COLOR_KEY);
let adjustBackgroundColor = getItemFromLocalStorageWithExpiry(ADJUST_BACKGROUND_COLOR_KEY);
let daltonismFilter = getItemFromLocalStorageWithExpiry(DALTONISM_FILTER_KEY);
let currentZoom = getItemFromLocalStorageWithExpiry(ZOOM_KEY);


//COLORS CONTRAST
let contrasts = ['', 'inverted', 'int-inverted', 'light', 'dark', 'high'];
let indexActualColorContrast = colorsContrast != null ? colorsContrast.value : colorsContrast;

//COLORS SATURATION
let saturations = ['', 'high', 'low', 'mono'];
let indexActualColorSaturation = colorsSaturation != null ? colorsSaturation.value : colorsSaturation;

//DALTONISM FILTERS
let daltonisms = ['', 'protanomaly', 'deuteranomaly', 'tritanomaly'];
let indexActualDaltonismFilter = daltonismFilter != null ? daltonismFilter.value : daltonismFilter;


export function loadContrastColors() {
    if (colorsContrast != null) {
        setColorContrast();
    }
}

export function loadSaturationColors() {
    if (colorsSaturation != null) {
        setColorSaturation();
    }
}

export function loadTextColor() {

    if (adjustTextColor != null) {
        changeAdjustColorValue('adjustTextColor', adjustTextColor.value);
    }

}

export function loadTitleColor() {

    if (adjustTitleColor != null) {
        changeAdjustColorValue('adjustTitleColor', adjustTitleColor.value);
    }
}

export function loadBackgroundColor() {

    if (adjustBackgroundColor != null) {
        changeAdjustColorValue('adjustBackgroundColor', adjustBackgroundColor.value);
    }

}

export function loadDaltonismFilter() {
    if (daltonismFilter != null) {
        setDaltonismFilter();
    }
}

export function loadContentScaling() {
    if (currentZoom !== null) {
        let percentage = parseFloat(currentZoom.value.replace('%', ''));
        applyContentScaling(percentage);
    }
}


export function applyColorContrast(contrast, btn) {

    let colorContrastSaved = getItemFromLocalStorageWithExpiry(COLORS_CONTRAST_KEY);

    if (colorContrastSaved !== null && colorContrastSaved.value === contrast) {
        indexActualColorContrast = 0;
    } else {
        indexActualColorContrast = contrast;
    }

    setColorContrast();
    changeStyleButtonSelectedAndDeselectOthers(btn, COLORS_CONTRAST_KEY);

    if (indexActualColorContrast === 0) {
        removeItemFromLocalStorage(COLORS_CONTRAST_KEY, btn.id);
    } else {
        setItemToLocalStorageWithExpiry(COLORS_CONTRAST_KEY,
            indexActualColorContrast,
            null,
            btn.id);
    }

}

function setColorContrast() {

    const filterStyle = document.getElementById('filter-incloowe');
    let shadowR = getShadowRoot();
    let queries = getQueriesLoaded();
    let html = document.activeElement.parentElement;

    if (indexActualColorContrast !== null) {
        let queryContrast = queries[6]?.value;
        let queryButtons = queries[2]?.value;
        const selectedColorContrast = contrasts[indexActualColorContrast];
        const txtTags = document.querySelectorAll(queryContrast);
        const buttons = document.querySelectorAll(queryButtons);

        const removeContrastClasses = () => {

            filterStyle.innerHTML = '';

            txtTags.forEach(txtTag => {
                txtTag.classList.remove("light-contrast", "dark-contrast");
            });
            buttons.forEach(button => {
                button.classList.remove("light-contrast", "dark-contrast");
            });
        };


        html.classList.remove("inverted", "dark-contrast", "light-contrast");
        removeContrastClasses();

        let widget = shadowR.querySelector('#widget');

        switch (selectedColorContrast) {
            case 'inverted':
                filterStyle.innerHTML = 'body > *:not(#shadow) { filter: invert(100%) !important; background: #fff !important; }';
                widget.style.filter = 'invert(100%)';
                widget.style.background = '#fff';
                break;
            case 'int-inverted':
                filterStyle.innerHTML = 'body > *:not(#shadow):not(img):not(video):not(iframe):not(picture):not(svg)' +
                    ' { filter: invert(100%) !important; background: #fff !important; }';
                widget.style.filter = 'invert(100%)';
                widget.style.background = '#fff';

                break;
            case 'light':
                filterStyle.innerHTML = 'body > *:not(#shadow) { background-color: #fff !important; color: #181818 !important; }';
                widget.style.filter = '';
                widget.style.color = '#181818';
                widget.style.background = '#fff';

                txtTags.forEach(txtTag => txtTag.classList.add("light-contrast"));
                buttons.forEach(button => button.classList.add("light-contrast"));

                break;
            case 'dark':
                filterStyle.innerHTML = 'body > *:not(#shadow) { background-color: #181818 !important; color: #fff !important; }';
                widget.style.filter = '';
                widget.style.color = '#fff';
                widget.style.background = '#181818';

                txtTags.forEach(txtTag => txtTag.classList.add("dark-contrast"));
                buttons.forEach(button => button.classList.add("dark-contrast"));
                break;
            case 'high':
                removeContrastClasses();
                filterStyle.innerHTML = 'body > *:not(#shadow) { filter: contrast(135%) !important; }';
                widget.style.filter = 'contrast(135%)';
                widget.style.color = '#181818';
                widget.style.background = '#fff';

                break;
            default:
                widget.style = 'transform: translate(0px, 0px) !important;';
                removeContrastClasses();
        }

    }
}

export function applyColorSaturation(saturation, btn) {

    let colorSaturationSaved = getItemFromLocalStorageWithExpiry(COLORS_SATURATION_KEY);

    if (colorSaturationSaved !== null && colorSaturationSaved.value === saturation) {
        indexActualColorSaturation = 0;
    } else {
        indexActualColorSaturation = saturation;
    }

    setColorSaturation();
    changeStyleButtonSelectedAndDeselectOthers(btn, COLORS_SATURATION_KEY);

    if (indexActualColorSaturation === 0) {
        removeItemFromLocalStorage(COLORS_SATURATION_KEY, btn.id);
    } else {
        setItemToLocalStorageWithExpiry(COLORS_SATURATION_KEY,
            indexActualColorSaturation,
            null,
            btn.id);
    }

}

function setColorSaturation() {

    let html = document.body.parentElement;

    if (indexActualColorSaturation !== null) {
        const selectedColorSaturation = saturations[indexActualColorSaturation];
        html.classList.remove("high-saturation", "low-saturation", "mono-saturation");

        switch (selectedColorSaturation) {
            case 'high':
                html.classList.add("high-saturation");
                break;
            case 'low':
                html.classList.add("low-saturation");
                break;
            case 'mono':
                html.classList.add("mono-saturation");
                break;
            default:
                html.classList.remove("high", "low", "mono");
        }
    }
}

function changeAdjustColorValue(fila, selectedColor) {

    const adjustColor = (fila, selectedColor) => {
        if (fila === 'adjustTitleColor') {
            let titleColorStyle = document.getElementById('title-color-incloowe') || document.createElement('style');
            titleColorStyle.id = 'title-color-incloowe';
            titleColorStyle.innerHTML = `h1, h2, h3, h4, h5, h6 { color: ${selectedColor} !important }`;
            document.head.appendChild(titleColorStyle);
        } else if (fila === 'adjustTextColor') {
            let textColorStyle = document.getElementById('text-color-incloowe') || document.createElement('style');
            textColorStyle.id = 'text-color-incloowe';
            // textColorStyle.innerHTML = `a, p, li, label, input, select, textarea, legend, code, pre, dd, dt, span,
            //  blockquote { color: ${selectedColor} !important }`;
            textColorStyle.innerHTML = `h1, h2, h3, h4, h5, h6, p, li, label, input, select, textarea, legend, code, pre, dd, dt, span,
                 blockquote { color: ${selectedColor} !important }`;

            document.head.appendChild(textColorStyle);
        } else if (fila === 'adjustBackgroundColor') {
            document.body.style.setProperty('background-color', selectedColor, 'important');
        }
    };

    const removeAdjustColor = (fila) => {
        if (fila === 'adjustTitleColor') {
            const titleColorStyle = document.getElementById('title-color-incloowe');
            if (titleColorStyle != null) {
                titleColorStyle.innerHTML = '';
                removeItemFromLocalStorage(ADJUST_TITLE_COLOR_KEY);
            }

        } else if (fila === 'adjustTextColor') {
            const textColorStyle = document.getElementById('text-color-incloowe');
            if (textColorStyle != null) {
                textColorStyle.innerHTML = '';
                removeItemFromLocalStorage(ADJUST_TEXT_COLOR_KEY);
            }
        } else if (fila === 'adjustBackgroundColor') {
            document.body.style.backgroundColor = '';
            removeItemFromLocalStorage(ADJUST_BACKGROUND_COLOR_KEY);
        }
    };

    if (selectedColor !== null && selectedColor !== "") {
        adjustColor(fila, selectedColor);
    } else {
        removeAdjustColor(fila);
    }

}

export function applyDaltonismFilter(daltonismFilter, btn) {

    let daltonismFilterSaved = getItemFromLocalStorageWithExpiry("daltonism-filter");

    if (daltonismFilterSaved !== null && daltonismFilterSaved.value === daltonismFilter) {
        indexActualDaltonismFilter = 0;
    } else {
        indexActualDaltonismFilter = daltonismFilter;
    }

    setDaltonismFilter();
    changeStyleButtonSelectedAndDeselectOthers(btn, DALTONISM_FILTER_KEY);

    if (indexActualDaltonismFilter === 0) {
        removeItemFromLocalStorage(DALTONISM_FILTER_KEY, btn.id);
    } else {
        setItemToLocalStorageWithExpiry(DALTONISM_FILTER_KEY,
            indexActualDaltonismFilter,
            null,
            btn.id);
    }

}

function setDaltonismFilter() {

    let html = document.body.parentElement;

    const prot = "0.817, 0.183, 0, 0, 0," +
        "0.333, 0.667, 0, 0, 0," +
        "0, 0.125, 0.875, 0, 0," +
        "0, 0, 0, 1, 0";

    const deut = "0.8, 0.2, 0, 0, 0," +
        "0.258, 0.742, 0, 0, 0," +
        "0, 0.142, 0.858, 0, 0," +
        "0, 0, 0, 1, 0";

    const trit = "0.967, 0.033, 0, 0, 0," +
        "0, 0.733, 0.267, 0, 0," +
        "0, 0.183, 0.817, 0, 0," +
        "0, 0, 0, 1, 0";

    const svgNS = "http://www.w3.org/2000/svg";
    let svg = document.getElementById("daltonism-svg");

    if (!svg) {
        svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("id", "daltonism-svg");
        svg.setAttribute("xmlns", svgNS);
        svg.setAttribute("version", "1.1");
        // svg.style.display = "none";
        svg.style.absolute = "absolute";
        svg.style.height = "0";

        const defs = document.createElementNS(svgNS, "defs");
        svg.appendChild(defs);
        document.body.appendChild(svg);
    } else {
        // Limpar filtros existentes ao mudar de opção
        svg.querySelector("defs").innerHTML = "";
    }

    const defs = svg.querySelector("defs");
    const filter = document.createElementNS(svgNS, "filter");
    const feColorMatrix = document.createElementNS(svgNS, "feColorMatrix");
    feColorMatrix.setAttribute("type", "matrix");

    if (indexActualDaltonismFilter !== null) {
        const selectedDaltonismFilter = daltonisms[indexActualDaltonismFilter];
        html.classList.remove("protanomaly", "deuteranomaly", "tritanomaly");

        switch (selectedDaltonismFilter) {
            case 'protanomaly':
                filter.setAttribute("id", "protanomaly-filter");
                feColorMatrix.setAttribute("values", prot);
                html.classList.add("protanomaly");
                break;
            case 'deuteranomaly':
                filter.setAttribute("id", "deuteranomaly-filter");
                feColorMatrix.setAttribute("values", deut);
                html.classList.add("deuteranomaly");
                break;
            case 'tritanomaly':
                filter.setAttribute("id", "tritanomaly-filter");
                feColorMatrix.setAttribute("values", trit);
                html.classList.add("tritanomaly");
                break;
            default:
                if (svg) {
                    svg.parentNode.removeChild(svg);
                }
                html.classList.remove("protanomaly", "deuteranomaly", "tritanomaly");
        }

        filter.appendChild(feColorMatrix);
        defs.appendChild(filter);

    }
}

export function applyContentScaling(percentage) {

    let zoom = calculateZoomPercentageInPixels(percentage);

    let tagsDoPrimeiroNivel = getFirstChildElementsBelowBody();
    tagsDoPrimeiroNivel.forEach(function (txtTag) {

        if (!txtTag.closest('.app-window')
            && !txtTag.closest('.accessibility-button') && txtTag.id !== 'appWindow'
            && txtTag.id !== 'shadow') {
            txtTag.style.zoom = zoom;
        }

    });

}


export function setAdjustColor(button, fila) {

    let selectedColor = changeAdjustColorButton(button, fila) != null ? changeAdjustColorButton(button, fila) : '';
    let selectedId;

    if (fila === 'adjustTextColor') {
        selectedId = 'ic_28';
    } else if (fila === 'adjustTitleColor') {
        selectedId = 'ic_29';
    } else if (fila === 'adjustBackgroundColor') {
        selectedId = 'ic_30';
    }

    setItemToLocalStorageWithExpiry(fila, selectedColor, null, selectedId, true);
    changeAdjustColorValue(fila, selectedColor);

}


let lastSelectedTextColor;
let lastSelectedTitleColor;
let lastSelectedBackgroundColor;

export function changeAdjustColorButton(button, fila) {

    let shadowR = getShadowRoot();
    let btnReset = shadowR.querySelector(`[data-test="${fila}"]`).querySelector('.button-reset-func');
    const isReset = button.classList.contains('button-reset-func');

    const updateSelectedButton = (lastSelectedButton, button) => {
        if (lastSelectedButton && lastSelectedButton !== button) {
            lastSelectedButton.innerHTML = ''; // Remove o SVG
            lastSelectedButton.classList.remove('color-pick-selected');
            lastSelectedButton.style.border = '';
        }
        return button;
    };



    const setSVG = (button, selectedColor) => {
        button.innerHTML = selectedColor === 'rgb(255, 255, 255)' ?
            `<span style=" width: 12px; height: 12px; background: black; border-radius: 50%;"></span>` :
            `<span style=" width: 12px; height: 12px; background: white; border-radius: 50%;"></span>`;
    };

    if (!isReset) {

        btnReset.disabled = false;

        if (fila === 'adjustTitleColor') {
            lastSelectedTitleColor = updateSelectedButton(lastSelectedTitleColor, button);
        } else if (fila === 'adjustTextColor') {
            lastSelectedTextColor = updateSelectedButton(lastSelectedTextColor, button);
        } else if (fila === 'adjustBackgroundColor') {
            lastSelectedBackgroundColor = updateSelectedButton(lastSelectedBackgroundColor, button);
        }

        button.classList.add('color-pick-selected');
        const currentSelected = shadowR.querySelector(`div[data-test=${fila}] .color-pick-selected`);
        const selectedColor = window.getComputedStyle(currentSelected).backgroundColor;

        button.style.border = 'solid 3px ' + selectedColor;

        setSVG(button, selectedColor);

        return selectedColor;

    }else {
        btnReset.disabled = true;
    }

    const currentSelected = shadowR.querySelector(`div[data-test=${fila}] .color-pick-selected`);
    if (currentSelected != null) {
        currentSelected.innerHTML = '';
        currentSelected.classList.remove('color-pick-selected');
        currentSelected.style.border = '';
    }


    return null;

}