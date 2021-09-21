import { CourseCollection } from  "/imports/api/course";
import { OpeningCollection } from '/imports/api/openings';
import { openingCourse} from "../utils/mockData"
import * as uuid from 'uuid'

function insertCourse(course) {
    CourseCollection.insert({...course,courseId:uuid.v4() , createdAt: new Date()});
  }


    // TODO: Add lesson Array, with {lessonId, finished: bool, variations:[{variationId, status, finished}]}
     function getCourseWithData (){
      let courseWithData = openingCourse
      courseWithData.levels.forEach((node, i)=>{
          node.progress = 0 
          node.finished = false
          node.variationIds=[]
          node.variationsFinished=[]
          let openingId= node.openingId
          let lvl = node.level
          let opening =  OpeningCollection.find({level:lvl, openingId}).fetch()

          console.log({opening})
          if (opening && opening.length>0 && opening[0].lessons){
            console.log ("________________________________________")
            // TODO: AQUI, COGER LESSONS Y VARIATIONS Y AÑADIRLAS A ESTRUCTURA CON IDS, PROGRESO, ETC
            node.lessons= []

            opening[0].lessons.forEach((lesson)=>{             
              let lessonId = lesson.lessonId 
              let variations= []
              if (lesson.variations){
                lesson.variations.forEach((variation)=>{
                  variations.push({variationId:variation.variationId,successTimes:0, finished:false})
                  node.variationIds.push(variation.variationId)

                })
              }
              node.lessons.push ({lessonId: lessonId , variationsFinished:[] , finished: false, variations })
            })
          }
      })
      // at the "node " level:
      // get array with all levels, empty array w/finished levels
      // get array with all variations, empty array w/ finished variations

      return courseWithData
  }

Accounts.onCreateUser((options, user)=>{
    if (typeof(user.services.google) != "undefined") {
        user.emails = [{address:user.services.google.email, verified:user.services.google.verified_email}];
        user.profilePicture = user.services.google.picture;
        user.username = user.services.google.email.substring(0, user.services.google.email.indexOf("@"))
        options.email = user.emails[0].address
    }

    const courseWithData  = getCourseWithData ()  

    //TODO: Add real course
    // TODO: Add variation, lessons, ids.
    // We create a course document for each new user
    insertCourse ({...courseWithData,userEmail:options.email, userId: user._id, finished:false })
        user.roles=["admin"]
    
    // Add basic user profile data fields
    user.xP= 0       // Exp points
    user.streak= 0  //Streak days 
    return user
})

// Update lesson level:
// db.course.update({userId:"ExCGXsQmMou52jLeS"},{$set:{"levels.$[updateLevel].lessons.$[updateLesson].finished": true}},{"arrayFilters":[{"updateLesson.lessonId":"e8451f46-0486-40e1-bef1-2b85337d8ea0"},{"updateLevel.name":"jajajajajaja"}]})

//update variation:
//db.course.update({userId:"ExCGXsQmMou52jLeS"},{$set:{"levels.$[updateLevel].lessons.$[updateLesson].variations.$[updateVariation].finished": true}},{"arrayFilters":[{"updateLesson.lessonId":"e8451f46-0486-40e1-bef1-2b85337d8ea0"},{"updateLevel.name":"jajajajajaja"}, {"updateVariation.variationId": "ab43cc19-9559-484c-8b60-9030be438c90"}]})