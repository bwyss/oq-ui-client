/*
 Copyright (c) 2010-2012, GEM Foundation.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/agpl.html>. */
    
Explore_Basic = Ext.extend(gxp.Viewer, {

    legendTabTitle: "Legend",
	summaryId: null,

    constructor: function(config) {

        Ext.Window.prototype.shadow = false;

        var user_profile = new Ext.Panel({
            labelWidth: 90,
            border: false,
            width: 400,
            hideBorders: true,
            autoScroll: 'true',
            items: [{
                html: '<img src="http://openquake.org/wp-content/uploads/2012/01/Screen-Shot-2012-01-13-at-2.41.04-PM.png">'
            }]
        });

        Ext.applyIf(config, {
            proxy: "/proxy?url=",

            mapItems: [{
                xtype: "gx_zoomslider",
                vertical: true,
                height: 100
            }, {
                xtype: "gxp_scaleoverlay"
            }],
            portalItems: [{
                region: "center",
                layout: "border",
                tbar: {
                    id: "paneltbar",
                    items: ["-"]
                },
                items: [{
                    id: "west",
                    region: "west",
                    layout: "accordion",
                    width: 280,
                    split: true,
                    collapsible: true,
                    collapseMode: "mini",
                    header: false,
                    border: false,
                    defaults: {
                        hideBorders: true,
                        autoScroll: true
                    },
                    items: [{
                        id: "tree",
                        title: "Layers"
                    }, {
                        id: "user",
                        title: "User Profile",
                        items: [user_profile],
                        padding: 10
                    }]
                },
		"map", {
                    id: "featuregrid",
                    layout: "fit",
                    region: "south",
                    border: false,
                    height: 0,
                    split: true,
                    collapseMode: "mini"
                }]
            }],

            tools: [{
                actionTarget: {target: "paneltbar", index: 0},
                outputAction: 0,
                outputConfig: {
                    title: "Login",
                    width: 900,
                    height: 500,
                    modal: true
                },
                actions: [{
                    iconCls: "icon-geoexplorer",
                    text: "Login"
                }]
            }, {
                ptype: "gxp_layertree",
                outputTarget: "tree"
            }, {
                ptype: "gxp_featuremanager",
                id: "featuremanager",
                autoLoadFeatures: true,
                autoSetLayer: false,
                paging: false,
                maxFeatures: 100
            }, {
                ptype: "gxp_featuregrid",
                alwaysDisplayOnMap: true,
                selectOnMap: true,
                displayMode: "selected",
                featureManager: "featuremanager",
                outputTarget: "featuregrid",
                outputConfig: {
                    id: "grid"
                },
                controlOptions: {
                    multiple: true
                }
            }, {
                ptype: "gxp_googlegeocoder",
                outputTarget: "paneltbar",
                outputConfig: {
                    emptyText: "Search for a location ..."
                }
            }, {
		        ptype: "gxp_wmsgetfeatureinfo",
		        actionTarget: "paneltbar",
	            outputConfig: {
	                width: 400
	            }
	        }, {
	            ptype: "gxp_legend",
	            outputTarget: "west",
	            outputConfig: {
	                title: this.legendTabTitle,
	                autoScroll: true
	            }
	        }, {
	            ptype: "gxp_measure",
	            actionTarget: {target: "paneltbar", index: 6},
	            toggleGroup: "main"
	        }, {
	            ptype: "gxp_zoomtoextent",
	            actionTarget: "paneltbar"
	        }, {
	            ptype: "gxp_zoom",
	            actionTarget: "paneltbar"
	        }, {
	            ptype: "gxp_navigationhistory",
	            actionTarget: "paneltbar"
            }, {
                ptype: "gxp_zoomtoselectedfeatures",
                featureManager: "featuremanager",
                actionTarget: "paneltbar",
                tooltip: "Zoom to selected closure"
            }, {
                ptype: "gxp_selectedfeatureactions",
                featureManager: "featuremanager",
                actions: [{
                    menuText: "Feature context demo",
                    text: "Feature context demo",
                    urlTemplate: "/geoserver/wms/reflect?layers={layer}&width=377&height=328&format=application/openlayers&featureid={fid}"
                }],
                actionTarget: ["grid.contextMenu", "grid.bbar"],
                outputConfig: {
                    width: 410,
                    height: 410
                }
            }, {
                ptype: "gxp_snappingagent",
                id: "snapping-agent",
                targets: [{
                    source: "local",
                    name: "geonode:trace"
                }]
            }]
        });

        Explore_Basic.superclass.constructor.apply(this, arguments);
    }

});