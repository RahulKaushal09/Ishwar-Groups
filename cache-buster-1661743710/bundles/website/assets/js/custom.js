$(document).ready(function(){
    $(function() {
        $("input,textarea").focus(function(){
            let elmId=$(this).attr('id');
            let errorSpanId="error_"+elmId;
            //$("#"+errorSpanId).hide();
            $("#"+errorSpanId).addClass('d-none');
        });
    })
    
    $("#bookMeetingForm,#bookMeetingForm_Footer").on('submit',function(event){
        event.preventDefault(); //prevent default action 
        let form=$(this);
        var formId=$(this).attr('id');
        $(this).find("button[type='submit']").attr("disabled",true);
        let errors=[];
        
        let meetingAgenda=$('#'+formId+" textarea[name=meetingAgenda]").val();
        let firstName=$('#'+formId+" input[name=firstName]").val();
        let email=$('#'+formId+" input[name=email]").val();
        if(meetingAgenda.trim()===""){
            
            errors['meetingAgenda']="*Required";
        }
        if(firstName.trim()===""){
            errors['firstName']="*Required";
        }
        if(email.trim()===""){
            errors['email']="*Required";
        }else if(!validateEmail(email) ){
            errors['email']="*Not Valid";
        }
        
        if(Object.keys(errors).length>0){
            for(let i  in errors){
                form.find("#error_"+i).text(errors[i]);
                form.find("#error_"+i).removeClass('d-none');
            }
            $(this).find("button[type='submit']").removeAttr("disabled");
            return false;
        }
        var post_url = $(this).attr("action"); //get form action url
        var request_method = $(this).attr("method"); //get form GET/POST method
        var form_data = $(this).serialize(); //Encode form elements for submission
        var formId=$(this).attr('id');
        $.ajax({
            url : post_url,
            type: 'post',
            data : form_data,
            dataType : "json",
        }).done(function(response){ //
            let status=response.status;
            if(status=="failed"){
                let errorData=response.errorData;
                $.each(errorData, function( index, value ) {
                    form.find("#error_"+index).text(value);
                    form.find("#error_"+index).removeClass('d-none');
                    
                });
                $("#bookMeetingForm").find("button[type='submit']").removeAttr("disabled");
            }else if(status=="success"){
                if(formId=="bookMeetingForm_Footer"){
                    $("#bookMeetingForm_Footer")[0].reset();
                    $("#bookMeetingForm_Footer_msg").removeClass('d-none');
                    $("#bookMeetingForm_Footer").find("button[type='submit']").removeAttr("disabled");
                }else{
                    $("#"+formId+"_form").hide();
                    $("#"+formId+"_msg").show();
                    $("#bookMeetingForm")[0].reset();
                    $("#bookMeetingForm").find("button[type='submit']").removeAttr("disabled");
                }
                    //alert("Thank you we will contact you soon.");
            }
        });
        return false;
    });
    $("#careerWithUsForm").on('submit',function(event){
        event.preventDefault(); //prevent default action 
        let form=$(this);
        $(this).find("button[type='submit']").attr("disabled",true);
        let errors=[];
        
        let cfirstName=form.find('#cfirstName').val();
        let lastName=form.find('#lastName').val();
        let emailAddress=form.find('#emailAddress').val();
        let telphoneMobile=form.find('#telphoneMobile').val();
        let highestQualification=form.find('#highestQualification').val();
        let postAppliedFor=form.find('#postAppliedFor').val();
        let upload = form.find('#carrerUpload').val();
        let linkedInUrl = form.find('#linkedInUrl').val();

        var careerfd = new FormData();
        var filesCareer = $('#carrerUpload')[0].files;

        if(cfirstName.trim()===""){
            errors['cfirstName']="*Required";
        }
        /*if(lastName.trim()===""){
            errors['lastName']="*Required";
        }*/
        if(emailAddress.trim()===""){
            errors['emailAddress']="*Required";
        }else if(!validateEmail(emailAddress) ){
            errors['emailAddress']="*Opps, you need fill valid email.";
        }
        if(telphoneMobile.trim()===""){
            errors['telphoneMobile']="*Required";
        }

        /*if(highestQualification.trim()===""){
            errors['highestQualification']="*Required";
        }*/
        if(postAppliedFor.trim()===""){
            errors['postAppliedFor']="*Required";
        }
        
        if(filesCareer.length > 0 ){
            careerfd.append('carrerUpload',filesCareer[0]);
        }else{
            errors['carrerUpload']="*Required";            
        }

        if(Object.keys(errors).length>0){
            for(let i  in errors){
                $("#error_"+i).text(errors[i]);
                $("#error_"+i).removeClass('d-none');
            }
            $("#careerWithUsForm").find("button[type='submit']").removeAttr("disabled");
            return false;
        }

        careerfd.append('cfirstName',cfirstName);
        careerfd.append('lastName',lastName);
        careerfd.append('emailAddress',emailAddress);
        careerfd.append('telphoneMobile',telphoneMobile);
        careerfd.append('highestQualification',highestQualification);
        careerfd.append('postAppliedFor',postAppliedFor);
        careerfd.append('linkedInUrl',linkedInUrl);
        
        
        var post_url = $(this).attr("action"); //get form action url
        var request_method = $(this).attr("method"); //get form GET/POST method
        var form_data = $(this).serialize(); //Encode form elements for submission
        var formId=$(this).attr('id');
        $.ajax({
            url : post_url,
            type: 'post',
            data : careerfd,
            dataType : "json",
            contentType: false,
            processData: false,
        }).done(function(response){ //
            let status=response.status;
            if(status=="failed"){
                let errorData=response.errorData;
                $.each(errorData, function( index, value ) {
                    $("#error_"+index).text(value);
                    //$("#error_"+index).show();
                    $("#error_"+index).removeClass('d-none');
                });
                $("#careerWithUsForm").find("button[type='submit']").removeAttr("disabled");
            }else if(status=="success"){
                $("#"+formId+"_form").hide();
                $("#"+formId+"_msg").show();
                $("#careerWithUsForm")[0].reset();
                $("#careerWithUsForm").find("button[type='submit']").removeAttr("disabled");
                //alert("Thank you we will contact you soon.");
            }
        });
        return false;
    });
    
    $("#becomeSupplierForm").on('submit',function(event){
        event.preventDefault(); //prevent default action 
        let form=$(this);
        $(this).find("button[type='submit']").attr("disabled",true);
        let errors=[];
        
        let supplierCompanyName=form.find('#supplierCompanyName').val();
        let supplierBuildingNumber=form.find('#supplierBuildingNumber').val();
        let supplierCpCode=form.find('#supplierCpCode').val();
        let supplierDistrictName=form.find('#supplierDistrictName').val();
        let supplierState=form.find('#supplierState').val();
        let supplierFirstName=form.find('#supplierFirstName').val();
        let supplierLastName=form.find('#supplierLastName').val();
        let suppllierJobTitle=form.find('#suppllierJobTitle').val();
        let supplierEmailAddress=form.find('#supplierEmailAddress').val();
        let supplierTelephoneMobile=form.find('#supplierTelephoneMobile').val();
        let supplierAddress = form.find('#supplierAddress').val();
        let supplierCompanyWebsite=form.find('#supplierCompanyWebsite').val();
        
        var fd = new FormData();
        var files = $('#supplierUpload')[0].files;
        
        if(supplierCompanyName.trim()===""){
            errors['supplierCompanyName']="*Required";
        }
        /*if(supplierBuildingNumber.trim()==""){
            errors['supplierBuildingNumber']="*Required";
        }*/
        /*if(supplierCpCode.trim()===""){
            errors['supplierCpCode']="*Required";
        }*/
        
        /*if(supplierDistrictName.trim()===""){
            errors['supplierDistrictName']="*Required";
        }*/
        /*if(supplierState.trim()===""){
            errors['supplierState']="*Required";
        }*/
        if(supplierFirstName.trim()===""){
            errors['supplierFirstName']="*Required";
        }
        /*if(supplierLastName.trim()===""){
            errors['supplierLastName']="*Required";
        }*/
        if(suppllierJobTitle.trim()===""){
            errors['suppllierJobTitle']="*Required";
        }
        if(supplierEmailAddress.trim()===""){
            errors['supplierEmailAddress']="*Required";
        }else if(!validateEmail(supplierEmailAddress) ){
            errors['supplierEmailAddress']="*Opps, you need fill valid email.";
        }
        if(supplierTelephoneMobile.trim()===""){
            errors['supplierTelephoneMobile']="*Required";
        }

        if(supplierAddress.trim()===""){
            errors['supplierAddress']="*Required";
        }

        // if(supplierCompanyWebsite.trim()==="" && !is_url(supplierCompanyWebsite.trim()) ){
        //     errors['supplierCompanyWebsite']="*invalid url.";
        // }
        

        if(files.length > 0 ){
            fd.append('supplierResume',files[0]);
        }else{
            errors['supplierUpload']="*Required";            
        }
        
        if(Object.keys(errors).length>0){
            for(let i  in errors){
                $("#error_"+i).text(errors[i]);
                $("#error_"+i).removeClass('d-none');
            }
            $("#becomeSupplierForm").find("button[type='submit']").removeAttr("disabled");
            return false;
        }
        var post_url = $(this).attr("action"); //get form action url
        var request_method = $(this).attr("method"); //get form GET/POST method
        var form_data = $(this).serialize(); //Encode form elements for submission
        var formId=$(this).attr('id');


        fd.append('supplierCompanyName',supplierCompanyName);
        fd.append('supplierBuildingNumber',supplierBuildingNumber);
        fd.append('supplierCpCode',supplierCpCode);
        fd.append('supplierDistrictName',supplierDistrictName);
        fd.append('supplierState',supplierState);
        fd.append('supplierFirstName',supplierFirstName);
        fd.append('supplierLastName',supplierLastName);
        fd.append('suppllierJobTitle',suppllierJobTitle);
        fd.append('supplierEmailAddress',supplierEmailAddress);
        fd.append('supplierTelephoneMobile',supplierTelephoneMobile);
        fd.append('supplierAddress',supplierAddress);
        fd.append('supplierCompanyWebsite',supplierCompanyWebsite);



        $.ajax({
            url : post_url,
            type: 'post',
            data : fd,
            contentType: false,
            processData: false,
            dataType : "json",
        }).done(function(response){ //
            let status=response.status;
            if(status=="failed"){
                let errorData=response.errorData;
                $.each(errorData, function( index, value ) {
                    $("#error_"+index).text(value);
                    //$("#error_"+index).show();
                    $("#error_"+index).removeClass('d-none');
                });
                $("#becomeSupplierForm").find("button[type='submit']").removeAttr("disabled");
            }else if(status=="success"){
                $("#"+formId+"_form").hide();
                $("#"+formId+"_msg").show();
                $("#becomeSupplierForm")[0].reset();
                $("#becomeSupplierForm").find("button[type='submit']").removeAttr("disabled");
                //alert("Thank you we will contact you soon.");
            }
        });
        return false;
    });
    
    $(function() {
        $('a.ourWorkPopup[data-toggle="modal"]').on("click",function(eventSource){
            var url=$(this).attr('data-url');
            var targetModal=$(this).attr('data-target');
            $(targetModal).remove();
            if(url!=undefined){
                $.ajax({
                    url :url,
                    type: 'GET',
                }).done(function(response){ //
                     $('body').append(response);
                     $(targetModal).modal();
                });
            }
        })
    });
    
    //reset form data on close
    $(".modal").on('hidden.bs.modal', function () {
        let form=$(this).find('form');
        if(form.length>0){
            form[0].reset();
            form.find(".error-msg").addClass('d-none');
            let formName=form.attr('name');
            $("#"+formName+"_msg").hide();
            $("#"+formName+"_form").show();
        }
    });
    
    $(function() {
        $("#bookMeetingForm_Footer :input").focus(function(){
            let elmId=$(this).attr('id');
            let errorSpanId="error_"+elmId;
            $("#bookMeetingForm_Footer").find("#"+errorSpanId).addClass('d-none');
        });
    })
    
})
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function is_url(str){
    regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)){
      return true;
    }else{
      return false;
    }
}

function setActiveLink(){
    let currentUrl=window.location.href;
    
    let allLinks=$(".nav-link");
    allLinks.each(function(index){
        let href=$(this).attr('href');
        if(currentUrl.indexOf(href) !== -1){
            $(this).addClass('active');
            return;
        }
    })
}
setActiveLink();
