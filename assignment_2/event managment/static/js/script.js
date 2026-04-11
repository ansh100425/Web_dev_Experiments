function validateForm() {
    let phone = document.getElementById("phone").value;
    if (phone.length != 10 || isNaN(phone)) {
        alert("Enter valid phone number");
        return false;
    }
    alert("Registered Successfully!");
    return true;
}

function searchEvents() {
    let input = document.getElementById("search").value.toLowerCase();
    let cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        let text = cards[i].innerText.toLowerCase();
        cards[i].style.display = text.includes(input) ? "block" : "none";
    }
}
