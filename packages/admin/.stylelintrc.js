export default {
    extends: [
        'stylelint-config-html',
        'stylelint-config-standard-scss',
        'stylelint-config-recommended-vue/scss'
    ],
    plugins: [
        'stylelint-order',
        'stylelint-scss'
    ],
    customSyntax: 'postcss-scss',
    overrides: [
        {
            'files': [ '**/*.vue' ],
            'customSyntax': 'postcss-html'
        },
    ],
    rules: {
        'order/order': [ 'custom-properties', 'declarations' ],
        'order/properties-alphabetical-order': true,
        'no-duplicate-at-import-rules': true,
        'no-duplicate-selectors': true,
        'color-named': 'never',
        'selector-no-qualifying-type': true,
        'selector-max-combinators': 3,
        'selector-attribute-quotes': 'always',
        'selector-class-pattern': null,
        'selector-pseudo-class-no-unknown': null,
        'property-no-unknown': null
    },
}
