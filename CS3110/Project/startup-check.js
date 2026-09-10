// Startup guard + texture diagnostics.
//
// Two things silently break this scene, and neither one reports an error:
//
//   1. Opening Project.html directly (file://). Chrome treats every local file
//      as its own origin, so each texture request is cross-origin and is
//      blocked. The geometry still draws, so the scene looks "half broken"
//      rather than failing outright.
//   2. A texture file that is missing or renamed.
//
// This file makes both loud instead of silent. It changes no rendering code.

(function () {
  'use strict';

  function showBanner(title, lines, background) {
    var box = document.createElement('div');
    box.style.cssText = [
      'position:fixed', 'top:0', 'left:0', 'right:0', 'z-index:9999',
      'padding:14px 18px', 'background:' + background, 'color:#fff',
      'font:14px/1.5 -apple-system,Segoe UI,Helvetica,Arial,sans-serif',
      'box-shadow:0 2px 10px rgba(0,0,0,.4)'
    ].join(';');

    var heading = document.createElement('strong');
    heading.style.cssText = 'display:block;font-size:15px;margin-bottom:4px';
    heading.textContent = title;
    box.appendChild(heading);

    lines.forEach(function (line) {
      var p = document.createElement('div');
      p.textContent = line;
      box.appendChild(p);
    });

    var close = document.createElement('button');
    close.textContent = 'Dismiss';
    close.style.cssText =
      'position:absolute;top:12px;right:14px;padding:4px 10px;cursor:pointer';
    close.onclick = function () { box.remove(); };
    box.appendChild(close);

    document.body.appendChild(box);
  }

  // --- 1. Wrong protocol -------------------------------------------------
  if (location.protocol === 'file:') {
    showBanner(
      'Textures cannot load - this page was opened as a file.',
      [
        'Chrome blocks local texture files when the page is opened directly, so the',
        'scene draws without its textures. The project is not broken.',
        'Fix: close this tab and double-click "Run Project.command" in the Project folder.'
      ],
      '#a8071a'
    );
  }

  // --- 2. Textures that fail to load -------------------------------------
  // Wraps loadTexture (defined in create.js) to watch each URL. The extra
  // Image() is served from the browser cache, so it costs no real traffic.
  if (typeof window.loadTexture === 'function') {
    var originalLoadTexture = window.loadTexture;
    var failed = [];
    var reported = false;

    window.loadTexture = function (gl, url) {
      var probe = new Image();
      probe.onerror = function () {
        failed.push(url);
        if (reported) return;
        reported = true;
        // Let the rest of the failures arrive before reporting.
        setTimeout(function () {
          showBanner(
            failed.length + ' texture(s) failed to load:',
            failed.slice(0, 10),
            '#ad4e00'
          );
          console.error('Textures that failed to load:', failed);
        }, 1500);
      };
      probe.src = url;
      return originalLoadTexture(gl, url);
    };
  }
})();
