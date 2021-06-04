document.addEventListener("DOMContentLoaded", () => {

    window.dataLayer.push({
        'event': 'PageView',
        'url': window.location.href, //Должен быть URL текущей страницы.
    });

    const getSubscriptionButton = document.querySelector('.dt-subscription button');
    const getInputElement = document.querySelector('.dt-subscription input');
    const getErrorElement = document.querySelector('.dt-error-message');
    const getScrollStatusElement = document.querySelector('.dt-full-article__read-status');
    const getPostId = Number(document.querySelector('.dt-full-article').dataset.key);
    const openedPosts = JSON.parse(localStorage.getItem('opened_articles'));
    let getEmojiData = JSON.parse(localStorage.getItem('active_emoji'));
    const getRatingBlock = document.querySelectorAll('.dt-rating-block');
    const getSidebarTitle = document.querySelector('.dt-sidebar__title');
    const getSlider = document.querySelector('.slider');

    if (getSlider) {
        const slider = tns({
            container: '.slider',
            items: 1,
            controlsPosition: 'bottom',
            controlsContainer: ".customize-controls",
            navPosition: 'bottom',
            navContainer: '.customize-thumbnails',
            navAsThumbnails: true,
            mouseDrag: true,
        });
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

    function sendLike(likeType) {
        let likeName;
        if (likeType === 1) likeName = 'love';
        else if (likeType === 2) likeName = 'like';
        else likeName = 'dislike';
        fetch(`/blog/api/add-like/${getPostId}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({like_type: likeName}),
        });
    }

    function getScrollPercent() {
        const getDocumentElement = document.documentElement,
            getBodyElement = document.body,
            getScrollTop = 'scrollTop',
            getScrollHeight = 'scrollHeight';

        const pageScroll = (getBodyElement[getScrollTop]||getBodyElement[getScrollTop]) / ((getBodyElement[getScrollHeight]||getBodyElement[getScrollHeight]) - getBodyElement.clientHeight) * 100;
        return Math.round(pageScroll * 100) / 100;
    }

    function eventProcessing() {
        if (!getScrollStatusElement) return;
        getScrollStatusElement.style.width = getScrollPercent() + '%';
    }

    function setOpenedPosts() {
        let newList;
        if (!openedPosts) {
            newList = [getPostId];
        } else {
            if (openedPosts.some(key => key === getPostId)) return;
            openedPosts.push(getPostId);
            newList = openedPosts;
        }
        localStorage.setItem('opened_articles', JSON.stringify(newList));
    }

    function checkOpenedPost() {
        const allPagePosts = document.querySelectorAll('.dt-article-card');
        const allPageLinks = document.querySelectorAll('.dt-title-wrapper a');
        if (!openedPosts || allPagePosts.length < 1) return;
        [...allPagePosts].forEach((postCard) => {
            const cardId = Number(postCard.dataset.key);
            if (openedPosts.some(key => key === cardId)) {
                postCard.classList.add('dt-opened-article');
            }
        });
        if (allPageLinks.length < 1) return;
        [...allPageLinks].forEach((postLink) => {
            const cardId = Number(postLink.dataset.key);
            if (openedPosts.some(key => key === cardId)) {
                postLink.classList.add('dt-passive-link');
            }
        });
    }

    function setEmojiData(cardId, activeEmoji) {
        let newList;
        if (!getEmojiData) {
            newList = [{id: cardId, emoji: activeEmoji}];
        } else {
            if (getEmojiData.some(obj => obj.id === cardId)) return;
            getEmojiData.push({id: cardId, emoji: activeEmoji});
            newList = getEmojiData;
        }
        localStorage.setItem('active_emoji', JSON.stringify(newList));
    }

    function checkPostCard(cardId) {
        if (!getEmojiData) return false;
        let result = false;
        getEmojiData.forEach((emojiObj) => {
            if (emojiObj.id === cardId) {
                return result = emojiObj.emoji;
            }
        });
        return result;
    }

    function setActiveEmoji() {
        if (!getEmojiData) return;
        const activeEmoji = checkPostCard(getPostId);
        if (activeEmoji) {
            const elementList = document.querySelectorAll(`.dt-full-article .dt-emoji-block__item:nth-child(${activeEmoji}) span`);
            [...elementList].forEach((item) => {
                item.classList.add('dt-active');
            })
        }
    }

    function addRating(event) {
        if (checkPostCard(getPostId)) return;
        const target = event.target;
        const emojiElem = target.closest('.dt-emoji-block__item');
        if (emojiElem) {
            const emojiType = Number(emojiElem.dataset.key);
            const emojiContent = Number(emojiElem.querySelector('span').innerHTML);
            const getAllEmojiSpanElements = document.querySelectorAll(`.dt-emoji-block__item[data-key="${emojiType}"] span`);
            setEmojiData(getPostId, emojiType);
            sendLike(emojiType);
            emojiElem.classList.add('dt-animate');
            [...getAllEmojiSpanElements].forEach((spanElement) => {
                spanElement.innerHTML = emojiContent + 1;
            });
            getEmojiData = JSON.parse(localStorage.getItem('active_emoji'));
            setActiveEmoji();
        }
    }

    setOpenedPosts();
    checkOpenedPost();
    setActiveEmoji();
    getSubscriptionButton.addEventListener('click', goSubscription);
    getInputElement.addEventListener('focus', () => {
        getErrorElement.style.display = 'none';
    });
    window.addEventListener('scroll', eventProcessing);
    [...getRatingBlock]. forEach((element) => {
        element.addEventListener('click', addRating);
    })
    getSidebarTitle.addEventListener('click', toggleSidebar);
});