const API_URL = 'https://proxy.velyn.workers.dev/?cors=*&url=https%3A%2F%2Fhk4e-launcher-static.hoyoverse.com%2Fhk4e_global%2Fmdk%2Flauncher%2Fapi%2Fresource%3Fchannel_id%3D1%26key%3DgcStgarh%26launcher_id%3D10%26sub_channel_id%3D0';

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

fetch(API_URL)
    .then(response => response.json())
    .then(json => {
        const divPreGame = document.getElementById('pre-game');
        const divGame = document.getElementById('game');

        const preGame = json.data.pre_download_game;
        const game = json.data.game;

        if (preGame) {
            preGame.diffs.forEach(function(diff, i) {
                const div = document.createElement('div');
                div.id = `pg-${i+1}`;
                divPreGame.appendChild(div);

                const ver = document.createElement('h2');
                ver.textContent = `Pre-Update Version ${diff.version} to ${preGame.latest.version}`;
                div.appendChild(ver);

                const name = document.createElement('h3');
                name.textContent = `Game Data (${formatBytes(diff.package_size)})`;
                div.appendChild(name);

                const download = document.createElement('a');
                download.textContent = diff.name;
                download.href = diff.path;
                div.appendChild(download);

                const hash = document.createElement('p');
                hash.textContent = `MD5 : ${diff.md5}`;
                div.appendChild(hash);

                diff.voice_packs.forEach(voice => {
                    const name = document.createElement('h3');
                    name.textContent = `${formatLanguage(voice.language)} Voice (${formatBytes(voice.package_size)})`;
                    div.appendChild(name);

                    const download = document.createElement('a');
                    download.textContent = voice.name;
                    download.href = voice.path;
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
            game.diffs.forEach(function(diff, i) {
                const div = document.createElement('div');
                div.id = `g-${i+1}`;
                divGame.appendChild(div);

                const ver = document.createElement('h2');
                ver.textContent = `Update Version ${diff.version} to ${game.latest.version}`;
                div.appendChild(ver);

                const name = document.createElement('h3');
                name.textContent = `Game Data (${formatBytes(diff.package_size)})`;
                div.appendChild(name);

                const download = document.createElement('a');
                download.textContent = diff.name;
                download.href = diff.path;
                div.appendChild(download);

                const hash = document.createElement('p');
                hash.textContent = `MD5 : ${diff.md5}`;
                div.appendChild(hash);

                diff.voice_packs.forEach(voice => {
                    const name = document.createElement('h3');
                    name.textContent = `${formatLanguage(voice.language)} Voice (${formatBytes(voice.package_size)})`;
                    div.appendChild(name);

                    const download = document.createElement('a');
                    download.textContent = voice.name;
                    download.href = voice.path;
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
