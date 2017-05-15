function demoPlayStart(oPianoControll) {

    var selectedMusic = document.getElementById("listeChansons");
    var idMusic = selectedMusic.options[selectedMusic.selectedIndex].value;

    var x;

    var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {

        if (this.readyState == 4  && this.status == 200) {
            var data = JSON.parse(this.responseText);

            if( idMusic != -1 ) {
                for (i in data) {
                    if( idMusic == data[i].id ) {

                            x=data[i].id

                            $("#listeChansons").removeClass('listeChansons');
                            $("#listeChansons").addClass('listeChansons-play');
                            
                            $("#playBtn").text("Arrêter la Lecture");
                            document.getElementById('tutoBtn').disabled = true;

                            oPianoControll.mode="play";

                            var j = 0; 
                            //  create a loop function
                            function myLoop () {     
                                //  call a 3s setTimeout when the loop is called      
                                setTimeout(function () { 

                                    if( oPianoControll.mode != "play" ) {
                                        j = data[x].notes.length;
                                    }
                                    //  your code here   
                                    if(data[x].notes[j] != undefined) {
                                        oPianoControll.pressPianoBtn( conv( data[x].notes[j].nomNote ) );
                                    }
                                    //  increment the counter         
                                    j++;            
                                    //  if the counter < 10, call the loop function         
                                    if (j < data[x].notes.length) {    
                                        //  ..  again which will trigger another         
                                        myLoop();             //  ..  again which will trigger another 
                                    }
                                    else
                                    {
                                        $("#playBtn").text("Jouer");
                                        document.getElementById('tutoBtn').disabled = false;
                                        $("#listeChansons").removeClass('listeChansons-play');
                                        $("#listeChansons").addClass('listeChansons');
                                    }   
                                //  ..  setTimeout()   
                                },data[x].notes[j].Silence)
                            }
                            myLoop();
                    }
                }
            }
            else {

                //  Preparation modal
                $("#modalTitle").text("Pas si Vite !");
                $("#modalMsg").text("Choisissez une chanson de la liste déroulante d'abord !");
                $( '#btn-modal' ).click ();
            }
        }
    };
    xmlhttp.open("GET", "./json/chansons.json", true);
    xmlhttp.send();
}

function demoPlayStop(oPianoControll) {

    oPianoControll.mode="libre";
    $("#playBtn").text("Jouer");
    document.getElementById('tutoBtn').disabled = false;
    $("#listeChansons").removeClass('listeChansons-play');
    $("#listeChansons").addClass('listeChansons');
}

function conv(note) {
    if(note == "Do") return ("white1");
    else if(note == "Ré") return ("black1");
    else if(note == "Mi") return ("white2");
    else if(note == "Fa") return ("black2");
    else if(note == "Sol") return ("white3");
    else if(note == "La") return ("black3");
    else if(note == "Si") return ("white4");
}

