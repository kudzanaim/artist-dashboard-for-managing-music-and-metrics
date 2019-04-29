var Register = {
    render: function(){
        var markup = this.markup();

        // Add Body Class
        $(".App").addClass("body_main_");

        // Set form listerner
        window.form_listener = this.form_listener()

        // Render to DOM
        $(".root").html(markup)

        // Add class to selectCountry list to change styles and change NAV
        $(".country_origin_").addClass("reguserfrm");
        $(".navmain").addClass("navFAQ");
        
        // Add custom logo and remove regular ===> fix in router
        $(".navmain").append(`
            <div class="navmainReg"><div class="logoMainReg"><img class="logomain_item" src="/assets/icon/strma_logo.png" onclick="nav_logo_click()"></div></div>
        `)
        $(".logoMain").addClass("logoMain_disable")

        // Add Overlay_background to root
        return $(".root").addClass("regBackground") 
    },
    markup: function(){
        var country_list = Login.country_list();
        var output = `

        <div class="explain_page">Sign up below to start listening.</div>
        <div class="registeruser_cont">
            <h1 class="reg_user_hdr_land">Register your Account</h1>
            <div class="reguser_form_cornt_land">
                <input class="reguserfrm first_sgnup" placeholder="First Name" required>
                <input class="reguserfrm lastnme_sgnup" placeholder="Last Name" required>
                <select class="loginWith_type">
                    <option value="">Login with Email or Phone</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                </select>

                <input type="email" class="reguserfrm email_userreg_landing" placeholder="Email" required>
                <input type="tel" class="reguserfrm phone_userreg_landing" placeholder="Phone" required>

                <input type="date" class="reguserfrm date_sgnup" placeholder="Birthday" required>
                <input class="reguserfrm cellphone_sgnup" placeholder="Cell Phone e.g. (77-843-3245)" required>
                <div class="reguser_city_country">
                    `+country_list+`
                    <input class="reguserfrm city_signup" placeholder="City/Town" required>
                </div>
                <input class="reguserfrm streetAddress_signup" placeholder="Street Address" required>
                </div>
            <div class="btn_container_reguser">
                <button class="sign_btn_reguser_login ripple" onclick="nxt()">Next</button>
            </div> 
        </div>

       
        <div class="explain_widget">
            <h1 class="explains_hdr p2_reg_hdr">Start enjoying your favourite </br> songs today, the right way</h1>
            <h1 class="explains_hdr">Start enjoying your favourite songs today, the right way</h1>
            <div class="explains_userreg_">
                <ul class="explains_ul">
                    <li>Listen to millions of songs from various Zimbabwean genres.</li>
                    <li>Unlimited song downloads right to your Phone.</li>
                    <li>Browse and discover new music & artists</li>
                    <li>Create great custom playlists, and share with your friends.</li>
                </ul>
            </div>
        </div>
        `;
        return output
    },
    form_listener: function(){
        return setInterval(function(){
            // IF user selects EMAIL
            if( $(".loginWith_type").val() == "Email"){
                return $(".email_userreg_landing").css("display","block"), $(".phone_userreg_landing").css("display","none"),
                $(".loginWith_type").remove()
            }
            //  IF user selects PHONE
            if( $(".loginWith_type").val() == "Phone"){
                return $(".phone_userreg_landing").css("display","block"), $(".email_userreg_landing").css("display","none"),
                $(".loginWith_type").remove()

            }
        },100)
    },
    userreg: function(lgn_type){

        //  Determine login type
        var login_type = ( $(".registeruser_cont").find(".email_userreg_landing").css("display") == "block"  ) ? "Email": "Phone";
        // Get For Data
        var user_data = {
            usr: $(".first_sgnup").val(),
            paswrd: $(".lastnme_sgnup").val(),
            lgn_typ: login_type,
            lgn: $(".email_userreg_landing").val() || $(".phone_userreg_landing").val(),
            dob: $(".date_sgnup").val(),
            cll: $(".cellphone_sgnup").val(),
            adrs: {
                ntn: $(".country_origin_").val(),
                cty: $(".city_signup").val(),
                stAd: $(".streetAddress_signup").val(),
            },
        }
        return console.clear(), console.log(user_data), alert("Sign-Up Successful. Now just Download the Strma App & begin listening!")
    }
}
// CHange this and add storage listener instead, for security
window.nxt = function(){
    // Validation no Empty Fields
    if( $(".first_sgnup").val() != "" && $(".lastnme_sgnup").val() != "" && $(".date_sgnup").val() != "" && $(".cellphone_sgnup").val() != "" && $(".country_origin_").val() != "" && $(".city_signup").val() != "" &&  $(".streetAddress_signup").val() != ""){ 
        // if either email || phone is selected as logn type
        if(  $(".email_userreg_landing").val() != "" || $(".phone_userreg_landing").val() != ""  ){
            return Register.userreg()
        }
    }
    else{
        return alert("Missing Information! Please ensure all fields have been filled.")
    }

}
window.Register = Register;