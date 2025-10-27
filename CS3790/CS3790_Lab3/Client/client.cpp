#include "client.h"
#include "../lib/commonFunctions.h"

int main() {
    // Tell client how to interact
    cout << "Enter username and hash of password please" << endl;
    cout << "Must be in the format of USER <username> <hashed_password>" << endl << endl;

    // Send your LOGIN
    string message;
    getline(cin, message);
    SendMessage(fifo_c2s, message);

    // Get message from server
    vector<string> messages = ReceiveMessage(fifo_s2c);

    // If you have been accepted continue
    if (messages[0] == "+ACCOUNT") {
        writeMessage(messages);

        // Tell client how to interact if account valid
        cout << "\n\nEnter command" << endl;
        cout << "EXEC <path of command> <command> <par1>  .  .   .   <parN>" << endl << endl;

        // Send your COMMAND
        getline(cin, message);
        SendMessage(fifo_c2s, message);

        // Get message from server
        // No matter what it is print and end
        vector<string> responce = ReceiveMessage(fifo_s2c);
        writeMessage(responce);
    } else if (messages[0] == "-INVALID") {
        writeMessage(messages);
    } else {
        cout << "How did we get here?";
    }
}

// Function that will take in you messages and print them
void writeMessage(vector<string> messages) {
    string builtResponce;
    for (string message : messages) {
        if (message[0] != '-' && message[0] != '+') {
            builtResponce += " " + message;
        } else {
            builtResponce += "\n" + message;
        }
    }
    cout << builtResponce << endl;
}