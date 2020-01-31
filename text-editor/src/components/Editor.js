import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

class MyEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  componentDidMount = () => {
    console.log('OLAAAA', this.state);
  };

  onChange = editorState => {
    this.setState({ editorState });
  };

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command,
    );

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not handled';
  };

  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default MyEditor;
