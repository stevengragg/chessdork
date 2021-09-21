export const onBoardingItems = [
    {
        sequence: 1,
        key: 'playerLevel',
        question: 'What\'s your current chess level?',
        choices: [
            { 
                value: 1,
                text: 'Casual player (1000)'
            },
            { 
                value: 2,
                text: 'Club (1200)'
            },
            { 
                value: 3,
                text: 'League (1400)'
            },
            { 
                value: 4,
                text: 'Tournament (1600)'
            },
            { 
                value: 5,
                text: 'Advanced (1800)'
            },
            { 
                value: 6,
                text: 'Master (2200+)'
            }
        ]
    },
    { 
        sequence: 2,
        key: 'commitment',
        question: 'To learn a repertoire and  improve your chess you must practice daily. What\'s your practice goal?',
        choices: [
            { 
                value: 1,
                text: 'Relax (5 min/day)'
            },
            { 
                value: 2,
                text: 'Normal (10 min/day)'
            },
            { 
                value: 3,
                text: 'Serious (15 min/day)'
            },
            { 
                value: 4,
                text: 'intense (20 min/day)'
            },
        ]
    },
    { 
        sequence: 2,
        key: 'repertoireChoice',
        question: 'Choose your Opening path:',
        choices: [
            { 
                value: "aggressive",
                text: 'Aggressive'
            },
            { 
                value: "solid",
                text: 'Solid'
            },
        ]
    }


];