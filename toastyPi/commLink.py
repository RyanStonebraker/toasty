import requests
from time import sleep
# import RPi.GPIO as GPIO

config = {
    "feedURL": "http://127.0.0.1:5000/commands",
    "telemetryURL": "http://127.0.0.1:5000/telemetry",
    "maxHistory": 100
}

commandsExecuted = 0
lastTimeStamp = 0

def executeCommand(command):
    print(command)

while True:
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
