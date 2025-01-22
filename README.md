# dream-travels
Technical test for Exoticca (only for this purpose)
=======
This project is build over [React.js](https://react.dev/) using [Next.js](https://nextjs.org/) and [PostGres](https://www.postgresql.org/)


## Install dependencies, build the project and run it

Install dependencies

```bash
npm install
```

Then, build an optimized version:

```bash
npm run build
```

Finally, run the server:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing the UI

### Unit testing with Jest

We are using [Testing-library](https://testing-library.com/) and [Jest](https://jestjs.io/) to test the UI

You can now run tests

```bash
#run unit tests
npm run test
```

## Deployed version

The app has been deployed in my personal account

[Deployed version](https://dream-travels-hazel.vercel.app/)

## Technical test coverage
All the test objectives have been done:
* Initial view with default list retrieved from remote endpoint (and then used in cache)
* Filter by any trip properties
* Detailed view, create and edit form
* Delete trip option
* A trip can be marked as completed or upcoming
* Bidirectional navigation netween completed and upcoming
* Completed view
* A completed trip can be set as upcoming
* The application can be used in any device (also responsive)
* All the components have their related test file (unit tests)

*Extra ball*

* A button has been added on the top of the application, select a random trip and set it as "automatic upcoming". Then a countdown is displayed with 3 months. Each time you reload the browser, the information is kept in cookie.
* The button is not clickable once a random trip has been selected

## Incoming improvements
All the project has been done in the given deadline. Some technical points should be improved in a (eventual) second round:
* Image optimization
* Pass the count down as a context provider, to display the information in related trip card
* Add integration tests with Cypress
* Add form validation data
* Improve some graphical elements
* Add a confirmation popup when deleting a trip

## Authors

- [@xthevenot](https://github.com/xthevenot)

> [!IMPORTANT]  
> All the **Exoticca** branding elements are trade marked. Use only for the purpose of technical testing.