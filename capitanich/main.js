let DATASOURCES_QTY = 2;
let DATASOURCES_LOADED = 0;
let REFRESH;
let REFRESH_TIME = 5;
let EMPLOYEES = [];
let LOCATIONS = [];
let LAST_DATA = [];
let TYPES = [
    {
        type: "Solo_RFID",
        icon: "wifi_tethering",
        descripcion: "Solo tarjeta"
    },
    {
        type: "Solo_Huella",
        icon: "fingerprint",
        descripcion: "Solo huella"
    },
    {
        type: "Huella_RFID",
        icon: "done_all",
        descripcion: "Huella & Tarjeta"
    }
];

function addRow(id, l, t, ty, lo) {
    let time = moment(t,'YYY-MM-DD HH:mm:ss');
    let type = TYPES.filter(v => {return v.type === ty;});
    let icon = (type.length === 1 ? type[0].icon : "clear");
    let descripcion = (type.length === 1 ? type[0].descripcion : "Error");
    let employee = EMPLOYEES.filter(v => {return v.l === parseInt(l);});
    let emp = (employee.length === 1 ? employee[0].n : "Empleado desconocido");
    let location = LOCATIONS.filter(v => {return v.id === parseInt(lo);});
    let loc = location.length === 1 ? location[0].location : "Ubicación desconocida";
    w2ui.marks.add({
        recid: id, 
        l: l, 
        n: emp,
        t: time._d,
        i: `<i class='small material-icons'>${icon}</i>`,
        ty : descripcion,
        lo: loc
    });
}

function refreshMarks() {
    $("#refresh").text("update");
    $("#refresh").removeClass("hide");
    clearInterval(REFRESH);
    from = w2ui.marks.records.length > 0 ? w2ui.marks.records[w2ui.marks.records.length - 1].recid : 0;
    $.ajax({
        dataType: "json",
        data : {
            from: from
        },
        url : "api/marcas/get.php", 
        success: data => {
            if (data.length === 0 || JSON.stringify(data) === LAST_DATA){
                REFRESH = setInterval(function () {refreshMarks();}, REFRESH_TIME * 1000);
                $("#refresh").addClass("hide");
                return;
            }
            LAST_DATA = JSON.stringify(data);
            data.map(v => addRow(v.id,v.legajo, v.fecha, v.tipo, v.ubicacion));
            REFRESH = setInterval(function () {refreshMarks();}, REFRESH_TIME * 1000);
            $("#refresh").addClass("hide");
        },
        error: data => {
            $("#refresh").removeClass("hide");
            $("#refresh").text("warning");
        }
    });
}
function init_grid(){
    $('#marks').w2grid({
        name: 'marks',
        show: { 
            toolbar: true,
            footer: true,
            selectColumn: true,
        },
        recordHeight : 40,
        multiSearch: true,
        searches: [
                    { 
                        field: 'ty', 
                        caption: 'Tipo', 
                        type: 'list', 
                        options: { items: TYPES.map(v => {return v.descripcion;})} 
                    }
        ],
        columns: [{
                field: 'l',
                caption: 'Leg.',
                size: '50px',
                sortable: true,
                searchable: true
            },
            {
                field: 'n',
                caption: 'Nombre',
                size: '120px',
                sortable: true,
                searchable: true
            },
            {
                field: 't',
                caption: 'Hora',
                size: '120px',
                render: "datetime:dd/mm/yyyy|hh:MM:ss",
                sortable: true,
                searchable: true
            },
            {
                field: 'i',
                caption: 'Img.',
                size: '40px'
            },
            {
                field: 'ty',
                caption: 'Tipo',
                size: '30%',
                sortable: true,
                searchable: true
            },
            {
                field: 'lo',
                caption: 'Ubicacion',
                size: '40%',
                sortable: true,
                searchable: true
            }
        ]
    });
}
function checkDatasources() {
    if (DATASOURCES_QTY != DATASOURCES_LOADED) {
        return false;
    }
    refreshMarks();
}

$(document).ready(function () {

    $.getJSON("data/employees.json", data => {
        EMPLOYEES = data;
        DATASOURCES_LOADED++;
        checkDatasources();
    });

    $.getJSON("data/locations.json", data => {
        LOCATIONS = data;
        DATASOURCES_LOADED++;
        checkDatasources();
    });

    init_grid();

    $(".btn-floating").click(function(){
        if (w2ui.marks.records.length === 0){
            M.toast({html:"No hay registros para exportar."});
            return;
        }
        w2ui.marks.exportData(w2ui.marks.getSelection().length > 1 ? w2ui.marks.getSelection().map(v => w2ui.marks.records.filter(v1 => v1.recid === v)[0]) : w2ui.marks.records, "xls", true);
    });

    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, {});
});