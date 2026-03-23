
% plane(plane#,model,age)  
% flight(flight#,from,to,plane#) 
% passenger(sin,name,city,age)  
% booked(sin,flight#,date,price 

plane(p123, boeing747, 1).
plane(p234, boeing747, 4).
plane(p345, boeing311, 3).
plane(p567, boeing67, 7).
plane(p890, boeing7, 6).

flight(f237, new_york, paris, p123).
flight(f27, los_angeles, paris, p234).
flight(f37, new_york, tokyo, p345).
flight(f23, gp, yeg, p567).
flight(f0, new_york, los_angeles, p890).

passenger(s111_222_333, john, new_york, 30).
passenger(s222_333_444, sarah, los_angeles, 25).
passenger(s333_444_555, mike, toronto, 40).
passenger(s444_555_666, anna, paris, 22).
passenger(s555_666_777, omar, new_york, 35).

booked(s111_222_333, f237, feb23, 600).
booked(s222_333_444, f27, jan17, 450).
booked(s333_444_555, f237, feb23, 700).
booked(s444_555_666, f37, jan17, 500).
booked(s555_666_777, f27, jan17, 550).
booked(s111_222_333, f0, mar10, 300).

% a) The model and age of plane p123.
% ?- plane(p123, Model, Age).

% b) The plane number and age of every boeing 747.
% ?- plane(PlaneNum, boeing747, Age).

% c) The flight number of every plane going from New York to Paris.
% ?- flight(FlightNum, new_york, paris, _).

% d) The flight number and price paid by every passenger going from Los Angeles to Paris on Jan 17.
% ?- flight(FlightNum, los_angeles, paris, _), booked(_, FlightNum, jan17, Price).

% e) The name and SIN of every passenger booked on flight f237 on Feb 23.
% ?- booked(SIN, f237, feb23, _), passenger(SIN, Name, _, _).

