Ext.data.JsonP.Ext_grid_Panel({
  "tagname": "class",
  "name": "Ext.grid.Panel",
  "doc": "<p>Grids are an excellent way of showing large amounts of tabular data on the client side. Essentially a supercharged\n<code>&lt;table&gt;</code>, GridPanel makes it easy to fetch, sort and filter large amounts of data.</p>\n\n<p>Grids are composed of 2 main pieces - a <a href=\"#/api/Ext.data.Store\" rel=\"Ext.data.Store\" class=\"docClass\">Store</a> full of data and a set of columns to render.</p>\n\n<p><p><img src=\"doc-resources/Ext.grid.Panel/Ext.grid.Panel1.png\" alt=\"Ext.grid.Panel component\"></p></p>\n\n<h2>Basic GridPanel</h2>\n\n<pre><code>Ext.create('Ext.data.Store', {\n    storeId:'simpsonsStore',\n    fields:['name', 'email', 'phone'],\n    data:{'items':[\n        {\"name\":\"Lisa\", \"email\":\"lisa@simpsons.com\", \"phone\":\"555-111-1224\"},\n        {\"name\":\"Bart\", \"email\":\"bart@simpsons.com\", \"phone\":\"555--222-1234\"},\n        {\"name\":\"Homer\", \"email\":\"home@simpsons.com\", \"phone\":\"555-222-1244\"},                        \n        {\"name\":\"Marge\", \"email\":\"marge@simpsons.com\", \"phone\":\"555-222-1254\"}            \n    ]},\n    proxy: {\n        type: 'memory',\n        reader: {\n            type: 'json',\n            root: 'items'\n        }\n    }\n});\n\nExt.create('Ext.grid.Panel', {\n    title: 'Simpsons',\n    store: Ext.data.StoreManager.lookup('simpsonsStore'),\n    columns: [\n        {header: 'Name',  dataIndex: 'name'},\n        {header: 'Email', dataIndex: 'email', flex:1},\n        {header: 'Phone', dataIndex: 'phone'}\n    ],\n    height: 200,\n    width: 400,\n    renderTo: Ext.getBody()\n});\n</code></pre>\n\n<p>The code above produces a simple grid with three columns. We specified a Store which will load JSON data inline.\nIn most apps we would be placing the grid inside another container and wouldn't need to use the\n<a href=\"#/api/Ext.grid.Panel-cfg-height\" rel=\"Ext.grid.Panel-cfg-height\" class=\"docClass\">height</a>, <a href=\"#/api/Ext.grid.Panel-cfg-width\" rel=\"Ext.grid.Panel-cfg-width\" class=\"docClass\">width</a> and <a href=\"#/api/Ext.grid.Panel-cfg-renderTo\" rel=\"Ext.grid.Panel-cfg-renderTo\" class=\"docClass\">renderTo</a> configurations but they are included here to make it easy to get\nup and running.</p>\n\n<p>The grid we created above will contain a header bar with a title ('Simpsons'), a row of column headers directly underneath\nand finally the grid rows under the headers.</p>\n\n<h2>Configuring columns</h2>\n\n<p>By default, each column is sortable and will toggle between ASC and DESC sorting when you click on its header. Each\ncolumn header is also reorderable by default, and each gains a drop-down menu with options to hide and show columns.\nIt's easy to configure each column - here we use the same example as above and just modify the columns config:</p>\n\n<pre><code>columns: [\n    {\n        header: 'Name',\n        dataIndex: 'name',\n        sortable: false,\n        hideable: false,\n        flex: 1\n    },\n    {\n        header: 'Email',\n        dataIndex: 'email',\n        hidden: true\n    },\n    {\n        header: 'Phone',\n        dataIndex: 'phone',\n        width: 100\n    }\n]\n</code></pre>\n\n<p>We turned off sorting and hiding on the 'Name' column so clicking its header now has no effect. We also made the Email\ncolumn hidden by default (it can be shown again by using the menu on any other column). We also set the Phone column to\na fixed with of 100px and flexed the Name column, which means it takes up all remaining width after the other columns\nhave been accounted for. See the <a href=\"#/api/Ext.grid.column.Column\" rel=\"Ext.grid.column.Column\" class=\"docClass\">column docs</a> for more details.</p>\n\n<h2>Renderers</h2>\n\n<p>As well as customizing columns, it's easy to alter the rendering of individual cells using renderers. A renderer is\ntied to a particular column and is passed the value that would be rendered into each cell in that column. For example,\nwe could define a renderer function for the email column to turn each email address into a mailto link:</p>\n\n<pre><code>columns: [\n    {\n        header: 'Email',\n        dataIndex: 'email',\n        renderer: function(value) {\n            return Ext.String.format('&lt;a href=\"mailto:{0}\"&gt;{1}&lt;/a&gt;', value, value);\n        }\n    }\n]\n</code></pre>\n\n<p>See the <a href=\"#/api/Ext.grid.column.Column\" rel=\"Ext.grid.column.Column\" class=\"docClass\">column docs</a> for more information on renderers.</p>\n\n<h2>Selection Models</h2>\n\n<p>Sometimes all you want is to render data onto the screen for viewing, but usually it's necessary to interact with or\nupdate that data. Grids use a concept called a Selection Model, which is simply a mechanism for selecting some part of\nthe data in the grid. The two main types of Selection Model are RowSelectionModel, where entire rows are selected, and\nCellSelectionModel, where individual cells are selected.</p>\n\n<p>Grids use a Row Selection Model by default, but this is easy to customise like so:</p>\n\n<pre><code>Ext.create('Ext.grid.Panel', {\n    selType: 'cellmodel',\n    store: ...\n});\n</code></pre>\n\n<p>Specifying the <code>cellmodel</code> changes a couple of things. Firstly, clicking on a cell now\nselects just that cell (using a <a href=\"#/api/Ext.selection.RowModel\" rel=\"Ext.selection.RowModel\" class=\"docClass\">rowmodel</a> will select the entire row), and secondly the\nkeyboard navigation will walk from cell to cell instead of row to row. Cell-based selection models are usually used in\nconjunction with editing.</p>\n\n<p><p><img src=\"doc-resources/Ext.grid.Panel/Ext.grid.Panel2.png\" alt=\"Ext.grid.Panel cell editing\"></p></p>\n\n<h2>Editing</h2>\n\n<p>Grid has built-in support for in-line editing. There are two chief editing modes - cell editing and row editing. Cell\nediting is easy to add to your existing column setup - here we'll just modify the example above to include an editor\non both the name and the email columns:</p>\n\n<pre><code>Ext.create('Ext.grid.Panel', {\n    title: 'Simpsons',\n    store: Ext.data.StoreManager.lookup('simpsonsStore'),\n    columns: [\n        {header: 'Name',  dataIndex: 'name', field: 'textfield'},\n        {header: 'Email', dataIndex: 'email', flex:1, \n            field:{\n                xtype:'textfield',\n                allowBlank:false\n            }\n        },\n        {header: 'Phone', dataIndex: 'phone'}\n    ],\n    selType: 'cellmodel',\n    plugins: [\n        Ext.create('Ext.grid.plugin.CellEditing', {\n            clicksToEdit: 1\n        })\n    ],\n    height: 200,\n    width: 400,\n    renderTo: Ext.getBody()\n});\n</code></pre>\n\n<p>This requires a little explanation. We're passing in <a href=\"#/api/Ext.grid.Panel--store\" rel=\"Ext.grid.Panel--store\" class=\"docClass\">store</a> and <a href=\"#/api/Ext.grid.Panel-cfg-columns\" rel=\"Ext.grid.Panel-cfg-columns\" class=\"docClass\">columns</a> as normal, but\nthis time we've also specified a <a href=\"#/api/Ext.grid.Panel--field\" rel=\"Ext.grid.Panel--field\" class=\"docClass\">field</a> on two of our columns. For the Name column we just want a default\ntextfield to edit the value, so we specify 'textfield'. For the Email column we customized the editor slightly by\npassing allowBlank: false, which will provide inline validation.</p>\n\n<p>To support cell editing, we also specified that the grid should use the 'cellmodel' <a href=\"#/api/Ext.grid.Panel--selType\" rel=\"Ext.grid.Panel--selType\" class=\"docClass\">selType</a>, and created an\ninstance of the <a href=\"#/api/Ext.grid.plugin.CellEditing\" rel=\"Ext.grid.plugin.CellEditing\" class=\"docClass\">CellEditing plugin</a>, which we configured to activate each editor after a\nsingle click.</p>\n\n<p><p><img src=\"doc-resources/Ext.grid.Panel/Ext.grid.Panel3.png\" alt=\"Ext.grid.Panel row editing\"></p></p>\n\n<h2>Row Editing</h2>\n\n<p>The other type of editing is row-based editing, using the RowEditor component. This enables you to edit an entire row\nat a time, rather than editing cell by cell. Row Editing works in exactly the same way as cell editing, all we need to\ndo is change the plugin type to <a href=\"#/api/Ext.grid.plugin.RowEditing\" rel=\"Ext.grid.plugin.RowEditing\" class=\"docClass\">Ext.grid.plugin.RowEditing</a>, and set the selType to 'rowmodel':</p>\n\n<pre><code>Ext.create('Ext.grid.Panel', {\n    title: 'Simpsons',\n    store: Ext.data.StoreManager.lookup('simpsonsStore'),\n    columns: [\n        {header: 'Name',  dataIndex: 'name', field: 'textfield'},\n        {header: 'Email', dataIndex: 'email', flex:1, \n            field:{\n                xtype:'textfield',\n                allowBlank:false\n            }\n        },\n        {header: 'Phone', dataIndex: 'phone'}\n    ],\n    selType: 'rowmodel',\n    plugins: [\n        Ext.create('Ext.grid.plugin.RowEditing', {\n            clicksToEdit: 1\n        })\n    ],\n    height: 200,\n    width: 400,\n    renderTo: Ext.getBody()\n});\n</code></pre>\n\n<p>Again we passed some configuration to our <a href=\"#/api/Ext.grid.plugin.RowEditing\" rel=\"Ext.grid.plugin.RowEditing\" class=\"docClass\">Ext.grid.plugin.RowEditing</a> plugin, and now when we click each row a row\neditor will appear and enable us to edit each of the columns we have specified an editor for.</p>\n\n<h2>Sorting &amp; Filtering</h2>\n\n<p>Every grid is attached to a <a href=\"#/api/Ext.data.Store\" rel=\"Ext.data.Store\" class=\"docClass\">Store</a>, which provides multi-sort and filtering capabilities. It's\neasy to set up a grid to be sorted from the start:</p>\n\n<pre><code>var myGrid = Ext.create('Ext.grid.Panel', {\n    store: {\n        fields: ['name', 'email', 'phone'],\n        sorters: ['name', 'phone']\n    },\n    columns: [\n        {text: 'Name',  dataIndex: 'name'},\n        {text: 'Email', dataIndex: 'email'}\n    ]\n});\n</code></pre>\n\n<p>Sorting at run time is easily accomplished by simply clicking each column header. If you need to perform sorting on\nmore than one field at run time it's easy to do so by adding new sorters to the store:</p>\n\n<pre><code>myGrid.store.sort([\n    {property: 'name',  direction: 'ASC'},\n    {property: 'email', direction: 'DESC'},\n]);\n</code></pre>\n\n<p><p><img src=\"doc-resources/Ext.grid.Panel/Ext.grid.Panel4.png\" alt=\"Ext.grid.Panel grouping\"></p></p>\n\n<h2>Grouping</h2>\n\n<p>Grid supports the grouping of rows by any field. For example if we had a set of employee records, we might want to\ngroup by the department that each employee works in. Here's how we might set that up:</p>\n\n<pre><code>var store = Ext.create('Ext.data.Store', {\n    storeId:'employeeStore',\n    fields:['name', 'senority', 'department'],\n    groupField: 'department',\n    data:{'employees':[\n        {\"name\":\"Michael Scott\", \"senority\":7, \"department\":\"Manangement\"},\n        {\"name\":\"Dwight Schrute\", \"senority\":2, \"department\":\"Sales\"},\n        {\"name\":\"Jim Halpert\", \"senority\":3, \"department\":\"Sales\"},\n        {\"name\":\"Kevin Malone\", \"senority\":4, \"department\":\"Accounting\"},\n        {\"name\":\"Angela Martin\", \"senority\":5, \"department\":\"Accounting\"}                        \n    ]},\n    proxy: {\n        type: 'memory',\n        reader: {\n            type: 'json',\n            root: 'employees'\n        }\n    }\n});\n\nExt.create('Ext.grid.Panel', {\n    title: 'Employees',\n    store: Ext.data.StoreManager.lookup('employeeStore'),\n    columns: [\n        {header: 'Name',  dataIndex: 'name'},\n        {header: 'Senority', dataIndex: 'senority'}\n    ],        \n    features: [{ftype:'grouping'}],\n    width: 200,\n    height: 275,\n    renderTo: Ext.getBody()\n});\n</code></pre>\n\n<h2>Infinite Scrolling</h2>\n\n<p>Grid supports infinite scrolling as an alternative to using a paging toolbar. Your users can scroll through thousands\nof records without the performance penalties of renderering all the records on screen at once. The grid should be bound\nto a store with a pageSize specified.</p>\n\n<pre><code>var grid = Ext.create('Ext.grid.Panel', {\n    // Use a PagingGridScroller (this is interchangeable with a PagingToolbar)\n    verticalScrollerType: 'paginggridscroller',\n    // do not reset the scrollbar when the view refreshs\n    invalidateScrollerOnRefresh: false,\n    // infinite scrolling does not support selection\n    disableSelection: true,\n    // ...\n});\n</code></pre>\n\n<h2>Paging</h2>\n\n<p>Grid supports paging through large sets of data via a PagingToolbar or PagingGridScroller (see the Infinite Scrolling section above).\nTo leverage paging via a toolbar or scroller, you need to set a pageSize configuration on the Store.</p>\n\n<pre><code>var itemsPerPage = 2;   // set the number of items you want per page\n\nvar store = Ext.create('Ext.data.Store', {\n    id:'simpsonsStore',\n    autoLoad: false,\n    fields:['name', 'email', 'phone'],\n    pageSize: itemsPerPage, // items per page\n    proxy: {\n        type: 'ajax',\n        url: 'pagingstore.js',  // url that will load data with respect to start and limit params\n        reader: {\n            type: 'json',\n            root: 'items',\n            totalProperty: 'total'\n        }\n    }\n});\n\n// specify segment of data you want to load using params\nstore.load({\n    params:{\n        start:0,    \n        limit: itemsPerPage\n    }\n});\n\nExt.create('Ext.grid.Panel', {\n    title: 'Simpsons',\n    store: store,\n    columns: [\n        {header: 'Name',  dataIndex: 'name'},\n        {header: 'Email', dataIndex: 'email', flex:1},\n        {header: 'Phone', dataIndex: 'phone'}\n    ],\n    width: 400,\n    height: 125,\n    dockedItems: [{\n        xtype: 'pagingtoolbar',\n        store: store,   // same store GridPanel is using\n        dock: 'bottom',\n        displayInfo: true\n    }],\n    renderTo: Ext.getBody()\n}); \n</code></pre>\n\n<p><p><img src=\"doc-resources/Ext.grid.Panel/Ext.grid.Panel5.png\" alt=\"Ext.grid.Panel grouping\"></p></p>\n",
  "extends": "Ext.panel.Table",
  "mixins": [

  ],
  "alternateClassNames": [
    "Ext.list.ListView",
    "Ext.ListView",
    "Ext.grid.GridPanel"
  ],
  "xtype": null,
  "author": "Aaron Conran",
  "docauthor": "Ed Spencer",
  "singleton": false,
  "private": false,
  "cfg": [
    {
      "tagname": "cfg",
      "name": "activeItem",
      "member": "Ext.container.AbstractContainer",
      "type": "String/Number",
      "doc": "<p>A string component id or the numeric index of the component that should be initially activated within the\ncontainer's layout on render.  For example, activeItem: 'item-1' or activeItem: 0 (index 0 = the first\nitem in the container's collection).  activeItem only applies to layout styles that can display\nitems one at a time (like <a href=\"#/api/Ext.layout.container.Card\" rel=\"Ext.layout.container.Card\" class=\"docClass\">Ext.layout.container.Card</a> and <a href=\"#/api/Ext.layout.container.Fit\" rel=\"Ext.layout.container.Fit\" class=\"docClass\">Ext.layout.container.Fit</a>).</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 87,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-cfg-activeItem",
      "shortDoc": "A string component id or the numeric index of the component that should be initially activated within the\ncontainer's..."
    },
    {
      "tagname": "cfg",
      "name": "animCollapse",
      "member": "Ext.panel.Panel",
      "type": "Boolean",
      "doc": "<p><code>true</code> to animate the transition when the panel is collapsed, <code>false</code> to skip the\nanimation (defaults to <code>true</code> if the <a href=\"#/api/Ext.fx.Anim\" rel=\"Ext.fx.Anim\" class=\"docClass\">Ext.fx.Anim</a> class is available, otherwise <code>false</code>).\nMay also be specified as the animation duration in milliseconds.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 111,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-animCollapse",
      "shortDoc": "true to animate the transition when the panel is collapsed, false to skip the\nanimation (defaults to true if the Ext...."
    },
    {
      "tagname": "cfg",
      "name": "autoDestroy",
      "member": "Ext.container.AbstractContainer",
      "type": "Boolean",
      "doc": "<p>If true the container will automatically destroy any contained component that is removed from it, else\ndestruction must be handled manually.\nDefaults to true.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 161,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-cfg-autoDestroy",
      "shortDoc": "If true the container will automatically destroy any contained component that is removed from it, else\ndestruction mu..."
    },
    {
      "tagname": "cfg",
      "name": "autoEl",
      "member": "Ext.AbstractComponent",
      "type": "Mixed",
      "doc": "<p>A tag name or <a href=\"#/api/Ext.core.DomHelper\" rel=\"Ext.core.DomHelper\" class=\"docClass\">DomHelper</a> spec used to create the <a href=\"#/api/Ext.grid.Panel-method-getEl\" rel=\"Ext.grid.Panel-method-getEl\" class=\"docClass\">Element</a> which will\nencapsulate this Component.</p>\n\n\n<p>You do not normally need to specify this. For the base classes <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a> and <a href=\"#/api/Ext.container.Container\" rel=\"Ext.container.Container\" class=\"docClass\">Ext.container.Container</a>,\nthis defaults to <b><tt>'div'</tt></b>. The more complex Sencha classes use a more complex\nDOM structure specified by their own <a href=\"#/api/Ext.grid.Panel-cfg-renderTpl\" rel=\"Ext.grid.Panel-cfg-renderTpl\" class=\"docClass\">renderTpl</a>s.</p>\n\n\n<p>This is intended to allow the developer to create application-specific utility Components encapsulated by\ndifferent DOM elements. Example usage:</p>\n\n\n<pre><code>{\n    xtype: 'component',\n    autoEl: {\n        tag: 'img',\n        src: 'http://www.example.com/example.jpg'\n    }\n}, {\n    xtype: 'component',\n    autoEl: {\n        tag: 'blockquote',\n        html: 'autoEl is cool!'\n    }\n}, {\n    xtype: 'container',\n    autoEl: 'ul',\n    cls: 'ux-unordered-list',\n    items: {\n        xtype: 'component',\n        autoEl: 'li',\n        html: 'First list item'\n    }\n}\n</code></pre>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 109,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-autoEl",
      "shortDoc": "A tag name or DomHelper spec used to create the Element which will\nencapsulate this Component.\n\n\nYou do not normally ..."
    },
    {
      "tagname": "cfg",
      "name": "autoRender",
      "member": "Ext.AbstractComponent",
      "type": "Mixed",
      "doc": "<p>This config is intended mainly for <a href=\"#/api/Ext.grid.Panel-cfg-floating\" rel=\"Ext.grid.Panel-cfg-floating\" class=\"docClass\">floating</a> Components which may or may not be shown. Instead\nof using <a href=\"#/api/Ext.grid.Panel-cfg-renderTo\" rel=\"Ext.grid.Panel-cfg-renderTo\" class=\"docClass\">renderTo</a> in the configuration, and rendering upon construction, this allows a Component\nto render itself upon first <i><a href=\"#/api/Ext.grid.Panel-event-show\" rel=\"Ext.grid.Panel-event-show\" class=\"docClass\">show</a></i>.</p>\n\n\n<p>Specify as <code>true</code> to have this Component render to the document body upon first show.</p>\n\n\n<p>Specify as an element, or the ID of an element to have this Component render to a specific element upon first show.</p>\n\n\n<p><b>This defaults to <code>true</code> for the <a href=\"#/api/Ext.window.Window\" rel=\"Ext.window.Window\" class=\"docClass\">Window</a> class.</b></p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 478,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-autoRender",
      "shortDoc": "This config is intended mainly for floating Components which may or may not be shown. Instead\nof using renderTo in th..."
    },
    {
      "tagname": "cfg",
      "name": "autoScroll",
      "member": "Ext.Component",
      "type": "Boolean",
      "doc": "<p><code>true</code> to use overflow:'auto' on the components layout element and show scroll bars automatically when\nnecessary, <code>false</code> to clip any overflowing content (defaults to <code>false</code>).</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 169,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-cfg-autoScroll",
      "shortDoc": "true to use overflow:'auto' on the components layout element and show scroll bars automatically when\nnecessary, false..."
    },
    {
      "tagname": "cfg",
      "name": "autoShow",
      "member": "Ext.AbstractComponent",
      "type": "Boolean",
      "doc": "<p>True to automatically show the component upon creation.\nThis config option may only be used for <a href=\"#/api/Ext.grid.Panel-cfg-floating\" rel=\"Ext.grid.Panel-cfg-floating\" class=\"docClass\">floating</a> components or components\nthat use <a href=\"#/api/Ext.grid.Panel-cfg-autoRender\" rel=\"Ext.grid.Panel-cfg-autoRender\" class=\"docClass\">autoRender</a>. Defaults to <tt>false</tt>.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 471,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-autoShow",
      "shortDoc": "True to automatically show the component upon creation.\nThis config option may only be used for floating components o..."
    },
    {
      "tagname": "cfg",
      "name": "baseCls",
      "member": "Ext.panel.AbstractPanel",
      "type": "String",
      "doc": "<p>The base CSS class to apply to this panel's element (defaults to <code>'x-panel'</code>).</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/panel/AbstractPanel.js",
      "linenr": 19,
      "html_filename": "AbstractPanel.html",
      "href": "AbstractPanel.html#Ext-panel-AbstractPanel-cfg-baseCls"
    },
    {
      "tagname": "cfg",
      "name": "bbar",
      "member": "Ext.panel.Panel",
      "type": "Object/Array",
      "doc": "<p>Convenience method. Short for 'Bottom Bar'.</p>\n\n<pre><code>bbar: [\n  { xtype: 'button', text: 'Button 1' }\n]\n</code></pre>\n\n<p>is equivalent to</p>\n\n<pre><code>dockedItems: [{\n    xtype: 'toolbar',\n    dock: 'bottom',\n    items: [\n        { xtype: 'button', text: 'Button 1' }\n    ]\n}]\n</code></pre>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 483,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-bbar",
      "shortDoc": "Convenience method. Short for 'Bottom Bar'.\n\nbbar: [\n  { xtype: 'button', text: 'Button 1' }\n]\n\n\nis equivalent to\n\ndo..."
    },
    {
      "tagname": "cfg",
      "name": "bodyBorder",
      "member": "Ext.panel.AbstractPanel",
      "type": "Boolean",
      "doc": "<p>A shortcut to add or remove the border on the body of a panel. This only applies to a panel which has the <a href=\"#/api/Ext.grid.Panel-cfg-frame\" rel=\"Ext.grid.Panel-cfg-frame\" class=\"docClass\">frame</a> configuration set to <code>true</code>.\nDefaults to <code>undefined</code>.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/panel/AbstractPanel.js",
      "linenr": 32,
      "html_filename": "AbstractPanel.html",
      "href": "AbstractPanel.html#Ext-panel-AbstractPanel-cfg-bodyBorder",
      "shortDoc": "A shortcut to add or remove the border on the body of a panel. This only applies to a panel which has the frame confi..."
    },
    {
      "tagname": "cfg",
      "name": "bodyCls",
      "member": "Ext.panel.AbstractPanel",
      "type": "String/Array",
      "doc": "<p>A CSS class, space-delimited string of classes, or array of classes to be applied to the panel's body element.\nThe following examples are all valid:</p>\n\n<pre><code>bodyCls: 'foo'\nbodyCls: 'foo bar'\nbodyCls: ['foo', 'bar']\n</code></pre>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/panel/AbstractPanel.js",
      "linenr": 52,
      "html_filename": "AbstractPanel.html",
      "href": "AbstractPanel.html#Ext-panel-AbstractPanel-cfg-bodyCls",
      "shortDoc": "A CSS class, space-delimited string of classes, or array of classes to be applied to the panel's body element.\nThe fo..."
    },
    {
      "tagname": "cfg",
      "name": "bodyPadding",
      "member": "Ext.panel.AbstractPanel",
      "type": "Number/String",
      "doc": "<p>A shortcut for setting a padding style on the body element. The value can either be\na number to be applied to all sides, or a normal css string describing padding.\nDefaults to <code>undefined</code>.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/panel/AbstractPanel.js",
      "linenr": 25,
      "html_filename": "AbstractPanel.html",
      "href": "AbstractPanel.html#Ext-panel-AbstractPanel-cfg-bodyPadding",
      "shortDoc": "A shortcut for setting a padding style on the body element. The value can either be\na number to be applied to all sid..."
    },
    {
      "tagname": "cfg",
      "name": "bodyStyle",
      "member": "Ext.panel.AbstractPanel",
      "type": "String/Object/Function",
      "doc": "<p>Custom CSS styles to be applied to the panel's body element, which can be supplied as a valid CSS style string,\nan object containing style property name/value pairs or a function that returns such a string or object.\nFor example, these two formats are interpreted to be equivalent:</p>\n\n<pre><code>bodyStyle: 'background:#ffc; padding:10px;'\n\nbodyStyle: {\n    background: '#ffc',\n    padding: '10px'\n}\n</code></pre>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/panel/AbstractPanel.js",
      "linenr": 38,
      "html_filename": "AbstractPanel.html",
      "href": "AbstractPanel.html#Ext-panel-AbstractPanel-cfg-bodyStyle",
      "shortDoc": "Custom CSS styles to be applied to the panel's body element, which can be supplied as a valid CSS style string,\nan ob..."
    },
    {
      "tagname": "cfg",
      "name": "border",
      "member": "Ext.AbstractComponent",
      "type": "Number/String",
      "doc": "<p>Specifies the border for this component. The border can be a single numeric value to apply to all sides or\nit can be a CSS style specification for each style, for example: '10 5 3 10'.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 339,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-border",
      "shortDoc": "Specifies the border for this component. The border can be a single numeric value to apply to all sides or\nit can be ..."
    },
    {
      "tagname": "cfg",
      "name": "bubbleEvents",
      "member": "Ext.container.AbstractContainer",
      "type": "Array",
      "doc": "<p>An array of events that, when fired, should be bubbled to any parent container.\nSee <a href=\"#/api/Ext.util.Observable-method-enableBubble\" rel=\"Ext.util.Observable-method-enableBubble\" class=\"docClass\">Ext.util.Observable.enableBubble</a>.\nDefaults to <code>['add', 'remove']</code>.\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 179,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-cfg-bubbleEvents",
      "shortDoc": "An array of events that, when fired, should be bubbled to any parent container.\nSee Ext.util.Observable.enableBubble...."
    },
    {
      "tagname": "cfg",
      "name": "buttons",
      "member": "Ext.panel.Panel",
      "type": "Object/Array",
      "doc": "<p>Convenience method used for adding buttons docked to the bottom right of the panel. This is a\nsynonym for the <a href=\"#/api/Ext.grid.Panel-cfg-fbar\" rel=\"Ext.grid.Panel-cfg-fbar\" class=\"docClass\">fbar</a> config.</p>\n\n<pre><code>buttons: [\n  { text: 'Button 1' }\n]\n</code></pre>\n\n<p>is equivalent to</p>\n\n<pre><code>dockedItems: [{\n    xtype: 'toolbar',\n    dock: 'bottom',\n    defaults: {minWidth: <a href=\"#/api/Ext.grid.Panel-cfg-minButtonWidth\" rel=\"Ext.grid.Panel-cfg-minButtonWidth\" class=\"docClass\">minButtonWidth</a>},\n    items: [\n        { xtype: 'component', flex: 1 },\n        { xtype: 'button', text: 'Button 1' }\n    ]\n}]\n</code></pre>\n\n<p>The <a href=\"#/api/Ext.grid.Panel-cfg-minButtonWidth\" rel=\"Ext.grid.Panel-cfg-minButtonWidth\" class=\"docClass\">minButtonWidth</a> is used as the default <a href=\"#/api/Ext.button.Button-cfg-minWidth\" rel=\"Ext.button.Button-cfg-minWidth\" class=\"docClass\">minWidth</a> for\neach of the buttons in the buttons toolbar.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 509,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-buttons",
      "shortDoc": "Convenience method used for adding buttons docked to the bottom right of the panel. This is a\nsynonym for the fbar co..."
    },
    {
      "tagname": "cfg",
      "name": "closable",
      "member": "Ext.panel.Panel",
      "type": "Boolean",
      "doc": "<p>True to display the 'close' tool button and allow the user to close the window, false to\nhide the button and disallow closing the window (defaults to <code>false</code>).</p>\n\n\n<p>By default, when close is requested by clicking the close button in the header, the <a href=\"#/api/Ext.grid.Panel-method-close\" rel=\"Ext.grid.Panel-method-close\" class=\"docClass\">close</a>\nmethod will be called. This will <i><a href=\"#/api/Ext.Component-event-destroy\" rel=\"Ext.Component-event-destroy\" class=\"docClass\">destroy</a></i> the Panel and its content\nmeaning that it may not be reused.</p>\n\n\n<p>To make closing a Panel <i>hide</i> the Panel so that it may be reused, set\n<a href=\"#/api/Ext.grid.Panel-cfg-closeAction\" rel=\"Ext.grid.Panel-cfg-closeAction\" class=\"docClass\">closeAction</a> to 'hide'.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 211,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-closable",
      "shortDoc": "True to display the 'close' tool button and allow the user to close the window, false to\nhide the button and disallow..."
    },
    {
      "tagname": "cfg",
      "name": "closeAction",
      "member": "Ext.panel.Panel",
      "type": "String",
      "doc": "<p>The action to take when the close header tool is clicked:\n<div class=\"mdetail-params\"><ul>\n<li><b><code>'<a href=\"#/api/Ext.grid.Panel-event-destroy\" rel=\"Ext.grid.Panel-event-destroy\" class=\"docClass\">destroy</a>'</code></b> : <b>Default</b><div class=\"sub-desc\">\n<a href=\"#/api/Ext.grid.Panel-event-destroy\" rel=\"Ext.grid.Panel-event-destroy\" class=\"docClass\">remove</a> the window from the DOM and <a href=\"#/api/Ext.Component-event-destroy\" rel=\"Ext.Component-event-destroy\" class=\"docClass\">destroy</a>\nit and all descendant Components. The window will <b>not</b> be available to be\nredisplayed via the <a href=\"#/api/Ext.grid.Panel-event-show\" rel=\"Ext.grid.Panel-event-show\" class=\"docClass\">show</a> method.\n</div></li>\n<li><b><code>'<a href=\"#/api/Ext.grid.Panel-event-hide\" rel=\"Ext.grid.Panel-event-hide\" class=\"docClass\">hide</a>'</code></b> : <div class=\"sub-desc\">\n<a href=\"#/api/Ext.grid.Panel-event-hide\" rel=\"Ext.grid.Panel-event-hide\" class=\"docClass\">hide</a> the window by setting visibility to hidden and applying negative offsets.\nThe window will be available to be redisplayed via the <a href=\"#/api/Ext.grid.Panel-event-show\" rel=\"Ext.grid.Panel-event-show\" class=\"docClass\">show</a> method.\n</div></li>\n</ul></div>\n<p><b>Note:</b> This behavior has changed! setting *does* affect the <a href=\"#/api/Ext.grid.Panel-method-close\" rel=\"Ext.grid.Panel-method-close\" class=\"docClass\">close</a> method\nwhich will invoke the approriate closeAction.\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 223,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-closeAction",
      "shortDoc": "The action to take when the close header tool is clicked:\n\n'destroy' : Default\nremove the window from the DOM and des..."
    },
    {
      "tagname": "cfg",
      "name": "cls",
      "member": "Ext.AbstractComponent",
      "type": "String",
      "doc": "<p>An optional extra CSS class that will be added to this component's Element (defaults to '').  This can be\nuseful for adding customized styles to the component or any of its children using standard CSS rules.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 268,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-cls",
      "shortDoc": "An optional extra CSS class that will be added to this component's Element (defaults to '').  This can be\nuseful for ..."
    },
    {
      "tagname": "cfg",
      "name": "collapseDirection",
      "member": "Ext.panel.Panel",
      "type": "Boolean",
      "doc": "<p>The direction to collapse the Panel when the toggle button is clicked.</p>\n\n\n<p>Defaults to the <a href=\"#/api/Ext.grid.Panel-cfg-headerPosition\" rel=\"Ext.grid.Panel-cfg-headerPosition\" class=\"docClass\">headerPosition</a></p>\n\n\n<p><b>Important: This config is <u>ignored</u> for <a href=\"#/api/Ext.grid.Panel-cfg-collapsible\" rel=\"Ext.grid.Panel-cfg-collapsible\" class=\"docClass\">collapsible</a> Panels which are direct child items of a <a href=\"#/api/Ext.layout.container.Border\" rel=\"Ext.layout.container.Border\" class=\"docClass\">border layout</a>.</b></p>\n\n\n<p>Specify as <code>'top'</code>, <code>'bottom'</code>, <code>'left'</code> or <code>'right'</code>.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 203,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-collapseDirection",
      "shortDoc": "The direction to collapse the Panel when the toggle button is clicked.\n\n\nDefaults to the headerPosition\n\n\nImportant: ..."
    },
    {
      "tagname": "cfg",
      "name": "collapseFirst",
      "member": "Ext.panel.Panel",
      "type": "Boolean",
      "doc": "<p><code>true</code> to make sure the collapse/expand toggle button always renders first (to the left of)\nany other tools in the panel&#39;s title bar, <code>false</code> to render it last (defaults to <code>true</code>).</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 136,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-collapseFirst",
      "shortDoc": "true to make sure the collapse/expand toggle button always renders first (to the left of)\nany other tools in the pane..."
    },
    {
      "tagname": "cfg",
      "name": "collapseMode",
      "member": "Ext.panel.Panel",
      "type": "String",
      "doc": "<p><b>Important: this config is only effective for <a href=\"#/api/Ext.grid.Panel-cfg-collapsible\" rel=\"Ext.grid.Panel-cfg-collapsible\" class=\"docClass\">collapsible</a> Panels which are direct child items of a <a href=\"#/api/Ext.layout.container.Border\" rel=\"Ext.layout.container.Border\" class=\"docClass\">border layout</a>.</b></p>\n\n\n<p>When <i>not</i> a direct child item of a <a href=\"#/api/Ext.layout.container.Border\" rel=\"Ext.layout.container.Border\" class=\"docClass\">border layout</a>, then the Panel&#39;s header remains visible, and the body is collapsed to zero dimensions.\nIf the Panel has no header, then a new header (orientated correctly depending on the <a href=\"#/api/Ext.grid.Panel-cfg-collapseDirection\" rel=\"Ext.grid.Panel-cfg-collapseDirection\" class=\"docClass\">collapseDirection</a>) will be inserted to show a the title and a re-expand tool.</p>\n\n\n<p>When a child item of a <a href=\"#/api/Ext.layout.container.Border\" rel=\"Ext.layout.container.Border\" class=\"docClass\">border layout</a>, this config has two options:\n<div class=\"mdetail-params\"><ul>\n<li><b><code>undefined/omitted</code></b><div class=\"sub-desc\">When collapsed, a placeholder <a href=\"#/api/Ext.panel.Header\" rel=\"Ext.panel.Header\" class=\"docClass\">Header</a> is injected into the layout to represent the Panel\nand to provide a UI with a Tool to allow the user to re-expand the Panel.</div></li>\n<li><b><code>header</code></b> : <div class=\"sub-desc\">The Panel collapses to leave its header visible as when not inside a <a href=\"#/api/Ext.layout.container.Border\" rel=\"Ext.layout.container.Border\" class=\"docClass\">border layout</a>.</div></li>\n</ul></div></p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 158,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-collapseMode",
      "shortDoc": "Important: this config is only effective for collapsible Panels which are direct child items of a border layout.\n\n\nWh..."
    },
    {
      "tagname": "cfg",
      "name": "collapsed",
      "member": "Ext.panel.Panel",
      "type": "Boolean",
      "doc": "<p><code>true</code> to render the panel collapsed, <code>false</code> to render it expanded (defaults to\n<code>false</code>).</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 129,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-collapsed"
    },
    {
      "tagname": "cfg",
      "name": "collapsedCls",
      "member": "Ext.panel.Panel",
      "type": "String",
      "doc": "<p>A CSS class to add to the panel&#39;s element after it has been collapsed (defaults to\n<code>'collapsed'</code>).</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 104,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-collapsedCls"
    },
    {
      "tagname": "cfg",
      "name": "collapsible",
      "member": "Ext.panel.Panel",
      "type": "Boolean",
      "doc": "<p>True to make the panel collapsible and have an expand/collapse toggle Tool added into\nthe header tool button area. False to keep the panel sized either statically, or by an owning layout manager, with no toggle Tool (defaults to false).</p>\n\n\n<p>See <a href=\"#/api/Ext.grid.Panel-cfg-collapseMode\" rel=\"Ext.grid.Panel-cfg-collapseMode\" class=\"docClass\">collapseMode</a> and <a href=\"#/api/Ext.grid.Panel-cfg-collapseDirection\" rel=\"Ext.grid.Panel-cfg-collapseDirection\" class=\"docClass\">collapseDirection</a></p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 195,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-collapsible",
      "shortDoc": "True to make the panel collapsible and have an expand/collapse toggle Tool added into\nthe header tool button area. Fa..."
    },
    {
      "tagname": "cfg",
      "name": "columnLines",
      "member": "Ext.grid.Panel",
      "type": "Boolean",
      "doc": "<p>Adds column line styling</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/Panel.js",
      "linenr": 346,
      "html_filename": "Panel2.html",
      "href": "Panel2.html#Ext-grid-Panel-cfg-columnLines"
    },
    {
      "tagname": "cfg",
      "name": "columns",
      "member": "Ext.panel.Table",
      "type": "Array",
      "doc": "<p>An array of <a href=\"#/api/Ext.grid.column.Column\" rel=\"Ext.grid.column.Column\" class=\"docClass\">column</a> definition objects which define all columns that appear in this grid. Each\ncolumn definition provides the header text for the column, and a definition of where the data for that column comes from.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 58,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-cfg-columns",
      "shortDoc": "An array of column definition objects which define all columns that appear in this grid. Each\ncolumn definition provi..."
    },
    {
      "tagname": "cfg",
      "name": "componentCls",
      "member": "Ext.AbstractComponent",
      "type": "String",
      "doc": "<p>CSS Class to be added to a components root level element to give distinction to it\nvia styling.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 262,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-componentCls"
    },
    {
      "tagname": "cfg",
      "name": "componentLayout",
      "member": "Ext.AbstractComponent",
      "type": "String/Object",
      "doc": "<p>The sizing and positioning of a Component's internal Elements is the responsibility of\nthe Component's layout manager which sizes a Component's internal structure in response to the Component being sized.</p>\n\n\n<p>Generally, developers will not use this configuration as all provided Components which need their internal\nelements sizing (Such as <a href=\"#/api/Ext.form.field.Base\" rel=\"Ext.form.field.Base\" class=\"docClass\">input fields</a>) come with their own componentLayout managers.</p>\n\n\n<p>The <a href=\"#/api/Ext.layout.container.Auto\" rel=\"Ext.layout.container.Auto\" class=\"docClass\">default layout manager</a> will be used on instances of the base <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a> class\nwhich simply sizes the Component's encapsulating element to the height and width specified in the <a href=\"#/api/Ext.grid.Panel-method-setSize\" rel=\"Ext.grid.Panel-method-setSize\" class=\"docClass\">setSize</a> method.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 221,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-componentLayout",
      "shortDoc": "The sizing and positioning of a Component's internal Elements is the responsibility of\nthe Component's layout manager..."
    },
    {
      "tagname": "cfg",
      "name": "contentEl",
      "member": "Ext.AbstractComponent",
      "type": "String",
      "doc": "<p>Optional. Specify an existing HTML element, or the <code>id</code> of an existing HTML element to use as the content\nfor this component.</p>\n\n\n<ul>\n<li><b>Description</b> :\n<div class=\"sub-desc\">This config option is used to take an existing HTML element and place it in the layout element\nof a new component (it simply moves the specified DOM element <i>after the Component is rendered</i> to use as the content.</div></li>\n<li><b>Notes</b> :\n<div class=\"sub-desc\">The specified HTML element is appended to the layout element of the component <i>after any configured\n<a href=\"#/api/Ext.grid.Panel-cfg-html\" rel=\"Ext.grid.Panel-cfg-html\" class=\"docClass\">HTML</a> has been inserted</i>, and so the document will not contain this element at the time the <a href=\"#/api/Ext.grid.Panel-event-render\" rel=\"Ext.grid.Panel-event-render\" class=\"docClass\">render</a> event is fired.</div>\n<div class=\"sub-desc\">The specified HTML element used will not participate in any <code><b><a href=\"#/api/Ext.container.Container-cfg-layout\" rel=\"Ext.container.Container-cfg-layout\" class=\"docClass\">layout</a></b></code>\nscheme that the Component may use. It is just HTML. Layouts operate on child <code><b><a href=\"#/api/Ext.container.Container-property-items\" rel=\"Ext.container.Container-property-items\" class=\"docClass\">items</a></b></code>.</div>\n<div class=\"sub-desc\">Add either the <code>x-hidden</code> or the <code>x-hide-display</code> CSS class to\nprevent a brief flicker of the content before it is rendered to the panel.</div></li>\n</ul>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 401,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-contentEl",
      "shortDoc": "Optional. Specify an existing HTML element, or the id of an existing HTML element to use as the content\nfor this comp..."
    },
    {
      "tagname": "cfg",
      "name": "data",
      "member": "Ext.AbstractComponent",
      "type": "Mixed",
      "doc": "<p>The initial set of data to apply to the <code><a href=\"#/api/Ext.grid.Panel-cfg-tpl\" rel=\"Ext.grid.Panel-cfg-tpl\" class=\"docClass\">tpl</a></code> to\nupdate the content area of the Component.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 239,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-data"
    },
    {
      "tagname": "cfg",
      "name": "defaultType",
      "member": "Ext.container.AbstractContainer",
      "type": "String",
      "doc": "<p>The default <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">xtype</a> of child Components to create in this Container when\na child item is specified as a raw configuration object, rather than as an instantiated Component.</p>\n\n\n<p>Defaults to <code>'panel'</code>.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 168,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-cfg-defaultType",
      "shortDoc": "The default xtype of child Components to create in this Container when\na child item is specified as a raw configurati..."
    },
    {
      "tagname": "cfg",
      "name": "defaults",
      "member": "Ext.container.AbstractContainer",
      "type": "Object|Function",
      "doc": "<p>This option is a means of applying default settings to all added items whether added through the <a href=\"#/api/Ext.grid.Panel-property-items\" rel=\"Ext.grid.Panel-property-items\" class=\"docClass\">items</a>\nconfig or via the <a href=\"#/api/Ext.grid.Panel-event-add\" rel=\"Ext.grid.Panel-event-add\" class=\"docClass\">add</a> or <a href=\"#/api/Ext.grid.Panel-method-insert\" rel=\"Ext.grid.Panel-method-insert\" class=\"docClass\">insert</a> methods.</p>\n\n\n<p>If an added item is a config object, and <b>not</b> an instantiated Component, then the default properties are\nunconditionally applied. If the added item <b>is</b> an instantiated Component, then the default properties are\napplied conditionally so as not to override existing properties in the item.</p>\n\n\n<p>If the defaults option is specified as a function, then the function will be called using this Container as the\nscope (<code>this</code> reference) and passing the added item as the first parameter. Any resulting object\nfrom that call is then applied to the item as default properties.</p>\n\n\n<p>For example, to automatically apply padding to the body of each of a set of\ncontained <a href=\"#/api/Ext.panel.Panel\" rel=\"Ext.panel.Panel\" class=\"docClass\">Ext.panel.Panel</a> items, you could pass: <code>defaults: {bodyStyle:'padding:15px'}</code>.</p>\n\n\n<p>Usage:</p>\n\n\n<pre><code>defaults: {               // defaults are applied to items, not the container\n    autoScroll:true\n},\nitems: [\n    {\n        xtype: 'panel',   // defaults <b>do not</b> have precedence over\n        id: 'panel1',     // options in config objects, so the defaults\n        autoScroll: false // will not be applied here, panel1 will be autoScroll:false\n    },\n    new Ext.panel.Panel({       // defaults <b>do</b> have precedence over options\n        id: 'panel2',     // options in components, so the defaults\n        autoScroll: false // will be applied here, panel2 will be autoScroll:true.\n    })\n]</code></pre>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 126,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-cfg-defaults",
      "shortDoc": "This option is a means of applying default settings to all added items whether added through the items\nconfig or via ..."
    },
    {
      "tagname": "cfg",
      "name": "disabled",
      "member": "Ext.AbstractComponent",
      "type": "Boolean",
      "doc": "<p>Defaults to false.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 363,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-disabled"
    },
    {
      "tagname": "cfg",
      "name": "disabledCls",
      "member": "Ext.AbstractComponent",
      "type": "String",
      "doc": "<p>CSS class to add when the Component is disabled. Defaults to 'x-item-disabled'.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 281,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-disabledCls"
    },
    {
      "tagname": "cfg",
      "name": "dockedItems",
      "member": "Ext.panel.Panel",
      "type": "Object/Array",
      "doc": "<p>A component or series of components to be added as docked items to this panel.\nThe docked items can be docked to either the top, right, left or bottom of a panel.\nThis is typically used for things like toolbars or tab bars:</p>\n\n<pre><code>var panel = new Ext.panel.Panel({\n    dockedItems: [{\n        xtype: 'toolbar',\n        dock: 'top',\n        items: [{\n            text: 'Docked to the top'\n        }]\n    }]\n});</pre>\n\n\n<p></code></p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 242,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-dockedItems",
      "shortDoc": "A component or series of components to be added as docked items to this panel.\nThe docked items can be docked to eith..."
    },
    {
      "tagname": "cfg",
      "name": "draggable",
      "member": "Ext.Component",
      "type": "Mixed",
      "doc": "<p>Specify as true to make a <a href=\"#/api/Ext.grid.Panel-cfg-floating\" rel=\"Ext.grid.Panel-cfg-floating\" class=\"docClass\">floating</a> Component draggable using the Component's encapsulating element as the drag handle.</p>\n\n\n<p>This may also be specified as a config object for the <a href=\"#/api/Ext.util.ComponentDragger\" rel=\"Ext.util.ComponentDragger\" class=\"docClass\">ComponentDragger</a> which is instantiated to perform dragging.</p>\n\n\n<p>For example to create a Component which may only be dragged around using a certain internal element as the drag handle,\nuse the delegate option:</p>\n\n\n<p><code></p>\n\n<pre>new Ext.Component({\n    constrain: true,\n    floating:true,\n    style: {\n        backgroundColor: '#fff',\n        border: '1px solid black'\n    },\n    html: '&lt;h1 style=\"cursor:move\"&gt;The title&lt;/h1&gt;&lt;p&gt;The content&lt;/p&gt;',\n    draggable: {\n        delegate: 'h1'\n    }\n}).show();\n</pre>\n\n\n<p></code></p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 234,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-cfg-draggable",
      "shortDoc": "Specify as true to make a floating Component draggable using the Component's encapsulating element as the drag handle..."
    },
    {
      "tagname": "cfg",
      "name": "fbar",
      "member": "Ext.panel.Panel",
      "type": "Object/Array",
      "doc": "<p>Convenience method used for adding items to the bottom right of the panel. Short for Footer Bar.</p>\n\n<pre><code>fbar: [\n  { type: 'button', text: 'Button 1' }\n]\n</code></pre>\n\n<p>is equivalent to</p>\n\n<pre><code>dockedItems: [{\n    xtype: 'toolbar',\n    dock: 'bottom',\n    defaults: {minWidth: <a href=\"#/api/Ext.grid.Panel-cfg-minButtonWidth\" rel=\"Ext.grid.Panel-cfg-minButtonWidth\" class=\"docClass\">minButtonWidth</a>},\n    items: [\n        { xtype: 'component', flex: 1 },\n        { xtype: 'button', text: 'Button 1' }\n    ]\n}]\n</code></pre>\n\n<p>The <a href=\"#/api/Ext.grid.Panel-cfg-minButtonWidth\" rel=\"Ext.grid.Panel-cfg-minButtonWidth\" class=\"docClass\">minButtonWidth</a> is used as the default <a href=\"#/api/Ext.button.Button-cfg-minWidth\" rel=\"Ext.button.Button-cfg-minWidth\" class=\"docClass\">minWidth</a> for\neach of the buttons in the fbar.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 541,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-fbar",
      "shortDoc": "Convenience method used for adding items to the bottom right of the panel. Short for Footer Bar.\n\nfbar: [\n  { type: '..."
    },
    {
      "tagname": "cfg",
      "name": "floatable",
      "member": "Ext.panel.Panel",
      "type": "Boolean",
      "doc": "<p><b>Important: This config is only effective for <a href=\"#/api/Ext.grid.Panel-cfg-collapsible\" rel=\"Ext.grid.Panel-cfg-collapsible\" class=\"docClass\">collapsible</a> Panels which are direct child items of a <a href=\"#/api/Ext.layout.container.Border\" rel=\"Ext.layout.container.Border\" class=\"docClass\">border layout</a>.</b></p>\n\n\n<p><tt>true</tt> to allow clicking a collapsed Panel&#39;s <a href=\"#/api/Ext.grid.Panel-cfg-placeholder\" rel=\"Ext.grid.Panel-cfg-placeholder\" class=\"docClass\">placeholder</a> to display the Panel floated\nabove the layout, <tt>false</tt> to force the user to fully expand a collapsed region by\nclicking the expand button to see it again (defaults to <tt>true</tt>).</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 180,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-floatable",
      "shortDoc": "Important: This config is only effective for collapsible Panels which are direct child items of a border layout.\n\n\ntr..."
    },
    {
      "tagname": "cfg",
      "name": "floating",
      "member": "Ext.Component",
      "type": "Boolean",
      "doc": "<p>Specify as true to float the Component outside of the document flow using CSS absolute positioning.</p>\n\n\n<p>Components such as <a href=\"#/api/Ext.window.Window\" rel=\"Ext.window.Window\" class=\"docClass\">Window</a>s and <a href=\"#/api/Ext.menu.Menu\" rel=\"Ext.menu.Menu\" class=\"docClass\">Menu</a>s are floating\nby default.</p>\n\n\n<p>Floating Components that are programatically <a href=\"#/api/Ext.Component-event-render\" rel=\"Ext.Component-event-render\" class=\"docClass\">rendered</a> will register themselves with the global\n<a href=\"#/api/Ext.WindowManager\" rel=\"Ext.WindowManager\" class=\"docClass\">ZIndexManager</a></p>\n\n\n<h3 class=\"pa\">Floating Components as child items of a Container</h3>\n\n\n<p>A floating Component may be used as a child item of a Container. This just allows the floating Component to seek a ZIndexManager by\nexamining the ownerCt chain.</p>\n\n\n<p>When configured as floating, Components acquire, at render time, a <a href=\"#/api/Ext.ZIndexManager\" rel=\"Ext.ZIndexManager\" class=\"docClass\">ZIndexManager</a> which manages a stack\nof related floating Components. The ZIndexManager brings a single floating Component to the top of its stack when\nthe Component's <a href=\"#/api/Ext.grid.Panel-method-toFront\" rel=\"Ext.grid.Panel-method-toFront\" class=\"docClass\">toFront</a> method is called.</p>\n\n\n<p>The ZIndexManager is found by traversing up the <a href=\"#/api/Ext.grid.Panel-property-ownerCt\" rel=\"Ext.grid.Panel-property-ownerCt\" class=\"docClass\">ownerCt</a> chain to find an ancestor which itself is floating. This is so that\ndescendant floating Components of floating <i>Containers</i> (Such as a ComboBox dropdown within a Window) can have its zIndex managed relative\nto any siblings, but always <b>above</b> that floating ancestor Container.</p>\n\n\n<p>If no floating ancestor is found, a floating Component registers itself with the default <a href=\"#/api/Ext.WindowManager\" rel=\"Ext.WindowManager\" class=\"docClass\">ZIndexManager</a>.</p>\n\n\n<p>Floating components <i>do not participate in the Container's layout</i>. Because of this, they are not rendered until you explicitly\n<a href=\"#/api/Ext.grid.Panel-event-show\" rel=\"Ext.grid.Panel-event-show\" class=\"docClass\">show</a> them.</p>\n\n\n<p>After rendering, the ownerCt reference is deleted, and the <a href=\"#/api/Ext.grid.Panel-property-floatParent\" rel=\"Ext.grid.Panel-property-floatParent\" class=\"docClass\">floatParent</a> property is set to the found floating ancestor Container.\nIf no floating ancestor Container was found the <a href=\"#/api/Ext.grid.Panel-property-floatParent\" rel=\"Ext.grid.Panel-property-floatParent\" class=\"docClass\">floatParent</a> property will not be set.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 175,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-cfg-floating",
      "shortDoc": "Specify as true to float the Component outside of the document flow using CSS absolute positioning.\n\n\nComponents such..."
    },
    {
      "tagname": "cfg",
      "name": "focusOnToFront",
      "member": "Ext.util.Floating",
      "type": "Boolean",
      "doc": "<p>Specifies whether the floated component should be automatically <a href=\"#/api/Ext.grid.Panel-method-focus\" rel=\"Ext.grid.Panel-method-focus\" class=\"docClass\">focused</a> when it is\n<a href=\"#/api/Ext.grid.Panel-method-toFront\" rel=\"Ext.grid.Panel-method-toFront\" class=\"docClass\">brought to the front</a>. Defaults to true.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/util/Floating.js",
      "linenr": 9,
      "html_filename": "Floating.html",
      "href": "Floating.html#Ext-util-Floating-cfg-focusOnToFront",
      "shortDoc": "Specifies whether the floated component should be automatically focused when it is\nbrought to the front. Defaults to ..."
    },
    {
      "tagname": "cfg",
      "name": "forceFit",
      "member": "Ext.panel.Table",
      "type": "Boolean",
      "doc": "<p>Specify as <code>true</code> to force the columns to fit into the available width. Headers are first sized according to configuration, whether that be\na specific width, or flex. Then they are all proportionally changed in width so that the entire content width is used..</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 64,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-cfg-forceFit",
      "shortDoc": "Specify as true to force the columns to fit into the available width. Headers are first sized according to configurat..."
    },
    {
      "tagname": "cfg",
      "name": "frame",
      "member": "Ext.panel.Panel",
      "type": "Boolean",
      "doc": "<p>True to apply a frame to the panel.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 269,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-frame"
    },
    {
      "tagname": "cfg",
      "name": "frameHeader",
      "member": "Ext.panel.Panel",
      "type": "Boolean",
      "doc": "<p>True to apply a frame to the panel panels header (if 'frame' is true).</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 275,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-frameHeader"
    },
    {
      "tagname": "cfg",
      "name": "headerPosition",
      "member": "Ext.panel.Panel",
      "type": "String",
      "doc": "<p>Specify as <code>'top'</code>, <code>'bottom'</code>, <code>'left'</code> or <code>'right'</code>. Defaults to <code>'top'</code>.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 264,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-headerPosition"
    },
    {
      "tagname": "cfg",
      "name": "height",
      "member": "Ext.AbstractComponent",
      "type": "Number",
      "doc": "<p>The height of this component in pixels.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 334,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-height"
    },
    {
      "tagname": "cfg",
      "name": "hidden",
      "member": "Ext.AbstractComponent",
      "type": "Boolean",
      "doc": "<p>Defaults to false.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 357,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-hidden"
    },
    {
      "tagname": "cfg",
      "name": "hideCollapseTool",
      "member": "Ext.panel.Panel",
      "type": "Boolean",
      "doc": "<p><code>true</code> to hide the expand/collapse toggle button when <code><a href=\"#/api/Ext.grid.Panel-cfg-collapsible\" rel=\"Ext.grid.Panel-cfg-collapsible\" class=\"docClass\">collapsible</a> == true</code>,\n<code>false</code> to display it (defaults to <code>false</code>).</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 143,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-hideCollapseTool"
    },
    {
      "tagname": "cfg",
      "name": "hideHeaders",
      "member": "Ext.panel.Table",
      "type": "Boolean",
      "doc": "<p>Specify as <code>true</code> to hide the headers.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 70,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-cfg-hideHeaders"
    },
    {
      "tagname": "cfg",
      "name": "hideMode",
      "member": "Ext.AbstractComponent",
      "type": "String",
      "doc": "<p>A String which specifies how this Component's encapsulating DOM element will be hidden.\nValues may be<div class=\"mdetail-params\"><ul>\n<li><code>'display'</code> : The Component will be hidden using the <code>display: none</code> style.</li>\n<li><code>'visibility'</code> : The Component will be hidden using the <code>visibility: hidden</code> style.</li>\n<li><code>'offsets'</code> : The Component will be hidden by absolutely positioning it out of the visible area of the document. This\nis useful when a hidden Component must maintain measurable dimensions. Hiding using <code>display</code> results\nin a Component having zero dimensions.</li></ul></div>\nDefaults to <code>'display'</code>.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 388,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-hideMode",
      "shortDoc": "A String which specifies how this Component's encapsulating DOM element will be hidden.\nValues may be\n'display' : The..."
    },
    {
      "tagname": "cfg",
      "name": "html",
      "member": "Ext.AbstractComponent",
      "type": "String/Object",
      "doc": "<p>An HTML fragment, or a <a href=\"#/api/Ext.core.DomHelper\" rel=\"Ext.core.DomHelper\" class=\"docClass\">DomHelper</a> specification to use as the layout element\ncontent (defaults to ''). The HTML content is added after the component is rendered,\nso the document will not contain this HTML at the time the <a href=\"#/api/Ext.grid.Panel-event-render\" rel=\"Ext.grid.Panel-event-render\" class=\"docClass\">render</a> event is fired.\nThis content is inserted into the body <i>before</i> any configured <a href=\"#/api/Ext.grid.Panel-cfg-contentEl\" rel=\"Ext.grid.Panel-cfg-contentEl\" class=\"docClass\">contentEl</a> is appended.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 419,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-html",
      "shortDoc": "An HTML fragment, or a DomHelper specification to use as the layout element\ncontent (defaults to ''). The HTML conten..."
    },
    {
      "tagname": "cfg",
      "name": "id",
      "member": "Ext.AbstractComponent",
      "type": "String",
      "doc": "<p>The <b><u>unique id of this component instance</u></b> (defaults to an <a href=\"#/api/Ext.grid.Panel-method-getId\" rel=\"Ext.grid.Panel-method-getId\" class=\"docClass\">auto-assigned id</a>).</p>\n\n\n<p>It should not be necessary to use this configuration except for singleton objects in your application.\nComponents created with an id may be accessed globally using <a href=\"#/api/Ext-method-getCmp\" rel=\"Ext-method-getCmp\" class=\"docClass\">Ext.getCmp</a>.</p>\n\n\n<p>Instead of using assigned ids, use the <a href=\"#/api/Ext.grid.Panel-cfg-itemId\" rel=\"Ext.grid.Panel-cfg-itemId\" class=\"docClass\">itemId</a> config, and <a href=\"#/api/Ext.ComponentQuery\" rel=\"Ext.ComponentQuery\" class=\"docClass\">ComponentQuery</a> which\nprovides selector-based searching for Sencha Components analogous to DOM querying. The <a href=\"#/api/Ext.container.Container\" rel=\"Ext.container.Container\" class=\"docClass\">Container</a>\nclass contains <a href=\"#/api/Ext.container.Container-method-down\" rel=\"Ext.container.Container-method-down\" class=\"docClass\">shortcut methods</a> to query its descendant Components by selector.</p>\n\n\n<p>Note that this id will also be used as the element id for the containing HTML element\nthat is rendered to the page for this component. This allows you to write id-based CSS\nrules to style the specific instance of this component uniquely, and also to select\nsub-elements using this component's id as the parent.</p>\n\n\n<p><b>Note</b>: to avoid complications imposed by a unique <tt>id</tt> also see <code><a href=\"#/api/Ext.grid.Panel-cfg-itemId\" rel=\"Ext.grid.Panel-cfg-itemId\" class=\"docClass\">itemId</a></code>.</p>\n\n\n<p><b>Note</b>: to access the container of a Component see <code><a href=\"#/api/Ext.grid.Panel-property-ownerCt\" rel=\"Ext.grid.Panel-property-ownerCt\" class=\"docClass\">ownerCt</a></code>.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 50,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-id",
      "shortDoc": "The unique id of this component instance (defaults to an auto-assigned id).\n\n\nIt should not be necessary to use this ..."
    },
    {
      "tagname": "cfg",
      "name": "itemId",
      "member": "Ext.AbstractComponent",
      "type": "String",
      "doc": "<p>An <tt>itemId</tt> can be used as an alternative way to get a reference to a component\nwhen no object reference is available.  Instead of using an <code><a href=\"#/api/Ext.grid.Panel-cfg-id\" rel=\"Ext.grid.Panel-cfg-id\" class=\"docClass\">id</a></code> with\n<a href=\"#/api/Ext\" rel=\"Ext\" class=\"docClass\">Ext</a>.<a href=\"#/api/Ext-method-getCmp\" rel=\"Ext-method-getCmp\" class=\"docClass\">getCmp</a>, use <code>itemId</code> with\n<a href=\"#/api/Ext.container.Container\" rel=\"Ext.container.Container\" class=\"docClass\">Ext.container.Container</a>.<a href=\"#/api/Ext.container.Container-method-getComponent\" rel=\"Ext.container.Container-method-getComponent\" class=\"docClass\">getComponent</a> which will retrieve\n<code>itemId</code>'s or <tt><a href=\"#/api/Ext.grid.Panel-cfg-id\" rel=\"Ext.grid.Panel-cfg-id\" class=\"docClass\">id</a></tt>'s. Since <code>itemId</code>'s are an index to the\ncontainer's internal MixedCollection, the <code>itemId</code> is scoped locally to the container --\navoiding potential conflicts with <a href=\"#/api/Ext.ComponentManager\" rel=\"Ext.ComponentManager\" class=\"docClass\">Ext.ComponentManager</a> which requires a <b>unique</b>\n<code><a href=\"#/api/Ext.grid.Panel-cfg-id\" rel=\"Ext.grid.Panel-cfg-id\" class=\"docClass\">id</a></code>.</p>\n\n\n<pre><code>var c = new Ext.panel.Panel({ //\n    <a href=\"#/api/Ext.Component-cfg-height\" rel=\"Ext.Component-cfg-height\" class=\"docClass\">height</a>: 300,\n    <a href=\"#/api/Ext.grid.Panel-cfg-renderTo\" rel=\"Ext.grid.Panel-cfg-renderTo\" class=\"docClass\">renderTo</a>: document.body,\n    <a href=\"#/api/Ext.container.Container-cfg-layout\" rel=\"Ext.container.Container-cfg-layout\" class=\"docClass\">layout</a>: 'auto',\n    <a href=\"#/api/Ext.container.Container-property-items\" rel=\"Ext.container.Container-property-items\" class=\"docClass\">items</a>: [\n        {\n            itemId: 'p1',\n            <a href=\"#/api/Ext.panel.Panel--title\" rel=\"Ext.panel.Panel--title\" class=\"docClass\">title</a>: 'Panel 1',\n            <a href=\"#/api/Ext.Component-cfg-height\" rel=\"Ext.Component-cfg-height\" class=\"docClass\">height</a>: 150\n        },\n        {\n            itemId: 'p2',\n            <a href=\"#/api/Ext.panel.Panel--title\" rel=\"Ext.panel.Panel--title\" class=\"docClass\">title</a>: 'Panel 2',\n            <a href=\"#/api/Ext.Component-cfg-height\" rel=\"Ext.Component-cfg-height\" class=\"docClass\">height</a>: 150\n        }\n    ]\n})\np1 = c.<a href=\"#/api/Ext.container.Container-method-getComponent\" rel=\"Ext.container.Container-method-getComponent\" class=\"docClass\">getComponent</a>('p1'); // not the same as <a href=\"#/api/Ext-method-getCmp\" rel=\"Ext-method-getCmp\" class=\"docClass\">Ext.getCmp()</a>\np2 = p1.<a href=\"#/api/Ext.grid.Panel-property-ownerCt\" rel=\"Ext.grid.Panel-property-ownerCt\" class=\"docClass\">ownerCt</a>.<a href=\"#/api/Ext.container.Container-method-getComponent\" rel=\"Ext.container.Container-method-getComponent\" class=\"docClass\">getComponent</a>('p2'); // reference via a sibling\n</code></pre>\n\n\n<p>Also see <tt><a href=\"#/api/Ext.grid.Panel-cfg-id\" rel=\"Ext.grid.Panel-cfg-id\" class=\"docClass\">id</a></tt>, <code><a href=\"#/api/Ext.grid.Panel-method-query\" rel=\"Ext.grid.Panel-method-query\" class=\"docClass\">query</a></code>, <code><a href=\"#/api/Ext.grid.Panel-method-down\" rel=\"Ext.grid.Panel-method-down\" class=\"docClass\">down</a></code> and <code><a href=\"#/api/Ext.grid.Panel-method-child\" rel=\"Ext.grid.Panel-method-child\" class=\"docClass\">child</a></code>.</p>\n\n\n<p><b>Note</b>: to access the container of an item see <tt><a href=\"#/api/Ext.grid.Panel-property-ownerCt\" rel=\"Ext.grid.Panel-property-ownerCt\" class=\"docClass\">ownerCt</a></tt>.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 66,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-itemId",
      "shortDoc": "An itemId can be used as an alternative way to get a reference to a component\nwhen no object reference is available. ..."
    },
    {
      "tagname": "cfg",
      "name": "items",
      "member": "Ext.container.AbstractContainer",
      "type": "Object/Array",
      "doc": "<p>A single item, or an array of child Components to be added to this container</p>\n\n\n<p><b>Unless configured with a <a href=\"#/api/Ext.grid.Panel-cfg-layout\" rel=\"Ext.grid.Panel-cfg-layout\" class=\"docClass\">layout</a>, a Container simply renders child Components serially into\nits encapsulating element and performs no sizing or positioning upon them.</b><p>\n<p>Example:</p>\n<pre><code>// specifying a single item\nitems: {...},\nlayout: 'fit',    // The single items is sized to fit\n\n// specifying multiple items\nitems: [{...}, {...}],\nlayout: 'hbox', // The items are arranged horizontally\n       </code></pre>\n<p>Each item may be:</p>\n<ul>\n<li>A <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Component</a></li>\n<li>A Component configuration object</li>\n</ul>\n<p>If a configuration object is specified, the actual type of Component to be\ninstantiated my be indicated by using the <a href=\"#/api/Ext.Component--xtype\" rel=\"Ext.Component--xtype\" class=\"docClass\">xtype</a> option.</p>\n<p>Every Component class has its own <a href=\"#/api/Ext.Component--xtype\" rel=\"Ext.Component--xtype\" class=\"docClass\">xtype</a>.</p>\n<p>If an <a href=\"#/api/Ext.Component--xtype\" rel=\"Ext.Component--xtype\" class=\"docClass\">xtype</a> is not explicitly\nspecified, the <a href=\"#/api/Ext.grid.Panel-cfg-defaultType\" rel=\"Ext.grid.Panel-cfg-defaultType\" class=\"docClass\">defaultType</a> for the Container is used, which by default is usually <code>panel</code>.</p>\n<p><b>Notes</b>:</p>\n<p>Ext uses lazy rendering. Child Components will only be rendered\nshould it become necessary. Items are automatically laid out when they are first\nshown (no sizing is done while hidden), or in response to a <a href=\"#/api/Ext.grid.Panel-method-doLayout\" rel=\"Ext.grid.Panel-method-doLayout\" class=\"docClass\">doLayout</a> call.</p>\n<p>Do not specify <code><a href=\"#/api/Ext.panel.Panel-cfg-contentEl\" rel=\"Ext.panel.Panel-cfg-contentEl\" class=\"docClass\">contentEl</a></code> or \n<code><a href=\"#/api/Ext.panel.Panel-cfg-html\" rel=\"Ext.panel.Panel-cfg-html\" class=\"docClass\">html</a></code> with <code>items</code>.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 94,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-cfg-items",
      "shortDoc": "A single item, or an array of child Components to be added to this container\n\n\nUnless configured with a layout, a Con..."
    },
    {
      "tagname": "cfg",
      "name": "layout",
      "member": "Ext.container.AbstractContainer",
      "type": "String/Object",
      "doc": "<p><b>*Important</b>: In order for child items to be correctly sized and\npositioned, typically a layout manager <b>must</b> be specified through\nthe <code>layout</code> configuration option.</p>\n\n\n<br><p>The sizing and positioning of child <a href=\"#/api/Ext.grid.Panel-property-items\" rel=\"Ext.grid.Panel-property-items\" class=\"docClass\">items</a> is the responsibility of\n\n\n<p>the Container's layout manager which creates and manages the type of layout\nyou have in mind.  For example:</p></p>\n\n<p>If the <a href=\"#/api/Ext.grid.Panel-cfg-layout\" rel=\"Ext.grid.Panel-cfg-layout\" class=\"docClass\">layout</a> configuration is not explicitly specified for\na general purpose container (e.g. Container or Panel) the\n<a href=\"#/api/Ext.layout.container.Auto\" rel=\"Ext.layout.container.Auto\" class=\"docClass\">default layout manager</a> will be used\nwhich does nothing but render child components sequentially into the\nContainer (no sizing or positioning will be performed in this situation).</p>\n\n\n<br><p><b><code>layout</code></b> may be specified as either as an Object or\n\n\n<p>as a String:</p><div><ul class=\"mdetail-params\"></p>\n\n<p><li><u>Specify as an Object</u></li></p>\n\n<div><ul class=\"mdetail-params\">\n<li>Example usage:</li>\n<pre><code>layout: {\n    type: 'vbox',\n    align: 'left'\n}\n       </code></pre>\n\n<li><code><b>type</b></code></li>\n<br/><p>The layout type to be used for this container.  If not specified,\na default <a href=\"#/api/Ext.layout.container.Auto\" rel=\"Ext.layout.container.Auto\" class=\"docClass\">Ext.layout.container.Auto</a> will be created and used.</p>\n<br/><p>Valid layout <code>type</code> values are:</p>\n<div class=\"sub-desc\"><ul class=\"mdetail-params\">\n<li><code><b><a href=\"#/api/Ext.layout.container.Auto\" rel=\"Ext.layout.container.Auto\" class=\"docClass\">Auto</a></b></code> &nbsp;&nbsp;&nbsp; <b>Default</b></li>\n<li><code><b><a href=\"#/api/Ext.layout.container.Card\" rel=\"Ext.layout.container.Card\" class=\"docClass\">card</a></b></code></li>\n<li><code><b><a href=\"#/api/Ext.layout.container.Fit\" rel=\"Ext.layout.container.Fit\" class=\"docClass\">fit</a></b></code></li>\n<li><code><b><a href=\"#/api/Ext.layout.container.HBox\" rel=\"Ext.layout.container.HBox\" class=\"docClass\">hbox</a></b></code></li>\n<li><code><b><a href=\"#/api/Ext.layout.container.VBox\" rel=\"Ext.layout.container.VBox\" class=\"docClass\">vbox</a></b></code></li>\n<li><code><b><a href=\"#/api/Ext.layout.container.Anchor\" rel=\"Ext.layout.container.Anchor\" class=\"docClass\">anchor</a></b></code></li>\n<li><code><b><a href=\"#/api/Ext.layout.container.Table\" rel=\"Ext.layout.container.Table\" class=\"docClass\">table</a></b></code></li>\n</ul></div>\n\n<li>Layout specific configuration properties</li>\n<br/><p>Additional layout specific configuration properties may also be\nspecified. For complete details regarding the valid config options for\neach layout type, see the layout class corresponding to the <code>type</code>\nspecified.</p>\n\n</ul></div>\n\n\n<p><li><u>Specify as a String</u></li></p>\n\n<div><ul class=\"mdetail-params\">\n<li>Example usage:</li>\n<pre><code>layout: {\n    type: 'vbox',\n    padding: '5',\n    align: 'left'\n}\n       </code></pre>\n<li><code><b>layout</b></code></li>\n<br/><p>The layout <code>type</code> to be used for this container (see list\nof valid layout type values above).</p><br/>\n<br/><p>Additional layout specific configuration properties. For complete\ndetails regarding the valid config options for each layout type, see the\nlayout class corresponding to the <code>layout</code> specified.</p>\n</ul></div>\n\n\n<p></ul></div></p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 20,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-cfg-layout",
      "shortDoc": "*Important: In order for child items to be correctly sized and\npositioned, typically a layout manager must be specifi..."
    },
    {
      "tagname": "cfg",
      "name": "lbar",
      "member": "Ext.panel.Panel",
      "type": "Object/Array",
      "doc": "<p>Convenience method. Short for 'Left Bar' (left-docked, vertical toolbar).</p>\n\n<p>   lbar: [</p>\n\n<pre><code> { xtype: 'button', text: 'Button 1' }\n</code></pre>\n\n<p>   ]</p>\n\n<p>is equivalent to</p>\n\n<p>   dockedItems: [{</p>\n\n<pre><code>   xtype: 'toolbar',\n   dock: 'left',\n   items: [\n       { xtype: 'button', text: 'Button 1' }\n   ]\n</code></pre>\n\n<p>   }]</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 593,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-lbar",
      "shortDoc": "Convenience method. Short for 'Left Bar' (left-docked, vertical toolbar).\n\n   lbar: [\n\n { xtype: 'button', text: 'But..."
    },
    {
      "tagname": "cfg",
      "name": "listeners",
      "member": "Ext.util.Observable",
      "type": "Object",
      "doc": "<p>(optional) <p>A config object containing one or more event handlers to be added to this\nobject during initialization.  This should be a valid listeners config object as specified in the\n<a href=\"#/api/Ext.grid.Panel-method-addListener\" rel=\"Ext.grid.Panel-method-addListener\" class=\"docClass\">addListener</a> example for attaching multiple handlers at once.</p></p>\n\n<br><p><b><u>DOM events from ExtJs <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Components</a></u></b></p>\n\n\n<br><p>While <i>some</i> ExtJs Component classes export selected DOM events (e.g. \"click\", \"mouseover\" etc), this\n\n\n<p>is usually only done when extra value can be added. For example the <a href=\"#/api/Ext.view.View\" rel=\"Ext.view.View\" class=\"docClass\">DataView</a>'s\n<b><code><a href=\"#/api/Ext.view.View--click\" rel=\"Ext.view.View--click\" class=\"docClass\">click</a></code></b> event passing the node clicked on. To access DOM\nevents directly from a child element of a Component, we need to specify the <code>element</code> option to\nidentify the Component property to add a DOM listener to:</p>\n\n<pre><code>new Ext.panel.Panel({\n    width: 400,\n    height: 200,\n    dockedItems: [{\n        xtype: 'toolbar'\n    }],\n    listeners: {\n        click: {\n            element: 'el', //bind to the underlying el property on the panel\n            fn: function(){ console.log('click el'); }\n        },\n        dblclick: {\n            element: 'body', //bind to the underlying body property on the panel\n            fn: function(){ console.log('dblclick body'); }\n        }\n    }\n});\n</code></pre>\n\n\n<p></p></p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/util/Observable.js",
      "linenr": 103,
      "html_filename": "Observable.html",
      "href": "Observable.html#Ext-util-Observable-cfg-listeners",
      "shortDoc": "(optional) A config object containing one or more event handlers to be added to this\nobject during initialization.  T..."
    },
    {
      "tagname": "cfg",
      "name": "loader",
      "member": "Ext.AbstractComponent",
      "type": "Ext.ComponentLoader/Object",
      "doc": "<p>A configuration object or an instance of a <a href=\"#/api/Ext.ComponentLoader\" rel=\"Ext.ComponentLoader\" class=\"docClass\">Ext.ComponentLoader</a> to load remote\ncontent for this Component.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 462,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-loader"
    },
    {
      "tagname": "cfg",
      "name": "maintainFlex",
      "member": "Ext.Component",
      "type": "Boolean",
      "doc": "<p><b>Only valid when a sibling element of a <a href=\"#/api/Ext.resizer.Splitter\" rel=\"Ext.resizer.Splitter\" class=\"docClass\">Splitter</a> within a <a href=\"#/api/Ext.layout.container.VBox\" rel=\"Ext.layout.container.VBox\" class=\"docClass\">VBox</a> or\n<a href=\"#/api/Ext.layout.container.HBox\" rel=\"Ext.layout.container.HBox\" class=\"docClass\">HBox</a> layout.</b></p>\n\n\n<p>Specifies that if an immediate sibling Splitter is moved, the Component on the <i>other</i> side is resized, and this\nComponent maintains its configured <a href=\"#/api/Ext.layout.container.Box-cfg-flex\" rel=\"Ext.layout.container.Box-cfg-flex\" class=\"docClass\">flex</a> value.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 256,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-cfg-maintainFlex",
      "shortDoc": "Only valid when a sibling element of a Splitter within a VBox or\nHBox layout.\n\n\nSpecifies that if an immediate siblin..."
    },
    {
      "tagname": "cfg",
      "name": "margin",
      "member": "Ext.AbstractComponent",
      "type": "Number/String",
      "doc": "<p>Specifies the margin for this component. The margin can be a single numeric value to apply to all sides or\nit can be a CSS style specification for each style, for example: '10 5 3 10'.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 351,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-margin",
      "shortDoc": "Specifies the margin for this component. The margin can be a single numeric value to apply to all sides or\nit can be ..."
    },
    {
      "tagname": "cfg",
      "name": "maxHeight",
      "member": "Ext.AbstractComponent",
      "type": "Number",
      "doc": "<p>The maximum value in pixels which this Component will set its height to.</p>\n\n\n<p><b>Warning:</b> This will override any size management applied by layout managers.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 451,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-maxHeight",
      "shortDoc": "The maximum value in pixels which this Component will set its height to.\n\n\nWarning: This will override any size manag..."
    },
    {
      "tagname": "cfg",
      "name": "maxWidth",
      "member": "Ext.AbstractComponent",
      "type": "Number",
      "doc": "<p>The maximum value in pixels which this Component will set its width to.</p>\n\n\n<p><b>Warning:</b> This will override any size management applied by layout managers.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 456,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-maxWidth",
      "shortDoc": "The maximum value in pixels which this Component will set its width to.\n\n\nWarning: This will override any size manage..."
    },
    {
      "tagname": "cfg",
      "name": "minButtonWidth",
      "member": "Ext.panel.Panel",
      "type": "Number",
      "doc": "<p>Minimum width of all footer toolbar buttons in pixels (defaults to <tt>75</tt>). If set, this will\nbe used as the default value for the <tt><a href=\"#/api/Ext.button.Button-cfg-minWidth\" rel=\"Ext.button.Button-cfg-minWidth\" class=\"docClass\">Ext.button.Button.minWidth</a></tt> config of\neach Button added to the <b>footer toolbar</b> via the <a href=\"#/api/Ext.grid.Panel-cfg-fbar\" rel=\"Ext.grid.Panel-cfg-fbar\" class=\"docClass\">fbar</a> or <a href=\"#/api/Ext.grid.Panel-cfg-buttons\" rel=\"Ext.grid.Panel-cfg-buttons\" class=\"docClass\">buttons</a> configurations.\nIt will be ignored for buttons that have a minWidth configured some other way, e.g. in their own config\nobject or via the <a href=\"#/api/Ext.container.Container--config-defaults\" rel=\"Ext.container.Container--config-defaults\" class=\"docClass\">defaults</a> of their parent container.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 119,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-minButtonWidth",
      "shortDoc": "Minimum width of all footer toolbar buttons in pixels (defaults to 75). If set, this will\nbe used as the default valu..."
    },
    {
      "tagname": "cfg",
      "name": "minHeight",
      "member": "Ext.AbstractComponent",
      "type": "Number",
      "doc": "<p>The minimum value in pixels which this Component will set its height to.</p>\n\n\n<p><b>Warning:</b> This will override any size management applied by layout managers.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 441,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-minHeight",
      "shortDoc": "The minimum value in pixels which this Component will set its height to.\n\n\nWarning: This will override any size manag..."
    },
    {
      "tagname": "cfg",
      "name": "minWidth",
      "member": "Ext.AbstractComponent",
      "type": "Number",
      "doc": "<p>The minimum value in pixels which this Component will set its width to.</p>\n\n\n<p><b>Warning:</b> This will override any size management applied by layout managers.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 446,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-minWidth",
      "shortDoc": "The minimum value in pixels which this Component will set its width to.\n\n\nWarning: This will override any size manage..."
    },
    {
      "tagname": "cfg",
      "name": "overCls",
      "member": "Ext.AbstractComponent",
      "type": "String",
      "doc": "<p>An optional extra CSS class that will be added to this component's Element when the mouse moves\nover the Element, and removed when the mouse moves out. (defaults to '').  This can be\nuseful for adding customized 'active' or 'hover' styles to the component or any of its children using standard CSS rules.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 274,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-overCls",
      "shortDoc": "An optional extra CSS class that will be added to this component's Element when the mouse moves\nover the Element, and..."
    },
    {
      "tagname": "cfg",
      "name": "overlapHeader",
      "member": "Ext.panel.Panel",
      "type": "Mixed",
      "doc": "<p>True to overlap the header in a panel over the framing of the panel itself. This is needed when frame:true (and is done automatically for you). Otherwise it is undefined.\nIf you manually add rounded corners to a panel header which does not have frame:true, this will need to be set to true.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 189,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-overlapHeader",
      "shortDoc": "True to overlap the header in a panel over the framing of the panel itself. This is needed when frame:true (and is do..."
    },
    {
      "tagname": "cfg",
      "name": "padding",
      "member": "Ext.AbstractComponent",
      "type": "Number/String",
      "doc": "<p>Specifies the padding for this component. The padding can be a single numeric value to apply to all sides or\nit can be a CSS style specification for each style, for example: '10 5 3 10'.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 345,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-padding",
      "shortDoc": "Specifies the padding for this component. The padding can be a single numeric value to apply to all sides or\nit can b..."
    },
    {
      "tagname": "cfg",
      "name": "placeholder",
      "member": "Ext.panel.Panel",
      "type": "Mixed",
      "doc": "<p><b>Important: This config is only effective for <a href=\"#/api/Ext.grid.Panel-cfg-collapsible\" rel=\"Ext.grid.Panel-cfg-collapsible\" class=\"docClass\">collapsible</a> Panels which are direct child items of a <a href=\"#/api/Ext.layout.container.Border\" rel=\"Ext.layout.container.Border\" class=\"docClass\">border layout</a>\nwhen not using the <code>'header'</code> <a href=\"#/api/Ext.grid.Panel-cfg-collapseMode\" rel=\"Ext.grid.Panel-cfg-collapseMode\" class=\"docClass\">collapseMode</a>.</b></p>\n\n\n<p><b>Optional.</b> A Component (or config object for a Component) to show in place of this Panel when this Panel is collapsed by a\n<a href=\"#/api/Ext.layout.container.Border\" rel=\"Ext.layout.container.Border\" class=\"docClass\">border layout</a>. Defaults to a generated <a href=\"#/api/Ext.panel.Header\" rel=\"Ext.panel.Header\" class=\"docClass\">Header</a>\ncontaining a <a href=\"#/api/Ext.panel.Tool\" rel=\"Ext.panel.Tool\" class=\"docClass\">Tool</a> to re-expand the Panel.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 171,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-placeholder",
      "shortDoc": "Important: This config is only effective for collapsible Panels which are direct child items of a border layout\nwhen ..."
    },
    {
      "tagname": "cfg",
      "name": "plugins",
      "member": "Ext.AbstractComponent",
      "type": "Object/Array",
      "doc": "<p>An object or array of objects that will provide custom functionality for this component.  The only\nrequirement for a valid plugin is that it contain an init method that accepts a reference of type <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a>.\nWhen a component is created, if any plugins are available, the component will call the init method on each\nplugin, passing a reference to itself.  Each plugin can then call methods or respond to events on the\ncomponent as needed to provide its functionality.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 491,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-plugins",
      "shortDoc": "An object or array of objects that will provide custom functionality for this component.  The only\nrequirement for a ..."
    },
    {
      "tagname": "cfg",
      "name": "preventHeader",
      "member": "Ext.panel.Panel",
      "type": "Boolean",
      "doc": "<p>Prevent a Header from being created and shown. Defaults to false.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 259,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-preventHeader"
    },
    {
      "tagname": "cfg",
      "name": "rbar",
      "member": "Ext.panel.Panel",
      "type": "Object/Array",
      "doc": "<p>Convenience method. Short for 'Right Bar' (right-docked, vertical toolbar).</p>\n\n<p>   rbar: [</p>\n\n<pre><code> { xtype: 'button', text: 'Button 1' }\n</code></pre>\n\n<p>   ]</p>\n\n<p>is equivalent to</p>\n\n<p>   dockedItems: [{</p>\n\n<pre><code>   xtype: 'toolbar',\n   dock: 'right',\n   items: [\n       { xtype: 'button', text: 'Button 1' }\n   ]\n</code></pre>\n\n<p>   }]</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 619,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-rbar",
      "shortDoc": "Convenience method. Short for 'Right Bar' (right-docked, vertical toolbar).\n\n   rbar: [\n\n { xtype: 'button', text: 'B..."
    },
    {
      "tagname": "cfg",
      "name": "renderSelectors",
      "member": "Ext.AbstractComponent",
      "type": "Object",
      "doc": "<p>An object containing properties specifying <a href=\"#/api/Ext.DomQuery\" rel=\"Ext.DomQuery\" class=\"docClass\">DomQuery</a> selectors which identify child elements\ncreated by the render process.</p>\n\n<p>After the Component's internal structure is rendered according to the <a href=\"#/api/Ext.grid.Panel-cfg-renderTpl\" rel=\"Ext.grid.Panel-cfg-renderTpl\" class=\"docClass\">renderTpl</a>, this object is iterated through,\nand the found Elements are added as properties to the Component using the <code>renderSelector</code> property name.</p>\n\n<p>For example, a Component which rendered an image, and description into its element might use the following properties\ncoded into its prototype:</p>\n\n<pre><code>renderTpl: '&amp;lt;img src=\"{imageUrl}\" class=\"x-image-component-img\"&gt;&amp;lt;div class=\"x-image-component-desc\"&gt;{description}&amp;gt;/div&amp;lt;',\n\nrenderSelectors: {\n    image: 'img.x-image-component-img',\n    descEl: 'div.x-image-component-desc'\n}\n</code></pre>\n\n<p>After rendering, the Component would have a property <code>image</code> referencing its child <code>img</code> Element,\nand a property <code>descEl</code> referencing the <code>div</code> Element which contains the description.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 158,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-renderSelectors",
      "shortDoc": "An object containing properties specifying DomQuery selectors which identify child elements\ncreated by the render pro..."
    },
    {
      "tagname": "cfg",
      "name": "renderTo",
      "member": "Ext.AbstractComponent",
      "type": "Mixed",
      "doc": "<p>Specify the id of the element, a DOM element or an existing Element that this component\nwill be rendered into.</p>\n\n\n<div><ul>\n<li><b>Notes</b> : <ul>\n<div class=\"sub-desc\">Do <u>not</u> use this option if the Component is to be a child item of\na <a href=\"#/api/Ext.container.Container\" rel=\"Ext.container.Container\" class=\"docClass\">Container</a>. It is the responsibility of the\n<a href=\"#/api/Ext.container.Container\" rel=\"Ext.container.Container\" class=\"docClass\">Container</a>'s <a href=\"#/api/Ext.container.Container-cfg-layout\" rel=\"Ext.container.Container-cfg-layout\" class=\"docClass\">layout manager</a>\nto render and manage its child items.</div>\n<div class=\"sub-desc\">When using this config, a call to render() is not required.</div>\n</ul></li>\n</ul></div>\n\n\n<p>See <code><a href=\"#/api/Ext.grid.Panel-event-render\" rel=\"Ext.grid.Panel-event-render\" class=\"docClass\">render</a></code> also.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 183,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-renderTo",
      "shortDoc": "Specify the id of the element, a DOM element or an existing Element that this component\nwill be rendered into.\n\n\n\nNot..."
    },
    {
      "tagname": "cfg",
      "name": "renderTpl",
      "member": "Ext.AbstractComponent",
      "type": "Mixed",
      "doc": "<p>An <a href=\"#/api/Ext.XTemplate\" rel=\"Ext.XTemplate\" class=\"docClass\">XTemplate</a> used to create the internal structure inside this Component's\nencapsulating <a href=\"#/api/Ext.grid.Panel-method-getEl\" rel=\"Ext.grid.Panel-method-getEl\" class=\"docClass\">Element</a>.</p>\n\n\n<p>You do not normally need to specify this. For the base classes <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a>\nand <a href=\"#/api/Ext.container.Container\" rel=\"Ext.container.Container\" class=\"docClass\">Ext.container.Container</a>, this defaults to <b><code>null</code></b> which means that they will be initially rendered\nwith no internal structure; they render their <a href=\"#/api/Ext.grid.Panel-method-getEl\" rel=\"Ext.grid.Panel-method-getEl\" class=\"docClass\">Element</a> empty. The more specialized ExtJS and Touch classes\nwhich use a more complex DOM structure, provide their own template definitions.</p>\n\n\n<p>This is intended to allow the developer to create application-specific utility Components with customized\ninternal structure.</p>\n\n\n<p>Upon rendering, any created child elements may be automatically imported into object properties using the\n<a href=\"#/api/Ext.grid.Panel-cfg-renderSelectors\" rel=\"Ext.grid.Panel-cfg-renderSelectors\" class=\"docClass\">renderSelectors</a> option.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 143,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-renderTpl",
      "shortDoc": "An XTemplate used to create the internal structure inside this Component's\nencapsulating Element.\n\n\nYou do not normal..."
    },
    {
      "tagname": "cfg",
      "name": "resizable",
      "member": "Ext.Component",
      "type": "Mixed",
      "doc": "<p>Specify as <code>true</code> to apply a <a href=\"#/api/Ext.resizer.Resizer\" rel=\"Ext.resizer.Resizer\" class=\"docClass\">Resizer</a> to this Component\nafter rendering.</p>\n\n\n<p>May also be specified as a config object to be passed to the constructor of <a href=\"#/api/Ext.resizer.Resizer\" rel=\"Ext.resizer.Resizer\" class=\"docClass\">Resizer</a>\nto override any defaults. By default the Component passes its minimum and maximum size, and uses\n<code><a href=\"#/api/Ext.resizer.Resizer-cfg-dynamic\" rel=\"Ext.resizer.Resizer-cfg-dynamic\" class=\"docClass\">Ext.resizer.Resizer.dynamic</a>: false</code></p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 154,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-cfg-resizable",
      "shortDoc": "Specify as true to apply a Resizer to this Component\nafter rendering.\n\n\nMay also be specified as a config object to b..."
    },
    {
      "tagname": "cfg",
      "name": "resizeHandles",
      "member": "Ext.Component",
      "type": "String",
      "doc": "<p>A valid <a href=\"#/api/Ext.resizer.Resizer\" rel=\"Ext.resizer.Resizer\" class=\"docClass\">Ext.resizer.Resizer</a> handles config string (defaults to 'all').  Only applies when resizable = true.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 163,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-cfg-resizeHandles"
    },
    {
      "tagname": "cfg",
      "name": "saveBuffer",
      "member": "Ext.state.Stateful",
      "type": "Number",
      "doc": "<p>A buffer to be applied if many state events are fired within\na short period. Defaults to 100.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/state/Stateful.js",
      "linenr": 74,
      "html_filename": "Stateful.html",
      "href": "Stateful.html#Ext-state-Stateful-cfg-saveBuffer"
    },
    {
      "tagname": "cfg",
      "name": "scroll",
      "member": "Ext.panel.Table",
      "type": "String/Boolean",
      "doc": "<p>Valid values are 'both', 'horizontal' or 'vertical'. true implies 'both'. false implies 'none'.\nDefaults to true.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 51,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-cfg-scroll"
    },
    {
      "tagname": "cfg",
      "name": "scrollDelta",
      "member": "Ext.panel.Table",
      "type": "Number",
      "doc": "<p>Number of pixels to scroll when scrolling with mousewheel.\nDefaults to 40.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 44,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-cfg-scrollDelta"
    },
    {
      "tagname": "cfg",
      "name": "shadow",
      "member": "Ext.util.Floating",
      "type": "String/Boolean",
      "doc": "<p>Specifies whether the floating component should be given a shadow. Set to\n<tt>true</tt> to automatically create an <a href=\"#/api/Ext.Shadow\" rel=\"Ext.Shadow\" class=\"docClass\">Ext.Shadow</a>, or a string indicating the\nshadow's display <a href=\"#/api/Ext.Shadow-cfg-mode\" rel=\"Ext.Shadow-cfg-mode\" class=\"docClass\">Ext.Shadow.mode</a>. Set to <tt>false</tt> to disable the shadow.\n(Defaults to <tt>'sides'</tt>.)</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/util/Floating.js",
      "linenr": 16,
      "html_filename": "Floating.html",
      "href": "Floating.html#Ext-util-Floating-cfg-shadow",
      "shortDoc": "Specifies whether the floating component should be given a shadow. Set to\ntrue to automatically create an Ext.Shadow,..."
    },
    {
      "tagname": "cfg",
      "name": "sortableColumns",
      "member": "Ext.panel.Table",
      "type": "Boolean",
      "doc": "<p>Defaults to true. Set to false to disable column sorting via clicking the\nheader and via the Sorting menu items.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 75,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-cfg-sortableColumns"
    },
    {
      "tagname": "cfg",
      "name": "stateEvents",
      "member": "Ext.state.Stateful",
      "type": "Array",
      "doc": "<p>An array of events that, when fired, should trigger this object to\nsave its state (defaults to none). <code>stateEvents</code> may be any type\nof event supported by this object, including browser or custom events\n(e.g., <tt>['click', 'customerchange']</tt>).</p>\n\n\n<p>See <code><a href=\"#/api/Ext.grid.Panel-cfg-stateful\" rel=\"Ext.grid.Panel-cfg-stateful\" class=\"docClass\">stateful</a></code> for an explanation of saving and\nrestoring object state.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/state/Stateful.js",
      "linenr": 64,
      "html_filename": "Stateful.html",
      "href": "Stateful.html#Ext-state-Stateful-cfg-stateEvents",
      "shortDoc": "An array of events that, when fired, should trigger this object to\nsave its state (defaults to none). stateEvents may..."
    },
    {
      "tagname": "cfg",
      "name": "stateId",
      "member": "Ext.state.Stateful",
      "type": "String",
      "doc": "<p>The unique id for this object to use for state management purposes.</p>\n\n<p>See <a href=\"#/api/Ext.grid.Panel-cfg-stateful\" rel=\"Ext.grid.Panel-cfg-stateful\" class=\"docClass\">stateful</a> for an explanation of saving and restoring state.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/state/Stateful.js",
      "linenr": 58,
      "html_filename": "Stateful.html",
      "href": "Stateful.html#Ext-state-Stateful-cfg-stateId",
      "shortDoc": "The unique id for this object to use for state management purposes.\n\nSee stateful for an explanation of saving and re..."
    },
    {
      "tagname": "cfg",
      "name": "stateful",
      "member": "Ext.state.Stateful",
      "type": "Boolean",
      "doc": "<p>A flag which causes the object to attempt to restore the state of\ninternal properties from a saved state on startup. The object must have\na <code><a href=\"#/api/Ext.grid.Panel-cfg-stateId\" rel=\"Ext.grid.Panel-cfg-stateId\" class=\"docClass\">stateId</a></code> for state to be managed. \nAuto-generated ids are not guaranteed to be stable across page loads and \ncannot be relied upon to save and restore the same state for a object.<p>\n<p>For state saving to work, the state manager's provider must have been\nset to an implementation of <a href=\"#/api/Ext.state.Provider\" rel=\"Ext.state.Provider\" class=\"docClass\">Ext.state.Provider</a> which overrides the\n<a href=\"#/api/Ext.state.Provider-method-set\" rel=\"Ext.state.Provider-method-set\" class=\"docClass\">set</a> and <a href=\"#/api/Ext.state.Provider-method-get\" rel=\"Ext.state.Provider-method-get\" class=\"docClass\">get</a>\nmethods to save and recall name/value pairs. A built-in implementation,\n<a href=\"#/api/Ext.state.CookieProvider\" rel=\"Ext.state.CookieProvider\" class=\"docClass\">Ext.state.CookieProvider</a> is available.</p>\n<p>To set the state provider for the current page:</p>\n<pre><code>Ext.state.Manager.setProvider(new Ext.state.CookieProvider({\n    expires: new Date(new Date().getTime()+(1000*60*60*24*7)), //7 days from now\n}));\n</code></pre>\n<p>A stateful object attempts to save state when one of the events\nlisted in the <code><a href=\"#/api/Ext.grid.Panel-cfg-stateEvents\" rel=\"Ext.grid.Panel-cfg-stateEvents\" class=\"docClass\">stateEvents</a></code> configuration fires.</p>\n<p>To save state, a stateful object first serializes its state by\ncalling <b><code><a href=\"#/api/Ext.grid.Panel-method-getState\" rel=\"Ext.grid.Panel-method-getState\" class=\"docClass\">getState</a></code></b>. By default, this function does\nnothing. The developer must provide an implementation which returns an\nobject hash which represents the restorable state of the object.</p>\n<p>The value yielded by getState is passed to <a href=\"#/api/Ext.state.Manager-method-set\" rel=\"Ext.state.Manager-method-set\" class=\"docClass\">Ext.state.Manager.set</a>\nwhich uses the configured <a href=\"#/api/Ext.state.Provider\" rel=\"Ext.state.Provider\" class=\"docClass\">Ext.state.Provider</a> to save the object\nkeyed by the <code><a href=\"#/api/stateId\" rel=\"stateId\" class=\"docClass\">stateId</a></code></p>.\n<p>During construction, a stateful object attempts to <i>restore</i>\nits state by calling <a href=\"#/api/Ext.state.Manager-method-get\" rel=\"Ext.state.Manager-method-get\" class=\"docClass\">Ext.state.Manager.get</a> passing the\n<code><a href=\"#/api/Ext.grid.Panel-cfg-stateId\" rel=\"Ext.grid.Panel-cfg-stateId\" class=\"docClass\">stateId</a></code></p>\n<p>The resulting object is passed to <b><code><a href=\"#/api/Ext.grid.Panel-method-applyState\" rel=\"Ext.grid.Panel-method-applyState\" class=\"docClass\">applyState</a></code></b>.\nThe default implementation of <code><a href=\"#/api/Ext.grid.Panel-method-applyState\" rel=\"Ext.grid.Panel-method-applyState\" class=\"docClass\">applyState</a></code> simply copies\nproperties into the object, but a developer may override this to support\nmore behaviour.</p>\n<p>You can perform extra processing on state save and restore by attaching\nhandlers to the <a href=\"#/api/Ext.grid.Panel-event-beforestaterestore\" rel=\"Ext.grid.Panel-event-beforestaterestore\" class=\"docClass\">beforestaterestore</a>, <a href=\"#/api/Ext.grid.Panel-event-staterestore\" rel=\"Ext.grid.Panel-event-staterestore\" class=\"docClass\">staterestore</a>,\n<a href=\"#/api/Ext.grid.Panel-event-beforestatesave\" rel=\"Ext.grid.Panel-event-beforestatesave\" class=\"docClass\">beforestatesave</a> and <a href=\"#/api/Ext.grid.Panel-event-statesave\" rel=\"Ext.grid.Panel-event-statesave\" class=\"docClass\">statesave</a> events.</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/state/Stateful.js",
      "linenr": 18,
      "html_filename": "Stateful.html",
      "href": "Stateful.html#Ext-state-Stateful-cfg-stateful",
      "shortDoc": "A flag which causes the object to attempt to restore the state of\ninternal properties from a saved state on startup. ..."
    },
    {
      "tagname": "cfg",
      "name": "style",
      "member": "Ext.AbstractComponent",
      "type": "String",
      "doc": "<p>A custom style specification to be applied to this component's Element.  Should be a valid argument to\n<a href=\"#/api/Ext.core.Element-method-applyStyles\" rel=\"Ext.core.Element-method-applyStyles\" class=\"docClass\">Ext.core.Element.applyStyles</a>.</p>\n\n<pre><code>        new Ext.panel.Panel({\n            title: 'Some Title',\n            renderTo: Ext.getBody(),\n            width: 400, height: 300,\n            layout: 'form',\n            items: [{\n                xtype: 'textarea',\n                style: {\n                    width: '95%',\n                    marginBottom: '10px'\n                }\n            },\n            new Ext.button.Button({\n                text: 'Send',\n                minWidth: '100',\n                style: {\n                    marginBottom: '10px'\n                }\n            })\n            ]\n        });\n     </code></pre>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 300,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-style",
      "shortDoc": "A custom style specification to be applied to this component's Element.  Should be a valid argument to\nExt.core.Eleme..."
    },
    {
      "tagname": "cfg",
      "name": "styleHtmlCls",
      "member": "Ext.AbstractComponent",
      "type": "String",
      "doc": "<p>The class that is added to the content target when you set styleHtmlContent to true.\nDefaults to 'x-html'</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 434,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-styleHtmlCls"
    },
    {
      "tagname": "cfg",
      "name": "styleHtmlContent",
      "member": "Ext.AbstractComponent",
      "type": "Boolean",
      "doc": "<p>True to automatically style the html inside the content target of this component (body for panels).\nDefaults to false.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 427,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-styleHtmlContent"
    },
    {
      "tagname": "cfg",
      "name": "suspendLayout",
      "member": "Ext.container.AbstractContainer",
      "type": "Boolean",
      "doc": "<p>If true, suspend calls to doLayout.  Useful when batching multiple adds to a container and not passing them\nas multiple arguments or an array.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 155,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-cfg-suspendLayout",
      "shortDoc": "If true, suspend calls to doLayout.  Useful when batching multiple adds to a container and not passing them\nas multip..."
    },
    {
      "tagname": "cfg",
      "name": "tbar",
      "member": "Ext.panel.Panel",
      "type": "Object/Array",
      "doc": "<p>Convenience method. Short for 'Top Bar'.</p>\n\n<pre><code>tbar: [\n  { xtype: 'button', text: 'Button 1' }\n]\n</code></pre>\n\n<p>is equivalent to</p>\n\n<pre><code>dockedItems: [{\n    xtype: 'toolbar',\n    dock: 'top',\n    items: [\n        { xtype: 'button', text: 'Button 1' }\n    ]\n}]\n</code></pre>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 457,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-tbar",
      "shortDoc": "Convenience method. Short for 'Top Bar'.\n\ntbar: [\n  { xtype: 'button', text: 'Button 1' }\n]\n\n\nis equivalent to\n\ndocke..."
    },
    {
      "tagname": "cfg",
      "name": "titleCollapse",
      "member": "Ext.panel.Panel",
      "type": "Boolean",
      "doc": "<p><code>true</code> to allow expanding and collapsing the panel (when <code><a href=\"#/api/Ext.grid.Panel-cfg-collapsible\" rel=\"Ext.grid.Panel-cfg-collapsible\" class=\"docClass\">collapsible</a> = true</code>)\nby clicking anywhere in the header bar, <code>false</code>) to allow it only by clicking to tool button\n(defaults to <code>false</code>)).</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 150,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-titleCollapse",
      "shortDoc": "true to allow expanding and collapsing the panel (when collapsible = true)\nby clicking anywhere in the header bar, fa..."
    },
    {
      "tagname": "cfg",
      "name": "toFrontOnShow",
      "member": "Ext.Component",
      "type": "Boolean",
      "doc": "<p>True to automatically call <a href=\"#/api/Ext.grid.Panel-method-toFront\" rel=\"Ext.grid.Panel-method-toFront\" class=\"docClass\">toFront</a> when the <a href=\"#/api/Ext.grid.Panel-event-show\" rel=\"Ext.grid.Panel-event-show\" class=\"docClass\">show</a> method is called\non an already visible, floating component (default is <code>true</code>).</p>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 199,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-cfg-toFrontOnShow",
      "shortDoc": "True to automatically call toFront when the show method is called\non an already visible, floating component (default ..."
    },
    {
      "tagname": "cfg",
      "name": "tools",
      "member": "Ext.panel.Panel",
      "type": "Array",
      "doc": "<p>An array of <a href=\"#/api/Ext.panel.Tool\" rel=\"Ext.panel.Tool\" class=\"docClass\">Ext.panel.Tool</a> configs/instances to be added to the header tool area. The tools are stored as child\ncomponents of the header container. They can be accessed using <a href=\"#/api/Ext.grid.Panel-method-down\" rel=\"Ext.grid.Panel-method-down\" class=\"docClass\">down</a> and {#query}, as well as the other\ncomponent methods. The toggle tool is automatically created if <a href=\"#/api/Ext.grid.Panel-cfg-collapsible\" rel=\"Ext.grid.Panel-cfg-collapsible\" class=\"docClass\">collapsible</a> is set to true.</p>\n\n<p>Note that, apart from the toggle tool which is provided when a panel is collapsible, these\ntools only provide the visual button. Any required functionality must be provided by adding\nhandlers that implement the necessary behavior.</p>\n\n\n<p>Example usage:</p>\n\n\n<pre><code>tools:[{\n    type:'refresh',\n    qtip: 'Refresh form Data',\n    // hidden:true,\n    handler: function(event, toolEl, panel){\n        // refresh logic\n    }\n},\n{\n    type:'help',\n    qtip: 'Get Help',\n    handler: function(event, toolEl, panel){\n        // show help here\n    }\n}]\n</code></pre>\n\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 281,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-cfg-tools",
      "shortDoc": "An array of Ext.panel.Tool configs/instances to be added to the header tool area. The tools are stored as child\ncompo..."
    },
    {
      "tagname": "cfg",
      "name": "tpl",
      "member": "Ext.AbstractComponent",
      "type": "Mixed",
      "doc": "<p>An <bold><a href=\"#/api/Ext.Template\" rel=\"Ext.Template\" class=\"docClass\">Ext.Template</a></bold>, <bold><a href=\"#/api/Ext.XTemplate\" rel=\"Ext.XTemplate\" class=\"docClass\">Ext.XTemplate</a></bold>\nor an array of strings to form an <a href=\"#/api/Ext.XTemplate\" rel=\"Ext.XTemplate\" class=\"docClass\">Ext.XTemplate</a>.\nUsed in conjunction with the <code><a href=\"#/api/Ext.grid.Panel-cfg-data\" rel=\"Ext.grid.Panel-cfg-data\" class=\"docClass\">data</a></code> and\n<code><a href=\"#/api/Ext.grid.Panel-cfg-tplWriteMode\" rel=\"Ext.grid.Panel-cfg-tplWriteMode\" class=\"docClass\">tplWriteMode</a></code> configurations.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 231,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-tpl",
      "shortDoc": "An Ext.Template, Ext.XTemplate\nor an array of strings to form an Ext.XTemplate.\nUsed in conjunction with the data and..."
    },
    {
      "tagname": "cfg",
      "name": "tplWriteMode",
      "member": "Ext.AbstractComponent",
      "type": "String",
      "doc": "<p>The Ext.(X)Template method to use when\nupdating the content area of the Component. Defaults to <code>'overwrite'</code>\n(see <code><a href=\"#/api/Ext.XTemplate-method-overwrite\" rel=\"Ext.XTemplate-method-overwrite\" class=\"docClass\">Ext.XTemplate.overwrite</a></code>).</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 245,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-tplWriteMode",
      "shortDoc": "The Ext.(X)Template method to use when\nupdating the content area of the Component. Defaults to 'overwrite'\n(see Ext.X..."
    },
    {
      "tagname": "cfg",
      "name": "ui",
      "member": "Ext.AbstractComponent",
      "type": "String/Array",
      "doc": "<p>A set style for a component. Can be a string or an Array of multiple strings (UIs)</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 287,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-ui"
    },
    {
      "tagname": "cfg",
      "name": "width",
      "member": "Ext.AbstractComponent",
      "type": "Number",
      "doc": "<p>The width of this component in pixels.</p>\n",
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 329,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-cfg-width"
    }
  ],
  "method": [
    {
      "tagname": "method",
      "name": "Panel",
      "member": "Ext.panel.Panel",
      "doc": "\n",
      "params": [
        {
          "type": "Object",
          "name": "config",
          "doc": "<p>The config object</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 1,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-method-constructor",
      "shortDoc": "\n"
    },
    {
      "tagname": "method",
      "name": "add",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>Adds <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Component</a>(s) to this Container.</p>\n\n<h2>Description:</h2>\n\n<ul>\n<li>Fires the <a href=\"#/api/Ext.grid.Panel-event-beforeadd\" rel=\"Ext.grid.Panel-event-beforeadd\" class=\"docClass\">beforeadd</a> event before adding.</li>\n<li>The Container's <a href=\"#/api/Ext.grid.Panel-cfg-defaults\" rel=\"Ext.grid.Panel-cfg-defaults\" class=\"docClass\">default config values</a> will be applied\naccordingly (see <code><a href=\"#/api/Ext.grid.Panel-cfg-defaults\" rel=\"Ext.grid.Panel-cfg-defaults\" class=\"docClass\">defaults</a></code> for details).</li>\n<li>Fires the <code><a href=\"#/api/Ext.grid.Panel-event-add\" rel=\"Ext.grid.Panel-event-add\" class=\"docClass\">add</a></code> event after the component has been added.</li>\n</ul>\n\n\n<h2>Notes:</h2>\n\n<p>If the Container is <strong>already rendered</strong> when <code>add</code>\nis called, it will render the newly added Component into its content area.</p>\n\n<p><strong><strong>If</strong></strong> the Container was configured with a size-managing <a href=\"#/api/Ext.grid.Panel-cfg-layout\" rel=\"Ext.grid.Panel-cfg-layout\" class=\"docClass\">layout</a> manager, the Container\nwill recalculate its internal layout at this time too.</p>\n\n<p>Note that the default layout manager simply renders child Components sequentially into the content area and thereafter performs no sizing.</p>\n\n<p>If adding multiple new child Components, pass them as an array to the <code>add</code> method, so that only one layout recalculation is performed.</p>\n\n<pre><code>tb = new <a href=\"#/api/Ext.toolbar.Toolbar\" rel=\"Ext.toolbar.Toolbar\" class=\"docClass\">Ext.toolbar.Toolbar</a>({\n    renderTo: document.body\n});  // toolbar is rendered\ntb.add([{text:'Button 1'}, {text:'Button 2'}]); // add multiple items. (<a href=\"#/api/Ext.grid.Panel-cfg-defaultType\" rel=\"Ext.grid.Panel-cfg-defaultType\" class=\"docClass\">defaultType</a> for <a href=\"#/api/Ext.toolbar.Toolbar\" rel=\"Ext.toolbar.Toolbar\" class=\"docClass\">Toolbar</a> is 'button')\n</code></pre>\n\n<h2>Warning:##</h2>\n\n<p>Components directly managed by the BorderLayout layout manager\nmay not be removed or added.  See the Notes for <a href=\"#/api/Ext.layout.container.Border\" rel=\"Ext.layout.container.Border\" class=\"docClass\">BorderLayout</a>\nfor more details.</p>\n",
      "params": [
        {
          "type": "...Object/Array",
          "name": "Component",
          "doc": "<p>Either one or more Components to add or an Array of Components to add.\nSee <code><a href=\"#/api/Ext.grid.Panel-property-items\" rel=\"Ext.grid.Panel-property-items\" class=\"docClass\">items</a></code> for additional information.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.Component/Array",
        "doc": "<p>The Components that were added.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 423,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-method-add",
      "shortDoc": "Adds Component(s) to this Container.\n\nDescription:\n\n\nFires the beforeadd event before adding.\nThe Container's default..."
    },
    {
      "tagname": "method",
      "name": "addClass",
      "member": "Ext.AbstractComponent",
      "doc": "<p>@deprecated 4.0 Replaced by <a href=\"#/api/Ext.grid.Panel-method-addCls\" rel=\"Ext.grid.Panel-method-addCls\" class=\"docClass\">addCls</a>\nAdds a CSS class to the top level element representing this component.</p>\n",
      "params": [
        {
          "type": "String",
          "name": "cls",
          "doc": "<p>The CSS class name to add</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>Returns the Component to allow method chaining.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2161,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-addClass",
      "shortDoc": "<p>@deprecated 4.0 Replaced by <a href=\"#/api/Ext.grid.Panel-method-addCls\" rel=\"Ext.grid.Panel-method-addCls\" class=\"docClass\">addCls</a>\nAdds a CSS class to the top level element representing this component.</p>\n"
    },
    {
      "tagname": "method",
      "name": "addCls",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Adds a CSS class to the top level element representing this component.</p>\n",
      "params": [
        {
          "type": "String",
          "name": "cls",
          "doc": "<p>The CSS class name to add</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>Returns the Component to allow method chaining.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2139,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-addCls",
      "shortDoc": "<p>Adds a CSS class to the top level element representing this component.</p>\n"
    },
    {
      "tagname": "method",
      "name": "addClsWithUI",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Adds a cls to the uiCls array, which will also call <a href=\"#/api/Ext.grid.Panel--addUIClsToElement\" rel=\"Ext.grid.Panel--addUIClsToElement\" class=\"docClass\">addUIClsToElement</a> and adds\nto all elements of this component.</p>\n",
      "params": [
        {
          "type": "String/Array",
          "name": "cls",
          "doc": "<p>A string or an array of strings to add to the uiCls</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 1346,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-addClsWithUI",
      "shortDoc": "<p>Adds a cls to the uiCls array, which will also call <a href=\"#/api/Ext.grid.Panel--addUIClsToElement\" rel=\"Ext.grid.Panel--addUIClsToElement\" class=\"docClass\">addUIClsToElement</a> and adds\nto all elements of this component.</p>\n"
    },
    {
      "tagname": "method",
      "name": "addDocked",
      "member": "Ext.panel.AbstractPanel",
      "doc": "<p>Adds docked item(s) to the panel.</p>\n",
      "params": [
        {
          "type": "Object/Array",
          "name": "component",
          "doc": "<p>The Component or array of components to add. The components\nmust include a 'dock' parameter on each component to indicate where it should be docked ('top', 'right',\n'bottom', 'left').</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "pos",
          "doc": "<p>(optional) The index at which the Component will be added</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/panel/AbstractPanel.js",
      "linenr": 235,
      "html_filename": "AbstractPanel.html",
      "href": "AbstractPanel.html#Ext-panel-AbstractPanel-method-addDocked",
      "shortDoc": "<p>Adds docked item(s) to the panel.</p>\n"
    },
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
      "name": "addStateEvents",
      "member": "Ext.state.Stateful",
      "doc": "<p>Add events that will trigger the state to be saved.</p>\n",
      "params": [
        {
          "type": "String/Array",
          "name": "events",
          "doc": "<p>The event name or an array of event names.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/state/Stateful.js",
      "linenr": 159,
      "html_filename": "Stateful.html",
      "href": "Stateful.html#Ext-state-Stateful-method-addStateEvents",
      "shortDoc": "<p>Add events that will trigger the state to be saved.</p>\n"
    },
    {
      "tagname": "method",
      "name": "afterComponentLayout",
      "member": "Ext.AbstractComponent",
      "doc": "\n",
      "params": [
        {
          "type": "Number",
          "name": "adjWidth",
          "doc": "<p>The box-adjusted width that was set</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "adjHeight",
          "doc": "<p>The box-adjusted height that was set</p>\n",
          "optional": false
        },
        {
          "type": "Boolean",
          "name": "isSetSize",
          "doc": "<p>Whether or not the height/width are stored on the component permanently</p>\n",
          "optional": false
        },
        {
          "type": "Ext.Component",
          "name": "layoutOwner",
          "doc": "<p>Component which sent the layout. Only used when isSetSize is false.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2481,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-afterComponentLayout",
      "shortDoc": "\n"
    },
    {
      "tagname": "method",
      "name": "alignTo",
      "member": "Ext.util.Floating",
      "doc": "<p>Aligns this floating Component to the specified element</p>\n",
      "params": [
        {
          "type": "Mixed",
          "name": "element",
          "doc": "<p>The element or <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a> to align to. If passing a component, it must\nbe a omponent instance. If a string id is passed, it will be used as an element id.</p>\n",
          "optional": false
        },
        {
          "type": "String",
          "name": "position",
          "doc": "<p>(optional, defaults to \"tl-bl?\") The position to align to (see <a href=\"#/api/Ext.core.Element-method-alignTo\" rel=\"Ext.core.Element-method-alignTo\" class=\"docClass\">Ext.core.Element.alignTo</a> for more details).</p>\n",
          "optional": false
        },
        {
          "type": "Array",
          "name": "offsets",
          "doc": "<p>(optional) Offset the positioning by [x, y]</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "Component",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/util/Floating.js",
      "linenr": 171,
      "html_filename": "Floating.html",
      "href": "Floating.html#Ext-util-Floating-method-alignTo",
      "shortDoc": "<p>Aligns this floating Component to the specified element</p>\n"
    },
    {
      "tagname": "method",
      "name": "animate",
      "member": "Ext.util.Animate",
      "doc": "<p>Perform custom animation on this object.<p>\n<p>This method is applicable to both the the <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Component</a> class and the <a href=\"#/api/Ext.core.Element\" rel=\"Ext.core.Element\" class=\"docClass\">Element</a> class.\nIt performs animated transitions of certain properties of this object over a specified timeline.</p>\n<p>The sole parameter is an object which specifies start property values, end property values, and properties which\ndescribe the timeline. Of the properties listed below, only <b><code>to</code></b> is mandatory.</p>\n<p>Properties include<ul>\n<li><code>from</code> <div class=\"sub-desc\">An object which specifies start values for the properties being animated.\nIf not supplied, properties are animated from current settings. The actual properties which may be animated depend upon\nths object being animated. See the sections below on Element and Component animation.<div></li>\n<li><code>to</code> <div class=\"sub-desc\">An object which specifies end values for the properties being animated.</div></li>\n<li><code>duration</code><div class=\"sub-desc\">The duration <b>in milliseconds</b> for which the animation will run.</div></li>\n<li><code>easing</code> <div class=\"sub-desc\">A string value describing an easing type to modify the rate of change from the default linear to non-linear. Values may be one of:<code><ul>\n<li>ease</li>\n<li>easeIn</li>\n<li>easeOut</li>\n<li>easeInOut</li>\n<li>backIn</li>\n<li>backOut</li>\n<li>elasticIn</li>\n<li>elasticOut</li>\n<li>bounceIn</li>\n<li>bounceOut</li>\n</ul></code></div></li>\n<li><code>keyframes</code> <div class=\"sub-desc\">This is an object which describes the state of animated properties at certain points along the timeline.\nit is an object containing properties who's names are the percentage along the timeline being described and who's values specify the animation state at that point.</div></li>\n<li><code>listeners</code> <div class=\"sub-desc\">This is a standard <a href=\"#/api/Ext.util.Observable-cfg-listeners\" rel=\"Ext.util.Observable-cfg-listeners\" class=\"docClass\">listeners</a> configuration object which may be used\nto inject behaviour at either the <code>beforeanimate</code> event or the <code>afteranimate</code> event.</div></li>\n</ul></p>\n<h3>Animating an <a href=\"#/api/Ext.core.Element\" rel=\"Ext.core.Element\" class=\"docClass\">Element</a></h3>\nWhen animating an Element, the following properties may be specified in <code>from</code>, <code>to</code>, and <code>keyframe</code> objects:<ul>\n<li><code>x</code> <div class=\"sub-desc\">The page X position in pixels.</div></li>\n<li><code>y</code> <div class=\"sub-desc\">The page Y position in pixels</div></li>\n<li><code>left</code> <div class=\"sub-desc\">The element's CSS <code>left</code> value. Units must be supplied.</div></li>\n<li><code>top</code> <div class=\"sub-desc\">The element's CSS <code>top</code> value. Units must be supplied.</div></li>\n<li><code>width</code> <div class=\"sub-desc\">The element's CSS <code>width</code> value. Units must be supplied.</div></li>\n<li><code>height</code> <div class=\"sub-desc\">The element's CSS <code>height</code> value. Units must be supplied.</div></li>\n<li><code>scrollLeft</code> <div class=\"sub-desc\">The element's <code>scrollLeft</code> value.</div></li>\n<li><code>scrollTop</code> <div class=\"sub-desc\">The element's <code>scrollLeft</code> value.</div></li>\n<li><code>opacity</code> <div class=\"sub-desc\">The element's <code>opacity</code> value. This must be a value between <code>0</code> and <code>1</code>.</div></li>\n</ul>\n<p><b>Be aware than animating an Element which is being used by an <a href=\"#/api/Ext\" rel=\"Ext\" class=\"docClass\">Ext</a> Component without in some way informing the Component about the changed element state\nwill result in incorrect Component behaviour. This is because the Component will be using the old state of the element. To avoid this problem, it is now possible to\ndirectly animate certain properties of Components.</b></p>\n<h3>Animating a <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Component</a></h3>\nWhen animating an Element, the following properties may be specified in <code>from</code>, <code>to</code>, and <code>keyframe</code> objects:<ul>\n<li><code>x</code> <div class=\"sub-desc\">The Component's page X position in pixels.</div></li>\n<li><code>y</code> <div class=\"sub-desc\">The Component's page Y position in pixels</div></li>\n<li><code>left</code> <div class=\"sub-desc\">The Component's <code>left</code> value in pixels.</div></li>\n<li><code>top</code> <div class=\"sub-desc\">The Component's <code>top</code> value in pixels.</div></li>\n<li><code>width</code> <div class=\"sub-desc\">The Component's <code>width</code> value in pixels.</div></li>\n<li><code>width</code> <div class=\"sub-desc\">The Component's <code>width</code> value in pixels.</div></li>\n<li><code>dynamic</code> <div class=\"sub-desc\">Specify as true to update the Component's layout (if it is a Container) at every frame\nof the animation. <i>Use sparingly as laying out on every intermediate size change is an expensive operation</i>.</div></li>\n</ul>\n<p>For example, to animate a Window to a new size, ensuring that its internal layout, and any shadow is correct:</p>\n<pre><code>myWindow = Ext.create('Ext.window.Window', {\n    title: 'Test Component animation',\n    width: 500,\n    height: 300,\n    layout: {\n        type: 'hbox',\n        align: 'stretch'\n    },\n    items: [{\n        title: 'Left: 33%',\n        margins: '5 0 5 5',\n        flex: 1\n    }, {\n        title: 'Left: 66%',\n        margins: '5 5 5 5',\n        flex: 2\n    }]\n});\nmyWindow.show();\nmyWindow.header.el.on('click', function() {\n    myWindow.animate({\n        to: {\n            width: (myWindow.getWidth() == 500) ? 700 : 500,\n            height: (myWindow.getHeight() == 300) ? 400 : 300,\n        }\n    });\n});\n</code></pre>\n<p>For performance reasons, by default, the internal layout is only updated when the Window reaches its final <code>\"to\"</code> size. If dynamic updating of the Window's child\nComponents is required, then configure the animation with <code>dynamic: true</code> and the two child items will maintain their proportions during the animation.</p>\n\n",
      "params": [
        {
          "type": "Object",
          "name": "config",
          "doc": "<p>An object containing properties which describe the animation's start and end states, and the timeline of the animation.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Object",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/util/Animate.js",
      "linenr": 207,
      "html_filename": "Animate.html",
      "href": "Animate.html#Ext-util-Animate-method-animate",
      "shortDoc": "Perform custom animation on this object.\nThis method is applicable to both the the Component class and the Element cl..."
    },
    {
      "tagname": "method",
      "name": "applyState",
      "member": "Ext.state.Stateful",
      "doc": "<p>Applies the state to the object. This should be overridden in subclasses to do\nmore complex state operations. By default it applies the state properties onto\nthe current object.</p>\n",
      "params": [
        {
          "type": "Object",
          "name": "state",
          "doc": "<p>The state</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/state/Stateful.js",
      "linenr": 225,
      "html_filename": "Stateful.html",
      "href": "Stateful.html#Ext-state-Stateful-method-applyState",
      "shortDoc": "Applies the state to the object. This should be overridden in subclasses to do\nmore complex state operations. By defa..."
    },
    {
      "tagname": "method",
      "name": "beforeComponentLayout",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Occurs before componentLayout is run. Returning false from this method will prevent the componentLayout\nfrom being executed.</p>\n",
      "params": [
        {
          "type": "Number",
          "name": "adjWidth",
          "doc": "<p>The box-adjusted width that was set</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "adjHeight",
          "doc": "<p>The box-adjusted height that was set</p>\n",
          "optional": false
        },
        {
          "type": "Boolean",
          "name": "isSetSize",
          "doc": "<p>Whether or not the height/width are stored on the component permanently</p>\n",
          "optional": false
        },
        {
          "type": "Ext.Component",
          "name": "layoutOwner",
          "doc": "<p>Component which sent the layout. Only used when isSetSize is false.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2491,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-beforeComponentLayout",
      "shortDoc": "Occurs before componentLayout is run. Returning false from this method will prevent the componentLayout\nfrom being ex..."
    },
    {
      "tagname": "method",
      "name": "beforeLayout",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>Occurs before componentLayout is run. Returning false from this method will prevent the containerLayout\nfrom being executed.</p>\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 853,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-method-beforeLayout",
      "shortDoc": "Occurs before componentLayout is run. Returning false from this method will prevent the containerLayout\nfrom being ex..."
    },
    {
      "tagname": "method",
      "name": "bubble",
      "member": "Ext.Component",
      "doc": "<p>Bubbles up the component/container heirarchy, calling the specified function with each component. The scope (<i>this</i>) of\nfunction call will be the scope provided or the current component. The arguments to the function\nwill be the args provided or the current component. If the function returns false at any point,\nthe bubble is stopped.</p>\n",
      "params": [
        {
          "type": "Function",
          "name": "fn",
          "doc": "<p>The function to call</p>\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "scope",
          "doc": "<p>(optional) The scope of the function (defaults to current node)</p>\n",
          "optional": true
        },
        {
          "type": "Array",
          "name": "args",
          "doc": "<p>(optional) The args to call the function with (default to passing the current component)</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 1004,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-method-bubble",
      "shortDoc": "Bubbles up the component/container heirarchy, calling the specified function with each component. The scope (this) of..."
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
      "name": "cascade",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>Cascades down the component/container heirarchy from this component (passed in the first call), calling the specified function with\neach component. The scope (<code>this</code> reference) of the\nfunction call will be the scope provided or the current component. The arguments to the function\nwill be the args provided or the current component. If the function returns false at any point,\nthe cascade is stopped on that branch.</p>\n",
      "params": [
        {
          "type": "Function",
          "name": "fn",
          "doc": "<p>The function to call</p>\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "scope",
          "doc": "<p>(optional) The scope of the function (defaults to current component)</p>\n",
          "optional": true
        },
        {
          "type": "Array",
          "name": "args",
          "doc": "<p>(optional) The args to call the function with. The current component always passed as the last argument.</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "Ext.Container",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 717,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-method-cascade",
      "shortDoc": "Cascades down the component/container heirarchy from this component (passed in the first call), calling the specified..."
    },
    {
      "tagname": "method",
      "name": "center",
      "member": "Ext.util.Floating",
      "doc": "<p>Center this Component in its container.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Component",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/util/Floating.js",
      "linenr": 249,
      "html_filename": "Floating.html",
      "href": "Floating.html#Ext-util-Floating-method-center",
      "shortDoc": "<p>Center this Component in its container.</p>\n"
    },
    {
      "tagname": "method",
      "name": "child",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>Retrieves the first direct child of this container which matches the passed selector.\nThe passed in selector must comply with an <a href=\"#/api/Ext.ComponentQuery\" rel=\"Ext.ComponentQuery\" class=\"docClass\">Ext.ComponentQuery</a> selector.</p>\n",
      "params": [
        {
          "type": "String",
          "name": "selector",
          "doc": "<p>An <a href=\"#/api/Ext.ComponentQuery\" rel=\"Ext.ComponentQuery\" class=\"docClass\">Ext.ComponentQuery</a> selector</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "<p>Ext.Component</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 782,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-method-child",
      "shortDoc": "Retrieves the first direct child of this container which matches the passed selector.\nThe passed in selector must com..."
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
      "name": "cloneConfig",
      "member": "Ext.Component",
      "doc": "<p>Clone the current component using the original config values passed into this instance by default.</p>\n",
      "params": [
        {
          "type": "Object",
          "name": "overrides",
          "doc": "<p>A new config containing any properties to override in the cloned version.\nAn id property can be passed on this object, otherwise one will be generated to avoid duplicates.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>clone The cloned copy of this component</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 944,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-method-cloneConfig",
      "shortDoc": "<p>Clone the current component using the original config values passed into this instance by default.</p>\n"
    },
    {
      "tagname": "method",
      "name": "close",
      "member": "Ext.panel.Panel",
      "doc": "<p>Closes the Panel. By default, this method, removes it from the DOM, <a href=\"#/api/Ext.Component-event-destroy\" rel=\"Ext.Component-event-destroy\" class=\"docClass\">destroy</a>s\nthe Panel object and all its descendant Components. The <a href=\"#/api/Ext.grid.Panel--beforeclose\" rel=\"Ext.grid.Panel--beforeclose\" class=\"docClass\">beforeclose</a>\nevent is fired before the close happens and will cancel the close action if it returns false.<p>\n<p><b>Note:</b> This method is not affected by the <a href=\"#/api/Ext.grid.Panel-cfg-closeAction\" rel=\"Ext.grid.Panel-cfg-closeAction\" class=\"docClass\">closeAction</a> setting which\nonly affects the action triggered when clicking the <a href=\"#/api/Ext.grid.Panel-cfg-closable\" rel=\"Ext.grid.Panel-cfg-closable\" class=\"docClass\">'close' tool in the header</a>.\nTo hide the Panel without destroying it, call <a href=\"#/api/Ext.grid.Panel-event-hide\" rel=\"Ext.grid.Panel-event-hide\" class=\"docClass\">hide</a>.</p>\n\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 698,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-method-close",
      "shortDoc": "Closes the Panel. By default, this method, removes it from the DOM, destroys\nthe Panel object and all its descendant ..."
    },
    {
      "tagname": "method",
      "name": "collapse",
      "member": "Ext.panel.Panel",
      "doc": "<p>Collapses the panel body so that the body becomes hidden. Docked Components parallel to the\nborder towards which the collapse takes place will remain visible.  Fires the <a href=\"#/api/Ext.grid.Panel--beforecollapse\" rel=\"Ext.grid.Panel--beforecollapse\" class=\"docClass\">beforecollapse</a> event which will\ncancel the collapse action if it returns false.</p>\n",
      "params": [
        {
          "type": "Number",
          "name": "direction",
          "doc": "<p>. The direction to collapse towards. Must be one of<ul>\n<li>Ext.Component.DIRECTION_TOP</li>\n<li>Ext.Component.DIRECTION_RIGHT</li>\n<li>Ext.Component.DIRECTION_BOTTOM</li>\n<li>Ext.Component.DIRECTION_LEFT</li></ul></p>\n",
          "optional": false
        },
        {
          "type": "Boolean",
          "name": "animate",
          "doc": "<p>True to animate the transition, else false (defaults to the value of the\n<a href=\"#/api/Ext.grid.Panel-cfg-animCollapse\" rel=\"Ext.grid.Panel-cfg-animCollapse\" class=\"docClass\">animCollapse</a> panel config)</p>\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "internal",
          "doc": "\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.panel.Panel",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 842,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-method-collapse",
      "shortDoc": "Collapses the panel body so that the body becomes hidden. Docked Components parallel to the\nborder towards which the ..."
    },
    {
      "tagname": "method",
      "name": "destroy",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Destroys the Component.</p>\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2672,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-destroy",
      "shortDoc": "<p>Destroys the Component.</p>\n"
    },
    {
      "tagname": "method",
      "name": "determineScrollbars",
      "member": "Ext.panel.Table",
      "doc": "<p>Request a recalculation of scrollbars and put them in if they are needed.</p>\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 729,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-method-determineScrollbars",
      "shortDoc": "<p>Request a recalculation of scrollbars and put them in if they are needed.</p>\n"
    },
    {
      "tagname": "method",
      "name": "disable",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Disable the component.</p>\n",
      "params": [
        {
          "type": "Boolean",
          "name": "silent",
          "doc": "<p>Passing true, will supress the 'disable' event from being fired.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2078,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-disable",
      "shortDoc": "<p>Disable the component.</p>\n"
    },
    {
      "tagname": "method",
      "name": "doAutoRender",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Handles autoRender.\nFloating Components may have an ownerCt. If they are asking to be constrained, constrain them within that\nownerCt, and have their z-index managed locally. Floating Components are always rendered to document.body</p>\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 816,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-doAutoRender",
      "shortDoc": "Handles autoRender.\nFloating Components may have an ownerCt. If they are asking to be constrained, constrain them wit..."
    },
    {
      "tagname": "method",
      "name": "doComponentLayout",
      "member": "Ext.AbstractComponent",
      "doc": "<p>This method needs to be called whenever you change something on this component that requires the Component's\nlayout to be recalculated.</p>\n",
      "params": [
        {
          "type": "Object",
          "name": "width",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "height",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "isSetSize",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "ownerCt",
          "doc": "\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.container.Container",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2437,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-doComponentLayout",
      "shortDoc": "This method needs to be called whenever you change something on this component that requires the Component's\nlayout t..."
    },
    {
      "tagname": "method",
      "name": "doConstrain",
      "member": "Ext.util.Floating",
      "doc": "<p>Moves this floating Component into a constrain region.</p>\n\n\n<p>By default, this Component is constrained to be within the container it was added to, or the element\nit was rendered to.</p>\n\n\n<p>An alternative constraint may be passed.</p>\n\n",
      "params": [
        {
          "type": "Mixed",
          "name": "constrainTo",
          "doc": "<p>Optional. The Element or <a href=\"#/api/Ext.util.Region\" rel=\"Ext.util.Region\" class=\"docClass\">Region</a> into which this Component is to be constrained.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/util/Floating.js",
      "linenr": 133,
      "html_filename": "Floating.html",
      "href": "Floating.html#Ext-util-Floating-method-doConstrain",
      "shortDoc": "Moves this floating Component into a constrain region.\n\n\nBy default, this Component is constrained to be within the c..."
    },
    {
      "tagname": "method",
      "name": "doLayout",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>Manually force this container's layout to be recalculated.  The framwork uses this internally to refresh layouts\nform most cases.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Ext.container.Container",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 321,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-method-doLayout",
      "shortDoc": "Manually force this container's layout to be recalculated.  The framwork uses this internally to refresh layouts\nform..."
    },
    {
      "tagname": "method",
      "name": "down",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>Retrieves the first descendant of this container which matches the passed selector.\nThe passed in selector must comply with an <a href=\"#/api/Ext.ComponentQuery\" rel=\"Ext.ComponentQuery\" class=\"docClass\">Ext.ComponentQuery</a> selector.</p>\n",
      "params": [
        {
          "type": "String",
          "name": "selector",
          "doc": "<p>An <a href=\"#/api/Ext.ComponentQuery\" rel=\"Ext.ComponentQuery\" class=\"docClass\">Ext.ComponentQuery</a> selector</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "<p>Ext.Component</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 792,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-method-down",
      "shortDoc": "Retrieves the first descendant of this container which matches the passed selector.\nThe passed in selector must compl..."
    },
    {
      "tagname": "method",
      "name": "enable",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Enable the component</p>\n",
      "params": [
        {
          "type": "Boolean",
          "name": "silent",
          "doc": "<p>Passing false will supress the 'enable' event from being fired.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2055,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-enable",
      "shortDoc": "<p>Enable the component</p>\n"
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
      "name": "expand",
      "member": "Ext.panel.Panel",
      "doc": "<p>Expands the panel body so that it becomes visible.  Fires the <a href=\"#/api/Ext.grid.Panel--beforeexpand\" rel=\"Ext.grid.Panel--beforeexpand\" class=\"docClass\">beforeexpand</a> event which will\ncancel the expand action if it returns false.</p>\n",
      "params": [
        {
          "type": "Boolean",
          "name": "animate",
          "doc": "<p>True to animate the transition, else false (defaults to the value of the\n<a href=\"#/api/Ext.grid.Panel-cfg-animCollapse\" rel=\"Ext.grid.Panel-cfg-animCollapse\" class=\"docClass\">animCollapse</a> panel config)</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.panel.Panel",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 1123,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-method-expand",
      "shortDoc": "Expands the panel body so that it becomes visible.  Fires the beforeexpand event which will\ncancel the expand action ..."
    },
    {
      "tagname": "method",
      "name": "findLayoutController",
      "member": "Ext.AbstractComponent",
      "doc": "<p>This method finds the topmost active layout who's processing will eventually determine the size and position of this\nComponent.<p>\n<p>This method is useful when dynamically adding Components into Containers, and some processing must take place after the\nfinal sizing and positioning of the Component has been performed.</p>\n\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 772,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-findLayoutController",
      "shortDoc": "This method finds the topmost active layout who's processing will eventually determine the size and position of this\n..."
    },
    {
      "tagname": "method",
      "name": "findParentBy",
      "member": "Ext.Component",
      "doc": "<p>Find a container above this component at any level by a custom function. If the passed function returns\ntrue, the container will be returned.</p>\n",
      "params": [
        {
          "type": "Function",
          "name": "fn",
          "doc": "<p>The custom function to call with the arguments (container, this component).</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.container.Container",
        "doc": "<p>The first Container for which the custom function returns true</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 975,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-method-findParentBy",
      "shortDoc": "Find a container above this component at any level by a custom function. If the passed function returns\ntrue, the con..."
    },
    {
      "tagname": "method",
      "name": "findParentByType",
      "member": "Ext.Component",
      "doc": "<p>Find a container above this component at any level by xtype or class</p>\n\n\n<p>See also the <a href=\"#/api/Ext.Component-method-up\" rel=\"Ext.Component-method-up\" class=\"docClass\">up</a> method.</p>\n\n",
      "params": [
        {
          "type": "String/Class",
          "name": "xtype",
          "doc": "<p>The xtype string for a component, or the class of the component directly</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.container.Container",
        "doc": "<p>The first Container which matches the given xtype or class</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 989,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-method-findParentByType",
      "shortDoc": "<p>Find a container above this component at any level by xtype or class</p>\n\n\n<p>See also the <a href=\"#/api/Ext.Component-method-up\" rel=\"Ext.Component-method-up\" class=\"docClass\">up</a> method.</p>\n\n"
    },
    {
      "tagname": "method",
      "name": "fireEvent",
      "member": "Ext.util.Observable",
      "doc": "<p>Fires the specified event with the passed parameters (minus the event name).</p>\n\n\n<p>An event may be set to bubble up an Observable parent hierarchy (See <a href=\"#/api/Ext.Component-method-getBubbleTarget\" rel=\"Ext.Component-method-getBubbleTarget\" class=\"docClass\">Ext.Component.getBubbleTarget</a>)\nby calling <a href=\"#/api/Ext.grid.Panel-method-enableBubble\" rel=\"Ext.grid.Panel-method-enableBubble\" class=\"docClass\">enableBubble</a>.</p>\n\n",
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
      "name": "focus",
      "member": "Ext.Component",
      "doc": "<p>Try to focus this component.</p>\n",
      "params": [
        {
          "type": "Boolean",
          "name": "selectText",
          "doc": "<p>(optional) If applicable, true to also select the text in this component</p>\n",
          "optional": true
        },
        {
          "type": "Boolean/Number",
          "name": "delay",
          "doc": "<p>(optional) Delay the focus this number of milliseconds (true for 10 milliseconds).</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 853,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-method-focus",
      "shortDoc": "<p>Try to focus this component.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getActiveAnimation",
      "member": "Ext.util.Animate",
      "doc": "<p>Returns thq current animation if this object has any effects actively running or queued, else returns false.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Mixed",
        "doc": "<p>anim if element has active effects, else false</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/util/Animate.js",
      "linenr": 377,
      "html_filename": "Animate.html",
      "href": "Animate.html#Ext-util-Animate-method-getActiveAnimation",
      "shortDoc": "<p>Returns thq current animation if this object has any effects actively running or queued, else returns false.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getBox",
      "member": "Ext.Component",
      "doc": "<p>Gets the current box measurements of the component's underlying element.</p>\n",
      "params": [
        {
          "type": "Boolean",
          "name": "local",
          "doc": "<p>(optional) If true the element's left and top are returned instead of page XY (defaults to false)</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "Object",
        "doc": "<p>box An object in the format {x, y, width, height}</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 538,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-method-getBox",
      "shortDoc": "<p>Gets the current box measurements of the component's underlying element.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getBubbleTarget",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Provides the link for Observable's fireEvent method to bubble up the ownership hierarchy.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Ext.container.Container",
        "doc": "<p>the Container which owns this Component.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2276,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-getBubbleTarget",
      "shortDoc": "<p>Provides the link for Observable's fireEvent method to bubble up the ownership hierarchy.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getChildByElement",
      "member": "Ext.container.Container",
      "doc": "<p>Return the immediate child Component in which the passed element is located.</p>\n",
      "params": [
        {
          "type": "Object",
          "name": "el",
          "doc": "<p>The element to test.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Component",
        "doc": "<p>The child item which contains the passed element.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/container/Container.js",
      "linenr": 162,
      "html_filename": "Container.html",
      "href": "Container.html#Ext-container-Container-method-getChildByElement",
      "shortDoc": "<p>Return the immediate child Component in which the passed element is located.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getComponent",
      "member": "Ext.panel.AbstractPanel",
      "doc": "<p>Attempts a default component lookup (see <a href=\"#/api/Ext.container.Container-method-getComponent\" rel=\"Ext.container.Container-method-getComponent\" class=\"docClass\">Ext.container.Container.getComponent</a>). If the component is not found in the normal\nitems, the dockedItems are searched and the matched component (if any) returned (see {@loink #getDockedComponent}). Note that docked\nitems will only be matched by component id or itemId -- if you pass a numeric index only non-docked child components will be searched.</p>\n",
      "params": [
        {
          "type": "String/Number",
          "name": "comp",
          "doc": "<p>The component id, itemId or position to find</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>The component (if found)</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/panel/AbstractPanel.js",
      "linenr": 148,
      "html_filename": "AbstractPanel.html",
      "href": "AbstractPanel.html#Ext-panel-AbstractPanel-method-getComponent",
      "shortDoc": "Attempts a default component lookup (see Ext.container.Container.getComponent). If the component is not found in the ..."
    },
    {
      "tagname": "method",
      "name": "getDockedComponent",
      "member": "Ext.panel.AbstractPanel",
      "doc": "<p>Finds a docked component by id, itemId or position. Also see <a href=\"#/api/Ext.grid.Panel-method-getDockedItems\" rel=\"Ext.grid.Panel-method-getDockedItems\" class=\"docClass\">getDockedItems</a></p>\n",
      "params": [
        {
          "type": "String/Number",
          "name": "comp",
          "doc": "<p>The id, itemId or position of the docked component (see <a href=\"#/api/Ext.grid.Panel-method-getComponent\" rel=\"Ext.grid.Panel-method-getComponent\" class=\"docClass\">getComponent</a> for details)</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>The docked component (if found)</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/panel/AbstractPanel.js",
      "linenr": 136,
      "html_filename": "AbstractPanel.html",
      "href": "AbstractPanel.html#Ext-panel-AbstractPanel-method-getDockedComponent",
      "shortDoc": "<p>Finds a docked component by id, itemId or position. Also see <a href=\"#/api/Ext.grid.Panel-method-getDockedItems\" rel=\"Ext.grid.Panel-method-getDockedItems\" class=\"docClass\">getDockedItems</a></p>\n"
    },
    {
      "tagname": "method",
      "name": "getDockedItems",
      "member": "Ext.panel.AbstractPanel",
      "doc": "<p>Retrieve an array of all currently docked Components.</p>\n",
      "params": [
        {
          "type": "String",
          "name": "cqSelector",
          "doc": "<p>A <a href=\"#/api/Ext.ComponentQuery\" rel=\"Ext.ComponentQuery\" class=\"docClass\">ComponentQuery</a> selector string to filter the returned items.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Array",
        "doc": "<p>An array of components.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/panel/AbstractPanel.js",
      "linenr": 329,
      "html_filename": "AbstractPanel.html",
      "href": "AbstractPanel.html#Ext-panel-AbstractPanel-method-getDockedItems",
      "shortDoc": "<p>Retrieve an array of all currently docked Components.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getEl",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Retrieves the top level element representing this component.</p>\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 1892,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-getEl",
      "shortDoc": "<p>Retrieves the top level element representing this component.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getHeight",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Gets the current height of the component's underlying element.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Number",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2579,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-getHeight",
      "shortDoc": "<p>Gets the current height of the component's underlying element.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getId",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Retrieves the id of this component.\nWill autogenerate an id if one has not already been set.</p>\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 1880,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-getId",
      "shortDoc": "<p>Retrieves the id of this component.\nWill autogenerate an id if one has not already been set.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getInsertPosition",
      "member": "Ext.AbstractComponent",
      "doc": "<p>This function takes the position argument passed to onRender and returns a\nDOM element that you can use in the insertBefore.</p>\n",
      "params": [
        {
          "type": "String/Number/Element/HTMLElement",
          "name": "position",
          "doc": "<p>Index, element id or element you want\nto put this component before.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "HTMLElement",
        "doc": "<p>DOM element that you can use in the insertBefore</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 1513,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-getInsertPosition",
      "shortDoc": "This function takes the position argument passed to onRender and returns a\nDOM element that you can use in the insert..."
    },
    {
      "tagname": "method",
      "name": "getLayout",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>Returns the <a href=\"#/api/Ext.layout.container.AbstractContainer\" rel=\"Ext.layout.container.AbstractContainer\" class=\"docClass\">layout</a> instance currently associated with this Container.\nIf a layout has not been instantiated yet, that is done first</p>\n",
      "params": [

      ],
      "return": {
        "type": "Ext.layout.container.AbstractContainer",
        "doc": "<p>The layout</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 307,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-method-getLayout",
      "shortDoc": "Returns the layout instance currently associated with this Container.\nIf a layout has not been instantiated yet, that..."
    },
    {
      "tagname": "method",
      "name": "getLoader",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Gets the <a href=\"#/api/Ext.ComponentLoader\" rel=\"Ext.ComponentLoader\" class=\"docClass\">Ext.ComponentLoader</a> for this Component.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Ext.ComponentLoader",
        "doc": "<p>The loader instance, null if it doesn't exist.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2587,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-getLoader",
      "shortDoc": "<p>Gets the <a href=\"#/api/Ext.ComponentLoader\" rel=\"Ext.ComponentLoader\" class=\"docClass\">Ext.ComponentLoader</a> for this Component.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getPlugin",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Retrieves a plugin by its pluginId which has been bound to this\ncomponent.</p>\n",
      "params": [
        {
          "type": "Object",
          "name": "pluginId",
          "doc": "\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.AbstractPlugin",
        "doc": "<p>pluginInstance</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2715,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-getPlugin",
      "shortDoc": "<p>Retrieves a plugin by its pluginId which has been bound to this\ncomponent.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getPosition",
      "member": "Ext.Component",
      "doc": "<p>Gets the current XY position of the component's underlying element.</p>\n",
      "params": [
        {
          "type": "Boolean",
          "name": "local",
          "doc": "<p>(optional) If true the element's left and top are returned instead of page XY (defaults to false)</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "Array",
        "doc": "<p>The XY position of the element (e.g., [100, 200])</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 603,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-method-getPosition",
      "shortDoc": "<p>Gets the current XY position of the component's underlying element.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getSelectionModel",
      "member": "Ext.panel.Table",
      "doc": "<p>Returns the selection model being used and creates it via the configuration\nif it has not been created already.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Ext.selection.Model",
        "doc": "<p>selModel</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 1098,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-method-getSelectionModel",
      "shortDoc": "<p>Returns the selection model being used and creates it via the configuration\nif it has not been created already.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getSize",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Gets the current size of the component's underlying element.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Object",
        "doc": "<p>An object containing the element's size {width: (element width), height: (element height)}</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2563,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-getSize",
      "shortDoc": "<p>Gets the current size of the component's underlying element.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getState",
      "member": "Ext.state.Stateful",
      "doc": "<p>Gets the current state of the object. By default this function returns null,\nit should be overridden in subclasses to implement methods for getting the state.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Object",
        "doc": "<p>The current state</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/state/Stateful.js",
      "linenr": 216,
      "html_filename": "Stateful.html",
      "href": "Stateful.html#Ext-state-Stateful-method-getState",
      "shortDoc": "Gets the current state of the object. By default this function returns null,\nit should be overridden in subclasses to..."
    },
    {
      "tagname": "method",
      "name": "getStateId",
      "member": "Ext.state.Stateful",
      "doc": "<p>Gets the state id for this object.</p>\n",
      "params": [

      ],
      "return": {
        "type": "String",
        "doc": "<p>The state id, null if not found.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/state/Stateful.js",
      "linenr": 237,
      "html_filename": "Stateful.html",
      "href": "Stateful.html#Ext-state-Stateful-method-getStateId",
      "shortDoc": "<p>Gets the state id for this object.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getStore",
      "member": "Ext.panel.Table",
      "doc": "<p>Returns the store associated with this Panel.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Ext.data.Store",
        "doc": "<p>The store</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 608,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-method-getStore",
      "shortDoc": "<p>Returns the store associated with this Panel.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getView",
      "member": "Ext.panel.Table",
      "doc": "<p>Gets the view for this panel.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Ext.view.Table",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 616,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-method-getView",
      "shortDoc": "<p>Gets the view for this panel.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getWidth",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Gets the current width of the component's underlying element.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Number",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2571,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-getWidth",
      "shortDoc": "<p>Gets the current width of the component's underlying element.</p>\n"
    },
    {
      "tagname": "method",
      "name": "getXType",
      "member": "Ext.Component",
      "doc": "<p>Gets the xtype for this component as registered with <a href=\"#/api/Ext.ComponentManager\" rel=\"Ext.ComponentManager\" class=\"docClass\">Ext.ComponentManager</a>. For a list of all\navailable xtypes, see the <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a> header. Example usage:</p>\n\n<pre><code>var t = new Ext.form.field.Text();\nalert(t.getXType());  // alerts 'textfield'\n</code></pre>\n\n",
      "params": [

      ],
      "return": {
        "type": "String",
        "doc": "<p>The xtype</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 962,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-method-getXType",
      "shortDoc": "Gets the xtype for this component as registered with Ext.ComponentManager. For a list of all\navailable xtypes, see th..."
    },
    {
      "tagname": "method",
      "name": "getXTypes",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Returns this Component's xtype hierarchy as a slash-delimited string. For a list of all\navailable xtypes, see the <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a> header.</p>\n\n\n<p><b>If using your own subclasses, be aware that a Component must register its own xtype\nto participate in determination of inherited xtypes.</b></p>\n\n\n<p>Example usage:</p>\n\n\n<pre><code>var t = new Ext.form.field.Text();\nalert(t.getXTypes());  // alerts 'component/field/textfield'\n</code></pre>\n\n",
      "params": [

      ],
      "return": {
        "type": "String",
        "doc": "<p>The xtype hierarchy string</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 1938,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-getXTypes",
      "shortDoc": "Returns this Component's xtype hierarchy as a slash-delimited string. For a list of all\navailable xtypes, see the Ext..."
    },
    {
      "tagname": "method",
      "name": "hasActiveFx",
      "member": "Ext.util.Animate",
      "doc": "<p>@deprecated 4.0 Replaced by <a href=\"#/api/Ext.grid.Panel-method-getActiveAnimation\" rel=\"Ext.grid.Panel-method-getActiveAnimation\" class=\"docClass\">getActiveAnimation</a>\nReturns thq current animation if this object has any effects actively running or queued, else returns false.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Mixed",
        "doc": "<p>anim if element has active effects, else false</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/util/Animate.js",
      "linenr": 369,
      "html_filename": "Animate.html",
      "href": "Animate.html#Ext-util-Animate-method-hasActiveFx",
      "shortDoc": "@deprecated 4.0 Replaced by getActiveAnimation\nReturns thq current animation if this object has any effects actively ..."
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
      "name": "hasUICls",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Checks if there is currently a specified uiCls</p>\n",
      "params": [
        {
          "type": "String",
          "name": "cls",
          "doc": "<p>The cls to check</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 1389,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-hasUICls",
      "shortDoc": "<p>Checks if there is currently a specified uiCls</p>\n"
    },
    {
      "tagname": "method",
      "name": "hide",
      "member": "Ext.Component",
      "doc": "<p>Hides this Component, setting it to invisible using the configured <a href=\"#/api/Ext.grid.Panel-cfg-hideMode\" rel=\"Ext.grid.Panel-cfg-hideMode\" class=\"docClass\">hideMode</a>.</p>\n",
      "params": [
        {
          "type": "String/Element/Component",
          "name": "animateTarget",
          "doc": "<p>Optional, and <b>only valid for <a href=\"#/api/Ext.grid.Panel-cfg-floating\" rel=\"Ext.grid.Panel-cfg-floating\" class=\"docClass\">floating</a> Components such as\n<a href=\"#/api/Ext.window.Window\" rel=\"Ext.window.Window\" class=\"docClass\">Window</a>s or <a href=\"#/api/Ext.tip.ToolTip\" rel=\"Ext.tip.ToolTip\" class=\"docClass\">ToolTip</a>s, or regular Components which have been configured\nwith <code>floating: true</code>.</b>.\nThe target to which the Component should animate while hiding (defaults to null with no animation)</p>\n",
          "optional": false
        },
        {
          "type": "Function",
          "name": "callback",
          "doc": "<p>(optional) A callback function to call after the Component is hidden.</p>\n",
          "optional": true
        },
        {
          "type": "Object",
          "name": "scope",
          "doc": "<p>(optional) The scope (<code>this</code> reference) in which the callback is executed. Defaults to this Component.</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 748,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-method-hide",
      "shortDoc": "<p>Hides this Component, setting it to invisible using the configured <a href=\"#/api/Ext.grid.Panel-cfg-hideMode\" rel=\"Ext.grid.Panel-cfg-hideMode\" class=\"docClass\">hideMode</a>.</p>\n"
    },
    {
      "tagname": "method",
      "name": "hideHorizontalScroller",
      "member": "Ext.panel.Table",
      "doc": "<p>Hide the verticalScroller and remove the horizontalScrollerPresentCls.</p>\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 785,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-method-hideHorizontalScroller",
      "shortDoc": "<p>Hide the verticalScroller and remove the horizontalScrollerPresentCls.</p>\n"
    },
    {
      "tagname": "method",
      "name": "hideVerticalScroller",
      "member": "Ext.panel.Table",
      "doc": "<p>Hide the verticalScroller and remove the verticalScrollerPresentCls.</p>\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 818,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-method-hideVerticalScroller",
      "shortDoc": "<p>Hide the verticalScroller and remove the verticalScrollerPresentCls.</p>\n"
    },
    {
      "tagname": "method",
      "name": "insert",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>Inserts a Component into this Container at a specified index. Fires the\n<a href=\"#/api/Ext.grid.Panel-event-beforeadd\" rel=\"Ext.grid.Panel-event-beforeadd\" class=\"docClass\">beforeadd</a> event before inserting, then fires the <a href=\"#/api/Ext.grid.Panel-event-add\" rel=\"Ext.grid.Panel-event-add\" class=\"docClass\">add</a> event after the\nComponent has been inserted.</p>\n",
      "params": [
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The index at which the Component will be inserted\ninto the Container's items collection</p>\n",
          "optional": false
        },
        {
          "type": "Ext.Component",
          "name": "component",
          "doc": "<p>The child Component to insert.<br><br>\n<a href=\"#/api/Ext\" rel=\"Ext\" class=\"docClass\">Ext</a> uses lazy rendering, and will only render the inserted Component should\nit become necessary.<br><br>\nA Component config object may be passed in order to avoid the overhead of\nconstructing a real Component object if lazy rendering might mean that the\ninserted Component will not be rendered immediately. To take advantage of\nthis 'lazy instantiation', set the <a href=\"#/api/Ext.Component--xtype\" rel=\"Ext.Component--xtype\" class=\"docClass\">Ext.Component.xtype</a> config\nproperty to the registered type of the Component wanted.<br><br>\nFor a list of all available xtypes, see <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a>.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>component The Component (or config object) that was\ninserted with the Container's default config values applied.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 547,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-method-insert",
      "shortDoc": "Inserts a Component into this Container at a specified index. Fires the\nbeforeadd event before inserting, then fires ..."
    },
    {
      "tagname": "method",
      "name": "insertDocked",
      "member": "Ext.panel.AbstractPanel",
      "doc": "<p>Inserts docked item(s) to the panel at the indicated position.</p>\n",
      "params": [
        {
          "type": "Number",
          "name": "pos",
          "doc": "<p>The index at which the Component will be inserted</p>\n",
          "optional": false
        },
        {
          "type": "Object/Array",
          "name": "component",
          "doc": "<p>. The Component or array of components to add. The components\nmust include a 'dock' paramater on each component to indicate where it should be docked ('top', 'right',\n'bottom', 'left').</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/panel/AbstractPanel.js",
      "linenr": 278,
      "html_filename": "AbstractPanel.html",
      "href": "AbstractPanel.html#Ext-panel-AbstractPanel-method-insertDocked",
      "shortDoc": "<p>Inserts docked item(s) to the panel at the indicated position.</p>\n"
    },
    {
      "tagname": "method",
      "name": "invalidateScroller",
      "member": "Ext.panel.Table",
      "doc": "<p>Invalides scrollers that are present and forces a recalculation.\n(Not related to showing/hiding the scrollers)</p>\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 858,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-method-invalidateScroller",
      "shortDoc": "<p>Invalides scrollers that are present and forces a recalculation.\n(Not related to showing/hiding the scrollers)</p>\n"
    },
    {
      "tagname": "method",
      "name": "is",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Tests whether this Component matches the selector string.</p>\n",
      "params": [
        {
          "type": "String",
          "name": "selector",
          "doc": "<p>The selector string to test against.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Boolean",
        "doc": "<p>True if this Component matches the selector.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 1719,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-is",
      "shortDoc": "<p>Tests whether this Component matches the selector string.</p>\n"
    },
    {
      "tagname": "method",
      "name": "isDescendantOf",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Determines whether this component is the descendant of a particular container.</p>\n",
      "params": [
        {
          "type": "Ext.Container",
          "name": "container",
          "doc": "\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Boolean",
        "doc": "<p>isDescendant</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2731,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-isDescendantOf",
      "shortDoc": "<p>Determines whether this component is the descendant of a particular container.</p>\n"
    },
    {
      "tagname": "method",
      "name": "isDisabled",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Method to determine whether this Component is currently disabled.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Boolean",
        "doc": "<p>the disabled state of this Component.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2115,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-isDisabled",
      "shortDoc": "<p>Method to determine whether this Component is currently disabled.</p>\n"
    },
    {
      "tagname": "method",
      "name": "isDraggable",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Method to determine whether this Component is draggable.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Boolean",
        "doc": "<p>the draggable state of this component.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2292,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-isDraggable",
      "shortDoc": "<p>Method to determine whether this Component is draggable.</p>\n"
    },
    {
      "tagname": "method",
      "name": "isDroppable",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Method to determine whether this Component is droppable.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Boolean",
        "doc": "<p>the droppable state of this component.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2300,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-isDroppable",
      "shortDoc": "<p>Method to determine whether this Component is droppable.</p>\n"
    },
    {
      "tagname": "method",
      "name": "isFloating",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Method to determine whether this Component is floating.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Boolean",
        "doc": "<p>the floating state of this component.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2284,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-isFloating",
      "shortDoc": "<p>Method to determine whether this Component is floating.</p>\n"
    },
    {
      "tagname": "method",
      "name": "isHidden",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Method to determine whether this Component is currently set to hidden.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Boolean",
        "doc": "<p>the hidden state of this Component.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2131,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-isHidden",
      "shortDoc": "<p>Method to determine whether this Component is currently set to hidden.</p>\n"
    },
    {
      "tagname": "method",
      "name": "isVisible",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Returns true if this component is visible.</p>\n",
      "params": [
        {
          "type": "Boolean",
          "name": "deep",
          "doc": "<p>. <p>Optional. Pass <code>true</code> to interrogate the visibility status of all\nparent Containers to determine whether this Component is truly visible to the user.</p></p>\n\n<p>Generally, to determine whether a Component is hidden, the no argument form is needed. For example\nwhen creating dynamically laid out UIs in a hidden Container before showing them.</p>\n\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Boolean",
        "doc": "<p>True if this component is visible, false otherwise.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2015,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-isVisible",
      "shortDoc": "<p>Returns true if this component is visible.</p>\n"
    },
    {
      "tagname": "method",
      "name": "isXType",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Tests whether or not this Component is of a specific xtype. This can test whether this Component is descended\nfrom the xtype (default) or whether it is directly of the xtype specified (shallow = true).</p>\n\n\n<p><b>If using your own subclasses, be aware that a Component must register its own xtype\nto participate in determination of inherited xtypes.</b></p>\n\n\n<p>For a list of all available xtypes, see the <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a> header.</p>\n\n\n<p>Example usage:</p>\n\n\n<pre><code>var t = new Ext.form.field.Text();\nvar isText = t.isXType('textfield');        // true\nvar isBoxSubclass = t.isXType('field');       // true, descended from <a href=\"#/api/Ext.form.field.Base\" rel=\"Ext.form.field.Base\" class=\"docClass\">Ext.form.field.Base</a>\nvar isBoxInstance = t.isXType('field', true); // false, not a direct <a href=\"#/api/Ext.form.field.Base\" rel=\"Ext.form.field.Base\" class=\"docClass\">Ext.form.field.Base</a> instance\n</code></pre>\n\n",
      "params": [
        {
          "type": "String",
          "name": "xtype",
          "doc": "<p>The xtype to check for this Component</p>\n",
          "optional": false
        },
        {
          "type": "Boolean",
          "name": "shallow",
          "doc": "<p>(optional) False to check whether this Component is descended from the xtype (this is\nthe default), or true to check whether this Component is directly of the specified xtype.</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "Boolean",
        "doc": "<p>True if this component descends from the specified xtype, false otherwise.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 1907,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-isXType",
      "shortDoc": "Tests whether or not this Component is of a specific xtype. This can test whether this Component is descended\nfrom th..."
    },
    {
      "tagname": "method",
      "name": "move",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>Moves a Component within the Container</p>\n",
      "params": [
        {
          "type": "Number",
          "name": "fromIdx",
          "doc": "<p>The index the Component you wish to move is currently at.</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "toIdx",
          "doc": "<p>The new index for the Component.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>component The Component (or config object) that was moved.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 569,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-method-move",
      "shortDoc": "<p>Moves a Component within the Container</p>\n"
    },
    {
      "tagname": "method",
      "name": "nextNode",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Returns the next node in the Component tree in tree traversal order.</p>\n\n\n<p>Note that this is not limited to siblings, and if invoked upon a node with no matching siblings, will\nwalk the tree to attempt to find a match. Contrast with <a href=\"#/api/Ext.grid.Panel--pnextSibling\" rel=\"Ext.grid.Panel--pnextSibling\" class=\"docClass\">pnextSibling</a>.</p>\n\n",
      "params": [
        {
          "type": "String",
          "name": "selector",
          "doc": "<p>Optional A <a href=\"#/api/Ext.ComponentQuery\" rel=\"Ext.ComponentQuery\" class=\"docClass\">ComponentQuery</a> selector to filter the following nodes.</p>\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "includeSelf",
          "doc": "\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "<p>The next node (or the next node which matches the selector). Returns null if there is no matching node.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 1845,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-nextNode",
      "shortDoc": "Returns the next node in the Component tree in tree traversal order.\n\n\nNote that this is not limited to siblings, and..."
    },
    {
      "tagname": "method",
      "name": "nextSibling",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Returns the next sibling of this Component.</p>\n\n\n<p>Optionally selects the next sibling which matches the passed <a href=\"#/api/Ext.ComponentQuery\" rel=\"Ext.ComponentQuery\" class=\"docClass\">ComponentQuery</a> selector.</p>\n\n\n<p>May also be refered to as <code><b>next()</b></code></p>\n\n\n<p>Note that this is limited to siblings, and if no siblings of the item match, <code>null</code> is returned. Contrast with <a href=\"#/api/Ext.grid.Panel-method-nextNode\" rel=\"Ext.grid.Panel-method-nextNode\" class=\"docClass\">nextNode</a></p>\n\n",
      "params": [
        {
          "type": "String",
          "name": "selector",
          "doc": "<p>Optional A <a href=\"#/api/Ext.ComponentQuery\" rel=\"Ext.ComponentQuery\" class=\"docClass\">ComponentQuery</a> selector to filter the following items.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "<p>The next sibling (or the next sibling which matches the selector). Returns null if there is no matching sibling.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 1749,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-nextSibling",
      "shortDoc": "Returns the next sibling of this Component.\n\n\nOptionally selects the next sibling which matches the passed ComponentQ..."
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
          "doc": "<p>An object containing a series of listeners to add. See <a href=\"#/api/Ext.grid.Panel-method-addListener\" rel=\"Ext.grid.Panel-method-addListener\" class=\"docClass\">addListener</a>.</p>\n",
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
      "doc": "<p>Appends an event handler to this object (shorthand for <a href=\"#/api/Ext.grid.Panel-method-addListener\" rel=\"Ext.grid.Panel-method-addListener\" class=\"docClass\">addListener</a>.)</p>\n",
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
      "shortDoc": "<p>Appends an event handler to this object (shorthand for <a href=\"#/api/Ext.grid.Panel-method-addListener\" rel=\"Ext.grid.Panel-method-addListener\" class=\"docClass\">addListener</a>.)</p>\n"
    },
    {
      "tagname": "method",
      "name": "previousNode",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Returns the previous node in the Component tree in tree traversal order.</p>\n\n\n<p>Note that this is not limited to siblings, and if invoked upon a node with no matching siblings, will\nwalk the tree in reverse order to attempt to find a match. Contrast with <a href=\"#/api/Ext.grid.Panel-method-previousSibling\" rel=\"Ext.grid.Panel-method-previousSibling\" class=\"docClass\">previousSibling</a>.</p>\n\n",
      "params": [
        {
          "type": "String",
          "name": "selector",
          "doc": "<p>Optional. A <a href=\"#/api/Ext.ComponentQuery\" rel=\"Ext.ComponentQuery\" class=\"docClass\">ComponentQuery</a> selector to filter the preceding nodes.</p>\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "includeSelf",
          "doc": "\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "<p>The previous node (or the previous node which matches the selector). Returns null if there is no matching node.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 1809,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-previousNode",
      "shortDoc": "Returns the previous node in the Component tree in tree traversal order.\n\n\nNote that this is not limited to siblings,..."
    },
    {
      "tagname": "method",
      "name": "previousSibling",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Returns the previous sibling of this Component.</p>\n\n\n<p>Optionally selects the previous sibling which matches the passed <a href=\"#/api/Ext.ComponentQuery\" rel=\"Ext.ComponentQuery\" class=\"docClass\">ComponentQuery</a> selector.</p>\n\n\n<p>May also be refered to as <code><b>prev()</b></code></p>\n\n\n<p>Note that this is limited to siblings, and if no siblings of the item match, <code>null</code> is returned. Contrast with <a href=\"#/api/Ext.grid.Panel-method-previousNode\" rel=\"Ext.grid.Panel-method-previousNode\" class=\"docClass\">previousNode</a></p>\n\n",
      "params": [
        {
          "type": "String",
          "name": "selector",
          "doc": "<p>Optional. A <a href=\"#/api/Ext.ComponentQuery\" rel=\"Ext.ComponentQuery\" class=\"docClass\">ComponentQuery</a> selector to filter the preceding items.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "<p>The previous sibling (or the previous sibling which matches the selector). Returns null if there is no matching sibling.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 1779,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-previousSibling",
      "shortDoc": "Returns the previous sibling of this Component.\n\n\nOptionally selects the previous sibling which matches the passed Co..."
    },
    {
      "tagname": "method",
      "name": "query",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>Retrieves all descendant components which match the passed selector.\nExecutes an Ext.ComponentQuery.query using this container as its root.</p>\n",
      "params": [
        {
          "type": "String",
          "name": "selector",
          "doc": "<p>Selector complying to an <a href=\"#/api/Ext.ComponentQuery\" rel=\"Ext.ComponentQuery\" class=\"docClass\">Ext.ComponentQuery</a> selector</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Array",
        "doc": "<p>Ext.Component's which matched the selector</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 772,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-method-query",
      "shortDoc": "Retrieves all descendant components which match the passed selector.\nExecutes an Ext.ComponentQuery.query using this ..."
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
      "name": "remove",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>Removes a component from this container.  Fires the <a href=\"#/api/Ext.grid.Panel-event-beforeremove\" rel=\"Ext.grid.Panel-event-beforeremove\" class=\"docClass\">beforeremove</a> event before removing, then fires\nthe <a href=\"#/api/Ext.grid.Panel-event-remove\" rel=\"Ext.grid.Panel-event-remove\" class=\"docClass\">remove</a> event after the component has been removed.</p>\n",
      "params": [
        {
          "type": "Component/String",
          "name": "component",
          "doc": "<p>The component reference or id to remove.</p>\n",
          "optional": false
        },
        {
          "type": "Boolean",
          "name": "autoDestroy",
          "doc": "<p>(optional) True to automatically invoke the removed Component's <a href=\"#/api/Ext.Component-event-destroy\" rel=\"Ext.Component-event-destroy\" class=\"docClass\">Ext.Component.destroy</a> function.\nDefaults to the value of this Container's <a href=\"#/api/Ext.grid.Panel-cfg-autoDestroy\" rel=\"Ext.grid.Panel-cfg-autoDestroy\" class=\"docClass\">autoDestroy</a> config.</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>component The Component that was removed.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 600,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-method-remove",
      "shortDoc": "Removes a component from this container.  Fires the beforeremove event before removing, then fires\nthe remove event a..."
    },
    {
      "tagname": "method",
      "name": "removeAll",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>Removes all components from this container.</p>\n",
      "params": [
        {
          "type": "Boolean",
          "name": "autoDestroy",
          "doc": "<p>(optional) True to automatically invoke the removed Component's <a href=\"#/api/Ext.Component-event-destroy\" rel=\"Ext.Component-event-destroy\" class=\"docClass\">Ext.Component.destroy</a> function.\nDefaults to the value of this Container's <a href=\"#/api/Ext.grid.Panel-cfg-autoDestroy\" rel=\"Ext.grid.Panel-cfg-autoDestroy\" class=\"docClass\">autoDestroy</a> config.</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "Array",
        "doc": "<p>Array of the destroyed components</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 653,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-method-removeAll",
      "shortDoc": "<p>Removes all components from this container.</p>\n"
    },
    {
      "tagname": "method",
      "name": "removeCls",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Removes a CSS class from the top level element representing this component.</p>\n",
      "params": [
        {
          "type": "Object",
          "name": "className",
          "doc": "\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>Returns the Component to allow method chaining.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2171,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-removeCls",
      "shortDoc": "<p>Removes a CSS class from the top level element representing this component.</p>\n"
    },
    {
      "tagname": "method",
      "name": "removeClsWithUI",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Removes a cls to the uiCls array, which will also call <a href=\"#/api/Ext.grid.Panel--removeUIClsToElement\" rel=\"Ext.grid.Panel--removeUIClsToElement\" class=\"docClass\">removeUIClsToElement</a> and removes\nit from all elements of this component.</p>\n",
      "params": [
        {
          "type": "String/Array",
          "name": "cls",
          "doc": "<p>A string or an array of strings to remove to the uiCls</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 1368,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-removeClsWithUI",
      "shortDoc": "Removes a cls to the uiCls array, which will also call removeUIClsToElement and removes\nit from all elements of this ..."
    },
    {
      "tagname": "method",
      "name": "removeDocked",
      "member": "Ext.panel.AbstractPanel",
      "doc": "<p>Removes the docked item from the panel.</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "item",
          "doc": "<p>. The Component to remove.</p>\n",
          "optional": false
        },
        {
          "type": "Boolean",
          "name": "autoDestroy",
          "doc": "<p>(optional) Destroy the component after removal.</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/panel/AbstractPanel.js",
      "linenr": 289,
      "html_filename": "AbstractPanel.html",
      "href": "AbstractPanel.html#Ext-panel-AbstractPanel-method-removeDocked",
      "shortDoc": "<p>Removes the docked item from the panel.</p>\n"
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
          "doc": "<p>The handler to remove. <b>This must be a reference to the function passed into the <a href=\"#/api/Ext.grid.Panel-method-addListener\" rel=\"Ext.grid.Panel-method-addListener\" class=\"docClass\">addListener</a> call.</b></p>\n",
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
      "doc": "<p>Removes listeners that were added by the <a href=\"#/api/Ext.grid.Panel--mon\" rel=\"Ext.grid.Panel--mon\" class=\"docClass\">mon</a> method.</p>\n",
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
      "shortDoc": "<p>Removes listeners that were added by the <a href=\"#/api/Ext.grid.Panel--mon\" rel=\"Ext.grid.Panel--mon\" class=\"docClass\">mon</a> method.</p>\n"
    },
    {
      "tagname": "method",
      "name": "resumeEvents",
      "member": "Ext.util.Observable",
      "doc": "<p>Resume firing events. (see <a href=\"#/api/Ext.grid.Panel-method-suspendEvents\" rel=\"Ext.grid.Panel-method-suspendEvents\" class=\"docClass\">suspendEvents</a>)\nIf events were suspended using the <code><b>queueSuspended</b></code> parameter, then all\nevents fired during event suspension will be sent to any listeners now.</p>\n",
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
      "name": "scrollByDeltaX",
      "member": "Ext.panel.Table",
      "doc": "<p>Scrolls the TablePanel by deltaX</p>\n",
      "params": [
        {
          "type": "Number",
          "name": "deltaY",
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
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 1060,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-method-scrollByDeltaX",
      "shortDoc": "<p>Scrolls the TablePanel by deltaX</p>\n"
    },
    {
      "tagname": "method",
      "name": "scrollByDeltaY",
      "member": "Ext.panel.Table",
      "doc": "<p>Scrolls the TablePanel by deltaY</p>\n",
      "params": [
        {
          "type": "Number",
          "name": "deltaY",
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
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 1046,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-method-scrollByDeltaY",
      "shortDoc": "<p>Scrolls the TablePanel by deltaY</p>\n"
    },
    {
      "tagname": "method",
      "name": "sequenceFx",
      "member": "Ext.util.Animate",
      "doc": "<p>Ensures that all effects queued after sequenceFx is called on this object are\nrun in sequence.  This is the opposite of <a href=\"#/api/Ext.grid.Panel-method-syncFx\" rel=\"Ext.grid.Panel-method-syncFx\" class=\"docClass\">syncFx</a>.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Object",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/util/Animate.js",
      "linenr": 357,
      "html_filename": "Animate.html",
      "href": "Animate.html#Ext-util-Animate-method-sequenceFx",
      "shortDoc": "Ensures that all effects queued after sequenceFx is called on this object are\nrun in sequence.  This is the opposite ..."
    },
    {
      "tagname": "method",
      "name": "setActive",
      "member": "Ext.util.Floating",
      "doc": "<p>This method is called internally by <a href=\"#/api/Ext.ZIndexManager\" rel=\"Ext.ZIndexManager\" class=\"docClass\">Ext.ZIndexManager</a> to signal that a floating\nComponent has either been moved to the top of its zIndex stack, or pushed from the top of its zIndex stack.</p>\n\n\n<p>If a <i>Window</i> is superceded by another Window, deactivating it hides its shadow.</p>\n\n\n<p>This method also fires the <a href=\"#/api/Ext.grid.Panel-event-activate\" rel=\"Ext.grid.Panel-event-activate\" class=\"docClass\">activate</a> or <a href=\"#/api/Ext.grid.Panel-event-deactivate\" rel=\"Ext.grid.Panel-event-deactivate\" class=\"docClass\">deactivate</a> event depending on which action occurred.</p>\n\n",
      "params": [
        {
          "type": "Boolean",
          "name": "active",
          "doc": "<p>True to activate the Component, false to deactivate it (defaults to false)</p>\n",
          "optional": false
        },
        {
          "type": "Component",
          "name": "newActive",
          "doc": "<p>The newly active Component which is taking over topmost zIndex position.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/util/Floating.js",
      "linenr": 216,
      "html_filename": "Floating.html",
      "href": "Floating.html#Ext-util-Floating-method-setActive",
      "shortDoc": "This method is called internally by Ext.ZIndexManager to signal that a floating\nComponent has either been moved to th..."
    },
    {
      "tagname": "method",
      "name": "setAutoScroll",
      "member": "Ext.Component",
      "doc": "<p>Sets the overflow on the content element of the component.</p>\n",
      "params": [
        {
          "type": "Boolean",
          "name": "scroll",
          "doc": "<p>True to allow the Component to auto scroll.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 359,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-method-setAutoScroll",
      "shortDoc": "<p>Sets the overflow on the content element of the component.</p>\n"
    },
    {
      "tagname": "method",
      "name": "setDisabled",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Enable or disable the component.</p>\n",
      "params": [
        {
          "type": "Boolean",
          "name": "disabled",
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
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2123,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-setDisabled",
      "shortDoc": "<p>Enable or disable the component.</p>\n"
    },
    {
      "tagname": "method",
      "name": "setDocked",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Sets the dock position of this component in its parent panel. Note that\nthis only has effect if this item is part of the dockedItems collection\nof a parent that has a DockLayout (note that any Panel has a DockLayout\nby default)</p>\n",
      "params": [
        {
          "type": "Object",
          "name": "dock",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "layoutParent",
          "doc": "\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Component",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2646,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-setDocked",
      "shortDoc": "Sets the dock position of this component in its parent panel. Note that\nthis only has effect if this item is part of ..."
    },
    {
      "tagname": "method",
      "name": "setHeight",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Sets the height of the component.  This method fires the <a href=\"#/api/Ext.grid.Panel-event-resize\" rel=\"Ext.grid.Panel-event-resize\" class=\"docClass\">resize</a> event.</p>\n",
      "params": [
        {
          "type": "Number",
          "name": "height",
          "doc": "<p>The new height to set. This may be one of:<div class=\"mdetail-params\"><ul>\n<li>A Number specifying the new height in the <a href=\"#/api/Ext.grid.Panel-method-getEl\" rel=\"Ext.grid.Panel-method-getEl\" class=\"docClass\">Element</a>'s <a href=\"#/api/Ext.core.Element-property-defaultUnit\" rel=\"Ext.core.Element-property-defaultUnit\" class=\"docClass\">Ext.core.Element.defaultUnit</a>s (by default, pixels).</li>\n<li>A String used to set the CSS height style.</li>\n<li><i>undefined</i> to leave the height unchanged.</li>\n</ul></div></p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2550,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-setHeight",
      "shortDoc": "<p>Sets the height of the component.  This method fires the <a href=\"#/api/Ext.grid.Panel-event-resize\" rel=\"Ext.grid.Panel-event-resize\" class=\"docClass\">resize</a> event.</p>\n"
    },
    {
      "tagname": "method",
      "name": "setIconCls",
      "member": "Ext.panel.Panel",
      "doc": "<p>Set the iconCls for the panel&#39;s header. See <a href=\"#/api/Ext.panel.Header--iconCls\" rel=\"Ext.panel.Header--iconCls\" class=\"docClass\">Ext.panel.Header.iconCls</a>.</p>\n",
      "params": [
        {
          "type": "String",
          "name": "newIconCls",
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
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 416,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-method-setIconCls",
      "shortDoc": "<p>Set the iconCls for the panel&#39;s header. See <a href=\"#/api/Ext.panel.Header--iconCls\" rel=\"Ext.panel.Header--iconCls\" class=\"docClass\">Ext.panel.Header.iconCls</a>.</p>\n"
    },
    {
      "tagname": "method",
      "name": "setLoading",
      "member": "Ext.AbstractComponent",
      "doc": "<p>This method allows you to show or hide a LoadMask on top of this component.</p>\n",
      "params": [
        {
          "type": "Boolean/Object/String",
          "name": "load",
          "doc": "<p>True to show the default LoadMask, a config object\nthat will be passed to the LoadMask constructor, or a message String to show. False to\nhide the current LoadMask.</p>\n",
          "optional": false
        },
        {
          "type": "Boolean",
          "name": "targetEl",
          "doc": "<p>True to mask the targetEl of this Component instead of the this.el.\nFor example, setting this to true on a Panel will cause only the body to be masked. (defaults to false)</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.LoadMask",
        "doc": "<p>The LoadMask instance that has just been shown.</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2611,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-setLoading",
      "shortDoc": "<p>This method allows you to show or hide a LoadMask on top of this component.</p>\n"
    },
    {
      "tagname": "method",
      "name": "setPagePosition",
      "member": "Ext.Component",
      "doc": "<p>Sets the page XY position of the component.  To set the left and top instead, use <a href=\"#/api/Ext.grid.Panel-method-setPosition\" rel=\"Ext.grid.Panel-method-setPosition\" class=\"docClass\">setPosition</a>.\nThis method fires the <a href=\"#/api/Ext.grid.Panel-event-move\" rel=\"Ext.grid.Panel-event-move\" class=\"docClass\">move</a> event.</p>\n",
      "params": [
        {
          "type": "Number",
          "name": "x",
          "doc": "<p>The new x position</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "y",
          "doc": "<p>The new y position</p>\n",
          "optional": false
        },
        {
          "type": "Mixed",
          "name": "animate",
          "doc": "<p>If passed, the Component is <i>animated</i> into its new position. If this parameter\nis a number, it is used as the animation duration in milliseconds.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 501,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-method-setPagePosition",
      "shortDoc": "Sets the page XY position of the component.  To set the left and top instead, use setPosition.\nThis method fires the ..."
    },
    {
      "tagname": "method",
      "name": "setPosition",
      "member": "Ext.Component",
      "doc": "<p>Sets the left and top of the component.  To set the page XY position instead, use <a href=\"#/api/Ext.grid.Panel-method-setPagePosition\" rel=\"Ext.grid.Panel-method-setPagePosition\" class=\"docClass\">setPagePosition</a>.\nThis method fires the <a href=\"#/api/Ext.grid.Panel-event-move\" rel=\"Ext.grid.Panel-event-move\" class=\"docClass\">move</a> event.</p>\n",
      "params": [
        {
          "type": "Number",
          "name": "left",
          "doc": "<p>The new left</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "top",
          "doc": "<p>The new top</p>\n",
          "optional": false
        },
        {
          "type": "Mixed",
          "name": "animate",
          "doc": "<p>If true, the Component is <i>animated</i> into its new position. You may also pass an animation configuration.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 417,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-method-setPosition",
      "shortDoc": "Sets the left and top of the component.  To set the page XY position instead, use setPagePosition.\nThis method fires ..."
    },
    {
      "tagname": "method",
      "name": "setScrollTop",
      "member": "Ext.panel.Table",
      "doc": "<p>Sets the scrollTop of the TablePanel.</p>\n",
      "params": [
        {
          "type": "Number",
          "name": "deltaY",
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
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 1022,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-method-setScrollTop",
      "shortDoc": "<p>Sets the scrollTop of the TablePanel.</p>\n"
    },
    {
      "tagname": "method",
      "name": "setSize",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Sets the width and height of this Component. This method fires the <a href=\"#/api/Ext.grid.Panel-event-resize\" rel=\"Ext.grid.Panel-event-resize\" class=\"docClass\">resize</a> event. This method can accept\neither width and height as separate arguments, or you can pass a size object like <code>{width:10, height:20}</code>.</p>\n",
      "params": [
        {
          "type": "Mixed",
          "name": "width",
          "doc": "<p>The new width to set. This may be one of:<div class=\"mdetail-params\"><ul>\n<li>A Number specifying the new width in the <a href=\"#/api/Ext.grid.Panel-method-getEl\" rel=\"Ext.grid.Panel-method-getEl\" class=\"docClass\">Element</a>'s <a href=\"#/api/Ext.core.Element-property-defaultUnit\" rel=\"Ext.core.Element-property-defaultUnit\" class=\"docClass\">Ext.core.Element.defaultUnit</a>s (by default, pixels).</li>\n<li>A String used to set the CSS width style.</li>\n<li>A size object in the format <code>{width: widthValue, height: heightValue}</code>.</li>\n<li><code>undefined</code> to leave the width unchanged.</li>\n</ul></div></p>\n",
          "optional": false
        },
        {
          "type": "Mixed",
          "name": "height",
          "doc": "<p>The new height to set (not required if a size object is passed as the first arg).\nThis may be one of:<div class=\"mdetail-params\"><ul>\n<li>A Number specifying the new height in the <a href=\"#/api/Ext.grid.Panel-method-getEl\" rel=\"Ext.grid.Panel-method-getEl\" class=\"docClass\">Element</a>'s <a href=\"#/api/Ext.core.Element-property-defaultUnit\" rel=\"Ext.core.Element-property-defaultUnit\" class=\"docClass\">Ext.core.Element.defaultUnit</a>s (by default, pixels).</li>\n<li>A String used to set the CSS height style. Animation may <b>not</b> be used.</li>\n<li><code>undefined</code> to leave the height unchanged.</li>\n</ul></div></p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2340,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-setSize",
      "shortDoc": "Sets the width and height of this Component. This method fires the resize event. This method can accept\neither width ..."
    },
    {
      "tagname": "method",
      "name": "setTitle",
      "member": "Ext.panel.Panel",
      "doc": "<p>Set a title for the panel&#39;s header. See <a href=\"#/api/Ext.panel.Header--title\" rel=\"Ext.panel.Header--title\" class=\"docClass\">Ext.panel.Header.title</a>.</p>\n",
      "params": [
        {
          "type": "String",
          "name": "newTitle",
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
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 395,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-method-setTitle",
      "shortDoc": "<p>Set a title for the panel&#39;s header. See <a href=\"#/api/Ext.panel.Header--title\" rel=\"Ext.panel.Header--title\" class=\"docClass\">Ext.panel.Header.title</a>.</p>\n"
    },
    {
      "tagname": "method",
      "name": "setUI",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Sets the UI for the component. This will remove any existing UIs on the component. It will also\nloop through any uiCls set on the component and rename them so they include the new UI</p>\n",
      "params": [
        {
          "type": "String",
          "name": "ui",
          "doc": "<p>The new UI for the component</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 1309,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-setUI",
      "shortDoc": "Sets the UI for the component. This will remove any existing UIs on the component. It will also\nloop through any uiCl..."
    },
    {
      "tagname": "method",
      "name": "setVisible",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Convenience function to hide or show this component by boolean.</p>\n",
      "params": [
        {
          "type": "Boolean",
          "name": "visible",
          "doc": "<p>True to show, false to hide</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2006,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-setVisible",
      "shortDoc": "<p>Convenience function to hide or show this component by boolean.</p>\n"
    },
    {
      "tagname": "method",
      "name": "setWidth",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Sets the width of the component.  This method fires the <a href=\"#/api/Ext.grid.Panel-event-resize\" rel=\"Ext.grid.Panel-event-resize\" class=\"docClass\">resize</a> event.</p>\n",
      "params": [
        {
          "type": "Number",
          "name": "width",
          "doc": "<p>The new width to setThis may be one of:<div class=\"mdetail-params\"><ul>\n<li>A Number specifying the new width in the <a href=\"#/api/Ext.grid.Panel-method-getEl\" rel=\"Ext.grid.Panel-method-getEl\" class=\"docClass\">Element</a>'s <a href=\"#/api/Ext.core.Element-property-defaultUnit\" rel=\"Ext.core.Element-property-defaultUnit\" class=\"docClass\">Ext.core.Element.defaultUnit</a>s (by default, pixels).</li>\n<li>A String used to set the CSS width style.</li>\n</ul></div></p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 2538,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-setWidth",
      "shortDoc": "<p>Sets the width of the component.  This method fires the <a href=\"#/api/Ext.grid.Panel-event-resize\" rel=\"Ext.grid.Panel-event-resize\" class=\"docClass\">resize</a> event.</p>\n"
    },
    {
      "tagname": "method",
      "name": "show",
      "member": "Ext.Component",
      "doc": "<p>Shows this Component, rendering it first if <a href=\"#/api/Ext.grid.Panel-cfg-autoRender\" rel=\"Ext.grid.Panel-cfg-autoRender\" class=\"docClass\">autoRender</a> or {<a href=\"#/api/\"floating\" rel=\"\"floating\" class=\"docClass\">&quot;floating</a> are <code>true</code>.</p>\n\n\n<p>After being shown, a <a href=\"#/api/Ext.grid.Panel-cfg-floating\" rel=\"Ext.grid.Panel-cfg-floating\" class=\"docClass\">floating</a> Component (such as a <a href=\"#/api/Ext.window.Window\" rel=\"Ext.window.Window\" class=\"docClass\">Ext.window.Window</a>), is activated it and brought to the front of\nits <a href=\"#/api/Ext.grid.Panel--ZIndexManager\" rel=\"Ext.grid.Panel--ZIndexManager\" class=\"docClass\">z-index stack</a>.</p>\n\n",
      "params": [
        {
          "type": "String/Element",
          "name": "animateTarget",
          "doc": "<p>Optional, and <b>only valid for <a href=\"#/api/Ext.grid.Panel-cfg-floating\" rel=\"Ext.grid.Panel-cfg-floating\" class=\"docClass\">floating</a> Components such as\n<a href=\"#/api/Ext.window.Window\" rel=\"Ext.window.Window\" class=\"docClass\">Window</a>s or <a href=\"#/api/Ext.tip.ToolTip\" rel=\"Ext.tip.ToolTip\" class=\"docClass\">ToolTip</a>s, or regular Components which have been configured\nwith <code>floating: true</code>.</b> The target from which the Component should\nanimate from while opening (defaults to null with no animation)</p>\n",
          "optional": false
        },
        {
          "type": "Function",
          "name": "callback",
          "doc": "<p>(optional) A callback function to call after the Component is displayed. Only necessary if animation was specified.</p>\n",
          "optional": true
        },
        {
          "type": "Object",
          "name": "scope",
          "doc": "<p>(optional) The scope (<code>this</code> reference) in which the callback is executed. Defaults to this Component.</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "Component",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 645,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-method-show",
      "shortDoc": "Shows this Component, rendering it first if autoRender or {&quot;floating are true.\n\n\nAfter being shown, a floating C..."
    },
    {
      "tagname": "method",
      "name": "showHorizontalScroller",
      "member": "Ext.panel.Table",
      "doc": "<p>Show the horizontalScroller and add the horizontalScrollerPresentCls.</p>\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 801,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-method-showHorizontalScroller",
      "shortDoc": "<p>Show the horizontalScroller and add the horizontalScrollerPresentCls.</p>\n"
    },
    {
      "tagname": "method",
      "name": "showVerticalScroller",
      "member": "Ext.panel.Table",
      "doc": "<p>Show the verticalScroller and add the verticalScrollerPresentCls.</p>\n",
      "params": [

      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 838,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-method-showVerticalScroller",
      "shortDoc": "<p>Show the verticalScroller and add the verticalScrollerPresentCls.</p>\n"
    },
    {
      "tagname": "method",
      "name": "stopAnimation",
      "member": "Ext.util.Animate",
      "doc": "<p>Stops any running effects and clears this object's internal effects queue if it contains\nany additional effects that haven't started yet.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Ext.core.Element",
        "doc": "<p>The Element</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/util/Animate.js",
      "linenr": 335,
      "html_filename": "Animate.html",
      "href": "Animate.html#Ext-util-Animate-method-stopAnimation",
      "shortDoc": "Stops any running effects and clears this object's internal effects queue if it contains\nany additional effects that ..."
    },
    {
      "tagname": "method",
      "name": "stopFx",
      "member": "Ext.util.Animate",
      "doc": "<p>@deprecated 4.0 Replaced by <a href=\"#/api/Ext.grid.Panel-method-stopAnimation\" rel=\"Ext.grid.Panel-method-stopAnimation\" class=\"docClass\">stopAnimation</a>\nStops any running effects and clears this object's internal effects queue if it contains\nany additional effects that haven't started yet.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Ext.core.Element",
        "doc": "<p>The Element</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/util/Animate.js",
      "linenr": 326,
      "html_filename": "Animate.html",
      "href": "Animate.html#Ext-util-Animate-method-stopFx",
      "shortDoc": "@deprecated 4.0 Replaced by stopAnimation\nStops any running effects and clears this object's internal effects queue i..."
    },
    {
      "tagname": "method",
      "name": "suspendEvents",
      "member": "Ext.util.Observable",
      "doc": "<p>Suspend the firing of all events. (see <a href=\"#/api/Ext.grid.Panel-method-resumeEvents\" rel=\"Ext.grid.Panel-method-resumeEvents\" class=\"docClass\">resumeEvents</a>)</p>\n",
      "params": [
        {
          "type": "Boolean",
          "name": "queueSuspended",
          "doc": "<p>Pass as true to queue up suspended events to be fired\nafter the <a href=\"#/api/Ext.grid.Panel-method-resumeEvents\" rel=\"Ext.grid.Panel-method-resumeEvents\" class=\"docClass\">resumeEvents</a> call instead of discarding all suspended events;</p>\n",
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
      "shortDoc": "<p>Suspend the firing of all events. (see <a href=\"#/api/Ext.grid.Panel-method-resumeEvents\" rel=\"Ext.grid.Panel-method-resumeEvents\" class=\"docClass\">resumeEvents</a>)</p>\n"
    },
    {
      "tagname": "method",
      "name": "syncFx",
      "member": "Ext.util.Animate",
      "doc": "<p>Ensures that all effects queued after syncFx is called on this object are\nrun concurrently.  This is the opposite of <a href=\"#/api/Ext.grid.Panel-method-sequenceFx\" rel=\"Ext.grid.Panel-method-sequenceFx\" class=\"docClass\">sequenceFx</a>.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Object",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/util/Animate.js",
      "linenr": 345,
      "html_filename": "Animate.html",
      "href": "Animate.html#Ext-util-Animate-method-syncFx",
      "shortDoc": "Ensures that all effects queued after syncFx is called on this object are\nrun concurrently.  This is the opposite of ..."
    },
    {
      "tagname": "method",
      "name": "toBack",
      "member": "Ext.util.Floating",
      "doc": "<p>Sends this Component to the back of (lower z-index than) any other visible windows</p>\n",
      "params": [

      ],
      "return": {
        "type": "Component",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/util/Floating.js",
      "linenr": 240,
      "html_filename": "Floating.html",
      "href": "Floating.html#Ext-util-Floating-method-toBack",
      "shortDoc": "<p>Sends this Component to the back of (lower z-index than) any other visible windows</p>\n"
    },
    {
      "tagname": "method",
      "name": "toFront",
      "member": "Ext.util.Floating",
      "doc": "<p>Brings this floating Component to the front of any other visible, floating Components managed by the same <a href=\"#/api/Ext.ZIndexManager\" rel=\"Ext.ZIndexManager\" class=\"docClass\">ZIndexManager</a></p>\n\n\n<p>If this Component is modal, inserts the modal mask just below this Component in the z-index stack.</p>\n\n",
      "params": [
        {
          "type": "Boolean",
          "name": "preventFocus",
          "doc": "<p>(optional) Specify <code>true</code> to prevent the Component from being focused.</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "Component",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/util/Floating.js",
      "linenr": 188,
      "html_filename": "Floating.html",
      "href": "Floating.html#Ext-util-Floating-method-toFront",
      "shortDoc": "Brings this floating Component to the front of any other visible, floating Components managed by the same ZIndexManag..."
    },
    {
      "tagname": "method",
      "name": "toggleCollapse",
      "member": "Ext.panel.Panel",
      "doc": "<p>Shortcut for performing an <a href=\"#/api/Ext.grid.Panel-method-expand\" rel=\"Ext.grid.Panel-method-expand\" class=\"docClass\">expand</a> or <a href=\"#/api/Ext.grid.Panel-method-collapse\" rel=\"Ext.grid.Panel-method-collapse\" class=\"docClass\">collapse</a> based on the current state of the panel.</p>\n",
      "params": [

      ],
      "return": {
        "type": "Ext.panel.Panel",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 1313,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-method-toggleCollapse",
      "shortDoc": "<p>Shortcut for performing an <a href=\"#/api/Ext.grid.Panel-method-expand\" rel=\"Ext.grid.Panel-method-expand\" class=\"docClass\">expand</a> or <a href=\"#/api/Ext.grid.Panel-method-collapse\" rel=\"Ext.grid.Panel-method-collapse\" class=\"docClass\">collapse</a> based on the current state of the panel.</p>\n"
    },
    {
      "tagname": "method",
      "name": "un",
      "member": "Ext.util.Observable",
      "doc": "<p>Removes an event handler (shorthand for <a href=\"#/api/Ext.grid.Panel-method-removeListener\" rel=\"Ext.grid.Panel-method-removeListener\" class=\"docClass\">removeListener</a>.)</p>\n",
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
          "doc": "<p>The handler to remove. <b>This must be a reference to the function passed into the <a href=\"#/api/Ext.grid.Panel-method-addListener\" rel=\"Ext.grid.Panel-method-addListener\" class=\"docClass\">addListener</a> call.</b></p>\n",
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
      "shortDoc": "<p>Removes an event handler (shorthand for <a href=\"#/api/Ext.grid.Panel-method-removeListener\" rel=\"Ext.grid.Panel-method-removeListener\" class=\"docClass\">removeListener</a>.)</p>\n"
    },
    {
      "tagname": "method",
      "name": "up",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Walks up the <code>ownerCt</code> axis looking for an ancestor Container which matches\nthe passed simple selector.</p>\n\n\n<p>Example:\n<pre><code>var owningTabPanel = grid.up('tabpanel');\n</code></pre>\n\n",
      "params": [
        {
          "type": "String",
          "name": "selector",
          "doc": "<p>Optional. The simple selector to test.</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Container",
        "doc": "<p>The matching ancestor Container (or <code>undefined</code> if no match was found).</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 1728,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-up",
      "shortDoc": "Walks up the ownerCt axis looking for an ancestor Container which matches\nthe passed simple selector.\n\n\nExample:\nvar ..."
    },
    {
      "tagname": "method",
      "name": "update",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Update the content area of a component.</p>\n",
      "params": [
        {
          "type": "Mixed",
          "name": "htmlOrData",
          "doc": "<p>If this component has been configured with a template via the tpl config\nthen it will use this argument as data to populate the template.\nIf this component was not configured with a template, the components\ncontent area will be updated via <a href=\"#/api/Ext.core.Element\" rel=\"Ext.core.Element\" class=\"docClass\">Ext.core.Element</a> update</p>\n",
          "optional": false
        },
        {
          "type": "Boolean",
          "name": "loadScripts",
          "doc": "<p>(optional) Only legitimate when using the html configuration. Defaults to false</p>\n",
          "optional": true
        },
        {
          "type": "Function",
          "name": "callback",
          "doc": "<p>(optional) Only legitimate when using the html configuration. Callback to execute when scripts have finished loading</p>\n",
          "optional": true
        }
      ],
      "return": {
        "type": "void",
        "doc": "\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 1974,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-method-update",
      "shortDoc": "<p>Update the content area of a component.</p>\n"
    },
    {
      "tagname": "method",
      "name": "updateBox",
      "member": "Ext.Component",
      "doc": "<p>Sets the current box measurements of the component's underlying element.</p>\n",
      "params": [
        {
          "type": "Object",
          "name": "box",
          "doc": "<p>An object in the format {x, y, width, height}</p>\n",
          "optional": false
        }
      ],
      "return": {
        "type": "Ext.Component",
        "doc": "<p>this</p>\n"
      },
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 551,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-method-updateBox",
      "shortDoc": "<p>Sets the current box measurements of the component's underlying element.</p>\n"
    }
  ],
  "property": [
    {
      "tagname": "property",
      "name": "centerClientWidth",
      "member": "Ext.panel.Table",
      "type": "Object",
      "doc": "<p>clientWidth often returns 0 in IE resulting in an\ninfinity result, here we use offsetWidth bc there are\nno possible scrollbars and we don't care about margins</p>\n",
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 744,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-property-centerClientWidth",
      "shortDoc": "clientWidth often returns 0 in IE resulting in an\ninfinity result, here we use offsetWidth bc there are\nno possible s..."
    },
    {
      "tagname": "property",
      "name": "dd",
      "member": "Ext.panel.Panel",
      "type": "Ext.dd.DragSource.",
      "doc": "<p>If this Panel is configured <a href=\"#/api/Ext.grid.Panel-property-draggable\" rel=\"Ext.grid.Panel-property-draggable\" class=\"docClass\">draggable</a>, this property will contain\nan instance of <a href=\"#/api/Ext.dd.DragSource\" rel=\"Ext.dd.DragSource\" class=\"docClass\">Ext.dd.DragSource</a> which handles dragging the Panel.</p>\n\n\n<p>The developer must provide implementations of the abstract methods of <a href=\"#/api/Ext.dd.DragSource\" rel=\"Ext.dd.DragSource\" class=\"docClass\">Ext.dd.DragSource</a>\nin order to supply behaviour for each stage of the drag/drop process. See <a href=\"#/api/Ext.grid.Panel-property-draggable\" rel=\"Ext.grid.Panel-property-draggable\" class=\"docClass\">draggable</a>.</p>\n",
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 1336,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-property-dd",
      "shortDoc": "If this Panel is configured draggable, this property will contain\nan instance of Ext.dd.DragSource which handles drag..."
    },
    {
      "tagname": "property",
      "name": "draggable",
      "member": "Ext.AbstractComponent",
      "type": "Boolean",
      "doc": "<p>Read-only property indicating whether or not the component can be dragged</p>\n",
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 374,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-property-draggable"
    },
    {
      "tagname": "property",
      "name": "floatParent",
      "member": "Ext.Component",
      "type": "Ext.Container",
      "doc": "<p>Optional. Only present for <a href=\"#/api/Ext.grid.Panel-cfg-floating\" rel=\"Ext.grid.Panel-cfg-floating\" class=\"docClass\">floating</a> Components which were inserted as descendant items of floating Containers.</p>\n\n\n<p>Floating Components that are programatically <a href=\"#/api/Ext.Component-event-render\" rel=\"Ext.Component-event-render\" class=\"docClass\">rendered</a> will not have a <code>floatParent</code> property.</p>\n\n\n<p>For <a href=\"#/api/Ext.grid.Panel-cfg-floating\" rel=\"Ext.grid.Panel-cfg-floating\" class=\"docClass\">floating</a> Components which are child items of a Container, the floatParent will be the floating ancestor Container which is\nresponsible for the base z-index value of all its floating descendants. It provides a <a href=\"#/api/Ext.ZIndexManager\" rel=\"Ext.ZIndexManager\" class=\"docClass\">ZIndexManager</a> which provides\nz-indexing services for all its descendant floating Components.</p>\n\n\n<p>For example, the dropdown <a href=\"#/api/Ext.view.BoundList\" rel=\"Ext.view.BoundList\" class=\"docClass\">BoundList</a> of a ComboBox which is in a Window will have the Window as its\n<code>floatParent</code></p>\n\n\n<p>See <a href=\"#/api/Ext.grid.Panel-cfg-floating\" rel=\"Ext.grid.Panel-cfg-floating\" class=\"docClass\">floating</a> and <a href=\"#/api/Ext.grid.Panel-property-zIndexManager\" rel=\"Ext.grid.Panel-property-zIndexManager\" class=\"docClass\">zIndexManager</a></p>\n\n",
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 221,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-property-floatParent",
      "shortDoc": "Optional. Only present for floating Components which were inserted as descendant items of floating Containers.\n\n\nFloa..."
    },
    {
      "tagname": "property",
      "name": "frameSize",
      "member": "Ext.AbstractComponent",
      "type": "Object",
      "doc": "<p>Read-only property indicating the width of any framing elements which were added within the encapsulating element\nto provide graphical, rounded borders. See the <a href=\"#/api/Ext.grid.Panel-cfg-frame\" rel=\"Ext.grid.Panel-cfg-frame\" class=\"docClass\">frame</a> config.</p>\n\n\n<p> This is an object containing the frame width in pixels for all four sides of the Component containing\nthe following properties:</p>\n\n\n<div class=\"mdetail-params\"><ul>\n<li><code>top</code> The width of the top framing element in pixels.</li>\n<li><code>right</code> The width of the right framing element in pixels.</li>\n<li><code>bottom</code> The width of the bottom framing element in pixels.</li>\n<li><code>left</code> The width of the left framing element in pixels.</li>\n</ul></div>\n\n",
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 207,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-property-frameSize",
      "shortDoc": "Read-only property indicating the width of any framing elements which were added within the encapsulating element\nto ..."
    },
    {
      "tagname": "property",
      "name": "hasView",
      "member": "Ext.panel.Table",
      "type": "Boolean",
      "doc": "<p>Boolean to indicate that a view has been injected into the panel.</p>\n",
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 34,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-property-hasView"
    },
    {
      "tagname": "property",
      "name": "items",
      "member": "Ext.container.AbstractContainer",
      "type": "Ext.util.MixedCollection",
      "doc": "<p>The MixedCollection containing all the child items of this container.</p>\n",
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 273,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-property-items"
    },
    {
      "tagname": "property",
      "name": "maskOnDisable",
      "member": "Ext.AbstractComponent",
      "type": "Boolean",
      "doc": "<p>This is an internal flag that you use when creating custom components.\nBy default this is set to true which means that every component gets a mask when its disabled.\nComponents like FieldContainer, FieldSet, Field, Button, Tab override this property to false\nsince they want to implement custom disable logic.</p>\n",
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 513,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-property-maskOnDisable",
      "shortDoc": "This is an internal flag that you use when creating custom components.\nBy default this is set to true which means tha..."
    },
    {
      "tagname": "property",
      "name": "ownerCt",
      "member": "Ext.AbstractComponent",
      "type": "Ext.Container",
      "doc": "<p>This Component's owner <a href=\"#/api/Ext.container.Container\" rel=\"Ext.container.Container\" class=\"docClass\">Container</a> (defaults to undefined, and is set automatically when\nthis Component is added to a Container).  Read-only.</p>\n\n<p><b>Note</b>: to access items within the Container see <tt><a href=\"#/api/Ext.grid.Panel-cfg-itemId\" rel=\"Ext.grid.Panel-cfg-itemId\" class=\"docClass\">itemId</a></tt>.</p>\n\n",
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 101,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-property-ownerCt",
      "shortDoc": "This Component's owner Container (defaults to undefined, and is set automatically when\nthis Component is added to a C..."
    },
    {
      "tagname": "property",
      "name": "rendered",
      "member": "Ext.AbstractComponent",
      "type": "Boolean",
      "doc": "<p>Read-only property indicating whether or not the component has been rendered.</p>\n",
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 500,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-property-rendered"
    },
    {
      "tagname": "property",
      "name": "zIndexManager",
      "member": "Ext.Component",
      "type": "Ext.ZIndexManager",
      "doc": "<p>Optional. Only present for <a href=\"#/api/Ext.grid.Panel-cfg-floating\" rel=\"Ext.grid.Panel-cfg-floating\" class=\"docClass\">floating</a> Components after they have been rendered.</p>\n\n\n<p>A reference to the ZIndexManager which is managing this Component's z-index.</p>\n\n\n<p>The <a href=\"#/api/Ext.ZIndexManager\" rel=\"Ext.ZIndexManager\" class=\"docClass\">ZIndexManager</a> maintains a stack of floating Component z-indices, and also provides a single modal\nmask which is insert just beneath the topmost visible modal floating Component.</p>\n\n\n<p>Floating Components may be <a href=\"#/api/Ext.grid.Panel-method-toFront\" rel=\"Ext.grid.Panel-method-toFront\" class=\"docClass\">brought to the front</a> or <a href=\"#/api/Ext.grid.Panel-method-toBack\" rel=\"Ext.grid.Panel-method-toBack\" class=\"docClass\">sent to the back</a> of the z-index stack.</p>\n\n\n<p>This defaults to the global <a href=\"#/api/Ext.WindowManager\" rel=\"Ext.WindowManager\" class=\"docClass\">ZIndexManager</a> for floating Components that are programatically\n<a href=\"#/api/Ext.Component-event-render\" rel=\"Ext.Component-event-render\" class=\"docClass\">rendered</a>.</p>\n\n\n<p>For <a href=\"#/api/Ext.grid.Panel-cfg-floating\" rel=\"Ext.grid.Panel-cfg-floating\" class=\"docClass\">floating</a> Components which are added to a Container, the ZIndexManager is acquired from the first ancestor Container found\nwhich is floating, or if not found the global <a href=\"#/api/Ext.WindowManager\" rel=\"Ext.WindowManager\" class=\"docClass\">ZIndexManager</a> is used.</p>\n\n\n<p>See <a href=\"#/api/Ext.grid.Panel-cfg-floating\" rel=\"Ext.grid.Panel-cfg-floating\" class=\"docClass\">floating</a> and <a href=\"#/api/Ext.grid.Panel-property-floatParent\" rel=\"Ext.grid.Panel-property-floatParent\" class=\"docClass\">floatParent</a></p>\n\n",
      "private": false,
      "static": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/Component.js",
      "linenr": 206,
      "html_filename": "Component.html",
      "href": "Component.html#Ext-Component-property-zIndexManager",
      "shortDoc": "Optional. Only present for floating Components after they have been rendered.\n\n\nA reference to the ZIndexManager whic..."
    }
  ],
  "event": [
    {
      "tagname": "event",
      "name": "activate",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires after a Component has been visually activated.</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 540,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-activate",
      "shortDoc": "<p>Fires after a Component has been visually activated.</p>\n"
    },
    {
      "tagname": "event",
      "name": "add",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>@bubbles\nFires after any <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a> is added or inserted into the container.</p>\n",
      "params": [
        {
          "type": "Ext.container.Container",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.Component",
          "name": "component",
          "doc": "<p>The component that was added</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The index at which the component was added to the container's items collection</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 215,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-event-add",
      "shortDoc": "<p>@bubbles\nFires after any <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a> is added or inserted into the container.</p>\n"
    },
    {
      "tagname": "event",
      "name": "added",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires after a Component had been added to a Container.</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.container.Container",
          "name": "container",
          "doc": "<p>Parent Container</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "pos",
          "doc": "<p>position of Component</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 560,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-added",
      "shortDoc": "<p>Fires after a Component had been added to a Container.</p>\n"
    },
    {
      "tagname": "event",
      "name": "afterlayout",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>Fires when the components in this container are arranged by the associated layout manager.</p>\n",
      "params": [
        {
          "type": "Ext.container.Container",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "ContainerLayout",
          "name": "layout",
          "doc": "<p>The ContainerLayout implementation for this container</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 191,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-event-afterlayout",
      "shortDoc": "<p>Fires when the components in this container are arranged by the associated layout manager.</p>\n"
    },
    {
      "tagname": "event",
      "name": "afterrender",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires after the component rendering is finished.</p>\n\n\n<p>The afterrender event is fired after this Component has been <a href=\"#/api/Ext.grid.Panel-property-rendered\" rel=\"Ext.grid.Panel-property-rendered\" class=\"docClass\">rendered</a>, been postprocesed\nby any afterRender method defined for the Component.</p>\n\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 627,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-afterrender",
      "shortDoc": "Fires after the component rendering is finished.\n\n\nThe afterrender event is fired after this Component has been rende..."
    },
    {
      "tagname": "event",
      "name": "beforeactivate",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires before a Component has been visually activated.\nReturning false from an event listener can prevent the activate\nfrom occurring.</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 532,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-beforeactivate",
      "shortDoc": "Fires before a Component has been visually activated.\nReturning false from an event listener can prevent the activate..."
    },
    {
      "tagname": "event",
      "name": "beforeadd",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>Fires before any <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a> is added or inserted into the container.\nA handler can return false to cancel the add.</p>\n",
      "params": [
        {
          "type": "Ext.container.Container",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.Component",
          "name": "component",
          "doc": "<p>The component being added</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The index at which the component will be added to the container's items collection</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 198,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-event-beforeadd",
      "shortDoc": "<p>Fires before any <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a> is added or inserted into the container.\nA handler can return false to cancel the add.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforecardswitch",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>Fires before this container switches the active card. This event\nis only available if this container uses a CardLayout. Note that\nTabPanel and Carousel both get a CardLayout by default, so both\nwill have this event.\nA handler can return false to cancel the card switch.</p>\n",
      "params": [
        {
          "type": "Ext.container.Container",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.Component",
          "name": "newCard",
          "doc": "<p>The card that will be switched to</p>\n",
          "optional": false
        },
        {
          "type": "Ext.Component",
          "name": "oldCard",
          "doc": "<p>The card that will be switched from</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The index of the card that will be switched to</p>\n",
          "optional": false
        },
        {
          "type": "Boolean",
          "name": "animated",
          "doc": "<p>True if this cardswitch will be animated</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 232,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-event-beforecardswitch",
      "shortDoc": "Fires before this container switches the active card. This event\nis only available if this container uses a CardLayou..."
    },
    {
      "tagname": "event",
      "name": "beforecontainerclick",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires before the click event on the container is processed. Returns false to cancel the default action.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 443,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-beforecontainerclick",
      "shortDoc": "<p>Fires before the click event on the container is processed. Returns false to cancel the default action.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforecontainercontextmenu",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires before the contextmenu event on the container is processed. Returns false to cancel the default action.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 457,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-beforecontainercontextmenu",
      "shortDoc": "<p>Fires before the contextmenu event on the container is processed. Returns false to cancel the default action.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforecontainerdblclick",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires before the dblclick event on the container is processed. Returns false to cancel the default action.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 450,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-beforecontainerdblclick",
      "shortDoc": "<p>Fires before the dblclick event on the container is processed. Returns false to cancel the default action.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforecontainermousedown",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires before the mousedown event on the container is processed. Returns false to cancel the default action.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 415,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-beforecontainermousedown",
      "shortDoc": "<p>Fires before the mousedown event on the container is processed. Returns false to cancel the default action.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforecontainermouseout",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires before the mouseout event on the container is processed. Returns false to cancel the default action.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 436,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-beforecontainermouseout",
      "shortDoc": "<p>Fires before the mouseout event on the container is processed. Returns false to cancel the default action.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforecontainermouseover",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires before the mouseover event on the container is processed. Returns false to cancel the default action.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 429,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-beforecontainermouseover",
      "shortDoc": "<p>Fires before the mouseover event on the container is processed. Returns false to cancel the default action.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforecontainermouseup",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires before the mouseup event on the container is processed. Returns false to cancel the default action.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 422,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-beforecontainermouseup",
      "shortDoc": "<p>Fires before the mouseup event on the container is processed. Returns false to cancel the default action.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforedeactivate",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires before a Component has been visually deactivated.\nReturning false from an event listener can prevent the deactivate\nfrom occurring.</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 546,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-beforedeactivate",
      "shortDoc": "Fires before a Component has been visually deactivated.\nReturning false from an event listener can prevent the deacti..."
    },
    {
      "tagname": "event",
      "name": "beforedestroy",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires before the component is <a href=\"#/api/Ext.grid.Panel-event-destroy\" rel=\"Ext.grid.Panel-event-destroy\" class=\"docClass\">destroy</a>ed. Return false from an event handler to stop the <a href=\"#/api/Ext.grid.Panel-event-destroy\" rel=\"Ext.grid.Panel-event-destroy\" class=\"docClass\">destroy</a>.</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 635,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-beforedestroy",
      "shortDoc": "<p>Fires before the component is <a href=\"#/api/Ext.grid.Panel-event-destroy\" rel=\"Ext.grid.Panel-event-destroy\" class=\"docClass\">destroy</a>ed. Return false from an event handler to stop the <a href=\"#/api/Ext.grid.Panel-event-destroy\" rel=\"Ext.grid.Panel-event-destroy\" class=\"docClass\">destroy</a>.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforehide",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires before the component is hidden when calling the <a href=\"#/api/Ext.grid.Panel-event-hide\" rel=\"Ext.grid.Panel-event-hide\" class=\"docClass\">hide</a> method.\nReturn false from an event handler to stop the hide.</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 593,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-beforehide",
      "shortDoc": "<p>Fires before the component is hidden when calling the <a href=\"#/api/Ext.grid.Panel-event-hide\" rel=\"Ext.grid.Panel-event-hide\" class=\"docClass\">hide</a> method.\nReturn false from an event handler to stop the hide.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforeitemclick",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires before the click event on an item is processed. Returns false to cancel the default action.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.data.Model",
          "name": "record",
          "doc": "<p>The record that belongs to the item</p>\n",
          "optional": false
        },
        {
          "type": "HTMLElement",
          "name": "item",
          "doc": "<p>The item's element</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The item's index</p>\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 315,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-beforeitemclick",
      "shortDoc": "<p>Fires before the click event on an item is processed. Returns false to cancel the default action.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforeitemcontextmenu",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires before the contextmenu event on an item is processed. Returns false to cancel the default action.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.data.Model",
          "name": "record",
          "doc": "<p>The record that belongs to the item</p>\n",
          "optional": false
        },
        {
          "type": "HTMLElement",
          "name": "item",
          "doc": "<p>The item's element</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The item's index</p>\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 335,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-beforeitemcontextmenu",
      "shortDoc": "<p>Fires before the contextmenu event on an item is processed. Returns false to cancel the default action.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforeitemdblclick",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires before the dblclick event on an item is processed. Returns false to cancel the default action.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.data.Model",
          "name": "record",
          "doc": "<p>The record that belongs to the item</p>\n",
          "optional": false
        },
        {
          "type": "HTMLElement",
          "name": "item",
          "doc": "<p>The item's element</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The item's index</p>\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 325,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-beforeitemdblclick",
      "shortDoc": "<p>Fires before the dblclick event on an item is processed. Returns false to cancel the default action.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforeitemmousedown",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires before the mousedown event on an item is processed. Returns false to cancel the default action.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.data.Model",
          "name": "record",
          "doc": "<p>The record that belongs to the item</p>\n",
          "optional": false
        },
        {
          "type": "HTMLElement",
          "name": "item",
          "doc": "<p>The item's element</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The item's index</p>\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 275,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-beforeitemmousedown",
      "shortDoc": "<p>Fires before the mousedown event on an item is processed. Returns false to cancel the default action.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforeitemmouseenter",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires before the mouseenter event on an item is processed. Returns false to cancel the default action.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.data.Model",
          "name": "record",
          "doc": "<p>The record that belongs to the item</p>\n",
          "optional": false
        },
        {
          "type": "HTMLElement",
          "name": "item",
          "doc": "<p>The item's element</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The item's index</p>\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 295,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-beforeitemmouseenter",
      "shortDoc": "<p>Fires before the mouseenter event on an item is processed. Returns false to cancel the default action.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforeitemmouseleave",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires before the mouseleave event on an item is processed. Returns false to cancel the default action.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.data.Model",
          "name": "record",
          "doc": "<p>The record that belongs to the item</p>\n",
          "optional": false
        },
        {
          "type": "HTMLElement",
          "name": "item",
          "doc": "<p>The item's element</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The item's index</p>\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 305,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-beforeitemmouseleave",
      "shortDoc": "<p>Fires before the mouseleave event on an item is processed. Returns false to cancel the default action.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforeitemmouseup",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires before the mouseup event on an item is processed. Returns false to cancel the default action.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.data.Model",
          "name": "record",
          "doc": "<p>The record that belongs to the item</p>\n",
          "optional": false
        },
        {
          "type": "HTMLElement",
          "name": "item",
          "doc": "<p>The item's element</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The item's index</p>\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 285,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-beforeitemmouseup",
      "shortDoc": "<p>Fires before the mouseup event on an item is processed. Returns false to cancel the default action.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforeremove",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>Fires before any <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a> is removed from the container.  A handler can return\nfalse to cancel the remove.</p>\n",
      "params": [
        {
          "type": "Ext.container.Container",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.Component",
          "name": "component",
          "doc": "<p>The component being removed</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 207,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-event-beforeremove",
      "shortDoc": "<p>Fires before any <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a> is removed from the container.  A handler can return\nfalse to cancel the remove.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforerender",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires before the component is <a href=\"#/api/Ext.grid.Panel-property-rendered\" rel=\"Ext.grid.Panel-property-rendered\" class=\"docClass\">rendered</a>. Return false from an\nevent handler to stop the <a href=\"#/api/Ext.grid.Panel-event-render\" rel=\"Ext.grid.Panel-event-render\" class=\"docClass\">render</a>.</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 614,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-beforerender",
      "shortDoc": "<p>Fires before the component is <a href=\"#/api/Ext.grid.Panel-property-rendered\" rel=\"Ext.grid.Panel-property-rendered\" class=\"docClass\">rendered</a>. Return false from an\nevent handler to stop the <a href=\"#/api/Ext.grid.Panel-event-render\" rel=\"Ext.grid.Panel-event-render\" class=\"docClass\">render</a>.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforeselect",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires before a selection is made. If any handlers return false, the selection is cancelled.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "HTMLElement",
          "name": "node",
          "doc": "<p>The node to be selected</p>\n",
          "optional": false
        },
        {
          "type": "Array",
          "name": "selections",
          "doc": "<p>Array of currently selected nodes</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 514,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-beforeselect",
      "shortDoc": "<p>Fires before a selection is made. If any handlers return false, the selection is cancelled.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforeshow",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires before the component is shown when calling the <a href=\"#/api/Ext.grid.Panel-event-show\" rel=\"Ext.grid.Panel-event-show\" class=\"docClass\">show</a> method.\nReturn false from an event handler to stop the show.</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 580,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-beforeshow",
      "shortDoc": "<p>Fires before the component is shown when calling the <a href=\"#/api/Ext.grid.Panel-event-show\" rel=\"Ext.grid.Panel-event-show\" class=\"docClass\">show</a> method.\nReturn false from an event handler to stop the show.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforestaterestore",
      "member": "Ext.state.Stateful",
      "doc": "<p>Fires before the state of the object is restored. Return false from an event handler to stop the restore.</p>\n",
      "params": [
        {
          "type": "Ext.state.Stateful",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "state",
          "doc": "<p>The hash of state values returned from the StateProvider. If this\nevent is not vetoed, then the state object is passed to <b><tt>applyState</tt></b>. By default,\nthat simply copies property values into this object. The method maybe overriden to\nprovide custom state restoration.</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/state/Stateful.js",
      "linenr": 101,
      "html_filename": "Stateful.html",
      "href": "Stateful.html#Ext-state-Stateful-event-beforestaterestore",
      "shortDoc": "<p>Fires before the state of the object is restored. Return false from an event handler to stop the restore.</p>\n"
    },
    {
      "tagname": "event",
      "name": "beforestatesave",
      "member": "Ext.state.Stateful",
      "doc": "<p>Fires before the state of the object is saved to the configured state provider. Return false to stop the save.</p>\n",
      "params": [
        {
          "type": "Ext.state.Stateful",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "state",
          "doc": "<p>The hash of state values. This is determined by calling\n<b><tt>getState()</tt></b> on the object. This method must be provided by the\ndeveloper to return whetever representation of state is required, by default, <a href=\"#/api/Ext.state.Stateful\" rel=\"Ext.state.Stateful\" class=\"docClass\">Ext.state.Stateful</a>\nhas a null implementation.</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/state/Stateful.js",
      "linenr": 122,
      "html_filename": "Stateful.html",
      "href": "Stateful.html#Ext-state-Stateful-event-beforestatesave",
      "shortDoc": "<p>Fires before the state of the object is saved to the configured state provider. Return false to stop the save.</p>\n"
    },
    {
      "tagname": "event",
      "name": "bodyresize",
      "member": "Ext.panel.AbstractPanel",
      "doc": "<p>Fires after the Panel has been resized.</p>\n",
      "params": [
        {
          "type": "Ext.panel.Panel",
          "name": "p",
          "doc": "<p>the Panel which has been resized.</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "width",
          "doc": "<p>The Panel body's new width.</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "height",
          "doc": "<p>The Panel body's new height.</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/panel/AbstractPanel.js",
      "linenr": 93,
      "html_filename": "AbstractPanel.html",
      "href": "AbstractPanel.html#Ext-panel-AbstractPanel-event-bodyresize",
      "shortDoc": "<p>Fires after the Panel has been resized.</p>\n"
    },
    {
      "tagname": "event",
      "name": "cardswitch",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>Fires after this container switches the active card. If the card\nis switched using an animation, this event will fire after the\nanimation has finished. This event is only available if this container\nuses a CardLayout. Note that TabPanel and Carousel both get a CardLayout\nby default, so both will have this event.</p>\n",
      "params": [
        {
          "type": "Ext.container.Container",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.Component",
          "name": "newCard",
          "doc": "<p>The card that has been switched to</p>\n",
          "optional": false
        },
        {
          "type": "Ext.Component",
          "name": "oldCard",
          "doc": "<p>The card that has been switched from</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The index of the card that has been switched to</p>\n",
          "optional": false
        },
        {
          "type": "Boolean",
          "name": "animated",
          "doc": "<p>True if this cardswitch was animated</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 246,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-event-cardswitch",
      "shortDoc": "Fires after this container switches the active card. If the card\nis switched using an animation, this event will fire..."
    },
    {
      "tagname": "event",
      "name": "containerclick",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires when the container is clicked.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 485,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-containerclick",
      "shortDoc": "<p>Fires when the container is clicked.</p>\n"
    },
    {
      "tagname": "event",
      "name": "containercontextmenu",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires when the container is right clicked.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 499,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-containercontextmenu",
      "shortDoc": "<p>Fires when the container is right clicked.</p>\n"
    },
    {
      "tagname": "event",
      "name": "containerdblclick",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires when the container is double clicked.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 492,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-containerdblclick",
      "shortDoc": "<p>Fires when the container is double clicked.</p>\n"
    },
    {
      "tagname": "event",
      "name": "containermouseout",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires when you move the mouse out of the container.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 478,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-containermouseout",
      "shortDoc": "<p>Fires when you move the mouse out of the container.</p>\n"
    },
    {
      "tagname": "event",
      "name": "containermouseover",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires when you move the mouse over the container.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 471,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-containermouseover",
      "shortDoc": "<p>Fires when you move the mouse over the container.</p>\n"
    },
    {
      "tagname": "event",
      "name": "containermouseup",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires when there is a mouse up on the container</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 464,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-containermouseup",
      "shortDoc": "<p>Fires when there is a mouse up on the container</p>\n"
    },
    {
      "tagname": "event",
      "name": "deactivate",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires after a Component has been visually deactivated.</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 554,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-deactivate",
      "shortDoc": "<p>Fires after a Component has been visually deactivated.</p>\n"
    },
    {
      "tagname": "event",
      "name": "destroy",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires after the component is <a href=\"#/api/Ext.grid.Panel-event-destroy\" rel=\"Ext.grid.Panel-event-destroy\" class=\"docClass\">destroy</a>ed.</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 641,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-destroy",
      "shortDoc": "<p>Fires after the component is <a href=\"#/api/Ext.grid.Panel-event-destroy\" rel=\"Ext.grid.Panel-event-destroy\" class=\"docClass\">destroy</a>ed.</p>\n"
    },
    {
      "tagname": "event",
      "name": "disable",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires after the component is disabled.</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 568,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-disable",
      "shortDoc": "<p>Fires after the component is disabled.</p>\n"
    },
    {
      "tagname": "event",
      "name": "enable",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires after the component is enabled.</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 574,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-enable",
      "shortDoc": "<p>Fires after the component is enabled.</p>\n"
    },
    {
      "tagname": "event",
      "name": "hide",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires after the component is hidden.\nFires after the component is hidden when calling the <a href=\"#/api/Ext.grid.Panel-event-hide\" rel=\"Ext.grid.Panel-event-hide\" class=\"docClass\">hide</a> method.</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 600,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-hide",
      "shortDoc": "<p>Fires after the component is hidden.\nFires after the component is hidden when calling the <a href=\"#/api/Ext.grid.Panel-event-hide\" rel=\"Ext.grid.Panel-event-hide\" class=\"docClass\">hide</a> method.</p>\n"
    },
    {
      "tagname": "event",
      "name": "iconchange",
      "member": "Ext.panel.Panel",
      "doc": "<p>Fires after the Panel iconCls has been set or changed.</p>\n",
      "params": [
        {
          "type": "Ext.panel.Panel",
          "name": "p",
          "doc": "<p>the Panel which has been resized.</p>\n",
          "optional": false
        },
        {
          "type": "String",
          "name": "newIconCls",
          "doc": "<p>The new iconCls.</p>\n",
          "optional": false
        },
        {
          "type": "String",
          "name": "oldIconCls",
          "doc": "<p>The previous panel iconCls.</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 323,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-event-iconchange",
      "shortDoc": "<p>Fires after the Panel iconCls has been set or changed.</p>\n"
    },
    {
      "tagname": "event",
      "name": "itemclick",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires when an item is clicked.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.data.Model",
          "name": "record",
          "doc": "<p>The record that belongs to the item</p>\n",
          "optional": false
        },
        {
          "type": "HTMLElement",
          "name": "item",
          "doc": "<p>The item's element</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The item's index</p>\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 385,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-itemclick",
      "shortDoc": "<p>Fires when an item is clicked.</p>\n"
    },
    {
      "tagname": "event",
      "name": "itemcontextmenu",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires when an item is right clicked.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.data.Model",
          "name": "record",
          "doc": "<p>The record that belongs to the item</p>\n",
          "optional": false
        },
        {
          "type": "HTMLElement",
          "name": "item",
          "doc": "<p>The item's element</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The item's index</p>\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 405,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-itemcontextmenu",
      "shortDoc": "<p>Fires when an item is right clicked.</p>\n"
    },
    {
      "tagname": "event",
      "name": "itemdblclick",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires when an item is double clicked.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.data.Model",
          "name": "record",
          "doc": "<p>The record that belongs to the item</p>\n",
          "optional": false
        },
        {
          "type": "HTMLElement",
          "name": "item",
          "doc": "<p>The item's element</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The item's index</p>\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 395,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-itemdblclick",
      "shortDoc": "<p>Fires when an item is double clicked.</p>\n"
    },
    {
      "tagname": "event",
      "name": "itemmousedown",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires when there is a mouse down on an item</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.data.Model",
          "name": "record",
          "doc": "<p>The record that belongs to the item</p>\n",
          "optional": false
        },
        {
          "type": "HTMLElement",
          "name": "item",
          "doc": "<p>The item's element</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The item's index</p>\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 345,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-itemmousedown",
      "shortDoc": "<p>Fires when there is a mouse down on an item</p>\n"
    },
    {
      "tagname": "event",
      "name": "itemmouseenter",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires when the mouse enters an item.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.data.Model",
          "name": "record",
          "doc": "<p>The record that belongs to the item</p>\n",
          "optional": false
        },
        {
          "type": "HTMLElement",
          "name": "item",
          "doc": "<p>The item's element</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The item's index</p>\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 365,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-itemmouseenter",
      "shortDoc": "<p>Fires when the mouse enters an item.</p>\n"
    },
    {
      "tagname": "event",
      "name": "itemmouseleave",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires when the mouse leaves an item.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.data.Model",
          "name": "record",
          "doc": "<p>The record that belongs to the item</p>\n",
          "optional": false
        },
        {
          "type": "HTMLElement",
          "name": "item",
          "doc": "<p>The item's element</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The item's index</p>\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 375,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-itemmouseleave",
      "shortDoc": "<p>Fires when the mouse leaves an item.</p>\n"
    },
    {
      "tagname": "event",
      "name": "itemmouseup",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires when there is a mouse up on an item</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.data.Model",
          "name": "record",
          "doc": "<p>The record that belongs to the item</p>\n",
          "optional": false
        },
        {
          "type": "HTMLElement",
          "name": "item",
          "doc": "<p>The item's element</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "index",
          "doc": "<p>The item's index</p>\n",
          "optional": false
        },
        {
          "type": "Ext.EventObject",
          "name": "e",
          "doc": "<p>The raw event object</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 355,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-itemmouseup",
      "shortDoc": "<p>Fires when there is a mouse up on an item</p>\n"
    },
    {
      "tagname": "event",
      "name": "move",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires after the component is moved.</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "x",
          "doc": "<p>The new x position</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "y",
          "doc": "<p>The new y position</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 655,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-move",
      "shortDoc": "<p>Fires after the component is moved.</p>\n"
    },
    {
      "tagname": "event",
      "name": "remove",
      "member": "Ext.container.AbstractContainer",
      "doc": "<p>@bubbles\nFires after any <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a> is removed from the container.</p>\n",
      "params": [
        {
          "type": "Ext.container.Container",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.Component",
          "name": "component",
          "doc": "<p>The component that was removed</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/container/AbstractContainer.js",
      "linenr": 224,
      "html_filename": "AbstractContainer.html",
      "href": "AbstractContainer.html#Ext-container-AbstractContainer-event-remove",
      "shortDoc": "<p>@bubbles\nFires after any <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a> is removed from the container.</p>\n"
    },
    {
      "tagname": "event",
      "name": "removed",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires when a component is removed from an Ext.container.Container</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Ext.container.Container",
          "name": "ownerCt",
          "doc": "<p>Container which holds the component</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 607,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-removed",
      "shortDoc": "<p>Fires when a component is removed from an Ext.container.Container</p>\n"
    },
    {
      "tagname": "event",
      "name": "render",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires after the component markup is <a href=\"#/api/Ext.grid.Panel-property-rendered\" rel=\"Ext.grid.Panel-property-rendered\" class=\"docClass\">rendered</a>.</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 621,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-render",
      "shortDoc": "<p>Fires after the component markup is <a href=\"#/api/Ext.grid.Panel-property-rendered\" rel=\"Ext.grid.Panel-property-rendered\" class=\"docClass\">rendered</a>.</p>\n"
    },
    {
      "tagname": "event",
      "name": "resize",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires after the component is resized.</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "adjWidth",
          "doc": "<p>The box-adjusted width that was set</p>\n",
          "optional": false
        },
        {
          "type": "Number",
          "name": "adjHeight",
          "doc": "<p>The box-adjusted height that was set</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 647,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-resize",
      "shortDoc": "<p>Fires after the component is resized.</p>\n"
    },
    {
      "tagname": "event",
      "name": "scrollerhide",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires when a scroller is hidden</p>\n",
      "params": [
        {
          "type": "Ext.grid.Scroller",
          "name": "scroller",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "String",
          "name": "orientation",
          "doc": "<p>Orientation, can be 'vertical' or 'horizontal'</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 160,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-scrollerhide",
      "shortDoc": "<p>Fires when a scroller is hidden</p>\n"
    },
    {
      "tagname": "event",
      "name": "scrollershow",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires when a scroller is shown</p>\n",
      "params": [
        {
          "type": "Ext.grid.Scroller",
          "name": "scroller",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "String",
          "name": "orientation",
          "doc": "<p>Orientation, can be 'vertical' or 'horizontal'</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 167,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-scrollershow",
      "shortDoc": "<p>Fires when a scroller is shown</p>\n"
    },
    {
      "tagname": "event",
      "name": "selectionchange",
      "member": "Ext.panel.Table",
      "doc": "<p>Fires when the selected nodes change. Relayed event from the underlying selection model.</p>\n",
      "params": [
        {
          "type": "Ext.view.View",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Array",
          "name": "selections",
          "doc": "<p>Array of the selected nodes</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Table.js",
      "linenr": 507,
      "html_filename": "Table2.html",
      "href": "Table2.html#Ext-panel-Table-event-selectionchange",
      "shortDoc": "<p>Fires when the selected nodes change. Relayed event from the underlying selection model.</p>\n"
    },
    {
      "tagname": "event",
      "name": "show",
      "member": "Ext.AbstractComponent",
      "doc": "<p>Fires after the component is shown when calling the <a href=\"#/api/Ext.grid.Panel-event-show\" rel=\"Ext.grid.Panel-event-show\" class=\"docClass\">show</a> method.</p>\n",
      "params": [
        {
          "type": "Ext.Component",
          "name": "this",
          "doc": "\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/AbstractComponent.js",
      "linenr": 587,
      "html_filename": "AbstractComponent.html",
      "href": "AbstractComponent.html#Ext-AbstractComponent-event-show",
      "shortDoc": "<p>Fires after the component is shown when calling the <a href=\"#/api/Ext.grid.Panel-event-show\" rel=\"Ext.grid.Panel-event-show\" class=\"docClass\">show</a> method.</p>\n"
    },
    {
      "tagname": "event",
      "name": "staterestore",
      "member": "Ext.state.Stateful",
      "doc": "<p>Fires after the state of the object is restored.</p>\n",
      "params": [
        {
          "type": "Ext.state.Stateful",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "state",
          "doc": "<p>The hash of state values returned from the StateProvider. This is passed\nto <b><tt>applyState</tt></b>. By default, that simply copies property values into this\nobject. The method maybe overriden to provide custom state restoration.</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/state/Stateful.js",
      "linenr": 112,
      "html_filename": "Stateful.html",
      "href": "Stateful.html#Ext-state-Stateful-event-staterestore",
      "shortDoc": "<p>Fires after the state of the object is restored.</p>\n"
    },
    {
      "tagname": "event",
      "name": "statesave",
      "member": "Ext.state.Stateful",
      "doc": "<p>Fires after the state of the object is saved to the configured state provider.</p>\n",
      "params": [
        {
          "type": "Ext.state.Stateful",
          "name": "this",
          "doc": "\n",
          "optional": false
        },
        {
          "type": "Object",
          "name": "state",
          "doc": "<p>The hash of state values. This is determined by calling\n<b><tt>getState()</tt></b> on the object. This method must be provided by the\ndeveloper to return whetever representation of state is required, by default, <a href=\"#/api/Ext.state.Stateful\" rel=\"Ext.state.Stateful\" class=\"docClass\">Ext.state.Stateful</a>\nhas a null implementation.</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/platform/src/state/Stateful.js",
      "linenr": 133,
      "html_filename": "Stateful.html",
      "href": "Stateful.html#Ext-state-Stateful-event-statesave",
      "shortDoc": "<p>Fires after the state of the object is saved to the configured state provider.</p>\n"
    },
    {
      "tagname": "event",
      "name": "titlechange",
      "member": "Ext.panel.Panel",
      "doc": "<p>Fires after the Panel title has been set or changed.</p>\n",
      "params": [
        {
          "type": "Ext.panel.Panel",
          "name": "p",
          "doc": "<p>the Panel which has been resized.</p>\n",
          "optional": false
        },
        {
          "type": "String",
          "name": "newTitle",
          "doc": "<p>The new title.</p>\n",
          "optional": false
        },
        {
          "type": "String",
          "name": "oldTitle",
          "doc": "<p>The previous panel title.</p>\n",
          "optional": false
        }
      ],
      "private": false,
      "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/panel/Panel.js",
      "linenr": 315,
      "html_filename": "Panel3.html",
      "href": "Panel3.html#Ext-panel-Panel-event-titlechange",
      "shortDoc": "<p>Fires after the Panel title has been set or changed.</p>\n"
    }
  ],
  "filename": "/Users/nick/Projects/sencha/SDK/extjs/src/grid/Panel.js",
  "linenr": 1,
  "html_filename": "Panel2.html",
  "href": "Panel2.html#Ext-grid-Panel",
  "cssVar": [

  ],
  "cssMixin": [

  ],
  "component": true,
  "superclasses": [
    "Ext.AbstractComponent",
    "Ext.Component",
    "Ext.container.AbstractContainer",
    "Ext.container.Container",
    "Ext.panel.AbstractPanel",
    "Ext.panel.Panel",
    "Ext.panel.Table"
  ],
  "subclasses": [
    "Ext.grid.property.Grid"
  ],
  "mixedInto": [

  ],
  "allMixins": [
    "Ext.util.Floating",
    "Ext.util.Observable",
    "Ext.util.Animate",
    "Ext.state.Stateful"
  ]
});