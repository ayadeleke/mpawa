// Sample data structure for species and their associated countries
const speciesDataByCountry = {
    "Nigeria": {
        "plants": [
        "African White Mahogany", "Iroko", "African pterygota", "Alstonia", "Pitch Pine", "African locust bean", "Afzelia", "African Birch", "Neem tree", "African oil palm", "Baobab"],
        "wildlife": ["Aardvark", "Lion", "Hyena", "Puff adder", "African buffalo", "Nile crocodile", "African elephant", "Giraffe", "Hippopotamus", "Leopard"]
        },
    "Rwanda": {
        "plants": ["Flat-top acacia", "Shittim Wood", "Arrow-poison Tree", "Gummy canthium", "Large-leaved Albizia", "white Pear", "winged bersama", "Glomerate Daisy", "Croton tree", "Sicklebush"],
        "wildlife": ["Mountain Gorilla", "Chimpanzee", "African Elephant", "Nile Crocodile", "Rothschild's Giraffe", "Hippopotamus", "African Buffalo", "Lion", "Leopard", "Eastern Black Rhinoceros"]
    },
    "Ghana": {
        "plants": ["Iroko", "Mahogany", "Neem", "Baobab", "Ceiba", "African locust bean", "African fan palm", "Ackee", "Shea", "Tamarind", "African kino tree"],
        "wildlife": ["African Elephant", "Lion", "Leopard", "African Wild Dog", "Hippopotamus", "African Buffalo", "Mona Monkey", "Olive Baboon", "Pygmy Hippopotamus", "Kob"]
    },
    "South Africa": {
        "plants": ["Sicklebush", "South African Holly", "Baobab", "Mountain vals-thorn", "Forest-fevertree", "Shepard tree", "Knob Thorn", "Natal Mahogany", "Umbrella Thorn", "Mopane Tree"],
        "wildlife": ["African Elephant", "Lion", "Leopard", "Cheetah", "African Wild Dog", "White Rhinoceros", "Hippopotamus", "Giraffe", "Cape Buffalo", "Springbok"]
    },
    "Kenya": {
        "plants": ["Croton tree", "Red Thorn", "Spotted gum", "Lightwood", "Gum arabic tree", "Baobab", "Long-tail cassia", "African myrrh", "African redwood", "African senna"],
        "wildlife": ["African Elephant", "Lion", "Leopard", "Cheetah", "African Wild Dog", "Giraffe", "Hippopotamus", "Zebra", "Wildebeest", "Black Rhinoceros"]
    },
    "Botswana": {
        "plants": ["Broad-leaved croton", "Cordia platythyrsa", "African cherry", "Tiama", "Parasol tree", "Broad-leaved croton", "False assegai", "Schefflera", "Guibourtia", "African pterygota"],
        "wildlife": ["African Elephant", "Lion", "Leopard", "Cheetah", "African Wild Dog", "Giraffe", "Hippopotamus", "Zebra", "Wildebeest", "Kudu"]
    },
    "Tanzania": {
        "plants": ["Spotted gum", "Baobab", "African Blackwood", "African Ironwood", "Wild Fig Tree", "Red Stinkwood", "Sausage Tree", "Tamarind Tree", "Croton Tree", "Sandalwood"],
        "wildlife": ["African Elephant", "Lion", "Leopard", "Cheetah", "African Wild Dog", "Giraffe", "Hippopotamus", "Zebra", "Wildebeest", "Black Rhinoceros"]
    },
    "Cameroon": {
        "plants": ["Bush candle", "Cordia platythyrsa", "African cherry", "Tiama", "Parasol tree", "Broad-leaved croton", "False assegai", "Schefflera", "Guibourtia", "African pterygota"],
        "wildlife": ["African Elephant", "Lion", "Leopard", "Chimpanzee", "African Wild Dog", "Hippopotamus", "Gorilla", "Forest Buffalo", "Giant Pangolin", "Bongo"]
    },
    "South Sudan": {
        "plants": ["Sudan Gum Arabic Tree", "Acacia Nilotica (Gum Arabic Tree)", "Neem Tree", "Desert Date", "Ethiopian Frankincense Tree", "African Myrrh Tree", "Ana Tree", "African Mahogany", "Mango Tree", "African Star Chestnut"],
        "wildlife": ["Nile Crocodile", "African Elephant", "Giraffe", "Hippopotamus", "African Buffalo", "Nile Monitor", "Warthog", "Ostrich", "Kudu", "Kob"]
    },
    "Uganda": {
        "plants": ["Lightwood", "Croton tree", "Sicklebush", "	Desert date", "Robusta Coffee", "Sudan Teak", "lucky bean", "False Assegai", "Iroko", "Carrot-tree"],
        "wildlife": ["Mountain Gorilla", "Chimpanzee", "African Elephant", "Nile Crocodile", "Rothschild's Giraffe", "Uganda Kob", "Hippopotamus", "African Buffalo", "Lion", "Leopard"]
    },
    "Ethiopia": {
        "plants": ["Lightwood", "Waginos", "Cape laburnum", "White Stinkwood", "Erect Horseweed", "Cape ash", "Sycamore fig", "Desert Caper", " Koko Tree", "Jacket plum"],
        "wildlife": ["Ethiopian Wolf", "Ethiopian Highlands Hartebeest", "Gelada Baboon", "Walia Ibex", "Mountain Nyala", "Ethiopian Genet", "Ethiopian Klipspringer", "Menelik's Bushbuck", "Nubian Ibex", "Ethiopian Bush Crow"]
    },
};

