# PingNow

**PingNow** is a real-time chat application that allows users to connect, communicate, and share media seamlessly. Built using **React.js** and **Firebase**, it offers a user-friendly interface and advanced features for an enriched chatting experience.

---
## Live Project

Check out the live project here: [PingNow Live](https://pingnow.vercel.app/)

---
## Features

### 🔗 Real-Time Communication
- Chat with other users in real-time.
- Instant message delivery and updates.

### 👤 User Management
- Add users by searching their username.
- View and manage user profiles.

### 📸 Media Sharing
- Share images, videos, and other media in real-time.
- View a consolidated media gallery for each chat.

### 🛠 Profile Management
- Update user profiles with images using **Cloudinary** for seamless image uploads.

### 📂 Chat Profile
- View all shared media from a specific chat in one place.

---

## Tech Stack

### Frontend:
- **React.js**: Component-based UI development.

### Backend & Database:
- **Firebase**: Authentication, real-time database, and cloud functions.

### Cloud Services:
- **Cloudinary**: For efficient image and media uploads.

---

## Installation

### Prerequisites
- Node.js and npm installed.
- Firebase account and project setup.
- Cloudinary account for image upload.

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/pingnow.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Firebase:**
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project and enable Firestore and Authentication.
   - Replace `env variables` in the project with your Firebase credentials.

4. **Set up Cloudinary:**
   - Create a Cloudinary account at [cloudinary.com](https://cloudinary.com/).
   - Add your Cloudinary API details to the environment variables.

5. **Start the application:**
   ```bash
   npm run dev
   ```

---

## Folder Structure

```
PingNow/
├── public/
├── src/
│   ├── assets/              #sample images for project
│   ├── components/          # Reusable React components
│   ├── pages/               # Pages like Login, Profile, Chat
│   ├── /config              # Firebase  services
│   ├── lib/                 # Cloudinary upload service
│   ├── App.jsx              # Application entry point
│   ├── main.jsx             # React DOM rendering
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
```

---

## Future Enhancements
- Group chats with multiple users.
- Message reactions and read receipts.
- Push notifications for new messages.

---

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For any queries or support, feel free to reach out to:
- GitHub: [shreyshukla29](https://github.com/shreyshukla29)
- Email: [shreyshukla101217@gmail.com](mailto:shreyshukla29@gmail.com)

---
