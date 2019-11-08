if (window.addEventListener){
    window.addEventListener('load',getURLParameters,false);
    window.addEventListener('load',getApp);
}
else {  // Internet Explorer
    window.attachEvent('onload',getURLParameters);
    window.attachEvent('onload',getApp);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./js/worker.js')
        .then(function(registration) {
            console.log('Registration successful, scope is:', registration.scope);
        })
        .catch(function(error) {
            console.log('Service worker registration failed, error:', error);
        });
}

var clientId;

var app = {
    isLoading: true,
    addDialog: document.querySelector('.dialog-container')
};

/* document.getElementById('butAddDay').addEventListener('click', function() {
    document.getElementById('butAddDay').innerHTML = "Day added";

});

document.getElementById('butCancel').addEventListener('click', function() {
    document.getElementById('daytime').style.display = "none";

    //app.addDialog.classList.remove('dialog-container--visible');
});

document.getElementById('butAddTime').addEventListener('click', function() {
  document.getElementById('butAddTime').innerHTML = "Time added";
  
}); */

document.getElementById('Submit').addEventListener('click', function() {
	var x = document.getElementById('time').value;
    var y = document.getElementById('day').value;
	if (x == "" || y == ""){
		alert("Please Fill All Fields !");
	}
	else{
		var hours = x.split(":")[0];
		var minutes = x.split(":")[1];
		var suffix = hours >= 12 ? "PM" : "AM";
		if(hours > 12)
			hours = hours%12;
		var displayTime = hours + ":" + minutes + " " + suffix;
    document.getElementById("daytime").innerHTML = '<h2>Selected Notification Day and Time</h2><b>Day Selected</b><br />' + y + '<br /><b>Time selected</b><br />' + displayTime + '<br /><br /><button type="OK" onclick="datetimeselected()">OK</button>';
}

});

function datetimeselected() {
document.getElementById("daytime").innerHTML = "";
 //document.write("Response Submited");
 //alert("Response Submited");
 //window.location.reload();
}

function showDayTime() {
    var x = document.getElementById("daytime");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function getApp() {
    var xmlhttp = new XMLHttpRequest();
    var array = [];
    var appList='';
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var myObj = JSON.parse(this.responseText);

            if(clientId == '' || clientId == undefined)
            {
              clientId = '1';
            }
            // Get client's applications
             for (var i = 0; i < myObj.length; i++)
             {
               if(myObj[i].clientId == clientId)
               {
                // Get client branding
                document.getElementById("clientImage").src = "./pics/" + myObj[i].clientImage;
                document.getElementById("clientName").innerHTML = myObj[i].clientName;
                
                appList += "<li> <button type=\"submit\" onclick=\"showDayTime()\""+
                "style=\"background-color:transparent; border-color:transparent;\"> <img src=\"./pics/" + myObj[i].appImage + "\" </img></li>";
        
                  //array[i].push(myObj.appName);
               }
             }
             appList += "<li> <button type=\"submit\" style=\"background-color:transparent; border-color:transparent;\">" +
                   "<img src=\"./pics/provideFeedback.png\" /></button></li>"
            document.getElementById("getApp").innerHTML =appList;
        }
    };
    xmlhttp.open("GET", "./../api/preference_data.json", true);
    xmlhttp.send();

}

var Clients = (function() {
    function ClientViewModel() {
        var self = this;
        self.clientName = "";
        self.clientImage = "";
        self.appName = "";
    }

    function GetClientList() {
        var self = this;

        // retrieves all Clients from the API
        self.getAll = function() {
            return new Promise(function(resolve, reject) {
                var request = new XMLHttpRequest();
                request.open('GET', './api/preference_data.json');

                request.onload = function() {
                    // success
                    if (request.status === 200) {
                        // resolve the promise with the parsed response text (assumes JSON)
                        resolve(JSON.parse(request.response));
                    } else {
                        // error retrieving file
                        reject(Error(request.statusText));
                    }
                };

                request.onerror = function() {
                    // network errors
                    reject(Error("Network Error"));
                };

                request.send();
            });
        };
    }

    function ClientAdapter() {
        var self = this;

        self.toClientViewModel = function(data) {
            if (data) {
                var vm = new ClientViewModel();
                vm.clientName = data.clientName;
                vm.clientImage = data.clientImage;
                vm.appName = data.appName;
                return vm;
            }
            return null;
        };

        self.toClientViewModels = function(data) {
            if (data && data.length > 0) {
                return data.map(function(item) {
                    return self.toClientViewModel(item);
                });
            }
            return [];
        };
    }

    function ClientController(GetClientList, ClientAdapter) {
        var self = this;

        self.getAll = function() {
            // retrieve all the Clients from the API
            return GetClientList.getAll().then(function(response) {
                return ClientAdapter.toClientViewModels(response);
            });
        };
    }

    // initialize the services and adapters
    var GetClientList = new GetClientList();
    var ClientAdapter = new ClientAdapter();

    // initialize the controller
    var ClientController = new ClientController(GetClientList, ClientAdapter);

    return {
        loadData: function() {
            // retrieve all routes
            document.querySelector(".Clients-list").classList.add('loading')
            ClientController.getAll().then(function(response) {
                // bind the Clients to the UI
                Page.vm.Clients(response);
                document.querySelector(".Clients-list").classList.remove('loading')
            });
        }
    }
})();

function getURLParameters() {
    const params = new URLSearchParams(location.search);
    clientId = params.get('i');
    console.log('clientId: ', clientId);
}