

function fromSubmit(form, url, callbackfunction) {
    $.ajax({
        type: "Post",
        url: url,
        data: form.serialize(),
        cache: false,
        success: callbackfunction,
        error: function (error) {
            console.log(error);
            InfoConfirmbox('Error occured');
        }
    });
}

function PostAjaxCall(data, url, callbackfunction) {
    $.ajax({
        type: "Post",
        url: url,
        data: data,
        cache: false,
        success: callbackfunction,
        error: function (error) {
            console.log(error);

            if (error.responseJSON) {
                if (error.responseJSON.Message != "An error has occurred.")
                    InfoConfirmbox(error.responseJSON.Message);
                else
                    InfoConfirmbox(error.responseJSON.ExceptionMessage);
            }
            else
                InfoConfirmbox(error.statusText);
            // alert('Error occured');
        }
    });
}

function PostAjaxCallwithParam(data, url, callbackfunction, param) {
    $.ajax({
        type: "Post",
        url: url,
        data: data,
        cache: false,
        success: function (response) { callbackfunction(response, param) },
        error: function (error) {
            console.log(error);
            if (error.responseJSON)
                if (error.responseJSON.Message != "An error has occurred.")
                    InfoConfirmbox(error.responseJSON.Message);
                else
                    InfoConfirmbox(error.responseJSON.ExceptionMessage);
            else
                InfoConfirmbox(error.statusText);
            // alert('Error occured');
        }
    });
}

function PostAjaxCallwithParamLazyLoad(data, url, callbackfunction, param) {
    $.ajax({
        type: "Post",
        url: url,
        data: data,
        cache: false,
        async: false,
        success: function (response) { callbackfunction(response, param) },
        error: function (error) {
            console.log(error);
            //  console.log(url);
            if (error.responseJSON)
                if (error.responseJSON.Message != "An error has occurred.")
                    InfoConfirmbox(error.responseJSON.Message);
                else
                    InfoConfirmbox(error.responseJSON.ExceptionMessage);
            else
                InfoConfirmbox(error.statusText);
            // alert('Error occured');
        }
    });
}

function GetAjaxCallwitParam(data, url, callbackfunction, param) {

    var ajax = $.ajax({
        type: "Get",
        url: url,
        data: data,
        cache: false,
        success: function (response) { callbackfunction(response, param) },
        error: function (error) {
            console.log(error);
            InfoConfirmbox('Error occured');
        }
    });

    return ajax;
}

function GetAjaxCall(data, url, callbackfunction) {

    var ajax = $.ajax({
        type: "Get",
        url: url,
        data: data,
        cache: false,
        success: callbackfunction,
        error: function (error) {
            console.log(error);
            alert('Error occured');
        }
    });

    return ajax;
}


function GetCollectionObj(key, value, type) {
    var obj2 = {};

    obj2.Key = key;
    obj2.Value = value;
    obj2.Type = type;


    return obj2;
}
function GetMasterfrmCollection(Maindivid) {
    var frmColletion = [];

    $('#' + Maindivid).find('input').each(function (i, obj) {
        var key = $(obj).data('name');
        var obj2 = {};

        if (key) {
            obj2.Key = key;
            obj2.Value = $(obj).val();
            obj2.Type = "string";
            //obj2[key] =  $(obj).val() ;
            //console.log(obj2);
            frmColletion.push(obj2);
        }
    });

    $('#' + Maindivid).find('select').each(function (i, obj) {
        var key = $(obj).data('name');
        var obj2 = {};

        if (key) {
            obj2.Key = key;
            obj2.Value = $(obj).val();
            obj2.type = "string";
            //obj2[key] =  $(obj).val() ;
            //console.log(obj2);
            frmColletion.push(obj2);
        }
    });

    return frmColletion;
}

function GetfrmCollectionForEssential(Maindivid) {
    var frmColletion = [];

    var database = GetDatabase();
    var userId = GetuserId();

    if (!userId) {
        a = b;
        return false;
    }
   // frmColletion.push(GetCollectionObj("database", database, "string"));
    frmColletion.push(GetCollectionObj("LoginUserId", userId, "string"));

    return frmColletion;
}


function GetfrmCollection(Maindivid, IsnonSession) {
    var frmColletion = [];

    //var companyId = GetCompanyId();
    if (!IsnonSession) {
        var database = GetDatabase();
        var userId = GetuserId();

        if (!userId) {
            a = b;
            return false;
        }
        frmColletion.push(GetCollectionObj("database", database, "string"));
        frmColletion.push(GetCollectionObj("LoginUserId", userId, "string"));

      //  frmColletion.push(GetCollectionObj("IsSkiliftUser", GetIsSkiliftUser(), "bool"));


    }
    // frmColletion.push(GetCollectionObj("CompanyId", companyId, "string"));

    $('#' + Maindivid).find('input').each(function (i, obj) {


        var key = $(obj).data('name');
        var isproceed = true;



        if (key) {
            if ($(obj).attr('type') == 'file') {
                isproceed = false;
                var fileid = '';
                var isReqDatatbl = $(obj).data('valtype') ? true : false;
                if ($(obj).val() != '') {

                    // fileid = 
                    //console.log(fileid);
                    $.when(FileUpload($(obj).data('module'), $(obj))).done(function (a1) {

                        if (!isReqDatatbl) {
                            frmColletion.push(GetCollectionObj(key, a1, "string"));
                            frmColletion.push(GetCollectionObj('ModuleFolderName', $(obj).data('module'), "string"));
                        }
                        else {

                            if (a1) {
                                var dt = [];
                                var arr = a1.split(',');
                                for (i = 0; i < arr.length; i++) {
                                    var subobj = {};
                                    subobj = GetFilearrobj(arr[i], $(obj).data('module'));
                                    dt.push(subobj);
                                }
                                frmColletion.push(GetCollectionObj(key, JSON.stringify(dt), "datatable"));
                            }
                        }
                    });
                }
                else {
                    if (!isReqDatatbl) {
                        frmColletion.push(GetCollectionObj(key, '', "string"));
                        frmColletion.push(GetCollectionObj('ModuleFolderName', '', 'string'));
                    }
                    else {
                        var dt = [];
                        var subobj = {};
                        subobj = GetFilearrobj('', '');
                        dt.push(subobj);
                        frmColletion.push(GetCollectionObj(key, JSON.stringify(dt), "datatable"));
                    }
                }

            }

            if ($(obj).attr('type') == 'radio') {

                if ($(obj).is(':checked')) {
                    //ok
                }
                else {
                    isproceed = false;
                }
            }

            if ($(obj).attr('type') == 'checkbox') {
                isproceed = false;
                var value = false;
                if ($(obj).is(':checked')) {
                    value = true;
                }


                if (key) {
                    var obj2 = {};
                    obj2.Key = key;
                    obj2.Value = value;
                    obj2.Type = "boolean";
                    //obj2[key] =  $(obj).val() ;
                    //console.log(obj2);
                    frmColletion.push(obj2);
                }
            }

            if ($(obj).attr('type') == 'datetime-local') {
                isproceed = false;
                if (key) {
                    var obj2 = {};
                    obj2.Key = key;
                    obj2.Value = $(obj).val() ? GetDateformated($(obj).val()) : null;
                    obj2.Type = "Datetime";
                    //obj2[key] =  $(obj).val() ;
                    //console.log(obj2);
                    frmColletion.push(obj2);
                }
            }

            if (isproceed) {
                var obj2 = {};

                if (key) {
                    obj2.Key = key;
                    obj2.Value = $(obj).val();
                    obj2.Type = "string";
                    //obj2[key] =  $(obj).val() ;
                    //console.log(obj2);
                    frmColletion.push(obj2);
                }
            }
        }
    });

    $('#' + Maindivid).find('select').each(function (i, obj) {

        var key = $(obj).data('name');
        var obj2 = {};
        var isProceed = true;



        var isReqDatatbl = $(obj).data('valtype') ? true : false;
        if (isReqDatatbl) {
            isProceed = false;
            var frmcoll = [];
            var valarr = $(obj).val();
            if (valarr.length > 0) {
                $(valarr).each(function (i, val) {
                    frmcoll.push(GetObjByStructure(val, key));
                });
                frmColletion.push(GetCollectionObj(key, JSON.stringify(frmcoll), "datatable"));
            }
            else {//default value structure
                frmcoll.push(GetObjByStructure(0, key));
                frmColletion.push(GetCollectionObj(key, JSON.stringify(frmcoll), "datatable"));
            }
        }

        if (key && isProceed) {
            obj2.Key = key;
            obj2.Value = $(obj).val();
            obj2.type = "string";
            //obj2[key] =  $(obj).val() ;
            //console.log(obj2);
            frmColletion.push(obj2);
        }
    });

    $('#' + Maindivid).find('textarea').each(function (i, obj) {
        var key = $(obj).data('name');
        var obj2 = {};
        var isproceed = true;



        if (key && isproceed) {
            obj2.Key = key;
            obj2.Value = $(obj).val();
            obj2.type = "string";
            //obj2[key] =  $(obj).val() ;
            //console.log(obj2);
            frmColletion.push(obj2);
        }
    });

    $('#' + Maindivid).find('div[data-name]').each(function (i, obj) {
        if (!$(obj).hasClass('sysOverall')) {

            var key = $(obj).data('name');
            var obj2 = {};
            var isproceed = true;

            if (key && isproceed) {
                obj2.Key = key;
                obj2.Value = $(obj).html();
                obj2.type = "string";
                //obj2[key] =  $(obj).val() ;
                //console.log(obj2);
                frmColletion.push(obj2);
            }
        }
    });

    $('#' + Maindivid).find('div.sysOverall').each(function (i, obj) {

        var key = $(obj).data('name');
        var obj2 = {};

        if (key) {
            obj2.Key = key;
            obj2.Value = gettbl($(this));
            obj2.type = "datatable";

            frmColletion.push(obj2);
        }
    });

    $('#' + Maindivid).find('tbody.sysOverall').each(function (i, obj) {

        var key = $(obj).data('name');
        var obj2 = {};

        if (key) {
            obj2.Key = key;
            obj2.Value = gettbl($(this));
            obj2.type = "datatable";

            frmColletion.push(obj2);
        }
    });


    return frmColletion;
}

