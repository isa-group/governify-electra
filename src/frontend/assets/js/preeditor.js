'use strict';

if (!localStorage.getItem('mapping')) {
    localStorage.setItem('mapping', "mapping-simple");
}
document.getElementById('graphcontainerImg').src = 'data/' + localStorage.getItem('mapping') + '.png';
document.getElementById('CSOP_download').href = 'data/' + localStorage.getItem('mapping') + '.mzn';

renderUI();

function renderUI() {
    switch (localStorage.getItem('mapping')) {
        case "mapping-synthetic":
            $(".mapping-synthetic").addClass("primary");
            $(".mapping-simple").removeClass("primary");
            $(".mapping-complex").removeClass("primary");
            $(".mapping-custom").removeClass("primary");
            $(".mapping-custom-hidable").addClass("hide");
            break;

        case "mapping-simple":
            $(".mapping-synthetic").removeClass("primary");
            $(".mapping-simple").addClass("primary");
            $(".mapping-complex").removeClass("primary");
            $(".mapping-custom").removeClass("primary");
            $(".mapping-custom-hidable").addClass("hide");
            break;

        case "mapping-complex":
            $(".mapping-synthetic").removeClass("primary");
            $(".mapping-simple").removeClass("primary");
            $(".mapping-complex").addClass("primary");
            $(".mapping-custom").removeClass("primary");
            $(".mapping-custom-hidable").addClass("hide");
            break;

        case "mapping-custom":
            $(".mapping-synthetic").removeClass("primary");
            $(".mapping-simple").removeClass("primary");
            $(".mapping-complex").removeClass("primary");
            $(".mapping-custom").addClass("primary");
            $(".mapping-custom-hidable").removeClass("hide");
            break;

        default:
            break;
    }
}

var require = {
    paths: {
        'vs': 'assets/js/monaco/min/vs'
    }
};