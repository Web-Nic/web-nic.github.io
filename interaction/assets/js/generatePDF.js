

// Generate PDF
function generatePDF() {
  let element = document.getElementById('invoice');
  let elClone = element.cloneNode(true);
  let formatPage = document.querySelector('[name="pageFormat"]').value;
  let pageOrientation = document.querySelector('[name="pageOrientation"]').value;

  // Change textarea on div
  let editingTitle = elClone.querySelector('.b-frame__subtitle');
  let newTag = document.createElement('div');
  newTag.innerHTML = editingTitle.value;
  editingTitle.parentNode.replaceChild(newTag, editingTitle);


  elClone.classList.add('st-pdf');


  switch(formatPage) {
    case 'A3': elClone.classList.add('st-a3');
      break;
    case 'A4': elClone.classList.add('st-a4');
      break;
    case 'A5': elClone.classList.add('st-a5');
      break;
    case 'A6': elClone.classList.add('st-a6');
      break;
  }

  if(pageOrientation === 'landscape') {
    elClone.classList.add('st-landscape')
  } else {
    elClone.classList.remove('st-landscape')
  }

  let opt = {
    filename:     'QR-code.pdf',
    jsPDF:        { format: formatPage, orientation: pageOrientation }
  };

  html2pdf().set(opt).from(elClone).save();
}


// Download QR
$("#downloadQR").click(function() {
  if($('[name="typeFileRadio"]:checked').val() === 'typeFileDOC') {
    $("#invoice").wordExport();

  } else {
    generatePDF();
  }
});
