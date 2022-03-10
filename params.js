var exports = {
    parse: function(argv) {
        var named = {};
        var unnamed = [];

        for(var arg of argv) {
            var [name, value] = arg.split(':');

            if(!value) {
                unnamed.push(name);
            } else {
                named[name] = value;
            }
        }

        return { named, unnamed };
    },

    parseNamed: function(argv, strict = true) {
        var named = {};

        for(var arg of argv) {
            var [name, value] = arg.split(':');

            if(!value && strict) {
                throw new SyntaxError('parseNamed: property has no value!');
            }

            named[name] = value;
        }

        return named;
    }
}

module.exports = exports;