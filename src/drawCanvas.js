export default function drawCanvas(percentage, instance) {
  const { options: opts } = instance;
  const circleStart = 1.5 * Math.PI;
  const circleEnd = circleStart + (opts.clockwise ? -1 : 1) * (percentage / 50 * Math.PI);
  const ceiledPercentage = Math.ceil(percentage);

  // ensure that radius is not negative value
  let circleRadius = opts.radius < 0 ? 0 : opts.radius;
  let barRadius = opts.radius - opts.progressBarOffset - opts.progressBarWidth / 2;
  barRadius = barRadius < 0 ? 0 : barRadius;

  const centerX = circleRadius;
  const centerY = circleRadius;

  instance._ctx.save();

  instance._ctx.clearRect(0, 0, instance._canvas.width, instance._canvas.height);

  // draw inner circle
  instance._ctx.beginPath();
  instance._ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI, false);
  instance._ctx.fillStyle = opts.circleBackgroundColor;
  instance._ctx.fill();

  // draw empty bar
  if (opts.progressBarWidth) {
    instance._ctx.beginPath();
    instance._ctx.arc(centerX, centerY, barRadius, circleStart, 4 * Math.PI, false);
    instance._ctx.lineWidth = opts.progressBarWidth;
    instance._ctx.strokeStyle = opts.emptyProgressBarBackgroundColor;
    instance._ctx.stroke();
  }

  // draw filled bar
  if (opts.progressBarWidth) {
    instance._ctx.beginPath();
    instance._ctx.arc(centerX, centerY, barRadius, circleStart, circleEnd, !!opts.clockwise);
    instance._ctx.lineWidth = opts.progressBarWidth;

    instance._ctx.strokeStyle = typeof opts.filledProgressBarBackgroundColor === 'function'
      ? opts.filledProgressBarBackgroundColor(ceiledPercentage, instance._timer.time())
      : opts.filledProgressBarBackgroundColor;

    instance._ctx.stroke();
  }

  let shouldShowCaption = typeof opts.showCaption === 'function'
    ? opts.showCaption(ceiledPercentage, instance._timer.time())
    : !!opts.showCaption;

  if (shouldShowCaption) {
    instance._ctx.fillStyle = typeof opts.captionColor === 'function'
      ? opts.captionColor(ceiledPercentage, instance._timer.time())
      : opts.captionColor;

    instance._ctx.font = typeof opts.captionFont === 'function'
      ? opts.captionFont(ceiledPercentage, instance._timer.time())
      : opts.captionFont;

    instance._ctx.textBaseline = 'middle';
    instance._ctx.textAlign = 'center';

    let captionStr = `${ceiledPercentage}%`;

    if (typeof opts.captionText === 'string') {
      captionStr = opts.captionText;
    } else if (typeof opts.captionText === 'function') {
      captionStr = opts.captionText(ceiledPercentage, instance._timer.time());
    }

    instance._ctx.fillText(captionStr, centerX, centerY);
    instance._ctx.restore();

    if (typeof opts.draw === 'function') {
      const size = opts.radius * 2;

      instance._ctx.beginPath();

      opts.draw(instance._ctx, {
        percentage: ceiledPercentage,
        time: instance._timer.time(),
        width: size,
        height: size
      });
    }
  }
}
