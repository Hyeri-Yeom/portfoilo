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
  const tl = gsap.timeline({ delay: 0 });

  tl.fromTo('.visual', {background:'#ffffff'},{
    duration: 1,
    y: 0,
    opacity: 1,
    ease: 'power3.out',
    background:'#0d0d0d',
});

  tl.set('.visual .innerVisual', { visibility: 'visible' }, "-=1.2");

  tl.to('.visual', {
    duration: 1.8,
    opacity: 1,
    ease: 'power2.out',

}, 0);


tl.fromTo('.visual .innerVisual .top', {y: 100},{ duration: 1, opacity: 1, y: 0, ease: 'none' }, 0);
tl.fromTo('.visual .innerVisual .middle',{y: 100}, { opacity: 1, y: 0, ease: 'none' ,duration: 1}, "-=1.3");
tl.fromTo('.visual .innerVisual .bottom',{y: 100}, {opacity: 1, y: 0, ease: 'none' ,duration: 1}, "-=0.8");

  // 각 문자 span.char를 찾아서 timeline에 stagger로 애니메이션 추가
  const chars = document.querySelectorAll('.visual .en1 .char');

const tl2 = gsap.timeline();

tl2.from(chars, {
  opacity: 0,
  y: 40,
  scale: 0.5,
  rotationX: -90,
  transformOrigin: "center center -50",
  ease: "back.out(1.7)",
  duration: 0.6,
  stagger: 0.05,
})
.to(chars, {
  ease: "power2.out",
  duration: 0.3,
  stagger: 0.05,
}, "-=0.5");
  
  // 배경 스케일 효과
  gsap.to('.visual', {
      scale: 1.4,
      ease: 'none',
      scrollTrigger: {
          trigger: '.visual',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          // markers:false
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





    // archive 사진 갈라지는 효과
    gsap.timeline({
        scrollTrigger:{
            trigger:'.archive',
            start:'-50% top',
            end:'bottom 100%',
            scrub:1,
            // markers:false
        }
    }) 
    .to('.archive .inner .imgBox .img01',{x: '-300',y: '200',rotate: '-20',ease:'none',duration:3},0)
    .to('.archive .inner .imgBox .img02',{x: '300',y: '200',rotate: '20',ease:'none',duration:3},0)
    .to('.archive .inner .imgBox .img03',{x: '-350',y:'50',rotate: '-15',ease:'none',duration:4},0)
    .to('.archive .inner .imgBox .img04',{x: '350',y:'50',rotate: '15',ease:'none',duration:4},0)
    .to('.archive .inner .imgBox .img05',{x: '-200',y:'-50',rotate: '-20',ease:'none',duration:4},0)
    .to('.archive .inner .imgBox .img06',{x: '200',y:'-50',rotate: '20',ease:'none',duration:4},0)
    // .to('.archive .inner .text',{opacity:1,duration:1,ease:'none'},"-=2.4")




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
let speed = 20; // 커질수록 느림

// 기본 무한 슬라이드 애니메이션
const marquee = gsap.to(track, {
  xPercent: -100,
  ease: "none",
  duration: speed,
  repeat: -1,
});

// 스크롤 시 애니메이션 속도 조절
// let timeout;
// window.addEventListener("scroll", () => {
//   marquee.timeScale(2.5); // 2배 속도

//   clearTimeout(timeout);
//   timeout = setTimeout(() => {
//     marquee.timeScale(1); // 다시 원래 속도
//   }, 400); // 0.4초 후 복원
// });



// worklist 배경색만 자연스럽게 바꾸기
gsap.timeline({
  scrollTrigger: {
    trigger: '.workList',
    start: 'top top',
    end: 'bottom top',  // 섹션 끝날 때까지
    scrub: 1,
    // pin: true, // pin이 꼭 필요 없으면 빼도 돼
  }
})
.to('.workList', {
  opacity:0.1,
  ease: 'power2.out',
});
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
        // markers:false,
        pin:true
    }
})

.to('.process .inner .imgBox',{width:'100%',height:'100vh',duration:5,left:
    0},0)
.to('.process .textBox .en',{opacity:'1',color:'#fff',top:0,left:'15%',duration:5},0)
.to('.process .textBox .en1',{opacity:'1',color:'#fff',top:0,right:'15%',duration:5},0)





gsap.registerPlugin(ScrollTrigger);

const slides = document.querySelectorAll('.mockup .slide');

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.mockup',
    pin: true,
    scrub: 0.4,
    start: 'top top',
    end: '+=400%',
    markers: true
  }
});

// 초기 상태 설정
slides.forEach(slide => {
  gsap.set(slide, { autoAlpha: 0, y: 100 });
});

