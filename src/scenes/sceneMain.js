import {
  BaseScene
} from "./baseScene";
import {
  Align
} from "../common/util/align";
import {
  FormUtil
} from "../common/util/formUtil";
import {
  FlatButton
} from "../common/ui/flatButton";
import {
  ScoreBox
} from "../common/comps/ScoreBox";
import {
  ColorBurst
} from "../common/effects/colorBurst"
//
//
//
export class SceneMain extends BaseScene {
  constructor() {
    super('SceneMain');
  }
  preload() {}
  create() {
    this.index = -1;
    this.buttonArray = [];
    this.clickLock = false;
    //set up the base scene
    super.create();
    //set the grid for the scene
    this.makeAlignGrid(11, 11);
    //show numbers for layout and debugging
    //
    this.aGrid.showNumbers();
    this.setBackground('background');
    //
    this.placeImage('judoguy', 108, .3);
    //
    //
    this.makeUi();

    let sb = new ScoreBox({
      scene: this
    });
    this.placeAtIndex(5, sb);
    this.quizData = this.cache.json.get('quiz').results;
    this.quizData = this.mixUpArray(this.quizData);

    this.model.numberOfQuestions=this.quizData.length;

    //make the quiz text
    this.questText = this.placeText("question", 27, "QUESTION_WHITE");

    //Make buttons
    for (let i = 0; i < 4; i++) {
      let btnAnswer = new FlatButton({
        scene: this,
        textStyle: 'BUTTON_STYLE',
        key: "button",
        text: "",
        callback: this.pickAnswer.bind(this)
      });
      this.placeAtIndex(60 + (i * 11), btnAnswer);
      this.buttonArray.push(btnAnswer);
    }
    this.getNext();
  }

  mixUpArray(array) {
    let len = array.length;
    for (let i = 0; i < 22; i++) {
      let p1 = Phaser.Math.Between(0, len - 1);
      let p2 = Phaser.Math.Between(0, len - 1);

      let temp = array[p1];
      array[p1] = array[p2];
      array[p2] = temp;
    }
    return array;
  }

  getNext() {
    if (this.index==this.quizData.length-1) {

      this.scene.start("SceneOver");

      return;
    }
    let currentQuestion = this.getNextQuestion();
    //Set the data
    this.fillInQuizData(currentQuestion);
    this.clickLock = false;
  }
  fillInQuizData(questObj) {
    this.questText.setText(questObj.question);
    for (let i = 0; i < 4; i++) {
      this.buttonArray[i].setText(questObj.answers[i]);
    }

  }
  getNextQuestion() {
    this.index++;
    let question = this.quizData[this.index];
    let answers = question.incorrect_answers;
    answers.push(question.correct_answer);
    answers = this.mixUpArray(answers);
    return {
      question: question.question,
      answers: answers
    };

  }
  pickAnswer(button) {
    if (this.clickLock == true) {
      return;
    }
    this.clickLock = true;
    let answer = button.text1.text;
    if (answer == this.quizData[this.index].correct_answer) {
      //alert ('right!');
      this.emitter.emit("UP_POINTS", 1);
      this.mm.playSound("correct");
      //this.mm.playSound("sparkle");
      let colorStars = new ColorBurst({
        scene: this,
        x: button.x,
        y: button.y
      });
    } else {
      //alert ('You got it wrong, man!');
      this.showCorrect();
      this.mm.playSound("wrong");
    }
    this.time.addEvent({
      delay: 2000,
      callback: this.delayGoNext,
      callbackScope: this,
      loop: false
    })
  }
  showCorrect() {
    for (let i = 0; i < 4; i++) {
      if (this.buttonArray[i].text1.text != this.quizData[this.index].correct_answer) {
        this.buttonArray[i].alpha = .25;
      }
    }
  }
  delayGoNext() {
    this.getNext();
    for (let i = 0; i < 4; i++) {
      this.buttonArray[i].alpha = 1;
    }
  }
  makeUi() {
    super.makeSoundPanel();
    super.makeGear();
  }
  update() {}
}
