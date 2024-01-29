# Air Quality REST API

## Overview

This project is a Node.js REST API that provides air quality information for the nearest city to GPS coordinates using the IQAir API. It includes features such as fetching real-time air quality, implementing a cron job to monitor air quality for a specific location, and storing data in a database.

## Table of Contents

- [Configuration](#configuration)
- [Endpoints](#endpoints)
- [Getting Started](#getting-started)

## Configuration

1. Register on IQAir and obtain your API Key [here](https://www.iqair.com/fr/dashboard/api).

## Endpoints

- `/api/air-quality?latitude={LATITUDE}&longitude={LONGITUDE}`: Get air quality information for a specific location.
- `/api/most-polluted-time`: Get the date and time when the Paris zone is most polluted.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/pasDamola/yassir-challenge.git
   cd yassir-challenge
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a .env file, add your IQAir API key and mongo connection:

   ```bash
   IQAIR_API_KEY=your-iqair-api-key
   MONGO_URI=your-mongo-uri
   ```

4. Run the API:

   ```bash
   npm start
   ```
