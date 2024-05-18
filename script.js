// Load the CSV dataset
Promise.all([
  fetch('dataset/train.csv').then(response => response.text()),
  fetch('dataset/test.csv').then(response => response.text())
])
  .then(([trainCsvData, testCsvData]) => {
    // Parse CSV data
    const parsedTrainData = Papa.parse(trainCsvData, { header: true }).data;
    const parsedTestData = Papa.parse(testCsvData, { header: true }).data;

    // Combine train and test data to get unique countries and ethnicities
    const allData = parsedTrainData.concat(parsedTestData);
    const countries = Array.from(new Set(allData.map(entry => entry.country_of_res)));
    const ethnicities = Array.from(new Set(allData.map(entry => entry.ethnicity)));

    // Populate Country of Residence select element
    const countrySelect = document.getElementById('country-of-res');
    countries.forEach(country => {
      const option = document.createElement('option');
      option.textContent = country;
      option.value = country;
      countrySelect.appendChild(option);
    });

    // Populate Ethnicity select element
    const ethnicitySelect = document.getElementById('ethnicity');
    ethnicities.forEach(ethnicity => {
      const option = document.createElement('option');
      option.textContent = ethnicity;
      option.value = ethnicity;
      ethnicitySelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error loading CSV:', error);
  });

// Rest of your code (including predict Autism function) goes here