function gettbl(nodes) {
    var fullArr = [];
    if (nodes) {

        var childs = nodes.find('div.sysparent');
        if (childs.length == 0) {
            if (nodes.find('tr.sysparent').length > 0) {
                childs = nodes.find('tr.sysparent');
            }
        }
        childs.each(function () {
            var subobj = {};

            var totalcount = $(this).find('[data-arr_name]').length;  //data('TotalFieldCount');

            if (totalcount) {
                for (i = 0; i <= parseInt(totalcount) ; i++) {

                    $(this).find('input[data-index=' + i + ']').each(function (i, obj) {
                        var key = $(obj).data('arr_name');
                        var isproceed = true;

                        if ($(obj).attr('type') == 'radio') {

                            if ($(obj).is(':checked')) {

                            }
                            else {
                                isproceed = false;
                            }
                        }

                        if ($(obj).attr('type') == 'checkbox') {
                            isproceed = false;
                            if ($(obj).is(':checked')) {
                                if (key) {
                                    if (key) {

                                        var IsValRequired = $(obj).data('required');

                                        if (IsValRequired && IsValRequired == 'val')
                                            subobj[key] = $(obj).val();
                                        else
                                            subobj[key] = true;

                                    }

                                }
                            }
                            else {
                                if (key) {
                                    var IsValRequired = $(obj).data('required');

                                    if (IsValRequired && IsValRequired == 'val')
                                    { }
                                    else
                                        subobj[key] = false;


                                }
                            }
                        }

                        if ($(obj).attr('type') == 'datetime-local') {
                            isproceed = false;
                            subobj[key] = $(obj).val() ? GetDateformated($(obj).val()) : null;
                        }


                        if (isproceed) {


                            if (key) {
                                subobj[key] = $(obj).val();
                                //obj2.Key = key;
                                //obj2.Value = $(obj).val();
                                //obj2.Type = "string";
                                ////obj2[key] =  $(obj).val() ;
                                ////console.log(obj2);
                                //frmColletion.push(obj2);
                            }
                        }
                    });
                    $(this).find('select[data-index=' + i + ']').each(function (i, obj) {
                        var key = $(obj).data('arr_name');
                        var obj2 = {};

                        if (key) {
                            subobj[key] = $(obj).val();
                        }
                    });

                    $(this).find('textarea[data-index=' + i + ']').each(function (i, obj) {
                        var key = $(obj).data('arr_name');
                        var obj2 = {};

                        if (key) {
                            subobj[key] = $(obj).val();
                        }
                    });

                    $(this).find('h4[data-index=' + i + ']').each(function (i, obj) {
                        var key = $(obj).data('arr_name');
                        var obj2 = {};

                        if (key) {
                            subobj[key] = $(obj).val();
                        }
                    });

                    $(this).find('div[data-index=' + i + ']').each(function (i, obj) {
                        var key = $(obj).data('arr_name');
                        var obj2 = {};

                        if (key) {
                            subobj[key] = $(obj).html();
                        }
                    });
                    $(this).find('span[data-index=' + i + ']').each(function (i, obj) {
                        var key = $(obj).data('arr_name');
                        var obj2 = {};

                        if (key) {
                            subobj[key] = $(obj).html();
                        }
                    });
                }
            }
            else {
                $(this).find('input').each(function (i, obj) {

                    var key = $(obj).data('arr_name');
                    var isproceed = true;

                    if ($(obj).attr('type') == 'radio') {

                        if ($(obj).is(':checked')) {
                            //ok
                        }
                        else {
                            isproceed = false;
                        }
                    }

                    if ($(obj).attr('type') == 'checkbox') {
                        isproceed = false;
                        if ($(obj).is(':checked')) {
                            if (key) {

                                var IsValRequired = $(obj).data('required');

                                if (IsValRequired && IsValRequired == 'val')
                                    subobj[key] = $(obj).val();
                                else
                                    subobj[key] = true;

                            }
                        }
                        else {
                            if (key) {
                                subobj[key] = false;
                            }
                        }
                    }

                    if (isproceed) {


                        if (key) {
                            subobj[key] = $(obj).val();
                            //obj2.Key = key;
                            //obj2.Value = $(obj).val();
                            //obj2.Type = "string";
                            ////obj2[key] =  $(obj).val() ;
                            ////console.log(obj2);
                            //frmColletion.push(obj2);
                        }
                    }
                });

                $(this).find('select').each(function (i, obj) {
                    var key = $(obj).data('arr_name');
                    var obj2 = {};

                    if (key) {
                        subobj[key] = $(obj).val();
                    }
                });

                $(this).find('textarea').each(function (i, obj) {
                    var key = $(obj).data('arr_name');
                    var obj2 = {};

                    if (key) {
                        subobj[key] = $(obj).val();
                    }
                });

                $(this).find('h4').each(function (i, obj) {
                    var key = $(obj).data('arr_name');
                    var obj2 = {};

                    if (key) {
                        subobj[key] = $(obj).val();
                    }
                });
            }


            if (subobj && !jQuery.isEmptyObject(subobj)) {
                fullArr.push(subobj);
            }

        });

    }
    // console.log(fullArr);
    return JSON.stringify(fullArr);
}

//function GetFilearrobj(val, module) {
//    var subobj = {};
//    subobj["AttachmentId"] = 0;
//    subobj["AttachmentFileName"] = val;
//    subobj["AttachmentFolderName"] = module;
//    subobj["AttachmentCategory"] = '';
//    subobj["AttachmentCategoryId"] = 0;
//    subobj["CompanyId"] = 0;
//    subobj["CreatedBy"] = 0;
//    subobj["CreatedDate"] = '';
//    return subobj;
//}

