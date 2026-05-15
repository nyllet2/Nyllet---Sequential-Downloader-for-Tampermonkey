// ==UserScript==
// @name         nyllet Sequential File Downloader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Download sequentially numbered files quickly
// @author       Nyllet
// @match        https://members.casualteensex.com/*
// @grant        GM_download
// ==/UserScript==

(function() {
    'use strict';

    // --- UI PANEL ---
    const panel = document.createElement("div");
    panel.style.position = "fixed";
    panel.style.top = "20px";
    panel.style.right = "20px";
    panel.style.padding = "12px";
    panel.style.background = "rgba(0,0,0,0.8)";
    panel.style.color = "white";
    panel.style.zIndex = "999999";
    panel.style.borderRadius = "8px";
    panel.style.fontSize = "14px";
    panel.style.width = "260px";

    panel.innerHTML = `
        <b>Sequential Downloader</b><br><br>
        Base URL:<br>
        <input id="sd_base" style="width:100%" placeholder="https://site.com/file_"><br><br>
        Start #: <input id="sd_start" type="number" style="width:60px">
        End #: <input id="sd_end" type="number" style="width:60px"><br><br>
        Extension:<br>
        <input id="sd_ext" style="width:80px" placeholder=".jpg"><br><br>
        <button id="sd_go" style="width:100%;padding:6px;">Download</button>
    `;

    document.body.appendChild(panel);

    // --- DOWNLOAD LOGIC ---
    document.getElementById("sd_go").onclick = () => {
        const base = document.getElementById("sd_base").value.trim();
        const start = parseInt(document.getElementById("sd_start").value);
        const end = parseInt(document.getElementById("sd_end").value);
        const ext = document.getElementById("sd_ext").value.trim();

        if (!base || isNaN(start) || isNaN(end) || !ext) {
            alert("Please fill all fields.");
            return;
        }

        for (let i = start; i <= end; i++) {
            const url = `${base}${i}/download`;
            const filename = `${i}${ext}`;

            GM_download({
                url: url,
                name: filename,
                onerror: () => console.log("Failed:", url)
            });
        }
    };
})();
