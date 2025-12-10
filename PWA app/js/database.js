import * as App from "/js/app.js";

const data = getElementById('data')

function fetch_data() {
    // Fetch data from the '/data' endpoint
    fetch('/data')
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
        // Get the container element where the data will be displayed
        const dataContainer = document.getElementById('data-container');

        // Check if the data array is not empty
        if (data.length > 0) {
            // Create a table element and apply basic styling
            const table = document.createElement('table');
            table.style.borderCollapse = 'collapse';
            table.style.width = '80%';

            // ---------- Create table header ----------
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            // Use the keys of the first data object to create column headers
            Object.keys(data[0]).forEach(key => {
                const th = document.createElement('th');
                th.textContent = key; // Set column name
                th.style.border = '1px solid black';
                th.style.padding = '8px';
                th.style.textAlign = 'center';
                headerRow.appendChild(th); // Add header cell to the row
            });

            thead.appendChild(headerRow); // Add header row to the thead
            table.appendChild(thead);     // Add thead to the table

            // ---------- Create table body ----------
            const tbody = document.createElement('tbody');

            // Loop through each data row
            data.forEach(row => {
                const tr = document.createElement('tr');

                // Loop through each value in the row
                Object.values(row).forEach(value => {
                    const td = document.createElement('td');
                    td.style.border = '1px solid black';
                    td.style.padding = '8px';

                    // If the value is a string and looks like an image URL
                    if (typeof value === 'string' && (value.includes('.jpg') || value.includes('.png'))) {
                        const img = document.createElement('img');
                        img.src = value;
                        img.alt = 'Image';
                        img.style.maxWidth = '100px'; // Limit image width
                        img.style.height = 'auto';
                        td.appendChild(img); // Add image to the cell
                    }
                    // If the value is a string and looks like a hyperlink
                    else if (typeof value === 'string' && value.includes('https')) {
                        const link = document.createElement('a');
                        link.href = value;
                        link.textContent = value;
                        link.target = '_blank'; // Open link in new tab
                        td.appendChild(link); // Add link to the cell
                    }
                    // Otherwise, just display the value as text
                    else {
                        td.textContent = value;
                    }

                    tr.appendChild(td); // Add cell to the row
                });

                tbody.appendChild(tr); // Add row to the tbody
            });

            table.appendChild(tbody); // Add tbody to the table
            dataContainer.appendChild(table); // Add the complete table to the container
        } else {
            // If no data is returned, show a message
            dataContainer.textContent = 'No data found.';
        }
    })
    // Handle any errors that occur during the fetch
    .catch(error => console.error('Error fetching data:', error));
};

fetch_data();