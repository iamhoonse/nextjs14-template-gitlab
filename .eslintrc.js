module.exports = {
    "root": true,
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "@typescript-eslint",
        "eslint-plugin-tsdoc",
        "tsdoc-require",
        "prettier"
    ],
    "parserOptions": {
        "project": "./tsconfig.json",
        "tsconfigRootDir": __dirname,
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "env": {
        "node": true
    },
    "extends": [
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/strict",
        "plugin:prettier/recommended",
        "prettier",
        "plugin:storybook/recommended"
    ],
    "rules": {
        // 'React' must be in scope when using JSX 에러 해결 (Next.js)
        "react/react-in-jsx-scope": "off",
        // ts파일에서 tsx구문 허용 (Next.js)
        "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"] }],
        // TS Doc 주석 규약 위배 시 경고 표시
        "tsdoc/syntax": "warn",
        // TS Doc 미작성 시 오류
        "tsdoc-require/require": 2
    }
};