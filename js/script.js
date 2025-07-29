$(document).on('click', 'a[href="#"]', function(e){
    e.preventDefault();
});
 //splitting.js
 $(function(){
  Splitting();  //대문자로쓴다!!!
});

$(function(){
  var lastScrollTop = 0;
  var delta = 5; // 민감도
  var header = $('header');
  header.addClass('on');
  $(window).on('scroll', function() {
    var scrollTop = $(this).scrollTop();

    // 스크롤 차이가 너무 작으면 무시
    if(Math.abs(lastScrollTop - scrollTop) <= delta) return;

    if (scrollTop > lastScrollTop && scrollTop > 150){
      // 아래로 스크롤 - 헤더 숨김
      header.removeClass('on');
    } else {
      // 위로 스크롤 - 헤더 보이기
      header.addClass('on');
    }

    lastScrollTop = scrollTop;
  });
});

// visual 애니메이션
$(window).on('load', function () {
  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline({ delay: 0.2 });

  tl.fromTo('.visual', {background:'#ffffff'},{
    duration: 1,
    y: 0,
    opacity: 1,
    ease: 'power3.out',
    background:'#0d0d0d'
});

  tl.set('.visual .innerVisual', { visibility: 'visible' }, "-=1.0");

  tl.to('.visual', {
    duration: 1.8,
    opacity: 1,
    ease: 'power2.out',
    scale: 1
}, 0);


tl.fromTo('.visual .innerVisual .top', {y: 100},{ duration: 1, opacity: 1, y: 0, ease: 'none' }, 0);
tl.fromTo('.visual .innerVisual .middle',{y: 100}, { opacity: 1, y: 0, ease: 'none' ,duration: 0.5}, "-=1.0");
tl.fromTo('.visual .innerVisual .bottom',{y: 100}, {opacity: 1, y: 0, ease: 'none' ,duration: 1}, "-=1.0");



  // 배경 스케일 효과
  gsap.to('.visual', {
      scale: 1.4,
      ease: 'none',
      scrollTrigger: {
          trigger: '.visual',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          // markers:true
      }
  })
  });

// visual text animation
$(function(){
    gsap.registerPlugin(ScrollTrigger);
        gsap.timeline({
            scrollTrigger:{
                trigger:'.visual',
                start:'top',
                end:'bottom -100%',
                scrub:2,
                markers:false,
            }
        })
        .to('.visual .top',{xPercent:'-300',ease:'none',duration:5},0)
        .to('.visual .middle',{xPercent:'300',ease:'none',duration:5},0)
        .to('.visual .bottom',{xPercent:'-300',ease:'none',duration:5},0)
        .to('.visual .top .iconPink img',{rotation:'1080',ease:'none',duration:2},0)
        .to('.visual .bottom .iconBlue img',{rotation:'1080',ease:'none',duration:2},0)
        .to('.visual .middle .iconOrange img',{rotation:'1080',ease:'none',duration:2},0)

// aboutme 비디오
    gsap.timeline({
        scrollTrigger:{
            trigger:'.aboutme',
            start:'top 100%',
            end:'bottom 20%',
            scrub:2,
            // markers:true
        }
    }) 
    .to('.visual',{color:'#0d0d0d',ease:'none',duration:2},0)
    .fromTo('.aboutme',{'clip-path':'inset(60% round 30%)'},{'clip-path':'inset(0% round 0%)',ease:'none',duration:1,height:'100vh'},0)
    // banner효과

    // archive 사진 갈라지는 효과
    gsap.timeline({
        scrollTrigger:{
            trigger:'.archive',
            start:'-50% top',
            end:'bottom 100%',
            scrub:1,
            // markers:true
        }
    }) 
    .to('.archive .inner .imgBox .img01',{x: '-300',y: '200',rotate: '-20',ease:'none',duration:3},0)
    .to('.archive .inner .imgBox .img02',{x: '300',y: '200',rotate: '20',ease:'none',duration:3},0)
    .to('.archive .inner .imgBox .img03',{x: '-350',y:'50',rotate: '-15',ease:'none',duration:4},0)
    .to('.archive .inner .imgBox .img04',{x: '350',y:'50',rotate: '15',ease:'none',duration:4},0)
    .to('.archive .inner .imgBox .img05',{x: '-200',y:'-50',rotate: '-20',ease:'none',duration:4},0)
    .to('.archive .inner .imgBox .img06',{x: '200',y:'-50',rotate: '20',ease:'none',duration:4},0)
    .to('.archive .inner .text',{opacity:1,duration:1,ease:'none'},0)



//  skill 무한반복 애니메이션
const track = document.querySelector('.track');

// track 내부 콘텐츠 복제 (무한 슬라이드를 위한 2배 콘텐츠)
track.innerHTML += track.innerHTML;

// 애니메이션 속도 설정
let speed = 40; // 커질수록 느림

// 기본 무한 슬라이드 애니메이션
const marquee = gsap.to(track, {
  xPercent: -100,
  ease: "none",
  duration: speed,
  repeat: -1,
});

// 스크롤 시 애니메이션 속도 조절
let timeout;
window.addEventListener("scroll", () => {
  marquee.timeScale(2.5); // 2배 속도

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    marquee.timeScale(1); // 다시 원래 속도
  }, 400); // 0.4초 후 복원
});