// Sort countries alphabetically
const sortedCountries = Object.keys(speciesDataByCountry).sort();
sortedCountries.forEach(country => {
    speciesDataByCountry[country].plants.sort();
    speciesDataByCountry[country].wildlife.sort();
});

console.log(sortedCountries);
console.log(speciesDataByCountry);

let selectedCountry;
let selectedSpeciesType;

// Function to display information
function getInfo() {
    const countryDropdown = document.getElementById('countries');
    const plantSpeciesDropdown = document.getElementById('plantSpecies');
    const wildlifeSpeciesDropdown = document.getElementById('wildlifeSpecies');

    const selectedCountry = countryDropdown.value;
    const selectedPlantSpecies = plantSpeciesDropdown.style.display === 'block' ? plantSpeciesDropdown.value : null;
    const selectedWildlifeSpecies = wildlifeSpeciesDropdown.style.display === 'block' ? wildlifeSpeciesDropdown.value : null;

    if (selectedCountry && (selectedPlantSpecies || selectedWildlifeSpecies)) {
        // Fetch and display information based on the selected country, plant species, and wildlife species
        const info = fetchInfo(selectedCountry, selectedPlantSpecies, selectedWildlifeSpecies);
        displayInfo(info);
    } else {
        alert('Please select a country and at least a plant or wildlife species.');
    }
}

