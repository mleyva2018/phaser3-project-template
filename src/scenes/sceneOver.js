import {
    BaseScene
} from "./baseScene";
import {
  FlatButton
} from "../common/ui/flatButton";
export class SceneOver extends BaseScene {
    constructor() {
        super('SceneOver');
    }
    preload() {}
    create() {
        super.create();
        //
        //
        // uncomment to turn on music
        // this.mm.setBackgroundMusic("backgroundMusic");
        //
        this.setBackground('background');
        //
        //
        this.makeAlignGrid(11, 11);
        // this.aGrid.showNumbers();
        //
        //
        //
        //  this.placeImage('title', 27, .8);
        let percentText=this.placeText("0%", 27, "WHITE");



        let percentage=(this.model.score/this.model.numberOfQuestions)*100;
        percentText.setText("You got " + percentage.toFixed(0) + "% correct");
        //
        //
        //
        //  let buttonStyle = this.textStyles.getStyle(TextStyles.BUTTON_STYLE);
        let btnNext = new FlatButton({
            scene: this,
            textStyle: 'BUTTON_STYLE',
            key: "button",
            text: "Play Again",
            callback: this.playAgain.bind(this)
        });
        this.aGrid.placeAtIndex(104, btnNext);
        //
        //
        //
        //
        //
        //
        this.makeUi();
        // this.placeText("Test Me!!",49,"frost");
    }
    makeUi() {
        super.makeSoundPanel();
        super.makeGear();
    }
    playAgain() {
        //this.scene.start("SceneMain");
        location.reload();
    }
    update() {}
}
