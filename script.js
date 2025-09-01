// carousel script with autoplay
document.querySelectorAll('[data-carousel]').forEach(initCarousel);
function initCarousel(root){
  const track = root.querySelector('.carousel__track');
  if(!track) return;
  const slides = Array.from(root.querySelectorAll('.carousel__slide'));
  const prev = root.querySelector('.carousel__btn.prev');
  const next = root.querySelector('.carousel__btn.next');
  const dotsWrap = root.querySelector('.carousel__dots');
  let index = 0;

  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Ir para banner ' + (i+1));
    dotsWrap.appendChild(b);
    b.addEventListener('click', () => go(i));
  });

  function go(i){
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index*100}%)`;
    root.querySelectorAll('.carousel__dots button').forEach((d,di)=>{
      d.classList.toggle('is-active', di===index);
    });
  }
  prev && prev.addEventListener('click', ()=> go(index-1));
  next && next.addEventListener('click', ()=> go(index+1));

  let timer = setInterval(()=>go(index+1), 5000);
  root.addEventListener('mouseenter', () => clearInterval(timer));
  root.addEventListener('mouseleave', () => timer = setInterval(()=>go(index+1), 5000));

  go(0);
}
