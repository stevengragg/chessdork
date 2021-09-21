import hipster from "./hipster"
import {centralGambit} from "./studies/rl-central-gambit"

/* TODO: The opening courses should be created when the user enters their data */
export const openingCourse = {
    levels: [{name: "Schliemann ", orientation:"black", openingId:"sch-b", levelId:"level-1", level:1, treePosition:1, icon: "windmill", active:true},
    {name: "Ruy Lopez d4", orientation:"white", openingId:"rl-cent", levelId:"level-1", level:1, icon: "spanish", treePosition:1, active:true},
     {name: "Schliemann  2", orientation:"black",
     openingId:"schliemann", levelId:"level-1",level:2, icon: "windmill", treePosition:2, active:true}, 
     {name: "French Alapin", orientation:"black" ,  openingId:"french-w",levelId:"level-1", icon: "french2",  level:1, treePosition:2, active:true},
     {name: "Classic Italian", openingId:"fried-b", orientation:"black", levelId:"level-2",level:2, icon: "italian", treePosition:2, active:true},
     { name: "Caro kahn 1" , openingId:"caro-w", orientation:"white", levelId:"level-1",level:1, icon: "italian", treePosition:3, active: false}, 
      {name: "French Tarrasch" , openingId:"fr-w",orientation:"white",  levelId:"level-1",level:1, icon: "french",treePosition:4, active:false},
     {name:"e4 Other", openingId:"Other",orientation:"black", levelId:"level-1",level:1, icon: "italian2", treePosition:4, active:false},
     {name:"Scandinavian", openingId:"scandi",orientation:"white", levelId:"level-1",level:1, icon: "windmill", treePosition:4,active:false},
     {name:"Sicilian Alapin", openingId:"Other",orientation:"white", levelId:"level-1",level:1, icon: "italian2", treePosition:5,active:false},
     {name:"Sicilian Alapin 2 ", openingId:"Other",orientation:"white", levelId:"level-2",level:1, icon: "italian2", treePosition:5,active:false},
     {name:"Vs Scott Gambit ", openingId:"Other",orientation:"black", levelId:"level-2",level:1, icon: "scottish", treePosition:6,active:false},
    //  {name:"e4 Other", openingId:"Other",orientation:"black", levelId:"level-1",level:1, icon: "italian2", treePosition:4},
    
    ]
    
}

export const gCentro={
    name: "Ruy Lopez Mackenzie Variation", icon: "spanish", levelId:"level-1",
    openingId:"rl-cent",
    orientation:"white",
    level:1,
    totalLevels:2,
    tips: hipster,
    lessons:centralGambit.lessons
}
export const schliemann={
    name: "Schlieman defense", icon: "italian",
    levelId:"level-1",
    openingId:"sch-b",
    nickName:"The Ruy Slayer",
    orientation:"black",
    level:1,
    totalLevels:2,
    tips: hipster,
    lessons:centralGambit.lessons
    // lessons:[{name:"Lesson 1", pgn: "1. e4 e5 2. Nf3 Nc6 3. Bc5 f5 4. Bxc6 dxc6  "},
    //  {name:"Lesson 2", pgn: "1. e4 e5 2. Nf3 Nc6 3. Bc5 f5 4. Bxc6 dxc6 "}]
}
export const schliemann2={
    name: "Schlieman defense 2",
    icon: "italian",
    levelId:"level-2",
    openingId:"sch-b",
    nickName:"The Ruy Slayer ",
    orientation:"black",
    level:2,
    totalLevels:2,
    tips: hipster,
    lessons:centralGambit.lessons

    // lessons:[{name:"Lesson 1", pgn: "1. e4 e5 2. Nf3 Nc6 3. Bc5 f5 4. Bxc6 dxc6  "},
    
    //  {name:"Lesson 2", pgn: "1. e4 e5 2. Nf3 Nc6 3. Bc5 f5 4. Bxc6 dxc6 "}]
}
export const friedLiver={
    name: "Fried Liver attack" ,
    openingId: "fried-b",
    icon: "italian",
    levelId:"friedLiver1",
    nickName:"The Ruy Slayer",
    tips: hipster,
    level:1,
    totalLevels:3,
    orientation:"white",
    lessons:centralGambit.lessons
}
export const friedLiver2={
    name: "Fried Liver attack" ,
    levelId:"friedLiver2",
    icon: "italian",

    openingId:"friedLiver",
    nickName:"The Ruy Slayer",
    tips: hipster,
    level:1,
    totalLevels:3,
    orientation:"white",
    lessons:centralGambit.lessons
}
