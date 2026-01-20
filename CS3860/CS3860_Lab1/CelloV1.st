rand := Random new.
roll := rand between: 1 and: 6.
sum := 0.
'Please <Enter> to roll or q to stop ' display.
guess:= stdin nextLine.

[guess ~='q' and: [roll ~= 1]] whileTrue: [
    sum:= sum + roll.
    ('You rolled a ', roll asString) displayNl. 

    'Please <Enter> to roll or q to stop ' display.
    guess:= stdin nextLine. 
    guess ~= 'q' ifTrue: [
        roll := rand between: 1 and: 6.
    ].
].

('you rolled a total of ', sum asString ) display.

roll = 1 ifTrue:[
    ' before rolling a 1' displayNl.
]