function GetFilearrobj(val, module, linkId) {
    var subobj = {};
    subobj["AttachmentId"] = 0;
    subobj["Module"] = '';
    subobj["SubModule"] = '';
    subobj["ModuleNumber"] = 0;
    subobj["SubModuleNumber"] = linkId ? linkId : 0;
    subobj["AttachmentFileName"] = val;
    subobj["AttachmentFolderName"] = module;
    return subobj;
}

function GetDateformated(val) {
    var d = new Date(val),
       month = '' + (d.getMonth() + 1),
       day = '' + d.getDate(),
       year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    var hours = d.getHours(); //returns 0-23
    var minutes = d.getMinutes(); //returns 0-59
    var seconds = d.getSeconds(); //returns 0-59

    return [year, month, day].join('-') + ' ' + [hours, minutes].join(':');
}

function GetObjByStructure(val, typeid) {
    var subobj = {};
    if (typeid == "VendorGeneralLedgerMappingList") {
        subobj["VendorGeneralLedgerMappingId"] = 0;
        subobj["VendorId"] = 0;
        subobj["GeneralLedgerId"] = val;
    }
   
    return subobj;
}

function Settbl(overalldiv, dt, strnodes) {

    if (dt && dt.length) {
        for (i = 0; i < dt.length; i++) {
            var elements = $(strnodes);
            for (var prop in dt[i]) {

                var inputele = elements.find('input[data-arr_name=' + prop + ']');

                if (inputele.length > 0) {

                    if (inputele.attr('type') == 'radio') {
                        var matchedEle = inputele.filter(function () { return $(this).val() == dt[i][prop] });
                        if (matchedEle) {
                            matchedEle.prop('checked', true);
                        }
                    }
                    else if (inputele.attr('type') == 'checkbox') {
                        if (dt[i][prop]) {
                            inputele.prop('checked', true);
                        }
                        else {
                            inputele.prop('checked', false);
                        }
                    }
                    else {
                        inputele.val(dt[i][prop]);
                    }
                }

                var seletele = elements.find('select[data-arr_name=' + prop + ']');
                if (seletele.length > 0) {
                    PopulatedrpByTempDrp(overalldiv, seletele, prop);
                    seletele.val(dt[i][prop]);
                }

                var textarea = elements.find('textarea[data-arr_name=' + prop + ']');
                if (textarea.length > 0) {
                    textarea.val(dt[i][prop]);
                }

                var p = elements.find('p[data-arr_name=' + prop + ']');
                if (p.length > 0) {
                    p.html(dt[i][prop]);
                }

                var Img = elements.find('Img[data-arr_name=' + prop + ']');
                if (Img.length > 0) {
                    var url = GetBaseUrl() + '/AppAttachments/' + dt[i][prop];
                    Img.attr('src', url);
                }

                //UserImageView
                var div = elements.find('div[data-arr_name=' + prop + ']');
                if (div.length > 0) {
                    if (div.data('link')) {
                        var url = GetBaseUrl() + '/AppAttachments/' + dt[i][prop];
                        div.attr('style', 'background-image : url(' + url + ')');
                    }
                    else {
                        div.html(dt[i][prop]);
                    }
                }

                var span = elements.find('span[data-arr_name=' + prop + ']');
                if (span.length > 0) {
                    span.html(dt[i][prop]);
                }

                var td = elements.find('td[data-arr_name=' + prop + ']');
                if (td.length > 0) {
                    td.html(dt[i][prop]);
                }

                var h4 = elements.find('h4[data-arr_name=' + prop + ']');
                if (h4.length > 0) {
                    h4.html(dt[i][prop]);
                }

            }
            $(overalldiv).append(elements);
        }

    }

    // console.log(fullArr);
    return true;
}

function Settblreturnstr(overalldiv, dt, strnodes) {

    if (dt && dt.length) {
        for (i = 0; i < dt.length; i++) {
            var elements = $(strnodes);
            for (var prop in dt[i]) {

                var inputele = elements.find('input[data-arr_name=' + prop + ']');

                if (inputele.length > 0) {

                    if (inputele.attr('type') == 'radio') {
                        var matchedEle = inputele.filter(function () { return $(this).val() == dt[i][prop] });
                        if (matchedEle) {
                            matchedEle.prop('checked', true);
                        }
                    }
                    else if (inputele.attr('type') == 'checkbox') {
                        if (dt[i][prop]) {
                            inputele.prop('checked', true);
                        }
                        else {
                            inputele.prop('checked', false);
                        }
                    }
                    else {
                        inputele.val(dt[i][prop]);
                    }
                }

                var seletele = elements.find('select[data-arr_name=' + prop + ']');
                if (seletele.length > 0) {
                    PopulatedrpByTempDrp(overalldiv, seletele, prop);
                    seletele.val(dt[i][prop]);
                }

                var textarea = elements.find('textarea[data-arr_name=' + prop + ']');
                if (textarea.length > 0) {
                    textarea.val(dt[i][prop]);
                }

                var p = elements.find('p[data-arr_name=' + prop + ']');
                if (p.length > 0) {
                    p.html(dt[i][prop]);
                }

                var Img = elements.find('Img[data-arr_name=' + prop + ']');
                if (Img.length > 0) {
                    var url = GetBaseUrl() + '/AppAttachments/' + dt[i][prop];
                    Img.attr('src', url);
                }

                //UserImageView
                var div = elements.find('div[data-arr_name=' + prop + ']');
                if (div.length > 0) {
                    if (div.data('link')) {
                        var url = GetBaseUrl() + '/AppAttachments/' + dt[i][prop];
                        div.attr('style', 'background-image : url(' + url + ')');
                    }
                    else {
                        div.html(dt[i][prop]);
                    }
                }
            }
            $(overalldiv).append(elements);
        }

    }

    // console.log(fullArr);
    return $(overalldiv);
}

function PopulatedrpByTempDrp(overall, curselect, prop) {
    if (overall && curselect) {
        //var divrefitems = $(overall).prev();
        //if(divrefitems.length>0)
        //{
        var refselect = $(document).find('select[data-ref_name=' + prop + ']');
        if (refselect.length > 0) {
            Copyselect(refselect, curselect);
        }
        //}
    }
}

function Copyselect(primaryselect, secondaryselect) {
    if (primaryselect && secondaryselect) {
        var $options = $(primaryselect).find('option').clone();
        $(secondaryselect).empty();
        $(secondaryselect).append($options);
    }
}

function FillSysOverallItemDrps(type, html) {
    var Ele = type == 'Overall' ? $('.sysOverall') : $(html);

    Ele.find('select').each(function () {

        var name = $(this).data('arr_name');
        if (name) {
            var refele = $('[data-ref_name=' + name + ']');
            if (refele.length > 0) {
                PopulatedrpByTempDrp('.sysOverall', $(this), name);
            }
        }
    });

    return $(html);
}

function setHiraricalDrps(dt, id, refid) {
    if (dt && dt.length) {
        for (i = 0; i < dt.length; i++) {
            for (var prop in dt[i]) {
                var seletele = $('#' + id).find('select[data-name=' + prop + ']');
                if (seletele.length > 0) {

                    var linkid = seletele.data('link');
                    if (linkid) {
                        FillDrpMaster(linkid, id, refid, dt[i][prop]);
                    }

                }

            }
        }
    }
}


