function toggleMenu(){
    // Show or hide the menu on small sizes
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}


function scrollToTop(){
    // Scroll back to top
    window.scrollTo({top: 0, behavior: 'smooth'});
}


window.onscroll = function() { scrollFunction() };
function scrollFunction() {
    var arrowIcon = document.getElementById("arrowIcon");

    // Show or hide the arrow icon based on scroll position
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        arrowIcon.style.display = "block";
    } else {
        arrowIcon.style.display = "none";
    }
}