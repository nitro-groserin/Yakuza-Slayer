const audioPaths = [
  { src: 'ドアを開ける1.mp3', volume: 1.0 }, // 1曲目
  { src: 'ドアを閉める2.mp3', volume: 1.0 }, // 2曲目
  { src: '崩壊都市ー街道ー.mp3', volume: 0.2 }  // 3曲目
];

const audio1 = new Audio(audioPaths[0].src);
audio1.volume = audioPaths[0].volume;

const audio2 = new Audio(audioPaths[1].src);
audio2.volume = audioPaths[1].volume;
// audio2.loop = true; // 2曲目のループ設定は削除

const audio3 = new Audio(audioPaths[2].src);
audio3.volume = audioPaths[2].volume;
audio3.loop = true; // 3曲目のみループ設定

let hasPlayed = false; // 再生が開始されたかどうかを管理するフラグ

// audio1（1曲目）が終了したときにaudio2（2曲目）を再生する設定
audio1.addEventListener('ended', () => {
  audio2.currentTime = 0; // 2曲目の再生位置をリセット
  audio2.play(); // 2曲目を再生
});

document.addEventListener('click', () => {
  if (!hasPlayed) {
    audio1.currentTime = 0; // 1曲目の再生位置をリセット
    audio3.currentTime = 0; // 3曲目の再生位置をリセット

    audio1.play(); // 1曲目を再生
    audio3.play(); // 3曲目を再生 (ループ)

    hasPlayed = true; // 再生が開始されたことを記録
  }
});







document.addEventListener('DOMContentLoaded', function() {
  // ページ遷移ボタンの効果音処理
  const pageNextButton = document.getElementById('nextButton1');
  const pageBackButton = document.getElementById('backButton2');
  const pageClickSound = new Audio('PC-Mouse06-1.mp3');

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
  const div4 = document.querySelector('.div4');
  const div1 = document.querySelector('.div1');
  const div5 = document.querySelector('.div5');
  const div7 = document.querySelector('.div7');
  const div8 = document.querySelector('.div8');
  const div9 = document.querySelector('.div9');



  // 効果音の定義とボリューム設定
  const clickSound1 = new Audio('meka_ge_keyborad01.mp3');
  const clickSound2 = new Audio('');
  const modalClickSound = new Audio('PC-Mouse06-1.mp3');

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
    if (div2) div2.style.display = (currentIndex >= 4 && currentIndex < 60) || (currentIndex > 99) ? 'block' : 'none';
    if (div3) div3.style.display = currentIndex >= 42 && currentIndex <= 59 ? 'block' : 'none';
    if (div6) div6.style.display = currentIndex >= 84 && currentIndex <= 101 ? 'block' : 'none';
    if (div3) div3.style.display = currentIndex >= 60 && currentIndex <= 75 ? 'block' : 'none';
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
    if (div3) div3.style.display = index >= 42 && index <= 59 ? 'block' : 'none';
    if (div6) div6.style.display = (index >= 100 && index < 100) || (index > 100 && index <= 100) ? 'block' : 'none';
    if (div3) div3.style.display = index >= 100 && index <= 150 ? 'block' : 'none';
    if (div4) div4.style.display = index >= 100 && index <= 150 ? 'block' : 'none';
    if (div1) div1.style.display = (index >= 0 && index < 100 ) || (index > 150) ? 'block' : 'none';
    if (div2) div2.style.display = (index >= 45 && index < 45) || (index > 100  && index <= 100) || (index > 100) ? 'block' : 'none';
    if (div5) div5.style.display = (index >= 0 && index < 50) || (index > 100  && index <= 100) || (index > 100) ? 'block' : 'none';
    if (div7) div7.style.display = index >= 16 && index < 19 ? 'block' : 'none';
    if (div8) div8.style.display = index >= 79 && index < 92 ? 'block' : 'none';
    if (div9) div9.style.display = index >= 100 && index < 100 ? 'block' : 'none';



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

  // モーダル93 関連
  const modal93 = document.getElementById("myModal93");
  const choices = document.querySelectorAll('#myModal93 input[name="choices"]');
  const modalDecisionButton93 = document.querySelector('#myModal93 .modal-content93 button');
  const closeButton93 = document.querySelector('#myModal93 .close');

  if (modal93) {
    choices.forEach(choice => {
      choice.addEventListener('change', () => {
        modalClickSound.currentTime = 0;
        modalClickSound.play();
      });
    });

    if (modalDecisionButton93) {
      modalDecisionButton93.onclick = function() {
        console.log('決定ボタンがクリックされました');
        let selectedChoice = document.querySelector('#myModal93 input[name="choices"]:checked');
        if (selectedChoice) {
          console.log('選択された value:', selectedChoice.value);
          modalClickSound.currentTime = 0;
          modalClickSound.play(); // 決定ボタンクリック時にも効果音 (念のため)
          modal93.style.display = "none";

          let choiceValue = selectedChoice.value;
          let targetPreId;
          if (choiceValue === "1") {
            targetPreId = "pre95";
          } else if (choiceValue === "2") {
            targetPreId = "pre96";
          } else if (choiceValue === "3") {
            targetPreId = "pre97";
          }

          if (targetPreId) {
            for (let i = 0; i < preElements.length; i++) {
              if (preElements[i].id === targetPreId) {
                currentIndex = i;
                showPre(currentIndex);
                return;
              }
            }
            console.error(`ID '${targetPreId}' の要素が見つかりませんでした。`);
          } else {
            console.error("選択肢が選択されていません。");
          }
        } else {
          alert("選択肢を選んでください。");
        }
      };
    }

    if (closeButton93) {
      closeButton93.onclick = closeModal93;
    }
  }
});

