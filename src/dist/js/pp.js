$(function () {
  var machineDataJson = "../dist/data/machine-data.json",
    machineDetailDataJson = "../dist/data/machine-detail.json",
    machineDatatableJson = "../dist/data/machine-data-list.json",
    pcMachineJson = "../dist/data/pc-machine-data.json",
    pcMachineDatatableJson = "../dist/data/pc-machine-data-list.json",
    pcEngineJson = "../dist/data/pc-engine-data.json",
    pcForkliftJson = "../dist/data/pc-forklift-data.json",
    pcProjectJson = "../dist/data/pc-project-data.json",
    ppEngineJson = "../dist/data/pp-engine.json",
    ppEngineDatatableJson = "../dist/data/pp-engine-data-list.json";

  var loadingHtml = `
  <div
    class="absolute inset-0 z-30 flex items-center justify-center rounded-lg bg-opacity-40 bg-cloudy-50"
  >
    <div class="flex flex-col items-center">
      <div
        class="flex items-center justify-center w-16 h-16 mb-3 rounded-xl bg-black-0/50"
      >
        <img
          src="../dist/icons/loading.svg"
          class="spinner-border animate-spin"
          alt="loading"
        />
      </div>
      <span class="text-sm font-medium text-neutral-100"
        >Loading...</span
      >
    </div>
  </div>`;
  // ========== Start Machine ==========

  // ===== Start HighCharts =====
  var chartGen = Highcharts.chart("container", {
    chart: {
      type: "column",
      height: 370,
    },
    exporting: {
      enabled: false,
    },
    title: {
      text: "",
      align: "left",
    },
    xAxis: {
      lineWidth: 1,
      lineColor: "#CFD3DB",
      categories: ["Jan 24", "Feb 24", "Mar 24", "Apr 24", "Mei 24"],
      labels: {
        style: {
          color: "#5E677B",
          fontSize: "16px",
        },
      },
    },
    yAxis: {
      allowDecimals: true,
      min: 0,
      title: {
        text: "",
      },
      gridLineDashStyle: "longdash",
      lineWidth: 1,
      lineColor: "#CFD3DB",
      labels: {
        style: {
          color: "#5E677B",
          fontSize: "14px",
        },
        format: '{value} %',
      },
      plotLines: [
        {
          value: 7.0,
          color: "#3B9D3F",
          width: 4,
          zIndex: 4,
        },
      ],
    },

    tooltip: {
      shared: true,
    },

    legend: {
      backgroundColor: "#F6F8FB",
      borderColor: "#F6F8FB",
      borderWidth: 1,
      borderRadius: 16,
      shadow: false,
      itemStyle: {
        color: "#4B5262",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
        pointWidth: 16,
        groupPadding: 0.35, // Reduced space between groups of bars
      },
    },

    series: [
      {
        name: "Total YTD",
        data: [12.0, 13.0, 8.0, 12.5, 13.5],
        stack: "ytd",
        color: "#FDBA12",
      },
      {
        name: "Total MTD",
        data: [2.0, 1.0, 2.0, 3.0, 1.0],
        stack: "mtd",
        color: "#1480D8",
      },
      {
        name: "Exclude Impairment",
        data: [3.0, 4.0, 5.0, 16.0, 0],
        stack: "mtd",
        color: "#F26D0F",
      },
      {
        name: "Exclude TECO",
        data: [8.0, 11.0, 9.0, 12.0, 9.0],
        stack: "mtd",
        color: "#2C313A",
      },
      {
        name: "Budget GP",
        type: "scatter",
        color: "#3B9D3F",
        legendSymbol:'rectangle',
      },
    ],
  });

  // Machine DataTables
  var machineTableLoading = $("#machine-table-loading");
  var MachineTable = $("#machineTable").DataTable({
    ajax: {
      url: "../dist/data/machine-data-list.json", // Replace with the path to your JSON file
      dataSrc: "",
      beforeSend: function () {
        machineTableLoading.append(loadingHtml); // Show spinner before sending AJAX request
      },
      complete: function () {
        setTimeout(function () {
          machineTableLoading.empty(); // Hide spinner after data is loaded
        }, 300); // Delay of 1 second (1000 milliseconds)
      },
    },
    columns: [
      { data: "id" },
      { data: "company_code" },
      { data: "customer_no" },
      { data: "customer_name" },
      { data: "profit_center" },
      { data: "profit_center_name" },
      { data: "profit_center_class" },
      { data: "payer_no" },
      { data: "player_business_area" },
    ],
    columnDefs: [
      {
        searchable: false,
        orderable: false,
        targets: 0, // target the index column
      },
      { targets: "_all", className: "text-left-i" },
    ],
    order: [[1, "asc"]],
    layout: {
      topStart: null,
      topEnd: null,
      bottomStart: {
        info: {
          text: "Showing _START_ to _END_ of _TOTAL_ rows",
        },
        pageLength: {
          menu: [10, 25, 50, 500],
        },
      },
      bottomEnd: {
        paging: {
          numbers: 3,
        },
      },
    },
    pageLength: 10,
    language: {
      info: "Showing _START_ to _END_ of _TOTAL_ rows",
      infoEmpty: "0 rows",
      infoFiltered: "",
      lengthMenu: "_MENU_ rows per page",
      paginate: {
        previous: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
         <path d="M12.4695 4.16669L6.66684 9.96933L12.4695 15.772" stroke="#14142B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>`,
        next: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="rotate-180">
         <path d="M12.4695 4.16669L6.66684 9.96933L12.4695 15.772" stroke="#14142B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>`,
      },
    },
    responsive: true,
    autoWidth: false,
  });
  // Machine DataTables Search
  $("#searchMachineData").keyup(function () {
    MachineTable.search($(this).val()).draw();
  });

  function defaultModelMachine() {
    $(".machine-row").removeClass("bg-yellow-10");
    $("#mYtd").text("88.73M");
    $("#mMtd").text("10.95M");
    $("#mGpPlan").text("8.6%");
    $("#mGpTrans").text("8.6%");
    $("#mBudgetGp").text("7%");
    $("#mDataListTitle").text("Machine GP Data List");
    $("#rowMName").text("Machine Model");
    chartGen.yAxis[0].update({
      plotLines: [
        {
          value: 7,
          color: "#3B9D3F",
          width: 4,
          zIndex: 4,
        },
      ],
    });
    let mbread1 = $("#machine-bread li").eq(0);
    let mbread2 = $("#machine-bread li").eq(1);
    mbread1.find("a").css("color", "initial");
    mbread1.find("a").text("Machine GP %");
    mbread2.find("a").text("");
    mbread2.hide();

    // chart
    // let excludeTecoSeries = chartGen.series.find(function(series) {
    //   return series.name === "Exclude TECO";
    // });
    // excludeTecoSeries.setVisible(true);

    chartGen.xAxis[0].setCategories([
      "Jan 24",
      "Feb 24",
      "Mar 24",
      "Apr 24",
      "Mei 24",
    ]);
    chartGen.series[0].setData([12.0, 13.0, 8.0, 12.5, 13.5]);
    chartGen.series[1].setData([2.0, 1.0, 2.0, 3.0, 1.0]);
    chartGen.series[2].setData([3.0, 4.0, 5.0, 16.0, 0]);
    chartGen.series[3].setData([8.0, 11.0, 9.0, 12.0, 9.0]);
    chartGen.series[3].setVisible(true);
    chartGen.series[3].update({ showInLegend: true });

    // detail table
    let filterDetail = $(".detail-filter-btn"),
      total = $(".detail-total-btn"),
      revenue = $(".detail-revenue-lc-btn"),
      eTeco = $(".detail-exclude-teco-btn");

    filterDetail.addClass("hidden btn-white").removeClass("btn-secondary");
    total.removeClass("hidden btn-white").addClass("btn-secondary");
    revenue.removeClass("hidden");
    eTeco.removeClass("hidden");

    loadDataMachine(machineDataJson);
    MachineTable.ajax.url(machineDatatableJson).load();
  }

  function defaultModelEngine() {
    $(".machine-row").removeClass("bg-yellow-10");
    $("#mYtd").text("0.27M");
    $("#mMtd").text("8.45M");
    $("#mGpPlan").text("6.4%");
    $("#mGpTrans").text("6.6%");
    $("#mBudgetGp").text("9%");
    $("#rowMName").text("Machine Model");
    chartGen.yAxis[0].update({
      plotLines: [
        {
          value: 9,
          color: "#3B9D3F",
          width: 4,
          zIndex: 4,
        },
      ],
    });
    $("#mDataListTitle").text("Engine GP Data List");
    let mbread1 = $("#machine-bread li").eq(0);
    let mbread2 = $("#machine-bread li").eq(1);
    mbread1.find("a").css("color", "initial");
    mbread1.find("a").text("Engine GP %");
    mbread2.find("a").text("");
    mbread2.hide();

    // chart
    // let excludeTecoSeries = chartGen.series.find(function(series) {
    //   return series.name === "Exclude TECO";
    // });
    // excludeTecoSeries.setVisible(false);

    chartGen.xAxis[0].setCategories([
      "Jun 24",
      "Jul 24",
      "Aug 24",
      "Sep 24",
      "Okt 24",
    ]);
    chartGen.series[0].setData([14.0, 13.0, 10.0, 14.5, 14.0]);
    chartGen.series[1].setData([13.0, 11.0, 3, 4.0, 0]);
    chartGen.series[2].setData([6.0, 1.0, 4, 17.0, 0]);
    // chartGen.series[3].setData([7.0, 16.0, 5, 13.0, 30.0]);
    chartGen.series[3].setVisible(false);
    chartGen.series[3].update({ showInLegend: false });

    // detail table
    let filterDetail = $(".detail-filter-btn"),
      total = $(".detail-total-btn"),
      eImpairment = $(".detail-exclude-impairment-btn");

    filterDetail.addClass("hidden btn-white").removeClass("btn-secondary");
    total.removeClass("hidden btn-white").addClass("btn-secondary");
    eImpairment.removeClass("hidden");

    loadDataMachine(ppEngineJson);
    MachineTable.ajax.url(ppEngineDatatableJson).load();
  }

  function defaultPcMachine() {
    $(".machine-row").removeClass("bg-yellow-10");
    $("#mYtd").text("88.73M");
    $("#mMtd").text("10.95M");
    $("#mGpPlan").text("8.6%");
    $("#mGpTrans").text("8.6%");
    $("#mBudgetGp").text("7%");
    $("#mDataListTitle").text("All Machine GP Data List");
    $("#rowMName").text("Profit Center");
    chartGen.yAxis[0].update({
      plotLines: [
        {
          value: 7,
          color: "#3B9D3F",
          width: 4,
          zIndex: 4,
        },
      ],
    });

    let mbread1 = $("#machine-bread li").eq(0);
    let mbread2 = $("#machine-bread li").eq(1);
    mbread1.find("a").css("color", "initial");
    mbread1.find("a").text("All Machine GP %");
    mbread2.find("a").text("");
    mbread2.hide();

    // chart
    chartGen.xAxis[0].setCategories([
      "Jan 24",
      "Feb 24",
      "Mar 24",
      "Apr 24",
      "Mei 24",
    ]);
    chartGen.series[0].setData([12.0, 13.0, 8.0, 12.5, 13.5]);
    chartGen.series[1].setData([2.0, 1.0, 2.0, 3.0, 1.0]);
    chartGen.series[2].setData([3.0, 4.0, 5.0, 16.0, 0]);
    chartGen.series[3].setData([8.0, 11.0, 9.0, 12.0, 9.0]);

    // detail table
    let filterDetail = $(".detail-filter-btn"),
      total = $(".detail-total-btn"),
      revenue = $(".detail-revenue-lc-btn"),
      eTeco = $(".detail-exclude-teco-btn");

    filterDetail.addClass("hidden btn-white").removeClass("btn-secondary");
    total.removeClass("hidden btn-white").addClass("btn-secondary");
    revenue.removeClass("hidden");
    eTeco.removeClass("hidden");

    loadDataMachine(pcMachineJson);
    MachineTable.ajax.url(pcMachineDatatableJson).load();
  }

  function defaultPcForklift() {
    $(".machine-row").removeClass("bg-yellow-10");
    $("#mYtd").text("88.73M");
    $("#mMtd").text("10.95M");
    $("#mGpPlan").text("8.6%");
    $("#mGpTrans").text("8.6%");
    $("#mBudgetGp").text("7%");
    $("#mDataListTitle").text("Forklift GP Data List");
    $("#rowMName").text("Profit Center");
    chartGen.yAxis[0].update({
      plotLines: [
        {
          value: 7,
          color: "#3B9D3F",
          width: 4,
          zIndex: 4,
        },
      ],
    });
    let mbread1 = $("#machine-bread li").eq(0);
    let mbread2 = $("#machine-bread li").eq(1);
    mbread1.find("a").css("color", "initial");
    mbread1.find("a").text("Forklift GP %");
    mbread2.find("a").text("");
    mbread2.hide();

    // chart
    chartGen.xAxis[0].setCategories([
      "Jan 24",
      "Feb 24",
      "Mar 24",
      "Apr 24",
      "Mei 24",
    ]);
    chartGen.series[0].setData([12.0, 13.0, 8.0, 12.5, 13.5]);
    chartGen.series[1].setData([2.0, 1.0, 2.0, 3.0, 1.0]);
    chartGen.series[2].setData([3.0, 4.0, 5.0, 16.0, 0]);
    chartGen.series[3].setData([8.0, 11.0, 9.0, 12.0, 9.0]);

    // detail table
    let filterDetail = $(".detail-filter-btn"),
      total = $(".detail-total-btn"),
      eTeco = $(".detail-exclude-teco-btn"),
      eImpairment = $(".detail-exclude-impairment-btn");

    filterDetail.addClass("hidden btn-white").removeClass("btn-secondary");
    total.removeClass("hidden btn-white").addClass("btn-secondary");
    eTeco.removeClass("hidden");
    eImpairment.removeClass("hidden");

    loadDataMachine(pcForkliftJson);
    MachineTable.ajax.url(pcMachineDatatableJson).load();
  }

  function defaultPcEngine() {
    $(".machine-row").removeClass("bg-yellow-10");
    $("#mYtd").text("88.73M");
    $("#mMtd").text("10.95M");
    $("#mGpPlan").text("8.6%");
    $("#mGpTrans").text("8.6%");
    $("#mBudgetGp").text("7%");
    $("#mDataListTitle").text("All Engine GP Data List");
    $("#rowMName").text("Profit Center");
    chartGen.yAxis[0].update({
      plotLines: [
        {
          value: 7,
          color: "#3B9D3F",
          width: 4,
          zIndex: 4,
        },
      ],
    });
    let mbread1 = $("#machine-bread li").eq(0);
    let mbread2 = $("#machine-bread li").eq(1);
    mbread1.find("a").css("color", "initial");
    mbread1.find("a").text("All Engine GP %");
    mbread2.find("a").text("");
    mbread2.hide();

    // chart
    chartGen.xAxis[0].setCategories([
      "Jan 24",
      "Feb 24",
      "Mar 24",
      "Apr 24",
      "Mei 24",
    ]);
    chartGen.series[0].setData([12.0, 13.0, 8.0, 12.5, 13.5]);
    chartGen.series[1].setData([2.0, 1.0, 2.0, 3.0, 1.0]);
    chartGen.series[2].setData([3.0, 4.0, 5.0, 16.0, 0]);
    chartGen.series[3].setData([8.0, 11.0, 9.0, 12.0, 9.0]);

    // detail table
    let filterDetail = $(".detail-filter-btn"),
      total = $(".detail-total-btn"),
      eImpairment = $(".detail-exclude-impairment-btn");

    filterDetail.addClass("hidden btn-white").removeClass("btn-secondary");
    total.removeClass("hidden btn-white").addClass("btn-secondary");
    eImpairment.removeClass("hidden");

    loadDataMachine(pcEngineJson);
    MachineTable.ajax.url(pcMachineDatatableJson).load();
  }

  function defaultPcProject() {
    $(".machine-row").removeClass("bg-yellow-10");
    $("#mYtd").text("88.73M");
    $("#mMtd").text("10.95M");
    $("#mGpPlan").text("8.6%");
    $("#mGpTrans").text("8.6%");
    $("#mBudgetGp").text("7%");
    $("#mDataListTitle").text("Engine Project GP Data List");
    $("#rowMName").text("Profit Center");
    chartGen.yAxis[0].update({
      plotLines: [
        {
          value: 7,
          color: "#3B9D3F",
          width: 4,
          zIndex: 4,
        },
      ],
    });
    let mbread1 = $("#machine-bread li").eq(0);
    let mbread2 = $("#machine-bread li").eq(1);
    mbread1.find("a").css("color", "initial");
    mbread1.find("a").text("Engine Project GP %");
    mbread2.find("a").text("");
    mbread2.hide();

    // chart
    chartGen.xAxis[0].setCategories([
      "Jan 24",
      "Feb 24",
      "Mar 24",
      "Apr 24",
      "Mei 24",
    ]);
    chartGen.series[0].setData([12.0, 13.0, 8.0, 12.5, 13.5]);
    chartGen.series[1].setData([2.0, 1.0, 2.0, 3.0, 1.0]);
    chartGen.series[2].setData([3.0, 4.0, 5.0, 16.0, 0]);
    chartGen.series[3].setData([8.0, 11.0, 9.0, 12.0, 9.0]);

    // detail table
    let filterDetail = $(".detail-filter-btn"),
      total = $(".detail-total-btn"),
      eImpairment = $(".detail-exclude-impairment-btn");

    filterDetail.addClass("hidden btn-white").removeClass("btn-secondary");
    total.removeClass("hidden btn-white").addClass("btn-secondary");
    eImpairment.removeClass("hidden");

    loadDataMachine(pcProjectJson);
    MachineTable.ajax.url(pcMachineDatatableJson).load();
  }

  // handle detail filter
  $(".detail-filter-btn").click(function () {
    $(".detail-filter-btn").removeClass("btn-secondary").addClass("btn-white");
    $(this).addClass("btn-secondary").removeClass("btn-white");
  });

  // handle catBy
  $(".cat-by").click(function () {
    $(".cat-by").removeClass("btn-secondary").addClass("btn-white");
    $(this).addClass("btn-secondary").removeClass("btn-white");

    let catBy = $(this).attr("cat-by");
    $(".sub-cat").removeClass("active");
    if (catBy == "model") {
      $(".pp-model").toggleClass("hidden flex");
      $(".pp-pc").toggleClass("hidden flex");
      $(".pp-model").find(".sub-cat").first().addClass("active");

      defaultModelMachine();
      // detail table
      let filterDetail = $(".detail-filter-btn"),
        total = $(".detail-total-btn"),
        revenue = $(".detail-revenue-lc-btn"),
        eTeco = $(".detail-exclude-teco-btn");

      filterDetail.addClass("hidden btn-white").removeClass("btn-secondary");
      total.removeClass("hidden btn-white").addClass("btn-secondary");
      revenue.removeClass("hidden");
      eTeco.removeClass("hidden");
    }
    if (catBy == "pc") {
      $(".pp-model").toggleClass("hidden flex");
      $(".pp-pc").toggleClass("hidden flex");
      $(".pp-pc").find(".sub-cat").first().addClass("active");

      defaultPcMachine();
      // detail table
      let filterDetail = $(".detail-filter-btn"),
        total = $(".detail-total-btn"),
        eImpairment = $(".detail-exclude-impairment-btn"),
        eTeco = $(".detail-exclude-teco-btn");

      filterDetail.addClass("hidden btn-white").removeClass("btn-secondary");
      total.removeClass("hidden btn-white").addClass("btn-secondary");
      eImpairment.removeClass("hidden");
      eTeco.removeClass("hidden");
    }
  });

  // handle subcat
  $(".sub-cat").click(function () {
    $(".sub-cat").removeClass("active");
    $(this).addClass("active");

    let sub = $(this).attr("sub");
    if (sub == "machine") {
      defaultModelMachine();
    }
    if (sub == "engine") {
      defaultModelEngine();
    }
    if (sub == "allMachine") {
      defaultPcMachine();
    }
    if (sub == "allEngine") {
      defaultPcEngine();
    }
    if (sub == "forklift") {
      defaultPcForklift();
    }
    if (sub == "engineProject") {
      defaultPcProject();
    }
  });

  // handleClick Machine Data
  function handleRowClick(e) {
    $(".machine-row").removeClass("bg-yellow-10");
    $(this).addClass("bg-yellow-10");

    const rowData = $(this)
      .children("td")
      .map(function () {
        return $(this).text();
      })
      .get();

    $("#mYtd").text(rowData[1]);
    $("#mMtd").text(rowData[2]);
    $("#mGpPlan").text(rowData[3]);
    $("#mGpTrans").text(rowData[4]);
    $("#mDataListTitle").text(`${rowData[0]} GP Data List`);

    if ($(this).hasClass("bg-yellow-10")) {
      let mbread1 = $("#machine-bread li").eq(0);
      let mbread2 = $("#machine-bread li").eq(1);
      mbread1.find("a").css("color", "#959DAC");
      mbread2.find("a").text(rowData[0]);
      mbread2.show();
    }
  }

  $("#allMachineGp").click(function () {
    $(".machine-row").removeClass("bg-yellow-10");
    $("#mYtd").text("88.73M");
    $("#mMtd").text("10.95M");
    $("#mGpPlan").text("8.6%");
    $("#mGpTrans").text("8.6%");
    $("#mDataListTitle").text("Machine GP Data List");
    let mbread1 = $("#machine-bread li").eq(0);
    let mbread2 = $("#machine-bread li").eq(1);
    mbread1.find("a").css("color", "initial");
    mbread2.find("a").text("");
    mbread2.hide();
  });

  // Load data Machine
  function loadDataMachine(jsonData) {
    let loading = $("#machine-loading");
    let machineBody = $("#machine-body");
    let machineFooter = $("#machine-footer");

    machineBody.empty();
    machineFooter.empty();
    $.ajax({
      url: jsonData, // Replace with your server URL
      type: "GET",
      dataType: "json",
      beforeSend: function () {
        loading.show(); // Show spinner before sending AJAX request
      },
      success: function (data) {
        setTimeout(function () {
          let totYtd = 0,
            totMtd = 0,
            totGpPlan = 0,
            totGpTrans = 0,
            totGpActual = 0;

          data.forEach((v) => {
            const row = $("<tr>").addClass(
              "border-t border-t-[#DEDDDE] bg-white cursor-pointer hover:bg-yellow-10 machine-row"
            );

            const createCell = (text) =>
              $("<td>")
                .addClass(
                  "px-3 py-4 font-normal whitespace-nowrap text-secondary-90 font-sm"
                )
                .text(text);

            const colMachine = createCell(v.machine_model).addClass(
              "pr-4 pl-6"
            );
            const colYtd = createCell(v.ytd);
            const colMtd = createCell(v.mtd);
            const colGpPlan = createCell(v.gp_plan);
            const colGpTrans = createCell(v.gp_trans);
            const colGpActual = createCell(v.gp_actual);

            totYtd += parseFloat(v.ytd);
            totMtd += parseFloat(v.mtd);
            totGpPlan += parseFloat(v.gp_plan);
            totGpTrans += parseFloat(v.gp_trans);
            totGpActual += parseFloat(v.gp_actual);

            const colAction = $("<td>").addClass(
              "px-3 py-4 whitespace-nowrap text-secondary-90 font-sm"
            );
            const image = $("<img>")
              .attr("src", "../dist/icons/arrowBackneclos.svg")
              .addClass("h-4 w-4 rounded-full whitespace-nowrap");
            colAction.append(image);

            row.append(
              colMachine,
              colYtd,
              colMtd,
              colGpPlan,
              colGpTrans,
              colGpActual,
              colAction
            );
            row.click(handleRowClick);
            machineBody.append(row);
          });

          const rowFot = $("<tr>").addClass(
            "text-base font-semibold capitalize text-secondary-90 border-t border-t-[#DEDDDE] border-b border-b-[#DEDDDE] bg-cloudy-0"
          );

          const createCellFot = (text) =>
            $("<th>")
              .addClass(
                "px-3 py-4 font-semibold whitespace-nowrap text-secondary-90 font-sm"
              )
              .text(text);

          const colTotal = createCellFot("Total").addClass("pr-4 pl-6");
          const colFYtd = createCellFot(totYtd.toFixed(1) + " M");
          const colFMtd = createCellFot(totMtd.toFixed(1) + " M");
          const colFGpPlan = createCellFot(totGpPlan.toFixed(1) + " %");
          const colFGpTrans = createCellFot(totGpTrans.toFixed(1) + " %");
          const colFGpActual = createCellFot(totGpActual.toFixed(1) + " %");
          const colFAction = createCellFot("");

          rowFot.append(
            colTotal,
            colFYtd,
            colFMtd,
            colFGpPlan,
            colFGpTrans,
            colFGpActual,
            colFAction
          );

          machineFooter.append(rowFot);
          loading.hide();
        }, 300); // 1 seconds delay
      },
      error: function () {
        alert("Failed to fetch data.");
        loading.hide(); // Hide spinner in case of error
      },
    });
  }

  // Load data Machine Detail
  function loadDataMachineDetail(jsonData) {
    $.ajax({
      url: jsonData, // Replace with your server URL
      type: "GET",
      dataType: "json",
      success: function (data) {
        const machineDetailBody = $("#machine-detail-body");
        const machineDetailFooter = $("#machine-detail-footer");

        let totRevenue = 0,
          totCost = 0,
          totGp = 0;

        data.forEach((v) => {
          const row = $("<tr>").addClass(
            "border-t border-t-[#DEDDDE] bg-white"
          );

          const createCell = (text) =>
            $("<td>")
              .addClass(
                "px-4 py-2 font-normal whitespace-nowrap text-secondary-90 font-sm"
              )
              .text(text);
          const colPeriod = createCell(
            v.period ? `${formatDate(v.period)}` : "-"
          );
          const colRevenue = createCell(
            v.revenue_lc ? `(${formatNumber(v.revenue_lc)})` : "-"
          );
          const colCost = createCell(
            v.cost_lc ? `${formatNumber(v.cost_lc)}` : "-"
          );
          const colGp = createCell(v.gp ? `(${formatNumber(v.gp)})` : "-");
          const colMtd = createCell(v.mtd ? `${v.mtd}%` : "-");
          const colYtd = createCell(v.ytd ? `${v.ytd}%` : "-");

          totRevenue += parseFloat(v.revenue_lc);
          totCost += parseFloat(v.cost_lc);
          totGp += parseFloat(v.gp);

          row.append(colPeriod, colRevenue, colCost, colGp, colMtd, colYtd);
          machineDetailBody.append(row);
        });

        const rowFot = $("<tr>").addClass(
          "text-base font-semibold capitalize text-secondary-90 border-t border-t-[#DEDDDE] border-b border-b-[#DEDDDE] bg-cloudy-0"
        );

        const createCellFot = (text) =>
          $("<th>")
            .addClass(
              "px-3 py-3 font-semibold whitespace-nowrap text-secondary-90 font-sm last:rounded-br-lg"
            )
            .text(text);

        const colTotal = createCellFot("Grand Total");
        const colFRevenue = createCellFot(`(${totRevenue.toFixed(2)})`);
        const colFCost = createCellFot(`(${totCost.toFixed(2)})`);
        // const colFGp = createCellFot(`(${totGp.toFixed(2)})`);

        const colFGp = $("<th>")
          .addClass(
            "px-3 py-3 font-semibold whitespace-nowrap text-secondary-90 font-sm last:rounded-br-lg"
          )
          .attr("colspan", 3)
          .text(`(${totGp.toFixed(2)})`);

        rowFot.append(colTotal, colFRevenue, colFCost, colFGp);

        machineDetailFooter.append(rowFot);
      },
      error: function () {
        alert("Failed to fetch data.");
        loading.hide(); // Hide spinner in case of error
      },
    });
  }

  // Initiate table
  loadDataMachine(machineDataJson);
  loadDataMachineDetail(machineDetailDataJson);

  // ========== End Machine ==========

  // ===== Start Drawer =====
  $("[data-drawer-show]").click(function () {
    var drawerId = $(this).attr("data-drawer-show");
    $("#" + drawerId).addClass("transform-none");
    $("#" + drawerId).removeClass("translate-x-full");
    $(
      '<div drawer-backdrop="" class="fixed inset-0 z-[70] bg-gray-900/50"></div>'
    )
      .attr("id", drawerId + "-backdrop")
      .appendTo("body");
    $("body").toggleClass("overflow-hidden");
  });

  $("[data-drawer-hide]").click(function () {
    var drawerId = $(this).attr("data-drawer-hide");
    $("#" + drawerId).addClass("translate-x-full");
    $("#" + drawerId).removeClass("transform-none");
    $("#" + drawerId + "-backdrop").remove();
    $("body").toggleClass("overflow-hidden");
  });

  $(document).on("click", "[drawer-backdrop]", function () {
    var backdropId = $(this).attr("id");
    const drawerId = backdropId.replace("-backdrop", "");
    $("#" + drawerId).addClass("translate-x-full");
    $("#" + drawerId).removeClass("transform-none");
    $(this).remove();
    $("body").toggleClass("overflow-hidden");
  });
  // ===== End Drawer =====

  // ===== Start Dialog Modal =====
  function toggleOverflowHidden() {
    if ($(".modal.flex").length) {
      $("body").addClass("overflow-hidden");
    } else {
      $("body").removeClass("overflow-hidden");
    }
  }

  $("[data-modal-toggle]").on("click", function () {
    var targetModal = $(this).data("modal-toggle");
    $("#" + targetModal).toggleClass("hidden flex");

    if ($("#" + targetModal).hasClass("flex")) {
      // Only add backdrop if modal is being opened
      $(
        '<div dialog-backdrop="" class="fixed inset-0 z-[70] bg-gray-900/50"></div>'
      )
        .attr("id", targetModal + "-backdrop")
        .appendTo("body");

      // Custom modal
      // if else {
      //   // Remove backdrop if modal is being closed
      //   $("#" + targetModal + "-backdrop").remove();
      // }
    } else {
      // Remove backdrop if modal is being closed
      $("#" + targetModal + "-backdrop").remove();
    }

    toggleOverflowHidden();
  });

  $("[data-modal-hide]").on("click", function () {
    let targetModal = $(this).data("modal-hide");
    $("#" + targetModal)
      .addClass("hidden")
      .removeClass("flex");
    $("#" + targetModal + "-backdrop").remove();

    toggleOverflowHidden();
  });

  $(document).on("click", "[dialog-backdrop]", function () {
    let backdropId = $(this).attr("id");
    const targetModal = backdropId.replace("-backdrop", "");
    $("#" + targetModal)
      .addClass("hidden")
      .removeClass("flex");
    $(this).remove();

    toggleOverflowHidden();
  });
  // ===== End Dialog Modal =====

  // ===== Start Popover =====
  const $triggers = $(".trigger");
  let popperInstance = null;
  let $currentPopover = null;

  function createPopperInstance($trigger, $popover, placement) {
    return Popper.createPopper($trigger[0], $popover[0], {
      placement: placement || "bottom-end", // Default to bottom-end if no placement is specified
    });
  }

  function showPopover($trigger, $popover, placement) {
    $popover.show();
    popperInstance = createPopperInstance($trigger, $popover, placement);
    $currentPopover = $popover;
  }

  function hidePopover($popover) {
    $popover.hide();
    if (popperInstance) {
      popperInstance.destroy();
      popperInstance = null;
    }
    $currentPopover = null;
  }

  $triggers.on("click", function (e) {
    e.stopPropagation();
    const $trigger = $(this);
    const popoverSelector = $trigger.data("popover");
    const placement = $trigger.data("placement"); // Get the placement from data attribute
    const $popover = $(popoverSelector);

    if ($currentPopover && $currentPopover[0] !== $popover[0]) {
      hidePopover($currentPopover);
    }

    if ($popover.is(":visible")) {
      hidePopover($popover);
    } else {
      showPopover($trigger, $popover, placement);
    }
  });

  $(document).on("click", function () {
    if ($currentPopover) {
      hidePopover($currentPopover);
    }
  });

  $(".popover").on("click", function (e) {
    e.stopPropagation();
  });
  // ===== End Popover =====

  // ===== Start Toast =====
  function showToast() {
    let toast = $(".toast");
    let toastTime = $(".toast-time");
    let seconds = 3;

    toast.toggleClass("hidden flex"); // Show the toast
    toastTime.text(seconds + "s"); // Initialize the timer text

    let countdown = setInterval(function () {
      seconds--;
      toastTime.text(seconds + "s");
      if (seconds <= 0) {
        clearInterval(countdown); // Stop the countdown
        // toast.hide(); // Hide the toast
        toast.toggleClass("hidden flex"); // Show the toast
      }
    }, 1000);
  }
  // ===== End Toast =====

  // ===== Start search =====
  $("#searchBtn").on("click", function () {
    $("#formSearch").toggleClass("hidden");
    $("#searchBtn").toggleClass("hidden flex");
    if (!$("#formSearch").hasClass("hidden")) {
      $("#searchMachineData").focus();
    }
  });

  $("#searchMachineData").on("blur", function () {
    $("#formSearch").addClass("hidden");
    $("#searchBtn").addClass("flex").removeClass("hidden");
  });
  // ===== End search =====

  $("#download-chart").click(function () {
    alert("Download");
    $currentPopover.hide();
  });

  // ===== Start toggleEdit =====
  $("#detailDataToggle").click(function () {
    $("#detailDataForm").toggleClass("hidden");
    let $toggleIcon = $(this).children("img");
    const iconClose = "../dist/icons/arrowDown.svg";
    const iconUp = "../dist/icons/arrowBackNeclosY.svg";
    $toggleIcon.toggleClass("rotate-180");
    $(this).toggleClass("bg-white");
    $toggleIcon.attr(
      "src",
      $toggleIcon.hasClass("rotate-180") ? iconUp : iconClose
    );
    // $toggleIcon.attr('src', ($("#detailDataForm").hasClass('hidden')) ? iconClose : iconUp);
  });
  // ===== End toggleEdit =====

  // chart machine gp
  $("#btnBudgetGp").on("click", function () {
    let newValue = parseFloat($("#inputBudget").val());
    chartGen.yAxis[0].update({
      plotLines: [
        {
          value: newValue,
          color: "#3B9D3F",
          width: 4,
          zIndex: 4,
        },
      ],
    });

    $("#mBudgetGp").text(`${newValue}%`);

    let targetModal = "budget-gp-modal";
    $("#" + targetModal)
      .addClass("hidden")
      .removeClass("flex");
    $("#" + targetModal + "-backdrop").remove();

    $("#inputBudget").val("");

    toggleOverflowHidden();
  });

  // ===== Dropzone =====
  let $dropzoneLabel = $(".dropzone");
  let $dropzoneLabelUpload = $(".dropzone-process");
  let $fileInput = $("#dropzone-file");
  let intervalUpload;

  // Handle files
  function handleFiles(files) {
    if (files.length > 0) {
      let file = files[0];
      let fileName = file.name;
      let fileSize = (file.size / (1024 * 1024)).toFixed(2) + " MB"; // size in MB
      let fileExtension = fileName.split(".").pop().toLowerCase();

      if (fileExtension !== "xls") {
        dropzoneCondition("invalid");
        return;
      }

      if (file) {
        $dropzoneLabel.toggleClass("hidden flex");
        $dropzoneLabelUpload.toggleClass("hidden flex");

        let dropzoneUpload = $(".dropzone-upload");
        dropzoneUpload.find(".file-name").text(fileName);
        dropzoneUpload.find(".file-size").text(fileSize);

        $("#progressBar").css("width", 0 + "%"); // loading process
        $(".file-process").text(0 + "%"); // percent process
        $(".file-time").text(``);
        $("#cancelUpload").addClass("flex").removeClass("hidden");

        let progress = 0;
        let totalDuration = 5;
        let intervalTime = 500;

        intervalUpload = setInterval(function () {
          progress += 10;
          let remainingTime = ((100 - progress) / 100) * totalDuration; // remaining time in seconds

          let timeString = "";
          if (remainingTime >= 60) {
            let remainingMinutes = Math.floor(remainingTime / 60); // remaining minutes
            timeString += remainingMinutes + " min";
          } else {
            let remainingSeconds = Math.ceil(remainingTime); // remaining seconds
            timeString += remainingSeconds + " sec";
          }
          $("#progressBar").css("width", progress + "%"); // loading process
          $(".file-process").text(progress + "%"); // percent process
          $(".file-time").text(`(${timeString})`);
          if (progress >= 100) {
            clearInterval(intervalUpload);
            $("#uploadBtnEditData").removeAttr("disabled");
            $("#cancelUpload").addClass("hidden").removeClass("flex");
          }
        }, intervalTime);
      }
      // Trigger form submission
      // $("#uploadFormEditData").submit();
    }
  }

  $("#cancelUpload").click(function () {
    clearInterval(intervalUpload);
    $fileInput.val("");
    $dropzoneLabel.addClass("flex").removeClass("hidden");
    $dropzoneLabelUpload.addClass("hidden").removeClass("flex");
    $("#uploadBtnEditData").attr("disabled", true);
  });

  $dropzoneLabel.on("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).removeClass("dragover");

    var files = e.originalEvent.dataTransfer.files;
    handleFiles(files);
  });

  $fileInput.on("change", function () {
    var files = this.files;
    handleFiles(files);
  });

  function dropzoneCondition(status = "default") {
    let $dropzone = $(".dropzone"),
      $dropzoneProcess = $(".dropzone-process"),
      $uploadLabelTitle = $(".upload-label-title"),
      $uploadLabelDesc = $(".upload-label-desc"),
      $uploadLabelBtn = $(".upload-label-btn");

    $fileInput.val("");
    $("#uploadBtnEditData").attr("disabled", true);
    if (status == "default") {
      $dropzone.removeClass("hidden").addClass("flex");
      $dropzone
        .removeClass("dropzone-default dropzone-warning dropzone-error")
        .addClass("dropzone-default");
      $dropzoneProcess.addClass("hidden").removeClass("flex");
      $uploadLabelTitle.text("Drag and Drop");
      $uploadLabelDesc.text("Only upload in .xlxs");
      $uploadLabelBtn.addClass("btn-yellow").removeClass("btn-outline-yellow");
    } else if (status == "connection") {
      $dropzone.removeClass("hidden").addClass("flex");
      $dropzone
        .removeClass("dropzone-default dropzone-warning dropzone-error")
        .addClass("dropzone-error");
      $dropzoneProcess.addClass("hidden").removeClass("flex");
      $uploadLabelTitle.text("No Internet Connection");
      $uploadLabelDesc.text("Please check your internet");
      $uploadLabelBtn.addClass("btn-outline-yellow").removeClass("btn-yellow");
    } else if (status == "corrupt") {
      $dropzone.removeClass("hidden").addClass("flex");
      $dropzone
        .removeClass("dropzone-default dropzone-warning dropzone-error")
        .addClass("dropzone-error");
      $dropzoneProcess.addClass("hidden").removeClass("flex");
      $uploadLabelTitle.text("File Corrupt");
      $uploadLabelDesc.text("Something went wrong. Please re-upload your file");
      $uploadLabelBtn.addClass("btn-outline-yellow").removeClass("btn-yellow");
    } else if (status == "invalid") {
      $dropzone.removeClass("hidden").addClass("flex");
      $dropzone
        .removeClass("dropzone-default dropzone-warning dropzone-error")
        .addClass("dropzone-error");
      $dropzoneProcess.addClass("hidden").removeClass("flex");
      $uploadLabelTitle.text("Format File Invalid");
      $uploadLabelDesc.text(
        "Please check your file format. Make sure the format is .xlsx"
      );
      $uploadLabelBtn.addClass("btn-outline-yellow").removeClass("btn-yellow");
    } else if (status == "missing-column") {
      $dropzone.removeClass("hidden").addClass("flex");
      $dropzone
        .removeClass("dropzone-default dropzone-warning dropzone-error")
        .addClass("dropzone-error");
      $dropzoneProcess.addClass("hidden").removeClass("flex");
      $uploadLabelTitle.text("Missing Column");
      $uploadLabelDesc.text("Please check your file");
      $uploadLabelBtn.addClass("btn-outline-yellow").removeClass("btn-yellow");
    }
  }

  // close upload submit
  $(".submit-edit-modal").on("click", function () {
    dropzoneCondition();

    let targetModal = "submit-edit-modal";
    $("#" + targetModal)
      .addClass("hidden")
      .removeClass("flex");
    $("#" + targetModal + "-backdrop").remove();

    toggleOverflowHidden();
  });

  $("#uploadFormEditData").on("submit", function (e) {
    e.preventDefault();

    dropzoneCondition();
    showToast();
    MachineTable.ajax.reload();
    loadDataMachine(machineDataJson);

    let targetModal = "submit-edit-modal";
    $("#" + targetModal)
      .addClass("hidden")
      .removeClass("flex");
    $("#" + targetModal + "-backdrop").remove();

    toggleOverflowHidden();
  });
});

// Get the current date
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0"); // months are zero-indexed

// Format the default date as "YYYY-MM"
const defaultDate = `${currentYear}-${currentMonth}`;

flatpickr("#monthYearPicker", {
  dateFormat: "Y-m",
  defaultDate: defaultDate,
  plugins: [
    new monthSelectPlugin({
      shorthand: true, // display abbreviated months
      dateFormat: "Y-m-d", // format as year and month
      altFormat: "M Y", // display full month name and year in alt input
    }),
  ],
  altInput: true,
});
