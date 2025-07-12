document.addEventListener("DOMContentLoaded", function () {
    fetch('assets/Data/availableDates.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip the header row
            const dates = rows
                .map(row => {
                    const [date, status, notes] = row.split(',');
                    if (!date || !status) return null; // Skip empty/invalid rows
                    return { 
                        date: date.trim(), 
                        status: status.trim(), 
                        notes: notes ? notes.trim() : '' 
                    };
                })
                .filter(Boolean);

            function parseDate(dateStr) {
                if (!dateStr) return null;
                const [day, month, year] = dateStr.split('-');
                const monthMap = {
                    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
                    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
                };
                const monthNum = monthMap[month];
                if (!monthNum) return null;
                return new Date(`${year}-${monthNum}-${day}T00:00:00`);
            }

            // Sort dates chronologically
            dates.sort((a, b) => {
                const da = parseDate(a.date);
                const db = parseDate(b.date);
                if (!da || !db) return 0;
                return da - db;
            });

            function formatDate(dateStr) {
                const dateObj = parseDate(dateStr);
                if (!dateObj) return dateStr;
                const options = { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                };
                return dateObj.toLocaleDateString('en-GB', options);
            }

            function isUpcoming(dateStr) {
                const dateObj = parseDate(dateStr);
                if (!dateObj) return false;
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return dateObj >= today;
            }

            // Filter available dates and upcoming only
            const availableDates = dates.filter(d => 
                d.status.toLowerCase() === 'available' && isUpcoming(d.date)
            );

            // Display available dates
            const availableContainer = document.getElementById('available-dates-list');
            if (availableContainer) {
                if (availableDates.length === 0) {
                    availableContainer.innerHTML = '<p class="no-dates">No available dates currently scheduled.</p>';
                } else {
                    const availableList = availableDates.map(dateInfo => `
                        <div class="date-item available">
                            <div class="date-main">${formatDate(dateInfo.date)}</div>
                            <div class="date-raw">${dateInfo.date}</div>
                            ${dateInfo.notes ? `<div class="date-notes">${dateInfo.notes}</div>` : ''}
                        </div>
                    `).join('');
                    availableContainer.innerHTML = availableList;
                }
            }

            // Update counts
            const availableCount = document.getElementById('available-count');
            if (availableCount) {
                availableCount.textContent = availableDates.length;
            }
        })
        .catch(error => {
            console.error('Error loading available dates:', error);
            const container = document.getElementById('available-dates-list');
            if (container) {
                container.innerHTML = '<p class="error">Error loading dates. Please try again later.</p>';
            }
        });
});
