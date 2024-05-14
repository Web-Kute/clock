const canvas = document.getElementById('canvas');
const faceColor = document.getElementById('face-color').value;
const borderColor = document.getElementById('border-color').value;
const lineColor = document.getElementById('line-color').value;
const largeHandColor = document.getElementById('large-hand-color').value;
const minuteHandColor = document.getElementById('minute-hand-color').value;
const secondHandColor = document.getElementById('second-hand-color').value;
const bullColor = document.getElementById('bull-color').value;
const input = document.querySelectorAll('input[type="color"]');
const saveBtn = document.getElementById('save-btn');
const saveColors = document.getElementById('save-colors');
const defaultColor = document.getElementById('default-color');

window.addEventListener('load', () => {
  function clock() {
    const now = new Date();
    const ctx = canvas.getContext('2d');

    // Setup canvas
    ctx.save(); // save the default state
    ctx.clearRect(0, 0, 500, 500);
    ctx.translate(250, 250); // Put 0,0 in the middle
    ctx.rotate(-Math.PI / 2); // Rotate clock -90deg

    // Set default styles
    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#f4f4f4';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

    // Draw clock face/border
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = colors !== null ? colors.borderColor : borderColor;
    ctx.fillStyle = colors !== null ? colors.faceColor : faceColor;
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    ctx.restore();

    // Draw hour lines
    ctx.save();
    ctx.strokeStyle = colors !== null ? colors.lineColor : lineColor;
    for (let i = 0; i < 12; i += 1) {
      ctx.beginPath();
      ctx.rotate(Math.PI / 6);
      ctx.moveTo(100, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.restore();

    // Draw minute lines
    ctx.save();
    ctx.strokeStyle = colors !== null ? colors.lineColor : lineColor;
    ctx.lineWidth = 4;
    for (let i = 0; i < 60; i += 1) {
      if (i % 5 !== 0) {
        ctx.beginPath();
        ctx.moveTo(117, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
      }
      ctx.rotate(Math.PI / 30);
    }
    ctx.restore();

    // Get current time
    const hr = now.getHours() % 12;
    const min = now.getMinutes();
    const sec = now.getSeconds();

    // Draw hour hand
    ctx.save();
    ctx.rotate(
      (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec,
    );
    ctx.strokeStyle = colors !== null ? colors.largeHandColor : largeHandColor;
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.restore();

    // Draw min hand
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.strokeStyle =
      colors !== null ? colors.minuteHandColor : minuteHandColor;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-28, 0);
    ctx.lineTo(112, 0);
    ctx.stroke();
    ctx.restore();

    // Draw sec hand
    ctx.save();
    ctx.rotate((sec * Math.PI) / 30);
    ctx.strokeStyle =
      colors !== null ? colors.secondHandColor : secondHandColor;
    ctx.fillStyle = colors !== null ? colors.secondHandColor : secondHandColor;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(100, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
    ctx.fillStyle = colors !== null ? colors.bullColor : bullColor;
    ctx.fill();
    ctx.restore();

    ctx.restore(); // restore default state

    requestAnimationFrame(clock);
  }

  requestAnimationFrame(clock);

  function printImageClock() {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'clock.png';
    link.href = dataURL;
    link.click();
  }

  saveBtn.addEventListener('click', printImageClock);

  colors = localStorage.getItem('colors')
    ? JSON.parse(localStorage.getItem('colors'))
    : colors;
  input.forEach((input) => {
    input.addEventListener('input', () => {
      colors[input.dataset.color] = input.value;
      localStorage.setItem('colors', JSON.stringify(colors));
    });
  });
});

function setColors(color) {
  const select = colors !== null ? colors[color] : color;
}

let colors = {
  faceColor,
  borderColor,
  lineColor,
  largeHandColor,
  minuteHandColor,
  secondHandColor,
  bullColor,
};

saveColors.addEventListener('click', () => {
  if (colors !== null) {
    colors = localStorage.getItem('colors');
  }
});

defaultColor.addEventListener('click', () => {
  localStorage.removeItem('colors');
});
