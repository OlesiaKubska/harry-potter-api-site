document.addEventListener("DOMContentLoaded",()=>{console.log("\uD83E\uDDD9‍♂️ Welcome to the Harry Potter!");let t=document.querySelector(".hero__btn"),e=document.getElementById("characters"),r=document.querySelector(".characters-cards"),s=document.querySelectorAll(".characters__btn"),a=document.querySelector(".characters-filters"),n=a.querySelectorAll(".characters-filters__btn"),c=document.getElementById("characters-title"),o=document.getElementById("character-modal"),d=document.getElementById("modal-body"),i=document.querySelector(".modal__content"),l=document.getElementById("load-more-btn"),h=async()=>{try{let t=await fetch("https://hp-api.onrender.com/api/characters");return await t.json()}catch(t){return console.error("Error fetching characters:",t),[]}},u=async t=>{try{let e=await fetch(`https://hp-api.onrender.com/api/characters/house/${t}`);return await e.json()}catch(e){return console.error(`Error fetching characters for ${t}:`,e),[]}},g=t=>{c.textContent=({students:"Студенти Гоґвортсу",staff:"Співробітники Гоґвортсу",house:"Персонажі в певному будинку"})[t]||"",c.classList.remove("visually-hidden")},p=[],m=0,_=()=>{f(p.slice(m,m+8),!0),(m+=8)>=p.length&&l.classList.add("hidden")},f=(t,e=!1)=>{e||(r.innerHTML=""),t.forEach(t=>{let e=document.createElement("div");e.classList.add("characters-cards__card"),e.innerHTML=`
        <div class="characters-cards__image-wrap">
          <img src="${t.image}" alt="${t.name}" class="characters-cards__image" />
          <div class="characters-cards__gradient">
            <div class="characters-cards__info">
              <h3 class="characters-cards__name">${t.name}</h3>
              <p class="characters-cards__desc">${t.alternate_names?.[0]||""}</p>
              <p class="characters-cards__house">${t.house}</p>
              <p class="characters-cards__dob">${t.dateOfBirth}</p>
              <button type="button" class="characters-cards__button" data-character='${JSON.stringify(t).replace(/'/g,"&#39;")}'>
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
      `,r.appendChild(e)})};t.addEventListener("click",()=>{e.classList.remove("hidden"),t.disabled=!0}),s.forEach(t=>{t.addEventListener("click",async()=>{let e=t.getAttribute("data-group"),s=await h();if(!e)return;g(e),a.classList.toggle("hidden","house"!==e);let n=[];"students"===e?(n=s.filter(t=>t.hogwartsStudent),a.classList.add("hidden")):"staff"===e?(n=s.filter(t=>t.hogwartsStaff),a.classList.add("hidden")):"house"===e&&(n=s,a.classList.remove("hidden")),f(n),m=0,p=n,r.innerHTML="",_(),l.classList.toggle("hidden",p.length<=8)})}),n.forEach(t=>{t.addEventListener("click",async()=>{let e=t.getAttribute("data-house");e&&(f(await u(e)),n.forEach(t=>t.closest(".characters-filters__item")?.classList.remove("characters-filters__item--active")),t.closest(".characters-filters__item")?.classList.add("characters-filters__item--active"))})}),o.addEventListener("click",t=>{i.contains(t.target)||o.classList.add("hidden")}),r.addEventListener("click",t=>{let e=t.target.closest(".characters-cards__button");if(!e)return;let r=e.getAttribute("data-character");if(!r)return;let s=JSON.parse(r);d.innerHTML=`
    <p><strong>Name:</strong> ${s.name}</p>
    <p><strong>Alternate names:</strong> ${s.alternate_names?.join(", ")||"None"}</p>
    <p><strong>Species:</strong> ${s.species||"Unknown"}</p>
    <p><strong>Gender:</strong> ${s.gender||"Unknown"}</p>
    <p><strong>House:</strong> ${s.house||"Unknown"}</p>
    <p><strong>Date of birth:</strong> ${s.dateOfBirth||"Unknown"}</p>
    <p><strong>Year of birth:</strong> ${s.yearOfBirth||"Unknown"}</p>
    <p><strong>Wizard:</strong> ${s.wizard?"True":"False"}</p>
    <p><strong>Ancestry:</strong> ${s.ancestry||"Unknown"}</p>
    <p><strong>Eye colour:</strong> ${s.eyeColour||"Unknown"}</p>
    <p><strong>Hair colour:</strong> ${s.hairColour||"Unknown"}</p>
    <p><strong>Wand:</strong> ${s.wand?.wood||"-"}, ${s.wand?.core||"-"}, length: ${s.wand?.length||"-"}</p>
    <p><strong>Patronus:</strong> ${s.patronus||"None"}</p>
    <p><strong>Hogwarts student:</strong> ${s.hogwartsStudent?"True":"False"}</p>
    <p><strong>Hogwarts staff:</strong> ${s.hogwartsStaff?"True":"False"}</p>
    <p><strong>Actor:</strong> ${s.actor||"Unknown"}</p>
    <p><strong>Alive:</strong> ${s.alive?"True":"False"}</p>
  `,o.classList.remove("hidden")}),l.addEventListener("click",()=>{_()})});
//# sourceMappingURL=harry-potter-api-site.2c55faf6.js.map