slides.forEach((slide, i) => {
  const enterTime = i * 2;
  const exitTime = enterTime + 1.2;

  tl.to(slide, {
    autoAlpha: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out',
    onStart: () => {
      // Splitting 적용
      slide.querySelectorAll('[data-splitting]').forEach(el => {
        if (!el.classList.contains('splitting')) {
          Splitting({ target: el });
        }
      });
      // .motion 클래스 강제 추가 (애니메이션 트리거용)
      slide.querySelectorAll('.textBox').forEach(tb => {
        tb.classList.add('motion');
      });
    },
    onReverseComplete: () => {
      // 슬라이드 사라질 때 .motion 클래스 제거 (애니메이션 초기화용)
      slide.querySelectorAll('.textBox').forEach(tb => {
        tb.classList.remove('motion');
      });
    }
  }, enterTime)
  .to(slide, {
    autoAlpha: 0,
    y: -80,
    duration: 1.2,
    ease: 'power2.inOut',
  }, exitTime);
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


gsap.timeline({
  scrollTrigger: {
    trigger: '.start',
    start: 'top bottom',  // 트리거 top이 뷰포트 bottom에 닿을 때
    end: 'bottom top',    // 트리거 bottom이 뷰포트 top에 닿을 때
    scrub: 2,
  }
})
.to('footer .inner .textBox .icon', {
  rotate: 260,
  ease: 'none',
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
      transformOrigin: "center 120vh",
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


document.querySelectorAll('.Resume a').forEach(link => {
  const text = link.textContent;
  link.textContent = '';
  text.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.classList.add('char');  // 여기도 추가
    span.textContent = char;
    span.style.setProperty('--i', i);
    span.style.display = 'inline-block';
    link.appendChild(span);
  });
});

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: ".kbrand",
  start: "top top",
  end: "+=100%", // 섹션4가 고정되는 거리 (스크롤 한 번 더 해야 넘어감)
  pin: true,
  scrub: true, // 자연스럽게
  // markers: true
});
// gsap.to(".kbrand", {
//   scrollTrigger: {
//     trigger: ".kbrand",
//     start: "top top",
//     end: "+=100%",
//     scrub: true,
//   },
//   backgroundColor: "#0d0d0d"
// });
document.addEventListener("DOMContentLoaded", function () {
  const fandomDescEl = document.querySelector(".fandom-desc");
  const clonDescEl = document.querySelector(".clon-desc");
  const subwayDescEl = document.querySelector(".subway-desc");

  const fandomDescriptions = [
    "설명 1: 첫번째 이미지에 대한 설명입니다.",
    "설명 2: 두번째 이미지에 대한 설명입니다.",
  ];

  const clonDescriptions = [
    "설명 1: 첫번째 이미지에 대한 설명입니다.",
    "설명 2: 두번째 이미지에 대한 설명입니다.",
    "설명 3: 세번째 이미지에 대한 설명입니다.",
    "설명 4: 네번째 이미지에 대한 설명입니다.",
    "설명 5: 다섯번째 이미지에 대한 설명입니다.",
    "설명 6: 여섯번째 이미지에 대한 설명입니다.",
  ];

  const subwayDescriptions = [
    "사용자의 주문 흐름을 개선한 UX/UI 리디자인 프로젝트 - Role: UX Research · Wireframe · UI Design · Prototype",
    "설명 2: 두번째 이미지에 대한 설명입니다.",
  ];

  // fade + translateX + scale 커스텀 효과
  const customEffect = {
    on: {
      progress: function () {
        for (let i = 0; i < this.slides.length; i++) {
          const slide = this.slides[i];
          const progress = slide.progress;

          const translateX = progress * 50; // 좌우 50px 이동 (진행 방향에 따라)
          const scale = 1 - Math.min(Math.abs(progress * 0.2), 0.2); // 최대 0.8~1 사이 스케일
          const opacity = 1 - Math.min(Math.abs(progress), 1); // 투명도 조절

          slide.style.transform = `translateX(${translateX}px) scale(${scale})`;
          slide.style.opacity = opacity;
          slide.style.zIndex = -Math.abs(Math.round(progress)) + this.slides.length;
        }
      },
      setTransition: function (duration) {
        for (let i = 0; i < this.slides.length; i++) {
          this.slides[i].style.transitionDuration = duration + "ms";
        }
      },
    },
  };

  const fandomSwiper = new Swiper(".fandomSwiper", {
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { el: ".fandomSwiper .swiper-pagination", clickable: true },
    on: {
      init: function () {
        if (fandomDescEl) fandomDescEl.textContent = fandomDescriptions[this.realIndex % fandomDescriptions.length];
      },
      slideChange: function () {
        if (fandomDescEl) fandomDescEl.textContent = fandomDescriptions[this.realIndex % fandomDescriptions.length];
      },
      progress: customEffect.on.progress,
      setTransition: customEffect.on.setTransition,
    },
  });

  const clonSwiper = new Swiper(".clon-swiper", {
    loop: true,
    effect: "cube",
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.9,
    },
    pagination: { el: ".clon-swiper .swiper-pagination", clickable: true },
    autoplay: { delay: 4000, disableOnInteraction: false },
    on: {
      init: function () {
        if (clonDescEl) clonDescEl.textContent = clonDescriptions[this.realIndex];
      },
      slideChange: function () {
        if (clonDescEl) clonDescEl.textContent = clonDescriptions[this.realIndex];
      },
    },
  });

  const subwaySwiper = new Swiper(".subwaySwiper", {
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { el: ".subwaySwiper .swiper-pagination", clickable: true },
    on: {
      init: function () {
        if (subwayDescEl) subwayDescEl.textContent = subwayDescriptions[this.realIndex % subwayDescriptions.length];
      },
      slideChange: function () {
        if (subwayDescEl) subwayDescEl.textContent = subwayDescriptions[this.realIndex % subwayDescriptions.length];
      },
      progress: customEffect.on.progress,
      setTransition: customEffect.on.setTransition,
    },
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('getInTouchBtn');
  if (!btn) {
    console.error('버튼을 찾지 못했습니다.');
    return;
  }
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('버튼 클릭됨'); // 클릭 인식 확인용 로그

    // Gmail 링크
    const email = 'yhr7656@naver.com';
    const subject = encodeURIComponent('프로젝트 문의드립니다');
    const body = encodeURIComponent('안녕하세요,\n함께 작업할 기회를 갖고 싶습니다.');
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

    window.open(
      gmailUrl,
      'gmailPopup',
      'width=600,height=600,top=100,left=100,resizable=yes,scrollbars=yes'
    );
  });
});
