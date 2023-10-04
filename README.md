# Article Hub API 🗞️

## Overview
Welcome to the Article Hub API! It’s a simple and easy-to-use service for accessing news articles and related data. It’s hosted online [here](https://article-hub-api.onrender.com) for anyone to use.

## What’s Inside?
The API provides access to a variety of news articles, allows for comments to be posted, and even lets you filter news by specific topics. It’s built using Node.js and Express and uses PostgreSQL for storing data.

## Table of contents

- [Article Hub API 🗞️](#article-hub-api-️)
  - [Overview](#overview)
  - [What’s Inside?](#whats-inside)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [What You Need](#what-you-need)
    - [How to Get It Running](#how-to-get-it-running)
    - [.env.development file](#envdevelopment-file)
    - [.env.test file](#envtest-file)
    - [.env.production file (if you are hosting the api)](#envproduction-file-if-you-are-hosting-the-api)
  - [Additional Information](#additional-information)

## Getting Started

### What You Need
- <a href="https://nodejs.org">Node.js</a> (v18.18.0 or newer)
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
4. **Populate the Database:**
```
npm run seed
```
5. **Run the Tests:**
To ensure all the tests succeed, you'll need to install devDependencies, jest (extensions to jest), pg-format by running the following command.
```
npm install jest-extended -D
npm install jest-sorted -D
npm install jest -D
npm install pg-format -D
npm test
```
## Additional Information

Check out what API endpoints are available and how to use them by going to [API Info](https://article-hub-api.onrender.com)

The database is stored on ElephantSQL and hosted using Render.