export default function drawArc(self, percentage) {
  const { radius, arcWidth, showPercentage } = self.options;
  const circleStart = 1.5 * Math.PI;
  const circleEnd = circleStart + percentage / 50 * Math.PI;
  const centerX = self._canvas.width / 2;
  const centerY = self._canvas.height / 2;

  self._ctx.clearRect(0, 0, self._canvas.width, self._canvas.height);
  self._ctx.beginPath();
  self._ctx.arc(centerX, centerY, radius, circleStart, 4 * Math.PI, false);
  self._ctx.lineWidth = arcWidth;
  self._ctx.strokeStyle = self.options.emptyArcBgColor;
  self._ctx.stroke();
  self._ctx.beginPath();
  self._ctx.arc(centerX, centerY, radius, circleStart, circleEnd, false);
  self._ctx.lineWidth = arcWidth;
  self._ctx.strokeStyle = self.options.filledArcBgColor;
  self._ctx.stroke();

  if (showPercentage) {
    // draw percentage
    self._ctx.fillStyle = self.options.percentageFgColor;
    self._ctx.font = `${self.options.percentageFontSize} ${self.options.percentageFontFamily}`;
    self._ctx.textBaseline = 'middle';
    self._ctx.textAlign = 'center';
    self._ctx.fillText(`${Math.ceil(percentage)}%`, self._canvas.width / 2, self._canvas.height / 2);
  }
}
