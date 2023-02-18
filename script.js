console.log("Welcome to musico");
//initializing the elements
let songIndex = 0;
let audioElement = new Audio('songs/IWL.mpeg');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songsItem'));

let songs = [
    {songName:"Ishq waala love", filePath:"songs/IWL.mpeg", coverPath: "covers/1.jpg"},
    {songName:"Koi aisa geet gau", filePath:"songs/koiGeet.mp3", coverPath: "covers/2.jpg"},
    {songName:"Hum to deewane hue", filePath:"songs/humToDewwane.mp3", coverPath: "covers/3.jpg"},
    {songName:"Badshah-o-Badshah", filePath:"songs/Badshah.mp3", coverPath: "covers/4.jpg"},
    {songName:"Ishq waala love", filePath:"songs/infected.mpeg", coverPath: "covers/background2.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    console.log(element, i);
})
//audioElement.play(); 

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate',()=>{
    let progress  = ((audioElement.currentTime/audioElement.duration)*100);
    //console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})

