#include "lib.h"

// Splits a string into a vector of words separated by spaces
vector<string> parse(string const& line) {
    vector<string> parsed;
    string word = "";
    char delimiter = ' ';

    // Iterate through each character in the line
    for (char c : line) {
        if (c != delimiter)
            word += c;  // Build the current word
        else if (!word.empty()) {
            parsed.push_back(word);  // Add word to result when delimiter is found
            word = "";
        }
    }

    // Add the last word if it exists (no trailing delimiter)
    if (!word.empty()) parsed.push_back(word);
    return parsed;
}

// Loads Banker's Algorithm data from a file (processes, resources, allocation, max, and available)
void loadFromFile(string const& filename, int* n, int* m, vector<vector<int>>& allocated,
                  vector<vector<int>>& max, vector<int>& available) {
    ifstream inputFile;

    inputFile.open(filename);
    if (!inputFile.is_open()) {
        cerr << "Errror opening the file! Try again\n";
        exit(1);
    }

    string line = "";
    int count = 0;  // Track which line of the file we're reading

    while (getline(inputFile, line)) {
        vector<string> parsedString = parse(line);

        // Read first line: n (number of processes) and m (number of resources)
        if (count == 0) {
            if (parsedString.size() == 2) {
                *n = stoi(parsedString[0]);
                *m = stoi(parsedString[1]);
                count++;
            } else {
                cerr << "You should only have two ints in your first line: N than M";
                exit(1);
            }
        }

        // Read next n lines as the MAX matrix (maximum claims for each process)
        else if (count >= 1 && count <= *n) {
            vector<int> row;
            for (string& s : parsedString) row.push_back(stoi(s));
            max.push_back(row);
            count++;
        }

        // Read next n lines as the ALLOCATION matrix (currently allocated resources)
        else if (count >= *n + 1 && count <= *n + *n) {
            vector<int> row;
            for (string& s : parsedString) row.push_back(stoi(s));

            int index = allocated.size();  // Current process index
            int col = 0;
            // Validate that allocation does not exceed maximum claim
            for (int val : row) {
                if (val > max[index][col]) {
                    cerr << "Error: ALLOCATION exceeds MAX at process " << index << " resource "
                         << col << "\n";
                    exit(1);
                }
                col++;
            }
            allocated.push_back(row);
            count++;
        }

        // Read the last line as the AVAILABLE vector (free resources in the system)
        else if (count == *n + *n + 1) {
            for (string& s : parsedString) available.push_back(stoi(s));
            count++;
            continue;
        }
    }
}

// Prints a formatted matrix with its name
void printer(string const& name, vector<vector<int>>& matrix) {
    cout << "\n===========|| " + name + " ||============\n";
    int num = 0;

    // Print each row with process label
    for (auto row : matrix) {
        cout << "   p" << num << "  ";                      // Process number
        for (auto col : row) cout << "   " << col << "  ";  // Resource values
        cout << '\n';
        num++;
    }

    // Print bottom border
    for (int i = 0; i <= int(28 + name.size()); i++) cout << "=";
    cout << '\n';
}

// Displays the current state of the system (all matrices and vectors)
void dump(int* n, int* m, vector<vector<int>>& max, vector<vector<int>>& allocated,
          vector<int>& available, vector<vector<int>>& need) {
    cout << '\n';
    cout << "Number of process: " << *n << " Number of Resouces: " << *m << '\n';

    // Display available resources
    cout << "\n========|| AVAILABLE ||=========\n";
    cout << "       ";
    for (int v : available) cout << "   " << v << "  ";
    cout << "\n================================\n";

    // Display all matrices
    printer("MAX", max);
    printer("Allocatd", allocated);
    printer("Need", need);
    cout << endl;
}

// Calculates the Need matrix (Need = Max - Allocated)
vector<vector<int>> makeNeed(vector<vector<int>>& allocated, vector<vector<int>>& max) {
    vector<vector<int>> need;
    // For each process, calculate its need for each resource
    for (int i = 0; i < int(allocated.size()); i++) {
        vector<int> values = minius(max[i], allocated[i]);
        need.push_back(values);
    }
    return need;
}

