'use strict';

const Category = Stampit({
    props: {
        name: null,
        id: null,
        questions: {}
    },
    init({ name, id, questions = this.questions }) {
        this.name = name;
        this.id = id;
        this.questions = questions;
    },
    methods: {
        setQuestion(question) {
            this.questions[question.value] = question;
        },
        getQuestion(value) {
            return this.questions[value] === undefined ? null : this.questions[value];
        },
        apiCall() {
            return JService('category', { id: this.id });
        }
    }
});
