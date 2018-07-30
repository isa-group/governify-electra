toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-full-width",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}


$.get('data/' + localStorage.getItem('mapping') + '.yaml', function (data) {
    var mappingEditorHTML = document.getElementById('mappingEditor');
    var oasEditorHTML = document.getElementById('oasEditor');
    var sla4oaiEditorHTML = document.getElementById('sla4oaiEditor');

    var editor = monaco.editor.create(mappingEditorHTML, {
        value: data,
        language: 'yaml',
        automaticLayout: true
    });
    var oasEditor = monaco.editor.create(oasEditorHTML, {
        value: "Select a service",
        language: 'yaml',
        readOnly: true,
        automaticLayout: true
    });
    var sla4oaiEditor = monaco.editor.create(sla4oaiEditorHTML, {
        value: "Select a service",
        language: 'yaml',
        readOnly: true,
        automaticLayout: true
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function () {
        saveMapping();
    });
    editor.addAction({
        id: 'refresh',
        label: 'Refresh document',
        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 1.5,
        run: loadData
    });
    editor.addAction({
        id: 'save',
        label: 'Save document',
        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 1.5,
        run: saveMapping
    });
    editor.addAction({
        id: 'exec',
        label: 'Calculate usage limitations',
        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 1.5,
        run: exec
    });


    var svc = jsyaml.safeLoad(monaco.editor.getModels()[0].getValue()).services;
    var serviceSelector = document.getElementById("serviceSelector");
    Object.entries(svc).forEach(function ([name, path]) {
        var opt = document.createElement("option");
        opt.text = name;
        opt.value = path;
        serviceSelector.options.add(opt);
    });

    var tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 1; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }


});


function loadData() {
    $.get('data/' + localStorage.getItem('mapping') + '.yaml', function (data) {
        //data is the JSON string
        monaco.editor.getModels()[0].setValue(data);
    });
}

function saveMapping() {
    var text = monaco.editor.getModels()[0].getValue();
    $.ajax({
        type: "POST",
        url: "postMapping?mapping=" + localStorage.getItem('mapping'),
        data: jsyaml.safeLoad(text),
        success: function () {
            console.log("OK saved");
            window.location.replace("generate?mzn=true&dot=true&mapping=" + localStorage.getItem(
                'mapping'));
        }
    });
}

// function saveOAS() {
//     var text = monaco.editor.getModels()[1].getValue();
//     $.ajax({
//         type: "POST",
//         url: "postOAS?service=algo&mapping=" + localStorage.getItem('mapping'),
//         data: jsyaml.safeLoad(text),
//         success: function () {
//             console.log("OK saved");
//             window.location.replace("generate?mzn=true&dot=true&mapping=" + localStorage.getItem(
//                 'mapping'));
//         }
//     });
// }
// function saveOAS() {
//     var text = monaco.editor.getModels()[2].getValue();
//     $.ajax({
//         type: "POST",
//         url: "postSLA4OAI?service=algo&mapping=" + localStorage.getItem('mapping'),
//         data: jsyaml.safeLoad(text),
//         success: function () {
//             console.log("OK saved");
//             window.location.replace("generate?mzn=true&dot=true&mapping=" + localStorage.getItem(
//                 'mapping'));
//         }
//     });
// }

function exec() {
    $.ajax({
        type: "GET",
        url: "exec?mapping=" + localStorage.getItem('mapping'),
        success: function (data) {
            toastr["info"](data, "Usage limitations")
        }
    });
}

function change(name) {
    localStorage.setItem('mapping', name);
    window.location.replace('generate?mzn=true&dot=true&mapping=' + localStorage.getItem('mapping'));
}

function openTab(event, idTab) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(idTab).style.display = "block";
    document.getElementById(idTab).style.visibility = "initial";
    event.currentTarget.className += " active";
}

function loadServiceModels(select) {
    var svc = select.value;
    $.get(svc, function (oas) {
        monaco.editor.getModels()[1].setValue(oas);
        var sla = jsyaml.safeLoad(oas).info['x-sla'];
        if (sla) {
            $.get(sla, function (sla4oai) {
                monaco.editor.getModels()[2].setValue(sla4oai);
            });
        } else {
            monaco.editor.getModels()[2].setValue("No SLA4OAI for this service");
        }

    });
}
