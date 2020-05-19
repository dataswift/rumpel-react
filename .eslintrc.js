module.exports = {
    plugins: ["standard", "react", "react-hooks", "@typescript-eslint"],
    rules: {
        "no-var": "error",
        "no-unused-vars": 1,
        "arrow-spacing": ["error", { before: true, after: true }],
        "react-hooks/rules-of-hooks": 'error',
        "react-hooks/exhaustive-deps": 'warn',
        indent: ["error", 2, { "SwitchCase": 1 }],
        "comma-dangle": [
            "error",
            {
                objects: "only-multiline",
                arrays: "only-multiline",
                imports: "never",
                exports: "never",
                functions: "never",
            },
        ],
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                "vars": "all",
                "args": "none"
            }
        ],

        // options to emulate prettier setup
        semi: ["error", "always"],
        "max-len": ["warn", {"code": 120, "tabWidth": 2, "ignoreUrls": true, "ignoreRegExpLiterals": true}],
        "object-curly-spacing": [2, "always"],
        "template-curly-spacing": ["error", "always"],
        "arrow-parens": ["error", "as-needed"],

        // standard.js
        "space-before-function-paren": [
            "error",
            {
                named: "never",
                anonymous: "never",
                asyncArrow: "always",
            },
        ],

        // standard plugin - options
        "standard/object-curly-even-spacing": ["error", "either"],
        "standard/array-bracket-even-spacing": ["error", "either"],
        "standard/computed-property-even-spacing": ["error", "even"],
        "standard/no-callback-literal": ["error", ["cb", "callback"]],

        // react plugin - options
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        "ecmaVersion": 8,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
}
