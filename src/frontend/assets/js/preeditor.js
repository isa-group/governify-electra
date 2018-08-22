'use strict';

if (window.location.href.includes("editor.html") && (!getCurrentWorkspace() || getCurrentWorkspace() == null)) {
    window.location.replace("index.html");
    console.error("In production, you will be redirected to the index page");
} else if (window.location.href.includes("editor.html") && (getCurrentWorkspace() && getCurrentWorkspace() != null)) {

    $.ajax({
        type: "GET",
        url: 'data/' + getCurrentWorkspace() + '.png',
        crossDomain: true,
        headers: {
            "Cache-Control": "no-cache",
        },
        success: function (data) {
            renderUI();
            $("#graphcontainerImg").attr('src', 'data/' + getCurrentWorkspace() + '.png');
            document.getElementById('CSOP_download').href = 'data/' + getCurrentWorkspace() + '.mzn';
            $(".graph-hidable").removeClass("hide");
        }, error: function (err) {
            // console.log("image not loaded yet");
        }
    });

    renderUI();
} else {
    // console.error("You should be in index w/o params... why?");
}


function renderUI() {
    const wsName = getCurrentWorkspace();
    if (wsName.includes("bWFwcGluZy1zeW50aGV0aWM=")) {
        $(".mapping-synthetic").addClass("primary");
        $(".mapping-simple").removeClass("primary");
        $(".mapping-complex").removeClass("primary");
        $(".mapping-custom").removeClass("primary");
        $(".mapping-custom-hidable").addClass("hide");
        $(".mapping-example-hidable").removeClass("hide");

    } else if (wsName.includes("bWFwcGluZy1zaW1wbGU=")) {
        $(".mapping-synthetic").removeClass("primary");
        $(".mapping-simple").addClass("primary");
        $(".mapping-complex").removeClass("primary");
        $(".mapping-custom").removeClass("primary");
        $(".mapping-custom-hidable").addClass("hide");
        $(".mapping-example-hidable").removeClass("hide");
    } else if (wsName.includes("bWFwcGluZy1jb21wbGV4")) {
        $(".mapping-synthetic").removeClass("primary");
        $(".mapping-simple").removeClass("primary");
        $(".mapping-complex").addClass("primary");
        $(".mapping-custom").removeClass("primary");
        $(".mapping-custom-hidable").addClass("hide");
        $(".mapping-example-hidable").removeClass("hide");
    } else if (wsName.includes("bWFwcGluZy1jdXN0b20=")) {
        $(".mapping-synthetic").removeClass("primary");
        $(".mapping-simple").removeClass("primary");
        $(".mapping-complex").removeClass("primary");
        $(".mapping-custom").addClass("primary");
        $(".mapping-custom-hidable").removeClass("hide");
        $(".mapping-example-hidable").addClass("hide");
    }
}

var require = {
    paths: {
        'vs': 'assets/js/monaco/min/vs'
    }
};

function getQueryStringParameters(url) {
    let query;
    if (url) {
        if (url.split("?").length > 0) {
            query = url.split("?")[1];
        }
    } else {
        url = window.location.href;
        query = window.location.search.substring(1);
    }
    return (/^[?#]/.test(query) ? query.slice(1) : query)
        .split('&')
        .reduce((params, param) => {
            if (param) {
                let [key, value] = param.split('=');
                params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                if (params[key].indexOf('#') > 0) {
                    params[key] = params[key].substr(0, params[key].indexOf('#'));
                }
            }
            return params;
        }, {});
}

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

function getCurrentWorkspace() {
    try {
        let currentWorkspace = b64_to_utf8(getQueryStringParameters(window.location.href)["workspace"]);
        currentWorkspace = "mapping-".concat(currentWorkspace).replace("mapping-mapping-", "mapping-");
        // console.log(currentWorkspace);
        return currentWorkspace;
    } catch (err) {
        console.error(err);
        return null;
    }
}