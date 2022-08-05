//define column header menu as column visibility toggle
    var headerMenu = function(){
      var menu = [];
      var columns = this.getColumns();

      for(let column of columns){
        //create checkbox element using font awesome icons
        let icon = document.createElement("i");
        icon.classList.add("fas");
        icon.classList.add(column.isVisible() ? "fa-check-square" : "fa-square");
        //build label
        let label = document.createElement("span");
        let title = document.createElement("span");

        title.textContent = " " + column.getDefinition().title;

        label.appendChild(icon);
        label.appendChild(title);
        //create menu item
        menu.push({
          label:label,
          action:function(e){
            //prevent menu closing
            e.stopPropagation();
            //toggle current column visibility
            column.toggle();

            //change menu item icon
            if(column.isVisible()){
              icon.classList.remove("fa-square");
              icon.classList.add("fa-check-square");
            } else {
                icon.classList.remove("fa-check-square");
                icon.classList.add("fa-square");
              }
          }
        });
      }
      return menu;
    };
//Generate print icon
    var viewIcon = function(cell, formatterParams){ //plain text value
        var celda = cell._cell.row.data;
        var ark = celda.ark;
        var tipo = celda.typ;
        // console.log(tipo);
        if (tipo == "N"){
          return "<i class='icon_img fa fa-ban'></i>";
         } else {
          if (ark !== ""){
            return "<i class='icon_img fa fa-id-card-o'></i>";
          } else {
            return "<i class='icon_img fa fa-camera-retro'></i>";
          }
        }
    };

    var urlpre = "https://www.familysearch.org/ark:/61903/1:1:";
    var urlprelong = "https://www.familysearch.org/records/images/image-details?page=1&place=";

// **********************  Hojas  *************************
    // var tree = new ClassyLeaves({
    //   leaves: 20,
    //   maxY: -10,
    //   multiplyOnClick: true,
    //   multiply: 2,
    //   infinite: true,
    //   speed: 4000
    //     });
    // $('body').on('click', '.addLeaf', function() {
    //   console.log('8');
    //   tree.add(8);
    //   return false;
    // });

