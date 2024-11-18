document.getElementById("serviceForm").addEventListener("submit", function (event) {
    const checkboxes = document.querySelectorAll("input[name='services[]']:checked");
    if (checkboxes.length === 0) {
        alert("Please select at least one service.");
        event.preventDefault();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const confirmDatetimeButton = document.getElementById("confirm-datetime");
    const appointmentDateInput = document.getElementById("appointment-date");
    const serviceCheckboxes = document.querySelectorAll(".service");
    const requestAppointmentButton = document.getElementById("request-appointment");
    const summaryContainer = document.getElementById("appointment-summary");
    const summaryDetails = document.getElementById("summary-details");
    const downloadSummaryButton = document.getElementById("download-summary");

    // Validate Date and Time
    confirmDatetimeButton.addEventListener("click", () => {
        const selectedDate = new Date(appointmentDateInput.value);
        const now = new Date();
        const day = selectedDate.getDay();
        const hours = selectedDate.getHours();

        if (
            selectedDate < now ||
            day === 0 ||
            hours < 8 ||
            hours >= 16
        ) {
            alert("Invalid date or time. Please select a valid schedule.");
        } else {
            alert("Date and Time confirmed!");
        }
    });

    // Calculate total cost of services
    function calculateTotal() {
        let totalCost = 0;
        serviceCheckboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                totalCost += parseInt(checkbox.dataset.price);
            }
        });
        return totalCost;
    }

    // Handle Appointment Request
    requestAppointmentButton.addEventListener("click", () => {
        const name = document.getElementById("name").value;
        const vehicleType = document.getElementById("vehicle-type").value;
        const plateNumber = document.getElementById("plate-number").value;
        const contactNumber = document.getElementById("contact-number").value;
        const appointmentDate = appointmentDateInput.value;
        const notes = document.getElementById("customer-notes").value;

        const totalCost = calculateTotal();
        if (totalCost === 0) {
            alert("Please select at least one service.");
            return;
        }

        const summary = `
            Name: ${name}
            Vehicle Type: ${vehicleType}
            Plate Number: ${plateNumber}
            Contact Number: ${contactNumber}
            Appointment Date: ${appointmentDate}
            Services Total: $${totalCost}
            Notes: ${notes}
        `;

        summaryDetails.textContent = summary;
        summaryContainer.classList.remove("hidden");
    });

    // Download Appointment Summary
    downloadSummaryButton.addEventListener("click", () => {
        const summaryText = summaryDetails.textContent;
        const blob = new Blob([summaryText], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "appointment_summary.txt";
        link.click();
    });
});
