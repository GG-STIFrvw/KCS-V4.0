document.addEventListener("DOMContentLoaded", () => {
    // Chat icon interaction
    const chatIcon = document.querySelector(".chat-icon img");
    chatIcon.addEventListener("mouseover", () => {
        chatIcon.style.transform = "scale(1.1)";
    });
    chatIcon.addEventListener("mouseout", () => {
        chatIcon.style.transform = "scale(1)";
    });

    // Subscribe form functionality
    const subscribeForm = document.getElementById("subscribe-form");
    subscribeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for subscribing!");
        subscribeForm.reset();
    });
});