// Implements the Banker's Algorithm to check if the system is in a safe state
// Returns true if a safe sequence exists, false otherwise
bool safetyAlgorithim(string& seq, int* n, vector<int>& available, vector<vector<int>>& allocated,
                      vector<vector<int>>& need) {
    vector<bool> finish(*n, false);  // Track which processes are finished
    vector<int> work = available;    // Work vector starts with available resources
    bool progress = true;

    // Continue until no more progress can be made
    while (progress) {
        progress = false;
        // Check each process to see if it can be satisfied
        for (int i = 0; i < *n; i++) {
            // If process i hasn't finished and its need can be satisfied with work
            if (!finish[i] && lessThan(need[i], work)) {
                // Process i completes and releases its allocated resources
                work = add(work, allocated[i]);
                finish[i] = true;
                seq += "p" + to_string(i) + " ";  // Add to safe sequence
                progress = true;
            }
        }
    }

    // If all processes finished, the state is safe
    for (int i = 0; i < *n; i++)
        if (!finish[i]) return false;  // Process couldn't complete - unsafe state
    return true;
}

// Checks if vector a is less than or equal to vector b
bool lessThan(vector<int> a, vector<int> b) {
    for (int i = 0; i < int(a.size()); i++) {
        if (a[i] > b[i]) return false;  // If any value in a is greater, return false
    }
    return true;
}

// Adds two vectors
vector<int> add(vector<int> a, vector<int> b) {
    vector<int> result;
    for (int i = 0; i < int(a.size()); i++) {
        result.push_back(a[i] + b[i]);
    }
    return result;
}

// Subtracts vector b from vector a
vector<int> minius(vector<int> a, vector<int> b) {
    vector<int> result;
    for (int i = 0; i < int(a.size()); i++) {
        result.push_back(a[i] - b[i]);
    }
    return result;
}

// Handles resource requests from processes using the Banker's Algorithm
// Grants requests only if they maintain a safe state
void requestAlgorithim(int* n, int* m, vector<vector<int>>& allocated, vector<vector<int>>& max,
                       vector<vector<int>>& need, vector<int>& available) {
    while (true) {
        int i = 0;
        cout << "Select Process: ";
        cin >> i;

        // Exit if user enters -1
        if (i == -1) {
            cout << "Exiting" << endl;
            dump(n, m, max, allocated, available, need);
            break;
        }

        // Validate process number
        if (i < 0 || i >= *n) {
            cerr << "Pick a process between 0 and " << (*n - 1) << endl;
            continue;
        }

        // Get the request from the user
        string line;
        cout << "What is your request: ";
        cin.ignore();
        getline(cin, line);
        vector<string> parsedString = parse(line);
        vector<int> request;
        for (string& s : parsedString) request.push_back(stoi(s));

        // Check if the request exceeds the need (max claim - already allocated)
        if (!lessThan(request, need[i])) {
            cerr << "Process has exceeded its maximum claim" << endl << endl;
            dump(n, m, max, allocated, available, need);
            continue;
        }

        // Check if the requested resources are available
        if (!lessThan(request, available)) {
            cerr << "Resources are not available" << endl << endl;
            dump(n, m, max, allocated, available, need);
            continue;
        }

        // Try allocating the resources temporarily to test if it leads to a safe state
        vector<int> tempAvailable = minius(available, request);  // Reduce available resources
        vector<int> tempAlloc = add(allocated[i], request);      // Increase allocated resources
        vector<int> tempNeed = minius(need[i], request);         // Reduce need

        // Create temporary copies of matrices for safety test
        vector<vector<int>> tempAllocated = allocated;
        vector<vector<int>> tempNeedMatrix = need;
        tempAllocated[i] = tempAlloc;
        tempNeedMatrix[i] = tempNeed;

        // Check if the new state is safe using Banker's Algorithm
        string sequence = "";
        bool safe = safetyAlgorithim(sequence, n, tempAvailable, tempAllocated, tempNeedMatrix);

        // Grant the request only if it maintains safety
        if (safe) {
            allocated[i] = tempAlloc;
            need[i] = tempNeed;
            available = tempAvailable;
            cout << "Request granted. Safe sequence: " << sequence << endl;
        } else {
            cout << "Request denied (leads to unsafe state)" << endl;
        }

        // Display the system state
        dump(n, m, max, allocated, available, need);
        cout << endl;
    }
}