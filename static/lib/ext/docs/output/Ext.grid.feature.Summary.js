Ext.data.JsonP.Ext_grid_feature_Summary({
  "tagname": "class",
  "name": "Ext.grid.feature.Summary",
  "doc": "<p>This feature is used to place a summary row at the bottom of the grid. If using a grouping,\nsee <a href=\"#/api/Ext.grid.feature.GroupingSummary\" rel=\"Ext.grid.feature.GroupingSummary\" class=\"docClass\">Ext.grid.feature.GroupingSummary</a>. There are 2 aspects to calculating the summaries,\ncalculation and rendering.</p>\n\n<h2>Calculation</h2>\n\n<p>The summary value needs to be calculated for each column in the grid. This is controlled\nby the summaryType option specified on the column. There are several built in summary types,\nwhich can be specified as a string on the column configuration. These call underlying methods\non the store:</p>\n\n<ul>\n<li><a href=\"#/api/Ext.data.Store-method-count\" rel=\"Ext.data.Store-method-count\" class=\"docClass\">count</a></li>\n<li><a href=\"#/api/Ext.data.Store-method-sum\" rel=\"Ext.data.Store-method-sum\" class=\"docClass\">sum</a></li>\n<li><a href=\"#/api/Ext.data.Store-method-min\" rel=\"Ext.data.Store-method-min\" class=\"docClass\">min</a></li>\n<li><a href=\"#/api/Ext.data.Store-method-max\" rel=\"Ext.data.Store-method-max\" class=\"docClass\">max</a></li>\n<li><a href=\"#/api/Ext.data.Store-method-average\" rel=\"Ext.data.Store-method-average\" class=\"docClass\">average</a></li>\n</ul>\n\n\n<p>Alternatively, the summaryType can be a function definition. If this is the case,\nthe function is called with an array of records to calculate the summary value.</p>\n\n<h2>Rendering</h2>\n\n<p>Similar to a column, the summary also supports a summaryRenderer function. This\nsummaryRenderer is called before displaying a value. The function is optional, if\nnot specified the default calculated value is shown. The summaryRenderer is called with:</p>\n\n<ul>\n<li>value {Object} - The calculated value.</li>\n<li>summaryData {Object} - Contains all raw summary values for the row.</li>\n<li>field {String} - The name of the field we are calculating</li>\n</ul>\n\n\n<h2>Example Usage</h2>\n\n<pre><code>Ext.define('TestResult', {\n    extend: 'Ext.data.Model',\n    fields: ['student', {\n        name: 'mark',\n        type: 'int'\n    }]\n});\n\nExt.create('Ext.grid.Panel', {\n    width: 200,\n    height: 140,\n    renderTo: document.body,\n    features: [{\n        ftype: 'summary'\n    }],\n    store: {\n        model: 'TestResult',\n        data: [{\n            student: 'Student 1',\n            mark: 84\n        },{\n            student: 'Student 2',\n            mark: 72\n        },{\n            student: 'Student 3',\n            mark: 96\n        },{\n            student: 'Student 4',\n            mark: 68\n        }]\n    },\n    columns: [{\n        dataIndex: 'student',\n        text: 'Name',\n        summaryType: 'count',\n        summaryRenderer: function(value, summaryData, dataIndex) {\n            return Ext.String.format('{0} student{1}', value, value !== 1 ? 's' : ''); \n        }\n    }, {\n        dataIndex: 'mark',\n        text: 'Mark',\n        summaryType: 'average'\n    }]\n});\n</code></pre>\n",
  "extends": "Ext.grid.feature.AbstractSummary",
  "mixins": [

  ],
  "alternateClassNames": [

  ],
  "xtype": null,
  "author": null,
  "docauthor": null,
  "singleton": false,
  "private": false,
  "cfg": [
    {
      "tagname": "cfg",
      "name": "listeners",
      "member": "Ext.util.Observable",
      "type": "Object",
      "doc": "<p>(optional) <p>A config object containing one or more event handlers to be added to this\nobject during initialization.  This should be a valid listeners config object as specified in the\n<a href=\"#/api/Ext.grid.feature.Summary-method-addListener\" rel=\"Ext.grid.feature.Summary-method-addListener\" class=\"docClass\">addListener</a> example for attaching multiple handlers at once.</p></p>\n\n<br><p><b><u>DOM events from ExtJs <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Components</a></u></b></p>\n\n\n<br><p>While <i>some</i> ExtJs Component classes export selected DOM events (e.g. \"click\", \"mouseover\" etc), this\n\n\n<p>is usually only done when extra value can be added. For example the <a href=\"#/api/Ext.view.View\" rel=\"Ext.view.View\" class=\"docClass\">DataView</a>'s\n<b><code><a href=\"#/api/Ext.view.View--click\" rel=\"Ext.view.View--click\" class=\"docClass\">click</a></code></b> event passing the node clicked on. To access DOM\nevents directly from a child element of a Component, we need to specify the <code>element</code> option to\nidentify the Component property to add a DOM listener to:</p>\n\n<pre><code>new Ext.panel.Panel({\n    width: 400,\n    height: 200,\n    dockedItems: [{\n        xtype: 'toolbar'\n    }],\n    listeners: {\n        click: {\n            element: 'el', //bind to the underlying el property on the panel\n            fn: function(){ console.log('click el'); }\n        },\n        dblclick: {\n            element: 'body', //bind to the underlying body property on the panel\n            fn: function(){ console.log('dblclick body'); }\n        }\n    }\n});\n</code></pre>\n\n\n<p></p></p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 103,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-cfg-listeners",
      "shortDoc": "(optional) A config object containing one or more event handlers to be added to this\nobject during initialization.  T..."
    },
    {
      "tagname": "cfg",
      "name": "showSummaryRow",
      "member": "Ext.grid.feature.AbstractSummary",
      "type": "Boolean",
      "doc": "<p>True to show the summary row. Defaults to <tt>true</tt>.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/feature/AbstractSummary.js",
      "linenr": 18,
      "html_filename": "AbstractSummary.html",
      "href": "AbstractSummary.html#Ext-grid-feature-AbstractSummary-cfg-showSummaryRow"
    }
  ],
  "method": [
    {
      "tagname": "method",
      "name": "addEvents",
      "member": "Ext.util.Observable",
      "doc": "<p>Adds the specified events to the list of events which this Observable may fire.</p>\n",
      "params": [
        {
          "type": "Object/String",
          "name": "o",
          "doc": "<p>Either an object with event names as properties with a value of <code>true</code>\nor the first event name string if multiple event names are being passed as separate parameters.</p>\n",
          "optional": false
        },
        {
          "type": "String",
          "name": "",
          "doc": "<p>[additional] Optional additional event names if multiple event names are being passed as separate parameters.\nUsage:</p>\n\n<pre><code>this.addEvents('storeloaded', 'storecleared');\n</code></pre>\n\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 452,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-method-addEvents",
      "shortDoc": "<p>Adds the specified events to the list of events which this Observable may fire.</p>\n"
    },
    {
      "tagname": "method",
      "name": "addListener",
      "member": "Ext.util.Observable",
      "doc": "<p>Appends an event handler to this object.</p>\n",
      "params": [
        {
          "type": "String",
          "name": "eventName",
          "doc": "<p>The name of the event to listen for. May also be an object who's property names are event names. See</p>\n",
          "optional": false
        },
        {
          "type": "Function",
          "name": "handler",
          "doc": "<p>The method the event invokes.</p>\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "scope",
          "doc": "<p>(optional) The scope (<code><b>this</b></code> reference) in which the handler function is executed.\n<b>If omitted, defaults to the object which fired the event.</b></p>\n",
          "optional": true
        },
        {
          "type": "Object",
          "name": "options",
          "doc": "<p>(optional) An object containing handler configuration.\nproperties. This may contain any of the following properties:<ul>\n<li><b>scope</b> : Object<div class=\"sub-desc\">The scope (<code><b>this</b></code> reference) in which the handler function is executed.\n<b>If omitted, defaults to the object which fired the event.</b></div></li>\n<li><b>delay</b> : Number<div class=\"sub-desc\">The number of milliseconds to delay the invocation of the handler after the event fires.</div></li>\n<li><b>single</b> : Boolean<div class=\"sub-desc\">True to add a handler to handle just the next firing of the event, and then remove itself.</div></li>\n<li><b>buffer</b> : Number<div class=\"sub-desc\">Causes the handler to be scheduled to run in an <a href=\"#/api/Ext.util.DelayedTask\" rel=\"Ext.util.DelayedTask\" class=\"docClass\">Ext.util.DelayedTask</a> delayed\nby the specified number of milliseconds. If the event fires again within that time, the original\nhandler is <em>not</em> invoked, but the new handler is scheduled in its place.</div></li>\n<li><b>target</b> : Observable<div class=\"sub-desc\">Only call the handler if the event was fired on the target Observable, <i>not</i>\nif the event was bubbled up from a child Observable.</div></li>\n<li><b>element</b> : String<div class=\"sub-desc\"><b>This option is only valid for listeners bound to <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Components</a>.</b>\nThe name of a Component property which references an element to add a listener to.</p>\n\n<p>This option is useful during Component construction to add DOM event listeners to elements of <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Components</a> which\nwill exist only after the Component is rendered. For example, to add a click listener to a Panel's body:\n<pre><code>new Ext.panel.Panel({\n    title: 'The title',\n    listeners: {\n        click: this.handlePanelClick,\n        element: 'body'\n    }\n});\n</code></pre></p>\n\n\n<p>When added in this way, the options available are the options applicable to <a href=\"#/api/Ext.core.Element-method-addListener\" rel=\"Ext.core.Element-method-addListener\" class=\"docClass\">Ext.core.Element.addListener</a></p>\n\n\n<p></div></li>\n</ul><br></p>\n\n<p>\n<b>Combining Options</b><br>\nUsing the options argument, it is possible to combine different types of listeners:<br>\n<br>\nA delayed, one-time listener.\n<pre><code>myPanel.on('hide', this.handleClick, this, {\nsingle: true,\ndelay: 100\n});</code></pre>\n<p>\n<b>Attaching multiple handlers in 1 call</b><br>\nThe method also allows for a single argument to be passed which is a config object containing properties\nwhich specify multiple events. For example:\n<pre><code>myGridPanel.on({\n    cellClick: this.onCellClick,\n    mouseover: this.onMouseOver,\n    mouseout: this.onMouseOut,\n    scope: this // Important. Ensure \"this\" is correct during handler execution\n});\n</code></pre>.\n<p>\n\n",
          "optional": true
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 271,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-method-addListener",
      "shortDoc": "<p>Appends an event handler to this object.</p>\n"
    },
    {
      "tagname": "method",
      "name": "addManagedListener",
      "member": "Ext.util.Observable",
      "doc": "<p>Adds listeners to any Observable object (or Element) which are automatically removed when this Component\nis destroyed.\n\n",
      "params": [
        {
          "type": "Observable/Element",
          "name": "item",
          "doc": "<p>The item to which to add a listener/listeners.</p>\n",
          "optional": false
        },
        {
          "type": "Object/String",
          "name": "ename",
          "doc": "<p>The event name, or an object containing event name properties.</p>\n",
          "optional": false
        },
        {
          "type": "Function",
          "name": "fn",
          "doc": "<p>Optional. If the <code>ename</code> parameter was an event name, this\nis the handler function.</p>\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "scope",
          "doc": "<p>Optional. If the <code>ename</code> parameter was an event name, this\nis the scope (<code>this</code> reference) in which the handler function is executed.</p>\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "opt",
          "doc": "<p>Optional. If the <code>ename</code> parameter was an event name, this\nis the <a href=\"#/api/Ext.util.Observable-method-addListener\" rel=\"Ext.util.Observable-method-addListener\" class=\"docClass\">addListener</a> options.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 155,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-method-addManagedListener",
      "shortDoc": "<p>Adds listeners to any Observable object (or Element) which are automatically removed when this Component\nis destroyed.\n\n"
    },
    {
      "tagname": "method",
      "name": "attachEvents",
      "member": "Ext.grid.feature.Feature",
      "doc": "<p>Approriate place to attach events to the view, selectionmodel, headerCt, etc</p>\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/feature/Feature.js",
      "linenr": 89,
      "html_filename": "Feature.html",
      "href": "Feature.html#Ext-grid-feature-Feature-method-attachEvents",
      "shortDoc": "<p>Approriate place to attach events to the view, selectionmodel, headerCt, etc</p>\n"
    },
    {
      "tagname": "method",
      "name": "capture",
      "member": "Ext.util.Observable",
      "doc": "<p>Starts capture on the specified Observable. All events will be passed\nto the supplied function with the event name + standard signature of the event\n<b>before</b> the event is fired. If the supplied function returns false,\nthe event will not fire.</p>\n",
      "params": [
        {
          "type": "Observable",
          "name": "o",
          "doc": "<p>The Observable to capture events from.</p>\n",
          "optional": false
        },
        {
          "type": "Function",
          "name": "fn",
          "doc": "<p>The function to call when an event is fired.</p>\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "scope",
          "doc": "<p>(optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to the Observable firing the event.</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": true,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 55,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-method-capture",
      "shortDoc": "Starts capture on the specified Observable. All events will be passed\nto the supplied function with the event name + ..."
    },
    {
      "tagname": "method",
      "name": "clearListeners",
      "member": "Ext.util.Observable",
      "doc": "<p>Removes all listeners for this object including the managed listeners</p>\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 383,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-method-clearListeners",
      "shortDoc": "<p>Removes all listeners for this object including the managed listeners</p>\n"
    },
    {
      "tagname": "method",
      "name": "clearManagedListeners",
      "member": "Ext.util.Observable",
      "doc": "<p>Removes all managed listeners for this object.</p>\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 412,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-method-clearManagedListeners",
      "shortDoc": "<p>Removes all managed listeners for this object.</p>\n"
    },
    {
      "tagname": "method",
      "name": "disable",
      "member": "Ext.grid.feature.Feature",
      "doc": "<p>Disable a feature</p>\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/feature/Feature.js",
      "linenr": 140,
      "html_filename": "Feature.html",
      "href": "Feature.html#Ext-grid-feature-Feature-method-disable",
      "shortDoc": "<p>Disable a feature</p>\n"
    },
    {
      "tagname": "method",
      "name": "enable",
      "member": "Ext.grid.feature.Feature",
      "doc": "<p>Enable a feature</p>\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/feature/Feature.js",
      "linenr": 133,
      "html_filename": "Feature.html",
      "href": "Feature.html#Ext-grid-feature-Feature-method-enable",
      "shortDoc": "<p>Enable a feature</p>\n"
    },
    {
      "tagname": "method",
      "name": "enableBubble",
      "member": "Ext.util.Observable",
      "doc": "<p>Enables events fired by this Observable to bubble up an owner hierarchy by calling\n<code>this.getBubbleTarget()</code> if present. There is no implementation in the Observable base class.</p>\n\n\n<p>This is commonly used by Ext.Components to bubble events to owner Containers. See <a href=\"#/api/Ext.Component-method-getBubbleTarget\" rel=\"Ext.Component-method-getBubbleTarget\" class=\"docClass\">Ext.Component.getBubbleTarget</a>. The default\nimplementation in <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a> returns the Component's immediate owner. But if a known target is required, this can be overridden to\naccess the required target more quickly.</p>\n\n\n<p>Example:</p>\n\n\n<pre><code>Ext.override(Ext.form.field.Base, {\n//  Add functionality to Field&#39;s initComponent to enable the change event to bubble\ninitComponent : Ext.Function.createSequence(Ext.form.field.Base.prototype.initComponent, function() {\n    this.enableBubble('change');\n}),\n\n//  We know that we want Field&#39;s events to bubble directly to the FormPanel.\ngetBubbleTarget : function() {\n    if (!this.formPanel) {\n        this.formPanel = this.findParentByType('form');\n    }\n    return this.formPanel;\n}\n});\n\nvar myForm = new Ext.formPanel({\ntitle: 'User Details',\nitems: [{\n    ...\n}],\nlisteners: {\n    change: function() {\n        // Title goes red if form has been modified.\n        myForm.header.setStyle('color', 'red');\n    }\n}\n});\n</code></pre>\n\n",
      "params": [
        {
          "type": "String/Array",
          "name": "events",
          "doc": "<p>The event name to bubble, or an Array of event names.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 554,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-method-enableBubble",
      "shortDoc": "Enables events fired by this Observable to bubble up an owner hierarchy by calling\nthis.getBubbleTarget() if present...."
    },
    {
      "tagname": "method",
      "name": "fireEvent",
      "member": "Ext.util.Observable",
      "doc": "<p>Fires the specified event with the passed parameters (minus the event name).</p>\n\n\n<p>An event may be set to bubble up an Observable parent hierarchy (See <a href=\"#/api/Ext.Component-method-getBubbleTarget\" rel=\"Ext.Component-method-getBubbleTarget\" class=\"docClass\">Ext.Component.getBubbleTarget</a>)\nby calling <a href=\"#/api/Ext.grid.feature.Summary-method-enableBubble\" rel=\"Ext.grid.feature.Summary-method-enableBubble\" class=\"docClass\">enableBubble</a>.</p>\n\n",
      "params": [
        {
          "type": "String",
          "name": "eventName",
          "doc": "<p>The name of the event to fire.</p>\n",
          "optional": false
        },
        {
          "type": "Object...",
          "name": "args",
          "doc": "<p>Variable number of parameters are passed to handlers.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Boolean",
        "doc": "<p>returns false if any of the handlers return false otherwise it returns true.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 232,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-method-fireEvent",
      "shortDoc": "Fires the specified event with the passed parameters (minus the event name).\n\n\nAn event may be set to bubble up an Ob..."
    },
    {
      "tagname": "method",
      "name": "getAdditionalData",
      "member": "Ext.grid.feature.Feature",
      "doc": "<p>Provide additional data to the prepareData call within the grid view.</p>\n",
      "params": [
        {
          "type": "Object",
          "name": "data",
          "doc": "<p>The data for this particular record.</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "idx",
          "doc": "<p>The row index for this record.</p>\n",
          "optional": false
        },
        {
          "type": "Ext.data.Model",
          "name": "record",
          "doc": "<p>The record instance</p>\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "orig",
          "doc": "<p>The original result from the prepareData call to massage.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/feature/Feature.js",
      "linenr": 122,
      "html_filename": "Feature.html",
      "href": "Feature.html#Ext-grid-feature-Feature-method-getAdditionalData",
      "shortDoc": "<p>Provide additional data to the prepareData call within the grid view.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getColumnValue",
      "member": "Ext.grid.feature.AbstractSummary",
      "doc": "<p>Gets the value for the column from the attached data.</p>\n",
      "params": [
        {
          "type": "Ext.grid.column.Column",
          "name": "column",
          "doc": "<p>The header</p>\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "data",
          "doc": "<p>The current data</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "String",
        "doc": "<p>The value to be rendered</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/feature/AbstractSummary.js",
      "linenr": 72,
      "html_filename": "AbstractSummary.html",
      "href": "AbstractSummary.html#Ext-grid-feature-AbstractSummary-method-getColumnValue",
      "shortDoc": "<p>Gets the value for the column from the attached data.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getFireEventArgs",
      "member": "Ext.grid.feature.Feature",
      "doc": "<p>Abstract method to be overriden when a feature should add additional\narguments to its event signature. By default the event will fire:\n- view - The underlying <a href=\"#/api/Ext.view.Table\" rel=\"Ext.view.Table\" class=\"docClass\">Ext.view.Table</a>\n- featureTarget - The matched element by the defined <a href=\"#/api/eventSelector\" rel=\"eventSelector\" class=\"docClass\">eventSelector</a></p>\n\n<p>The method must also return the eventName as the first index of the array\nto be passed to fireEvent.</p>\n",
      "params": [
        {
          "type": "Object",
          "name": "eventName",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "view",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "featureTarget",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "e",
          "doc": "\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/feature/Feature.js",
      "linenr": 76,
      "html_filename": "Feature.html",
      "href": "Feature.html#Ext-grid-feature-Feature-method-getFireEventArgs",
      "shortDoc": "Abstract method to be overriden when a feature should add additional\narguments to its event signature. By default the..."
    },
    {
      "tagname": "method",
      "name": "getMetaRowTplFragments",
      "member": "Ext.grid.feature.Feature",
      "doc": "<p>Allows a feature to inject member methods into the metaRowTpl. This is\nimportant for embedding functionality which will become part of the proper\nrow tpl.</p>\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/feature/Feature.js",
      "linenr": 109,
      "html_filename": "Feature.html",
      "href": "Feature.html#Ext-grid-feature-Feature-method-getMetaRowTplFragments",
      "shortDoc": "Allows a feature to inject member methods into the metaRowTpl. This is\nimportant for embedding functionality which wi..."
    },
    {
      "tagname": "method",
      "name": "hasListener",
      "member": "Ext.util.Observable",
      "doc": "<p>Checks to see if this object has any listeners for a specified event</p>\n",
      "params": [
        {
          "type": "String",
          "name": "eventName",
          "doc": "<p>The name of the event to check for</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Boolean",
        "doc": "<p>True if the event is being listened for, else false</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 480,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-method-hasListener",
      "shortDoc": "<p>Checks to see if this object has any listeners for a specified event</p>\n"
    },
    {
      "tagname": "method",
      "name": "mutateMetaRowTpl",
      "member": "Ext.grid.feature.Feature",
      "doc": "<p>Allows a feature to mutate the metaRowTpl.\nThe array received as a single argument can be manipulated to add things\non the end/begining of a particular row.</p>\n",
      "params": [
        {
          "type": "Object",
          "name": "metaRowTplArray",
          "doc": "\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/feature/Feature.js",
      "linenr": 100,
      "html_filename": "Feature.html",
      "href": "Feature.html#Ext-grid-feature-Feature-method-mutateMetaRowTpl",
      "shortDoc": "Allows a feature to mutate the metaRowTpl.\nThe array received as a single argument can be manipulated to add things\no..."
    },
    {
      "tagname": "method",
      "name": "observe",
      "member": "Ext.util.Observable",
      "doc": "<p>Sets observability on the passed class constructor.</p>\n\n<p>This makes any event fired on any instance of the passed class also fire a single event through\nthe <strong>class</strong> allowing for central handling of events on many instances at once.</p>\n\n<p>Usage:</p>\n\n<pre><code>Ext.util.Observable.observe(Ext.data.Connection);\nExt.data.Connection.on('beforerequest', function(con, options) {\n    console.log('Ajax request made to ' + options.url);\n});\n</code></pre>\n",
      "params": [
        {
          "type": "Function",
          "name": "c",
          "doc": "<p>The class constructor to make observable.</p>\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "listeners",
          "doc": "<p>An object containing a series of listeners to add. See <a href=\"#/api/Ext.grid.feature.Summary-method-addListener\" rel=\"Ext.grid.feature.Summary-method-addListener\" class=\"docClass\">addListener</a>.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": true,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 69,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-method-observe",
      "shortDoc": "Sets observability on the passed class constructor.\n\nThis makes any event fired on any instance of the passed class a..."
    },
    {
      "tagname": "method",
      "name": "on",
      "member": "Ext.util.Observable",
      "doc": "<p>Appends an event handler to this object (shorthand for <a href=\"#/api/Ext.grid.feature.Summary-method-addListener\" rel=\"Ext.grid.feature.Summary-method-addListener\" class=\"docClass\">addListener</a>.)</p>\n",
      "params": [
        {
          "type": "String",
          "name": "eventName",
          "doc": "<p>The type of event to listen for</p>\n",
          "optional": false
        },
        {
          "type": "Function",
          "name": "handler",
          "doc": "<p>The method the event invokes</p>\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "scope",
          "doc": "<p>(optional) The scope (<code><b>this</b></code> reference) in which the handler function is executed.\n<b>If omitted, defaults to the object which fired the event.</b></p>\n",
          "optional": true
        },
        {
          "type": "Object",
          "name": "options",
          "doc": "<p>(optional) An object containing handler configuration.</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 616,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-method-on",
      "shortDoc": "<p>Appends an event handler to this object (shorthand for <a href=\"#/api/Ext.grid.feature.Summary-method-addListener\" rel=\"Ext.grid.feature.Summary-method-addListener\" class=\"docClass\">addListener</a>.)</p>\n"
    },
    {
      "tagname": "method",
      "name": "relayEvents",
      "member": "Ext.util.Observable",
      "doc": "<p>Relays selected events from the specified Observable as if the events were fired by <code><b>this</b></code>.</p>\n",
      "params": [
        {
          "type": "Object",
          "name": "origin",
          "doc": "<p>The Observable whose events this object is to relay.</p>\n",
          "optional": false
        },
        {
          "type": "Array",
          "name": "events",
          "doc": "<p>Array of event names to relay.</p>\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "prefix",
          "doc": "\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 520,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-method-relayEvents",
      "shortDoc": "<p>Relays selected events from the specified Observable as if the events were fired by <code><b>this</b></code>.</p>\n"
    },
    {
      "tagname": "method",
      "name": "releaseCapture",
      "member": "Ext.util.Observable",
      "doc": "<p>Removes <b>all</b> added captures from the Observable.</p>\n",
      "params": [
        {
          "type": "Observable",
          "name": "o",
          "doc": "<p>The Observable to release</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": true,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 46,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-method-releaseCapture",
      "shortDoc": "<p>Removes <b>all</b> added captures from the Observable.</p>\n"
    },
    {
      "tagname": "method",
      "name": "removeListener",
      "member": "Ext.util.Observable",
      "doc": "<p>Removes an event handler.</p>\n",
      "params": [
        {
          "type": "String",
          "name": "eventName",
          "doc": "<p>The type of event the handler was associated with.</p>\n",
          "optional": false
        },
        {
          "type": "Function",
          "name": "handler",
          "doc": "<p>The handler to remove. <b>This must be a reference to the function passed into the <a href=\"#/api/Ext.grid.feature.Summary-method-addListener\" rel=\"Ext.grid.feature.Summary-method-addListener\" class=\"docClass\">addListener</a> call.</b></p>\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "scope",
          "doc": "<p>(optional) The scope originally specified for the handler.</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 352,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-method-removeListener",
      "shortDoc": "<p>Removes an event handler.</p>\n"
    },
    {
      "tagname": "method",
      "name": "removeManagedListener",
      "member": "Ext.util.Observable",
      "doc": "<p>Removes listeners that were added by the <a href=\"#/api/Ext.grid.feature.Summary--mon\" rel=\"Ext.grid.feature.Summary--mon\" class=\"docClass\">mon</a> method.</p>\n",
      "params": [
        {
          "type": "Observable|Element",
          "name": "item",
          "doc": "<p>The item from which to remove a listener/listeners.</p>\n",
          "optional": false
        },
        {
          "type": "Object|String",
          "name": "ename",
          "doc": "<p>The event name, or an object containing event name properties.</p>\n",
          "optional": false
        },
        {
          "type": "Function",
          "name": "fn",
          "doc": "<p>Optional. If the <code>ename</code> parameter was an event name, this\nis the handler function.</p>\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "scope",
          "doc": "<p>Optional. If the <code>ename</code> parameter was an event name, this\nis the scope (<code>this</code> reference) in which the handler function is executed.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 196,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-method-removeManagedListener",
      "shortDoc": "<p>Removes listeners that were added by the <a href=\"#/api/Ext.grid.feature.Summary--mon\" rel=\"Ext.grid.feature.Summary--mon\" class=\"docClass\">mon</a> method.</p>\n"
    },
    {
      "tagname": "method",
      "name": "resumeEvents",
      "member": "Ext.util.Observable",
      "doc": "<p>Resume firing events. (see <a href=\"#/api/Ext.grid.feature.Summary-method-suspendEvents\" rel=\"Ext.grid.feature.Summary-method-suspendEvents\" class=\"docClass\">suspendEvents</a>)\nIf events were suspended using the <code><b>queueSuspended</b></code> parameter, then all\nevents fired during event suspension will be sent to any listeners now.</p>\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 502,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-method-resumeEvents",
      "shortDoc": "Resume firing events. (see suspendEvents)\nIf events were suspended using the queueSuspended parameter, then all\nevent..."
    },
    {
      "tagname": "method",
      "name": "suspendEvents",
      "member": "Ext.util.Observable",
      "doc": "<p>Suspend the firing of all events. (see <a href=\"#/api/Ext.grid.feature.Summary-method-resumeEvents\" rel=\"Ext.grid.feature.Summary-method-resumeEvents\" class=\"docClass\">resumeEvents</a>)</p>\n",
      "params": [
        {
          "type": "Boolean",
          "name": "queueSuspended",
          "doc": "<p>Pass as true to queue up suspended events to be fired\nafter the <a href=\"#/api/Ext.grid.feature.Summary-method-resumeEvents\" rel=\"Ext.grid.feature.Summary-method-resumeEvents\" class=\"docClass\">resumeEvents</a> call instead of discarding all suspended events;</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 490,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-method-suspendEvents",
      "shortDoc": "<p>Suspend the firing of all events. (see <a href=\"#/api/Ext.grid.feature.Summary-method-resumeEvents\" rel=\"Ext.grid.feature.Summary-method-resumeEvents\" class=\"docClass\">resumeEvents</a>)</p>\n"
    },
    {
      "tagname": "method",
      "name": "toggleSummaryRow",
      "member": "Ext.grid.feature.AbstractSummary",
      "doc": "<p>Toggle whether or not to show the summary row.</p>\n",
      "params": [
        {
          "type": "Boolan",
          "name": "visible",
          "doc": "<p>True to show the summary row</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/feature/AbstractSummary.js",
      "linenr": 26,
      "html_filename": "AbstractSummary.html",
      "href": "AbstractSummary.html#Ext-grid-feature-AbstractSummary-method-toggleSummaryRow",
      "shortDoc": "<p>Toggle whether or not to show the summary row.</p>\n"
    },
    {
      "tagname": "method",
      "name": "un",
      "member": "Ext.util.Observable",
      "doc": "<p>Removes an event handler (shorthand for <a href=\"#/api/Ext.grid.feature.Summary-method-removeListener\" rel=\"Ext.grid.feature.Summary-method-removeListener\" class=\"docClass\">removeListener</a>.)</p>\n",
      "params": [
        {
          "type": "String",
          "name": "eventName",
          "doc": "<p>The type of event the handler was associated with.</p>\n",
          "optional": false
        },
        {
          "type": "Function",
          "name": "handler",
          "doc": "<p>The handler to remove. <b>This must be a reference to the function passed into the <a href=\"#/api/Ext.grid.feature.Summary-method-addListener\" rel=\"Ext.grid.feature.Summary-method-addListener\" class=\"docClass\">addListener</a> call.</b></p>\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "scope",
          "doc": "<p>(optional) The scope originally specified for the handler.</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 608,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-method-un",
      "shortDoc": "<p>Removes an event handler (shorthand for <a href=\"#/api/Ext.grid.feature.Summary-method-removeListener\" rel=\"Ext.grid.feature.Summary-method-removeListener\" class=\"docClass\">removeListener</a>.)</p>\n"
    }
  ],
  "property": [
    {
      "tagname": "property",
      "name": "collectData",
      "member": "Ext.grid.feature.Feature",
      "type": "Boolean",
      "doc": "<p>Most features will not modify the data returned to the view.\nThis is limited to one feature that manipulates the data per grid view.</p>\n",
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/feature/Feature.js",
      "linenr": 66,
      "html_filename": "Feature.html",
      "href": "Feature.html#Ext-grid-feature-Feature-property-collectData",
      "shortDoc": "Most features will not modify the data returned to the view.\nThis is limited to one feature that manipulates the data..."
    },
    {
      "tagname": "property",
      "name": "eventPrefix",
      "member": "Ext.grid.feature.Feature",
      "type": "String",
      "doc": "<p>Prefix to use when firing events on the view.\nFor example a prefix of group would expose \"groupclick\", \"groupcontextmenu\", \"groupdblclick\".</p>\n",
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/feature/Feature.js",
      "linenr": 41,
      "html_filename": "Feature.html",
      "href": "Feature.html#Ext-grid-feature-Feature-property-eventPrefix",
      "shortDoc": "Prefix to use when firing events on the view.\nFor example a prefix of group would expose \"groupclick\", \"groupcontextm..."
    },
    {
      "tagname": "property",
      "name": "eventSelector",
      "member": "Ext.grid.feature.Feature",
      "type": "String",
      "doc": "<p>Selector used to determine when to fire the event with the eventPrefix.</p>\n",
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/feature/Feature.js",
      "linenr": 48,
      "html_filename": "Feature.html",
      "href": "Feature.html#Ext-grid-feature-Feature-property-eventSelector"
    },
    {
      "tagname": "property",
      "name": "grid",
      "member": "Ext.grid.feature.Feature",
      "type": "Ext.grid.Panel",
      "doc": "<p>Reference to the grid panel</p>\n",
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/feature/Feature.js",
      "linenr": 60,
      "html_filename": "Feature.html",
      "href": "Feature.html#Ext-grid-feature-Feature-property-grid"
    },
    {
      "tagname": "property",
      "name": "hasFeatureEvent",
      "member": "Ext.grid.feature.Feature",
      "type": "Boolean",
      "doc": "<p>Most features will expose additional events, some may not and will\nneed to change this to false.</p>\n",
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/feature/Feature.js",
      "linenr": 34,
      "html_filename": "Feature.html",
      "href": "Feature.html#Ext-grid-feature-Feature-property-hasFeatureEvent"
    },
    {
      "tagname": "property",
      "name": "view",
      "member": "Ext.grid.feature.Feature",
      "type": "Ext.view.Table",
      "doc": "<p>Reference to the TableView.</p>\n",
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/feature/Feature.js",
      "linenr": 54,
      "html_filename": "Feature.html",
      "href": "Feature.html#Ext-grid-feature-Feature-property-view"
    }
  ],
  "event": [

  ],
  "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/feature/Summary.js",
  "linenr": 1,
  "html_filename": "Summary.html",
  "href": "Summary.html#Ext-grid-feature-Summary",
  "cssVar": [

  ],
  "cssMixin": [

  ],
  "component": false,
  "superclasses": [
    "Ext.util.Observable",
    "Ext.grid.feature.Feature",
    "Ext.grid.feature.AbstractSummary"
  ],
  "subclasses": [

  ],
  "mixedInto": [

  ],
  "allMixins": [

  ]
});