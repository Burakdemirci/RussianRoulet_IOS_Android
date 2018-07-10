/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const Page0Design = require('ui/ui_page0');
const Image = require("sf-core/ui/image");
const Router = require("sf-core/ui/router");


const Page0 = extend(Page0Design)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

  });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
  superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  const page = this;
  superOnLoad();
  page.headerBar.leftItemEnabled = false;
  var imagev  = Image.createFromFile("images://intro.png");
  page.img.image = imagev.resize(imagev.width*4,imagev.height*4);
  page.img.onTouch = gameStart.bind(page);
}

function gameStart(){
  Router.go("page1");
}


module && (module.exports = Page0);