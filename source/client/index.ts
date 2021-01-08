namespace is {
	export function absent<A>(subject: A | null | undefined): subject is null | undefined {
		return subject == null;
	};

	export function present<A>(subject: A | null | undefined): subject is A {
		return subject != null;
	};
};

namespace as {
	export function array(subject: any): Array<any> {
		if (is.absent(subject) || subject.constructor !== Array) {
			throw ``;
		}
		return subject;
	};

	export function boolean(subject: any): boolean {
		if (is.absent(subject) || subject.constructor !== Boolean) {
			throw ``;
		}
		return subject as boolean;
	};

	export function number(subject: any): number {
		if (is.absent(subject) || subject.constructor !== Number) {
			throw ``;
		}
		return subject as number;
	};

	export function record(subject: any): Record<string, any> {
		if (is.absent(subject) || subject.constructor !== Object) {
			throw ``;
		}
		return subject;
	};

	export function string(subject: any): string {
		if (is.absent(subject) || subject.constructor !== String) {
			throw ``;
		}
		return subject as string;
	};
};

function element(selector: string, ...children: Array<Node>): HTMLElement {
	let parts = selector.match(/([a-z][a-z0-9_-]*|[.][a-z][a-z0-9_-]*|[\[][^=]+[=][^\]]*[\]])/g) ?? [];
	let tag = parts.shift() as string;
	let classNames = parts.filter((part) => /[.][a-z][a-z0-9_-]*/.test(part));
	let attributes = parts.filter((part) => /[\[][^=]+[=][^\]]*[\]]/.test(part));
	let ns = ["svg", "path", "polygon"].indexOf(tag) >= 0 ? "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml";
	let element = document.createElementNS(ns, tag);
	for (let className of classNames) {
		let parts = /^[.]([a-z][a-z0-9_-]*)$/.exec(className) ?? [];
		element.classList.add(parts[1]);
	}
	for (let attribute of attributes) {
		let parts = /^[\[]([^=]+)[=]([^\]]*)[\]]$/.exec(attribute) ?? [];
		element.setAttribute(parts[1], parts[2]);
	}
	for (let child of children) {
		element.appendChild(child);
	}
	return element as HTMLElement;
}

function text(string: string): Text {
	return document.createTextNode(string);
}

function set(element: HTMLElement, key: string, value: string): HTMLElement {
	element.setAttribute(key, value);
	return element;
}

function on<A extends keyof HTMLElementEventMap>(element: HTMLElement, type: A, listener: (event: HTMLElementEventMap[A]) => void): HTMLElement {
	element.addEventListener(type, listener);
	return element;
}

let urlInput = element("input.copy-link__input[disabled=][stack-below=]") as HTMLInputElement;
let oldState = {
	recipient: "",
	violation: "",
	amount: "",
	issuer: "",
	account: ""
};

function updateState(newState: Partial<typeof oldState>): void {
	let state = {
		...oldState,
		...newState
	};
	window.history.replaceState(undefined, "", `?${JSON.stringify(state)}`);
	urlInput.value = window.location.href;
	oldState = state;
}

{
	let newState: Partial<typeof oldState> = {};
	try {
		let json = as.record(JSON.parse(decodeURI(window.location.search.slice(1))));
		for (let key in oldState) {
			newState[key as keyof typeof oldState] = json[key];
		}
	} catch (error) {}
	updateState(newState);
}

