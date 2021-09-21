import { OpeningCollection } from '../../api/openings';

Meteor.publish('opening', function getOpening() {
  if (!Meteor.userId()) {
    throw new Meteor.Error('Not authorized.');
  }
  console.log ("getting opening")
    return OpeningCollection.find()
  });
  

  Meteor.publish("currentLesson", function({levelId, openingId}){
    if (!Meteor.userId()) {
      throw new Meteor.Error('Not authorized.');
    }
    console.log("currentLesson pub", openingId)
      return (OpeningCollection.find({openingId}))
  
    })