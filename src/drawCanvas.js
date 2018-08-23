export default function drawCanvas(percentage, self) {
  const { radius, barWidth, showPercentage } = self.options;
  const circleStart = 1.5 * Math.PI;
  const circleEnd = circleStart + percentage / 50 * Math.PI;
  const centerX = self._canvas.width / 2;
  const centerY = self._canvas.height / 2;

  // ensure that radius is not negative value
  let circleRadius = radius < 0 ? 0 : radius;
  let barRadius = radius - self.options.barOffset - self.options.barWidth / 2;
  barRadius = barRadius < 0 ? 0 : barRadius;

  self._ctx.clearRect(0, 0, self._canvas.width, self._canvas.height);

  // draw inner circle
  self._ctx.beginPath();
  self._ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI, false);
  self._ctx.fillStyle = self.options.bgColor;
  self._ctx.fill();

  // draw empty bar
  self._ctx.beginPath();
  self._ctx.arc(centerX, centerY, barRadius, circleStart, 4 * Math.PI, false);
  self._ctx.lineWidth = barWidth;
  self._ctx.strokeStyle = self.options.emptyBarBgColor;
  self._ctx.stroke();

  // draw filled bar
  self._ctx.beginPath();
  self._ctx.arc(centerX, centerY, barRadius, circleStart, circleEnd, false);
  self._ctx.lineWidth = barWidth;
  self._ctx.strokeStyle = self.options.filledBarBgColor;
  self._ctx.stroke();

  // draw percentage
  if (showPercentage) {
    self._ctx.fillStyle = self.options.percentageFgColor;
    self._ctx.font = `${self.options.percentageFontSize} ${self.options.percentageFontFamily}`;
    self._ctx.textBaseline = 'middle';
    self._ctx.textAlign = 'center';
    self._ctx.fillText(`${Math.ceil(percentage)}%`, self._canvas.width / 2, self._canvas.height / 2);
  }
}
