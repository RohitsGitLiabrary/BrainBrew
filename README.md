# BrainBrew - Multiplayer Online Quiz Game

BrainBrew is an interactive multiplayer quiz game built using **React.js** and **Firebase Realtime Database**. It allows players to join a quiz session, compete with others, and have fun while testing their knowledge!

## Features

- 🎮 **Multiplayer Mode** - Play with friends.
- 🔥 **Real-time Updates** - Powered by Firebase Realtime Database.
- 🧠 **Engaging Questions** - Dynamic quiz experience with varied topics.
- 🚀 **Smooth UI/UX** - Responsive and interactive design.
- 📊 **Live Score Updates** - See real-time scores and rankings.
- 👥 **Guest Play** - Join without an account.

## Tech Stack

- **Frontend:** React.js, React Router,Redux, useReducer, Emoji Mart
- **Database:** Firebase Realtime Database
- **Hosting:** Vercel Hosting

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v16+ recommended)
- npm or yarn
- Firebase project set up

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/brainbrew.git
   cd brainbrew
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure Firebase:
   - Create a `.env` file in the root directory.
   - Add your Firebase config details:
     ```env
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_DATABASE_URL=your_database_url
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

### Running the Game

Start the development server:

```sh
npm start
```

The game will run at `http://localhost:3000/`.

## Deployment

To deploy on Firebase Hosting:

1. Build the project:
   ```sh
   npm run build
   ```
2. Deploy to Firebase:
   ```sh
   firebase deploy
   ```

## Contributing

Contributions are welcome! Feel free to fork the project, submit issues, or create pull requests.

## License

MIT License

## Contact

For questions or suggestions, reach out to **rohitkhadatkar35@gmail.com**.
