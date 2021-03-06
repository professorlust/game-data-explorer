/** @babel */

import {Emitter} from 'atom'

import {fs} from './util'
import BinaryFile from './binary-file'
import BinaryFileEditorComponent from './binary-file-editor-component'
import Serializable from './serializable'

class BinaryFileEditor {
  static get version() { return 1 }
  static validate(params) { if (params.path && fs.isFileSync(params.path)) return params }
  get serialized() { return {path: this.file.path} }

  constructor({path}) {
    this.file = new BinaryFile(path)
    this.file.openSync()

    this.emitter = new Emitter()
    this.component = new BinaryFileEditorComponent(this, [])
  }

  destroy() {
    this.component.destroy();
    return this.emitter.emit('did-destroy')
  }
  onDidDestroy(callback) { return this.emitter.on('did-destroy', callback) }

  getURI() { return this.file.path }
  getTitle() {
    if (!this.file.path) return 'untitled'
    return this.file.path
  }

  get element() { return this.component.element }
}
Serializable.includeInto(BinaryFileEditor, __filename)

export default BinaryFileEditor
