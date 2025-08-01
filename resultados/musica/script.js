document.addEventListener('DOMContentLoaded', () => {


  const trackArt = document.querySelector('.track-art');
  const trackName = document.querySelector('.track-name');
  const trackArtist = document.querySelector('.track-artist');

  const playpause_btn = document.querySelector('.playpause-track-btn');
  const next_btn = document.querySelector('.next-track-btn');
  const prev_btn = document.querySelector('.prev-track-btn');

  const seek_slider = document.querySelector('.seek-slider');
  const volume_slider = document.querySelector('.volume-slider');
  const currentTimeText = document.querySelector('.current-time');
  const totalDurationText = document.querySelector('.total-duration');

  const audioElement = document.querySelector('#audio-element');


  let track_index = 0;
  let isPlaying = false;
  let updateTimer;


  const track_list = [
    {
      name: "Meu grande amigo",
      artist: "Jonas e Josimar",
      image: "https://cdn-academy.akamaized.net/sscdn/tb/160x160/palcomp3-logo/4/8/7/7/fa3d3325bf5145669ef656a6ec82d223.jpg",
      path: "./musicas/jonasejosimar-meu-grande-amigo.mp3"
    },
    {
      name: "A resposta",
      artist: "Kemilly Santos",
      image: "https://cdn-academy.akamaized.net/sscdn/tb/160x160/palcomp3-logo/7/b/6/e/6556a3af599d4c6bb2ab05b702c0dcbc.jpg",
      path: "./musicas/kemillysantos-a-resposta.mp3"
    },
    {
      name: "Beirando vem",
      artist: "Régis Revan",
      image: "https://cdn-academy.akamaized.net/sscdn/tb/160x160/palcomp3-logo/e/f/6/b/c345b351b6394f06aabca6e7b9ceadff.jpg",
      path: "./musicas/regis-revan-beirando-vem.mp3",
    },
    {
      name: "Preciso confiar",
      artist: "Stella Laura",
      image: "https://cdn-academy.akamaized.net/sscdn/tb/160x160/palcomp3-logo/d/7/c/8/1cf76cc83d614cb29d8563d3ff6783cf.jpg",
      path: "./musicas/stellalaura-preciso-confiar.mp3",
    },
    {
      name: "Nem a morte vai nos separar",
      artist: "Zion",
      image: "https://cdn-academy.akamaized.net/sscdn/tb/160x160/palcomp3-logo/3/8/1/4/d64f107849494d97bba9d3b43609341a.jpg",
      path: "./musicas/zion3-nem-a-morte-vai-nos-separar.mp3",
    },
  ];


  function loadTrack(index) {
    clearInterval(updateTimer);
    resetValues();

    audioElement.src = track_list[index].path;
    audioElement.load();

    trackArt.src = track_list[index].image;
    trackName.textContent = track_list[index].name;
    trackArtist.textContent = track_list[index].artist;

    updateTimer = setInterval(seekUpdate, 1000);
    audioElement.addEventListener('ended', nextTrack);
  }

  function resetValues() {
    currentTimeText.textContent = "00:00";
    totalDurationText.textContent = "00:00";
    seek_slider.value = 0;
  }

  function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
  }

  function playTrack() {
    audioElement.play();
    isPlaying = true;
    trackArt.classList.add('playing');
    playpause_btn.innerHTML = '<i class="fas fa-pause-circle fa-4x"></i>';
  }

  function pauseTrack() {
    audioElement.pause();
    isPlaying = false;
    trackArt.classList.remove('playing');
    playpause_btn.innerHTML = '<i class="fas fa-play-circle fa-4x"></i>';
  }

  function nextTrack() {
    track_index = (track_index + 1) % track_list.length;
    loadTrack(track_index);
    playTrack();
  }

  function prevTrack() {
    track_index = (track_index - 1 + track_list.length) % track_list.length;
    loadTrack(track_index);
    playTrack();
  }

  function seekTo() {
    let seekto = audioElement.duration * (seek_slider.value / 100);
    audioElement.currentTime = seekto;
  }

  function setVolume() {
    audioElement.volume = volume_slider.value / 100;
  }

  function seekUpdate() {
    let seekPosition = 0;
    if (!isNaN(audioElement.duration)) {
      seekPosition = audioElement.currentTime * (100 / audioElement.duration);
      seek_slider.value = seekPosition;

      let currentMinutes = Math.floor(audioElement.currentTime / 60);
      let currentSeconds = Math.floor(audioElement.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(audioElement.duration / 60);
      let durationSeconds = Math.floor(audioElement.duration - durationMinutes * 60);

      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

      currentTimeText.textContent = currentMinutes + ":" + currentSeconds;
      totalDurationText.textContent = durationMinutes + ":" + durationSeconds;
    }
  }

  playpause_btn.addEventListener('click', playpauseTrack);
  next_btn.addEventListener('click', nextTrack);
  prev_btn.addEventListener('click', prevTrack);
  seek_slider.addEventListener('change', seekTo);
  volume_slider.addEventListener('input', setVolume);

  loadTrack(track_index);
});