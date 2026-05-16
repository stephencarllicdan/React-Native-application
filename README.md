# CineTrack – React Native Movie Watchlist App

## 📌 Project Overview

CineTrack is a mobile movie watchlist application developed using React Native and Firebase. The application allows users to manage movies they want to watch by adding, viewing, updating, and deleting movie records.

The system is integrated with Firebase Authentication and Firebase Firestore Database to provide real-time data storage and user-based movie management.

---

# Features

* User Authentication using Firebase
* Add Movies to Watchlist
* View Saved Movies
* Mark Movies as Watched
* Delete Movies
* Search Movie Functionality
* Animated Now Showing Section
* Firebase Firestore Integration
* Modern React Native UI

---

# Technologies Used

## Frontend

* React Native
* JavaScript
* React Navigation

## Backend / Database

* Firebase Authentication
* Firebase Firestore Database

## Development Tools

* VS Code
* GitHub
* Git Bash

---

# CRUD Functionalities

| Function | Description                  |
| -------- | ---------------------------- |
| Create   | Add movies into watchlist    |
| Read     | Display movies from Firebase |
| Update   | Mark movie as watched        |
| Delete   | Remove movie from watchlist  |

---

# Firebase Integration

The application uses Firebase Firestore to store movie information in real-time.

Each user has their own movie watchlist using:

```js
userId: auth.currentUser.uid
```

This ensures that movie records are separated per user account.

---

# Screens Included

* Login Screen
* Register Screen
* Home Screen
* Add Movie Screen
* Movie Modal Actions

---

# Project Members

| Name                     | Role                                  |
| ------------------------ | ------------------------------------- |
| Dacuycuy, John Paul      | Programmer / Developer                |
| Licdan, Stephen Carl M.  | Lead Developer / Firebase Integration |
| Pakiwag, Harris Brent    | UI Designer                           |
| Palomar, Daniel Rance T. | Documentation / Tester                |
| Pusod, Yuji L.           | Presenter / Tester                    |

---

# Application Description

The CineTrack application helps users organize and manage movies they want to watch. Users can browse available movies, save them into their watchlist, and update movie status after watching.

The application demonstrates:

* Mobile Application Development
* Firebase Integration
* CRUD Operations
* User Authentication
* Real-Time Database Management

---

# Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/stephencarllicdan/React-Native-application.git
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Run Project

```bash
npx react-native run-android
```

---

# Repository Link

Repository:
[https://github.com/stephencarllicdan/React-Native-application](https://github.com/stephencarllicdan/React-Native-application)

---

# Conclusion

CineTrack is a fully functional React Native mobile application integrated with Firebase services. The project successfully demonstrates CRUD operations, Firebase Authentication, Firestore database management, and modern mobile UI implementation.

This project was developed for academic purposes and mobile development learning.
