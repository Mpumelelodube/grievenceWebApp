/*$('#multi-select2').multiselect({
    onChange : function (){
        console.log(this.$select.val())
    }
})*/

function searchFilter() {
    let response = JSON.parse(localStorage.getItem("vehicles"));

    let field = document.getElementById("vehiclesSearch").value;

    let t_body = document.getElementById("t_body");

    while (t_body.hasChildNodes()) {
        t_body.removeChild(t_body.firstChild);
    }

    for (let i = 0; i < response.length; i++) {
        let string = JSON.stringify(response[i])

        if (string.toLowerCase().includes(field.toLowerCase())) {
            let html = `<td>${response[i].date}</td>
                                                    <td>${response[i].licencePlate}</td>
                                                    <td>${response[i].driver}</td>
                                                    <td>${response[i].conductor}</td>
                                                    <td>${response[i].contact}</td>
                                                    <td><span class="text-success">${response[i].route}</span></td>
                                                    <td>${response[i].vehicleType}</td>
                                                    <td><button type="button" onclick="" class="btn btn-secondary btn-sm"><i class="bi bi-trash-fill"></i>view </button></td>
                                                    `

            let tr = document.createElement('tr');
            tr.innerHTML = html;

            t_body.appendChild(tr);
        }
    }
}


function clearLocal() {
    let name = JSON.parse(localStorage.getItem('name'))
    let email = JSON.parse(localStorage.getItem('email'));
    localStorage.clear();
    localStorage.setItem('cat', JSON.stringify(''))
    localStorage.setItem('name', JSON.stringify(name))
    localStorage.setItem('email', JSON.stringify(email))
}

function setData() {
    let data;

    let value = document.getElementById("exampleFormControlTextarea1").value
    let value2 = document.getElementById("category").value

    document.getElementById('exampleFormControlTextarea1').value = value + ", " + value2

    data = value;
    localStorage.setItem('cat', JSON.stringify(data));
}

function saveUser() {
    let firstNane = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    let email = document.getElementById("inputEmail4").value;
    let password = document.getElementById("inputPassword5").value;
    let phone = document.getElementById("phone").value;

    let data = {
        firstNane,
        lastName,
        email,
        password,
        phone
    }

    $.ajax({
        url: 'http://localhost:8090/api/user/save-user',
        type: 'POST',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            $('#verticalModal-x').modal('show')

            setTimeout(() => {
                window.location = 'index.html'
            }, 5000);

        }
    })
}

function getGrievences() {
    let email = JSON.parse(localStorage.getItem('email'))
    $.ajax({
        url: 'http://localhost:8090/api/grieve/find-by-email/' + email,
        type: 'GET',
        success: function (response) {
            localStorage.setItem("grievances", JSON.stringify(response));
        }
    })
}

function viewGrievance(id) {
    let grievances = JSON.parse(localStorage.getItem('grievances'));

    for (let i = 0; i < grievances.length; i++) {
        if (grievances[i].id == id) {

            let statusString = "";

            if (grievances[i].status == 1) {
                statusString = "filed Grievance";
            } else if (grievances[i].status == 2) {
                statusString = "grievance Viewed" ;
            } else if (grievances[i].status == 3) {
                statusString = "Investigator assigned";
            } else if (grievances[i].status == 4) {
                statusString = "Bus stuff brought for questioning"
            } else if (grievances[i].status == 5) {
                statusString = "Issue solved";
            }

            document.getElementById('email').innerText = grievances[i].email ;
            document.getElementById('vehicle').innerText = grievances[i].licencePlate ;
            document.getElementById('f_date').innerText = grievances[i].date ;
            document.getElementById('status').innerText = statusString;
            document.getElementById('additional_info').innerText = grievances[i].additionalInfomation ;
            document.getElementById('g_category').innerText = grievances[i].cartegories ;


            let status = 10;
            if (grievances[i].status == 1) {
                status = 10;
            } else if (grievances[i].status == 2) {
                status = 25;
            } else if (grievances[i].status == 3) {
                status = 45;
            } else if (grievances[i].status == 4) {
                status = 75
            } else if (grievances[i].status == 5) {
                status = 100;
            }
            var radialbarChart, radialbarOptions = {
                series: [status],
                chart: {height: 200, type: "radialBar"},
                plotOptions: {
                    radialBar: {
                        hollow: {size: "75%"},
                        track: {background: colors.borderColor},
                        dataLabels: {
                            show: !0,
                            name: {
                                fontSize: "0.875rem",
                                fontWeight: 400,
                                offsetY: -10,
                                show: !0,
                                color: colors.mutedColor,
                                fontFamily: base.defaultFontFamily
                            },
                            value: {
                                formatter: function (e) {
                                    return parseInt(e)
                                },
                                color: colors.headingColor,
                                fontSize: "1.53125rem",
                                fontWeight: 700,
                                fontFamily: base.defaultFontFamily,
                                offsetY: 5,
                                show: !0
                            },
                            total: {
                                show: !0,
                                fontSize: "0.875rem",
                                fontWeight: 400,
                                offsetY: -10,
                                label: "Percent",
                                color: colors.mutedColor,
                                fontFamily: base.defaultFontFamily
                            }
                        }
                    }
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shade: "light",
                        type: "diagonal2",
                        shadeIntensity: .2,
                        gradientFromColors: [extend.primaryColorLighter],
                        gradientToColors: [extend.primaryColorDark],
                        inverseColors: !0,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [20, 100]
                    }
                },
                stroke: {lineCap: "round"},
                labels: ["CPU"]
            }, radialbar = document.querySelector("#radialbar2");
            radialbar && (radialbarChart = new ApexCharts(radialbar, radialbarOptions)).render();

            $('#verticalModal2').modal('show')
        }
    }

    /*var radialbarChart, radialbarOptions = {
        series: [10],
        chart: {height: 200, type: "radialBar"},
        plotOptions: {
            radialBar: {
                hollow: {size: "75%"},
                track: {background: colors.borderColor},
                dataLabels: {
                    show: !0,
                    name: {
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        offsetY: -10,
                        show: !0,
                        color: colors.mutedColor,
                        fontFamily: base.defaultFontFamily
                    },
                    value: {
                        formatter: function (e) {
                            return parseInt(e)
                        },
                        color: colors.headingColor,
                        fontSize: "1.53125rem",
                        fontWeight: 700,
                        fontFamily: base.defaultFontFamily,
                        offsetY: 5,
                        show: !0
                    },
                    total: {
                        show: !0,
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        offsetY: -10,
                        label: "Percent",
                        color: colors.mutedColor,
                        fontFamily: base.defaultFontFamily
                    }
                }
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "diagonal2",
                shadeIntensity: .2,
                gradientFromColors: [extend.primaryColorLighter],
                gradientToColors: [extend.primaryColorDark],
                inverseColors: !0,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [20, 100]
            }
        },
        stroke: {lineCap: "round"},
        labels: ["CPU"]
    }, radialbar = document.querySelector("#radialbar2");
    radialbar && (radialbarChart = new ApexCharts(radialbar, radialbarOptions)).render();*/

    // $('#verticalModal2').modal('show')

}

