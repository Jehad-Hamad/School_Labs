#include "Graph.h"

#include <iostream>
#include <fstream>
#include <vector>
#include <set>
#include <stdexcept>
#include <queue>
#include <chrono>  // Include the chrono library for timing
#include <iomanip> // Include the iomanip library for setw

using namespace std;

/** Dijkstra's Shortest-Path algorithm.
    @param graph The weighted graph to be searched
    @param start The start vertex
    @param predecessor Output vector to contain the predecessors
           in the shortest path
    @param distance Output vector to contain the distance
           in the shortest path
*/
void dijkstras_algorithm(const Graph &graph, int start, vector<int> &predecessor, vector<double> &distance)
{
  int num_v = graph.get_num_v();
  // Use a set to represent V - S

  set<int> v_minus_s;
  // Initialize V - S.

  for (int i = 0; i < num_v; i++)
  {
    if (i != start)
    {
      v_minus_s.insert(i);
    }
  }

  // Initialize predecessor and distance
  predecessor.assign(num_v, -1);                              // Initialize all predecessors to -1
  distance.assign(num_v, numeric_limits<double>::infinity()); // Initialize all distances to infinity
  distance[start] = 0;                                        // Distance to the start vertex is 0

  for (set<int>::iterator itr = v_minus_s.begin(); itr != v_minus_s.end(); ++itr)
  {
    if (graph.is_edge(start, *itr))
    { // Only update for vertices directly connected to the start
      predecessor[*itr] = start;
      distance[*itr] = graph.get_edge(start, *itr).get_weight();
    }
  }

  // Main loop
  while (!v_minus_s.empty())
  {
    // Find the value u in V - S with the smallest distance[u].
    double min_dist = numeric_limits<double>::infinity();
    int u = -1;
    for (set<int>::iterator itr = v_minus_s.begin(); itr != v_minus_s.end(); ++itr)
    {
      int v = *itr;
      if (distance[v] < min_dist)
      {
        min_dist = distance[v];
        u = v;
      }
    }

    // Remove u from v_minus_s
    v_minus_s.erase(u);
    // Update the distances
    for (set<int>::iterator itr = v_minus_s.begin(); itr != v_minus_s.end(); ++itr)
    {
      int v = *itr;
      if (graph.is_edge(u, v))
      {
        double weight = graph.get_edge(u, v).get_weight();
        if (distance[u] + weight < distance[v])
        {
          distance[v] = distance[u] + weight;
          predecessor[v] = u;
        }
      }
    }
  }
}

// Name:  Jehad M Hamad
// Date:  Apr/07/25
// Desc:  Dijkstra's Shortest-Path algorithm using a priority queue.
// Input:
/**
    @param graph The weighted graph to be searched
    @param start The start vertex
    @param predecessor Output vector to contain the predecessors in the shortest path
    @param distance Output vector to contain the distance in the shortest path
*/
// Output: Nothing, but it will modify the predecessor and distance vectors
void dijkstras_pq(const Graph &graph, int start, vector<int> &predecessor, vector<double> &distance)
{
  // This will be used to determine the priority of edges in the queue.
  // should return true if edge1 has a greater weight than edge2.
  auto compare = [](const Edge &edge1, const Edge &edge2)
  {
    return Edge::compare(edge1, edge2); // Calls a static method to compare edge weights
  };

  // Declare a priority queue to store Edge objects.
  // This creates a min-heap if Edge::compare returns true when edge1.weight > edge2.weight.
  priority_queue<Edge, vector<Edge>, decltype(compare)> pQ(compare);

  int num_v = graph.get_num_v();                              // Get the number of vertices
  predecessor.assign(num_v, -1);                              // Initialize all predecessors to -1
  distance.assign(num_v, numeric_limits<double>::infinity()); // Initialize all distances to infinity
  distance[start] = 0;                                        // Distance to the start vertex is 0

  // Initialize the priority queue with the start vertex
  pQ.push(Edge(start, start, 0));

  while (!pQ.empty())
  {
    // Get the edge with the smallest weight
    Edge current = pQ.top();
    pQ.pop();

    // Get the destination vertex of the current edge
    int u = current.get_destination();

    // Iterate over adjacent edges
    for (Graph::iterator itr = graph.begin(u); itr != graph.end(u); ++itr)
    {
      // Get the edge and its destination vertex
      Edge edge = *itr;
      int v = edge.get_destination();
      double weight = edge.get_weight();

      if (distance[u] + weight < distance[v])
      {
        // Update the distance and predecessor
        // If the distance to v through u is less than the current distance to v
        distance[v] = distance[u] + weight;
        predecessor[v] = u;
        // Push the updated edge into the priority queue
        pQ.push(Edge(u, v, distance[v]));
      }
    }
  }
}

