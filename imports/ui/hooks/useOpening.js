import { useTracker } from 'meteor/react-meteor-data'
import { OpeningCollection } from "../../api/openings"

export default useOpening = ({openingId, level}) => {
    const { currentOpening, isLoading } = useTracker(() => {
        const noDataAvailable = { currentOpening: [] };
        const handler = Meteor.subscribe('currentLesson', { openingId, level });
        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }
        const currentLesson = OpeningCollection.find({}).fetch()
        return { currentOpening: currentLesson }
    })
    console.log({currentOpening})
    return {currentOpening, isLoading}
}
