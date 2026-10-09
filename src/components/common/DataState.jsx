import { FiAlertCircle } from "react-icons/fi";
import ClipLoader from "react-spinners/ClipLoader";
import EmptyState from "@/components/common/EmptyState";

const DataState = ({ loading, error, isEmpty, onRetry, empty, children }) => {
  if (loading) {
    return (
      <div role="status" className="flex justify-center py-16">
        <ClipLoader color="#fca311" size={32} />
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={FiAlertCircle}
        title="Something went wrong"
        text={error.message}
        action={
          onRetry && (
            <button type="button" className="btn btn-outline" onClick={onRetry}>
              Try again
            </button>
          )
        }
      />
    );
  }

  if (isEmpty) {
    return <EmptyState {...empty} />;
  }

  return children;
};

export default DataState;
