CC = g++
CC_FLAGS = -std=c++11 -Wall -Wextra -pedantic

BIN = bin
HASHING = Hashing
LIB = lib
SERVER = Server
CLIENT = Client

all: $(BIN)/hash.out $(BIN)/server.out $(BIN)/client.out $(BIN)/addNums.out

# Build shared common functions object file
$(BIN)/commonFunctions.o: $(LIB)/commonFunctions.cpp $(LIB)/commonFunctions.h
	mkdir -p $(BIN)
	$(CC) $(CC_FLAGS) -c $(LIB)/commonFunctions.cpp -o $(BIN)/commonFunctions.o

# Hash program
$(BIN)/hash.out: $(HASHING)/hash.cpp $(BIN)/commonFunctions.o
	mkdir -p $(BIN)
	$(CC) $(CC_FLAGS) $(HASHING)/hash.cpp $(BIN)/commonFunctions.o -o $(BIN)/hash.out

# Server program
$(BIN)/server.out: $(SERVER)/server.cpp $(BIN)/commonFunctions.o
	mkdir -p $(BIN)
	$(CC) $(CC_FLAGS) $(SERVER)/server.cpp $(BIN)/commonFunctions.o -o $(BIN)/server.out

# Client program
$(BIN)/client.out: $(CLIENT)/client.cpp $(BIN)/commonFunctions.o
	mkdir -p $(BIN)
	$(CC) $(CC_FLAGS) $(CLIENT)/client.cpp $(BIN)/commonFunctions.o -o $(BIN)/client.out

# Add Numbers program
$(BIN)/addNums.out: addNums.cpp
	mkdir -p $(BIN)
	$(CC) $(CC_FLAGS) addNums.cpp -o $(BIN)/addNums.out

check:
	cppcheck $(HASHING)/hash.cpp $(SERVER)/server.cpp $(CLIENT)/client.cpp addNums.cpp $(LIB)/commonFunctions.cpp

clean:
	rm -rf $(BIN)