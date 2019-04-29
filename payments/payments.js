
var myPayments = {
    markUp: function(main_container_data, payment_support){
        var output = `
            <div class=""> 
                <h1 class="headerTest">Payment Settings</h1>
                <div class="payments_main_container">
                    <div class="main_container">  `+main_container_data+`  </div>
                    <div class="payment_support_cont">  `+payment_support+` </div>  
                </div>             
            </div>
        `;
        return output
    },
    render: function(){
        // i. Get HTML Page
        var pageHTML = myPayments.markUp();
        // ii. get all containers
        var current_data = State.user.payments.current;
        var current_paymnts = myPayments.current_payments( current_data );
        var payment_support = myPayments.payment_support();
        // iii. render all containers
        const render_all = function(){
            // a. render main container
            $(".root").html( pageHTML);
            // b. render sub-containers
            $(".main_container").html( current_paymnts);
            $(".payment_support_cont").html( payment_support);
        }
        return render_all()
    },
    current_payments: function(data){
        var output = `
        <div class="currentPaymentSettings">
            <h1 class="payment_header"> Current Payment Settings </h1>
            <div class="lineStyler">
                <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
            </div>
            <div class="current-data"> 
                <div class="user_data_item">    <div class="currnt-user-key">First Name</div>     <div class="">`+data.firstName+`</div>                  </div>
                <div class="user_data_item">    <div class="currnt-user-key">Last Name</div>     <div class="">`+data.lastName+`</div>                    </div>
                <div class="user_data_item">    <div class="currnt-user-key">Phone Number</div>     <div class="">+263 - 0`+data.phoneNumber+`</div>              </div>
                <div class="user_data_item">    <div class="currnt-user-key">Payment Facility</div>     <div class="">`+data.paymentService+`</div>      </div>
            </div>
            <div class="btn_cont_paymnt">
                <div class="edit_pymnt_btn upload_button ripple" onclick="edit_payment_click()">Edit Payment Details</div>
            </div>
        </div>
        `;
        return output
    },
    edit_payments: function(){
        var output = `
        <div class="editPaymentSettings">
            <h1 class="payment_header"> Edit Payment Details </h1>
            <div class="lineStyler">
                <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
            </div>

            <div class="paymentData"> 
                <input class="upload_field first_name" placeholder="First Name" >
                <input class="upload_field last_name" placeholder="Last Name" >
                <input class="upload_field phone_number" placeholder="Cell Phone Number" >
                <input class="upload_field national_id" placeholder="National ID Number" >
                <select class="payment_facility">
                    <option value="">Select Payment Service</option>
                    <option value="Eco Cash">Eco Cash</option>
                    <option value="One Wallet">One Wallet</option>
                    <option value="Telecash">Telecash</option>
                </select>
            </div>
            
            <div class="btn_cont_paymnt">   
                <div class="save_pymnt_btn upload_button ripple" onclick="current_payment_click()">Save Details</div>
           </div>
        </div>
        `;
        return output
    },
    payment_support: function(){
        var output = `
            <div class="payment_support">
                <h1 class="payment_header">How to get Paid.</h1>
                <div class="lineStyler">
                    <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
                </div>

                <div class="payment_support_info"> 
                    <p class="support_para">
                    In order to receive payments for your music, you must have the completed the following
                    steps.
                    </p>
                    <ol class="support_ol">
                        <li>Registered & working account with either EcoCash/One Wallet/Telecash</li>
                        <li>Must provide a valid National ID number</li>
                        <li>Provide the cellphone number associated with the mobile payment service
                        you are registered with.
                        </li>
                    </ol>
                    <div class="mobile-wallet-providers">
                        <h3 class="providers-header">Accepted Mobile Wallet Providers</h3>
                        <div class="providers-logo">
                            <img class="logo-item-pr" src="/assets/icon/ecocash.png">
                            <img class="logo-item-pr" src="/assets/icon/telecash.png">
                            <img class="logo-item-pr" src="/assets/icon/onewallet.png">
                        </div>
                    </div>
                </div>
                
            </div> 
        `;
        return output
    },
    render_edit_or_current_paymnts: function(type_){
         switch(type_){
            // Edit Widget
            case "edit":
                var edit_paymnts = myPayments.edit_payments();
                return $(".main_container").html( edit_paymnts)

            // Current Widget
            case "current":
                var current_data = State.user.payments.current;
                var current_paymnts = myPayments.current_payments(current_data);
                return $(".main_container").html( current_paymnts)
         }
    }
}

window.edit_payment_click = function(){
    myPayments.render_edit_or_current_paymnts("edit")
}

window.current_payment_click = function(){
    // i. Get values from form
    var first_name = $(".first_name").val();                var last_name = $(".last_name").val();
    var phone_number = $(".phone_number").val();            var personal_id = $(".national_id").val();
    var payment_service = $(".payment_facility").val();

    // ii. Update State Object
    State.user.payments.current.firstName = first_name;
    State.user.payments.current.lastName = last_name;
    State.user.payments.current.paymentService = payment_service;
    State.user.payments.current.personalID = personal_id;
    State.user.payments.current.phoneNumber = phone_number

    // iii. render current data view
    myPayments.render_edit_or_current_paymnts("current");

    // v. Push activity to State
    State.addActivity("payment")
}

window.myPayments = myPayments;