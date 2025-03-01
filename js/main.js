document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'U')) {
      e.preventDefault();
  }
});

document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    }, 2000);

    const challenges = [
        "قراءة جزء من القرآن الكريم",
        "أداء صلاة التراويح في المسجد",
        "الاستغفار 100 مرة خلال اليوم",
        "تقديم وجبة إفطار للصائمين",
        "الصدقة بمبلغ مالي ولو بسيط",
        "الدعاء لنفسك وللآخرين قبل الإفطار",
        "الامتناع عن الغيبة والكلام السلبي طوال اليوم",
        "قراءة تفسير آية من القرآن الكريم",
        "المحافظة على صلاة الفجر في المسجد",
        "ذكر الله أثناء القيام بالأعمال اليومية",
        "حفظ حديث نبوي جديد",
        "تهنئة الأهل والأصدقاء بقدوم رمضان",
        "مساعدة فرد من العائلة في تحضير الإفطار",
        "الدعاء لأحد الأشخاص في ظهر الغيب",
        "تخصيص وقت للجلوس مع العائلة والتحدث معهم",
        "تفطير صائم محتاج في السر دون أن يعلم",
        "محاولة كبح الغضب طوال اليوم",
        "قراءة كتاب ديني مفيد",
        "الاعتكاف في المسجد لبعض الوقت",
        "التصدق بشيء مادي مثل ملابس أو طعام",
        "تقليل استخدام الهاتف والتفرغ للعبادة",
        "المحافظة على السنن الرواتب في الصلوات",
        "زيارة أحد الأقارب أو الجيران",
        "تحضير سحور صحي ومفيد",
        "تذكير الآخرين بفضل رمضان ونشر الخير",
        "المساهمة في تنظيف المسجد أو ترتيب المصاحف",
        "تجنب مشاهدة أي محتوى غير مفيد",
        "الاستماع إلى درس ديني قصير",
        "تخصيص وقت لقراءة الأذكار اليومية",
        "كتابة خطة للاستمرار في العبادات بعد رمضان"
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
        challengeElement.textContent = challenges[newChallengeIndex];
        countdownElement.textContent = "00:00";
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
        let timeLeft = 24 * 60 * 60;
    
        function updateTimer() {
            if (timeLeft <= 0) {
                countdownElement.textContent = "00:00:00";
                setNewChallenge();
                return;
            }
            let hours = Math.floor(timeLeft / 3600);
            let minutes = Math.floor((timeLeft % 3600) / 60);
            let seconds = timeLeft % 60;
            countdownElement.textContent = `⏳ ${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
            timeLeft--;
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
});