function setfrmValues(dt, id, ds) {

    if (dt && dt.length) {

        for (i = 0; i < dt.length; i++) {
            for (var prop in dt[i]) {

                var inputele = $('#' + id).find('input[data-name=' + prop + ']');

                if (inputele.length > 0) {

                    if (inputele.attr('type') == 'radio') {

                        var matchedEle = inputele.filter(function () { return $(this).val().toString().toLowerCase() == dt[i][prop].toString().toLowerCase() });
                        if (matchedEle) {
                            matchedEle.prop('checked', true);
                            matchedEle.attr('checked', 'checked');
                        }
                    }
                    else if (inputele.attr('type') == 'checkbox') {
                        if (dt[i][prop]) {
                            inputele.prop('checked', true);
                        }
                        else {
                            inputele.prop('checked', false);
                        }
                    }
                    else {

                        inputele.val(dt[i][prop]);
                    }
                }

                var seletele = $('#' + id).find('select[data-name=' + prop + ']');
                if (seletele.length > 0) {

                    seletele.val(dt[i][prop]);

                }

                var textarea = $('#' + id).find('textarea[data-name=' + prop + ']');
                if (textarea.length > 0) {
                    textarea.val(dt[i][prop]);
                }

                var h4 = $('#' + id).find('h4[data-name=' + prop + ']');
                if (h4.length > 0) {

                    $(h4).html(dt[i][prop]);
                }
                var h6 = $('#' + id).find('h6[data-name=' + prop + ']');
                if (h6.length > 0) {

                    $(h6).html(dt[i][prop]);
                }
                var h5 = $('#' + id).find('h5[data-name=' + prop + ']');
                if (h5.length > 0) {

                    $(h5).html(dt[i][prop]);
                }

                //UserImageView
                var div = $('#' + id).find('div[data-name=' + prop + ']');
                if (div.length > 0) {
                    if (div.data('link')) {
                        var url = GetBaseUrl() + '/AppAttachments/' + dt[i][prop];
                        div.attr('style', 'background-image : url(' + url + ')');
                    }
                    else {
                        $(div).html(dt[i][prop]);
                    }
                }

                var Img = $('#' + id).find('Img[data-name=' + prop + ']');
                if (Img.length > 0) {
                    var url = GetBaseUrl() + '/AppAttachments/' + dt[i][prop];
                    Img.attr('src', url);
                }

                var span = $('#' + id).find('span[data-name=' + prop + ']');
                if (span.length > 0) {

                    $(span).html(dt[i][prop]);
                }

                //var div = $('#' + id).find('div[data-name=' + prop + ']');
                //if (div.length > 0) {

                //    $(div).html(dt[i][prop]);
                //}


            }
        }


        //else {
        //    $('#' + id).find('div.sysOverall').each(function (i, obj) {
        //        $(obj).find('select').val('');
        //        $(obj).find('input').val('');
        //    });
        //}
    }
    else if (!ds) {
        $('#' + id).find('input').val('');
        $('#' + id).find('select').val('');
    }

    if (ds) {

        var overallele = $('#' + id).find('.sysOverall');
        //if (overallele.length == 0) {
        //    overallele = $('#' + id).find('tbody.sysOverall');
        //}
        overallele.each(function (i, obj) {

            $(obj).find('select').val('');
            $(obj).find('input').val('');
            var key = $(obj).data('name');
            if (key) {
                for (var tbl in ds) {

                    if (key == tbl) {
                        var strTemplate = GetTemplate(key);

                        if (key && ds[tbl] && strTemplate) {
                            $(this).empty();
                            Settbl($(this), ds[tbl], strTemplate);
                        }
                    }
                }
            }
        });


    }



}

function GetFillHiraricaldrp(dataname, creatediv, refid, HiraricalId, select) {
    var data = GetfrmCollectionForEssential();//[] //GetfrmCollection(creatediv);
   // data.push(GetCollectionObj("LoginUserId", GetuserId(), "string"));
    data.push(GetCollectionObj("TypeName", dataname, "string"));
    data.push(GetCollectionObj("RefId", refid, "int"));
    data.push(GetCollectionObj("HiraricalId", HiraricalId, "int"));
    data.push(GetCollectionObj("RefTypeName", '', "string"));

    var scope = { "Fields": data };
    // $('select[data-name=' + dataname + ']').empty();
    PostAjaxCallwithParamLazyLoad(scope, GetBaseUrl() + '/api/Common/GetMasterData', ResponseFillOvearllDrpMasterbydrpparem, select);
}

function ResponseFillOvearllDrpMasterbydrpparem(response, select) {
    if (response && response.length > 0) {
        var arr = [];
        arr.push('<option value="">Select</option>');
        for (i = 0; i < response.length; i++) {
            var obj = ' <option value=' + response[i].Id + '>' + response[i].Text + '</option>';
            arr.push(obj);
        }

        select.empty();
        select.append(arr);
    }
}


function FillParamBydrpMaster(dataname, creatediv, callbackfun, refid, HiraricalId) {
    var data = GetfrmCollectionForEssential();
   // data.push(GetCollectionObj("LoginUserId", GetuserId(), "string"));
    data.push(GetCollectionObj("TypeName", dataname, "string"));
    data.push(GetCollectionObj("RefId", refid, "int"));
    data.push(GetCollectionObj("HiraricalId", HiraricalId, "int"));
    data.push(GetCollectionObj("RefTypeName", '', "string"));
    data.push(GetCollectionObj("IsEnglish", $('#drpLang').val() == 'EN' ? true : false, "string"));
    var scope = { "Fields": data };
    $('select[data-name=' + dataname + ']').empty();
    PostAjaxCallwithParamLazyLoad(scope, GetBaseUrl() + '/api/Common/GetMasterData', callbackfun, dataname);
}

function FillDrpMaster(dataname, creatediv, refid, HiraricalId) {
    var data = GetfrmCollectionForEssential();
   // data.push(GetCollectionObj("LoginUserId", GetuserId(), "string"));
    data.push(GetCollectionObj("TypeName", dataname, "string"));
    data.push(GetCollectionObj("RefId", refid, "int"));
    data.push(GetCollectionObj("HiraricalId", HiraricalId, "int"));
    data.push(GetCollectionObj("RefTypeName", '', "string"));

    var scope = { "Fields": data };
    $('select[data-name=' + dataname + ']').empty();
    PostAjaxCallwithParamLazyLoad(scope, GetBaseUrl() + '/api/Common/GetMasterData', ResponseFillDrpMaster, dataname);
}

function FillTreeDrpMaster(dataname, creatediv, refid, RefTypeName, HiraricalId) {
    var data = GetfrmCollectionForEssential();
    //data.push(GetCollectionObj("LoginUserId", GetuserId(), "string"));
    data.push(GetCollectionObj("TypeName", dataname, "string"));
    data.push(GetCollectionObj("RefId", refid, "int"));
    data.push(GetCollectionObj("HiraricalId", HiraricalId, "int"));
    data.push(GetCollectionObj("RefTypeName", RefTypeName, "string"));

    var scope = { "Fields": data };
    $('select[data-name=' + dataname + ']').empty();
    PostAjaxCallwithParamLazyLoad(scope, GetBaseUrl() + '/api/Common/GetMasterData', ResponseFillDrpMaster, dataname);
}

function FillTreeDrpMasterforref(dataname, creatediv, refid, RefTypeName, HiraricalId) {
    var data = GetfrmCollectionForEssential();
    //data.push(GetCollectionObj("LoginUserId", GetuserId(), "string"));
    data.push(GetCollectionObj("TypeName", dataname, "string"));
    data.push(GetCollectionObj("RefId", refid, "int"));
    data.push(GetCollectionObj("HiraricalId", HiraricalId, "int"));
    data.push(GetCollectionObj("RefTypeName", RefTypeName, "string"));

    var scope = { "Fields": data };
    $('select[data-name=' + dataname + ']').empty();
    PostAjaxCallwithParamLazyLoad(scope, GetBaseUrl() + '/api/Common/GetMasterData', ResponseFillOvearllDrpMaster, dataname);
}

