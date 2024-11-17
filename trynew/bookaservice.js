document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("appointment-date");
    const confirmButton = document.getElementById("confirm-datetime");
    const serviceSelection = document.getElementById("service-selection");
    const requestButton = document.getElementById("request-appointment");
    const summaryDetails = document.getElementById("summary-details");
    const summaryContainer = document.getElementById("appointment-summary");
    const downloadButton = document.getElementById("download-summary");

    // Disable invalid date/time
    confirmButton.addEventListener("click", function () {
        const now = new Date();
        const selectedDate = new Date(dateInput.value);

        if (
            selectedDate < now ||
            selectedDate.getDay() === 0 || // Sunday
            selectedDate.getHours() < 8 || // Before 8 AM
            selectedDate.getHours() >= 16 // After 4 PM
        ) {
            alert("Invalid date or time. Please select a valid schedule.");
            dateInput.value = "";
        } else {
            alert("Date and time confirmed!");
        }
    });

    // Calculate total service cost
    let totalCost = 0;
    serviceSelection.addEventListener("change", function () {
        totalCost = Array.from(serviceSelection.selectedOptions).reduce(
            (sum, option) => sum + parseInt(option.value),
            0
        );
    });

    // Handle appointment request
    requestButton.addEventListener("click", function () {
        const name = document.getElementById("name").value;
        const vehicleType = document.getElementById("vehicle-type").value;
        const plateNumber = document.getElementById("plate-number").value;
        const contactNumber = document.getElementById("contact-number").value;
        const customerNotes = document.getElementById("customer-notes").value;

        if (!name || !vehicleType || !plateNumber || !contactNumber || !dateInput.value) {
            alert("Please fill out all required fields.");
            return;
        }

        const summary = `
        Name: ${name}
        Vehicle Type: ${vehicleType}
        Plate Number: ${plateNumber}
        Contact Number: ${contactNumber}
        Date/Time: ${dateInput.value}
        Total Cost: $${totalCost}
        Notes: ${customerNotes}
        `;

        summaryDetails.textContent = summary;
        summaryContainer.classList.remove("hidden");
    });

    // Download summary
    downloadButton.addEventListener("click", function () {
        const summaryText = summaryDetails.textContent;
        const blob = new Blob([summaryText], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "appointment-summary.txt";
        link.click();
    });
});
