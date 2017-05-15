function demoTutoStart(oPianoControll) {

    var selectedMusic = document.getElementById("listeChansons");
    var idMusic = selectedMusic.options[selectedMusic.selectedIndex].value;

    var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {

        if (this.readyState == 4  && this.status == 200) {
            var data = JSON.parse(this.responseText);

            if( idMusic != -1 ) {
                for (i in data) {
                    if( idMusic == data[i].id ) {

                        $("#listeChansons").removeClass('listeChansons');
                        $("#listeChansons").addClass('listeChansons-play');

                        $("#tutoBtn").text("Arrêter le Tutoriel");
                        document.getElementById('playBtn').disabled = true;
                        //  Preparation modal
                        $("#modalTitle").text("Mode Tutoriel");
                        $("#modalMsg").text("Bienvenue au mode Tutoriel ! C'est à votre tour de jouer maintenant. "+
                                            "Tapez les notes musicales colorées en bleu pour compléter la chanson choisi. "+
                                            "Vous pouvez également arrêter le Tutoriel en appuyant sur le bouton 'Arrêter le Tutoriel' à droite.");
                        
                        $( '#btn-modal' ).click ();

                        oPianoControll.mode="tuto";
                        oPianoControll.monTuto = new tutoObj(data[i].notes);

                        oPianoControll.nextNote();
                    }
                }
            }
        }
    };
    xmlhttp.open("GET", "./json/chansons.json", true);
    xmlhttp.send();
}

function demoTutoStop(oPianoControll) {

    oPianoControll.mode="libre";

    $("#listeChansons").removeClass('listeChansons-play');
    $("#listeChansons").addClass('listeChansons');

    $("#tutoBtn").text("Tutoriel");
    document.getElementById('playBtn').disabled = false;


    var nameN = oPianoControll.monTuto.tabNotes[oPianoControll.monTuto.iter].nomNote;
    buttonId = noteToId(nameN);

    var btn1 = $('#' + buttonId);

    btn1.removeClass('next');
    
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
