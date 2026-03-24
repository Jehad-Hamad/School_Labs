# CS3860 Lab 7 - Text-Based Adventure Game

Name: Jehad Hamad
Date: 2026-03-24
Prof: Franco. C

## How to Run

```
swipl main.plg
```

## Example Queries

```prolog
% List items in the kitchen
?- list_things(kitchen).

% Look inside the desk
?- look_in(desk).

% See what rooms connect to office
?- list_connections(office).

% Can you go to the cellar from kitchen?
?- can_go(cellar).

% Can you go to the hall from kitchen?
?- can_go(hall).

% Is broccoli edible?
?- edible(broccoli).

% Does broccoli taste yucky?
?- tastes_yucky(broccoli).

% Where is the blankie?
?- location(blankie, Where).

% Exit Prolog
?- halt.
```
