import typescriptEslint_eslintPlugin from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["eslint.config.mjs", "dist", "build", "node_modules"],
}, ...compat.extends("plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"), {
    plugins: {
        "@typescript-eslint": typescriptEslint_eslintPlugin,
    },

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            project: "tsconfig.json",
            tsconfigRootDir: "./",
        },
    },

    rules: {
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "warn",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/ban-ts-comment": "error",
        "@typescript-eslint/no-non-null-assertion": "warn",
        "@typescript-eslint/no-floating-promises": "warn",
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/prefer-readonly": "warn",
        "@typescript-eslint/promise-function-async": "warn",
        "@typescript-eslint/require-await": "warn",
        "@typescript-eslint/restrict-plus-operands": "warn",
    },
}];