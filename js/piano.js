
function PianoController () {
    var oNoteAllList = {};
    var oPianoGame = {};
    var oPianoSimple = {};
    var isPressed = false;
    var soundPath = "./sound";

    this.mode="libre";
    this.monTuto;

    var init = function () {
        oNoteAllList = new NoteAllList(soundPath);
        oPianoSimple = new PianoSimple(oNoteAllList);
    };

    this.nextNote = function() {

        // fin tuto
        if( this.mode=="tuto" && this.monTuto.iter == this.monTuto.nbNotes) {
            this.mode="libre";
            $("#listeChansons").removeClass('listeChansons-play');
            $("#listeChansons").addClass('listeChansons');
            $("#tutoBtn").text("Tutotiel");
            document.getElementById('playBtn').disabled = false;

            $("#modalTitle").text("Mode Tutoriel");
            $("#modalMsg").text("Bravo ! Vous avez fini votre chanson. Recommencez quand vous voulez...");
            
            $( '#btn-modal' ).click ();
             new Audio("./sound/clap.mp3").play();
        }
        else {

            var name = this.monTuto.tabNotes[this.monTuto.iter].nomNote;
            buttonId = noteToId(name);

            var btn = $('#' + buttonId);

            btn.addClass('next');
            this.monTuto.iter += 1 ;
        }
    };

    this.pressPianoBtn = function (buttonId) {
       
        notePressed(buttonId,oPianoSimple);

        //  si on est on mode tuto et la touche et valide
        if(this.mode=="tuto" && idToNote(buttonId)==this.monTuto.tabNotes[this.monTuto.iter-1].nomNote ){

            this.nextNote();
        }

        setTimeout(function () {
            
            noteReleased(buttonId,"Cliquez ici pour Jouer avec le Clavier","#a62639","#CCC");

        }, 500);
    };

    this.pressPianoKey = function (event) {
        
        var keyCode = event.key;
        var buttonId =  keyToId(keyCode);

        if(buttonId != "invalid") {

            notePressed(buttonId,oPianoSimple);

            //  si on est on mode tuto et la touche et valide
            if(this.mode=="tuto" && idToNote(buttonId)==this.monTuto.tabNotes[this.monTuto.iter-1].nomNote ){

                this.nextNote();
            }

            setTimeout(function () {
                
                noteReleased(buttonId,"Tapez les touches AZERTYU pour Jouer","#85ff9e","#555")
			
            }, 500);
        }
        else {
            $("#pianoInput").val("Touche Invalide !");
            styles = {
                backgroundColor : "#F00",
                color: "#FFF"
            };
            $("#pianoInput").css( styles );
            
            new Audio("./sound/error.mp3").play();
            setTimeout(function () {
                $("#pianoInput").val("Tapez les touches AZERTYU pour Jouer");
                styles = {
                    backgroundColor : "#85ff9e",
                    color: "#555"
                };
                $("#pianoInput").css( styles );
            }, 500);
        }       
    };
    init();
}

function notePressed(buttonId,oPianoSimple) {

        var button = $('#' + buttonId);
        var noteName = idToNote(buttonId);
        var styles;

        isPressed = true;
        button.removeClass('next');
        button.addClass('pressed');
        $("#pianoInput").val(noteName);

        styles = {
            backgroundColor : "#FF0",
            color: "#222"
        };
        $("#pianoInput").css( styles );
        
        new Audio(oPianoSimple.getNoteById(buttonId).soundUrl).play();
}

function noteReleased(buttonId,msg,bg,fg) {

        var button = $('#' + buttonId);

        button.removeClass('pressed');
        isPressed = false;

        styles = {
            backgroundColor : bg,
            color: fg
        };
        $("#pianoInput").css( styles );

        $("#pianoInput").val(msg);
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

function tutoObj(tabNotes) {
    this.tabNotes   = tabNotes;
    this.nbNotes    = tabNotes.length;
    this.iter       = 0;
}

function keyToId(key) {
    if(key == 'A' || key == 'a')   return("white1");
    else if(key == 'Z' || key == 'z')   return("black1");
    else if(key == 'E' || key == 'e')   return("white2");
    else if(key == 'R' || key == 'r')   return("black2");
    else if(key == 'T' || key == 't')   return("white3");
    else if(key == 'Y' || key == 'y')   return("black3");
    else if(key == 'U' || key == 'u')   return("white4");
    else return("invalid");
}

function keyToNote(key) {
    if(key == 'A' || key == 'a')   return("Do");
    else if(key == 'Z' || key == 'z')   return("Ré");
    else if(key == 'E' || key == 'e')   return("Mi");
    else if(key == 'R' || key == 'r')   return("Fa");
    else if(key == 'T' || key == 't')   return("Sol");
    else if(key == 'Y' || key == 'y')   return("La");
    else if(key == 'U' || key == 'u')   return("Si");
    else return("invalid");
}

function idToNote(id) {
    if(id == 'white1')   return("Do");
    else if(id == 'black1' )   return("Ré");
    else if(id == 'white2' )   return("Mi");
    else if(id == 'black2' )   return("Fa");
    else if(id == 'white3' )   return("Sol");
    else if(id == 'black3' )   return("La");
    else if(id == 'white4' )   return("Si");
}

function noteToId(note) {
    if(note == 'Do')   return("white1");
    else if(note == 'Ré' )   return("black1");
    else if(note == 'Mi' )   return("white2");
    else if(note == 'Fa' )   return("black2");
    else if(note == 'Sol' )   return("white3");
    else if(note == 'La' )   return("black3");
    else if(note == 'Si' )   return("white4");
}
