import { CourseCollection } from '../../api/course';

Meteor.publish('course', function getCourse() {
  const user = Meteor.user()
  if (!Meteor.userId()) {
    throw new Meteor.Error('Not authorized.');
  }

    return CourseCollection.find({userEmail:user.emails[0].address})
  });
  