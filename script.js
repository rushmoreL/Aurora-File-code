function generateFileName() {
    const code = document.getElementById('codeInput').value;
    const option = document.getElementById('option').value;
    const season = document.getElementById('seasonInput').value;

    const lines = code.split('\n');
    
    if (lines.length < 5 || !season) {
        document.getElementById('result').innerText = "Invalid input.";
        return;
    }

    const description = lines[0];
    const productCode = lines[1];
    const moid = lines[4];

    const moidNumber = moid.split(' ')[1];
    const productNumber = productCode.split('-')[0];

    const newFileName = `${moidNumber}_${option}_${description.replace(/ /g, '_')}_${season}_${productNumber}`;
    
    document.getElementById('result').innerText = newFileName;
}

function copyToClipboard() {
    const result = document.getElementById('result').innerText;
    if (result && result !== "Invalid input.") {
        navigator.clipboard.writeText(result).then(() => {
            alert('File name copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
            alert('Failed to copy text.');
        });
    }
}