// **********************Tabla****************************
  var table = new Tabulator("#example-table", {
    pagination:"local",
    paginationSize:100,
    paginationSizeSelector:[50, 100, 500, 1000, true],
    height: "70vh",
    data:data,
    dataTree:true,
    dataTreeFilter:true,
    dataTreeSort:true,
    dataTreeStartExpanded:true,
    dataTreeElementColumn:"ns",
    dataTreeStartExpanded:[true, true],
    layout:"fitColumns",
    responsiveLayout:true,
    clipboard:true,    
    placeholder:"Esperando por datos a ser cargados...",
    headerSortTristate:true,
    columns: [ //Define Table Columns
      { title:"Sec",formatter:"rownum", headerSort:false, hozAlign:"center", maxWidth:55, responsive:5, headerMenu:headerMenu, download:false},
      { title:"ID Ind",field: "Id", sorter: "number", hozAlign:"center", headerFilterPlaceholder:"ID", headerFilter:"input", visible:false,  minWidth:60, maxWidth:120, responsive:4, headerMenu:headerMenu, download:false},
      { title:"IDPadres",field: "pid", sorter: "number", hozAlign:"center", headerFilterPlaceholder:"Padres", headerFilter:"input", visible:false,  minWidth:75, maxWidth:120, responsive:4, headerMenu:headerMenu, download:false,
        cellClick:function(e, cell) {
          var celda = cell._cell.row.data;
          fieldST.value = "";
          valueST.value = "";
          fieldCT.value = "";
          valueCT.value = "";
          fieldEl.value = "";
          typeEl.value = "=";
          valueEl.value = "";
          table.clearFilter();
          table.setFilter("fid", "=", celda.pid);
        }
      },
      { title:"IDFam",field: "fid", sorter: "number", hozAlign:"center", headerFilterPlaceholder:"Familia", headerFilter:"input", visible:false,  minWidth:75, maxWidth:120, responsive:4, headerMenu:headerMenu, download:false},
      { title:"Tipo",field: "typ", sorter: "string", align: "center", headerFilterPlaceholder:"Tipo", headerFilter:"input", minWidth:53, maxWidth:120, responsive:3, headerMenu:headerMenu, titleDownload:"Record Type",
       		tooltip:function(cell){
            	switch (cell.getValue()){
            		case 'M': tipo = "Matrimonio";
                		break;
            		case 'B': tipo = "Bautizo";
            			break;
	            	case 'D': tipo = "Defunción";
	            		break;
	            	case 'H': tipo = "Hijo reconocido al casarse los padres";
                		break;
              		case 'P': tipo = "Padres de los contrayentes de un matrimonio";
                		break;
              		case 'N': tipo = "Padres sin imagen en FamilySearch pero con muchos hijos en esta tabla";
            	};
            	return  tipo; //return cells "field - value";
      		},
          
          	cellClick:function(e, cell){
	            var celda = cell._cell.row.data;
	            var imagen = celda.img - 1;
	            var rms = celda.rms;
              var pcode = celda.cr;
	            var stcode = celda.st;
	            var ctcode = celda.cit;
	            var conyg = celda.fid;
	            var gend = celda.sex;
	            var type = celda.typ;
	            var padres = celda.pid;
	            var nombres = celda.ns.split(" ");
	            var apellidos = celda.lns.split(" ");
	            var nombre = nombres[0] + " " + apellidos[0];
	            var sexo = "";
              var ark = celda.ark;

	            //console.log(type);

	            clearAppend();
	            $(".hijos").show();
	            $("#mishijos").show();
	            $("#btn_image").show();
	            
	            $("#cerrarModal").click(clearAppend());

	            if (gend == "M") {
	              $("#modal-header").removeClass("modal-woman").addClass("modal-man");
	              $("#logo-modal").removeClass("logo-modal-F").addClass("logo-modal-M");
	            } else {
	              $("#modal-header").removeClass("modal-man").addClass("modal-woman");
	              $("#logo-modal").removeClass("logo-modal-M").addClass("logo-modal-F");
	            }
	                      
	            

	            if (type == "N") {
	              $("#btn_image").hide();
	            } else {
		            var rms = recordset.map( function(record) {      
		              if( record.id == rms){
                    if (ark !== "") {
                        var url = urlpre + ark;
                    } else {
                        var url = urlprelong + record.locat + "&rmsId=" + record.rmsID + "&imageIndex=" + imagen + "&singleView=true"           
                    }; 
                    $("#btn_image").html("Ver registro de " + nombre );
		                $("#btn_image").click( function(){
		                  window.open(url);
		                });
		              }            
		            })
	            };

	            //$("#personal").append('<li id="cy"></li>');
	            //*********   CONYUGUE  *********
	            if (celda.typ == "M" || celda.typ == "P" || celda.typ == "N"){  
	              var conyuge = data.map( function(family){
	                if (family.fid == conyg && family.typ == type && family.sex != gend){
                    var rms = family.rms;
                    var img = family.img - 1;
                    var link = recordset.map(function (record) {
                      if (record.id == rms) {
                        if (ark !== "") {
                          var myurl = urlpre + ark;
                        } else {
                            var myurl = '"' + urlprelong + record.locat + '&rmsId=' + record.rmsID + '&imageIndex=' + img + '&singleView=true", target="_blank"';        
                        };
                        // Alternar para aparecer o no el link de la imagen del conyugue
                        // $('#cy').html('Cónyugue: <i><a href=' + myurl + '>' + family.ns + ' ' + family.lns + '</a></i>');
                        $('#cy').html('Cónyugue: <i><b>'+ family.ns + ' ' + family.lns+ '</b></i>');
                      }
                    })
	                };
	              });
	              } else {
	                $("#cy").html("Cónyugue: <i> No Aplica</i>");  
	            };


	            //*********** PADRES ***************
	            var papa = data.map( function(padre){                                       	
	              if (padre.fid == padres && padre.sex == "M" && padre.typ != "B" && padre.typ != "D" && padre.typ != "H"){
	                if (padre.typ == "N"){
	                  $('#papa').html('Padre: <i>'+ padre.ns+' '+padre.lns + '</i>');
	                } else {
	                  var rms = padre.rms;
	                  var img = padre.img - 1;
	                  var link = recordset.map( function(record) {      
	                    if( record.id == rms){
                        if (ark !== "") {
                          var myurl = urlpre + ark;
                        } else {
                            var myurl = '"' + urlprelong + record.locat + '&rmsId=' + record.rmsID + '&imageIndex=' + img + '&singleView=true", target="_blank"';        
                        }; 
                        // Alternar para aparecer o no el link de la imagen del papa
	                      // $('#papa').html('Padre: <i><a href='+ myurl +'>' + padre.ns+' '+padre.lns + '</a></i>');
                        $('#papa').html('Padre: <i>'+ padre.ns+' '+padre.lns + '</i>');
	                    }                    
	                  })              
	                }
	              }
	            });

	            var mama = data.map( function(madre){
	              if (madre.fid == padres && madre.sex == "F" && madre.typ != "B" && madre.typ != "D" && madre.typ != "H"){
	                if (madre.typ == "N"){
	                  $('#mama').html('Madre: <i>'+ madre.ns+' '+madre.lns + '</i>');
	                } else {                  
	                  var rms = madre.rms;
	                  var img = madre.img - 1;
	                  var link = recordset.map( function(record) {      
	                    if( record.id == rms){
                        if (ark !== "") {
                          var myurl = urlpre + ark;
                        } else {
                            var myurl = '"' + urlprelong + record.locat + '&rmsId=' + record.rmsID + '&imageIndex=' + img + '&singleView=true", target="_blank"';        
                        };
                        if( madre.ns+' '+madre.lns !== "del Valle Josefina Montilla Patiño de Garcia") {
                        // Alternar para aparecer o no el link de la imagen de la mama
	                       // $('#mama').html('Madre: <i><a href='+ myurl +'>' + madre.ns+' '+madre.lns + '</a></i>');
                         $('#mama').html('Madre: <i>'+ madre.ns+' '+madre.lns + '</i>');
                       }
	                    }                    
	                  })
	                }
	              }
	            });

	            //************* HIJOS ***************
	            if (type == "M" || type == "P" || type == "N") {
		            var child = data.map (function(hijo){           	
		            	if (hijo.pid == conyg){
		            		var rms = hijo.rms;
		                var img = hijo.img;
                    var ark = hijo.ark;
		                var link = recordset.map( function (record){
		                 	if ( record.id == rms) {
                        if (ark !== "") {
                          var myurl = urlpre + ark;
                        } else {
                            var myurl = '"' + urlprelong + record.locat + '&rmsId=' + record.rmsID + '&imageIndex=' + img + '&singleView=true", target="_blank"';        
                        };
                        // Alternar para aparecer o no el link de la imagen de los hijos
                        // $('table tbody').append('<tr><td>' + hijo.typ + '</td><td><a href='+ myurl +'>' + hijo.ns +' ('+hijo.ind +')'+'</a></td><td>' + hijo.not +'</td></tr>');
		                  	$('table tbody').append('<tr><td>' + hijo.typ + '</td><td>' + hijo.ns +' ('+hijo.ind +')'+'</td><td>' + hijo.not +'</td></tr>');
		                  } 
		                	})
		                }                                
		            })
	        	} else {
	        		$(".hijos").hide();
				};
	            
	            typRegister(celda.typ);

	            $("#recordModalLabel").html(celda.ns + " " + celda.lns);
	            $("#ns").html("Nombres: <i><b>" + celda.ns + "</b></i>");
	            $("#lns").html("Apellidos: <i><b>" + celda.lns + "</b></i>");
	            $("#sex").html("Sexo: <i> " + gender(celda.sex) + "</i>");

	            $("#typ").html("Tipo de registro: <i> " + tipo + "</i>");
	            $("#yy").html("Año: <i> " + celda.yy + "</i>");

	            var x = getCities();

              var stcity = x.map( function(city){
	              if (city.cityId == ctcode){
	                $("#ct").html("Ciudad: <i>" + city.cityName + "</i>");
	              }
	            });

	            var stcode = x.map( function(state){
	              if (state.stateId == stcode){
	                $("#st").html("Estado: <i>" + state.stateName + "</i>");
	              }
	            });

              var pzcode = x.map( function(country){
                if (country.paisCode == pcode){
                  $("#pz").html("Pais: <i>" + country.paisName + "</i>");
                }
              });

	            $("#recordModal").modal(); 	           
          	}
  	   },
      { title:"Nombres",field: "ns", sorter: "string", align: "left", headerFilterPlaceholder:"Nombre(s)", minWidth:100, headerFilter: "input", widthGrow:1.4, headerMenu:headerMenu },
      { title:"Apellidos",field: "lns", bottomCalc: "count", sorter: "string", headerFilterPlaceholder:"Apellido(s)", minWidth:120, headerFilter: "input", widthGrow:1.4, headerMenu:headerMenu },
      { title:"Sexo",field: "sex", sorter: "string", align: "center", editor:"select", headerFilterPlaceholder:"Sexo", headerFilter:"input", visible:false, minWidth:55, maxWidth:100, responsive:6, headerMenu:headerMenu },
      { title:"Indice",field: "ind", sorter: "string", align: "left" , headerFilterPlaceholder:"Indice", headerFilter:"input", maxWidth:100, headerMenu:headerMenu, download:false},
      { title:"Padres",field: "pad", sorter: "string", align: "left" , headerFilterPlaceholder:"Padres",headerFilter:"input", minWidth:50, widthGrow:1.25, headerMenu:headerMenu, responsive:4},
      { title:"Año",field: "yy", sorter: "number", align: "center", headerFilter:"input", headerFilterPlaceholder:"Año", headerFilterParams:{values:true}, minWidth:45, maxWidth:100, headerMenu:headerMenu },
      // {formatter:viewIcon, width:40, hozAlign:"center", 
      //   cellClick:function(e, cell){
      //     viewImage(cell);
      //       event.preventDefault();
      //   },
      //   tooltip:function(cell){
      //       var celda = cell._cell.row.data;;
      //       var ark = celda.ark;
      //       var ty = celda.typ;
      //       var tipo ="";
      //       if (ty == "N") {
      //         tipo = "Sin imagen para mostrar";
      //       } else {
      //         if (ark !== "") {
      //             tipo = "Ir al Registro";
      //         } else{
      //           tipo = "Ver Imagen del evento";
      //         };
      //       }
      //         return  tipo; //return cells "field - value";
      //     },
      // }, 
      { title:"Notas",field: "not", sorter: "string", align: "left" , headerFilterPlaceholder:"Notas",headerFilter:"input", minWidth:50, headerMenu:headerMenu, responsive:4},
      { title:"Pais",field: "cr", sorter: "number", hozAlign:"center", headerFilter:"input", visible:false,  width:50, maxWidth:60, responsive:4, download:false},
      { title:"Ciudad",field: "cit", sorter: "number", hozAlign:"center", headerFilter:"input", visible:false,  width:50, maxWidth:60, responsive:4, download:false},
      { title:"Estado",field: "st", sorter: "number", hozAlign:"center",  headerFilter:"input", visible:false,  width:50, maxWidth:60, responsive:4, download:false},
    ],
      

    //Al hacer clic boton derecho, abre la imagen en familisearch
    rowContext:function(e, row){
      seeImage(row);
      event.preventDefault();
    }, //rowContext
      
      //Al tocar dos veces la fila. abre la imagen en familisearch
    rowDblTap:function(e, row){
      seeImage(row);
      event.preventDefault();
    }, //rowTapHold

    rowFormatter:function(row){
      if(row.getData().typ == "M"){
        if(row.getData().sex == "M"){
        	row.getElement().classList.add("table-parentsM");
        } else {
          row.getElement().classList.add("table-parentsF")};
      } 
      else {      
        if(row.getData().typ == "P" || row.getData().typ == "N"){
          if(row.getData().sex == "M"){
              row.getElement().classList.add("table-father");
          } 
          else {
              row.getElement().classList.add("table-mother")
          };  
        } 
        else {
          if(row.getData().sex == "F"){
              row.getElement().classList.add("table-daughter");
          } 
          else {
            row.getElement().classList.add("table-son");
          }
        }
      }
    }
  });

  //FUNCIONES ADICIONALES

  $('#fullscreen').click(function() {
    openFullscreen();
  });

  $("#title").click(function() {
      $("#filtro").toggle(500);
  });

  $('#secret').click(function() {
    $('aside').toggle(900);
    var $this = $('#tabla_Tab');
    setTimeout(function() {
      if ($this.hasClass('col-lg-9')) {
        setTimeout(function() {
          $this.removeClass('col-lg-9').addClass('col-lg-12');
          table.showColumn("Id");
          table.showColumn("pid");
          table.showColumn("fid");
          table.showColumn("not");
          table.showColumn("sex");
        }, 1000)
      } else {
          $this.removeClass('col-lg-12').addClass('col-lg-9');
          table.hideColumn("Id");
          table.hideColumn("pid");
          table.hideColumn("fid");
          table.hideColumn("sex");
        }
    });
  });


  $("#myBtn").click(function(){
    $("#exampleModal").modal();
  });

     //Define variables for input elements
  var fieldEl   = document.getElementById("filter-field");
  var typeEl    = document.getElementById("filter-type");
  var valueEl   = document.getElementById("filter-value");

  var paisSel   = document.getElementById("filter-country");
  var valueCR   = document.getElementById("filter-country");
  var fieldCR   = "cr";

  var estadoSel = document.getElementById("filter-state");
  var valueST   = document.getElementById("filter-state");
  var fieldST   = "st";

  var ciudadSel = document.getElementById("filter-city");
  var valueCT   = document.getElementById("filter-city");
  var fieldCT   = "cit"

  var typeEl2   = "=" ;

  
  $("#filtro").hide();
  $("#filter-field").change(updateFilter); // Filtro oculto
  $("#filter-type").change(updateFilter); // Filtro oculto
  $("#filter-value").keyup(updateFilter);  // Filtro oculto

  $("#cr_filter").change(countryFilter);
  $("#st_filter").change(stateFilter);
  $("#ct_filter").change(cityFilter);

 
  //Clear filters on "Clear Filters" button click
  $("#filter-clear").click(function(){
    fieldEl.value = "";
    typeEl.value  = "=";
    valueEl.value = "";
    table.clearFilter();
  });

  $("#filter-clear2").click(function(){
      fieldCR.value = "";
      valueCR.value = "";
      fieldST.value = "";
      valueST.value = "";
      fieldCT.value = "";
      valueCT.value = "";
      $(ciudadSel).html('<option value="000"  selected="true" disabled>Primero, escoja un estado</option>');
      $(estadoSel).html('<option value="000"  selected="true" disabled>Primero, seleccione un pais</option>');
      $("#title").html("Registros Parroquiales y Civiles");
      table.clearFilter();
    });


  //load a local file
  $("#file-load-trigger").click(function(){
      table.setDataFromLocalFile();
  });

