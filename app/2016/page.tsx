'use client'

import { useEffect, useState } from "react";

class SetupObjects {
  constructor() {
  }
  stage: createjs.Stage | undefined;
  loader: createjs.LoadQueue | undefined;
}

class ActorCollection {
  constructor() {
  }
  heart: createjs.Bitmap | undefined;
  pat: createjs.Sprite | undefined;
  pointer: createjs.Bitmap | undefined;
  winText: createjs.Text | undefined;
}

export default function MeetRick() {
  const MAX_DELTA = 600;
  const [setupObjects, setSetupObjects] = useState<SetupObjects>(new SetupObjects());
  const [actors, setActors] = useState<ActorCollection>(new ActorCollection());
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [elapsedDeltas, setElapsedDeltas] = useState(0);
  const [complete, setComplete] = useState(false);

  function _handleComplete() {
    if (!setupObjects.loader) {
      console.log('loader not set up');
      return;
    }

    const background = new createjs.Bitmap(setupObjects.loader.getResult("background"));
    const back = new createjs.Shape();
    back.graphics.beginBitmapFill(background).drawRect(0, 0, background.image.width, background.image.height);
    // back.tileW = background.image.width;
    back.y = canvasHeight - background.image.height;
    
    const actors = new ActorCollection();
    const pointer = new createjs.Bitmap(setupObjects.loader.getResult("pointer"));
    pointer.setTransform(100, 100, 1, 1);
    actors.pointer = pointer;
    
    const spriteSheet = new createjs.SpriteSheet({
      framerate: 10,
      "images": [setupObjects.loader.getResult("Pat")],
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
    const pat = new createjs.Sprite(spriteSheet);
    pat.x = canvasWidth / 2;
    pat.y = canvasHeight - 128;
    actors.pat = pat;
    
    const winText = new createjs.Text("WINNER! YOU'VE WON MY HEART!", "20px Lucida Console", "#009933");
    winText.x = 50;
    winText.y = 100;
    winText.visible = false;
    actors.winText = winText;
    
    const heart = new createjs.Bitmap(setupObjects.loader.getResult("heart"));
    heart.setTransform(canvasWidth / 2 - heart.image.width / 2 + 10, 150, .5, .5);
    heart.visible = false;
    heart.addEventListener("click", _heartClick);
    actors.heart = heart;

    setActors(actors);

    if (!setupObjects.stage) {
      alert('Error setting up stage object.');
      return;
    }
    setupObjects.stage.addChild(back, pat, winText, heart, pointer);
  }

  function _handleTurnClick() {
    if (clickCount < 11) {
      setClickCount(clickCount + 1);
    }

    _updatePatSprite();
  }
            
  function _updatePatSprite(){
    actors.pat?.gotoAndStop("turn" + clickCount);
  }

  function _tick(event: Object) {
    if (!actors.heart) {
      console.log('heart not set up');
      return;
    }

    if (!actors.winText) {
      console.log('win text not set up');
      return;
    }

    if (!actors.pointer) {
      console.log('pointer not set up');
      return;
    }

    if (!setupObjects.stage) {
      console.log('stage not set up');
      return;
    }

    let newElapsed = 0;
    let newComp = false;

    if (complete){
      actors.heart.visible = true;
      actors.winText.visible = true;
    }
    else{
      let newElapsed = elapsedDeltas + (event as createjs.TickerEvent).delta;
      if (newElapsed >= MAX_DELTA && clickCount > 0){
        newComp = clickCount === 11;
        
        setClickCount(clickCount - 1);
        if (!newComp) {
          _updatePatSprite();
        }

        newElapsed = 0;
      }    
    }

    actors.pointer.x = setupObjects.stage.mouseX;
    actors.pointer.y = setupObjects.stage.mouseY;

    setElapsedDeltas(newElapsed);
    setComplete(newComp);
    setupObjects.stage.update(event);
  }
            
  function _heartClick(){
    console.log('clicked');
  }

  useEffect(() => {
    const setupObjects = new SetupObjects();
    const stage = new createjs.Stage("gameDisplay");
    setupObjects.stage = stage;

    // grab canvas width and height for later calculations:
    setCanvasWidth((stage.canvas as HTMLCanvasElement).width);
    setCanvasHeight((stage.canvas as HTMLCanvasElement).height);

    const loader = new createjs.LoadQueue(false);
    setupObjects.loader = loader;
    setSetupObjects(setupObjects);
  }, []);

  useEffect(() => {
    if (!setupObjects.loader) {
      console.log('loader not set up');
      return;
    }

    const manifest = [
      {src: "TurnSpriteSheet.png", id: "Pat"},
      {src: "Pointer.png", id: "pointer"},
      {src: "Background.png", id: "background"},
      {src: "Heart.png", id: "heart"}
    ];

    setupObjects.loader.addEventListener("complete", _handleComplete);
    setupObjects.loader.loadManifest(manifest, true, "/assets/Art/");
  }, [setupObjects]);

  useEffect(() => {
    if (!setupObjects.stage) {
      alert('Error setting up stage object.');
      return;
    }
    
    setupObjects.stage.addEventListener("stagemousedown", _handleTurnClick);
    setupObjects.stage.cursor = 'none';
    setupObjects.stage.enableMouseOver();

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", _tick);
  }, [actors]);

  return (
    <div className="level1">
      <h1>Happy Angie-versary!!</h1>
      <h2>Level 1: Meet Rick</h2>
      <canvas id="gameDisplay" width="500" height="300"></canvas>
      <button className="btn">Reload Game</button>
    </div>
  );
}