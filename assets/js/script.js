//CAPTURANDO EVENTO BOTON

$(function () {
    
    let datosSuperHeroe;

    //evento submit validaciión
    $("#searchSuperHeroe").on("submit", function (event) {
        event.preventDefault();

        let regexValidacion = /[0-9]/gm;

        let superHeroe = $("#search").val();

        if (regexValidacion.test(superHeroe)) {
            dataApi(superHeroe);
        } else {
            alert("ingrese un valor válido");
        }
    });

    //llamado a datos api

    const dataApi = () => {

        $.ajax({
            url: "https://www.superheroapi.com/api.php/4905856019427443/66",
            dataType: "json",
            success: (datos) => {
                // console.log(datos.powerstats);
                let { powerstats } = datos;
                let poderesSH = [powerstats];
                let { image } = datos;
                let imagen = [image];
                let { appearance } = datos;
                let rasgos = [appearance];

                // console.log(powerstats)
                let datosApi = {
                    imagen: imagen.map(element => {
                        return element.url;
                    }),
                    id: datos.id,
                    nombre: datos.name,
                    apariencia: rasgos.map(element => {
                        let rasgos = {
                            genero: element.gender,
                            raza: element.race,
                        }
                        return rasgos;
                    }),
                    poderes: poderesSH.map(element => {
                        let poder = {
                            inteligencia: element.intelligence,
                            fortaleza: element.strength,
                            velocidad: element.speed,
                            durabilidad: element.durability,
                            powers: element.power,
                            combate: element.combat,
                        }
                        return poder;
                    }),

                }

                datosSuperHeroe = datosApi;
                loadDatos(datosApi);
            },
            
            error: () => {
                alert ("ERROR: NO FOUND CONSULTE DOCUMENTACION API");
            },
        });
    };

    const loadDatos = (datosApi) => {
        $("#imgSuperhero").attr("src", datosApi.imagen);
        $(".imagen").attr("src", datosApi.imagen);
        let encontrado = $("#subtituloSuperhero").text("Super Heroe ENCONTRADO!");
        encontrado.addClass("subtitulo");
        $("#nombreSuperheroe").text(datosApi.nombre);
        $("#ID").text(datosApi.id)
        let razgos = "";
        for (const iterator of datosApi.apariencia) {
            razgos += `<p>Género: ${iterator.genero} - Raza: ${iterator.raza}`
        }
        $("#apariencia").html(razgos);

        let poderes = "";
        for (const power of datosApi.poderes) {
            poderes += `<li>Inteligencia --> ${power.inteligencia}</li>
            <li>Fortaleza --> ${power.fortaleza}</li>
            <li>Velocidad --> ${power.velocidad}</li>
            <li>Durabilidad --> ${power.durabilidad}</li>
            <li>Poder --> ${power.powers}</li>
            <li>Combate --> ${power.combate}</li>
            `;

        }
        $("#poderes").html(poderes);

    };

    //CAPTURAR EVENTO CLICK DEL BOTON PARA VER GRÁFICO

    $("#btnGrafico").on("click", function () {
        grafico(datosSuperHeroe);
        
    });

    const grafico=(datosSuperHeroe)=>{
 
        let combate,durabilidad,inteligencia,fortaleza,velocidad,poder;
        datosSuperHeroe.poderes.forEach(element => {
            combate = element.combate;
            durabilidad = element.durabilidad;
            inteligencia = element.inteligencia;
            fortaleza = element.fortaleza;
            velocidad = element.velocidad;
            poder = element.powers;
            return combate, durabilidad, inteligencia, fortaleza, velocidad, poder;
        }); 

        //script gráfico canva js
        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: `PODERES DE: ${datosSuperHeroe.nombre}`
            },
            data: [{
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}",
                dataPoints: [
                    { y: combate, label: "Combate" },
                    { y: durabilidad, label: "Durabilidad" },
                    { y: velocidad, label: "Velocidad" },
                    { y: fortaleza, label: "Fortaleza" },
                    { y: inteligencia, label: "inteligencia" },
                    { y: poder, label: "Poder" },
                ]
            }]
        });
        chart.render();
        
    };



});