document.body.appendChild(
	element("div.app",
		element("div.app__header",
			element("div.header[content=]",
				element("div.header__icon",
					element("svg[width=48px][height=48px][viewBox=0 0 24 24]",
						element("path[d=M12,2.598c1.387,0.961,2.92,1.492,4.383,1.492c0.842,0,1.64-0.173,2.37-0.509l0.642,0.642c-0.78,1.604-0.683,3.416-0.552,5.835C18.913,11.356,19,12.972,19,15c0,4.537-5.409,6.462-7,6.93c-1.597-0.47-7-2.396-7-6.93c0-2.028,0.087-3.644,0.157-4.942c0.13-2.419,0.228-4.231-0.552-5.835l0.642-0.642C5.977,3.917,6.775,4.09,7.618,4.09C9.081,4.09,10.613,3.56,12,2.598 M12,0c-1.236,1.236-2.854,2.09-4.382,2.09C6.673,2.09,5.764,1.764,5,1L2,4c2,2,1,4,1,11s9,9,9,9s9-2,9-9s-1-9,1-11l-3-3c-0.764,0.764-1.674,1.09-2.617,1.09C14.854,2.09,13.236,1.236,12,0L12,0z]"),
						element("path[d=M12,8.195 L13.236,10.7 L16,11.102 L14.001,13.052 L14.473,15.805 L12,14.505 L9.528,15.805 L10,13.052 L8,11.102 L10.765,10.7 z]")
					)
				),
				element("div.header__text[single-line=]", text("Pandemibot"))
			),
		),
		element("div.app__content[scroll-container=]",
			element("div.content[content=]",
				element("div.table",
						element("div.table__cell",
							on(set(element("input.table__cell-input[spellcheck=false]"), "value", oldState.recipient), "input", (event) => {
								let element = event.target as HTMLInputElement;
								updateState({
									recipient: element.value
								});
							}),
							element("div.table__cell-title[stack-below=]",
								element("div.text-paragraph[single-line=]", text("Mottagare"))
							)
						),
						element("div.table__cell",
							on(set(element("input.table__cell-input[spellcheck=false]"), "value", oldState.violation), "input", (event) => {
								let element = event.target as HTMLInputElement;
								updateState({
									violation: element.value
								});
							}),
							element("div.table__cell-title[stack-below=]",
								element("div.text-paragraph[single-line=]", text("Överträdelse"))
							)
						),
						element("div.table__cell",
							on(set(element("input.table__cell-input[spellcheck=false]"), "value", oldState.issuer), "input", (event) => {
								let element = event.target as HTMLInputElement;
								updateState({
									issuer: element.value
								});
							}),
							element("div.table__cell-title[stack-below=]",
								element("div.text-paragraph[single-line=]", text("Utfärdad av"))
							)
						)
				),
				element("div.text-group",
					element("div.text-paragraph", text(`Mottagaren av denna bot har gjort sig skyldig till pandemibrott enligt beskrivningen som återfinns i lag ${Math.floor(Math.random() * 100).toString()}:${Math.floor(Math.random() * 100).toString()} § ${Math.floor(Math.random() * 100)}.`)),
					element("div.text-paragraph", text("Brottets påföljd har fastställts till böter."))
				),
				element("div.table",
						element("div.table__cell",
							on(set(element("input.table__cell-input[spellcheck=false]"), "value", oldState.amount), "input", (event) => {
								let element = event.target as HTMLInputElement;
								updateState({
									amount: element.value
								});
							}),
							element("div.table__cell-title[stack-below=]",
								element("div.text-paragraph[single-line=]", text("Bötesbelopp"))
							)
						),
						element("div.table__cell",
							on(set(element("input.table__cell-input[spellcheck=false]"), "value", oldState.account), "input", (event) => {
								let element = event.target as HTMLInputElement;
								updateState({
									account: element.value
								});
							}),
							element("div.table__cell-title[stack-below=]",
								element("div.text-paragraph[single-line=]", text("Betalas till"))
							)
						)
				),
				element("div.text-group",
					element("div.text-paragraph", text("Betalningen ska vara betalningsmottagaren tillhanda om/när du tycker att det verkar rimligt.")),
					element("div.text-paragraph", text("Anser du att boten är utfärdad på felaktiga grunder ska du i första hand vända dig till utfärdaren. Det går även bra att redigera och vidaresända boten till någon du anser förtjänar den bättre. Använd knappen nedan för att kopiera en länk som du kan dela i valfritt kommunikationsmedium.")),
					element("div.text-paragraph", text("Asocialstyrelsen"))
				),
				element("div.copy-link",
					on(element("button.copy-link__button[single-line]", text("Kopiera länk för delning")), "click", (event) => {
						let element = event.target as HTMLButtonElement;
						urlInput.select();
						document.execCommand("copy");
						let oldText = element.textContent;
						element.textContent = "Länk kopierad!";
						setTimeout(() => {
							element.textContent = oldText;
						}, 5000);
					}),
					urlInput
				)
			)
		)
	)
);
