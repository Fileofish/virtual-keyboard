const kbText = document.querySelector('.keyboard__textarea');
let carPos = kbText.selectionStart;
let printPos;

kbText.focus();
// Add symbol click

function functionKey(e) {
  
  if (e.target.classList.contains('key__tab')) {
    kbText.value = `${kbText.value.slice(0, carPos)}    ${kbText.value.slice(carPos)}`;
    carPos += 4;
  } else if (e.target.classList.contains('key__enter')) {
    kbText.value = kbText.value.slice(0, carPos) + `\n` + kbText.value.slice(carPos);
    carPos++;
  } else if (e.target.classList.contains('key__space')) {
    kbText.value = kbText.value.slice(0, carPos) + ' ' + kbText.value.slice(carPos);
    carPos++;
  } else if (e.target.classList.contains('key__backspace') && carPos != 0) {
    kbText.value = kbText.value.slice(0, carPos - 1) + kbText.value.slice(carPos);
    carPos--;
  } else if (e.target.classList.contains('key__del') && carPos < kbText.value.length) {
    kbText.value = kbText.value.slice(0, carPos) + kbText.value.slice(carPos + 1);
  } else if (e.target.classList.contains('key__arr-right')) {
    if (carPos < kbText.value.length) carPos++;
  } else if (e.target.classList.contains('key__arr-left')) {
    if (carPos > 0) carPos--;
  } else if (e.target.classList.contains('key__arr-up')) {
    
    if (kbText.value.slice(0,carPos).indexOf('\n') !== -1) {
      const lastTransferPos = kbText.value.slice(0, carPos).lastIndexOf('\n');
      const lengthToTransferPos = carPos - lastTransferPos;

      if (lengthToTransferPos > 117) {
        carPos -= 118;
      } else if (kbText.value.slice(0,carPos).split('\n').length == 2) {
        
        if (lastTransferPos < 117) {
          carPos = carPos - lastTransferPos - 1;
        } else if (lengthToTransferPos > lastTransferPos % 117) {
          carPos = lastTransferPos;
        } else {
          carPos = carPos - lastTransferPos % 117;
        }

      } else if (kbText.value.slice(0,carPos).split('\n').length > 2) {
        const preLastTransferPos = kbText.value.slice(0, lastTransferPos).lastIndexOf('\n');
        const lengthPreLastToTransferPos = lastTransferPos - preLastTransferPos;
        if (lengthToTransferPos < lengthPreLastToTransferPos % 117) {
          carPos = lastTransferPos - lengthPreLastToTransferPos % 117 + lengthToTransferPos + 1;
        } else {
          carPos = lastTransferPos;
        }
      } 

    } else if (carPos > 117) {
      carPos -= 118;
    } else {
      carPos = 0;
    }

  } else if (e.target.classList.contains('key__arr-down')) {

    if (kbText.value.slice(carPos).indexOf('\n') !== -1) {

      const nextTransferPos = kbText.value.slice(carPos).indexOf('\n') + kbText.value.slice(0,carPos).length;
      const lengthNextTransferPos = nextTransferPos - carPos;

      if (lengthNextTransferPos > 117) {
        carPos += 118;
      } else if (kbText.value.slice(0,carPos).split('\n').length >= 2) {
        const lastTransferPos = kbText.value.slice(0, carPos).lastIndexOf('\n');
        const lengthLastTransferPos = carPos - lastTransferPos;
        const lengthLastToNextTransferPos = nextTransferPos - lastTransferPos;

        if (lengthLastTransferPos % 117 > lengthLastToNextTransferPos % 117) {
          carPos = nextTransferPos;
        } else {
          carPos += lengthNextTransferPos + lengthLastTransferPos % 117 - 1;
        }
      } else if (kbText.value.slice(0,carPos).lastIndexOf('\n') === -1) {

        if (carPos % 117 > nextTransferPos % 117) {
          carPos = nextTransferPos;
        } else if (kbText.value.slice(carPos).split('\n').length >= 2) {
          const lengthPostNextTransferPos = kbText.value.slice(nextTransferPos+1).indexOf('\n');
          
          if (lengthPostNextTransferPos < carPos % 117) {
            carPos = nextTransferPos + lengthPostNextTransferPos + 1;
          } else {
            carPos += lengthNextTransferPos + carPos % 117 + 1;
          }

        } else {
          carPos += carPos % 117 + lengthNextTransferPos + 1;
        }

      } 
    } else if (kbText.value.slice(carPos) > 117) {
      carPos += 117;
    } else {
      carPos = kbText.value.length;
    }
  }

}

