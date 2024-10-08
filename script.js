// ANIMACIONES

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  toggleActions:"play none none reverse"
})

gsap.to('.img-container',{
  scale:52,
  ease:"ease",
  scrollTrigger:{
    trigger:'.video-section',
    scrub:1,
    start:"top top",
    end:"bottom",
    pin:true
  }
});
gsap.to('.right' ,{
  autoAlpha:0,
  x:500,
  duration:1.5,
  scrollTrigger:{
    start:1
  }
})
gsap.to('.left' ,{
  autoAlpha:0,
  x:-500,
  duration:1.5,
  scrollTrigger:{
    start:1
  }
})
gsap.to('.txt-bottom',{
  autoAlpha:0,
  letterSpacing:-10,
  duration:2,
  scrollTrigger:{
    start:2
  }
})

const tl = gsap.timeline();

tl.from('.left-side div',{
  y:150,
  opacity:0,
  stagger:{
    amount:.4
  },
  delay:.5
}).from('.right-side',{opacity:0,duration:2},.5)
.to('.wrapper' ,{x:-window.innerWidth})

ScrollTrigger.create({
  animation:tl,
  trigger:'.wrapper',
  start:"top top",
  end:"+=600",
  scrub:3,
  pin:true,
  ease:"ease"
})

// Ejecutar código solo en pantallas de escritorio
if (window.innerWidth > 1024) {
  gsap.utils.toArray('.col').forEach(image=>{
    gsap.fromTo(image,{
      opacity:.3,
      x:20
    },{
      opacity:1,
      x:-10,
      scrollTrigger:{
        trigger:image,
        start:"-50%",
        stagger:{
          amount:.4
        }
      }
    })
  })
} else {
  gsap.utils.toArray('.col').forEach(image=>{
    gsap.fromTo(image,{
      opacity:.3,
      x:0
    },{
      opacity:1,
      x:0,
      scrollTrigger:{
        trigger:image,
        start:"-50%",
        stagger:{
          amount:.4
        }
      }
    })
  })
}

const timeline = gsap.timeline();

timeline.from('.title span' ,{
  y:150,
  skewY:7,
  duration:3
}).from('.txt-bottom',{
  letterSpacing:-10,
  opacity:0,
  duration:3
})

// Navbar responsive
const burguer = document.querySelector('.burguer');
  const menu = document.querySelector('.nav-menu-mobile div:nth-child(2)');

  burguer.addEventListener('click', e=> {
      burguer.classList.toggle('active');
      menu.classList.toggle('open');
  })

// Slider Proyects
  const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      0: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }

    }
  });
