class Vue {
    constructor(options) {
        this.el = document.querySelector(options.el);
        this.data = options.data();

        Object.keys(this.data).forEach(this.applyVariableValues.bind(this));
    }

    applyVariableValues(key) {
        const regex = new RegExp("{{" + key + "}}", "g");
        this.el.innerHTML = this.el.innerHTML.replace(regex, this.data[key]);
    }
}
