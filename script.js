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

gsap.utils.toArray('.col').forEach(image=>{
  gsap.fromTo(image,{
    opacity:.3,
    x:0
  },{
    opacity:1,
    x:-50,
    scrollTrigger:{
      trigger:image,
      start:"-50%",
      stagger:{
        amount:.4
      }
    }
  })
})

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

// FORMULARIO

const $form = document.querySelector('#form')
const $buttonMailto = document.querySelector('#trucazo')

  $form.addEventListener('submit', handleSubmit)
  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(this)
    $buttonMailto.setAttribute('href', `mailto:muracciole.al@gmail.com?subject=${form.get('name')}${form.get('email')}&body=${form.get('message')}`)
    $buttonMailto.click()
  }