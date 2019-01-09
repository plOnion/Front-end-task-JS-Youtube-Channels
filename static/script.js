$(function () {

    const main = $(".js-content");
    const url = "http://localhost:3000/channels.json";
    const channelsList = document.querySelector('.js-content');
    const channelSearch = document.querySelector('.filter__input');
    const radios = document.querySelectorAll('input[type=radio]');
    const button = document.querySelector(".button");

    $.ajax({
        method: "GET",
        url: url,
        dataType: "json"
    }).done(response => {

        const channels = Object.assign([], response);

        showChannel(channels);

        function changeHandler() {
            if (this.value === 'titleSort') {
                titleSort(channels);

            } else if (this.value === 'subsSort') {
                subsSort(channels);

            } else if (this.value === 'videoSort') {
                videoSort(channels);

            } else if (this.value === 'viewSort') {
                viewSort(channels);
            }
        }

        [].forEach.call(radios, radio => {
            radio.addEventListener('change', changeHandler);
        });

        channelSearch.addEventListener('input', () => {
            search();
        });
        
        button.addEventListener("click", () => {
            [].forEach.call(radios, radio => {
                radio.checked = false;
            });
            channelSearch.value = "";
            clearList();
            showChannel(response);
        })
    });

    const showChannel = (elem) => {
        elem.forEach(el => {

            const subs = parseInt(el.statistics.subscriberCount, 10).toLocaleString('en-US');
            const videos = parseInt(el.statistics.videoCount, 10).toLocaleString('en-US');
            const views = parseInt(el.statistics.viewCount, 10).toLocaleString('en-US');

            main.append(`<div class='main__channel'>
                    <div><a href= ${el.customUrl} target='_blank'><img class='channel__logo' src= ${el.thumbnails.default.url} /></a></div>
                    <h2 class='bold'> ${el.title} </h2>
                    <div class='channel__stats'>
                        <div><span class='stats__description'>SUBSCRIBERS:</span></br> <span class='bold'>${subs}</span></div>
                        <div><span class='stats__description'>VIDEOS:</span></br><span class='bold'>${videos}</span></div>
                        <div><span class='stats__description'>VIEWS:</span></br><span class='bold'>${views}</span></div>
                    </div>
                    </div>`);
        });
    };

    const search = () => {
        if (channelSearch.value !== ""){
        const val = channelSearch.value;
        const channel = channelsList.querySelectorAll('.main__channel');

        [].forEach.call(channel, (el) => {
            const text = el.querySelector('h2').innerText;

            text.toLowerCase().indexOf(val.toLowerCase()) !== -1 ? el.classList.remove("hide") : el.classList.add("hide")
        });
    }};

    const sort = (channels) => {
        clearList(channelsList);
        showChannel(channels);
        search();
    }

    const clearList = () => {
        channelsList.innerHTML = ""
    };

    const titleSort = (channels) => {
        (channels.sort((a, b) => a.title.localeCompare(b.title)));
        sort(channels);

    };

    const subsSort = (channels) => {
        (channels.sort((a, b) => parseInt(b.statistics.subscriberCount) - parseInt(a.statistics.subscriberCount)));
        sort(channels);
    };

    const videoSort = (channels) => {
        (channels.sort((a, b) => parseInt(b.statistics.videoCount) - parseInt(a.statistics.videoCount)));
        sort(channels);
    };

    const viewSort = (channels) => {
        (channels.sort((a, b) => parseInt(b.statistics.viewCount) - parseInt(a.statistics.viewCount)));
        sort(channels);
    };
});