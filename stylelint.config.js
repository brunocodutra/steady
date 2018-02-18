module.exports = {
  extends: [
    'stylelint-config-sass-guidelines',
    'stylelint-config-property-sort-order-smacss',
  ],
  rules: {
    'max-nesting-depth': null,
    'order/properties-alphabetical-order': null,
    'scss/at-extend-no-missing-placeholder': null,
    'selector-max-id': 1,
  }
}
