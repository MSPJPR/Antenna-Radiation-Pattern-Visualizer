const canvas = document.getElementById('radiationPattern');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;
ctx.translate(canvas.width / 2, canvas.height / 2);

const overlayMode = document.getElementById('overlay');

document.getElementById('generate').addEventListener('click', () => {
  const antennaType = document.getElementById('antennaType').value;
  const frequency = parseFloat(document.getElementById('frequency').value);
  const gain = parseFloat(document.getElementById('gain').value);
  const scaling = parseFloat(document.getElementById('scaling').value);
  const color = document.getElementById('colorPicker').value;

  if (!overlayMode.checked) {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    drawAxes();
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  let radius = gain * 10;

  switch (antennaType) {
    case 'dipole':
      drawPattern(radius, scaling, 'Dipole');
      break;
    case 'patch':
      drawPattern(radius * 0.8, scaling, 'Patch');
      break;
    case 'yagi':
      drawPattern(radius * 1.2, scaling * 0.8, 'Yagi-Uda');
      break;
    case 'helical':
      drawPattern(radius * 1.5, scaling * 1.2, 'Helical');
      break;
    case 'parabolic':
      drawPattern(radius * 1.8, scaling * 1.5, 'Parabolic Reflector');
      break;
    case 'horn':
      drawPattern(radius * 1.3, scaling * 1.1, 'Horn Antenna');
      break;
    default:
      alert('Invalid Antenna Type');
  }
});

document.getElementById('clear').addEventListener('click', () => {
  ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
  drawAxes();
});

document.getElementById('export').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'radiation_pattern.png';
  link.href = canvas.toDataURL();
  link.click();
});

function drawPattern(radius, scalingFactor, label) {
  ctx.beginPath();
  for (let angle = 0; angle <= 2 * Math.PI; angle += 0.01) {
    const r = radius * (1 + scalingFactor * Math.cos(2 * angle));
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();

  // Add Label
  ctx.fillStyle = '#000';
  ctx.font = '14px Arial';
  ctx.fillText(label, -radius, -radius - 20);
}

function drawAxes() {
  ctx.strokeStyle = '#aaa';
  ctx.lineWidth = 1;

  // Draw X-axis
  ctx.beginPath();
  ctx.moveTo(-250, 0);
  ctx.lineTo(250, 0);
  ctx.stroke();

  // Draw Y-axis
  ctx.beginPath();
  ctx.moveTo(0, -250);
  ctx.lineTo(0, 250);
  ctx.stroke();
}

// Initial Axes
drawAxes();
