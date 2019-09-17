const url = 'https://www.corynezin.com/transform'
//const url = 'http://127.0.0.1:5000/transform'
const form = document.querySelector('form')

form.addEventListener('submit', e => {
  e.preventDefault()

  const formData = new FormData();

	let img = document.getElementById('img_file').files[0];
	let txt = document.getElementById('txt_file').files[0];
  let threshold = parseInt(document.getElementById('threshold').value)
  let height = parseInt(document.getElementById('height').value)
  let width = parseInt(document.getElementById('width').value)
  let negate = document.getElementById('negate').checked

	formData.append('img_file', img);
	formData.append('txt_file', txt);
	formData.append('threshold', threshold);
	formData.append('height', height);
	formData.append('width', width);
	formData.append('negate', negate);

  console.log('Posting to', url)

  fetch(url, {
    method: 'POST',
    body: formData,
  }).then(response => {
    console.log(response)
    const reader = response.body.getReader()
    decoder = new TextDecoder("utf-8");
    let result = ''
    reader.read().then( function processText({ done, value }) {
      if (done) {
        console.log('done')
        document.getElementById('main').innerHTML = result;
        return
      }
      const chunk = value
      console.log(chunk)
      result += decoder.decode(chunk)
      return reader.read().then(processText)
    })
  })
})
