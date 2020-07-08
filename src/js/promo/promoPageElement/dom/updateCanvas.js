export default function updateCanvas(promoPage) {
  const canvas = promoPage.querySelector('canvas');
  const canvasContainer = promoPage.querySelector('[slot=chart]');
  const marginLeft = 60;
  const marginRight = 10;
  const marginTop = 5;
  const marginBottom = 35;
  const width = canvasContainer.clientWidth - marginLeft - marginRight;
  const height = canvasContainer.clientHeight - marginTop - marginBottom;
  canvas.width = canvasContainer.clientWidth;
  canvas.height = canvasContainer.clientHeight;
  const c = canvas.getContext('2d');
  c.beginPath();
  c.moveTo(marginLeft, marginTop + height);
  c.strokeStyle = '#338c99';
  c.lineCap = 'round';
  c.lineWidth = '2';
  for (let i = 0; i < 51; i += 1) {
    const x = marginLeft + (i * 0.1 * width) / 5;
    const y = marginTop + height - (0.01 * height * i ** 2) / 25;
    c.lineTo(x, y);
  }
  c.stroke();
  //Оси
  c.beginPath();
  c.strokeStyle = '#338c99';
  c.moveTo(marginLeft, height + marginTop);
  c.lineTo(width + marginLeft + 5, height + marginTop);
  c.stroke();

  c.beginPath();
  c.moveTo(marginLeft, 5);
  c.lineTo(marginLeft, height + marginTop);
  c.stroke();

  // cтрелки на осях
  c.beginPath();
  c.moveTo(width + marginLeft + 5 - 3, height + marginTop - 3);
  c.lineTo(width + marginLeft + 5, height + marginTop);
  c.lineTo(width + marginLeft + 5 - 3, height + marginTop + 3);
  c.stroke();

  c.beginPath();
  c.moveTo(marginLeft - 3, 5 + 3);
  c.lineTo(marginLeft, 5);
  c.lineTo(marginLeft + 3, 5 + 3);
  c.stroke();

  //Отметки на осях
  c.beginPath();
  c.font = '14px Montserrat';
  c.fillStyle = '#0f2c5c';
  c.textAlign = 'center';
  c.textBaseline = 'top';
  c.fillText('Оценка прогресса', marginLeft + width / 2, marginTop + height + 20);

  c.beginPath();
  c.font = '15px Montserrat';
  c.textAlign = 'center';
  c.textBaseline = 'top';
  for (let i = 1; i <= 5; i += 1) {
    c.fillText(i, marginLeft + (i * width) / 5, marginTop + height + 5);
  }

  c.beginPath();
  c.font = '12px Montserrat';
  c.textAlign = 'end';
  c.textBaseline = 'middle';
  const numberToText = { 1: '20 минут', 2: '1 час', 3: '2 дня', 4: '7 дней', 5: '1 месяц' };
  for (let i = 1; i <= 5; i += 1) {
    c.fillText(numberToText[i], marginLeft - 5, marginTop + height - (height * i ** 2) / 25);
  }

  //Вспомогательные линии
  c.strokeStyle = '#33333360';
  c.lineWidth = '1';
  for (let i = 1; i <= 5; i += 1) {
    const x = marginLeft + (i * width) / 5;
    const y = marginTop + height - height * (i ** 2 / 25);
    c.beginPath();
    c.moveTo(x, marginTop + height);
    c.lineTo(x, y);
    c.lineTo(marginLeft, y);
    c.stroke();
    c.fillText(numberToText[i], marginLeft - 5, marginTop + height - (height * i ** 2) / 25);
  }
}
