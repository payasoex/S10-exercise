$(document).ready(function () {
    // // muestra el texto contenido el elemento
    // let miTexto = $("#contenido").text();
    // alert(miTexto);

    // // muestra el o los elementos contenidos en nuestro elemento
    // let miContenidoHTML = $("#contenido").html();
    // alert(miContenidoHTML);

    // // muestra el valor del atributo de nuestro elemento
    // let miAtributo = $('#nombre').attr('type');
    // alert(miAtributo);

    // // al pasar el mouse por el elemento se muestra el otro elemento
    // $('#caja1').mouseenter(function() {
    //     $('#caja2').show();
    // })
    
    // // al pasar el mouse por el elemento se oculta el otro elemento
    // $('#caja1').mouseout(function() {
    //     $('#caja2').hide();
    // })
    
    // al pasar el mouse en  el elemento se muestra el segundo elemento y se oculta al sacar el mouse
    $('#caja1').mouseenter(function() {
        $('#caja2').toggle();
    })

    $('#boton').click(function() {
        const nombre = $('#nombre').val();
        const correo = $('#correo').val();

        console.log(nombre, correo)

        alert(`su nombre es: ${nombre} y su correo es: ${correo}`);
    })

    $('#boton1').click(function() {
        $('#contenido').css('background-color', 'greenyellow');
    })

    $('#boton2').click(function() {
        $('#texto').text('Texto escrito usadndo jQuery');
    })

    $('#boton1').dblclick(function() {
        $('#contenido').css('background-color', 'white');
        $('#texto').text('Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae voluptatibus ' + 'doloremque rerum corrupti eveniet, quis quas nam quisquam, ' + 'magnam consequuntur ipsa aspernatur reprehenderit repellendus delectus voluptates veniam' + 'odio, adipisci aliquam!')
    })

    window.onload = function () {

        var chart = new CanvasJS.Chart("chartContainer", {            
            title:{
                text: "Tiempo en Temuco para esta semana"              
            },
            axisY: {
                suffix: " °C",
                maximum: 40,
                gridThickness: 0
            },
            toolTip:{
                shared: true,
                content: "{name} </br> <strong>Temperature: </strong> </br> Min: {y[0]} °C, Max: {y[1]} °C"
            },
            data: [{
                type: "rangeSplineArea",
                fillOpacity: 0.1,
                color: "#91AAB1",
                indexLabelFormatter: formatter,
                dataPoints: [
                    { label: "Monday", y: [15, 26], name: "rainy" },
                    { label: "Tuesday", y: [15, 27], name: "rainy" },
                    { label: "Wednesday", y: [13, 27], name: "sunny" },
                    { label: "Thursday", y: [14, 27], name: "sunny" },
                    { label: "Friday", y: [15, 26], name: "cloudy" },
                    { label: "Saturday", y: [17, 26], name: "sunny" },
                    { label: "Sunday", y: [16, 27], name: "rainy" }
                ]
            }]
        });
        chart.render();
        
        var images = [];    
        
        addImages(chart);
        
        function addImages(chart) {
            for(var i = 0; i < chart.data[0].dataPoints.length; i++){
                var dpsName = chart.data[0].dataPoints[i].name;
                if(dpsName == "cloudy"){
                    images.push($("<img>").attr("src", "https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/cloudy.png"));
                } else if(dpsName == "rainy"){
                images.push($("<img>").attr("src", "https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/rainy.png"));
                } else if(dpsName == "sunny"){
                    images.push($("<img>").attr("src", "https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/sunny.png"));
                }
        
            images[i].attr("class", dpsName).appendTo($("#chartContainer>.canvasjs-chart-container"));
            positionImage(images[i], i);
            }
        }
        
        function positionImage(image, index) {
            var imageCenter = chart.axisX[0].convertValueToPixel(chart.data[0].dataPoints[index].x);
            var imageTop =  chart.axisY[0].convertValueToPixel(chart.axisY[0].maximum);
        
            image.width("40px")
            .css({ "left": imageCenter - 20 + "px",
            "position": "absolute","top":imageTop + "px",
            "position": "absolute"});
        }
        
        $( window ).resize(function() {
            var cloudyCounter = 0, rainyCounter = 0, sunnyCounter = 0;    
            var imageCenter = 0;
            for(var i=0;i<chart.data[0].dataPoints.length;i++) {
                imageCenter = chart.axisX[0].convertValueToPixel(chart.data[0].dataPoints[i].x) - 20;
                if(chart.data[0].dataPoints[i].name == "cloudy") {					
                    $(".cloudy").eq(cloudyCounter++).css({ "left": imageCenter});
                } else if(chart.data[0].dataPoints[i].name == "rainy") {
                    $(".rainy").eq(rainyCounter++).css({ "left": imageCenter});  
                } else if(chart.data[0].dataPoints[i].name == "sunny") {
                    $(".sunny").eq(sunnyCounter++).css({ "left": imageCenter});  
                }                
            }
        });
        
        function formatter(e) { 
            if(e.index === 0 && e.dataPoint.x === 0) {
                return " Min " + e.dataPoint.y[e.index] + "°";
            } else if(e.index == 1 && e.dataPoint.x === 0) {
                return " Max " + e.dataPoint.y[e.index] + "°";
            } else{
                return e.dataPoint.y[e.index] + "°";
            }
        } 
        
        }

});
