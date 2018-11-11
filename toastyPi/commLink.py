import requests
from time import sleep
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)
GPIO.setup(7, GPIO.OUT)

pwm = GPIO.PWM(7, 50)
pwm.start(7.5)

config = {
    "feedURL": "http://192.168.0.102:5000/commands",
    "telemetryURL": "http://192.168.0.102:5000/telemetry",
    "maxHistory": 100
}

commandsExecuted = 0
lastTimeStamp = 0

def driveServo():
    pwm.ChangeDutyCycle(0)
    sleep(2)
    pwm.ChangeDutyCycle(100)
    sleep(2)

def executeCommand(command):
    intense = command['intensity']
    driveServo()
    print(command)

try:
`    while True:
        currentFeed = requests.get(config['feedURL']).json()
        if not commandsExecuted or currentFeed[len(currentFeed) - 1]['timestamp'] > lastTimeStamp:
            if commandsExecuted < config['maxHistory']:
                for command in currentFeed[commandsExecuted:]:
                    executeCommand(command)
                    commandsExecuted += 1
            else:
                executeCommand(currentFeed[len(currentFeed) - 1])
                commandsExecuted += 1
        sleep(0.01)
`except KeyboardInterrupt:
    pwm.stop()
    GPIO.cleanup()
