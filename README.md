# Product-Management-System

## Getting started

## Installations Required
* PostgreSQL
* DBeaver (Optional)
* Node
* NPM
* Sequelize-cli

### Setting up the project

* Clone this repository: `git clone https://github.com/RavindraKale96/Product-Management-System.git`
* Move into the project directory: `cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME`
* Make sure you have the `.env` file in the backend project directory.
* Install the dependencies: `npm install`
* The project uses the `Sequelize` ORM to work with the PostgeSQL database. So install sequelize-cli globally: `sudo npm install -g sequelize-cli` (for Linux)
* While installing the sequelize-cli globally, you may get a permission denied error. So for that you need to change the file permission by: `sudo chown -R $USER /usr/local/lib/node_modules`. Then again try installing sequelize-cli by `sudo npm install -g sequelize-cli`
* To make sure sequelize is installed globally in your system, type `sequelize` in your terminal. If this gives you the list of sequelize commands, which gives you an indication that you have successfully installed sequelize-cli on your system.
* Once eveything mentioned above is installed successfully, run the migrations:
    * Make sure you have `PostgreSQL` installed on your system. Open your postgres terminal and do the following:
        * On PostgreSQL create a database, named `product_db` using the following command: `CREATE database product_db;`
        * Check whether the database has created successfully using the following command: `\l`
    * Navigate back to your project directory, and give the following command: `sequelize db:migrate`. This will migrate all the migration files.
    * To verify whether all the files have migrated, use to following command: `sequelize db:migrate:status`. This will give you a list of migration files in the output.If you see, before all the migration files `up` is mentioned, that means you have successfully done the migration.

### Working on the project

* Move into the project directory: `cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME`
* Run the development task: `npm start`
    * Starts a server running at http://localhost:8085
    * Automatically restarts when any of your files change
* For Image file store I have used server folder `uploads`. but we need to use `S3` for file store and send for frontend we need to use `S3 signed URLs`.

