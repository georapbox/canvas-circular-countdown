/* eslint-disable no-var, strict */

(function (CanvasCircularCountdown) {
  'use strict';

  var countdownCanvas = document.getElementById('countdown-canvas');
  var startBtn = document.getElementById('start-btn');
  var stopBtn = document.getElementById('stop-btn');
  var resetBtn = document.getElementById('reset-btn');
  var newInstanceButton = document.getElementById('new-instance-btn');
  var newInstanceSuccess = document.getElementById('new-instance-success');
  var remainingPercentage = document.getElementById('remaining-percentage');
  var remainingTime = document.getElementById('remaining-time');
  var elapsedTime = document.getElementById('elapsed-time');
  var form = document.getElementById('options-form');
  var countdown;

  function updateOnTimer(percentage, time) {
    remainingPercentage.textContent = percentage;
    remainingTime.textContent = Math.ceil(time.remaining);
    elapsedTime.textContent = Math.ceil(time.elapsed);
  }

  function setFormDefaults(options) {
    Object.keys(options).forEach(function (key) {
      if (form[key].type === 'checkbox') {
        form[key].checked = options[key];
      } else {
        form[key].value = options[key] != null ? options[key] : '';
      }
    });
  }

  countdown = new CanvasCircularCountdown(countdownCanvas, updateOnTimer);

  setFormDefaults(countdown.options);

  updateOnTimer(100, {
    remaining: Number(form.duration.value),
    elapsed: 0
  });

  startBtn.addEventListener('click', function onStartClicked() {
    countdown.start();
  }, false);

  stopBtn.addEventListener('click', function onStopClicked() {
    countdown.stop();
  }, false);

  resetBtn.addEventListener('click', function onResetClicked() {
    countdown.reset();

    updateOnTimer(100, {
      remaining: Number(form.duration.value),
      elapsed: 0
    });
  }, false);

  form.addEventListener('input', function onFormChanged(event) {
    var options = {};

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
  }, false);

  newInstanceButton.addEventListener('click', function onNewInstanceCreated() {
    countdown.reset();

    countdown = new window.CanvasCircularCountdown(countdownCanvas, {
      duration: Number(form.duration.value) || 0,
      captionText: void 0
    }, updateOnTimer);

    setFormDefaults(countdown.options);

    updateOnTimer(100, {
      remaining: Number(form.duration.value),
      elapsed: 0
    });

    newInstanceSuccess.classList.add('visible');
    newInstanceButton.disabled = true;

    setTimeout(function () {
      newInstanceSuccess.classList.remove('visible');
      newInstanceButton.disabled = false;
    }, 1000);
  }, false);
}(window.CanvasCircularCountdown));
