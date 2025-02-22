# Product Requirements Document (PRD): Chronicles of X

## 1. Introduction

"Chronicles of X" is an innovative, AI-driven, text-based storytelling game designed for iOS devices. The game leverages OpenAI’s API to power a dynamic “Chronicler” (an AI guide) that adapts to player choices, creating personalized narratives. A distinctive 3D cube UI serves as the central interface, allowing players to navigate between the main story, settings, and inventory seamlessly, enhancing immersion and interaction.

The primary goal of this project is to develop a Minimum Viable Product (MVP) that showcases the core mechanics of AI-driven storytelling within a functional and intuitive 3D cube interface. The MVP will focus on a single-player experience with predefined stories, local data storage, and basic user interactions, laying the foundation for future enhancements like multiplayer features and voice input.

## 2. Objectives

The key objectives for the MVP are:

- Deliver a functional 3D cube UI enabling seamless navigation between the main story, settings, and inventory.
- Integrate OpenAI’s API to provide dynamic, choice-based storytelling guided by the “Chronicler.”
- Implement local storage to save game progress and player choices persistently.
- Ensure a simple, intuitive user experience for typing responses and interacting with the narrative.
- Establish a scalable foundation for future features, such as player-created stories and advanced UI enhancements.

## 3. Features

### 3.1. 3D Cube UI
- **Description**: A rotatable, three-faced cube interface that occupies the full screen, with each face dedicated to a distinct section:
  - **Front Face**: Displays the main story view, including a chat thread for player-Chronicler interactions.
  - **Left Face**: Houses the settings menu for game options (e.g., API key input, progress management).
  - **Right Face**: Shows the inventory view, with placeholders in the MVP for future item integration.
- **Interaction**: Players swipe left or right to rotate the cube, with smooth animations tracking finger movement. The cube snaps to the nearest face upon release.
- **Implementation**: Developed using React Native with Expo, leveraging libraries like `react-native-reanimated` and `react-native-gesture-handler` for animations and gestures. The MVP uses `react-native-3dcube-navigation` for simplicity.

### 3.2. AI-Driven Storytelling
- **Description**: The “Chronicler” AI narrates and adapts the story based on player inputs, creating a responsive and engaging narrative experience.
- **Mechanics**:
  - Players type responses to prompts from the Chronicler in a chat-like interface.
  - The AI generates story updates, incorporating occasional dice rolls (simulated in the background) for randomness.
  - Stories are structured into chapters with clear mini-objectives to drive progression.
- **MVP Scope**: Includes three predefined stories, each with three chapters (e.g., “Journey to the Lost Relic”).
- **Integration**: Powered by OpenAI’s API, with players supplying their own API keys to manage costs during development.

### 3.3. Game Mechanics
- **Progression**: Players advance by completing chapters, unlocking subsequent stories. Progress is saved locally.
- **Dice Rolls**: Random outcomes (e.g., using `Math.random() * 20`) influence certain narrative choices, integrated into the Chronicler’s responses.
- **Notifications**: Random push notifications (e.g., “The wind howls—your next move awaits!”) encourage re-engagement.

### 3.4. User Interface (UI)
- **Main Story View (Front Face)**:
  - A `<FlatList>`-based chat thread displays Chronicler messages and player responses.
  - A floating Chronicler shape (e.g., a glowing orb) with subtle animations enhances visual appeal.
  - A keyboard toggle button controls visibility, with a progress indicator (e.g., “Chapter 2/3 – The Dark Forest”).
- **Settings (Left Face)**:
  - Options include “New Game,” “Save Progress,” “Enter API Key,” and a list of unlocked stories.
- **Inventory (Right Face)**:
  - Placeholder text (e.g., “Inventory coming soon!”) for the MVP, with plans for item display in future iterations.

### 3.5. Data Storage
- **Local Storage**: Game state (story progress, chapter status, chat history) is persisted using AsyncStorage.
- **Future Expansion**: Cloud storage (e.g., iCloud or Firebase) for cross-device syncing and multiplayer features.

### 3.6. Branding and Assets
- **Icons**: Includes `adaptive-icon.png`, `favicon.png`, `icon.png`, and `splash-icon.png` for app branding and launch screens, as seen in the project’s `assets` folder.

## 4. Technical Requirements

- **Framework**: React Native with Expo for rapid development and iOS compatibility.
- **Languages**: TypeScript for type safety and maintainability, as evidenced by `App.tsx` and `index.ts`.
- **Dependencies** (Based on Directory Structure):
  - `@react-navigation/native` and `@react-navigation/stack` for navigation.
  - `react-native-gesture-handler` and `react-native-reanimated` for gesture and animation support.
  - `react-native-3dcube-navigation` for the 3D cube UI in the MVP.
  - `axios` or `fetch` for OpenAI API requests.
  - `node_modules` managed via `package.json` and `package-lock.json`.
- **Configuration Files**:
  - `app.json`: Defines Expo app metadata and settings.
  - `tsconfig.json`: Configures TypeScript compiler options.
  - `.gitignore`: Excludes unnecessary files from version control.
- **API Integration**: OpenAI API for text generation, with user-provided keys.
- **Storage**: AsyncStorage for local persistence, as implied by the React Native setup.
- **Notifications**: Expo Notifications for push functionality.

## 5. User Experience (UX)

- **Onboarding**: Players are welcomed by the Chronicler on the Front face with a brief tutorial on gameplay and cube navigation.
- **Interaction**:
  - Typing responses in the chat interface on the Front face.
  - Swiping left or right to access settings or inventory, with the cube rotating dynamically.
- **Feedback**:
  - Visual cues (e.g., Chronicler animations) and progress indicators reinforce engagement.
  - Push notifications provide timely prompts to return to the game.

## 6. Timeline (MVP)

- **Phase 1**: Implement the 3D cube UI with basic navigation (currently in progress, based on project structure).
- **Phase 2**: Integrate the chat thread and Chronicler AI on the Front face.
- **Phase 3**: Add settings and inventory placeholders on the Left and Right faces.
- **Phase 4**: Set up AsyncStorage for saving game progress.
- **Phase 5**: Enable push notifications for re-engagement.
- **Phase 6**: Conduct testing and refine for a stable MVP release.

**Estimated Duration**: 2–3 months, contingent on development pace and testing feedback.

## 7. Testing and Quality Assurance

- **Unit Testing**: Validate individual components (e.g., cube rotation, chat rendering).
- **Integration Testing**: Confirm the Chronicler AI integrates smoothly with player inputs and dice rolls.
- **Device Testing**: Test on various iOS devices (e.g., iPhone 13, iPad) using Expo Go.
- **User Testing**: Collect feedback on UX, story immersion, and UI usability.
- **Performance Testing**: Assess for lag, battery usage, and API call efficiency.

## 8. Next Steps

- **Immediate Action**: Complete the 3D cube UI by integrating the chat thread on the Front face.
- **Short-Term Goals**:
  - Connect the Chronicler AI via OpenAI’s API.
  - Populate settings and inventory with placeholder content.
  - Implement local storage for game state.
- **Long-Term Vision**:
  - Introduce player-created stories and a community-sharing platform.
  - Add voice interaction and multiplayer capabilities.
  - Enhance visuals with custom fonts and genre-specific themes.

---

"Chronicles of X" aims to revolutionize mobile storytelling by merging AI-driven narratives with an engaging 3D cube UI. This PRD provides a clear, actionable roadmap for the MVP, leveraging the existing project structure (e.g., Expo, TypeScript, React Native) to ensure efficient development while setting the stage for future growth.