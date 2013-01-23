Ext.Loader.setConfig({
    enabled: true
});

Ext.Loader.setPath('Ext.ux', '/static/lib/ext/examples/ux');
Ext.Loader.setPath('Ext.selection', '/static/lib/ext/src/selection');
Ext.Loader.setPath('Ext.grid', '/static/lib/ext/src/grid');

Ext.require([
    'Ext.layout.container.*',
    'Ext.tab.*',
    'Ext.grid.*',
    'Ext.form.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.form.*',
    'Ext.ux.RowExpander',
    'Ext.selection.CellModel',
    'Ext.button.*',
    'Ext.filefield.*'
]);

Ext.onReady(function () {
    /* 

     */



    Ext.namespace("psdPlanner");






    // ********* START - Setting up lattice constants GUI  *********



    Ext.define('a3range', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'a3start', type: 'float' },
            { name: 'a3step', type: 'float' },
            { name: 'a3end', type: 'float' }
        ]
    });


    Ext.define('a4range', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'a4start', type: 'float' },
            { name: 'a4step', type: 'float' },
            { name: 'a4end', type: 'float' }
        ]
    });

    var a3default = Ext.create('a3range', {
        a3start : 0.0,
        a3step  : 5.0,
        a3end: 0.1
    });




   // var store = Ext.create('Ext.data.Store', { model:'deviceModel', data: myData});







    psdPlanner.a3FieldSet = {
        itemId      : 'a3FieldSet',
        xtype       : 'fieldset',
        border      : false,
        defaultType : 'textfield',
        layout: { type: 'hbox',
            pack: 'start'
        },
        defaults    : {allowBlank : false,
            decimalPrecision: 10,
            labelPad:'2',
            labelWidth:'10',
            labelAlign:'left',
            anchor: '100%',
            hideTrigger: true,
            style: {'margin': '0px 5px 5px 0px',
                'border':0,
                'paddingRight':15
            },
            flex:1
        },
        items: [{fieldLabel: 'a3start',
            name: 'a3start'
        },
            {fieldLabel: 'a3step',
                name: 'a3step'
            },
            {fieldLabel: 'a3end',
                name: 'a3end'
            }
        ]
    };

    psdPlanner.a4FieldSet = {
        xtype       : 'fieldset',
        border      : false,
        itemId      : 'a4FieldSet',
        defaultType : 'textfield',
        layout: { type: 'hbox',
            pack: 'start'
        },
        defaults    : {allowBlank : false,
            decimalPrecision: 10,
            labelPad:'2',
            labelWidth:'2',
            labelAlign:'left',
            anchor: '100%',
            hideTrigger: true,
            style: {'margin': '0px 5px 5px 0px',
                'border':0,
                'paddingRight':15
            },
            flex:1
        },
        items: [{fieldLabel: 'a4start',
            name: 'a4start'
        },
            {fieldLabel: 'a4step',
                name: 'a4step'
            },
            {fieldLabel: 'a4end',
                name: 'a4end'
            }
        ]
    };



