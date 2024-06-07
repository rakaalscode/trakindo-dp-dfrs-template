$(function () {
  let attentionJson = "../dist/data/attention-data.json";
  let collectionReminderJson = "../dist/data/collection-reminder-data.json";
  let collectionSubmittedJson = "../dist/data/collection-submitted-data.json";
  let setUpPicJson = "../dist/data/setup-pic-data.json";
  let reminderHistoryJson = "../dist/data/reminder-history-data.json";
  let submitCollectionJson = "../dist/data/submit-collection-data.json";
  let submitLogHistoryJson = "../dist/data/submit-log-history-data.json";
  let submitEditDataJson = "../dist/data/submit-edit-data.json";

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

  let loadingMain = `
  <div
    class="absolute inset-0 z-30 flex items-center justify-center bg-opacity-40 bg-cloudy-50"
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

  // Populate year dropdown with the current year and the next 10 years
  let currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= currentYear - 10; i--) {
    $("#yearQuater").append(new Option(i, i));
  }

  // Define months for each quarter
  let quarterMonths = {
    Q1: ["January", "February", "March"],
    Q2: ["April", "May", "June"],
    Q3: ["July", "August", "September"],
    Q4: ["October", "November", "December"],
  };

  // QUARTER SELECT
  $("#quarter").change(function () {
    let selectedQuarter = $(this).val();
    let year = $("#yearQuater").val();
    if (selectedQuarter && year) {
      let months = quarterMonths[selectedQuarter];
      let monthButtons = months
        .map(function (month, index) {
          let imgHtml = "";
          let conditionalClass = "";
          if (index === 0 || index === 2) {
            imgHtml = `<img
              src="../dist/icons/warning-filled-orange.svg"
              class="w-3 h-3 ms-2"
              alt="warning-filled-orange"
            />`;
          }
          if (index === 0) {
            conditionalClass = "btn-secondary";
          } else {
            conditionalClass = "btn-transparent";
          }
          return `<button
            class="px-4 py-2 rounded-[32px] btn btn-sm w-full ${conditionalClass} md:w-auto select-month"
          >
            ${month}
            ${imgHtml}
          </button>`;
        })
        .join("");
      $(".selected-month-q").empty();
      $(".selected-quater-data").empty();
      $(".selected-quater-data").text(`${selectedQuarter} Total Data`);
      $(".selected-month-q").append(monthButtons);
      $(".selected-quater").text(`${selectedQuarter} ${year}`);
    } else {
      $(".selected-quater").html("");
    }
  });

  $("#yearQuater").change(function () {
    $("#quarter").trigger("change");
  });

  $("#yearQuater").val("2022");
  $("#quarter").val("Q1");
  $("#yearQuater").trigger("change");

  // ATTENTION DATATABLE
  let attentionTableLoading = $("#attentionTableLoading");
  let attentionTable = $("#attentionTable").DataTable({
    ajax: {
      url: attentionJson,
      dataSrc: "",
      beforeSend: function () {
        // attentionTableLoading.append(loadingTable);
      },
      complete: function () {
        // setTimeout(function () {
        //   attentionTableLoading.empty();
        // }, 300);
      },
    },
    columns: [
      { data: "template" },
      { data: "field" },
      {
        data: "status",
        render: function (data, type, row, meta) {
          if (data === "failed") {
            return (
              '<span class="label-red">' +
              '<span class="label-rounded-red"></span> Failed' +
              "</span>"
            );
          } else {
            return data; // Display the original data value
          }
        },
      },
      {
        data: null,
        defaultContent: `<a href="#" class="flex items-center justify-center flex-shrink-0" style="min-width:24px">
          <img src="../dist/icons/arrowBackneclos.svg" class="h-4 w-4 flex-shrink-0 whitespace-nowrap">
        </a>`,
      },
    ],
    columnDefs: [
      {
        searchable: false,
        orderable: false,
        targets: 3,
        className: "dt-center",
      },
      { targets: "_all", className: "text-left-i whitespace-nowrap" },
    ],
    layout: {
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: null,
    },
    pageLength: 10,
    responsive: true,
    autoWidth: false,
  });

  // COLLECTION REMINDER DATATABLE
  let collectionReminderTable = $("#collectionReminderTable").DataTable({
    ajax: {
      url: collectionReminderJson,
      dataSrc: "",
      beforeSend: function () {
        // collectionTableLoading.append(loadingTable);
      },
      complete: function () {
        // setTimeout(function () {
        //   collectionTableLoading.empty();
        // }, 300);
      },
    },
    columns: [
      { data: "request_data" },
      { data: "pic" },
      {
        data: "status",
        render: function (data, type, row, meta) {
          if (data !== "Submitted") {
            return `
            <a href="#" class="flex items-center justify-center flex-shrink-0">
              <img src="../dist/icons/notification-filled-black.svg" class="h-6 w-6 flex-shrink-0 whitespace-nowrap">
            </a>`;
          } else {
            return "-";
          }
        },
      },
    ],
    columnDefs: [
      {
        searchable: false,
        orderable: false,
        targets: 2,
        width: "60px",
        className: "dt-center",
      },
      { targets: "_all", className: "text-left-i whitespace-nowrap" },
    ],
    layout: {
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: null,
    },
    pageLength: 10,
    responsive: true,
    autoWidth: false,
  });

  // COLLECTION SUBMITTED DATATABLE
  let collectionSubmittedTable = $("#collectionSubmittedTable").DataTable({
    ajax: {
      url: collectionSubmittedJson,
      dataSrc: "",
      beforeSend: function () {
        // collectionTableLoading.append(loadingTable);
      },
      complete: function () {
        // setTimeout(function () {
        //   collectionTableLoading.empty();
        // }, 300);
      },
    },
    columns: [
      { data: "request_data" },
      { data: "pic" },
      {
        data: "status",
        render: function (data, type, row, meta) {
          if (data === "Submitted") {
            return `
            <a href="#" class="flex items-center justify-center flex-shrink-0">
              <img src="../dist/icons/check-green-rounded.svg" class="h-6 w-6 flex-shrink-0 whitespace-nowrap">
            </a>`;
          } else {
            return "-";
          }
        },
      },
    ],
    columnDefs: [
      {
        searchable: false,
        orderable: false,
        targets: 2,
        width: "60px",
        className: "dt-center",
      },
      { targets: "_all", className: "text-left-i whitespace-nowrap" },
    ],
    layout: {
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: null,
    },
    pageLength: 10,
    responsive: true,
    autoWidth: false,
  });

  // SETUPPIC DATATABLE
  let setUpPicTable = $("#setUpPicTable").DataTable({
    ajax: {
      url: setUpPicJson,
      dataSrc: "",
      beforeSend: function () {
        // setUpPicTableLoading.append(loadingTable);
      },
      complete: function () {
        // setTimeout(function () {
        //   setUpPicTableLoading.empty();
        // }, 300);
      },
    },
    columns: [
      { data: "request_data" },
      {
        data: "pic",
        render: function (data, type, row, meta) {
          if (data) {
            return `<div class="flex items-center min-w-[100px]">
                <span class="flex-1 whitespace-nowrap">${data}</span>
                <div class="flex items-center justify-center flex-nowrap flex-shrink-0 ml-auto">
                  <img src="../dist/icons/search-filled-black.svg" class="w-6 h-6 flex-shrink-0 whitespace-nowrap" />
                </div>
              </div>`;
          } else {
            return data; // Display the original data value
          }
        },
      },
      { data: "email" },
    ],
    columnDefs: [
      { targets: "_all", className: "text-left-i whitespace-nowrap" },
    ],
    layout: {
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: null,
    },
    pageLength: 10,
    responsive: true,
    autoWidth: false,
  });

  // REMINDER HISTORY DATATABLE
  let reminderHistoryTable = $("#reminderHistoryTable").DataTable({
    ajax: {
      url: reminderHistoryJson,
      dataSrc: "",
      beforeSend: function () {
        // setUpPicTableLoading.append(loadingTable);
      },
      complete: function () {
        // setTimeout(function () {
        //   setUpPicTableLoading.empty();
        // }, 300);
      },
    },
    columns: [
      {
        data: "date_time",
        render: function (data, type, row, meta) {
          if (data) {
            const date = moment(data, "YYYY-MM-DD HH:mm:ss").format(
              "D MMM YYYY | HH:mm"
            );
            return date;
          } else {
            return "-"; // Display the original data value
          }
        },
      },
      { data: "data_request" },
      { data: "pic" },
      { data: "trigger_by" },
    ],
    columnDefs: [
      { targets: "_all", className: "text-left-i whitespace-nowrap" },
    ],
    layout: {
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: null,
    },
    pageLength: 10,
    responsive: true,
    autoWidth: false,
  });

  $("#monthReminder, #yearReminder").on("change", function () {
    const selectedMonth = $("#monthReminder").val();
    const selectedYear = $("#yearReminder").val();

    reminderHistoryTable
      .column(0)
      .search(selectedMonth + " " + selectedYear, true, false)
      .draw();
  });

  // SUBMIT COLLECTION DATATABLE
  let submitCollectionTable = $("#submitCollectionTable").DataTable({
    ajax: {
      url: submitCollectionJson,
      dataSrc: "",
      beforeSend: function () {
        // setUpPicTableLoading.append(loadingTable);
      },
      complete: function () {
        // setTimeout(function () {
        //   setUpPicTableLoading.empty();
        // }, 300);
      },
    },
    columns: [
      {
        data: "request_data",
        render: function (data, type, row, meta) {
          const iconEye =
            row.status == "Submitted"
              ? `../dist/icons/eye-open.svg`
              : `../dist/icons/eye-close.svg`;
          if (data) {
            return `<div class="flex items-center gap-x-2">
              <div class="whitespace-nowrap text-ellipsis overflow-hidden flex-1">
                ${data}
              </div>
              <img src="${iconEye}" class="w-4 h-4 flex-shrink-0 whitespace-nowrap" />
            </div>`;
          } else {
            return "-";
          }
        },
      },
      { data: "pic" },
      {
        data: "status",
        render: function (data, type, row, meta) {
          if (data === "Submitted") {
            return `<div class="flex items-center gap-x-2">
              <img src="../dist/icons/check-green-rounded.svg" class="w-4 h-4 flex-shrink-0 whitespace-nowrap" />
              <div class="whitespace-nowrap text-ellipsis overflow-hidden flex-1">
                ${data}
              </div>
            </div>`;
          } else if (data === "Waiting PIC Fill Out") {
            return `<div class="flex items-center gap-x-2">
              <img src="../dist/icons/sand-clock.svg" class="w-4 h-4 flex-shrink-0 whitespace-nowrap" />
              <div class="whitespace-nowrap text-ellipsis overflow-hidden flex-1">
                ${data}
              </div>
            </div>`;
          } else if (data === "Waiting Other Data") {
            return `<div class="flex items-center gap-x-2">
              <img src="../dist/icons/loading-2.svg" class="w-4 h-4 flex-shrink-0 whitespace-nowrap" />
              <div class="whitespace-nowrap text-ellipsis overflow-hidden flex-1">
                ${data}
              </div>
            </div>`;
          } else if (data === "Data Missing") {
            return `<div class="flex items-center gap-x-2">
              <img src="../dist/icons/warning-filled-orange.svg" class="w-4 h-4 flex-shrink-0 whitespace-nowrap" />
              <div class="whitespace-nowrap text-ellipsis overflow-hidden flex-1">
                ${data}
              </div>
            </div>`;
          } else {
            return "-";
          }
        },
      },
      {
        data: "submission",
        render: function (data, type, row, meta) {
          if (data === "Auto Update") {
            let triggerHtml = `<a href="#" class="flex items-center gap-x-2 trigger" role="button"
                  data-popover="#tooltip${row.id}"
                  data-placement="top-end"
                >
                <div class="whitespace-nowrap text-ellipsis overflow-hidden flex-1">
                    ${data}
                  </div>
                  <img src="../dist/icons/information-filled-blue.svg" class="w-4 h-4 flex-shrink-0 whitespace-nowrap" />
                </a>`;

            let popoverHtml = `<div
              class="z-[110] hidden w-auto md:w-[416px] mb-3 text-sm font-normal -pt-10 leading-normal text-left no-underline break-words bg-cloudy-120 border rounded-lg shadow-xl  popover"
              id="tooltip${row.id}"
            >
              <div class="px-4 py-3">
                <div class="flex items-start gap-x-2">
                  <img src="../dist/icons/information-filled-blue.svg" class="w-4 h-4 flex-shrink-0 whitespace-nowrap" />
                  <div class="flex flex-col gap-2 text-cloudy-10 text-sm">
                    <p>We have send the template to Ichsan@trakindo.com. You only need to wait until they fill out the form.</p>
                    <p>Any issue? <span class="text-yellow-90 font-semibold text-sm underline cursor-pointer ms-2">Manual submit</span></p>
                  </div>
                </div>
              </div>
            </div>`;

            $("body").append(popoverHtml);
            return triggerHtml;
          } else {
            return `<a href="#" class="flex items-center gap-x-2">
              <div class="whitespace-nowrap text-ellipsis overflow-hidden flex-1">
                ${data}
              </div>
              <img src="../dist/icons/arrowBackneclos.svg" class="w-4 h-4 flex-shrink-0 whitespace-nowrap" />
            </a>`;
          }
        },
        createdCell: function (td, cellData, rowData, row, col) {
          if (rowData.submission === "Edit Data") {
            $(td)
              .find("a")
              .on("click", function (e) {
                e.preventDefault();
                closeModal("submit-data-collection-modal");
                toggleModal("submit-edit-data-modal");
              });
          } else if (rowData.submission === "Manual Update") {
            $(td)
              .find("a")
              .on("click", function (e) {
                e.preventDefault();
                closeModal("submit-data-collection-modal");
                toggleModal("submit-manual-edit-data-modal");
              });
          } else if (rowData.submission === "Auto Update") {
            $(td)
              .find("a")
              .on("click", function (e) {
                e.preventDefault();
              });
          }
        },
      },
      {
        data: null,
        defaultContent: `<a href="#" class="flex items-center text-center justify-center h-6 w-6">
          <img src="../dist/icons/notification-filled-black.svg" class="h-6 w-6 rounded-full whitespace-nowrap  flex-shrink-0">
        </a>`,
        createdCell: function (td, cellData, rowData, row, col) {
          $(td)
            .find("a")
            .on("click", function (e) {
              e.preventDefault(); // Prevent the default link behavior
              showToast(
                `Your reminder is successfully sent to ${rowData.pic}@trakindo.com`,
                "green"
              );
            });
        },
      },
    ],
    columnDefs: [
      {
        searchable: false,
        orderable: false,
        targets: 4,
        className: "dt-center",
      },
      { targets: "_all", className: "text-left-i whitespace-nowrap" },
    ],
    rowCallback: function (row, data, index) {
      if (data.status !== "Submitted") {
        $(row).css("background-color", "#FEF9ED"); // Change to your desired color
      }
    },
    layout: {
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: null,
    },
    order: [],
    pageLength: 10,
    responsive: true,
    autoWidth: false,
  });

  // SUBMIT FILTER DATE
  $("#monthSubmit, #yearSubmit").on("change", function () {
    const selectedMonth = $("#monthSubmit").val();
    const selectedYear = $("#yearSubmit").val();

    submitCollectionTable
      .column(0)
      .search(selectedMonth + " " + selectedYear, true, false)
      .draw();
  });

  // SUBMIT FILTER REQUEST
  $(".filter-submit-data").click(function () {
    $(".filter-submit-data")
      .removeClass("btn-secondary")
      .addClass("btn-transparent");
    $(this).addClass("btn-secondary").removeClass("btn-transparent");

    const selectedRequest = $(this).data("value");
    console.log(selectedRequest);
    submitCollectionTable.column(0).search(selectedRequest, true, false).draw();
  });

  // REMINDER HISTORY DATATABLE
  let submitLogHistoryTable = $("#submitLogHistoryTable").DataTable({
    ajax: {
      url: submitLogHistoryJson,
      dataSrc: "",
      beforeSend: function () {
        // setUpPicTableLoading.append(loadingTable);
      },
      complete: function () {
        // setTimeout(function () {
        //   setUpPicTableLoading.empty();
        // }, 300);
      },
    },
    columns: [
      {
        data: "date_time",
        render: function (data, type, row, meta) {
          if (data) {
            const date = moment(data, "YYYY-MM-DD HH:mm:ss").format(
              "D MMM YYYY | HH:mm"
            );
            return date;
          } else {
            return "-"; // Display the original data value
          }
        },
      },
      { data: "action" },
      { data: "Statutory" },
    ],
    columnDefs: [
      { targets: "_all", className: "text-left-i whitespace-nowrap" },
    ],
    layout: {
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: null,
    },
    pageLength: 10,
    responsive: true,
    autoWidth: false,
  });

  $("#monthSubmitLog, #yearSubmitLog").on("change", function () {
    const selectedMonth = $("#monthSubmitLog").val();
    const selectedYear = $("#yearSubmitLog").val();

    submitLogHistoryTable
      .column(0)
      .search(selectedMonth + " " + selectedYear, true, false)
      .draw();
  });

  // SUBMIT COLLECTION DATATABLE
  let submitEditDataTable = $("#submitEditDataTable").DataTable({
    ajax: {
      url: submitEditDataJson,
      dataSrc: "",
      beforeSend: function () {
        // setUpPicTableLoading.append(loadingTable);
      },
      complete: function () {
        // setTimeout(function () {
        //   setUpPicTableLoading.empty();
        // }, 300);
      },
    },
    columns: [
      { data: "billing_document" },
      { data: "gl_account_cost" },
      { data: "amount_in_jc" },
    ],
    columnDefs: [
      { targets: "_all", className: "text-left-i whitespace-nowrap" },
    ],
    layout: {
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: null,
    },
    order: [],
    pageLength: 10,
    responsive: true,
    autoWidth: false,
  });

  // SELECT MONTH
  $(document).on("click", ".select-month", function () {
    $(".select-month").removeClass("btn-secondary").addClass("btn-transparent");
    $(this).addClass("btn-secondary").removeClass("btn-transparent");
  });

  // SELECT DAY RECURRENCE
  $("#recurrenceDay .select-day").on("click", function () {
    let data = $(this).data("value");
    $("#recurrenceDay .select-day")
      .removeClass("bg-secondary-90 text-white")
      .addClass("bg-white text-cloudy-110");
    $(this)
      .removeClass("bg-white text-cloudy-110")
      .addClass("bg-secondary-90 text-white");
  });

  // ENDS ON RECURRENCE
  $("input[type=radio][name=ends]").on("change", function () {
    if ($(this).is(":checked") && $(this).val() === "on") {
      $("#endOn").prop("disabled", false);
    } else {
      $("#endOn").prop("disabled", true);
    }

    if ($(this).is(":checked") && $(this).val() === "after") {
      $("#afterAccurences").prop("disabled", false);
    } else {
      $("#afterAccurences").prop("disabled", true);
    }
  });

  let tutorialModalValue = "";
  $("#tutorialManual").click(function () {
    toggleTutorial("submit-manual-edit-data-modal", "tutorial-modal");
  });

  $("#tutorialEdit").click(function () {
    toggleTutorial("submit-edit-data-modal", "tutorial-modal");
  });

  $(".close-tutorial-modal").click(function () {
    toggleModal(tutorialModalValue);
  });

  let uploadModalValue = "";
  $("#uploadManualEdit").click(function () {
    toggleUpload("submit-manual-edit-data-modal", "dropzone-submit-modal");
  });

  $("#uploadEdit").click(function () {
    toggleUpload("submit-edit-data-modal", "dropzone-submit-modal");
  });

  $(".dropzone-submit-modal").click(function () {
    toggleModal(uploadModalValue);
    dropzoneCondition();
  });

  function toggleTutorial(fromModal, targetModal) {
    tutorialModalValue = fromModal;
    closeModal(fromModal);
    toggleModal(targetModal);
  }

  function toggleUpload(fromModal, targetModal) {
    uploadModalValue = fromModal;
    closeModal(fromModal);
    toggleModal(targetModal);
  }

  // ========== ================

  let tutorialMainModalValue = "";
  $("#tutorialManualMain").click(function () {
    toggleTutorialMain("submit-manual-edit-data-modal", "tutorial-modal");
  });

  $("#tutorialEditMain").click(function () {
    toggleTutorialMain("submit-edit-data-modal", "tutorial-modal");
  });

  $(".close-tutorial-modal-2").click(function () {
    toggleModal(tutorialMainModalValue);
  });

  let uploadMainModalValue = "";
  $("#uploadMainManualEdit").click(function () {
    toggleUploadMain("submit-manual-edit-data-modal", "dropzone-submit-modal-2");
  });

  $("#uploadMainEdit").click(function () {
    toggleUploadMain("submit-edit-data-modal", "dropzone-submit-modal-2");
  });

  $(".dropzone-submit-modal-2").click(function () {
    toggleModal(uploadMainModalValue);
    dropzoneCondition();
  });
  

  function toggleTutorialMain(fromModal, targetModal) {
    tutorialMainModalValue = fromModal;
    closeModal(fromModal);
    toggleModal(targetModal);
  }
  
  function toggleUploadMain(fromModal, targetModal) {
    uploadMainModalValue = fromModal;
    closeModal(fromModal);
    toggleModal(targetModal);
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

  // EDITABLE FUNCTION
  $("#editAllBtn").click(function () {
    toggleEditMode();
  });

  $("#cancelEdit").click(function () {
    toggleModal("confirmation-cancel-modal");
  });

  $("#modalEditCancel").click(function () {
    closeModal("confirmation-cancel-modal");
    toggleEditMode(false);
  });

  $("#modalEditSave").click(function () {
    closeModal("confirmation-cancel-modal");
    $("#loadingData").append(loadingMain);
    $("#editAllBtn").toggleClass("btn-secondary btn-outline-yellow");
    $("#cancelEdit").toggleClass("btn-outline-secondary btn-outline-yellow");
    $("#editAllBtn").prop("disabled", true);
    $("#cancelEdit").prop("disabled", true);
    $("#editAllBtn").html(`
      <img src="../dist/icons/loading-2.svg" class="me-2 animate-spin" alt="loading">
      Saving...
    `);
    setTimeout(() => {
      $("#loadingData").empty();
      $("#editAllBtn").toggleClass("btn-secondary btn-outline-yellow");
      $("#cancelEdit").toggleClass("btn-outline-secondary btn-outline-yellow");
      $("#editAllBtn").prop("disabled", false);
      $("#cancelEdit").prop("disabled", false);
      $("#editAllBtn").html(`Edit Mode`);
      toggleEditMode(false);
    }, 2000);
  });

  let isEditMode = false;
  function toggleEditMode(status = true) {
    if (status === true) {
      if (!isEditMode) {
        $(".editable").each(function () {
          let $cell = $(this);
          let text =
            $cell.find(".text-editable").length > 0
              ? $cell.find(".text-editable").text()
              : $cell.text();
          if ($cell.find(".text-editable").length > 0) {
            $cell
              .find(".text-editable")
              .html(
                '<input type="text" class="text-right bg-transparent text-editable" value="' +
                  text.trim() +
                  '" />'
              );
          } else {
            $cell.html(
              '<input type="text" class="text-right bg-transparent" value="' +
                text.trim() +
                '" />'
            );
          }
        });
        $("#cancelEdit").show();
        $("#editAllBtn").text("Save Edit");
      }
      isEditMode = true;
    } else if (status === false) {
      if (isEditMode) {
        $(".editable").each(function () {
          let $cell = $(this);
          let $input = $cell.find("input");
          let value = $input.val();

          if ($cell.find(".text-editable").length > 0) {
            $cell.find(".text-editable").text(value);
          } else {
            $cell.text(value);
          }
        });
        $("#cancelEdit").hide();
        $("#editAllBtn").text("Edit Mode");
      }
      isEditMode = false;
    }
  }

  function cancelEditModal() {
    if (isEditMode) {
      // Save the values and change back to text mode
      $(".editable").each(function () {
        let $cell = $(this);
        let $input = $cell.find("input");
        let value = $input.val();

        if ($cell.find(".text-editable").length > 0) {
          $cell.find(".text-editable").text(value);
        } else {
          $cell.text(value);
        }
      });
      $("#cancelEdit").hide();
      $("#editAllBtn").text("Edit Mode");
      closeModal("confirmation-cancel-modal");
    }
    isEditMode = false;
  }

  function saveEditModal() {
    if (!isEditMode) {
      $(".editable").each(function () {
        let $cell = $(this);
        let text =
          $cell.find(".text-editable").length > 0
            ? $cell.find(".text-editable").text()
            : $cell.text();
        if ($cell.find(".text-editable").length > 0) {
          $cell
            .find(".text-editable")
            .html(
              '<input type="text" class="text-right bg-transparent text-editable" value="' +
                text.trim() +
                '" />'
            );
        } else {
          $cell.html(
            '<input type="text" class="text-right bg-transparent" value="' +
              text.trim() +
              '" />'
          );
        }
      });
      $("#cancelEdit").show();
      $("#editAllBtn").text("Save Edit");
    }
    isEditMode = true;
  }

  // =============== REUSABLE FUNCTION ===============
  // SIDEBAR
  $("#sidebarMenu").on("click", function () {
    let aside = $("#sidebar-menu");
    let main = $("#main-content");
    let isClose = $(this).find("img").hasClass("md:rotate-180");
    // let isCloseMobile = $(this).find('img').hasClass('rotate-180');

    if (!isClose) {
      $(this).find("img").toggleClass("md:rotate-180");
      aside.addClass("md:-translate-x-0").removeClass("md:-translate-x-48");
      main.addClass("md:ml-64").removeClass("md:ml-16");
    } else {
      $(this).find("img").toggleClass("md:rotate-180");
      aside.addClass("md:-translate-x-48").removeClass("md:-translate-x-0");
      main.addClass("md:ml-16").removeClass("md:ml-64");
    }

    // if(!isCloseMobile) {
    //   $(this).find('img').toggleClass('rotate-180')
    //   aside.addClass("-translate-x-0").removeClass("-translate-x-48")
    // } else {
    //   $(this).find('img').toggleClass('rotate-180')
    //   aside.addClass("-translate-x-48").removeClass("-translate-x-0")
    // }
  });

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
