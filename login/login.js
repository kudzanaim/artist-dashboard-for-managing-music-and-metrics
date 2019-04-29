
var Login = {
    sState: function(){
        var state_setter = function(){
            localStorage.setItem("a_state", 0);
            return localStorage.getItem("a_state")
        }

        // Get App init State
        var app_state = ( localStorage.getItem("a_state") ) ? parseInt(localStorage.getItem("a_state") ) : parseInt(state_setter());

        switch(  app_state  ){
            case 1:
                var u = JSON.parse( localStorage.getItem("u_ac") );
                var e = u.e;
                var p = u.p;

                return this.signIn(e,p)
            case 0:
                return this.loadLoginSignOut()
        }

    },
    loadHome: function(){
        
        // Load Navigation
        this.render_navigation();

        // Get Login Home Body
        var landing = this.landing_page();

        return $(".loginRoot").append(landing)
    },
    loadLoginSignOut: function(){

        // Define page markup
        var nav = `<div class="loginNav"><div class="navItems"></div></div>`;
        var root = `<div class="loginRoot"></div>`;
        var footer = `
            <div mobile_foot_er_>
                <div class="footerItem_login" onclick="hme()">© Strma, Inc.</div>
                <div class="footerItem_login about_btn" onclick="about()">About</div>
                <div class="footerItem_login" onclick="footerClick(this)">Terms of Service</div>
                <a class="footerItem_login" href="https://www.facebook.com" target="_blank"><img class="footer_icon" src="/assets/icon/facebook.png"></a>
                <a class="footerItem_login" href="https://www.instagram.com" target="_blank"><img class="footer_icon" src="/assets/icon/instagram.png"></a>
            </div>
        `;
        
        // Remove and add class
        $("body").removeClass("body-logged-in").addClass("body-login-main")
        $(".navigation").html(nav);
        $(".root").html(root);
        $(".footer").html(footer).addClass("artist_corner_foot");
        $(".loginNav").removeClass("terms_Header_mobile");

        // Correct header To Padding
        $(".logo_art").css("padding-top", "2%");

        // Landing main Container
        var landing = this.landing_page();
        $(".loginRoot").append(landing);

        // Main Navigation
        Login.render_navigation();

        // Change title and URL
        window.history.pushState(null, null, "/");
        $(document).prop('title', `Strma | Artist Corner Login`);
    },
    landing_page: function(){
        var mobile_body = this.mobileLoginBody();
        var output = `
                <div class="landing-body-login">
                    <div class="header-login">Strma artist corner.</div>
                        <div class="block-backing5">
                            <div class="descrptn-login">
                                Easy music upload, payment set-up and see how your music is perfoming through metrics.
                            </div>
                        <div class="border-header-login"></div>
                    </div>
                    <svg class="svgCircles3" height="100" width="100"><circle cx="50" cy="50" r="40" fill="red" class="circle3"></circle></svg>
                    <svg class="svgCircles7" height="100" width="100"><circle cx="50" cy="50" r="40" fill="red" class="circle7"></circle></svg>
                    <svg class="svgCircles8" height="100" width="100"><circle cx="50" cy="50" r="40" fill="red" class="circle8"></circle></svg>
                </div>

                <div class="left-pane-blocks">
                    <div class="block-backing4"></div>
                    <div class="block-backing3"></div>
                    <div class="block-backing2"></div>
                    <div class="block-backing"></div>
                    <div class="img-landing-cont"></div>
                    <svg class="svgCircles1" height="100" width="100"><circle class="circle1" cx="50" cy="50" r="40" fill="red"></circle></svg>
                    <svg class="svgCircles15" height="100" width="100"><circle class="circle15" cx="50" cy="50" r="20" fill="red"></circle></svg>
                    <svg class="svgCircles2" height="100" width="100"><circle cx="50" cy="50" r="40" fill="red" class="circle2"></circle></svg>
                    <svg class="svgCircles4" height="100" width="100"><circle cx="50" cy="50" r="40" fill="red" class="circle4"></circle></svg>
                    <svg class="svgCircles5" height="100" width="100"><circle cx="50" cy="50" r="40" fill="red" class="circle5"></circle></svg>
                    <svg class="svgCircles6" height="100" width="100"><circle cx="50" cy="50" r="40" fill="red" class="circle6"></circle></svg>
                </div>

                <div class="login-body-cont">
                    <div class="body_desc_contmb">`+mobile_body+`</div>
                    <div class="btn-login-cont-mobile">
                        <button class="sign_btn_mobile ripple" onclick="mobile_login()">Sign In</button>
                        <button class="reg_btn_mobile ripple" onclick="mobile_signup()">Register</button>
                    </div>
                    <div class="footer_mobile" >
                        <div class="footerItem_login" onclick="hme()">© Strma, Inc.</div>
                        <div class="footerItem_login about_btn" onclick="about()">About</div>
                        <div class="footerItem_login" onclick="footerClick(this)">Terms of Service</div>
                        <a class="footerItem_login" href="https://www.facebook.com" target="_blank"><img class="footer_icon" src="/assets/icon/facebook.png"></a>
                        <a class="footerItem_login" href="https://www.instagram.com" target="_blank"><img class="footer_icon" src="/assets/icon/instagram.png"></a>
                    </div>
                </div>
        `;
        return output
    },
    mobileLoginBody: function(){
        var output = `
            <div class="body_mobile_headr">
                Managing your music account has never been this simple.
            </div>
            <div class="body_mobile_desc">
                An Easy way to upload music, Track and measure your musics perfomance.
                Setup payment details to receive your royalty earnings.
            </div>
        `;
        return output
    },
    render_navigation: function(){
        // Nav Items
        var nav_items = [
            {item: "Strma", onclick: "home_login()", style: "logo-login-btn"},
            {item: "Log In", onclick: "login_button()", style: "nav_item_login loginIn-login-btn ripple"},
            {item: "Sign Up", onclick: "sign_button()", style: "nav_item_login signup-login-btn ripple"}
        ]

        // Map thru Nav Items
        nav_items.map(function(item, index){
            if(item.item != "Strma"){
                var markup = Login.login_nav_item(item.item, item.onclick, item.style );
                return $(".navItems").append(markup);
            }
            else if(item.item == "Strma"){
                var logoURL = `../../assets/logoartist.png`;
                var markup = Login.login_nav_item(item.item, item.onclick, item.style, logoURL );
                return $(".navItems").append(markup);
                
            }
        })
    },
    signIn: function(email, password){
        var signIn_ = function(){
            firebase_artists.auth().signInWithEmailAndPassword(email, password)
            .then(function(){

                // Save init_state
                localStorage.setItem("a_state",1);

                // get user database
                Login.getUserDB(email, password);
            })
            // a. load home page
            .then(function(){
                // Load Home to Body
                $(".App").html(`
                        <!-- Main Navigation -->
                        <div class="navigation mainNav"></div><!-- Root of  the App -->
                        
                        <!-- Mobile Navigation Container -->
                        <div class="mobile_navigation"></div>

                        <!-- App Root -->
                        <div class="root logged"></div>
                        
                        <!-- Main app Footer -->
                        <div class="footer artist_corner_foot">
                            <div class="footerItem_login footerItem_login_" onclick="hme()">© Strma, Inc.</div>
                            <div class="footerItem_login footerItem_login_" onclick="about()">About</div>
                            <div class="footerItem_login footerItem_login_" onclick="footerClick(this)">Terms of Service</div>
                            <a class="footerItem_login" href="https://www.facebook.com" target="_blank"><img class="footer_icon" src="/assets/icon/facebook.png"></a>
                            <a class="footerItem_login" href="https://www.instagram.com" target="_blank"><img class="footer_icon" src="/assets/icon/instagram.png"></a>
                        </div>
                `)
                .addClass("body-logged-in");
                // Render navigation
                renderNavigation.renderNav();
                // Render Home
                Home.render();
                // ii. Change Page Title
                $(document).prop('title', `Strma Artist Corner| Home`);
                window.history.pushState(null, null, "/");
            })
            .catch(function(error) {
                return console.log( error.message ), alert( error.message )
            });
        }
        return signIn_()
    },
    getUserData: function(data){
        var setdata = function(){
            // set User Data to State
            State.user = data;
            // get image
            Login.getUserProfile()
            // set signIn state
            State.user.userSignedIn = true;
            //  Set activities to State
            State.getActivities();
            // instantiate listener on data changes
            State.setListener();
        }
        return setdata()
    },
    getUserDB: function(e, p){
        firebase_artists.database().ref().orderByChild("accountDetails/email").startAt(e).endAt(e+"\uf8ff").once("child_added").then(function(snapshot){
            if(p == snapshot.val().accountDetails.password){
                
                // get userkey and set to State Object
                State.userKey = snapshot.key;

                // Save uState
                localStorage.setItem("u_ac", JSON.stringify({e:e, p:p}))
                
                // set data to State
                return Login.getUserData(  snapshot.val() )
            }
        })
    },
    login_nav_item: function(item, onclick, style, logo_url){
        switch (item) {
            case "Strma":
                var markup = `
                    <div class="`+style+`" onclick="`+onclick+`">
                        <img class="logo_art" src="../../assets/logoartist.png">
                    </div>
                `;
                return markup
            default:
                var markupp = `<div class="`+style+`" onclick="`+onclick+`">`+item+`</div>`;
                return markupp
        }
    },
    renderLoginForm: function(){

        // clear Page
        Login.loadLoginSignOut();
        window.history.pushState(null, null, "/");


        // Get markup
        var loginform = this.login_form_markup();

        // Delete anyn sign_up widget || header
        $(".login_form_cont").remove();
        $(".signup_form_cont").remove();
        $(".header-login").css("display","none");
        
        // Append to DOM
        return $(".landing-body-login").prepend(loginform);

    },
    login_form_markup: function(type){
        var type_ = (type == undefined || type == "") ? "desktop" : type ;
        var output = `
        <div class="login_form_cont">
            <div class="loginformheader">Sign In</div>
            <div class="loginformfields">
                <input class="username_loginfrm loginfrm" placeholder="Username">
                <input class="passwrd_loginfrm loginfrm"  type="password" placeholder="Password">
            </div>
            <div class="btn_container_loginform">
                <div class="login_btn_login ripple" onclick="login_btn_signin()">Login</div>
                <div class="registernow_btn_login ripple ripple" onclick="sign_button()">Register Now</div>
            </div>
        </div>
        `;
        var mobile = `
        <div class="login_form_cont">
            <div class="pg_cls_cnt"><img onclick="cls_page()" class="pg_cls_icn_" src="./../../assets/icon/page_cls_.png"></div>
            <div class="loginformheader">Sign In</div>
            <div class="loginformdesc">Log-in to access your dashboard</div>
            <div class="loginformfields">
                <input class="username_loginfrm loginfrm" placeholder="Username">
                <input class="passwrd_loginfrm loginfrm"  type="password" placeholder="Password">
            </div>
            <div class="btn_container_loginform">
                <button class="login_btn_login ripple" onclick="login_btn_signin()">Login</button>
                <button class="registernow_btn_login ripple ripple" onclick="mobile_signup()">Register Now</button>
            </div>
        </div>
        `;

        switch (type_) {
            case "desktop":
                return output
            case "mobile":
                return mobile
        }
        return output
    },
    get_form_data: function(type){
        
        // Validate Form Data if not Empty
        var validation_state = this.validate(type);
    
        // If Data valid
        if( validation_state == true){
            // Form 1 Data
            var firstname = $(".first_sgnup").val();                    var lastname = $(".lastnme_sgnup").val();
            var artistname = $(".artistname_sgnup").val();              var city = $(".city_signup").val();
            var country = $(".country_origin").val();                   var DoB = $(".date_sgnup").val();
            var street_address = $(".streetAddress_signup").val();      var cellphone = $(".cellphone_sgnup").val();
    
            // Form 2 Data
            var email = $(".email_sgnup").val();           var username = $(".username_sgnup").val();
            var password = $(".password_sgnup").val();
    
            // Conditional get data on relevant FORM
            switch (type){
                case "form1":
                    // Create Sign UP data buffer
                    State.signupData = [];
                    // Organise into object
                    var data = {  firstname, lastname, artistname, address:{city, street_address, country}, DoB: new Date(DoB).getTime(), cellphone}
                    // Puh to tree for later use
                    State.signupData.push( data );

                    return Login.next_sgnup()
                    
                case "form2":
                    // Get data and push State Sign Up Array
                    var data2 = { email, username, password };
                    State.signupData.push( data2 );

                    // Merge Sign Up data into one object and attach to State
                    var i =  State.signupData.slice(0,1); var j =  State.signupData.slice(1,1);
                    State.signupData = Object.assign({}, i, j);

                    return State.signupData
            }
        }
        else if(validation_state == false){
            return alert("Form not completed, ensure all fields are field!")
        }
        else if(validation_state == "password error"){
            return alert( "Passwords do not match!!!");
        }
        else{
            return alert( "Unkown Error Occured, please refresh page to proceed!")
        }
    },
    validate: function(type){
        switch (type) {
            case "form1":
                // Validate Form 1
                var validate1 = function(){
                    var firstname = $(".first_sgnup").val();                    var lastname = $(".lastnme_sgnup").val();
                    var artistname = $(".artistname_sgnup").val();              var city = $(".city_signup").val();
                    var country = $(".country_origin").val();                   var DoB = $(".date_sgnup").val();
                    var street_address = $(".streetAddress_signup").val();      var cellphone = $(".cellphone_sgnup").val();

                    if(firstname == "" || artistname == "" || lastname == "" || city == "" || country == ""|| DoB == "" || street_address == ""|| cellphone== ""){
                        return false
                    } else{ return true}
                }
                return validate1()
            case "form2":
                // Validate Form 2
                var validate2 = function(){
                    var email = $(".email_sgnup").val();            var username = $(".username_sgnup").val();
                    var password = $(".password_sgnup").val();      var pass_confirm = $(".confirm_passwrd_sgnup").val();

                    if( email == "" || username == "" || password == "" ){
                        return false
                    }
                    else if( email != "" && username != "" && password != "" && pass_confirm != password ){
                        return "password error"
                    }
                    else{ return true}
                }
                return validate2()
        }
    },
    getUserProfile: function(){
        return firebase_artists.storage().ref().child(`profileImages/`+State.user.profileImageUrl+``).getDownloadURL().then(function(url) {
            State.profilePic = url;
        })
    },
    render_signup: function(){

        // Clear Page
        Login.loadLoginSignOut();
        window.history.pushState(null, null, "/");

        // Get markup
        var markup = this.signup_markup("personal");

        // Delete anyn sign_in widget || header
        $(".login_form_cont").remove();
        $(".signup_form_cont").remove();
        $(".header-login").css("display","none");

        // Append to DOM
        return $(".landing-body-login").prepend(markup);

    },
    next_sgnup: function(){

        // Get markup
        var markup = this.signup_markup("account");

        // remove personal fields
        $(".signup_form_fields_cont").remove();
        $(markup).insertAfter(".loginformdesc");

        // Change next button
        var finish_button = `<button class="sign_btn_login ripple" onclick="finish_signup()">Finish</button>`;
        
        return $(".btn_container_signinform").html(finish_button);

    },
    signup_markup: function(type){
        var country_list = this.country_list();
        var personal = `
            <div class="signup_form_cont">
                <div class="pg_cls_cnt"><img onclick="cls_page()" class="pg_cls_icn_" src="./../../assets/icon/page_cls_.png"></div>
                <div class="loginformheader">Register Account</div> 
                <div class="loginformdesc">Log-in to access your dashboard</div>
                <div class="signup_form_fields_cont">
                    <input class="loginfrm first_sgnup" placeholder="First Name" required>
                    <input class="loginfrm lastnme_sgnup" placeholder="Last Name" required>
                    <input class="loginfrm artistname_sgnup" placeholder="Perfomance Name" required>
                    <input type="date" class="loginfrm date_sgnup" placeholder="Date of Birth" required>
                    <input class="loginfrm cellphone_sgnup" placeholder="Cell Phone e.g. (77-843-3245)" required>
                    <div class="city_country">
                        `+country_list+`
                        <input class="loginfrm city_signup" placeholder="City/Town" required>
                    </div>
                    <input class="loginfrm streetAddress_signup" placeholder="Street Address" required>
                    <div class="btn_container_signinform lgn_btn_">
                        <button class="sign_btn_login ripple" onclick="next_signup()">Next</button>
                    </div> 
                </div>  
                <div class="btn_container_signinform mbl_btn">
                    <button class="sign_btn_login ripple" onclick="next_signup()">Next</button>
                </div> 
                    
            </div>
                    `;
        var account = `
            <div class="acount_setup_sgnup">
                <input class="loginfrm username_sgnup" placeholder="Username" required>
                <input class="loginfrm email_sgnup" placeholder="Email" required>
                <input type="password" class="loginfrm password_sgnup" placeholder="Password" required>
                <input type="password" class="loginfrm confirm_passwrd_sgnup" placeholder="Type Password Again" required>
            </div>
        `;

        // Switch
        switch (type) {
            case "personal":
                return personal
            case "account":
                return account
        }
    },
    country_list: function(class_){
        var _class_ = (class_ == undefined)? "": class_;
        
        var output = `
            <select type="country" class="country_origin loginfrm `+_class_+`">
                <option value="">Select Country</option>
                <option value="Algeria">Algeria</option>
                <option value="Angola">Angola</option>
                <option value="Benin">Benin</option>
                <option value="Botswana">Botswana</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Congo">Congo</option>
                <option value="DRC">Democratic Republic of Congo</option>
                <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Ghana">Ghana</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea Bissau">Guinea-Bissau</option>
                <option value="Kenya">Kenya</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libya">Libya</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Mali">Mali</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Namibia">Namibia</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Senegal">Senegal</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra">Sierra Leone</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="Sudan">Sudan</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Tanzania">Tanzania, United Republic of</option>
                <option value="Togo">Togo</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Uganda">Uganda</option>    
                <option value="Western Sahara">Western Sahara</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
            </select>
        `;
        return output
    },
    registerUser: function(){
        // Validate and Get form Data
        var validate_ = this.get_form_data("form2");

        // Make request to register
        if( validate_ != undefined && typeof(validate_) == "object"){
            var url = `https://us-central1-strmaartists.cloudfunctions.net/registerUser`;
            var userdata_ = validate_;

            // Ajax request to endpoint
            $.post(url, userdata_, function(data, status){

                // Break Down response object
                var email = data.email;
                var password = data.password;

                // Login User
                if( email == validate_.email && password == validate_.password){
                    return Login.signIn(email, password)
                }
                else{
                    return alert("Error occured whilst signing in!")
                }
            })
        }
        else{
            alert("Error Registering your account, please refresh Page!!")
        }
    },
    mobileSignUpPage: function(type){
        var signUpForm = this.signup_markup(type);
        var body = `
            <div class="mobile_signup_cont">`+signUpForm+`</div>
        `;
        return body
    },
    renderMobileSignUp: function(){
        // Get Sign Up html
        var markup = this.mobileSignUpPage("personal");

        // Clear page of BS
        $(".body_desc_contmb").html("");
        $(".btn-login-cont-mobile").html("");

        // Append sign up form Page
        return $(".body_desc_contmb").html(markup)
    },
    renderMobileLogin: function(){
        // Get Sign Up html
        var markup = this.login_form_markup("mobile");

        // Clear page of BS
        $(".body_desc_contmb").html("");
        $(".btn-login-cont-mobile").html("");

        // Append sign up form Page
        return $(".body_desc_contmb").html(markup)
    },
    clspage:function(){
        return Router.Router("Artist Corner"), $(".loginRoot").addClass("body-login-main")
    }
}

var cls_page = function(){
    return Login.clspage()
}

// login button navigation menu
window.login_button = function(){
    return Login.renderLoginForm()
}
// login button sig in form
window.login_btn_signin = function(){
    var username = $(".username_loginfrm").val();
    var password = $(".passwrd_loginfrm").val();

    // Validate, if empty alert User
    if( username == "" || password == "") {
        return alert("Please ensure all fields are filled properly.")
    }
    else{
        // return Login.signIn( username, password )
        return Login.signIn("kudzmurefu@gmail.com", "pass12345")
    }
}
// Sign Up Button
window.sign_button = function(){
    return Login.render_signup()
}
// MObile Sign Up
window.mobile_signup = function(){
    return Router.Router("Artist Register")
}
// MObile Login
window.mobile_login = function(){
    return Router.Router("Artist Sign-In")
}
// Next button sign up
window.next_signup = function(){
    return Login.get_form_data("form1")
}
// Finish Button
window.finish_signup = function(){
    var password = $(".password_sgnup").val();
    
    if( password.length < 6){
        return alert("Password must be atleast 6 characters.")
    }
    else if(password.length >= 6){
        return Login.registerUser()
    }
}
window.home_login = function(){
    return RouterObject.Router("Landing")
}


window.Login = Login;