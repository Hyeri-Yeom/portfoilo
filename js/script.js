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
    
    splitTextByChar('.title.en');
    
    // 텍스트 초기 상태
    gsap.set('.title.en span', {
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
    
    gsap.to('.title.en span', {
      scrollTrigger: {
        trigger: '.about',
        start: 'top top',
        end: '+=600',
        scrub: 1,
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
if (window.innerWidth > 768) {
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
          end: "top 40%",
          scrub: true,
          // markers: true
        }
      }
    );
  });
}


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
    // markers: true
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


gsap.registerPlugin(ScrollTrigger);

gsap.timeline({
  scrollTrigger: {
    trigger: '.start',
    start: 'top bottom',
    end: '+=200',  // 스크롤 범위 200px만큼
    scrub: 2,
    // markers: true,
  }
})
.to('footer .inner .textBox .icon', {
  rotation: 260,  // rotation으로 수정
  ease: 'none',
});

gsap.timeline({
  scrollTrigger: {
    trigger: '.concept',
    start: '+=300',
    end: '+=600',
    scrub: 3,
  }
})
.to('.iconSet li.icon2 .img img', {
  rotation: 230,  // rotate -> rotation
  ease: 'none'
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

  const getClientX = (e) => e.touches ? e.touches[0].clientX : e.clientX;

  const onDown = (e) => {
    isDragging = true;
    dragStartX = getClientX(e);
    lastX = dragStartX;
    document.body.style.cursor = 'grabbing';
  };

  const onMove = (e) => {
    if (!isDragging) return;

    dragDeltaX = getClientX(e) - lastX;
    rotation += dragDeltaX * 0.5;
    gsap.set(items, { rotation });
    lastX = getClientX(e);
  };

  const onUp = () => {
    if (!isDragging) return;
    isDragging = false;
    velocity = dragDeltaX * 0.5;
    animateRotation();
    document.body.style.cursor = 'default';
  };

  const animateRotation = () => {
    rotation += velocity;
    gsap.set(items, { rotation });
    velocity *= 0.94;
    if (Math.abs(velocity) > 0.2) {
      requestAnimationFrame(animateRotation);
    } else {
      velocity = 0;
    }
  };

  // 데스크탑
  items.addEventListener("mousedown", onDown);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);

  // 모바일
  items.addEventListener("touchstart", onDown, { passive: true });
  window.addEventListener("touchmove", onMove, { passive: true });
  window.addEventListener("touchend", onUp);
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
`<p style="margin-bottom:12px; font-weight:normal;">
  <strong>몰입감 있는 팬덤 플랫폼을 구현한 프로젝트</strong>로,<br> 
  아티스트별 맞춤 공간과 커뮤니티 기능을 통해 <br> 팬과 아티스트 간의 연결을 강화합니다.
</p>
<p style="font-size:14px; color:#666;">Period: 25.07.01 - 25.07.31</p>
<p style="font-size:14px; color:#666;">Role: UX Research · Wireframe · UI Design · <br>Prototype · Frontend Development · Git 관리 · 배포</p>`,
  ` <p style="font-weight:600;margin-bottom:12px">챗봇 UI 디자인 및 인터랙션 구현</p>
    <p style="font-weight:normal;">
    사용자의 접근성과 브랜드 톤을 반영한 챗봇 UI를 디자인하고,<br>
    버튼 클릭 시 자동 응답이 출력되는 JS 인터랙션을 구현했습니다.</p>`,
    `<p style="font-weight:600;margin-bottom:12px">아티스트 페이지 인터랙션 구현</p>
<p style="font-weight:normal;">
아티스트 프로필을 누르면 상세 페이지로 자연스럽게 전환되도록 구성했고,<br>
게시물은 재사용 가능한 컴포넌트로 제작해 유지 보수를 고려했습니다.
</p>`,
`  <p style="font-weight:600;margin-bottom:12px">미디어 페이지 UI 디자인</p>
<p style="font-weight:normal;">
카테고리 구분과 버튼 인터페이스를 통해<br>
사용자의 흐름과 접근성을 고려했습니다.
</p>
`,
`<p style="font-weight:600;margin-bottom:12px">아카이브 페이지 기능 구현</p>
<p style="font-weight:normal;">
탭 메뉴를 통해 활동 기록을 카테고리별로 나누고,<br>
더보기 버튼을 통한 삭제 흐름을 구현해봤습니다.
</p>`,
`<p style="font-weight:600;margin-bottom:12px">라이브 페이지 UI 코딩</p>
<p style="font-weight:normal;">
라이브 방송 UI를 코딩으로 구현했으며,<br>
아티스트별 라이브 리스트와 재생 화면을 구성했습니다.
</p>`
  ];

  const clonDescriptions = [
    `<p style="margin-bottom:12px; font-weight:normal;">브랜드 가치와 스토리를 반영한 핵심 정보를 효율적으로 배치하고, <br>  사용자 중심의 경험 강화를 목표로 진행한 
리뉴얼 프로젝트입니다.</p>
    <p style="font-size:14px; color:#888;">Period: 25.06.04 - 25.06.30 </p>
    <p style="font-size:14px; color:#888;">Role: UX Research · Frontend Development · Responsive Design</p>`,
    `<p style="font-weight:600;margin-bottom:12px">Intro Section</p>
    <p style="font-weight:normal;">브랜드 감성을 즉각 전달하기 위해 비주얼 중심의 레이아웃으로 구성하였으며,<br>텍스트 애니메이션으로 시각적인 흥미를 더했습니다.</p>` ,
    `<p style="font-weight:600;margin-bottom:12px">Slide‑Up Section</p>
    <p style="font-weight:normal;">‘몰입감 있는 흐름’을 연출하기 위해<br>GSAP 기반 슬라이드업 애니메이션을 구현했습니다.</p>`,
    `<p style="font-weight:600;margin-bottom:12px">Image Overlay Section</p>
    <p style="font-weight:normal;">GSAP을 활용해 이미지 위에 텍스트를 오버레이하며<br>
    깊이감 있는 시각 효과를 구현했습니다.</p>`,
    `<p style="font-weight:600;margin-bottom:12px">Store Page</p>
    <p style="font-weight:normal;">Swiper를 활용하여 외부 슬라이드로 매장을 선택하고, <br>
    내부 슬라이드로 해당 매장의 상세 이미지를 탐색할 수 있게 구현했습니다.</p>`,
  ];

  const subwayDescriptions = [
    `<p style="margin-bottom:12px; font-weight:normal">
      사용자 흐름 분석과 UX 리서치를 바탕으로, <br>브랜드 아이덴티티를 반영한 직관적이고 효율적인 UI를 설계한 <br>리디자인 프로젝트입니다.
    </p>
    <p style="font-size:14px; color:#666;">Period: 2025.03.06 – 2025.03.19</p>
    <p style="font-size:14px; color:#666;">Role: UX Research · Persona & Problem Definition <br>· Wireframe · UI Design · Prototype</p>`,
"기존에 없던 <strong>즐겨찾기 기능</strong>을 통해 <br>자주 주문하는 메뉴를 손쉽게 저장하고 접근할 수 있도록 구성했습니다.",
"자주 먹는 메뉴를 <strong>'나만의 메뉴'</strong>로 저장해<br>매번 옵션 선택 없이 빠르게 주문할 수 있게 했고,<br>‘바로 주문’ 버튼으로 사용 편의성을 높였습니다."
  ];

  // 설명 업데이트 함수 (innerHTML로 넣음)
  function updateDescription(el, descriptions, index) {
    if (!el) return;
    el.innerHTML = descriptions[index % descriptions.length];
  }

  // 기존 swiper 초기화와 이벤트에서 설명 업데이트만 수정
  const fandomSwiper = new Swiper(".fandomSwiper", {
    loop: true,
    autoplay: { delay: 8000, disableOnInteraction: false },
    pagination: { el: ".fandomSwiper .swiper-pagination", clickable: true },
    on: {
      init: function () {
        updateDescription(fandomDescEl, fandomDescriptions, this.realIndex);
      },
      slideChange: function () {
        updateDescription(fandomDescEl, fandomDescriptions, this.realIndex);
      },
      progress: function () {
        for (let i = 0; i < this.slides.length; i++) {
          const slide = this.slides[i];
          const progress = slide.progress;

          const translateX = progress * 50;
          const scale = 1 - Math.min(Math.abs(progress * 0.2), 0.2);
          const opacity = 1 - Math.min(Math.abs(progress), 1);

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
        updateDescription(clonDescEl, clonDescriptions, this.realIndex);
      },
      slideChange: function () {
        updateDescription(clonDescEl, clonDescriptions, this.realIndex);
      },
    },
  });

  const subwaySwiper = new Swiper(".subwaySwiper", {
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { el: ".subwaySwiper .swiper-pagination", clickable: true },
    on: {
      init: function () {
        updateDescription(subwayDescEl, subwayDescriptions, this.realIndex);
      },
      slideChange: function () {
        updateDescription(subwayDescEl, subwayDescriptions, this.realIndex);
      },
      progress: function () {
        for (let i = 0; i < this.slides.length; i++) {
          const slide = this.slides[i];
          const progress = slide.progress;

          const translateX = progress * 50;
          const scale = 1 - Math.min(Math.abs(progress * 0.2), 0.2);
          const opacity = 1 - Math.min(Math.abs(progress), 1);

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
