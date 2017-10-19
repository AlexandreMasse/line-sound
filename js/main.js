const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    simplex = new SimplexNoise(),
   //audioElement = document.getElementById('audioElement'),
    nbParticle = 40,
    nbLine = 20,
    amplitudeMult = 0.3;


let canvasWidth,
    canvasHeight,
    lines = [],
    audio,
    allData = [];
    time = 0;


function initCanvasSize() {
    canvasWidth = window.innerWidth * 0.8;
    canvasHeight = window.innerHeight * 0.8;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
}


function onResize() {

    //Resize canvas
    initCanvasSize();

    //Create New Lines
    initLines();
}



function updateFrame(){

    requestAnimationFrame(updateFrame);

    //ctx.clearRect(0,0, canvas.width, canvas.height);
    //ctx.beginPath();
    //ctx.save();

    //Fade effect
    ctx.fillStyle = 'rgba(0,0,0, 0.15)';
    ctx.fillRect(0,0, canvasWidth, canvasHeight);

    //ctx.restore();
    //ctx.closePath();



   //Get Data
    allData = audio.getFrequencyData();

    //Remove Highest Frequency Data (20%)
    //allData = allData.splice(Math.floor((allData.length - 1) * 0.8 ));

    //console.log(allData);

    //Caculate average for each line
    const everageData = [];

    for(let i= 0; i < nbLine; i++ ){
        let everageCurrent = 0;
        let cumul = 0;

        let debut = Math.floor( ((allData.length - 1) / nbLine) * i );
        let fin = Math.floor( ((allData.length - 1) / nbLine) * (i + 1) );

        for(let j = debut; j < fin; j++) {
            cumul += allData[j];
        }

        //console.log('Line : ' + i + ' compteur : ' + compteur);
        //console.log('Line : ' + i + ' début : ' + debut + ' fin : ' + fin);

        everageCurrent = cumul / (fin - debut);

        everageData.push(everageCurrent);
    }

    //console.log(everageData);

    //Render lines
    for(let i= 0; i < nbLine; i++ ){
        let line = lines[i];

        //console.log(everageData[i]);

        line.render(everageData[i]);
    }

}


function initLines() {
    //Delete current Lines
    lines = [];

    let marginTopBottom = 70;

    if (marginTopBottom > canvasHeight) {
        marginTopBottom = canvasHeight
    }

    let gapYLine = marginTopBottom;
    let angleStart = 0;

    //Create lines
    for (let i = 0; i < nbLine; i++) {
        let line = new Line(nbParticle, gapYLine, 'white', angleStart); //nbParticle, baseY, color, angleStart
        line.createPoints();
        line.render();
        lines.push(line);
        gapYLine += ( (canvasHeight - (marginTopBottom * 2) ) / (nbLine - 1) );
        angleStart+= 1.5;
    }
}


function init() {

    audio = new Audio();
    audio.loadSound('./audio/sound.mp3');

    initCanvasSize();

    initLines();

    window.addEventListener( 'resize', onResize);

   updateFrame();
}


init();

