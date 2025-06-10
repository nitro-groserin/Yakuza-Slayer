const audioPaths = [
  { src: '/sound-box/8月まで休む！！！！！！（KAGE）.mp3', volume: 0.2, id: 'siren' },
  { src: '', volume: 1.0, id: 'bonfire' }
];

const audioElements = {};

audioPaths.forEach(path => {
  audioElements[path.id] = new Audio(path.src);
  audioElements[path.id].volume = path.volume;
  audioElements[path.id].loop = true; // ★ ループ再生を有効にする
});

document.addEventListener('click', () => {
  // クリック時に両方の音を再生する
  audioElements['siren'].play();
  audioElements['bonfire'].play();
});

// ended イベントリスナーは、ループ再生が有効になっている場合は通常必要ありません。
// (必要に応じて、ループの開始時や終了時などに処理を行いたい場合に利用します)
// audioElements['siren'].addEventListener('ended', () => {
//   console.log('サイレンの再生が終了しました');
// });

// audioElements['bonfire'].addEventListener('ended', () => {
//   console.log('焚き火の再生が終了しました');
// });








document.addEventListener('DOMContentLoaded', function() {
  // ページ遷移ボタンの効果音処理
  const pageNextButton = document.getElementById('nextButton1');
  const pageBackButton = document.getElementById('backButton2');
  const pageClickSound = new Audio('/sound-box/PC-Mouse06-1.mp3');

  if (pageNextButton) {
    pageNextButton.addEventListener('click', function() {
      pageClickSound.play();
      window.location.href = this.getAttribute('href');
    });
  }

  if (pageBackButton) {
    pageBackButton.addEventListener('click', function() {
      pageClickSound.play();
      window.location.href = this.getAttribute('href');
    });
  }

  // ローカルストレージのリセット (currentIndex のみ保持)
  //localStorage.removeItem('currentIndex');
  //localStorage.removeItem('currentPreId');

  const preElements = document.querySelectorAll('#preContainer pre');
  const nextButtons = document.querySelectorAll('[id^="nextButton"]');
  const backButtons = document.querySelectorAll('[id^="backButton"]');
  const autoPlayButtons = document.querySelectorAll('.autoPlayButton');
  const div2 = document.querySelector('.div2');
  const div3 = document.querySelector('.div3');
  const div6 = document.querySelector('.div6');


  // 効果音の定義とボリューム設定
  const clickSound1 = new Audio('/sound-box/meka_ge_keyborad01.mp3');
  const clickSound2 = new Audio('');
  const modalClickSound = new Audio('/sound-box/PC-Mouse06-1.mp3');

  const mainClickVolume1 = 0.2;
  const mainClickVolume2 = 0.0;
  const modalClickVolume = 1.0;

  clickSound1.volume = mainClickVolume1;
  clickSound2.volume = mainClickVolume2;
  modalClickSound.volume = modalClickVolume;

  // ローカルストレージから現在のインデックスを読み込む
  let currentIndex = localStorage.getItem('currentIndex');
  currentIndex = currentIndex ? parseInt(currentIndex, 10) : 0; // 初期値は 0

  let autoPlayInterval = null;
  let isAutoPlaying = false;
  let animationInterval;

  function playClickSound() {
    clickSound1.currentTime = 0;
    clickSound1.play();
    clickSound2.currentTime = 0;
    clickSound2.play();
  }

  function startTextAnimation(preElement) {
    const textSpan = preElement.querySelector('span');
    if (!textSpan) return;
    const text = textSpan.textContent.trim();
    let index = 0;
    textSpan.textContent = "";
    textSpan.style.display = "inline";
    clearInterval(animationInterval);
    animationInterval = setInterval(() => {
      if (index < text.length) {
        textSpan.textContent += text[index];
        index++;
      } else {
        clearInterval(animationInterval);
        clickSound1.muted = true;
      }
    }, 100);
  }

  // 初期表示と復元
  const savedPreId = localStorage.getItem('currentPreId');
  if (savedPreId) {
    preElements.forEach(pre => {
      pre.style.display = (pre.id === savedPreId) ? 'block' : 'none';
      if (pre.id === savedPreId && pre.querySelector('span')) {
        clickSound1.muted = false;
        const textSpan = pre.querySelector('span');
        if (textSpan) {
          const text = textSpan.textContent.trim();
          textSpan.textContent = text; // アニメーションをスキップ
        }
        // currentIndex を savedPreId に基づいて更新
        for (let i = 0; i < preElements.length; i++) {
          if (preElements[i].id === savedPreId) {
            currentIndex = i;
            localStorage.setItem('currentIndex', currentIndex);
            break;
          }
        }
      } else {
        pre.style.display = 'none';
      }
    });
    // 他の div 要素の表示状態も復元 (currentIndex に基づいて)
    if (div2) div2.style.display = (currentIndex >= 3 && currentIndex < 28) || (currentIndex > 99) ? 'block' : 'none';
    if (div3) div3.style.display = currentIndex >= 42 && currentIndex <= 59 ? 'block' : 'none';
    if (div6) div6.style.display = currentIndex >= 48 && currentIndex <= 50 ? 'block' : 'none';
    if (div3) div3.style.display = currentIndex >= 29 && currentIndex <= 75 ? 'block' : 'none';
  } else {
    showPre(currentIndex); // 初期表示
  }

  // 表示切り替え関数
  function showPre(index) {
    if (index < 0 || index >= preElements.length) return;
    clearInterval(animationInterval);
    preElements.forEach((pre, i) => {
      pre.style.display = i === index ? 'block' : 'none';
      if (i === index && pre.querySelector('span')) {
        clickSound1.muted = false;
        startTextAnimation(pre);
        localStorage.setItem('currentPreId', pre.id); // 現在表示中の pre 要素の ID を保存
      }
    });
    if (div2) div2.style.display = (index >= 3 && index < 28) || (index > 99) ? 'block' : 'none';
    if (div3) div3.style.display = index >= 42 && index <= 59 ? 'block' : 'none';
    if (div6) div6.style.display = index >= 80 && index <= 99 ? 'block' : 'none';
    if (div3) div3.style.display = index >= 29 && index <= 75 ? 'block' : 'none';
    localStorage.setItem('currentIndex', index); // 現在のインデックスを保存
  }

  // 次へ
  function nextPre() {
    if (currentIndex < preElements.length - 1) {
      currentIndex++;
      showPre(currentIndex);
      playClickSound();
    } else {
      stopAutoPlay();
    }
  }

  // 前へ
  function prevPre() {
    if (currentIndex > 0) {
      currentIndex--;
      showPre(currentIndex);
      playClickSound();
    }
  }

  // オート再生開始
  function startAutoPlay() {
    if (!isAutoPlaying) {
      isAutoPlaying = true;
      autoPlayButtons.forEach(button => (button.textContent = '停止'));
      clearInterval(animationInterval);
      autoPlayInterval = setInterval(() => {
        nextPre();
        playClickSound();
      }, 6000);
    }
  }

  // オート再生停止
  function stopAutoPlay() {
    if (isAutoPlaying) {
      isAutoPlaying = false;
      autoPlayButtons.forEach(button => (button.textContent = 'オート再生'));
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
      clearInterval(animationInterval);
    }
  }

  // イベントリスナー設定
  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      stopAutoPlay();
      clearInterval(animationInterval);
      nextPre();
      playClickSound();
    });
  });

  backButtons.forEach(button => {
    button.addEventListener('click', () => {
      stopAutoPlay();
      clearInterval(animationInterval);
      prevPre();
      playClickSound();
    });
  });

  autoPlayButtons.forEach(button => {
    button.addEventListener('click', () => {
      clearInterval(animationInterval);
      if (isAutoPlaying) {
        stopAutoPlay();
        playClickSound();
      } else {
        startAutoPlay();
        playClickSound();
      }
    });
  });

  // モーダル関連 (修正)
  const modal = document.getElementById('myModal');
  const btn = document.getElementById('Coin');
  const span = document.getElementsByClassName('close')[0];

  if (modal && btn && span) {
    btn.onclick = () => {
      modalClickSound.currentTime = 0;
      modalClickSound.play();
      modal.style.display = 'block';
    };
    span.onclick = () => {
      modalClickSound.currentTime = 0;
      modalClickSound.play();
      modal.style.display = 'none';
    };
    window.onclick = (event) => {
      if (event.target === modal) {
        modalClickSound.currentTime = 0;
        modalClickSound.play();
        modal.style.display = 'none';
      }
    };
  }
});





