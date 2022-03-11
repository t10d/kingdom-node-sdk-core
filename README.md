# 🏰 Kingdom SDK: Core module

Core module to design DDD applications in TypeScript.

## Features

See the [changelog](./CHANGELOG.md) to know all the features supported.

## Installation

Use the package manager [npm](https://npmjs.org) to install `@kingdom-sdk/core`.

```bash
npm install @kingdom-sdk/core
```

You can use [yarn](https://yarnpkg.com/) as well.

```bash
yarn add @kingdom-sdk/core
```

## Development Dependencies

- [**TypeScript**](https://www.npmjs.com/package/typescript): Add support to static typing.
- [**TS node**](https://www.npmjs.com/package/ts-node): TypeScript interactive shell (REPL).
- [**TS config paths**](https://www.npmjs.com/package/tsconfig-paths): Simplify imports using an custom "@".
- [**ESLint**](https://www.npmjs.com/package/eslint): Style and code enforcement.
- [**Prettier**](https://www.npmjs.com/package/prettier): Style enforcement.
- [**Babel**](https://www.npmjs.com/package/@babel/core): JS compiler.
- [**Husky**](https://www.npmjs.com/package/husky): Git hooks utility (pre-commit).
- [**Lint staged**](https://www.npmjs.com/package/lint-staged): Run style check only for staged files (pre-commit).
- [**Jest**](https://www.npmjs.com/package/jest): Testing framework.

## Production Dependencies

- [**UUID**](https://www.npmjs.com/package/uuid): UUID generator.
- [**Object Hash**](https://www.npmjs.com/package/object-hash): Hashing utility.

## Adding a Git hook

After installing the dependencies, automatically the script `prepare` will set up the husky to git hooks.

To add a script to be run before every commit (such as code enforcement), follow the example below or edit by hand the [`pre-commit`](.husky/pre-commit) file.

```bash
yarn husky add .husky/pre-commit "yarn lint-staged"
```

## REPL

You can test sorts of TypeScript code interactively through the `ts-node` executable:

```bash
yarn ts-node
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