/** Main program to demonstrate algorithm.
    @param argc Number of command line arguments
    @param argv Command line arguments
    @pre argv[1] contains the name of the file that defines the graph.
    @pre argv[2] specifies the type of graph
*/
int main(int argc, char *argv[])
{
  if (argc < 3)
  {
    cerr << "Usage: Dijkstra <input file> <graph type>\n";
    return 1;
  }

  ifstream in(argv[1]);
  if (!in)
  {
    cerr << "Unable to open " << argv[1] << " for input\n";
    return 1;
  }

  Graph *graph;
  try
  {
    graph = Graph::create_graph(in, false, argv[2]);
  }
  catch (invalid_argument &ex)
  {
    cerr << ex.what() << endl;
    cerr << "Valid graph types are \"List\" and \"Matrix\"\n";
    return 1;
  }

  int numV = graph->get_num_v(); // Get the number of vertices

  // Create arrays for the standard Dijkstra's algorithm
  vector<int> predecessor1(numV);
  vector<double> distance1(numV);

  // Create arrays for the priority queue-based Dijkstra's algorithm
  vector<int> predecessor2(numV);
  vector<double> distance2(numV);

  // Measure time for the standard Dijkstra's algorithm
  cout << "\nThis is the Standard Dijkstra's Algorithm...\n";
  auto start_time1 = chrono::high_resolution_clock::now();
  dijkstras_algorithm(*graph, 0, predecessor1, distance1);
  auto end_time1 = chrono::high_resolution_clock::now();
  auto duration1 = chrono::duration_cast<chrono::microseconds>(end_time1 - start_time1).count();
  cout << "The Standard Dijkstra's Algorithm for " << argv[2] << " took " << duration1 << " microseconds.\n";

  // Output results for the standard Dijkstra's algorithm
  cout << "Results for the  Standard Dijkstra's Algorithm:\n";
  cout << "-----------------------------------------------------------\n";
  cout << left << setw(10) << "Vertex"
       << setw(22) << "Distance from Source"
       << "Predecessor\n";
  cout << "-----------------------------------------------------------\n";

  for (int i = 0; i < numV; i++)
  {
    cout << left << setw(10) << i << setw(22) << distance1[i] << predecessor1[i] << '\n';
  }

  // Measure time for the priority queue-based Dijkstra's algorithm
  cout << "\nRunning priority queue-based Dijkstra's algorithm...\n";
  auto start_time2 = chrono::high_resolution_clock::now();
  dijkstras_pq(*graph, 0, predecessor2, distance2);
  auto end_time2 = chrono::high_resolution_clock::now();
  auto duration2 = chrono::duration_cast<chrono::microseconds>(end_time2 - start_time2).count();
  cout << "Priority Queue-based Dijkstra's algorithm for " << argv[2] << " took " << duration2 << " microseconds.\n";

  // Output results for the priority queue-based Dijkstra's algorithm
  cout << "Results for the Priority Queue-based Dijkstra's Algorithm:\n";
  cout << "-----------------------------------------------------------\n";
  cout << left << setw(10) << "Vertex"
       << setw(22) << "Distance from Source"
       << "Predecessor\n";
  cout << "-----------------------------------------------------------\n";

  for (int i = 0; i < numV; i++)
  {
    cout << left << setw(10) << i << setw(22) << distance2[i] << predecessor2[i] << '\n';
  }

  
  cout << "\nComparing results of both implementations:\n";
  if(duration1 < duration2)
  {
    cout << "Standard Dijkstra's algorithm is faster.\n";
  }
  else
  {
    cout << "Priority Queue-based Dijkstra's algorithm is faster.\n";
  }
  cout << "-----------------------------------------------------------\n";

  
  // This is just to make sure that the two implementations are correct.
  // If they are correct, the distances should be the same.
  // If they are not the same, then there is a problem with one of the implementations.
  bool match = true;
  for (int i = 0; i < numV; i++)
  {
    if (distance1[i] != distance2[i])
    {
      cout << "Mismatch at vertex " << i << ": "
           << "Standard dist = " << distance1[i] << ", "
           << "Priority Queue dist = " << distance2[i] << endl;
      match = false;
    }
  }

  // Output the result of the comparison
  if (match)
  {
    cout << "Both implementations produced the same results.\n";
  }
  else
  {
    cout << "There were differences between the two implementations.\n";
  }

  return 0;
}