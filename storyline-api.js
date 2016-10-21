var StoryLineAPI = {
    getVar: function (x) {
        var player = GetPlayer();
        return player.GetVar(x);
    },
    setVar: function (x, v) {
        var player = GetPlayer();
        return player.SetVar(x, v);
    }
};

var ServerAPI = {
    sendData: function (url, variable, value) {
        var data = [{ 'variable': variable, 'value': value }];
        var dataString = JSON.stringify(data);
        if (StoryLineAPI.getVar('Debug') === 'true') {
            alert('Sending data to server: ' + dataString);
        }

        $.ajax({
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            url: url + '/index.php',
            data: { data: dataString },
            dataType: 'json'
        });
    }
};

var App = {
    saveData: function (variable, value) {
        var val = StoryLineAPI.getVar(variable);
        if (typeof value !== 'undefined') {
            val = value;
        }
        ServerAPI.sendData(variable, val);
    },
    init: function () {
        $(document).ajaxError(function (event, request, settings) {
            alert(JSON.stringify(request));
        });
    }
};

App.init();