// Function to fetch and display information
function fetchInfo(Country, TreeSpecies, WildlifeSpecies) {
    const countryData = speciesDataByCountry[Country];

    const treeInfo = countryData?.plants.includes(TreeSpecies) ? TreeSpecies : '';
    const wildlifeInfo = countryData?.wildlife.includes(WildlifeSpecies) ? WildlifeSpecies : '';

    let additionalInfo = '';

    // Add unique additional information for each country
    switch (Country) {
        case 'Nigeria':
            additionalInfo = 'Nigeria, located in West Africa, is a country of vast cultural diversity, breathtaking landscapes, and rich history. With a population exceeding 200 million people, Nigeria is the most populous country in Africa, comprising over 250 ethnic groups, each with its own unique traditions, languages, and customs. Ecotourism in Nigeria is vast, with diverse landscapes ranging from lush rainforests to expansive savannas, offering opportunities for wildlife viewing and immersive nature experiences. Home to a remarkable variety of plant and animal species, including iconic African wildlife like elephants and lions, Nigeria`s national parks such as Cross River, Okomu, and Yankari provide rich biodiversity hotspots for enthusiasts. Coupled with its vibrant cultural heritage, visitors can explore ancient cities, UNESCO World Heritage Sites like the Sukur Cultural Landscape, and engage with local communities to learn about traditional lifestyles and customs.';
            break;
        case 'Rwanda':
            additionalInfo = 'Rwanda, nestled in the heart of East Africa, is a land of remarkable beauty, captivating culture, and inspiring resilience. Known as the "Land of a Thousand Hills," Rwanda`s breathtaking landscapes are characterized by rolling hills, lush rainforests, shimmering lakes, and volcanic peaks, creating a stunning backdrop for exploration and adventure. Despite its tragic history marked by the 1994 genocide, Rwanda has emerged as a shining example of progress and reconciliation. The country`s commitment to peace, unity, and sustainable development has propelled it towards a bright future, earning it the nickname "The Singapore of Africa" for its rapid economic growth and efficient governance. One of Rwanda`s most compelling attractions is its extraordinary biodiversity, making it a prime destination for ecotourism enthusiasts. The renowned Volcanoes National Park, part of the Virunga Massif conservation area, is a haven for mountain gorilla trekking, offering visitors a once-in-a-lifetime opportunity to observe these majestic primates in their natural habitat.';
            break;
        case 'Cameroon':
            additionalInfo = 'Cameroon, located in Central Africa, is a land of remarkable diversity, offering visitors a blend of stunning landscapes, rich cultural heritage, and abundant biodiversity. From the dense rainforests of the Congo Basin to the towering peaks of the Cameroon Volcanic Line and the pristine shores of the Atlantic coast, Cameroon boasts a wealth of natural wonders waiting to be explored. At the heart of Cameroon`s appeal is its extraordinary biodiversity, making it a prime destination for ecotourism enthusiasts. The country is home to a diverse array of ecosystems, including rainforests, savannahs, mountains, and coastal mangroves, each harboring a unique variety of flora and fauna. National parks and protected areas such as Korup, Campo Ma`an, and Waza offer opportunities for wildlife safaris, birdwatching, and trekking, allowing visitors to encounter iconic species such as chimpanzees, gorillas, elephants, and diverse birdlife.';
            break;
        case 'Kenya':
            additionalInfo = 'Kenya, situated in East Africa, is a land of extraordinary diversity, renowned for its stunning landscapes, abundant wildlife, and vibrant culture. From the iconic savannahs of the Maasai Mara to the snow-capped peaks of Mount Kenya and the pristine beaches along the Indian Ocean coast, Kenya offers a wealth of natural wonders waiting to be explored. At the heart of Kenya`s allure is its exceptional wildlife, making it a mecca for ecotourism enthusiasts. The country is home to some of Africa`s most famous national parks and game reserves, including the Maasai Mara, Amboseli, Tsavo, and Samburu, where visitors can embark on thrilling safaris to encounter the Big Five (lion, elephant, buffalo, leopard, and rhinoceros) and a multitude of other species in their natural habitats.';
            break;
        case 'Tanzania':
            additionalInfo = 'Tanzania is located in the East African region, bordered by Kenya and Uganda to the north, Rwanda, Burundi, and the Democratic Republic of the Congo to the west, and Zambia, Malawi, and Mozambique to the south. This diverse country is renowned for its extraordinary natural landscapes, including the vast plains of the Serengeti, the majestic Mount Kilimanjaro, Africa`s highest peak, and the idyllic beaches of Zanzibar. Beyond its geographical splendor, Tanzania is committed to promoting ecotourism, offering visitors the opportunity to explore its rich biodiversity while supporting conservation efforts and local communities.';
            break;
        case 'South Africa':
            additionalInfo = 'South Africa, a country located at the southernmost tip of the African continent, is a land of extraordinary diversity and natural beauty. From its rugged coastlines and iconic mountains to its sprawling savannahs and lush forests, South Africa offers a captivating tapestry of landscapes and experiences. Amidst this stunning backdrop lies a strong commitment to ecotourism, making it a haven for travelers seeking sustainable adventures and encounters with nature`s wonders. South Africa`s breathtaking landscapes, diverse wildlife, and commitment to conservation make it a premier destination for ecotourism adventures. As travelers explore its natural wonders and engage with its people, they have the opportunity not only to experience the beauty of South Africa but also to contribute to its preservation and sustainable development, ensuring a legacy of conservation for future generations.';
            break;
        case 'Uganda':
            additionalInfo = 'Uganda, situated in East Africa, is celebrated as the "Pearl of Africa" for its stunning natural landscapes and remarkable biodiversity. From verdant rainforests to expansive savannahs, misty mountains, and the majestic Nile River, the country offers a diverse tapestry of ecosystems. With over half of the world`s remaining mountain gorillas calling Uganda home, it has become a prime destination for ecotourism. Visitors flock to its renowned national parks like Bwindi Impenetrable Forest and Mgahinga Gorilla National Park for unforgettable gorilla trekking experiences. Additionally, opportunities for safari adventures abound in Queen Elizabeth National Park, while Kibale Forest provides a chance to encounter chimpanzees.';
            break; 
        case 'Ethiopia':
            additionalInfo = 'Ethiopia, located in the Horn of Africa, is a land of ancient civilizations, diverse cultures, and stunning landscapes. From the rugged Simien Mountains to the otherworldly Danakil Depression and the lush forests of the Ethiopian Highlands, the country boasts a wealth of natural wonders. Ethiopia`s commitment to ecotourism is evident in its efforts to preserve its unique ecosystems and promote sustainable travel practices. Travelers can explore the country`s national parks and reserves, such as the Semien Mountains National Park and the Bale Mountains National Park, which are home to rare wildlife species like the Ethiopian wolf and the gelada baboon. Additionally, visitors can engage in community-based tourism initiatives, supporting local communities while experiencing Ethiopia`s rich cultural heritage and natural beauty. As ecotourism continues to thrive in Ethiopia, travelers have the opportunity to discover the country`s hidden gems while contributing to its conservation and sustainable development.';
            break;
        case 'Botswana':
            additionalInfo = 'Botswana, situated in Southern Africa, is renowned for its vast and untamed wilderness, making it a paradise for ecotourism enthusiasts. The country is characterized by diverse ecosystems, including the iconic Okavango Delta, the expansive Kalahari Desert, and the teeming wildlife of Chobe National Park. Botswana`s commitment to conservation is evident in its efforts to protect its natural heritage and promote sustainable tourism practices. Visitors can embark on unforgettable safari experiences, witnessing the spectacle of the annual zebra migration, encountering herds of elephants along the Chobe River, or exploring the Okavango Delta`s labyrinthine waterways by traditional mokoro canoe.';
            break;
        case 'South Sudan':
            additionalInfo = 'South Sudan, located in East-Central Africa, is a nation marked by its vast wilderness and rich cultural heritage. While the country has immense potential for ecotourism due to its diverse landscapes, including savannahs, wetlands, and tropical forests, its tourism industry is still in its infancy. Efforts to develop ecotourism in South Sudan face challenges due to past conflicts and ongoing instability. However, the country`s natural beauty remains largely unexplored, offering opportunities for adventurous travelers to discover pristine landscapes and unique wildlife. Initiatives promoting community-based tourism and sustainable development are emerging, aiming to harness South Sudan`s ecotourism potential while contributing to local livelihoods and conservation efforts.';
            break;
        case 'Ghana':
            additionalInfo = 'Ghana, situated along the Gulf of Guinea and the Atlantic Ocean in West Africa, is a country known for its diverse landscapes, rich culture, and vibrant history. From the bustling city of Accra to the serene shores of Lake Volta and the lush rainforests of Kakum National Park, Ghana offers a wide array of experiences for travelers seeking adventure, cultural immersion, and eco-tourism opportunities. Ghana`s commitment to ecotourism is evident in its efforts to preserve its unique ecosystems and promote sustainable travel practices. The country has numerous protected areas and conservation projects aimed at preserving the it`s natural heritage. As a tourist, you can explore pristine forests teeming with biodiversity, embark on guided hikes to discover hidden waterfalls and ancient rock formations, and experience community-based tourism initiatives that promote sustainable development and support local livelihoods. Ghana boasts a rich cultural heritage, with vibrant festivals, traditional music and dance, and historic landmarks such as the Cape Coast Castle and the Ashanti Kingdom.' ;          
            break;
        default:
            additionalInfo = 'Additional information for' + Country + 'will be available soon.';
            break;
    }

    return {
        Country,
        'Tree Specie': treeInfo,
        'Wildlife Specie': wildlifeInfo,
        'Additional Info': additionalInfo,
    };
}


