let currentInput = null;
let currentValue = "";

// フォーカスされた入力要素を追跡
document.addEventListener(
  "focus",
  (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      currentInput = e.target;
      currentValue = currentInput.value;
    }
  },
  true
);

document.addEventListener(
  "blur",
  () => {
    currentInput = null;
    currentValue = "";
  },
  true
);

function pollGamepads() {
  const gamepads = navigator.getGamepads();
  for (let gamepad of gamepads) {
    if (gamepad) {
      handleGamepadInput(gamepad);
    }
  }
}

function handleGamepadInput(gamepad) {
  if (!currentInput) return;

  // スティック
  const leftStickX = gamepad.axes[0];
  const leftStickY = gamepad.axes[1];
  const rightStickX = gamepad.axes[2];
  const rightStickY = gamepad.axes[3];

  // ボタン
  const xButton = gamepad.buttons[0].pressed;
  const circleButton = gamepad.buttons[1].pressed;
  const l1Button = gamepad.buttons[4].pressed;
  const r1Button = gamepad.buttons[5].pressed;
  const l2Button = gamepad.buttons[6].pressed;
  const r2Button = gamepad.buttons[7].pressed;

  // スティック入力を文字入力に変換
  if (leftStickX < -0.5) addCharacter("w");
  if (leftStickX > 0.5) addCharacter("s");
  if (leftStickY < -0.5) addCharacter("d");
  if (leftStickY > 0.5) addCharacter("e");

  if (rightStickX < -0.5) addCharacter("u");
  if (rightStickX > 0.5) addCharacter("j");
  if (rightStickY < -0.5) addCharacter("k");
  if (rightStickY > 0.5) addCharacter("i");

  // ボタン入力を文字入力に変換
  if (l1Button) addCharacter("r");
  if (l2Button) addCharacter("f");
  if (r1Button) addCharacter("o");
  if (r2Button) addCharacter("l");
  if (xButton) addCharacter("h");
  if (circleButton) addCharacter("g");
}

function addCharacter(char) {
  if (!currentInput) return;
  const cursorPos = currentInput.selectionStart;
  currentValue =
    currentValue.slice(0, cursorPos) + char + currentValue.slice(cursorPos);
  currentInput.value = currentValue;
  currentInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
}

function deleteCharacter() {
  if (!currentInput) return;
  const cursorPos = currentInput.selectionStart;
  if (cursorPos > 0) {
    currentValue =
      currentValue.slice(0, cursorPos - 1) + currentValue.slice(cursorPos);
    currentInput.value = currentValue;
    currentInput.setSelectionRange(cursorPos - 1, cursorPos - 1);
  }
}

function moveCursor(direction) {
  if (!currentInput) return;
  const cursorPos = currentInput.selectionStart;
  const newPos = Math.max(
    0,
    Math.min(currentValue.length, cursorPos + direction)
  );
  currentInput.setSelectionRange(newPos, newPos);
}

function submitForm() {
  if (!currentInput) return;
  const form = currentInput.closest("form");
  if (form) {
    form.submit();
  }
}

function clearInput() {
  if (!currentInput) return;
  currentInput.value = "";
  currentValue = "";
}

setInterval(pollGamepads, 100); // 約60FPSでポーリング
