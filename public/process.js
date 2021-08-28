$(document).ready(function(){

    const abi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_vi",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "SM_respone_data",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "Resgister",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "arrStudent",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "_ID",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_WA",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const addressSM = "0x44c128aAB0441d0bD5a0857D648A47Cf8caF0A5B";

    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();

    //Create Contract for Meta Mask
    const contract_MM = new web3.eth.Contract(abi, addressSM);

    let currentAccount = "";

    //Create Contact for Infura
    const provider = new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/71e6b2cca8ed41f39fac3dced733e6e5");
    let _web3Infura = new Web3(provider);
    let contact_Infura = _web3Infura.eth.Contract(abi, addressSM);
    contact_Infura.events.SM_respone_data({filter: {}, fromBlock: "latest"}, 
        function(error, event) {
            if(error){
                console.log('Infura Error: ' + error);
            }else{
                $("#td-transaction").append(`
                <tr style="text-align: center; padding: 4px; border-bottom: solid 1px black;">
                    <td> ${event.returnValues[0]} </td>
                    <td> ${event.returnValues[1]} </td>
                </tr>
                `)
            }
        }
    )

    checkMM();
    $("#btnConnectWallet").click(() =>{
        connectMM()
        .then(data => {
            currentAccount = data[0];
            $("#txtAddress").html("<b>" + data[0] + "</b>");
            $("#btnConnectWallet").hide()
            $("#btnDisconnectWallet").show()
        }).catch(err => {
            alert('Connect Meta Mask Failure ' + err)
        })
    })

    $("#btnSignIn").click(() =>{
        if(currentAccount.length < 0){
            return alert('Connect Meta Mask to countinue process!')
        }
        $.post("./register", {
            Email: $("#txtEmail").val(),
            Name: $("#txtName").val(),
            Phone: $("#txtPhone").val(),
        }, (data)=>{
            if(data.success === true){
                contract_MM.methods.Resgister(data.new_student._id).send({
                    from: currentAccount,
                })
            }else{
                alert('Register Failure' + data.msg ? data.msg : '')
            }
            $("#txtEmail").val("")
            $("#txtName").val("")
            $("#txtPhone").val("")
        })
    })

    
});

async function connectMM(){
    return await ethereum.request({ method: 'eth_requestAccounts' });
}

function checkMM(){
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    }else{
        alert('MetaMask is required')
    }
}

