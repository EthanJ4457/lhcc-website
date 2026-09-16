// Added: select the Pokémon form and collection list.
const pokemonForm = document.querySelector("#pokemon-form");
const pokemonList = document.querySelector(".pokemon-list");
const searchInput = document.getElementById("search");
const filterStatusSelect = document.getElementById("filter-status");
const sortSelect = document.getElementById("sort-pokemon");
const dexSearchInput = document.getElementById("dex-search");
const dexSearchButton = document.getElementById("dex-search-btn");
const dexResult = document.getElementById("dex-result");

// Added: map the new status values to friendly labels for the collection.
const statusLabels = {
  caught: "Caught",
  favorite: "Favorite",
  wishlist: "Wishlist"
};

// Added: build a larger lookup list so Pokémon names can auto-match to their sprite and type.
const pokemonData = [
  { name: "Bulbasaur", type: "Grass/Poison", dex: 1 },
  { name: "Ivysaur", type: "Grass/Poison", dex: 2 },
  { name: "Venusaur", type: "Grass/Poison", dex: 3 },
  { name: "Charmander", type: "Fire", dex: 4 },
  { name: "Charmeleon", type: "Fire", dex: 5 },
  { name: "Charizard", type: "Fire/Flying", dex: 6 },
  { name: "Squirtle", type: "Water", dex: 7 },
  { name: "Wartortle", type: "Water", dex: 8 },
  { name: "Blastoise", type: "Water", dex: 9 },
  { name: "Caterpie", type: "Bug", dex: 10 },
  { name: "Metapod", type: "Bug", dex: 11 },
  { name: "Butterfree", type: "Bug/Flying", dex: 12 },
  { name: "Weedle", type: "Bug/Poison", dex: 13 },
  { name: "Kakuna", type: "Bug/Poison", dex: 14 },
  { name: "Beedrill", type: "Bug/Poison", dex: 15 },
  { name: "Pidgey", type: "Normal/Flying", dex: 16 },
  { name: "Pidgeotto", type: "Normal/Flying", dex: 17 },
  { name: "Pidgeot", type: "Normal/Flying", dex: 18 },
  { name: "Rattata", type: "Normal", dex: 19 },
  { name: "Raticate", type: "Normal", dex: 20 },
  { name: "Spearow", type: "Normal/Flying", dex: 21 },
  { name: "Fearow", type: "Normal/Flying", dex: 22 },
  { name: "Ekans", type: "Poison", dex: 23 },
  { name: "Arbok", type: "Poison", dex: 24 },
  { name: "Pikachu", type: "Electric", dex: 25 },
  { name: "Raichu", type: "Electric", dex: 26 },
  { name: "Sandshrew", type: "Ground", dex: 27 },
  { name: "Sandslash", type: "Ground", dex: 28 },
  { name: "Nidoran Female", type: "Poison", dex: 29 },
  { name: "Nidorina", type: "Poison", dex: 30 },
  { name: "Nidoqueen", type: "Poison/Ground", dex: 31 },
  { name: "Nidoran Male", type: "Poison", dex: 32 },
  { name: "Nidorino", type: "Poison", dex: 33 },
  { name: "Nidoking", type: "Poison/Ground", dex: 34 },
  { name: "Clefairy", type: "Fairy", dex: 35 },
  { name: "Clefable", type: "Fairy", dex: 36 },
  { name: "Vulpix", type: "Fire", dex: 37 },
  { name: "Ninetales", type: "Fire", dex: 38 },
  { name: "Jigglypuff", type: "Normal/Fairy", dex: 39 },
  { name: "Wigglytuff", type: "Normal/Fairy", dex: 40 },
  { name: "Zubat", type: "Poison/Flying", dex: 41 },
  { name: "Golbat", type: "Poison/Flying", dex: 42 },
  { name: "Oddish", type: "Grass/Poison", dex: 43 },
  { name: "Gloom", type: "Grass/Poison", dex: 44 },
  { name: "Vileplume", type: "Grass/Poison", dex: 45 },
  { name: "Paras", type: "Bug/Grass", dex: 46 },
  { name: "Parasect", type: "Bug/Grass", dex: 47 },
  { name: "Venonat", type: "Bug/Poison", dex: 48 },
  { name: "Venomoth", type: "Bug/Poison", dex: 49 },
  { name: "Diglett", type: "Ground", dex: 50 },
  { name: "Dugtrio", type: "Ground", dex: 51 },
  { name: "Meowth", type: "Normal", dex: 52 },
  { name: "Persian", type: "Normal", dex: 53 },
  { name: "Psyduck", type: "Water", dex: 54 },
  { name: "Golduck", type: "Water", dex: 55 },
  { name: "Mankey", type: "Fighting", dex: 56 },
  { name: "Primeape", type: "Fighting", dex: 57 },
  { name: "Growlithe", type: "Fire", dex: 58 },
  { name: "Arcanine", type: "Fire", dex: 59 },
  { name: "Poliwag", type: "Water", dex: 60 },
  { name: "Poliwhirl", type: "Water", dex: 61 },
  { name: "Poliwrath", type: "Water/Fighting", dex: 62 },
  { name: "Abra", type: "Psychic", dex: 63 },
  { name: "Kadabra", type: "Psychic", dex: 64 },
  { name: "Alakazam", type: "Psychic", dex: 65 },
  { name: "Machop", type: "Fighting", dex: 66 },
  { name: "Machoke", type: "Fighting", dex: 67 },
  { name: "Machamp", type: "Fighting", dex: 68 },
  { name: "Bellsprout", type: "Grass/Poison", dex: 69 },
  { name: "Weepinbell", type: "Grass/Poison", dex: 70 },
  { name: "Victreebel", type: "Grass/Poison", dex: 71 },
  { name: "Tentacool", type: "Water/Poison", dex: 72 },
  { name: "Tentacruel", type: "Water/Poison", dex: 73 },
  { name: "Geodude", type: "Rock/Ground", dex: 74 },
  { name: "Graveler", type: "Rock/Ground", dex: 75 },
  { name: "Golem", type: "Rock/Ground", dex: 76 },
  { name: "Ponyta", type: "Fire", dex: 77 },
  { name: "Rapidash", type: "Fire", dex: 78 },
  { name: "Slowpoke", type: "Water/Psychic", dex: 79 },
  { name: "Slowbro", type: "Water/Psychic", dex: 80 },
  { name: "Magnemite", type: "Electric/Steel", dex: 81 },
  { name: "Magneton", type: "Electric/Steel", dex: 82 },
  { name: "Farfetchd", type: "Normal/Flying", dex: 83 },
  { name: "Doduo", type: "Normal/Flying", dex: 84 },
  { name: "Dodrio", type: "Normal/Flying", dex: 85 },
  { name: "Seel", type: "Water", dex: 86 },
  { name: "Dewgong", type: "Water/Ice", dex: 87 },
  { name: "Grimer", type: "Poison", dex: 88 },
  { name: "Muk", type: "Poison", dex: 89 },
  { name: "Shellder", type: "Water", dex: 90 },
  { name: "Cloyster", type: "Water/Ice", dex: 91 },
  { name: "Gastly", type: "Ghost/Poison", dex: 92 },
  { name: "Haunter", type: "Ghost/Poison", dex: 93 },
  { name: "Gengar", type: "Ghost/Poison", dex: 94 },
  { name: "Onix", type: "Rock/Ground", dex: 95 },
  { name: "Drowzee", type: "Psychic", dex: 96 },
  { name: "Hypno", type: "Psychic", dex: 97 },
  { name: "Krabby", type: "Water", dex: 98 },
  { name: "Kingler", type: "Water", dex: 99 },
  { name: "Voltorb", type: "Electric", dex: 100 },
  { name: "Electrode", type: "Electric", dex: 101 },
  { name: "Exeggcute", type: "Grass/Psychic", dex: 102 },
  { name: "Exeggutor", type: "Grass/Psychic", dex: 103 },
  { name: "Cubone", type: "Ground", dex: 104 },
  { name: "Marowak", type: "Ground", dex: 105 },
  { name: "Hitmonlee", type: "Fighting", dex: 106 },
  { name: "Hitmonchan", type: "Fighting", dex: 107 },
  { name: "Lickitung", type: "Normal", dex: 108 },
  { name: "Koffing", type: "Poison", dex: 109 },
  { name: "Weezing", type: "Poison", dex: 110 },
  { name: "Rhyhorn", type: "Ground/Rock", dex: 111 },
  { name: "Rhydon", type: "Ground/Rock", dex: 112 },
  { name: "Chansey", type: "Normal", dex: 113 },
  { name: "Tangela", type: "Grass", dex: 114 },
  { name: "Kangaskhan", type: "Normal", dex: 115 },
  { name: "Horsea", type: "Water", dex: 116 },
  { name: "Seadra", type: "Water", dex: 117 },
  { name: "Goldeen", type: "Water", dex: 118 },
  { name: "Seaking", type: "Water", dex: 119 },
  { name: "Staryu", type: "Water", dex: 120 },
  { name: "Starmie", type: "Water/Psychic", dex: 121 },
  { name: "Mr Mime", type: "Psychic/Fairy", dex: 122 },
  { name: "Scyther", type: "Bug/Flying", dex: 123 },
  { name: "Jynx", type: "Ice/Psychic", dex: 124 },
  { name: "Electabuzz", type: "Electric", dex: 125 },
  { name: "Magmar", type: "Fire", dex: 126 },
  { name: "Pinsir", type: "Bug", dex: 127 },
  { name: "Tauros", type: "Normal", dex: 128 },
  { name: "Magikarp", type: "Water", dex: 129 },
  { name: "Gyarados", type: "Water/Flying", dex: 130 },
  { name: "Lapras", type: "Water/Ice", dex: 131 },
  { name: "Ditto", type: "Normal", dex: 132 },
  { name: "Eevee", type: "Normal", dex: 133 },
  { name: "Vaporeon", type: "Water", dex: 134 },
  { name: "Jolteon", type: "Electric", dex: 135 },
  { name: "Flareon", type: "Fire", dex: 136 },
  { name: "Porygon", type: "Normal", dex: 137 },
  { name: "Omanyte", type: "Rock/Water", dex: 138 },
  { name: "Omastar", type: "Rock/Water", dex: 139 },
  { name: "Kabuto", type: "Rock/Water", dex: 140 },
  { name: "Kabutops", type: "Rock/Water", dex: 141 },
  { name: "Aerodactyl", type: "Rock/Flying", dex: 142 },
  { name: "Snorlax", type: "Normal", dex: 143 },
  { name: "Articuno", type: "Ice/Flying", dex: 144 },
  { name: "Zapdos", type: "Electric/Flying", dex: 145 },
  { name: "Moltres", type: "Fire/Flying", dex: 146 },
  { name: "Dratini", type: "Dragon", dex: 147 },
  { name: "Dragonair", type: "Dragon", dex: 148 },
  { name: "Dragonite", type: "Dragon/Flying", dex: 149 },
  { name: "Mewtwo", type: "Psychic", dex: 150 },
  { name: "Mew", type: "Psychic", dex: 151 },
  { name: "Wooper", type: "Water/Ground", dex: 194 },
  { name: "Pikipek", type: "Normal/Flying", dex: 731 },
  { name: "Pikachu", type: "Electric", dex: 25 },
  { name: "Mimikyu", type: "Ghost/Fairy", dex: 778 },
  { name: "Lucario", type: "Fighting/Steel", dex: 448 },
  { name: "Umbreon", type: "Dark", dex: 197 },
  { name: "Squawkabilly", type: "Normal/Flying", dex: 931 }
];

