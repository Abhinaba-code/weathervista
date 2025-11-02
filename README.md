# WeatherVista

Welcome to WeatherVista, a beautifully designed weather dashboard application that provides real-time weather information, forecasts, and more. Built with Next.js, TypeScript, and Tailwind CSS, it leverages modern web technologies to deliver a stunning and intuitive user experience.

## Features

- **Dynamic Weather Search**: Instantly find weather information for any city in the world.
- **Comprehensive Current Weather**: Get a detailed view of the current conditions, including temperature, "feels like" temperature, humidity, wind speed, UV index, visibility, and atmospheric pressure.
- **5-Day & 24-Hour Forecasts**: Plan ahead with a 5-day forecast and a detailed 24-hour hourly breakdown.
- **Interactive Temperature Chart**: Visualize temperature trends over the next 24 hours with an interactive chart.
- **AI-Powered Weather Alerts**: Receive concise and clear summaries of any weather alerts for your selected location, processed by GenAI.
- **Dynamic Theming**: The application's background gradient changes dynamically to reflect the current weather conditions (Sunny, Cloudy, Rainy, Snowy).
- **Recent Searches**: Quickly access weather for your previously searched cities.
- **Glassmorphism UI**: A modern, visually stunning interface with glassmorphism effects and smooth animations.
- **Responsive Design**: A seamless experience across all devices, from mobile phones to desktop computers.
- **About & Help Pages**: Get to know the creator and learn how to use the app.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or later)
- npm, pnpm, or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd weather-vista
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**

    This project uses the OpenWeatherMap API to fetch weather data. You'll need a free API key to run the application.

    a. **Get an API Key**:
       - Go to [OpenWeatherMap](https://openweathermap.org/price) and sign up for the "Free" plan.
       - After signing up, navigate to your account's API keys section to find your default key. It may take a few minutes to become active.

    b. **Create a `.env.local` file** in the root of your project and add your API key:
       ```
       OPENWEATHER_API_KEY=your_api_key_here
       ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:9002](http://localhost:9002) (or the port specified in your terminal) with your browser to see the result.

## About the Author

This application was created by **Abhinaba Roy Pradhan**.

- **Email**: [abhinabapradhan@gmail.com](mailto:abhinabapradhan@gmail.com)
