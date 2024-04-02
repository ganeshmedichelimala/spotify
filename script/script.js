// This line prints a message to the console
console.log("Let's write JavaScript");

// Variable declaration for songs and folder
let songs;
let folder = "songs/Liked";

// Create a new Audio object
let currentSong = new Audio();

// Get the play/pause button element
var play = document.getElementById("play-pause");

// Function to format time in minutes and seconds
function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  // Add leading zero if necessary
  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }

  return minutes + ":" + remainingSeconds;
}

// Function to convert time string (format: "mm:ss") to seconds
function timeToSeconds(timeString) {
  let [minutes, seconds] = timeString.split(":").map(Number);
  return minutes * 60 + seconds;
}

// Function to fetch songs from a server
async function getSongs(folder) {
  console.log(`Fetching songs from folder: ${folder}`);
  let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  songs = [];

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`/${folder}/`)[1]);
    }
  }
  console.log("Fetched songs:", songs);
  let songULCollection = document
    .querySelector(".songList")
    .getElementsByTagName("ul");
  songULCollection.innerHTML = "";

  for (const songUL of songULCollection) {
    for (const song of songs) {
      songUL.innerHTML += `<li><img class="invert" src="./svg/music.svg" alt="" />
                <div class="info">
                  <div class="songName">${song
                    .split("-SenSongsMp3")[0]
                    .replaceAll("%20", " ")}</div>
                  <div class="songArtist">Diamond</div>
                </div>
                <div class="playNow">
                  <span>Play now</span>
                  <img src="./svg/library-play.svg" alt="">
                </div></li>`;
    }
  }

  // Add click event listeners to each song item
  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", function () {
      playMusic(
        e.getElementsByTagName("div")[0].getElementsByTagName("div")[0]
          .innerHTML
      );
    });
  });
}

// Function to play a specific music track
function playMusic(track) {
  console.log(`Playing music: ${track}`);
  var song = `http://127.0.0.1:5500/${folder}/` + track + "-SenSongsMp3.Co.mp3";
  currentSong.src = song.replaceAll(" ", "%20");
  currentSong.play();
  play.src = "./svg/pause.svg";
  document.querySelector(".songinfo").innerHTML = track + ".mp3";
}

function playMusic2(track) {
  console.log(`Playing music 2: ${track}`);
  var song = `http://127.0.0.1:5500/${folder}/` + track;
  currentSong.src = song.replaceAll("%20", " ");
  currentSong.play();
  play.src = "./svg/pause.svg";
  document.querySelector(".songinfo").innerHTML =
    track.replaceAll("%20", " ").split("-SenSongsMp3")[0] + ".mp3";
}