function firstOption(option) {
    if (option == 2) {
        let name = JSON.parse(localStorage.getItem('name'))
        let container = document.getElementById('messages-div');
        let message = document.createElement('div');
        message.classList = 'row align-items-center d-flex justify-content-end mb-4';
        let html = `<div class="col-auto ">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/avatars/face-4.jpg" alt="..."
                                                     class="avatar-img rounded-circle">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <strong>${name}</strong>
                                            <div class="mb-2">i want to track and existing grievance
                                            </div>
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`
        message.innerHTML = html;
        container.appendChild(message)

    } else if (option == 1) {
        let name = JSON.parse(localStorage.getItem('name'))
        let container = document.getElementById('messages-div');
        let message = document.createElement('div');
        message.classList = 'row align-items-center mb-4';
        let html = `<div class="col-auto">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/avatars/face-4.jpg" alt="..."
                                                     class="avatar-img rounded-circle">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <strong>${name}</strong>
                                            <div class="mb-2">i want to file a new grievance
                                            </div>
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`
        message.innerHTML = html;
        container.appendChild(message)
    }
}

$("#btn1").click(function (e) {
    e.preventDefault();
    let response = JSON.parse(localStorage.getItem("grievances"));
    let name = JSON.parse(localStorage.getItem('name'))
    let container = document.getElementById('messages-div-1');
    let message = document.createElement('div');
    message.classList = 'row align-items-center d-flex justify-content-end mb-4';

    console.log(response)


    let html = `<div class="col-auto ">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/avatars/face-4.png" alt="..."
                                                     class="avatar-img rounded-circle">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <strong>${name}</strong>
                                            <div class="mb-2">
                                                <div class="row">
                                        <div class="col-md-12">
                                            <table class="table table-hover table-sm">
                                                <thead>
                                                <tr>
                                                    <th>id</th>
                                                    <th>Date filed</th>
                                                    <th>Vehicle</th>
                                                    <th>Status</th>
                                                    <th>View</th>
                                                </tr>
                                                </thead>
                                                <tbody id="t_body">

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                            </div>
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`
    message.innerHTML = html;
    container.appendChild(message)

    $("#messages-div").append(message).delay(2000).fadeIn(10000)
    document.getElementById('btn1').setAttribute("disabled", "tue")
    document.getElementById('btn2').setAttribute("disabled", "tue")

    console.log(response)

    localStorage.setItem("grievances", JSON.stringify(response));

    let t_body = document.getElementById("t_body");

    while (t_body.hasChildNodes()) {
        t_body.removeChild(t_body.firstChild);
    }
    // console.log(response[1].paymentDate)

    for (let i = response.length - 1; i >= 0; i--) {
        let statusString = "";

        if (response[i].status == 1) {
            statusString = "filed Grievance";
        } else if (response[i].status == 2) {
            statusString = "grievance Viewed" ;
        } else if (response[i].status == 3) {
            statusString = "Investigator assigned";
        } else if (response[i].status == 4) {
            statusString = "Bus stuff brought for questioning"
        } else if (response[i].status == 5) {
            statusString = "Issue solved";
        }

        let html = `<td>${response[i].id}</td>
                                                    <td>${response[i].date}</td>
                                                    <td>${response[i].licencePlate}</td>
                                                    <td><span class="text-success">${statusString}</span></td>
                                                    <td><button type="button" onclick="viewGrievance('${response[i].id}')" class="btn btn-secondary btn-sm"><i class="bi bi-trash-fill"></i>view </button></td>
                                                    `

        let tr = document.createElement('tr');
        tr.innerHTML = html;

        t_body.appendChild(tr);
    }

})

$("#btn2").click(function (e) {
    let name = JSON.parse(localStorage.getItem('name'))
    let container = document.getElementById('messages-div-1');
    let message = document.createElement('div');
    message.classList = 'row align-items-center mb-4';
    let html = `<div class="col-auto">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/avatars/face-4.png" alt="..."
                                                     class="avatar-img rounded-circle">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <strong>${name}</strong>
                                            <div class="mb-2">i want to file a new grievance
                                            </div>
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`
    message.innerHTML = html;
    container.appendChild(message)
    document.getElementById('btn1').setAttribute("disabled", "tue")
    document.getElementById('btn2').setAttribute("disabled", "tue")

    let message2 = document.createElement('div');
    message2.classList = 'row align-items-center mb-4';
    let html2 = `<div class="col-auto">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/avatars/face-4.png" alt="..."
                                                     class="avatar-img rounded-circle">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <strong>${name}</strong>
                                            <div class="mb-2">
                                            <div class="row no-gutters align-items-center">
                                                    <div class="col-md-6 p-1">
                                                        <button class="btn btn-outline-primary btn-block" onclick="scan()" id="scan">Scan QR code
                                                        </button>
                                                    </div>
                                                    <div class="col-md-6 p-1">
                                                        <button class="btn btn-outline-primary  btn-block" id="lPlate" onclick="enterlPlate()">
                                                           Enter Licence Plate
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`
    message2.innerHTML = html2;
    container.appendChild(message2)


    /*setTimeout(() => {
        document.getElementById('multiSelect').classList.remove('d-none')
    }, 3000);*/
    document.getElementById('multiSelect').value = ""

    document.getElementById('submitButton').removeAttribute("disabled")
})

