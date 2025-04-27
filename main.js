var modal = document.getElementById("myModal");
var btn = document.getElementById("Coin");
var span = document.getElementsByClassName("close")[0];
var openSound = new Audio("/sound-box/PC-Mouse06-1.mp3"); // モーダル開く音
var closeSound = new Audio("/sound-box/PC-Mouse06-1.mp3"); // モーダル閉じる音

const audioPaths = [
  '/sound-box/ヌケガラデイズ(なめこ).mp3', // 1曲目 (背景音楽のパス)
  '/sound-box/ヌケガラデイズ(なめこ).mp3'  // 2曲目 (背景音楽のパス)
];
let backgroundAudio = new Audio(audioPaths[0]); // 背景音楽
let currentTrack = 0; // 現在再生中の曲のインデックス
let isPlaying = false;

let clickVolume = 1.0;   // クリック音のボリューム (0.0 ~ 1.0)
let backgroundVolume = 0.1; // 背景音楽のボリューム (0.0 ~ 1.0)

// クリック音のボリュームを設定する関数
function setClickVolume() {
  openSound.volume = clickVolume;
  closeSound.volume = clickVolume;
}

// 背景音楽のボリュームを設定する関数
function setBackgroundVolume() {
  backgroundAudio.volume = backgroundVolume;
}

// 初期ボリュームを設定
setClickVolume();
setBackgroundVolume();

btn.onclick = function () {
  modal.style.display = "block";
  openSound.currentTime = 0;
  openSound.play();
};

span.onclick = function () {
  modal.style.display = "none";
  closeSound.currentTime = 0;
  closeSound.play();
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    closeSound.currentTime = 0;
    closeSound.play();
  }
};

backgroundAudio.addEventListener('load', () => {
  backgroundAudio.volume = backgroundVolume; // 初期ボリュームを設定
  //backgroundAudio.loop = true; // ループ再生は各曲の終了時に制御
});

document.addEventListener('click', () => {
  if (backgroundAudio.paused || !isPlaying) {
    if (backgroundAudio.paused) {
      backgroundAudio.play();
      isPlaying = true;
    } else {
      backgroundAudio.pause();
      isPlaying = false;
    }
  }
});

backgroundAudio.addEventListener('ended', () => {
  if (isPlaying) {
    currentTrack++; // 次の曲へ
    if (currentTrack >= audioPaths.length) {
      currentTrack = 0; // 最後の曲の場合は1曲目に戻る
    }
    backgroundAudio.src = audioPaths[currentTrack]; // 次の曲を読み込む
    backgroundAudio.play(); // 次の曲を再生
  }
});






