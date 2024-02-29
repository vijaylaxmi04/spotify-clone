console.log("Welcome to Spotify");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems =Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]" , filePath: "songs/1.mp3" , coverPath: "1.jpg"},
    {songName: "Cielo - Hum-Huma" , filePath: "songs/2.mp3" , coverPath: "2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k" , filePath: "songs/3.mp3" , coverPath: "3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart" , filePath: "songs/4.mp3" , coverPath: "4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release" , filePath: "songs/5.mp3" , coverPath: "5.jpg"},
    {songName: "Rabba " , filePath: "songs/6.mp3" , coverPath: "6.jpg"},
    {songName: "Sakhiyaan" , filePath: "songs/7.mp3" , coverPath: "7.jpg"},
    {songName: "Bhula Dena" , filePath: "songs/8.mp3" , coverPath: "8.jpg"},
    {songName: "Tumhari Kasam" , filePath: "songs/9.mp3" , coverPath: "9.jpg"},
    {songName: "Na Jaana" , filePath: "songs/10.mp3" , coverPath: "10.jpg"},
]

songItems.forEach((element, i)=>{
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play();

//Handle play/pause click

masterPlay.addEventListener('click', ()=>{
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

//Listen to events
audioElement.addEventListener('timeupdate' , ()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change' , ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
          makeAllPlays();
          songIndex = parseInt(e.target.id);
          e.target.classList.remove('fa-play-circle');
          e.target.classList.add('fa-pause-circle');
          masterSongName.innerText = songs[songIndex].songName;
          audioElement.src = 'songs/{songIndex+1}.mp3';
          audioElement.currentTime = 0;
          audioElement.play();
          gif.style.opacity = 1;
          masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click' , ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = 'songs/${songIndex+1}.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
})


document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = 'songs/${songIndex+1}.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
})
        