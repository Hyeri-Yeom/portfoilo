$(document).on('click', 'a[href="#"]', function(e){
    e.preventDefault();
});
 //splitting.js
 $(function(){
  Splitting();  //대문자로쓴다!!!
});


$(function() {
	$('.animate').scrolla({
		mobile: true, //모바일버전시 활성화
		once: false //스크롤시 딱 한번만 하고싶을땐 true
	});
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
    scrub: 2,
    // markers: true
  }
});


// 카드 등장 (clip-path보다 약간 늦게 시작되도록 offset 설정)
gsap.utils.toArray(".aboutme .card").forEach((card, i) => {
  if (card.classList.contains('empty')) return;

  gsap.fromTo(card,
    { opacity: 0, rotateY: -60, y: 50 },
    {
      opacity: 1,
      rotateY: 0,
      y: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "top 40%",     // 언제 사라질지 범위 지정
        scrub: true,        // 스크롤에 따라 자연스럽게 애니메이션
        // markers: true
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


// worklist 글자확대
gsap.timeline({
  scrollTrigger: {
    trigger: '.workList',
    start: 'top top',
    end: '+=400', // ⬅ 좀 더 길게 (자연스럽게 확대되게)
    scrub: 1,
    pin:true
    // markers: true,
  }
})
.fromTo(".list",
  {
    scale: 1,
    opacity: 1,
  },
  {
    scale: 50, // 너무 부담스럽지 않게 기존 100 → 50 정도로 축소
    opacity: 0, // 서서히 사라지게
    ease: 'power2.inOut',
    duration: 1,
  }, 0
)
.to('.workList', {
  background: '#f9f9f9',
  duration: 1,
  ease: 'power2.out'
}, "-=0.8"); // 배경 전환은 약간 겹치게

// 섹션겹치는효과
// 섹션 겹치는 효과 수정 (kbrand pin 안 함)
gsap.utils.toArray('.section').forEach((section) => { {
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      pin: true,
      scrub: 3,
      pinSpacing: false,
    });
  }
});

// 텍스트돌아가는효과
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


//디자인컨셉 아이콘 회전효과
gsap.timeline({
  scrollTrigger: {
    trigger: '.process',
    start: '80% 50%',
    end: '+=600',
    scrub: 3,
  //   markers: true,
  }
})
.to('.iconSet li.icon2 .img img', {
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







// section kbrand 카드 스크롤 효과
const images = gsap.utils.toArray(".kbrand-item");
const total = images.length;
const degree = 360 / total;
const items = document.querySelector(".kbrand-items");

let rotation = 0;
let velocity = 0;
let isDragging = false;
let lastX = 0;

// 초기 카드 배치 애니메이션
const init = () => {
  const timeline = gsap.timeline();

  images.forEach((image, index) => {
    const sign = Math.floor((index / 2) % 2) ? 1 : -1;
    const value = Math.floor((index + 4) / 4) * 4;
    const imageRotation = index > total - 3 ? 0 : sign * value;

    gsap.set(image, {
      rotation: imageRotation,
      scale: 0.5,
    });

    timeline.from(image, {
      x: () => index % 2 ? window.innerWidth + image.clientWidth * 4 : -window.innerWidth - image.clientWidth * 4,
      y: () => window.innerHeight - image.clientHeight,
      rotation: index % 2 ? 200 : -200,
      scale: 4,
      opacity: 1,
      ease: "power4.out",
      duration: 1,
      delay: 0.15 * Math.floor(index / 2),
    }, 0);

    let rotationAngle = index * degree;

    timeline.to(image, {
      scale: 1,
      duration: 0,
    }, 0.15 * (total / 2 - 1) + 1);

    timeline.to(image, {
      transformOrigin: "center 100vh",
      rotation: index > total / 2 ? -degree * (total - index) : rotationAngle,
      duration: 1,
      ease: "power1.out",
    }, 0.15 * (total / 2 - 1) + 1);
  });
};

// 드래그 기반 룰렛 회전
const enableRotationDrag = () => {
  let dragStartX = 0;
  let dragDeltaX = 0;

  const onMouseDown = (e) => {
    isDragging = true;
    dragStartX = e.clientX;
    lastX = dragStartX;
    document.body.style.cursor = 'grabbing';
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;

    dragDeltaX = e.clientX - lastX;
    rotation += dragDeltaX * 0.5; // 감도 조절
    gsap.set(items, { rotation });
    lastX = e.clientX;
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    isDragging = false;
    velocity = dragDeltaX * 0.5; // 관성 감속 시작
    animateRotation();
    document.body.style.cursor = 'default';
  };

  const animateRotation = () => {
    rotation += velocity;
    gsap.set(items, { rotation });
    velocity *= 0.94; // 감속율

    if (Math.abs(velocity) > 0.2) {
      requestAnimationFrame(animateRotation);
    } else {
      velocity = 0;
    }
  };

  // 이벤트 등록
  items.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
};

init();
enableRotationDrag();



// header
document.querySelectorAll('.contact a').forEach(link => {
  const text = link.textContent;
  link.textContent = '';
  text.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.setProperty('--i', i);
    span.style.display = 'inline-block';
    link.appendChild(span);
  });
});


// clon swiper
document.addEventListener("DOMContentLoaded", function () {
  const launchBtn = document.querySelector(".launch-btn");
  const descEl = document.querySelector(".section-desc");

  const links = [
    "https://example.com/link1",
    "https://example.com/link2",
    "https://example.com/link3",
    "https://example.com/link4",
    "https://example.com/link5",
    "https://example.com/link6",
  ];

  const descriptions = [
    "설명 1: 첫번째 이미지에 대한 설명입니다.",
    "설명 2: 두번째 이미지에 대한 설명입니다.",
    "설명 3: 세번째 이미지에 대한 설명입니다.",
    "설명 4: 네번째 이미지에 대한 설명입니다.",
    "설명 5: 다섯번째 이미지에 대한 설명입니다.",
    "설명 6: 여섯번째 이미지에 대한 설명입니다.",
  ];

  let swiper;

  function initSwiperWithEffect(effectName) {
    if (swiper) swiper.destroy(true, true); // 기존 swiper 초기화

    let effectOptions = {};

    switch (effectName) {
      case "fade":
        effectOptions = {
          effect: "fade",
          fadeEffect: { crossFade: true },
        };
        break;
      case "cube":
        effectOptions = {
          effect: "cube",
          cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.9,
          },
          
        };
        break;
      case "coverflow":
        effectOptions = {
          effect: "coverflow",
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          },
        };
        break;
      case "flip":
        effectOptions = {
          effect: "flip",
          flipEffect: {
            slideShadows: true,
            limitRotation: true,
          },
        };
        break;
      default:
        effectOptions = {}; // 기본 효과 (slide)
    }

    swiper = new Swiper(".clon-swiper", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      ...effectOptions,
      on: {
        init: function () {
          if (launchBtn) {
            launchBtn.href = links[this.realIndex];
            launchBtn.target = "_blank"; // ✅ 새 탭에서 열기
          }
          if (descEl) descEl.textContent = descriptions[this.realIndex];
        },
        slideChange: function () {
          if (launchBtn) {
            launchBtn.href = links[this.realIndex];
            launchBtn.target = "_blank"; // ✅ 새 탭에서 열기
          }
          if (descEl) descEl.textContent = descriptions[this.realIndex];
        },
      }
    });

    // 슬라이드 호버 시 설명 변경
    const slides = document.querySelectorAll(".clon-swiper .swiper-slide");
    slides.forEach((slide, index) => {
      slide.addEventListener("mouseenter", () => {
        if (descEl) descEl.textContent = descriptions[index % descriptions.length];
        if (launchBtn) launchBtn.href = links[index % links.length];
        
      });
      slide.addEventListener("mouseleave", () => {
        const idx = swiper.realIndex;
        if (descEl) descEl.textContent = descriptions[idx];
        if (launchBtn) launchBtn.href = links[idx];
      });
    });
  }

  // 초기화 시 원하는 효과 이름 넣으면 됨: 'fade', 'cube', 'coverflow', 'flip', ''(기본)
  // initSwiperWithEffect("fade");
  initSwiperWithEffect("cube");
  // initSwiperWithEffect("coverflow");
  // initSwiperWithEffect("flip");
});



