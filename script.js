console.log("Welcome to musico");
//initializing the elements
let songIndex = 1; // it is used to access the songs
let audioElement = new Audio("songs/1.mp3");//initializing the default audio
let masterPlay = document.getElementById("masterPlay");//play button
let myProgressBar = document.getElementById("myProgressBar");//progress bar
let gif = document.getElementById("gif"); // equalizer
let masterClassSong = document.getElementById("masterClassSong"); //song name on player
let songItems = Array.from(document.getElementsByClassName("songsItem"));//array of objects in class name songsItem

// initializing songs and their paths 
let songs = [
  {
    songName: "Khairiyat",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Koi aisa geet gau",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Hum to deewane hue",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Badshah-o-Badshah",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "chashni",
    filePath: "songs/5.mp3",
    coverPath: "covers/background2.jpg",
  },
];

//changing the cover image and song name in the songs list
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//click event for play button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
    Array.from(document.getElementsByClassName("songPlay")).forEach((element)=>{
        if(songIndex==element.id){
            element.classList.add("fa-pause-circle");
            element.classList.remove("fa-play-circle");
        }
    });
    // Array.from(document.getElementsByClassName("timeStamp")).forEach((element)=>{
    //     if(songIndex==element.id){
    //         element.id.innerText = `${audioElement.duration}`;
    //     }
    // });
    //console.log(audioElement.duration);
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
    Array.from(document.getElementsByClassName("songPlay")).forEach((element)=>{
        if(songIndex==element.id){
            element.classList.remove("fa-pause-circle");
            element.classList.add("fa-play-circle");
        }
    });
  }

  
});

// changing the progress bar according to the song
audioElement.addEventListener("timeupdate", () => {
  let progress = (audioElement.currentTime / audioElement.duration) * 100;
  //console.log(progress);
  myProgressBar.value = progress;
});

// changing the song according to the change occur in progress bar
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// funtion that make all the buttons in the song list to play 
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songPlay")).forEach((element) => {
    element.classList.add("fa-play-circle");
    element.classList.remove("fa-pause-circle");
  });
};

// click event for the songs to be get played when clicked on them
//Array.from is used to iterate through the document of html which 
//contains that particular class mention in getElementsByClassName
Array.from(document.getElementsByClassName("songPlay")).forEach(
  (element, i) => {
    element.addEventListener("click", (e) => {
        if(audioElement.played){
            audioElement.pause();
            e.target.classList.add("fa-play-circle");
            e.target.classList.remove("fa-pause-circle");
            masterPlay.classList.add("fa-play-circle");
            masterPlay.classList.remove("fa-pause-circle");
            gif.style.opacity = 0;
        }
        else{
            console.log(e.target);
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            audioElement.src = `songs/${songIndex}.mp3`;
            audioElement.play();
            //audioElement.currentTime = 0;
            gif.style.opacity = 1;
            masterClassSong.innerText = songs[songIndex-1].songName;
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
        }
      
      
    });
  }
);
// next song to get played when clicked on next button
document.getElementById("forward").addEventListener("click", () => {
  if (songIndex >= 5) {
    songIndex = 1;
  } else {
    songIndex += 1;
  }
  console.log(songIndex);
  audioElement.src = `songs/${songIndex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterClassSong.innerText = songs[songIndex-1].songName;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");

  Array.from(document.getElementsByClassName("songPlay")).forEach((element) => {
        if(songIndex==element.id){
            makeAllPlays();
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
            
        }
  });

});

//previous song to get played when clicked on previous button 
document.getElementById("backward").addEventListener("click", () => {
    if (songIndex <= 1) {
      songIndex = 5;
    } else {
      songIndex -= 1;
    }
    console.log(songIndex);
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterClassSong.innerText = songs[songIndex-1].songName;
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    Array.from(document.getElementsByClassName("songPlay")).forEach((element) => {
        if(songIndex==element.id){
            makeAllPlays();
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');  
        }
    });
});


  
