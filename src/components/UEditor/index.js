import React from 'react';

export default class Ueditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id ? this.props.id : null,
      ueditor: null,
      propsHeight:this.props.propsHeight!==undefined?this.props.propsHeight:300,
      propsWidth:this.props.propsWidth!==undefined?this.props.propsWidth:'100%'
    };
  }
  componentDidMount() {
    const {propsHeight,propsWidth} = this.props;
    let UE = window.UE;
    let { id } = this.state;
    if (id) {
      try {
        /*加载之前先执行删除操作，否则如果存在页面切换，
        再切回带编辑器页面重新加载时不刷新无法渲染出编辑器*/
        UE.delEditor(id);
      } catch (e) {}
      let ueditor = UE.getEditor(id, {
        toolbars: [["fullscreen","source","undo","redo","cleardoc","removeformat","formatmatch","pasteplain","drafts","autotypeset","template","simpleupload","insertimage","insertvideo","attachment","link","|","inserttable","mergeright","mergedown","splittorows","splittocols","mergecells","|","preview","searchreplace","help","|"],["bold","italic","underline","fontfamily","fontsize","forecolor","backcolor","insertunorderedlist","insertorderedlist","indent","paragraph","|","justifyleft","justifycenter","justifyright","justifyjustify","lineheight"]],
		    autoHeightEnabled: false,
		    autoFloatEnabled: false,
		    imageScaleEnabled:false,
		    wordCount:false,
        initialFrameHeight: propsHeight,
        initialFrameWidth:'100%',//宽度100%
      });
      this.setState({ ueditor });
    }
  }
  render() {
    let { id } = this.state;
    return (
      <div>
        <textarea id={id} />
      </div>
    );
  }
}
