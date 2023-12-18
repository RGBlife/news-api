# Article Hub API 🗞️

## Overview
Welcome to the Article Hub API! It’s a simple and easy-to-use service for accessing news articles and related data. It’s hosted online [here](https://article-hub-api.onrender.com) for anyone to use.

This project is part of my portfolio whilst enrolled on the Northcoders Software Development Bootcamp.

## What’s Inside?
The API provides access to a variety of news articles, allows for comments to be posted, and even lets you filter news by specific topics. It’s built using Node.js and Express and uses PostgreSQL for storing data and tested using Jest using the Test-Driven Development approach.

### Tech Stack
- Node.js
- Express
- PostgreSQL
- Jest & [Supertest](https://www.npmjs.com/package/supertest)

## Table of contents

- [Article Hub API 🗞️](#article-hub-api-️)
  - [Overview](#overview)
  - [What’s Inside?](#whats-inside)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [What You'll Need](#what-youll-need)
    - [How to Get It Running](#how-to-get-it-running)
  - [Additional Information](#additional-information)

## Getting Started

### What You'll Need
- <a href="https://nodejs.org">Node.js</a> (v14.17.0 or newer)
- <a href="https://www.postgresql.org/">PostgreSQL</a> (v11.18 or newer)

### How to Get It Running
1. **Clone the Project:**
   ```
   git clone https://github.com/RGBlife/news-api.git
   cd news-api
   ```
2. **Install Dependencies:**
   ```
   npm install
   ```
3. **Set up your Environments:**

    You will need to add the following environment variables to connect to the databases if you wish to clone the project and run it locally.

    You’ll need to create two .env files: one for development (.env.development) and one for testing (.env.test). These should contain the variables needed for database connections.

    Example files:
    ### .env.development file
    ```
    PGDATABASE=nc_news
    ```
    ### .env.test file
    ```
    PGDATABASE=nc_news_test
    ```
    ### .env.production file (if you are hosting the api)
    ``` 
    DATABASE_URL=your_database_url
    PORT=your_chosen_port
    ```
4. **Setup the database and Populate:**
    ```
    npm run setup-dbs
    npm run seed
    ```
5. **Run the Tests:**
    Execute the test with the following command:
    ```
    npm test
    ```
## Additional Information

Check out what API endpoints are available and how to use them by going to [API Info](https://article-hub-api.onrender.com/api/) (I recommend installing the popular [JDON viewer](https://chromewebstore.google.com/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh)  chrome extension that will display the JSON data in a more readable format.

The API has been created using the [MVC design pattern](https://developer.mozilla.org/en-US/docs/Glossary/MVC) and the database is stored on [ElephantSQL](https://www.elephantsql.com/) and hosted using [Render](https://render.com/).
