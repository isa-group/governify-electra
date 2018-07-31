'use strict';

if (!localStorage.getItem('mapping')) {
    localStorage.setItem('mapping', "mapping-simple");
}
document.getElementById('graphcontainerImg').src = 'data/' + localStorage.getItem('mapping') + '.png';

switch (localStorage.getItem('mapping')) {
    case "mapping-synthetic":
        $(".mapping-synthetic").addClass("primary");
        $(".mapping-simple").removeClass("primary");
        $(".mapping-complex").removeClass("primary");
        break;
    case "mapping-simple":
        $(".mapping-synthetic").removeClass("primary");
        $(".mapping-simple").addClass("primary");
        $(".mapping-complex").removeClass("primary");
        break;
    case "mapping-complex":
        $(".mapping-synthetic").removeClass("primary");
        $(".mapping-simple").removeClass("primary");
        $(".mapping-complex").addClass("primary");
        break;

    default:
        break;
}


var require = {
    paths: {
        'vs': 'assets/js/monaco/min/vs'
    }
};