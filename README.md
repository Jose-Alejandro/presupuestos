# Presupuestos
Author: Alejandro Esquivel

# Usage
* Clone Repo `git clone https://github.com/Jose-Alejandro/presupuestos.git`

# Setup MS Sql server
* Install MS SQL server
* Setup username and password
* Create an empty database e.g.
``` my_budgets ```
* save these (username, password, database name) to a .env file, as described next

# Set up your .env file with environmental variables
*  Setup ``` HOST ```, ```PORT```, ```DB_USER```, ```DB_PASS```, ``` DB_NAME ```, ``` DIALECT ```, ``` SECRET_KEY ```, ``` WHITE_LIST ``` environmental variables
* Example of .env file:

```
HOST= 'localhost'
PORT = 8080

DB_USER = 'user'
DB_PASS = 'pass'
DB_NAME = 'my_budgets'
DIALECT = 'mssql'

SECRET_KEY = 'MySecretKey.'

WHITE_LIST = ['http://127.0.0.1:8080', 'http://127.0.0.1:3000']
```
* Save it to the root of the app folder
# Start App Server
* Execute `npm install` to instal nodejs dependencies modules
* Execute `npm run dev` to debug and restart server on changes
* Execute `npm run start` to execute the app
* Go to a web browser and navigate to ```http://$HOST:$PORT```, likely ```http://localhost:8080```
* Run test by running ```npm run test```
