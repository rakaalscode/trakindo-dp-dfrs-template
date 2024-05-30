$(function () {
  function handleRowClick(event) {
    $(".machine-row").removeClass("bg-yellow-10");
    $(this).addClass("bg-yellow-10");

    const rowData = $(this)
      .children("td")
      .map(function () {
        return $(this).text();
      })
      .get();

    $("#selected-data").text(rowData.join(" | "));
  }

  function loadDataMachine() {
    $.getJSON("../dist/data/machine-data.json", function (data) {
      const machineBody = $("#machine-body");
      const machineFooter = $("#machine-footer");

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

        const colMachine = createCell(v.machine_model).addClass("pr-4 pl-6");
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
    }).fail(function () {
      alert("Failed to load JSON machine data");
    });
  }

  function loadDataMachineDetail() {
    $.getJSON("../dist/data/machine-detail.json", function (data) {
      const machineDetailBody = $("#machine-detail-body");
      const machineDetailFooter = $("#machine-detail-footer");

      let totRevenue = 0,
        totCost = 0,
        totGp = 0;

      data.forEach((v) => {
        const row = $("<tr>").addClass("border-t border-t-[#DEDDDE] bg-white");

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
    }).fail(function () {
      alert("Failed to load JSON machine data");
    });
  }

  // initiate table
  loadDataMachine();
  loadDataMachineDetail();

  // ===== Start Machine Datatables =====
  var MachineTable = $("#machineTable").DataTable({
    columns: [
      { data: "id" },
      { data: "company_code" },
      { data: "customer_no" },
      { data: "customer_name" },
      { data: "profit_center" },
      { data: "profit_center_name" },
      { data: "profit_center_class" },
      { data: "player_no" },
      { data: "player_business_area" },
    ],
    columnDefs: [
      {
        searchable: false,
        orderable: false,
        targets: 0, // target the index column
      },
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
          menu: [5, 25, 50, 100],
        },
      },
      bottomEnd: {
        paging: {
          numbers: 3,
        },
      },
    },
    pageLength: 5,
    language: {
      info: "Showing _START_ to _END_ of _TOTAL_ rows",
      infoEmpty: "0 rows",
      infoFiltered: "",
      lengthMenu: "_MENU_ rows per page",
    },
    responsive: true,
    autoWidth: false,
  });

  // MachineTable.on("order.dt search.dt", function () {
  //   let i = 1;

  //   MachineTable.cells(null, 0, { search: "applied", order: "applied" }).every(
  //     function (cell) {
  //       this.data(i++);
  //     }
  //   );
  // }).draw();

  $.getJSON("../dist/data/machine-data-list.json", function (data) {
    MachineTable.clear().rows.add(data).draw();
  }).fail(function () {
    console.error("Error loading JSON data.");
  });

  // ===== End Machine Datatables =====

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
  $("[data-modal-toggle]").on("click", function () {
    var targetModal = $(this).data("modal-toggle");
    $("#" + targetModal).toggleClass("hidden flex");
    $(
      '<div dialog-backdrop="" class="fixed inset-0 z-[70] bg-gray-900/50"></div>'
    )
      .attr("id", targetModal + "-backdrop")
      .appendTo("body");
    $("body").toggleClass("overflow-hidden");
  });

  // Hide modal when close button or other buttons are clicked
  $("[data-modal-hide]").on("click", function () {
    var targetModal = $(this).data("modal-hide");
    $("#" + targetModal)
      .addClass("hidden")
      .removeClass("flex");
    $("#" + targetModal + "-backdrop").remove();
    $("body").toggleClass("overflow-hidden");
  });

  $(document).on("click", "[dialog-backdrop]", function () {
    var backdropId = $(this).attr("id");
    const targetModal = backdropId.replace("-backdrop", "");
    $("#" + targetModal)
      .addClass("hidden")
      .removeClass("flex");
    $(this).remove();
    $("body").toggleClass("overflow-hidden");
  });
  // ===== End Dialog Modal =====

  // ===== Start Popover =====
  const $triggers = $(".trigger");
  let popperInstance = null;
  let $currentPopover = null;

  $triggers.on("click", function (e) {
    e.stopPropagation();
    const $trigger = $(this);
    const popoverSelector = $trigger.data("popover");
    const $popover = $(popoverSelector);

    if ($currentPopover && $currentPopover[0] !== $popover[0]) {
      $currentPopover.hide();
    }

    $popover.toggle();
    if ($popover.is(":visible")) {
      if (popperInstance) {
        popperInstance.destroy();
      }
      popperInstance = Popper.createPopper($trigger[0], $popover[0], {
        placement: "bottom-end",
      });
      $currentPopover = $popover;
    } else {
      $popover.hide();
      $currentPopover = null;
    }
  });

  $(document).on("click", function () {
    if ($currentPopover) {
      $currentPopover.hide();
      if (popperInstance) {
        popperInstance.destroy();
      }
      $currentPopover = null;
    }
  });

  $(".popover").on("click", function (e) {
    e.stopPropagation();
  });
  // ===== End Popover =====

  // ===== Start search =====
  $("#searchBtn").on("click", function () {
    $("#formSearch").toggleClass("hidden");
    $("#searchBtn").toggleClass("hidden flex");
    if (!$("#formSearch").hasClass("hidden")) {
      $("#search").focus();
    }
  });

  $("#search").on("blur", function () {
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

  // ===== Start HighCharts =====
  Highcharts.chart("container", {
    chart: {
      type: "column",
    },

    title: {
      text: "Title",
      align: "left",
    },

    xAxis: {
      categories: ["Gold", "Silver", "Bronze"],
    },

    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: "Count medals",
      },
    },

    tooltip: {
      format:
        "<b>{key}</b><br/>{series.name}: {y}<br/>" +
        "Total: {point.stackTotal}",
    },

    plotOptions: {
      column: {
        stacking: "normal",
      },
    },

    series: [
      {
        name: "Norway",
        data: [148, 133, 124],
        stack: "Europe",
      },
      {
        name: "Germany",
        data: [102, 98, 65],
        stack: "Europe",
      },
      {
        name: "United States",
        data: [113, 122, 95],
        stack: "North America",
      },
      {
        name: "Canada",
        data: [77, 72, 80],
        stack: "North America",
      },
    ],
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
        alert("Invalid file format. Please upload an XLS file.");
        return;
      }

      if (file) {
        $dropzoneLabel.toggleClass("hidden");
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
    $("#uploadBtnEditData").attr("disabled");
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
});
