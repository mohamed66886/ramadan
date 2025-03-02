document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    }, 2000);

    const challenges = [
        "قراءة جزء كامل من القرآن اليوم",
        "صلاة التراويح كاملة في المسجد",
        "التصدق بسر دون إخبار أحد",
        "الدعاء لنفسك ولغيرك قبل الإفطار",
        "صيام يوم بدون أي شكوى أو تذمر",
        "إفطار شخص محتاج ولو بتمرة",
        "قراءة تفسير 3 آيات جديدة من القرآن",
        "إهداء مصحف أو كتاب ديني لشخص آخر",
        "التحكم في الغضب طوال اليوم",
        "الاستيقاظ لصلاة الفجر بدون تأخير",
        "ذكر الله 100 مرة خلال اليوم",
        "الاستماع إلى محاضرة دينية قصيرة",
        "قراءة سورة الكهف يوم الجمعة",
        "مساعدة شخص دون أن يعلم أنك السبب",
        "الامتناع عن وسائل التواصل الاجتماعي لساعتين يوميًا",
        "تعليم شخص جديد على عادة خير في رمضان",
        "تلاوة القرآن بصوت مسموع لمدة 10 دقائق يوميًا",
        "كتابة خطة روحية لنفسك لما بعد رمضان",
        "محاولة ختم القرآن قبل نهاية الشهر",
        "زيارة مريض أو التواصل مع شخص منسي",
        "التسامح مع شخص كنت على خلاف معه",
        "التبرع ولو بمبلغ بسيط يوميًا خلال العشر الأواخر",
        "صلاة ركعتين قيام ليل إضافية بجانب التراويح",
        "عدم التحدث بأي كلام سلبي طوال اليوم",
        "ترديد أذكار الصباح والمساء بانتظام",
        "تعليم طفل صغير آية أو دعاء بسيط",
        "تحضير إفطار جماعي لعائلتك أو أصدقائك",
        "إرسال رسالة تحفيزية لشخص يحتاجها",
        "التفرغ التام للعبادة في ليلة القدر",
        "إهداء العيدية أو هدية لشخص محتاج"
    ];
    

    const challengeElement = document.getElementById("challenge");
    const countdownElement = document.getElementById("countdown");
    const doneButton = document.getElementById("done-button");
    const shareButton = document.getElementById("share-button");
    const pointsElement = document.getElementById("points");

    let points = localStorage.getItem("points") ? parseInt(localStorage.getItem("points")) : 0;
    pointsElement.textContent = `🏆 نقاطك: ${points}`;

    function getRandomChallengeIndex() {
        return Math.floor(Math.random() * challenges.length);
    }

    function setNewChallenge() {
        let newChallengeIndex = getRandomChallengeIndex();
        localStorage.setItem("currentChallengeIndex", newChallengeIndex);
        localStorage.setItem("lastChallengeDate", new Date().toDateString());
        localStorage.setItem("challengeCompleted", "false");

        // حفظ وقت انتهاء التحدي بعد 24 ساعة
        const endTime = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem("endTime", endTime);

        challengeElement.textContent = challenges[newChallengeIndex];
        countdownElement.textContent = "⏳ 24:00:00";
        doneButton.disabled = false;
        doneButton.textContent = "✅ تم الإنجاز";
    }

    let lastChallengeDate = localStorage.getItem("lastChallengeDate");
    let currentDate = new Date().toDateString();
    let currentChallengeIndex = localStorage.getItem("currentChallengeIndex");

    if (!currentChallengeIndex || lastChallengeDate !== currentDate) {
        setNewChallenge();
    } else {
        challengeElement.textContent = challenges[currentChallengeIndex];
    }

    let challengeCompleted = localStorage.getItem("challengeCompleted") === "true";

    function startCountdown() {
        let endTime = localStorage.getItem("endTime");

        function updateTimer() {
            let now = new Date().getTime();
            let timeLeft = endTime - now;

            if (timeLeft <= 0) {
                countdownElement.textContent = "00:00:00";
                setNewChallenge();
                return;
            }

            let hours = Math.floor(timeLeft / (1000 * 60 * 60));
            let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownElement.textContent = `⏳ ${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
            setTimeout(updateTimer, 1000);
        }

        updateTimer();
    }

    if (challengeCompleted) {
        doneButton.disabled = true;
        doneButton.textContent = "⏳ الرجاء الانتظار حتى انتهاء الوقت";
        startCountdown();
    }

    doneButton.addEventListener("click", function () {
        if (!challengeCompleted) {
            points += 10;
            localStorage.setItem("points", points);
            pointsElement.textContent = `🏆 نقاطك: ${points}`;
            alert("🎉 تم إنجاز التحدي! حصلت على 10 نقاط.");
            localStorage.setItem("challengeCompleted", "true");
            doneButton.disabled = true;
            doneButton.textContent = "⏳ الرجاء الانتظار حتى انتهاء الوقت";
            startCountdown();
        }
    });

    shareButton.addEventListener("click", function () {
        let challengeText = challenges[currentChallengeIndex];
        let whatsappURL = `https://api.whatsapp.com/send?text=تحدي اليوم: ${encodeURIComponent(challengeText)}%0A🎉%20%23تحدي_رمضان%0A%23سباق_الخير%0A${encodeURIComponent("https://ramadan4364.netlify.app/")}`;

        window.open(whatsappURL, "_blank");
    });

    startCountdown();
});