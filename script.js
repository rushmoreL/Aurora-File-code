function generateFileNames() {
  const codeRaw = document.getElementById('codeInput').value || '';
  const option = (document.getElementById('option').value || '').trim();
  const season = (document.getElementById('seasonInput').value || '').trim();

  // Split into lines, trim each line, and remove empty lines
  const lines = codeRaw
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  // Basic validation
  if (lines.length < 3 || !season) {
    document.getElementById('auroraName').innerText = 'Invalid input.';
    document.getElementById('schmName').innerText = '';
    return;
  }

  // Extract fields
  const descriptionRaw = lines[0] || '';
  const productCodeRaw = lines[1] || '';

  // Normalize description: remove leading/trailing spaces, collapse whitespace into single "_"
  const description = descriptionRaw.trim().replace(/\s+/g, '_');

  // Product number: before "-"
  const productNumber = productCodeRaw.trim().split('-')[0];

  // Find MOID line robustly (prefer the line starting with "MOID")
  const moidLine = lines.find((l) => /^MOID\b/i.test(l)) || lines[4] || '';

  // Extract MOID digits even if there are extra spaces/tabs
  const moidMatch = moidLine.match(/MOID\s*([0-9]+)/i);
  const moidNumber = moidMatch ? moidMatch[1] : '';

  // If critical parts missing, show error
  if (!moidNumber || !productNumber || !description) {
    document.getElementById('auroraName').innerText = 'Invalid input.';
    document.getElementById('schmName').innerText = '';
    return;
  }

  // Aurora Upload Name
  const auroraFileName = `${moidNumber}_${option}_${description}_${season}_${productNumber}`;
  document.getElementById('auroraName').innerText = auroraFileName;

  // Schm Name
  const schmFileName = `${productNumber}_${description}_schm_${season}_T${option}`;
  document.getElementById('schmName').innerText = schmFileName;
}

function copyToClipboard(elementId) {
  const textToCopy = document.getElementById(elementId).innerText;
  if (!textToCopy) return;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      const button = document.querySelector(
        `[onclick="copyToClipboard('${elementId}')"]`
      );
      if (!button) return;

      const originalText = button.innerText;
      button.innerText = 'Copied!';
      setTimeout(() => {
        button.innerText = originalText || 'Copy';
      }, 2000);
    })
    .catch((err) => {
      console.error('Could not copy text: ', err);
    });
}