const pokemonLookup = Object.fromEntries(
  pokemonData.map(function (pokemon) {
    return [pokemon.name.toLowerCase(), pokemon];
  })
);

// Added: build the auto-suggest list from the Pokémon dataset for the form and Pokédex search.
const pokemonOptions = [...new Set(pokemonData.map(function (pokemon) {
  return pokemon.name;
}))].sort();

// Added: provide every single type and every unique two-type combination in the form dropdown.
const pokemonTypes = [
  "Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost",
  "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"
];

const typeOptions = pokemonTypes.concat(
  pokemonTypes.flatMap(function (firstType, firstIndex) {
    return pokemonTypes.slice(firstIndex + 1).map(function (secondType) {
      return `${firstType}/${secondType}`;
    });
  })
);

const suggestionList = document.getElementById("pokemon-options");
const typeSelect = document.getElementById("author");

// Added: define the colours used to create balanced gradients for every Pokémon type pairing.
const typeColors = {
  bug: "#65a30d",
  dark: "#292524",
  dragon: "#4338ca",
  electric: "#eab308",
  fairy: "#ec4899",
  fighting: "#b91c1c",
  fire: "#dc2626",
  flying: "#6366f1",
  ghost: "#6d28d9",
  grass: "#16a34a",
  ground: "#a16207",
  ice: "#0891b2",
  normal: "#a8a29e",
  poison: "#9333ea",
  psychic: "#db2777",
  rock: "#78716c",
  steel: "#64748b",
  water: "#2563eb"
};

