import gsap from "gsap";
import Swiper , {pagination,navigation} from 'swiper';
import { reviews } from "./data";
import imagesLoaded from "imagesloaded";
import Scrollbar, { ScrollbarPlugin } from 'smooth-scrollbar';

class DisableScrollPlugin extends ScrollbarPlugin {
    static pluginName = 'disableScroll';
  
    static defaultOptions = {
      direction: '',
    };
  
    transformDelta(delta) {
      if (this.options.direction) {
        delta[this.options.direction] = 0;
      }
  
      return { ...delta };
    }
  }
  
  // load the plugin
Scrollbar.use(DisableScrollPlugin);

class AnchorPlugin extends ScrollbarPlugin {
    static pluginName = 'anchor';
  
    onHashChange = () => {
      this.jumpToHash(window.location.hash);
    };
  
    onClick = (event) => {
      const { target } = event;
  
      if (target.tagName !== 'A') {
        return;
      }
  
      const hash = target.getAttribute('href');
  
      if (!hash || hash.charAt(0) !== '#') {
        return;
      }
  
      this.jumpToHash(hash);
    };
  
    jumpToHash = (hash) => {
      const { scrollbar } = this;
  
      if (!hash) {
        return;
      }    
  
      // reset scrollTop
      scrollbar.containerEl.scrollTop = 0;
  
      scrollbar.scrollIntoView(document.querySelector(hash));
    };
  
    onInit() {
      this.jumpToHash(window.location.hash);
  
      window.addEventListener('hashchange', this.onHashChange);
  
      this.scrollbar.contentEl.addEventListener('click', this.onClick);
    }
  
    onDestory() {
      window.removeEventListener('hashchange', this.onHashChange);
  
      this.scrollbar.contentEl.removeEventListener('click', this.onClick);
    }
  }
  
  // usage
  Scrollbar.use(AnchorPlugin);

import { Navigation, Pagination } from "swiper/modules";
const bar= document.querySelector(".loading__bar__inner")
const counter_num = document.querySelector(".loading__counter__number");
let c=0;
let barInterval = setInterval(()=> {
    bar.style.width = c + "%";
    counter_num.innerText = c + "%";
    c+=4;
if(c===104){
    clearInterval(barInterval);
    gsap.to('.loading__bar' , {
        duration: 5,
        rotate:"90deg",
        left:"1000%",
    });
    gsap.to('.loading__text,.loading__counter' , {
        duration: 0.5,
        opacity : 0,
    });  
    gsap.to('.loading__box' , {
        duration: 1,
        height : "500px",
        borderRadius : "50%",
    });
    gsap.to('.loading__svg' , {
        duration: 100,
        opacity:1,
        rotate:"360deg",
    });
    gsap.to('.loading__box' , {
       delay: 2,
       duration: 1,
       border: "none",
    });   
    gsap.to('.loading__box' , {
        delay: 2,
        duration: 1,
        border: "none",
     });    
     imagesLoaded(document.querySelectorAll('img'),()=>{
        gsap.to('.loading' , {
            delay: 2,
            duration: 1,
            zIndex:1,
            background: "transparent",
            opacity: 0.5,
         });    
         gsap.to('.loading__svg' , {
            delay: 2,
            duration: 100,
            rotate:"360deg",
    
         });    
         gsap.to('header',{
            duration:1,
            delay:2,
            top:"0",
         });
         gsap.to('.socials',{
            duration:1,
            delay:2.5,
            bottom :"10rem",
         });
         gsap.to('.scrollDown',{
            duration:1,
            delay:3,
            bottom :"3rem",
         });
         setTimeout(() => {
            let options  ={
                damping:0.2,
                alwaysShowTracks: true,
                plugins: {
                    disableScroll: {
                      direction: 'x',
                    },
                  },
             }
             let pageSmoothScroll = Scrollbar.init(document.body,options);
             pageSmoothScroll.track.xAxis.element.remove()
         },2000);

     });
     
}
}, 5);

//reviews swiper
Swiper.use([Pagination,Navigation])
var swiper = new Swiper(".swiper", {
      slidesPerView: 1,
      spaceBetween: 80,
      
      breakpoints: {
        750: {
            slidesPerView: 2,
        },
        1200:{
            slidesPerView: 3,
        },
        1900:{
            slidesPerView: 4,
        },
      },
      pagination: {
        el: ".swiper-pagination",
        type:"bullets",
        clickable: true,
        
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
const swiper_container= document.querySelector(".swiper-wrapper");
reviews.map((review)=>{
    let template =  `
               <div class="swiper-slide"><div class="review"><svg width="100%" height="100%" viewBox="0 0 33 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.999961 20.2398C0.91996 19.0398 0.959962 17.6398 1.11996 16.0398C1.35996 14.3598 2.27997 11.9198 3.87996 8.71984C5.55996 5.43985 7.95996 2.59983 11.08 0.199829H11.68C11.52 0.359831 11.28 0.559832 10.96 0.799829C10.72 0.959831 10.24 1.39983 9.51996 2.11983C8.79996 2.83983 8.15997 3.55984 7.59996 4.27984C7.03995 4.91983 6.55995 5.71984 6.15996 6.67984C5.75997 7.55982 5.55996 8.43982 5.55996 9.31984C5.63997 10.1198 6.03996 10.9598 6.75996 11.8398C7.47996 12.6398 8.55996 13.3598 9.99996 13.9998C12.8 15.1198 14.2 17.1598 14.2 20.1198C14.2 21.7998 13.5199 23.3198 12.16 24.6798C10.88 25.9598 9.31995 26.5998 7.47996 26.5998C5.79996 26.5998 4.27995 25.9598 2.91996 24.6798C1.63995 23.3998 0.999961 21.9198 0.999961 20.2398ZM19.36 20.2398C19.28 19.0398 19.32 17.6398 19.48 16.0398C19.72 14.3598 20.64 11.9198 22.24 8.71984C23.92 5.43985 26.32 2.59983 29.44 0.199829H30.04C29.8801 0.359831 29.6401 0.559832 29.32 0.799829C29.08 0.959831 28.6 1.39983 27.88 2.11983C27.16 2.83983 26.52 3.55984 25.96 4.27984C25.48 4.91983 25 5.71984 24.52 6.67984C24.12 7.55982 23.92 8.43982 23.92 9.31984C24 10.1198 24.4 10.9598 25.12 11.8398C25.84 12.6398 26.92 13.3598 28.36 13.9998C31.1599 15.0398 32.56 17.0798 32.56 20.1198C32.56 21.7998 31.8799 23.3198 30.52 24.6798C29.2399 25.9598 27.68 26.5998 25.84 26.5998C24.16 26.5998 22.64 25.9598 21.28 24.6798C20 23.3998 19.36 21.9198 19.36 20.2398Z"></path></svg><div class="review__card"><div class="review__topborder"></div><div class="review__text"><span>${review.description.substring(0, 1)}</span>${review.description.substring(1, review.description.length)}</div><img src="${review.image}" alt="" class="review__img"><div class="review__profile"><span>${review.name}</span></div></div></div></div> `;
    swiper_container.innerHTML += template;
});
    
const questions = [...document.querySelectorAll(".question")];
questions.map((question)=>{
    let q_text = question.querySelector("h3");
    q_text.addEventListener("click", ()=>{
        questions.filter((q) => q !==question).map((q)=>q.classList.remove("open"));
        question.classList.toggle("open");
    });
});