function printKey(e) {
  if (e.target.classList.contains('key')) {

    if (e.target.classList.contains('key-2str')) {
      let mainContent = e.target.querySelector('p');
      kbText.value = kbText.value.slice(0, carPos) + mainContent.innerText + kbText.value.slice(carPos);
    } else {
      kbText.value = kbText.value.slice(0, carPos) + e.target.innerText + kbText.value.slice(carPos);
    }

  } else if (e.target.parentNode.classList.contains('key')) {
    let mainContent = e.target.parentNode.querySelector('p');
    kbText.value = kbText.value.slice(0, carPos) + mainContent.innerText + kbText.value.slice(carPos);
  }
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('key-functional') || e.target.parentNode.classList.contains('key-functional')) {
    functionKey(e);
    kbText.selectionStart = kbText.selectionEnd = carPos;
  } else if (e.target.classList.contains('key') || e.target.parentNode.classList.contains('key')) {
    printKey(e);
    carPos++;
    kbText.selectionStart = kbText.selectionEnd = carPos;
  } else if (e.target == kbText) {
    carPos = kbText.selectionStart;
  } else {
    carPos = kbText.value.length;
  }
  kbText.focus();
})

// key print
document.addEventListener('keydown', function(e) {
  const eventKey = `${e.code}`;
  console.log(eventKey)
  if (eventKey.slice(0,3) == 'Key') {
    let symbol = eventKey[3].toLowerCase();
    document.querySelector(`.key__${symbol}`).classList.add('key_active');
    carPos++;
  } else if (eventKey == 'Enter') {
    document.querySelector(`.key__enter`).classList.add('key_active');
    carPos++;
  } else if (eventKey == 'Backquote') {
    document.querySelector(`.key__backquote`).classList.add('key_active');
    carPos++;
  } else if (eventKey.slice(0,5) == 'Digit') {
    let digit = eventKey[5];
    document.querySelector(`.key__${digit}`).classList.add('key_active');
    carPos++;
  } else if (eventKey == 'Minus') {
    document.querySelector(`.key__minus`).classList.add('key_active');
    carPos++;
  } else if (eventKey == 'Equal') {
    document.querySelector(`.key__equals`).classList.add('key_active');
    carPos++;
  } else if (eventKey == 'Backspace') {
    document.querySelector(`.key__backspace`).classList.add('key_active');
    carPos--;
  } else if (eventKey == 'Tab') {
    e.preventDefault();
    document.querySelector(`.key__tab`).classList.add('key_active');
    kbText.value = `${kbText.value.slice(0, carPos)}    ${kbText.value.slice(carPos)}`;
    carPos += 4;
    kbText.focus();
    kbText.selectionStart = kbText.selectionEnd = carPos;
  } else if (eventKey == 'BracketLeft') {
    document.querySelector(`.key__op-square-bracket`).classList.add('key_active');
    carPos++;
  } else if (eventKey == 'BracketRight') {
    document.querySelector(`.key__cl-square-bracket`).classList.add('key_active');
    carPos++;
  } else if (eventKey == 'Backslash') {
    document.querySelector(`.key__backslash-add`).classList.add('key_active');
    carPos++;
  } else if (eventKey == 'Delete') {
    document.querySelector(`.key__del`).classList.add('key_active');
  } else if (eventKey == 'CapsLock') {
    document.querySelector(`.key__caps-lock`).classList.toggle('key_active');
  } else if (eventKey == 'Semicolon') {
    document.querySelector(`.key__semicolon`).classList.toggle('key_active');
    carPos++;
  } else if (eventKey == 'Quote') {
    document.querySelector(`.key__apostrophe`).classList.toggle('key_active');
    carPos++;
  } else if (eventKey == 'ShiftLeft') {
    document.querySelector(`.key__left-shift`).classList.toggle('key_active');
  } else if (eventKey == 'ArrowUp') {
    document.querySelector(`.key__arr-up`).classList.toggle('key_active');
    carPos = kbText.selectionStart;
  } else if (eventKey == 'ShiftRight') {
    document.querySelector(`.key__right-shift`).classList.toggle('key_active');
  } else if (eventKey == 'ControlLeft') {
    document.querySelector(`.key__left-ctrl`).classList.toggle('key_active');
  } else if (eventKey == 'MetaLeft') {
    document.querySelector(`.key__win`).classList.toggle('key_active');
    setTimeout(() => document.querySelector(`.key__win`).classList.remove('key_active'), 200);
  } else if (eventKey == 'AltLeft') {
    document.querySelector(`.key__left-alt`).classList.toggle('key_active');
  } else if (eventKey == 'Space') {
    document.querySelector(`.key__space`).classList.toggle('key_active');
    carPos++;
  } else if (eventKey == 'AltRight') {
    document.querySelector(`.key__right-alt`).classList.toggle('key_active');
  } else if (eventKey == 'ControlRight') {
    document.querySelector(`.key__right-ctrl`).classList.toggle('key_active');
  } else if (eventKey == 'ArrowLeft') {
    carPos = kbText.selectionStart;
    document.querySelector(`.key__arr-left`).classList.toggle('key_active');
  } else if (eventKey == 'ArrowDown') {
    carPos = kbText.selectionStart;
    document.querySelector(`.key__arr-down`).classList.toggle('key_active');
  } else if (eventKey == 'ArrowRight') {
    carPos = kbText.selectionStart;
    document.querySelector(`.key__arr-right`).classList.toggle('key_active');
  }
})

