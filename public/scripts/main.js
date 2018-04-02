/* global angular */
/* global stampit */

'use strict';

const geopardyApp = angular.module('geopardyApp', []);

/* Add dollar sign to values */
geopardyApp.filter('currency', () => {
  return (amount) => {
    return `\$${amount}`;
  };
});

/* Cleaner way to pass Stampit around */
geopardyApp.factory('Stampit', () => {
  const Stampit = stampit.default;
  return Stampit;
});

geopardyApp.controller('geopardyController', ['$scope', '$http', 'Stampit', ($scope, $http, Stampit) => {
  /* Configuration */
  const CATEGORY_COUNT = 5;

  $scope.values = [1, 2, 3, 4, 5].map(v => v * 200);
  $scope.selectQuestion = (category, value) => {
    console.log(category.getQuestion(value));
  };

  /* Set up category data structures */
  $scope.categories = [];
  for (let i = 0; i < CATEGORY_COUNT; i++) {
    /* Category stamp */
    const Category = Stampit({
      props: {
        name: null,
        questions: {}
      },
      init({ name, questions = this.questions }) {
        this.name = name;
        this.questions = questions;
      },
      methods: {
        setQuestion(question) {
          this.questions[question.value] = question;
        },
        getQuestion(value) {
          return this.questions[value] === undefined ? null : this.questions[value];
        }
      }
    });

    /* Question stamp */
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

    const category = Category({ name: i });
    for (let value of $scope.values) {
      const question = Question({ value, text: 'Test question', answer: 'Test answer' });
      category.setQuestion(question);
    }
    $scope.categories.push(category);
  }
}]);