function FillOvearllDrpMaster(dataname, creatediv, refid, HiraricalId) {
    var data = GetfrmCollectionForEssential();
    //data.push(GetCollectionObj("LoginUserId", GetuserId(), "string"));
    data.push(GetCollectionObj("TypeName", dataname, "string"));
    data.push(GetCollectionObj("RefId", (refid ? refid : '0'), "int"));
    data.push(GetCollectionObj("HiraricalId", HiraricalId, "int"));
    data.push(GetCollectionObj("RefTypeName", '', "string"));

    var scope = { "Fields": data };
    $('select[data-ref_name=' + dataname + ']').empty();
    PostAjaxCallwithParamLazyLoad(scope, GetBaseUrl() + '/api/Common/GetMasterData', ResponseFillOvearllDrpMaster, dataname);
}

function RemoveFirstElementFromdrp(dataname) {
    $('[data-name=' + dataname + ']').find('option').get(0).remove();
}

function ResponseFillOvearllDrpMaster(response, dataname) {
    if (response && response.length > 0) {
        var arr = [];
        var defaultval = $('select[data-ref_name=' + dataname + ']').data('default');

        var isneeddefault = true;
        var isorignlval = $('select[data-ref_name=' + dataname + ']').data('default_need');
        if (isorignlval == false)
            isneeddefault = false;

        if (isneeddefault)
            arr.push('<option value="" selected="" class="lang" data-lang="' + defaultval + '" disabled=""> ' + (defaultval != '' && defaultval != undefined ? defaultval : 'Select') + '</option>');

        for (i = 0; i < response.length; i++) {
            var obj = ' <option value=' + response[i].Id + '>' + response[i].Text + '</option>';
            arr.push(obj);
        }

        $('select[data-ref_name=' + dataname + ']').empty();
        $('select[data-ref_name=' + dataname + ']').append(arr);
    }
}

function ResponseFillDrpMaster(response, dataname) {
    if (response && response.length > 0) {
        var defaultval = $('select[data-name=' + dataname + ']').data('default');
        var arr = [];
        var isneeddefault = true;
        var isorignlval = $('select[data-name=' + dataname + ']').data('default_need');
        if (isorignlval == false)
            isneeddefault = false;

        if (isneeddefault)
            arr.push('<option value=""  selected="" class="lang" data-lang="' + defaultval + '" disabled="">' + (defaultval != '' && defaultval != undefined ? defaultval : 'Select') + '</option>');

        for (i = 0; i < response.length; i++) {
            var obj = ' <option value="' + response[i].Id + '">' + response[i].Text + '</option>';
            arr.push(obj);
        }

        $('select[data-name=' + dataname + ']').empty();
        $('select[data-name=' + dataname + ']').append(arr);
    }
}

function FillTreeDrpandUPdateWithValueOnEdit(creatediv, data) {
    $('#' + creatediv).find('[data-fill_tree=true]').each(function () {
        $(this).trigger('change');
        var linktreeId = $(this).data('tree_link');
        $('#' + creatediv).find('[data-name=' + linktreeId + ']').val(data[0][linktreeId]);

    });
}


function FileUpload(folername, e) {
    var data = new FormData();
    var file = e[0].files;
    for (j = 0; j < file.length; j++) {
        data.append('file', file[j]);
    }
    return $.ajax({
        url: GetBaseUrl() + '/Api/Login/Upload?BaseFolder=' + folername,
        processData: false,
        contentType: false,
        async: false,
        data: data,
        type: 'POST'
        // }).done(function (result) {
        // return result;
    }).fail(function (a, b, c) {
        console.log(a, b, c);
    });
}

function loadmyUser() {
    var ajax = GetAjaxCall(null, myprofileUrl(), Loadmyprofile);

}
function Loadmyprofile(response) {
    $('#divUserModelContent').html(response);
    $('#UsermodelId').show();
}


var ReadImage = function (file, previewSelector, type) {

    var reader = new FileReader;
    var image = new Image;

    reader.readAsDataURL(file);
    reader.onload = function (_file) {

        image.src = _file.target.result;
        image.onload = function () {

            var height = this.height;
            var width = this.width;
            var type = file.type;
            var size = ~~(file.size / 1024) + "KB";

            //  $("#targetImg").attr('src', _file.target.result);
            //$("#description").text("Size:" + size + ", " + height + "X " + width + ", " + type + "");
            //$("#imgPreview").show();
            if(type=='div')
                previewSelector.attr('style', 'background-image : url(' + _file.target.result + ')');
            else 
                previewSelector.attr('src', _file.target.result );

        }

    }

}


function RegisterImagePreview() {
    $(".sysUploadImg").change(function () {

        var name = $(this).data('name');

        var linkelement = $('div[data-link=' + name + ']');
        var linkelementimg = $('img[data-link=' + name + ']');
        var File = this.files;

        if (File && File[0]) {
            if (linkelement)
                ReadImage(File[0], linkelement, 'div');
            if(linkelementimg)
                ReadImage(File[0], linkelementimg, 'img');

        }

    });
}

function onchangeEventBind(dataname, callbackfun) {
    $('[data-name=' + dataname + ']').on('change', function () {
        callbackfun($(this).val(), dataname);
    });
}

function GetUnique(inputArray, filedname) {
    var outputArray = [];

    for (var i = 0; i < inputArray.length; i++) {
        if ((jQuery.inArray(inputArray[i][filedname], outputArray)) == -1) {
            outputArray.push(inputArray[i][filedname]);
        }
    }

    return outputArray;
}

function GetChartSeriesvalues(inputArray, filedname) {
    var outputArray = [];

    for (var i = 0; i < inputArray.length; i++) {

        outputArray.push(inputArray[i][filedname]);

    }

    return outputArray;
}





/*Validation */
function isNumberKeyByCondition(evt, e, count) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    if ($(e).val().length >= count)
        return false;
    return true;
}

function isNumberKeyByConditionWithOnespl(evt, e, count) {

    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    if ($(e).val().length >= count)
        return false;
    if ($(e).val().indexOf('.') > 0) {
        if (charCode == 46)
            return false;
    }

    return true;
}


function CheckandRemoveForFloat(evt, e, count) {

    var arrval = $(e).val().split('.');
    if (arrval.length > 1) {
        var decimal = arrval[1];
        if (decimal.length > count) {
            $(e).val($(e).val().substr(0, $(e).val().length - 1));
            return false;
        }
    }

    return true;
}


function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    if ($(e).val().length >= count)
        return false;
    return true;
}

function onlyAlphaNumeric(e) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
}


function onlyAlphabets(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else { return true; }
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
            return true;
        else
            return false;
    }
    catch (err) {
        alert(err.Description);
    }
}

function onlyAlphabetsWithWhitespc(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else { return true; }

        if ($(t).val().indexOf(' ') > 0) {
            if (charCode == 32)
                return false;
        }

        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32)
            return true;
        else
            return false;
    }
    catch (err) {
        alert(err.Description);
    }
}

function FileValidation(e) {


    //  var file = $(e)[0].files;
    if ($(e).val() != '') {
        $.each($(e).prop("files"), function (k, v) {
            var filename = v['name'];
            var ext = filename.split('.').pop().toLowerCase();
            if ($.inArray(ext, ['jpg', 'png', 'jpeg']) == -1) {
                InfoConfirmbox('Please upload only jpg,png,jpeg format files.');
                $(e).val('');
                return false;
            }
        });
    }
};

function validateAndReturn(dataname, message) {
    var ele = $('[data-name=' + dataname + ']');
    if (!ele.val()) {
        ele.after('<span class="error">' + message + '</span>');
        return false;
    }
    else {

    }
    return true;
}

function AllowtodayIsLastDate(e) {
    var now = new Date(),
    // minimum date the user can choose, in this case now and in the future
    minDate = now.toISOString().substring(0, 10);

    $('[data-name=' + e + ']').prop('max', minDate);
}

//Dashboard//

function getBarchartdata(xaxis, yaxis, response, type) {
    var arr = [];

    if (response) {
        for (i = 0; i < response.length; i++) {
            var obj = {
                name: response[i][xaxis],
                y: response[i][yaxis],
                color: GetColor(type, i)  //"#00CED1"
            };
            arr.push(obj);
        }
    }

    return arr;
}


