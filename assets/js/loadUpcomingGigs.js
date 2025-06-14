document.addEventListener("DOMContentLoaded", function () {
    fetch('assets/Data/upcomingGigs.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip the header row
            const gigs = rows
                .map(row => {
                    const [date, venue, time] = row.split(',');
                    if (!date || !venue || !time) return null; // Skip empty/invalid rows
                    return { date: date.trim(), venue: venue.trim(), time: time.trim() };
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
                // Use local time for comparison
                return new Date(`${year}-${monthNum}-${day}T00:00:00`);
            }

            gigs.sort((a, b) => {
                const da = parseDate(a.date);
                const db = parseDate(b.date);
                if (!da || !db) return 0;
                return da - db;
            });

            function formatDate(dateStr) {
                const dateObj = parseDate(dateStr);
                if (!dateObj || isNaN(dateObj)) return 'Invalid Date';
                const dayOfMonth = dateObj.getDate();
                const suffix = getOrdinalSuffix(dayOfMonth);
                const options = { month: 'long', year: 'numeric' };
                const formattedDate = `${dayOfMonth}${suffix} ${dateObj.toLocaleDateString('en-GB', options)}`;
                return formattedDate;
            }

            function getOrdinalSuffix(day) {
                if (day > 3 && day < 21) return 'th';
                switch (day % 10) {
                    case 1: return 'st';
                    case 2: return 'nd';
                    case 3: return 'rd';
                    default: return 'th';
                }
            }

            const nextGigElement = document.getElementById('next-gig-details');
            const nextGigTitle = document.getElementById('next-gig-title');
            if (nextGigElement && gigs.length > 0) {
                // Get today's date in local time, formatted as YYYY-MM-DD
                const todayObj = new Date();
                const todayStr = todayObj.toISOString().slice(0, 10);

                // Find if today is a gig day (compare local date parts)
                const isGigDay = gigs.some(gig => {
                    const gigDateObj = parseDate(gig.date);
                    if (!gigDateObj || isNaN(gigDateObj)) return false;
                    const gigDateStr = gigDateObj.toISOString().slice(0, 10);
                    return gigDateStr === todayStr;
                });

                if (isGigDay) {
                    const gig = gigs.find(gig => {
                        const gigDateObj = parseDate(gig.date);
                        if (!gigDateObj || isNaN(gigDateObj)) return false;
                        const gigDateStr = gigDateObj.toISOString().slice(0, 10);
                        return gigDateStr === todayStr;
                    });
                    if (nextGigTitle) nextGigTitle.style.display = 'none';
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

            const futureGigsContainer = document.getElementById('future-gigs-list');
            if (futureGigsContainer && gigs.length > 1) {
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