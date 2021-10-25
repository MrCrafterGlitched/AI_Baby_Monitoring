Alarm = ""
Status = ""
img = ""
Objects = []
function preload() {
    Alarm = loadSound("air_raid_siren.mp3")
}

function setup() {
    canvas = createCanvas(380, 380)
    canvas.center()
    Alarm.loop()
    video=createCapture(VIDEO)
    video.size(380,380)
    video.hide()
    objectDetector = ml5.objectDetector("COCOSSD", model_loaded)
    document.getElementById("status").innerHTML = "Status:Dectecting Objects"
}

function model_loaded() {
    console.log("Model Loaded! <:D");
    Status = true
    objectDetector.detect(video, getResults)
}

function getResults(error, Results) {
    if (error) {
        console.log(error);
    } else {
        console.log(Results);
        Objects = Results
    }
}

function draw() {
    image(video, 0, 0, 380, 380)
    if (Status != "") {
        objectDetector.detect(video,getResults)
        R=random(255)
        G=random(255)
        B=random(255)
        for (i = 0; i < Objects.length; i++) {
            document.getElementById("status").innerHTML = "Status:Object Detected"
            fill(R,G,B)
            textSize(20)
            Percent = floor(Objects[i].confidence * 100)
            text(Objects[i].label + " " + Percent + "%", Objects[i].x + 15, Objects[i].y + 20)
            noFill()
            stroke(R,G,B)
            strokeWeight(2)
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height)
            document.getElementById("Number").innerHTML="Number of objects detected:"+ Objects.length
            if (Objects[i].label=="person") {
            Alarm.stop()
            document.getElementById("Baby_Info").innerHTML="Baby found"
            }else{
                Alarm.play()
                document.getElementById("Baby_Info").innerHTML="Baby not found"
            }
        }
}
}