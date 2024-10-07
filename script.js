function generateFileNames() {
    const code = document.getElementById('codeInput').value;
    const option = document.getElementById('option').value;
    const season = document.getElementById('seasonInput').value;

    const lines = code.split('\n');
    
    if (lines.length < 5 || !season) {
        document.getElementById('auroraName').innerText = "Invalid input.";
        document.getElementById('schmName').innerText = "";
        return;
    }

    const description = lines[0];
    const productCode = lines[1];
    const moid = lines[4];

    const moidNumber = moid.split(' ')[1];
    const productNumber = productCode.split('-')[0];

    // Aurora Upload Name
    const auroraFileName = `${moidNumber}_${option}_${description.replace(/ /g, '_')}_${season}_${productNumber}`;
    document.getElementById('auroraName').innerText = `Aurora Upload Name: ${auroraFileName}`;

    // Schm Name
    const schmFileName = `${productNumber}_${description.replace(/ /g, '_')}_schm_${season}_T${option}`;
    document.getElementById('schmName').innerText = `Schm Name: ${schmFileName}`;
}

function copyToClipboard(elementId) {
    const textToCopy = document.getElementById(elementId).innerText.split(': ')[1];
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('File name copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
            alert('Failed to copy text.');
        });
    }
}
