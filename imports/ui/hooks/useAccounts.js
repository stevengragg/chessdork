import { useTracker } from 'meteor/react-meteor-data'

// Create a reusable hook
export const useAccount = () => useTracker(() => {
  
  const handler = Meteor.subscribe('currentUser');
    const user = Meteor.user()
    const noDataAvailable = { user: undefined};

    const userId = Meteor.userId()
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
  // const course = CourseCollection.find({}).fetch({})
  console.log({user})
    return {
      user: user,
      userId,
      isLoggedIn: !!userId
    }
  }, [])
  