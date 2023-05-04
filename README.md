# Desafio 1

To start this project, it is necessary to install the dependencies, which will be used in the tests. To install frontend and backend dependences, you need to open a Integrated Terminal of each folder, one related to backend and the other related to the frontend. Then use the command below to install such dependencies:

````
yarn install or npm install
````
<br>

With that done, to run your application you need to do the following steps, set your .env using the .env.exemple as exemple. After run the following code on your backend terminal "yarn typeorm migration:run -d src/data-source", after that done you just need to use the following command on both terminals, backend and frontend
````
yarn dev
````
<br> 
# **About the routes**


````
Route User :
POST: /user - {Parameters: name(tipo string), email(tipo string), phoneNumber(tipo number), password(tipo string)}
POST: /user/login - {Parameters: email(tipo string), password(tipo string)}
GET: /user/ - {Authorization Token necessary to bring the information of the logged in user}
PATCH: /user/:id - {Parameters: name(tipo string), email(tipo string), phoneNumber(tipo number), password(tipo string))}{Authorization Token necessary}
DELETE: /user/:id - {Authorization Token necessary}
````
````
Route Contact :
POST: /contact/:id - {URL Parameters => :id(The ":id" parameter is the id of the person you want to register as a contact), Authorization token is the person's token
which will register a contact}
GET: /contact/:id - {URL Parameters => :id(The ":id" parameter is the id of the person you want to check the contacts)}{Authorization Token necessary}
DELETE: /user/:id/:contactId - {URL Parameters => :id(The ":id" parameter is the id of the user that wants to delete a contact) :contactId(the :contactId is the id of the contact the user wants to delete)}{Authorization Token necessary}
````
<br>

# **About the tests**

This application has tests, which will be used to validate if all business rules were applied correctly.

The tests are located in `src/__tests__`.

In the `integration` subfolder are the tests.

In the `jest.config.json` file are some necessary settings for the tests to run.

**`Do not alter any of these files in any way.`** This could compromise the integrity of the tests.

Also, don't change the `test` script located in `package.json`. This will be used to run the tests.

<br>


# **Running the tests** 

To run the tests it is necessary that in your terminal, you are inside the project directory.

Once you are in the terminal and within the correct path, you can use the following commands:

### Run all tests
````
yarn test
````


<br>


**In case you want to check all test execution options, visit the [Official Jest Documentation](https://jestjs.io/docs/cli)**

After running one of the commands, a log will appear in your terminal, containing the test execution information.

**Note:** The test may take a few seconds to complete. The larger the test, the more time it takes to run.

#
