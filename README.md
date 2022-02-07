# 🚀 Space Pups 🐶

_🚀 Space Pups 🐶_ is the premiere (fictional) space–age dog washing service! This repo is for use with the companion FaunaDB article.

## Getting started

### Clone this repo

```sh
git clone git@github.com:trezy/space-pups.git
```

### Install dependencies

This project uses Expo, so you'll need to install the Expo CLI globally.

```sh
yarn global add expo-cli # or npm install -g expo-cli
```

Next, we want to install and link the project dependencies.

```sh
yarn install # or npm install
expo install react-native-screens react-native-safe-area-context
npx react-native link react-native-safe-area-context
npx react-native link react-native-vector-icons
```

### Run the project

To start the project, you can use the `start` package script.

```sh
yarn start # or npm run start
```

## Starting point

To get to the starting point from the article, you can checkout the `start` tag.

```sh
git checkout start
yarn start
```

## Final result

To get to the final result from the article, you can checkout the `final` tag. Note that this should also be the latest commit to the repository.

```sh
git checkout final
yarn final
```

### Setup the Fauna client

To get the final version running, you'll need to inject your FaunaDB connection details into the `faunadb.Client` in `helpers/faunaClient.js`.

### Automate the database

I've included a few scripts int eh `scripts/` directory to make it easier to set up your database if you want to skip that part of the article.

#### `scripts/createDB.js`

This script will just create the `Customers`, `Services`, and `Orders` collections.

#### `scripts/seedDB.js`

This script will seed the `Customers` and `Services` collections with a single customer and three services.

#### `scripts/createFunctions.js`

This script will create the `create_order` and `get_services` functions as User-Defined functions in your database. The resulting `create_order` function will be the initial version that we create in the article, before deploying our app.

#### `scripts/updateFunctions.js`

This script will update the `create_order` function to its final version from the article.
