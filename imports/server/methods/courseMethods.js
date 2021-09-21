import { check } from 'meteor/check';
import { CourseCollection } from '../../api/course';

// Declare your queries on the server, add more validation and security checks
Meteor.methods({
  'course.update'(text) {
    // check(text, String);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
   },
  variationUpdate({variationId, finished, lessonId, openingId, levelId}) {
    console.log ("VARIATION UPDATE CALLEEEEED!")
    check(variationId, String);
    check(finished, Boolean);
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    // Add 10 Exp points
    // get course completion % 
    // TODO: Allow for different courses (here we're not filtering by course Id!!!)
    let course = CourseCollection.find({userId:this.userId }).fetch()
    let node = course[0].levels.filter((level)=> level.levelId===levelId && level.openingId ===openingId)
    let successTimes
    let variationsFinished = [] // variations finished in lesson
    let isFirstTime = false
    console.log ("________________________________")
    console.log ({lessons : node[0].lessons})
    console.log ("________________________________------------------------------------------------------")
    
    
    node[0].lessons.forEach((lesson)=>{
      if (lesson.lessonId ===lessonId){
        if (finished){
          if (lesson.variationsFinished.includes(variationId)=== false){
            isFirstTime=true
            console.log ("NEW VARIANT", lessonId, variationId,lesson.variationsFinished)
            variationsFinished = [...lesson.variationsFinished, variationId]
            node[0].variationsFinished =  [...node[0].variationsFinished, variationId]
          }
          else{
            isFirstTime= false
            console.log ("NOT SO NEW VARIANT",lessonId, variationId,lesson.variationsFinished)
          }
        }
        lesson.variations.forEach((variation)=>{
          if (variation.variationId ===variationId){
            variation.finished=finished
            successTimes = variation.successTimes+1
            console.log ("UPDATING SUCCESS MATE" , successTimes) 
          }
        })
      }
    })

    // console.log ({lessonsNew:node[0].lessons, lessonId, variationId, finished , openingId})
    // get variation completion % 
    // variation: set finished, add +1 to times finished
    console.log ("ABOUT TO SET EVERYTHING,", finished, successTimes, variationsFinished, node[0].variationsFinished)
     
    if (isFirstTime){

      CourseCollection.update(
        {userId:this.userId}, 
        {$set : {
        "levels.$[updateLevel].lessons.$[updateLesson].variations.$[updateVariation].finished": finished, 
        "levels.$[updateLevel].lessons.$[updateLesson].variations.$[updateVariation].successTimes": successTimes,
        "levels.$[updateLevel].lessons.$[updateLesson].variationsFinished": variationsFinished,
        "levels.$[updateLevel].variationsFinished": node[0].variationsFinished
      }},
        {"arrayFilters": [{"updateLesson.lessonId":lessonId}, {"updateLevel.openingId":openingId},  
        {"updateVariation.variationId": variationId}]} 
          )
    }
    else{


      CourseCollection.update(
        {userId:this.userId}, 
        {$set : {
        "levels.$[updateLevel].lessons.$[updateLesson].variations.$[updateVariation].successTimes": successTimes,
      }},
        {"arrayFilters": [{"updateLesson.lessonId":lessonId}, {"updateLevel.openingId":openingId},  
        {"updateVariation.variationId": variationId}]} 
          )
    }

   },
  
});
