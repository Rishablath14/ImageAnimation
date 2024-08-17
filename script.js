const canvas = document.getElementById("frame");
const load = document.getElementById("load");
const loading = document.getElementById("loading");
let context = canvas.getContext("2d");
let frames = {curIdx:0,max:184}
let imagesLoaded = 0;const images = [];
function preload(){
    for(var i=1;i<=frames.max+1;i++){
      const img = new Image();
      img.src = `./ezgif-5-280740acce-jpg/ezgif-frame-${i.toString().padStart(3,"0")}.jpg`          
      img.onload=()=>{
          imagesLoaded++;
          let count = Math.floor((imagesLoaded/(frames.max+1))*100);
          load.innerHTML = count;
          if(imagesLoaded===frames.max){
            loading.style.transform=`translateY(-100%)`;
            loadImage(frames.curIdx);   
            afterLoading();
            startAnimation();           
          }
      }
      images.push(img);
    }
}
function loadImage(idx){
   if(idx>=0 && idx<=frames.max){
    const img = images[idx];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    scaleX = canvas.width/img.width;
    scaleY = canvas.height/img.height;
    scale = Math.max(scaleX,scaleY);
    const newHeight = img.height * scale;
    const newWidth =  img.width * scale;
    const offsetX = (canvas.width - newWidth)/2;
    const offsetY = (canvas.height - newHeight)/2;
    context.clearRect(0,0,canvas.width,canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img,offsetX,offsetY,newWidth,newHeight);
    frames.curIdx = idx;
   }
}
function startAnimation(){
var tl = gsap.timeline({
    scrollTrigger:{
        trigger:".parent",
        pin:true,
        start:"top top",
        scrub:0.02,
    }
})
tl.to(frames,{
    curIdx:frames.max,
    onUpdate:function(){
    loadImage(Math.floor(frames.curIdx));
    if(Math.floor(frames.curIdx)>1){ gsap.to(".word2",{opacity:1,x:0})}
    else{gsap.to(".word2",{opacity:0})}
    if(Math.floor(frames.curIdx)>31){ gsap.to(".word3",{opacity:1,x:0})}
    else{gsap.to(".word3",{opacity:0})}
    if(Math.floor(frames.curIdx)>61){ gsap.to(".word4",{opacity:1,x:0})}
    else{gsap.to(".word4",{opacity:0})}
    if(Math.floor(frames.curIdx)>91){ gsap.to(".word5",{opacity:1,x:0})}
    else{gsap.to(".word5",{opacity:0})}
    if(Math.floor(frames.curIdx)>121){ gsap.to(".word6",{opacity:1,scale:1})}
    else{gsap.to(".word6",{opacity:0})}
    }
})
}
preload();
function afterLoading(){
   gsap.set(".word2",{x:-200,opacity:0.1});
   gsap.set(".word3",{x:200,opacity:0.1});
   gsap.set(".word4",{x:-200,opacity:0.1});
   gsap.set(".word5",{x:200,opacity:0.1});
   gsap.set(".word6",{scale:0,opacity:0.1});
   gsap.to(".arrow",{
       y:30,
       yoyo:true,
       repeat:-1,
    })
    const tl2 = gsap.timeline();
    tl2.from("#head1",{
        opacity:0,
        x:-200,
        delay:0.4,
    })
    .from("#head2",{
        opacity:0,
        x:200,
    })
    .from("#head3",{
        opacity:0,
        y:-100,
    })
    gsap.from(".head4",{
        scrollTrigger:{
            trigger:".last",
            scrub:true,
            start:"+=900px center",
        },
        opacity:0,
        yoyo:true,
        y:-100,
    })
}