document.addEventListener("DOMContentLoaded", function () {
    fetch('assets/Data/upcomingGigs.csv') // Ensure path is correct and case-sensitive
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip the header row
            const gigs = rows.map(row => {
                const [date, venue, time] = row.split(',');
                return { date: date?.trim(), venue: venue?.trim(), time: time?.trim() }; // Using optional chaining and trim
            });

            // Function to parse the date in DD-MMM-YYYY format
            function parseDate(dateStr) {
                const [day, month, year] = dateStr.split('-');
                const monthMap = {
                    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
                    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
                };
                const monthNum = monthMap[month];
                return new Date(`${year}-${monthNum}-${day}`);
            }

            // Sort gigs by date
            gigs.sort((a, b) => parseDate(a.date) - parseDate(b.date));

            // Function to format the date
            function formatDate(dateStr) {
                const dateObj = parseDate(dateStr);
                if (isNaN(dateObj)) return 'Invalid Date'; // Handle invalid dates
                const dayOfMonth = dateObj.getDate();
                const suffix = getOrdinalSuffix(dayOfMonth);
                const options = { month: 'long', year: 'numeric' };
                const formattedDate = `${dayOfMonth}${suffix} ${dateObj.toLocaleDateString('en-GB', options)}`;
                return formattedDate;
            }

            // Function to get the ordinal suffix for a given day
            function getOrdinalSuffix(day) {
                if (day > 3 && day < 21) return 'th'; // covers 11th to 20th
                switch (day % 10) {
                    case 1: return 'st';
                    case 2: return 'nd';
                    case 3: return 'rd';
                    default: return 'th';
                }
            }

            // Check if we are on the index page and update the next gig
            const nextGigElement = document.getElementById('next-gig-details');
            const nextGigTitle = document.getElementById('next-gig-title');
            if (nextGigElement) {
                const today = new Date().toISOString().split('T')[0];
                const isGigDay = gigs.some(gig => {
                    const gigDateFormatted = parseDate(gig.date).toISOString().split('T')[0];
                    return gigDateFormatted === today;
                });

                if (isGigDay) {
                    const gig = gigs.find(gig => parseDate(gig.date).toISOString().split('T')[0] === today);
                    nextGigTitle.style.display = 'none'; // Hide the "Next Gig" title
                    nextGigElement.innerHTML = `<h2>ITS GIG DAY</h2><h2 style="color: green; font-weight: bold;">We'll see you at ${gig.venue} at ${gig.time}</h2>`;
                } else {
                    const nextGig = gigs[0];
                    const formattedDate = formatDate(nextGig.date);
                    nextGigElement.innerHTML = `
                        <h2>${formattedDate}</h2>
                        <h3>${nextGig.venue}</h3>
                        <h3>${nextGig.time}</h3>
                    `;
                }
            }

            // Check if we are on the coming up page and update the future gigs
            const futureGigsContainer = document.getElementById('future-gigs-list');
            if (futureGigsContainer) {
                gigs.slice(1).forEach(gig => {
                    const formattedDate = formatDate(gig.date);
                    const div = document.createElement('div');
                    div.innerHTML = `${formattedDate} at ${gig.venue}, ${gig.time}`;
                    futureGigsContainer.appendChild(div);
                });
            }
        })
        .catch(error => console.error('Error loading CSV file:', error));
});