function scan() {
    $.ajax({
        url: '/api/vehicle/get-all-vehicles',
        type: 'GET',
        success: function (response) {
            console.log(response)

            localStorage.setItem("vehicles", JSON.stringify(response));

            let name = JSON.parse(localStorage.getItem('name'))
            let container = document.getElementById('messages-div-1');
            let message = document.createElement('div');
            message.classList = 'row align-items-center mb-4';
            let html = `<div class="col-auto">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/avatars/face-4.png" alt="..."
                                                     class="avatar-img rounded-circle">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <strong>${name}</strong>
                                            <div class="mb-2">
                                                <div id="vid-div">
                                                    <video class="fe-video container-fluid"  id="preview"></video>
                                                </div>
                                            </div>
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`
            message.innerHTML = html;
            container.appendChild(message)
            document.getElementById('scan').setAttribute("disabled", "tue")
            document.getElementById('lPlate').setAttribute("disabled", "tue")

            let scanner = new Instascan.Scanner({video: document.getElementById('preview')});
            scanner.addListener('scan', function (content) {
                alert(content);
                console.log(content)
                let qrData = JSON.parse(content);
                scanner.stop()

                let vehicle = qrData.id;
                console.log(vehicle)

                document.getElementById('preview').remove();

                for (let i = 0; i < response.length; i++) {
                    if (vehicle == response[i].id) {
                        localStorage.setItem('lPlateNumer', JSON.stringify(response[i].licencePlate))
                        let html2 = `<div class="card shadow mb-4">
                                <div class="card-header">
                                    <strong class="card-title">Vehicle details</strong>
                                    <!--                                    <span class="float-right"><i class="fe fe-flag mr-2"></i><span-->
                                    <!--                                            class="badge badge-pill badge-success text-white">Payment</span></span>-->
                                </div>
                                <div id="compartmentDetails">
                                    <div class="card-body">
                                        <dl class="row align-items-center mb-0">
                                            <dt class="col-sm-2 mb-3 text-muted"> Vehicle Licence Plate</dt>
                                            <dd class="col-sm-4 mb-3">
                                                <strong>${response[i].licencePlate}</strong>
                                            </dd>
                                            <dt class="col-sm-2 mb-3 text-muted">Bus Driver</dt>
                                            <dd class="col-sm-4 mb-3">
                                                <strong>${response[i].driver}</strong>
                                            </dd>
                                        </dl>
                                        <dl class="row align-items-center mb-0">
                                            <dt class="col-sm-2 mb-3 text-muted">Bus Conductor</dt>
                                            <dd class="col-sm-4 mb-3">
                                                <strong>${response[i].conductor}</strong>
                                            </dd>
                                            <dt class="col-sm-2 mb-3 text-muted"> Route</dt>
                                            <dd class="col-sm-4 mb-3">
                                                <strong>${response[i].route}</strong>
                                            </dd>
                                        </dl>
                                        
                                    </div> <!-- .card-body -->
                                </div>
                            </div>`

                        document.getElementById('vid-div').innerHTML = html2

                        setTimeout(() => {
                            document.getElementById('multiSelect').classList.remove('d-none')
                        }, 3000);

                        document.getElementById('submitButton').removeAttribute("disabled")
                    }
                }

            });
            Instascan.Camera.getCameras().then(function (cameras) {
                if (cameras.length > 0) {
                    scanner.start(cameras[0]);
                    // scanner.stop(cameras[0])
                } else {
                    console.error('No cameras found.');
                }
            }).catch(function (e) {
                console.error(e);
            });
        }
    })
}

function getCartegoryInput() {
    let cartegories = JSON.parse(localStorage.getItem('cat'))
    let name = JSON.parse(localStorage.getItem('name'))

    console.log(cartegories)

    let data = {
        cartegories
    }

    localStorage.setItem('data', JSON.stringify(data));

    let container = document.getElementById('messages-div-2');
    let message = document.createElement('div');
    message.classList = 'row align-items-center mb-4';
    let html = `<div class="col-auto">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/avatars/face-4.png" alt="..."
                                                     class="avatar-img rounded-circle">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <strong>${name}</strong>
                                            <div class="mb-2">${cartegories}
                                            </div>
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`
    message.innerHTML = html;
    container.appendChild(message)

    document.getElementById('submitButton').removeAttribute("onclick")
    document.getElementById('submitButton').setAttribute("onclick", "geAdditionalInfomation()");

    let message2 = document.createElement('div');
    message2.classList = 'row align-items-center mb-4';
    let html2 = `<div class="col-auto">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/images/office_worker_at_work_4721901.png" alt="..."
                                                     class="avatar-img rounded-circle">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <strong>Madara</strong>
                                            <div class="mb-2">Please Enter additional information in the input field below and click submit
                                            </div>
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`

    message2.innerHTML = html2;
    setTimeout(() => {
        container.appendChild(message2)
    }, 3000);

    document.getElementById('exampleFormControlTextarea1').value = ""
}

