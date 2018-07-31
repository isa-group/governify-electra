'use strict';

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
};

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
        value: "Select a service from the dropdown above. This editor view is read-only yet.",
        language: 'yaml',
        readOnly: true,
        automaticLayout: true
    });
    var sla4oaiEditor = monaco.editor.create(sla4oaiEditorHTML, {
        value: "Select a service from the dropdown above. This editor view is read-only yet.",
        language: 'yaml',
        readOnly: true,
        automaticLayout: true
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function () {
        saveAndCalculate();
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
        label: 'Save and calculate limitations',
        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 1.5,
        run: saveAndCalculate
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
    for (var i = 1; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
});


function loadData() {
    $.get('data/' + localStorage.getItem('mapping') + '.yaml', function (data) {
        monaco.editor.getModels()[0].setValue(data);
    });
}

function saveAndCalculate() {
    document.getElementById('graphcontainerImg').src = 'assets/images/spinner.gif';
    var text = monaco.editor.getModels()[0].getValue();
    $.ajax({
        type: "POST",
        url: "postMapping?mapping=" + localStorage.getItem('mapping'),
        data: jsyaml.safeLoad(text),
        success: function () {
            console.log("OK saved file");
            $.ajax({
                type: "GET",
                url: "generate?mzn=true&dot=false&mapping=" + localStorage.getItem('mapping'),
                success: function (data) {
                    console.log("OK generated mzn");
                    $.ajax({
                        type: "GET",
                        url: "exec?mapping=" + localStorage.getItem('mapping'),
                        success: function (dataMZN) {
                            console.log("OK executed mzn");
                            $.ajax({
                                type: "GET",
                                url: "generate?mzn=false&dot=true&mapping=" + localStorage.getItem('mapping'),
                                success: function (data) {
                                    console.log("OK generated png");
                                    $.ajax({
                                        type: "GET",
                                        url: 'data/' + localStorage.getItem('mapping') + '.png',
                                        success: function (data) {
                                            setTimeout(() => {
                                                console.log("OK evict sync disk");
                                                renderUI();
                                                toastr["info"](dataMZN, "Usage limitations");
                                                document.getElementById('graphcontainerImg').src = 'data/' + localStorage.getItem('mapping') + '.png';
                                            }, 3000);

                                        }
                                    });

                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

function change(name) {
    document.getElementById('graphcontainerImg').src = 'assets/images/spinner.gif';
    localStorage.setItem('mapping', name);
    $.ajax({
        type: "GET",
        url: 'generate?mzn=false&dot=true&mapping=' + localStorage.getItem('mapping'),
        success: function (data) {
            console.log("OK generated");
            $.ajax({
                type: "GET",
                url: 'data/' + localStorage.getItem('mapping') + '.yaml',
                success: function (data) {
                    console.log("OK loaded file");
                    renderUI();
                    monaco.editor.getModels()[0].setValue(data);
                    document.getElementById('graphcontainerImg').src = 'data/' + localStorage.getItem('mapping') + '.png';
                }
            });
        }
    });
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

    switch (idTab) {
        case "mappingEditorTab":
            $(".not-mappingEditorTab").addClass("hide");
            break;

        default:
            $(".not-mappingEditorTab").removeClass("hide");
            break;
    }
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
            monaco.editor.getModels()[2].setValue("There is no SLA4OAI definition for this service");
        }

    });
}
