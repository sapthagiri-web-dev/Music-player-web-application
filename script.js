const musicContainer = document.querySelector("#music-container")

const progress = document.querySelector("#progress")
const title = document.querySelector("#title")
const progressContainer = document.querySelector("#progress-container")
const audio = document.querySelector("#audio")
const cover = document.querySelector("#cover")

const prevBtn = document.querySelector("#prev")
const playBtn = document.querySelector("#play")
const nextBtn = document.querySelector("#next")




//song title 
const songs = ['hey' , 'summer' ,'Danger','BerlinatNight', 'ukulele','FourMoreWeeks','ElectroFight'];


//keep track odf songs
let songIndex = 1;

//load the sonsg in to the DOM
loadSong(songs[songIndex]);



//update song details
function loadSong(song){
  title.innerText = song;
  audio.src = `music/${song}.mp3`
  cover.src = `images/${song}.jpg`
}


//play song
function playSong(){
  musicContainer.classList.add('play')
  
  playBtn.querySelector('i.fa').classList.remove('fa-play')

  playBtn.querySelector('i.fa').classList.add('fa-pause')

audio.play()
}

//pause song
function pauseSong(){
  musicContainer.classList.remove('play')
 
  playBtn.querySelector('i.fa').classList.add('fa-play')

  playBtn.querySelector('i.fa').classList.remove('fa-pause')

audio.pause()
}

// update progress bar

function updateProgress(e){

  const { duration , currentTime } = e.srcElement
  const progressPercent = (currentTime/duration) *100
  progress.style.width = `${progressPercent}%`

}

// click on progress

function setProgress(e){
  const width = this.clientWidth;
 const click = e.offsetX;
 const duration = audio.duration;

 audio.currentTime = (click/width) *duration
}




// playing previos song

function prevSong(){

  songIndex--;

  if (songIndex < 0){
    songIndex = songs.length -1;

  }
  loadSong(songs[songIndex])

 playSong()

}


// playing the nextSong

function nextSong(){
  songIndex++;

  if (songIndex > songs.length -1){
    songIndex = 0;

  }

  loadSong(songs[songIndex])

  playSong()
}



// event listners 

playBtn.addEventListener("click" , function(){
  const isPlaying = musicContainer.classList.contains('play')

  if(isPlaying){
    pauseSong()
  }else{
    playSong()
  }
})




//change song
prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)



// time song update

audio.addEventListener('timeupdate',updateProgress)

//click on progress bar
progressContainer.addEventListener('click', setProgress)


// when song ends play next song
audio.addEventListener('ended' ,nextSong)