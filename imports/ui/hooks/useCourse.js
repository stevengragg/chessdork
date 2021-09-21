import { useTracker } from 'meteor/react-meteor-data'
import { CourseCollection } from "../../api/course"

export default useCourse = () => {
    const { course, isLoading } = useTracker(() => {
        const noDataAvailable = { course: [] };
        const handler = Meteor.subscribe('course');
        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }
        const course = CourseCollection.find({}).fetch()
        return { course }
    })
    console.log({course})
    return {course, isLoading}
}