function geAdditionalInfomation() {
    let additionalInfomation = document.getElementById('exampleFormControlTextarea1').value;
    let cartegories = JSON.parse(localStorage.getItem('cat'))
    let name = JSON.parse(localStorage.getItem('name'))

    console.log(cartegories)

    let data = {
        cartegories,
        additionalInfomation
    }

    localStorage.setItem('data', JSON.stringify(data));

    let container = document.getElementById('messages-div-2');
    let message = document.createElement('div');
    message.classList = 'row align-items-center mb-4';
    let html = `<div class="col-auto">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/avatars/face-4.png" alt="..."
                                                     class="avatar-img rounded-circle">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <strong>${name}</strong>
                                            <div class="mb-2">${additionalInfomation}
                                            </div>
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`
    message.innerHTML = html;
    container.appendChild(message)

    document.getElementById('submitButton').removeAttribute("onclick")
    // document.getElementById('submitButton').setAttribute("onclick", "getLicencePlate()");

    let data2 = JSON.parse(localStorage.getItem('data'));

    data2.licencePlate = JSON.parse(localStorage.getItem('lPlateNumer'));
    data2.email = JSON.parse(localStorage.getItem('email'))

    console.log(data2)

    $.ajax({
        url: 'http://localhost:8090/api/grieve/save-grievance',
        type: 'POST',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data2),
        success: function (response) {
            console.log(response)

            let name = JSON.parse(localStorage.getItem('name'))

            let container = document.getElementById('messages-div-2');
            /*let message = document.createElement('div');
            message.classList = 'row align-items-center mb-4';
            let html = `<div class="col-auto">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/avatars/face-4.png" alt="..."
                                                     class="avatar-img rounded-circle">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <strong>${name}</strong>
                                            <div class="mb-2">Licence Plate Number : ${licencePlate}
                                            </div>
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`
            message.innerHTML = html;
            container.appendChild(message)*/

            let message2 = document.createElement('div');
            message2.classList = 'row align-items-center mb-4';
            let html2 = `<div class="col-auto">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/images/office_worker_at_work_4721901.png" alt="..."
                                                     class="avatar-img rounded-circle">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <strong>Madara</strong>
                                            <div class="mb-2">Your grievance has been filed successfully, id to use for tracking is <strong>${response.id}</strong>
                                            </div>
                                          
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`

            document.getElementById('submitButton').setAttribute("disabled", "true")
            message2.innerHTML = html2;
            setTimeout(() => {
                container.appendChild(message2)
            }, 2000);

            setTimeout(() => {
                document.getElementById('radi').classList.remove('d-none')
            }, 2000);
            setTimeout(() => {
                document.getElementById('last').classList.remove('d-none')
            }, 2000);
            /*setTimeout(() => {
                var radialbarChart, radialbarOptions = {
                    series: [10],
                    chart: {height: 200, type: "radialBar"},
                    plotOptions: {
                        radialBar: {
                            hollow: {size: "75%"},
                            track: {background: colors.borderColor},
                            dataLabels: {
                                show: !0,
                                name: {
                                    fontSize: "0.875rem",
                                    fontWeight: 400,
                                    offsetY: -10,
                                    show: !0,
                                    color: colors.mutedColor,
                                    fontFamily: base.defaultFontFamily
                                },
                                value: {
                                    formatter: function (e) {
                                        return parseInt(e)
                                    },
                                    color: colors.headingColor,
                                    fontSize: "1.53125rem",
                                    fontWeight: 700,
                                    fontFamily: base.defaultFontFamily,
                                    offsetY: 5,
                                    show: !0
                                },
                                total: {
                                    show: !0,
                                    fontSize: "0.875rem",
                                    fontWeight: 400,
                                    offsetY: -10,
                                    label: "Percent",
                                    color: colors.mutedColor,
                                    fontFamily: base.defaultFontFamily
                                }
                            }
                        }
                    },
                    fill: {
                        type: "gradient",
                        gradient: {
                            shade: "light",
                            type: "diagonal2",
                            shadeIntensity: .2,
                            gradientFromColors: [extend.primaryColorLighter],
                            gradientToColors: [extend.primaryColorDark],
                            inverseColors: !0,
                            opacityFrom: 1,
                            opacityTo: 1,
                            stops: [20, 100]
                        }
                    },
                    stroke: {lineCap: "round"},
                    labels: ["CPU"]
                }, radialbar = document.querySelector("#radialbar");
                radialbar && (radialbarChart = new ApexCharts(radialbar, radialbarOptions)).render();
            }, 1000);*/

            document.getElementById('exampleFormControlTextarea1').value = ""

        }
    });

}

function enterlPlate() {
    document.getElementById('submitButton').setAttribute("onclick", "getLicencePlate()");
    document.getElementById('submitButton').removeAttribute("disabled")

    let container = document.getElementById('messages-div-1');

    let message2 = document.createElement('div');
    message2.classList = 'row align-items-center mb-4';
    let html2 = `<div class="col-auto">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/images/office_worker_at_work_4721901.png" alt="..."
                                                     class="avatar-img rounded-circle">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <strong>Madara</strong>
                                            <div class="mb-2">Please Enter vehicle licence plate nubmer in the input field below and click submit
                                            </div>
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`

    message2.innerHTML = html2;
    setTimeout(() => {
        container.appendChild(message2)
    }, 3000);

    document.getElementById('exampleFormControlTextarea1').value = ""

    document.getElementById('submitButton').removeAttribute("onclick");
    document.getElementById('submitButton').setAttribute("onclick", "getLPlateNumber()");

}

function getLPlateNumber() {

    let licencePlate = document.getElementById('exampleFormControlTextarea1').value;
    localStorage.setItem('lPlateNumer', JSON.stringify(licencePlate))

    if (licencePlate != "") {
        let name = JSON.parse(localStorage.getItem('name'))

        let container = document.getElementById('messages-div-1');
        let message = document.createElement('div');
        message.classList = 'row align-items-center mb-4';
        let html = `<div class="col-auto">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/avatars/face-4.png" alt="..."
                                                     class="avatar-img rounded-circle">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <strong>${name}</strong>
                                            <div class="mb-2">Licence Plate Number : ${licencePlate}
                                            </div>
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`
        message.innerHTML = html;
        container.appendChild(message)

        setTimeout(() => {
            document.getElementById('multiSelect').classList.remove('d-none')
        }, 3000);

        document.getElementById('submitButton').removeAttribute("onclick");
        document.getElementById('submitButton').setAttribute("onclick", "geAdditionalInfomation()");
        document.getElementById('exampleFormControlTextarea1').value = ""

    } else {
        let container = document.getElementById('messages-div-2');
        let message2 = document.createElement('div');
        message2.classList = 'row align-items-center mb-4';
        let html2 = `<div class="col-auto">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/images/office_worker_at_work_4721901.png" alt="..."
                                                     class="avatar-img rounded-circle">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <strong>Madara</strong>
                                            <div class="mb-2">licence plate ca not be empty, Please fill in the licence plate</strong>
                                            </div>
                                          
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`

        message2.innerHTML = html2;
        setTimeout(() => {
            container.appendChild(message2)
        }, 3000);

        document.getElementById('exampleFormControlTextarea1').value = ""
    }
}


