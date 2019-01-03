$(function() {

    let main = $(".js-content");
    const url = "http://localhost:3000";

        $.ajax({
            method: "GET",
            url: url + "/channels.json",
            dataType: "json"
        }).done(response => {
            console.log(response);

            const channels = Object.assign([], response);
            const channelsList = document.querySelector('.js-content');
            const channelSearch = document.querySelector('.filter__input');
            let radios = document.querySelectorAll('input[type=radio]');


            const showChannel = (elem) => {
                elem.forEach(el => {

                    main.append(`<div class='channel'>` +
                        `<div><a href=`+ el.customUrl + ` target='_blank'><img class='channel_logo' src=` + el.thumbnails.default.url + ` /></a></div>` +
                        `<h2 class='bold'>` + el.title + `</h2>` +
                        `<div class='channel_stats'>` +
                        `<div class='center'><span class='channel_stats_description'>SUBSCRIBERS:</span></br> <span class='bold'>` + parseInt(el.statistics.subscriberCount).toLocaleString('en-US') + `</span></div>`
                        +
                        `<div class='center'><span class='channel_stats_description'>VIDEOS:</span></br><span class='bold'>` + parseInt(el.statistics.videoCount).toLocaleString('en-US') + `</span></div>` +
                        `<div class='center'><span class='channel_stats_description'>VIEWS:</span></br><span class='bold'>` + parseInt(el.statistics.viewCount).toLocaleString('en-US') + `</span></div>` +
                        `</div>` +
                        `</div>`);

                });
            };

            showChannel(channels);

            const titleSort = () => {
                (channels.sort(function (a, b) {
                    return a.title.localeCompare(b.title);
                }));
                clearList();
                showChannel(channels);
            };

            const subsSort = () => {
                (channels.sort((a, b) => parseFloat(b.statistics.subscriberCount) - parseFloat(a.statistics.subscriberCount)));
                clearList();
                showChannel(channels);
            };

            const videoSort = () => {
                (channels.sort((a, b) => parseFloat(b.statistics.videoCount) - parseFloat(a.statistics.videoCount)));
                clearList();
                showChannel(channels);
            };

            const viewSort = () => {
                (channels.sort((a, b) => parseFloat(b.statistics.viewCount) - parseFloat(a.statistics.viewCount)));
                clearList();
                showChannel(channels);
            };



            function changeHandler(event) {
                if ( this.value === 'titleSort' ) {
                    titleSort();

                } else if ( this.value === 'subsSort' ) {
                    subsSort();

                } else if ( this.value === 'videoSort' ) {
                    videoSort();

                } else if ( this.value === 'viewSort' ) {
                    viewSort();
                }
            }

            Array.prototype.forEach.call(radios, function(radio) {
                radio.addEventListener('change', changeHandler);
            });


            channelSearch.addEventListener('input', function() {
                const val = this.value;
                const channel = channelsList.querySelectorAll('.channel');

                [].forEach.call(channel, function(el) {
                    const text = el.querySelector('h2').innerText;

                    if (text.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
                        el.style.setProperty('display', '');
                    } else {
                        el.style.setProperty('display', 'none');
                    }
                });
            });


            const clearList = () => { channelsList.innerHTML = "" };


            $(".button").on("click", function () {
                $(".choice--radio").prop("checked", false);
                $(".filter__input").val("");

                clearList();
                showChannel(response);
            })



        });

    });