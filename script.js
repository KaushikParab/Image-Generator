document.getElementById('generateBtn').addEventListener('click', async function () {
    const inputText = document.getElementById('inputText').value;

    if (!inputText.trim()) {
        alert('Please enter some text!');
        return;
    }

    const form = new FormData();
    form.append('prompt', inputText);

    try {
        const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
            method: 'POST',
            headers: {
                'x-api-key': 'Your API Key',
            },
            body: form,
        });

        const buffer = await response.arrayBuffer();

        const blob = new Blob([buffer], { type: 'image/png' });
        const imageUrl = URL.createObjectURL(blob);

        // Set the image result
        document.getElementById("output").style.visibility = 'visible';
        const imageElement = document.getElementById('imageResult');
        imageElement.src = imageUrl;

        // Hide error message
        document.getElementById('error').classList.add('hidden');
        document.getElementById('output').style.display = 'block';


        const Downloadbtn=document.querySelector(".Downloadbtn");
        Downloadbtn.addEventListener('click', ()=>{
            const a= document.createElement("a");
            a.href=imageUrl;
            a.download='kaushik_generated_photo.png';
            a.click();
        });
    } catch (error) {
        console.error('Error fetching image:', error);

        // Show error message
        document.getElementById('error').classList.remove('hidden');
        document.getElementById('result').style.display = 'none';
    }
});
