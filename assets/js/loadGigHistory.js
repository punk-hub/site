document.addEventListener("DOMContentLoaded", function () {
    fetch('assets/Data/gigHistory.csv') // Ensure the correct path and case-sensitivity
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const rows = data.split('\n');
            let gigs = rows.map((row, index) => {
                const [gigNumber, date, venue] = row.split(',');
                const formattedDate = formatDate(date?.trim()); // Format the date
                return { number: gigNumber?.trim(), date: date?.trim(), formattedDate, venue: venue?.trim() };
            });

            // Sort gigs by date in descending order
            gigs.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Check if gig history table exists
            const gigHistoryTable = document.getElementById('gig-history-table');
            if (gigHistoryTable) {
                const tbody = gigHistoryTable.querySelector('tbody');
                gigs.forEach(gig => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${gig.number}</td>
                        <td>${gig.formattedDate}</td>
                        <td>${gig.venue}</td>
                    `;
                    tbody.appendChild(tr);
                });
            }
        })
        .catch(error => console.error('Error loading CSV file:', error));
});

function formatDate(dateStr) {
    if (!dateStr) return 'Invalid Date';
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj)) return dateStr; // Return the original date string if it's not a valid date
    const day = dateObj.getDate();
    const suffix = getOrdinalSuffix(day);
    const options = { month: 'long', year: 'numeric' };
    const monthAndYear = dateObj.toLocaleDateString('en-GB', options);
    return `${day}${suffix} ${monthAndYear}`;
}

function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th'; // covers 11th to 20th
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}
