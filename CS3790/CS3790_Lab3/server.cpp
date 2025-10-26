#include "server.h"

int main() {
    // Open both pipes to talk
    mkfifo(fifo_c2s, 0666);
    mkfifo(fifo_s2c, 0666);

    while (1) {
        // Wait for log in details to check auth
        vector<string> logInDetails = ReceiveMessage(fifo_c2s);

        // If you dont send USER name password . You fail.
        if ((logInDetails.size() != 3) || (logInDetails[0] != "USER")) {
            string message = "-INVALID ACCOUNT. \n +GOODBYE \n";
            SendMessage(fifo_s2c, message);
        } else {
            // Do a database search if you do pass needed info to search
            bool found = dbLookUp(logInDetails[1], logInDetails[2]);

            if (found) {  // If you have been found

                // Send auth message
                string message = "+ACCOUNT VALID";
                SendMessage(fifo_s2c, message);

                // Wait for user to send you the job they want you to execute
                vector<string> commandExec = ReceiveMessage(fifo_c2s);

                // User needs to send more than EXEC to start and has to have EXEC be first arg
                if (commandExec.size() >= 2 && commandExec[0] == "EXEC") {
                    // Add path always
                    vector<char*> args;
                    const char* path = commandExec[1].c_str();
                    args.push_back(strdup(path));

                    // If theres args add the args
                    if (commandExec.size() > 2) {
                        for (size_t i = 2; i < commandExec.size(); i++) {
                            args.push_back(strdup(commandExec[i].c_str()));
                        }
                    }

                    args.push_back(NULL);

                    // Fork to run execv
                    int pid = fork();
                    int status;

                    if (pid == 0) {  // Child
                        execv(args[0], args.data());

                        // Error with running child
                        perror("execv failed");
                        message = "-EXEC FAILED";
                        SendMessage(fifo_s2c, message);

                        exit(1);
                    } else if (pid > 0) {  // Parent
                        wait(&status);

                        // Return Pid if ok
                        message = "+EXEC SUCCESSFUL PID " + to_string(pid);
                        SendMessage(fifo_s2c, message);
                    } else {
                        // Error making child
                        message = "-EXEC FAILED";
                        SendMessage(fifo_s2c, message);
                    }
                } else {
                    // You cant run Exec since you did follow the instructions
                    message = "-EXEC FAILED";
                    SendMessage(fifo_s2c, message);
                }
                // cant find you in DB
            } else {
                string message = "-INVALID ACCOUNT. \n +GOODBYE \n";
                SendMessage(fifo_s2c, message);
            }
        }
    }
    // Wont reach unlink just to be there tho
    unlink(fifo_c2s);
    unlink(fifo_s2c);
}

// Function that will look you up and your passwords
// Return True if found
bool dbLookUp(string userName, string hashedPassword) {
    ifstream inputFile;

    inputFile.open("passwords.txt");
    if (!inputFile.is_open()) {
        std::cerr << "Error opening the file!" << std::endl;
        return 0;
    }

    string line;
    bool stillLooking = true;
    bool authorized = false;
    while (stillLooking) {
        if (getline(inputFile, line)) {
            vector<string> parsedString = parse(line);
            if (parsedString[0] == userName && parsedString[1] == hashedPassword) {
                stillLooking = false;
                authorized = true;
            }
        } else {
            stillLooking = false;
        }
    }
    return authorized;
}

// Function to parse line for db
vector<string> parse(string line) {
    vector<string> parsed;
    string word = "";
    char delimiter = ' ';

    for (char c : line) {
        if (c != delimiter)
            word += c;
        else if (!word.empty()) {
            parsed.push_back(word);
            word = "";
        }
    }
    if (!word.empty()) {
        parsed.push_back(word);
    }
    return parsed;
}

// Function to receive from chosen given
// Return vector of strings
vector<string> ReceiveMessage(const char* fifo) {
    int fd = open(fifo, O_RDONLY);
    char buf[256];
    int n = read(fd, buf, 256);
    close(fd);

    vector<string> result;
    if (n <= 0) return result;

    buf[n] = '\0';
    stringstream ss(buf);
    string token;
    while (ss >> token) result.push_back(token);
    return result;
}

// Function to send message to a chosen pipe
void SendMessage(const char* fifo, string msg) {
    int fd = open(fifo, O_WRONLY);
    write(fd, msg.c_str(), msg.size() + 1);
    close(fd);
}