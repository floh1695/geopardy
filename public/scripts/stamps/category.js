'use strict';

const Category = Stampit({
    props: {
        name: null,
        id: null,
        questions: null
    },
    init({ name, id, questions = {} }) {
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
        },
        /** Under heavy construction */
        setDirtyQuestions(questions) {
            questions = questions.slice(0);
            const moneyValues = MONEY_VALUES.slice(0).reverse();
            while (moneyValues.length) {
                const yankedQuestion = questions.shift();
                const questionDetails = {
                    value: moneyValues.pop(),
                    text: yankedQuestion.question,
                    answer: yankedQuestion.answer
                };
                const question = Question(questionDetails);
                this.setQuestion(question);
            }
        }
    }
});
