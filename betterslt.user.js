// ==UserScript==
// @name         Better SLT Portal
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Makes the stupid SLT Usage meter much much more user friendly
// @author       m4heshd
// @match        https://internetvas.slt.lk/dashboard
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let stdSel = "#root > div > div > div:nth-child(3) > div > div > div > div:nth-child(3) > div.col-md-8 > div > div:nth-child(1) > div > div > div > div:nth-child(1) > div > div > div:nth-child(3) > svg > text";

    let totSel = "#root > div > div > div:nth-child(3) > div > div > div > div:nth-child(3) > div.col-md-8 > div > div:nth-child(1) > div > div > div > div:nth-child(2) > div > div > div:nth-child(3) > svg > text";

    let xhrnew = null;

    function updUI(pkgData) {
        let std = document.querySelector(stdSel);
        std.innerHTML = pkgData.usageDetails["0"].remaining + "GB";

        let tot = document.querySelector(totSel);
        tot.innerHTML = pkgData.usageDetails["1"].remaining + "GB";
    }

    let req = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function () {
        this.addEventListener('load', function () {
            if (this.responseURL === "https://omniscapp.slt.lk/mobitelint/slt/sltvasservices/dashboard/mypackage") {
                xhrnew = this;
                let pkgData = JSON.parse(this.responseText);
                setTimeout(function () {
                    updUI(pkgData);
                }, 200);
            }
            if (this.responseURL === "https://omniscapp.slt.lk/mobitelint/slt/sltvasservices/dashboard/summary") {
                xhrnew = this;
                let pkgData = JSON.parse(this.responseText);
                setTimeout(function () {
                    updUI(pkgData.my_package_info);
                }, 200);
            }
        });
        req.apply(this, arguments);
    };
})();