// モーダル関連
function openModal93() {
  const modal93 = document.getElementById("myModal93");
  if (modal93) {
    modal93.style.display = "block";
    const clickSoundEffectModal52Open = new Audio('PC-Mouse06-1.mp3');
    clickSoundEffectModal52Open.play();
  }
}

function closeModal93() {
  const modal93 = document.getElementById("myModal93");
  if (modal93) {
    modal93.style.display = "none";
    const clickSoundEffectModal52Close = new Audio('PC-Mouse06-1.mp3');
    clickSoundEffectModal52Close.play();
  }
}

// ... (その他の関数は変更なし) ...
function setupBackButton(buttonId, targetPreId, showPreId) {
  const button = document.getElementById(buttonId);
  if (button) {
    button.onclick = function() {
      const targetElement = document.getElementById(targetPreId);
      const showPreElement = document.getElementById(showPreId);
      if (targetElement && showPreElement) {
        targetElement.style.display = "none";
        showPreElement.style.display = "block";
        startTextAnimation(showPreElement);
        playClickSound();
      }
    };
  }
}

setupBackButton("backButtonPre95", "pre95", "pre93");
setupBackButton("backButtonPre96", "pre96", "pre93");
setupBackButton("backButtonPre97", "pre97", "pre93");

const backButtonPre98 = document.getElementById("backButton2"); // pre98 の戻るボタンは #backButton2
if (backButtonPre98) {
  backButtonPre98.onclick = function() {
    document.getElementById("pre98").style.display = "none";
    playClickSound();
    let prevPreId = "";
    if (document.getElementById("pre95").style.display === "block") {
      prevPreId = "pre95";
    } else if (document.getElementById("pre96").style.display === "block") {
      prevPreId = "pre96";
    } else if (document.getElementById("pre97").style.display === "block") {
      prevPreId = "pre97";
    }
    if (prevPreId) {
      const prevPreElement = document.getElementById(prevPreId);
      if (prevPreElement) {
        prevPreElement.style.display = "block";
        startTextAnimation(prevPreElement);
      }
    }
  };
}

const nextButtonPre98 = document.getElementById("nextButton1"); // pre98 の進むボタンは #nextButton1
if (nextButtonPre98) {
  nextButtonPre98.onclick = function() {
    document.getElementById("pre98").style.display = "none";
    const pre99Element = document.getElementById("pre99"); // 変数名修正
    if (pre99Element) {
      pre99Element.style.display = "block";
      startTextAnimation(pre99Element);
      playClickSound();
    }
  };
}






//「最近、目立ちたがり屋のバカ野郎が多すぎて困るぜ。
　//指まで指しちゃってよ」
　
//「あ？　なんて言ったんだ今？」


//「目立ちたがり屋のバカ野郎が多すぎるって言ったんだよ。
//耳聞こえねえのか？　この野郎」




