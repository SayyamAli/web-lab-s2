$(function () {
    loadRecipe();
    $(document).on("click","#del", handleDelete);
    $("#del").click(handleDelete);
    $(document).on("click","#edit",handleUpdate);
    $("#addBtn").click(addRecipe);
    $("#updateSave").click(saveUpdate);
    $("#getAll").click(getAll);
    
});
function getAll(){
    console.log("abc");
    $("#recipes").html(`<div class="hg d-flex justify-content-center">
    <div class="spinner-border text-dark" role="status">
    </div>
</div>`);
loadRecipe();
}
function loadRecipe() {
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products",
        method: "GET",
        success: function (res) {
            var recipes = $("#recipes");
            recipes.empty();
            for (var i = 0; i < res.length; i++) {
                var rec = res[i];
                recipes.addClass("cent p-3 m-2 ");
                recipes.append(
                    `<div id="abc" class="card deco ml-4 mb-4" style="max-width: 20rem;">
                    <h3>${rec.name}</h3>
                    <div class="card-body text-primary">
                        <p class="card-text">${rec.description}</p>
                        <div class="row pt-3 pb-2 m-2 bbb ">
                          <div class="col-sm  hh">
                            Price
                          </div>
                          <div class="col-sm bd hh">
                            Color
                          </div>
                          <div class="col-sm  hh">
                            Department
                          </div>
                        </div>
                        <div class="row p-1 m-2 ">
                            <div class="col-sm  nu">
                            RS. ${rec.price}
                            </div>
                            <div class="col-sm  nu">
                            ${rec.color}
                            </div>
                            <div class="col-sm  nu">
                            ${rec.department}
                            </div>
                          </div>
                    </div>
                    <div class="ft "data-id="${rec._id}">
                    <button id="edit"  class="btn btn-warning btn-sm float-left"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Update</button>
                    <button id="del"  class="btn btn-danger btn-sm float-left"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</button>
                    </div>
                  </div>`
                );
            }
        }

    });
}
function handleDelete() {
    console.log("abcd");
    var btn = $(this);
    var parentDiv = btn.closest(".ft");
    let id = parentDiv.attr("data-id");
    console.log(id);
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products/" + id,
        method: "DELETE",
        success: function () {
            loadRecipe();
            $("#msg").html("Product Deleted");
            $("#alert").modal("show");
        }
    });
}

function addRecipe() {
    var name = $("#name").val();
    var price = $("#price").val();
    var color = $("#color").val();
    var department = $("#department").val();
    var description = $("#description").val();
    // console.log(title, body);
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products",
        method: "POST",
        data: { name, price, color, department, description },
        success: function (response) {
            console.log(response);
            $("#name").val("");
            $("#price").val("");
            loadRecipe();
            $("#addModal").modal("hide");
            $("#msg").html("{Product Added");
            $("#alert").modal("show");

        }
    });

}

function saveUpdate() {

    var id = $("#updateId").val();
    console.log(id);
    var name = $("#updateName").val();
    var price = $("#updatePrice").val();
    var color = $("#updateColor").val();
    var department = $("#updateDepartment").val();
    var description = $("#updateDescription").val();

    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products/" + id,
        method: "PUT",
        data: { name, price, color, department, description },
        success: function (res) {
            // console.log(res);
            loadRecipe();
            $("#updateModal").modal("hide");
            $("#msg").html("Product Updated");
            $("#alert").modal("show");
        }
    });
}

function handleUpdate() {
    var btn = $(this);
    var parentDiv = btn.closest(".ft");
    let id = parentDiv.attr("data-id");
    $.get("https://usman-recipes.herokuapp.com/api/products/" + id, function (res) {
        $("#updateId").val(res._id);
        $("#updateName").val(res.name);
        $("#updatePrice").val(res.price);
        $("#updateColor").val(res.color);
        $("#updateDepartment").val(res.department);
        $("#updateDescription").val(res.description);
        $("#updateModal").modal("show");
    });
}