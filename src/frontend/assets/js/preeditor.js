if (!localStorage.getItem('mapping')) {
    localStorage.setItem('mapping', "mapping-simple");
}
document.getElementById('graphcontainerImg').src = 'data/' + localStorage.getItem('mapping') + '.png';

var require = {
    paths: {
        'vs': 'assets/js/monaco/min/vs'
    }
};