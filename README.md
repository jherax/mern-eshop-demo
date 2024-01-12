# Demo with MERN stack

## Environment

Make sure to set the env variables. For local environment you can create a
`.env` file with the following environment variables:

```bash
APP_HOST=localhost
APP_PORT=3004
```

## Running the server

Just run the command

```bash
npm run mongod
npm run dev:server
```

## Docker

MongoDB is loaded as a docker container, sou you need to make sure to create a
`.env` file with the following environment variables:

```bash
DB_ROOT_USERNAME=root
DB_ROOT_PASSWORD=root
DB_INIT_USERNAME=appuser
DB_INIT_PASSWORD=symfony
DB_NAME=store
DB_HOST=localhost
DB_PORT=27012
ME_PORT=3001
```

In order to run MongoDB, you need to mount the docker container, and start the
`mongod` service. To do that just run the command:

```bash
npm run mongod
```

After that, let's make sure the container is running:

```bash
docker ps -a
```

You should have a result like this:

```bash
CONTAINER ID   IMAGE         COMMAND                  CREATED      STATUS        PORTS                     NAMES
db936f592d4d   mongo:6.0.8   "docker-entrypoint.s…"   1 hour ago   Up 2 minute   0.0.0.0:27012->27017/tcp  mongodb_6
6f518f569c4b   mongo-express "tini -- /docker-ent…"   1 hour ago   Up 2 minutes  0.0.0.0:3001->8081/tcp    mongo-express
```

To open [mongo-express](https://github.com/mongo-express/mongo-express), the
web-based MongoDB admin interface, go to the browser and navigate to
`http://localhost:3001/`, using credentials in the env variables
`DB_INIT_USERNAME` and `DB_INIT_PASSWORD`

If you want to opent the terminal to run commands on the container, just run the
following command for the specific container:

```bash
docker exec -it mongodb_6 bash
root@mongodb:/#
```

## Husky

```bash
npm install husky -D
```

Edit `package.json` > `prepare` script and run it once:

```bash
npm run prepare
```

Add a hook:

```bash
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/post-commit "git update-index -g"
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
```

See:
[conventional-changelog/commitlint](https://github.com/conventional-changelog/commitlint).

## Standard-version

`standard-version` is a utility for versioning using **semver** and CHANGELOG
generation powered by Conventional Commits. You need to have a starting point to
append the CHANGELOG and other versions to. The first time simply run:

```bash
npm run release -- --first-release
```

Then, for a new release, just run:

```bash
npm run release
```

⚠️ _**standard-version** is deprecated. It is recommended to use an alternative
like [`release-please`](https://github.com/googleapis/release-please)._

For more details, please visit the Github site
[standard-version](https://github.com/conventional-changelog/standard-version)
