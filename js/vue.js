class Vue {
    constructor(options) {
        this.el = document.querySelector(options.el);
        this.data = options.data();

        this.replaceTemplateExpressions(this.el, this.data);
    }

    replaceTemplateExpressions(node, data) {
        if (node.childNodes.length) {
            for (let el of node.childNodes) {
                this.replaceTemplateExpressions(el, data);
            }
        } else if (node.nodeType === Node.TEXT_NODE) {
            this.replaceText(node, data);
        }
    }

    replaceText(node, data) {
        let text = node.textContent;
        let finalText = "";

        let cursor = 0;
        let state = 0; // 0 searching template, 1 searching key name

        for (let i = 0; i < text.length - 1; i++) {
            switch (state) {
                case 0:
                    if (text[i] === "{" && text[i + 1] === "{") {
                        finalText += text.substring(cursor, i); // Capture text before the expression
                        state = 1;
                        cursor = i;
                    }
                    break;
                case 1:
                    if (text[i] === "}" && text[i + 1] === "}") {
                        finalText += data[text.substring(cursor + 2, i).trim()]; // Capture expression's value
                        state = 0;
                        cursor = i + 2;
                    }
                    break;
                default:
            }
        }

        finalText += text.substring(cursor); // Capture text after the expression
        node.textContent = finalText;
    }
}
