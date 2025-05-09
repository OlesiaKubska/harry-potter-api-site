document.addEventListener("DOMContentLoaded",()=>{console.log("\uD83E\uDDD9‍♂️ Welcome to the Harry Potter!");let e=document.querySelector(".hero__btn"),t=document.getElementById("characters"),r=document.querySelector(".characters-cards"),a=document.querySelectorAll(".characters__btn"),c=document.querySelector(".characters-filters"),s=c.querySelectorAll(".characters-filters__btn"),i=async()=>{try{let e=await fetch("https://hp-api.onrender.com/api/characters");return await e.json()}catch(e){return console.error("Error fetching characters:",e),[]}},d=async e=>{try{let t=await fetch(`https://hp-api.onrender.com/api/characters/house/${e}`);return await t.json()}catch(t){return console.error(`Error fetching characters for ${e}:`,t),[]}},n=e=>{r.innerHTML="",e.forEach(e=>{let t=document.createElement("div");t.classList.add("characters-cards__card"),t.innerHTML=`
        <div class="characters-cards__image-wrap">
          <img src="${e.image}" alt="${e.name}" class="characters-cards__image" />
          <div class="characters-cards__gradient">
            <div class="characters-cards__info">
              <h3 class="characters-cards__name">${e.name}</h3>
              <p class="characters-cards__desc">${e.alternate_names?.[0]||""}</p>
              <p class="characters-cards__house">${e.house}</p>
              <p class="characters-cards__dob">${e.dateOfBirth}</p>
              <button type="button" class="characters-cards__button">
                \u{411}\u{456}\u{43B}\u{44C}\u{448}\u{435} \u{456}\u{43D}\u{444}\u{43E}\u{440}\u{43C}\u{430}\u{446}\u{456}\u{457}
                <svg class="characters-cards__icon" width="30" height="20" viewBox="0 0 52 32">
                  <circle cx="12" cy="12" r="12" />
                  <use href="#icon-guidance-up" stroke="currentColor" stroke-width="2" fill="none"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `,r.appendChild(t)})};e.addEventListener("click",()=>{t.classList.remove("hidden"),e.disabled=!0}),a.forEach(e=>{e.addEventListener("click",async()=>{let t=e.getAttribute("data-group"),r=await i(),a=[];"students"===t?(a=r.filter(e=>e.hogwartsStudent),c.classList.add("hidden")):"staff"===t?(a=r.filter(e=>e.hogwartsStaff),c.classList.add("hidden")):"house"===t&&(a=r,c.classList.remove("hidden")),n(a)})}),s.forEach(e=>{e.addEventListener("click",async()=>{let t=e.getAttribute("data-house");t&&(n(await d(t)),s.forEach(e=>e.closest(".characters-filters__item")?.classList.remove("characters-filters__item--active")),e.closest(".characters-filters__item")?.classList.add("characters-filters__item--active"))})})});
//# sourceMappingURL=harry-potter-api-site.15c23253.js.map
