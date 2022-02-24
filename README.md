# 🏰 Kingdom SDK (core module)

Transforming the model designed on [Python Kingdom SDK](https://github.com/t10d/kingdom-python-sdk) to a Node.js equivalent.

## Step-by-step commands

Commands used to build the boilerplate.

```bash
nvm install lts/gallium
nvm current > .nvmrc
yarn init -y
yarn add -D typescript
yarn tsc --init
yarn add -D tsconfig-paths
yarn add -D eslint
yarn eslint --init
yarn add -D jest
yarn jest --init
yarn add -D @types/jest
yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env @babel/preset-typescript
yarn add -D husky
yarn husky --init
yarn add -D ts-node
```

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
- [**Babel**](https://www.npmjs.com/package/@babel/core): JS compiler.
- [**Husky**](https://www.npmjs.com/package/husky): Git hooks utility.
- [**Jest**](https://www.npmjs.com/package/jest): Testing framework.

## Adding a Git hook

After installing the dependencies, automatically the script `prepare` will set up the husky to git hooks.

To add a script to be run before every commit (such as code enforcement), follow the example below or edit by hand the [`pre-commit`](.husky/pre-commit) file.

```bash
yarn husky add .husky/pre-commit "yarn check-style"
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
