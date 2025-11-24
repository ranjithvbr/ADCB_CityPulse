# CityPulse – Local Events Explorer

A React Native application for searching local events, viewing event details, managing favourites, switching languages (English/Arabic with RTL), biometric login, and local profile storage.

---

## 🔧 Features (Based on Requirements)

### Core Requirements
- Search events by **keyword + city** using a public API  
- View detailed event information  
- Mark/unmark **favourite events**  
- Toggle UI between **English and Arabic** (RTL layout applied)  
- Navigation flow: **Splash → Login/Signup → Home → Event Details → Profile**  
- Save user data locally using **AsyncStorage**  
- Business logic implemented through a **common hooks layer**

### Bonus Features Implemented
- **Map preview** (React Native Maps)  
- **Biometric Login** (Face/Touch ID)  
- **Login & Signup** using mock authentication  

### Bonus Not Implemented
Firebase (optional as per instructions)  
Please let me know if this needs to be implemented — I will be happy to add it as well.

---

## Project Structure
src/
components/
context/
hooks/
screens/
services/

## ▶️ To Run the project
npm install
npm run android
npm run ios

---

## 📝 Assumptions
- Authentication uses mock credentials
- Event API uses a simple public dataset (not Ticketmaster)
- Firebase not added (optional bonus)

---