// *********************** Drop Down List  ***************
  localidades.sort(GetSortOrder("pais"));//ordena localidades por estado

//Pais
$.each(localidades, function (index, value) {
    $(paisSel).append('<option value="'+value.code+'">'+value.pais+'</option>');
});


$(paisSel).on('change', function(){
    var paisChanged = paisSel.options[paisSel.selectedIndex].text;
    $("#title").html("Registros de "+ paisChanged);
    $(estadoSel).html('<option value="000" selected="true" disabled>-Escoja un Estado-</option>');
    $(ciudadSel).html('<option value="000"  selected="true" disabled>Primero, escoja un estado</option>');

    for(var i = 0; i < localidades.length; i++){
      if(localidades[i].code == $(this).val()){      
         $.each(localidades[i].estados, function (index, value) {
            $(estadoSel).append('<option value="'+value.code+'">'+value.name+'</option>');
        });
      }
    }

    $(estadoSel).on('change', function(){
        // console.log($(this).val());
        localidades.sort(GetSortOrder("city"));//ordena localidades por estados
        
        var estadoChanged = estadoSel.options[estadoSel.selectedIndex].text;
        $("#title").html("Registros de "+ estadoChanged + ", " + paisChanged); 

        var cities = getCities();
        $(ciudadSel).html('<option value="000"  selected="true" disabled>-Escoja una ciudad-</option>');
        var stateId = $(this).val();
        $.each(cities, function (index, value) {
          if (value.stateId == stateId) {
            $(ciudadSel).append('<option value="'+value.cityId +'">'+value.cityName+'</option>');
          }
        });

        $(ciudadSel).on('change', function(){
            // console.log($(this).val());
            var ciudadChanged = ciudadSel.options[ciudadSel.selectedIndex].text;
                $("#title").html("Registros de "+ ciudadChanged + ", Estado " + estadoChanged + ", " + paisChanged);  
        });
    });
});

