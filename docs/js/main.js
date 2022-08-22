(async () => {
  const isLocalhost = window.location.href.includes('127.0.0.1') || window.location.href.includes('localhost');
  const url = isLocalhost ? '../../dist/CanvasCircularCountdown.esm.js' : 'https://unpkg.com/canvas-circular-countdown/dist/CanvasCircularCountdown.esm.min.js';
  const { default: CanvasCircularCountdown } = await import(url);
  const countdownCanvas = document.getElementById('countdown-canvas');
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const resetBtn = document.getElementById('reset-btn');
  const newInstanceButton = document.getElementById('new-instance-btn');
  const newInstanceSuccess = document.getElementById('new-instance-success');
  const remainingPercentage = document.getElementById('remaining-percentage');
  const remainingTime = document.getElementById('remaining-time');
  const elapsedTime = document.getElementById('elapsed-time');
  const form = document.getElementById('options-form');
  const codeEl = document.getElementById('code');
  let countdown;

  function normalise(value, min, max) {
    return (value - min) / (max - min);
  }

  function updateOnTimer(percentage, time) {
    remainingPercentage.textContent = Math.ceil(percentage);
    remainingTime.textContent = Math.ceil(time.remaining);
    elapsedTime.textContent = Math.ceil(time.elapsed);
  }

  function setFormDefaults(options) {
    Object.keys(options).forEach(function (key) {
      if (form[key]) {
        if (form[key].type === 'checkbox') {
          form[key].checked = options[key];
        } else {
          form[key].value = options[key] != null ? options[key] : '';
        }
      }
    });
  }

  function makeCode(options) {
    const optionsStr = JSON.stringify(options, null, 2);
    codeEl.textContent = 'new CanvasCircularCountdown(document.getElementById(\'countdown-canvas\'), ' + optionsStr + ', function onTimerRunning(percentage, time, instance) {\n  // Do your stuff here while timer is running...\n});';
    window.hljs.highlightBlock(codeEl);
  }

  countdown = new CanvasCircularCountdown(countdownCanvas, updateOnTimer);

  setFormDefaults(countdown.options);

  const duration = Number(form.duration.value);
  const elapsed = Number(form.elapsedTime.value);
  const percentage = normalise(duration - elapsed, 0, duration) * 100 || 0;

  updateOnTimer(percentage, {
    remaining: duration - elapsed,
    elapsed
  });

  startBtn.addEventListener('click', function onStartClicked() {
    countdown.start();
  });

  stopBtn.addEventListener('click', function onStopClicked() {
    countdown.stop();
  });

  resetBtn.addEventListener('click', function onResetClicked() {
    countdown.reset();

    const duration = Number(form.duration.value);
    const elapsed = Number(form.elapsedTime.value);
    const percentage = normalise(duration - elapsed, 0, duration) * 100 || 0;

    updateOnTimer(percentage, {
      remaining: duration - elapsed,
      elapsed
    });
  });

  form.addEventListener('input', function onFormChanged(event) {
    const options = {};

    switch (event.target.type) {
      case 'color':
        options[event.target.name] = event.target.value;
        break;
      case 'number':
        options[event.target.name] = Number(event.target.value);
        break;
      case 'checkbox':
        options[event.target.name] = event.target.checked;
        break;
      default:
        options[event.target.name] = event.target.value || void 0;
    }

    countdown.style(options);

    makeCode(countdown.options);
  });

  newInstanceButton.addEventListener('click', function onNewInstanceCreated() {
    countdown.reset();

    countdown = new CanvasCircularCountdown(countdownCanvas, {
      duration: Number(form.duration.value) || 0,
      elapsedTime: Number(form.elapsedTime.value) || 0,
      throttle: form.throttle.value ? Number(form.throttle.value) : void 0,
      captionText: void 0
    }, updateOnTimer);

    setFormDefaults(countdown.options);

    const duration = Number(form.duration.value);
    const elapsed = Number(form.elapsedTime.value);
    const percentage = normalise(duration - elapsed, 0, duration) * 100 || 0;

    updateOnTimer(percentage, {
      remaining: duration - elapsed,
      elapsed
    });

    makeCode(countdown.options);

    newInstanceSuccess.classList.add('visible');
    newInstanceButton.disabled = true;

    setTimeout(function () {
      newInstanceSuccess.classList.remove('visible');
      newInstanceButton.disabled = false;
    }, 1000);
  });

  document.addEventListener('DOMContentLoaded', function () {
    makeCode(countdown.options);
  });
})();