// Funtion to display the information
function displayInfo(info) {
    const displayDiv = document.getElementById('displaySection');
    displayDiv.innerHTML = ''; // Clear previous content

    const table = document.createElement('table');
    table.border = '1';

    for (const prop in info) {
        const value = info[prop] !== '' ? (info[prop]) : ''; // Display blank for empty values

        if (typeof info[prop] === 'object') {
            for (const subProp in info[prop]) {
                const row = table.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);

                cell1.innerHTML = `<strong>${subProp}</strong>`;
                cell2.innerHTML = value;
            }
        } else {
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);

            cell1.innerHTML = `<strong>${prop}</strong>`;
            cell2.innerHTML = value;

            // If the property is 'Additional Info', add the 'Read More' button on the next line
            if (prop === 'Additional Info') {
                const rowReadMore = table.insertRow(); 
                const cellReadMore = rowReadMore.insertCell(0);
                cellReadMore.colSpan = 2; 
                cellReadMore.style.textAlign = 'center';

                const readMoreButton = document.createElement('button'); // Create 'Read More' button
                readMoreButton.innerHTML = 'Read More';
                readMoreButton.onclick = function() { readMore(info.Country); }; // Add onclick event
                cellReadMore.appendChild(readMoreButton); // Append button to cell
            }
        }
    }

    displayDiv.appendChild(table);
}

