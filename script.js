const bookingForm = document.getElementById('hotelBookingForm');
const checkInInput = document.getElementById('checkInDate');
const checkOutInput = document.getElementById('checkOutDate');
const roomSelect = document.getElementById('roomType');
const displayPrice = document.getElementById('displayPrice');
const totalCostDisplay = document.getElementById('totalCost');
const daysCountDisplay = document.getElementById('daysCount');
const errorDiv = document.getElementById('errorMessage');
const successDiv = document.getElementById('successMessage');
const specialRequestInput = document.getElementById('specialRequest');

// 1. Function to calculate the Grand Total based on stay length
function calculateTotal() {
    const checkIn = new Date(checkInInput.value);
    const checkOut = new Date(checkOutInput.value);
    const roomPrice = parseInt(roomSelect.value);

    // Only run if both dates are selected and check-out is after check-in
    if (checkInInput.value && checkOutInput.value && checkOut > checkIn) {
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const total = days * roomPrice;

        totalCostDisplay.innerText = total;
        daysCountDisplay.innerText = `${days} night(s) stay`;
    } else {
        totalCostDisplay.innerText = "0";
        daysCountDisplay.innerText = "0 nights stay";
    }
}

// 2. Event Listeners for changes
roomSelect.addEventListener('change', () => {
    displayPrice.innerText = roomSelect.value;
    calculateTotal(); // Recalculate if room type changes
});

checkInInput.addEventListener('change', calculateTotal);
checkOutInput.addEventListener('change', calculateTotal);

// 3. Prevent picking dates in the past
const today = new Date().toISOString().split('T')[0];
checkInInput.min = today;
checkInInput.addEventListener('change', () => {
    checkOutInput.min = checkInInput.value;
});

// 4. Form Submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    errorDiv.classList.add('hidden');
    successDiv.classList.add('hidden');

    if (checkOutInput.value <= checkInInput.value) {
        errorDiv.innerText = "⚠️ Check-out must be at least one day after check-in.";
        errorDiv.classList.remove('hidden');
        return;
    }

    successDiv.classList.remove('hidden');
    
    // Auto-reset form after 5 seconds
    setTimeout(() => {
        bookingForm.reset();
        displayPrice.innerText = "5000";
        totalCostDisplay.innerText = "0";
        daysCountDisplay.innerText = "0 nights stay";
        successDiv.classList.add('hidden');
    }, 5000);
});