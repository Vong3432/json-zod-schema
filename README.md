# json-zod-schema

![NPM](https://img.shields.io/npm/l/@gjuchault/typescript-library-starter)
![NPM](https://img.shields.io/npm/v/@gjuchault/typescript-library-starter)



## Opinions and assumptions
1. The clients of this SDK have to setup `zod` in order to use the SDK:
	- To prevent direct dependencies between the frontend/backend apps, the clients of the SDK can create their own internal NPM library that includes all the schemas needed between frontend and backend, by this way they don't have to handle the schema.
	- Separating out the schema from frontend/backend can help to achieve data model sharing.

## Getting started

1. `npm install`
2. `npm test`

To enable deployment, you will need to:

1. Set up the `NPM_TOKEN` secret in GitHub Actions ([Settings > Secrets > Actions](https://github.com/gjuchault/typescript-library-starter/settings/secrets/actions))
2. Give `GITHUB_TOKEN` write permissions for GitHub releases ([Settings > Actions > General](https://github.com/gjuchault/typescript-library-starter/settings/actions) > Workflow permissions)

## How to use this package?
1. Install package
```
npm i json-zod-schema
npm i zod
```

2.
```
import { Schema } from "json-zod-schema";
import { z } from "zod";

const jsonString = JSON.stringify('{"firstName": "John", "lastName": "Doe"}');

    try {
        const customSchema = z.object({
            firstName: z.string().nullable(),
            lastName: z.string().nullable(),
        });
        const user = Schema.get(customSchema, jsonString);
    } catch(e) {
        console.log(e);
    }
```


## Environment

### Node.js, npm version

Relies on [Volta](https://volta.sh/) to ensure the Node.js version is consistent across developers. It's also used in the GitHub workflow file.

### TypeScript

Leverages [esbuild](https://github.com/evanw/esbuild) for blazing-fast builds but keeps `tsc` to generate `.d.ts` files.
Generates a single ESM build.

Commands:

- `build`: runs type checking, then ESM and `d.ts` files in the `build/` directory
- `clean`: removes the `build/` directory
- `type:check`: runs type checking

### Tests

Uses [Node.js's native test runner](https://nodejs.org/api/test.html). Coverage is done using [c8](https://github.com/bcoe/c8) but will switch to Node.js's one once out.

Commands:

- `test`: runs test runner
- `test:watch`: runs test runner in watch mode
- `test:coverage`: runs test runner and generates coverage reports

### Format & lint

This template relies on [Biome](https://biomejs.dev/) to do both formatting & linting in no time.
It also uses [cspell](https://github.com/streetsidesoftware/cspell) to ensure correct spelling.

Commands:

- `lint`: runs Biome with automatic fixing
- `lint:check`: runs Biome without automatic fixing (used in CI)
- `spell:check`: runs spell checking

### Releasing

Under the hood, this library uses [semantic-release](https://github.com/semantic-release/semantic-release) and [Commitizen](https://github.com/commitizen/cz-cli).
The goal is to avoid manual release processes. Using `semantic-release` will automatically create a GitHub release (hence tags) as well as an npm release.
Based on your commit history, `semantic-release` will automatically create a patch, feature, or breaking release.

Commands:

- `cz`: interactive CLI that helps you generate a proper git commit message, using [Commitizen](https://github.com/commitizen/cz-cli)
- `semantic-release`: triggers a release (used in CI)