//Obtiene todas la ciudades y estados de localidades
function getCities() {
    var cities = [];
    for(var i = 0; i < localidades.length; i++) {
      var countries = localidades[i];
      for(var j = 0; j < countries.estados.length; j++) {
          var state = countries.estados[j];
          for (var k = 0; k < state.ciudades.length; k++) {
            var city = state.ciudades[k];
            cities.push({
                paisName: countries.pais,
                paisCode: countries.code,
                stateId: state.code,
                stateName: state.name,
                cityId: city.code,
                cityName: city.name
            });
          }
      }
    }
    return cities;
}

//******************************************************************
getLns();
  function getLns() {
  // (A) GET THE PARAMETERS
  var params = new URLSearchParams(window.location.search),
      lns = params.get("apellido");
      ns = params.get("nombre");
      if (lns != null) {
        var field = "lns";
        lnsFilter(lns, field);}
      else if (ns != null) {
        var field = "ns";
        lnsFilter(ns, field);
      } else {table.clearFilter();}
  };

  function lnsFilter(record, field){
    // table.clearFilter();     
    var valor = record;

    table.setFilter(field, "like", valor);
  };

//Trigger setFilter function with correct parameters by Country
  function countryFilter(field, value, level){

    table.clearFilter();

    var filterVal = fieldCR;
    var typeVal   = typeEl2;  

    var filter    = filterVal == "function" ? customFilter : filterVal;

    if(filterVal == "function" ){
      typeEl2.disabled = true;
      valueCR.disabled = true;
    }else{
      typeEl2.disabled = false;
      valueCR.disabled = false;
    }

    if(filterVal){
      table.setFilter(filter,typeVal, valueCR.value);
    }
  };