//End Dashboard//

//Access check
function GetAData(IsEdit) {

    var accessId = "access";
    if (IsEdit)
        accessId = "editaccess";

    var data = GetAccessData();

    $('[data-' + accessId + ']').each(function () {
        // var IsValid = false;

        var uniqueid = $(this).data(accessId);
        var IsValid = $(JSON.parse(data)).map(function (e, i) { if (i.UniqueId == uniqueid && i.IsHasAccess == "1") { return true; }; });

        // if (uniqueid.indexOf(',') == -1) {
        //   IsValid = $(JSON.parse(data)).map(function (e, i) { if (i.UniqueId == uniqueid && i.IsHasAccess == "1") { return true; }; });
        //}
        //else {
        //    var ids = uniqueid.split(',');
        //    for (i = 0; i < ids.length; i++) {

        //        IsValid = $(JSON.parse(data)).map(function (e, i) { if (i.UniqueId == uniqueid && i.IsHasAccess == "1") { return true; }; });
        //        if (IsValid) {
        //            break;
        //        }
        //    }
        //}

        if (!IsValid || IsValid.length == 0 && IsValid[0] != true)
            $(this).remove();
    });
}



function IsHasAccess(uniqueid)//(verifyToken,url)
{

    var data = GetAccessData();


    var IsValid = $(JSON.parse(data)).map(function (e, i) { if (i.UniqueId == uniqueid && i.IsHasAccess == "1") { return true; }; });
    if (!IsValid || IsValid.length == 0 && IsValid[0] != true)
        return false;
    else
        return true;

}

//Launguage change script
function GetChangeLanugauge(DivEle) {
    $('.loader').show();
    var CurrentLng = $('#drpLang').val();

    if (sessionStorage.getItem("seslang") != null) {
        CurrentLng = sessionStorage.getItem("seslang");
        $('#drpLang').val(CurrentLng);
    }

    var langArr = WORDS_EN;

    if (CurrentLng == 'TN')
        langArr = WORDS_TN;

    var divid = $(document);
    if (DivEle && DivEle.length > 0) {
        divid = DivEle;
    }

    divid.find('.lang').each(function (i, e) {
        if ($(e).is('a') || $(e).is('div') || $(e).is('span') || $(e).is('legend') || $(e).is('h6') || $(e).is('label') || $(e).is('th') || $(e).is('input') || $(e).is('Select') || $(e).is('textarea') || $(e).is('button')) {
            for (var a in langArr) {
                if ($(e).is('Select')) {

                    var firstOpt = $(e).find('option.lang').data('lang');
                    if (firstOpt == a) {
                        $(e).find('option.lang').html(langArr[a]);
                        break;
                    }

                }
                else if ($(e).data('lang') == a) {

                    if ($(e).is('input') || $(e).is('textarea')) {
                        $(e).attr('placeholder', langArr[a]);
                        break;
                    }
                    else {
                        $(e).html($(e).html().replace(a, langArr[a]));

                        if (CurrentLng == 'EN')
                            $(e).html($(e).html().replace(WORDS_TN[a], langArr[a]));
                        else if (CurrentLng == 'TN')
                            $(e).html($(e).html().replace(WORDS_EN[a], langArr[a]));
                        break;
                    }
                }
            }
        }
    });

    $('.loader').hide();
}

function GetlangMessage(textId) {
    var langArr = WORDS_EN;

    if ($('#drpLang').val() == 'TN')
        langArr = WORDS_TN;

    return langArr[textId];
}

//End

//Dynamic inner dynamic table functions
function GetInnerArrData(key) {
    var data = [];
    $('[data-innername=' + key + '].sysOverallInner').each(function () {

        $(this).find('.sysparent').each(function () {

            data = $.merge(GetInnerTBl($(this), 'arr_arrname'), data);
        });
    });

    if (data && data.length > 0) {
        data = data.reverse();
    }

    var key = key;
    var obj2 = {};

    if (key) {
        obj2.Key = key;
        obj2.Value = JSON.stringify(data);
        obj2.type = "datatable";

        // data.push(obj2);
    }

    return obj2;
}

function GetInnerTBl(nodes, eleAlisName) {
    var fullArr = [];
    var childs = nodes;
    childs.each(function () {
        var subobj = {};

        var totalcount = $(this).find('[data-' + eleAlisName + ']').length;  //data('TotalFieldCount');

        if (totalcount) {
            for (i = 0; i <= parseInt(totalcount) ; i++) {

                $(this).find('input[data-arr_index=' + i + ']').each(function (i, obj) {
                    var key = $(obj).data(eleAlisName);
                    var isproceed = true;

                    if ($(obj).attr('type') == 'file') {

                        isproceed = false;
                        var fileid = '';
                        var isReqDatatbl = $(obj).data('valtype') ? true : false;
                        if ($(obj).val() != '') {

                            // fileid = 
                            //console.log(fileid);
                            $.when(FileUpload($(obj).data('module'), $(obj))).done(function (a1) {

                                if (!isReqDatatbl) {
                                    fullArr.push(GetCollectionObj(key, a1, "string"));
                                    fullArr.push(GetCollectionObj('ModuleFolderName', $(obj).data('module'), "string"));
                                }
                                else {

                                    if (a1) {
                                        //  var dt = [];
                                        var arr = a1.split(',');
                                        for (i = 0; i < arr.length; i++) {
                                            var subobj1 = {};
                                            subobj1 = GetFilearrobj(arr[i], $(obj).data('module'), $(obj).data('innerlinkid'));
                                            //dt.push(subobj1);
                                            fullArr.push(subobj1);
                                        }

                                    }
                                }
                            });
                        }
                        else {
                            if (!isReqDatatbl) {
                                fullArr.push(GetCollectionObj(key, '', "string"));
                                fullArr.push(GetCollectionObj('ModuleFolderName', '', 'string'));
                            }
                            else {
                                // var dt = [];
                                var subobj1 = {};
                                subobj1 = GetFilearrobj('', '', $(obj).data('innerlinkid'));
                                //  dt.push(subobj1);
                                fullArr.push(subobj1);
                            }
                        }

                    }

                    if ($(obj).attr('type') == 'radio') {

                        if ($(obj).is(':checked')) {

                        }
                        else {
                            isproceed = false;
                        }
                    }

                    if ($(obj).attr('type') == 'checkbox') {
                        isproceed = false;
                        if ($(obj).is(':checked')) {
                            if (key) {
                                if (key) {

                                    var IsValRequired = $(obj).data('required');

                                    if (IsValRequired && IsValRequired == 'val')
                                        subobj[key] = $(obj).val();
                                    else
                                        subobj[key] = true;

                                }

                            }
                        }
                        else {
                            if (key) {
                                var IsValRequired = $(obj).data('required');

                                if (IsValRequired && IsValRequired == 'val')
                                { }
                                else
                                    subobj[key] = false;


                            }
                        }
                    }

                    if ($(obj).attr('type') == 'datetime-local') {
                        isproceed = false;
                        subobj[key] = $(obj).val() ? GetDateformated($(obj).val()) : null;
                    }





                    if (isproceed) {


                        if (key) {
                            subobj[key] = $(obj).val();
                            //obj2.Key = key;
                            //obj2.Value = $(obj).val();
                            //obj2.Type = "string";
                            ////obj2[key] =  $(obj).val() ;
                            ////console.log(obj2);
                            //frmColletion.push(obj2);
                        }
                    }
                });
                $(this).find('select[data-arr_index=' + i + ']').each(function (i, obj) {
                    var key = $(obj).data(eleAlisName);
                    var obj2 = {};

                    if (key) {
                        subobj[key] = $(obj).val();
                    }
                });

                $(this).find('textarea[data-arr_index=' + i + ']').each(function (i, obj) {
                    var key = $(obj).data(eleAlisName);
                    var obj2 = {};

                    if (key) {
                        subobj[key] = $(obj).val();
                    }
                });

                $(this).find('h4[data-arr_index=' + i + ']').each(function (i, obj) {
                    var key = $(obj).data(eleAlisName);
                    var obj2 = {};

                    if (key) {
                        subobj[key] = $(obj).val();
                    }
                });
                $(this).find('div[data-arr_index=' + i + ']').each(function (i, obj) {
                    var key = $(obj).data(eleAlisName);
                    var obj2 = {};

                    if (key) {
                        subobj[key] = $(obj).html();
                    }
                });

                $(this).find('span[data-arr_index=' + i + ']').each(function (i, obj) {
                    var key = $(obj).data(eleAlisName);
                    var obj2 = {};

                    if (key) {
                        subobj[key] = $(obj).html();
                    }
                });
            }
        }
        else {
            $(this).find('input').each(function (i, obj) {

                var key = $(obj).data(eleAlisName);
                var isproceed = true;

                if ($(obj).attr('type') == 'radio') {

                    if ($(obj).is(':checked')) {
                        //ok
                    }
                    else {
                        isproceed = false;
                    }
                }

                if ($(obj).attr('type') == 'checkbox') {
                    isproceed = false;
                    if ($(obj).is(':checked')) {
                        if (key) {

                            var IsValRequired = $(obj).data('required');

                            if (IsValRequired && IsValRequired == 'val')
                                subobj[key] = $(obj).val();
                            else
                                subobj[key] = true;

                        }
                    }
                    else {
                        if (key) {
                            subobj[key] = false;
                        }
                    }
                }

                if (isproceed) {


                    if (key) {
                        subobj[key] = $(obj).val();
                        //obj2.Key = key;
                        //obj2.Value = $(obj).val();
                        //obj2.Type = "string";
                        ////obj2[key] =  $(obj).val() ;
                        ////console.log(obj2);
                        //frmColletion.push(obj2);
                    }
                }
            });

            $(this).find('select').each(function (i, obj) {
                var key = $(obj).data(eleAlisName);
                var obj2 = {};

                if (key) {
                    subobj[key] = $(obj).val();
                }
            });

            $(this).find('textarea').each(function (i, obj) {
                var key = $(obj).data(eleAlisName);
                var obj2 = {};

                if (key) {
                    subobj[key] = $(obj).val();
                }
            });

            $(this).find('h4').each(function (i, obj) {
                var key = $(obj).data(eleAlisName);
                var obj2 = {};

                if (key) {
                    subobj[key] = $(obj).val();
                }
            });
        }


        if (subobj && !jQuery.isEmptyObject(subobj)) {
            fullArr.push(subobj);
        }

    });

    return fullArr;
}


