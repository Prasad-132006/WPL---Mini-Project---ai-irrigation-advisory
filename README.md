# Smart Irrigation Advisory System

## Overview

Smart Irrigation Advisory System is an AI-powered web application designed to help sugarcane farmers optimize irrigation practices. The system analyzes farm conditions such as soil moisture, weather forecasts, and crop information to generate intelligent irrigation recommendations.

The goal is to reduce water wastage, improve crop productivity, and support data-driven agricultural decision-making.

---

## Problem Statement

Traditional irrigation decisions are often based on farmer experience rather than scientific data. This can lead to:

* Over-irrigation
* Water wastage
* Reduced crop yield
* Increased cultivation costs
* Inefficient resource utilization

This project provides a digital platform that assists farmers with irrigation planning using AI-driven recommendations.

---

## Current Features

### Home Page

* Responsive public home page
* State-aware Get Started action for new, registered, and logged-in users
* Registration and login flow using browser local storage
* Protected dashboard route available at `/dashboard`

### Farmer Dashboard

* Plot name, area, crop, crop stage, soil type, and soil moisture inputs
* IoT sensor connection toggle with live/manual mode
* Rainfall probability, temperature, and sensor status display
* AI analysis loading state
* Dataset-backed irrigation timing, duration, water quantity, and method
* Historical yield reference and disease-risk alert
* Advisory acceptance control

### Authentication

1. A new user registers an account.
2. The account is stored locally in the browser.
3. Login is allowed only with the registered email and password.
4. Successful login opens the protected dashboard.
5. Logout clears the active session.

### Dataset

`FINAL_SUGARCANE_DATASET.csv` contains 3,000 historical sugarcane records. The dashboard loads it as a separate static asset and uses matching soil type and crop stage to provide reference-based recommendations using fields including:

* Soil moisture
* Rainfall and humidity
* Irrigation water quantity per acre
* Irrigation method
* Growth stage
* Yield per acre
* Disease type and severity

The current implementation is a frontend prototype. The dataset supports rule-based historical comparison; it is not yet a trained machine-learning model or a real-time IoT/weather integration.

---

## Technology Stack

### Frontend

* React 19
* Vite
* React Router
* Tailwind CSS
* React Hook Form
* Lucide React

### Data Handling

* CSV static asset loaded at runtime
* Browser local storage for prototype authentication

### Future Integration

* Machine Learning Models
* IoT Sensors
* Weather APIs
* Satellite Data
* Generative AI Advisory Engine

---

## Project Structure

```text
src/
├── auth.js                         # Prototype registration and session helpers
├── App.jsx                         # Routes and protected dashboard boundary
├── components/
│   ├── DashboardWorkspace.jsx      # Interactive farmer workflow
│   ├── DashboardPreview.jsx        # Dashboard visualization component
│   ├── Hero.jsx                    # State-aware Get Started action
│   └── ...
├── data/
│   └── sugarcaneDataset.js         # CSV loader and historical record matching
└── pages/
	├── Dashboard.jsx
	├── Home.jsx
	├── Login.jsx
	└── Register.jsx
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Prasad-132006/WPL---Mini-Project---ai-irrigation-advisory.git
```

### Move to that directory

```bash
cd WPL---Mini-Project---ai-irrigation-advisory
```

### Install Dependencies

```bash
npm install
```

### Run Project

```bash
npm run dev
```

The application will start on:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

---

## Future Enhancements

* Real-time IoT sensor integration
* Weather API integration
* Trained machine learning-based irrigation prediction
* Crop water requirement forecasting
* Yield prediction
* Secure backend authentication and database storage
* Multilingual farmer chatbot
* GIS-based farm visualization
* Mobile application support

---

## Expected Benefits

* Improved water-use efficiency
* Reduced irrigation costs
* Better crop productivity
* Data-driven farming decisions
* Sustainable agricultural practices

---

## Authors

Developed as an academic project for AI-enabled Smart Irrigation Advisory System in Agriculture.
