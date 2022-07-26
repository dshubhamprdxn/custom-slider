class SliderClip {
  constructor(el) {
    this.el = el;
    this.Slides = Array.from(this.el.querySelectorAll('li'));
    this.Nav = Array.from(this.el.querySelectorAll('nav a'));
    this.totalSlides = this.Slides.length;
    this.current = 0;
    this.autoPlay = true; //true or false
    this.timeTrans = 3000; //transition time in milliseconds
    this.IndexElements = [];
    this.prevActive = 0;
    for (let i = 0; i < this.totalSlides; i++) {
      this.IndexElements.push(i);
    }
    this.setCurret();
    this.initEvents();
  }

  setCurret() {
    this.Slides[this.current].classList.add('current');
    this.Nav[this.current].classList.add('current_dot');
  }

  initEvents() {
    const self = this;
    // self.autoPlay = false;
    this.Nav.forEach(dot => {
      dot.addEventListener('click', ele => {
        ele.preventDefault();
        this.changeSlide(this.Nav.indexOf(dot));
      });
    });
    this.el.addEventListener('mouseenter', () => (self.autoPlay = false));
    this.el.addEventListener('mouseleave', () => (self.autoPlay = true));
    setInterval(function () {
      if (self.autoPlay) {
        self.current =
          self.current < self.Slides.length - 1 ? self.current + 1 : 0;
        self.changeSlide(self.current);
      }
    }, this.timeTrans);
  }

  changeSlide(index) {
    this.Nav.forEach(allDot => allDot.classList.remove('current_dot'));
    this.Slides.forEach(allSlides =>
      allSlides.classList.remove('prev', 'current', 'before-current')
    );

    this.Slides[this.prevActive].classList.add('prev');
    this.prevActive = index;
    const prevElements = this.IndexElements.filter(value => value < index);
    // console.log(prevElements);
    // prevElements.forEach(indexPrevEle =>
    //   this.Slides[indexPrevEle].classList.add('prev')
    // );
    // prevElements.length == 0 ? this.Slides[this.totalSlides-1].classList.add('prev') : null;
    this.Slides[index].classList.add('current');
    // index != 0
    //   ? this.Slides[index - 1].classList.add('before-current')
    //   : this.Slides[this.totalSlides - 1].classList.add('before-current');
    this.Nav[index].classList.add('current_dot');
  }
}

const slider = new SliderClip(document.querySelector('.slider'));
