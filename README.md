# WanderWise

A full-stack web application designed to simplify travel planning by providing flight search, auto-complete suggestions, creating and planning  Itinerary using AI, AI chat bot and user authentication using **Next.js**, **NextAuth.js**, and third-party APIs.

<a href="https://wanderwise-aviq.onrender.com">**Check Live Here**</a>

## Features
  * **AI Support**: Create and plan Itinerary with the help of AI.
  * **CHat with AI**: Get chat bot support.
  * **Flight Search**: Search for flights using the Priceline API, with auto-complete suggestions for destinations.
  * **User Authentication**: Secure login and logout functionality using NextAuth.js, supporting credentials-based login and Google OAuth.
  * **Middleware Protection**: Protect routes and ensure only authenticated users can access certain pages.
  * **Responsive Design**: Fully responsive UI for seamless use on desktops, tablets, and mobile devices.

## Technologies Used

### Frontend

  * **Next.js** (App Router)
  * **React**
  * **Tailwind CSS** for styling

### Backend

  * **NextAuth.js** for authentication
  * **Priceline API** for flight search

### Database

  * **MongoDB** with Mongoose for user data storage

### Hosting

  * **Render** for deployment

-----

## Setup Instructions

Follow these steps to get the project up and running on your local machine.

### 1\. Clone the Repository

```bash
git clone https://github.com/yogesh2i/wanderwise
cd wanderwise
```

### 2\. Install Dependencies

```bash
npm install
```

### 3\. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```
# NextAuth Configuration
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# Priceline API Key
PRICELINE_API_KEY=your_priceline_api_key

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# MongoDB Connection String
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
```

**Note:**

  * Replace `your_secret_key` with a strong, random string.
  * Obtain your `PRICELINE_API_KEY` from the Priceline API documentation.
  * Set up a Google Cloud Project to get your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` for Google OAuth.
  * Replace `<username>`, `<password>`, and `<dbname>` in `MONGO_URI` with your MongoDB Atlas credentials.

### 4\. Run the Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

-----

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts  # NextAuth API route
│   │   └── flights/
│   │   |   └── route.ts                 # Flight search API route
│   │   └── airports/
│   │       └── route.ts                 # Airport search API route
|   |
│   ├── (auth)/                        # using next auth 
│   │   ├── login/                     # Login page
│   │   └── signup/                    # Signup page
│   ├── chat/route.ts                  # Chat bot realted api
│   ├── plan-trip/route.ts             #Trip planning api route realted api
│   └── middleware.ts                  # Middleware for route protection
├── components/
│   ├── home/
│   │   └── navbar/
│   │       └── NavLinks.tsx             # Navigation links component
├── models/
│   └── UserModel.ts                   # Mongoose user schema
├── utility/
│   └── dbConnect.ts                   # MongoDB connection utility
```

-----

## Key Features

### 1\. AI Support

  * **API Integration**: Uses the Google Gemini API for AI travel planning.
  * **AI CHat bot**: Chat with AI anytime.

### 2\. Flight Search

  * **API Integration**: Uses the Priceline API to fetch flight data and auto-complete suggestions.
  * **Error Handling**: Handles missing API keys and invalid responses gracefully.

### 3\. Authentication

  * **NextAuth.js**: Implements credentials-based login and Google OAuth integration.
  * **Secure Middleware**: Protects routes and ensures only authenticated users can access certain pages.

### 4\. Middleware

  * Protects routes like `/plan-trip`, `/booking`, and `/chat`.
  * Redirects unauthenticated users to the login page.

## Deployment

To deploy the application to **Vercel**:

1.  Push your code to a Git repository (e.g., GitHub, GitLab, Bitbucket).
2.  Import your project into Vercel.
3.  Add the environment variables in the Vercel dashboard under **Settings \> Environment Variables**, ensuring they match the ones in your `.env.local` file.

-----

## Future Enhancements

  * **Hotel Booking Integration**: Add APIs for searching and booking hotels.
  * **User Profiles**: Allow users to save their itineraries and flight searches.
  * **Payment Gateway**: Integrate a payment gateway for booking flights and hotels.
  * **Multi-Language Support**: Add support for multiple languages to cater to a global audience.

-----

## Contributing

Contributions are welcome\! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Commit your changes and push the branch.
4.  Submit a pull request.

-----
