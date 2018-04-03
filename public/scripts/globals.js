'use strict'

const Stampit = stampit.default;

const CATEGORY_COUNT = 5;

const MONEY_VALUES = [1, 2, 3, 4, 5].map(v => v * 200)

const randomInteger = (lower, upper) => {
    return lower + Math.floor(Math.random() * (upper - lower + 1));
}
