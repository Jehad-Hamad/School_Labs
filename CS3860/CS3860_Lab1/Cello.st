"Using Array to avoid GNU Smalltalk scoping issues"
rand := Random new.
bet := ''.
game := Array with: 100 with: 0.  "game at: 1 = credits, game at: 2 = pot"
rounds := 1.

"Block to validate bets"
validateBet := [:currentBet | | userBet |
    userBet := currentBet.

    [userBet ~= 'q' and: [userBet asInteger <= 0 or: [userBet asInteger > (game at: 1)]]] whileTrue: [
        (userBet asInteger <= 0) ifTrue: [
            'Bet must be greater than 0! Try again: ' display.
        ].

        (userBet asInteger > (game at: 1)) ifTrue: [
            ('You only have ', (game at: 1) asString, ' credits!  Try again: ') display.
        ].

        userBet := stdin nextLine.
    ].

    userBet  "Return the validated bet"
].

"Check if all three dice are the same"
isTriple := [:array |
    array asSet size = 1
].

"Check for 4-5-6 combo (instant win)"
is456 := [:array | | sorted |
    sorted := array sorted.
    ((sorted at: 1) = 4) & ((sorted at: 2) = 5) & ((sorted at: 3) = 6)
].

"Check for a pair with 6 as the odd die (instant win)"
twoAlikeSixHigh := [:array | | sorted |
    sorted := array sorted.
    ((sorted at: 1) = (sorted at: 2)) & ((sorted at: 3) = 6).
].

"Returns the point value (odd die) if there's a pair, 0 otherwise"
pairAndValue := [:array | | sorted |
    sorted := array sorted.
    ((sorted at: 1) = (sorted at: 2)) ifTrue: [sorted at:3]
        ifFalse: [
            ((sorted at: 2) = (sorted at: 3)) ifTrue: [sorted at:1] ifFalse: [0]
        ].
].

"Check for a pair with 1 as the odd die (instant loss)"
aceNegative := [:array | | sorted |
    sorted := array sorted.
    ((sorted at: 2) = (sorted at: 3)) & ((sorted at: 1) = 1).
].

"Check for 1-2-3 combo (instant loss)"
is123 := [:array | | sorted |
    sorted := array sorted.
    ((sorted at: 1) = 1) & ((sorted at: 2) = 2) & ((sorted at: 3) = 3).
].

"Block to classify a roll - returns: 'trip', 'win456', 'lose123', 'loseAce', 'point', or 'reroll'"
classifyRoll := [:array | | result |
    result := 'reroll'.
    
    "Check for trips (instant win)"
    (isTriple value: array) ifTrue: [result := 'trip'].
    
    "Check for 4-5-6 (instant win)"
    (result = 'reroll' and: [is456 value: array]) ifTrue: [result := 'win456'].

    "Check for two alike and six high (instant win)"
    (result = 'reroll' and: [twoAlikeSixHigh value: array]) ifTrue: [result := 'twoAlikeSix'].
    
    "Check for 1-2-3 (instant loss)"
    (result = 'reroll' and: [is123 value: array]) ifTrue: [result := 'lose123'].
    
    "Check for ace-negative (instant loss)"
    (result = 'reroll' and: [aceNegative value: array]) ifTrue: [result := 'loseAce'].
    
    "Check for pair (point roll)"
    (result = 'reroll' and: [(pairAndValue value: array) > 0]) ifTrue: [result := 'point'].
    
    result  "Return the result"
].


'Welcome to Ceelo. ' displayNl.
' ' displayNl.
('You have ', (game at: 1) asString, ' Credits') displayNl.
('This is round: ', rounds asString) displayNl.
'Please bet an amount to roll the dice or q to stop ' display.

