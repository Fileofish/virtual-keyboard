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
      let addContent = e.target.querySelector('sup');
      let mainContent = e.target.querySelector('p');
      kbText.value = kbText.value.slice(0, carPos) + mainContent.innerText + kbText.value.slice(carPos);
    } else {
      kbText.value = kbText.value.slice(0, carPos) + e.target.innerText + kbText.value.slice(carPos);
    }

  } else if (e.target.parentNode.classList.contains('key')) {
    let addContent = e.target.parentNode.querySelector('sup');
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

    // function getCaret(el) { 
//   if (el.selectionStart) {
//     return el.selectionStart; 
//   } else if (document.selection) { 
//     el.focus(); 
 
//     let r = document.selection.createRange(); 
//     if (r == null) { 
//       return 0; 
//     } 
 
//     var re = el.createTextRange(), 
//         rc = re.duplicate(); 
//     re.moveToBookmark(r.getBookmark()); 
//     rc.setEndPoint('EndToStart', re); 
 
//     return rc.text.length; 
//   }  
//   return 0; 
// }