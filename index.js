const cardTemplate = function (country) {
  return `<div class="card">
              <img id="flag-image" src="${country.flags.svg}" alt="flag of ${country.name.common}" />
              <h1 class="center">${country.name.common}</h1>
            </div>`;
};

const countriesNode = document.getElementById("countries");
const condensedListNode = document.getElementById("condensed-list");

// View toggle buttons
const cardViewBtn = document.getElementById("card-view-btn");
const listViewBtn = document.getElementById("list-view-btn");

function showCardView() {
  countriesNode.style.display = '';
  condensedListNode.style.display = 'none';
  if (cardViewBtn) cardViewBtn.disabled = true;
  if (listViewBtn) listViewBtn.disabled = false;
}

function showListView() {
  countriesNode.style.display = 'none';
  condensedListNode.style.display = '';
  if (cardViewBtn) cardViewBtn.disabled = false;
  if (listViewBtn) listViewBtn.disabled = true;
}

if (cardViewBtn && listViewBtn) {
  cardViewBtn.addEventListener('click', showCardView);
  listViewBtn.addEventListener('click', showListView);
}


const apiUrl = "https://restcountries.com/v3.1/all";

function renderCountries(countries) {
  countriesNode.innerHTML = '';
  countries.forEach(country => {
    countriesNode.innerHTML += cardTemplate(country);
  });
  // Also update condensed list data if in list view
  if (condensedListNode && condensedListNode.style.display !== 'none') {
    renderCondensedList(countries);
  }
}

function renderCondensedList(countries) {
  // Group countries by first letter
  const grouped = {};
  countries.forEach(country => {
    const letter = country.name.common[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(country.name.common);
  });
  // Sort letters and country names
  const letters = Object.keys(grouped).sort();
  let html = '';
  letters.forEach(letter => {
    html += `<div class="condensed-group"><strong>${letter}</strong><ul>`;
    grouped[letter].sort().forEach(name => {
      html += `<li>${name}</li>`;
    });
    html += '</ul></div>';
  });
  condensedListNode.innerHTML = html;
}

fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (countries) {
    // Sort countries by name for nicer display
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    renderCountries(countries);
    renderCondensedList(countries);
    // Prepare for bonus: store countries and call filter setup
    window.allCountries = countries;
    setupContinentFilter(countries);
    // Show card view by default
    showCardView();
  })
  .catch(function (error) {
    countriesNode.innerHTML = `<p>Error loading countries: ${error.message}</p>`;
  });

// Bonus: Filter by continent
function setupContinentFilter(countries) {
  // Get unique continents
  const continents = Array.from(new Set(countries.map(c => c.region).filter(Boolean)));
  if (continents.length === 0) return;

  // Create filter dropdown
  let filterDiv = document.getElementById('continent-filter');
  if (!filterDiv) {
    filterDiv = document.createElement('div');
    filterDiv.id = 'continent-filter';
    filterDiv.style.textAlign = 'center';
    filterDiv.style.margin = '20px';
    countriesNode.parentNode.insertBefore(filterDiv, countriesNode);
  }
  filterDiv.innerHTML = `<label for="continent-select">Filter by continent: </label>
    <select id="continent-select">
      <option value="all">All</option>
      ${continents.map(cont => `<option value="${cont}">${cont}</option>`).join('')}
    </select>`;

  document.getElementById('continent-select').addEventListener('change', function(e) {
    const selected = e.target.value;
    if (selected === 'all') {
      renderCountries(window.allCountries);
    } else {
      renderCountries(window.allCountries.filter(c => c.region === selected));
    }
  });
}

