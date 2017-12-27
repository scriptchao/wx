/**
 * Created by scriptchao on 2017/11/15.
 */
module.exports = {
    plugins: [
        require('autoprefixer')({
            // browsers: ['last 2 versions']
            browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
        })
    ]
};
