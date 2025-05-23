import '../scss/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🧙‍♂️ Welcome to the Harry Potter!');

  const btn = document.querySelector('.hero__btn') as HTMLButtonElement;
  const charactersSection = document.getElementById('characters') as HTMLElement;
  const charactersContainer = document.querySelector('.characters-cards') as HTMLElement;
  const filterButtons = document.querySelectorAll('.characters__btn');
  const houseFilterContainer = document.querySelector('.characters-filters') as HTMLElement;
  const houseFilterButtons = houseFilterContainer.querySelectorAll('.characters-filters__btn');
  const charactersTitle = document.getElementById('characters-title') as HTMLElement;
  const modal = document.getElementById('character-modal') as HTMLElement;
  const modalBody = document.getElementById('modal-body') as HTMLElement;
  const modalContent = document.querySelector('.modal__content') as HTMLElement;
  const loadMoreBtn = document.getElementById('load-more-btn') as HTMLButtonElement;

  interface Character {
    name: string;
    image: string;
    house: string;
    hogwartsStudent: boolean;
    hogwartsStaff: boolean;
    dateOfBirth: string;
    alternate_names: string[];
  }

  const fetchCharacters = async (): Promise<Character[]> => {
    try {
      const response = await fetch('https://hp-api.onrender.com/api/characters');
      return await response.json();
    } catch (error) {
      console.error('Error fetching characters:', error);
      return [];
    }
  };

  const fetchByHouse = async (house: string): Promise<Character[]> => {
    try {
      const response = await fetch(`https://hp-api.onrender.com/api/characters/house/${house}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching characters for ${house}:`, error);
      return [];
    }
  };

  const updateTitle = (group: string) => {
    const titles: Record<string, string> = {
      students: 'Студенти Гоґвортсу',
      staff: 'Співробітники Гоґвортсу',
      house: 'Персонажі в певному будинку',
    };
    charactersTitle.textContent = titles[group] || '';
    charactersTitle.classList.remove('visually-hidden');
  };

  let allCharacters: Character[] = [];
  let displayedCount = 0;
  const batchSize = 8;

  const loadMoreCharacters = () => {
    const nextBatch = allCharacters.slice(displayedCount, displayedCount + batchSize);
    renderCharacters(nextBatch, true);
    displayedCount += batchSize;

    if (displayedCount >= allCharacters.length) {
      loadMoreBtn.classList.add('hidden');
    }
  };

  const renderCharacters = (characters: Character[], append = false) => {
    if (!append) {
      charactersContainer.innerHTML = '';
    }

    characters.forEach((character) => {
      const card = document.createElement('div');
      card.classList.add('characters-cards__card');

      card.innerHTML = `
        <div class="characters-cards__image-wrap">
          <img src="${character.image}" alt="${character.name}" class="characters-cards__image" />
          <div class="characters-cards__gradient">
            <div class="characters-cards__info">
              <h3 class="characters-cards__name">${character.name}</h3>
              <p class="characters-cards__desc">${character.alternate_names?.[0] || ''}</p>
              <p class="characters-cards__house">${character.house}</p>
              <p class="characters-cards__dob">${character.dateOfBirth}</p>
              <button type="button" class="characters-cards__button" data-character='${JSON.stringify(character).replace(/'/g, "&#39;")}'>
                Більше інформації
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
      `;
      charactersContainer.appendChild(card);
    });
  };

  btn.addEventListener('click', () => {
    charactersSection.classList.remove('hidden');
    btn.disabled = true;
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const group = button.getAttribute('data-group');
      const characters = await fetchCharacters();

      if (!group) return;
      updateTitle(group);

      houseFilterContainer.classList.toggle('hidden', group !== 'house');

      let filteredCharacters: Character[] = [];

      if (group === 'students') {
        filteredCharacters = characters.filter((char) => char.hogwartsStudent);
        houseFilterContainer.classList.add('hidden');
      } else if (group === 'staff') {
        filteredCharacters = characters.filter((char) => char.hogwartsStaff);
        houseFilterContainer.classList.add('hidden');
      } else if (group === 'house') {
        filteredCharacters = characters;
        houseFilterContainer.classList.remove('hidden');
      }

      renderCharacters(filteredCharacters);

      displayedCount = 0;
      allCharacters = filteredCharacters;
      charactersContainer.innerHTML = '';
      loadMoreCharacters();
      loadMoreBtn.classList.toggle('hidden', allCharacters.length <= batchSize);
    });
  });

  houseFilterButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const house = btn.getAttribute('data-house');
      if (!house) return;

      const characters = await fetchByHouse(house);
      renderCharacters(characters);

      houseFilterButtons.forEach((b) =>
        b.closest('.characters-filters__item')?.classList.remove('characters-filters__item--active')
      );

      btn.closest('.characters-filters__item')?.classList.add('characters-filters__item--active');
    });
  });

  modal.addEventListener('click', (event: MouseEvent) => {
    if (!modalContent.contains(event.target as Node)) {
      modal.classList.add('hidden');
    }
  });

  charactersContainer.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.characters-cards__button') as HTMLButtonElement;
  if (!btn) return;

  const characterData = btn.getAttribute('data-character');
  if (!characterData) return;

  const character = JSON.parse(characterData);

  modalBody.innerHTML = `
    <p><strong>Name:</strong> ${character.name}</p>
    <p><strong>Alternate names:</strong> ${character.alternate_names?.join(', ') || 'None'}</p>
    <p><strong>Species:</strong> ${character.species || 'Unknown'}</p>
    <p><strong>Gender:</strong> ${character.gender || 'Unknown'}</p>
    <p><strong>House:</strong> ${character.house || 'Unknown'}</p>
    <p><strong>Date of birth:</strong> ${character.dateOfBirth || 'Unknown'}</p>
    <p><strong>Year of birth:</strong> ${character.yearOfBirth || 'Unknown'}</p>
    <p><strong>Wizard:</strong> ${character.wizard ? 'True' : 'False'}</p>
    <p><strong>Ancestry:</strong> ${character.ancestry || 'Unknown'}</p>
    <p><strong>Eye colour:</strong> ${character.eyeColour || 'Unknown'}</p>
    <p><strong>Hair colour:</strong> ${character.hairColour || 'Unknown'}</p>
    <p><strong>Wand:</strong> ${character.wand?.wood || '-'}, ${character.wand?.core || '-'}, length: ${character.wand?.length || '-'}</p>
    <p><strong>Patronus:</strong> ${character.patronus || 'None'}</p>
    <p><strong>Hogwarts student:</strong> ${character.hogwartsStudent ? 'True' : 'False'}</p>
    <p><strong>Hogwarts staff:</strong> ${character.hogwartsStaff ? 'True' : 'False'}</p>
    <p><strong>Actor:</strong> ${character.actor || 'Unknown'}</p>
    <p><strong>Alive:</strong> ${character.alive ? 'True' : 'False'}</p>
  `;

  modal.classList.remove('hidden');
    }
  );

  loadMoreBtn.addEventListener('click', () => {
    loadMoreCharacters();
  });
});
