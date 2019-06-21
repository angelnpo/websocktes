class WebSocketClient{

	constructor(protocol, hostname, port, endpoint) {        
        this.webSocket = null;        
        this.protocol = protocol;
        this.hostname = hostname;
        this.port     = port;
        this.endpoint = endpoint;
	}

    getServerUrl() {
    	return this.protocol + "://" + this.hostname + ":" + this.port + this.endpoint;
    }

	connect(){
		try{
			this.webSocket = new WebSocket(this.getServerUrl());

			// Implement WebSocket event handlers
			this.webSocket.onopen = (event)=>{
				console.log('onopen::' + JSON.stringify(event, null, 4));
			}			
			this.webSocket.onmessage = (event)=>{
				let echoText = document.getElementById("echoText");
				let msg = event.data;
				echoText.value += "Message received from to the server : " + msg;
                //console.log('onmessage::' + JSON.stringify(msg, null, 4));
			}
			this.webSocket.onclose = function(event) {
                console.log('onclose::' + JSON.stringify(event, null, 4));                
            }
            this.webSocket.onerror = function(event) {
                console.log('onerror::' + JSON.stringify(event, null, 4));
            }

		}catch(e){
			console.error(e);
		}
	}

	getStatus() {
        return this.webSocket.readyState;
    }

    send(message) {        
        if (this.webSocket.readyState == WebSocket.OPEN) {
            this.webSocket.send(message);            
        } else {
            console.error('webSocket is not open. readyState = ' + this.webSocket.readyState);
        }
    }

    disconnect() {
        if (this.webSocket.readyState == WebSocket.OPEN) {
            this.webSocket.close();            
        } else {
            console.error('webSocket is not open. readyState = ' + this.webSocket.readyState);
        }
    }

}