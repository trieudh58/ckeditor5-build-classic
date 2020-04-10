import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import imageIcon from './icons/eye.svg';

export default class Preview extends Plugin {
	constructor( editor ) {
		super( editor );
		this._config = editor.config.get( 'preview' ) || {};
	}

	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'preview', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'Preview',
				icon: imageIcon,
				tooltip: true,
				withText: true
			} );

			// Callback executed once the image is clicked.
			view.on( 'execute', () => {
				const content = editor.getData();
				if ( typeof this.renderPreview === 'function' ) {
					this.renderPreview( content );
				}
			} );

			return view;
		} );
		this._registerCallbackHandler();
	}

	_registerCallbackHandler() {
		this.renderPreview = this._config.renderPreview;
	}
}
