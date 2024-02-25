$(document).ready(function () {
    $("#Item").val(0);

    $("#Item").change(function () {
        var itemId = $("#Item").val();
        GetItemUnitPrice(itemId);
    });

    $("input[type=text]").change(function () {
        calculateSubTotal();
    });

    $("input[type=text]").keyup(function () {
        CalculateBalance();
    });

    $("#btnAddToList").click(function () {
        AddToTheItemList();
    });

    $("#btnPayment").click(function(){
        FinalPayment();
    });
 });

function FinalPayment() {
    var objOrderViewModel = {};
    var ListOfOrderDetailViewModel=new Array();
    //ListOfOrderDetailViewModel
    objOrderViewModel.PaymentTupeId = $("#PaymentType").val();
    objOrderViewModel.CustomerId = $("#Customer").val();
    objOrderViewModel.FinalTotal = $("#txtFinalTotal").val();

    $("#tb1RestaurantItemList").find("tr:gt(0)").each(function () {
        //var Total = parseFloat($(this).find("td:eq(5)").text());
        //FinalTotal += Total;
        var OrderDetailViewModel = {};
        OrderDetailViewModel.Total = parseFloat($(this).find("td:eq(5)").text());
        OrderDetailViewModel.ItemId = parseFloat($(this).find("td:eq(0)").text());
        OrderDetailViewModel.UnitPrice = parseFloat($(this).find("td:eq(2)").text());
        OrderDetailViewModel.Quantity = parseFloat($(this).find("td:eq(3)").text());
        OrderDetailViewModel.Discount = parseFloat($(this).find("td:eq(4)").text());
        ListOfOrderDetailViewModel.push(OrderDetailViewModel);
    });
    objOrderViewModel.ListOfOrderDetailViewModel = ListOfOrderDetailViewModel;

    $.ajax({
        async: true,
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objOrderViewModel),
        url: '/Restaurant/Index',
        success: function (data) {
            alert(date)
        },
        error: function () {
            alert("There is some problem to adding the data");
        }
    });
}

function AddToTheItemList() {
    var tb1ItemList = $("#tb1RestaurantItemList");
    var UnitPrice = $("#txtUnitPrice").val();
    var Quantity = $("#txtQuantity").val();
    var Discount = $("#txtDiscount").val();
    var ItemId = $("#Item").val();
    var ItemName = $("#Item option:selected").text();
    var Total = (UnitPrice * Quantity) - Discount;

    var ItemList = "<tr><td hidden>" +
        ItemId +
        "</td><td>" +
        ItemName +
        "</td><td>" +
        parseFloat(UnitPrice).toFixed(2) +
        "</td><td>" +
        parseFloat(Quantity).toFixed(2) +
        "</td><td>" +
        (parseFloat(Discount).toString() === "NaN" ? 0 : parseFloat(Discount)).toFixed(2) +
        "</td><td>" +
        parseFloat(Total).toFixed(2) +
        "</td><td> <input type='button' value='Remove' name='remove' class='btn btn-danger remove-button'/> </td></tr>";

    tb1ItemList.append(ItemList);

    // Add a click event handler using jQuery
    $('.remove-button').last().click(function () {
        // Get the total of the removed item
        var removedTotal = parseFloat($(this).closest('tr').find("td:eq(5)").text());

        // Subtract the removed item's total from the overall total
        var currentTotal = parseFloat($("#txtFinalTotal").val());
        var newTotal = currentTotal - removedTotal;
        $("#txtFinalTotal").val(parseFloat(newTotal).toFixed(2));

        // Remove the table row
        $(this).closest('tr').remove();

        // Recalculate the balance after removing the item
        CalculateBalance();
    });

    FinalItemTotal();
    ResetItem();
}

function CalculateBalance() {
    var FinalAmount = $("#txtPaymentTotal").val();
    var PaymentAmount = $("#txtPaymentAmount").val();
    var ReturnAmount = $("#txtReturnTotal").val();

    FinalAmount = FinalAmount.trim() === '' ? 0 : parseFloat(FinalAmount);
    PaymentAmount = PaymentAmount.trim() === '' ? 0 : parseFloat(PaymentAmount);
    ReturnAmount = ReturnAmount.trim() === '' ? 0 : parseFloat(ReturnAmount);

    var BalanceAmount = FinalAmount - PaymentAmount + ReturnAmount;
    $("#txtBalance").val(parseFloat(BalanceAmount).toFixed(2));

    if (parseFloat(BalanceAmount) == 0) {
        $("#btnPayment").removeAttr("disabled");
    } else {
        $("#btnPayment").attr("disabled", "disabled");
    }
}


function FinalItemTotal() {
    $("#txtFinalTotal").val("0.00");
    var FinalTotal = 0.00;
    $("#tb1RestaurantItemList").find("tr:gt(0)").each(function () {
        var Total = parseFloat($(this).find("td:eq(5)").text());
        FinalTotal += Total;
    });
    $("#txtFinalTotal").val(parseFloat(FinalTotal).toFixed(2));
    $("#txtPaymentTotal").val(parseFloat(FinalTotal).toFixed(2));
    $("#txtBalance").val(parseFloat(FinalTotal).toFixed(2));
}

function ResetItem() {
    $("#txtUnitPrice").val('');
    $("#txtQuantity").val('');
    $("#txtDiscount").val('');
    $("#Item").val(0);
    $("#txtTotal").val('');
    $("#Customer").val('');
    $("#PaymentType").val('');
}

function calculateSubTotal() {
    var UnitPrice = $("#txtUnitPrice").val();
    var Quantity = $("#txtQuantity").val();
    var Discount = $("#txtDiscount").val();

    // Check if Discount is empty, set it to 0
    Discount = Discount.trim() === '' ? 0 : parseFloat(Discount);

    var Total = (UnitPrice * Quantity) - Discount;

    $("#txtTotal").val(parseFloat(Total).toFixed(2));
}

function GetItemUnitPrice(itemId) {
    $.ajax({
        async: true,
        type: 'GET',
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        data: { itemId: itemId },
        url: '/Restaurant/getItemUnitPrice',
        success: function (data) {
            $("#txtUnitPrice").val(parseFloat(data).toFixed(2));
        },
        error: function () {
            alert("There is some problem to get the Unit price.");
        }
    });
}
//});
