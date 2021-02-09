jQuery(document).ready(function() {
	$(document).on("change", ".checkbox-done", function() {
		var value = "";
		if ($(this).is(":checked")) {
		 value = $(this).val();
		} else{
			value = "false";
		}
		var id = parseInt($(this).attr("data-target"));
		$.ajax({
			type: "POST",
			url: window.location.href,
			data: {
				value: value,
				id: id
			},
			success: function(html) {
			}
		});
	});
	/*$(document).on("change", ".checkbox-undone", function() {
		if ($(this).is(":unchecked")) {
			var value2 = $(this).val();
			var id = parseInt($(this).attr("data-target"));

			$.ajax({
				type: "POST",
				url: window.location.href,
				data: {
					value2: value2,
					id: id
				},
				success: function(html) {
					console.log(html);
				}
			});
		}
	});*/


	$(document).ready(function() {
		var table = $(document).find("#records");
		table.find("tr").each(function() {
			if ($(this).hasClass("active"))
				$(this).css("backgroundColor", "lightGreen");
			else
				$(this).css("backgroundColor", "white");
		});

		$("#records").DataTable({
			language: {
				//"url": url + "assets/datatables/DataTables-1.10.21/Plugins/i18n/czech.lang"
				sEmptyTable: "Tabulka neobsahuje žádná data",
				sInfo: "Zobrazuji _START_ až _END_ z celkem _TOTAL_ záznamů",
				sInfoEmpty: "Zobrazuji 0 až 0 z 0 záznamů",
				sInfoFiltered: "(filtrováno z celkem _MAX_ záznamů)",
				sInfoPostFix: "",
				sInfoThousands: " ",
				sLengthMenu: "Zobraz záznamů _MENU_",
				sLoadingRecords: "Načítám...",
				sProcessing: "Provádím...",
				sSearch: "Hledat:",
				sZeroRecords: "Žádné záznamy nebyly nalezeny",
				oPaginate: {
					sFirst: "První",
					sLast: "Poslední",
					sNext: "Další",
					sPrevious: "Předchozí",
				},
				oAria: {
					sSortAscending: ": aktivujte pro řazení sloupce vzestupně",
					sSortDescending: ": aktivujte pro řazení sloupce sestupně",
				},
			},
		});
		$(".daterange").daterangepicker({
		            //timePicker: true,
		            //autoUpdateInput: false,
								//autoUpdateInput: false,
								singleDatePicker: true,
		            //startDate: moment().startOf('hour'),
		            //endDate: moment().startOf('hour').add(32, 'hour'),
		            //timePicker24Hour: true,
		            locale: {
		                "format": 'DD.MM.YYYY',
		                "separator": " - ",
		                "applyLabel": "Použít",
		                "cancelLabel": "Zrušit",
		                "fromLabel": "Od",
		                "toLabel": "Do",
		                "daysOfWeek": [
		                    "Ne",
		                    "Po",
		                    "Út",
		                    "St",
		                    "Čt",
		                    "Pá",
		                    "So"
		                ],
		                "monthNames": [
		                    "Leden",
		                    "Únor",
		                    "Březen",
		                    "Duben",
		                    "Květen",
		                    "Červen",
		                    "Červenec",
		                    "Srpen",
		                    "Září",
		                    "Říjen",
		                    "Listopad",
		                    "Prosinec"
		                ],
		                "firstDay": 1
		            }
		        });
	});

});
