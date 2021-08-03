# Quasar App (quasar-vue)

A Quasar Framework app

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://v2.quasar.dev/quasar-cli/quasar-conf-js).

### Hosted version
Hosted on netlify -> https://keenalc.netlify.app/#/  (for 1)
                     https://keenalc.netlify.app/#/design (for 2)


### REST Api integration
The 1 challenge is connected with node.js for backend api's, if the API's doesn't work in the hosted url, please checkout the Project and perform the following to run the api:
 1. In the app folder
    ```bash
    cd server && node index.js
    ```
2. Update the api in axio.js