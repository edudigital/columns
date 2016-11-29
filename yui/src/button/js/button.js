// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    atto_columns
 * @copyright  EDUdigital
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_columns-button
 */


/**
 * Atto text editor columns plugin.
 *
 * @namespace M.atto_columns
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

var COMPONENTNAME = 'atto_columns';
var OPTIONCONTROL = 'columns_option';
var LOGNAME = 'atto_columns';

var CSS = {
        INPUTSUBMIT: 'atto_media_urlentrysubmit',
        INPUTCANCEL: 'atto_media_urlentrycancel',
        OPTIONCONTROL: 'optioncontrol'
    },
    SELECTORS = {
        OPTIONCONTROL: '.optioncontrol'
    };
	
	var TEMPLATE = '' +
    '<form class="atto_form">' +
        '<div id="{{elementid}}_{{innerform}}" class="mdl-align">' +
			'<select class="{{CSS.OPTIONCONTROL}}" id="{{elementid}}_{{OPTIONCONTROL}}" name="{{elementid}}_{{OPTIONCONTROL}}">'+
				'<option value="{{typeone}}">50-50</option>'+
				'<option value="{{typetwo}}">66-33</option>'+
				'<option value="{{typethree}}">33-66</option>'+
				'<option value="{{typefour}}">33-33-33</option>'+
			'</select>'+
			'<br><br>'+
			'<button class="{{CSS.INPUTSUBMIT}}">{{get_string "insert" component}}</button>' +
        '</div>' +
    '</form>';

Y.namespace('M.atto_columns').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {

  
	/**
     * Initialize the button
     *
     * @method Initializer
     */
    initializer: function() {
        // If we don't have the capability to view then give up.
        if (this.get('disabled')){
            return;
        }

        var icons = ['columns'];

        Y.Array.each(icons, function(theicon) {
            // Add the columns icon/buttons
            this.addButton({
                icon: 'ed/' + theicon,
                iconComponent: 'atto_columns',
                buttonName: theicon,
                callback: this._displayDialogue,
                callbackArgs: theicon
            });
        }, this);

    },

    /**
     * Get the id of the option control where we store the option
     *
     * @method _getOptionControlName
     * @return {String} the name/id of the option form field
     * @private
     */
    _getOptionControlName: function(){
        return(this.get('host').get('elementid') + '_' + OPTIONCONTROL);
    },

     /**
     * Display the columns Dialogue
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function(e, clickedicon) {
        e.preventDefault();
        var width=400;


        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('dialogtitle', COMPONENTNAME),
            width: width + 'px',
            focusAfterHide: clickedicon
        });
		//dialog doesn't detect changes in width without this
		//if you reuse the dialog, this seems necessary
        if(dialogue.width !== width + 'px'){
            dialogue.set('width',width+'px');
        }

        //append buttons to iframe
        var buttonform = this._getFormContent(clickedicon);

        var bodycontent =  Y.Node.create('<div></div>');
        bodycontent.append(buttonform);
		//this._doInsert(e);
        //set to bodycontent
        dialogue.set('bodyContent', bodycontent);
        dialogue.show();
        this.markUpdated();
    },


     /**
     * Return the dialogue content for the tool, attaching any required
     * events.
     *
     * @method _getDialogueContent
     * @return {Node} The content to place in the dialogue.
     * @private
     */
    _getFormContent: function(clickedicon) {
        var template = Y.Handlebars.compile(TEMPLATE),
            content = Y.Node.create(template({
                elementid: this.get('host').get('elementid'),
                CSS: CSS,
                OPTIONCONTROL: OPTIONCONTROL,
                component: COMPONENTNAME,
				typeone: this.get('typeone'),
				typetwo: this.get('typetwo'),
				typethree: this.get('typethree'),
				typefour: this.get('typefour'),
                clickedicon: clickedicon
            }));

        this._form = content;
        this._form.one('.' + CSS.INPUTSUBMIT).on('click', this._doInsert, this);
        return content;
    },

    /**
     * Inserts the users input onto the page
     * @method _getDialogueContent
     * @private
     */
    _doInsert : function(e){
        e.preventDefault();
        this.getDialogue({
            focusAfterHide: null
        }).hide();

        var optioncontrol = this._form.one(SELECTORS.OPTIONCONTROL);

        this.editor.focus();

		this.get('host').insertContentAtFocusPoint(optioncontrol.get('value'));
        this.markUpdated();

    }
}, { ATTRS: {
		disabled: {
			value: false
		},

		usercontextid: {
			value: null
		},

		typeone: {
			value: ''
		},
		typetwo: {
			value: ''
		},
		typethree: {
			value: ''
		},
		typefour: {
			value: ''
		}
	}
});

