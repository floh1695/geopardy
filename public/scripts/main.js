'use strict';

/** Returns an array of unique category id's */
const randomCategories = (count = 5) => {
    const randomCategoryId = () => {
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
};

const geopardyApp = angular.module('geopardyApp', []);

/* Add dollar sign to values */
geopardyApp.filter('currency', () => {
    return (amount) => {
        return `\$${amount}`;
    };
});

geopardyApp.controller('geopardyController', ['$scope', '$http', ($scope, $http) => {
    /* Configuration */
    $scope.values = MONEY_VALUES;
    $scope.score = 0;
    $scope.hideGrid = false;
    $scope.selectQuestion = (category, value) => {
        console.log(category.getQuestion(value));
        $scope.activeQuestion = category.getQuestion(value);
        $scope.hideGrid = !$scope.hideGrid;
    };
    $scope.submitButton = (event, answer) => {
        $scope.hideGrid = !$scope.hideGrid;
        $scope.activeQuestion.hide = true;
        // TODO: Better answer checking system
        if (answer === $scope.activeQuestion.answer) {
            $scope.score += $scope.activeQuestion.value;
        }
    };

    /* Set up category data structures */
    $scope.categories = [];
    const categoryIds = randomCategories(CATEGORY_COUNT);
    for (let i = 0; i < CATEGORY_COUNT; i++) {
        const category = Category({ name: i, id: categoryIds.pop() });
        $http({
            method: 'GET',
            url: category.apiCall()
        })
        .then((response) => {
            console.log(response);
            if (response.status === 200) { return response.data; }
            else { console.warn('API call failed', response); }
        })
        .then((data) => {
            // console.log(data.clues);
            category.name = data.title;
            category.setDirtyQuestions(data.clues);
            console.log(category);
            // console.log($scope.categories);
        });
        $scope.categories.push(category);
    }

}]);