function getLicencePlate() {
    let data = JSON.parse(localStorage.getItem('data'));
    let licencePlate = document.getElementById('exampleFormControlTextarea1').value;
    if (licencePlate != "") {
        data.licencePlate = licencePlate;
        data.email = JSON.parse(localStorage.getItem('email'))

        console.log(data)

        $.ajax({
            url: 'http://localhost:8090/api/grieve/save-grievance',
            type: 'POST',
            dataType: "json",
            crossDomain: "true",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (response) {
                console.log(response)

                let name = JSON.parse(localStorage.getItem('name'))

                let container = document.getElementById('messages-div-2');
                let message = document.createElement('div');
                message.classList = 'row align-items-center mb-4';
                let html = `<div class="col-auto">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/avatars/face-4.png" alt="..."
                                                     class="avatar-img rounded-circle">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <strong>${name}</strong>
                                            <div class="mb-2">Licence Plate Number : ${licencePlate}
                                            </div>
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`
                message.innerHTML = html;
                container.appendChild(message)

                let message2 = document.createElement('div');
                message2.classList = 'row align-items-center mb-4';
                let html2 = `<div class="col-auto">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/images/office_worker_at_work_4721901.png" alt="..."
                                                     class="avatar-img rounded-circle">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <strong>Madara</strong>
                                            <div class="mb-2">Your grievance has been filed successfully, id to use for tracking is <strong>${response.id}</strong>
                                            </div>
                                          
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`

                document.getElementById('submitButton').setAttribute("disabled", "true")
                message2.innerHTML = html2;
                setTimeout(() => {
                    container.appendChild(message2)
                }, 2000);

                setTimeout(() => {
                    document.getElementById('radi').classList.remove('d-none')
                }, 2000);
                setTimeout(() => {
                    document.getElementById('last').classList.remove('d-none')
                }, 2000);
                /*setTimeout(() => {
                    var radialbarChart, radialbarOptions = {
                        series: [10],
                        chart: {height: 200, type: "radialBar"},
                        plotOptions: {
                            radialBar: {
                                hollow: {size: "75%"},
                                track: {background: colors.borderColor},
                                dataLabels: {
                                    show: !0,
                                    name: {
                                        fontSize: "0.875rem",
                                        fontWeight: 400,
                                        offsetY: -10,
                                        show: !0,
                                        color: colors.mutedColor,
                                        fontFamily: base.defaultFontFamily
                                    },
                                    value: {
                                        formatter: function (e) {
                                            return parseInt(e)
                                        },
                                        color: colors.headingColor,
                                        fontSize: "1.53125rem",
                                        fontWeight: 700,
                                        fontFamily: base.defaultFontFamily,
                                        offsetY: 5,
                                        show: !0
                                    },
                                    total: {
                                        show: !0,
                                        fontSize: "0.875rem",
                                        fontWeight: 400,
                                        offsetY: -10,
                                        label: "Percent",
                                        color: colors.mutedColor,
                                        fontFamily: base.defaultFontFamily
                                    }
                                }
                            }
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                shade: "light",
                                type: "diagonal2",
                                shadeIntensity: .2,
                                gradientFromColors: [extend.primaryColorLighter],
                                gradientToColors: [extend.primaryColorDark],
                                inverseColors: !0,
                                opacityFrom: 1,
                                opacityTo: 1,
                                stops: [20, 100]
                            }
                        },
                        stroke: {lineCap: "round"},
                        labels: ["CPU"]
                    }, radialbar = document.querySelector("#radialbar");
                    radialbar && (radialbarChart = new ApexCharts(radialbar, radialbarOptions)).render();
                }, 1000);*/

                document.getElementById('exampleFormControlTextarea1').value = ""

            }
        });
    } else {
        let container = document.getElementById('messages-div-2');
        let message2 = document.createElement('div');
        message2.classList = 'row align-items-center mb-4';
        let html2 = `<div class="col-auto">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/images/office_worker_at_work_4721901.png" alt="..."
                                                     class="avatar-img rounded-circle">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <strong>Madara</strong>
                                            <div class="mb-2">licence plate ca not be empty, Please fill in the licence plate</strong>
                                            </div>
                                          
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`

        message2.innerHTML = html2;
        setTimeout(() => {
            container.appendChild(message2)
        }, 3000);

        document.getElementById('exampleFormControlTextarea1').value = ""
    }
}

function login() {
    let email = document.getElementById('inputEmail').value
    let password = document.getElementById('inputPassword').value

    let data = {
        email,
        password
    }

    $.ajax({
        url: 'http://localhost:8090/api/user/login',
        type: 'POST',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            console.log(response)
            if (response.status === "success") {

                let fullName = response.grievanceUser.firstNane + " " + response.grievanceUser.lastName
                localStorage.setItem('email', JSON.stringify(response.grievanceUser.email))

                localStorage.setItem('name', JSON.stringify(fullName))
                window.location = "index-horizontal.html"
            } else if (response.status === "fail") {
                $('#verticalModal').modal('show')
            } else if (response.status == 500) {
                $('#verticalModal2').modal('show')
            }
        }
    })
}

$('#btn3').click(function (e) {

})

function clearFields() {
    let container = document.getElementById('messages-div-1');
    let container2 = document.getElementById('messages-div-2');

    setTimeout(() => {
        while (container.hasChildNodes()) {
            container.removeChild(container.firstChild)
        }
    }, 1000);

    setTimeout(() => {
        while (container2.hasChildNodes()) {
            container2.removeChild(container2.firstChild);
        }
    }, 1000);

    setTimeout(() => {
        document.getElementById('multiSelect').classList.add('d-none')
    }, 1000);
    setTimeout(() => {
        document.getElementById('radi').classList.add('d-none')
    }, 1000);
    setTimeout(() => {
        document.getElementById('last').classList.add('d-none')
    }, 1000);

    document.getElementById('btn1').removeAttribute("disabled")
    document.getElementById('btn2').removeAttribute("disabled", "false")
}

