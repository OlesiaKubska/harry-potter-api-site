document.addEventListener("DOMContentLoaded",()=>{console.log("\uD83E\uDDD9‍♂️ Welcome to the Harry Potter!");let e=document.querySelector(".hero__btn"),t=document.getElementById("characters"),r=document.querySelector(".characters-cards"),a=document.querySelectorAll(".characters__btn"),c=async()=>{try{let e=await fetch("https://hp-api.onrender.com/api/characters");return await e.json()}catch(e){return console.error("Error fetching characters:",e),[]}},s=e=>{r.innerHTML="",e.forEach(e=>{let t=document.createElement("div");t.classList.add("characters-cards__card"),t.innerHTML=`
            <img src="${e.image}" alt="${e.name}" class="characters-cards__image" />
            <div class="characters-cards__info">
              <h3>${e.name}</h3>
              <p>${e.house}</p>
            </div>
          `,r.appendChild(t)})};e.addEventListener("click",()=>{t.classList.remove("hidden"),e.disabled=!0}),a.forEach(e=>{e.addEventListener("click",async()=>{let t=e.getAttribute("data-group"),r=await c(),a=[];"students"===t?a=r.filter(e=>e.hogwartsStudent):"staff"===t?a=r.filter(e=>e.hogwartsStaff):"house"===t&&(a=r.filter(e=>"Gryffindor"===e.house)),s(a)})})});
//# sourceMappingURL=harry-potter-api-site.396fdc7d.js.map
