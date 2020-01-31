import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

class MyEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  setDomEditorRef = ref => (this.domEditor = ref);

  focus = () => this.domEditor.focus();

  componentDidMount() {
    this.domEditor.focus();
  }

  onChange = editorState => {
    const options = {
      BOLD: { element: 'b' },
    };
    this.setState({
      editorState,
      editorContentHtml: stateToHTML(editorState.getCurrentContent(), options),
    });
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
        <div className="myeditor" autoFocus>
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            ref={this.setDomEditorRef}
          />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: this.state.editorContentHtml }}
        />
      </div>
    );
  }
}

export default MyEditor;
