import '../scss/main.scss';

document.addEventListener('DOMContentLoaded', () => {
    console.log('🧙‍♂️ Welcome to the Harry Potter!');

    const btn = document.querySelector('.hero__btn') as HTMLButtonElement;
    const charactersSection = document.getElementById('characters') as HTMLElement;
    const charactersContainer = document.querySelector('.characters-cards') as HTMLElement;
    const filterButtons = document.querySelectorAll('.characters__btn');

    interface Character {
        name: string;
        image: string;
        house: string;
        hogwartsStudent: boolean;
        hogwartsStaff: boolean;
      }

      const fetchCharacters = async (): Promise<Character[]> => {
        try {
          const response = await fetch('https://hp-api.onrender.com/api/characters');
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching characters:', error);
          return [];
        }
      };

      const renderCharacters = (characters: Character[]) => {
        charactersContainer.innerHTML = '';
        characters.forEach((character) => {
          const card = document.createElement('div');
          card.classList.add('characters-cards__card');
      
          card.innerHTML = `
            <img src="${character.image}" alt="${character.name}" class="characters-cards__image" />
            <div class="characters-cards__info">
              <h3>${character.name}</h3>
              <p>${character.house}</p>
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
      
          let filteredCharacters: Character[] = [];
      
          if (group === 'students') {
            filteredCharacters = characters.filter((char) => char.hogwartsStudent);
          } else if (group === 'staff') {
            filteredCharacters = characters.filter((char) => char.hogwartsStaff);
          } else if (group === 'house') {
            // Assuming you want to filter by Gryffindor for this example
            filteredCharacters = characters.filter((char) => char.house === 'Gryffindor');
          }
      
          renderCharacters(filteredCharacters);
        });
      });
      
});