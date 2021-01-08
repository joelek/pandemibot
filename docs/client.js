"use strict";
var is;
(function (is) {
    function absent(subject) {
        return subject == null;
    }
    is.absent = absent;
    ;
    function present(subject) {
        return subject != null;
    }
    is.present = present;
    ;
})(is || (is = {}));
;
var as;
(function (as) {
    function array(subject) {
        if (is.absent(subject) || subject.constructor !== Array) {
            throw ``;
        }
        return subject;
    }
    as.array = array;
    ;
    function boolean(subject) {
        if (is.absent(subject) || subject.constructor !== Boolean) {
            throw ``;
        }
        return subject;
    }
    as.boolean = boolean;
    ;
    function number(subject) {
        if (is.absent(subject) || subject.constructor !== Number) {
            throw ``;
        }
        return subject;
    }
    as.number = number;
    ;
    function record(subject) {
        if (is.absent(subject) || subject.constructor !== Object) {
            throw ``;
        }
        return subject;
    }
    as.record = record;
    ;
    function string(subject) {
        if (is.absent(subject) || subject.constructor !== String) {
            throw ``;
        }
        return subject;
    }
    as.string = string;
    ;
})(as || (as = {}));
;
function element(selector, ...children) {
    var _a, _b, _c;
    let parts = (_a = selector.match(/([a-z][a-z0-9_-]*|[.][a-z][a-z0-9_-]*|[\[][^=]+[=][^\]]*[\]])/g)) !== null && _a !== void 0 ? _a : [];
    let tag = parts.shift();
    let classNames = parts.filter((part) => /[.][a-z][a-z0-9_-]*/.test(part));
    let attributes = parts.filter((part) => /[\[][^=]+[=][^\]]*[\]]/.test(part));
    let ns = ["svg", "path", "polygon"].indexOf(tag) >= 0 ? "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml";
    let element = document.createElementNS(ns, tag);
    for (let className of classNames) {
        let parts = (_b = /^[.]([a-z][a-z0-9_-]*)$/.exec(className)) !== null && _b !== void 0 ? _b : [];
        element.classList.add(parts[1]);
    }
    for (let attribute of attributes) {
        let parts = (_c = /^[\[]([^=]+)[=]([^\]]*)[\]]$/.exec(attribute)) !== null && _c !== void 0 ? _c : [];
        element.setAttribute(parts[1], parts[2]);
    }
    for (let child of children) {
        element.appendChild(child);
    }
    return element;
}
function text(string) {
    return document.createTextNode(string);
}
function set(element, key, value) {
    element.setAttribute(key, value);
    return element;
}
function on(element, type, listener) {
    element.addEventListener(type, listener);
    return element;
}
let urlInput = element("input.copy-link__input[stack-below=]");
let oldState = {
    recipient: "",
    violation: "",
    amount: "",
    issuer: "",
    account: ""
};
function updateState(newState) {
    let state = Object.assign(Object.assign({}, oldState), newState);
    window.history.replaceState(undefined, "", `?${JSON.stringify(state)}`);
    urlInput.value = window.location.href;
    oldState = state;
}
{
    let newState = {};
    try {
        let json = as.record(JSON.parse(decodeURI(window.location.search.slice(1))));
        for (let key in oldState) {
            newState[key] = json[key];
        }
    }
    catch (error) { }
    updateState(newState);
}
document.body.appendChild(element("div.app", element("div.app__header", element("div.header[content=]", element("div.header__icon", element("svg[width=48px][height=48px][viewBox=0 0 24 24]", element("path[d=M12,2.598c1.387,0.961,2.92,1.492,4.383,1.492c0.842,0,1.64-0.173,2.37-0.509l0.642,0.642c-0.78,1.604-0.683,3.416-0.552,5.835C18.913,11.356,19,12.972,19,15c0,4.537-5.409,6.462-7,6.93c-1.597-0.47-7-2.396-7-6.93c0-2.028,0.087-3.644,0.157-4.942c0.13-2.419,0.228-4.231-0.552-5.835l0.642-0.642C5.977,3.917,6.775,4.09,7.618,4.09C9.081,4.09,10.613,3.56,12,2.598 M12,0c-1.236,1.236-2.854,2.09-4.382,2.09C6.673,2.09,5.764,1.764,5,1L2,4c2,2,1,4,1,11s9,9,9,9s9-2,9-9s-1-9,1-11l-3-3c-0.764,0.764-1.674,1.09-2.617,1.09C14.854,2.09,13.236,1.236,12,0L12,0z]"), element("path[d=M12,8.195 L13.236,10.7 L16,11.102 L14.001,13.052 L14.473,15.805 L12,14.505 L9.528,15.805 L10,13.052 L8,11.102 L10.765,10.7 z]"))), element("div.header__text[single-line=]", text("Pandemibot")))), element("div.app__content[scroll-container=]", element("div.content[content=]", element("div.table", element("div.table__cell", on(set(element("input.table__cell-input[spellcheck=false]"), "value", oldState.recipient), "input", (event) => {
    let element = event.target;
    updateState({
        recipient: element.value
    });
}), element("div.table__cell-title[stack-below=]", element("div.text-paragraph[single-line=]", text("Mottagare")))), element("div.table__cell", on(set(element("input.table__cell-input[spellcheck=false]"), "value", oldState.violation), "input", (event) => {
    let element = event.target;
    updateState({
        violation: element.value
    });
}), element("div.table__cell-title[stack-below=]", element("div.text-paragraph[single-line=]", text("Överträdelse")))), element("div.table__cell", on(set(element("input.table__cell-input[spellcheck=false]"), "value", oldState.issuer), "input", (event) => {
    let element = event.target;
    updateState({
        issuer: element.value
    });
}), element("div.table__cell-title[stack-below=]", element("div.text-paragraph[single-line=]", text("Utfärdad av"))))), element("div.text-group", element("div.text-paragraph", text(`Mottagaren av denna bot har gjort sig skyldig till pandemibrott enligt beskrivningen som återfinns i lag ${Math.floor(Math.random() * 100).toString()}:${Math.floor(Math.random() * 100).toString()} § ${Math.floor(Math.random() * 100)}.`)), element("div.text-paragraph", text("Brottets påföljd har fastställts till böter."))), element("div.table", element("div.table__cell", on(set(element("input.table__cell-input[spellcheck=false]"), "value", oldState.amount), "input", (event) => {
    let element = event.target;
    updateState({
        amount: element.value
    });
}), element("div.table__cell-title[stack-below=]", element("div.text-paragraph[single-line=]", text("Bötesbelopp")))), element("div.table__cell", on(set(element("input.table__cell-input[spellcheck=false]"), "value", oldState.account), "input", (event) => {
    let element = event.target;
    updateState({
        account: element.value
    });
}), element("div.table__cell-title[stack-below=]", element("div.text-paragraph[single-line=]", text("Betalas till"))))), element("div.text-group", element("div.text-paragraph", text("Betalningen ska vara betalningsmottagaren tillhanda om/när du tycker att det verkar rimligt.")), element("div.text-paragraph", text("Anser du att boten är utfärdad på felaktiga grunder ska du i första hand vända dig till utfärdaren. Det går även bra att redigera och vidaresända boten till någon du anser förtjänar den bättre. Använd knappen nedan för att kopiera en länk som du kan dela i valfritt kommunikationsmedium.")), element("div.text-paragraph", text("Asocialstyrelsen"))), element("div.copy-link", on(element("button.copy-link__button[single-line]", text("Kopiera länk för delning")), "click", (event) => {
    let element = event.target;
    urlInput.select();
    document.execCommand("copy");
    let oldText = element.textContent;
    element.textContent = "Länk kopierad!";
    setTimeout(() => {
        element.textContent = oldText;
    }, 5000);
}), urlInput)))));
