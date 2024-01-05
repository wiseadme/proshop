module.exports = {
    extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-recommended-vue'
    ],
    plugins: [
        'stylelint-plugin-import',
        'stylelint-order',
        'stylelint-scss'
    ],
    rules: {
        "indentation": 2,
        "string-quotes": "double",
        "no-duplicate-selectors": true,
        "color-hex-case": "lower",
        "color-hex-length": "long",
        "color-named": "never",
        "selector-no-qualifying-type": true,
        "selector-max-combinators": 0,
        "selector-combinator-space-after": "always",
        "selector-attribute-quotes": "always"
    },
}
