import {getLastLeafElementsWithText, getLineHeightInPixelsIfText} from "../queries";
import {
    getItemFromLocalStorageWithExpiry,
    removeItemFromLocalStorage,
    setItemToLocalStorageWithExpiry
} from "../utils/storage";
import {
    COLORS_CONTRAST_KEY,
    FONT_FAMILY_KEY,
    FONT_SIZE_KEY,
    LETTER_SPACING_KEY,
    LINE_HEIGHT_KEY,
    TEXT_ALIGN_KEY,
    TEXT_MAGNIFIER_KEY
} from "../core/constants";
import {
    calculateLetterSpacingInPixels,
    changeStyleButtonSelectedAndDeselectOthers,
    criarBalao,
    getElementCursorHover
} from "../utils/support";
import {getQueriesLoaded} from "../core/widget";

let currentFontSize = getItemFromLocalStorageWithExpiry(FONT_SIZE_KEY);
let currentLineHeight = getItemFromLocalStorageWithExpiry(LINE_HEIGHT_KEY);
let currentLetterSpacing = getItemFromLocalStorageWithExpiry(LETTER_SPACING_KEY);
let textMagnifier = getItemFromLocalStorageWithExpiry(TEXT_MAGNIFIER_KEY);
let textAlign = getItemFromLocalStorageWithExpiry(TEXT_ALIGN_KEY);
let fontFamily = getItemFromLocalStorageWithExpiry(FONT_FAMILY_KEY);

//TEXT-ALIGN
let aligns = ['', 'left', 'center', 'right'];
let indexActualTextAlign = textAlign != null ? textAlign.value : textAlign;

//FONT FAMILY
let fontes = ['', 'Arial, sans-serif', 'OpenDyslexic'];
let indexActualFontFamily = fontFamily != null ? fontFamily.value : fontFamily; // Obtém a fonte salva ou usa a primeira opção

export function loadFontSize() {

    const lastLeafElementsWithText = getLastLeafElementsWithText();

    lastLeafElementsWithText.forEach(function (txtTag) {
        if (currentFontSize != null) {
            if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button')) {
                let initialSize = parseInt(txtTag.getAttribute('original-size'));
                let newSize = initialSize + (initialSize * currentFontSize.percentage / 100);
                txtTag.style.setProperty('font-size', newSize + 'px', 'important');
            }
            let porcentagem = parseFloat(currentFontSize.value.replace('%', ''));
            applyFontSize(porcentagem);
        }

    });

}

export function loadLineHeight() {
    if (currentLineHeight !== null) {
        let porcentagem = parseFloat(currentLineHeight.value.replace('%', ''));
        applyLineHeight(porcentagem);
    }
}

export function loadLetterSpacing() {
    if (currentLetterSpacing !== null) {
        let porcentagem = parseFloat(currentLetterSpacing.value.replace('%', ''));
        applyLetterSpacing(porcentagem);
    }
}

export function loadTextMagnifier() {

    if (textMagnifier !== null) {
        applyTextMagnifier();
    }

}

export function loadAlignText() {

    if (indexActualTextAlign !== null) {

        let selectedAlignText = aligns[indexActualTextAlign];
        let elements = getLastLeafElementsWithText();

        for (let element of elements) {

            if (!element.closest('.app-window') && !element.closest('.accessibility-button')) {
                // Aplique os estilos apenas se não pertencer à classe 'app-window'
                element.style.setProperty('text-align', selectedAlignText, 'important');
            }
        }
    }

}

export function loadFontFamily() {

    // let propertySaved = getItemFromLocalStorageWithExpiry(FONT_FAMILY_KEY);
    let queries = getQueriesLoaded();
    if (indexActualFontFamily !== null) {

        let queryFontFamily = queries[5]?.value;
        let selectedFontFamily = fontes[indexActualFontFamily];
        let elements = document
            .querySelectorAll(queryFontFamily);
        for (let element of elements) {

            if (!element.closest('.app-window') && !element.closest('.accessibility-button')) {
                // Aplique os estilos apenas se não pertencer à classe 'app-window'
                element.style.setProperty('font-family', selectedFontFamily, 'important');
            }
        }
    }

}

export function applyFontSize(defaultPercentage) {

    const lastLeafElementsWithText = getLastLeafElementsWithText();
    lastLeafElementsWithText.forEach(function (txtTag) {

        if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button')) {
            // Aplique os estilos apenas se não pertencer à classe 'app-window'
            let attName = txtTag.getAttribute('original-size');
            let initialSize = parseInt(attName);
            let newSize = initialSize + (initialSize * defaultPercentage / 100);
            txtTag.style.setProperty('font-size', newSize + 'px', 'important');
        }


    });

}

