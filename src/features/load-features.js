import {loadHighlightFocus, loadHighlightHeadings, loadHighlightHover, loadHighlightLinks} from "./highlight-features";
import {
    loadAlignText,
    loadFontFamily,
    loadFontSize,
    loadLetterSpacing,
    loadLineHeight,
    loadTextMagnifier
} from "./text-adjustments";
import {
    loadBackgroundColor, loadContentScaling,
    loadContrastColors, loadDaltonismFilter,
    loadSaturationColors,
    loadTextColor,
    loadTitleColor
} from "./visual-adjustments";
import {loadVlibras} from "./vlibras";

export function loadFeatures() {
    loadFontSize();
    loadContentScaling();
    loadLineHeight();
    loadLetterSpacing();
    loadTextMagnifier()
    loadHighlightHeadings();
    loadHighlightLinks();
    loadHighlightHover();
    loadHighlightFocus();
    loadVlibras();
    loadFontFamily();
    loadAlignText();
    loadContrastColors();
    loadSaturationColors();
    loadTextColor();
    loadTitleColor();
    loadBackgroundColor();
    loadDaltonismFilter();
}