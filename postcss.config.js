/**
 * Created by scriptchao on 2017/11/15.
 */

const options = {
    rootValue: 50,
    propList: ['*'],
};

module.exports = {
    plugins: [
        require('autoprefixer')({
            // browsers: ['last 2 versions']
            browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
        }),
        require('postcss-pxtorem')(options)
    ]
};
