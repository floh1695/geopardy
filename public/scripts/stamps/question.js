'use strict';

const Question = Stampit({
    props: {
        value: null,
        text: null,
        answer: null,
        hide: false
    },
    init({ value, text, answer, hide = this.hide }) {
        this.value = value;
        this.text = text;
        this.answer = answer;
    }
});