//Send Email from notices page
function SendMail() {

    var m1 = document.getElementById("mailSentToast");
    var m2 = document.getElementById("mailNotSentToast");


    m1.setAttribute("style", "display:none");
    m2.setAttribute("style", "display:none");


    var Message = document.getElementById("cont").value;
    var Name = document.getElementById("tName").value;
    var id = document.getElementById("tID").innerText;
    var Subject = document.getElementById("subject").value;
    var email = document.getElementById("T_email").value;

    var tempParams = {
        from_name: "New World",
        to_email: email,
        message: Message,
        reply_to: 'ninja.ld49@gmail.com',
        to_name: Name

    };
    emailjs.send('gmail', 'template_rqpdjmc', tempParams)
        .then(function (res) {
            console.log("success", res);
            var cont = document.getElementById("mailform");
            var foot = document.getElementById("emailfooter");
            var m1 = document.getElementById("mailSentToast");
            var m2 = document.getElementById("mailNotSentToast");

            if (res.status.toString() == "200") {
                cont.setAttribute("style", "display:none");
                foot.setAttribute("style", "display:none");
                m1.setAttribute("style", "display:all");
            }
        })
        .catch(function (error) {
            console.error("Error  : ", error);
            if (error.status == 412) {
                var message = document.getElementById("mailunsent");
                if (message) {
                    message.innerHTML = "Failed , Your Email is Invalid" + " <span class='fe fe-12 fe-alert-triangle ml-3' ></span>";
                }
                //  var cont=document.getElementById("mailform");
                // var foot=document.getElementById("emailfooter");
                // var m1=document.getElementById("mailSentToast");
                var m2 = document.getElementById("mailNotSentToast");

                // cont.setAttribute("style","display:none");
                //  foot.setAttribute("style","display:none");
                m2.setAttribute("style", "display:all");
            } else {

                var message = document.getElementById("mailunsent");
                if (message) {
                    message.innerHTML = "Failed ," + error.text + " <span class='fe fe-12 fe-alert-triangle ml-3' ></span>";
                }
                //  var cont=document.getElementById("mailform");
                // var foot=document.getElementById("emailfooter");
                // var m1 = document.getElementById("mailSentToast");
                var m2 = document.getElementById("mailNotSentToast");

                // cont.setAttribute("style","display:none");
                //  foot.setAttribute("style","display:none");
                m2.setAttribute("style", "display:all");
            }
        })

}

function qr() {
    let scanner = new Instascan.Scanner({video: document.getElementById('preview')});
    scanner.addListener('scan', function (content) {
        alert(content);
        console.log(content)

    });
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
            // scanner.stop(cameras[0])
        } else {
            console.error('No cameras found.');
        }
    }).catch(function (e) {
        console.error(e);
    });
}

function generateQR() {
    window.addEventListener("load", () => {
        let data = {
            licencePlate: "ABC 234-908",
            driver: "reaper ghost",
            conductor: "madara uchiha"
        }
        // (C1) CREATE QR
        var qrc = new QRCode(document.getElementById("qrcode"), {
            text: JSON.stringify(data),
            width: 400,
            height: 400,
            colorDark: "#bf2a2a"
        });

        // (C2) PRINT
        document.getElementById("qrprint").onclick = () => {
            var printwin = window.open("");
            printwin.document.write(document.getElementById("printable").innerHTML);
            printwin.stop();
            let qr = printwin.document.querySelector("#qrcode img");
            qr.addEventListener("load", () => {
                printwin.print();
                printwin.close();
            });
        };
    });

    /*window.addEventListener("load", () => {
        let qrc = new QRCode(document.getElementById("qrcode"), {
            text: '{"reaper":"Ghost"}',
            width: 400,
            height: 400,
            colorDark: "#bf2a2a"
        });
    });*/
}


//////////////////////////////////////////////////////////////Admin//////////////////////////////////////////
function saveBus() {
    let licencePlate = document.getElementById("licencePlate").value
    let driver = document.getElementById("driver").value
    let conductor = document.getElementById("conductor").value
    let route = document.getElementById("route").value
    let contact = document.getElementById("contact").value
    let vehicleType = document.getElementById("simple-select499").value

    let data = {
        licencePlate,
        driver,
        conductor,
        route,
        contact,
        vehicleType
    }


    $.ajax({
        url: '/api/vehicle/save',
        type: 'POST',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            let element = document.getElementById("toast");

            // document.getElementById("verticalModal").classList = "modal fade"
            $('#verticalModal').modal('hide')
            $('#successModal').modal('show')

            console.log(response)
            getVehicles()

        }
    })
}

function getVehicles() {
    $.ajax({
        url: '/api/vehicle/get-all-vehicles',
        type: 'GET',
        success: function (response) {
            console.log(response)

            localStorage.setItem("vehicles", JSON.stringify(response));

            let t_body = document.getElementById("t_body");

            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }
            // console.log(response[1].paymentDate)

            for (let i = response.length - 1; i >= 0; i--) {
                let html = `<td>${response[i].date}</td>
                                                    <td>${response[i].licencePlate}</td>
                                                    <td>${response[i].driver}</td>
                                                    <td>${response[i].conductor}</td>
                                                    <td>${response[i].contact}</td>
                                                    <td><span class="text-success">${response[i].route}</span></td>
                                                    <td>${response[i].vehicleType}</td>
                                                    <td><button type="button" onclick="viewVehicle('${response[i].id}')" class="btn btn-secondary btn-sm"><i class="bi bi-trash-fill"></i>view </button></td>
                                                    `

                let tr = document.createElement('tr');
                tr.innerHTML = html;

                t_body.appendChild(tr);
            }
        }
    })
}

function viewVehicle(id) {
    let vehicles = JSON.parse(localStorage.getItem('vehicles'));

    for (let i = 0; i < vehicles.length; i++) {
        if (vehicles[i].id == id) {
            document.getElementById('licencePlate_view').innerText = vehicles[i].licencePlate;
            document.getElementById('driver_view').innerText = vehicles[i].driver;
            document.getElementById('conductor_view').innerText = vehicles[i].conductor;
            document.getElementById('route_view').innerText = vehicles[i].route;
            document.getElementById('contact_view').innerText = vehicles[i].contact;
            document.getElementById('vehicle_type_view').innerText = vehicles[i].vehicleType;

            let data = {
                id: vehicles[i].id
                /*licencePlate : vehicles[i].licencePlate,
                driver : vehicles[i].driver,
                conductor: vehicles[i].conductor,
                route: vehicles[i].route,
                contact: vehicles[i].contact,
                vehicle_type: vehicles[i].vehicleType*/
            }
            document.getElementById("qrcode").innerHTML = "";
            // (C1) CREATE QR
            let qrc = new QRCode(document.getElementById("qrcode"), {
                text: JSON.stringify(data),
                width: 400,
                height: 400,
                colorDark: "#000000"
            });

            // (C2) PRINT
            document.getElementById("qrprint").onclick = () => {
                var printwin = window.open("");
                printwin.document.write(document.getElementById("printable").innerHTML);
                printwin.stop();
                let qr = printwin.document.querySelector("#qrcode img");
                qr.addEventListener("load", () => {
                    printwin.print();
                    printwin.close();
                });
            };
        }
    }


    $('#verticalModal2').modal('show')

}

