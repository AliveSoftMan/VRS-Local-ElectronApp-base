//Custom Block JavaScript
function initApi(interpreter, globalObject) {
    //LinearOpMode Blocks
    var linearOpMode = interpreter.nativeToPseudo({});
    interpreter.setProperty(globalObject, 'linearOpMode', linearOpMode);

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(linearOpMode, 'waitForStart', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(linearOpMode, 'idle', interpreter.createNativeFunction(wrapper));

    var wrapper = function (millis) {
        const end = Date.now() + Math.max(100, Math.min(10000, millis))
        while (Date.now() < end) {

        }
        return true;
    };
    interpreter.setProperty(linearOpMode, 'sleep', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return true; //NON FUNCTIONAL
    };
    interpreter.setProperty(linearOpMode, 'opModeIsActive', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return true; //NON FUNCTIONAL
    };
    interpreter.setProperty(linearOpMode, 'isStarted', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return false; //NON FUNCTIONAL
    };
    interpreter.setProperty(linearOpMode, 'isStopRequested', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return 0; //NON FUNCTIONAL
    };
    interpreter.setProperty(linearOpMode, 'getRuntime', interpreter.createNativeFunction(wrapper));

    //Gamepad Blocks
    var gamepad = interpreter.nativeToPseudo({});
    interpreter.setProperty(globalObject, 'gamepad', gamepad);

    var wrapper = function (gamepadNum, buttonId, controllerType) {
        if (JSONNav.gamepads[gamepadNum] != null && (controllerType == "Both" || JSONNav.gamepads[gamepadNum].id.startsWith(controllerType))) {
            if (buttonId == -1) {
                var atRest = true;
                for (var i = 0; i < JSONNav.gamepads[gamepadNum].buttons.length; i++)
                    if (JSONNav.gamepads[gamepadNum].buttons[i] > 0)
                        atRest = false;
                for (var i = 0; i < JSONNav.gamepads[gamepadNum].axes.length; i++)
                    if (Math.abs(JSONNav.gamepads[gamepadNum].axes[i]) > .2)
                        atRest = false;
                return atRest;
            }
            return JSONNav.gamepads[gamepadNum].buttons[buttonId] > 0;
        }
        return false;
    };
    interpreter.setProperty(gamepad, 'boolValue', interpreter.createNativeFunction(wrapper));

    var wrapper = function (gamepadNum, buttonAxis) {
        if (JSONNav.gamepads[gamepadNum] != null) {
            if (buttonAxis < 4)
                return JSONNav.gamepads[gamepadNum].axes[buttonAxis];
            else
                return JSONNav.gamepads[gamepadNum].buttons[buttonAxis];
        }
        return 0;
    };
    interpreter.setProperty(gamepad, 'numberValue', interpreter.createNativeFunction(wrapper));

    //Motor Blocks
    var motor = interpreter.nativeToPseudo({});
    interpreter.setProperty(globalObject, 'motor', motor);

	var wrapper = function (motorNums, property, values) {
		for (var i = 0; i < motorNums.g.length; i++) {
			//Translates Power to Velocity
			if (property == 'Power') {
				values.g[i] = Math.min(1, Math.max(values.g[i], -1));
				motorProp['motorVelocitys'][motorNums.g[i]] = values.g[i] * motorProp['motorMaxSpeeds'][motorNums.g[i]];
				postMessage(["storageSet", 'motorVelocitys', JSON.stringify(motorProp['motorVelocitys'])]);
			}
			//Translates Velocity to Power
			if (property == 'Velocity') {
				motorProp['motorPowers'][motorNums.g[i]] = Math.min(1, Math.max(values.g[i] / motorProp['motorMaxSpeeds'][motorNums.g[i]], -1));
				postMessage(["storageSet", 'motorPowers', JSON.stringify(motorProp['motorPowers'])]);
				motorProp['motor' + property + 's'][motorNums.g[i]] = Math.min(5760, Math.max(values.g[i], -5760)); //This value may change (1440 * 4)
			}
			else
				motorProp['motor' + property + 's'][motorNums.g[i]] = values.g[i];
		}
		return postMessage(["storageSet", 'motor' + property + 's', JSON.stringify(motorProp['motor' + property + 's'])]);
	};
	interpreter.setProperty(motor, 'setProperty', interpreter.createNativeFunction(wrapper));

	var wrapper = function (motorNum, property) {
        var returnVar;
        if (property == 'PowerFloat') {
			var motorPower = motorProp['motorPowers'][motorNum];
			returnVar = (Math.round(motorPower) != motorPower);
        }
        else if (property == 'Velocity') {
			returnVar = motorProp['motorVelocitys'][motorNum]; //Later will be 'motorCurrentVelocities'
        }
        else {
			returnVar = motorProp['motor' + property + 's'][motorNum];
        }
        return returnVar;
      };
	interpreter.setProperty(motor, 'getProperty', interpreter.createNativeFunction(wrapper));

	var wrapper = function (motorNum) {
        var motorPosition = motorProp['motorCurrentPositions'][motorNum];
        var motorTarget = motorProp['motorTargetPositions'][motorNum];
        var motorTolerance = motorProp['motorTargetPositionTolerances'][motorNum];
		return (Math.abs(motorPosition - motorTarget) > motorTolerance);
	};
	interpreter.setProperty(motor, 'isBusy', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'setMotorEnable', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'setMotorDisable', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return true; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'isMotorEnabled', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'setVelocity_withAngleUnit', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return 0; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'getVelocity_withAngleUnit', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'setPIDFCoefficients', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return 0; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'getPIDFCoefficients', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'setVelocityPIDFCoefficients', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'setPositionPIDFCoefficients', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return 0; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'getCurrent', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return 0; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'getCurrentAlert', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'setCurrentAlert', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return false; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'isOverCurrent', interpreter.createNativeFunction(wrapper));

    //Telemetry Blocks
    var telemetry = interpreter.nativeToPseudo({});
    interpreter.setProperty(globalObject, 'telemetry', telemetry);

    var wrapper = function (key, data) {
        return (telemetryData += key + ": " + data + "\n");
    };
    interpreter.setProperty(telemetry, 'addData', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
		postMessage(['telemetry', telemetryData]);
        telemetryData = "";
        return;
    };
    interpreter.setProperty(telemetry, 'update', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(telemetry, 'speak', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(telemetry, 'setDisplayFormat', interpreter.createNativeFunction(wrapper));

    //Miscellaneous Blocks
    var misc = interpreter.nativeToPseudo({});
    interpreter.setProperty(globalObject, 'misc', misc);

    var wrapper = function () {
        return null;
    };
    interpreter.setProperty(misc, 'getNull', interpreter.createNativeFunction(wrapper));

    var wrapper = function (value) {
        return null == value;
    };
    interpreter.setProperty(misc, 'isNull', interpreter.createNativeFunction(wrapper));

    var wrapper = function (value) {
        return null !== value;
    };
    interpreter.setProperty(misc, 'isNotNull', interpreter.createNativeFunction(wrapper));

    var wrapper = function (number, precision) {
        var string = "" + Math.round((number + Number.EPSILON) * (10 ** precision)) / (10 ** precision);
        if (precision > 0) {
            if (!string.includes('.'))
                string += '.';
            string += (10 ** (precision - string.split('.')[1].length)).toString().substring(1);
        }
        return string;
    };
    interpreter.setProperty(misc, 'formatNumber', interpreter.createNativeFunction(wrapper));

    var wrapper = function (number, precision) {
        return Math.round((number + Number.EPSILON) * (10 ** precision)) / (10 ** precision);
    };
    interpreter.setProperty(misc, 'roundDecimal', interpreter.createNativeFunction(wrapper));
}

var telemetryData = "";

var myInterpreter = null;

var JSONNav = null;
var motorProp = null;
resetMotorProperties();

function resetMotorProperties() {
	motorProp = JSON.parse(
	'{"motorDirections": ["FORWARD", "FORWARD", "FORWARD", "FORWARD", "FORWARD", "FORWARD", "FORWARD", "FORWARD"], ' +
	'"motorMaxSpeeds": [4320.0, 4320.0, 4320.0, 4320.0, 4320.0, 4320.0, 4320.0, 4320.0], ' +
	'"motorModes": ["RUN_WITHOUT_ENCODER", "RUN_WITHOUT_ENCODER", "RUN_WITHOUT_ENCODER", "RUN_WITHOUT_ENCODER","RUN_WITHOUT_ENCODER", "RUN_WITHOUT_ENCODER", "RUN_WITHOUT_ENCODER", "RUN_WITHOUT_ENCODER"], ' +
	'"motorPowers": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], ' +
	'"motorTargetPositions": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], ' +
	'"motorTargetPositionTolerances": [10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0], ' +
	'"motorVelocitys": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], ' +
	'"motorZeroPowerBehaviors": ["BRAKE", "BRAKE", "BRAKE", "BRAKE", "BRAKE", "BRAKE", "BRAKE", "BRAKE"], ' +
	'"motorCurrentPositions": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], ' +
	'"motorCurrentVelocitys": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}');
}

function resetInterpreter() {
    myInterpreter = null;
}

importScripts('./blocks/interpreter/acorn_interpreter.js');

onmessage = function (e) {
    if (e.data[0] == "data") {
		JSONNav = e.data[1];
        motorProp['motorCurrentPositions'] = JSON.parse(e.data[2]);
        nextStep();
    } else if (e.data[0] == "code") {
        resetInterpreter();
        startProgram(e.data[1]);
    }
}

function startProgram(code) {
	postMessage(['telemetry', "Program Started \n"]);
    var finalCode = "runOpMode();\n";

    var inFunction = false;
    for (var line of code.split('\n')) {
        if (line.startsWith('function '))
            inFunction = true;
        if (inFunction || line == '' || line.startsWith('var ') || line.startsWith('// '))
            finalCode += line + '\n';
        else
            finalCode += '//' + line + '\n';
        if (line == '}')
            inFunction = false;
    }
    resetMotorProperties();
    console.log(finalCode);
    telemetryData = "";
    myInterpreter = new Interpreter(finalCode, initApi);
    nextStep();
    return;
}

function nextStep() {
    if (myInterpreter.step()) {
        postMessage("request data");
    } else {
		postMessage(['telemetry', "Program Ended \n"]);
        resetInterpreter();
    }
}
