'use babel';

import We4tvView from './we4tv-view';
import { CompositeDisposable } from 'atom';

export default {

  we4tvView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.we4tvView = new We4tvView(state.we4tvViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.we4tvView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'we4tv:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.we4tvView.destroy();
  },

  serialize() {
    return {
      we4tvViewState: this.we4tvView.serialize()
    };
  },

  toggle() {
    console.log('We4tv was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
