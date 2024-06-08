const host = "http://127.0.0.1:8080";
const entriesContainer = document.getElementById('guestbook-entries');
const form = document.getElementById('guestbook-form');

function getEntries() {
    axios.get(`${host}/guestbook`)
        .then(response => {
            renderEntries(response.data.entries);
        })
        .catch(error => {
            console.error('Error fetching entries:', error);
        });
}

function renderEntries(entries) {
    entriesContainer.innerHTML = '';
    entries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('guestbook-entry');

        const name = document.createElement('h3');
        name.textContent = entry.name;

        const message = document.createElement('p');
        message.textContent = entry.message;

        const timestamp = document.createElement('div');
        timestamp.classList.add('date');
        timestamp.textContent = entry.timestamp;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '삭제';
        deleteBtn.addEventListener('click', function () {
            deleteEntry(entry.id);
        });

        entryDiv.appendChild(name);
        entryDiv.appendChild(message);
        entryDiv.appendChild(timestamp);
        entryDiv.appendChild(deleteBtn);

        entriesContainer.appendChild(entryDiv);
    });
}

function addEntry() {
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || message === '') return;

    const entryData = {
        id: 0,
        name: name,
        message: message,
        timestamp: ''
    };

    axios.post(`${host}/guestbook`, entryData)
        .then(response => {
            form.reset();
            getEntries();
        })
        .catch(error => {
            console.error('Error adding entry:', error);
        });
}

function deleteEntry(entryId) {
    axios.delete(`${host}/guestbook/${entryId}`)
        .then(response => {
            console.log('Entry deleted:', response.data);
            getEntries();
        })
        .catch(error => {
            console.error('Error deleting entry:', error);
        });
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    addEntry();
});

window.addEventListener('DOMContentLoaded', function () {
    getEntries();
});
