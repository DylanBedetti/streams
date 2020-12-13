import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";
import { connect } from "react-redux";
import StreamList from "./StreamList";
import { Link } from "react-router-dom";

class StreamDelete extends React.Component {
  // match object is passed through by the Route Component
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  // a fragment of JSX
  renderActions() {
    const { id } = this.props.match.params;
    // const {id} = this.props.stream.id; -- Lecture 376 !! NEED TO UNDERSTAND WHY THIS PROP IS NOT AVALIABLE

    return (
      <>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }

    return (
      <>
        Are you sure you want to delete this stream with title:{" "}
        <b>{this.props.stream.title}</b>
      </>
    );
  }

  render() {
    return (
      <div>
        <StreamList />
        <Modal
          title="Delete Stream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/")}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetchStream,
  deleteStream,
})(StreamDelete);
