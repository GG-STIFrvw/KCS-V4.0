document.addEventListener("DOMContentLoaded", () => {
    const loginModal = document.getElementById("login-modal");
    const loginIcon = document.getElementById("login-icon");
    const closeModal = document.querySelector(".modal .close");

    // Open the modal
    loginIcon.addEventListener("click", (e) => {
        e.preventDefault();
        loginModal.style.display = "flex";
    });

    // Close the modal
    closeModal.addEventListener("click", () => {
        loginModal.style.display = "none";
    });

    // Close modal on outside click
    window.addEventListener("click", (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = "none";
        }
    });

    // Handle the register link
    const registerLink = document.getElementById("register-link");
    registerLink.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Registration feature coming soon!");
    });

    // Handle subscribe form
    const subscribeForm = document.getElementById("subscribe-form");
    subscribeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for subscribing!");
        subscribeForm.reset();
    });
});
