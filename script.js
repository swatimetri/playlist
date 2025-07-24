let playlist = ["Song A", "Song B", "Song C"];
let currentIndex = 0;

const playlistEl = document.getElementById("playlist");
const currentSongEl = document.getElementById("current-song");
const newSongInput = document.getElementById("new-song-input");

function renderPlaylist() {
  playlistEl.innerHTML = "";

  playlist.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song;
    if (index === currentIndex) li.classList.add("active");

    li.onclick = () => {
      currentIndex = index;
      updateCurrentSong();
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      removeSong(index);
    };

    li.appendChild(delBtn);
    playlistEl.appendChild(li);
  });

  updateCurrentSong();
}

function updateCurrentSong() {
  if (playlist.length === 0) {
    currentSongEl.textContent = "No songs";
  } else {
    currentSongEl.textContent = playlist[currentIndex];
  }
}

function nextSong() {
  if (playlist.length === 0) return;
  currentIndex = (currentIndex + 1) % playlist.length;
  renderPlaylist();
}

function prevSong() {
  if (playlist.length === 0) return;
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  renderPlaylist();
}

function addSong() {
  const newSong = newSongInput.value.trim();
  if (newSong === "") return;

  playlist.push(newSong);
  newSongInput.value = "";
  renderPlaylist();
}

function removeSong(index) {
  playlist.splice(index, 1);
  if (index < currentIndex) {
    currentIndex--;
  } else if (index === currentIndex) {
    if (currentIndex === playlist.length) {
      currentIndex = playlist.length - 1;
    }
  }
  renderPlaylist();
}

// Initialize
renderPlaylist();