function applyTypeGradient(card) {
  const types = (card.dataset.type || "").split("/").map(function (type) {
    return type.trim().toLowerCase();
  });

  if (types.length !== 2 || !typeColors[types[0]] || !typeColors[types[1]]) {
    return;
  }

  // Added: keep both type colours balanced while blending them through a smooth center transition.
  card.style.backgroundImage = `linear-gradient(135deg, ${typeColors[types[0]]} 0%, ${typeColors[types[0]]} 42%, ${typeColors[types[1]]} 58%, ${typeColors[types[1]]} 100%)`;
}

function populateTypeOptions() {
  if (!typeSelect) {
    return;
  }

  typeSelect.innerHTML = '<option value="" selected disabled>Choose a type</option>' + typeOptions
    .map(function (type) {
      return `<option value="${type}">${type}</option>`;
    })
    .join("");
}

function populatePokemonSuggestions() {
  if (!suggestionList) {
    return;
  }

  suggestionList.innerHTML = pokemonOptions
    .map(function (name) {
      return `<option value="${name}"></option>`;
    })
    .join("");
}

const pokemonAliases = {
  "nidoran female": "Nidoran Female",
  "nidoranf": "Nidoran Female",
  "nidoranfem": "Nidoran Female",
  "nidoran male": "Nidoran Male",
  "nidoranm": "Nidoran Male",
  "nidoranmale": "Nidoran Male",
  "mr mime": "Mr Mime",
  "mrmime": "Mr Mime",
  "farfetchd": "Farfetchd",
  "farfetchd's": "Farfetchd",
  "farfetchs": "Farfetchd",
  "nidoran-f": "Nidoran Female",
  "nidoran-female": "Nidoran Female",
  "nidoran-m": "Nidoran Male",
  "nidoran-male": "Nidoran Male"
};

