const API_URL = 'https://proxy.velyn.workers.dev/?cors=*&url=https%3A%2F%2Fsg-hyp-api.hoyoverse.com%2Fhyp%2Fhyp-connect%2Fapi%2FgetGamePackages%3Fgame_ids%5B%5D%3DgopR6Cufr3%26launcher_id%3DVYTpXlbWo8';

const KB = 1024;
const MB = 1024 * KB;
const GB = 1024 * MB;

function formatBytes(bytes) {
    if (bytes >= GB) {
        return `${(bytes / GB).toFixed(2)} GB`;
    } else if (bytes >= MB) {
        return `${Math.floor(bytes / MB)} MB`;
    } else if (bytes >= KB) {
        return `${Math.floor(bytes / KB)} KB`;
    } else {
        return `${bytes} B`;
    }
}

function formatLanguage(lang) {
    switch (lang) {
        case "zh-cn":
            return "Chinese";
        case "en-us":
            return "English";
        case "ja-jp":
            return "Japanese";
        case "ko-kr":
            return "Korean";
        default:
            return lang;
    }
}

function formatName(url) {
    const parts = url.split('/');
    return parts[parts.length - 1];
}

fetch(API_URL)
    .then(response => response.json())
    .then(json => {
        const divPreGame = document.getElementById('pre-game');
        const divGame = document.getElementById('game');

        const preGame = json.data.game_packages[0].pre_download;
        const game = json.data.game_packages[0].main;

        if (preGame) {
            preGame.patches.forEach(function(diff, i) {
                const div = document.createElement('div');
                div.id = `pg-${i+1}`;
                divPreGame.appendChild(div);

                const ver = document.createElement('h2');
                ver.textContent = `Pre-Update Version ${diff.version} to ${preGame.major.version}`;
                div.appendChild(ver);

                const game_data = diff.game_pkgs[0];

                const name = document.createElement('h3');
                name.textContent = `Game Data (${formatBytes(game_data.size)})`;
                div.appendChild(name);

                const download = document.createElement('a');
                download.textContent = formatName(game_data.url);
                download.href = game_data.url;
                div.appendChild(download);

                const hash = document.createElement('p');
                hash.textContent = `MD5 : ${game_data.md5}`;
                div.appendChild(hash);

                diff.audio_pkgs.forEach(voice => {
                    const name = document.createElement('h3');
                    name.textContent = `${formatLanguage(voice.language)} Voice (${formatBytes(voice.size)})`;
                    div.appendChild(name);

                    const download = document.createElement('a');
                    download.textContent = formatName(voice.url);
                    download.href = voice.url;
                    div.appendChild(download);

                    const hash = document.createElement('p');
                    hash.textContent = `MD5 : ${voice.md5}`;
                    div.appendChild(hash);
                });

                const hr = document.createElement('hr');
                divPreGame.appendChild(hr);
            });

            divPreGame.removeAttribute('hidden');
        }

        if (game) {
            game.patches.forEach(function(diff, i) {
                const div = document.createElement('div');
                div.id = `g-${i+1}`;
                divGame.appendChild(div);

                const ver = document.createElement('h2');
                ver.textContent = `Update Version ${diff.version} to ${game.major.version}`;
                div.appendChild(ver);

                const game_data = diff.game_pkgs[0];

                const name = document.createElement('h3');
                name.textContent = `Game Data (${formatBytes(game_data.size)})`;
                div.appendChild(name);

                const download = document.createElement('a');
                download.textContent = formatName(game_data.url);
                download.href = game_data.url;
                div.appendChild(download);

                const hash = document.createElement('p');
                hash.textContent = `MD5 : ${game_data.md5}`;
                div.appendChild(hash);

                diff.audio_pkgs.forEach(voice => {
                    const name = document.createElement('h3');
                    name.textContent = `${formatLanguage(voice.language)} Voice (${formatBytes(voice.size)})`;
                    div.appendChild(name);

                    const download = document.createElement('a');
                    download.textContent = formatName(voice.url);
                    download.href = voice.url;
                    div.appendChild(download);

                    const hash = document.createElement('p');
                    hash.textContent = `MD5 : ${voice.md5}`;
                    div.appendChild(hash);
                });

                const hr = document.createElement('hr');
                divGame.appendChild(hr);
            });

            divGame.removeAttribute('hidden');
        }
    })
    .catch(error => console.error('Error fetching the JSON data:', error));
