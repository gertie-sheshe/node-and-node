import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

class MyEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onChange = editorState => {
    this.setState({ editorState });
  };

  onUnderlineClick = event => {
    const style = event.target.name;
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
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
        <button name="UNDERLINE" onClick={this.onUnderlineClick}>
          Underline
        </button>
        <button name="BOLD" onClick={this.onUnderlineClick}>
          Bold
        </button>
        <button name="CODE" onClick={this.onUnderlineClick}>
          Code
        </button>
        <div className="myeditor">
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default MyEditor;