function normalizePokemonName(name) {
  return (name || "")
    .toLowerCase()
    .replace(/['.]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getPokemonByName(name) {
  const normalized = normalizePokemonName(name);
  const directMatch = pokemonLookup[normalized];

  if (directMatch) {
    return directMatch;
  }

  const aliasMatch = pokemonAliases[normalized];
  if (aliasMatch) {
    return pokemonLookup[aliasMatch.toLowerCase()] || null;
  }

  return null;
}

function getPokemonSpritePath(dexNumber) {
  return `Pokémon/BW/${dexNumber}.png`;
}

// Added: keep the suggestion list ready when the page loads.
populatePokemonSuggestions();
populateTypeOptions();

function filterPokemonSuggestions(inputValue) {
  if (!suggestionList || !inputValue) {
    populatePokemonSuggestions();
    return;
  }

  const search = normalizePokemonName(inputValue);
  const filteredOptions = pokemonOptions.filter(function (name) {
    return normalizePokemonName(name).includes(search);
  });

  suggestionList.innerHTML = filteredOptions
    .map(function (name) {
      return `<option value="${name}"></option>`;
    })
    .join("");
}

// Added: get the next available Pokédex number for a new Pokémon card.
function getNextDexNumber() {
  const existingNumbers = [...document.querySelectorAll(".pokemon-card")].map(function (card) {
    return Number(card.dataset.number || 0);
  });

  const highest = existingNumbers.length ? Math.max(...existingNumbers) : 0;
  return highest + 1;
}

// Added: update the favorite button state and card styling.
function syncFavoriteButton(card) {
  const favoriteButton = card.querySelector(".favorite-toggle");
  const isFavorite = card.dataset.favorite === "true";

  if (favoriteButton) {
    favoriteButton.classList.toggle("is-favorite", isFavorite);
    favoriteButton.textContent = isFavorite ? "★ Favorite" : "☆ Favorite";
  }

  card.dataset.status = card.dataset.status === "favorite" && !isFavorite ? "caught" : card.dataset.status;
}

// Added: filter the collection based on text search and status selection.
function applyFilters() {
  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const selectedStatus = filterStatusSelect ? filterStatusSelect.value : "all";

  document.querySelectorAll(".pokemon-card").forEach(function (card) {
    const cardName = (card.dataset.name || card.querySelector("h3")?.textContent || "").toLowerCase();
    const cardStatus = card.dataset.status || "";
    const matchesSearch = !searchTerm || cardName.includes(searchTerm);
    const matchesStatus = selectedStatus === "all" || cardStatus === selectedStatus;

    card.closest("li").style.display = matchesSearch && matchesStatus ? "" : "none";
  });
}

// Added: sort the Pokémon cards by the selected option.
function sortCards() {
  if (!pokemonList || !sortSelect) {
    return;
  }

  const cards = [...pokemonList.querySelectorAll("li")];
  const sortValue = sortSelect.value;

  cards.sort(function (firstItem, secondItem) {
    const firstCard = firstItem.querySelector(".pokemon-card");
    const secondCard = secondItem.querySelector(".pokemon-card");

    if (sortValue === "favorite") {
      return Number(secondCard.dataset.favorite === "true") - Number(firstCard.dataset.favorite === "true");
    }

    if (sortValue === "status") {
      return (statusLabels[firstCard.dataset.status] || firstCard.dataset.status).localeCompare(
        statusLabels[secondCard.dataset.status] || secondCard.dataset.status
      );
    }

    return (firstCard.dataset.name || "").localeCompare(secondCard.dataset.name || "");
  });

  cards.forEach(function (item) {
    pokemonList.appendChild(item);
  });
}

// Added: render the selected Pokémon result in the Pokédex tab.
function renderDexResult(name) {
  if (!dexResult) {
    return;
  }

  const pokemon = getPokemonByName(name);

  if (!pokemon) {
    dexResult.innerHTML = "<p>No Pokémon found. Try a name like Pikachu, Wooper, or Bulbasaur.</p>";
    return;
  }

  dexResult.innerHTML = `
    <img src="${getPokemonSpritePath(pokemon.dex)}" alt="${pokemon.name} sprite">
    <h3>${pokemon.name}</h3>
    <p>Type: ${pokemon.type}</p>
    <p>Pokédex #: ${pokemon.dex}</p>
  `;
}

// Added: allow the user to remove a Pokémon card from the collection.
function attachRemoveButton(button) {
  button.addEventListener("click", function () {
    const listItem = button.closest("li");
    if (listItem) {
      listItem.remove();
      applyFilters();
      sortCards();
    }
  });
}

// Added: toggle a Pokémon as a favorite and update the status badge.
function attachFavoriteButton(button) {
  const card = button.closest(".pokemon-card");
  if (!card) {
    return;
  }

  button.addEventListener("click", function () {
    const isFavorite = card.dataset.favorite === "true";
    card.dataset.favorite = String(!isFavorite);

    if (!isFavorite) {
      card.dataset.status = "favorite";
    }

    const statusText = card.querySelector("p:last-of-type");
    if (statusText) {
      statusText.textContent = `Status: ${statusLabels[card.dataset.status] || card.dataset.status}`;
    }

    syncFavoriteButton(card);
    applyFilters();
    sortCards();
  });
}

// Added: initialize each Pokémon card with the favorite and remove controls.
function initializeCard(card) {
  // Added: give each existing card a type so its background matches the Pokémon.
  if (!card.dataset.type) {
    const typeText = card.querySelector("p")?.textContent || "";
    card.dataset.type = typeText.toLowerCase();
  }

  applyTypeGradient(card);

  if (!card.dataset.number) {
    card.dataset.number = String(getNextDexNumber()).padStart(3, "0");
  }

  const badge = card.querySelector(".dex-badge");
  if (badge) {
    badge.textContent = `#${card.dataset.number}`;
  }

  syncFavoriteButton(card);

  const favoriteButton = card.querySelector(".favorite-toggle");
  if (favoriteButton) {
    attachFavoriteButton(favoriteButton);
  }

  const removeButton = card.querySelector(".remove-btn");
  if (removeButton) {
    attachRemoveButton(removeButton);
  }
}

// Added: initialize all existing cards and attach event listeners.
document.querySelectorAll(".pokemon-card").forEach(initializeCard);

// Added: listen for live search and filter changes.
if (searchInput) {
  searchInput.addEventListener("input", applyFilters);
}

if (filterStatusSelect) {
  filterStatusSelect.addEventListener("change", applyFilters);
}

if (sortSelect) {
  sortSelect.addEventListener("change", sortCards);
}

// Added: hook up the Pokédex lookup search input to the result panel.
if (dexSearchInput) {
  dexSearchInput.addEventListener("input", function () {
    filterPokemonSuggestions(dexSearchInput.value);

    if (dexSearchInput.value.trim()) {
      renderDexResult(dexSearchInput.value);
    } else {
      dexResult.innerHTML = "<p>Search for a Pokémon to see its name, type, and sprite.</p>";
    }
  });
}

if (dexSearchButton) {
  dexSearchButton.addEventListener("click", function () {
    renderDexResult(dexSearchInput.value);
  });
}

if (document.getElementById("title")) {
  document.getElementById("title").addEventListener("input", function () {
    filterPokemonSuggestions(document.getElementById("title").value);

    // Added: auto-select the matched Pokémon type before the required form is submitted.
    const matchedPokemon = getPokemonByName(document.getElementById("title").value);
    if (matchedPokemon && typeSelect) {
      typeSelect.value = matchedPokemon.type;
    }
  });
}

// Added: listen for the form submission and add a new Pokémon to the collection.
if (pokemonForm && pokemonList) {
  pokemonForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const statusInput = document.getElementById("status");

    if (!titleInput || !authorInput || !statusInput) {
      return;
    }

    const title = titleInput.value.trim();
    const typedType = authorInput.value.trim();
    const selectedStatus = statusInput.value;

    // Added: stop if the user leaves the main fields empty.
    if (!title) {
      return;
    }

    // Added: auto-match the Pokémon name to its image and type if it exists in the sprite dataset.
    const matchedPokemon = getPokemonByName(title);
    const type = matchedPokemon ? matchedPokemon.type : typedType;

    if (!type) {
      return;
    }

    authorInput.value = type;

    // Added: create the new Pokémon card with favorite and remove buttons.
    const listItem = document.createElement("li");
    const article = document.createElement("article");
    article.className = "pokemon-card";
    article.dataset.name = title.toLowerCase();
    article.dataset.type = type.toLowerCase();
    article.dataset.status = selectedStatus;
    article.dataset.favorite = "false";
    article.dataset.number = matchedPokemon ? String(matchedPokemon.dex) : String(getNextDexNumber());
    applyTypeGradient(article);

    article.innerHTML = `
      <div class="dex-badge">#${article.dataset.number}</div>
      <img src="${matchedPokemon ? getPokemonSpritePath(matchedPokemon.dex) : "Pokémon/BW/25.png"}" alt="${title} sprite">
      <h3>${title}</h3>
      <p>${type}</p>
      <p>Status: ${statusLabels[selectedStatus] || selectedStatus}</p>
      <button type="button" class="favorite-toggle" aria-label="Toggle favorite for ${title}">☆ Favorite</button>
      <button type="button" class="remove-btn">Remove</button>
    `;

    listItem.appendChild(article);
    pokemonList.appendChild(listItem);

    // Added: attach the favorite and remove button behaviors to the new card.
    const newFavoriteButton = article.querySelector(".favorite-toggle");
    if (newFavoriteButton) {
      attachFavoriteButton(newFavoriteButton);
    }

    const newRemoveButton = article.querySelector(".remove-btn");
    if (newRemoveButton) {
      attachRemoveButton(newRemoveButton);
    }

    // Added: reset the form after adding the Pokémon.
    pokemonForm.reset();
    titleInput.focus();
    applyFilters();
    sortCards();
  });
}
