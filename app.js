let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement("audio");

// Define the list of tracks that have to be played
let track_list = [
  {
    image: "mmblacksquare.png",
    path: "songs/70s Wonder.mp3",
    name: "70s Wonder",
    artist: "Rick Mastry",
  },
  {
    image: "rasta.png",
    path: "songs/Agenda2030.mp3",
    name: "Agenda 2030",
    artist: "Rick Mastry",
  },
  {
    image: "mmblacksquare.png",
    path: "songs/Be Brave.mp3",
    name: "Be Brave",
    artist: "Rick Mastry",
  },
  {
    image: "rasta.png",
    path: "songs/Africa.mp3",
    name: "Africa",
    artist: "Rick Mastry",
  },

  {
    image: "mmblacksquare.png",
    path: "songs/Battlestarz.mp3",
    name: "Battlestarz",
    artist: "Rick Mastry",
  },
  {
    image: "rasta.png",
    path: "songs/Dark Parallax 2.mp3",
    name: "Dark Parallax 2",
    artist: "Rick Mastry",
  },
  {
    image: "mmblacksquare.png",
    path: "songs/DarkestBeforeDawn.mp3",
    name: "Darkest Before Dawn",
    artist: "Rick Mastry",
  },
  {
    image: "rasta.png",
    path: "songs/Empress.mp3",
    name: "Empress",
    artist: "Rick Mastry",
  },
  {
    image: "mmblacksquare.png",
    path: "songs/ForwardJumpUp.mp3",
    name: "Forward Jump Up",
    artist: "Rick Mastry",
  },
  {
    image: "rasta.png",
    path: "songs/Give Thanks and Praises.mp3",
    name: "Give Thanks and Praises",
    artist: "Rick Mastry",
  },
  {
    image: "hearmycry.jpg",
    path: "songs/Hear My Cry Master.mp3",
    name: "Hear My Cry",
    artist: "Rick Mastry",
  },
  {
    image: "rasta.png",
    path: "songs/Hearts.mp3",
    name: "Hearts",
    artist: "Rick Mastry",
  },
  {
    image: "mmblacksquare.png",
    path: "songs/I know.mp3",
    name: "I Know",
    artist: "Rick Mastry",
  },
  {
    image: "rasta.png",
    path: "songs/I Love You.mp3",
    name: "I Love You",
    artist: "Rick Mastry",
  },
  {
    image: "mmblacksquare.png",
    path: "songs/Its Over Before It Started.mp3",
    name: "Its Over Before It Started",
    artist: "Rick Mastry",
  },
  {
    image: "rasta.png",
    path: "songs/Never Say Goodbye.mp3",
    name: "Never Say Goodbye",
    artist: "Rick Mastry",
  },
  {
    image: "mmblacksquare.png",
    path: "songs/Roots One.mp3",
    name: "Roots One",
    artist: "Rick Mastry",
  },
  {
    image: "rasta.png",
    path: "songs/Shit Show.mp3",
    name: "Diss Show",
    artist: "Rick Mastry",
  },
  {
    image: "mmblacksquare.png",
    path: "songs/SilkySmooth.mp3",
    name: "Silky Smooth",
    artist: "Rick Mastry",
  },
  {
    image: "rasta.png",
    path: "songs/Three The Hard Way.mp3",
    name: "Three The Hard Way",
    artist: "Rick Mastry",
  },
];

function loadTrack(track_index) {
  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();

  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  // Update details of the track
  track_art.style.backgroundImage =
    "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent =
    "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);

  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);

  // Apply a random background color
  random_bg_color();
}

function random_bg_color() {
  // Get a random number between 64 to 256
  // (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

  // Set the background to the new color
  document.body.style.background = bgColor;
}

// Functiom to reset all values to their default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  // Switch between playing and pausing
  // depending on the current state
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  // Play the loaded track
  curr_track.play();
  isPlaying = true;

  // Replace icon with the pause icon
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  // Pause the loaded track
  curr_track.pause();
  isPlaying = false;

  // Replace icon with the play icon
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;

  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length;

  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider
  // and get the relative duration to the track
  seekto = curr_track.duration * (seek_slider.value / 100);

  // Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}

function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    // Add a zero to the single digit time values
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

loadTrack(track_index);
