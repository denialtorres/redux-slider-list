import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as topicsActions from '../store/properties/actions';
import * as topicsSelectors from '../store/properties/reducer';
import ListView from '../components/ListView';


class PropertiesScreen extends Component {

  componentDidMount() {
    this.props.dispatch(topicsActions.fetchTopics());
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();
    return (
      <div className="TopicsScreen">
        <ListView
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow} />
      </div>
    );
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  renderRow(row) {
    return (
      <div>
        <h3>{row.title}</h3>
        <p>{row.description}</p>
      </div>
    )
  }

}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    rowsById: topicsSelectors.getTopicsByUrl(state),
    rowsIdArray: topicsSelectors.getTopicsUrlArray(state)
  };
}


export default connect(mapStateToProps)(PropertiesScreen);
