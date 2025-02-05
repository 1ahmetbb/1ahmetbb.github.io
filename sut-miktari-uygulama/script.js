// Doğru cevaplar ve süt miktarları
const correctAnswers = [
    { name: "Sultan", milk: 7 },
    { name: "Tosun", milk: 6 },
    { name: "Benekli", milk: 5 },
    { name: "Garip", milk: 5 },
    { name: "Şaşkın", milk: 2 }
];

// "Kontrol Et" butonuna tıklama olayını ekleyelim
document.getElementById("check-btn").addEventListener("click", function () {
    const userInputs = Array.from(document.querySelectorAll(".cow-name")).map((input, index) => ({
        name: input.value.trim(),
        milk: parseInt(document.querySelectorAll("td:nth-child(2)")[index].textContent),
        inputElement: input // Kullanıcı girdisini renklendirmek için saklıyoruz
    }));

    // Kullanıcı cevaplarını kontrol et
    let remainingCorrectAnswers = [...correctAnswers]; // Doğru cevapların kopyasını al

    let correctCount = 0;
    userInputs.forEach(userInput => {
        const matchIndex = remainingCorrectAnswers.findIndex(
            correct => correct.name.toLowerCase() === userInput.name.toLowerCase() && correct.milk === userInput.milk
        );
        if (matchIndex !== -1) {
            correctCount++;
            remainingCorrectAnswers.splice(matchIndex, 1); // Doğru cevabı listeden kaldır
            userInput.inputElement.classList.add("correct");
            userInput.inputElement.classList.remove("incorrect");
        } else {
            userInput.inputElement.classList.add("incorrect");
            userInput.inputElement.classList.remove("correct");
        }
    });

    // Sonucu göster
    const resultMessageElement = document.getElementById("result-message");
    if (!resultMessageElement) {
        const result = document.createElement("p");
        result.id = "result-message";
        result.style.fontSize = "18px";
        result.style.fontWeight = "bold";
        document.body.appendChild(result);
    }

    const resultMessage = document.getElementById("result-message");
    if (correctCount === correctAnswers.length) {
        resultMessage.textContent = "Tebrikler! Tüm cevaplar doğru 🎉";
        resultMessage.style.color = "green";
    } else {
        resultMessage.textContent = `Yanlış cevaplar var. Doğru sayısı: ${correctCount}`;
        resultMessage.style.color = "red";
    }

    // "Kontrol Et" butonunu gizle ve "Tekrar Oyna" butonunu göster
    document.getElementById("check-btn").style.display = "none";
    document.getElementById("reset-btn").style.display = "inline-block";
});

// "Tekrar Oyna" butonuna tıklama olayını ekle
document.getElementById("reset-btn").addEventListener("click", function () {
    const userInputs = document.querySelectorAll(".cow-name");
    userInputs.forEach(input => {
        input.value = "";
        input.classList.remove("correct", "incorrect"); // Renkleri temizle
    });

    const resultMessageElement = document.getElementById("result-message");
    if (resultMessageElement) {
        resultMessageElement.remove();
    }

    this.style.display = "none"; // "Tekrar Oyna" butonunu gizle
    document.getElementById("check-btn").style.display = "inline-block"; // "Kontrol Et" butonunu geri getir
});