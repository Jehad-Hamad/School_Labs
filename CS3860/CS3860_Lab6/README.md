# How to Run airline.pl

1. Open a terminal and navigate to this folder
2. Run: `swipl airline.pl`
3. At the `?-` prompt, type any query, for example:
   - `plane(p123, Model, Age).`
   - `plane(PlaneNum, boeing747, Age).`
   - `flight(FlightNum, new_york, paris, _).`
   - `flight(FlightNum, los_angeles, paris, _), booked(_, FlightNum, jan17, Price).`
   - `booked(SIN, f237, feb23, _), passenger(SIN, Name, _, _).`
4. Press `;` to see more results, or `Enter` to stop
5. Type `halt.` to exit
