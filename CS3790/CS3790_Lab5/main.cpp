#include <fstream>
#include <iostream>
#include <vector>
#include <string>

using namespace std;

vector<string> parse(string const &line);
void loadFromFile(string const &filename, int *n, int *m, vector<vector<int>> &allocated, vector<vector<int>> &max, vector<int> &available);
void printer(string const &name, vector<vector<int>> &matrix);
void dump(int *n, int *m, vector<vector<int>> &max, vector<vector<int>> &allocated, vector<int> &available);

int main(){

    string filename = "h.txt";
    vector<vector<int>> allocated;
    vector<vector<int>> max;
    vector<int> available;

    int n = 0;
    int m = 0;

    loadFromFile(filename, &n, &m, allocated, max, available);
    dump(&n, &m, max, allocated, available);


    return 0;
}

vector<string> parse(string const &line) {
    vector<string> parsed;
    string word = "";
    char delimiter = ' ';

    for (char c : line) {
        if (c != delimiter) word += c;
        else if (!word.empty()) {
            parsed.push_back(word);
            word = "";
        }
    }
    if (!word.empty()) parsed.push_back(word);
    return parsed;
}

void loadFromFile(string const &filename, int *n, int *m, vector<vector<int>> &allocated, vector<vector<int>> &max, vector<int> &available){

    ifstream inputFile;

    inputFile.open(filename);
    if(!inputFile.is_open())
        cerr << "Errror opening the file! Try again\n";

    string line = "";
    int count = 0;

    while (getline(inputFile, line)) {
        vector<string> parsedString = parse(line);

        // First line: n m
        if(count == 0){
            if(parsedString.size() == 2){
                *n = stoi(parsedString[0]);
                *m = stoi(parsedString[1]);
                count++;
            } else cerr << "You should only have two ints in your first line: n than m";
        }

        // Next n lines = MAX matrix
        else if (count >= 1 && count <= *n) {
            vector<int> row;
            for (string &s : parsedString) row.push_back(stoi(s));
            max.push_back(row);
            count++;
        }
        
        // Next n lines = ALLOCATION matrix
        else if (count >= *n + 1 && count <= *n + *n) {
            vector<int> row;
            for (string &s : parsedString) row.push_back(stoi(s));
            allocated.push_back(row);
            count++;
        }

        // Last line = AVAILABLE vector
        else if (count == *n + *n + 1) {
            for (string &s : parsedString) available.push_back(stoi(s));
            count++;
            continue;
        }
    }
}

void printer(string const &name, vector<vector<int>> &matrix){

    cout << "\n===========|| " + name + " ||============\n";
    int num = 0;
    for(auto row: matrix){
        cout << "   p" << num <<"  ";
        for(auto col: row) cout << "   " << col << "  ";
        cout << '\n';
        num++;
    }
    for(int i = 0; i <= int(28 + name.size()); i++) cout << "=";
    cout << '\n';
}

void dump(int *n, int *m, vector<vector<int>> &max, vector<vector<int>> &allocated, vector<int> &available){
    cout << '\n';
    cout << "Number of process: " << *n << " Number of Resouces: " << *m << '\n';
    printer("MAX", max);
    printer("Allocatd", allocated);

    cout << "\n========|| AVAILABLE ||========\n";
    cout << "       ";
    for (int v : available) cout << "   " << v << "  ";
    cout << "\n===============================\n";
}