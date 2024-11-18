document.addEventListener("DOMContentLoaded", () => {
    // Service items
    const serviceItems = document.querySelectorAll(".service-item");

    // Add interaction for each service
    serviceItems.forEach((item) => {
        item.addEventListener("click", () => {
            const serviceName = item.querySelector("h3").innerText;
            alert(`You clicked on the ${serviceName} service! More features coming soon.`);
        });
    });

    // Handle subscribe form
    const subscribeForm = document.getElementById("subscribe-form");
    subscribeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for subscribing!");
        subscribeForm.reset();
    });
});
