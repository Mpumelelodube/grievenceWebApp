function clearLocal() {
    let name = JSON.parse(localStorage.getItem('name'))
    let email = JSON.parse(localStorage.getItem('email'));
    localStorage.clear();
    localStorage.setItem('cat', JSON.stringify(''))
    localStorage.setItem('name', JSON.stringify(name))
    localStorage.setItem('email', JSON.stringify(email))
}

function setData() {
    let data = JSON.parse(localStorage.getItem('cat'))
    data = data + ", " + document.getElementById('multi-select2').value
    localStorage.removeItem('cat');
    localStorage.setItem('cat', JSON.stringify(data));
}

function saveUser() {
    let firstNane = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    let email = document.getElementById("inputEmail4").value;
    let password = document.getElementById("inputPassword5").value;

    let data = {
        firstNane,
        lastName,
        email,
        password
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

            setTimeout(() => {window.location = 'index.html'}, 5000);

        }
    })
}

function getGrievences() {
    $.ajax({
        url: 'http://localhost:8090/api/payment/get-payments',
        type: 'GET',
        success: function (response) {
        }
    })
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
    let name = JSON.parse(localStorage.getItem('name'))
    let container = document.getElementById('messages-div');
    let message = document.createElement('div');
    message.classList = 'row align-items-center d-flex justify-content-end mb-4';
    let html = `<div class="col-auto ">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/avatars/face-4.png" alt="..."
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
    // container.appendChild(message)

    $("#messages-div").append(message).delay(2000).fadeIn(10000)
    document.getElementById('btn1').setAttribute("disabled", "tue")
    document.getElementById('btn2').setAttribute("disabled", "tue")
})

$("#btn2").click(function (e) {
    let name = JSON.parse(localStorage.getItem('name'))
    let container = document.getElementById('messages-div');
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

    setTimeout(() => {document.getElementById('multiSelect').classList.remove('d-none')}, 3000);

    document.getElementById('submitButton').removeAttribute("disabled")
})

function getCartegoryInput() {
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
                                            <div class="mb-2">${cartegories + " " + additionalInfomation}
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
    document.getElementById('submitButton').setAttribute("onclick", "getLicencePlate()");

    let message2 = document.createElement('div');
    message2.classList = 'row align-items-center mb-4';
    let html2 = `<div class="col-auto">
                                            <div class="avatar avatar-sm mb-3 mx-4">
                                                <img src="./assets/images/office_worker_at_work_4721901.png" alt="..."
                                                     class="avatar-img rounded-circle">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <strong>Your Name Here</strong>
                                            <div class="mb-2">Please Enter vehicle licence plate number int the input field below and click submit
                                            </div>
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`

    message2.innerHTML = html2;
    setTimeout(() => {container.appendChild(message2)}, 3000);


}

function getLicencePlate() {
    let data = JSON.parse(localStorage.getItem('data'));
    let licencePlate = document.getElementById('exampleFormControlTextarea1').value;
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
                                                <img src="./assets/avatars/face-4.ppng" alt="..."
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
                                            <strong>Your Name Here</strong>
                                            <div class="mb-2">Your grievance has been filed successfully, id to use for tracking is <strong>${response.id}</strong>
                                            </div>
                                            <button class="btn btn-outline-primary  btn-block" id="btn3">
                                                            okay
                                                        </button>
                                            <small class="text-muted">2020-04-21 12:01:22</small>
                                        </div>
                                        <div class="col-auto">
                                          <span class="circle circle-sm bg-light">
                                            <i class="fe fe-corner-down-left"></i>
                                          </span>
                                        </div>`

            document.getElementById('submitButton').setAttribute()("disabled", "true")
            message2.innerHTML = html2;
            setTimeout(() => {container.appendChild(message2)}, 5000);
        }
    });
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
    let container = document.getElementById('messages-div-1');
    let container2 = document.getElementById('messages-div-2');

    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }

    while (container2.hasChildNodes()) {
        container2.removeChild(container2.firstChild);
    }
})

//Send Email from notices page
function SendMail(){

    var m1 = document.getElementById("mailSentToast");
    var m2 = document.getElementById("mailNotSentToast");


    m1.setAttribute("style", "display:none");
    m2.setAttribute("style", "display:none");


    var Message=document.getElementById("cont").value;
    var Name = document.getElementById("tName").value;
    var id = document.getElementById("tID").innerText;
    var Subject=document.getElementById("subject").value;
    var email =document.getElementById("T_email").value;

    var tempParams={
        from_name:"New World",
        to_email:email,
        message:Message,
        reply_to:'ninja.ld49@gmail.com',
        to_name:Name

    };
    emailjs.send('gmail','template_rqpdjmc',tempParams)
        .then(function(res){
            console.log("success",res);
            var cont=document.getElementById("mailform");
            var foot=document.getElementById("emailfooter");
            var m1=document.getElementById("mailSentToast");
            var m2=document.getElementById("mailNotSentToast");

            if(res.status.toString()=="200"){
                cont.setAttribute("style","display:none");
                foot.setAttribute("style","display:none");
                m1.setAttribute("style","display:all");
            }
        })
        .catch(function(error){
            console.error("Error  : ",error);
            if(error.status==412){
                var message=document.getElementById("mailunsent");
                if(message){
                    message.innerHTML="Failed , Your Email is Invalid"+" <span class='fe fe-12 fe-alert-triangle ml-3' ></span>";
                }
                //  var cont=document.getElementById("mailform");
                // var foot=document.getElementById("emailfooter");
                // var m1=document.getElementById("mailSentToast");
                var m2=document.getElementById("mailNotSentToast");

                // cont.setAttribute("style","display:none");
                //  foot.setAttribute("style","display:none");
                m2.setAttribute("style","display:all");
            }else {

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