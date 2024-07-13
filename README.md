# Music Player Web Application

## Project Overview

The music player web application allows users to play music tracks from specified playlists stored on a local server. It provides essential functionalities such as play/pause controls, track navigation (previous and next), progress bar and time display, volume control with mute/unmute toggle, and dynamic playlist selection.

## Technologies Used

- **HTML:** Provides the structure of the web pages, including elements like buttons, lists, and containers.
  
- **CSS (Bootstrap):** Enhances the visual presentation and layout of the application using Bootstrap for styling components and responsiveness.
  
- **JavaScript:** Handles the application's dynamic behavior, including fetching songs from the server, controlling audio playback, updating UI elements based on user interaction, and handling events like click and keypress.

## Key Features

1. **Play/Pause Functionality:**
   - Users can start or pause playback of the selected song with a single click on the play/pause button.

2. **Navigation Controls:**
   - **Previous and Next Buttons:** Allows users to navigate between songs in the playlist. It wraps around from the first song to the last and vice versa.

3. **Progress Bar and Time Display:**
   - Displays the current playback time and total duration of the song. The progress bar visually indicates the elapsed portion of the track.

4. **Volume Control:**
   - Users can adjust the volume using a slider control. The application also includes a mute button that toggles between muting and unmuting the audio.

5. **Dynamic Playlist Selection:**
   - Users can select different playlists stored in the `songs/` directory. Clicking on a playlist card loads its songs dynamically without refreshing the page.

6. **Responsive Design:**
   - The application is designed to be responsive, ensuring optimal viewing and interaction across a wide range of devices, from desktops to mobile phones.

## Setup Instructions

 **Clone the project repositoey using Git:**
     ```
     git clone https://github.com/ganeshmedichelimala/spotify.git
     ```

## Folder Structure

- **index.html:** Main HTML file containing the structure of the application.
- **style.css:** CSS file for styling the UI components, including layout, colors, fonts, and responsiveness.
- **script.js:** JavaScript file that manages application logic, including fetching songs, controlling audio playback, handling user interactions, and updating UI elements dynamically.
- **songs/:** Directory where playlists and music files are stored. Each playlist is organized in subdirectories under `songs/`.
