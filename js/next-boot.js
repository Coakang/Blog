/* global NexT, CONFIG */

NexT.boot = {};

NexT.boot.registerEvents = function () {

  NexT.utils.registerScrollPercent();
  NexT.utils.registerCanIUseTag();

  // Mobile top menu bar.
  document.querySelector('.site-nav-toggle .toggle').addEventListener('click', event => {
    event.currentTarget.classList.toggle('toggle-close');
    const siteNav = document.querySelector('.site-nav');
    if (!siteNav) return;
    siteNav.style.setProperty('--scroll-height', siteNav.scrollHeight + 'px');
    document.body.classList.toggle('site-nav-on');
  });

  document.querySelectorAll('.sidebar-nav li').forEach((element, index) => {
    element.addEventListener('click', () => {
      NexT.utils.activateSidebarPanel(index);
    });
  });

  window.addEventListener('hashchange', () => {
    const tHash = location.hash;
    if (tHash !== '' && !tHash.match(/%\S{2}/)) {
      const target = document.querySelector(`.tabs ul.nav-tabs li a[href="${tHash}"]`);
      target && target.click();
    }
  });

  window.addEventListener('tabs:click', e => {
    NexT.utils.registerCodeblock(e.target);
  });
};

NexT.boot.refresh = function () {

  /**
   * Register JS handlers by condition option.
   * Need to add config option in Front-End at 'scripts/helpers/next-config.js' file.
   */
  CONFIG.prism && window.Prism.highlightAll();
  CONFIG.mediumzoom && window.mediumZoom('.post-body :not(a) > img, .post-body > img', {
    background: 'var(--content-bg-color)'
  });
  CONFIG.lazyload && window.lozad('.post-body img').observe();
  CONFIG.pangu && window.pangu.spacingPage();

  CONFIG.exturl && NexT.utils.registerExtURL();
  NexT.utils.wrapTableWithBox();
  NexT.utils.registerCodeblock();
  NexT.utils.registerTabsTag();
  NexT.utils.registerActiveMenuItem();
  NexT.utils.registerLangSelect();
  NexT.utils.registerSidebarTOC();
  NexT.utils.registerPostReward();
  NexT.utils.registerVideoIframe();
};

NexT.boot.motion = function () {
  // Define Motion Sequence & Bootstrap Motion.
  if (CONFIG.motion.enable) {
    NexT.motion.integrator
      .add(NexT.motion.middleWares.header)
      .add(NexT.motion.middleWares.postList)
      .add(NexT.motion.middleWares.sidebar)
      .add(NexT.motion.middleWares.footer)
      .bootstrap();
  }
  NexT.utils.updateSidebarPosition();
};

document.addEventListener('DOMContentLoaded', () => {
  NexT.boot.registerEvents();
  NexT.boot.refresh();
  NexT.boot.motion();
});

var images = document.getElementsByTagName("img");
var loHref = window.location.href
let baseHref = loHref.substring(0, loHref.lastIndexOf("/") + 1)
for (let i = 0; i < images.length; i++) {
  let executeNum = 0;
  let src = images[i]['src']
  let img = new Image();
  img.src = src
  img.onload = () => {}
  img.onerror = () => {
    executeNum++;
    handAMark(src)
    if (executeNum > 3) {
      return;
    }
    let fileName = src.substring(src.lastIndexOf("/") + 1);
    images[i].src = baseHref + fileName
  }
}


function handAMark(src) {
  var as = document.getElementsByClassName("fancybox");
  for (let i = 0; i < as.length; i++) {
    let executeNum = 0;
    let href = as[i]['href']
    if (href == src) {
      let img = new Image();
      img.src = src

      img.onload = () => {}
      img.onerror = () => {
        executeNum++;
        if (executeNum > 3) {
          return;
        }
        let fileName = src.substring(src.lastIndexOf("/") + 1);
        as[i].href = baseHref + fileName
      }
    }

  }

}
