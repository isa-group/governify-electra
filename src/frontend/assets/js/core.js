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

if (window.location.href.includes("editor.html") && (!getCurrentWorkspace() || getCurrentWorkspace() == null)) {
    window.location.replace("index.html");
    console.error("In production, you will be redirected to the index page");
} else if (window.location.href.includes("editor.html") && (getCurrentWorkspace() && getCurrentWorkspace() != null)) {

    // console.log("mapping-simple", utf8_to_b64('mapping-simple'));
    // console.log("mapping-complex", utf8_to_b64('mapping-complex'));
    // console.log("mapping-synthetic", utf8_to_b64('mapping-synthetic'));
    // console.log("mapping-custom", utf8_to_b64('mapping-custom'));

    $.ajax({
        type: "GET",
        url: 'data/' + getCurrentWorkspace() + '.yaml',
        crossDomain: true,
        success: function (data) {
            const mappingEditorHTML = document.getElementById('mappingEditor');
            const oasEditorHTML = document.getElementById('oasEditor');
            const sla4oaiEditorHTML = document.getElementById('sla4oaiEditor');

            const editor = monaco.editor.create(mappingEditorHTML, {
                value: data,
                language: 'yaml',
                automaticLayout: true
            });
            const oasEditor = monaco.editor.create(oasEditorHTML, {
                value: "Select a service from the dropdown above. This editor view is read-only.",
                language: 'yaml',
                readOnly: true,
                automaticLayout: true
            });
            const sla4oaiEditor = monaco.editor.create(sla4oaiEditorHTML, {
                value: "Select a service from the dropdown above. This editor view is read-only.",
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
                label: 'Save and calculate induced usage limitations',
                precondition: null,
                keybindingContext: null,
                contextMenuGroupId: 'navigation',
                contextMenuOrder: 1.5,
                run: saveAndCalculate
            });

            const content = monaco.editor.getModels()[0].getValue();
            if (content) {
                const svc = jsyaml.safeLoad(content).services;
                const serviceSelector = document.getElementById("serviceSelector");
                Object.entries(svc).forEach(function ([name, path]) {
                    let opt = document.createElement("option");
                    opt.text = name;
                    opt.value = path;
                    serviceSelector.options.add(opt);
                });
            }
            const tabcontent = document.getElementsByClassName("tabcontent");
            for (let i = 1; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
        }, error: function (err) {
            toastr["error"]("0x_init_0: The mapping file 'data/" + getCurrentWorkspace() + ".yaml' not exists", "Error");
        }
    });
} else {
    // console.error("You should be in index w/o params... why?");
}


function loadData() {
    $.ajax({
        type: "GET",
        url: 'data/' + getCurrentWorkspace() + '.yaml',
        crossDomain: true,
        success: function (data) {
            monaco.editor.getModels()[0].setValue(data);
        }, error: function (err) {
            toastr["error"]("0x_loadData_0", "Error");
        }
    });
}

function saveAndCalculate() {
    $(".graph-hidable").removeClass("hide");
    $("#graphcontainerImg").attr('src', 'assets/images/spinner.gif')
    $("#graphcontainerImg").css('width', 'auto%');
    const text = monaco.editor.getModels()[0].getValue();
    $.ajax({
        type: "POST",
        url: "postMapping?mapping=" + getCurrentWorkspace(),
        data: jsyaml.safeLoad(text),
        crossDomain: true,
        success: function () {
            console.log("OK saved file");
            $.ajax({
                type: "GET",
                url: "generate?mzn=true&dot=false&mapping=" + getCurrentWorkspace(),
                crossDomain: true,
                success: function (data) {
                    console.log("OK generated mzn");
                    $.ajax({
                        type: "GET",
                        url: "exec?mapping=" + getCurrentWorkspace(),
                        crossDomain: true,
                        success: function (dataMZN) {
                            console.log("OK executed mzn");
                            $.ajax({
                                type: "GET",
                                url: "generate?mzn=false&dot=true&mapping=" + getCurrentWorkspace(),
                                crossDomain: true,
                                success: function (data) {
                                    console.log("OK generated png");
                                    $.ajax({
                                        type: "GET",
                                        url: 'data/' + getCurrentWorkspace() + '.png',
                                        crossDomain: true,
                                        headers: {
                                            "Cache-Control": "no-cache",
                                        },
                                        success: function (data) {
                                            setTimeout(() => {
                                                console.log("OK evict sync disk");
                                                renderUI();
                                                $("#graphcontainerImg").attr('src', 'data/' + getCurrentWorkspace() + '.png');
                                                $("#graphcontainerImg").css('width', '100%');
                                                $("#cspResponseContainer").val(dataMZN);
                                                toastr["info"](dataMZN, "Induced usage limitations");
                                            }, 1000);

                                        }, error: function (err) {
                                            setTimeout(() => {
                                                console.log("Img retrieving failed... last try");
                                                renderUI();
                                                $("#graphcontainerImg").attr('src', 'data/' + getCurrentWorkspace() + '.png');
                                                $("#graphcontainerImg").css('width', '100%');
                                                $("#cspResponseContainer").val(dataMZN);
                                                toastr["info"](dataMZN, "Induced usage limitations");
                                            }, 1000);
                                        }
                                    });

                                }, error: function (err) {
                                    $(".graph-hidable").addClass("hide");
                                    toastr["error"]("0x_saveAndCalculate_1", "Error");
                                }
                            });
                        }, error: function (err) {
                            $(".graph-hidable").addClass("hide");
                            toastr["error"]("0x_saveAndCalculate_2", "Error");
                        }
                    });
                }, error: function (err) {
                    $(".graph-hidable").addClass("hide");
                    toastr["error"]("0x_saveAndCalculate_3", "Error");
                }
            });
        }, error: function (err) {
            $(".graph-hidable").addClass("hide");
            toastr["error"]("0x_saveAndCalculate_4", "Error");
        }
    });
}


// function change(name) {
//     $("#graphcontainerImg").attr('src', 'assets/images/spinner.gif');
//     $("#graphcontainerImg").css('width', 'auto');
//     // localStorage.setItem('mapping', name);
//     $.ajax({
//         type: "GET",
//          url: 'generate?mzn=false&dot=true&mapping=' + getCurrentWorkspace(),
//          crossDomain: true,
//         success: function (data) {
//             console.log("OK generated");
//             $.ajax({
//                 type: "GET",
//                 url: 'data/' + getCurrentWorkspace() + '.yaml',
//                 crossDomain: true,
//                 success: function (data) {
//                     console.log("OK loaded file");
//                     renderUI();
//                     monaco.editor.getModels()[0].setValue(data);
//                     $("#graphcontainerImg").attr('src', 'data/' + getCurrentWorkspace() + '.png');
//                     $("#graphcontainerImg").css('width', '100%');
//                 }, error: function (err) {
//                     toastr["error"]("0x_change_0", "Error");
//                 }
//             });
//         }, error: function (err) {
//             toastr["error"]("0x_change_1", "Error");
//         }
//     });
// }


function openTab(event, idTab) {
    let i, tabcontent, tablinks;
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
    const svc = select.value;
    $.ajax({
        type: "GET",
        url: svc,
        crossDomain: true,
        success: function (oas) {
            monaco.editor.getModels()[1].setValue(oas);
            const sla = jsyaml.safeLoad(oas).info['x-sla'];
            if (sla) {
                $.ajax({
                    type: "GET",
                    url: sla,
                    crossDomain: true,
                    success: function (sla4oai) {
                        monaco.editor.getModels()[2].setValue(sla4oai);
                    }, error: function (err) {
                        toastr["error"]("0x_loadServiceModels_0", "Error");
                    }
                });
            } else {
                monaco.editor.getModels()[2].setValue("There is no SLA4OAI definition for this service");
            }
        }, error: function (err) {
            toastr["error"]("0x_loadServiceModels_1", "Error");
        }
    });
}

function generatePseudoGUID() {
    const nav = window.navigator;
    const screen = window.screen;
    let guid = nav.mimeTypes.length;
    guid += nav.userAgent.replace(/\D+/g, '');
    guid += nav.plugins.length;
    guid += screen.height || '';
    guid += screen.width || '';
    guid += screen.pixelDepth || '';

    return guid;
}

function createWorkspaceFrom(fromWs64) {
    const userUID = generatePseudoGUID();
    const randomWs = Math.random().toString(36).substring(2, 15);

    let newWsName = ''.concat(userUID).concat('_').concat(randomWs);
    let fromName = false;

    if (fromWs64 && fromWs64 != "") {
        newWsName = newWsName.concat('_').concat(fromWs64);
        fromName = b64_to_utf8(fromWs64);
    }

    $.ajax({
        type: "POST",
        url: "createWorkspace",
        crossDomain: true,
        data: {
            name: newWsName,
            from: fromName
        },
        success: function (data) {
            console.log(data);
            try {
                let b64Ws = utf8_to_b64(data);
                let newWsURL = "editor.html?workspace=".concat(b64Ws).concat("#main");
                window.location.replace(newWsURL);
            } catch (e) {
                toastr["error"]("0x_createWorkspaceFrom_0", "Error");
            }

        }, error: function (err) {
            toastr["error"]("0x_createWorkspaceFrom_1", "Error");
        }
    });

}

function copyURL() {
    const API_KEY = "R_411d29a4512042529e096480c5faca1f";
    const API_KEY_USER = "ellocoyo";
    let shortenerURL = "https://api-ssl.bitly.com/v3/shorten"
        .concat("?apiKey=").concat(API_KEY)
        .concat("&login=").concat(API_KEY_USER)
        .concat("&longUrl=").concat(encodeURIComponent(window.location.href.replace("localhost:8080", "electra.governify.io")));
    $.ajax({
        async: false,
        crossDomain: true,
        url: shortenerURL,
        method: "GET",
        headers: {
            "Cache-Control": "no-cache",
        }, success: function (response) {
            console.log(response);
            const dummyElement = document.createElement('input');
            const currentURL = response.data.url;
            if (currentURL) {
                document.body.appendChild(dummyElement);
                dummyElement.value = currentURL;
                dummyElement.select();
                document.execCommand('copy');
                document.body.removeChild(dummyElement);
                toastr["info"]("The URL '" + currentURL + "' has been copied to the clipboard.", "Info");
            } else {
                toastr["error"]("0x_copyURL_0", "Error");
            }
        }, error: function () {
            toastr["error"]("0x_copyURL_1", "Error");
        }
    });


}
