# E-commerce demo with MERN stack

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
npx husky add .husky/pre-commit "run your commands"
npx husky add .husky/post-commit "git update-index -g"
git add .husky/pre-commit .husky/post-commit
```
