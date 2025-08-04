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
tl.fromTo('.visual .innerVisual .middle',{y: 100}, { opacity: 1, y: 0, ease: 'none' ,duration: 1}, "-=1");
tl.fromTo('.visual .innerVisual .bottom',{y: 100}, {opacity: 1, y: 0, ease: 'none' ,duration: 1}, "-=0.5");



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
        .to('.visual .top',{xPercent:'300',ease:'none',duration:5},0)
        .to('.visual .middle',{xPercent:'-300',ease:'none',duration:5},0)
        .to('.visual .bottom',{xPercent:'300',ease:'none',duration:5},0)


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
    .to('.archive .inner .text',{opacity:1,duration:1,ease:'none'},"-=2.4")




    // 텍스트 쪼개기 함수
    function splitTextByChar(selector) {
      document.querySelectorAll(selector).forEach(el => {
        const text = el.textContent.trim();
        el.innerHTML = '';
        text.split('').forEach(char => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          el.appendChild(span);
        });
      });
    }
    
    splitTextByChar('.title.en1');
    
    // 텍스트 초기 상태
    gsap.set('.title.en1 span', {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1
    });
    
    // 이미지 초기 상태
    const image = document.querySelector('.hiddenimg img');
    gsap.set(image, {
      x: 0,
      y: 0,
      rotate: 16,
      opacity: 1,
      transformOrigin: '50% 50%'
    });
    
    gsap.to('.title.en1 span', {
      scrollTrigger: {
        trigger: '.about',
        start: 'top top',
        end: '+=600',
        scrub: true,
        // markers: true,
      },
      x: () => gsap.utils.random(-20, 20), // 거의 움직이지 않음
      y: () => gsap.utils.random(250, 400), // 👈 아래로 떨어지는 느낌!
      rotate: () => gsap.utils.random(10, 60), // 자연스럽게 회전
      opacity: 0,
      ease: 'power2.out',
      stagger: {
        each: 0.02,
        from: 'random'
      }
    });
    
    // 이미지 흩어지기 (같은 타이밍으로)
    gsap.to(image, {
      scrollTrigger: {
        trigger: '.about',
        start: 'top top',
        end: '+=600',
        scrub: true,
      },
      x: gsap.utils.random(-30, 30),   // 살짝 좌우 흔들림
      y: gsap.utils.random(300, 500),  // 👈 아래로 크게 떨어짐
      rotate: 60,
      opacity: 0,
      ease: 'power2.out'
    });
    
    

// about 카드효과
gsap.registerPlugin(ScrollTrigger);

// 카드 회전 + 페이드인 순차 등장이 clip-path보다 살짝 늦게 시작되도록 타임라인 사용
const aboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.aboutme',
    start: 'top 100%',
    end: 'bottom 20%',
    scrub: 1,
    // markers: true
  }
});

// aboutme 클립패스 효과 먼저
aboutTl
  .to('.visual', { color: '#0d0d0d', ease: 'none', duration: 2 }, 0)
  .fromTo('.aboutme',
    { 'clip-path': 'inset(60% round 30%)' },
    { 'clip-path': 'inset(0% round 0%)', ease: 'none', duration: 1, height: '100vh' },
    0
  );

// 카드 등장 (clip-path보다 약간 늦게 시작되도록 offset 설정)
gsap.utils.toArray(".aboutme .card").forEach((card, i) => {
  if (card.classList.contains('empty')) return;

  gsap.fromTo(card,
    { opacity: 0, rotateY: -60, y: 50 }, // 더 크게 회전 시작 (-60도)
    {
      opacity: 1,
      rotateY: 0,
      y: 0,
      ease: 'none',
      duration: 0.6,
      delay: i * 0.15,
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reset",
      }
    }
  );
});



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
            end:'+=200',
            scrub:1,
            // markers:true,
        }
    }) 
    
    .fromTo(".list",
        { scale: 1,opacity:1,ease:'none'},
        { scale: 100,duration:10,transformOrigin:'50% 50%',ease:'none'},0)
    .to('.workList',{background:'#f9f9f9',duration:1})


// 섹션겹치는효과
gsap.utils.toArray('.section').forEach((section) => {
  if (!section.classList.contains('kbrand') && !section.classList.contains('clon')) {
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      pin: true,
      scrub: 3,
      pinSpacing: false
    });
  }
});



const swiper = new Swiper('.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 30,
  loop: true,           // 자동 반복
  freeMode: true,       // 자연스러운 드래그 효과
  autoplay: {
    delay: 1000,        // 3초마다 자동 슬라이드
    disableOnInteraction: false,  // 사용자가 조작해도 자동 재생 유지
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,    // 필요 없으면 제거 가능
  },
  // navigation: {       // 화살표 숨기려면 아예 이 옵션 제거
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },
});

// const slideWrap = document.querySelector('.kbrand .listWrap');
// const totalSlides = slideWrap.querySelectorAll('.listBox').length;
// const slideWidth = slideWrap.scrollWidth - window.innerWidth;

// gsap.to(".kbrand .listWrap", {
//   x: -slideWidth,
//   ease: "none",
//   scrollTrigger: {
//     trigger: ".kbrand",
//     start: "top top",
//     end: "+=" + slideWidth,
//     scrub: 1,
//     pin: true,
//     anticipatePin: 1,
//     // markers: true
//   }
// });
const rotatingSections = document.querySelectorAll('.rotatingIconText');
const isMobile = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

rotatingSections.forEach((section) => {
  const icon = section.querySelector('.rotatingIcon');
  const desc = section.querySelector('.descriptionText');
  const text = section.dataset.desc;
  let toggled = false;

  const show = () => {
    desc.innerHTML = text;
    desc.classList.add('visible');
  };

  const hide = () => {
    desc.classList.remove('visible');
    setTimeout(() => {
      if (!desc.classList.contains('visible')) {
        desc.textContent = '';
      }
    }, 300);
  };

  if (isMobile) {
    icon.addEventListener('click', () => {
      toggled = !toggled;
      icon.style.transform = toggled ? 'rotate(360deg)' : 'rotate(0deg)';
      toggled ? show() : hide();
    });
  } else {
    section.addEventListener('mouseenter', show);
    section.addEventListener('mouseleave', hide);
  }

  
});
// sectionclone
gsap.registerPlugin(ScrollTrigger);

const columns = gsap.utils.toArray(".column");
columns.forEach((col, i) => {
  const direction = (i % 2 === 0) ? 1 : -1; // 기존대로
  const speedFactor = (i === 1) ? 2 : 1;

  gsap.to(col, {
    y: () => direction * -window.innerHeight * 0.5 * speedFactor, // <- 여기 음수 붙임
    ease: "none",
    scrollTrigger: {
      trigger: ".section.clon",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      pin: i === 1 ? ".title-wrapper" : false,
    }
  });
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
$(function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to("#colorText", {
    scrollTrigger: {
      trigger: "#colorText",
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
      // markers: true
    },
    onUpdate: function () {
      const progress = 1 - this.progress(); // 반대로 뒤집기
      const position = `${progress * 100}% ${progress * 100}%`;
      this.targets()[0].style.webkitMaskPosition = position;
      this.targets()[0].style.maskPosition = position;
    }
  });
});