function readMore(country) {
    // Define HTML file names for each country
    const countryHtmlFiles = {
        "Nigeria": "nigeria.html",
        "Rwanda": "rwanda.html",
        "Cameroon": "cameroon.html",
        "Kenya": "kenya.html",
        "Tanzania": "tanzania.html",
        "South Africa": "southafrica.html",
        "Uganda": "uganda.html",
        "Ethiopia": "ethiopia.html",
        "Botswana": "botswana.html",
        "South Sudan": "southsudan.html",
        "Ghana": "ghana.html",
        // Add HTML file names for other countries
    };

    const htmlFileName = countryHtmlFiles[country];
    if (htmlFileName) {
        window.open(htmlFileName, '_blank'); // Open the HTML file in a new tab
    } else {
        alert('No additional information available for this country.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const countryDropdown = document.getElementById('countries');
    const plantSpeciesDropdown = document.getElementById('plantSpecies');
    const wildlifeSpeciesDropdown = document.getElementById('wildlifeSpecies');
    const speciesSelectionDiv = document.getElementById('speciesSelection');

    countryDropdown.addEventListener('change', () => {
        const selectedCountry = countryDropdown.value;

        if (selectedCountry) {
            speciesSelectionDiv.style.display = 'block';
            populateTreeSpecies(selectedCountry);
            populateWildlifeSpecies(selectedCountry);
        } else {
            speciesSelectionDiv.style.display = 'none';
        }
    });

    function populateTreeSpecies(selectedCountry) {
        const treeSpeciesData = speciesDataByCountry[selectedCountry].plants;
        plantSpeciesDropdown.innerHTML = '<option value="" disabled selected>Choose your tree species</option>';

        treeSpeciesData.forEach(species => {
            const option = document.createElement('option');
            option.value = species;
            option.text = species;
            plantSpeciesDropdown.appendChild(option);
        });

        plantSpeciesDropdown.style.display = 'block';
        wildlifeSpeciesDropdown.style.display = 'none';
    }

    function populateWildlifeSpecies(selectedCountry) {
        const wildlifeSpeciesData = speciesDataByCountry[selectedCountry].wildlife;
        wildlifeSpeciesDropdown.innerHTML = '<option value="" disabled selected>Choose wildlife species</option>';

        wildlifeSpeciesData.forEach(species => {
            const option = document.createElement('option');
            option.value = species;
            option.text = species;
            wildlifeSpeciesDropdown.appendChild(option);
        });

        wildlifeSpeciesDropdown.style.display = 'block';
        plantSpeciesDropdown.style.display = 'block';
    }
});