function getGrievances() {
    $.ajax({
        url: '/api/grieve/get-all-grievances',
        type: 'GET',
        success: function (response) {
            console.log(response)

            localStorage.setItem("grievances", JSON.stringify(response));

            let t_body = document.getElementById("t_body");

            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }
            // console.log(response[1].paymentDate)

            for (let i = response.length - 1; i >= 0; i--) {
                let html = `<td>${response[i].date}</td>
                                                    <td><!--${response[i].grievanceUser.firstNane + " " + response[i].grievanceUser.lastName}--></td>
                                                    <td>${response[i].licencePlate}</td>
                                                    <td>${response[i].cartegories}</td>
                                                    <td>${response[i].grievanceUser.phone + ", " + response[i].email}</td>
                                                    <td><span class="text-success">${response[i].status}</span></td>
                                                    <td><button type="button" onclick="admin_view_grievance('${response[i].id}')" class="btn btn-secondary btn-sm"><i class="bi bi-trash-fill"></i>view </button></td>
                                                    `

                let tr = document.createElement('tr');
                tr.innerHTML = html;

                t_body.appendChild(tr);
            }
        }
    })
}

function  admin_view_grievance(id){
    document.getElementById('graph-div').innerHTML = ''
    document.getElementById('graph-div').innerHTML = '<div id="radialbar2"></div>'

    let grievances = JSON.parse(localStorage.getItem('grievances'));

    localStorage.removeItem("view_grivance");
    localStorage.setItem("view_grivance", JSON.stringify(id));

    for (let i = 0; i < grievances.length; i++){
        if (grievances[i].id == id){
            let statusString = "";

            if (grievances[i].status == 1) {
                statusString = "filed Grievance";
            } else if (grievances[i].status == 2) {
                statusString = "grievance Viewed" ;
            } else if (grievances[i].status == 3) {
                statusString = "Investigator assigned";
            } else if (grievances[i].status == 4) {
                statusString = "Bus stuff brought for questioning"
            } else if (grievances[i].status == 5) {
                statusString = "Issue solved";
            }

            document.getElementById('email').innerText = grievances[i].email ;
            document.getElementById('vehicle').innerText = grievances[i].licencePlate ;
            document.getElementById('f_date').innerText = grievances[i].date ;
            document.getElementById('status').innerText = statusString;
            document.getElementById('additional_info').innerText = grievances[i].additionalInfomation ;
            document.getElementById('g_category').innerText = grievances[i].cartegories ;

            let status = 10;
            if (grievances[i].status == 1) {
                status = 10;
            } else if (grievances[i].status == 2) {
                status = 25;
            } else if (grievances[i].status == 3) {
                status = 45;
            } else if (grievances[i].status == 4) {
                status = 75
            } else if (grievances[i].status == 5) {
                status = 100;
            }
            var radialbarChart, radialbarOptions = {
                series: [status],
                chart: {height: 200, type: "radialBar"},
                plotOptions: {
                    radialBar: {
                        hollow: {size: "75%"},
                        track: {background: colors.borderColor},
                        dataLabels: {
                            show: !0,
                            name: {
                                fontSize: "0.875rem",
                                fontWeight: 400,
                                offsetY: -10,
                                show: !0,
                                color: colors.mutedColor,
                                fontFamily: base.defaultFontFamily
                            },
                            value: {
                                formatter: function (e) {
                                    return parseInt(e)
                                },
                                color: colors.headingColor,
                                fontSize: "1.53125rem",
                                fontWeight: 700,
                                fontFamily: base.defaultFontFamily,
                                offsetY: 5,
                                show: !0
                            },
                            total: {
                                show: !0,
                                fontSize: "0.875rem",
                                fontWeight: 400,
                                offsetY: -10,
                                label: "Percent",
                                color: colors.mutedColor,
                                fontFamily: base.defaultFontFamily
                            }
                        }
                    }
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shade: "light",
                        type: "diagonal2",
                        shadeIntensity: .2,
                        gradientFromColors: [extend.primaryColorLighter],
                        gradientToColors: [extend.primaryColorDark],
                        inverseColors: !0,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [20, 100]
                    }
                },
                stroke: {lineCap: "round"},
                labels: ["CPU"]
            }, radialbar = document.querySelector("#radialbar2");
            radialbar && (radialbarChart = new ApexCharts(radialbar, radialbarOptions)).render();

            $('#verticalModal2').modal('show')
        }
    }
}

function  updateGrievanceStatus(){
    let id = JSON.parse(localStorage.getItem('view_grivance'));

    let g_status = document.getElementById('custom-select').value;

    let data = {
        status: g_status
    }
    $.ajax({
        url: '/api/grieve/update-grievance/'+id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (grievances) {
            document.getElementById('graph-div').innerHTML = ''
            document.getElementById('graph-div').innerHTML = '<div id="radialbar2"></div>'
            let statusString = "";

            if (grievances.status == 1) {
                statusString = "filed Grievance";
            } else if (grievances.status == 2) {
                statusString = "grievance Viewed" ;
            } else if (grievances.status == 3) {
                statusString = "Investigator assigned";
            } else if (grievances.status == 4) {
                statusString = "Bus stuff brought for questioning"
            } else if (grievances.status == 5) {
                statusString = "Issue solved";
            }

            document.getElementById('status').innerText = statusString;

            let status = 10;
            if (grievances.status == 1) {
                status = 10;
            } else if (grievances.status == 2) {
                status = 25;
            } else if (grievances.status == 3) {
                status = 45;
            } else if (grievances.status == 4) {
                status = 75
            } else if (grievances.status == 5) {
                status = 100;
            }
            var radialbarChart, radialbarOptions = {
                series: [status],
                chart: {height: 200, type: "radialBar"},
                plotOptions: {
                    radialBar: {
                        hollow: {size: "75%"},
                        track: {background: colors.borderColor},
                        dataLabels: {
                            show: !0,
                            name: {
                                fontSize: "0.875rem",
                                fontWeight: 400,
                                offsetY: -10,
                                show: !0,
                                color: colors.mutedColor,
                                fontFamily: base.defaultFontFamily
                            },
                            value: {
                                formatter: function (e) {
                                    return parseInt(e)
                                },
                                color: colors.headingColor,
                                fontSize: "1.53125rem",
                                fontWeight: 700,
                                fontFamily: base.defaultFontFamily,
                                offsetY: 5,
                                show: !0
                            },
                            total: {
                                show: !0,
                                fontSize: "0.875rem",
                                fontWeight: 400,
                                offsetY: -10,
                                label: "Percent",
                                color: colors.mutedColor,
                                fontFamily: base.defaultFontFamily
                            }
                        }
                    }
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shade: "light",
                        type: "diagonal2",
                        shadeIntensity: .2,
                        gradientFromColors: [extend.primaryColorLighter],
                        gradientToColors: [extend.primaryColorDark],
                        inverseColors: !0,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [20, 100]
                    }
                },
                stroke: {lineCap: "round"},
                labels: ["CPU"]
            }, radialbar = document.querySelector("#radialbar2");
            radialbar && (radialbarChart = new ApexCharts(radialbar, radialbarOptions)).render();
        }
    });
}

