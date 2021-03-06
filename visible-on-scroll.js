/** 
 Free to use
 visible on scroll by @kushalcodes
 **/

// Visible On Scroll (VOS)
function _VOS(element, options) {
  this.el = element;
  this.options = typeof options === 'object' ? options : {};
  __VOS.execute(this);
};

function _VOS_SCRLL_EL(element) {
  this.el = element;
  this.top = element.scrollTop || element.offsetTop;
  this.left = element.scrollLeft || element.offsetLeft;
  this.height = element.offsetHeight;
}

let __VOS = {
  executeEl: {
    // provided class name or id
    referenceIdOrClass: null,
    toCallFnName: null,
  },
  animationType: 'fade',
  scrollEls: [],
  execute: function (VOSObj) {

    if (!VOSObj.el) {
      console.warn('Please provide valid element class name or id to execute "Visible On Scroll" feature to');
      return;
    }
    if (VOSObj.options.animation) this.animationType = VOSObj.options.animation;

    this.executeEl.referenceIdOrClass = VOSObj.el;
    if (this.isClass(VOSObj.el)) this.executeEl.toCallFnName = this.executeForClass();
    if (this.isId(VOSObj.el)) this.executeEl.toCallFnName = this.executeForId();

    this.addEvent(window, "load", function () {
      __VOS.visiblilityController();
    });
    this.visiblilityController();

  },

  visiblilityController: function () {
    this.addEvent(window, "scroll", function () {
      const scrollPosY = window.pageYOffset || window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
      const element = __VOS.scrollEls.filter(scrollElObj => scrollElObj.top > scrollPosY);
      if (element[0]) {
        __VOS.showEl(element[0].el);
        element[0].el.setAttribute('__vos_seen', 'shown');
      }
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        for (let i = 0; i < __VOS.scrollEls.length; i++) {
          const element = __VOS.scrollEls[i].el;
          if (element.getAttribute('__vos_seen') !== 'shown') __VOS.showEl(element);
        }
      }
    });
  },

  addEvent: function (obj, type, fn) {
    if (obj.attachEvent) { //ie
      obj.attachEvent('on' + type, function () {
        fn.call(obj);
      })
    } else {
      obj.addEventListener(type, fn, false);
    }
  },

  executeForClass: function () {
    this.executeEl.referenceIdOrClass = this.executeEl.referenceIdOrClass.replace(".", "");
    const allElements = document.getElementsByClassName(this.executeEl.referenceIdOrClass);
    for (let i = 0; i < allElements.length; i++) {
      this.scrollEls.push(new _VOS_SCRLL_EL(allElements[i]));
      this.hideEl(allElements[i]);
    }
  },
  executeForId: function () {
    this.executeEl.referenceIdOrClass = this.executeEl.referenceIdOrClass.replace(".", "#");
    console.log(this.executeEl.referenceIdOrClass);
    const element = document.getElementById(this.executeEl.referenceIdOrClass);
    this.scrollEls.push(new _VOS_SCRLL_EL(element));
    this.hideEl(element);
  },
  hideEl: function (el) {
    this.animation.hide(el);
  },
  showEl: function (el) {
    el.style.transition = "all 0.6s ease";
    el.style.webkitTransition = "all 0.6s ease";
    el.style.MozTransition = "all 0.6s ease";
    el.style.OTransition = "all 0.6s ease";
    this.animation.show(el);
  },
  isClass: function (string) {
    return string.substring(0, 1) === '.';
  },
  isId: function (string) {
    return string.substring(0, 1) === '#';
  },

  animation: {
    show: function (el) {
      switch (__VOS.animationType) {
        // fade show
        case 'fade':
          el.style.visibility = "visible";
          el.style.opacity = 1;
          break;

        case 'slide-down':
          el.style.visibility = "visible";
          el.style.opacity = 1;
          el.style.position = 'relative';
          el.style.top = 0;
          break;

        default:
          break;
      }
    },
    hide: function (el) {
      switch (__VOS.animationType) {
        // fade hide
        case 'fade':
          el.style.visibility = "hidden";
          el.style.opacity = 0;
          break;

        case 'slide-down':
          el.style.visibility = "hidden";
          el.style.opacity = 0;
          el.style.position = 'relative';
          el.style.top = '-10px';
          break;

        default:
          break;
      }
    }
  }
};
