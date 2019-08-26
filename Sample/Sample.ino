/**
* Built with help from Arduino references and examples, https://www.arduino.cc/reference/en/
*/

int buttonPin = 7; //change to configuration
int lastState = 0;

void setup() {
  // put your setup code here, to run once:
  pinMode(buttonPin, INPUT);
  Serial.begin(9600);
  lastState = digitalRead(buttonPin);
  Serial.println(lastState);
}

void loop() {
  // put your main code here, to run repeatedly:
  int currentState = realRead(lastState);
  if (currentState != lastState) {
    if (currentState == 0) {
      Serial.println("They got up!");
    } else {
      Serial.println("They sat down!");
    } 
    lastState = currentState;
  }
  delay(400);
  
}

/**
 * Returns if new state read has really occurred
 * Inputs: Current state prior to updating 
 * 
 * Checks for fidgeting basically. Right now we are checking 
 * for 10 consecutive reads over 2 seconds but this may be modified next 
 * semester to determine a more suitable threshold of consecutive reads.
 */
int realRead(int state) {
  int x = 0;
  int newState = digitalRead(buttonPin);
  while (x != 9) {
    int tempState = digitalRead(buttonPin);
    if (tempState != newState) {
      return state;
    } else {
      delay(200);
    }
    x++;  
  }
  return newState;
}