export function applyLineHeight(percentage) {

    const lastLeafElementsWithText = getLastLeafElementsWithText();

    lastLeafElementsWithText.forEach(function (txtTag) {

        let attName = txtTag.getAttribute('original-line-height');
        if (attName == null) {
            txtTag.setAttribute('original-line-height',
                isNaN(parseInt(window.getComputedStyle(txtTag).lineHeight)) ? getLineHeightInPixelsIfText(txtTag) : window.getComputedStyle(txtTag).lineHeight);
        }


        if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button')) {
            let lineHeightVal = parseFloat(window.getComputedStyle(txtTag).lineHeight);
            let lineHeightFormated = isNaN(lineHeightVal) ? getLineHeightInPixelsIfText(txtTag) : lineHeightVal;

            let attName = txtTag.getAttribute('original-line-height');
            let initialSize = parseInt(attName);

            if (initialSize !== null) {
                lineHeightFormated = initialSize;
            }

            txtTag.style.setProperty('line-height', lineHeightFormated + (lineHeightFormated * percentage / 100) + 'px', 'important');
        }

    });

}

export function applyLetterSpacing(percentage) {

    //VALOR PADRÃO DE ADIÇÃO E REDUÇÃO - 0.2PX A CADA 10%
    let letterSpacingAdd = calculateLetterSpacingInPixels(percentage);

    const lastLeafElementsWithText = getLastLeafElementsWithText();
    lastLeafElementsWithText.forEach(function (txtTag) {

        let attName = txtTag.getAttribute('original-letter-spacing');
        if (attName == null) {
            txtTag.setAttribute('original-letter-spacing',
                isNaN(parseInt(window.getComputedStyle(txtTag).letterSpacing)) ? 0 : window.getComputedStyle(txtTag).letterSpacing);
        }

        if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button')) {
            let letterSpacingVal = parseFloat(window.getComputedStyle(txtTag).letterSpacing);
            let letterSpacingFormated = isNaN(letterSpacingVal) ? 0 : letterSpacingVal;

            let attName = txtTag.getAttribute('original-letter-spacing');
            let initialSize = parseFloat(attName);

            if (initialSize !== null) {
                letterSpacingFormated = initialSize;
            }

            txtTag.style.setProperty('letter-spacing', letterSpacingFormated + letterSpacingAdd + 'px', 'important');
        }


    });

}

export function applyTextMagnifier() {

    // Se a funcionalidade for desativada, esconde o balão
    let balao = document.querySelector(".balao");
    if(balao === null || balao === undefined || balao === ''){
        balao = criarBalao();
    }

    if (balao.style.display === 'block') {
        balao.style.setProperty('display', 'none', 'important');
    } else {
        balao.style.setProperty('display', 'block', 'important');
        getElementCursorHover();
    }
}

export function applyAlignText(direction, btn) {

    let textAlignSaved = getItemFromLocalStorageWithExpiry(TEXT_ALIGN_KEY);

    if (textAlignSaved !== null && textAlignSaved.value === direction) {
        indexActualTextAlign = 0;
    } else {
        indexActualTextAlign = direction;
    }

    loadAlignText();
    changeStyleButtonSelectedAndDeselectOthers(btn, TEXT_ALIGN_KEY);

    if (indexActualTextAlign === 0) {
        removeItemFromLocalStorage(TEXT_ALIGN_KEY, btn.id);
    } else {
        setItemToLocalStorageWithExpiry(TEXT_ALIGN_KEY,
            indexActualTextAlign,
            null,
            btn.id);
    }

}

export function applyFontFamily(font, btn) {

    // showToast();

    let fontFam = getItemFromLocalStorageWithExpiry(FONT_FAMILY_KEY);

    if (fontFam !== null && fontFam.value === font) {
        indexActualFontFamily = 0;
    } else {
        indexActualFontFamily = font;
    }

    loadFontFamily();
    changeStyleButtonSelectedAndDeselectOthers(btn, FONT_FAMILY_KEY);

    if (indexActualFontFamily === 0) {
        removeItemFromLocalStorage(FONT_FAMILY_KEY, btn.id);
    } else {
        setItemToLocalStorageWithExpiry(FONT_FAMILY_KEY,
            indexActualFontFamily,
            null,
            btn.id);
    }

}


