UnityInstance = null;

function writeMotorPowers() { }

function fileToByteArray(file) {
    return new Promise((resolve, reject) => {
        try {
            let reader = new FileReader();
            let fileByteArray = [];
            reader.readAsArrayBuffer(file);
            reader.onloadend = (evt) => {
                if (evt.target.readyState == FileReader.DONE) {
                    let arrayBuffer = evt.target.result,
                        array = new Uint8Array(arrayBuffer);
                    for (byte of array) {
                        fileByteArray.push(byte);
                    }
                }
                resolve(fileByteArray);
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

async function getByteArray() {
    var myLog = new File([], "/custom_robots/shooterbot/unitycomp_0.stl");
    //Wait for the file to be converted to a byteArray
    let byteArray = await fileToByteArray(myLog);

    //Do something with the byteArray
    console.log("btyeArrya: " + byteArray);
}
getByteArray();


function sendFilesToUnity() {
    var myLog = new File("/custom_robots/shooterbot/unitycomp_0.stl");
    UnityInstance.SendMessage("RobotManager", "recieveRobotFile", ["unitycomp_0.stl", ""]);
    UnityInstance.SendMessage("RobotManager", "recieveRobotFile", ["unitycomp_1.stl", ""]);
    UnityInstance.SendMessage("RobotManager", "recieveRobotFile", ["unitycomp_6.stl", ""]);
    UnityInstance.SendMessage("RobotManager", "recieveRobotFile", ["unitycomp_7.stl", ""]);
    UnityInstance.SendMessage("RobotManager", "recieveRobotFile", ["wheel_2.stl", ""]);
    UnityInstance.SendMessage("RobotManager", "recieveRobotFile", ["wheel_3.stl", ""]);
    UnityInstance.SendMessage("RobotManager", "recieveRobotFile", ["wheel_4.stl", ""]);
    UnityInstance.SendMessage("RobotManager", "recieveRobotFile", ["wheel_5.stl", ""]);
    UnityInstance.SendMessage("RobotManager", "recieveRobotFile", ["robotFile.urdf", ""]);

}
