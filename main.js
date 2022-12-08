var thing = ""
var objects = []
var status = ""
function preload(){
    video = createVideo("video.mp4")
   
}

function setup() {
    canvas = createCanvas(500,400)
    canvas.center()

}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "status: detecting objects"
thing = document.getElementById("input").value 
}
function modelLoaded() {
    console.log("model is loaded")
    status = true
    video.loop()
    video.speed(1)
    video.volume(0)   
}
function gotResult(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        objects = results
    }
}

function draw(){
    image(video,0,0,500,400)
    if (status != "") {
        objectDetector.detect(video, gotResult)   
        for (let index = 0; index < objects.length; index++) {
            document.getElementById("status").innerHTML = "status: object is detected"
            document.getElementById("number").innerHTML = "number of objects detected are:"+objects.length
            fill("red")
            percent = floor(objects[index].confidence*100)
    text(objects[index].label+" "+percent+"%",objects[index].x, objects[index].y)
    noFill()
    stroke("red")
    rect(objects[index].x, objects[index].y, objects[index].width, objects[index].height )
  
if (objects[index].label==thing) {
    document.getElementById("objectstatus").innerHTML = "object is found"
    video.stop()
    var synth = window.speechSynthesis
    var utterthis = new SpeechSynthesisUtterance(thing+"is found")
    synth.speak(utterthis)
} else {
    document.getElementById("objectstatus").innerHTML = "object is not found"
    
}  
}
        }
}