/*chat*/

function insertMessage(){
    let msg = $('.message-input').val();
    if ($.trim(msg) == '') {
        return false;
    }
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    $('.message-input').val(null);
    updateScrollbar();
    /*setTimeout(function() {
        fakeMessage();
    }, 1000 + (Math.random() * 20) * 100);*/
}

function fakeMessage(message){
    if ($('.message-input').val() != '') {
        return false;
    }
    $('<div class="message loading new"><figure class="avatar"><img src="./assets/images/office_worker_at_work_4721901.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    updateScrollbar();

    setTimeout(function() {
        $('.message.loading').remove();
        $('<div class="message new"><figure class="avatar"><img src="./assets/images/office_worker_at_work_4721901.png" /></figure>' + message + '</div>').appendTo($('.mCSB_container')).addClass('new');
        setDate();
        updateScrollbar();
        // i++;
    }, 2000 + (Math.random() * 20) * 100);
}

function firstOption () {
    let msg = $('.message-input').val();
    console.log(msg)
    insertMessage()
    if (msg == 1){
        fakeMessage('There are Two ways to file a grievance, Please select one');
        setTimeout(function() {
            fakeMessage(` 1. Scan QR code <br> 2. Enter Licence Plate`);
        }, 500);
    }

    document.getElementById('btn_send').removeAttribute('onclick');
    document.getElementById('btn_send').setAttribute('onclick', 'secondOption()');
}

function getScannedVehicle(vehicle) {
    $.ajax({
        url: '/api/vehicle/get-all-vehicles',
        type: 'GET',
        success: function (response) {
            console.log(response)

            localStorage.setItem("vehicles", JSON.stringify(response));

            for (let i = 0; i < response.length; i++) {
                if (vehicle == response[i].id) {
                    localStorage.setItem('lPlateNumer', JSON.stringify(response[i].licencePlate))

                    fakeMessage('below is the information for the bus you selected');
                    setTimeout(function() {
                        fakeMessage(`Licence plate : ${response[i].licencePlate}, <br> Driver : ${response[i].driver},  <br> Conductor : ${response[i].conductor},  <br> Route : ${response[i].route}`);
                    }, 2000);


                    setTimeout(function() {
                        fakeMessage(`Please describe the nature of  <br> your grievance and site all challenges <br> faced with the vehicle above`);
                    },3000);

                    document.getElementById('btn_send').removeAttribute('onclick');
                    document.getElementById('btn_send').setAttribute('onclick', 'getDescription()');
                }
            }
        }
    })
}

function secondOption(){
    let msg = $('.message-input').val();
    console.log(msg)
    insertMessage()
    if (msg == 1){
        fakeMessage('I am going to open your camera so you scan the QR code');

        setTimeout(function() {
            let scanner = new Instascan.Scanner({video: document.getElementById('preview2')});
            scanner.addListener('scan', function (content) {
                alert(content);
                console.log(content)
                let qrData = JSON.parse(content);

                scanner.stop()

                getScannedVehicle(qrData.id);


                document.getElementById('preview2').remove();

            });
            Instascan.Camera.getCameras().then(function (cameras) {
                if (cameras.length > 0) {
                    scanner.start(cameras[0]);
                    // scanner.stop(cameras[0])
                } else {
                    console.error('No cameras found.');
                }
            }).catch(function (e) {
                console.error(e);
            });
        }, 2000);
    }else if (msg == 2){
        fakeMessage('Enter Licence plate')
        document.getElementById('btn_send').removeAttribute('onclick');
        document.getElementById('btn_send').setAttribute('onclick', 'getLicencePlateChat()');
    }
}

function getDescription(){
    let msg = $('.message-input').val();
    console.log(msg)
    insertMessage()

    var radialbarChart, radialbarOptions = {
        series: [10],
        chart: {height: 200, type: "radialBar"},
        plotOptions: {
            radialBar: {
                hollow: {size: "75%"},
                track: {background: colors.borderColor},
                dataLabels: {
                    show: !0,
                    name: {
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        offsetY: -10,
                        show: !0,
                        color: colors.mutedColor,
                        fontFamily: base.defaultFontFamily
                    },
                    value: {
                        formatter: function (e) {
                            return parseInt(e)
                        },
                        color: colors.headingColor,
                        fontSize: "1.53125rem",
                        fontWeight: 700,
                        fontFamily: base.defaultFontFamily,
                        offsetY: 5,
                        show: !0
                    },
                    total: {
                        show: !0,
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        offsetY: -10,
                        label: "Percent",
                        color: colors.mutedColor,
                        fontFamily: base.defaultFontFamily
                    }
                }
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "diagonal2",
                shadeIntensity: .2,
                gradientFromColors: [extend.primaryColorLighter],
                gradientToColors: [extend.primaryColorDark],
                inverseColors: !0,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [20, 100]
            }
        },
        stroke: {lineCap: "round"},
        labels: ["CPU"]
    }, radialbar = document.querySelector("#radialbarx");
    radialbar && (radialbarChart = new ApexCharts(radialbar, radialbarOptions)).render();

}

function getLicencePlateChat(){
    let msg = $('.message-input').val();
    console.log(msg)
    insertMessage()

    fakeMessage(`Please describe the nature of  <br> your grievance and site all challenges <br> faced with the vehicle above`);


    document.getElementById('btn_send').removeAttribute('onclick');
    document.getElementById('btn_send').setAttribute('onclick', 'getDescription()');
}

function firstMsg() {
    $messages.mCustomScrollbar();
    fakeMessage(`Hie ${localStorage.getItem('name')}`);
    setTimeout(function() {
        fakeMessage(`Please select an option  <br> 1. File grievance  <br> 2. Track Grievance`);
    }, 100);

}