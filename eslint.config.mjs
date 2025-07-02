// @ts-check

import eslint from "@eslint/js";
import { globalIgnores } from "eslint/config";
import { includeIgnoreFile } from "@eslint/compat";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "node:url";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),
  globalIgnores(["example/**/*", "eslint.config.mjs"])
);