//    psdPlanner.RangePanel = {
//        xtype       : 'form',
//        border      : false,
//        title: 'scanRange',
//        itemId: 'scanRange',
//        labelWidth: '2',
//        labelAlign: 'left',
//        labelPad: '5',
//        frame: true,
//        height: 350,
//        defaultMargin : {top: 0, right: 5, bottom: 0, left: 5},
//        padding: '0 5 0 5',
//        //columnWidth: 0.5,
//        //anchor: '85%',
//        layout: {
//            type:'anchor'
//        },
//        items: [psdPlanner.a3FieldSet,psdPlanner.a4FieldSet]
//    }


    psdPlanner.RangePanel = Ext.create('Ext.form.Panel', {
        title: 'scanRange',
        labelWidth: 75, // label settings here cascade unless overridden
        url: 'save-form.php',
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        width: 500,
        //renderTo: Ext.getBody(),
        layout: 'anchor', // arrange fieldsets side by side
        //layoutConfig: {
        //    rows:2
        //},
        defaults: {
            bodyPadding: 4
        },
        items:[psdPlanner.a3FieldSet, psdPlanner.a4FieldSet]
    });



    psdPlanner.TopPanel = new Ext.Panel({
        layout: 'table',
        width: 1100,
        layoutConfig: {
            columns: 2
        },
        items: [psdPlanner.RangePanel]
    });

    var button =  new Ext.Button({applyTo:'button-div',text:'CALCULATE!', minWidth: 130, handler: calculateHandler});
    var conn = new Ext.data.Connection();



    function calculateHandler(button, event) {
        params = {'observations': [] };
        params.a3range=[];
        params.a4range=[];

        var a3start = Ext.ComponentQuery.query('panel #scanRange')[0].getComponent('a3FieldSet').query('textfield[name="a3start"]')[0].value;
        var a3step = Ext.ComponentQuery.query('panel #scanRange')[0].getComponent('a3FieldSet').query('textfield[name="a3step"]')[0].value;
        var a3stop = Ext.ComponentQuery.query('panel #scanRange')[0].getComponent('a3FieldSet').query('textfield[name="a3stop"]')[0].value;
        var a4start = Ext.ComponentQuery.query('panel #scanRange')[0].getComponent('a4FieldSet').query('textfield[name="a4start"]')[0].value;
        var a4step = Ext.ComponentQuery.query('panel #scanRange')[0].getComponent('a4FieldSet').query('textfield[name="a4step"]')[0].value;
        var a4stop = Ext.ComponentQuery.query('panel #scanRange')[0].getComponent('a4FieldSet').query('textfield[name="a4stop"]')[0].value;
        params.a3range.push({
            a3start:a3start,
            a3step:a3step,
            a3stop:a3stop
        });




//        var data=Ext.JSON.encode(params);
//        $.ajax({
//            url: '/nuclear_scattering',
//            type: 'POST',
//            data: {'data' : data},
//            success: function(response) {
//                //projectid is not in scope here; calling another function that has it.
//                psdPlanner.successFunction(response);
//            }
//        });
    }



    var menu = Ext.create('Ext.menu.Menu', {
        id: 'mainMenu',
        style: {
            overflow: 'visible',     // For the Combo popup

        },
        width: 300,
        height: 100,
        items: [
            {
                xtype : 'fileuploadfield',
                anchor : '100%',
                id : 'inputfile',
                emptyText : 'Select a file...',
                fieldLabel : 'File',
                name : 'file',
                buttonText : 'Browse...',
                labelWidth : 30

                //text: 'Upload Cif File',
                //checkHandler:cifFileHandler
            }],
        buttons: [{
            text: 'Upload',
           // handler: cifFileHandler
            //handler: function() {
            //var form = this.up('form').getForm();
            //if(form.isValid()){
            //form.submit({
            //url: 'photo-upload.php',
            //waitMsg: 'Uploading your photo...',
            //success: function(fp, o) {
            //Ext.Msg.alert('Success', 'Your photo "' + o.result.file + '" has been uploaded.');
            //}
            //});
            //}
            //}
        }]

        //checkHandler: cifFileHandler
        //handler: function() {
        //var form = this.up('form').getForm();
        //if(form.isValid()){
        //form.submit({
        //url: 'photo-upload.php',
        //waitMsg: 'Uploading your photo...',
        //success: function(fp, o) {
        //Ext.Msg.alert('Success', 'Your photo "' + o.result.file + '" has been uploaded.');
        //}
        //});
        //}
        //}


    });


    var tb = Ext.create('Ext.toolbar.Toolbar',{
        text: 'Users',
        iconCls: 'user',
        items:[
            {
                text:'File',
                iconCls: 'bmenu',  // <-- icon
                menu: menu  // assign menu by instance
            },]
    });




    var TotalPanel = {
        xtype       : 'fieldset',
        border      : false,
        defaultType : 'textfield',
        layout: { type: 'vbox',
            pack: 'start'
        },
        //defaultMargin : {top: 0, right: 5, bottom: 0, left: 5},
        //padding: '0 5 0 5',
        defaults    : {allowBlank : false,
            decimalPrecision: 10,
            labelPad:'2',
            labelWidth:'2',
            labelAlign:'left',
            anchor: '100%',
            hideTrigger: true,
            style: {'margin': '0px 5px 5px 0px',
                'border':0,
                'paddingRight':15
            },
            flex:1
        },
        items: [tb,psdPlanner.TopPanel]
    };

    var myTabs = new Ext.TabPanel({
        resizeTabs: true, // turn on tab resizing
        minTabWidth: 115,
        tabWidth: 800,
        enableTabScroll: true,
        width: 1200,
        height: 765,
        activeItem: 'psdPlannerTab', //Making the calculator tab selected first
        defaults: {autoScroll:true},
        items: [
            {
                title: 'PSD Planner',
                id: 'psdPlannerTab',
                iconCls: '/static/img/silk/calculator.png',
                items: [psdPlanner.RangePanel]
            }, {
                title: 'Help Manual',
                id: 'helpmanualtab',
                padding: 5,
                iconCls: '/static/img/silk/help.png',
                html: '<h1>Hi</h1>'

            }
        ]
    });

// ************************** END - Setting up the tabs  **************************
    myTabs.render('tabs');
});