document.addEventListener('keyup', function(e) {
  const eventKey = `${e.code}`;
  if (eventKey.slice(0,3) == 'Key') {
    let symbol = eventKey[3].toLowerCase();
    setTimeout(() => document.querySelector(`.key__${symbol}`).classList.remove('key_active'), 200);
  } else if (eventKey == 'Enter') {
    setTimeout(() => document.querySelector(`.key__enter`).classList.remove('key_active'), 200);
  } else if (eventKey == 'Backquote') {
    setTimeout(() => document.querySelector(`.key__backquote`).classList.remove('key_active'), 200);
  } else if (eventKey.slice(0,5) == 'Digit') {
    let digit = eventKey[5];
    setTimeout(() => document.querySelector(`.key__${digit}`).classList.remove('key_active'), 200);
  } else if (eventKey == 'Minus') {
    setTimeout(() => document.querySelector(`.key__minus`).classList.remove('key_active'), 200);
  } else if (eventKey == 'Equal') {
    setTimeout(() => document.querySelector(`.key__equals`).classList.remove('key_active'), 200);
  } else if (eventKey == 'Backspace') {
    setTimeout(() => document.querySelector(`.key__backspace`).classList.remove('key_active'), 200);
  } else if (eventKey == 'Tab') {
    setTimeout(() => document.querySelector(`.key__tab`).classList.remove('key_active'), 200);
  } else if (eventKey == 'BracketLeft') {
    setTimeout(() => document.querySelector(`.key__op-square-bracket`).classList.remove('key_active'), 200);
  } else if (eventKey == 'BracketRight') {
    setTimeout(() => document.querySelector(`.key__cl-square-bracket`).classList.remove('key_active'), 200);
  } else if (eventKey == 'Backslash') {
    setTimeout(() => document.querySelector(`.key__backslash-add`).classList.remove('key_active'), 200);
  } else if (eventKey == 'Delete') {
    setTimeout(() => document.querySelector(`.key__del`).classList.remove('key_active'), 200);
  } else if (eventKey == 'Semicolon') {
    setTimeout(() => document.querySelector(`.key__semicolon`).classList.remove('key_active'), 200);
  } else if (eventKey == 'Quote') {
    setTimeout(() => document.querySelector(`.key__apostrophe`).classList.remove('key_active'), 200);
  } else if (eventKey == 'ShiftLeft') {
    setTimeout(() => document.querySelector(`.key__left-shift`).classList.remove('key_active'), 200);
  } else if (eventKey == 'ArrowUp') {
    setTimeout(() => document.querySelector(`.key__arr-up`).classList.remove('key_active'), 200);
  } else if (eventKey == 'ShiftRight') {
    setTimeout(() => document.querySelector(`.key__right-shift`).classList.remove('key_active'), 200);
  } else if (eventKey == 'ControlLeft') {
    setTimeout(() => document.querySelector(`.key__right-shift`).classList.remove('key_active'), 200);
  } else if (eventKey == 'AltLeft') {
    setTimeout(() => document.querySelector(`.key__left-alt`).classList.remove('key_active'), 200);
  } else if (eventKey == 'Space') {
    setTimeout(() => document.querySelector(`.key__space`).classList.remove('key_active'), 200);
  } else if (eventKey == 'AltRight') {
    setTimeout(() => document.querySelector(`.key__right-alt`).classList.remove('key_active'), 200);
  } else if (eventKey == 'ControlRight') {
    setTimeout(() => document.querySelector(`.key__right-ctrl`).classList.remove('key_active'), 200);
  } else if (eventKey == 'ArrowLeft') {
    setTimeout(() => document.querySelector(`.key__arr-left`).classList.remove('key_active'), 200);
  } else if (eventKey == 'ArrowDown') {
    setTimeout(() => document.querySelector(`.key__arr-down`).classList.remove('key_active'), 200);
  } else if (eventKey == 'ArrowRight') {
    setTimeout(() => document.querySelector(`.key__arr-right`).classList.remove('key_active'), 200);
  }
})