#ifndef LIB_H
#define LIB_H

#include <fstream>
#include <iostream>
#include <vector>
#include <string>

using namespace std;

/// Splits a string into a vector of words separated by spaces
/// @param line - the input string to parse
/// @return a vector of parsed words
vector<string> parse(string const& line);

/// Loads Banker's Algorithm data from a file
/// @param filename - path to the input file
/// @param n - pointer to store number of processes
/// @param m - pointer to store number of resources
/// @param allocated - reference to allocation matrix
/// @param max - reference to maximum claim matrix
/// @param available - reference to available resources vector
void loadFromFile(string const& filename, int* n, int* m, vector<vector<int>>& allocated,
                  vector<vector<int>>& max, vector<int>& available);

/// Calculates the Need matrix (max - allocated for each process)
/// @param alloc - allocated resources matrix
/// @param max - maximum claim matrix
/// @return the calculated Need matrix
vector<vector<int>> makeNeed(vector<vector<int>>& alloc, vector<vector<int>>& max);

/// Checks if the system is in a safe state using the Banker's Algorithm
/// @param seq - reference to store the safe sequence
/// @param n - pointer to number of processes
/// @param available - available resources
/// @param allocated - allocated resources matrix
/// @param need - need matrix
/// @return true if safe state exists, false otherwise
bool safetyAlgorithim(string& seq, int* n, vector<int>& available, vector<vector<int>>& allocated,
                      vector<vector<int>>& need);

/// Checks if vector a is less than or equal to vector b
/// @param a - first vector
/// @param b - second vector
/// @return true if a <= b, false otherwise
bool lessThan(vector<int> a, vector<int> b);

/// Adds two vectors
/// @param a - first vector
/// @param b - second vector
/// @return the sum of vectors a and b
vector<int> add(vector<int> a, vector<int> b);

/// Subtracts vector b from vector a
/// @param a - first vector
/// @param b - second vector to subtract
/// @return the difference (a - b)
vector<int> minius(vector<int> a, vector<int> b);

/// Prints a labeled matrix to the console in a formatted way
/// @param name - name/label of the matrix
/// @param matrix - the matrix to print
void printer(string const& name, vector<vector<int>>& matrix);

/// Displays all system state information (processes, resources, matrices)
/// @param n - pointer to number of processes
/// @param m - pointer to number of resources
/// @param max - maximum claim matrix
/// @param allocated - allocated resources matrix
/// @param available - available resources vector
/// @param need - need matrix
void dump(int* n, int* m, vector<vector<int>>& max, vector<vector<int>>& allocated,
          vector<int>& available, vector<vector<int>>& need);

/// Handles resource requests from processes using the Banker's Algorithm
/// @param n - pointer to number of processes
/// @param m - pointer to number of resources
/// @param allocated - allocated resources matrix (modified if request granted)
/// @param max - maximum claim matrix
/// @param need - need matrix (modified if request granted)
/// @param available - available resources vector (modified if request granted)
void requestAlgorithim(int* n, int* m, vector<vector<int>>& allocated, vector<vector<int>>& max,
                       vector<vector<int>>& need, vector<int>& available);

#endif