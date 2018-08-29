export default function drawCanvas(percentage, self) {
  const { radius, progressBarWidth, showPercentage } = self.options;
  const circleStart = 1.5 * Math.PI;
  const circleEnd = circleStart + percentage / 50 * Math.PI;
  const centerX = self._canvas.width / 2;
  const centerY = self._canvas.height / 2;

  // ensure that radius is not negative value
  let circleRadius = radius < 0 ? 0 : radius;
  let barRadius = radius - self.options.progressBarOffset - self.options.progressBarWidth / 2;
  barRadius = barRadius < 0 ? 0 : barRadius;

  self._ctx.clearRect(0, 0, self._canvas.width, self._canvas.height);

  // draw inner circle
  self._ctx.beginPath();
  self._ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI, false);
  self._ctx.fillStyle = self.options.circleBackgroundColor;
  self._ctx.fill();

  // draw empty bar
  self._ctx.beginPath();
  self._ctx.arc(centerX, centerY, barRadius, circleStart, 4 * Math.PI, false);
  self._ctx.lineWidth = progressBarWidth;
  self._ctx.strokeStyle = self.options.emptyProgressBarBackgroundColor;
  self._ctx.stroke();

  // draw filled bar
  self._ctx.beginPath();
  self._ctx.arc(centerX, centerY, barRadius, circleStart, circleEnd, false);
  self._ctx.lineWidth = progressBarWidth;

  self._ctx.strokeStyle = typeof self.options.filledProgressBarBackgroundColor === 'function'
    ? self.options.filledProgressBarBackgroundColor(percentage, self._timer.time())
    : self.options.filledProgressBarBackgroundColor;

  self._ctx.stroke();

  // draw percentage
  if (showPercentage) {
    self._ctx.fillStyle = self.options.percentageColor;

    self._ctx.fillStyle = typeof self.options.percentageColor === 'function'
      ? self.options.percentageColor(percentage, self._timer.time())
      : self.options.percentageColor;

    self._ctx.font = `${self.options.percentageFontSize} ${self.options.percentageFontFamily}`;
    self._ctx.textBaseline = 'middle';
    self._ctx.textAlign = 'center';
    self._ctx.fillText(`${Math.ceil(percentage)}%`, self._canvas.width / 2, self._canvas.height / 2);
  }
}
