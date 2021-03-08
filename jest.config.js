module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest",
        ".+\\.(css|styl|less|sass|scss|png|svg|jpg|ttf|woff|woff2)$": "jest-transform-stub"
    },
    "globals": {
        'ts-jest': {
            "tsconfig": 'tsconfig.test.json'
        }
    },
    "transformIgnorePatterns": [
        "/node_modules/(?!react-select-search).+\\.js$"
    ],
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],

    "setupFilesAfterEnv": ["<rootDir>/src/setupJest.ts"]
};
