import {getLastLeafElementsWithText} from "../queries";
import {getItemFromLocalStorageWithExpiry} from "../utils/storage";
import {HIGHLIGHT_FOCUS_KEY, HIGHLIGHT_HEADINGS_KEY, HIGHLIGHT_HOVER_KEY, HIGHLIGHT_LINKS_KEY} from "../core/constants";
import {getQueriesLoaded} from "../core/widget";

let highlightHeadings = getItemFromLocalStorageWithExpiry(HIGHLIGHT_HEADINGS_KEY);
let highlightLinks = getItemFromLocalStorageWithExpiry(HIGHLIGHT_LINKS_KEY);
let highlightHover = getItemFromLocalStorageWithExpiry(HIGHLIGHT_HOVER_KEY);
let highlightFocus = getItemFromLocalStorageWithExpiry(HIGHLIGHT_FOCUS_KEY);

export function loadHighlightHeadings() {
    if (highlightHeadings != null) {
        applyHighlightHeading();
    }
}

export function loadHighlightLinks() {

    if (highlightLinks != null) {
        applyHighlightLinks();
    }

}

export function loadHighlightHover() {
    if (highlightHover != null) {
        let queries = getQueriesLoaded();
        let queryButtonsAndImg = queries[3]?.value;
        let txtTags = getLastLeafElementsWithText();
        let otherItens = document.querySelectorAll(queryButtonsAndImg);

        let otherItensArray = Array.from(otherItens);
        let combined = [...txtTags, ...otherItensArray];

        const isHoverActive = getItemFromLocalStorageWithExpiry(HIGHLIGHT_HOVER_KEY);

        if (isHoverActive && isHoverActive.value) {
            combined.forEach(el => el.classList.add('hover-active'));
        } else {
            combined.forEach(el => el.classList.remove('hover-active'));
        }
    }
}

export function loadHighlightFocus() {
    if (highlightFocus != null) {
        let queries = getQueriesLoaded();
        let queryFullBody = queries[4]?.value;
        let allItens = document.querySelectorAll(queryFullBody);
        // Verifica o estado do localStorage
        const isFocusActive = getItemFromLocalStorageWithExpiry(HIGHLIGHT_FOCUS_KEY);

        if (isFocusActive && isFocusActive.value) {
            allItens.forEach(el => el.classList.add('focus-active'));
        } else {
            allItens.forEach(el => el.classList.remove('focus-active'));
        }
    }
}

export function applyHighlightHeading() {

    let queries = getQueriesLoaded();
    let queryTitulos = queries[0]?.value;
    let txtTags = document.querySelectorAll(queryTitulos);

    // Iterar sobre cada tag <h1> e alterar sua cor para vermelho
    txtTags.forEach(function (txtTag) {

        let attName = txtTag.getAttribute('data-inclowee-hlh-styled');

        if (attName == null) {
            txtTag.style.setProperty('outline', 'rgb(20, 111, 248) solid 2px', 'important');
            txtTag.style.setProperty('outline-offset', '2px', 'important');
            txtTag.setAttribute('data-inclowee-hlh-styled', 'true');

        } else {
            txtTag.style.outline = '';
            txtTag.style.outlineOffset = '';
            txtTag.removeAttribute("data-inclowee-hlh-styled");
        }

    });
}

export function applyHighlightLinks() {

    let queries = getQueriesLoaded();
    let queryLinks = queries[1]?.value;
    let txtTags = document.querySelectorAll(queryLinks);

    // Iterar sobre cada tag <h1> e alterar sua cor para vermelho
    txtTags.forEach(function (txtTag) {

        let attName = txtTag.getAttribute('data-inclowee-hll-styled');

        if (attName == null) {

            txtTag.style.setProperty('outline', '2px solid rgba(255, 114, 22, 0.5)', 'important');
            txtTag.style.setProperty('outline-offset', '2px', 'important');
            txtTag.setAttribute('data-inclowee-hll-styled', 'true');
        } else {
            txtTag.style.outline = '';
            txtTag.style.outlineOffset = '';
            txtTag.removeAttribute("data-inclowee-hll-styled");
        }
    });
}

export function applyHighlightHover() {
    let queries = getQueriesLoaded();
    let queryButtonsAndImg = queries[3]?.value;
    let txtTags = getLastLeafElementsWithText();
    let otherItens = document.querySelectorAll(queryButtonsAndImg);

    let otherItensArray = Array.from(otherItens);
    let combined = [...txtTags, ...otherItensArray];

    const isHoverActive = getItemFromLocalStorageWithExpiry(HIGHLIGHT_HOVER_KEY);

    if (isHoverActive && isHoverActive.value) {
        combined.forEach(el => el.classList.remove('hover-active'));
    } else {
        combined.forEach(el => el.classList.add('hover-active'));
    }
}

export function applyHighlightFocus() {
    let queries = getQueriesLoaded();
    let queryFullBody = queries[4]?.value;
    let allItens = document.querySelectorAll(queryFullBody);

    // Verifica o estado do localStorage
    const isFocusActive = getItemFromLocalStorageWithExpiry(HIGHLIGHT_FOCUS_KEY);

    if (isFocusActive && isFocusActive.value) {
        allItens.forEach(el => el.classList.remove('focus-active'));
    } else {
        allItens.forEach(el => el.classList.add('focus-active'));
    }
}

