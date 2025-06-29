const audioPaths = [
  '', // 1つ目の効果音のパス
  ''  // 2つ目の効果音のパス
];
const sounds = audioPaths.map(path => new Audio(path)); // 各パスに対応する Audio オブジェクトを作成
let isPlaying = false; // 再生中かどうかを管理するフラグ

document.addEventListener('click', () => {
  if (isPlaying) {
    sounds.forEach(sound => sound.pause()); // 全ての音声を停止
  } else {
    sounds.forEach(sound => {
      sound.currentTime = 0; // 再生位置をリセット
      sound.play(); // 全ての音声を再生
    });
  }
  isPlaying = !isPlaying; // フラグを反転
});