// workslit확대효과
    gsap.timeline({
        scrollTrigger:{
            trigger:'.workList',
            start:'top top',
            end:'+=1000',
            scrub:1,
            // markers:true,
            pin:true
        }
    }) 
    
    .fromTo(".list",
        { scale: 1,opacity:1,ease:'none'},
        { scale: 100,duration:5,transformOrigin:'50% 50%',ease:'none'},0)
    .to('.workList',{background:'#0d0d0d',duration:1})


// worklist 섹션업효과
// 04.scrollTrigger
// $(function(){
//     gsap.registerPlugin(ScrollTrigger);

//     gsap.utils.toArray('.section').forEach((section, i) => {
//         ScrollTrigger.create({
//             trigger: section,
//             start: 'top top',
//             pin: true,
//             scrub: 3,
//             pinSpacing: false,
//             // markers: true
//         });
//     });
// });
gsap.utils.toArray('.section').forEach((section, i) => {
    if (!section.classList.contains('kbrand')) {
        ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            pin: true,
            scrub: 3,
            pinSpacing: false
        });
    }
});

// 클론코딩 슬릭적용
$('.section.clonCoding .slide').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  fade: true,
  arrows: false,
  dots: true
});

// 서브웨이 세로스크롤
  // const images = document.querySelectorAll('.scrollBox li');

  // const st = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: '.subway',
  //     start: 'top top',
  //     end: '+=300%',  // 3배 스크롤
  //     scrub: 1,
  //     pin: true,
  //     markers: true
  //   }
  // });

  // // 이미지들이 각각 아래(400%)에서 올라와서 opacity 1이 되도록 stagger 처리
  // st.fromTo(images, 
  //   { y: '400%', opacity: 0 }, 
  //   { y: '0%', opacity: 1, duration: 1.5, ease: 'none', stagger: 1 }
  // );
  

const slideWrap = document.querySelector('.kbrand .listWrap');
const totalSlides = slideWrap.querySelectorAll('.listBox').length;
const slideWidth = slideWrap.scrollWidth - window.innerWidth;

gsap.to(".kbrand .listWrap", {
  x: -slideWidth,
  ease: "none",
  scrollTrigger: {
    trigger: ".kbrand",
    start: "top top",
    end: "+=" + slideWidth,
    scrub: 1,
    pin: true,
    anticipatePin: 1,
    // markers: true
  }
});


// process비디오효과
gsap.timeline({
    scrollTrigger:{
        trigger:'.process',
        start:'top top',
        end:'bottom 0%',
        scrub:2,
        // markers:true,
        pin:true
    }
})

.to('.process .inner .imgBox',{width:'100%',height:'100vh',duration:5,left:
    0},0)
.to('.process .textBox .en',{opacity:'1',color:'#fff',top:0,left:'15%',duration:5},0)
.to('.process .textBox .en1',{opacity:'1',color:'#fff',top:0,right:'15%',duration:5},0)




// responsive video 효과
gsap.timeline({
    scrollTrigger:{
        trigger:'.interactive',
        start:'50% 100%',
        end:'+=1000',
        scrub:2,
        // markers:true
    }
})
.fromTo('.responsive .backgroundImg',{'clip-path':'inset(60% round 30%)'},{'clip-path':'inset(0% round 0%)',ease:'none',duration:1},0)

// 반응형 디바이스이미지 세로스크롤
gsap.registerPlugin(ScrollTrigger);

let upBox = document.querySelectorAll('.mockup .slide');

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.mockup',
    pin: true,
    scrub: 1,
    start: 'top top',
    end: '+=500%',
    // markers: true
  }
});



// from → to 로 자연스러운 애니메이션
tl.from(upBox, {
  y: '140%',
  duration: 8,
  ease: 'none',
  stagger: 0.5,
});

tl.to(upBox, {
  y: '-130%',
  duration: 8,
  ease: 'power1.out',
  stagger: 0.5
});

//디자인컨셉 아이콘 회전효과
gsap.timeline({
    scrollTrigger: {
      trigger: '.designConcept',
      start: '80% 50%',
      end: '+=600',
      scrub: 3,
    //   markers: true,
    }
  })
  .to('.icons .inner .iconSet li.arrow .img img', {
    rotate: 230, 
    duration: 10,
    ease: 'none'
  });

gsap.timeline({
    scrollTrigger: {
      trigger: '.start',
      start: '80% 50%',
      end: '+=600',
      scrub: 3,
      markers: true,
    }
  })
  .to('footer .inner .textBox .icon', {
    rotate: 230, 
    duration: 10,
    ease: 'none'
  });


});
