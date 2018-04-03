'use strict';

const Question = Stampit({
    props: {
        value: null,
        text: null,
        answer: null
    },
    init({ value, text, answer }) {
        this.value = value;
        this.text = text;
        this.answer = answer;
    }
});
