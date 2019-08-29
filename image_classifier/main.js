let net;
const predictionsElement = document.getElementById('predictions');


const mobilenetDemo = async () => {


  $('.loader').show();
  document.getElementById('status').innerText = 'Loading model...';
  //status('Loading model...');
  console.log('Loading model');

  net = await mobilenet.load();

  console.log('Sucessfully loaded model');
  document.getElementById('status').innerText = 'Sucessfully loaded model';
  $('.loader').hide();
  $("#image-header").show();
  $("#upload-file").show();


};

mobilenetDemo();

// define for later
function showResults(result) {

  const predictionContainer = document.createElement('div');
  predictionContainer.className = 'pred-container';
  const probsContainer = document.createElement('div');

  for (let i = 0; i < result.length; i++) {
    const row = document.createElement('div');
    row.className = 'row';

    const classElement = document.createElement('div');
    classElement.className = 'cell';
    classElement.innerText = `${result[i].className}:  `;
    row.appendChild(classElement);

    const probsElement = document.createElement('div');
    probsElement.className = 'cell';
    probsElement.innerText = result[i].probability.toFixed(3);
    row.appendChild(probsElement);

    probsContainer.appendChild(row);
  }
  predictionContainer.appendChild(probsContainer);

  predictionsElement.insertBefore(
      predictionContainer, predictionsElement.firstChild);
}



async function predict(imgElement){
  const result = await net.classify(imgElement, 5);
  showResults(result);
  // return `${result[0].className}: ${result[0].probability.toFixed(3)}`;
}

// From Siraj's script
// Upload Preview
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
      $('#imagePreview').hide();
      $('#imagePreview').fadeIn(650);
      let img = document.createElement('img');
      img.src = e.target.result;
      img.width = 224;
      img.height = 224;
      img.onload = () => predict(img);
    }
    reader.readAsDataURL(input.files[0]);
  }
}


$("#imageUpload").change(function () {
  $('.image-section').show();
  $('#result').show();
  readURL(this);
});