//Trigger setFilter function with correct parameters by State
  function stateFilter(){
    
    var filterVal = fieldST;
    var typeVal = typeEl2;
    
    var filter = filterVal == "function" ? customFilter : filterVal;

    if(filterVal == "function" ){
      typeEl2.disabled = true;
      valueST.disabled = true;
    }else{
      typeEl2.disabled = false;
      valueST.disabled = false;
    }

    if(filterVal){
      //console.log(valueST.value);
      table.setFilter(filter,typeVal, valueST.value);
    }
  };

  //Trigger setFilter function with correct parameters by City
  function cityFilter(){

    var filterVal = fieldCT;
    var typeVal = typeEl2;

    var filter = filterVal == "function" ? customFilter : filterVal;

    if(filterVal == "function" ){
      typeEl2.disabled = true;
      valueCT.disabled = true;
    }else{
      typeEl2.disabled = false;
      valueCT.disabled = false;
    }
   
    if(filterVal){
      // console.log(valueCT.value);
      table.setFilter(filter,typeVal, valueCT.value);
    }
  };

  //Trigger setFilter function with correct parameters
  function updateFilter(){
    var filterVal = fieldEl.options[fieldEl.selectedIndex].value;
    var typeVal = typeEl.options[typeEl.selectedIndex].value;

    var filter = filterVal == "function" ? customFilter : filterVal;

    if(filterVal == "function" ){
      typeEl.disabled = true;
      valueEl.disabled = true;
    }else{
      typeEl.disabled = false;
      valueEl.disabled = false;
    }

    if(filterVal){
      table.setFilter(filter,typeVal, valueEl.value);
    }
  };

  //Comparer Function    
  function GetSortOrder(prop) {    
    return function(a, b) {    
      if (a[prop] > b[prop]) {    
        return 1;    
      } else 
        if (a[prop] < b[prop]) {    
          return -1;    
        }    
      return 0;    
    }    
  };


  function typRegister(cell){
    switch (cell){
      case 'M': tipo = "Matrimonio";
        break;
      case 'B': tipo = "Bautizo";
        break;
      case 'D': tipo = "Defunción";
        break;
      case 'H': tipo = "Hijo reconocido al casarse los padres";
        break;
      case 'P': tipo = "Padres de los contrayentes de un matrimonio";
        break;
      case 'N': tipo = "Padres sin imagen en FamilySearch pero con muchos hijos en esta tabla";
    };
    return  tipo; //return cells "field - value";
  };


  function seeImage(row){
    var datos = row.getData();
    var imagen = datos.img - 1;
    var rms = datos.rms;
    if (datos.typ != "N") {
    	var rms = recordset.map( function(record) {      
	    	if( record.id == rms){
	        	var url = "https://www.familysearch.org/records/images/image-details?page=1&place=" + record.locat + "&rmsId=" + record.rmsID + "&imageIndex=" + imagen + "&singleView=true"
	        	window.open(url);
	        	// $("#btn_image").click( function(){
	         //    	window.open(url);
	        	// });
      		}            
    	});
    }    
    return;
  };

  function viewImage(cell){
    var datos = cell._cell.row.data;;
    var imagen = datos.img - 1;
    var rms = datos.rms;
    //console.log(datos);
    var ark = datos.ark;
    if (datos.typ != "N") {
      var rms = recordset.map( function(record) {      
        if( record.id == rms){
            if (ark !== "") {
              var url = urlpre + ark;

            } else {
              var url = urlprelong + record.locat + "&rmsId=" + record.rmsID + "&imageIndex=" + imagen + "&singleView=true"
            
            };
            
            //console.log(url);
            window.open(url);
            // $("#btn_image").click( function(){
           //     window.open(url);
            // });
          }            
      });
    }    
    return;
  };

  function gender(cell){
    switch (cell){
      case 'F': sexo = "Femenino";
        break;
      case 'M': sexo = "Masculino";
        break;
      };
      return sexo;
  };


  function clearAppend(){
    $("#hijos").remove();
    $("#children").append('<table id="hijos" class="table table-striped"><thead><tr><th>Evento</th><th>Nombres</th><th>Notas</th></tr id="hijosch"><thead><tbody></tbody></table>');
    $("#mama").html("Madre: <i>Información no disponible</i>" );
    $("#papa").html("Padre: <i>Información no disponible</i>" );
  };

  function openFullscreen() {
    let elem = document.getElementById("table-box");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  };

  //trigger download of data.csv file
  $('#download-csv').bind('click', function() {
    table.download("csv", "data.csv");
  });

  
// Crea y agrega <li> y <td> a elementos en index
  var list = document.getElementById("lista");
  var list1 = document.getElementById("progress");
  var html = '';
  var html1 = '';

  updates.forEach(function (fechas) {
    html += fechas;
  });

  projects.forEach(function (proyectos){
    html1 += proyectos;
  });

  list.innerHTML = html;
  list1.innerHTML = html1;
