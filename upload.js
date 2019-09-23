const url = 'https://8zbn4xqmwa.execute-api.us-east-2.amazonaws.com/default/opencv_layered'
const form = document.querySelector('form')

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

form.addEventListener('submit', e => {
  e.preventDefault()

	let img = document.getElementById('img_file').files[0];
	let txt = document.getElementById('txt_file').files[0];
  let threshold = parseInt(document.getElementById('threshold').value)
  let height = parseInt(document.getElementById('height').value)
  let width = parseInt(document.getElementById('width').value)
  let negate = document.getElementById('negate').checked

  const reader = new FileReader();
  reader.readAsDataURL(img);

  reader.onload = function(evt) {
    let payload = {
      image: evt.target.result.split(',')[1],
      text: 'xyz',
      threshold,
      size: [height, width],
      negate
    }
    console.log(payload)
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then(response => {
      console.log(response)
      const reader = response.body.getReader()
      decoder = new TextDecoder("utf-8");
      let result = ''
      reader.read().then( function processText({ done, value }) {
        if (done) {
          document.getElementById('main').innerHTML = JSON.parse(result)['chars'];
          return
        }
        const chunk = value
        console.log(chunk)
        result += decoder.decode(chunk)
        return reader.read().then(processText)
      })
    })
  }
})