function SetLoadSysOverInnerForInduvitual(datasource, ovearlldataname, innerdataname, relationshipid, relationshipId) {


    $('[data-name=' + ovearlldataname + ']').find('.sysparent').filter(function () { if ($(this).find('[data-arr_name=' + relationshipid + ']').val() == relationshipId) return this; }).each(function () {



        var kpiId = relationshipId;
        var filteredds = $.map(datasource, function (e, i) {
            if (e[relationshipid] == kpiId) { return e };
        });

        $(this).find('[data-Innername=' + innerdataname + '].sysOverallInner').find('.sysparent').remove();

        if (filteredds.length > 0) {


            var strTemplate = GetTemplate(innerdataname);

            if (filteredds && strTemplate) {

                Setinnertbl($(this).find('[data-Innername=' + innerdataname + ']'), filteredds, strTemplate);


            }
        }


    });
}

function SetLoadSysOverInner(datasource, ovearlldataname, innerdataname, relationshipid, IsCheckCondition, ConditionChkId) {

    $('[data-name=' + ovearlldataname + ']').find('.sysparent').each(function () {
        var isProceed = true;
        if (IsCheckCondition) {
            var isStg = $(this).find('[data-arr_name=' + ConditionChkId + ']');
            if (!isStg.is(':checked')) {
                isProceed = false;
            }
        }
        //  $(this).find('.sysOverallInner').find('.frm-to-date-box').show();

        if (isProceed) {
            var kpiId = $(this).find('[data-arr_name=' + relationshipid + ']').val();
            var filteredds = $.map(datasource, function (e, i) {
                if (e[relationshipid] == kpiId) { return e };
            });

            $(this).find('[data-Innername=' + innerdataname + '].sysOverallInner').find('.sysparent').remove();

            if (filteredds.length > 0) {
                var strTemplate = GetTemplate(innerdataname);

                if (filteredds && strTemplate) {

                    Setinnertbl($(this).find('[data-Innername=' + innerdataname + ']'), filteredds, strTemplate);


                }
            }
        }

    });
}

function Setinnertbl(overalldiv, dt, strnodes) {

    if (dt && dt.length) {
        for (i = 0; i < dt.length; i++) {
            var elements = $(strnodes);
            for (var prop in dt[i]) {

                var inputele = elements.find('input[data-arr_arrname=' + prop + ']');

                if (inputele.length > 0) {

                    if (inputele.attr('type') == 'radio') {
                        var matchedEle = inputele.filter(function () { return $(this).val() == dt[i][prop] });

                        if (inputele.hasClass('rating-input')) {
                            UpdateRatingCntlids();
                        }

                        if (matchedEle) {

                            matchedEle.prop('checked', true);
                        }
                    }
                    else if (inputele.attr('type') == 'checkbox') {
                        if (dt[i][prop]) {
                            inputele.prop('checked', true);
                        }
                        else {
                            inputele.prop('checked', false);
                        }
                    }
                    else {
                        inputele.val(dt[i][prop]);
                    }
                }

                var seletele = elements.find('select[data-arr_arrname=' + prop + ']');
                if (seletele.length > 0) {
                    PopulatedrpByTempDrp(overalldiv, seletele, prop);
                    seletele.val(dt[i][prop]);
                }

                var textarea = elements.find('textarea[data-arr_arrname=' + prop + ']');
                if (textarea.length > 0) {
                    textarea.val(dt[i][prop]);
                }

                var p = elements.find('p[data-arr_arrname=' + prop + ']');
                if (p.length > 0) {
                    p.html(dt[i][prop]);
                }

                var Img = elements.find('Img[data-arr_arrname=' + prop + ']');
                if (Img.length > 0) {
                    var url = GetBaseUrl() + '/AppAttachments/' + dt[i][prop];
                    Img.attr('src', url);
                }

                //UserImageView
                var div = elements.find('div[data-arr_arrname=' + prop + ']');
                if (div.length > 0) {
                    if (div.data('link')) {
                        var url = GetBaseUrl() + '/AppAttachments/' + dt[i][prop];
                        div.attr('style', 'background-image : url(' + url + ')');
                    }
                    else {
                        div.html(dt[i][prop]);
                    }
                }

                var span = elements.find('span[data-arr_arrname=' + prop + ']');
                if (span.length > 0) {
                    span.html(dt[i][prop]);
                }

                var td = elements.find('td[data-arr_arrname=' + prop + ']');
                if (td.length > 0) {
                    td.html(dt[i][prop]);
                }

                var h4 = elements.find('h4[data-arr_arrname=' + prop + ']');
                if (h4.length > 0) {
                    h4.html(dt[i][prop]);
                }

            }
            $(overalldiv).append(elements);
        }

    }

    // console.log(fullArr);
    return true;
}

//ENd

function ReplaceFirstMinustoPlusSyminDynamicExt(dataname) {
    $('[data-name=' + dataname + ']').find('.sysparent:first').find('div.add').show();
    $('[data-name=' + dataname + ']').find('.sysparent:first').find('div.delete').hide();

}

function ReplaceFirstMinustoPlusSyminDynamicInnerExt(dataname) {
    $('[data-innername=' + dataname + ']').find('.sysparent:first').find('div.add').show();
    $('[data-innername=' + dataname + ']').find('.sysparent:first').find('div.delete').hide();

}

