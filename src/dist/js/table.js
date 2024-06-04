$(function () {
  // Dummy data
  let psIndustryPartJson = "../dist/data/ps-industry-part.json";
  let loadingHtml = `
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
    </div>
  `;

  // PS INDUSTRY PART TABLE
  let psIndustryPartLoading = $("#psIndustryPartLoading");

  function loadTable(json) {
    $.ajax({
      url: json,
      type: "GET",
      dataType: "json",
      beforeSend: function () {
        psIndustryPartLoading.append(loadingHtml);
      },
      success: function (data) {
        let bodyPsIndustryPart = $("#psIndustryPartBody");

        let totYtd = 0,
          totMtd = 0,
          totGpActual = 0;

        setTimeout(function () {
          data.forEach((value) => {
            const row = $("<tr>").addClass(
              "border-t border-t-[#DEDDDE] bg-white cursor-pointer hover:bg-yellow-10 table-row"
            );
            row.attr("data-title", `${value.industry}`);
            row.attr("data-children", `${JSON.stringify(value.industries)}`);

            const createCell = (text) =>
              $("<td>")
                .addClass(
                  "px-3 py-4 font-normal whitespace-nowrap text-secondary-90 font-sm"
                )
                .text(text);

            const colIndustry = createCell(value.industry).addClass(
              "pr-4 pl-6"
            );
            const colYtd = createCell(value.ytd);
            const colMtd = createCell(value.mtd);
            const colGpActual = createCell(value.gp_actual);

            const colAction = $("<td>").addClass(
              "px-3 py-4 whitespace-nowrap text-secondary-90 font-sm"
            );
            const actionIcon = $("<img>")
              .attr("src", "../dist/icons/arrowBackneclos.svg")
              .addClass("h-4 w-4 rounded-full whitespace-nowrap");
            colAction.append(actionIcon);

            totYtd += parseFloat(value.ytd);
            totMtd += parseFloat(value.mtd);
            totGpActual += parseFloat(value.gp_actual);

            row.append(colIndustry, colYtd, colMtd, colGpActual, colAction);
            row.click(handleRowClick);
            bodyPsIndustryPart.append(row);
            psIndustryPartLoading.empty();
          });
        }, 300);
      },
      error: function () {
        alert("Failed to fetch data Ps Industry Part");
        psIndustryPartLoading.empty();
      },
    });
  }

  loadTable(psIndustryPartJson)

  let selectedData = [];
  function handleRowClick(e) {
    $(".table-row").removeClass("bg-yellow-10");
    $(this).addClass("bg-yellow-10");
    let name = $(this).find("td:first").text();
    let level = $("#breadcrumb .breadcrumb-item").length;

    // const rowData = $(this)
    //   .children("td")
    //   .map(function () {
    //     return $(this).text();
    //   })
    //   .get();
    //   console.log(rowData);
    const title = $(this).data("title");
    const children = $(this).data("children");

    const newData = {
      title: title,
      data: children,
    };
    console.log(children);
    // psIndustryPartTable.ajax.url(psIndustryPartJson).load();
    loadTable(JSON.stringify(newData))
    selectedData.push(newData);
    // addBreadcrumb(level, name);
    console.log(selectedData);
  }

  // function addBreadcrumb(level, text) {
  //   $("#breadcrumb").append(
  //     '<span class="inline-block mr-2 cursor-pointer breadcrumb-item" data-level="' +
  //       level +
  //       '">' +
  //       text +
  //       "</span>"
  //   );
  // }
});
