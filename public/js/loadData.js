//  Fonction qui charge la totalité du fichiers JSON contenant les chansons
function loadData() {

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {

        if (this.readyState == 4  && this.status == 200) {

            var data = JSON.parse(this.responseText);
            for (i in data) {

                var x = document.getElementById("listeChansons");
                var option = document.createElement("option");
                option.text = data[i].titre;
                option.value = data[i].id;
                x.add(option);
            }
        }
    };
    xmlhttp.open("GET", "/assets/json/chansons.json", true);
    xmlhttp.send();
}
