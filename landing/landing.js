var Landing = {
    render: function(){
        var nav = this.nav();
        var body = this.body();

        // Add Body Class
        $(".App").addClass("body_main_");

        return $(".navigation").html(nav), $(".root").html(body)
    },
    nav: function(){
        var output = `
        <nav class="navmain">
            <article class="logoMain">
                <img class="logomain_item" src="/assets/icon/strma_logo.png" onclick="nav_logo_click()">
            </article>
            <span class="cont_nav_item_lndg_" >
                <article class="navitem_main" onclick="landing_navClick(this)">FAQs</article>
                <article class="navitem_main" onclick="landing_navClick(this)">Our Story</article>
                <article class="navitem_main artcor_btn_landng" onclick="landing_navClick(this)">Artist Corner</article>
                <article class="navitem_main user_reg_btn_lndg_" onclick="landing_navClick(this)">Register Account</article>
            </span>
        </nav>
        `;
        return output
    }, 
    body: function(){
        var output = `
            <div class="body_main_container_">
                
                <div class="body_main"><i>Millions of songs for <br/>every <span class="taste_">taste.</span></i></div>

                <p class="homeDesc_">Discover your favourite artist and keep up with the the latest releases.</p>
                
                <article class="logoMain_mobile">
                    <img class="logomain_item_mobile" src="/assets/icon/strma_logo.png" onclick="nav_logo_click()">
                </article>
                
                <a class="homme_btn_cont"><button class="download_app_btn ripple" onclick="downloadApp()">Download App</button></a>
                <a class="homme_btn_cont" href="./../../open.player.html"><button class="web_app_btn ripple">Listen on Web Player</button></a>
            
            </div>
        `;

        var mobile = `
            <div class="body_main_container_">
                
                <svg onclick="menu()"  class="menu_svg" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 459 459" style="enable-background:new 0 0 459 459;" xml:space="preserve"><g><g><g id="menu">
                        <path d="M0,382.5h459v-51H0V382.5z M0,255h459v-51H0V255z M0,76.5v51h459v-51H0z" data-original="#000000" class="active-path" fill="#000000"/>
                </g></g></g></svg>
                <article class="logoMain_mobile">
                    <img class="logomain_item_mobile" src="/assets/icon/strma_logo.png" onclick="nav_logo_click()">
                </article>

                <p class="homeDesc_">
                    <i>Music for<br/>everyone.</i>
                </p>
                <p class="homeDesc_small">
                    Discover your favourite artists & keep up with<br/>the latest releases.
                </p>
                
                <div class="btn_lndg_cont">
                    <a class="homme_btn_cont">
                        <button class="download_app_btn ripple" onclick="downloadApp()">Download App</button>
                    </a>
                    <a class="homme_btn_cont" href="./../../open.player.html">
                        <button class="web_app_btn ripple">Listen Online</button>
                    </a>
                </div>
                <div class="reg_here_mobile">Dont have an account? <a onclick="crt_usr()" class="reg_here_link">Register here.</a></div>
                
            </div>
        `;
        
        output = ( $(document)[0].body.clientWidth < 600)? mobile : output;

        return output
    },
    reset: function(){
        var output = `
            <!-- Navigation -->
            <div class="main_navigation"></div>

            <!-- Root -->
            <div class="root"></div>

            <!-- footer -->
            <div class="footer">
                <div class="footerItem_login">© Strma, Inc.</div>
                <div class="footerItem_login about_btn" onclick="about()">About</div>
                <div class="footerItem_login terms_btn_foot" onclick="footerClick(this)">Terms of Service</div>
                <a class="footerItem_login" href="https://www.facebook.com" target="_blank"><img class="footer_icon1" src="/assets/icon/facebook.png"></a>
                <a class="footerItem_login" href="https://www.instagram.com" target="_blank"><img class="footer_icon1" src="/assets/icon/instagram.png"></a>
            </div>
        `;

        // Append Default Template to DOM
        return $("body").html(output)
    },
    webPlayer:function(){
        // Load Web app

        return alert("Web App")
    },
    artistCorner: function(){
        return alert("Artist Corner")
    },
    menu:function(){
        var output = `
            <div class="menu_main">
                <div class="menu_gutter">
                    <div class="menu_badge"><img src="./../../assets/icon/strma_logo.png" class="badge_logo"></div>
                    <div class="menu_close" onclick="cls_menu()"><img src="./../../assets/icon/close_menu.png" class="close_icon_"></div>
                </div>
                <div class="mm_itm_cont">
                    <div class="mm_item_ mm_item_active" ><a class="mm_itm_a" href="./../../open.player.html">Open Web Player</a></div>
                    <div class="mm_item_" data-name="Artist Corner" onclick="menu_click(this)">Artist Corner</div>
                    <div class="mm_item_" data-name="Our Story" onclick="menu_click(this)">About</div>
                    <div class="mm_item_" data-name="Terms" onclick="menu_click(this)">Terms & Services</div>
                </div>
                <div class="menu_btns_">
                    <div class="dl_app_menu" onclick="downloadApp()" >Download Android App</div>
                    <div class="reg_user_menu" onclick="crt_usr()" >Create an Account</div>
                </div>
            </div>
        `;
        // render menu
        $(".root").prepend(output)
        $(".menu_main").css("height","100%")
    },
    cls_menu:function(){
        return  $(".menu_main").height("0%"), setTimeout(() => {
            $(".menu_main").remove()
        }, 750);
    },
    menu_itm_click:function(e){
        
        // Close Button
        var cls_btn = '<div data-name="Our Story" class="pg_cls_cnt" style="transform: scale(0.9); top: 12px;right: 10px;"><img onclick="cls_pg()" class="pg_cls_icn_" src="./../../assets/icon/page_cls_.png"></div>';
        
        // Remove active class from all and re-add
        $(".mm_item_").removeClass("mm_item_active")
        $(e).addClass("mm_item_active")
        $(".loginRoot").removeClass("body-login-main")
        
        // Get Page name
        var pg = $(e).attr("data-name").trim();

        // Render page click 
        switch(pg){
            case "Our Story":
                return Router.Router("Our Story")
            case "Terms":
                return (
                        Router.Router("Terms of Service"), $(".navigation").css("display", "block"), $(".terms_container").css({"left": "-2vw","position": "relative"}),
                        $(".footer_mobile").css("position", "fixed"), $(cls_btn).insertAfter(".logoMain")
                    )
            case "Artist Corner":
                return Router.Router(pg), $(".loginRoot").addClass("body-login-main")
        }
    },
    crt_user_markup:function(){

        var country_list = Login.country_list('reguserfrm_webapp');

        var page = `
            <div style="display: block; position: relative; left: -2vw;" class="navigation">
                <nav class="navmain navFAQ">
                    <article class="logoMain">
                        <img class="logomain_item" src="/assets/icon/strma_logo.png" onclick="nav_logo_click()">
                    </article>
                    <div data-name="Our Story" class="pg_cls_cnt" style="transform: scale(0.9); top: 12px;right: 10px;"><img onclick="cls_pg()" class="pg_cls_icn_" src="./../../assets/icon/page_cls_.png"></div>
                </nav>
            </div>
            <div class="user_reg">
                <div class="reg_container_scrll">
                    <div class="reg_form_landng">
                        <h1 class="user_reg_rdh">Register Account</h1>
                        <div class="explains_hdr_d">Create an account below to begin your listening experience.</div>

                        <div style="padding-top: 0;" class="reguser_form_cornt_webapp">
                            <input class="reguserfrm_webapp first_sgnup" placeholder="Username" required>
                            <input type="password" class="reguserfrm_webapp lastnme_sgnup" placeholder="Password" required>
                            <select class="loginWith_type_ reguserfrm_webapp loginWith_type_selector" type="contactSelector">
                                <option value="">Login with Email or Phone</option>
                                <option value="Email">Email</option>
                                <option value="Phone">Phone</option>
                            </select>

                            <input type="email" class="reguserfrm_webapp email_userreg_landing" placeholder="Email" required>
                            <input type="tel" class="reguserfrm_webapp phone_userreg_landing" placeholder="Phone" required>

                            <input type="date" class="reguserfrm_webapp date_sgnup_" placeholder="Birthday" required>
                            <input class="reguserfrm_webapp cellphone_sgnup" placeholder="Cell Phone e.g. (77-843-3245)" required>
                            <div class="reguser_city_country_">
                                `+country_list+`
                                <input class="reguserfrm_webapp city_signup" placeholder="City/Town" required>
                            </div>
                            <input class="reguserfrm_webapp streetAddress_signup" placeholder="Street Address" required>
                            
                            <select class="gender_ loginWith_type_ reguserfrm_webapp ">
                                <option value="">Gender</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                        </div>
                    </div>
                    <button class="cls_sgn_lgn" onclick="c_lgnsgn()">Close</button>
                </div>
            </div>
        `;

        return page
    },
    crt_user:function(){
        var markup = this.crt_user_markup();

        // Render Page
        return $(".root").html(markup);

    },
    render_create_account:function(){
        return Router.Router("Create Account")
    },
    cls_pg:function(){
        return History_.goBack()
    }
}

// create uesr page
var crt_usr = function(){
    return Landing.render_create_account()
}

// menu item handler
var menu_click = function(e){
    return Landing.menu_itm_click(e)
}

// link to artist corner
var artistCor = function(){
    return Landing.artistCorner()
}

// menu open
var menu = function(){
    return Landing.menu()
}

// close menu
var cls_menu = function(){
    return Landing.cls_menu()
}

var cls_pg = function(){
    return Landing.cls_pg()
}


var nav_logo_click = function(){
    return ( sessionStorage.getItem("CurrentPage")!= "Landing") ? RouterObject.Router("Landing"):null
}
var downloadApp = function(){
    return alert("Strma App coming soon!! We Launch March 31st 2019")
}
var webApp = function(){
    return Landing.webPlayer()
}
var  Landing = Landing;