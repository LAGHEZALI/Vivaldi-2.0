
function PianoController () {
    var oNoteAllList = {};
    var oPianoGame = {};
    var oPianoSimple = {};
    var isPressed = false;
    var soundPath = "./sound";

    var init = function () {
        oNoteAllList = new NoteAllList(soundPath);
        oPianoGame = new PianoGame();
        oPianoSimple = new PianoSimple(oNoteAllList);
    };

    this.pressPianoBtn = function (buttonId) {
        var button = $('#' + buttonId);

        if(isPressed && oPianoGame.isGameRunning())
            return false;

        isPressed = true;
        button.addClass('pressed');

        if(oPianoGame.isGameRunning()){
            new Audio(oPianoGame.getCurrentSound()).play();
            setTimeout(function () {
                if(oPianoGame.isCorrectPress(buttonId)){
                    showSuccessPress(buttonId);
                    oPianoGame.inkrementPoints();
                }else{
                    showErrPress(buttonId, oPianoGame.getCorrectPres());
                }
            },500);
        }else {
            new Audio(oPianoSimple.getNoteById(buttonId).soundUrl).play();
            setTimeout(function () {
                button.removeClass('pressed');
                isPressed = false;
            }, 500);
        }

    };
    this.startGame = function () {
        $('.startPianoGame').hide();
        $('.endPianoGame').hide();
        $('.notePianoGame').show();
        setViewNextRound(oPianoGame.startGame(10, oNoteAllList));
    };
    init();
}

function PianoSimple(oNoteListAll) {
    var noteList = [];

    var init = function (oNoteListAll) {
        noteList = oNoteListAll.getNoteListFromStringArray(["do", "re", "mi", "fa", "sol", "la", "si"]);
    };

    this.getNoteById = function (buttonId) {
        switch (buttonId){
            case "white1": return noteList[0];
            case "black1": return noteList[1];
            case "white2": return noteList[2];
            case "black2": return noteList[3];
            case "white3": return noteList[4];
            case "white4": return noteList[5];
            case "black3": return noteList[6];
        }
    };

    init(oNoteListAll);
}

function PianoGame() {
    var gameRunning = false;
    var noteList = [];

    this.isGameRunning = function () {
        return gameRunning;
    };
}

function NoteAllList(soundFolder) {
    var noteList = [];

    var init = function(soundFolder){
        noteList.push(new Note("do", "white1", soundFolder + "/do.wav"));
        noteList.push(new Note("re", "white2", soundFolder + "/re.wav"));
        noteList.push(new Note("mi", "white3", soundFolder + "/mi.wav"));
        noteList.push(new Note("fa", "white4", soundFolder + "/fa.wav"));
        noteList.push(new Note("sol", "white5", soundFolder + "/sol.wav"));
        noteList.push(new Note("la", "white6", soundFolder + "/la.wav"));
        noteList.push(new Note("si", "white7", soundFolder + "/si.wav"));
    };
    
    this.getNoteListFromStringArray = function (array) {
        var noteNewList = [];
        for (var i = 0; i < array.length; i++){
            for(var k = 0; k < noteList.length; k++){
                if(noteList[k].name == array[i]){
                    noteNewList.push(noteList[k]);
                    break;
                }
            }
        }
        return noteNewList;
    };

    init(soundFolder);
}

function Note(name, buttonId, soundUrl){
    this.name = name;
    this.buttonId = buttonId;
    this.soundUrl = soundUrl;
}
