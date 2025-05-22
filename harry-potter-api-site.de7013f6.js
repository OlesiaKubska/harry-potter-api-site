document.addEventListener("DOMContentLoaded",()=>{console.log("\uD83E\uDDD9‍♂️ Welcome to the Harry Potter!");let e=document.querySelector(".hero__btn"),t=document.getElementById("characters"),r=document.querySelector(".characters-cards"),a=document.querySelectorAll(".characters__btn"),s=document.querySelector(".characters-filters"),n=s.querySelectorAll(".characters-filters__btn"),c=document.getElementById("characters-title"),o=document.getElementById("character-modal"),d=document.getElementById("modal-body"),i=document.querySelector(".modal__content"),l=document.getElementById("load-more-btn"),h=async()=>{try{let e=await fetch("https://hp-api.onrender.com/api/characters");return await e.json()}catch(e){return console.error("Error fetching characters:",e),[]}},u=async e=>{try{let t=await fetch(`https://hp-api.onrender.com/api/characters/house/${e}`);return await t.json()}catch(t){return console.error(`Error fetching characters for ${e}:`,t),[]}},g=e=>{c.textContent=({students:"Студенти Гоґвортсу",staff:"Співробітники Гоґвортсу",house:"Персонажі в певному будинку"})[e]||"",c.classList.remove("visually-hidden")},p=[],m=0,_=()=>{f(p.slice(m,m+8),!0),(m+=8)>=p.length&&l.classList.add("hidden")},f=(e,t=!1)=>{t||(r.innerHTML=""),e.forEach(e=>{let t=document.createElement("div");t.classList.add("characters-cards__card");let a=e.image||"./src/images/characters/placeholder.jpg";t.innerHTML=`
        <div class="characters-cards__image-wrap">
          <img src="${a}" alt="${e.name}" class="characters-cards__image" />
          <div class="characters-cards__gradient">
            <div class="characters-cards__info">
              <h3 class="characters-cards__name">${e.name}</h3>
              <p class="characters-cards__desc">${e.alternate_names?.[0]||""}</p>
              <p class="characters-cards__house">${e.house}</p>
              <p class="characters-cards__dob">${e.dateOfBirth}</p>
              <button type="button" class="characters-cards__button" data-character='${JSON.stringify(e).replace(/'/g,"&#39;")}'>
                \u{411}\u{456}\u{43B}\u{44C}\u{448}\u{435} \u{456}\u{43D}\u{444}\u{43E}\u{440}\u{43C}\u{430}\u{446}\u{456}\u{457}
                <span class="characters-cards__span">
                  <span class="circle"></span>
                  <svg class="arrow-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M2 12h28M24 6l6 6-6 6" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span> 
              </button>
            </div>
          </div>
        </div>
      `,r.appendChild(t)})};e.addEventListener("click",()=>{t.classList.remove("hidden"),e.disabled=!0}),a.forEach(e=>{e.addEventListener("click",async()=>{let t=e.getAttribute("data-group"),a=await h();if(!t)return;g(t),s.classList.toggle("hidden","house"!==t);let n=[];"students"===t?(n=a.filter(e=>e.hogwartsStudent),s.classList.add("hidden")):"staff"===t?(n=a.filter(e=>e.hogwartsStaff),s.classList.add("hidden")):"house"===t&&(n=a,s.classList.remove("hidden")),f(n),m=0,p=n,r.innerHTML="",_(),l.classList.toggle("hidden",p.length<=8)})}),n.forEach(e=>{e.addEventListener("click",async()=>{let t=e.getAttribute("data-house");t&&(f(await u(t)),n.forEach(e=>e.closest(".characters-filters__item")?.classList.remove("characters-filters__item--active")),e.closest(".characters-filters__item")?.classList.add("characters-filters__item--active"))})}),o.addEventListener("click",e=>{i.contains(e.target)||o.classList.add("hidden")}),r.addEventListener("click",e=>{let t=e.target.closest(".characters-cards__button");if(!t)return;let r=t.getAttribute("data-character");if(!r)return;let a=JSON.parse(r);d.innerHTML=`
    <p><strong>Name:</strong> ${a.name}</p>
    <p><strong>Alternate names:</strong> ${a.alternate_names?.join(", ")||"None"}</p>
    <p><strong>Species:</strong> ${a.species||"Unknown"}</p>
    <p><strong>Gender:</strong> ${a.gender||"Unknown"}</p>
    <p><strong>House:</strong> ${a.house||"Unknown"}</p>
    <p><strong>Date of birth:</strong> ${a.dateOfBirth||"Unknown"}</p>
    <p><strong>Year of birth:</strong> ${a.yearOfBirth||"Unknown"}</p>
    <p><strong>Wizard:</strong> ${a.wizard?"True":"False"}</p>
    <p><strong>Ancestry:</strong> ${a.ancestry||"Unknown"}</p>
    <p><strong>Eye colour:</strong> ${a.eyeColour||"Unknown"}</p>
    <p><strong>Hair colour:</strong> ${a.hairColour||"Unknown"}</p>
    <p><strong>Wand:</strong> ${a.wand?.wood||"-"}, ${a.wand?.core||"-"}, length: ${a.wand?.length||"-"}</p>
    <p><strong>Patronus:</strong> ${a.patronus||"None"}</p>
    <p><strong>Hogwarts student:</strong> ${a.hogwartsStudent?"True":"False"}</p>
    <p><strong>Hogwarts staff:</strong> ${a.hogwartsStaff?"True":"False"}</p>
    <p><strong>Actor:</strong> ${a.actor||"Unknown"}</p>
    <p><strong>Alive:</strong> ${a.alive?"True":"False"}</p>
  `,o.classList.remove("hidden")}),l.addEventListener("click",()=>{_()})});
//# sourceMappingURL=harry-potter-api-site.de7013f6.js.map
