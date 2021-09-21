import { Meteor } from 'meteor/meteor';
import { OpeningCollection } from '/imports/api/openings';
import { friedLiver, friedLiver2, schliemann, schliemann2, gCentro } from "../utils/mockData"
import { Accounts } from 'meteor/accounts-base';
import * as uuid from 'uuid'

import { pgnReader } from '../imports/ui/libs/pgn-reader/pgn';

// TODO: Move to another file (utils/pgnToMovesLoader)
//TODO: Load moves of games, intros as well
/* parse opening to load opening object with variations */
const loadOpeningObject = (opening) => {
  let libConfig = {
     locale: 'en', startPlay: 0, showResult: true, boardSize: 500,
    notationLayout: 'inline', layout: "top", showFen: false,
    pieceStyle: 'wikipedia', theme: 'blue', scrollable: true
  }

  opening.lessons.forEach((lesson) => {
    console.log ({lesson})
    // load moves to each lesson
    lesson.lessonId = uuid.v4()
    let customLibConfig = {...libConfig, pgn:lesson.pgn}
    // lesson.basePgn = pgnReader(libConfig)
    lesson.basePgn = pgnReader(customLibConfig)
    lesson.moves = lesson.basePgn.getMoves()
    console.log ({moves: lesson.moves})
    lesson.variations=[lesson.moves]
    let variationArr = []
    lesson.moves.forEach((move) => {
      if (move.variations && move.variations.length>0) {
        lesson.variations = [...lesson.variations, ...move.variations]
      }
    }
    )
    // Add ids to each variation
    lesson.variations.forEach((variation)=>{
      variationArr.push({moves:variation, variationId:uuid.v4()})
    })

    // dirty trick, overwriting lesson.variations with the array with ids
    lesson.variations= [...variationArr]   
  }
  ) 
  insertOpening(opening) 
}



// Publications 
import '../imports/server/publications/coursePublications';
import '../imports/server/publications/openingPublications';

// Hooks
import "./accounts"
import "../imports/api/webhooks"

//Methods
import "../imports/server/methods/courseMethods"
const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';




function insertOpening(opening) {
  OpeningCollection.insert({ ...opening, createdAt: new Date() });
}

Meteor.publish("currentUser", function () {
  return Meteor.users.find({ _id: this.userId },
    { fields: { roles: 1 , profilePicture:1} })
})


Meteor.startup(() => {
  ServiceConfiguration.configurations.remove({service:"google"})
  ServiceConfiguration.configurations.insert(  {
    service: "google",
    clientId: "338333385443-0u0o7jq3957qu474420jf58fqkm6kbc3.apps.googleusercontent.com",
    secret: "xB3uDfPC5gpMuQqXRlACnrFf"
  });
  
   
    
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  // loadOpeningObject(gCentro)
  if (OpeningCollection.find().count() === 0) {
    insertOpening(friedLiver)
    loadOpeningObject(gCentro)
    loadOpeningObject(friedLiver2)
    loadOpeningObject(schliemann)
    loadOpeningObject(schliemann2)
  }

});
 