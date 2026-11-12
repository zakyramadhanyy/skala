/* SITUS — perilaku bersama halaman dalam (prototipe).
   Tautan ke rute produksi yang belum dibuat (href diawali "/") menampilkan pesan, bukan 404. */
(function () {
  'use strict';
  var toast = document.getElementById('toast'), t;
  function say(msg) {
    if (!toast) return;
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(t); t = setTimeout(function () { toast.classList.remove('show'); }, 2600);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="/"]');
    if (!a) return;
    e.preventDefault();
    say('Prototipe: halaman ' + a.getAttribute('href') + ' belum dibuat.');
  });
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  window.SKALA_SAY = say;
})();
