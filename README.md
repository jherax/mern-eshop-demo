# E-commerce demo with MERN stack

## Running the server

Just run the command

```bash
npm run start-dev
```

## husky

```bash
npm install husky -D
```

Edit `package.json` > `prepare` script and run it once:

```bash
npm run prepare
```

Add a hook:

```bash
npx husky add .husky/pre-commit "eslint and prettier commands"
npx husky add .husky/post-commit "git update-index -g"
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
git add .husky/
git commit -m "chore: Added git hooks with husky"
```

See:
[conventional-changelog/commitlint](https://github.com/conventional-changelog/commitlint).

## standard-version

`standard-version` needs to have a starting point to append the CHANGELOG and
other versions to. Simply run:

```bash
npm run release -- --first-release
```

### Usage

For a new release, just run

```bash
npm run release
```

For more details, please visit the Github site
[standard-version](https://github.com/conventional-changelog/standard-version)
