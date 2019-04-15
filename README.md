# BOOST API

## Set up in development

- To make development easier, we will use heroku's free postgres offering. (This is a one time setup). It is always on and never fails so your computer stays free.

  - Sign up for a free personal heroku account (Do not use HSA Dev account).
  - Once you have signed in, click the `New` button on the top right.
  - Select `Create new app`.
  - Add app-name e.g. `hsa-boost-api` and click create.
  - Click the `Overview` tab.
  - Click `Configure Add-ons`.
  - On the addons search bar, search for `Heroku Postgres`.
  - Click the Addon, click provision.
  - Click the new heroku postgres addon, and then go to the settings tab and click `view credentials`. In here, you will see the database settings you will need to connect later.

- Setup app

```bash
npm install
cp sample.env .env
```

- edit the `.env` file on the project root and add necessary details from the heroku postgres addon above.

```bash
npm run dev
```

## Run production app

- Make sure necessary environment variables have been set. Checkout `src/config/index.js` for supported environment variables.

```bash
npm install
npm run start
```

## Migrations

- The app runs new migrations on every startup so you do not need to worry about running them manually.
- If necessary, to run migrations at any time, run `npm run db-migrations`.
- To rollback migrations at any time, run `npm run db-rollback`.
