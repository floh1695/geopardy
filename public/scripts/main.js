/* global angular */
/* global stampit */

'use strict';

const Stampit = stampit.default;

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

const JService = (call, options = {}) => {
  const handleOptions = (options) => {
    const optionsArr = [];
    for (let option in options) {
      optionsArr.push([option, options[option]]);
    }
    return optionsArr
      .map(optionPair => optionPair.join('='))
      .join('&');
  };
  return `http://jservice.io/api/${call}?${handleOptions(options)}`;
};

/** Returns an array of unique category id's */
const randomCategories = (count = 5) => {
  const randomCategoryId = () => {
    const randomInteger = (lower, upper) => {
      return lower + Math.floor(Math.random() * (upper - lower + 1));
    }
    const maxCategoryId = 18418; // Magic number supplied by https://github.com/ctiller15
    return randomInteger(1, maxCategoryId);
  }
  const arr = [];
  do {
    const categoryId = randomCategoryId();
    if (!arr.includes(categoryId)) {
      arr.push(categoryId);
    }
  } while (arr.length < count);
  return arr;
}

const geopardyApp = angular.module('geopardyApp', []);

/* Add dollar sign to values */
geopardyApp.filter('currency', () => {
  return (amount) => {
    return `\$${amount}`;
  };
});

geopardyApp.controller('geopardyController', ['$scope', '$http', ($scope, $http) => {
  /* Configuration */
  const CATEGORY_COUNT = 5;

  $scope.values = [1, 2, 3, 4, 5].map(v => v * 200);
  $scope.selectQuestion = (category, value) => {
    console.log(category.getQuestion(value));
  };

  /* Set up category data structures */
  $scope.categories = [];
  const categoryIds = randomCategories(CATEGORY_COUNT);
  for (let i = 0; i < CATEGORY_COUNT; i++) {
    const category = Category({ name: i, id: categoryIds.pop() });
    for (let value of $scope.values) {
      const question = Question({ value, text: 'Test question', answer: 'Test answer' });
      category.setQuestion(question);
    }
    $http({
      method: 'GET',
      url: category.apiCall()
    })
    .then((response) => {
      if (response.status === 200) { return response.json; }
      else { console.warn('API call failed', response); }
    });
    $scope.categories.push(category);
  }

}]);
