import { useEffect } from "react";

export default function MeetRick() {
  let stage: createjs.Stage;
  let w = 0;
  let h = 0;
  let loader: createjs.LoadQueue;
  const pat = {};
  const pointer = {};
  let clickCount = 0;
  let ellapsedDeltas = 0;
  const MAX_DELTA = 600;
  let complete = false;

  function _handleComplete() {

  }

  useEffect(() => {
    stage = new createjs.Stage("gameDisplay");

    // grab canvas width and height for later calculations:
    w = stage.canvas.width;
    h = stage.canvas.height;

    var manifest = [
      {src: "TurnSpriteSheet.png", id: "Pat"},
      {src: "Pointer.png", id: "pointer"},
      {src: "Background.png", id: "background"},
      {src: "Heart.png", id: "heart"}
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", _handleComplete);
    loader.loadManifest(manifest, true, "/assets/Art/");
  });

  return (
    <div className="level1">
      <h1>Happy Angie-versary!!</h1>
      <h2>Level 1: Meet Rick</h2>
      <canvas id="gameDisplay" width="500" height="300"></canvas>
      <button className="btn">Reload Game</button>
    </div>
  );
}