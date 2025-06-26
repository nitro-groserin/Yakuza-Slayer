const audioPaths = [
  { src: '', volume: 0.2 }, // 1曲目
  { src: '', volume: 0.8 }, // 2曲目
  { src: '/sound-box②/アスファルトの上を歩く1.mp3', volume: 1.0 }, // 3曲目
  { src: '/sound-gun-box/夜の繁華街.mp3', volume: 0.5 }  // 4曲目
];

const audioElements = audioPaths.map(path => {
  const audio = new Audio(path.src);
  audio.volume = path.volume;
  audio.loop = true; // ループ再生を有効にする
  return audio;
});

let hasPlayed = false; // 再生が開始されたかどうかを管理するフラグ

document.addEventListener('click', () => {
  if (!hasPlayed) {
    audioElements.forEach(audio => {
      audio.currentTime = 0; // 再生位置をリセット
      audio.play(); // 全ての音声を再生
    });
    hasPlayed = true; // 再生が開始されたことを記録
  }
  // 二度目以降のタップでは何も行わない
});