/*FileHandle*/
function GetConfigureFileViewManupulation(CreateDiv) {

    $('#' + CreateDiv).find('div.AttachList.sysOverall').find('.sysparent').each(function () {
        var filename = $(this).find('[data-arr_name=AttachmentFileName]').val();
        var foldername = $(this).find('[data-arr_name=AttachmentFoldername]').val();

        // var ext = filename ? filename.split('.')[1] : '';
        $(this).find('.sysAttachName').html(filename);
        var e = this;
        $(this).find('.sysAttchDownload i').click(function () { DownloadFile(filename, foldername); });
        $(this).find('.sysAttachCancel i').click(function () { DeleteAttachment(e); });

    });

    //Filling default with empty result from db
    $('#' + CreateDiv).find('div.AttachList.sysOverall').each(function () {
        if (!$(this).html()) {
            $(this).append(GetTemplate('AttachmentDetails'));
            $(this).find('.sysparent').css('display', 'none');
        }
    });
}


function GetConfigureFileViewManupulationForInnerArr(CreateDiv) {

    $('#' + CreateDiv).find('div.AttachList.sysOverallInner').find('.innerattachment.sysparent').each(function () {
        var filename = $(this).find('[data-arr_arrname=AttachmentFileName]').val();
        var foldername = $(this).find('[data-arr_arrname=AttachmentFoldername]').val();

        // var ext = filename ? filename.split('.')[1] : '';
        $(this).find('.sysAttachName').html(filename);
        var e = this;
        $(this).find('.sysAttchDownload i').click(function () { DownloadFile(filename, foldername); });
        $(this).find('.sysAttachCancel i').click(function () { DeleteAttachment(e); });

    });

    //Filling default with empty result from db
    $('#' + CreateDiv).find('div.AttachList.sysOverallInner').each(function () {
        if (!$(this).html()) {
            $(this).append(GetTemplate('AttachmentarrDetails'));
            $(this).find('.sysparent').css('display', 'none');
        }
    });
}



function DeleteAttachment(e) {

    if ($(e).closest('.sysOverall').find('.sysparent').length == 1) {

        $(e).closest('.sysOverall').append(GetTemplate('AttachmentDetails'));
        $(e).closest('.sysOverall').find('.sysparent').css('display', 'none');
    }


    $(e).remove();
    //Filling default with empty result from db

}
function DownloadFile(file, folder) {
    if (file && folder) {
        window.location.href = GetBaseUrl() + '/api/Common/GetFileDownload?FileName=' + file + '&FolderName=' + folder + '';
    }
    else
        myAlert('File not valid.');

}
/*End*/

/*Duplicate in dynamic controls*/

function IsDuplicate(CreateDiv, DynamicDiv, FieldId) {
    var isduplicate = false;
    var designationarr = [];
    var outputArray = [];
    $('#' + CreateDiv).find('[data-name=' + DynamicDiv + ']').find('[data-arr_name=' + FieldId + ']').each(function ()
    { designationarr.push($(this).val()); });


    for (var i = 0; i < designationarr.length; i++) {
        if ((jQuery.inArray(designationarr[i], outputArray)) == -1) {
            outputArray.push(designationarr[i]);
        }
    }

    if (designationarr && outputArray) {
        if (designationarr.length != outputArray.length) {
            // InfoConfirmbox('Please select unique designation in project member list.');
            isduplicate = true;
        }
    }

    return isduplicate;
}

/*End*/

/*SetToday as min data for date cntl*/
//result = getDateCountDiffExceptSunday(new Date(start), new Date(end));

function getDateCountDiffExceptSunday(startDate, endDate) {
    var count = 0;
    var curDate = startDate;
    while (curDate <= endDate) {
        var dayOfWeek = curDate.getDay();
        if (!((dayOfWeek == 0)))
            count++;
        curDate.setDate(curDate.getDate() + 1);
    }
    // alert(count)
    return count;
}



function SetMaxTodayByCondition(CreateDiv) {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();

    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;

    $('#' + CreateDiv).find('.todaymax').attr('max', maxDate);
}
function SetMaxToday(CreateDiv) {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();

    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;

    $('#' + CreateDiv).find('[type=date]').attr('max', maxDate);
}

function SetWeekEndDateAsMax(CreateDiv) {

    // If no date object supplied, use current date
    // Copy date so don't modify supplied date
    var now = new Date();

    // set time to some convenient value
    now.setHours(0, 0, 0, 0);

    // Get the previous Monday
    var monday = new Date(now);
    monday.setDate(monday.getDate() - monday.getDay() + 1);

    // Get next Sunday
    var lastday = new Date(now);
    lastday.setDate(lastday.getDate() - lastday.getDay() + 6);

    var month = lastday.getMonth() + 1;
    var day = lastday.getDate();
    var year = lastday.getFullYear();

    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;



    $('#' + CreateDiv).find('[type=date]').attr('max', maxDate);
}


function SetWeekEndDateAsMax1(CreateDiv) {
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));

    var month = lastday.getMonth() + 1;
    var day = lastday.getDate();
    var year = lastday.getFullYear();

    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;

    $('#' + CreateDiv).find('[type=date]').attr('max', maxDate);
}



/*Dynamic validation assign control*/
function AssignRequiredForDynamic(Creatediv, dynamicdivid) {
    $('#' + Creatediv).find('[data-name=' + dynamicdivid + ']').find('.sysparent').each(function (i, e) {
        var count = i;
        $(this).find('textarea').each(function () {
            if ($(this).attr('required')) {
                var name = $(this).attr('name');
                $(this).attr('id', name + '-' + count);
                $(this).attr('name', name + '-' + count);
            }
        });
        $(this).find('select').each(function () {
            if ($(this).attr('required')) {
                var name = $(this).attr('name');
                $(this).attr('id', name + '-' + count);
                $(this).attr('name', name + '-' + count);
            }
        });
        $(this).find('input[type=text]').each(function () {
            if ($(this).attr('required')) {
                var name = $(this).attr('name');
                $(this).attr('id', name + '-' + count);
                $(this).attr('name', name + '-' + count);
            }
        });
        $(this).find('input[type=date]').each(function () {
            if ($(this).attr('required')) {
                var name = $(this).attr('name');
                $(this).attr('id', name + '-' + count);
                $(this).attr('name', name + '-' + count);
            }
        });
    });
}
/*End*/

/*Search text Registration*/
function RegisterSearchKey(selector, callback) {

    //setup before functions
    var typingTimer;                //timer identifier
    var doneTypingInterval = 1000;  //time in ms, 5 second for example
    var $input = $(selector);

    //on keyup, start the countdown
    $input.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    //on keydown, clear the countdown 
    $input.on('keydown', function () {
        clearTimeout(typingTimer);
    });

    //user is "finished typing," do something
    function doneTyping() {
        callback.call();
    }
}
/*End*/

function PopualateMultiselect(array,eleid,divid,TypeIdName)
{
    
    var ele = $('#' + divid).find('select[data-name=' + eleid + ']');
    var arrids = [];
    for (i = 0; i < array.length; i++) {
        var arrid = array[i][TypeIdName];
        arrids.push(arrid);
    }
    if (ele.length > 0) {
        ele.val(arrids);
    }
}

/*
only number              ------ onkeypress="return isNumberKeyByCondition(event,this,10)"
only number one spl char ------ onkeypress="return isNumberKeyByConditionWithOnespl(.)"
only Alphabets           ------ onkeypress="return onlyAlphabets(event,this);"
only Alphabets Number    ------ onkeypress="return onlyAlphaNumeric(event,this);"

onkeyup="return CheckandRemoveForFloat(event,this,2)"

var html=GetTemplate('ProjectMemberList');
                $(wrapper).append(html);

                var apphtml = $(wrapper).find('div.sysparent:last');
                FillSysOverallItemDrps('SingleAdd',apphtml);
*/



