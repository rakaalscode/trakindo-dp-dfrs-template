$(function () {
  // let attentionJson = "../dist/data/attention-data.json";
  // let collectionReminderJson = "../dist/data/collection-reminder-data.json";
  // let collectionSubmittedJson = "../dist/data/collection-submitted-data.json";
  // let setUpPicJson = "../dist/data/setup-pic-data.json";
  // let reminderHistoryJson = "../dist/data/reminder-history-data.json";
  // let submitCollectionJson = "../dist/data/submit-collection-data.json";
  // let submitLogHistoryJson = "../dist/data/submit-log-history-data.json";
  // let submitEditDataJson = "../dist/data/submit-edit-data.json";

  let loadingTable = `
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

  // PP MODEL MACHINE SERIES DATA
  let ppModelMachineCategories = [
    "Jan 24",
    "Feb 24",
    "Mar 24",
    "Apr 24",
    "Mei 24",
    "June 24",
  ];
  let ppModelMachineSeries = [
    {
      name: "Total YTD",
      data: [11.0, 14.0, 9.0, 14.0, 13.0, 16.0],
      stack: "ytd",
      color: "#FDBA12",
    },
    {
      name: "Total MTD",
      data: [2.0, 2.0, 2.0, 2.0, 2.0, 3.0],
      stack: "mtd",
      color: "#1480D8",
    },
    {
      name: "Exclude Impairment",
      data: [0, 0, 0, 0, 0, 3.0],
      stack: "mtd",
      color: "#F26D0F",
    },
    {
      name: "Exclude TECO",
      data: [8.0, 12.0, 11.5, 11.0, 8.0, 15.0],
      stack: "mtd",
      color: "#2C313A",
    },
    {
      name: "Budget GP",
      type: "scatter",
      color: "#3B9D3F",
      legendSymbol: "rectangle",
    },
  ];
  let ppModelMachineBudget = "7.0";

  // PP MODEL MACHINE CHART TABLE DATA
  let ppModelMachineChartTable = [
    {
      id: 1,
      machine_model: "All 320 + 323",
      ytd: "88.4 M",
      mtd: "10.8 M",
      gp_plan: "8.0%",
      gp_trans: "8.0%",
      gp_actual: "8.0%",
      date: "01-01-2023",
      details: [
        {
          id: 1,
          machine_model: "All 313",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_plan: "8.0%",
          gp_trans: "8.0%",
          gp_actual: "8.0%",
          date: "02-01-2023",
        },
        {
          id: 1,
          machine_model: "30.5-307.5",
          ytd: "88.4 M",
          mtd: "10.8 M",
          gp_plan: "8.0%",
          gp_trans: "8.0%",
          gp_actual: "8.0%",
          date: "03-01-2023",
        },
      ],
    },
    {
      id: 2,
      machine_model: "All 313",
      ytd: "88.4 M",
      mtd: "10.8 M",
      gp_plan: "8.0%",
      gp_trans: "8.0%",
      gp_actual: "8.0%",
      date: "02-01-2023",
    },
    {
      id: 3,
      machine_model: "30.5-307.5",
      ytd: "88.4 M",
      mtd: "10.8 M",
      gp_plan: "8.0%",
      gp_trans: "8.0%",
      gp_actual: "8.0%",
      date: "03-01-2023",
    },
    {
      id: 4,
      machine_model: "CS10GC",
      ytd: "88.4 M",
      mtd: "10.8 M",
      gp_plan: "8.0%",
      gp_trans: "8.0%",
      gp_actual: "8.0%",
      date: "04-01-2023",
    },
    {
      id: 5,
      machine_model: "All 120",
      ytd: "88.4 M",
      mtd: "10.8 M",
      gp_plan: "8.0%",
      gp_trans: "8.0%",
      gp_actual: "8.0%",
      date: "05-01-2023",
    },
    {
      id: 6,
      machine_model: "All D6",
      ytd: "88.4 M",
      mtd: "10.8 M",
      gp_plan: "8.0%",
      gp_trans: "8.0%",
      gp_actual: "8.0%",
      date: "06-01-2023",
    },
    {
      id: 7,
      machine_model: "745",
      ytd: "88.4 M",
      mtd: "10.8 M",
      gp_plan: "8.0%",
      gp_trans: "8.0%",
      gp_actual: "8.0%",
      date: "01-2-2023",
    },
    {
      id: 8,
      machine_model: "773",
      ytd: "88.4 M",
      mtd: "10.8 M",
      gp_plan: "8.0%",
      gp_trans: "8.0%",
      gp_actual: "8.0%",
      date: "02-03-2023",
    },
    {
      id: 9,
      machine_model: "777",
      ytd: "88.4 M",
      mtd: "10.8 M",
      gp_plan: "8.0%",
      gp_trans: "8.0%",
      gp_actual: "8.0%",
      date: "03-03-2023",
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
      categories: ppModelMachineCategories,
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
        format: "{value} %",
      },
      plotLines: [
        {
          value: ppModelMachineBudget,
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

    series: ppModelMachineSeries,
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
    closeModal("budget-gp-modal")
  });

  let selectedChartTable = [];

  // HANDLE CLICK ROW CHART TABLE
  function handleRowClick(e) {
    $(".chart-row-table").removeClass("bg-yellow-10");
    $(this).addClass("bg-yellow-10");

    const rowData = $(this)
      .children("td")
      .map(function () {
        return $(this).text();
      })
      .get();

    // $("#mYtd").text(rowData[1]);
    // $("#mMtd").text(rowData[2]);
    // $("#mGpPlan").text(rowData[3]);
    // $("#mGpTrans").text(rowData[4]);
    // $("#mDataListTitle").text(`${rowData[0]} GP Data List`);

    // if ($(this).hasClass("bg-yellow-10")) {
    //   let mbread1 = $("#machine-bread li").eq(0);
    //   let mbread2 = $("#machine-bread li").eq(1);
    //   mbread1.find("a").css("color", "#959DAC");
    //   mbread2.find("a").text(rowData[0]);
    //   mbread2.show();
    // }
  }

  // LOAD CHART TABLE DATA
  function loadChartTable(data) {
    let loading = $("#chart-loading-table");
    let chartBodyTable = $("#chart-body-table");
    let chartFooterTable = $("#chart-footer-table");

    chartBodyTable.empty();
    chartFooterTable.empty();

    let totYtd = 0;
    let totMtd = 0;
    let totGpPlan = 0;
    let totGpTrans = 0;
    let totGpActual = 0;

    data.forEach((v) => {
      const row = $("<tr>").addClass(
        "border-t border-t-[#DEDDDE] bg-white cursor-pointer hover:bg-yellow-10 chart-row-table"
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
      // row.click(handleRowClick);
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

    chartFooterTable.append(rowFot);
  }
  loadChartTable(ppModelMachineChartTable);

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
    closeModal("dropzone-submit-modal");
    toggleModal(uploadModalValue);
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
