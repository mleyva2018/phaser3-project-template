import {
    BaseScene
} from "./baseScene";
import {
    FlatButton
} from "../common/ui/flatButton";
import {
    TextStyles
} from "../common/ui/textStyles";
import {
    ToggleButton
} from "../common/ui/toggleButton";
import {
    Align
} from "../common/util/align";

//
//
//
export class SceneTitle extends BaseScene {
    constructor() {
        super('SceneTitle');
    }
    preload() {
        super.preload();
    }
    create() {
        super.create();
        //
        //
        // uncomment to turn on music
        //this.mm.setBackgroundMusic("backgroundMusic");
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
        this.placeText("Challenge #7",27,"TITLE_TEXT");
        this.placeText("Nage no Kata",38,"TITLE_TEXT");
        //
        //
        //
      //  let buttonStyle = this.textStyles.getStyle(TextStyles.BUTTON_STYLE);
        let btnNext = new FlatButton({
            scene: this,
            textStyle: 'BUTTON_STYLE',
            key: "button",
            text: "START",
            callback: this.startGame.bind(this)
        });
        this.aGrid.placeAtIndex(104, btnNext);
        //
        //
        this.placeImage('FRJ_logo_2020', 71, .4);
        //
        //

        //
        //
        this.makeUi();

    }
    makeUi() {
        super.makeSoundPanel();
        super.makeGear();
    }
    startGame() {
        this.scene.start("SceneMain");
    }
    update() {}
}
