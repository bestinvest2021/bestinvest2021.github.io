document.addEventListener("DOMContentLoaded", () => {

    window.dataLayer.push({
        'event': 'PageView',
        'url': window.location.href, //Должен быть URL текущей страницы.
    });

    const getSubscriptionButton = document.querySelector('.dt-subscription button');
    const getInputElement = document.querySelector('.dt-subscription input');
    const getErrorElement = document.querySelector('.dt-error-message');
    const openedPosts = JSON.parse(localStorage.getItem('opened_articles'));
    const getEmojiData = JSON.parse(localStorage.getItem('active_emoji'));
    const getMoreLink = document.querySelector('.dt-more-block');
    const getSidebarTitle = document.querySelector('.dt-sidebar__title');
    let currentPage = 1;
    let isMore = false;

    function checkMore() {
        if (getMoreLink.classList.contains('dt-passive-link')) {
            isMore = false;
        } else {
            isMore = true;
        }
    }

    function toggleSidebar() {
        const getSidebarContainer = document.querySelector('.dt-sidebar__rubrics-container');
        const getSidebarArrows = getSidebarTitle.querySelectorAll('svg');
        getSidebarContainer.classList.toggle('dt-hide');
        [...getSidebarArrows].forEach((elem) => {
            elem.classList.toggle('dt-hide');
        })
    }

    function goSubscription() {
        const getEmailValue = getInputElement.value;
        if (!getEmailValue) return;
        if (/.+@.+\..+/i.test(getEmailValue)) {
            fetch(`/blog/api/subscribe?email=${getEmailValue}`, {
                method: "POST",
            })
                .then((response) => {
                    if (response.status === 200) {
                        document.querySelector('.dt-desc-second').classList.remove('dt-hide');
                        document.querySelector('.dt-desc-first').classList.add('dt-hide');
                        document.querySelector('.dt-subscription__input-block').classList.add('dt-hide');
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        } else {
            getErrorElement.style.display = 'flex';
        }
    }

    function setOpenedPosts() {
        const allPagePosts = document.querySelectorAll('.dt-article-card');
        if (!openedPosts || allPagePosts.length < 1) return;
        [...allPagePosts].forEach((postCard) => {
            const cardId = Number(postCard.dataset.key);
            if (openedPosts.some(key => key === cardId)) {
                postCard.classList.add('dt-opened-article');
            }
        })
    }

    function checkPostCard(cardId) {
        let result = false;
        getEmojiData.forEach((emojiObj) => {
            if (emojiObj.id === cardId) {
                return result = emojiObj.emoji;
            }
        });
        return result;
    }

    function setActiveEmoji() {
        const allPagePosts = document.querySelectorAll('.dt-article-card');
        if (!getEmojiData || allPagePosts.length < 1) return;
        [...allPagePosts].forEach((postCard) => {
            const cardId = Number(postCard.dataset.key);
            const activeEmoji = checkPostCard(cardId);
            if (activeEmoji) {
                postCard.querySelector(`.dt-emoji-block__item:nth-child(${activeEmoji}) span`).classList.add('dt-active');
            }
        })
    }

    function createNewElements(data) {
        const layoutArray = data.content.map((cardData) => {
            return `<div class="dt-article-card" data-key="${cardData.id}">
                        <a href="${cardData.slug}">
                            <div class="dt-gray-background"></div>
                            <div class="dt-article-card__img-container">
                                <img src="/images${cardData.thumbnail_path}" alt="">
                            </div>
                            <div class="dt-article-card__body">
                                <div class="dt-article-card__title dt-desktop">${cardData.name}</div>
                                <div class="dt-article-card__title dt-mobile">${cardData.name}</div>
                                <div class="dt-article-card__date">${cardData.format}</div>
                                <div class="dt-article-card__text">${cardData.text.replace(/<[^>]+>/g,'').slice(0, 125)}...</div>
                            </div>
                            <div class="dt-article-card__footer">
                                <div class="dt-emoji-block">
                                    <div class="dt-emoji-block__item">
                                        <img src="/img/blog/emoji/inlove.png" alt="">
                                        <span>${cardData.love}</span>
                                    </div>
                                    <div class="dt-emoji-block__item">
                                        <img src="/img/blog/emoji/good.png" alt="">
                                        <span>${cardData.like}</span>
                                    </div>
                                    <div class="dt-emoji-block__item">
                                        <img src="/img/blog/emoji/sad.png" alt="">
                                        <span>${cardData.dislike}</span>
                                    </div>
                                </div>
                                <div class="dt-article-card__watch-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95 95" height="20px">
                                        <g>
                                            <path d="M47.5,20.9C16.337,20.9,0,43.86,0,47.5c0,3.641,16.337,26.6,47.5,26.6 C78.661,74.1,95,51.141,95,47.5C95,43.86,78.661,20.9,47.5,20.9z M47.5,67.962c-11.659,0-21.112-9.161-21.112-20.462 S35.841,27.038,47.5,27.038S68.611,36.199,68.611,47.5S59.159,67.962,47.5,67.962z M58.055,47.5c0,5.65-4.727,10.232-10.555,10.232 c-5.83,0-10.555-4.582-10.555-10.232S41.67,37.269,47.5,37.269c3.15,0-1.933,8.108,0,10.231 C49.143,49.303,58.055,44.905,58.055,47.5z"></path>
                                        </g>
                                    </svg>
                                    <span>${cardData.watches}</span>
                                </div>
                                <div class="dt-article-card__time-block"><span>${cardData.read_time} мин.</span></div>
                            </div>
                        </a>
                    </div>`
        });
        const layout = layoutArray.join('\n');
        const newElement = document.createElement("div");
        newElement.setAttribute('class', 'dt-article-wrapper');
        newElement.innerHTML = layout;
        getMoreLink.before(newElement);
    }

    function showMorePosts() {
        if (!isMore) return;
        fetch(`/blog/api/more?page=${currentPage}`)
            .then((response) => response.json())
            .then((postsData) => {
                createNewElements(postsData);
                setOpenedPosts();
                setActiveEmoji();
                currentPage = currentPage + 1;
                if (currentPage === postsData.totalPages){
                    isMore = false;
                    getMoreLink.classList.add('dt-passive-link');
                }
            })
            .catch((error) => {
                alert(error);
            })
    }

    setOpenedPosts();
    setActiveEmoji();
    getSubscriptionButton.addEventListener('click', goSubscription);
    getInputElement.addEventListener('focus', () => {
        getErrorElement.style.display = 'none';
    });
    getMoreLink.addEventListener('click', showMorePosts);
    getSidebarTitle.addEventListener('click', toggleSidebar);
    checkMore();
});