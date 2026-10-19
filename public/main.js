/* codedbyed.com: theme toggle + footer year.
   ~1KB. No dependencies. No analytics, no trackers. */

(function () {
  'use strict';

  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  /* ---------------------------- Theme ---------------------------- */
  function resolve(pref) {
    if (pref === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return pref;
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }

      toggle.setAttribute('aria-label',
        next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });

    toggle.setAttribute('aria-label',
      root.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  // Follow the OS setting only while the user has not made an explicit choice.
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var onChange = function (e) {
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (err) { /* ignore */ }
    if (!saved || saved === 'auto') {
      root.dataset.theme = e.matches ? 'dark' : 'light';
    }
  };
  if (mq.addEventListener) { mq.addEventListener('change', onChange); }
  else if (mq.addListener) { mq.addListener(onChange); } /* older Safari */

  /* ---------------------------- Year ----------------------------- */
  var year = document.getElementById('year');
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();