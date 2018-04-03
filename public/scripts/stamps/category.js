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
        },
        /** Under heavy construction */
        setDirtyQuestions(questions) {
            console.warn('Category({}).setDirtyQuestions(questions) not yet implemented');
            console.log(questions);
            const missingValues = MONEY_VALUES.slice(0); // Clones array
            const presentValues = [...new Set(
                questions
                    .map((question) => {
                        // TODO: remove value from list
                        return question.value;
                    })
                    .filter(item => item != null)
            )];
            if (presentValues.filter((number) => {
                if ([100, 300, 500].includes(number)) {
                    return true;
                }
            })) {
                // TODO: Fix wrong numbers
            }
            const nextValue = () => {
                if (missingValues.length) {
                    return missingValues.pop();
                } else {
                    return randomInteger(0, presentValues.length - 1);
                }
            };
            console.log(presentValues);
        }
    }
});
