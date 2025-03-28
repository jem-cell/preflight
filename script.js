async function fetchWeather() {
    const apiKey = '8a2318c371f166f438710a296d257ef8'; // Replace with your real key
    const city = 'London';
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // Get the first forecast entry (closest upcoming 3-hour block)
        const forecast = data.list[0];
        const description = forecast.weather[0].description;
        const temp = forecast.main.temp;
        const time = new Date(forecast.dt * 1000).toLocaleTimeString();

        document.getElementById('weather').innerText = 
            `Weather in ${city} at ${time}: ${description}, ${temp}°C`;
    } catch (error) {
        console.error("Error fetching weather:", error);
        document.getElementById('weather').innerText = "Failed to load weather.";
    }
}

// Function to save checklist state
function saveChecklistState() {
    const checklistItems = document.querySelectorAll('#onsite-checklist input');
    checklistItems.forEach(item => {
        localStorage.setItem(item.id, item.checked);
    });
}

// Function to load checklist state from localStorage
function loadChecklistState() {
    const checklistItems = document.querySelectorAll('#onsite-checklist input');
    checklistItems.forEach(item => {
        item.checked = JSON.parse(localStorage.getItem(item.id)) || false;
    });
}

// Event listeners to save progress
document.querySelectorAll('#onsite-checklist input').forEach(item => {
    item.addEventListener('change', saveChecklistState);
});

// Load state when the page is loaded
window.onload = loadChecklistState;

// Function to handle checkbox change
function handleCheckboxChange() {
    const riskAssessmentChecked = document.getElementById('risk-assessment').checked;
    const notamsChecked = document.getElementById('notams').checked;
    const atcClearanceChecked = document.getElementById('atc-clearance').checked;

    // Enable or disable the text inputs based on checkbox status
    document.getElementById('risk-assessment-text').disabled = !riskAssessmentChecked;
    document.getElementById('notams-text').disabled = !notamsChecked;
    document.getElementById('atc-clearance-text').disabled = !atcClearanceChecked;
}

// Add event listeners to the checkboxes
document.getElementById('risk-assessment').addEventListener('change', handleCheckboxChange);
document.getElementById('notams').addEventListener('change', handleCheckboxChange);
document.getElementById('atc-clearance').addEventListener('change', handleCheckboxChange);

// Call the function on load to set the initial state
window.onload = handleCheckboxChange;
