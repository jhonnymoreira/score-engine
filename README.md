# Score Engine CLI

A CLI application to calculate the credit score based on the user's age, city, and monthly income.

---

## Table of Contents

- [Requirements](#requirements)
- [Usage](#usage)
- [Local Usage](#local-usage)
  - [With Docker](#local-usage-with-docker)
  - [Without Docker](#local-usage-without-docker)
- [Testing](#testing)
- [Available package commands](#available-package-commands)
- [Tools used](#tools-used)

---

## Requirements

- An OpenWeatherMap API key. Check the [API documentation](https://openweathermap.org/api) for more information.

---

## Usage

```bash
# pnpm (recommended)
env OPENWEATHER_API_KEY=<api-key> \
  pnpm dlx @score-engine/cli [--ajuda,-a|--idade <idade> --cidade <cidade> --renda-mensal <renda-mensal>]

# npm
env OPENWEATHER_API_KEY=<api-key> \
  npx @score-engine/cli [--ajuda,-a|--idade <idade> --cidade <cidade> --renda-mensal <renda-mensal>]

# yarn
env OPENWEATHER_API_KEY=<api-key> \
  yarn dlx @score-engine/cli [--ajuda,-a|--idade <idade> --cidade <cidade> --renda-mensal <renda-mensal>]
```

---

## Example

```bash
# Linux or WSL
env OPENWEATHER_API_KEY=<api-key> \
  pnpm dlx @score-engine/cli --idade 20 --cidade São Paulo --renda-mensal 1000
```

---

## Local Usage

<h3 id="local-usage-with-docker">With Docker</h3>

- Install [Docker](https://docs.docker.com/get-docker/)
- Build the image
  ```bash
  docker build -t score-engine-cli:latest .
  ```
- Create a `.env` file with your OpenWeatherMap API key
  ```bash
  cp .env.example .env
  ```
- Run the image
  ```bash
  docker run --env-file .env score-engine-cli:latest [--ajuda,-a|--idade <idade> --cidade <cidade> --renda-mensal <renda-mensal>]
  ```

<h3 id="local-usage-without-docker">Without Docker</h3>

- Install [Node.js](https://nodejs.org/en) >=v20 (LTS Iron) or above

  ```bash
  # using nvm
  nvm install lts/iron
  ```

- Install [pnpm](https://pnpm.io/installation#using-corepack) >=v9
  ```bash
  corepack enable pnpm
  ```
- Install dependencies

  ```bash
  pnpm install
  ```

- Run the CLI

  ```bash
  pnpm tsx src/index.ts [--ajuda,-a|--idade <idade> --cidade <cidade> --renda-mensal <renda-mensal>]
  ```

- _(Optional)_ Run the CLI with the build output
  ```bash
  pnpm build && \
    node ./dist/index.js [--ajuda,-a|--idade <idade> --cidade <cidade> --renda-mensal <renda-mensal>]
  ```

---

## Testing

Tests are written using [Vitest](https://vitest.dev/).

```bash
pnpm test
# or with Docker
docker run --entrypoint 'pnpm test' score-engine-cli:latest
```

To run the tests in watch mode, use the following command:

```bash
pnpm test:watch
# or with Docker
docker run --entrypoint 'pnpm test:watch' score-engine-cli:latest
```

To generate a coverage report, use the following command:

```bash
pnpm test:coverage
# or with Docker
docker run --entrypoint 'pnpm test:coverage' score-engine-cli:latest
```

---

## Available package commands

| Command         | Description                                     |
| --------------- | ----------------------------------------------- |
| `build`         | Builds the CLI.                                 |
| `lint`          | Runs the linter (ESLint).                       |
| `lint:fix`      | Runs the linter (ESLint) and fixes any issues.  |
| `prettify`      | Formats the files using Prettier.               |
| `test`          | Runs the tests.                                 |
| `test:coverage` | Runs the tests and generates a coverage report. |
| `test:watch`    | Runs the tests in watch mode.                   |

---

## Tools used

- Programming Language: JavaScript (with [TypeScript](https://www.typescriptlang.org/)) on [Node.js](https://nodejs.org/en)
- Building: [tsup](https://github.com/egoist/tsup)
- Changelogs: [Changesets](https://github.com/changesets/changesets)
- Code Quality pipelines: [husky](https://github.com/typicode/husky), [lint-staged](https://github.com/okonet/lint-staged)
- Containerization: [Docker](https://www.docker.com/)
- Formatting: [Prettier](https://prettier.io/)
- Linting: [ESLint](https://eslint.org/)
- Testing: [Vitest](https://vitest.dev/)
- Utilities: [lodash.get](https://www.npmjs.com/package/lodash.get)
- Validation: [zod](https://github.com/colinhacks/zod)
