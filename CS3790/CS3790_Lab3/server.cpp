#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;

vector<string> parse(string);
bool dbLookUp(string, string);

int main(int argc, char* argv[]) {
    string userName = argv[1];
    string hashed = argv[2];

    bool authorized = dbLookUp(userName, hashed);

    if (authorized) {
        cout << "+ACCOUNT VALID" << endl;
    } else {
        cout << "-INVALID ACCOUNT." << endl << "+GOODBY" << endl;
    }
}

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