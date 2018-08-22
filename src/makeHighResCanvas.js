export default function makeHighResCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  const devicePixelRatio = window.devicePixelRatio || 1;

  const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1;

  const ratio = devicePixelRatio / backingStoreRatio;

  // upscale canvas if the two ratios don't match
  if (devicePixelRatio !== backingStoreRatio) {
    const oldWidth = canvas.width;
    const oldHeight = canvas.height;

    canvas.width = Math.round(oldWidth * ratio);
    canvas.height = Math.round(oldHeight * ratio);
    canvas.style.width = oldWidth + 'px';
    canvas.style.height = oldHeight + 'px';

    ctx.scale(ratio, ratio);
    ctx.translate(-canvas.width / 2 / devicePixelRatio, -canvas.height / 2 / devicePixelRatio);
  }

  return ctx;
}
