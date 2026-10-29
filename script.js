// Destination search and category filters
function filterDestinations(){
    const input = document.getElementById('searchInput')?.value.trim().toLowerCase() || '';
    document.querySelectorAll('.destination-card').forEach(card => {
        const matchesSearch = (card.dataset.name || card.textContent).toLowerCase().includes(input);
        const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
        const categories = (card.dataset.category || '').toLowerCase().split(/\s+/);
        card.hidden = !matchesSearch || (activeFilter !== 'all' && !categories.includes(activeFilter));
    });
}

function filterCategory(category){
    document.querySelectorAll('.filter-btn').forEach(button => {
        const active = button.dataset.filter === category;
        button.classList.toggle('active', active);
        button.classList.toggle('btn-dark', active);
        button.classList.toggle('btn-outline-dark', !active);
    });
    filterDestinations();
}

// Accommodation price calculator
function calculateTotal(){
    const price = Number(document.getElementById('accType')?.value || 250);
    const nights = Math.max(1, Number(document.getElementById('nights')?.value || 1));
    const guests = Math.max(1, Number(document.getElementById('guests')?.value || 1));
    const breakfast = document.getElementById('breakfast')?.checked ? 80 * nights * guests : 0;
    const guide = document.getElementById('guide')?.checked ? 300 * nights : 0;
    const total = price * nights * guests + breakfast + guide;
    const totalElement = document.getElementById('accTotal');
    if (totalElement) totalElement.textContent = total.toLocaleString();
    const breakdown = document.getElementById('accBreakdown');
    if (breakdown) breakdown.textContent = `${guests} guest(s) × ${nights} night(s) × M${price}${breakfast ? ` + M${breakfast} breakfast` : ''}${guide ? ` + M${guide} guide` : ''}`;
}

const selectedTripItems = new Map();

function updateTripEstimate(){
    const list = document.getElementById('trip-items');
    const total = document.getElementById('trip-total');
    const empty = document.getElementById('trip-empty');
    if (!list || !total || !empty) return;
    list.replaceChildren();
    let amount = 0;
    selectedTripItems.forEach((price, name) => {
        amount += price;
        const item = document.createElement('li');
        item.textContent = `${name} — M${price}`;
        list.append(item);
    });
    total.textContent = amount.toLocaleString();
    empty.hidden = selectedTripItems.size > 0;
}

function sendWhatsApp(){
    const name = document.getElementById('name')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const message = document.getElementById('msg')?.value.trim();
    if (!name || !phone || !message) return;
    const text = `Hello, my name is ${name}. My phone number is ${phone}. ${message}`;
    window.open(`https://wa.me/26658881234?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
}

function sendRegistrationWhatsApp(){
    const name = document.getElementById('registration-name')?.value.trim();
    const email = document.getElementById('registration-email')?.value.trim();
    const phone = document.getElementById('registration-phone')?.value.trim();
    const country = document.getElementById('registration-country')?.value.trim();
    const date = document.getElementById('registration-date')?.value;
    const guests = document.getElementById('registration-guests')?.value;
    const interest = document.getElementById('registration-interest')?.value.trim();
    if (!name || !email || !phone || !country || !date || !guests || !interest) return;
    const text = `Visitor registration\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCountry: ${country}\nExpected travel date: ${date}\nTravellers: ${guests}\nTrip interests: ${interest}`;
    window.open(`https://wa.me/26658881234?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchInput')?.addEventListener('input', filterDestinations);
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => filterCategory(button.dataset.filter));
    });
    document.querySelectorAll('.add-activity').forEach(button => {
        button.addEventListener('click', () => {
            selectedTripItems.set(button.dataset.name, Number(button.dataset.price));
            button.textContent = 'Added to Trip';
            button.classList.add('btn-primary');
            button.classList.remove('btn-outline-primary');
            updateTripEstimate();
        });
    });
    document.querySelectorAll('.activity-check').forEach(input => {
        input.addEventListener('change', () => {
            if (input.checked) selectedTripItems.set(input.dataset.name, Number(input.dataset.price));
            else selectedTripItems.delete(input.dataset.name);
            updateTripEstimate();
        });
    });
    ['accType', 'nights', 'guests', 'breakfast', 'guide'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', calculateTotal);
        document.getElementById(id)?.addEventListener('change', calculateTotal);
    });
    calculateTotal();
});