"Main game loop - runs until player quits"
[(bet ~= 'q') & ((game at: 1) > 0)] whileTrue: [


    bet := stdin nextLine.
    bet := validateBet value: bet.

    ((bet ~= 'q') & ((game at: 1) > 0)) ifTrue:[


        game at: 1 put: ((game at: 1) - (bet asInteger)).
        game at: 2 put: (bet asInteger).

        "Roll three dice for the player"
        dice1 := rand between: 1 and: 6.
        dice2 := rand between: 1 and: 6.
        dice3 := rand between: 1 and: 6.
        playerArray := Array withAll: {dice1. dice2. dice3.}.
        playerArray := playerArray sorted.

        '' displayNl.
        'You rolled ' display.
        playerArray do: [:each | (each asString, ' ') display ].
        '' displayNl.

        "Classify player's roll and handle re-rolls"
        playerRollType := classifyRoll value: playerArray.

        [playerRollType = 'reroll'] whileTrue: [
            'Invalid roll! Rolling again...' displayNl.

            dice1 := rand between: 1 and: 6.
            dice2 := rand between: 1 and: 6.
            dice3 := rand between: 1 and: 6.
            playerArray := Array withAll: {dice1. dice2. dice3.}.
            playerArray := playerArray sorted.

            'You rolled ' display.
            playerArray do: [:each | (each asString, ' ') display ].
            '' displayNl.

            playerRollType := classifyRoll value: playerArray.
        ].

        "Get player's point if they have one"
        playerPoint := 0.
        (playerRollType = 'point') ifTrue: [
            playerPoint := pairAndValue value: playerArray.
            ('Your point is: ', playerPoint asString) displayNl.
        ].

        "Check for instant wins/losses"
        (playerRollType = 'trip') ifTrue: [
            'TRIPLE! You win!' displayNl.
            game at: 1 put: ((game at: 1) + ((game at: 2) * 2)).
        ].

        (playerRollType = 'win456') ifTrue: [
            '4-5-6! You win!' displayNl.
            game at: 1 put: ((game at: 1) + ((game at: 2) * 2)).
        ].

        (playerRollType = 'twoAlikeSix') ifTrue: [
            'Two Alike and Six High! You win!' displayNl.
            game at: 1 put: ((game at: 1) + ((game at: 2) * 2)).
        ].

        (playerRollType = 'lose123') ifTrue: [
            '1-2-3! You lose!' displayNl.
        ].

        (playerRollType = 'loseAce') ifTrue: [
            'Ace out! You lose!' displayNl.
        ].

        "If player has a point, dealer needs to roll"
        (playerRollType = 'point') ifTrue: [
            ' ' displayNl.
            'Dealer is rolling...' displayNl.

            "Dealer rolls until valid"
            dealerDice1 := rand between: 1 and: 6.
            dealerDice2 := rand between: 1 and: 6.
            dealerDice3 := rand between: 1 and: 6.
            dealerArray := Array withAll: {dealerDice1. dealerDice2. dealerDice3.}.
            dealerArray := dealerArray sorted.

            'Dealer rolled ' display.
            dealerArray do: [:each | (each asString, ' ') display].
            '' displayNl.

            dealerRollType := classifyRoll value: dealerArray.

            "Keep rerolling till valid"
            [dealerRollType = 'reroll'] whileTrue: [
                'Invalid roll! Rolling again...' displayNl.

                dealerDice1 := rand between: 1 and: 6.
                dealerDice2 := rand between: 1 and: 6.
                dealerDice3 := rand between: 1 and: 6.
                dealerArray := Array withAll: {dealerDice1. dealerDice2. dealerDice3.}.
                dealerArray := dealerArray sorted.

                'Dealer rolled ' display.
                dealerArray do: [:each | (each asString, ' ') display].
                '' displayNl.
                dealerRollType := classifyRoll value: dealerArray.
            ].


            "Compare results - dealer wins beat player point"
            (dealerRollType = 'trip') | (dealerRollType = 'win456') | (dealerRollType = 'twoAlikeSix') ifTrue: [
                'Dealer wins! With a ' display.
                (dealerRollType = 'trip') ifTrue: [ 'TRIPLE! You lose!' displayNl. ].

                (dealerRollType = 'win456') ifTrue: [ '4-5-6! You lose!' displayNl. ].

                (dealerRollType = 'twoAlikeSix') ifTrue: [ 'Two Alike and Six High! You lose!' displayNl. ].
            ].

            "Dealer losses mean player wins"
            (dealerRollType = 'lose123') | (dealerRollType = 'loseAce') ifTrue: [
                'Dealer loses! With a ' display.
                (dealerRollType = 'lose123') ifTrue: [
                    '1-2-3! You Win!' displayNl.
                    game at: 1 put: ((game at: 1) + ((game at: 2) * 2)).
                ].

                (dealerRollType = 'loseAce') ifTrue: [
                    'Ace out! You Win!' displayNl.
                    game at: 1 put: ((game at: 1) + ((game at: 2) * 2)).
                ].
            ].

            "Compare points to player"
            (dealerRollType = 'point') ifTrue: [
                dealerPoint := pairAndValue value: dealerArray.
                ('Dealer point is: ', dealerPoint asString) displayNl.

                (playerPoint > dealerPoint) ifTrue: [
                    'Your point is higher! You win!' displayNl.
                    game at: 1 put: ((game at: 1) + ((game at: 2) * 2)).
                ].

                (playerPoint < dealerPoint) ifTrue: [ 'Dealer point is higher! You lose!' displayNl. ].

                (playerPoint = dealerPoint) ifTrue: [
                    'Push! Same point - bet returned.' displayNl.
                    game at: 1 put: ((game at: 1) + (game at: 2)).
                ].
            ].
        ].

        ' ' displayNl.
        ('You have ', (game at: 1) asString, ' Credits') displayNl.

        "Check if player is broke"
        ((game at: 1) == 0) ifTrue: [
            'You are out of credits! Game over.' displayNl.
        ] ifFalse: [
            rounds := (rounds + 1 ).
            ('This is round: ', rounds asString) displayNl.
            'Please bet an amount to roll the dice or q to stop ' display.
        ].
    ].
].

"Game over - display final results"
' ' displayNl.
'Thanks for playing!' displayNl.
('You have ', (game at: 1) asString, ' Credits in total') displayNl.