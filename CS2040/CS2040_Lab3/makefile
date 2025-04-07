GRAPH_DIR=Graph
CC=g++
CC_FLAGS= -std=c++11 -Wall -Wextra -Werror -pedantic
all: main.cpp $(GRAPH_DIR)/graphs.cpp
	$(CC) $(CC_FLAGS) $^ -o a.out

run: 
	./a.out 

check: main.cpp $(GRAPH_DIR)/graphs.cpp
	cppcheck $^