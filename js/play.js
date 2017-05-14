function demoPlay(oPianoControll) {

    var selectedMusic = document.getElementById("listeChansons");
    var idMusic = selectedMusic.options[selectedMusic.selectedIndex].value;

    var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {

        if (this.readyState == 4  && this.status == 200) {
            var data = JSON.parse(this.responseText);

            if( idMusic != -1 ) {
                for (i in data) {
                    if( idMusic == data[i].id ) {

                            var j = 0; 
                            //  create a loop function
                            function myLoop () {     
                                //  call a 3s setTimeout when the loop is called      
                                setTimeout(function () { 
                                    //  your code here   
                                    oPianoControll.pressPianoBtn( conv( data[i].notes[j].nomNote ) );
                                    //  increment the counter         
                                    j++;            
                                    //  if the counter < 10, call the loop function         
                                    if (j < data[i].notes.length) {    
                                        //  ..  again which will trigger another         
                                        myLoop();             //  ..  again which will trigger another 
                                    }   
                                //  ..  setTimeout()   
                                },data[i].notes[j].Silence )
                            }
                            myLoop();  
                            
                            

                    }
                }
            }
        }
    };
    xmlhttp.open("GET", "./json/chansons.json", true);
    xmlhttp.send();
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