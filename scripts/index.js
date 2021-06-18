const websocket_endpoint = "wss://relay.aricodes.net/ws";
var items = document.getElementById("items");
var tools = document.getElementById("tools");

var healthnodetext = document.getElementById("healthnodetext");
var healthfragmenttext = document.getElementById("healthfragmenttext");
var powernodetext = document.getElementById("powernodetext");
var powerfragmenttext = document.getElementById("powerfragmenttext");
var sizenodetext = document.getElementById("sizenodetext");
var rangenodetext = document.getElementById("rangenodetext");

window.onload = function () 
{
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const username = urlParams.get('username');
	if (username != null) {
		const socket = new WebSocket(websocket_endpoint);
		socket.onopen = () => socket.send(`listen:${username}`);
		socket.onmessage = (event) => appendData(JSON.parse(event.data));
	}
	else {
		let mainContainer = document.getElementById("srtQueryData");
		mainContainer.innerHTML = "Please provide username params to url to listen to.";
	}
};

function appendData(data) 
{
	ClearAll();

	console.log(data);
	data.Items.forEach((item) => {
		if (item.mType == 11) 
		{
			items.innerHTML += `<img class="weapon" src="images/${item.mName}.svg"/>`;
		}
		else if (item.mType == 10 || item.mType == 5) 
		{
			tools.innerHTML += `<img class="tool" src="images/${item.mName}.svg"/>`;
		}
	});

	healthnodetext.innerHTML = `X${data.HealthNodes}`;
	healthfragmenttext.innerHTML = `X${data.HealthNodeFragments}`;
	powernodetext.innerHTML = `X${data.PowerNodes}`;
	powerfragmenttext.innerHTML = `X${data.PowerNodesFragments}`;
	sizenodetext.innerHTML = `X${data.SizeNodes}`;
	rangenodetext.innerHTML = `X${data.RangeNodes}`;
}

function ClearAll() {
	items.innerHTML = ``;
	tools.innerHTML = ``;
	healthnodetext.innerHTML = "X0";
	healthfragmenttext.innerHTML = "X0";
	powernodetext.innerHTML = "X0";
	powerfragmenttext .innerHTML = "X0";
	sizenodetext.innerHTML = "X0";
	rangenodetext.innerHTML = "X0";
}