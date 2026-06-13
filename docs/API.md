# 📡 Database & Authentication Architecture (Firebase Serverless)

This document describes the data architecture, collection schemas, and authentication systems used in **VidyaKhel**. Since the application operates entirely serverless, it directly communicates with **Firebase Authentication** and **Cloud Firestore** client-side SDKs.

---

## 🔐 Authentication System

All user authentication is managed securely via the **Firebase Authentication SDK**.

### Features:
1. **Student Onboarding**: Users sign up with an Email & Password. Custom profile metadata (village, district, grade) is saved directly to Firestore linked to the unique authentication ID (`uid`).
2. **Session Retention**: Firebase Auth automatically persists token states in the browser, keeping the user logged in across page reloads.
3. **Security Filters**: Authorized access is verified on each route.

---

## 📂 Cloud Firestore Database Schema

The Firestore database relies on a clean, scalable collections model:

### 👤 `users` Collection
Each document in the `users` collection is identified by the user's Firebase Auth `uid` (`users/{uid}`).

#### Document Schema:
```json
{
  "name": "Yash",
  "email": "yash@example.com",
  "role": "student",
  "grade": 4,
  "language": "hindi",
  "village": "Rampur",
  "district": "Lucknow",
  "xp": 450,
  "level": 3,
  "streak": 5,
  "badges": ["bronze_quiz", "silver_math"],
  "avatar": "avatar1",
  "createdAt": "Timestamp (serverTimestamp)"
}
```

#### Field Explanations:
* `name` *(string)*: Name of the student.
* `email` *(string)*: Registered email address.
* `role` *(string)*: Role identifier (set to `"student"`).
* `grade` *(number)*: Student's academic standard/grade (1 to 10).
* `language` *(string)*: Preferred default language (`"english"` or `"hindi"`).
* `village` *(string)*: Home village location (used for regional classification).
* `district` *(string)*: Home district location (used for district leaderboards).
* `xp` *(number)*: Total experience points earned from playing quizzes and mini-games.
* `level` *(number)*: Current calculated level of the student (increases as XP increases).
* `streak` *(number)*: Number of consecutive days the student logged in and engaged with the app.
* `badges` *(array of strings)*: Array containing achievement tags unlocked by the student.
* `avatar` *(string)*: ID of the student's selected display picture.
* `createdAt` *(timestamp)*: Date and time of registration.

---

## 📊 Core Data Flows & Logic

### 1. Earning Experience Points (XP) & Levels
When a student finishes a Quiz or a Game (e.g., Math Challenge or Memory Match), their XP is updated:
1. The game completes and triggers a score calculation.
2. The score is added to the user's active XP count.
3. The new level is calculated:
   $$\text{Level} = \lfloor \frac{\text{XP}}{100} \rfloor + 1$$
4. The client executes `updateUser({ xp, level })`, which writes updates to `localStorage` and commits changes directly to Firestore under `users/{uid}` via `updateDoc()`.

### 2. Achievement Badges Unlock Logic
Students earn badges based on high scores and game achievements:
* **Bronze Badge**: Awarded on getting a score >= 50%.
* **Silver Badge**: Awarded on getting a score >= 80%.
* **Gold Badge**: Awarded on a perfect score (100%).

When a badge is unlocked:
1. The client app appends the new badge string (e.g., `"bronze_math_challenge"`) to the user's `badges` array.
2. `updateDoc()` is called to save the updated `badges` array to Firestore.

### 3. Dynamic Leaderboard Generation
The leaderboard retrieves documents from the Firestore `users` collection to rank users dynamically:
* **Global Ranking Query**: Retrieves all users sorted by total XP in descending order.
  ```javascript
  const globalQuery = query(
    collection(db, 'users'), 
    orderBy('xp', 'desc'), 
    limit(50)
  );
  ```
* **District Ranking Query**: Retrieves users belonging to a specific district, sorted by total XP.
  ```javascript
  const districtQuery = query(
    collection(db, 'users'), 
    where('district', '==', selectedDistrict),
    orderBy('xp', 'desc'), 
    limit(20)
  );
  ```

---

## 🧠 Local Storage Synchronization

To minimize database read charges and speed up rendering, user sessions are synchronized in LocalStorage:
* Key: `glp_user`
* Holds the stringified JSON representation of the logged-in student's Firestore profile.
* Every write transaction to Firestore first synchronizes with the local cache (`glp_user`), ensuring instantaneous UI changes without latency.