// Main function to initialize the music player
async function main() {
  console.log("Initializing music player...");
  await getSongs(folder);

  // Add click event listener to play/pause button
  play.addEventListener("click", () => {
    console.log("Play/pause button clicked");
    if (!currentSong.src) {
      alert("No Song is Selected");
    } else {
      if (currentSong.paused) {
        currentSong.play();
        play.src = "./svg/pause.svg";
      } else {
        currentSong.pause();
        play.src = "./svg/play.svg";
      }
    }
  });

  // Update time information and progress bar as the song plays
  currentSong.addEventListener("timeupdate", () => {
    console.log("Updating time and progress bar...");
    if (isNaN(currentSong.duration)) {
      // If no song is playing or duration is not available, return early
      return;
    }
    var currentMinutes = Math.floor(currentSong.currentTime / 60);
    var currentSeconds = Math.floor(currentSong.currentTime % 60);
    var totalMinutes = Math.floor(currentSong.duration / 60);
    var totalSeconds = Math.floor(currentSong.duration % 60);

    // Add leading zeros if necessary
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
    totalMinutes = (totalMinutes < 10 ? "0" : "") + totalMinutes;
    totalSeconds = (totalSeconds < 10 ? "0" : "") + totalSeconds;

    // Display current and total time
    document.querySelector(".songtime").innerHTML =
      currentMinutes +
      ":" +
      currentSeconds +
      " / " +
      totalMinutes +
      ":" +
      totalSeconds;

    // Calculate and set the progress bar
    let currentSecondsTotal = currentSong.currentTime;
    let totalSecondsTotal = currentSong.duration;
    document.querySelector(".circle").style.left =
      (currentSecondsTotal / totalSecondsTotal) * 100 + "%";
  });

  // Add an event listener for the seek bar
  document.querySelector(".seekBar").addEventListener("click", (e) => {
    console.log("Seek bar clicked");
    // Calculate the percentage of the click position relative to the seekBar width
    var percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

    // Set the left position of the circle element to reflect the click position
    document.querySelector(".circle").style.left = percent + "%";

    // Calculate the corresponding time in the audio track based on the click position
    currentSong.currentTime = (currentSong.duration * percent) / 100;
    currentSong.play();
    play.src = "./svg/pause.svg";
  });

  // Add an event listener for the hamburger menu
  document.querySelector(".hamburger").addEventListener("click", () => {
    console.log("Hamburger menu clicked");
    document.querySelector(".left").style.left = "0%";
  });
  document.querySelector(".close").addEventListener("click", () => {
    console.log("Close button clicked");
    document.querySelector(".left").style.left = "-140%";
  });

  // Add event listeners for previous and next buttons
  previous.addEventListener("click", () => {
    console.log("Previous button clicked");
    let currentsongIndex = songs.indexOf(
      currentSong.src.split(`/${folder}/`)[1]
    );

    if (currentsongIndex > 0) {
      // If not at the first song, play the previous song
      playMusic2(songs[currentsongIndex - 1]);
    } else {
      // If at the first song, play the last song
      playMusic2(songs[songs.length - 1]);
    }
  });

  next.addEventListener("click", () => {
    console.log("Next button clicked");
    let currentsongIndex = songs.indexOf(
      currentSong.src.split(`/${folder}/`)[1]
    );

    if (currentsongIndex < songs.length - 1) {
      // If not at the last song, play the next song
      playMusic2(songs[currentsongIndex + 1]);
    } else {
      // If at the last song, loop back to the first song
      playMusic2(songs[0]);
    }
  });

  // Add an event listener for volume control
  document
    .querySelector(".volumeRange")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      console.log("Volume changed");
      // Get the volume value from the input range element (between 0 and 100)
      currentSong.volume = e.target.value / 100;
    });

  // Add event listener for keyboard events
  document.addEventListener("keydown", (event) => {
    console.log("Keyboard key pressed");
    // Check if the pressed key is the space bar
    if (event.code === "Space") {
      // Toggle play/pause when space bar is pressed
      if (!currentSong.src) {
        alert("No Song is Selected");
      } else {
        if (currentSong.paused) {
          currentSong.play();
          play.src = "./svg/pause.svg";
        } else {
          currentSong.pause();
          play.src = "./svg/play.svg";
        }
      }
    }
  });

  // Inside the click event listener for card elements
  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      let playlist = item.currentTarget.dataset.folder;
      folder = `songs/${playlist}`;
      console.log(`Clicked on card for playlist: ${playlist}`);
      document.querySelector(".songList ul").innerHTML = "";
      await getSongs(folder);
    });
  });

  console.log("Initialization complete.");

  // Add event listener for volume control
  // Add event listener for volume control
  document.querySelector(".volumeRange>img").addEventListener("click", e=> {
    console.log("Volume clicked");
    // Toggle between muting and unmuting
    console.log(e.target.src)
    if (e.target.src == "http://127.0.0.1:5500/svg/mute.svg") {
        // If volume is muted, unmute it
        currentSong.volume = 1;
        e.target.src = "http://127.0.0.1:5500/svg/volume.svg";
        document.querySelector(".volumeRange input").value = 100; // Set volume seeker to maximum
    } else {
        // If volume is not muted, mute it
        currentSong.volume = 0;
        e.target.src = "http://127.0.0.1:5500/svg/mute.svg";
        console.log(e.target.src)
        document.querySelector(".volumeRange input").value = 0; // Set volume seeker to 0
    }
});

}

// Call the main function to start the music player
main();
