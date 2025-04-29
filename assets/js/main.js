// フェードイン処理
const fadeEls = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // 一度だけフェード
            }
        });
    },
    {
        threshold: 0.3, // 少し見えたら発火
    }
);
fadeEls.forEach((el) => observer.observe(el));

// 「もっと見る」ボタン
const moreButton = document.querySelector(".more-button");
const hiddenImages = document.querySelectorAll(".photo-section .hidden");
let isExpanded = false; // 追加！今「開いてるか閉じてるか」状態を持つ

moreButton.addEventListener("click", () => {
    if (!isExpanded) {
        // 「もっと見る」を押した時
        hiddenImages.forEach((img) => {
            img.classList.remove("hidden"); // 画像を全部表示
        });
        moreButton.textContent = "閉じる"; // ボタンのテキスト変更
        isExpanded = true; // 状態を更新
    } else {
        // 「閉じる」を押した時
        hiddenImages.forEach((img) => {
            img.classList.add("hidden"); // 再び非表示にする
        });
        moreButton.textContent = "もっと見る"; // ボタンのテキスト戻す
        isExpanded = false; // 状態を戻す
    }
});

// ポップアップ拡大表示
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupClose = document.getElementById("popup-close");

// ギャラリー内の全ての画像にクリックイベントをつける
const galleryImages = document.querySelectorAll(".photo-section img");

galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
        popupImg.src = img.src; // クリックした画像をセット
        popup.classList.add("visible"); // ポップアップ表示
        popup.classList.remove("hidden"); // hiddenも外す
    });
});

// 閉じるボタンでポップアップを閉じる
popupClose.addEventListener("click", () => {
    popup.classList.remove("visible"); // 透明にする
    setTimeout(() => {
        popup.classList.add("hidden"); // 完全に非表示にする
    }, 300); // フェードアウト後に非表示（CSSのtransitionに合わせる）
});

popup.addEventListener("click", (e) => {
    if (e.target === popup) { // 背景自体をクリックしたときのみ
        popup.classList.remove("visible");
        setTimeout(() => {
            popup.classList.add("hidden");
        }, 300);
    }
});

// ------------------------------------------------------------
// Randomize the background image of the left panel on each load with fade-in
(function () {
    const leftPane = document.querySelector(".left");
    if (!leftPane) return;

    // Collect all gallery image sources defined in the markup
    const gallerySrcs = Array.from(
        document.querySelectorAll(".photo-section img")
    )
        .map((img) => img.getAttribute("src"))
        .filter((src) => src && src.trim() !== "");

    if (gallerySrcs.length === 0) return;

    const randomSrc =
        gallerySrcs[Math.floor(Math.random() * gallerySrcs.length)];

    // フェードイン開始（透明にする）
    leftPane.classList.add("fade-bg");

    // 少し待って背景変更 → 完了後、フェードクラスを外す
    setTimeout(() => {
        leftPane.style.backgroundImage = `url(${randomSrc})`;
        leftPane.classList.remove("fade-bg");
    }, 800); // 0.3秒くらいで自然に
})();

