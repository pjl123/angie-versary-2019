import Controller from '@ember/controller';

export default Controller.extend({
  stage: {},
  w: 0,
  h: 0,
  loader: {},
  pat: {},
  pointer: {},
  clickCount: 0,
  ellapsedDeltas: 0,
  MAX_DELTA: 600,
  complete: false,

  init: function () {
    this._super();
    Ember.run.schedule("afterRender",this,function() {
      this.setup();
    });
  },

  setup() {
    var stage = new createjs.Stage("gameDisplay");
    this.set('stage', stage);

    // grab canvas width and height for later calculations:
    var w = stage.canvas.width;
    this.set('w', w);
    var h = stage.canvas.height;
    this.set('h', h);

    var manifest = [
      {src: "TurnSpriteSheet.png", id: "Pat"},
      {src: "Pointer.png", id: "pointer"},
      {src: "Background.png", id: "background"},
      {src: "Heart.png", id: "heart"}
    ];

    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", this.handleComplete.bind(this));
    loader.loadManifest(manifest, true, "../../Art/");
    this.set('loader', loader);
  },

  handleComplete() {
    var loader = this.get('loader');
    var background = loader.getResult("background");
    var back = new createjs.Shape();
    back.graphics.beginBitmapFill(background).drawRect(0, 0, background.width, background.height);
    back.tileW = background.width;
    back.y = this.get('h') - background.height;
    
    var pointer = new createjs.Bitmap(loader.getResult("pointer"));
    pointer.setTransform(100, 100, 1, 1);
    this.set('pointer', pointer);
    
    var spriteSheet = new createjs.SpriteSheet({
      framerate: 10,
      "images": [loader.getResult("Pat")],
      "frames": {"regX": 128, "height": 256, "count": 11, "regY": 128, "width": 256},
      // define two animations, run (loops, 1.5x speed) and jump (returns to run):
      "animations": {
        "turn1": [0, 1, "turn1"],
                "turn2": [1, 2, "turn2"],
                "turn3": [2, 3, "turn3"],
                "turn4": [3, 4, "turn4"],
                "turn5": [4, 5, "turn5"],
                "turn6": [5, 6, "turn6"],
                "turn7": [6, 7, "turn7"],
                "turn8": [7, 8, "turn8"],
                "turn9": [8, 9, "turn9"],
                "turn10": [9, 10, "turn10"],
                "turn11": [10, 11, "turn11"]
      }
    });
    var pat = new createjs.Sprite(spriteSheet);
    pat.x = this.get('w') / 2;
    pat.y = this.get('h') - 128;
    this.set('pat', pat);
    
    var winText = new createjs.Text("WINNER! YOU'VE WON MY HEART!", "20px Lucida Console", "#009933");
    winText.x = 50;
    winText.y = 100;
    winText.visible = false;
    this.set('winText', winText);
    
    var heart = new createjs.Bitmap(loader.getResult("heart"));
    heart.setTransform(this.get('w') / 2 - heart.image.width / 2 + 10, 150, .5, .5);
    heart.visible = false;
    heart.addEventListener("click", this.heartClick.bind(this));
    this.set('heart', heart);

    var stage = this.get('stage');
    stage.addChild(back, pat, winText, heart, pointer);
    stage.addEventListener("stagemousedown", this.handleTurnClick.bind(this));
    stage.cursor = 'none';
    stage.enableMouseOver();

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", this.tick.bind(this));
  },

  handleTurnClick() {
    var clickCount = this.get('clickCount');
    if (clickCount < 11)
        clickCount++;
    this.set('clickCount', clickCount);

    this.updatePatSprite();
  },
            
  updatePatSprite(){
    this.get('pat').gotoAndStop("turn" + this.get('clickCount'));
  },

  tick(event) {
    var heart = this.get('heart');
    var winText = this.get('winText');
    var ellapsedDeltas = this.get('ellapsedDeltas');
    var MAX_DELTA = this.get('MAX_DELTA');
    var clickCount = this.get('clickCount');
    var stage = this.get('stage');
    var pointer = this.get('pointer');
    var complete = this.get('complete');

    if (complete){
        heart.visible = true;
        winText.visible = true;
    }
    else{
        ellapsedDeltas += event.delta;
        if (ellapsedDeltas >= MAX_DELTA && clickCount > 0){
            complete = clickCount == 11
            
            clickCount--;
            if (!complete)
                this.updatePatSprite();
                        
            ellapsedDeltas = 0;
        }    
    }
        
    pointer.x = stage.mouseX;
    pointer.y = stage.mouseY;

    this.set('clickCount', clickCount);
    this.set('ellapsedDeltas', ellapsedDeltas);
    this.set('complete', complete);
    this.set('pointer', pointer);
    
    stage.update(event);
  },
            
  heartClick(){
    this.transitionToRoute('2016.quiz');
  }
});
