const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");
const System = require("sf-core/device/system");
const Image = require("sf-core/ui/image");
const Color      = require('sf-core/ui/color');
// Get generated UI code
const Page1Design = require("ui/ui_page1");

const Page1 = extend(Page1Design)(
    // Constructor
    function(_super) {
        // Initalizes super class for this page scope
        _super(this);
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
    const page = this;
    superOnShow();

    if (System.OS === "Android") {
        setTimeout(() => page.btn.enabled = true, 300);
    }
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
    const page = this;
    val = page;
    superOnLoad();

    page.headerBar.leftItemEnabled = false;
    page.flexlayout.children.btn.onPress = btn_onPress.bind(page);
    imageView = page.img;
    var imagev  = Image.createFromFile("images://gun.png");
    imageView.image = imagev.resize(imagev.width*2,imagev.height*2);
    
    buton = page.flexlayout.children.btn;
    buton.text = "Set Game";
}


// Gets/sets press event callback for btn
function btn_onPress() {

    if(alive)
        gameRun();
    else
        setGame();    

}


function randomGenarator(){
  return Math.floor(Math.random()*6+1);
}
var val;
var buton; 
var imageView;
var bullet ;
var triger ;
var alive  =false;
var player = true;

function gameRun(){
  //imageView.image = Image.createFromFile("images://gun.png");
  if(alive){
    
    if(bullet==triger){//Dead
      
      val.layout.backgroundColor = Color.BLACK;
      var imagev = Image.createFromFile("images://dead.png");
      imageView.image = imagev.resize(imagev.width*5,imagev.height*5);
      alive=false;
      
      player ? buton.text = "Player2 Win Set Game" : buton.text = "Player1 Win Set Game"  ;
        
    }else{
        
      var imagev  = Image.createFromFile("images://alive.png");
      imageView.image = imagev.resize(imagev.width*2,imagev.height*2);
      player ?  player=false : player=true ;
      
      player ? buton.text = "Player1 Turn" : buton.text = "Player2 Turn";
      triger++;
      if(triger>6)
        triger=1;
    }
    
  }
}

function setGame(){
   player = true;
   alive = true;
   val.layout.backgroundColor = Color.WHITE;
   buton.text ="Player1 Turn";
   var imagev = Image.createFromFile("images://gun.png");
   imageView.image = imagev.resize(imagev.width*2,imagev.height*2);
   bullet=randomGenarator();  
   triger=randomGenarator();
}

module.exports = Page1;
