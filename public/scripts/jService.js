'use strict';

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
