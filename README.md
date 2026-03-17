# Stock Portfolio Tracker

A full-stack web application designed for users to track, analyze, and manage their virtual stock portfolios in real-time. The application features user authentication, dynamic charting, and a custom microservice that scrapes live stock dataline directly from the web.

## 🚀 Features

Here are the primary working features of the application:

1. **User Authentication (Working)**
   - Secure Signup and Login functionality.
   - Sessions managed using JWT (JSON Web Tokens).
   - Passwords securely hashed via `bcrypt`.

2. **Live Market Scraping (Working)**
   - A dedicated Python Flask microservice that web-scrapes Google Finance using `BeautifulSoup`.
   - Fetches the real-time NSE (National Stock Exchange) price and volume data for requested stock tickers.

3. **Portfolio Management (Working)**
   - Users can securely buy stocks, specifying price and quantity.
   - Tracks the user's purchased stocks in the database, allowing them to view their personal portfolio.
   - The `/portfolio` dashboard highlights the users' individual holdings.

4. **Technical Stock Analysis & Charting (Working)**
   - Dedicated `/technical/:name` routes for individual stocks.
   - Interactive candlestick and line charts rendering historical data via `recharts` and `lightweight-charts`.
   - View detailed market updates.

5. **Daily Synchronized Updates (Working)**
   - Backend automated scripts and API routes to update daily stock prices.
   - Keeps historical dataline records for each stock.

---

## 🛠 Tech Stack

- **Frontend:** React 18, Tailwind CSS, Redux Toolkit, Recharts, Lightweight Charts, React Router v6.
- **Backend:** Node.js, Express.js, JWT Authentication.
- **Database:** MongoDB (via Mongoose ODM).
- **Data Scraper (Microservice):** Python, Flask, BeautifulSoup4, Requests.

---

## 🔄 How It Works (Workflow)

The application relies on three distinct layers that communicate with one another:

1. **The Python Data Scraper Layer:**
   When live data is needed, the `fetch.py` script acts as an internal API. It takes a ticker symbol, scrapes Google Finance for real-time price and volume metrics seamlessly, and serves it as JSON responses to the main backend.

2. **The Node.js/Express Backend Layer:**
   This is the core nervous system. It connects to the MongoDB instance and provides secure RESTful API endpoints.
   - Handles securely registering users and issuing authentication tokens.
   - Manages the logic behind "Buying" a stock and injecting that transaction into the user's portfolio.
   - Maintains a historical log of daily stock prices using the `dailyUpdate.js` controllers.

3. **The React Frontend Layer:**
   This acts as the client's dashboard. Using state management (Redux Toolkit) and dynamic routing, it proxies API calls to the Node.js backend. 
   - A user logs in, sees the overall market trends, clicks on a stock to view its technical chart, and executes a purchase. The frontend triggers the backend API, updates the database, and provides real-time visual feedback to the user!

---

## 🏃‍♂️ Running the Project Locally

To run the full stack on your local machine, you need to spin up three independent servers.

### 1. Start your local Database
Make sure you have a local instance of **MongoDB** running on your machine (default port `27017`).

### 2. Run the Python Scraper Service
```bash
cd backend/python
pip install flask flask-cors bs4 requests
python fetch.py
```
*(This will start the Flask app serving stock metrics on `http://127.0.0.1:8080`)*

### 3. Run the Node.js Backend API
In a new terminal:
```bash
cd backend
npm install
npm run dev
```
*(This starts the main backend server on `http://localhost:4900`)*

### 4. Run the React Frontend
In a new terminal:
```bash
cd stock-frontend
npm install
npm start
```
*(This will compile the frontend and open up the dashboard at `http://localhost:3000`)*
