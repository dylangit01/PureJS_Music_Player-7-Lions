const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = ['Seven_Lions_Strangers_Feat_Tove','hey', 'summer', 'ukulele'];

let songIndex = 0;

const loadSong = song => {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`
};

loadSong(songs[songIndex]);

const playSong = _ => {
  musicContainer.classList.add('play');
  playBtn.querySelector('i').classList.remove('fa-play');
  playBtn.querySelector('i').classList.add('fa-pause');

  audio.play();
};

const pauseSong = _ => {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i').classList.remove('fa-pause');
  playBtn.querySelector('i').classList.add('fa-play');

  audio.pause();
};

playBtn.addEventListener('click', _ => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
});

const preSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong()
};

const nextSong = _ => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong()
};

const updateProgress = e => {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`
};

const setProgress = e => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
};

prevBtn.addEventListener('click', preSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);
