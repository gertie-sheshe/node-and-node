import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';

class MyEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  componentDidMount = () => {
    console.log('OLAAAA', this.state);
  };

  onChange = editorState => {
    console.log('CHANGE', editorState);
    this.setState({ editorState });
  };

  render() {
    return (
      <div>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
      </div>
    );
  }
}

export default MyEditor;
