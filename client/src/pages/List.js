import React, { Component } from 'react';

import axios from 'axios';

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data : [],
    }
  }

  componentDidMount() {
    this._getListData()
  }

  _getListData = async function() {
    const data_list = await axios('/api/user', {
      method : 'GET',
      headers: new Headers()
    })

    this.setState({ data : data_list })
  }

  render() {
    console.log(this.state.data)

    return (
        <div>
        </div>
    );
  }
}

export default List;
