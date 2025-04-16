const original = document.getElementById('original');
const input = document.getElementById('input');
const display = document.getElementById('text-display');
const resetButton = document.getElementById('reset-button');

// お手本が貼られたときに表示に反映
original.addEventListener('input', () => {
    renderDisplay();
});

// 入力があるたびに比較＆表示
input.addEventListener('input', () => {
    renderDisplay();
});

function renderDisplay() {
    const ref = original.value;
    const typed = input.value;
    let html = '';
    let isMistyped = false;
    let isComplete = true; // 入力完了フラグ

    for (let i = 0; i < ref.length; i++) {
      const char = ref[i];

      if (char === '\n') {
        html += '<br>';
        continue;
      }
  
      if (i < typed.length) {
        if (!isMistyped && typed[i] === char) {
          html += `<span class="correct">${char}</span>`;
        } else {
          if (!isMistyped && typed[i] !== char) {
            isMistyped = true;
            html += `<span class="incorrect">${char}</span>`;
          } else {
            html += `<span>${char}</span>`;
          }
        }
      } else {
        html += `<span>${char}</span>`;
      }
      // 途中で間違いがあったら complete を false にする
      if (typed[i] !== char) {
        isComplete = false;
      }
    }
    if (isComplete && !isMistyped && typed !== "") {
        console.log('入力完了！');
        input.disabled = true;
        stopTimer();
        
        if (typed.length >= 3) {
          const charsPerMinute = Math.round((typed.length / timer) * 60);
          document.getElementById('speed').textContent = charsPerMinute;          
        }
        else {
          document.getElementById('speed').textContent = 0;
        }
  
    }

    display.innerHTML = html;
}

// リセットボタンの設定
resetButton.addEventListener('click', function() {
    input.disabled = false; // 入力可能に戻す
    input.value = ''; // 入力内容を空にする
    display.innerHTML = original.value;
    timerDisplay.textContent = '0.0';
    charCountDisplay.textContent = '0'; // 文字数リセット
    totalCountDisplay.textContent = original.value.length;
    clearInterval(intervalId);
    timerStarted = false;
    document.getElementById('speed').textContent = '0'; // CPMのリセット
});


// タイマーについて
const timerDisplay = document.getElementById('timer');
let timer = 0;
let intervalId = null;
let timerStarted = false;

function startTimer() {
  timer = 0;
  timerDisplay.textContent = '0.0';
  intervalId = setInterval(() => {
    timer += 0.1;
    timerDisplay.textContent = timer.toFixed(1);
  }, 100);
}

// タイマー停止関数
function stopTimer() {
  clearInterval(intervalId);
}

// 入力処理
input.addEventListener('input', () => {
  if (!timerStarted && input.value.length > 0) {
    startTimer();
    timerStarted = true;
  }

  renderDisplay(); // 表示を更新
});


// 文字数のカウント
const charCountDisplay = document.getElementById('char-count');

input.addEventListener('input', () => {
  if (!timerStarted && input.value.length > 0) {
    startTimer();
    timerStarted = true;
  }

  charCountDisplay.textContent = input.value.length; // 文字数表示更新
  renderDisplay(); // 表示更新
});


const totalCountDisplay = document.getElementById('total-count');
original.addEventListener('input', () => {
    renderDisplay();
    totalCountDisplay.textContent = original.value.length;
});


const textDisplay = document.getElementById('text-display');

// inputの高さを自動調整する関数
function adjustInputHeight() {
  // text-displayの高さに合わせてinputの高さを調整
  input.style.height = `${display.scrollHeight}px`;
}

// 最初に高さを合わせる
adjustInputHeight();
