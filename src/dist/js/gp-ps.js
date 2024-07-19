$(function () {
  let ppModelMachineChartDetailTable = "../dist/data/machine-detail.json";
  let psIndustryPartDataTable = "../dist/data/ps-part-data-list.json";
  let psIndustryServiceDataTable = "../dist/data/ps-service-data-list.json";

  let loadingTable = `
  <div
    class="absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-opacity-40 bg-cloudy-50"
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

  // MONTH PICKER
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0"); // months are zero-indexed
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

  // ===== PC INDUSTRY DATA =====
  // PC INDUSTRY PART SERIES DATA
  let psIndustryPartCategories = [
    "Jun 24",
    "Jul 24",
    "Aug 24",
    "Sep 24",
    "Oct 24",
    "Nov 24",
  ];
  let psIndustryPartSeries = [
    {
      name: "Total YTD",
      data: [0.3, 0.4, 0.2, 0.5, 0.4, 0.6],
      stack: "ytd",
      color: "#FDBA12",
    },
    {
      name: "Total MTD",
      data: [0.2, 0.2, 0.2, 0.2, 0.2, 0.3],
      stack: "mtd",
      color: "#1480D8",
    },
    {
      name: "Exclude Pex",
      data: [0.1, 0.2, 0.1, 0.3, 0.2, 0.1],
      stack: "mtd",
      color: "#F26D0F",
    },
    {
      name: "Budget GP",
      type: "scatter",
      color: "#3B9D3F",
      legendSymbol: "rectangle",
    },
  ];
  let psIndustryPartYtd = "323.48M";
  let psIndustryPartMtd = "23.7M";
  let psIndustryPartBudget = "0.3";

  // PC INDUSTRY PART CHART TABLE DATA
  let psIndustryPartChartTable = [
    {
      id: 1,
      industry: "Construction Industry (CI)",
      ytd: "88.4 M",
      mtd: "10.8 M",
      gp_actual: "8.0%",
      details: [
        {
          id: 1,
          industry: "Construction",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_actual: "8.0%",
        },
        {
          id: 2,
          industry: "Forestry",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_actual: "8.0%",
        },
        {
          id: 3,
          industry: "Agriculture",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_actual: "8.0%",
        },
      ],
    },
    {
      id: 2,
      industry: "Power System (E&T)",
      ytd: "88.4 M",
      mtd: "10.8 M",
      gp_actual: "8.0%",
      details: [
        {
          id: 1,
          industry: "Electric Power",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_actual: "8.0%",
        },
        {
          id: 2,
          industry: "Marine",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_actual: "8.0%",
        },
        {
          id: 3,
          industry: "Oli & Gas",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_actual: "8.0%",
        },
        {
          id: 4,
          industry: "Power Generation",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_actual: "8.0%",
        },
        {
          id: 5,
          industry: "Industrial",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_actual: "8.0%",
        },
      ],
    },
    {
      id: 3,
      industry: "Mining (RI)",
      ytd: "88.4 M",
      mtd: "10.8 M",
      gp_actual: "8.0%",
      details: [
        {
          id: 1,
          industry: "Mining",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_actual: "8.0%",
        },
      ],
    },
  ];

  // ===== PP MODEL ENGINE DATA =====
  // PC INDUSTRY SERVICE SERIES DATA
  let psIndustryServiceCategories = [
    "Jun 24",
    "Jul 24",
    "Aug 24",
    "Sep 24",
    "Oct 24",
    "Nov 24",
  ];

  let psIndustryServiceSeries = [
    {
      name: "Total YTD",
      data: [0.3, 0.4, 0.2, 0.5, 0.4, 0.6],
      stack: "ytd",
      color: "#FDBA12",
    },
    {
      name: "Total MTD",
      data: [0.2, 0.2, 0.2, 0.2, 0.2, 0.3],
      stack: "mtd",
      color: "#1480D8",
    },
    {
      name: "Exclude Pex",
      data: [0.1, 0.2, 0.1, 0.3, 0.2, 0.1],
      stack: "mtd",
      color: "#F26D0F",
    },
    {
      name: "Budget GP",
      type: "scatter",
      color: "#3B9D3F",
      legendSymbol: "rectangle",
    },
  ];
  let psIndustryServiceYtd = "38.58M";
  let psIndustryServiceMtd = "3.28M";
  let psIndustryServiceBudget = "0.3";

  // PS INDUSTRY CHART TABLE DATA
  let psIndustryServiceChartTable = [
    {
      id: 1,
      industry: "Construction Industry (CI)",
      ytd: "88.4 M",
      mtd: "10.8 M",
      gp_actual: "8.0%",
      details: [
        {
          id: 1,
          industry: "Construction",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_actual: "8.0%",
        },
        {
          id: 2,
          industry: "Forestry",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_actual: "8.0%",
        },
        {
          id: 3,
          industry: "Agriculture",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_actual: "8.0%",
        },
      ],
    },
    {
      id: 2,
      industry: "Power System (E&T)",
      ytd: "88.4 M",
      mtd: "10.8 M",
      gp_actual: "8.0%",
      details: [
        {
          id: 1,
          industry: "Electric Power",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_actual: "8.0%",
        },
        {
          id: 2,
          industry: "Marine",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_actual: "8.0%",
        },
        {
          id: 3,
          industry: "Oli & Gas",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_actual: "8.0%",
        },
        {
          id: 4,
          industry: "Power Generation",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_actual: "8.0%",
        },
        {
          id: 5,
          industry: "Industrial",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_actual: "8.0%",
        },
      ],
    },
    {
      id: 3,
      industry: "Mining (RI)",
      ytd: "88.4 M",
      mtd: "10.8 M",
      gp_actual: "8.0%",
      details: [
        {
          id: 1,
          industry: "Mining",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_actual: "8.0%",
        },
      ],
    },
  ];

  // HIGHCHART
  // ===== Start HighCharts =====
  let ChartBar = Highcharts.chart("container", {
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
      categories: ["Jun 24", "Jul 24", "Aug 24", "Sep 24", "Oct 24", "Nov 24"],
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
      max: 4,
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
        // format: "{value} %",
      },
      plotLines: [
        {
          value: 0.3,
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
        groupPadding: 0.35,
      },
    },

    series: [
      {
        name: "Total YTD",
        data: [0.3, 0.4, 0.2, 0.5, 0.4, 0.6],
        stack: "ytd",
        color: "#FDBA12",
      },
      {
        name: "Total MTD",
        data: [0.2, 0.2, 0.2, 0.2, 0.2, 0.3],
        stack: "mtd",
        color: "#1480D8",
      },
      {
        name: "Exclude PEX",
        data: [0.1, 0.2, 0.1, 0.3, 0.2, 0.1],
        stack: "mtd",
        color: "#F26D0F",
      },
      {
        name: "Budget GP",
        type: "scatter",
        color: "#3B9D3F",
        legendSymbol: "rectangle",
      },
    ],
  });

  // BUDGET EDIT CHART
  $("#btnBudgetGp").on("click", function () {
    let newValue = parseFloat($("#inputBudget").val());
    ChartBar.yAxis[0].update({
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
    closeModal("budget-gp-modal");
  });

  let selectedChartTable = [
    {
      label: "Parts GP %",
      rowData: ["Parts GP %", "323.48M", "23.7M"],
      data: psIndustryPartChartTable,
    },
  ];

  function breadcrumb(selectedData) {
    let bread = $("#breadcrumb");
    bread.empty();
    selectedData.forEach((v, i) => {
      if (i == 0) {
        bread.append(`
          <li class="inline-flex items-center">
            <a
              role="button"
              data-level="${i}"
              class="inline-flex items-center text-[22px] font-semibold ${
                selectedData.length > 1 ? "text-cloudy-70" : "text-cloudy-110"
              }"
              >${v.label}</a
            >
          </li>
        `);
      } else {
        bread.append(`
          <li>
            <div class="flex items-center">
              <img
                src="../dist/icons/arrowBackneclosCloud.svg"
                class="w-4 h-4"
                alt="arrowBackneclos"
              />
              <a
                href="#"
                data-level="${i}"
                class="ms-1 text-[22px] font-semibold ${
                  i === selectedData.length - 1
                    ? "text-cloudy-110"
                    : "text-cloudy-70"
                }"
              >${v.label}</a>
            </div>
          </li>
        `);
      }
    });
  }

  breadcrumb(selectedChartTable);

  $("#breadcrumb").on("click", "a", function () {
    let level = $(this).data("level");

    if (selectedChartTable[level]?.data) {
      loadChartTable(selectedChartTable[level].data);
    }
    if (selectedChartTable.length > 1) {
      selectedChartTable.splice(level + 1);
      breadcrumb(selectedChartTable);
    }
    $("#mYtd").text(selectedChartTable[level]["rowData"][1]);
    $("#mMtd").text(selectedChartTable[level]["rowData"][2]);
    $("#mGpPlan").text(selectedChartTable[level]["rowData"][3]);
    $("#mGpTrans").text(selectedChartTable[level]["rowData"][4]);
    let title;

    if (level === 0) {
      title = selectedChartTable[level].label.replace("GP %", "");
    } else {
      title = selectedChartTable[level].label;
    }
    $("#datatable-list-title").text(`${title} GP Data List`);
  });

  // HANDLE CLICK ROW CHART TABLE
  function handleRowClick(e) {
    const details = $(this).data("details");
    const rowData = $(this)
      .children("td")
      .map(function () {
        return $(this).text();
      })
      .get();

    const countUndefinedData = selectedChartTable.filter(
      (item) => item.data === null
    ).length;
    console.log(rowData);
    if (!countUndefinedData > 0) {
      selectedChartTable.push({
        label: rowData[0],
        rowData: rowData.splice(0, 1),
        data: details.length > 0 ? details : null,
      });
    } else {
      selectedChartTable[selectedChartTable.length - 1] = {
        label: rowData[0],
        rowData: rowData.splice(0, 1),
        data: null,
      };
    }

    if (countUndefinedData < 2) {
      breadcrumb(selectedChartTable);
    }

    if (details.length > 0) {
      loadChartTable(details);
    } else {
      $(".chart-row-table").removeClass("bg-yellow-10");
      $(this).addClass("bg-yellow-10");
    }

    $("#mYtd").text(rowData[1]);
    $("#mMtd").text(rowData[2]);
    $("#datatable-list-title").text(`${rowData[0]} GP Data List`);
  }

  // LOAD CHART TABLE DATA
  function loadChartTable(data) {
    let loading = $("#chart-loading-table");
    let chartBodyTable = $("#chart-body-table");
    let chartFooterTable = $("#chart-footer-table");
    let chartFooterTableMd = $("#chart-footer-table-md");

    chartBodyTable.empty();
    chartFooterTable.empty();
    chartFooterTableMd.empty();

    let totYtd = 0;
    let totMtd = 0;
    let totGpActual = 0;

    loading.append(loadingTable);
    setTimeout(() => {
      data.forEach((v) => {
        const row = $(`<tr>`).addClass(
          "border-t border-t-[#DEDDDE] bg-white cursor-pointer hover:bg-yellow-10 chart-row-table"
        );

        row.attr("data-details", `${JSON.stringify(v.details || [])}`);

        const createCell = (text) =>
          $("<td>")
            .addClass(
              "px-3 py-4 font-normal whitespace-nowrap text-secondary-90 font-sm"
            )
            .text(text);

        const colRow = createCell(v.industry).addClass("pr-4 pl-6");
        const colYtd = createCell(v.ytd);
        const colMtd = createCell(v.mtd);
        const colGpActual = createCell(v.gp_actual);

        totYtd += parseFloat(v.ytd);
        totMtd += parseFloat(v.mtd);
        totGpActual += parseFloat(v.gp_actual);

        const colAction = $("<td>").addClass(
          "px-3 py-4 whitespace-nowrap text-secondary-90 font-sm"
        );
        const image = $("<img>")
          .attr("src", "../dist/icons/arrowBackneclos.svg")
          .addClass("h-4 w-4 rounded-full whitespace-nowrap");
        colAction.append(image);

        row.append(colRow, colYtd, colMtd, colGpActual, colAction);
        row.click(handleRowClick);
        chartBodyTable.append(row);
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
      const colFGpActual = createCellFot(totGpActual.toFixed(1) + " %");
      const colFAction = createCellFot("");

      rowFot.append(colTotal, colFYtd, colFMtd, colFGpActual, colFAction);

      chartFooterTable.append(rowFot);

      const createCellFotExt = (text) => $("<div>").text(text);

      const colTotalMd = createCellFotExt("Total").addClass("w-[46%]");
      const colFYtdMd = createCellFotExt(totYtd.toFixed(1) + " M").addClass(
        "w-[16%]"
      );
      const colFMtdMd = createCellFotExt(totMtd.toFixed(1) + " M").addClass(
        "w-[16%]"
      );
      const colFGpActualMd = createCellFotExt(
        totGpActual.toFixed(1) + " %"
      ).addClass("w-[16%]");

      chartFooterTableMd.append(
        colTotalMd,
        colFYtdMd,
        colFMtdMd,
        colFGpActualMd
      );
      loading.empty();
    }, 300);
  }

  // LOAD CHART TABLE DETAIL DATA
  function loadChartDetailTable(jsonData) {
    $.ajax({
      url: jsonData,
      type: "GET",
      dataType: "json",
      success: function (data) {
        const chartBodyDetailTable = $("#chart-body-detail-table");
        const chartFooterDetailTable = $("#chart-footer-detail-table");

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
          chartBodyDetailTable.append(row);
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

        const colFGp = $("<th>")
          .addClass(
            "px-3 py-3 font-semibold whitespace-nowrap text-secondary-90 font-sm last:rounded-br-lg"
          )
          .attr("colspan", 3)
          .text(`(${totGp.toFixed(2)})`);

        rowFot.append(colTotal, colFRevenue, colFCost, colFGp);

        chartFooterDetailTable.append(rowFot);
      },
      error: function () {
        alert("Failed to fetch data.");
      },
    });
  }

  // ===== Start search =====
  $("#searchBtn").on("click", function () {
    $("#formSearch").toggleClass("hidden");
    $("#searchBtn").toggleClass("hidden flex");
    if (!$("#formSearch").hasClass("hidden")) {
      $("#searchDatatable").focus();
    }
  });

  $("#searchDatatable").on("blur", function () {
    $("#formSearch").addClass("hidden");
    $("#searchBtn").addClass("flex").removeClass("hidden");
  });
  // ===== End search =====

  $("#download-chart").click(function () {
    alert("Download");
    $currentPopover.hide();
  });

  // DATATABLE LIST
  var DataTableListLoading = $("#datatable-loading");
  var DataTableList = $("#datatable-list").DataTable({
    ajax: {
      url: psIndustryPartDataTable, // Replace with the path to your JSON file
      dataSrc: "",
      beforeSend: function () {
        DataTableListLoading.append(loadingTable); // Show spinner before sending AJAX request
      },
      complete: function () {
        setTimeout(function () {
          DataTableListLoading.empty(); // Hide spinner after data is loaded
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
  $("#searchDatatable").keyup(function () {
    DataTableList.search($(this).val()).draw();
  });

  loadChartTable(psIndustryPartChartTable);
  loadChartDetailTable(ppModelMachineChartDetailTable);

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
    $("#detail-chart-table-title").toggleClass("hidden");
  });
  // ===== End toggleEdit =====

  // handle detail filter
  $(".detail-filter-btn").click(function () {
    $(".detail-filter-btn").removeClass("btn-secondary").addClass("btn-white");
    $(this).addClass("btn-secondary").removeClass("btn-white");
  });

  // handle subcat
  $(".sub-cat").click(function () {
    $(".sub-cat").removeClass("active");
    $(this).addClass("active");

    let sub = $(this).attr("sub");
    if (sub == "parts") {
      defaultIndustryPart();
    }
    if (sub == "services") {
      defaultIndustryServices();
    }
  });

  // DEFAULT FUNCTION SET DATA
  function defaultIndustryPart() {
    $(".chart-row-table").removeClass("bg-yellow-10");
    $("#mYtd").text(psIndustryPartYtd);
    $("#mMtd").text(psIndustryPartMtd);
    $("#mBudgetGp").text(`${psIndustryPartBudget}%`);
    $("#datatable-list-title").text("Parts GP Data List");
    $("#row-chart-title").text("Industry");
    ChartBar.yAxis[0].update({
      plotLines: [
        {
          value: psIndustryPartBudget,
          color: "#3B9D3F",
          width: 4,
          zIndex: 4,
        },
      ],
    });

    selectedChartTable = [
      {
        label: "Parts GP %",
        rowData: ["323.48M", "23.7M"],
        data: psIndustryPartChartTable,
      },
    ];
    breadcrumb(selectedChartTable);

    ChartBar.xAxis[0].setCategories(psIndustryPartCategories);
    ChartBar.series[0].setData(psIndustryPartSeries[0].data);
    ChartBar.series[1].setData(psIndustryPartSeries[1].data);
    ChartBar.series[2].setData(psIndustryPartSeries[2].data);

    // detail table
    let filterDetail = $(".detail-filter-btn"),
      total = $(".detail-total-btn"),
      ePex = $(".detail-exclude-pex-btn");

    filterDetail.addClass("hidden btn-white").removeClass("btn-secondary");
    total.removeClass("hidden btn-white").addClass("btn-secondary");
    ePex.removeClass("hidden");

    loadChartTable(psIndustryPartChartTable);
    DataTableList.ajax.url(psIndustryPartDataTable).load();
  }

  function defaultIndustryServices() {
    $(".chart-row-table").removeClass("bg-yellow-10");
    $("#mYtd").text(psIndustryServiceYtd);
    $("#mMtd").text(psIndustryServiceMtd);
    $("#mBudgetGp").text(`${psIndustryServiceBudget}%`);
    $("#datatable-list-title").text("Service GP Data List");
    $("#row-chart-title").text("Industry");
    ChartBar.yAxis[0].update({
      plotLines: [
        {
          value: psIndustryServiceBudget,
          color: "#3B9D3F",
          width: 4,
          zIndex: 4,
        },
      ],
    });

    selectedChartTable = [
      {
        label: "Services GP %",
        rowData: ["38.58M", "3.28M"],
        data: psIndustryServiceCategories,
      },
    ];
    breadcrumb(selectedChartTable);

    ChartBar.xAxis[0].setCategories(psIndustryServiceCategories);
    ChartBar.series[0].setData(psIndustryServiceSeries[0].data);
    ChartBar.series[1].setData(psIndustryServiceSeries[1].data);
    ChartBar.series[2].setData(psIndustryServiceSeries[2].data);

    // detail table
    let filterDetail = $(".detail-filter-btn"),
      total = $(".detail-total-btn"),
      eImpairment = $(".detail-exclude-impairment-btn");

    filterDetail.addClass("hidden btn-white").removeClass("btn-secondary");
    total.removeClass("hidden btn-white").addClass("btn-secondary");
    eImpairment.removeClass("hidden");

    loadChartTable(psIndustryServiceChartTable);
    DataTableList.ajax.url(psIndustryServiceDataTable).load();
  }

  // DROPZONE
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

  $dropzoneLabel.on("dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).addClass("dragover");
  });

  $dropzoneLabel.on("dragleave", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).removeClass("dragover");
  });

  $dropzoneLabel.on("drop", function (e) {
    console.log("drop");
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
      $uploadLabelImg = $(".upload-label-img"),
      $uploadLabelBtn = $(".upload-label-btn");

    $fileInput.val("");
    $uploadLabelImg.attr("src", "");
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
      $uploadLabelImg.attr("src", "../dist/icons/upload-cloud.svg");
    } else if (status == "connection") {
      $dropzone.removeClass("hidden").addClass("flex");
      $dropzone
        .removeClass("dropzone-default dropzone-warning dropzone-error")
        .addClass("dropzone-error");
      $dropzoneProcess.addClass("hidden").removeClass("flex");
      $uploadLabelTitle.text("No Internet Connection");
      $uploadLabelDesc.text("Please check your internet");
      $uploadLabelBtn.addClass("btn-outline-yellow").removeClass("btn-yellow");
      $uploadLabelImg.attr("src", "../dist/icons/no-wifi.svg");
    } else if (status == "corrupt") {
      $dropzone.removeClass("hidden").addClass("flex");
      $dropzone
        .removeClass("dropzone-default dropzone-warning dropzone-error")
        .addClass("dropzone-error");
      $dropzoneProcess.addClass("hidden").removeClass("flex");
      $uploadLabelTitle.text("File Corrupt");
      $uploadLabelDesc.text("Something went wrong. Please re-upload your file");
      $uploadLabelBtn.addClass("btn-outline-yellow").removeClass("btn-yellow");
      $uploadLabelImg.attr("src", "../dist/icons/file-wrong.svg");
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
      $uploadLabelImg.attr("src", "../dist/icons/file-error.svg");
    } else if (status == "missing-column") {
      $dropzone.removeClass("hidden").addClass("flex");
      $dropzone
        .removeClass("dropzone-default dropzone-warning dropzone-error")
        .addClass("dropzone-error");
      $dropzoneProcess.addClass("hidden").removeClass("flex");
      $uploadLabelTitle.text("Missing Column");
      $uploadLabelDesc.text("Please check your file");
      $uploadLabelBtn.addClass("btn-outline-yellow").removeClass("btn-yellow");
      $uploadLabelImg.attr("src", "../dist/icons/column-error.svg");
    }
  }

  $("#uploadFormEditData").on("submit", function (e) {
    e.preventDefault();

    dropzoneCondition();
    showToast(`Your data is succesfully updated!`, "green");
    DataTableList.ajax.reload();
    loadChartTable(ppModelMachineChartTable);
    closeModal("dropzone-submit-modal");
  });

  $(".dropzone-submit-modal").click(function () {
    dropzoneCondition();
  });

  // =============== REUSABLE FUNCTION ===============

  // MODAL FUNCTION
  function toggleOverflowHidden() {
    if ($(".modal.flex").length) {
      $("body").addClass("overflow-hidden");
    } else {
      $("body").removeClass("overflow-hidden");
    }
  }

  $("[data-modal-toggle]").on("click", function () {
    let targetModal = $(this).data("modal-toggle");
    $("#" + targetModal).toggleClass("hidden flex");

    if ($("#" + targetModal).hasClass("flex")) {
      $(
        '<div class="modal-backdrop fixed inset-0 z-[90] bg-gray-900/50"></div>'
      )
        .attr("id", targetModal + "-backdrop")
        .appendTo("body");
    } else {
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

  $(document).on("click", ".modal-backdrop", function () {
    let backdropId = $(this).attr("id");
    const targetModal = backdropId.replace("-backdrop", "");
    $("#" + targetModal)
      .addClass("hidden")
      .removeClass("flex");
    $(this).remove();

    toggleOverflowHidden();
  });

  function toggleModal(targetModal) {
    $("#" + targetModal).toggleClass("hidden flex");
    if ($("#" + targetModal).hasClass("flex")) {
      $(
        '<div class="modal-backdrop fixed inset-0 z-[90] bg-gray-900/50"></div>'
      )
        .attr("id", targetModal + "-backdrop")
        .appendTo("body");
    } else {
      $("#" + targetModal + "-backdrop").remove();
    }
    toggleOverflowHidden();
  }

  function closeModal(targetModal) {
    $("#" + targetModal)
      .addClass("hidden")
      .removeClass("flex");
    $("#" + targetModal + "-backdrop").remove();
    toggleOverflowHidden();
  }

  // ===== Start Popover =====
  const $triggers = $(".trigger");
  let popperInstance = null;
  let $currentPopover = null;

  function createPopperInstance($trigger, $popover, placement) {
    return Popper.createPopper($trigger[0], $popover[0], {
      placement: placement || "bottom-end",
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
    const placement = $trigger.data("placement");
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

  $("body").on("click", ".trigger", function (e) {
    e.stopPropagation();
    let $trigger = $(this);
    let popoverSelector = $trigger.data("popover");
    let placement = $trigger.data("placement");
    let $popover = $(popoverSelector);

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

  // DRAWER
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

  // TAB COLLAPSE FUNCTION
  $("[data-collapse-toggle]").on("click", function () {
    let target = $(this).data("collapse-toggle");
    $(".tab-collapse").removeClass("active");
    $(".content-collapse").addClass("hidden");

    $(this).addClass("active");
    $("#" + target).removeClass("hidden");
  });

  // TOAST
  function showToast(message, variant) {
    let toast = $("#myToast");
    let toastVariant = $("#myToast .toast-variant");
    let toastTime = $("#myToast .toast-time");
    let seconds = 3;

    let icon;
    toastTime.text(seconds + "s"); // Initialize the timer text
    $("#myToast .toast-text").text(message);

    // Apply variant color
    switch (variant) {
      case "green":
        toastVariant.addClass("bg-green-20");
        icon = "../dist/icons/check-green-rounded.svg";
        break;
      default:
        toastVariant.addClass("bg-green-20");
        icon = "../dist/icons/check-green-rounded.svg";
    }

    $("#myToast .toast-icon").attr("src", icon);

    // Show the toast
    toast.toggleClass("hidden flex");

    let countdown = setInterval(function () {
      seconds--;
      toastTime.text(seconds + "s");
      if (seconds <= 0) {
        clearInterval(countdown); // Stop the countdown
        toast.toggleClass("hidden flex");
      }
    }, 1000);
  }
});
